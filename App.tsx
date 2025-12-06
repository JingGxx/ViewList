import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetails } from './components/PropertyDetails';
import { SearchResults } from './components/SearchResults';
import { AIAssistant } from './components/AIAssistant';
import { AuthModal } from './components/AuthModal';
import { Property, SearchFilters, User } from './types';
import { ChevronRight, ArrowRight, BookOpen } from 'lucide-react';

// Enhanced Mock Data
const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'The Ridge Luxury Residences',
    price: 1250000,
    location: 'Mont Kiara, Kuala Lumpur',
    type: 'Condo',
    listingType: 'sale',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1450,
    imageUrl: 'https://picsum.photos/800/600?random=1',
    images: ['https://picsum.photos/800/600?random=101', 'https://picsum.photos/800/600?random=102', 'https://picsum.photos/800/600?random=103'],
    agentName: 'Sarah Jenkins',
    agentImage: 'https://picsum.photos/100/100?random=1',
    agentPhone: '+60123456789',
    description: `Experience the pinnacle of luxury living at The Ridge. This stunning 3-bedroom unit offers breathtaking views of the city skyline and is meticulously designed for modern families. 
    
    The unit features high ceilings, a spacious balcony, and a designer kitchen equipped with premium appliances. 
    
    Located in the heart of Mont Kiara, you are walking distance to top international schools and shopping centers.`,
    tags: ['Luxury', 'View', 'Furnished'],
    tenure: 'Freehold',
    furnishing: 'Fully Furnished',
    postedDate: '2024-03-10',
    facilities: ['Swimming Pool', 'Gymnasium', '24/7 Security', 'BBQ Area', 'Playground', 'Tennis Court']
  },
  {
    id: '2',
    title: 'Greenleaf Park Bungalow',
    price: 3500000,
    location: 'Damansara Heights',
    type: 'Landed',
    listingType: 'sale',
    bedrooms: 5,
    bathrooms: 5,
    sqft: 4200,
    imageUrl: 'https://picsum.photos/800/600?random=2',
    images: ['https://picsum.photos/800/600?random=201', 'https://picsum.photos/800/600?random=202'],
    agentName: 'David Chen',
    agentImage: 'https://picsum.photos/100/100?random=2',
    agentPhone: '+60198765432',
    description: 'A masterpiece of modern architecture. This spacious family home features a private garden, lap pool, and smart home integration.',
    tags: ['Garden', 'Pool', 'Private'],
    tenure: 'Freehold',
    furnishing: 'Partially Furnished',
    postedDate: '2024-03-08',
    facilities: ['Private Pool', 'Gated & Guarded', 'Clubhouse Access', 'Jogging Track']
  },
  {
    id: '3',
    title: 'TechHub SOHO Units',
    price: 1800,
    location: 'Cyberjaya, Selangor',
    type: 'Soho',
    listingType: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    imageUrl: 'https://picsum.photos/800/600?random=3',
    images: ['https://picsum.photos/800/600?random=301', 'https://picsum.photos/800/600?random=302'],
    agentName: 'Aisha Malik',
    agentImage: 'https://picsum.photos/100/100?random=3',
    agentPhone: '+601122334455',
    description: 'Perfect for digital nomads. This unit comes fully furnished with high-speed internet ready ports and modern minimalist design.',
    tags: ['Investment', 'Modern', 'SOHO'],
    tenure: 'Leasehold',
    furnishing: 'Fully Furnished',
    postedDate: '2024-03-12',
    facilities: ['Co-working Space', 'Gym', 'Pool', 'Cafe']
  },
  {
    id: '4',
    title: 'Skyview Serviced Apartments',
    price: 3500,
    location: 'Bangsar South',
    type: 'Apartment',
    listingType: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 980,
    imageUrl: 'https://picsum.photos/800/600?random=4',
    images: ['https://picsum.photos/800/600?random=401', 'https://picsum.photos/800/600?random=402'],
    agentName: 'Marcus Lee',
    agentImage: 'https://picsum.photos/100/100?random=4',
    agentPhone: '+60123456789',
    description: 'Luxury serviced apartment with direct link to LRT station. Surrounded by MSC status office towers.',
    tags: ['Convenient', 'LRT'],
    tenure: 'Leasehold',
    furnishing: 'Fully Furnished',
    postedDate: '2024-03-05',
    facilities: ['Infinity Pool', 'Sky Lounge', 'Gym', 'Game Room']
  },
  {
    id: '5',
    title: 'Eco Sanctuary Villa',
    price: 2100000,
    location: 'Kota Kemuning',
    type: 'Landed',
    listingType: 'sale',
    bedrooms: 4,
    bathrooms: 4,
    sqft: 3200,
    imageUrl: 'https://picsum.photos/800/600?random=5',
    images: ['https://picsum.photos/800/600?random=501', 'https://picsum.photos/800/600?random=502'],
    agentName: 'Sarah Jenkins',
    agentImage: 'https://picsum.photos/100/100?random=1',
    agentPhone: '+60123456789',
    description: 'Eco-themed township living. Beautiful landscaping and serene environment. Perfect for growing families.',
    tags: ['Green', 'Security'],
    tenure: 'Leasehold',
    furnishing: 'Unfurnished',
    postedDate: '2024-03-01',
    facilities: ['Central Park', 'Clubhouse', 'Bicycle Lane', '24h Security']
  },
  {
    id: '6',
    title: 'Sentral Loft',
    price: 4500,
    location: 'KL Sentral',
    type: 'Condo',
    listingType: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    imageUrl: 'https://picsum.photos/800/600?random=6',
    images: ['https://picsum.photos/800/600?random=601', 'https://picsum.photos/800/600?random=602'],
    agentName: 'Raj Kumar',
    agentImage: 'https://picsum.photos/100/100?random=5',
    agentPhone: '+60123456789',
    description: 'Ultimate convenience. Live right next to the transportation hub. High floor unit with city views.',
    tags: ['Transport', 'City'],
    tenure: 'Freehold',
    furnishing: 'Fully Furnished',
    postedDate: '2024-03-11',
    facilities: ['Gym', 'Pool', 'Jacuzzi', 'Function Room']
  },
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'search' | 'details' | 'agents'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({ query: '', mode: 'buy' });
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('viewlist_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('viewlist_user');
      }
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('viewlist_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('viewlist_user');
  };

  // Filter properties based on current filters
  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter(p => {
      // Filter by Mode (Buy/Rent)
      if (searchFilters.mode === 'new') {
        // Just show all for new launch demo, or specific Logic
        if (!p.tags.includes('New')) return true; // Show everything for demo volume
      } else {
         if (p.listingType !== searchFilters.mode) return false;
      }

      // Filter by Query
      if (searchFilters.query) {
        const q = searchFilters.query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchFilters]);

  const handleNavigate = (page: string, params?: any) => {
    window.scrollTo(0, 0);
    if (page === 'search' && params) {
      setSearchFilters(prev => ({ ...prev, ...params }));
    }
    setCurrentPage(page as any);
  };

  const handleSearch = (query: string, mode: 'buy' | 'rent' | 'new') => {
    setSearchFilters({ query, mode });
    setCurrentPage('search');
    window.scrollTo(0, 0);
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setCurrentPage('details');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage !== 'details' && (
        <Navbar 
          onNavigate={handleNavigate} 
          activePage={currentPage}
          user={user}
          onSignIn={() => setIsAuthModalOpen(true)}
          onSignOut={handleLogout}
        />
      )}
      
      {currentPage === 'home' && (
        <main>
          <Hero onSearch={handleSearch} />
          
          {/* Featured Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Featured Properties</h2>
                <p className="text-gray-500 mt-2">Handpicked exclusive listings just for you</p>
              </div>
              <button 
                onClick={() => handleNavigate('search', { mode: 'buy' })}
                className="hidden sm:flex items-center text-primary font-semibold hover:text-orange-700 transition-colors"
              >
                View All <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_PROPERTIES.slice(0, 6).map((prop) => (
                <PropertyCard 
                  key={prop.id} 
                  property={prop} 
                  onClick={() => handlePropertyClick(prop)} 
                />
              ))}
            </div>
            
            <button 
                onClick={() => handleNavigate('search', { mode: 'buy' })}
                className="w-full sm:hidden mt-8 py-3 bg-gray-50 text-slate-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              View All Properties
            </button>
          </section>

          {/* New Projects Section Banner */}
          <section className="bg-slate-900 py-16 text-white relative overflow-hidden">
             {/* Abstract Shapes */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="md:flex md:items-center md:justify-between">
                <div className="mb-8 md:mb-0 max-w-xl">
                  <span className="inline-block py-1 px-3 rounded bg-primary/20 text-primary text-xs font-bold tracking-wider mb-4 border border-primary/50">
                    NEW LAUNCH
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    Discover Latest Developments
                  </h2>
                  <p className="text-gray-300 text-lg mb-6">
                    Be the first to explore exclusive new projects and get early bird discounts from top developers.
                  </p>
                  <button 
                    onClick={() => handleNavigate('search', { mode: 'new' })}
                    className="bg-white text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center"
                  >
                    Explore Projects <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
                <div className="hidden md:block">
                  <div className="w-[400px] h-[300px] bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-700/50 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                     <img src="https://picsum.photos/800/600?random=10" alt="New Project" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Agent Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 text-center">Top Rated Agents</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                  <img 
                    src={`https://picsum.photos/150/150?random=${i + 20}`} 
                    alt="Agent" 
                    className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-gray-50"
                  />
                  <h3 className="font-bold text-lg text-slate-800">Agent {i}</h3>
                  <p className="text-sm text-gray-500 mb-4">Senior Negotiator</p>
                  <button className="text-primary text-sm font-semibold hover:underline">View Profile</button>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                     <div className="bg-primary p-1.5 rounded-lg w-fit">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-bold text-xl tracking-tight text-slate-900">
                        View<span className="text-primary">List</span>
                      </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Connecting you with your dream home through technology and trust.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li><button onClick={() => handleNavigate('search', { mode: 'buy'})} className="hover:text-primary">Buy Property</button></li>
                    <li><button onClick={() => handleNavigate('search', { mode: 'rent'})} className="hover:text-primary">Rent Property</button></li>
                    <li><button onClick={() => handleNavigate('search', { mode: 'new'})} className="hover:text-primary">New Launches</button></li>
                    <li><button onClick={() => handleNavigate('agents')} className="hover:text-primary">Find an Agent</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Support</h4>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li><button className="hover:text-primary">Help Center</button></li>
                    <li><button className="hover:text-primary">Contact Us</button></li>
                    <li><button className="hover:text-primary">Terms of Service</button></li>
                    <li><button className="hover:text-primary">Privacy Policy</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Newsletter</h4>
                  <div className="flex">
                    <input 
                      type="email" 
                      placeholder="Enter email" 
                      className="bg-gray-50 border border-gray-200 rounded-l-lg px-4 py-2 w-full text-sm outline-none focus:border-primary"
                    />
                    <button className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-400">
                &copy; 2024 ViewList. All rights reserved. This is a demo.
              </div>
            </div>
          </footer>
        </main>
      )}

      {currentPage === 'search' && (
        <SearchResults 
            properties={filteredProperties} 
            filters={searchFilters} 
            onPropertyClick={handlePropertyClick}
            totalResults={filteredProperties.length}
        />
      )}

      {currentPage === 'details' && selectedProperty && (
        <PropertyDetails 
            property={selectedProperty} 
            onBack={() => setCurrentPage('search')} 
        />
      )}
      
      {currentPage === 'agents' && (
          <div className="pt-8 px-4 text-center min-h-[50vh]">
            <h2 className="text-2xl font-bold mb-4">Find Agent functionality coming soon</h2>
            <button onClick={() => setCurrentPage('home')} className="text-primary underline">Back Home</button>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin}
      />

      <AIAssistant />
    </div>
  );
};

export default App;