import { DateStatus } from '../utils/dateUtils';

interface StatusBadgeProps {
  status: DateStatus;
  label: string;
  daysRemaining: number;
}

export default function StatusBadge({ status, label, daysRemaining }: StatusBadgeProps) {
  const baseClasses = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold';

  const statusClasses: Record<DateStatus, string> = {
    expired: 'bg-red-100 text-red-800 border border-red-200',
    critical: 'bg-red-50 text-red-700 border border-red-200 animate-pulse',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    safe: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  };

  const dotClasses: Record<DateStatus, string> = {
    expired: 'bg-red-500',
    critical: 'bg-red-500 animate-pulse',
    warning: 'bg-amber-500',
    safe: 'bg-emerald-500',
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClasses[status]}`}></span>
      {label}
      {daysRemaining < 30 && (
        <span className="ml-0.5 text-[10px] opacity-75">
          ({daysRemaining < 0 ? `${Math.abs(daysRemaining)} gün geçti` : `${daysRemaining} gün`})
        </span>
      )}
    </span>
  );
}
