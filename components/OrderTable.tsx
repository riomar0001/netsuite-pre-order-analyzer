import type { RowData } from '../lib/types';
import { COLUMNS, CONSTRAINTS } from '../lib/constants';

type Props = {
  rows: RowData[];
  selectedRow: RowData | null;
  onSelectRow: (row: RowData | null) => void;
  getRowBg: (row: RowData, i: number, isSelected: boolean) => string;
};

export function OrderTable({ rows, selectedRow, onSelectRow, getRowBg }: Props) {
  return (
    <div className="flex-1 min-w-0 overflow-auto">
      <table className="text-xs text-left border-collapse w-full">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 sticky top-0 z-10">
          <tr>
            <th className="px-3 py-2 font-semibold whitespace-nowrap border-r border-slate-200 text-slate-400 text-right w-16 min-w-16">#</th>
            {COLUMNS.map(col => {
              const c = CONSTRAINTS[col.key];
              return (
                <th key={col.key} className="px-3 py-2 font-semibold whitespace-nowrap border-r border-slate-200 last:border-r-0">
                  <div>{col.label}</div>
                  {c && <div className="text-slate-400 font-normal text-xs">{c.type}{c.max ? ' <=' + c.max : ''}{c.min ? ' >=' + c.min : ''}</div>}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isSelected = !!selectedRow && selectedRow.rowIndex === row.rowIndex;
            return (
              <tr
                key={i}
                className={'border-b border-slate-100 transition-colors cursor-pointer ' + getRowBg(row, i, isSelected)}
                onClick={() => onSelectRow(isSelected ? null : row)}
              >
                <td className="px-3 py-1.5 border-r border-slate-100 text-slate-400 text-right tabular-nums select-none w-16 min-w-16">{i + 1}</td>
                {COLUMNS.map(col => {
                  const cellViol = row.fieldErrors?.[col.key];
                  return (
                    <td
                      key={col.key}
                      className={
                        'px-3 py-1.5 whitespace-nowrap border-r border-slate-100 last:border-r-0 ' +
                        (col.mono   ? 'font-mono '   : '') +
                        (col.center ? 'text-center ' : '') +
                        (cellViol   ? 'bg-orange-200 text-orange-900 font-medium' : 'text-slate-700')
                      }
                      title={cellViol ? cellViol.join('; ') : undefined}
                    >
                      {row[col.key as keyof RowData] as string}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
