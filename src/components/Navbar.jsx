import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Gamepad2, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  Activity, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Zap,
  ExternalLink
} from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close matrix overlay on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent scroll when 3x3 matrix overlay is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const navLinks = [
    { to: '/', label: 'Portal' },
    { to: '/games/water-sort/play', label: 'Water Sort' },
    { to: '/games/water-sort/rules', label: 'Rules' },
    { to: '/about', label: 'Whitepaper' },
    { to: '/faq', label: 'FAQ' },
  ];

  const matrixNodes = [
    {
      title: 'Portal Master Hub',
      category: 'Command Core',
      desc: '12-section flagship gaming portal and system telemetry overview.',
      to: '/',
      icon: Gamepad2,
      accent: 'border-cyan-200 hover:border-cyan-400 group-hover:text-cyan-500'
    },
    {
      title: 'Water Sort Lab',
      category: 'Active Engine',
      desc: 'High-fluidity interactive color puzzle with live heuristic scoring.',
      to: '/games/water-sort/play',
      icon: Zap,
      accent: 'border-cyan-200 hover:border-cyan-400 group-hover:text-cyan-500'
    },
    {
      title: 'Rules & Kinetics',
      category: 'Mechanics',
      desc: 'Topological sorting invariants, vial capacities, and move economy.',
      to: '/games/water-sort/rules',
      icon: Layers,
      accent: 'border-emerald-200 hover:border-emerald-400 group-hover:text-emerald-500'
    },
    {
      title: 'Technical Whitepaper',
      category: 'Documentation',
      desc: '10-section deep architectural paper detailing the 6 ranking tiers.',
      to: '/about',
      icon: BookOpen,
      accent: 'border-indigo-200 hover:border-indigo-400 group-hover:text-indigo-500'
    },
    {
      title: 'Interactive Knowledge Base',
      category: 'FAQ Accordion',
      desc: '50+ categorized inquiries with GSAP-driven dynamic disclosure.',
      to: '/faq',
      icon: HelpCircle,
      accent: 'border-amber-200 hover:border-amber-400 group-hover:text-amber-500'
    },
    {
      title: 'Olympiad Edge',
      category: 'Mega Ecosystem',
      desc: 'Mathematical & algorithmic Olympiad problem-solving infrastructure.',
      to: '/#ecosystems',
      icon: Sparkles,
      accent: 'border-purple-200 hover:border-purple-400 group-hover:text-purple-500'
    },
    {
      title: 'IDAI Universe',
      category: 'Ecosystem Core',
      desc: 'Unified intelligent software network by Rayaan Tasnim.',
      to: '/#ecosystems',
      icon: Cpu,
      accent: 'border-blue-200 hover:border-blue-400 group-hover:text-blue-500'
    },
    {
      title: 'Prime Factor Elite Arena',
      category: 'Project Hub',
      desc: 'High-velocity numerical decomposition and competitive speed math.',
      to: '/#ecosystems',
      icon: Activity,
      accent: 'border-rose-200 hover:border-rose-400 group-hover:text-rose-500'
    },
    {
      title: 'Quantum Telemetry',
      category: 'Evaluator',
      desc: 'Par window penalties, move inefficiency matrices, and rank badges.',
      to: '/about#rankings',
      icon: ShieldCheck,
      accent: 'border-cyan-200 hover:border-cyan-400 group-hover:text-cyan-500'
    }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/70 border-b border-slate-200/80 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Left Brand Lockup */}
          <Link 
            to="/" 
            className="flex items-center gap-3 text-neutral-800 font-bold text-xl tracking-tight transition-transform duration-200 hover:scale-[1.02]"
          >
            <span className="text-2xl" role="img" aria-label="Game Controller">🎮</span>
            <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-cyan-600 bg-clip-text text-transparent">
              Game Zone
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'nav-active-glow'
                      : 'text-neutral-600 hover:text-neutral-900 hover:brightness-110'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Hamburger / 3x3 Matrix Button */}
          <div className="flex items-center gap-3">
            <Link
              to="/games/water-sort/play"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wide uppercase text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-[1.02] transition-all duration-200"
            >
              <span>Play Now</span>
              <Zap className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close Navigation Matrix" : "Open 3x3 Navigation Matrix"}
              className="p-2.5 rounded-2xl bg-white border border-slate-200 text-neutral-700 hover:text-cyan-600 hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all duration-200 focus:outline-none"
            >
              {menuOpen ? <X className="w-5 h-5 text-neutral-800" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 3x3 Interactive Matrix Grid Overlay Covering Viewport */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-8 animate-in fade-in duration-200 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMenuOpen(false);
          }}
        >
          <div className="w-full max-w-5xl bg-white/95 rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 my-auto relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">Global Navigation Matrix</span>
                <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">Game Zone 3×3 Grid Nexus</h2>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-neutral-700 hover:text-neutral-900 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3x3 Grid of 9 Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matrixNodes.map((node, idx) => {
                const IconComponent = node.icon;
                const isExternal = node.to.startsWith('/#');
                
                return (
                  <Link
                    key={idx}
                    to={node.to}
                    onClick={() => setMenuOpen(false)}
                    className="group flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-white hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all duration-200 text-left"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 text-neutral-700 shadow-sm group-hover:border-cyan-300 group-hover:text-cyan-600 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
                          <IconComponent className="w-5 h-5" />
                        </span>
                        <span className="text-[10px] font-mono uppercase font-bold text-neutral-400 group-hover:text-cyan-600 transition-colors">
                          0{idx + 1} // {node.category}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-neutral-900 group-hover:text-cyan-600 transition-colors flex items-center gap-1.5">
                        {node.title}
                        {isExternal && <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-cyan-500" />}
                      </h3>
                      <p className="mt-1.5 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                        {node.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-neutral-700 group-hover:text-cyan-600">
                      <span>Launch Node</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Matrix Footer Meta */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-2">
              <span>Game Zone v2.6 · Light Luxury Protocol</span>
              <span>Certified by Rayaan Tasnim · Powered by IDAI Universe</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
