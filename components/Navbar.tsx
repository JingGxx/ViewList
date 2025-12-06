import React, { useState } from 'react';
import { BookOpen, Search, Heart, User as UserIcon, Menu, LogOut, ChevronDown } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  onNavigate: (page: string, params?: any) => void;
  activePage: string;
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activePage, user, onSignIn, onSignOut }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                View<span className="text-primary">List</span>
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate('search', { mode: 'buy' })}
              className={`${activePage === 'search' ? 'text-primary' : 'text-gray-600'} hover:text-primary font-medium transition-colors`}
            >
              Buy
            </button>
            <button
              onClick={() => onNavigate('search', { mode: 'rent' })}
              className={`${activePage === 'search' ? 'text-primary' : 'text-gray-600'} hover:text-primary font-medium transition-colors`}
            >
              Rent
            </button>
            <button
              onClick={() => onNavigate('search', { mode: 'new' })}
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              New Launch
            </button>
            <button
              onClick={() => onNavigate('agents')}
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Find Agent
            </button>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('search', { mode: 'buy' })}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full border border-gray-200"
                  />
                  <span className="text-sm font-semibold text-slate-700 hidden lg:block">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-slate-900">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                        My Profile
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                        Saved Properties
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                        Settings
                      </button>
                      <div className="border-t border-gray-100 mt-1">
                        <button 
                          onClick={() => {
                            onSignOut();
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center"
                        >
                          <LogOut className="w-4 h-4 mr-2" /> Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button 
                onClick={onSignIn}
                className="flex items-center space-x-2 text-sm font-bold text-slate-700 hover:text-primary px-4 py-2.5 rounded-lg hover:bg-orange-50 transition-all duration-200 border border-transparent hover:border-orange-100"
              >
                <UserIcon className="w-5 h-5" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             {user ? (
               <img 
                    src={user.avatar} 
                    alt={user.name} 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer"
                  />
             ) : (
                <button onClick={onSignIn} className="text-sm font-bold text-primary">Sign In</button>
             )}
            <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};