import { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface FiltersProps {
  companies: string[];
  types: string[];
  selectedCompany: string;
  selectedType: string;
  searchQuery: string;
  onCompanyChange: (company: string) => void;
  onTypeChange: (type: string) => void;
  onSearchChange: (query: string) => void;
}

export default function Filters({
  companies,
  types,
  selectedCompany,
  selectedType,
  searchQuery,
  onCompanyChange,
  onTypeChange,
  onSearchChange,
}: FiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 w-full lg:max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Plaka, sürücü veya araç ara..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
        >
          <Filter size={16} />
          Filtrele
          <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Şirket</label>
            <select
              value={selectedCompany}
              onChange={(e) => onCompanyChange(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
            >
              <option value="">Tümü</option>
              {companies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Araç Türü</label>
            <select
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
            >
              <option value="">Tümü</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
