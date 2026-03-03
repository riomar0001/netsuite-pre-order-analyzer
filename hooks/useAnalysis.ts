'use client';

import { useState, useMemo, useEffect } from 'react';
import type { RowData, OrderError, AllError, GroupEntry } from '../lib/types';
import { CONSTRAINTS } from '../lib/constants';
import { parseTsvFile } from '../lib/parseFile';

export function useAnalysis() {
  const [rows, setRows]               = useState<RowData[]>([]);
  const [mkoErrors, setMkoErrors]     = useState<Record<string, OrderError[]>>({});
  const [analyzed, setAnalyzed]       = useState(false);
  const [fileName, setFileName]       = useState('');
  const [fileKey, setFileKey]         = useState(0);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedRow(null); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleClear = () => {
    setRows([]); setMkoErrors({}); setAnalyzed(false);
    setFileName(''); setFileKey(k => k + 1); setSelectedRow(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setSelectedRow(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = (e.target as FileReader).result as string;
      const { rows: parsedRows, mkoErrors: foundErrors } = parseTsvFile(result);
      setRows(parsedRows);
      setMkoErrors(foundErrors);
      setAnalyzed(true);
    };
    reader.readAsText(file);
  };

  // ── Derived counts ──────────────────────────────────────────────────────────
  const totalMkoErrors        = useMemo(() => Object.values(mkoErrors).flat().length, [mkoErrors]);
  const totalConstraintErrors = useMemo(() => rows.filter(r => r.fieldErrors).length, [rows]);
  const totalErrors            = totalMkoErrors + totalConstraintErrors;
  const totalOrders            = useMemo(() => new Set(rows.map(r => r.mko)).size, [rows]);
  const multiAddrOrders        = useMemo(() => Object.values(mkoErrors).filter(errs => errs.some(e => e.type === 'Multiple Addresses')).length, [mkoErrors]);
  const dupSkuOrders           = useMemo(() => Object.values(mkoErrors).filter(errs => errs.some(e => e.type === 'Duplicate SKU')).length, [mkoErrors]);
  const cleanOrders            = totalOrders - Object.keys(mkoErrors).length;

  // ── Row-level helpers ────────────────────────────────────────────────────────
  const getRowMkoErrors = (mko: string, sku: string): OrderError[] => {
    if (!mkoErrors[mko]) return [];
    return mkoErrors[mko].filter(e =>
      e.type === 'Multiple Addresses' || (e.type === 'Duplicate SKU' && e.sku === sku)
    );
  };

  const getRowAllErrors = (row: RowData): AllError[] => {
    const all: AllError[] = [];
    getRowMkoErrors(row.mko, row.sku).forEach(e => {
      all.push({
        category: e.type,
        field: null,
        message: e.details,
        addresses: e.type === 'Multiple Addresses' ? e.addresses : undefined,
      });
    });
    if (row.fieldErrors)
      Object.entries(row.fieldErrors).forEach(([fkey, msgs]) =>
        msgs.forEach(m => all.push({
          category: 'Constraint',
          field: CONSTRAINTS[fkey]?.label ?? fkey,
          message: m,
        }))
      );
    return all;
  };

  const groupedErrors = useMemo<Record<string, GroupEntry>>(() => {
    const groups: Record<string, GroupEntry> = {};
    rows.forEach(row => {
      const mkoErrs = getRowMkoErrors(row.mko, row.sku);
      const hasAny  = mkoErrs.length > 0 || !!row.fieldErrors;
      if (!hasAny) return;
      if (!groups[row.mko]) groups[row.mko] = { orderErrors: mkoErrors[row.mko] || [], constraintRows: [] };
      if (row.fieldErrors) groups[row.mko].constraintRows.push(row);
    });
    return groups;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, mkoErrors]);

  const getRowBg = (row: RowData, i: number, isSelected: boolean): string => {
    const mkoErrs = getRowMkoErrors(row.mko, row.sku);
    const hasAddr = mkoErrs.some(e => e.type === 'Multiple Addresses');
    const hasSku  = mkoErrs.some(e => e.type === 'Duplicate SKU');
    const hasCons = !!row.fieldErrors;
    if (isSelected) return 'bg-blue-100';
    if (hasAddr)    return 'bg-red-50 hover:bg-red-100';
    if (hasSku)     return 'bg-amber-50 hover:bg-amber-100';
    if (hasCons)    return 'bg-orange-50 hover:bg-orange-100';
    return i % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/50 hover:bg-slate-100';
  };

  return {
    // state
    rows, mkoErrors, analyzed, fileName, fileKey, selectedRow, setSelectedRow,
    // handlers
    handleClear, handleFileUpload,
    // counts
    totalMkoErrors, totalConstraintErrors, totalErrors,
    totalOrders, multiAddrOrders, dupSkuOrders, cleanOrders,
    // row helpers
    getRowMkoErrors, getRowAllErrors, groupedErrors, getRowBg,
  };
}
