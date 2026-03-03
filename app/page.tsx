'use client';

import { useState, useCallback } from 'react';
import { UploadCloud } from 'lucide-react';
import { useAnalysis } from '../hooks/useAnalysis';
import { Toolbar } from '../components/Toolbar';
import { StatusBar } from '../components/StatusBar';
import { AnalyticsBar } from '../components/AnalyticsBar';
import { OrderTable } from '../components/OrderTable';
import { Sidebar } from '../components/Sidebar';

export default function MkoAnalyzer() {
  const {
    rows, mkoErrors, analyzed, fileName, fileKey, selectedRow, setSelectedRow,
    handleClear, handleFileUpload, handleFileDrop,
    totalMkoErrors, totalConstraintErrors, totalErrors,
    totalOrders, multiAddrOrders, dupSkuOrders, cleanOrders,
    getRowAllErrors, groupedErrors, getRowBg,
  } = useAnalysis();

  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const onDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragCounter(c => c + 1);
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragCounter(c => {
      const next = c - 1;
      if (next <= 0) setIsDragging(false);
      return next;
    });
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setDragCounter(0);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileDrop(file);
  }, [handleFileDrop]);

  return (
    <div
      className="w-full h-screen flex flex-col font-sans bg-slate-100 relative"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-sm pointer-events-none">
          <UploadCloud className="w-16 h-16 text-white mb-3" />
          <p className="text-white text-lg font-semibold">Drop file to upload</p>
          <p className="text-slate-300 text-sm mt-1">.txt, .csv, .tsv</p>
        </div>
      )}
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
            <div className="text-sm mt-1">Drop a file here, or click &quot;Upload File&quot; above</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
