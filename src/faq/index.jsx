import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Sparkles, 
  Filter, 
  Table, 
  Activity, 
  ShieldCheck, 
  FlaskConical, 
  Cpu 
} from 'lucide-react';

// 52 distinct detailed questions covering all dimensions of Game Zone
const FAQ_DATA = [
  // Category 1: Gameplay & Liquid Dynamics (10 Qs)
  {
    id: 1,
    category: 'Gameplay & Physics',
    question: 'What is the primary objective of the Water Sort challenge in Game Zone?',
    type: 'text',
    answer: 'The primary objective is to separate mixed chromatic liquids within laboratory test tubes until each non-empty tube contains exactly four units of one pure, uniform color, leaving auxiliary buffer tubes entirely empty.'
  },
  {
    id: 2,
    category: 'Gameplay & Physics',
    question: 'What are the two strict rules governing valid liquid pours?',
    type: 'table',
    answer: {
      intro: 'Liquid transfers are validated against strict invariant conditions:',
      headers: ['Condition', 'Rule Specification', 'System Behavior'],
      rows: [
        ['Empty Vial Destination', 'Any top color can be poured into an empty vial', 'Authorized as auxiliary buffer creation'],
        ['Matching Color Destination', 'Destination top segment must match source top segment', 'Authorized if capacity < 4 units'],
        ['Clashing Color Destination', 'Destination top segment differs from source top', 'Immature transfer rejected with audio cue'],
        ['Full Destination', 'Destination already contains 4 units of fluid', 'Saturated volume rejection']
      ]
    }
  },
  {
    id: 3,
    category: 'Gameplay & Physics',
    question: 'How does multi-unit batch pouring operate in a single move?',
    type: 'text',
    answer: 'If the source vial possesses two or three stacked adjacent segments of the identical color, and the recipient vial has sufficient vacant volume, the engine decants all matching layers simultaneously as one atomic move in the telemetry calculation.'
  },
  {
    id: 4,
    category: 'Gameplay & Physics',
    question: 'Can liquid be poured into a tube that already holds four units?',
    type: 'text',
    answer: 'No. Every test tube enforces a strict hard physical capacity ceiling of four liquid units. Any attempt to pour into a saturated vial is rejected.'
  },
  {
    id: 5,
    category: 'Gameplay & Physics',
    question: 'What happens when a tube is completely sorted with four identical colors?',
    type: 'graphic',
    answer: {
      headline: 'Equilibrium State Locking',
      desc: 'Once four identical color units occupy a single vial, the tube enters Equilibrium Lock. The border glows emerald, an overtone chime resonates, and further pours into or out of this locked vial are disabled to prevent state regression.',
      metricLabel: 'Stability Level',
      metricValue: '100% Monochromatic Equilibrium'
    }
  },
  {
    id: 6,
    category: 'Gameplay & Physics',
    question: 'What is the role of auxiliary empty tubes?',
    type: 'text',
    answer: 'Auxiliary empty tubes act as critical algorithmic swap buffers. They allow solvers to temporarily park disruptive surface layers to expose deep color strata underneath without deadlocking other vials.'
  },
  {
    id: 7,
    category: 'Gameplay & Physics',
    question: 'How does the tactical Hint engine determine suggested moves?',
    type: 'text',
    answer: 'The Hint engine executes a breadth-first lookahead prober across all active vial pairs, identifying safe non-regressive decanting permutations that either free an auxiliary tube or consolidate matching segments.'
  },
  {
    id: 8,
    category: 'Gameplay & Physics',
    question: 'Does utilizing the Undo feature impact the total move counter?',
    type: 'text',
    answer: 'The Undo button steps back the board configuration to the previous state stack and decrements the move counter accordingly, allowing players to remediate accidental misclicks or explore alternate branch trajectories.'
  },
  {
    id: 9,
    category: 'Gameplay & Physics',
    question: 'What is the function of the +Aux Flask power-up?',
    type: 'text',
    answer: 'If a puzzle enters a high-entropy state with no remaining valid permutations, the +Aux Flask button injects one additional empty glass vial onto the rack, creating an emergency buffer to rescue the run.'
  },
  {
    id: 10,
    category: 'Gameplay & Physics',
    question: 'Can a puzzle seed be mathematically unsolvable?',
    type: 'text',
    answer: 'No. Every puzzle matrix generated in Game Zone is pre-validated through an automated graph solver to guarantee at least one deterministic solution path prior to presenting the seed to the player.'
  },

  // Category 2: Scoring & Telemetry Arithmetic (10 Qs)
  {
    id: 11,
    category: 'Scoring & Telemetry',
    question: 'What is the exact mathematical formula for points calculation?',
    type: 'graphic',
    answer: {
      headline: 'The Central Telemetry Equation',
      desc: 'Points Gained = Max(0, 100 - TimePenalty - InefficiencyPenalty). Scoring begins at 100 points, with deductions applied for temporal latency beyond par and moves exceeding optimal trajectory.',
      metricLabel: 'Formula Core',
      metricValue: '100 - (TimeExcess / 2) - (MoveExcess × 2)'
    }
  },
  {
    id: 12,
    category: 'Scoring & Telemetry',
    question: 'How is the temporal drag penalty calculated?',
    type: 'text',
    answer: 'For every 2 full seconds spent beyond the designated par completion time, exactly 1 point is deducted. If the puzzle is solved within or ahead of par time, the temporal penalty is precisely zero.'
  },
  {
    id: 13,
    category: 'Scoring & Telemetry',
    question: 'How is the move inefficiency penalty computed?',
    type: 'text',
    answer: 'Every decanting move committed beyond the pre-calculated minimum optimal move threshold incurs a strict 2-point penalty. Solving the puzzle in the exact optimal move count incurs zero move penalty.'
  },
  {
    id: 14,
    category: 'Scoring & Telemetry',
    question: 'What are the optimal move and par time baselines for Novice Matrix?',
    type: 'table',
    answer: {
      intro: 'Novice tier parameters for introductory fluid sorting:',
      headers: ['Parameter', 'Value', 'Rationale'],
      rows: [
        ['Spectral Colors', '3 Colors (Cyan, Rose, Amber)', 'Minimal branch complexity'],
        ['Total Vials', '4 Tubes (3 filled, 1 buffer)', 'Standard 1-buffer swap topology'],
        ['Par Window', '40.00 seconds', 'Generous deliberation allotment'],
        ['Optimal Move Boundary', '9 moves', 'Calculated via depth-first solver']
      ]
    }
  },
  {
    id: 15,
    category: 'Scoring & Telemetry',
    question: 'What are the optimal move and par time baselines for Adept Matrix?',
    type: 'table',
    answer: {
      intro: 'Adept tier parameters for standard competitive play:',
      headers: ['Parameter', 'Value', 'Rationale'],
      rows: [
        ['Spectral Colors', '4 Colors (Cyan, Rose, Amber, Emerald)', 'Intermediate permutation space'],
        ['Total Vials', '5 Tubes (4 filled, 1 buffer)', 'Single auxiliary buffer constraint'],
        ['Par Window', '65.00 seconds', 'Moderate velocity pacing required'],
        ['Optimal Move Boundary', '13 moves', 'Theoretical minimum graph traversal']
      ]
    }
  },
  {
    id: 16,
    category: 'Scoring & Telemetry',
    question: 'What are the optimal move and par time baselines for Master Matrix?',
    type: 'table',
    answer: {
      intro: 'Master tier parameters for advanced tactical solvers:',
      headers: ['Parameter', 'Value', 'Rationale'],
      rows: [
        ['Spectral Colors', '5 Colors (+ Violet)', 'High chromatic density'],
        ['Total Vials', '7 Tubes (5 filled, 2 buffers)', 'Dual auxiliary buffer allocation'],
        ['Par Window', '100.00 seconds', 'Requires deep spatial lookahead'],
        ['Optimal Move Boundary', '21 moves', 'Extended transition pathing']
      ]
    }
  },
  {
    id: 17,
    category: 'Scoring & Telemetry',
    question: 'What are the optimal move and par time baselines for Quantum Matrix?',
    type: 'table',
    answer: {
      intro: 'Quantum tier parameters for elite grandmaster challengers:',
      headers: ['Parameter', 'Value', 'Rationale'],
      rows: [
        ['Spectral Colors', '6 Colors (+ Cobalt)', 'Maximum permutation entropy'],
        ['Total Vials', '8 Tubes (6 filled, 2 buffers)', 'Demanding combinatorial management'],
        ['Par Window', '140.00 seconds', 'Sustained cognitive stamina'],
        ['Optimal Move Boundary', '28 moves', 'Intricate multi-stage color routing']
      ]
    }
  },
  {
    id: 18,
    category: 'Scoring & Telemetry',
    question: 'How are fractional seconds parsed and rendered in results?',
    type: 'text',
    answer: 'The chronometer tracks execution in continuous floating-point seconds. The Results subsystem formats this into human-readable fractional notation: e.g., "0 minutes 56.56 seconds" or "2 minutes 14.20 seconds".'
  },
  {
    id: 19,
    category: 'Scoring & Telemetry',
    question: 'Can total points drop below zero?',
    type: 'text',
    answer: 'No. The mathematical formula wraps the result in Max(0, ...), ensuring the lowest possible recorded score is 0 points (classified as STATIC DRIFT).'
  },
  {
    id: 20,
    category: 'Scoring & Telemetry',
    question: 'What are the 4 velocity commentary categories in framework.js?',
    type: 'text',
    answer: 'The commentary engine organizes exactly 20 chess-style rapid evaluation comments across 4 categories: Speed (e.g., "Supersonic Solve!"), Accuracy (e.g., "Brilliant Move!"), Streak (e.g., "On Fire! 🔥"), and Positional Recovery (e.g., "Tactical Recovery!").'
  },

  // Category 3: The 6 Architectural Rankings (10 Qs)
  {
    id: 21,
    category: 'Architectural Rankings',
    question: 'What score threshold is required to attain QUANTUM EDGE?',
    type: 'graphic',
    answer: {
      headline: 'QUANTUM EDGE: 95 – 100 Points',
      desc: 'The pinnacle ranking tier. Requires virtually flawless move economy and sub-par solving velocity. Solvers exhibit instantaneous lookahead and zero redundant decanting transfers.',
      metricLabel: 'Score Range',
      metricValue: '95 - 100 / 100 PTS'
    }
  },
  {
    id: 22,
    category: 'Architectural Rankings',
    question: 'What score threshold is required for APEX VECTOR?',
    type: 'text',
    answer: 'APEX VECTOR is awarded for scores spanning 85 to 94 points. It represents near-theoretical perfection with crisp topological pacing and at most 1-2 extraneous decants or minor temporal hesitation.'
  },
  {
    id: 23,
    category: 'Architectural Rankings',
    question: 'What score threshold governs the HYPER MATRIX classification?',
    type: 'text',
    answer: 'HYPER MATRIX is designated for scores between 70 and 84 points. Solvers demonstrate disciplined combinatorial competence with controlled move detours.'
  },
  {
    id: 24,
    category: 'Architectural Rankings',
    question: 'What score threshold corresponds to LOGIC CORE?',
    type: 'text',
    answer: 'LOGIC CORE covers the 50 to 69 point bracket. It indicates solid foundational heuristics with occasional detour overhead or moderate temporal drag.'
  },
  {
    id: 25,
    category: 'Architectural Rankings',
    question: 'What score threshold defines ALPHA NODE?',
    type: 'text',
    answer: 'ALPHA NODE spans 30 to 49 points. It characterizes exploratory solve trajectories that encountered significant routing obstacles or required extensive state trial-and-error.'
  },
  {
    id: 26,
    category: 'Architectural Rankings',
    question: 'What score threshold falls under STATIC DRIFT?',
    type: 'text',
    answer: 'STATIC DRIFT represents scores from 0 to 29 points, identifying solutions burdened by high entropy pathing, heavy move friction, and prolonged temporal drag.'
  },
  {
    id: 27,
    category: 'Architectural Rankings',
    question: 'Can a player gain QUANTUM EDGE if they exceed par time by 20 seconds?',
    type: 'text',
    answer: 'No. Exceeding par time by 20 seconds inflicts a -10 point temporal penalty (20 / 2 = 10), capping the maximum attainable score at 90 points, which places the player in APEX VECTOR.'
  },
  {
    id: 28,
    category: 'Architectural Rankings',
    question: 'Can a player gain QUANTUM EDGE with 3 excess moves beyond optimal?',
    type: 'text',
    answer: 'Yes, provided their completion time was under par! 3 excess moves incur a -6 point penalty (3 × 2 = 6). If no temporal penalty was incurred, 100 - 6 = 94, narrowly qualifying for high APEX VECTOR. If only 2 excess moves occurred, score is 96 (QUANTUM EDGE).'
  },
  {
    id: 29,
    category: 'Architectural Rankings',
    question: 'Are Architectural Rankings stored permanently in user certificates?',
    type: 'text',
    answer: 'Yes. When using the "Copy Performance" feature on the Results dashboard, the rank badge name and mathematical breakdown are immutably formatted into the verified clipboard certificate.'
  },
  {
    id: 30,
    category: 'Architectural Rankings',
    question: 'How does the ranking system compare to traditional ELO in chess?',
    type: 'text',
    answer: 'While chess ELO relies on pairwise opponent outcomes, Game Zone Architectural Rankings benchmark individual player efficiency directly against mathematical theoretical limits (minimum graph distance and par time).'
  },

  // Category 4: Technical Architecture & System Continuity (11 Qs)
  {
    id: 31,
    category: 'Technical Architecture',
    question: 'Why does Game Zone enforce pure light theme styling without dark mode?',
    type: 'text',
    answer: 'Game Zone adheres to a pure light-luxury design constitution centered around soft alabaster white (bg-slate-50), crisp high-contrast charcoal text (text-neutral-800), and luminous cyan glowing auras. This provides unmatched optical clarity, editorial dignity, and cohesive visual elegance.'
  },
  {
    id: 32,
    category: 'Technical Architecture',
    question: 'How are GSAP and ScrollTrigger integrated into the application?',
    type: 'text',
    answer: 'GSAP with ScrollTrigger provides smooth hardware-accelerated timeline orchestration, animating portal sections into view, managing dynamic accordion expansion, and delivering micro-interaction settling curves.'
  },
  {
    id: 33,
    category: 'Technical Architecture',
    question: 'How does the accordion prevent layout jumping and push the footer down?',
    type: 'text',
    answer: 'The accordion calculates natural scrollHeight dynamically and transitions using GSAP tweening, smoothly sliding open the active question while naturally pushing all subsequent DOM content and the global footer downward.'
  },
  {
    id: 34,
    category: 'Technical Architecture',
    question: 'Why are URL routes formatted as virtual API endpoints without .html extensions?',
    type: 'text',
    answer: 'All routes (/about, /faq, /games/water-sort/play) use React Router DOM BrowserRouter to ensure clean, modern, REST-inspired virtual paths that maintain browser history without legacy file extension artifacts.'
  },
  {
    id: 35,
    category: 'Technical Architecture',
    question: 'How does the Web Audio API synthesizer eliminate audio asset lag?',
    type: 'text',
    answer: 'Rather than streaming external MP3/WAV files that can fail or suffer download latency, native AudioContext oscillators generate immediate frequency ramps in memory for crisp, zero-latency acoustic feedback.'
  },
  {
    id: 36,
    category: 'Technical Architecture',
    question: 'How does the 3x3 interactive matrix navigation overlay operate?',
    type: 'text',
    answer: 'Triggered from the top bar hamburger icon, the 3x3 matrix deploys a frosted glass viewport overlay featuring 9 primary navigation nodes spanning the portal, game lab, whitepaper, FAQ, and ecosystem hubs.'
  },
  {
    id: 37,
    category: 'Technical Architecture',
    question: 'What browser clipboard API is utilized for performance certificate copying?',
    type: 'text',
    answer: 'The dashboard employs navigator.clipboard.writeText with standard newline line breaks, complemented by a fallback textarea selection script for cross-browser resilience.'
  },
  {
    id: 38,
    category: 'Technical Architecture',
    question: 'How is mobile touch responsiveness handled for vial selection?',
    type: 'text',
    answer: 'Test tube containers enforce minimum touch dimensions exceeding 48px by 200px with generous margins, responsive flex wrapping, and touch-friendly visual lift transitions.'
  },
  {
    id: 39,
    category: 'Technical Architecture',
    question: 'What is the anti-AI slop discipline enforced in Game Zone design?',
    type: 'text',
    answer: 'Game Zone strictly prohibits AI design clichés: no random purple-to-pink gradient pills, no dark mode neon noise, no code-comment titles like "// 01 ARCHITECTURE", and no fake telemetry tickers.'
  },
  {
    id: 40,
    category: 'Technical Architecture',
    question: 'Are there external image host dependencies in Game Zone?',
    type: 'text',
    answer: 'No. All high-key image assets are locally generated and housed within the repository, backed by styled CSS fallback containers to eliminate broken image icons.'
  },
  {
    id: 41,
    category: 'Technical Architecture',
    question: 'How is state preserved when transitioning from GameZone to Results?',
    type: 'text',
    answer: 'Game metrics (timeSpentSeconds, totalMoves, optimalMoves, parTimeSeconds) are securely packaged into React Router navigation state, enabling the Results component to compute full dynamic telemetry.'
  },

  // Category 5: Ecosystem, Certification & IDAI Universe (11 Qs)
  {
    id: 42,
    category: 'Ecosystem & Governance',
    question: 'Who is the author and certifying authority of Game Zone?',
    type: 'graphic',
    answer: {
      headline: 'Institutional Lineage & Certification',
      desc: 'Game Zone is authorized by Rayaan Tasnim and powered by IDAI Universe. Every verified performance output explicitly carries this immutable attribution structure.',
      metricLabel: 'Certifying Authority',
      metricValue: 'Authorized by Rayaan Tasnim'
    }
  },
  {
    id: 43,
    category: 'Ecosystem & Governance',
    question: 'What is IDAI Universe?',
    type: 'text',
    answer: 'IDAI Universe is an integrated intelligent software ecosystem founded by Rayaan Tasnim, dedicated to high-performance web platforms, computational thinking tools, and interactive educational environments.'
  },
  {
    id: 44,
    category: 'Ecosystem & Governance',
    question: 'What is Olympiad Edge and how does it connect to Game Zone?',
    type: 'text',
    answer: 'Olympiad Edge is the ecosystem flagship competitive mathematics and algorithmic problem-solving platform. Game Zone serves as the real-time cognitive playground testing algorithmic heuristics through interactive gameplay.'
  },
  {
    id: 45,
    category: 'Ecosystem & Governance',
    question: 'What is Prime Factor Elite Arena?',
    type: 'text',
    answer: 'Prime Factor Elite Arena is a speed computational game hub within the ecosystem focused on rapid prime factorization, integer decomposition, and competitive mathematical reflexes.'
  },
  {
    id: 46,
    category: 'Ecosystem & Governance',
    question: 'What exact metadata structure concludes copied performance summaries?',
    type: 'table',
    answer: {
      intro: 'The mandated clipboard footer structure is strictly formatted with real line breaks:',
      headers: ['Line Index', 'Mandated Output Text'],
      rows: [
        ['Line 1', 'Certified by Rayaan Tasnim'],
        ['Line 2', 'Powered by IDAI Universe'],
        ['Line 3', '© All rights reserved']
      ]
    }
  },
  {
    id: 47,
    category: 'Ecosystem & Governance',
    question: 'What exact text is rendered in the immutable Global Footer?',
    type: 'table',
    answer: {
      intro: 'The permanent uppercase footer text is rendered identically across all portal screens:',
      headers: ['Line', 'Exact Center-Aligned Content'],
      rows: [
        ['1', 'AUTHORIZED BY RAYAAN TASNIM'],
        ['2', 'POWERED BY IDAI UNIVERSE'],
        ['3', '© 2026 GAME ZONE. ALL RIGHTS RESERVED.']
      ]
    }
  },
  {
    id: 48,
    category: 'Ecosystem & Governance',
    question: 'Are player telemetry results calculated on the client or server?',
    type: 'text',
    answer: 'All telemetry evaluations are executed via client-side deterministic JavaScript arithmetic in framework.js, enabling instantaneous feedback with zero server roundtrip latency.'
  },
  {
    id: 49,
    category: 'Ecosystem & Governance',
    question: 'How do the light luxury glow effects enhance user focus?',
    type: 'text',
    answer: 'Carefully tuned box-shadow glow envelopes (hover:shadow-[0_0_30px_rgba(6,182,212,0.35)]) provide tactile physical feedback without jarring high-saturation neon noise, preserving optical endurance during prolonged play.'
  },
  {
    id: 50,
    category: 'Ecosystem & Governance',
    question: 'Can players challenge others using identical puzzle matrices?',
    type: 'text',
    answer: 'Yes! Because puzzle seeds use deterministic configurations, players can share matrix presets and compare their telemetry certificates to establish definitive speed and move-economy supremacy.'
  },
  {
    id: 51,
    category: 'Ecosystem & Governance',
    question: 'What upcoming games are slated for the Game Zone ecosystem?',
    type: 'text',
    answer: 'The expansion roadmap includes Quantum Chess Solver, Neon Topological Maze, Chromatic Sudoku, and Prime Factor Elite Arena, all sharing the unified telemetry and certification standards.'
  },
  {
    id: 52,
    category: 'Ecosystem & Governance',
    question: 'How can players verify their certificate authenticity?',
    type: 'text',
    answer: 'Every copied certificate contains the exact mathematical parameters (moves, time, par, deductions, and dynamic procedural feedback) which can be cross-verified against the framework.js calculation specifications.'
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const answerRefs = useRef({});

  const categories = [
    'All',
    'Gameplay & Physics',
    'Scoring & Telemetry',
    'Architectural Rankings',
    'Technical Architecture',
    'Ecosystem & Governance'
  ];

  // Filter questions based on search query and category
  const filteredQuestions = FAQ_DATA.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Handle accordion toggle with GSAP slide animation
  const handleToggle = (id) => {
    const isCurrentlyOpen = openId === id;
    const nextOpenId = isCurrentlyOpen ? null : id;

    // Animate closing of the currently open container
    if (openId && answerRefs.current[openId]) {
      gsap.to(answerRefs.current[openId], {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.inOut'
      });
    }

    // Animate opening of the newly selected container
    if (nextOpenId && answerRefs.current[nextOpenId]) {
      const el = answerRefs.current[nextOpenId];
      // Reset height to calculate natural scrollHeight
      gsap.set(el, { height: 'auto', opacity: 1 });
      const fullHeight = el.scrollHeight;
      gsap.fromTo(el, 
        { height: 0, opacity: 0 },
        { height: fullHeight, opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
    }

    setOpenId(nextOpenId);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>50+ Interactive Inquiries</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
            Game Zone Knowledge Base
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-500 leading-relaxed">
            Exhaustive architectural documentation covering fluid dynamics, arithmetic scoring baselines, ranking classifications, and ecosystem governance.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 50+ questions by keyword (e.g. 'penalty', 'quantum', 'auxiliary', 'optimal')..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-neutral-800 text-sm focus:bg-white focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-bold text-neutral-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'bg-slate-100 text-neutral-600 hover:text-neutral-900 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-neutral-400 flex items-center justify-between border-t border-slate-100 pt-3">
            <span>Showing {filteredQuestions.length} of {FAQ_DATA.length} verified specifications</span>
            <span>Single-row GSAP disclosure active</span>
          </div>

        </div>

        {/* 50+ Question Accordion Grid */}
        <div className="space-y-3">
          {filteredQuestions.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.18)]' 
                    : 'border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {/* Accordion Row Header */}
                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <span className="shrink-0 text-xs font-mono font-bold text-neutral-400">
                      #{item.id < 10 ? `0${item.id}` : item.id}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-neutral-900 hover:text-cyan-600 transition-colors">
                      {item.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-block text-[10px] font-mono uppercase font-bold text-neutral-400 px-2 py-0.5 rounded bg-slate-50 border border-slate-100">
                      {item.category.split(' ')[0]}
                    </span>
                    <div className={`p-1.5 rounded-xl bg-slate-50 border border-slate-200 text-neutral-600 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-600 border-cyan-200 bg-cyan-50' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Accordion Response Body (Smooth GSAP collapse/slide container) */}
                <div
                  ref={(el) => (answerRefs.current[item.id] = el)}
                  style={{ height: 0, opacity: 0, overflow: 'hidden' }}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100">
                    
                    {/* Render Text Answer */}
                    {item.type === 'text' && (
                      <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                        {item.answer}
                      </p>
                    )}

                    {/* Render Table Answer */}
                    {item.type === 'table' && (
                      <div className="space-y-3">
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {item.answer.intro}
                        </p>
                        <div className="overflow-x-auto rounded-xl border border-slate-200">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 border-b border-slate-200 font-mono text-neutral-700">
                              <tr>
                                {item.answer.headers.map((h, i) => (
                                  <th key={i} className="py-2.5 px-4 font-bold">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-sans">
                              {item.answer.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-slate-50/50">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="py-2.5 px-4 text-neutral-700 font-medium">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Render Graphic / Metric Callout Answer */}
                    {item.type === 'graphic' && (
                      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-50/60 to-blue-50/40 border border-cyan-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-cyan-800 uppercase tracking-wide">
                            {item.answer.headline}
                          </span>
                          <p className="text-xs text-neutral-600 leading-relaxed">
                            {item.answer.desc}
                          </p>
                        </div>
                        <div className="shrink-0 p-3 bg-white rounded-lg border border-cyan-200 text-center shadow-sm">
                          <span className="text-[10px] font-mono uppercase font-bold text-neutral-400 block">
                            {item.answer.metricLabel}
                          </span>
                          <span className="text-xs font-extrabold text-cyan-600 block mt-0.5">
                            {item.answer.metricValue}
                          </span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Help Portal Banner */}
        <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
          <h3 className="text-lg font-bold text-neutral-900">Have an Architectural Invariant Inquiry?</h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            Review the 10-section deep technical whitepaper or inspect the live Water Sort mechanics console.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <a
              href="/about"
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-neutral-800 text-xs font-bold transition-colors"
            >
              Read Whitepaper
            </a>
            <a
              href="/games/water-sort/play"
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold shadow-sm transition-colors"
            >
              Play Water Sort
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
