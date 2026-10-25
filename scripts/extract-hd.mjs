// Heavy-duty towing grid extractor (batch 4). Position-based: reads text items
// with x/y from the makers' PDFs (pdfjs-dist), groups into rows by y, maps each
// value to its column header x-center (±6 pt, never a nearest guess), and keeps
// small-font (<5 pt) superscripts as footnote markers.
//
// Run MANUALLY and locally (not in CI). PDFs are the makers' copyrighted
// documents and are NOT committed; they are cached in .hd-cache/ (gitignored).
// The committed TS data files are the source of truth. If a re-download's SHA-256
// differs from the value below, the maker revised the PDF: the script stops.
//
// Sources (accessed 2026-10-25):
//   ford-guide  https://www.ford.com/content/dam/brand_ford/en_us/brand/towing/pdf/2026-Ford-RV-and-Trailer-Towing-Guide-v2.pdf
//               (Ford's Akamai host 403s plain GETs; download needs full browser
//                headers + --compressed. Ford p.20 is marked "REVISED 11-24-25".)
//     SHA-256   f41f5bf62ba45e731232968961d111686408da385a0c1472c438d31dd7dc00c6
//   gm-guide    https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/trucks/trailering-and-towing/news/v2/CH-CAT-GEN-TRBRND020_2026%20Chevrolet%20Trailering%20Guidev2.pdf
//     SHA-256   d5804b65aeffd72bbb9ca453fb0d58b9051e8120fc01ffa41540da3454d1026b
//   ram-hd      https://www.ramtrucks.com/content/dam/fca-brands/na/ramtrucks/en_us/towing/towing-capacity-guide/brochure/my26_Ram_HD_Customer_TowPayChart_1.9.pdf
//     SHA-256   e5544e59f340102efe0ce3403fb9d9eb90e734ccb6c48064f58e96e0ccae0bc5
//
// Usage: node scripts/extract-hd.mjs [--check]
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const CACHE = new URL('../.hd-cache/', import.meta.url);
const COL_TOL = 6; // a value must sit within ±6 pt of its column header x-center

export const EXPECTED_SHA = {
  'ford-guide.pdf': 'f41f5bf62ba45e731232968961d111686408da385a0c1472c438d31dd7dc00c6',
  'gm-guide.pdf': 'd5804b65aeffd72bbb9ca453fb0d58b9051e8120fc01ffa41540da3454d1026b',
  'ram-hd.pdf': 'e5544e59f340102efe0ce3403fb9d9eb90e734ccb6c48064f58e96e0ccae0bc5',
};

function fileFor(name) {
  return new URL(name, CACHE);
}
export function sha256(file) {
  return createHash('sha256').update(readFileSync(file)).digest('hex');
}
function checkSha(name) {
  const got = sha256(fileFor(name));
  if (got !== EXPECTED_SHA[name]) {
    throw new Error(`maker revised PDF: ${name} sha256=${got} expected=${EXPECTED_SHA[name]}`);
  }
}

export async function loadItems(name) {
  const data = new Uint8Array(readFileSync(fileFor(name)));
  const doc = await getDocument({ data, useSystemFonts: false }).promise;
  const pages = [];
  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n);
    const content = await page.getTextContent();
    const items = content.items
      .filter((i) => i.str && i.str.trim() !== '')
      .map((i) => {
        const x = i.transform[4];
        const w = i.width;
        return {
          s: i.str,
          x: Math.round(x * 10) / 10,
          cx: Math.round((x + w / 2) * 10) / 10,
          y: Math.round(i.transform[5] * 10) / 10,
          w: Math.round(w * 10) / 10,
          fs: Math.round(Math.hypot(i.transform[0], i.transform[1]) * 10) / 10,
        };
      });
    pages.push(items);
  }
  return pages;
}

export function rows(items, tol = 1.6) {
  const sorted = [...items].sort((a, b) => b.y - a.y);
  const out = [];
  for (const it of sorted) {
    let r = out.find((g) => Math.abs(g.y - it.y) <= tol);
    if (!r) {
      r = { y: it.y, items: [] };
      out.push(r);
    }
    r.items.push(it);
  }
  for (const r of out) r.items.sort((a, b) => a.x - b.x);
  return out;
}

export const toNum = (s) => Number(String(s).replace(/[^0-9]/g, ''));
const isValue = (s) => /^\d{1,3}(?:,\d{3})+(?:\/(?:\d{1,3}(?:,\d{3})+|NA))?$|^NA\/\d{1,3}(?:,\d{3})+$/.test(s.trim());

// Assign a value item to the single column whose center is within ±COL_TOL.
// Throws if none within tolerance (never a nearest-column guess) or if two match.
function assignColumn(item, columns, ctx) {
  const within = columns.filter((c) => Math.abs(c.center - item.cx) <= COL_TOL);
  if (within.length === 1) return within[0];
  const deltas = columns.map((c) => `${c.label ?? c.key}:${(item.cx - c.center).toFixed(1)}`).join(' ');
  throw new Error(
    `[${ctx}] value "${item.s}" cx=${item.cx} ${within.length === 0 ? 'matches no column' : 'matches ' + within.length + ' columns'} within ±${COL_TOL} (deltas ${deltas})`,
  );
}

// Footnote markers = <5pt single digits just right of the token, slightly raised.
function footnotesNear(tok, flat) {
  return flat
    .filter(
      (i) =>
        i.fs < 5 &&
        /^\d$/.test(i.s) &&
        i.x > tok.x + tok.w - 6 &&
        i.x < tok.x + tok.w + 13 &&
        i.y >= tok.y - 1 &&
        i.y <= tok.y + 6.5,
    )
    .sort((a, b) => a.x - b.x)
    .map((i) => i.s);
}

// =====================================================================
// Ford conventional pages (p.20 F-250 SRW, p.22 F-350 SRW)
// =====================================================================
export const SRW_CONV_COLS = [
  { cab: 'Regular Cab', drive: '4x2', wheelbase: '141.6"', box: "8'" },
  { cab: 'Regular Cab', drive: '4x4', wheelbase: '141.6"', box: "8'" },
  { cab: 'SuperCab', drive: '4x2', wheelbase: '148.0"', box: "6-3/4'" },
  { cab: 'SuperCab', drive: '4x2', wheelbase: '164.2"', box: "8'" },
  { cab: 'SuperCab', drive: '4x4', wheelbase: '148.0"', box: "6-3/4'" },
  { cab: 'SuperCab', drive: '4x4', wheelbase: '164.2"', box: "8'" },
  { cab: 'Crew Cab', drive: '4x2', wheelbase: '159.8"', box: "6-3/4'" },
  { cab: 'Crew Cab', drive: '4x2', wheelbase: '176.0"', box: "8'" },
  { cab: 'Crew Cab', drive: '4x4', wheelbase: '159.8"', box: "6-3/4'" },
  { cab: 'Crew Cab', drive: '4x4', wheelbase: '176.0"', box: "8'" },
];

// caps: {model -> maxTrailer ceiling} enforced on every conventional value.
export function fordConventional(pageItems, colConfig, ctx, opts = {}) {
  const rs = rows(pageItems);
  // The WB header row for THIS table: the first (top-most) WB row at/below opts.yTop.
  const wbRows = rs.filter((r) => r.items.filter((i) => /WB$/.test(i.s)).length >= 6);
  const wbRow = opts.yTop != null ? wbRows.find((r) => r.y <= opts.yTop) : wbRows[0];
  const wb = wbRow.items
    .filter((i) => /WB$/.test(i.s))
    .map((i) => {
      const m = i.s.match(/(4x[24])\s+([\d.]+)/);
      return { center: i.cx, drive: m[1], wheelbase: m[2] + '"' };
    })
    .sort((a, b) => a.center - b.center);
  if (wb.length !== colConfig.length) throw new Error(`[${ctx}] ${wb.length} header cols vs ${colConfig.length} config`);
  const columns = wb.map((h, i) => {
    const cfg = colConfig[i];
    if (cfg.drive !== h.drive || cfg.wheelbase !== h.wheelbase)
      throw new Error(`[${ctx}] col ${i + 1}: PDF ${h.drive} ${h.wheelbase} != cfg ${cfg.drive} ${cfg.wheelbase}`);
    return { center: h.center, ...cfg, key: `${cfg.model ? cfg.model + ' ' : ''}${cfg.cab} ${cfg.drive} ${cfg.wheelbase}` };
  });

  const boxRow = rs.filter((r) => r.items.filter((i) => /Box$/.test(i.s)).length >= 6).find((r) => r.y <= wbRow.y);
  const notesY = (rs.find((r) => r.items.some((i) => /^Notes:/.test(i.s))) || { y: -1 }).y;
  const top = boxRow.y - 2;
  const bottom = opts.yBottom != null ? opts.yBottom : notesY;
  const caps = opts.caps || null;

  // engine blocks (two-line names like "6.7L V8" + "Turbo Diesel")
  const engItems = pageItems
    .filter((i) => i.x < 48 && i.fs >= 5.5 && i.fs < 8 && i.y < top && i.y > bottom && !/^\d[\d,]*$/.test(i.s))
    .sort((a, b) => b.y - a.y);
  const blocks = [];
  for (const i of engItems) {
    if (/^\d\.\dL/.test(i.s)) blocks.push({ yTop: i.y, name: i.s.replace(/\s+/g, ' ').trim() });
    else if (blocks.length && /Diesel|Turbo|H\.O\./.test(i.s))
      blocks[blocks.length - 1].name = (blocks[blocks.length - 1].name + ' ' + i.s).replace(/\s+/g, ' ').trim();
  }
  const engineFor = (y) => {
    const c = blocks.filter((b) => b.yTop >= y - 1.6).sort((a, b) => a.yTop - b.yTop);
    return (c[0] || blocks[blocks.length - 1]).name;
  };

  const dataRows = rs
    .filter((r) => r.y < top && r.y > bottom && r.items.some((i) => isValue(i.s) && toNum(i.s) >= 1000 && i.x >= 78 && i.x < 108))
    .sort((a, b) => b.y - a.y);

  const out = [];
  let valueCount = 0;
  let curAxle = '';
  for (const r of dataRows) {
    const gcwrItem = r.items.find((i) => i.x >= 78 && i.x < 108 && isValue(i.s) && toNum(i.s) >= 1000);
    if (!gcwrItem) continue;
    const axleTok = r.items.find((i) => i.x >= 60 && i.x < 82 && /^\d\.\d\d/.test(i.s));
    if (axleTok) {
      let a = axleTok.s;
      const e = r.items.find((i) => i.s === 'E' && i.x > axleTok.x && i.x < gcwrItem.x);
      if (e) a += 'E';
      const marks = footnotesNear(e || axleTok, pageItems);
      curAxle = a + (marks.length ? '^' + marks.join(',') : '');
    }
    const gcwrFoot = footnotesNear(gcwrItem, pageItems);
    const gcwr = toNum(gcwrItem.s);
    const engine = engineFor(r.y);
    const vals = r.items.filter((i) => i.x > 108 && i.fs >= 5 && isValue(i.s));
    for (const v of vals) {
      valueCount++;
      const col = assignColumn(v, columns, `${ctx} y=${r.y}`);
      const foot = footnotesNear(v, pageItems);
      const [a, b] = v.s.split('/');
      const maxTrailer = toNum(a);
      const maxTrailerAlt = b != null ? toNum(b) : null;
      // Hard check: no towing value exceeds its row GCWR.
      for (const t of [maxTrailer, maxTrailerAlt]) {
        if (t != null && t > gcwr) throw new Error(`[${ctx}] ${col.key}: value ${t} > GCWR ${gcwr}`);
      }
      // Hard check: conventional value never exceeds the model's p.26 hitch cap.
      if (caps) {
        const cap = caps[col.model || 'default'] ?? caps.default;
        for (const t of [maxTrailer, maxTrailerAlt]) {
          if (cap != null && t != null && t > cap)
            throw new Error(`[${ctx}] ${col.key}: value ${t} > hitch cap ${cap}`);
        }
      }
      out.push({
        page: ctx,
        table: 'conventional',
        model: col.model || null,
        engine,
        axle: curAxle,
        gcwr,
        gcwrFoot,
        cab: col.cab,
        drive: col.drive,
        wheelbase: col.wheelbase,
        box: col.box,
        hitch: 'conventional',
        maxTrailer,
        maxTrailerAlt,
        footnotes: foot,
        raw: v.s,
        colLabel: col.key,
        rowLabel: `${engine} | ${curAxle} | ${gcwr}${gcwrFoot.length ? '^' + gcwrFoot.join(',') : ''}`,
      });
    }
  }
  // Hard check: every fs>=5 value item in the value region was assigned exactly once.
  const regionValues = pageItems.filter(
    (i) => i.x > 108 && i.fs >= 5 && i.y < top && i.y > bottom && isValue(i.s),
  ).length;
  if (regionValues !== valueCount)
    throw new Error(`[${ctx}] value-item count mismatch: region=${regionValues} assigned=${valueCount}`);
  return out;
}

// =====================================================================
// GM Silverado HD (p.31-36 = 2500, p.37-40 = 3500). Two panels per page.
// Columns: Model, Engine, Wheel, GVWR, GCWR, Max conventional, Max GN/5th.
// The GN column holds single values, two-value "a/b" (gooseneck/5th-wheel) and a
// few that wrap across baselines; those fragments are merged inside the GN x-band.
// =====================================================================
const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
// A numeric fragment in a GM value column: a whole thousands-number ("16,000",
// "16.000", "16 000") or a bare piece of a split value ("16", "000").
const NUMFRAG = /^(?:\d{1,3}(?:[,. ]\d{3})+|\d{1,3})$/;

function gmPanels(pageItems) {
  // two panels, split at x=400; each has its own "Model" header
  return [
    { lo: 0, hi: 400 },
    { lo: 400, hi: 800 },
  ].map((p) => ({ ...p, items: pageItems.filter((i) => i.x >= p.lo && i.x < p.hi) }));
}

// Per-page GM footnote legend {marker: text}. Markers are small (<6.5pt) single
// digits in the bottom legend; text is the same-baseline run to their right.
// Legends differ by page: p.35's ⁴/⁵ (ZR2 Bison) are not p.37's ⁴.
export function gmFootnoteLegend(pageItems) {
  const legend = {};
  const bottom = pageItems.filter((i) => i.y < 62 && i.fs >= 5.5 && i.fs <= 6.6);
  const markers = bottom.filter((i) => /^\d$/.test(i.s.trim()));
  for (const m of markers) {
    const sameLine = bottom
      .filter((i) => i !== m && Math.abs(i.y - m.y) <= 1.5 && i.x > m.x && i.x < m.x + 520 && !/^\d$/.test(i.s.trim()))
      .sort((a, b) => a.x - b.x);
    if (sameLine.length) legend[m.s.trim()] = sameLine.map((i) => i.s).join(' ').replace(/\s+/g, ' ').trim();
  }
  return legend;
}

export function gmPage(pageItems, ctx) {
  const out = [];
  const rs = rows(pageItems, 1.4);
  for (const panel of gmPanels(pageItems)) {
    const pit = panel.items;
    // anchors: GVWR/GCWR/conv/gn column centers from a clean data row.
    const prs = rows(pit, 1.4);
    // Numeric value items (>=1000). GM prints a few 5-digit values with a period or
    // a space as the thousands separator ("16.000" on p.33, "18.300" on p.31, "16 000"),
    // so accept comma, period or space. toNum() strips the separator to the number.
    const isV = (s) => /^\d{1,3}(?:[,. ]\d{3})+$/.test(s.trim());
    const clean = prs.find((r) => r.items.filter((i) => isV(i.s) && i.fs >= 6).length === 4);
    if (!clean) continue;
    const anchorsRow = clean.items.filter((i) => isV(i.s) && i.fs >= 6).sort((a, b) => a.cx - b.cx);
    const [gvwrC, gcwrC, convC, gnC] = anchorsRow.map((i) => i.cx);
    const wheelAnchor = clean.items.find((i) => /"/.test(i.s) && i.cx < gvwrC - 10);
    const wheelC = wheelAnchor ? wheelAnchor.cx : gvwrC - 35;
    const cols = [
      { key: 'gvwr', center: gvwrC },
      { key: 'gcwr', center: gcwrC },
      { key: 'conv', center: convC },
      { key: 'gn', center: gnC },
    ];
    // cab section headers (fs ~8) e.g. "2500 HD Regular Cab" / "(continued)"
    const cabHdrs = pit
      .filter((i) => i.fs >= 7.5 && i.fs < 9 && /HD .*Cab/.test(i.s))
      .map((i) => ({ y: i.y, text: i.s.replace(/\s*\(continued\)/, '').trim() }))
      .sort((a, b) => b.y - a.y);
    // Model sub-labels (fs ~7-8) in the model column, left of the engine column.
    // A label wraps onto 1-3 lines; a new label block starts at a line with a bed
    // keyword, and the continuation lines ("with Max Trailering Package", "4x4 SRW")
    // join it. This recovers full labels like "Long Bed 4x4 with Max Trailering Package".
    const modelLines = pit
      .filter((i) => i.fs >= 6.5 && i.fs < 9 && !/HD/.test(i.s) && i.x < panel.lo + 70 && !isV(i.s))
      .sort((a, b) => b.y - a.y);
    const blocks = [];
    for (const i of modelLines) {
      const t = i.s.trim();
      if (/\bBed\b/.test(t)) blocks.push({ ys: [i.y], parts: [t] });
      else if (blocks.length) {
        blocks[blocks.length - 1].ys.push(i.y);
        blocks[blocks.length - 1].parts.push(t);
      }
    }
    for (const b of blocks) {
      b.center = b.ys.reduce((a, c) => a + c, 0) / b.ys.length;
      b.text = b.parts.join(' ').replace(/\s+/g, ' ').trim();
    }

    // data rows: a row with a GVWR + GCWR + conv value (3 single numerics in those cols)
    const dataRows = prs.filter((r) => {
      const vs = r.items.filter((i) => isV(i.s) && i.fs >= 6);
      return vs.length >= 3 && vs.some((i) => Math.abs(i.cx - gvwrC) <= COL_TOL);
    });
    let panelFrags = 0;
    for (const r of dataRows) {
      const anchorY = r.y;
      const cabHdr = cabHdrs.find((h) => h.y >= anchorY - 1) || cabHdrs[cabHdrs.length - 1];
      const cab = (cabHdr?.text || '').replace(/^\d+ HD /, '');
      // model label = the full (joined) sub-label for this row's merged model cell.
      const block = blocks.reduce((best, b) => (Math.abs(b.center - anchorY) < Math.abs((best?.center ?? 1e9) - anchorY) ? b : best), null);
      const model = block?.text ?? '';
      // engine: text in engine column (x right of model, left of wheel)
      const engItems = r.items.filter((i) => !isV(i.s) && i.fs >= 6 && i.x > panel.lo + 70 && i.cx < wheelC - 15 && !/"/.test(i.s));
      const engine = engItems
        .map((i) => i.s)
        .join('')
        .replace(/6\s*6L V8/, '6.6L V8')
        .replace(/\s+/g, ' ')
        .trim();
      // wheel: merge multi-line tokens in the wheel column within the row span
      const wheel = pit
        .filter((i) => /["/]/.test(i.s) && Math.abs(i.cx - wheelC) <= 24 && i.y >= anchorY - 7 && i.y <= anchorY + 7 && i.fs >= 5)
        .sort((a, b) => b.y - a.y || a.x - b.x)
        .map((i) => i.s.trim())
        .join('')
        .replace(/\s+/g, '');
      // Single-value columns. Read by merging the numeric fragments in the column
      // band on this baseline, so a split value like "16"+"000" ("16.000") rejoins.
      const readSingle = (center) => {
        const toks = r.items
          .filter((i) => i.fs >= 6 && Math.abs(i.cx - center) <= 16 && Math.abs(i.y - anchorY) <= 1.8 && NUMFRAG.test(i.s.trim()))
          .sort((a, b) => a.x - b.x);
        if (!toks.length) return null;
        return { n: toNum(toks.map((t) => t.s).join('')), frags: toks.length };
      };
      const singles = {};
      let rowFrags = 0;
      for (const key of ['gvwr', 'gcwr', 'conv']) {
        const res = readSingle(cols.find((x) => x.key === key).center);
        if (res) {
          singles[key] = res.n;
          rowFrags += res.frags;
        }
      }
      // GN cell: merge all tokens in the GN x-band within the row's vertical span.
      // The band is asymmetric: the "/" separator and superscript sit to the right
      // of the number, so extend further right than left.
      const band = pit.filter(
        (i) => i.cx >= gnC - 16 && i.cx <= gnC + 34 && i.y >= anchorY - 7 && i.y <= anchorY + 7 && i.fs >= 3,
      );
      const gn = reconstructGN(band, anchorY);
      // Hard checks
      for (const t of [singles.conv, gn?.a, gn?.b]) {
        if (t != null && singles.gcwr != null && t > singles.gcwr)
          throw new Error(`[${ctx}] ${model} ${engine}: value ${t} > GCWR ${singles.gcwr}`);
      }
      if (singles.gvwr == null || singles.gcwr == null) continue;
      // Every GM data row must have both a conventional and a gooseneck/5th value;
      // an empty one means a value was dropped (e.g. an un-normalised "16.000").
      if (singles.conv == null) throw new Error(`[${ctx}] empty conventional cell at "${model}" ${engine} (GVWR ${singles.gvwr}/GCWR ${singles.gcwr})`);
      if (!gn || gn.a == null) throw new Error(`[${ctx}] empty gooseneck/5th cell at "${model}" ${engine} (GVWR ${singles.gvwr}/GCWR ${singles.gcwr})`);
      out.push({
        page: ctx,
        panel: panel.lo < 400 ? 'L' : 'R',
        cab,
        model,
        engine,
        wheel,
        gvwr: singles.gvwr,
        gcwr: singles.gcwr,
        conv: singles.conv,
        gnRaw: gn.raw,
        gn: gn.a,
        gnAlt: gn.b,
        gnFoot: gn.foot,
        rowLabel: `${model} | ${engine} | ${wheel} | ${singles.gvwr} | ${singles.gcwr}`,
      });
      panelFrags += rowFrags;
    }
    // Exact-count: every numeric fragment in the three single-value column bands is
    // assigned to exactly one cell (handles split values like "16"+"000").
    if (dataRows.length) {
      const yLo = Math.min(...dataRows.map((r) => r.y)) - 3;
      const yHi = Math.max(...dataRows.map((r) => r.y)) + 3;
      const regionFrags = pit.filter(
        (i) => i.fs >= 6 && NUMFRAG.test(i.s.trim()) && i.y >= yLo && i.y <= yHi && [gvwrC, gcwrC, convC].some((c) => Math.abs(i.cx - c) <= 16),
      ).length;
      if (regionFrags !== panelFrags)
        throw new Error(`[${ctx}] ${panel.lo < 400 ? 'L' : 'R'} single-value fragment count mismatch: region=${regionFrags} assigned=${panelFrags}`);
    }
  }
  return out;
}

// Reconstruct a GM gooseneck/5th-wheel cell from its x-band tokens (may wrap and
// include a superscript footnote and a "/" between two values). Returns {a,b,raw,foot,items}.
function reconstructGN(band, anchorY) {
  if (!band.length) return null;
  // order by baseline (top first), then x
  const ordered = [...band].sort((a, b) => b.y - a.y || a.x - b.x);
  let raw = '';
  const foot = [];
  let items = 0;
  for (const it of ordered) {
    // GM prints a few values with an odd thousands separator: "18.300" (period,
    // p.31) and "16 000" (space, p.33). Normalise either to a comma so they store
    // as 18,300 / 16,000. (Most values already carry a comma in the text layer.)
    const s = it.s.trim().replace(/^(\d{2})[. ](\d{3})$/, '$1,$2');
    if (it.fs < 5 && /^\d$/.test(s)) {
      foot.push(s);
      continue;
    }
    if ([...s].every((ch) => SUP[ch])) {
      for (const ch of s) foot.push(SUP[ch]);
      continue;
    }
    const cleaned = s.replace(/[^0-9,/]/g, '');
    if (/^\d{1,3}(?:,\d{3})+$/.test(cleaned)) items++;
    raw += cleaned;
  }
  raw = raw.replace(/\/+/g, '/').replace(/\/$/, '');
  if (!raw) return null;
  const [ap, bp] = raw.split('/');
  const a = toNum(ap);
  const b = bp != null && bp !== '' ? toNum(bp) : null;
  // Reformat with proper thousands separators so the GM "18.300" (tokens 18+300,
  // no comma) normalises to 18,300 and every GN value prints consistently.
  const norm = [a, b].filter((n) => n != null).map((n) => n.toLocaleString('en-US')).join('/');
  return { a, b, raw: norm, foot, items };
}

// =====================================================================
// Ram HD (single page, scale ~3x). 8 trailer columns (2500: Reg 8', Crew 6'4",
// Crew 8', Mega 6'4"; then the same four for 3500). Each cell is "4x2/4x4";
// "NA" means not offered (drop that drive). Ram's rating applies to any hitch.
// =====================================================================
const RAM_TOL = 26; // Ram's page is ~3x the normal scale; columns are ~85 pt apart
const RAM_COLS = [
  { group: '2500', cab: 'Regular Cab', bed: "8'" },
  { group: '2500', cab: 'Crew Cab', bed: '6\'4"' },
  { group: '2500', cab: 'Crew Cab', bed: "8'" },
  { group: '2500', cab: 'Mega Cab', bed: '6\'4"' },
  { group: '3500', cab: 'Regular Cab', bed: "8'" },
  { group: '3500', cab: 'Crew Cab', bed: '6\'4"' },
  { group: '3500', cab: 'Crew Cab', bed: "8'" },
  { group: '3500', cab: 'Mega Cab', bed: '6\'4"' },
];

export function ramTowing(pageItems, ctx) {
  const rs = rows(pageItems, 5);
  // box sub-header row: 8 "… Bed" items between the towing title and the data
  const boxRow = rs
    .filter((r) => r.items.filter((i) => /Bed$/.test(i.s)).length >= 6)
    .sort((a, b) => b.y - a.y)[0];
  const boxes = boxRow.items.filter((i) => /Bed$/.test(i.s)).sort((a, b) => a.x - b.x);
  if (boxes.length !== 8) throw new Error(`[${ctx}] expected 8 box columns, got ${boxes.length}`);
  const columns = boxes.map((b, i) => ({ left: b.x, ...RAM_COLS[i], key: `${RAM_COLS[i].group} ${RAM_COLS[i].cab} ${RAM_COLS[i].bed}` }));
  const dieselHdrY = rs.find((r) => r.items.some((i) => /CUMMINS.*HIGH-OUTPUT/.test(i.s))).y;
  const payloadY = (rs.find((r) => r.items.some((i) => /Maximum Payload Capacities/.test(i.s))) || { y: 0 }).y;

  // row anchors: a (y, axle, gvwr, gcwr, wheels) line near x~1010-1150
  const anchors = rs
    .filter((r) => {
      const axle = r.items.find((i) => i.x > 1000 && i.x < 1030 && /^\d\.\d\d$/.test(i.s));
      const gcwr = r.items.find((i) => i.x > 1130 && i.x < 1165 && /^\d{2},\d{3}$/.test(i.s));
      return axle && gcwr;
    })
    .map((r) => {
      const wheelsTok = r.items.find((i) => i.x > 950 && i.x < 985 && /SRW|DRW/.test(i.s));
      const gvwrTok = r.items.find((i) => i.x > 1050 && i.x < 1115 && /\d,\d{3}/.test(i.s));
      return {
        y: r.y,
        axle: r.items.find((i) => i.x > 1000 && i.x < 1030 && /^\d\.\d\d$/.test(i.s)).s,
        gcwr: toNum(r.items.find((i) => i.x > 1130 && i.x < 1165 && /^\d{2},\d{3}$/.test(i.s)).s),
        wheels: wheelsTok ? wheelsTok.s.trim() : '',
        gvwr: gvwrTok ? toNum(gvwrTok.s.split('/')[0]) : null,
        engine: r.y > dieselHdrY ? '6.4L HEMI V8' : '6.7L Cummins I6 High-Output Turbo Diesel',
      };
    });
  // every trailer value token, assigned to its nearest anchor (by y) and column (by x)
  const ramVal = /^(\d{1,3},\d{3}\*?|NA)\/(\d{1,3},\d{3}\*?|NA)$/;
  const trailerTokens = pageItems.filter(
    (i) => i.x >= columns[0].left - RAM_TOL && i.fs >= 12 && i.y > payloadY && ramVal.test(i.s.replace(/\s/g, '')),
  );
  const out = [];
  let dropped = 0;
  for (const v of trailerTokens) {
    const anchor = anchors.reduce((best, a) => (Math.abs(a.y - v.y) < Math.abs(best.y - v.y) ? a : best), anchors[0]);
    if (Math.abs(anchor.y - v.y) > 10) throw new Error(`[${ctx}] value "${v.s}" y=${v.y} has no row anchor within 10pt`);
    const within = columns.filter((c) => Math.abs(c.left - v.x) <= RAM_TOL);
    if (within.length !== 1) throw new Error(`[${ctx}] value "${v.s}" x=${v.x} matches ${within.length} columns within ±${RAM_TOL}`);
    const col = within[0];
    const foot = /\*/.test(v.s) ? ['*'] : [];
    const parts = v.s.replace(/\s/g, '').replace(/\*/g, '').split('/');
    parts.forEach((p, idx) => {
      const drive = idx === 0 ? '4x2' : '4x4';
      if (p === 'NA' || p === '') {
        dropped++;
        return; // NA = not offered; drop this drive
      }
      out.push({
        page: ctx,
        group: col.group,
        cab: col.cab,
        bed: col.bed,
        engine: anchor.engine,
        wheels: anchor.wheels,
        axle: anchor.axle,
        gvwr: anchor.gvwr,
        gcwr: anchor.gcwr,
        drive,
        hitch: 'any',
        maxTrailer: toNum(p),
        footnotes: foot,
        raw: v.s.trim(),
        colLabel: col.key,
      });
    });
  }
  return { rows: out, dropped };
}

// Ram payload table (same page, 8 columns, 4x2/4x4; "NA" = not offered).
export function ramPayload(pageItems, ctx) {
  const rs = rows(pageItems, 5);
  const titleY = (rs.find((r) => r.items.some((i) => /Maximum Payload Capacities/.test(i.s))) || { y: 0 }).y;
  const boxRow = rs
    .filter((r) => r.items.filter((i) => /Bed$/.test(i.s)).length >= 6 && r.y < titleY)
    .sort((a, b) => b.y - a.y)[0];
  const boxes = boxRow.items.filter((i) => /Bed$/.test(i.s)).sort((a, b) => a.x - b.x);
  const columns = boxes.map((b, i) => ({ left: b.x, ...RAM_COLS[i], key: `${RAM_COLS[i].group} ${RAM_COLS[i].cab} ${RAM_COLS[i].bed}` }));
  const cumminsY = (rs
    .filter((r) => r.items.some((i) => /CUMMINS/.test(i.s)) && r.y < boxRow.y)
    .sort((a, b) => b.y - a.y)[0] || { y: 0 }).y;
  const anchors = rs
    .filter((r) => r.y < boxRow.y && r.items.find((i) => i.x > 1050 && i.x < 1115 && /^\d{1,2},\d{3}/.test(i.s)))
    .map((r) => ({
      y: r.y,
      gvwr: toNum(r.items.find((i) => i.x > 1050 && i.x < 1115 && /^\d{1,2},\d{3}/.test(i.s)).s.split('/')[0]),
      engine: r.y > cumminsY ? '6.4L HEMI V8' : '6.7L Cummins I6 High-Output Turbo Diesel',
    }));
  const ramVal = /^(\d{1,3},\d{3}\*?|NA)\/(\d{1,3},\d{3}\*?|NA)$/;
  const toks = pageItems.filter(
    (i) => i.x >= columns[0].left - RAM_TOL && i.y < boxRow.y && i.y > 150 && i.fs >= 12 && ramVal.test(i.s.replace(/\s/g, '')),
  );
  const out = [];
  let dropped = 0;
  for (const v of toks) {
    const anchor = anchors.reduce((best, a) => (Math.abs(a.y - v.y) < Math.abs(best.y - v.y) ? a : best), anchors[0]);
    if (Math.abs(anchor.y - v.y) > 10) throw new Error(`[${ctx} payload] "${v.s}" y=${v.y} no anchor`);
    const within = columns.filter((c) => Math.abs(c.left - v.x) <= RAM_TOL);
    if (within.length !== 1) throw new Error(`[${ctx} payload] "${v.s}" x=${v.x} matches ${within.length} cols`);
    const col = within[0];
    const parts = v.s.replace(/\s/g, '').replace(/\*/g, '').split('/');
    parts.forEach((p, idx) => {
      const drive = idx === 0 ? '4x2' : '4x4';
      if (p === 'NA' || p === '') {
        dropped++;
        return;
      }
      out.push({ group: col.group, cab: col.cab, bed: col.bed, engine: anchor.engine, gvwr: anchor.gvwr, drive, payload: toNum(p), colLabel: col.key });
    });
  }
  return { rows: out, dropped };
}

// F-350/F-450 DRW conventional + 5th/gn column order (section 3 p.24 golden).
export const DRW_COLS = [
  { model: 'F-350', cab: 'Regular Cab', drive: '4x2', wheelbase: '141.6"', box: "8'" },
  { model: 'F-350', cab: 'Regular Cab', drive: '4x4', wheelbase: '141.6"', box: "8'" },
  { model: 'F-450', cab: 'Regular Cab', drive: '4x2', wheelbase: '141.6"', box: "8'" },
  { model: 'F-450', cab: 'Regular Cab', drive: '4x4', wheelbase: '141.6"', box: "8'" },
  { model: 'F-350', cab: 'Crew Cab', drive: '4x2', wheelbase: '176.0"', box: "8'" },
  { model: 'F-350', cab: 'Crew Cab', drive: '4x4', wheelbase: '176.0"', box: "8'" },
  { model: 'F-450', cab: 'Crew Cab', drive: '4x2', wheelbase: '176.0"', box: "8'" },
  { model: 'F-450', cab: 'Crew Cab', drive: '4x4', wheelbase: '176.0"', box: "8'" },
];

export const CAPS = {
  f250: { default: 22000 },
  f350srw: { default: 25000 },
  drw: { 'F-350': 28000, 'F-450': 30000 },
};

// Look up one extracted cell and assert raw value (+footnotes) matches golden.
function cell(data, { engine, axle, gcwr, col }) {
  return data.filter(
    (r) =>
      (engine == null || (r.engine.includes(engine) && (engine.includes('H.O.') || !r.engine.includes('H.O.')))) &&
      (axle == null || r.axle === axle) &&
      (gcwr == null || r.gcwr === gcwr) &&
      r.colLabel === col,
  );
}
function assertGolden(label, data, spec) {
  const hits = cell(data, spec);
  if (hits.length !== 1) throw new Error(`GOLDEN FAIL ${label}: expected 1 cell, got ${hits.length} (${JSON.stringify(spec)})`);
  if (hits[0].raw !== spec.value) throw new Error(`GOLDEN FAIL ${label}: value "${hits[0].raw}" want "${spec.value}"`);
  // Only assert footnotes when the golden spec lists them (terse spot cells omit them).
  if (spec.foot) {
    const got = hits[0].footnotes.join(',');
    if (got !== spec.foot.join(',')) throw new Error(`GOLDEN FAIL ${label}: footnotes "${got}" want "${spec.foot.join(',')}"`);
  }
}

// Assert a whole Ford conventional grid matches a golden table (rows of 10 cells,
// each "value" or "value^f,f" or "" for blank). rowKey = "engine|axle|gcwr^foot".
function assertFullGrid(label, data, cols, golden) {
  const byRow = new Map();
  for (const r of data) {
    const k = `${r.engine}|${r.axle}|${r.gcwr}${r.gcwrFoot.length ? '^' + r.gcwrFoot.join(',') : ''}`;
    if (!byRow.has(k)) byRow.set(k, {});
    byRow.get(k)[r.colLabel] = r.raw + (r.footnotes.length ? '^' + r.footnotes.join(',') : '');
  }
  for (const g of golden) {
    const row = byRow.get(g.key);
    if (!row) throw new Error(`GOLDEN FAIL ${label}: missing row ${g.key}`);
    cols.forEach((c, i) => {
      const got = row[c] ?? '';
      if (got !== g.cells[i]) throw new Error(`GOLDEN FAIL ${label}: ${g.key} col "${c}" got "${got}" want "${g.cells[i]}"`);
    });
  }
  // Also assert there are no extra rows the golden doesn't cover.
  if (byRow.size !== golden.length) throw new Error(`GOLDEN FAIL ${label}: ${byRow.size} rows vs golden ${golden.length}`);
}

// Full golden table for F-250 SRW conventional (p.20).
const F250_P20_GOLDEN = [
  { key: '6.7L V8 Turbo Diesel|3.31|23500', cells: ['16,600', '16,200', '', '16,200', '15,900', '15,800', '16,200', '15,900', '15,900', '15,500'] },
  { key: '6.7L V8 Turbo Diesel|3.31|30000^2', cells: ['18,200', '20,000', '18,200', '19,500', '20,000', '22,000', '19,500', '19,500', '22,000', '21,900'] },
  { key: '6.7L V8 Turbo Diesel|3.55|28300^4', cells: ['', '', '', '', '', '', '', '', '18,200', ''] },
  { key: '6.7L V8 Turbo Diesel|3.55|30000^2', cells: ['18,200', '20,000', '18,200', '19,500', '20,000', '22,000', '19,500', '19,500', '22,000', '21,900'] },
  { key: '6.7L V8 H.O. Turbo Diesel|3.31|31000^2', cells: ['18,200', '20,000', '18,200', '19,500', '20,000', '22,000', '19,500', '19,500', '22,000', '22,000'] },
  { key: '6.7L V8 H.O. Turbo Diesel|3.55E^3|28300^4', cells: ['', '', '', '', '', '', '', '', '18,200', ''] },
  { key: '6.7L V8 H.O. Turbo Diesel|3.55|31000^2', cells: ['18,200', '20,000', '18,200', '19,500', '20,000', '22,000', '19,500', '19,500', '22,000', '22,000'] },
  { key: '6.8L V8|3.73|21000', cells: ['14,800', '14,400', '14,500', '14,500', '14,100', '14,100', '14,500', '14,300', '14,100', '13,800'] },
  { key: '6.8L V8|4.30|23500', cells: ['17,300', '16,900', '17,000', '17,000', '16,600', '16,600', '17,000', '16,800', '16,600', '16,300'] },
  { key: '7.3L V8|3.73|23500', cells: ['', '16,900', '17,100', '17,000/16,900^5', '16,600', '16,600', '', '', '16,700', '16,400'] },
  { key: '7.3L V8|3.73E^3|24600', cells: ['18,200', '18,000', '18,200', '18,100/18,000^5', '17,700', '17,700', '18,100', '17,900', '17,800', '17,500'] },
  { key: '7.3L V8|4.30|26000', cells: ['18,200', '18,200', '18,200', '18,200', '18,200', '18,200', '18,200', '18,200', '18,200^4', '18,200'] },
];

// ---------------- CLI ----------------
const isMain = process.argv[1] && process.argv[1].endsWith('extract-hd.mjs');
if (isMain) {
  for (const n of Object.keys(EXPECTED_SHA)) if (existsSync(fileFor(n))) checkSha(n);
  const ford = await loadItems('ford-guide.pdf');

  const f250conv = fordConventional(ford[19], SRW_CONV_COLS, 'F-250 p.20', { caps: CAPS.f250 });
  const f350conv = fordConventional(ford[21], SRW_CONV_COLS, 'F-350 SRW p.22', { caps: CAPS.f350srw });
  const p24 = ford[23];
  const fifthHdrY = rows(p24).find((r) => r.items.some((i) => /5TH-WHEEL\/GOOSENECK TOWING/.test(i.s))).y;
  const drwConv = fordConventional(p24, DRW_COLS, 'DRW p.24 conv', { yTop: 600, yBottom: fifthHdrY + 2, caps: CAPS.drw });

  // ---- Golden assertions (section 3) ----
  assertFullGrid('F-250 p.20', f250conv, SRW_CONV_COLS.map((c) => `${c.cab} ${c.drive} ${c.wheelbase}`), F250_P20_GOLDEN);
  assertGolden('F-350 SRW HO 35,200 Crew4x4-176', f350conv, { engine: 'H.O.', gcwr: 35200, col: 'Crew Cab 4x4 176.0"', value: '23,500/25,000' });
  assertGolden('F-350 SRW 7.3 29,000 Reg4x2', f350conv, { engine: '7.3L', gcwr: 29000, col: 'Regular Cab 4x2 141.6"', value: '18,200' });
  assertGolden('F-350 SRW 7.3 29,000 Reg4x4', f350conv, { engine: '7.3L', gcwr: 29000, col: 'Regular Cab 4x4 141.6"', value: '19,500' });
  assertGolden('DRW 6.7 40,000 col1', drwConv, { engine: '6.7L V8', axle: '3.55', gcwr: 40000, col: 'F-350 Regular Cab 4x2 141.6"', value: '24,800/18,200' });
  assertGolden('DRW 6.7 40,000 col2', drwConv, { engine: '6.7L V8', axle: '3.55', gcwr: 40000, col: 'F-350 Regular Cab 4x4 141.6"', value: '24,800' });
  assertGolden('DRW 6.7 40,000 col5', drwConv, { engine: '6.7L V8', axle: '3.55', gcwr: 40000, col: 'F-350 Crew Cab 4x2 176.0"', value: '27,000' });
  assertGolden('DRW 6.7 40,000 col6', drwConv, { engine: '6.7L V8', axle: '3.55', gcwr: 40000, col: 'F-350 Crew Cab 4x4 176.0"', value: '27,000' });
  assertGolden('DRW HO 45,600 col5', drwConv, { engine: 'H.O.', gcwr: 45600, col: 'F-350 Crew Cab 4x2 176.0"', value: '28,000' });
  assertGolden('DRW HO 45,600 col6', drwConv, { engine: 'H.O.', gcwr: 45600, col: 'F-350 Crew Cab 4x4 176.0"', value: '28,000' });
  assertGolden('DRW 6.7 43,500 col7', drwConv, { engine: '6.7L V8', gcwr: 43500, col: 'F-450 Crew Cab 4x2 176.0"', value: '30,000' });
  assertGolden('DRW 6.7 43,500 col8', drwConv, { engine: '6.7L V8', gcwr: 43500, col: 'F-450 Crew Cab 4x4 176.0"', value: '30,000' });
  assertGolden('DRW 6.7 46,700 col3', drwConv, { engine: '6.7L V8', gcwr: 46700, col: 'F-450 Regular Cab 4x2 141.6"', value: '25,000' });
  assertGolden('DRW 6.7 46,700 col4', drwConv, { engine: '6.7L V8', gcwr: 46700, col: 'F-450 Regular Cab 4x4 141.6"', value: '25,000' });
  assertGolden('DRW 7.3 29,500 col1', drwConv, { engine: '7.3L', gcwr: 29500, col: 'F-350 Regular Cab 4x2 141.6"', value: '22,000' });
  assertGolden('DRW 7.3 29,500 col2', drwConv, { engine: '7.3L', gcwr: 29500, col: 'F-350 Regular Cab 4x4 141.6"', value: '22,000' });
  assertGolden('DRW 7.3 29,500 col6', drwConv, { engine: '7.3L', gcwr: 29500, col: 'F-350 Crew Cab 4x4 176.0"', value: '21,700' });
  console.log('Ford conventional golden: all pass');
  console.log(`rows: F-250=${f250conv.length} F-350SRW=${f350conv.length} DRW=${drwConv.length}`);

  const gm = await loadItems('gm-guide.pdf');
  // Full GM grids: 2500 HD pp.31-36, 3500 HD pp.37-40. Each row keeps its page so
  // footnote markers resolve against that page's own legend (p.35's 4/5 != p.37's).
  const gmLegend = {}; // pageNum -> {marker: text}
  const gmExtract = (pages, groupName) => {
    const out = [];
    for (const p of pages) {
      gmLegend[p] = gmFootnoteLegend(gm[p - 1]);
      for (const r of gmPage(gm[p - 1], `${groupName} p.${p}`)) out.push({ ...r, pageNum: p });
    }
    return out;
  };
  const gm2500 = gmExtract([31, 32, 33, 34, 35, 36], 'GM 2500');
  const gm3500 = gmExtract([37, 38, 39, 40], 'GM 3500');
  const gmDeferred = [];

  // ---- GM golden assertions (section 3 + owner's extra cells) ----
  const gmCell = (data, sig) => {
    // Some pages list two distinct trims with identical numbers (e.g. p.35 ZR2 vs
    // High Country); the footnote disambiguates, so match it in the filter.
    const hits = data.filter(
      (r) =>
        (sig.page == null || r.pageNum === sig.page) &&
        r.gvwr === sig.gvwr &&
        r.gcwr === sig.gcwr &&
        r.conv === sig.conv &&
        r.gnRaw === sig.gn &&
        r.gnFoot.join(',') === (sig.foot || []).join(','),
    );
    if (hits.length !== 1) throw new Error(`GM GOLDEN FAIL ${JSON.stringify(sig)}: ${hits.length} hits`);
  };
  for (const s of [
    // p.31 (section 3)
    { page: 31, gvwr: 10000, gcwr: 24500, conv: 14500, gn: '17,700' },
    { page: 31, gvwr: 10350, gcwr: 26000, conv: 14500, gn: '18,700' },
    { page: 31, gvwr: 10550, gcwr: 26000, conv: 14500, gn: '18,500' },
    { page: 31, gvwr: 10750, gcwr: 26000, conv: 14500, gn: '18,400' },
    { page: 31, gvwr: 10000, gcwr: 24500, conv: 14500, gn: '17,370' },
    { page: 31, gvwr: 11025, gcwr: 26000, conv: 14500, gn: '18,100' },
    { page: 31, gvwr: 11450, gcwr: 30000, conv: 14500, gn: '22,050' },
    { page: 31, gvwr: 10650, gcwr: 26000, conv: 14500, gn: '18,300' }, // "18.300" with a period
    // owner's extra cells, pp.32-36
    { page: 32, gvwr: 10000, gcwr: 24500, conv: 14500, gn: '12,640' },
    { page: 32, gvwr: 11450, gcwr: 30000, conv: 14500, gn: '22,050' },
    { page: 33, gvwr: 10600, gcwr: 26000, conv: 16000, gn: '18,400' },
    { page: 33, gvwr: 11100, gcwr: 26000, conv: 17900, gn: '17,900' },
    { page: 33, gvwr: 10000, gcwr: 24500, conv: 14500, gn: '11,760' },
    { page: 34, gvwr: 11750, gcwr: 30000, conv: 20000, gn: '21,600' },
    { page: 35, gvwr: 10850, gcwr: 26000, conv: 16000, gn: '18,070', foot: ['4'] },
    { page: 35, gvwr: 11350, gcwr: 27500, conv: 18500, gn: '18,100', foot: ['5'] },
    { page: 35, gvwr: 11750, gcwr: 30000, conv: 20000, gn: '20,800' },
    { page: 35, gvwr: 10000, gcwr: 24500, conv: 14500, gn: '13,120' },
    { page: 36, gvwr: 11900, gcwr: 30000, conv: 20000, gn: '21,180' },
  ])
    gmCell(gm2500, s);
  for (const s of [
    // p.37 (section 3)
    { page: 37, gvwr: 10950, gcwr: 26000, conv: 14500, gn: '19,080' },
    { page: 37, gvwr: 11500, gcwr: 30000, conv: 14500, gn: '22,420' },
    { page: 37, gvwr: 11800, gcwr: 30000, conv: 14500, gn: '22,040' },
    { page: 37, gvwr: 14000, gcwr: 26000, conv: 18700, gn: '18,760' },
    { page: 37, gvwr: 14000, gcwr: 43500, conv: 20000, gn: '35,500/32,000' },
    { page: 37, gvwr: 14000, gcwr: 43900, conv: 20000, gn: '36,000/32,000', foot: ['4'] },
    { page: 37, gvwr: 14000, gcwr: 26000, conv: 18400, gn: '18,380' },
    { page: 37, gvwr: 14000, gcwr: 40000, conv: 20000, gn: '31,500' },
    // owner's extra cells, pp.39-40
    { page: 39, gvwr: 12100, gcwr: 30000, conv: 20000, gn: '21,600' },
    { page: 39, gvwr: 11900, gcwr: 30000, conv: 20000, gn: '22,070' },
    { page: 40, gvwr: 14000, gcwr: 40000, conv: 20000, gn: '31,440' },
  ])
    gmCell(gm3500, s);
  console.log('GM golden: all pass');
  console.log(`rows: GM2500(pp.31-36)=${gm2500.length} GM3500(pp.37-40)=${gm3500.length}`);
  if (process.argv.includes('--gm')) {
    for (const r of [...gm2500, ...gm3500])
      console.log(`p${r.pageNum} | ${r.model} | ${r.engine} | ${r.wheel} | gvwr=${r.gvwr} gcwr=${r.gcwr} conv=${r.conv} gn=${r.gnRaw}${r.gnFoot.length ? '^' + r.gnFoot.join(',') : ''}`);
  }

  const ramDoc = await loadItems('ram-hd.pdf');
  const ram = ramTowing(ramDoc[0], 'Ram p.1');
  const ramFind = (sig) => {
    const hits = ram.rows.filter(
      (r) =>
        r.group === sig.group &&
        r.cab === sig.cab &&
        r.bed === sig.bed &&
        r.drive === sig.drive &&
        (sig.gvwr == null || r.gvwr === sig.gvwr) &&
        r.gcwr === sig.gcwr &&
        (sig.engine == null || r.engine.includes(sig.engine)) &&
        (sig.axle == null || r.axle === sig.axle),
    );
    if (hits.length !== 1) throw new Error(`RAM GOLDEN FAIL ${JSON.stringify(sig)}: ${hits.length} hits`);
    if (hits[0].maxTrailer !== sig.v) throw new Error(`RAM GOLDEN FAIL ${JSON.stringify(sig)}: got ${hits[0].maxTrailer}`);
  };
  // HEMI 3.73 (22,050 GCWR)
  ramFind({ group: '2500', cab: 'Regular Cab', bed: "8'", axle: '3.73', gvwr: 9900, gcwr: 22050, drive: '4x2', v: 15540 });
  ramFind({ group: '2500', cab: 'Regular Cab', bed: "8'", axle: '3.73', gvwr: 9900, gcwr: 22050, drive: '4x4', v: 15220 });
  ramFind({ group: '2500', cab: 'Crew Cab', bed: '6\'4"', axle: '3.73', gvwr: 9900, gcwr: 22050, drive: '4x2', v: 15210 });
  ramFind({ group: '2500', cab: 'Crew Cab', bed: "8'", axle: '3.73', gvwr: 9900, gcwr: 22050, drive: '4x4', v: 14730 });
  // HEMI 4.10 (24,250 GCWR)
  ramFind({ group: '2500', cab: 'Regular Cab', bed: "8'", axle: '4.10', gvwr: 9900, gcwr: 24250, drive: '4x2', v: 17740 });
  ramFind({ group: '2500', cab: 'Crew Cab', bed: '6\'4"', axle: '4.10', gvwr: 9900, gcwr: 24250, drive: '4x4', v: 17120 });
  // Power Wagon (NA/10,530)
  ramFind({ group: '2500', cab: 'Crew Cab', bed: '6\'4"', axle: '4.10', gvwr: 8565, gcwr: 18000, drive: '4x4', v: 10530 });
  // 3500 DRW HEMI (25,000 GCWR)
  ramFind({ group: '3500', cab: 'Regular Cab', bed: "8'", axle: '4.10', gvwr: 14000, gcwr: 25000, drive: '4x2', v: 18150 });
  ramFind({ group: '3500', cab: 'Crew Cab', bed: "8'", axle: '4.10', gvwr: 14000, gcwr: 25000, drive: '4x4', v: 17200 });
  // Cummins HO top value 36,610 (VERIFY: which column)
  ramFind({ group: '3500', cab: 'Regular Cab', bed: "8'", engine: 'Cummins', axle: '3.42', gvwr: 14000, gcwr: 45000, drive: '4x4', v: 36610 });
  // Assert no Ram row came from an NA
  if (ram.rows.some((r) => r.maxTrailer == null || Number.isNaN(r.maxTrailer)))
    throw new Error('RAM: a row has a non-numeric maxTrailer');
  console.log('Ram golden: all pass');
  console.log(`rows: Ram towing=${ram.rows.length} (dropped ${ram.dropped} NA)`);
  const v36 = ram.rows.find((r) => r.maxTrailer === 36610);
  console.log(`VERIFY 36,610 column: ${v36.group} ${v36.cab} ${v36.bed}, drive ${v36.drive}, GCWR ${v36.gcwr}`);
  const ramPay = ramPayload(ramDoc[0], 'Ram p.1');

  // ---- assemble per-vehicle row sets ----
  const f250rows = f250conv.map((r, i) => ({ id: `f250-${i}`, ...r, rearWheels: 'SRW' }));
  const f350rows = [
    ...f350conv.map((r, i) => ({ id: `f350s-${i}`, ...r, model: 'F-350', rearWheels: 'SRW' })),
    ...drwConv.filter((r) => r.model === 'F-350').map((r, i) => ({ id: `f350d-${i}`, ...r, rearWheels: 'DRW' })),
  ];
  const f450rows = drwConv.filter((r) => r.model === 'F-450').map((r, i) => ({ id: `f450-${i}`, ...r, rearWheels: 'DRW' }));
  const ram2500 = ram.rows.filter((r) => r.group === '2500').map((r, i) => ({ id: `r25-${i}`, ...r }));
  const ram3500 = ram.rows.filter((r) => r.group === '3500').map((r, i) => ({ id: `r35-${i}`, ...r }));
  const gm2500rows = gm2500.map((r, i) => ({ id: `g25-${i}`, ...r }));
  const gm3500rows = gm3500.map((r, i) => ({ id: `g35-${i}`, ...r }));

  const axleClean = (a) => (a ? a.replace(/\^.*/, '') : '');
  const fmt = (n) => n.toLocaleString('en-US');
  const fordCfg = (r) => `${r.model ? r.model + ' ' : ''}${r.cab} ${r.drive} ${r.wheelbase}, ${axleClean(r.axle)} axle, ${fmt(r.gcwr)} GCWR`;
  const ramCfg = (r) => `${r.cab} ${r.bed} ${r.drive}, ${r.axle} axle, ${fmt(r.gcwr)} GCWR`;
  const gmCfg = (r) => `${r.cab ? r.cab + ' ' : ''}${r.model}, ${r.engine}${r.wheel ? ', ' + r.wheel + ' wheels' : ''}, ${fmt(r.gcwr)} GCWR`;

  function maxByEngineFord(list) {
    const by = new Map();
    for (const r of list) {
      const v = Math.max(r.maxTrailer, r.maxTrailerAlt ?? 0);
      const cur = by.get(r.engine);
      if (!cur || v > cur.conventional.value) by.set(r.engine, { engine: r.engine, conventional: { value: v, config: fordCfg(r) } });
    }
    return [...by.values()];
  }
  function maxByEngineGm(list) {
    const by = new Map();
    for (const r of list) {
      let e = by.get(r.engine);
      if (!e) {
        e = { engine: r.engine, conventional: null, gooseneck: null };
        by.set(r.engine, e);
      }
      if (r.conv != null && (!e.conventional || r.conv > e.conventional.value)) e.conventional = { value: r.conv, config: gmCfg(r) };
      const gnv = Math.max(r.gn ?? 0, r.gnAlt ?? 0);
      if (gnv && (!e.gooseneck || gnv > e.gooseneck.value)) e.gooseneck = { value: gnv, config: gmCfg(r) };
    }
    return [...by.values()];
  }
  function maxByEngineRam(list) {
    const by = new Map();
    for (const r of list) {
      const cur = by.get(r.engine);
      if (!cur || r.maxTrailer > cur.trailer.value) by.set(r.engine, { engine: r.engine, trailer: { value: r.maxTrailer, config: ramCfg(r) } });
    }
    return [...by.values()];
  }

  // Ford p.26 hitch receivers (golden-verified; same for weight-carrying/distributing).
  const FORD_HITCH = [
    { model: 'F-250', maxTrailer: 22000, maxTongue: 2200 },
    { model: 'F-350 SRW', maxTrailer: 25000, maxTongue: 2500 },
    { model: 'F-250/F-350 Tremor', maxTrailer: 18200, maxTongue: 1820 },
    { model: 'F-350 DRW', maxTrailer: 28000, maxTongue: 2800 },
    { model: 'F-450 DRW', maxTrailer: 30000, maxTongue: 3000 },
  ];
  const GM_FOOTNOTES = [
    { marker: '4', text: 'Requires WT with Max Trailering Package. Without the available Max Trailering Package, towing capacity is reduced to 35,500 lb.' },
    { marker: '5', text: 'Requires bumper hitch and includes spray-on bedliner. Not available with pickup bed delete.' },
  ];

  // ---- write /verify/hd-extract.csv ----
  const csv = [['page', 'table', 'row', 'column', 'value', 'footnotes']];
  const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
  for (const r of [...f250rows, ...f350rows, ...f450rows])
    csv.push([r.page, 'conventional', r.rowLabel, r.colLabel, r.raw, (r.footnotes || []).join(' ')]);
  for (const r of [...gm2500rows, ...gm3500rows]) {
    csv.push([r.page, 'conventional', r.rowLabel, 'Max conventional', r.conv ?? '', '']);
    csv.push([r.page, 'gooseneck/5th', r.rowLabel, 'Max GN/5th', r.gnRaw ?? '', (r.gnFoot || []).join(' ')]);
  }
  for (const r of [...ram2500, ...ram3500])
    csv.push(['Ram p.1', 'towing', `${r.engine} | ${r.wheels} | ${r.axle} | GVWR ${r.gvwr} | GCWR ${r.gcwr}`, r.colLabel + ' ' + r.drive, fmt(r.maxTrailer), (r.footnotes || []).join(' ')]);
  for (const r of ramPay.rows)
    csv.push(['Ram p.1', 'payload', `${r.engine} | GVWR ${r.gvwr}`, r.colLabel + ' ' + r.drive, fmt(r.payload), '']);
  for (const h of FORD_HITCH) csv.push(['Ford p.26', 'hitch', h.model, 'Max trailer / tongue', `${fmt(h.maxTrailer)} / ${fmt(h.maxTongue)}`, '']);
  const csvText = csv.map((row) => row.map(esc).join(',')).join('\n') + '\n';
  mkdirSync(new URL('../verify/', import.meta.url), { recursive: true });
  writeFileSync(new URL('../verify/hd-extract.csv', import.meta.url), csvText);

  // ---- write the 7 TS data files ----
  const outDir = new URL('../lib/data/vehicles/hd/', import.meta.url);
  mkdirSync(outDir, { recursive: true });
  const emit = (file, obj) => {
    const body = `// Generated by scripts/extract-hd.mjs from the maker PDFs (batch 4). Do not edit by hand.\nimport type { HdVehicle } from './hd-types';\n\nconst data: HdVehicle = ${JSON.stringify(obj, null, 2)};\n\nexport default data;\n`;
    writeFileSync(new URL(file, outDir), body);
  };
  const fordNote = 'Ford rates these trailers with the SAE J2807 method and a 150 lb driver and 150 lb passenger.';
  const gmNote =
    "GM's ratings include the weight of the driver, passengers, fuel and optional equipment, so every pound you add lowers what you can tow.";
  const ramNote = 'Ram rates these trailers with SAE J2807, counting 300 lb of passengers and 100 lb of options.';
  const fordFifthPending = "Ford's 5th-wheel and gooseneck ratings for this truck are being added and checked.";

  emit('ford-f250-2026.ts', {
    slug: 'ford-f250-towing-capacity', make: 'Ford', model: 'F-250', year: 2026, kind: 'ford-conv', verified: false,
    source: 'ford-guide-2026', sourceName: 'Ford, 2026 RV & Trailer Towing Guide', readDate: '2026-10-25', pages: 'p. 20',
    rows: f250rows, maxByEngine: maxByEngineFord(f250rows),
    hitchTable: FORD_HITCH.filter((h) => /F-250/.test(h.model)),
    notes: [fordNote], fordFifthPending, footnotes: [],
  });
  emit('ford-f350-2026.ts', {
    slug: 'ford-f350-towing-capacity', make: 'Ford', model: 'F-350', year: 2026, kind: 'ford-conv', verified: false,
    source: 'ford-guide-2026', sourceName: 'Ford, 2026 RV & Trailer Towing Guide', readDate: '2026-10-25', pages: 'pp. 22, 24',
    rows: f350rows, maxByEngine: maxByEngineFord(f350rows),
    hitchTable: FORD_HITCH.filter((h) => /F-350|Tremor/.test(h.model)),
    notes: [fordNote], fordFifthPending, footnotes: [],
  });
  emit('ford-f450-2026.ts', {
    slug: 'ford-f450-towing-capacity', make: 'Ford', model: 'F-450', year: 2026, kind: 'ford-conv', verified: false,
    source: 'ford-guide-2026', sourceName: 'Ford, 2026 RV & Trailer Towing Guide', readDate: '2026-10-25', pages: 'p. 24',
    rows: f450rows, maxByEngine: maxByEngineFord(f450rows),
    hitchTable: FORD_HITCH.filter((h) => /F-450/.test(h.model)),
    notes: [fordNote], fordFifthPending, footnotes: [],
  });
  emit('ram-2500-2026.ts', {
    slug: 'ram-2500-towing-capacity', make: 'Ram', model: '2500', year: 2026, kind: 'ram', verified: false,
    source: 'ram-hd-chart-2026', sourceName: 'Ram, 2026 Ram Heavy Duty Payload & Towing Weight Capacities', readDate: '2026-10-25', pages: 'p. 1',
    rows: ram2500, maxByEngine: maxByEngineRam(ram2500),
    payloadRows: ramPay.rows.filter((r) => r.group === '2500'),
    notes: [ramNote, 'A 5th-wheel or gooseneck hitch is required for trailers over 20,000 lb.', 'Maximum tongue weight with the Class V receiver is 2,000 lb.'],
    footnotes: [{ marker: '*', text: 'Includes the available factory on-board generator; see the chart.' }],
  });
  emit('ram-3500-2026.ts', {
    slug: 'ram-3500-towing-capacity', make: 'Ram', model: '3500', year: 2026, kind: 'ram', verified: false,
    source: 'ram-hd-chart-2026', sourceName: 'Ram, 2026 Ram Heavy Duty Payload & Towing Weight Capacities', readDate: '2026-10-25', pages: 'p. 1',
    rows: ram3500, maxByEngine: maxByEngineRam(ram3500),
    payloadRows: ramPay.rows.filter((r) => r.group === '3500'),
    notes: [ramNote, 'A 5th-wheel or gooseneck hitch is required for trailers over 23,000 lb.', 'Maximum tongue weight with the Class V receiver is 2,300 lb.'],
    footnotes: [{ marker: '*', text: 'Includes the available factory on-board generator; see the chart.' }],
  });
  // Resolve the footnote markers that actually appear in a vehicle's rows against
  // each row's OWN page legend (p.35's 4/5 differ from p.37's). De-dupe by text.
  const gmFootnotesFor = (vrows) => {
    const seen = new Map();
    for (const r of vrows)
      for (const m of r.gnFoot || []) {
        const text = (gmLegend[r.pageNum] || {})[m];
        if (text && !seen.has(text)) seen.set(text, { marker: m, page: r.pageNum, text });
      }
    return [...seen.values()];
  };
  const gm2500note =
    "GM prints a lower 5th-wheel/gooseneck rating than conventional on a few light-GVWR configurations. We show GM's numbers as printed.";
  emit('chevy-silverado-2500hd-2026.ts', {
    slug: 'chevy-silverado-2500hd-towing-capacity', make: 'Chevrolet', model: 'Silverado 2500 HD', year: 2026, kind: 'gm', verified: false,
    source: 'gm-guide-2026', sourceName: 'Chevrolet, 2026 Trailering Guide', readDate: '2026-10-25', pages: 'pp. 31–36',
    rows: gm2500rows, maxByEngine: maxByEngineGm(gm2500rows),
    notes: [gmNote, gm2500note, 'Z82 Trailering Package adds a hitch platform and a 7-pin connector. UY2 adds a 7-wire camper/fifth-wheel harness and requires Z82.'],
    footnotes: gmFootnotesFor(gm2500rows),
  });
  emit('chevy-silverado-3500hd-2026.ts', {
    slug: 'chevy-silverado-3500hd-towing-capacity', make: 'Chevrolet', model: 'Silverado 3500 HD', year: 2026, kind: 'gm', verified: false,
    source: 'gm-guide-2026', sourceName: 'Chevrolet, 2026 Trailering Guide', readDate: '2026-10-25', pages: 'pp. 37–40',
    rows: gm3500rows, maxByEngine: maxByEngineGm(gm3500rows),
    notes: [gmNote, 'The Z6A Gooseneck/5th-Wheel Prep Package adds a hitch platform ready for a gooseneck ball or fifth-wheel hitch.'],
    footnotes: gmFootnotesFor(gm3500rows),
  });

  if (gmDeferred.length) {
    console.log('\nGM pages deferred to follow-up (failed conv<=gn invariant):');
    for (const d of gmDeferred) console.log('  ' + d);
  }
  console.log('\nwrote verify/hd-extract.csv and 7 data files');
  console.log(`row counts: F-250=${f250rows.length} F-350=${f350rows.length} F-450=${f450rows.length} Ram2500=${ram2500.length} Ram3500=${ram3500.length} GM2500=${gm2500rows.length} GM3500=${gm3500rows.length}`);
  console.log(`Ram payload rows=${ramPay.rows.length} (dropped ${ramPay.dropped} NA)`);
  console.log('\n=== Max by engine ===');
  const showFord = (name, list) => {
    console.log(`\n[${name}]`);
    for (const m of maxByEngineFord(list)) console.log(`  ${m.engine}: conv ${fmt(m.conventional.value)} (${m.conventional.config})`);
  };
  showFord('F-250', f250rows);
  showFord('F-350', f350rows);
  showFord('F-450', f450rows);
  for (const [name, list] of [['Ram 2500', ram2500], ['Ram 3500', ram3500]]) {
    console.log(`\n[${name}]`);
    for (const m of maxByEngineRam(list)) console.log(`  ${m.engine}: trailer ${fmt(m.trailer.value)} (${m.trailer.config})`);
  }
  for (const [name, list] of [['GM 2500', gm2500rows], ['GM 3500', gm3500rows]]) {
    console.log(`\n[${name}]`);
    for (const m of maxByEngineGm(list)) console.log(`  ${m.engine}: conv ${m.conventional ? fmt(m.conventional.value) : '-'} | GN/5th ${m.gooseneck ? fmt(m.gooseneck.value) : '-'} (${m.gooseneck?.config || m.conventional?.config})`);
  }

  if (process.argv.includes('--check')) {
    const cols = SRW_CONV_COLS.map((c) => `${c.cab} ${c.drive} ${c.wheelbase}`);
    const byRow = new Map();
    for (const r of f350conv) {
      if (!byRow.has(r.rowLabel)) byRow.set(r.rowLabel, {});
      byRow.get(r.rowLabel)[r.colLabel] = r.raw + (r.footnotes.length ? '^' + r.footnotes.join(',') : '');
    }
    console.log('\n--- F-350 SRW p.22 ---');
    for (const [k, c2] of byRow) console.log(k + '  ||  ' + cols.map((c) => c2[c] ?? '').join(' | '));
  }
}
