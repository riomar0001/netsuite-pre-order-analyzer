import { CheckCircle2 } from 'lucide-react';
import type { RowData, AllError } from '../lib/types';
import { badgeColor } from '../lib/constants';

type Props = { row: RowData; errors: AllError[] };

export function RowDetailPanel({ row, errors }: Props) {
  return (
    <div className="p-3 space-y-2">
      <div className="bg-slate-50 rounded-lg p-3 text-xs border border-slate-200">
        <div className="font-semibold text-slate-700 mb-2">{row.mko}</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-slate-600">
          <span className="text-slate-400">SKU</span>      <span className="font-mono">{row.sku}</span>
          <span className="text-slate-400">Name</span>     <span>{row.name}</span>
          <span className="text-slate-400">Qty</span>      <span>{row.qty}</span>
          <span className="text-slate-400">Address 1</span><span>{row.addr1}</span>
          <span className="text-slate-400">Address 2</span><span>{row.addr2}</span>
          <span className="text-slate-400">City</span>     <span>{row.city}</span>
          <span className="text-slate-400">State</span>    <span>{row.state}</span>
          <span className="text-slate-400">Zip</span>      <span>{row.zip}</span>
        </div>
      </div>

      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-1 pt-1">Issues</div>

      {errors.length === 0 ? (
        <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 rounded-lg p-3 border border-green-200">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> No issues on this row.
        </div>
      ) : (
        errors.map((err, idx) => (
          <div key={idx} className="rounded-lg p-2.5 text-xs border border-slate-200 bg-slate-50">
            <span className={'inline-flex rounded-full px-2 py-0.5 text-xs font-semibold mb-1 ' + badgeColor(err.category)}>
              {err.category}
            </span>
            {err.field && <div className="font-medium text-slate-700">{err.field}</div>}
            <div className="text-slate-600 mt-0.5">{err.message}</div>
            {err.addresses && (
              <div className="mt-1.5 space-y-1.5">
                {err.addresses.map((a, ai) => (
                  <div key={ai} className="pl-2 border-l-2 border-red-300 text-slate-500 leading-4">
                    <div>{a.addr1}{a.addr2 ? ', ' + a.addr2 : ''}</div>
                    <div>{a.city}, {a.state} {a.zip}{a.country ? ' ' + a.country : ''}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
