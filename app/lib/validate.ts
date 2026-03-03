import { CONSTRAINTS } from './constants';

/** Normalize an address field for comparison: lowercase + collapse whitespace */
export const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();

export function validateField(key: string, value: string): string[] | null {
  const c = CONSTRAINTS[key];
  if (!c) return null;
  const v: string[] = [];
  if (c.type === 'NUMERIC' && value !== '' && isNaN(Number(value)))
    v.push('Must be numeric');
  if (c.max && value.length > c.max)
    v.push('Exceeds max ' + c.max + ' chars (' + value.length + ')');
  if (c.min && value.length > 0 && value.length < c.min)
    v.push('Below min ' + c.min + ' chars (' + value.length + ')');
  return v.length > 0 ? v : null;
}

export function validateRow(row: Record<string, string>): Record<string, string[]> | null {
  const fe: Record<string, string[]> = {};
  for (const key of Object.keys(CONSTRAINTS)) {
    const viol = validateField(key, row[key] || '');
    if (viol) fe[key] = viol;
  }
  return Object.keys(fe).length > 0 ? fe : null;
}
