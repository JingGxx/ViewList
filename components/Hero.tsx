import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface HeroProps {
  onSearch: (query: string, mode: 'buy' | 'rent' | 'new') => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'new'>('buy');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery, activeTab);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative h-[550px] w-full bg-slate-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Modern Architecture" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
          Find Your Perfect Place
        </h1>
        <p className="text-gray-200 mb-10 text-lg md:text-xl max-w-2xl drop-shadow-md">
          Search thousands of homes for sale or rent with the most trusted real estate platform.
        </p>

        {/* Search Box */}
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden p-3">
          {/* Tabs */}
          <div className="flex space-x-2 mb-3 px-1 border-b border-gray-100 pb-2">
            {[
              { id: 'buy', label: 'Buy' },
              { id: 'rent', label: 'Rent' },
              { id: 'new', label: 'New Projects' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex flex-col md:flex-row items-center gap-2 p-1">
            <div className="relative flex-grow w-full">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search by location, property name, or keyword..." 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 placeholder-gray-400 outline-none transition-all"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="w-full md:w-auto bg-primary hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-500/30 whitespace-nowrap"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </div>
        </div>
        
        <div className="mt-8 flex gap-6 text-white/80 text-sm font-medium">
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400"></span> 10,000+ New Listings</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Trusted Agents</span>
        </div>
      </div>
    </div>
  );
};