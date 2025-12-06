import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, Loader2 } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

// Helper to decode JWT without external library
const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

// NOTE: In a real deployment, replace this with your actual Google Cloud Console Client ID
const GOOGLE_CLIENT_ID = "YOUR_CLIENT_ID_HERE"; 

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  // Initialize Google Sign In
  useEffect(() => {
    if (isOpen && window.google && GOOGLE_CLIENT_ID !== "YOUR_CLIENT_ID_HERE") {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse
        });
        
        if (googleButtonRef.current) {
          window.google.accounts.id.renderButton(
            googleButtonRef.current,
            { theme: 'outline', size: 'large', width: '100%', text: 'continue_with' }
          );
        }
      } catch (error) {
        console.error("Google Sign In Error:", error);
      }
    }
  }, [isOpen]);

  const handleGoogleResponse = (response: any) => {
    setIsLoading(true);
    if (response.credential) {
      const payload = parseJwt(response.credential);
      if (payload) {
        const newUser: User = {
          name: payload.name,
          email: payload.email,
          avatar: payload.picture
        };
        onLogin(newUser);
        onClose();
      }
    }
    setIsLoading(false);
  };

  const handleSimulatedGoogleLogin = () => {
    // This fallback runs if no valid Client ID is provided
    setIsLoading(true);
    // Simulate API network delay
    setTimeout(() => {
      onLogin({
        name: 'Alex Johnson',
        email: 'alex.johnson@gmail.com',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=F97316&color=fff'
      });
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10">
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
               <div className="p-3 bg-primary/10 rounded-full">
                 <Lock className="w-6 h-6 text-primary" />
               </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Sign in to access your saved properties and searches</p>
          </div>

          <div className="space-y-4">
            {/* Real Google Button Container */}
            {GOOGLE_CLIENT_ID !== "YOUR_CLIENT_ID_HERE" ? (
               <div ref={googleButtonRef} className="w-full flex justify-center"></div>
            ) : (
              /* Fallback/Simulator Button */
              <button
                onClick={handleSimulatedGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-slate-700 relative overflow-hidden group shadow-sm hover:shadow-md"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                ) : (
                  <>
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400 font-medium">Or continue with email</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              handleSimulatedGoogleLogin();
            }}>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
                 <div className="relative">
                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                   <input type="email" placeholder="name@example.com" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
                 <div className="relative">
                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                   <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" />
                 </div>
               </div>
               <div className="flex justify-end">
                 <button className="text-sm text-primary font-semibold hover:underline">Forgot password?</button>
               </div>
               <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                 Sign In
               </button>
            </form>
          </div>

          <p className="text-center mt-8 text-sm text-gray-500">
            Don't have an account? <button className="text-primary font-bold hover:underline" onClick={handleSimulatedGoogleLogin}>Sign up</button>
          </p>
        </div>
      </div>
    </div>
  );
};