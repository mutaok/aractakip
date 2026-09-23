import { differenceInDays, format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';

export type DateStatus = 'expired' | 'critical' | 'warning' | 'safe';

export function getDateStatus(dateStr: string): DateStatus {
  const today = new Date();
  const targetDate = parseISO(dateStr);
  const daysDiff = differenceInDays(targetDate, today);

  if (daysDiff < 0) return 'expired';
  if (daysDiff <= 15) return 'critical';
  if (daysDiff <= 30) return 'warning';
  return 'safe';
}

export function formatDate(dateStr: string): string {
  const date = parseISO(dateStr);
  return format(date, 'dd MMM yyyy', { locale: tr });
}

export function getDaysRemaining(dateStr: string): number {
  const today = new Date();
  const targetDate = parseISO(dateStr);
  return differenceInDays(targetDate, today);
}

export function getStatusLabel(status: DateStatus): string {
  switch (status) {
    case 'expired':
      return 'Süresi Geçmiş';
    case 'critical':
      return 'Kritik';
    case 'warning':
      return 'Yaklaşıyor';
    case 'safe':
      return 'Güncel';
  }
}
