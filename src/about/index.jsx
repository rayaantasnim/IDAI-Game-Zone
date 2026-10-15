import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Zap, 
  Layers, 
  Award, 
  Clock, 
  Sparkles, 
  ArrowRight,
  ChevronRight,
  Database,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { ARCHITECTURAL_RANKS } from '../js/framework.js';

// Visual image assets from our parallel generation batch
const ASSET_HERO_WATER_SORT = '/src/assets/images/hero_water_sort_puzzle_1792082026953.jpg';
const ASSET_ARENA_HUB = '/src/assets/images/game_zone_arena_hub_1792082028438.jpg';
const ASSET_LOGIC_MATRIX = '/src/assets/images/logic_matrix_architecture_1792082029244.jpg';
const ASSET_TELEMETRY_MEDAL = '/src/assets/images/telemetry_award_insignia_1792082027352.jpg';

function ImageContainer({ src, alt, caption }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-sm group">
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-64 sm:h-80 object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-64 sm:h-80 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-cyan-50/20 to-white p-6 text-center">
          <Sparkles className="w-10 h-10 text-cyan-500 mb-3" />
          <span className="text-sm font-bold text-neutral-800">{alt}</span>
          <span className="text-xs text-neutral-400 mt-1">High-Key Architectural Visualization Specimen</span>
        </div>
      )}
      {caption && (
        <div className="px-4 py-2 bg-white/90 backdrop-blur-sm border-t border-slate-100 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
          <span>{caption}</span>
          <span className="text-cyan-600 font-bold">LIGHT LUXURY SPEC</span>
        </div>
      )}
    </div>
  );
}

export default function About() {
  const sections = [
    {
      id: 'sec-01',
      heading: '01. High-Concurrency Platform Topology',
      slogan: 'Zero-latency browser runtime delivering sub-millisecond mathematical physics.',
      brief: 'The Game Zone platform architecture enforces an immaculate separation between client-side game state rendering and background mathematical telemetry processing. Built entirely upon high-performance React functional paradigms and modern Vite bundling, the runtime establishes a frictionless canvas environment where animations, color layer decanting, and heuristic evaluation execute without frame dropping or memory leaks. By eliminating heavy external legacy scripts and dark UI constructs, our light luxury system maintains 60 frames per second on mobile touch interfaces as smoothly as workstation displays. Every component interaction adheres strictly to predictable state lifecycles and immutable operational matrices for total execution transparency.',
      image: ASSET_ARENA_HUB,
      imageAlt: 'High-key modern luxury digital gaming pavilion with soaring glass ceiling',
      caption: 'FIG 1.0 // Architectural Hub Layout & Spatial Integration',
      ctaText: 'Examine Portal Hub',
      ctaLink: '/'
    },
    {
      id: 'sec-02',
      heading: '02. Combinatorial Fluid Mechanics & Invariants',
      slogan: 'Deterministic state-machine transitions governing chemical and chromatic decanting.',
      brief: 'The Water Sort puzzle simulation is governed by rigorous mathematical combinatorial invariants. Each test tube represents a bounded vertical stack with a finite capacity of four fluid units. State transitions are strictly validated: liquid transfer is authorized only when the recipient tube contains zero units or when the recipient top liquid element exactly matches the spectral color identifier of the incoming stream. Furthermore, the engine automatically calculates contiguous homogeneous block depths, enabling multi-unit batch decanting within a single discrete move action. This algorithmic purity guarantees that every puzzle seed remains solvably deterministic while punishing erratic, exploratory permutations through move-economy telemetric analysis.',
      image: ASSET_HERO_WATER_SORT,
      imageAlt: 'Luminous minimalist glass laboratory test tubes with crystal colored liquids',
      caption: 'FIG 2.0 // Homogeneous Stack Allocation & Meniscus Topology',
      ctaText: 'Launch Simulation Engine',
      ctaLink: '/games/water-sort/play'
    },
    {
      id: 'sec-03',
      heading: '03. Algorithmic Par & Temporal Deductions',
      slogan: 'Precision chronometry pairing optimal heuristics against actual player latency.',
      brief: 'Temporal evaluation within Game Zone rejects arbitrary stopwatches in favor of parameterized par baselines. Each generated puzzle configuration is analyzed through a graph-search solver that identifies the theoretical minimum move count and its associated par completion window. For every two seconds a participant exceeds this baseline, the telemetry engine penalizes the score by exactly one point. This linear penalty enforces a dynamic tension between deliberative spatial foresight and rapid executive dispatch. The chronometer registers continuous fractional seconds with sub-hundredth precision, eliminating rounding ambiguities and yielding a pristine metric vector for competitive post-game deconstruction and tournament verification.',
      image: ASSET_LOGIC_MATRIX,
      imageAlt: 'Minimalist high-key composition of pure optical glass prisms and geometric crystal facets',
      caption: 'FIG 3.0 // Temporal Boundary Calibration & Dynamic Decay Curves',
      ctaText: 'Review Mechanics',
      ctaLink: '/games/water-sort/rules'
    },
    {
      id: 'sec-04',
      heading: '04. Move Economy & Inefficiency Penalization',
      slogan: 'Penalizing redundant state permutations to honor minimal graph traversals.',
      brief: 'True cognitive mastery is demonstrated through economical pathing rather than brute-force iteration. Our telemetry engine computes move inefficiency by comparing the player total decanting actions against the pre-calculated optimal boundary. Each excess move incurs a strict two-point deduction from the base hundred-point treasury. This quadratic penalty factor discourages mindless vial shuffling and rewards players who construct deliberate intermediate color buffers. By incorporating move efficiency into the primary telemetry calculation, Game Zone transforms an otherwise casual sorting exercise into an elite arena for high-stakes combinatorial reasoning and algorithmic discipline that separates novice trial-and-error from grandmaster trajectory execution.',
      image: ASSET_LOGIC_MATRIX,
      imageAlt: 'Optical glass prisms casting luminous reflections on pure alabaster',
      caption: 'FIG 4.0 // Heuristic Graph Traversal & Decanting Move Costs',
      ctaText: 'Inspect Scoring Criteria',
      ctaLink: '#rankings'
    },
    {
      id: 'sec-05',
      heading: '05. The Six Architectural Rankings Specification',
      slogan: 'Definitive mathematical tier classifications derived from points gained.',
      brief: 'The culmination of our scoring formula maps the runtime telemetry vector directly into one of six Architectural Rankings. Scoring from ninety-five to one hundred yields the rare QUANTUM EDGE tier, reserved for players operating at theoretical mathematical optimums. Scores from eighty-five to ninety-four grant the APEX VECTOR distinction, signifying near-flawless execution with minimal temporal drag. The HYPER MATRIX tier encompasses disciplined seventy to eighty-four solves, followed by LOGIC CORE for steady fifty to sixty-nine resolutions. Sub-fifty trajectories fall into ALPHA NODE or STATIC DRIFT, designating runs impaired by heavy move friction or excessive hesitation.',
      image: ASSET_TELEMETRY_MEDAL,
      imageAlt: 'Minimalist luxury platinum and translucent crystal geometric award insignia badge',
      caption: 'FIG 5.0 // Six-Tier Architectural Classification Hierarchy',
      ctaText: 'View Telemetry Framework',
      ctaLink: '/games/water-sort/results'
    },
    {
      id: 'sec-06',
      heading: '06. Procedural Suggestion Engine & Dynamic Synthesis',
      slogan: 'Real-time contextual coaching constructed algorithmically from runtime vectors.',
      brief: 'Rigid, pre-written static congratulatory messages are banned across Game Zone. In their place, our procedural commentary subsystem generates multi-sentence diagnostic paragraphs on the fly by cross-referencing completion times, move differentials, and velocity trends. The engine analyzes whether the player operated under par, identifies specific vial decanting bottlenecks, and articulates tailored tactical guidance for subsequent attempts. This dynamic feedback loop ensures that every completed run delivers genuine pedagogical value, helping solvers diagnose whether their primary failure mode was premature buffer exhaustion, excessive hesitation, or suboptimal depth-first color consolidation in the opening moves.',
      image: ASSET_ARENA_HUB,
      imageAlt: 'Modern luxury digital gaming pavilion with pristine lighting',
      caption: 'FIG 6.0 // Natural Language Synthesis & Heuristic Diagnostics',
      ctaText: 'Experience Live HUD',
      ctaLink: '/games/water-sort/play'
    },
    {
      id: 'sec-07',
      heading: '07. Synthesized Web Audio & Haptic Feedback',
      slogan: 'Zero-asset synthesized micro-tones ensuring instantaneous sensory response.',
      brief: 'To maintain pristine performance and absolute offline reliability, Game Zone eliminates hefty external audio file dependencies. Instead, our framework leverages the native browser Web Audio API to synthesize smooth frequency-modulated sound waves directly in memory. Selecting a glass vial activates an ascending sine oscillator; successful liquid decanting triggers harmonic overtone swells; completing a four-layer monochromatic vial resonates with a bright chord transition; and victory triggers a four-note polyphonic sequence. These lightweight acoustic cues reinforce tactile satisfaction without introducing latency, network bottlenecks, or audio clipping across varied mobile and desktop operating systems.',
      image: ASSET_HERO_WATER_SORT,
      imageAlt: 'Pristine glass test tubes on white marble',
      caption: 'FIG 7.0 // Web Audio Oscillator Synthesis & Harmonic Envelopes',
      ctaText: 'Test Acoustic Cues',
      ctaLink: '/games/water-sort/play'
    },
    {
      id: 'sec-08',
      heading: '08. Mega Ecosystem Integration: Olympiad Edge & IDAI',
      slogan: 'Harmonizing competitive mathematics, logic engines, and unified software.',
      brief: 'Game Zone operates as an integral quadrant within the broader IDAI Universe ecosystem conceived by Rayaan Tasnim. Connected intrinsically to Olympiad Edge—our flagship competitive problem-solving and algorithmic training framework—Game Zone serves as the experimental interactive playground where theoretical combinatorial puzzles meet real-time competitive gaming. Insights gathered from player pathing efficiency and decision velocity are directly channeled back into algorithmic research, creating a virtuous feedback loop between recreational puzzle mechanics, rigorous Olympiad mathematics, and advanced computational intelligence systems that empower solvers worldwide to push cognitive boundaries.',
      image: ASSET_ARENA_HUB,
      imageAlt: 'High-key modern luxury digital gaming pavilion',
      caption: 'FIG 8.0 // Ecosystem Interconnection & Algorithmic Synergy',
      ctaText: 'Discover Ecosystem Hubs',
      ctaLink: '/#ecosystems'
    },
    {
      id: 'sec-09',
      heading: '09. Project Hubs: Prime Factor Elite Arena',
      slogan: 'High-frequency integer decomposition and speed mathematics infrastructure.',
      brief: 'In parallel with spatial liquid mechanics, the Game Zone umbrella incorporates Prime Factor Elite Arena, a dedicated high-velocity numeric computation hub. Here, users deconstruct composite integers into fundamental prime building blocks under intense chronometric countdowns. Utilizing the identical light luxury design language, GSAP-orchestrated transitions, and real-time telemetry scoring frameworks as Water Sort, Prime Factor Elite exemplifies our design philosophy: educational depth married to exhilarating arcade responsiveness. Both modules demonstrate how modern web technologies can elevate intellectual gaming into an aspirational, aesthetically sublime discipline.',
      image: ASSET_LOGIC_MATRIX,
      imageAlt: 'Crystal prisms and geometric optical caustics',
      caption: 'FIG 9.0 // Prime Factor Elite Arena Structural Blueprint',
      ctaText: 'Explore Prime Arena',
      ctaLink: '/#ecosystems'
    },
    {
      id: 'sec-10',
      heading: '10. Architectural Governance & Future Roadmap',
      slogan: 'Immutably certified standards under Rayaan Tasnim and IDAI Universe.',
      brief: 'The governance of Game Zone enforces unwavering standards of user respect, clean aesthetic discipline, and cryptographic certainty. Every performance certificate copied from our results dashboard bears immutable attribution to Rayaan Tasnim and IDAI Universe, guaranteeing authentic algorithmic lineage. Looking toward future releases, our engineering roadmap encompasses multi-vial custom sandbox creation tools, community leaderboard verification, and expanded cognitive puzzle archetypes spanning spatial topology, parity games, and graph theory. Game Zone stands as a permanent testament to uncompromising light-luxury engineering in contemporary web applications.',
      image: ASSET_TELEMETRY_MEDAL,
      imageAlt: 'Platinum and translucent crystal award badge',
      caption: 'FIG 10.0 // Quality Governance & Long-Term Platform Scalability',
      ctaText: 'Launch Water Sort Now',
      ctaLink: '/games/water-sort/play'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Whitepaper Header Banner */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Technical Whitepaper & System Architecture</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
            Game Zone Technical Specification
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-neutral-500 leading-relaxed">
            A comprehensive 10-section breakdown of platform topology, combinatorial fluid invariants, arithmetic telemetry vectors, and the 6 Architectural Rankings.
          </p>
        </div>

        {/* Dedicated Section Detailing the Exact Criteria for the 6 Architectural Rankings */}
        <div id="rankings" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8 scroll-mt-28">
          <div className="border-b border-slate-100 pb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600">Core Telemetric Taxonomy</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
              The 6 Architectural Rankings Specification
            </h2>
            <p className="text-sm text-neutral-500 mt-2 max-w-2xl leading-relaxed">
              Every completed game computes: <code className="bg-slate-100 px-2 py-0.5 rounded text-neutral-800 font-mono">Points = Max(0, 100 - TimePenalty - InefficiencyPenalty)</code> where Time Penalty = -1 pt per 2s past par, and Inefficiency Penalty = -2 pts per excess move beyond optimal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARCHITECTURAL_RANKS.map((rank) => (
              <div
                key={rank.name}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-white hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      Score: {rank.minScore} - {rank.maxScore}
                    </span>
                    <span 
                      className="px-2.5 py-0.5 rounded-full border text-[10px] font-extrabold uppercase tracking-wider"
                      style={{
                        backgroundColor: rank.badgeColor.includes('cyan') ? '#ecfeff' :
                                         rank.badgeColor.includes('emerald') ? '#ecfdf5' :
                                         rank.badgeColor.includes('blue') ? '#eff6ff' :
                                         rank.badgeColor.includes('amber') ? '#fffbeb' : '#fef2f2',
                        borderColor: rank.glowColor,
                        color: rank.badgeColor.includes('cyan') ? '#0891b2' :
                               rank.badgeColor.includes('emerald') ? '#059669' :
                               rank.badgeColor.includes('blue') ? '#2563eb' :
                               rank.badgeColor.includes('amber') ? '#d97706' : '#e11d48'
                      }}
                    >
                      {rank.name}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{rank.name}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{rank.descriptor}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70 text-[11px] text-neutral-400 font-mono">
                  Standard Threshold: {rank.minScore}% Efficiency
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 10 Sections Enforcing Strict 5-Layer UI Layout:
            Layer 1: Core Heading
            Layer 2: Slogan
            Layer 3: 100+ Word Detailed Brief
            Layer 4: High-Key Image Asset
            Layer 5: Glowing Neon Action Link Button */}
        <div className="space-y-16">
          {sections.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all scroll-mt-28"
            >
              {/* Layer 1: Core Heading */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  {section.heading}
                </h2>
              </div>

              {/* Layer 2: Slogan */}
              <div>
                <p className="text-sm sm:text-base font-semibold text-cyan-600 tracking-wide">
                  {section.slogan}
                </p>
              </div>

              {/* Layer 3: 100+ Word Detailed Brief */}
              <div>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
                  {section.brief}
                </p>
              </div>

              {/* Layer 4: High-Key Pexels/Generated Image Asset */}
              <div>
                <ImageContainer
                  src={section.image}
                  alt={section.imageAlt}
                  caption={section.caption}
                />
              </div>

              {/* Layer 5: Glowing Neon Action Link Button */}
              <div className="pt-2">
                <Link
                  to={section.ctaLink}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-cyan-300 text-cyan-600 font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-[1.02] hover:bg-cyan-50/50 transition-all duration-200"
                >
                  <span>{section.ctaText}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Technical Summary Footer Note */}
        <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-2">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600">IDAI Whitepaper Revision 2.6</p>
          <p className="text-sm text-neutral-600 font-medium">
            Published under the authority of Rayaan Tasnim for IDAI Universe global network.
          </p>
        </div>

      </div>
    </div>
  );
}
