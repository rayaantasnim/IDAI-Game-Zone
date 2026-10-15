import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  RotateCcw, 
  Undo2, 
  Lightbulb, 
  PlusCircle, 
  Volume2, 
  VolumeX, 
  Timer, 
  Activity, 
  Sparkles, 
  HelpCircle, 
  ChevronRight,
  Award,
  Play
} from 'lucide-react';
import { RAPID_PERFORMANCE_COMMENTS } from '../../js/framework.js';

// Visual color palette
const COLOR_PALETTE = {
  cyan: { bg: 'bg-cyan-500', name: 'Cyan', hex: '#06b6d4', glow: 'rgba(6, 182, 212, 0.4)' },
  rose: { bg: 'bg-rose-500', name: 'Rose', hex: '#f43f5e', glow: 'rgba(244, 63, 94, 0.4)' },
  amber: { bg: 'bg-amber-500', name: 'Amber', hex: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
  emerald: { bg: 'bg-emerald-500', name: 'Emerald', hex: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
  violet: { bg: 'bg-violet-500', name: 'Violet', hex: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.4)' },
  blue: { bg: 'bg-blue-600', name: 'Cobalt', hex: '#2563eb', glow: 'rgba(37, 99, 235, 0.4)' }
};

// Preset configurations for difficulty
const DIFFICULTY_PRESETS = {
  novice: {
    id: 'novice',
    label: 'Novice (3 Colors)',
    colorKeys: ['cyan', 'rose', 'amber'],
    emptyTubes: 1,
    parTimeSeconds: 40,
    optimalMoves: 9,
    initialTubes: [
      ['cyan', 'amber', 'rose', 'cyan'],
      ['rose', 'cyan', 'amber', 'rose'],
      ['amber', 'rose', 'cyan', 'amber'],
      []
    ]
  },
  adept: {
    id: 'adept',
    label: 'Adept (4 Colors)',
    colorKeys: ['cyan', 'rose', 'amber', 'emerald'],
    emptyTubes: 1,
    parTimeSeconds: 65,
    optimalMoves: 13,
    initialTubes: [
      ['cyan', 'amber', 'rose', 'emerald'],
      ['emerald', 'cyan', 'amber', 'rose'],
      ['rose', 'emerald', 'cyan', 'amber'],
      ['amber', 'rose', 'emerald', 'cyan'],
      []
    ]
  },
  master: {
    id: 'master',
    label: 'Master (5 Colors)',
    colorKeys: ['cyan', 'rose', 'amber', 'emerald', 'violet'],
    emptyTubes: 2,
    parTimeSeconds: 100,
    optimalMoves: 21,
    initialTubes: [
      ['cyan', 'amber', 'violet', 'rose'],
      ['emerald', 'cyan', 'amber', 'violet'],
      ['rose', 'emerald', 'cyan', 'amber'],
      ['violet', 'rose', 'emerald', 'cyan'],
      ['amber', 'violet', 'rose', 'emerald'],
      [],
      []
    ]
  },
  quantum: {
    id: 'quantum',
    label: 'Quantum (6 Colors)',
    colorKeys: ['cyan', 'rose', 'amber', 'emerald', 'violet', 'blue'],
    emptyTubes: 2,
    parTimeSeconds: 140,
    optimalMoves: 28,
    initialTubes: [
      ['cyan', 'blue', 'amber', 'violet'],
      ['rose', 'emerald', 'cyan', 'blue'],
      ['emerald', 'cyan', 'rose', 'amber'],
      ['blue', 'violet', 'amber', 'rose'],
      ['violet', 'amber', 'emerald', 'cyan'],
      ['rose', 'blue', 'violet', 'emerald'],
      [],
      []
    ]
  }
};

export default function GameZone() {
  const navigate = useNavigate();

  // Selected difficulty
  const [difficultyKey, setDifficultyKey] = useState('adept');
  const currentConfig = DIFFICULTY_PRESETS[difficultyKey];

  // Game state
  const [tubes, setTubes] = useState(() => JSON.parse(JSON.stringify(currentConfig.initialTubes)));
  const [selectedTubeIndex, setSelectedTubeIndex] = useState(null);
  const [moves, setMoves] = useState(0);
  const [history, setHistory] = useState([]);
  const [hasExtraFlask, setHasExtraFlask] = useState(false);
  const [activeComment, setActiveComment] = useState('Tactical Focus Activated.');
  const [hintMessage, setHintMessage] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Timer state
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isWon, setIsWon] = useState(false);

  // Audio Context synthesizer
  const audioCtxRef = useRef(null);

  const playSynthesizedTone = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'select') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(587, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'pour') {
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'completed_tube') {
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'invalid') {
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(180, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'win') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const noteOsc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          noteOsc.connect(noteGain);
          noteGain.connect(ctx.destination);
          noteOsc.frequency.setValueAtTime(freq, now + i * 0.1);
          noteGain.gain.setValueAtTime(0.12, now + i * 0.1);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3);
          noteOsc.start(now + i * 0.1);
          noteOsc.stop(now + i * 0.1 + 0.3);
        });
      }
    } catch {
      // Audio fallback silent
    }
  }, [soundEnabled]);

  // Restart / Reset game function
  const handleReset = useCallback((newDiffKey = difficultyKey) => {
    const targetConfig = DIFFICULTY_PRESETS[newDiffKey] || DIFFICULTY_PRESETS.adept;
    setDifficultyKey(newDiffKey);
    setTubes(JSON.parse(JSON.stringify(targetConfig.initialTubes)));
    setSelectedTubeIndex(null);
    setMoves(0);
    setHistory([]);
    setHasExtraFlask(false);
    setElapsedSeconds(0);
    setIsTimerRunning(false);
    setIsWon(false);
    setHintMessage(null);
    setActiveComment('Ready for Decanting Sequence.');
  }, [difficultyKey]);

  // Handle timer tick with fractional seconds
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && !isWon) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => +(prev + 0.1).toFixed(1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isWon]);

  // Check if a tube is completed (all 4 segments same color)
  const isTubeComplete = (tube) => {
    return tube.length === 4 && tube.every(c => c === tube[0]);
  };

  // Check overall win condition
  const checkWinCondition = useCallback((currentTubes) => {
    for (const tube of currentTubes) {
      if (tube.length === 0) continue;
      if (tube.length !== 4) return false;
      const first = tube[0];
      if (!tube.every(c => c === first)) return false;
    }
    return true;
  }, []);

  // Trigger win sequence
  const handleWin = useCallback(() => {
    setIsWon(true);
    setIsTimerRunning(false);
    playSynthesizedTone('win');
    setActiveComment('QUANTUM EDGE ACHIEVED! 🔥');

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6']
      });
    } catch {
      // Confetti fallback
    }
  }, [playSynthesizedTone]);

  // Handle clicking a tube
  const handleTubeClick = (targetIndex) => {
    if (isWon) return;

    // Start timer on first interaction
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    setHintMessage(null);

    // No tube currently selected: select this one if it has liquid
    if (selectedTubeIndex === null) {
      if (tubes[targetIndex].length === 0) {
        playSynthesizedTone('invalid');
        return;
      }
      // If tube is already complete, no need to touch
      if (isTubeComplete(tubes[targetIndex])) {
        playSynthesizedTone('invalid');
        setActiveComment('Vial Equilibrium already locked.');
        return;
      }

      setSelectedTubeIndex(targetIndex);
      playSynthesizedTone('select');
      return;
    }

    // Deselect if clicking the same tube
    if (selectedTubeIndex === targetIndex) {
      setSelectedTubeIndex(null);
      playSynthesizedTone('select');
      return;
    }

    // Attempt pour from selectedTubeIndex -> targetIndex
    const sourceTube = tubes[selectedTubeIndex];
    const targetTube = tubes[targetIndex];

    // Target must not be full
    if (targetTube.length >= 4) {
      playSynthesizedTone('invalid');
      setSelectedTubeIndex(targetIndex);
      return;
    }

    const sourceTopColor = sourceTube[sourceTube.length - 1];

    // If target has liquid, colors must match
    if (targetTube.length > 0 && targetTube[targetTube.length - 1] !== sourceTopColor) {
      playSynthesizedTone('invalid');
      // If clicking another tube with liquid, shift selection
      if (targetTube.length > 0 && !isTubeComplete(targetTube)) {
        setSelectedTubeIndex(targetIndex);
      } else {
        setSelectedTubeIndex(null);
      }
      return;
    }

    // Calculate how many consecutive top items of the same color can be transferred
    let countToMove = 0;
    for (let i = sourceTube.length - 1; i >= 0; i--) {
      if (sourceTube[i] === sourceTopColor) {
        countToMove++;
      } else {
        break;
      }
    }

    const availableSpace = 4 - targetTube.length;
    const actualMoveCount = Math.min(countToMove, availableSpace);

    if (actualMoveCount <= 0) {
      playSynthesizedTone('invalid');
      setSelectedTubeIndex(null);
      return;
    }

    // Save state to undo history
    setHistory(prev => [...prev, JSON.parse(JSON.stringify(tubes))]);

    // Perform the pour
    const nextTubes = JSON.parse(JSON.stringify(tubes));
    const movingColors = nextTubes[selectedTubeIndex].splice(nextTubes[selectedTubeIndex].length - actualMoveCount, actualMoveCount);
    nextTubes[targetIndex].push(...movingColors);

    setTubes(nextTubes);
    setMoves(prev => prev + 1);
    setSelectedTubeIndex(null);

    // Audio and Commentary reaction
    if (isTubeComplete(nextTubes[targetIndex])) {
      playSynthesizedTone('completed_tube');
      const streakComments = RAPID_PERFORMANCE_COMMENTS.streak;
      setActiveComment(streakComments[Math.floor(Math.random() * streakComments.length)]);
    } else {
      playSynthesizedTone('pour');
      const accuracyComments = RAPID_PERFORMANCE_COMMENTS.accuracy;
      setActiveComment(accuracyComments[Math.floor(Math.random() * accuracyComments.length)]);
    }

    // Check for win
    if (checkWinCondition(nextTubes)) {
      handleWin();
    }
  };

  // Undo previous move
  const handleUndo = () => {
    if (history.length === 0 || isWon) return;
    const previousState = history[history.length - 1];
    setTubes(previousState);
    setHistory(prev => prev.slice(0, prev.length - 1));
    setMoves(prev => Math.max(0, prev - 1));
    setSelectedTubeIndex(null);
    playSynthesizedTone('select');
    setActiveComment('State Reversion Executed.');
  };

  // Add extra empty tube power-up
  const handleAddFlask = () => {
    if (hasExtraFlask || isWon) return;
    setHistory(prev => [...prev, JSON.parse(JSON.stringify(tubes))]);
    setTubes(prev => [...prev, []]);
    setHasExtraFlask(true);
    playSynthesizedTone('select');
    setActiveComment('Auxiliary Vacuum Buffer Added.');
  };

  // Hint engine: search for any valid move
  const handleHint = () => {
    if (isWon) return;
    for (let i = 0; i < tubes.length; i++) {
      if (tubes[i].length === 0 || isTubeComplete(tubes[i])) continue;
      const sourceColor = tubes[i][tubes[i].length - 1];
      for (let j = 0; j < tubes.length; j++) {
        if (i === j) continue;
        const target = tubes[j];
        if (target.length >= 4) continue;
        if (target.length === 0 || target[target.length - 1] === sourceColor) {
          // Found a valid candidate move
          setHintMessage(`Tactical hint: Transfer from Tube #${i + 1} to Tube #${j + 1}`);
          playSynthesizedTone('select');
          return;
        }
      }
    }
    setHintMessage('No direct moves available. Try using Undo or Add Auxiliary Flask.');
  };

  // Transition to Results page with full telemetry state
  const handleViewResults = () => {
    navigate('/games/water-sort/results', {
      state: {
        timeSpentSeconds: elapsedSeconds || 1,
        totalMoves: moves,
        optimalMoves: currentConfig.optimalMoves,
        parTimeSeconds: currentConfig.parTimeSeconds,
        difficulty: currentConfig.label
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Header & Difficulty Selector */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🧪</span>
              <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight">Water Sort Matrix</h1>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Topological fluid segregation with real-time heuristic scoring.
            </p>
          </div>

          {/* Difficulty tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
            {Object.keys(DIFFICULTY_PRESETS).map(key => {
              const diff = DIFFICULTY_PRESETS[key];
              const isSelected = difficultyKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleReset(key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {diff.label.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Telemetry Live HUD Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          {/* Time Counter */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-400">Time Elapsed</span>
              <p className="text-lg font-mono font-extrabold text-neutral-900">
                {elapsedSeconds.toFixed(1)}s
              </p>
            </div>
          </div>

          {/* Moves Counter */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-400">Total Moves</span>
              <p className="text-lg font-mono font-extrabold text-neutral-900">
                {moves} <span className="text-xs font-normal text-neutral-400">/ {currentConfig.optimalMoves} Opt</span>
              </p>
            </div>
          </div>

          {/* Par Window */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-400">Par Benchmark</span>
              <p className="text-lg font-mono font-extrabold text-neutral-900">
                {currentConfig.parTimeSeconds}s
              </p>
            </div>
          </div>

          {/* Live Rapid Commentary Ticker */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-400">Live Commentary</span>
              <p className="text-xs font-bold text-neutral-900 truncate">
                {activeComment}
              </p>
            </div>
          </div>

        </div>

        {/* Tactical Controls Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl border border-slate-100 px-5 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length === 0 || isWon}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-neutral-700 text-xs font-bold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Undo ({history.length})</span>
            </button>

            <button
              type="button"
              onClick={handleHint}
              disabled={isWon}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-neutral-700 text-xs font-bold hover:bg-slate-100 disabled:opacity-40 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Hint</span>
            </button>

            <button
              type="button"
              onClick={handleAddFlask}
              disabled={hasExtraFlask || isWon}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-neutral-700 text-xs font-bold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-cyan-600" />
              <span>+Aux Flask {hasExtraFlask && '✓'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-label={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-600" /> : <VolumeX className="w-4 h-4 text-neutral-400" />}
            </button>

            <button
              type="button"
              onClick={() => handleReset()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-neutral-700 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Hint Notice */}
        {hintMessage && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 font-medium flex items-center justify-between animate-in fade-in">
            <span>{hintMessage}</span>
            <button onClick={() => setHintMessage(null)} className="text-amber-500 hover:text-amber-800 font-bold ml-2">✕</button>
          </div>
        )}

        {/* Central Game Arena: Luxury Glass Vials Layout */}
        <div className="relative bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm min-h-[420px] flex items-center justify-center">
          
          {/* Subtle laboratory rack stand effect */}
          <div className="w-full flex flex-wrap items-end justify-center gap-6 sm:gap-10 pb-6">
            {tubes.map((tube, tubeIndex) => {
              const isSelected = selectedTubeIndex === tubeIndex;
              const isFullUniform = isTubeComplete(tube);

              return (
                <div key={tubeIndex} className="flex flex-col items-center group">
                  
                  {/* Tube Index & Status Indicator */}
                  <span className={`text-[10px] font-mono font-bold mb-2 transition-colors ${
                    isSelected ? 'text-cyan-600' : isFullUniform ? 'text-emerald-600' : 'text-neutral-400'
                  }`}>
                    {isFullUniform ? 'COMPLETED' : `#${tubeIndex + 1}`}
                  </span>

                  {/* Glass Test Tube Container */}
                  <button
                    type="button"
                    onClick={() => handleTubeClick(tubeIndex)}
                    className={`relative w-14 sm:w-16 h-52 sm:h-56 rounded-b-3xl rounded-t-lg border-2 bg-gradient-to-b from-white/90 via-slate-50/50 to-white/95 p-1 flex flex-col justify-end overflow-hidden transition-all duration-200 focus:outline-none ${
                      isSelected
                        ? '-translate-y-5 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-105'
                        : isFullUniform
                        ? 'border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                        : 'border-slate-300 hover:border-cyan-300 hover:-translate-y-1 hover:shadow-md'
                    }`}
                    style={{
                      boxShadow: isSelected
                        ? '0 0 25px rgba(6, 182, 212, 0.4), inset 0 0 10px rgba(6, 182, 212, 0.15)'
                        : undefined
                    }}
                  >
                    {/* Glass rim reflection */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-white/80 border-b border-slate-200 rounded-t-lg z-20"></div>

                    {/* Tube vertical glare line */}
                    <div className="absolute top-2 bottom-2 left-1.5 w-1 bg-white/40 rounded-full z-20 pointer-events-none"></div>

                    {/* Empty fluid unit slots */}
                    {Array.from({ length: 4 - tube.length }).map((_, emptyIdx) => (
                      <div
                        key={`empty-${emptyIdx}`}
                        className="h-1/4 w-full border-b border-slate-100/40 pointer-events-none"
                      ></div>
                    ))}

                    {/* Filled fluid unit segments */}
                    {[...tube].reverse().map((colorKey, segmentIdx) => {
                      const colorInfo = COLOR_PALETTE[colorKey] || COLOR_PALETTE.cyan;
                      const isBottomSegment = segmentIdx === 0 && tube.length === 1;

                      return (
                        <div
                          key={`filled-${segmentIdx}`}
                          className={`h-1/4 w-full relative transition-all duration-300 ${colorInfo.bg} ${
                            isBottomSegment ? 'rounded-b-2xl' : ''
                          }`}
                          style={{
                            boxShadow: `inset 0 -2px 6px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.4)`
                          }}
                        >
                          {/* Liquid surface meniscus wave */}
                          {segmentIdx === tube.length - 1 && (
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/30 rounded-full blur-[0.5px]"></div>
                          )}
                        </div>
                      );
                    })}

                  </button>

                  {/* Base Rack Holder */}
                  <div className="w-16 sm:w-20 h-2 bg-slate-200 rounded-full mt-2 border border-slate-300/80 shadow-inner"></div>
                </div>
              );
            })}
          </div>

          {/* Victory Modal Overlay */}
          {isWon && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 z-30 animate-in fade-in zoom-in-95 duration-200">
              <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 text-center space-y-6">
                
                <div className="w-16 h-16 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <Sparkles className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600">Equilibrium Restored</span>
                  <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Matrix Resolved!</h2>
                  <p className="text-xs text-neutral-500">
                    All fluid layers unified with mathematical precision in {elapsedSeconds.toFixed(1)} seconds.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400">Total Moves</span>
                    <p className="text-xl font-extrabold text-neutral-900">{moves}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400">Time Recorded</span>
                    <p className="text-xl font-extrabold text-neutral-900">{elapsedSeconds.toFixed(1)}s</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={handleViewResults}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-[1.02] transition-all"
                  >
                    <span>View Performance Dashboard</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReset()}
                    className="w-full py-3 px-6 rounded-2xl bg-white border border-slate-200 text-neutral-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors"
                  >
                    Play Again
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Guidance Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 px-2 gap-2">
          <span>Click any non-empty tube to lift, then click an adjacent compatible tube to pour.</span>
          <span className="font-mono text-neutral-400">IDAI Kinetic Engine v2.6</span>
        </div>

      </div>
    </div>
  );
}
