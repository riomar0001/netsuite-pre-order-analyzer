import { X } from 'lucide-react';
import type { RowData, AllError, GroupEntry } from '../lib/types';
import { RowDetailPanel } from './RowDetailPanel';
import { ErrorListPanel } from './ErrorListPanel';

type Props = {
  selectedRow: RowData | null;
  onClearSelection: () => void;
  totalErrors: number;
  groupedErrors: Record<string, GroupEntry>;
  getRowAllErrors: (row: RowData) => AllError[];
  onSelectRow: (row: RowData) => void;
};

export function Sidebar({ selectedRow, onClearSelection, totalErrors, groupedErrors, getRowAllErrors, onSelectRow }: Props) {
  return (
    <div className="w-xl shrink-0 border-l border-slate-200 bg-white flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-800">
          {selectedRow ? 'Row Details' : 'Errors by Order'}
        </span>
        {selectedRow ? (
          <button onClick={onClearSelection} className="text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-4 h-4" />
          </button>
        ) : (
          totalErrors > 0 && <span className="text-xs text-slate-400">{Object.keys(groupedErrors).length} order(s)</span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {selectedRow ? (
          <RowDetailPanel row={selectedRow} errors={getRowAllErrors(selectedRow)} />
        ) : (
          <ErrorListPanel totalErrors={totalErrors} groupedErrors={groupedErrors} onSelectRow={onSelectRow} />
        )}
      </div>
    </div>
  );
}
