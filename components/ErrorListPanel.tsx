import { CheckCircle2 } from 'lucide-react';
import type { RowData, GroupEntry } from '../lib/types';
import { CONSTRAINTS, badgeColor, badgeShort } from '../lib/constants';

type Props = {
  totalErrors: number;
  groupedErrors: Record<string, GroupEntry>;
  onSelectRow: (row: RowData) => void;
};

export function ErrorListPanel({ totalErrors, groupedErrors, onSelectRow }: Props) {
  if (totalErrors === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-10">
        <CheckCircle2 className="w-10 h-10 text-green-400" />
        <div className="text-sm font-medium text-slate-600">All Clear!</div>
        <div className="text-xs text-slate-400">No issues found in this file.</div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100">
      {Object.entries(groupedErrors).map(([mko, group]) => (
        <OrderErrorGroup key={mko} mko={mko} group={group} onSelectRow={onSelectRow} />
      ))}
    </div>
  );
}

function OrderErrorGroup({ mko, group, onSelectRow }: { mko: string; group: GroupEntry; onSelectRow: (row: RowData) => void }) {
  const totalIssues = group.orderErrors.length + group.constraintRows.reduce(
    (acc: number, r: RowData) => acc + Object.keys(r.fieldErrors!).length, 0
  );
  const headerTypes = new Set<string>();
  group.orderErrors.forEach(e => headerTypes.add(e.type));
  if (group.constraintRows.length > 0) headerTypes.add('Constraint');

  return (
    <div className="px-4 py-3 space-y-1.5">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold text-slate-800 text-xs flex-1 truncate">{mko}</span>
        <span className="flex gap-1 shrink-0">
          {[...headerTypes].map(t => (
            <span key={t} className={'rounded-full px-1.5 py-0.5 font-semibold text-xs ' + badgeColor(t)}>{badgeShort(t)}</span>
          ))}
        </span>
        <span className="text-xs text-slate-400 tabular-nums shrink-0">{totalIssues}</span>
      </div>

      {group.orderErrors.map((err, i) => (
        <div key={'oe' + i} className="text-xs space-y-1">
          <div className="flex items-start gap-1.5">
            <span className={'rounded-full px-1.5 py-0.5 font-semibold shrink-0 ' + badgeColor(err.type)}>{badgeShort(err.type)}</span>
            <span className="text-slate-600 leading-4 mt-0.5">{err.details}</span>
          </div>
          {err.type === 'Multiple Addresses' && (
            <div className="ml-1 space-y-1.5 pl-2 border-l-2 border-red-200">
              {err.addresses.map((a, ai) => (
                <div key={ai} className="text-slate-500 leading-4">
                  <div>{a.addr1}{a.addr2 ? ', ' + a.addr2 : ''}</div>
                  <div>{a.city}, {a.state} {a.zip}{a.country ? ' ' + a.country : ''}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {group.constraintRows.map((row, ri) => (
        <div
          key={'cr' + ri}
          className="rounded border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors"
          onClick={() => onSelectRow(row)}
        >
          <div className="font-mono text-slate-700 font-medium mb-1.5">{row.sku || '-'}</div>
          <div className="space-y-1">
            {Object.entries(row.fieldErrors!).map(([fkey, msgs]) => (
              <div key={fkey} className="flex items-start gap-1.5">
                <span className="rounded-full px-1.5 py-0.5 font-semibold bg-orange-100 text-orange-800 shrink-0 whitespace-nowrap">Constraint</span>
                <span className="text-slate-600 leading-4 mt-0.5">
                  <span className="font-medium">{CONSTRAINTS[fkey]?.label ?? fkey}:</span> {(msgs as string[])[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
