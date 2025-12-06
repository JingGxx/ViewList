import React from 'react';
import { ArrowLeft, Bed, Bath, Expand, MapPin, Share2, Heart, Phone, MessageCircle, Calendar, CheckCircle } from 'lucide-react';
import { Property } from '../types';

interface PropertyDetailsProps {
  property: Property;
  onBack: () => void;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 animate-in fade-in duration-300">
      {/* Sticky Header */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm px-4 py-3 sm:px-8 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-primary font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Search
        </button>
        <div className="flex gap-3">
          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 h-[500px]">
          <div className="md:col-span-2 row-span-2 relative group overflow-hidden rounded-xl cursor-pointer">
            <img 
              src={property.imageUrl} 
              alt={property.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          {property.images.slice(0, 4).map((img, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-xl cursor-pointer hidden md:block">
              <img 
                src={img} 
                alt={`Gallery ${idx}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
          <div className="relative group overflow-hidden rounded-xl cursor-pointer hidden md:flex items-center justify-center bg-gray-900">
             <img src={property.images[0]} alt="more" className="absolute inset-0 w-full h-full object-cover opacity-50" />
             <span className="relative z-10 text-white font-bold text-lg">+ 5 Photos</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                   <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{property.title}</h1>
                   <div className="flex items-center text-gray-500">
                     <MapPin className="w-4 h-4 mr-2" />
                     {property.location}
                   </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    ${property.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {property.listingType === 'rent' ? '/ month' : 'Guide Price'}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 py-6 border-t border-b border-gray-100">
                <div className="text-center md:text-left">
                  <div className="text-sm text-gray-500 mb-1">Type</div>
                  <div className="font-semibold text-slate-800">{property.type}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-sm text-gray-500 mb-1">Tenure</div>
                  <div className="font-semibold text-slate-800">{property.tenure}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-sm text-gray-500 mb-1">Size</div>
                  <div className="font-semibold text-slate-800">{property.sqft} sqft</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-sm text-gray-500 mb-1">PSF</div>
                  <div className="font-semibold text-slate-800">
                     ${Math.round(property.price / property.sqft).toLocaleString()}
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-sm text-gray-500 mb-1">Furnishing</div>
                  <div className="font-semibold text-slate-800">{property.furnishing.split(' ')[0]}</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-sm text-gray-500 mb-1">Posted</div>
                  <div className="font-semibold text-slate-800">2 days ago</div>
                </div>
              </div>

              {/* Icons */}
              <div className="flex gap-8 mt-6">
                <div className="flex items-center text-slate-700">
                  <Bed className="w-5 h-5 mr-2 text-primary" />
                  <span className="font-bold mr-1">{property.bedrooms}</span> Bedrooms
                </div>
                <div className="flex items-center text-slate-700">
                  <Bath className="w-5 h-5 mr-2 text-primary" />
                  <span className="font-bold mr-1">{property.bathrooms}</span> Bathrooms
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Facilities & Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
                {property.facilities.map((facility, idx) => (
                  <div key={idx} className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mortgage Calculator Placeholder */}
             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Mortgage Calculator</h3>
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Estimated Monthly Repayment</p>
                    <p className="text-3xl font-bold text-slate-800">${Math.round(property.price * 0.0045).toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-1">Based on 3.5% interest, 35 years tenure, 90% loan.</p>
                  </div>
                  <button className="text-primary font-semibold hover:underline">Customize Calculation</button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
             {/* Agent Card */}
             <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-28">
               <div className="flex items-center gap-4 mb-6">
                 <img 
                  src={property.agentImage} 
                  alt={property.agentName} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                 />
                 <div>
                   <h3 className="font-bold text-lg text-slate-900">{property.agentName}</h3>
                   <p className="text-gray-500 text-sm">REN 12345</p>
                   <div className="flex items-center text-yellow-500 text-sm mt-1">
                     {'★'.repeat(5)} <span className="text-gray-400 ml-1">(24 reviews)</span>
                   </div>
                 </div>
               </div>
               
               <div className="space-y-3">
                 <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                   <MessageCircle className="w-5 h-5" />
                   WhatsApp
                 </button>
                 <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                   <Phone className="w-5 h-5" />
                   Call Agent
                 </button>
               </div>
               
               <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-sm mb-3 text-slate-800">Enquire about this property</h4>
                  <input type="text" placeholder="Name" className="w-full mb-3 px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-primary" />
                  <input type="text" placeholder="Phone" className="w-full mb-3 px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-primary" />
                  <textarea placeholder="I am interested in..." rows={3} className="w-full mb-3 px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-primary"></textarea>
                  <button className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-2 rounded-lg text-sm transition-colors">
                    Send Enquiry
                  </button>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};