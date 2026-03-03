export function Stat({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className={'font-semibold tabular-nums ' + (color ?? 'text-slate-800')}>{value}</span>
      <span className="text-slate-400">{label}</span>
    </div>
  );
}
