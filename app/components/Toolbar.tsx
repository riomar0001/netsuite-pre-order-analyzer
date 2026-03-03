import { UploadCloud, X } from 'lucide-react';

type Props = {
  analyzed: boolean;
  fileName: string;
  fileKey: number;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

export function Toolbar({ analyzed, fileName, fileKey, onFileUpload, onClear }: Props) {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Order Analyzer</h1>
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
