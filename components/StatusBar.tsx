import { AlertCircle, CheckCircle2, FileText } from 'lucide-react';

type Props = {
  totalErrors: number;
  totalMkoErrors: number;
  totalConstraintErrors: number;
  rowCount: number;
  mkoErrorCount: number;
  fileName: string;
};

export function StatusBar({ totalErrors, totalMkoErrors, totalConstraintErrors, rowCount, mkoErrorCount, fileName }: Props) {
  const isClean = totalErrors === 0;
  return (
    <div className={'px-6 py-2 text-xs flex items-center gap-2 shrink-0 ' + (isClean ? 'bg-green-50 border-b border-green-200 text-green-700' : 'bg-red-50 border-b border-red-200 text-red-700')}>
      {isClean ? (
        <><CheckCircle2 className="w-3.5 h-3.5" /><span className="font-medium">All Clear</span> {rowCount} rows, no issues found.</>
      ) : (
        <>
          <AlertCircle className="w-3.5 h-3.5" />
          <span className="font-medium">{totalErrors} issue(s)</span> across {rowCount} rows
          {totalMkoErrors > 0 && <span className="ml-1">/ {totalMkoErrors} MKO error(s) in {mkoErrorCount} order(s)</span>}
          {totalConstraintErrors > 0 && <span className="ml-1">/ {totalConstraintErrors} constraint violation(s)</span>}
          <span className="ml-2 text-slate-500">Click a row to inspect.</span>
        </>
      )}
      {fileName && <span className="ml-auto flex items-center gap-1 text-slate-400"><FileText className="w-3 h-3" />{fileName}</span>}
    </div>
  );
}
