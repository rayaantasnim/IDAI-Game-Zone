import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Award, 
  RotateCcw, 
  Share2, 
  Check, 
  Sparkles, 
  Timer, 
  Activity, 
  ShieldCheck, 
  ArrowRight,
  TrendingDown,
  Layers,
  ChevronRight
} from 'lucide-react';
import { evaluatePerformanceTelemetry, formatFractionalTime } from '../../js/framework.js';

export default function Results({ onOpenMatrix }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Retrieve performance state from route state or use realistic demo fallback
  const rawState = location.state || {};
  const timeSpent = rawState.timeSpentSeconds ?? 56.56;
  const totalMoves = rawState.totalMoves ?? 14;
  const optimalMoves = rawState.optimalMoves ?? 13;
  const parTimeSeconds = rawState.parTimeSeconds ?? 65;
  const difficulty = rawState.difficulty ?? 'Adept Matrix (4 Colors)';

  // Calculate telemetry dynamically using runtime arithmetic vectors
  const telemetry = evaluatePerformanceTelemetry(timeSpent, totalMoves, optimalMoves, parTimeSeconds);

  // Format precise fractional execution time
  const preciseTimeDisplay = formatFractionalTime(telemetry.timeSpentSeconds);

  // Handle Copy Performance to clipboard with real line breaks
  const handleCopyPerformance = async () => {
    const summaryText = [
      `=== GAME ZONE PERFORMANCE TELEMETRY ===`,
      `Matrix: ${difficulty}`,
      `Score: ${telemetry.score} / 100`,
      `Architectural Rank: ${telemetry.rank}`,
      `Execution Time: ${preciseTimeDisplay}`,
      `Moves: ${telemetry.totalMoves} (Par Optimal: ${telemetry.optimalMoves})`,
      `Temporal Penalty: -${telemetry.timePenalty} pts`,
      `Move Inefficiency Penalty: -${telemetry.inefficiencyPenalty} pts`,
      `Rapid Commentary: "${telemetry.rapidComment}"`,
      ``,
      `Procedural Evaluation:`,
      `${telemetry.dynamicFeedback}`,
      ``,
      `Certified by Rayaan Tasnim`,
      `Powered by IDAI Universe`,
      `© All rights reserved`
    ].join('\r\n');

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(summaryText);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = summaryText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy performance telemetry', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm relative overflow-hidden">
          
          {/* Subtle light glow backdrop */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left: Neon Score Circle + Rank Badge */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              
              {/* High-brightness neon circle enclosing live point calculation */}
              <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-white border-4 border-cyan-400 neon-circle-pulse shadow-[0_0_35px_rgba(6,182,212,0.45)]">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-neutral-900 tracking-tight">
                    {telemetry.score}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
                    / 100 PTS
                  </span>
                </div>
              </div>

              {/* Dynamic Rank Badge & Rapid Commentary */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-extrabold uppercase tracking-wider shadow-sm transition-all duration-300"
                  style={{
                    backgroundColor: telemetry.rankDetails.badgeColor.includes('cyan') ? '#ecfeff' :
                                     telemetry.rankDetails.badgeColor.includes('emerald') ? '#ecfdf5' :
                                     telemetry.rankDetails.badgeColor.includes('blue') ? '#eff6ff' :
                                     telemetry.rankDetails.badgeColor.includes('amber') ? '#fffbeb' : '#fef2f2',
                    borderColor: telemetry.rankDetails.glowColor,
                    color: telemetry.rankDetails.badgeColor.includes('cyan') ? '#0891b2' :
                           telemetry.rankDetails.badgeColor.includes('emerald') ? '#059669' :
                           telemetry.rankDetails.badgeColor.includes('blue') ? '#2563eb' :
                           telemetry.rankDetails.badgeColor.includes('amber') ? '#d97706' : '#e11d48'
                  }}
                >
                  <Award className="w-4 h-4" />
                  <span>{telemetry.rank}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  {telemetry.rapidComment}
                </h1>
                
                <p className="text-xs sm:text-sm text-neutral-500 max-w-sm">
                  {telemetry.rankDetails.descriptor}
                </p>
              </div>

            </div>

            {/* Right: Copy & Play Again Action Buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={handleCopyPerformance}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-neutral-800 font-bold text-xs uppercase tracking-wider shadow-sm hover:border-cyan-300 hover:text-cyan-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:scale-[1.02] transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-neutral-500" />
                    <span>Copy Performance</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/games/water-sort/play')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-[1.02] transition-all"
              >
                <span>Play Again 🔄</span>
              </button>
            </div>

          </div>

        </div>

        {/* Dynamic Metric Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Execution Time */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs font-mono font-bold uppercase">Execution Time</span>
              <Timer className="w-4 h-4 text-cyan-600" />
            </div>
            <p className="text-lg font-extrabold text-neutral-900 tracking-tight">
              {preciseTimeDisplay}
            </p>
            <p className="text-[11px] text-neutral-500 mt-1 font-mono">
              Par Threshold: {telemetry.parTimeSeconds}s
            </p>
          </div>

          {/* Decanting Moves */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs font-mono font-bold uppercase">Decanting Moves</span>
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-neutral-900">
              {telemetry.totalMoves} <span className="text-xs font-normal text-neutral-400">/ {telemetry.optimalMoves} Opt</span>
            </p>
            <p className="text-[11px] text-neutral-500 mt-1">
              Delta: {telemetry.totalMoves - telemetry.optimalMoves > 0 ? `+${telemetry.totalMoves - telemetry.optimalMoves}` : '0 (Optimal)'}
            </p>
          </div>

          {/* Time Penalty */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs font-mono font-bold uppercase">Temporal Drag</span>
              <TrendingDown className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-extrabold text-neutral-900">
              -{telemetry.timePenalty} <span className="text-xs font-normal text-neutral-400">pts</span>
            </p>
            <p className="text-[11px] text-neutral-500 mt-1">
              -1 pt per 2s past {telemetry.parTimeSeconds}s
            </p>
          </div>

          {/* Move Inefficiency */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs font-mono font-bold uppercase">Move Friction</span>
              <TrendingDown className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-2xl font-extrabold text-neutral-900">
              -{telemetry.inefficiencyPenalty} <span className="text-xs font-normal text-neutral-400">pts</span>
            </p>
            <p className="text-[11px] text-neutral-500 mt-1">
              -2 pts per excess decant
            </p>
          </div>

        </div>

        {/* Runtime Suggestion Engine: Procedurally constructed paragraph */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Procedural Telemetry Vector & Cognitive Synthesis</span>
          </div>
          
          <h2 className="text-xl font-bold text-neutral-900">
            Algorithmic Performance Deconstruction
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-200/70 font-sans">
            {telemetry.dynamicFeedback}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-neutral-400 border-t border-slate-100 gap-2">
            <span>Matrix Archetype: {difficulty}</span>
            <span>Recorded at: {new Date(telemetry.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Next Game & Matrix Gateway Callout */}
        <div className="bg-gradient-to-r from-white via-cyan-50/30 to-white rounded-3xl border border-cyan-200/70 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-extrabold text-neutral-900">
              Explore More Challenges Across the Ecosystem
            </h3>
            <p className="text-xs text-neutral-500">
              Access the global 3×3 matrix to inspect Olympiad Edge, Prime Factor Elite, or the 50+ question knowledge base.
            </p>
          </div>

          <Link
            to="/"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:scale-[1.02] transition-all"
          >
            <span>Dive Into New Game 🚀</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
