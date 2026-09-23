import { Vehicle } from '../data/vehicles';
import { getDateStatus, formatDate, getDaysRemaining, getStatusLabel } from '../utils/dateUtils';
import StatusBadge from './StatusBadge';
import { Truck, Car, HardHat, Bus, ChevronRight } from 'lucide-react';

interface VehicleTableProps {
  vehicles: Vehicle[];
}

const companyColors: Record<string, string> = {
  'MEFA': 'bg-blue-100 text-blue-800',
  'MİLENYUM': 'bg-purple-100 text-purple-800',
  'ULAŞIM': 'bg-teal-100 text-teal-800',
  'GÜÇLÜ': 'bg-orange-100 text-orange-800',
};

function getTypeIcon(type: string) {
  switch (type) {
    case 'İş Makinesi':
      return <HardHat size={16} className="text-yellow-600" />;
    case 'Binek':
      return <Car size={16} className="text-green-600" />;
    case 'Kamyon':
      return <Truck size={16} className="text-blue-600" />;
    case 'Tır':
      return <Truck size={16} className="text-red-600" />;
    case 'Minibüs':
      return <Bus size={16} className="text-indigo-600" />;
    default:
      return <Truck size={16} className="text-gray-600" />;
  }
}

function getStatusDot(status: string) {
  switch (status) {
    case 'Aktif':
      return <span className="w-2 h-2 rounded-full bg-emerald-500"></span>;
    case 'Bakımda':
      return <span className="w-2 h-2 rounded-full bg-amber-500"></span>;
    case 'Arızalı':
      return <span className="w-2 h-2 rounded-full bg-red-500"></span>;
    default:
      return <span className="w-2 h-2 rounded-full bg-gray-400"></span>;
  }
}

export default function VehicleTable({ vehicles }: VehicleTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-semibold text-gray-700">
          Araç Listesi <span className="text-gray-400 font-normal">({vehicles.length} araç)</span>
        </h3>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Araç</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Şirket</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tür</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sürücü</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Muayene</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sigorta</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Bakım</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {vehicles.map((vehicle) => {
              const inspectionStatus = getDateStatus(vehicle.inspectionDate);
              const insuranceStatus = getDateStatus(vehicle.insuranceDate);
              const maintenanceStatus = getDateStatus(vehicle.maintenanceDate);

              return (
                <tr
                  key={vehicle.id}
                  className={`hover:bg-gray-50/80 transition-colors ${
                    inspectionStatus === 'expired' || insuranceStatus === 'expired'
                      ? 'bg-red-50/30'
                      : ''
                  }`}
                >
                  {/* Vehicle Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-gray-900 tracking-wide">{vehicle.plate}</span>
                        <span className="text-xs text-gray-500">
                          {vehicle.brand} {vehicle.model} ({vehicle.year})
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${companyColors[vehicle.company]}`}>
                      {vehicle.company}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(vehicle.type)}
                      <span className="text-sm text-gray-700">{vehicle.type}</span>
                    </div>
                  </td>

                  {/* Driver */}
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-700">{vehicle.driver}</span>
                  </td>

                  {/* Inspection */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">{formatDate(vehicle.inspectionDate)}</span>
                      <StatusBadge
                        status={inspectionStatus}
                        label={getStatusLabel(inspectionStatus)}
                        daysRemaining={getDaysRemaining(vehicle.inspectionDate)}
                      />
                    </div>
                  </td>

                  {/* Insurance */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">{formatDate(vehicle.insuranceDate)}</span>
                      <StatusBadge
                        status={insuranceStatus}
                        label={getStatusLabel(insuranceStatus)}
                        daysRemaining={getDaysRemaining(vehicle.insuranceDate)}
                      />
                    </div>
                  </td>

                  {/* Maintenance */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">{formatDate(vehicle.maintenanceDate)}</span>
                      <StatusBadge
                        status={maintenanceStatus}
                        label={getStatusLabel(maintenanceStatus)}
                        daysRemaining={getDaysRemaining(vehicle.maintenanceDate)}
                      />
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusDot(vehicle.status)}
                      <span className="text-sm text-gray-700">{vehicle.status}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-gray-100">
        {vehicles.map((vehicle) => {
          const inspectionStatus = getDateStatus(vehicle.inspectionDate);
          const insuranceStatus = getDateStatus(vehicle.insuranceDate);
          const maintenanceStatus = getDateStatus(vehicle.maintenanceDate);

          return (
            <div
              key={vehicle.id}
              className={`p-4 ${
                inspectionStatus === 'expired' || insuranceStatus === 'expired'
                  ? 'bg-red-50/30'
                  : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{vehicle.plate}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${companyColors[vehicle.company]}`}>
                      {vehicle.company}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {vehicle.brand} {vehicle.model} • {vehicle.driver}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  {getStatusDot(vehicle.status)}
                  <span className="text-xs text-gray-600">{vehicle.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-[10px] text-gray-500 mb-1">Muayene</p>
                  <StatusBadge
                    status={inspectionStatus}
                    label={getStatusLabel(inspectionStatus)}
                    daysRemaining={getDaysRemaining(vehicle.inspectionDate)}
                  />
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-[10px] text-gray-500 mb-1">Sigorta</p>
                  <StatusBadge
                    status={insuranceStatus}
                    label={getStatusLabel(insuranceStatus)}
                    daysRemaining={getDaysRemaining(vehicle.insuranceDate)}
                  />
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-[10px] text-gray-500 mb-1">Bakım</p>
                  <StatusBadge
                    status={maintenanceStatus}
                    label={getStatusLabel(maintenanceStatus)}
                    daysRemaining={getDaysRemaining(vehicle.maintenanceDate)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {vehicles.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-gray-500 text-sm">Filtrelere uygun araç bulunamadı.</p>
        </div>
      )}
    </div>
  );
}
