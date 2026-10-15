import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200/80 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Navigation Quick Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mb-8 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          <Link to="/" className="hover:text-cyan-600 transition-colors">Portal Home</Link>
          <span className="text-slate-300">/</span>
          <Link to="/games/water-sort/play" className="hover:text-cyan-600 transition-colors">Water Sort Lab</Link>
          <span className="text-slate-300">/</span>
          <Link to="/games/water-sort/rules" className="hover:text-cyan-600 transition-colors">Rules & Mechanics</Link>
          <span className="text-slate-300">/</span>
          <Link to="/about" className="hover:text-cyan-600 transition-colors">Whitepaper</Link>
          <span className="text-slate-300">/</span>
          <Link to="/faq" className="hover:text-cyan-600 transition-colors">Knowledge Base</Link>
        </div>

        {/* Mandatory Exact Footer Text */}
        <div className="text-center space-y-1">
          <p className="text-xs sm:text-sm font-bold tracking-widest text-neutral-800 uppercase">
            AUTHORIZED BY RAYAAN TASNIM
          </p>
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-600 uppercase">
            POWERED BY IDAI UNIVERSE
          </p>
          <p className="text-xs sm:text-sm font-medium tracking-wide text-neutral-500 uppercase pt-1">
            © 2026 GAME ZONE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
