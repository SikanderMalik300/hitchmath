import type { HistoryTable, SimpleTable } from '@/lib/data/vehicles/types';
import { getSource } from '@/lib/data/sources';

/** Year-history table with per-row source links (server-rendered). */
export function HistoryTableView({ table, caption }: { table: HistoryTable; caption?: string }) {
  return (
    <div className="overflow-x-auto rounded-card border border-line">
      <table className="w-full border-collapse text-small">
        {caption && (
          <caption className="caption-bottom px-4 py-3 text-left text-muted">{caption}</caption>
        )}
        <thead>
          <tr className="border-b border-line">
            {table.columns.map((c) => (
              <th key={c} scope="col" className="px-3 py-2 text-left font-medium text-muted">
                {c}
              </th>
            ))}
            <th scope="col" className="px-3 py-2 text-left font-medium text-muted">
              Source
            </th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r, i) => (
            <tr key={i} className="border-b border-line last:border-0">
              {r.cells.map((cell, j) => (
                <td key={j} className="px-3 py-2 align-top text-ink">
                  {cell}
                </td>
              ))}
              <td className="px-3 py-2 align-top">
                {r.sources.map((sid, k) => {
                  const s = getSource(sid);
                  return (
                    <span key={sid}>
                      {k > 0 && ', '}
                      <a href={s.url} target="_blank" rel="noopener" className="link">
                        {s.name}
                      </a>
                    </span>
                  );
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Plain reference table with one source note (server-rendered). */
export function SimpleTableView({ table }: { table: SimpleTable }) {
  const src = table.sourceId ? getSource(table.sourceId) : null;
  return (
    <div className="overflow-x-auto rounded-card border border-line">
      <table className="w-full border-collapse text-small">
        {(table.caption || src) && (
          <caption className="caption-bottom px-4 py-3 text-left text-muted">
            {table.caption}
            {src && (
              <>
                {' '}
                Source:{' '}
                <a href={src.url} target="_blank" rel="noopener" className="link">
                  {src.name}
                </a>
                , read {src.accessed}.
              </>
            )}
          </caption>
        )}
        <thead>
          <tr className="border-b border-line">
            {table.columns.map((c, i) => (
              <th
                key={c}
                scope="col"
                className={`px-3 py-2 text-left font-medium text-muted ${i >= 2 ? 'text-right' : ''}`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r, i) => (
            <tr key={i} className="border-b border-line last:border-0">
              {r.map((cell, j) => (
                <td
                  key={j}
                  className={`px-3 py-2 align-top text-ink ${j >= 2 ? 'text-right tabular' : ''}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A generic reference table used inside tool pages (string matrix). */
export function RefTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: React.ReactNode[][];
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-card border border-line">
      <table className="w-full border-collapse text-small">
        {caption && (
          <caption className="caption-bottom px-4 py-3 text-left text-muted">{caption}</caption>
        )}
        <thead>
          <tr className="border-b border-line">
            {columns.map((c) => (
              <th key={c} scope="col" className="px-3 py-2 text-left font-medium text-muted">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-line last:border-0">
              {r.map((cell, j) => (
                <td key={j} className="px-3 py-2 align-top text-ink">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
