import { UploadCloud, X, Info } from 'lucide-react';

type Props = {
  analyzed: boolean;
  fileName: string;
  fileKey: number;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

const ABOUT_LINES = [
  'Validates TSV/TXT order files against field constraints.',
  '',
  'Detects:',
  '• Constraint violations — field length & numeric rules',
  '• Multiple Addresses — same order shipped to different addresses',
  '• Duplicate SKUs — same SKU repeated within one order',
  '',
  'Click any error row to inspect it in the detail panel.',
];

export function Toolbar({ analyzed, fileName, fileKey, onFileUpload, onClear }: Props) {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
      <div>
        <div className="flex items-center gap-1.5">
          <h1 className="text-xl font-semibold text-slate-900">Order Analyzer</h1>
          <div className="relative group">
            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-default transition-colors" />
            <div className="absolute left-0 top-5 z-50 hidden group-hover:block w-72 bg-slate-900 text-slate-100 text-xs rounded-lg shadow-xl p-3 leading-relaxed whitespace-pre-line pointer-events-none">
              {ABOUT_LINES.join('\n')}
              <div className="absolute -top-1.5 left-1 w-3 h-3 bg-slate-900 rotate-45" />
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">Upload a TSV/TXT file to validate orders</p>
      </div>
      <div className="flex items-center gap-3">
        {analyzed && (
          <div className="flex items-center gap-3 text-xs text-slate-500 mr-2">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-200 border border-red-400 inline-block" />Multi Addr</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-200 border border-amber-400 inline-block" />Dup SKU</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-orange-200 border border-orange-400 inline-block" />Constraint</span>
          </div>
        )}
        <label className="flex items-center gap-2 cursor-pointer bg-slate-900 hover:bg-slate-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors">
          <UploadCloud className="w-3.5 h-3.5" />
          Upload File
          <input key={fileKey} type="file" className="hidden" accept=".txt,.csv,.tsv" onChange={onFileUpload} />
        </label>
        {fileName && (
          <button onClick={onClear} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-300 px-3 py-2 rounded-lg transition-colors">
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>
    </div>
  );
}
