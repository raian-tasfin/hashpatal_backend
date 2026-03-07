import { format, isValid, parseISO } from 'date-fns';

export function format_date(v: Date | string): string {
  const date = typeof v === 'string' ? parseISO(v) : v;
  return isValid(date) ? format(date, 'yyyy-MM-dd') : v.toString();
}
