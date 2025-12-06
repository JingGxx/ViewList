export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: 'Condo' | 'Landed' | 'Commercial' | 'Apartment' | 'Bungalow' | 'Soho';
  listingType: 'sale' | 'rent'; // Buy or Rent
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  images: string[]; // Gallery
  agentName: string;
  agentImage: string;
  agentPhone: string;
  description: string;
  tags: string[];
  tenure: 'Freehold' | 'Leasehold';
  furnishing: 'Fully Furnished' | 'Partially Furnished' | 'Unfurnished';
  postedDate: string;
  facilities: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface SearchFilters {
  query: string;
  mode: 'buy' | 'rent' | 'new';
  minPrice?: number;
  maxPrice?: number;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}