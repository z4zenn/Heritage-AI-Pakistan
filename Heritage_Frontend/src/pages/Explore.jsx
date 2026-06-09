import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RefreshCw, X, SlidersHorizontal, Map } from 'lucide-react';
import SiteCard from '../components/SiteCard';
import { siteData } from '../data/siteData';

const provinces = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Gilgit-Baltistan', 'AJK'];
const siteTypes = ['Archaeological', 'Religious/Shrine', 'Historical Fort'];
const eras = [
  'Mughal Architecture',
  'Gandhara Buddhist Art',
  'Indus Valley',
  'Islamic Heritage',
  'Sufi Shrines',
  'Hindu Heritage',
  'Central Asian/Tibetan',
  'Neolithic',
  'Kashmiri/Mughal'
];

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const provinceParam = searchParams.get('province');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(provinceParam || 'All');
  const [selectedType, setSelectedType] = useState('All');
  const [unescoOnly, setUnescoOnly] = useState(false);
  const [selectedEra, setSelectedEra] = useState('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    if (provinceParam) setSelectedProvince(provinceParam);
  }, [provinceParam]);

  const clearFilter = (type) => {
    if (type === 'province') {
      setSelectedProvince('All');
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('province');
      setSearchParams(newParams);
    }
    if (type === 'type') setSelectedType('All');
    if (type === 'unesco') setUnescoOnly(false);
    if (type === 'era') setSelectedEra('All');
    if (type === 'search') setSearchQuery('');
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedProvince('All');
    setSelectedType('All');
    setUnescoOnly(false);
    setSelectedEra('All');
    setSearchParams({});
  };

  const filteredSites = siteData.filter((site) => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          site.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          site.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvince = selectedProvince === 'All' || site.province === selectedProvince;
    const matchesType = selectedType === 'All' || site.siteType === selectedType;
    const matchesUnesco = !unescoOnly || site.unescoListed === true;
    const matchesEra = selectedEra === 'All' || site.civilizationEra === selectedEra;
    return matchesSearch && matchesProvince && matchesType && matchesUnesco && matchesEra;
  });

  /* ── Shared style tokens ── */
  const sidebarBase = "bg-[#F5F2ED] dark:bg-[#23282D] border border-[#D5CFC6] dark:border-[#3D494F]";
  const labelColor  = "text-[#1D9E75]";
  const textPrimary = "text-[#1A1E21] dark:text-[#EDE9DF]";
  const textMuted   = "text-[#6B6560] dark:text-[#C8B89A]";
  const inputBase   = "bg-[#EDEAE4] dark:bg-[#141618] border border-[#D5CFC6] dark:border-[#3D494F] text-[#1A1E21] dark:text-[#EDE9DF] focus:outline-none focus:border-[#1D9E75]";
  const chipActive  = "bg-[#1D9E75] text-[#EDE9DF] border-[#1D9E75]";
  const chipIdle    = "bg-[#EDEAE4] dark:bg-[#141618] text-[#6B6560] dark:text-[#C8B89A] border-[#D5CFC6] dark:border-[#3D494F] hover:border-[#1D9E75]";

  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`${isMobile ? '' : sidebarBase + ' rounded-2xl p-5 shadow-sm'} space-y-6`}>
      {!isMobile && (
        <div className={`flex items-center justify-between border-b border-[#D5CFC6] dark:border-[#3D494F] pb-3`}>
          <span className={`font-serif font-bold text-base ${textPrimary} flex items-center gap-1.5`}>
            <Filter className="w-4 h-4 text-[#1D9E75]" />
            <span>Filters</span>
          </span>
          <button
            onClick={clearAllFilters}
            className={`text-[10px] uppercase tracking-wider font-sans ${textMuted} hover:text-[#1D9E75] flex items-center gap-1 cursor-pointer`}
            style={{fontWeight: 500}}
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      )}

      {/* Province */}
      <div className="space-y-2">
        <span className={`text-[10px] font-sans uppercase ${labelColor} block`} style={{fontWeight: 500, letterSpacing: '0.08em'}}>Province / Region</span>
        <div className="flex flex-col gap-1.5 font-sans text-xs">
          <label className={`flex items-center gap-2 ${textPrimary} cursor-pointer`} style={{fontWeight: 500}}>
            <input type="radio" name={isMobile ? 'mob-province' : 'province'} checked={selectedProvince === 'All'} onChange={() => setSelectedProvince('All')} className="accent-[#1D9E75]" />
            <span>All Provinces</span>
          </label>
          {provinces.map((prov) => (
            <label key={prov} className={`flex items-center gap-2 ${textMuted} cursor-pointer`}>
              <input type="radio" name={isMobile ? 'mob-province' : 'province'} checked={selectedProvince === prov} onChange={() => setSelectedProvince(prov)} className="accent-[#1D9E75]" />
              <span>{prov}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Site Type */}
      <div className="space-y-2">
        <span className={`text-[10px] font-sans uppercase ${labelColor} block`} style={{fontWeight: 500, letterSpacing: '0.08em'}}>Site Type</span>
        <div className="flex flex-col gap-1.5 font-sans text-xs">
          <label className={`flex items-center gap-2 ${textPrimary} cursor-pointer`} style={{fontWeight: 500}}>
            <input type="radio" name={isMobile ? 'mob-siteType' : 'siteType'} checked={selectedType === 'All'} onChange={() => setSelectedType('All')} className="accent-[#1D9E75]" />
            <span>All Types</span>
          </label>
          {siteTypes.map((type) => (
            <label key={type} className={`flex items-center gap-2 ${textMuted} cursor-pointer`}>
              <input type="radio" name={isMobile ? 'mob-siteType' : 'siteType'} checked={selectedType === type} onChange={() => setSelectedType(type)} className="accent-[#1D9E75]" />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Era Dropdown */}
      <div className="space-y-2">
        <label htmlFor={isMobile ? 'mob-era-select' : 'era-select'} className={`text-[10px] font-sans uppercase ${labelColor} block`} style={{fontWeight: 500, letterSpacing: '0.08em'}}>
          Civilization Era
        </label>
        <div className="relative">
          <select
            id={isMobile ? 'mob-era-select' : 'era-select'}
            value={selectedEra}
            onChange={(e) => setSelectedEra(e.target.value)}
            className={`w-full px-3 py-2 ${inputBase} rounded-xl font-sans text-xs appearance-none cursor-pointer`}
            style={{fontWeight: 500}}
          >
            <option value="All">All Civilization Eras</option>
            {eras.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
          <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${textMuted} text-[10px]`}>▼</div>
        </div>
      </div>

      {/* UNESCO Toggle */}
      <div className={`border-t border-[#D5CFC6] dark:border-[#3D494F] pt-4 flex items-center justify-between`}>
        <span className={`text-[11px] font-sans uppercase ${labelColor}`} style={{fontWeight: 500, letterSpacing: '0.08em'}}>UNESCO Listed Only</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={unescoOnly} onChange={(e) => setUnescoOnly(e.target.checked)} className="sr-only peer" />
          <div className="w-9 h-5 bg-[#D5CFC6] dark:bg-[#3D494F] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1D9E75]"></div>
        </label>
      </div>

      {isMobile && (
        <button
          onClick={() => { clearAllFilters(); setShowMobileFilters(false); }}
          className={`w-full py-2.5 rounded-full ${chipIdle} text-xs font-sans uppercase mt-4 cursor-pointer border`}
          style={{fontWeight: 500}}
        >
          Reset Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 flex flex-col gap-8 select-none">
      
      {/* Page Header */}
      <div className={`border-b border-[#D5CFC6] dark:border-[#3D494F] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4`}>
        <div>
          <h1 className={`text-3xl md:text-4xl font-serif font-bold ${textPrimary}`}>
            Explore Heritage Sites
          </h1>
          <p className={`text-xs font-sans ${textMuted} mt-1`}>
            Browse through Pakistan's rich historical locations and plan your custom itinerary.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1D9E75] text-[#EDE9DF] font-sans text-xs shadow cursor-pointer"
          style={{fontWeight: 500}}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters Panel</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:block md:col-span-3">
          <FilterSidebar />
        </aside>

        {/* Results */}
        <main className="md:col-span-9 flex flex-col gap-6">
          
          {/* Search */}
          <div className="relative w-full flex items-center">
            <input
              type="text"
              id="sites-search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by monument name, civilization era, city or province..."
              className={`w-full pl-11 pr-4 py-3 ${inputBase} rounded-xl font-sans text-xs shadow-inner`}
            />
            <Search className={`absolute left-4 w-4.5 h-4.5 ${textMuted}`} />
          </div>

          {/* Active Filter Chips */}
          {(selectedProvince !== 'All' || selectedType !== 'All' || selectedEra !== 'All' || unescoOnly || searchQuery !== '') && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className={`text-[10px] font-sans uppercase ${textMuted} tracking-wide mr-1`} style={{fontWeight: 500}}>Active Filters:</span>

              {searchQuery !== '' && (
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1D9E75]/10 text-[#1D9E75] border border-[#1D9E75]/30 text-[10px] font-sans`} style={{fontWeight: 500}}>
                  <span>Search: "{searchQuery}"</span>
                  <button onClick={() => clearFilter('search')} className="hover:text-red-400 cursor-pointer"><X className="w-3 h-3" /></button>
                </div>
              )}
              {selectedProvince !== 'All' && (
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1D9E75]/10 text-[#1D9E75] border border-[#1D9E75]/30 text-[10px] font-sans`} style={{fontWeight: 500}}>
                  <span>Region: {selectedProvince}</span>
                  <button onClick={() => clearFilter('province')} className="hover:text-red-400 cursor-pointer"><X className="w-3 h-3" /></button>
                </div>
              )}
              {selectedType !== 'All' && (
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1D9E75]/10 text-[#1D9E75] border border-[#1D9E75]/30 text-[10px] font-sans`} style={{fontWeight: 500}}>
                  <span>Type: {selectedType}</span>
                  <button onClick={() => clearFilter('type')} className="hover:text-red-400 cursor-pointer"><X className="w-3 h-3" /></button>
                </div>
              )}
              {selectedEra !== 'All' && (
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1D9E75]/10 text-[#1D9E75] border border-[#1D9E75]/30 text-[10px] font-sans`} style={{fontWeight: 500}}>
                  <span>Era: {selectedEra}</span>
                  <button onClick={() => clearFilter('era')} className="hover:text-red-400 cursor-pointer"><X className="w-3 h-3" /></button>
                </div>
              )}
              {unescoOnly && (
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1D9E75]/10 text-[#1D9E75] border border-[#1D9E75]/30 text-[10px] font-sans`} style={{fontWeight: 500}}>
                  <span>UNESCO Listed</span>
                  <button onClick={() => clearFilter('unesco')} className="hover:text-red-400 cursor-pointer"><X className="w-3 h-3" /></button>
                </div>
              )}
              <button onClick={clearAllFilters} className={`text-[10px] font-sans ${textMuted} hover:text-red-400 underline ml-2 cursor-pointer`} style={{fontWeight: 500}}>
                Clear All
              </button>
            </div>
          )}

          {/* Cards Grid */}
          {filteredSites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSites.map((site) => (
                <SiteCard key={site.id} {...site} />
              ))}
            </div>
          ) : (
            <div className={`py-20 text-center border border-dashed border-[#D5CFC6] dark:border-[#3D494F] rounded-2xl space-y-3 bg-[#F5F2ED] dark:bg-[#23282D]`}>
              <Map className="w-12 h-12 text-[#1D9E75] mx-auto opacity-40" />
              <h3 className={`font-serif font-bold text-lg ${textPrimary}`}>No Sites Found</h3>
              <p className={`text-xs ${textMuted} max-w-sm mx-auto`}>
                No archaeological sites match your current filters. Try resetting the options or adjusting your search phrase.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 rounded-full bg-[#1D9E75] text-[#EDE9DF] font-sans text-xs shadow cursor-pointer"
                style={{fontWeight: 500}}
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className={`w-[280px] ${sidebarBase} h-full p-6 space-y-6 overflow-y-auto`}>
            <div className={`flex items-center justify-between border-b border-[#D5CFC6] dark:border-[#3D494F] pb-3`}>
              <span className={`font-serif font-bold text-base ${textPrimary}`}>Filters</span>
              <button onClick={() => setShowMobileFilters(false)} className={`p-1 hover:text-red-400 cursor-pointer ${textPrimary}`}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar isMobile />
          </div>
        </div>
      )}
    </div>
  );
}
