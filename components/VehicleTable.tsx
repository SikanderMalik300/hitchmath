'use client';

import { useMemo, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { VehicleData, VehicleRow, ColumnKey } from '@/lib/data/vehicles/types';
import { cellValue } from '@/lib/data/vehicles/types';
import { getSource } from '@/lib/data/sources';

export default function VehicleTable({ data }: { data: VehicleData }) {
  const [sortKey, setSortKey] = useState<ColumnKey | null>(null);
  const [dir, setDir] = useState<'asc' | 'desc'>('desc');
  const src = getSource(data.source);

  const numericByKey: Partial<Record<ColumnKey, keyof VehicleRow>> = {
    gcwr: 'gcwr',
    maxTrailer: 'maxTrailer',
    maxTongue: 'maxTongue',
    payload: 'payload',
    curbWeight: 'curbWeight',
    gvwr: 'gvwr',
  };

  const rows = useMemo(() => {
    if (!sortKey) return data.rows;
    const field = numericByKey[sortKey];
    const copy = [...data.rows];
    copy.sort((a, b) => {
      let cmp: number;
      if (field) {
        cmp = ((a[field] as number) ?? 0) - ((b[field] as number) ?? 0);
      } else {
        cmp = cellValue(a, sortKey).localeCompare(cellValue(b, sortKey));
      }
      return dir === 'asc' ? cmp : -cmp;
    });
    return copy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.rows, sortKey, dir]);

  const toggleSort = (key: ColumnKey) => {
    if (sortKey === key) {
      setDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setDir('desc');
    }
  };

  return (
    <div className="overflow-x-auto rounded-card border border-line">
      <table className="w-full border-collapse text-small">
        <caption className="caption-bottom px-4 py-3 text-left text-small text-muted">
          {data.year} {data.make} {data.model} towing capacity by configuration. Source: {src.name},
          read {data.readDate ?? src.accessed}.
          {data.tableNote && <span className="mt-1 block">{data.tableNote}</span>}
        </caption>
        <thead>
          <tr className="border-b border-line">
            {data.columns.map((col, i) => {
              const sortable = col.numeric === true;
              const active = sortKey === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  className={`whitespace-nowrap px-3 py-2 text-left align-bottom font-medium text-muted ${
                    i === 0 ? 'sticky left-0 z-10 bg-surface' : ''
                  } ${col.numeric ? 'text-right' : ''}`}
                >
                  {sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className="inline-flex items-center gap-1 font-medium text-muted hover:text-brand"
                      aria-label={`Sort by ${col.header}`}
                    >
                      {col.header}
                      {active ? (
                        dir === 'asc' ? (
                          <ChevronUp className="h-3.5 w-3.5" strokeWidth={1.5} />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
                        )
                      ) : null}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line last:border-0">
              {data.columns.map((col, i) => (
                <td
                  key={col.key}
                  className={`px-3 py-2 align-top text-ink ${
                    i === 0 ? 'sticky left-0 z-10 bg-surface font-medium' : ''
                  } ${col.numeric ? 'text-right tabular' : ''}`}
                >
                  {cellValue(row, col.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
