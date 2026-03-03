import { Stat } from './Stat';

type Props = {
  rowCount: number;
  totalOrders: number;
  cleanOrders: number;
  multiAddrOrders: number;
  dupSkuOrders: number;
  totalConstraintErrors: number;
};

export function AnalyticsBar({ rowCount, totalOrders, cleanOrders, multiAddrOrders, dupSkuOrders, totalConstraintErrors }: Props) {
  return (
    <div className="px-6 py-2 bg-white border-b border-slate-200 flex items-center gap-4 shrink-0 text-sm">
      <Stat label="Rows"   value={rowCount} />
      <div className="w-px h-6 bg-slate-200" />
      <Stat label="Orders"      value={totalOrders} />
      <Stat label="Clean"       value={cleanOrders}           color="text-green-600" />
      <Stat label="Multi Addr"  value={multiAddrOrders}       color={multiAddrOrders       > 0 ? 'text-red-600'    : undefined} />
      <Stat label="Dup SKU"     value={dupSkuOrders}          color={dupSkuOrders          > 0 ? 'text-amber-600'  : undefined} />
      <div className="w-px h-6 bg-slate-200" />
      <Stat label="Constraint Rows" value={totalConstraintErrors} color={totalConstraintErrors > 0 ? 'text-orange-600' : undefined} />
    </div>
  );
}
