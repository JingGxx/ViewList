import React from 'react';
import { Bed, Bath, Expand, MapPin, Heart } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
          {property.type.toUpperCase()}
        </div>
        <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white text-gray-600 hover:text-red-500 transition-colors backdrop-blur-sm">
          <Heart className="w-4 h-4" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="text-white font-bold text-xl shadow-sm">
            ${property.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1 mb-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          <div className="flex justify-between items-center py-4 border-t border-gray-100">
            <div className="flex flex-col items-center">
              <div className="flex items-center text-slate-700 font-semibold">
                <Bed className="w-4 h-4 mr-1 text-primary" />
                {property.bedrooms}
              </div>
              <span className="text-xs text-gray-400">Beds</span>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="flex flex-col items-center">
              <div className="flex items-center text-slate-700 font-semibold">
                <Bath className="w-4 h-4 mr-1 text-primary" />
                {property.bathrooms}
              </div>
              <span className="text-xs text-gray-400">Baths</span>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="flex flex-col items-center">
              <div className="flex items-center text-slate-700 font-semibold">
                <Expand className="w-4 h-4 mr-1 text-primary" />
                {property.sqft}
              </div>
              <span className="text-xs text-gray-400">Sqft</span>
            </div>
          </div>
        </div>

        {/* Agent Info */}
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <img 
              src={property.agentImage} 
              alt={property.agentName}
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-800">{property.agentName}</span>
              <span className="text-[10px] text-gray-400">Verified Agent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
