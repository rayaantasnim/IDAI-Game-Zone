import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomeIndex from './html/index.jsx';
import About from './about/index.jsx';
import FAQ from './faq/index.jsx';
import Rules from './games/water-sort/Rules.jsx';
import GameZone from './games/water-sort/GameZone.jsx';
import Results from './games/water-sort/Results.jsx';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 text-neutral-800 antialiased selection:bg-cyan-500/20 selection:text-cyan-900">
        {/* Global Navbar */}
        <Navbar />

        {/* Core Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeIndex />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/games/water-sort/rules" element={<Rules />} />
            <Route path="/games/water-sort/play" element={<GameZone />} />
            <Route path="/games/water-sort/results" element={<Results />} />
            {/* Catch-all route gracefully returning to portal */}
            <Route path="*" element={<HomeIndex />} />
          </Routes>
        </main>

        {/* Global Immutable Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
