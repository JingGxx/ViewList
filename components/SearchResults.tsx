import React from 'react';
import { PropertyCard } from './PropertyCard';
import { Property, SearchFilters } from '../types';
import { SlidersHorizontal, ArrowDownUp, Search } from 'lucide-react';

interface SearchResultsProps {
  properties: Property[];
  filters: SearchFilters;
  onPropertyClick: (p: Property) => void;
  totalResults: number;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ properties, filters, onPropertyClick, totalResults }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {filters.mode === 'buy' ? 'Properties for Sale' : filters.mode === 'rent' ? 'Properties for Rent' : 'New Launches'}
                {filters.query && <span className="text-gray-500 font-normal"> in "{filters.query}"</span>}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{totalResults} Listings Found</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-slate-700">
                 <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
               <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-slate-700">
                 <ArrowDownUp className="w-4 h-4" /> Sort
              </button>
            </div>
          </div>
          
          {/* Quick Filters */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {['Condo', 'Landed', 'Commercial', 'Apartment'].map(type => (
                <button key={type} className="px-4 py-1.5 rounded-full bg-gray-100 text-sm text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors whitespace-nowrap">
                    {type}
                </button>
            ))}
             <div className="w-px h-6 bg-gray-300 mx-2"></div>
             {['< 500k', '500k - 1M', '> 1M'].map(price => (
                <button key={price} className="px-4 py-1.5 rounded-full bg-gray-100 text-sm text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors whitespace-nowrap">
                    {price}
                </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <PropertyCard 
                key={prop.id} 
                property={prop} 
                onClick={() => onPropertyClick(prop)} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
               <Search className="w-10 h-10 text-gray-400" />
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-2">No Properties Found</h3>
             <p className="text-gray-500 max-w-md mx-auto">
               We couldn't find any properties matching your search. Try adjusting your filters or search for a broader location.
             </p>
             <button 
               onClick={() => window.location.reload()}
               className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-orange-600 transition-colors"
             >
               Clear Search
             </button>
          </div>
        )}
      </div>
    </div>
  );
};