import { useState, useMemo } from 'react';
import { vehicles } from './data/vehicles';
import { getDateStatus, getDaysRemaining } from './utils/dateUtils';
import SummaryCards from './components/SummaryCards';
import Filters from './components/Filters';
import VehicleTable from './components/VehicleTable';
import { Truck, Building2 } from 'lucide-react';

function App() {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const companies = useMemo(() => [...new Set(vehicles.map((v) => v.company))], []);
  const types = useMemo(() => [...new Set(vehicles.map((v) => v.type))], []);

  // Filtreleme
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesCompany = !selectedCompany || vehicle.company === selectedCompany;
      const matchesType = !selectedType || vehicle.type === selectedType;
      const matchesSearch =
        !searchQuery ||
        vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCompany && matchesType && matchesSearch;
    });
  }, [selectedCompany, selectedType, searchQuery]);

  // İstatistikler
  const stats = useMemo(() => {
    let expiredCount = 0;
    let criticalCount = 0;
    let maintenanceDue = 0;

    vehicles.forEach((v) => {
      const inspectionStatus = getDateStatus(v.inspectionDate);
      const insuranceStatus = getDateStatus(v.insuranceDate);
      const maintenanceDays = getDaysRemaining(v.maintenanceDate);

      if (inspectionStatus === 'expired' || insuranceStatus === 'expired') {
        expiredCount++;
      }
      if (inspectionStatus === 'critical' || insuranceStatus === 'critical') {
        criticalCount++;
      }
      if (maintenanceDays <= 15) {
        maintenanceDue++;
      }
    });

    return { expiredCount, criticalCount, maintenanceDue, totalVehicles: vehicles.length };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-lg">
                <Truck size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Filo Yönetim Paneli</h1>
                <p className="text-xs text-gray-500">Araç Takip & Süreç Yönetimi</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <Building2 size={16} />
                <span>4 Şirket</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">FY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Summary Cards */}
        <SummaryCards
          expiredCount={stats.expiredCount}
          criticalCount={stats.criticalCount}
          maintenanceDue={stats.maintenanceDue}
          totalVehicles={stats.totalVehicles}
        />

        {/* Alert Banner */}
        {(stats.expiredCount > 0 || stats.criticalCount > 0) && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-red-800">
                Dikkat! {stats.expiredCount} araç süresi geçmiş işlem bekliyor
              </p>
              <p className="text-xs text-red-600 mt-0.5">
                {stats.criticalCount} araç daha kritik sürede • Acil aksiyon alınması gerekmektedir
              </p>
            </div>
          </div>
        )}

        {/* Filters */}
        <Filters
          companies={companies}
          types={types}
          selectedCompany={selectedCompany}
          selectedType={selectedType}
          searchQuery={searchQuery}
          onCompanyChange={setSelectedCompany}
          onTypeChange={setSelectedType}
          onSearchChange={setSearchQuery}
        />

        {/* Vehicle Table */}
        <VehicleTable vehicles={filteredVehicles} />

        {/* Footer */}
        <footer className="text-center py-4 text-xs text-gray-400">
          <p>Filo Yönetim Sistemi © 2024 • MEFA • MİLENYUM • ULAŞIM • GÜÇLÜ</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
