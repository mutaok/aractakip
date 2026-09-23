import { AlertTriangle, ShieldAlert, Wrench, CalendarX, TrendingUp, TrendingDown } from 'lucide-react';

interface SummaryCardsProps {
  expiredCount: number;
  criticalCount: number;
  maintenanceDue: number;
  totalVehicles: number;
}

export default function SummaryCards({
  expiredCount,
  criticalCount,
  maintenanceDue,
  totalVehicles,
}: SummaryCardsProps) {
  const cards = [
    {
      title: 'Süresi Geçen',
      value: expiredCount,
      icon: AlertTriangle,
      color: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600',
      textColor: 'text-red-700',
      description: 'Acil aksiyon gerekli',
      trend: 'urgent',
    },
    {
      title: 'Kritik Süre',
      value: criticalCount,
      icon: ShieldAlert,
      color: 'bg-amber-50 border-amber-200',
      iconColor: 'text-amber-600',
      textColor: 'text-amber-700',
      description: '30 gün içinde sonlanacak',
      trend: 'warning',
    },
    {
      title: 'Bakım Gerekli',
      value: maintenanceDue,
      icon: Wrench,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-700',
      description: 'Yaklaşan bakım',
      trend: 'info',
    },
    {
      title: 'Toplam Araç',
      value: totalVehicles,
      icon: CalendarX,
      color: 'bg-slate-50 border-slate-200',
      iconColor: 'text-slate-600',
      textColor: 'text-slate-700',
      description: 'Filo büyüklüğü',
      trend: 'neutral',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} border rounded-xl p-5 transition-all duration-200 hover:shadow-md`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`${card.iconColor} p-2 rounded-lg bg-white/70`}>
                <card.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
              </div>
            </div>
            {card.trend === 'urgent' && (
              <TrendingUp size={18} className="text-red-500" />
            )}
            {card.trend === 'warning' && (
              <TrendingUp size={18} className="text-amber-500" />
            )}
            {card.trend === 'info' && (
              <TrendingDown size={18} className="text-blue-500" />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2 ml-14">{card.description}</p>
        </div>
      ))}
    </div>
  );
}
