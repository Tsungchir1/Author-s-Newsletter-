import React from 'react';
import { Button } from './Button';
import { User } from '../types';

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
  onNavigateHome: () => void;
  onNavigateAuth: () => void;
  onNavigateDashboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentUser, 
  onLogout, 
  onNavigateHome, 
  onNavigateAuth,
  onNavigateDashboard 
}) => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header className="mb-8">
      <div className="border-b-4 border-double border-ink py-2 text-center bg-paper-dark">
        <span className="font-subhead italic text-sm tracking-widest text-sepia">
          EST. 2024 &bull; VOL. I &bull; {today.toUpperCase()} &bull; FREE EDITION
        </span>
      </div>
      
      <div className="py-8 text-center border-b border-ink">
        <h1 
          onClick={onNavigateHome}
          className="font-headline text-5xl md:text-7xl lg:text-8xl font-black text-ink uppercase tracking-tight cursor-pointer hover:text-news-red transition-colors"
        >
          Author's Newsletter
        </h1>
        <p className="font-subhead italic mt-2 text-xl text-sepia">"All The Books That Are Fit To Read"</p>
      </div>

      <div className="py-3 border-b-4 border-double border-ink flex flex-col md:flex-row justify-between items-center px-4 bg-paper sticky top-0 z-50 shadow-sm">
        <nav className="flex gap-6 font-headline font-bold text-sm md:text-base mb-2 md:mb-0">
          <button onClick={onNavigateHome} className="hover:text-news-red hover:underline decoration-2 underline-offset-4">LATEST NEWS</button>
          <button className="hover:text-news-red hover:underline decoration-2 underline-offset-4 opacity-50 cursor-not-allowed">ARCHIVES</button>
          <button className="hover:text-news-red hover:underline decoration-2 underline-offset-4 opacity-50 cursor-not-allowed">CLASSIFIEDS</button>
        </nav>

        <div className="flex gap-4 items-center">
          {currentUser ? (
            <>
              <span className="font-body italic hidden md:block">
                Welcome, {currentUser.authorName || currentUser.name}
              </span>
              {currentUser.type === 'AUTHOR' && (
                <Button onClick={onNavigateDashboard} variant="secondary" className="text-xs py-1 px-3">
                  Author Desk
                </Button>
              )}
              <Button onClick={onLogout} variant="outline" className="text-xs py-1 px-3">
                Sign Out
              </Button>
            </>
          ) : (
            <Button onClick={onNavigateAuth} className="text-xs py-1 px-3">
              Sign In / Subscribe
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};