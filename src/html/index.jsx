import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Play, 
  ArrowRight, 
  Zap, 
  FlaskConical, 
  Award, 
  Activity, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  TrendingUp, 
  RotateCcw,
  ExternalLink,
  Sliders
} from 'lucide-react';
import { 
  ARCHITECTURAL_RANKS, 
  RAPID_PERFORMANCE_COMMENTS, 
  evaluatePerformanceTelemetry 
} from '../js/framework.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE = '/src/assets/images/hero_water_sort_puzzle_1792082026953.jpg';
const ARENA_IMAGE = '/src/assets/images/game_zone_arena_hub_1792082028438.jpg';
const LOGIC_IMAGE = '/src/assets/images/logic_matrix_architecture_1792082029244.jpg';
const AWARD_IMAGE = '/src/assets/images/telemetry_award_insignia_1792082027352.jpg';

export default function HomeIndex() {
  const containerRef = useRef(null);

  // Interactive Live Telemetry Calculator Sandbox in Section 3
  const [calcTime, setCalcTime] = useState(52);
  const [calcMoves, setCalcMoves] = useState(13);
  const [calcOptMoves, setCalcOptMoves] = useState(13);
  const [calcParTime, setCalcParTime] = useState(65);

  const sandboxTelemetry = evaluatePerformanceTelemetry(calcTime, calcMoves, calcOptMoves, calcParTime);

  // Tone tester in Section 8
  const playSampleTone = (freq) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Audio fallback
    }
  };

  // GSAP ScrollTrigger animation for sections
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate all sections with staggered entrance
      const sections = gsap.utils.toArray('.gsap-section');
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 pt-20 pb-16 space-y-24 sm:space-y-32">
      
      {/* =========================================================================
          SECTION 1: HERO PORTAL
          ========================================================================= */}
      <section className="gsap-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-neutral-700">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
              <span>Next-Gen Web Gaming Hub · Pure Light Luxury</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.1]">
              Architectural Logic. <br />
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Dynamic Fluid Telemetry.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Welcome to <strong className="text-neutral-900 font-bold">Game Zone</strong>. Engage with deterministic combinatorial puzzles, real-time kinetic sorting, and our proprietary arithmetic scoring engine that evaluates human cognitive velocity.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/games/water-sort/play"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-sm shadow-md hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:scale-[1.02] transition-all"
              >
                <span>Play Water Sort</span>
                <Play className="w-4 h-4 fill-white" />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-200 text-neutral-800 font-bold text-sm shadow-sm hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:scale-[1.02] transition-all"
              >
                <span>Examine Whitepaper</span>
                <ArrowRight className="w-4 h-4 text-cyan-600" />
              </Link>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-neutral-500 font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <span>Authorized by Rayaan Tasnim</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>Powered by IDAI Universe</span>
              </span>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xl hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] hover:scale-[1.02] transition-all">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 mb-6">
                <img
                  src={HERO_IMAGE}
                  alt="Water Sort Laboratory Vials"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-[10px] font-mono font-bold text-cyan-700">
                  ACTIVE MATRIX // 60 FPS
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-800 uppercase tracking-wider">Featured Discipline</span>
                  <span className="text-cyan-600 font-mono font-bold">4 difficulty tiers</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Combinatorial Fluid Kinetics</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Decant immiscible fluid strata across laboratory vials to achieve uniform chromatic equilibrium within minimum move economy.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-cyan-600">
                  <Link to="/games/water-sort/rules" className="hover:underline flex items-center gap-1">
                    <span>View rules & mechanics</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="font-mono text-neutral-400">Optimum Par: 13 Moves</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: GAME ARSENAL SHOWCASE
          ========================================================================= */}
      <section className="gsap-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600">Ecosystem Portfolio</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Curated Cognitive Game Arsenal
          </h2>
          <p className="text-sm text-neutral-500">
            Every module in Game Zone shares identical telemetry arithmetic, light luxury visual styling, and verified certification standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Water Sort Lab',
              category: 'Combinatorial Chemistry',
              status: 'Live & Playable',
              active: true,
              desc: 'Segregate multi-color fluid layers across glass test tubes. Features undo stack, tactical hints, and dynamic par evaluation.',
              link: '/games/water-sort/play',
              cta: 'Launch Game'
            },
            {
              title: 'Prime Factor Elite',
              category: 'Number Theory Speed',
              status: 'Active Hub',
              active: true,
              desc: 'Deconstruct composite integers into prime foundations under high-frequency chronometric pressure.',
              link: '#ecosystems',
              cta: 'Inspect Hub'
            },
            {
              title: 'Quantum Chess Solver',
              category: 'Spatial Lookahead',
              status: 'In Development',
              active: false,
              desc: 'Algebraic chessboard scenarios evaluating material sacrifice, blunder-free recovery, and brilliant move velocity.',
              link: '/about',
              cta: 'Learn More'
            },
            {
              title: 'Neon Topological Maze',
              category: 'Graph Theory Routing',
              status: 'In Development',
              active: false,
              desc: 'High-contrast light maze pathfinding where players optimize Dijkstra distance against procedural dead ends.',
              link: '/about',
              cta: 'Learn More'
            },
            {
              title: 'Chromatic Sudoku',
              category: 'Constraint Satisfaction',
              status: 'In Development',
              active: false,
              desc: 'Latin square color matrix solving with mathematical zero-conflict validation and live move efficiency scoring.',
              link: '/about',
              cta: 'Learn More'
            },
            {
              title: 'Olympiad Algorithmic Arena',
              category: 'Competitive Logic',
              status: 'Ecosystem Core',
              active: true,
              desc: 'High-level competitive puzzle problems integrated with the Olympiad Edge platform for advanced solvers.',
              link: '#ecosystems',
              cta: 'Explore Ecosystem'
            }
          ].map((game, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-slate-100 p-7 shadow-sm hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] hover:border-cyan-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase font-bold text-neutral-400">
                    {game.category}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    game.active 
                      ? 'bg-cyan-50 border-cyan-200 text-cyan-700' 
                      : 'bg-slate-50 border-slate-200 text-neutral-500'
                  }`}>
                    {game.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{game.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{game.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={game.link}
                  className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 group"
                >
                  <span>{game.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-[11px] font-mono text-neutral-400">Tier 0{i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CENTRAL TELEMETRY ENGINE SPOTLIGHT (INTERACTIVE SANDBOX)
          ========================================================================= */}
      <section className="gsap-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Description & Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-wider">
                <Sliders className="w-4 h-4" />
                <span>Section 03 // Interactive Telemetry Simulator</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Deterministic Arithmetic Engine
              </h2>

              <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                Test the exact formulas executing in <code className="bg-slate-100 px-2 py-0.5 rounded text-neutral-800 font-mono">framework.js</code>. Adjust the parameters below to witness how par thresholds and move economies govern point deductions and rank assignment in real time.
              </p>

              {/* Sliders Grid */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold text-neutral-700 mb-1">
                    <span>Time Spent: {calcTime}s</span>
                    <span className="text-neutral-400">Par: {calcParTime}s</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="140"
                    value={calcTime}
                    onChange={(e) => setCalcTime(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-2 bg-slate-100 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-neutral-700 mb-1">
                    <span>Total Moves: {calcMoves}</span>
                    <span className="text-neutral-400">Optimal: {calcOptMoves}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="35"
                    value={calcMoves}
                    onChange={(e) => setCalcMoves(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-slate-100 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Deductions breakdown */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Base Treasury</span>
                  <p className="text-base font-bold text-neutral-900">100 pts</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-amber-600 uppercase">Time Penalty</span>
                  <p className="text-base font-bold text-amber-600">-{sandboxTelemetry.timePenalty} pts</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-rose-600 uppercase">Move Penalty</span>
                  <p className="text-base font-bold text-rose-600">-{sandboxTelemetry.inefficiencyPenalty} pts</p>
                </div>
              </div>
            </div>

            {/* Right Live Visual Result Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200/80 text-center space-y-4">
              
              {/* Live Neon Circle */}
              <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-white border-4 border-cyan-400 neon-circle-pulse shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                <div>
                  <span className="text-3xl font-extrabold text-neutral-900">{sandboxTelemetry.score}</span>
                  <span className="block text-[10px] font-bold text-cyan-600 uppercase">/ 100 PTS</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-cyan-50 border border-cyan-200 text-cyan-700">
                  {sandboxTelemetry.rank}
                </span>
                <p className="text-base font-bold text-neutral-900">
                  "{sandboxTelemetry.rapidComment}"
                </p>
              </div>

              <p className="text-xs text-neutral-500 max-w-xs leading-relaxed italic">
                {sandboxTelemetry.dynamicFeedback}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THE 6 ARCHITECTURAL RANKINGS GRID
          ========================================================================= */}
      <section className="gsap-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600">Cognitive Classification</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            The 6 Architectural Rankings
          </h2>
          <p className="text-sm text-neutral-500">
            Points earned directly dictate your certified tier, benchmarked from QUANTUM EDGE down to STATIC DRIFT.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARCHITECTURAL_RANKS.map((rank, idx) => (
            <div
              key={rank.name}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-neutral-400">
                    Range: {rank.minScore}-{rank.maxScore} pts
                  </span>
                  <span className="text-[10px] font-mono text-cyan-600 font-bold">
                    RANK 0{idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-neutral-900 mb-2">{rank.name}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{rank.descriptor}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-neutral-500">
                <span>Standard Protocol</span>
                <span className="text-cyan-600">Verified Badge</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: COMBINATORIAL FLUID INVARIANTS
          ========================================================================= */}
      <section className="gsap-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600">Physical Constraints</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Topological Liquid Segregation
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans">
              Unlike arbitrary tile matching, Water Sort is an authentic graph-traversal puzzle. Liquids are modeled as incompressible discrete blocks stacked in glass tubes of fixed unit depth (4 units).
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-neutral-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span><strong>Homogeneous Stacking:</strong> Liquid of color $C$ transfers only onto matching top surface $C$ or into an empty vial.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span><strong>Batch Decanting:</strong> Adjacent identical color strata transfer in a single continuous stroke without consuming redundant moves.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span><strong>Buffer Conservation:</strong> Preserving empty vials is paramount to prevent irreversible topological deadlocks.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/games/water-sort/rules"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 hover:text-cyan-700"
              >
                <span>Read Full Kinetic Specifications</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src={LOGIC_IMAGE}
                alt="Optical glass prisms casting luminous reflections"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: RAPID PERFORMANCE COMMENTARY SHOWCASE
          ========================================================================= */}
      <section className="gsap-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600">Cognitive Feedback</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            20 Chess-Style Velocity Commentary Strings
          </h2>
          <p className="text-sm text-neutral-500">
            Categorized across four velocity dimensions, delivering instant evaluation after critical vial decanting maneuvers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { cat: 'Speed Velocity', comments: RAPID_PERFORMANCE_COMMENTS.speed, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
            { cat: 'Accuracy Precision', comments: RAPID_PERFORMANCE_COMMENTS.accuracy, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
            { cat: 'Streak Momentum', comments: RAPID_PERFORMANCE_COMMENTS.streak, color: 'text-purple-600 bg-purple-50 border-purple-200' },
            { cat: 'Positional Recovery', comments: RAPID_PERFORMANCE_COMMENTS.positionalRecovery, color: 'text-amber-600 bg-amber-50 border-amber-200' }
          ].map((group, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${group.color}`}>
                {group.cat}
              </span>
              <ul className="space-y-2 text-xs font-semibold text-neutral-800">
                {group.comments.map((comment, cIdx) => (
                  <li key={cIdx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span>{comment}</span>
                    <span className="text-[10px] font-mono text-neutral-400">0{cIdx + 1}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: DAILY CHALLENGE MATRIX
          ========================================================================= */}
      <section className="gsap-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-white via-slate-50 to-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600">Rotational Challenge</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Daily Grandmaster Seed #4092
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-lg leading-relaxed">
                Test your reflexes on the global daily seed. Seed parameters: 5 colors, 7 tubes, Par window 90.00s. Current record holder solved in 48.12s with 17 optimal decants.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <div className="text-center sm:text-right">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">World Best</span>
                <span className="text-xl font-extrabold text-neutral-900 font-mono">48.12s · 98 PTS</span>
              </div>
              <Link
                to="/games/water-sort/play"
                className="px-6 py-3.5 rounded-2xl bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-neutral-800 hover:scale-[1.02] transition-all"
              >
                Attempt Daily Seed
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: SYNTHESIZED WEB AUDIO & HAPTICS ARCHITECTURE
          ========================================================================= */}
      <section className="gsap-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600">Acoustic Architecture</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
                Zero-Asset Web Audio Synthesizer
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Immediate frequency modulation synthesized in browser memory. Click below to audition sample cues.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-cyan-600" />
              <span className="text-xs font-mono font-bold text-neutral-700">Native AudioContext</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Vial Selection', freq: 440, desc: 'Sine ramp 440Hz → 587Hz' },
              { label: 'Fluid Decant', freq: 523.25, desc: 'Harmonic swell 523Hz' },
              { label: 'Vial Equilibrium', freq: 659.25, desc: 'Bright chime 659Hz' },
              { label: 'Victory Cascade', freq: 783.99, desc: 'Polyphonic chord sequence' }
            ].map((sound, sIdx) => (
              <button
                key={sIdx}
                type="button"
                onClick={() => playSampleTone(sound.freq)}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:scale-[1.02] transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-900 group-hover:text-cyan-600 transition-colors">
                    {sound.label}
                  </span>
                  <Play className="w-3.5 h-3.5 text-neutral-400 group-hover:text-cyan-600 fill-current" />
                </div>
                <p className="text-[11px] font-mono text-neutral-500">{sound.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: GLOBAL LEADERBOARD & CERTIFICATE SIMULATION
          ========================================================================= */}
      <section className="gsap-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600">Simulated Registry</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Verified Competitor Standings
          </h2>
          <p className="text-sm text-neutral-500">
            Real-time record ledger certifying precision move economies and fractional chronometric times.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-mono text-neutral-600">
                <tr>
                  <th className="py-3 px-6">Rank</th>
                  <th className="py-3 px-6">Player ID</th>
                  <th className="py-3 px-6">Discipline</th>
                  <th className="py-3 px-6">Time Recorded</th>
                  <th className="py-3 px-6">Moves</th>
                  <th className="py-3 px-6">Score</th>
                  <th className="py-3 px-6">Architectural Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {[
                  { rank: '#01', id: 'vector_alchemist', mode: 'Master (5 Colors)', time: '0m 46.12s', moves: '21 (Opt)', score: '100', tier: 'QUANTUM EDGE', tierColor: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
                  { rank: '#02', id: 'chronos_mind', mode: 'Master (5 Colors)', time: '0m 52.88s', moves: '22 (+1)', score: '98', tier: 'QUANTUM EDGE', tierColor: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
                  { rank: '#03', id: 'solaris_prime', mode: 'Adept (4 Colors)', time: '0m 38.45s', moves: '14 (+1)', score: '98', tier: 'QUANTUM EDGE', tierColor: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
                  { rank: '#04', id: 'matrix_surfer', mode: 'Quantum (6 Colors)', time: '1m 24.10s', moves: '30 (+2)', score: '96', tier: 'QUANTUM EDGE', tierColor: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
                  { rank: '#05', id: 'hyper_solver', mode: 'Adept (4 Colors)', time: '0m 58.20s', moves: '16 (+3)', score: '94', tier: 'APEX VECTOR', tierColor: 'text-emerald-600 bg-emerald-50 border-emerald-200' }
                ].map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 font-mono font-bold text-neutral-400">{row.rank}</td>
                    <td className="py-3.5 px-6 font-bold text-neutral-900">{row.id}</td>
                    <td className="py-3.5 px-6 text-neutral-600">{row.mode}</td>
                    <td className="py-3.5 px-6 font-mono text-neutral-700">{row.time}</td>
                    <td className="py-3.5 px-6 font-mono text-neutral-700">{row.moves}</td>
                    <td className="py-3.5 px-6 font-extrabold text-neutral-900">{row.score}</td>
                    <td className="py-3.5 px-6">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${row.tierColor}`}>
                        {row.tier}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: STRUCTURAL CREATION PROJECTS (EXECUTIVE BREAKDOWN MANDATED)
          Mega Ecosystems: Olympiad Edge, IDAI Universe
          Project Hubs: Prime Factor Elite Arena
          ========================================================================= */}
      <section id="ecosystems" className="gsap-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-10">
          
          <div className="border-b border-slate-100 pb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600">Executive Summary</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Structural Creation Projects Breakdown
            </h2>
            <p className="text-sm text-neutral-500 mt-2 max-w-3xl leading-relaxed">
              Game Zone is integrated into the high-order technological ecosystem architected by Rayaan Tasnim. Below is the structural summary of our interconnected Mega Ecosystems and Project Hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Mega Ecosystem 1: Olympiad Edge */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:bg-white hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase font-bold text-cyan-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Mega Ecosystem 01
                  </span>
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Olympiad Edge</h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                  The flagship competitive mathematical Olympiad and algorithmic training infrastructure. Connects theoretical combinatorial theorems directly with real-time heuristic simulations, equipping mathematical competitors with computational intuition and Olympiad-caliber problem breakdowns.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-bold text-cyan-600 flex items-center justify-between">
                <span>Algorithmic Mathematics</span>
                <span>Active Core →</span>
              </div>
            </div>

            {/* Mega Ecosystem 2: IDAI Universe */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:bg-white hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase font-bold text-blue-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Mega Ecosystem 02
                  </span>
                  <Cpu className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">IDAI Universe</h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                  The overarching intelligent software network developed by Rayaan Tasnim. IDAI Universe establishes the unified identity, cryptographic certification, and cross-platform architecture linking gaming, pedagogical simulations, and data governance into an immaculate technological collective.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-bold text-blue-600 flex items-center justify-between">
                <span>Ecosystem Backbone</span>
                <span>Certified →</span>
              </div>
            </div>

            {/* Project Hub 1: Prime Factor Elite Arena */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:bg-white hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase font-bold text-rose-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Project Hub 01
                  </span>
                  <Activity className="w-4 h-4 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Prime Factor Elite Arena</h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                  The premier high-velocity numerical decomposition hub. Solvers decompose complex composite numbers into fundamental prime components under strict temporal decay curves, testing speed mathematics and mental arithmetic under identical telemetry benchmarks as Water Sort.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-bold text-rose-600 flex items-center justify-between">
                <span>Speed Number Theory</span>
                <span>Integrated Hub →</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: ENTERPRISE ARCHITECTURE & ANTI-SLOP DISCIPLINE
          ========================================================================= */}
      <section className="gsap-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">Technical Governance</span>
              <h2 className="text-3xl font-extrabold tracking-tight">
                Deterministic Client-Side Speed & Anti-Slop Discipline
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Game Zone enforces strict anti-slop guidelines: no dark mode neon noise, no broken external image links, no hallucinated cockpit meters, and zero dead buttons. Telemetry calculations are mathematically verifiable on the client with zero network roundtrips.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-[10px] font-mono text-cyan-300 uppercase block">Execution Latency</span>
                <span className="text-xl font-bold text-white font-mono">&lt; 1 millisecond</span>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-[10px] font-mono text-cyan-300 uppercase block">Asset Reliability</span>
                <span className="text-xl font-bold text-white font-mono">100% In-Memory Synthesized</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 12: COMMUNITY & NEXT DROP PORTAL (GRAND CTA)
          ========================================================================= */}
      <section className="gsap-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-gradient-to-r from-white via-cyan-50/40 to-white rounded-3xl border border-cyan-200 p-8 sm:p-16 text-center space-y-6 shadow-xl relative overflow-hidden">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600">The Arena Awaits</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
              Prove Your Fluid Sorting Intellect
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Step into the Water Sort laboratory, test your spatial lookahead against par time, and copy your certified performance badge to the global leaderboards.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/games/water-sort/play"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white font-extrabold text-sm shadow-md hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:scale-[1.02] transition-all"
              >
                <span>Enter Water Sort Lab Now</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                to="/faq"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-200 text-neutral-800 font-bold text-sm shadow-sm hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:scale-[1.02] transition-all"
              >
                <span>50+ Questions FAQ</span>
                <ArrowRight className="w-4 h-4 text-cyan-600" />
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200/60 max-w-xl mx-auto flex items-center justify-between text-xs text-neutral-400">
            <span>Certified by Rayaan Tasnim</span>
            <span>Powered by IDAI Universe</span>
            <span>© All rights reserved</span>
          </div>

        </div>
      </section>

    </div>
  );
}
