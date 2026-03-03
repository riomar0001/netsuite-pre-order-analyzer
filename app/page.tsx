'use client';

import { UploadCloud } from 'lucide-react';
import { useAnalysis } from './hooks/useAnalysis';
import { Toolbar } from './components/Toolbar';
import { StatusBar } from './components/StatusBar';
import { AnalyticsBar } from './components/AnalyticsBar';
import { OrderTable } from './components/OrderTable';
import { Sidebar } from './components/Sidebar';

export default function MkoAnalyzer() {
  const {
    rows, mkoErrors, analyzed, fileName, fileKey, selectedRow, setSelectedRow,
    handleClear, handleFileUpload,
    totalMkoErrors, totalConstraintErrors, totalErrors,
    totalOrders, multiAddrOrders, dupSkuOrders, cleanOrders,
    getRowAllErrors, groupedErrors, getRowBg,
  } = useAnalysis();

  return (
    <div className="w-full h-screen flex flex-col font-sans bg-slate-100">
      <Toolbar
        analyzed={analyzed}
        fileName={fileName}
        fileKey={fileKey}
        onFileUpload={handleFileUpload}
        onClear={handleClear}
      />

      {analyzed && (
        <StatusBar
          totalErrors={totalErrors}
          totalMkoErrors={totalMkoErrors}
          totalConstraintErrors={totalConstraintErrors}
          rowCount={rows.length}
          mkoErrorCount={Object.keys(mkoErrors).length}
          fileName={fileName}
        />
      )}

      {analyzed && rows.length > 0 && (
        <AnalyticsBar
          rowCount={rows.length}
          totalOrders={totalOrders}
          cleanOrders={cleanOrders}
          multiAddrOrders={multiAddrOrders}
          dupSkuOrders={dupSkuOrders}
          totalConstraintErrors={totalConstraintErrors}
        />
      )}

      {analyzed && rows.length > 0 ? (
        <div className="flex flex-1 min-h-0">
          <OrderTable
            rows={rows}
            selectedRow={selectedRow}
            onSelectRow={setSelectedRow}
            getRowBg={getRowBg}
          />
          <Sidebar
            selectedRow={selectedRow}
            onClearSelection={() => setSelectedRow(null)}
            totalErrors={totalErrors}
            groupedErrors={groupedErrors}
            getRowAllErrors={getRowAllErrors}
            onSelectRow={setSelectedRow}
          />
        </div>
      ) : !analyzed ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400">
          <UploadCloud className="w-14 h-14 text-slate-300" />
          <div className="text-center">
            <div className="text-base font-medium text-slate-500">No file uploaded</div>
            <div className="text-sm mt-1">Click &quot;Upload File&quot; above to get started</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
