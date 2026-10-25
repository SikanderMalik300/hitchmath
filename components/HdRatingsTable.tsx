'use client';

import { useMemo, useState } from 'react';
import { fmt } from '@/lib/format';
import type { HdVehicle, HdRow } from '@/lib/data/vehicles/hd/hd-types';
import { SelectField } from './calculators/calc-ui';

// Strip the "^f,f" footnote suffix the extractor stores on axle strings.
function axleText(a?: string): string {
  return a ? a.replace(/\^.*$/, '') : '';
}
function sup(markers?: string[]) {
  if (!markers || !markers.length) return null;
  return <sup className="text-muted">{markers.join(',')}</sup>;
}

function cabOf(r: HdRow): string {
  // Every kind stores an explicit cab (GM's comes from the table's header bar).
  return (r.cab ?? '') as string;
}
function driveOf(r: HdRow, kind: string): string {
  if (kind === 'gm') return (r.model || '').match(/4x4|2WD/)?.[0] ?? '';
  return r.drive ?? '';
}

interface Col {
  h: string;
  num?: boolean;
  cell: (r: HdRow) => React.ReactNode;
}

function columnsFor(kind: string): Col[] {
  if (kind === 'ford-conv') {
    return [
      { h: 'Body', cell: (r) => `${r.model ? r.model + ' ' : ''}${r.cab}` },
      { h: 'Drive', cell: (r) => r.drive },
      { h: 'Wheelbase', cell: (r) => r.wheelbase },
      { h: 'Box', cell: (r) => r.box },
      { h: 'Engine', cell: (r) => r.engine },
      { h: 'Axle', cell: (r) => axleText(r.axle) },
      { h: 'GCWR (lb)', num: true, cell: (r) => fmt(r.gcwr) },
      {
        h: 'Max conventional (lb)',
        num: true,
        cell: (r) => (
          <>
            {r.raw}
            {sup(r.footnotes)}
          </>
        ),
      },
    ];
  }
  if (kind === 'gm') {
    return [
      { h: 'Cab', cell: (r) => r.cab },
      { h: 'Model', cell: (r) => r.model },
      { h: 'Engine', cell: (r) => r.engine },
      { h: 'Wheel', cell: (r) => r.wheel },
      { h: 'GVWR (lb)', num: true, cell: (r) => fmt(r.gvwr) },
      { h: 'GCWR (lb)', num: true, cell: (r) => fmt(r.gcwr) },
      { h: 'Max conventional (lb)', num: true, cell: (r) => fmt(r.conv) },
      {
        h: 'Max 5th-wheel / gooseneck (lb)',
        num: true,
        cell: (r) => (
          <>
            {r.gnRaw}
            {sup(r.gnFoot)}
          </>
        ),
      },
    ];
  }
  // ram
  return [
    { h: 'Cab', cell: (r) => r.cab },
    { h: 'Bed', cell: (r) => r.bed },
    { h: 'Drive', cell: (r) => r.drive },
    { h: 'Engine', cell: (r) => r.engine },
    { h: 'Axle', cell: (r) => r.axle },
    { h: 'GVWR (lb)', num: true, cell: (r) => fmt(r.gvwr) },
    { h: 'GCWR (lb)', num: true, cell: (r) => fmt(r.gcwr) },
    {
      h: 'Max trailer (lb)',
      num: true,
      cell: (r) => (
        <>
          {fmt(r.maxTrailer)}
          {sup(r.footnotes)}
        </>
      ),
    },
    { h: 'Note', cell: (r) => (r.note as string) ?? '' },
  ];
}

const ALL = 'All';

export default function HdRatingsTable({ data }: { data: HdVehicle }) {
  const { kind, rows } = data;
  const cols = useMemo(() => columnsFor(kind), [kind]);
  const cabs = useMemo(() => [ALL, ...Array.from(new Set(rows.map((r) => cabOf(r)).filter(Boolean)))], [rows]);
  const drives = useMemo(() => [ALL, ...Array.from(new Set(rows.map((r) => driveOf(r, kind)).filter(Boolean)))], [rows, kind]);
  const [cab, setCab] = useState(ALL);
  const [drive, setDrive] = useState(ALL);

  const shown = rows.filter((r) => (cab === ALL || cabOf(r) === cab) && (drive === ALL || driveOf(r, kind) === drive));
  const caption = `${data.year} ${data.make} ${data.model} towing ratings by configuration. Source: ${data.sourceName}, read ${data.readDate}.`;

  return (
    <div>
      <div className="mb-3 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
        <SelectField id="hd-cab" label="Cab" value={cab} onChange={setCab} options={cabs.map((c) => ({ value: c, label: c }))} />
        <SelectField id="hd-drive" label="Drive" value={drive} onChange={setDrive} options={drives.map((d) => ({ value: d, label: d }))} />
      </div>
      {/* Table scrolls inside its own container; the page never scrolls sideways. */}
      <div className="overflow-x-auto rounded-card border border-line">
        <table className="w-full border-collapse text-small">
          <caption className="caption-bottom px-4 py-3 text-left text-muted">{caption}</caption>
          <thead>
            <tr className="border-b border-line">
              {cols.map((c, i) => (
                <th
                  key={c.h}
                  scope="col"
                  className={`whitespace-nowrap px-3 py-2 align-bottom font-medium text-muted ${i === 0 ? 'sticky left-0 z-10 bg-surface text-left' : c.num ? 'text-right' : 'text-left'}`}
                >
                  {c.h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id} className="border-b border-line last:border-0">
                {cols.map((c, i) => (
                  <td
                    key={c.h}
                    className={`whitespace-nowrap px-3 py-2 align-top text-ink ${i === 0 ? 'sticky left-0 z-10 bg-surface font-medium' : c.num ? 'text-right tabular' : ''}`}
                  >
                    {c.cell(r)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {shown.length === 0 && <p className="mt-2 text-small text-muted">No configurations match those filters.</p>}
      <p className="mt-2 text-small text-muted">
        Showing {shown.length} of {rows.length} configurations.
      </p>
    </div>
  );
}
