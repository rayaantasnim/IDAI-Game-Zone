import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  FlaskConical, 
  Sparkles, 
  Timer, 
  Award, 
  Info,
  ChevronRight
} from 'lucide-react';

export default function Rules() {
  const [activeTab, setActiveTab] = useState('invariants');

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold uppercase tracking-wider">
            <FlaskConical className="w-4 h-4" />
            <span>Combinatorial Fluid Dynamics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
            Water Sort: Rules & Heuristics
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-500 leading-relaxed">
            Master the thermodynamic sorting algorithm. Liquid molecules must be segregated into pure uniform chromatic vials with minimal state transitions.
          </p>
          <div className="pt-2">
            <Link
              to="/games/water-sort/play"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-md hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-[1.02] transition-all"
            >
              <span>Launch Live Simulation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm gap-2">
            {[
              { id: 'invariants', label: 'Core Invariants' },
              { id: 'pourMechanics', label: 'Decanting Logic' },
              { id: 'parMetrics', label: 'Par & Penalties' },
              { id: 'proStrategy', label: 'Tactical Heuristics' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content 1: Core Invariants */}
        {activeTab === 'invariants' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 mb-3">Uniform Column Completion</h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                A vial achieves terminal equilibrium when all 4 liquid segments contain the exact same spectral color hue. Completed vials lock their state once full and uniform.
              </p>
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-24 rounded-full border-2 border-slate-300 bg-white p-1 flex flex-col justify-end overflow-hidden">
                  <div className="h-full w-full rounded-b-full bg-cyan-400"></div>
                </div>
                <div className="text-xs text-neutral-500">
                  <span className="font-bold text-emerald-600">STABLE EQUILIBRIUM:</span> 4 cyan units assembled. No further operations permitted.
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 mb-3">Strict Volume Conservation</h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Every test tube has a strict volume boundary of 4 units. Liquid cannot be poured into a destination vial if it would cause an overflow past the 4-unit limit.
              </p>
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-24 rounded-full border-2 border-slate-300 bg-white p-1 flex flex-col justify-end space-y-0.5 overflow-hidden">
                  <div className="h-1/4 w-full bg-rose-400"></div>
                  <div className="h-1/4 w-full bg-rose-400"></div>
                  <div className="h-1/4 w-full bg-amber-400"></div>
                  <div className="h-1/4 w-full rounded-b-full bg-emerald-400"></div>
                </div>
                <div className="text-xs text-neutral-500">
                  <span className="font-bold text-rose-600">SATURATED:</span> 4/4 units present. Source pour rejected until volume is freed.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Decanting Logic */}
        {activeTab === 'pourMechanics' && (
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-8 animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Valid Transfer Permutations</h2>
              <p className="text-sm text-neutral-500">
                Transfers execute under two conditions: targeting an empty auxiliary vial or matching top-level surface colors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Valid Transfer */}
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Permitted: Chromatic Coincidence</span>
                </div>
                <p className="text-xs text-neutral-600 mb-4">
                  Pouring cyan liquid onto an existing top-layer of cyan liquid in a non-full target vial. Consecutive matching layers transfer continuously.
                </p>
                <div className="flex items-center justify-center gap-6 py-4 bg-white rounded-xl border border-emerald-100">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-neutral-400 mb-1">Source</span>
                    <div className="w-8 h-20 rounded-full border-2 border-slate-300 p-0.5 flex flex-col justify-end">
                      <div className="h-1/3 w-full bg-cyan-400 rounded-t-sm"></div>
                      <div className="h-1/3 w-full bg-amber-400"></div>
                      <div className="h-1/3 w-full bg-amber-400 rounded-b-full"></div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-500 animate-pulse" />
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-neutral-400 mb-1">Target</span>
                    <div className="w-8 h-20 rounded-full border-2 border-slate-300 p-0.5 flex flex-col justify-end">
                      <div className="h-1/3 w-full bg-cyan-400"></div>
                      <div className="h-1/3 w-full bg-cyan-400 rounded-b-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invalid Transfer */}
              <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-3">
                  <XCircle className="w-5 h-5" />
                  <span>Prohibited: Chromatic Clash</span>
                </div>
                <p className="text-xs text-neutral-600 mb-4">
                  Attempting to pour cyan liquid onto amber liquid. Chemical immiscibility will immediately reject the transfer request.
                </p>
                <div className="flex items-center justify-center gap-6 py-4 bg-white rounded-xl border border-rose-100">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-neutral-400 mb-1">Source</span>
                    <div className="w-8 h-20 rounded-full border-2 border-slate-300 p-0.5 flex flex-col justify-end">
                      <div className="h-1/3 w-full bg-cyan-400 rounded-t-sm"></div>
                      <div className="h-1/3 w-full bg-emerald-400"></div>
                      <div className="h-1/3 w-full bg-emerald-400 rounded-b-full"></div>
                    </div>
                  </div>
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-neutral-400 mb-1">Target</span>
                    <div className="w-8 h-20 rounded-full border-2 border-slate-300 p-0.5 flex flex-col justify-end">
                      <div className="h-1/3 w-full bg-amber-400"></div>
                      <div className="h-1/3 w-full bg-amber-400 rounded-b-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Par & Penalties */}
        {activeTab === 'parMetrics' && (
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Arithmetic Scoring Vector</h2>
              <p className="text-sm text-neutral-500">
                Evaluation begins at a perfect 100 points, subject to rigorous mathematical deduction parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs font-mono font-bold text-neutral-400 uppercase">Base Score</span>
                <p className="text-3xl font-extrabold text-neutral-900 mt-2">100 pts</p>
                <p className="text-xs text-neutral-500 mt-1">Starting allocation for any clean matrix.</p>
              </div>

              <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
                <span className="text-xs font-mono font-bold text-amber-700 uppercase">Temporal Drag</span>
                <p className="text-3xl font-extrabold text-amber-600 mt-2">-1 pt / 2s</p>
                <p className="text-xs text-neutral-500 mt-1">Applied for every 2 seconds exceeding par window.</p>
              </div>

              <div className="p-6 rounded-2xl bg-rose-50/70 border border-rose-200 text-center">
                <span className="text-xs font-mono font-bold text-rose-700 uppercase">Inefficiency Penalty</span>
                <p className="text-3xl font-extrabold text-rose-600 mt-2">-2 pts / move</p>
                <p className="text-xs text-neutral-500 mt-1">Deducted for each move beyond optimal quota.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-50/60 border border-cyan-200 flex items-start gap-3">
              <Info className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-700 leading-relaxed">
                <strong className="text-cyan-900 font-bold">Mathematical Invariant:</strong> Final Points Gained = <code className="bg-white px-2 py-0.5 rounded border border-cyan-200 font-mono">Max(0, 100 - TimePenalty - InefficiencyPenalty)</code>. Your performance directly charts into one of the 6 Architectural Rankings, with scores $\ge 95$ awarded the coveted <strong className="text-cyan-600">QUANTUM EDGE</strong> tier.
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 4: Tactical Heuristics */}
        {activeTab === 'proStrategy' && (
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Grandmaster Solving Strategies</h2>
            <div className="space-y-4">
              {[
                {
                  step: '01',
                  title: 'Protect the Auxiliary Buffer',
                  desc: 'Never pour random singleton colors into an empty vial unless it directly reveals a matching color beneath it. An empty vial is your highest-value flexibility buffer.'
                },
                {
                  step: '02',
                  title: 'Top-Layer Unification',
                  desc: 'Identify the color with the highest distribution on top tiers and consolidate those first. This frees intermediate storage for buried blocks.'
                },
                {
                  step: '03',
                  title: 'Depth-First Column Excavation',
                  desc: 'Focus on clearing one single vial completely down to its base to restore your auxiliary empty buffer as early as move 4 or 5.'
                },
                {
                  step: '04',
                  title: 'Continuous Block Transfers',
                  desc: 'Take advantage of automatic multi-unit pours: transferring two or three stacked identical colors costs only 1 single move action in telemetry calculation.'
                }
              ].map(strategy => (
                <div key={strategy.step} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                  <span className="font-mono text-sm font-extrabold text-cyan-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm">
                    {strategy.step}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">{strategy.title}</h3>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{strategy.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Ready to Test Your Cognitive Fluidity?
            </h3>
            <p className="text-sm text-neutral-500">
              Select your puzzle complexity, initialize the liquid matrix, and race the par window for a verified Quantum Edge certification.
            </p>
            <div className="pt-2">
              <Link
                to="/games/water-sort/play"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white font-extrabold text-sm shadow-md hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-[1.02] transition-all"
              >
                <span>Enter Water Sort Arena</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
