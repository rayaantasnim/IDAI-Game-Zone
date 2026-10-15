/**
 * Central Telemetry Engine & Rapid Commentary Subsystem
 * Game Zone - IDAI Universe
 * Authorized by Rayaan Tasnim
 */

// Exactly 20 distinct Chess-style rapid performance commentary strings
// Grouped into 4 distinct velocity categories (5 each)
export const RAPID_PERFORMANCE_COMMENTS = {
  speed: [
    "Supersonic Solve!",
    "Lightning Velocity!",
    "Blistering Pace!",
    "Hypersonic Execution!",
    "Mach Precision!"
  ],
  accuracy: [
    "Brilliant Move!",
    "Flawless Pathing!",
    "Surgical Precision!",
    "Masterclass Calculation!",
    "Pure Calculation!"
  ],
  streak: [
    "On Fire! 🔥",
    "Unstoppable Flow!",
    "Perpetual Momentum!",
    "Ascendant Sequence!",
    "Apex Tempo!"
  ],
  positionalRecovery: [
    "Tactical Recovery!",
    "Clutch Reversal!",
    "Adaptive Pivot!",
    "Resilient Breakthrough!",
    "Strategic Rebound!"
  ]
};

// Flattened list of all 20 distinct commentary strings
export const ALL_COMMENTARY_STRINGS = [
  ...RAPID_PERFORMANCE_COMMENTS.speed,
  ...RAPID_PERFORMANCE_COMMENTS.accuracy,
  ...RAPID_PERFORMANCE_COMMENTS.streak,
  ...RAPID_PERFORMANCE_COMMENTS.positionalRecovery
];

/**
 * 6 Architectural Rank Definitions
 */
export const ARCHITECTURAL_RANKS = [
  {
    name: "QUANTUM EDGE",
    minScore: 95,
    maxScore: 100,
    badgeColor: "text-cyan-600 bg-cyan-50 border-cyan-200",
    glowColor: "rgba(6, 182, 212, 0.4)",
    descriptor: "Peak cognitive fluidity with algorithmic optimum execution."
  },
  {
    name: "APEX VECTOR",
    minScore: 85,
    maxScore: 94,
    badgeColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    glowColor: "rgba(16, 185, 129, 0.4)",
    descriptor: "Near-theoretical perfection with superior positional pacing."
  },
  {
    name: "HYPER MATRIX",
    minScore: 70,
    maxScore: 84,
    badgeColor: "text-blue-600 bg-blue-50 border-blue-200",
    glowColor: "rgba(59, 130, 246, 0.4)",
    descriptor: "Disciplined calculation and efficient puzzle resolution."
  },
  {
    name: "LOGIC CORE",
    minScore: 50,
    maxScore: 69,
    badgeColor: "text-amber-600 bg-amber-50 border-amber-200",
    glowColor: "rgba(245, 158, 11, 0.4)",
    descriptor: "Solid foundational heuristics with occasional detour overhead."
  },
  {
    name: "ALPHA NODE",
    minScore: 30,
    maxScore: 49,
    badgeColor: "text-orange-600 bg-orange-50 border-orange-200",
    glowColor: "rgba(249, 115, 22, 0.4)",
    descriptor: "Exploratory solve trajectory requiring state restructuring."
  },
  {
    name: "STATIC DRIFT",
    minScore: 0,
    maxScore: 29,
    badgeColor: "text-rose-600 bg-rose-50 border-rose-200",
    glowColor: "rgba(244, 63, 94, 0.4)",
    descriptor: "High entropy pathing with significant time and move friction."
  }
];

/**
 * Parses execution time into explicit fractional format:
 * e.g., "0 minutes 56.56 seconds" or "3 minutes 23.98 seconds"
 */
export function formatFractionalTime(secondsFloat) {
  const safeSec = Math.max(0, Number(secondsFloat) || 0);
  const minutes = Math.floor(safeSec / 60);
  const remainingSeconds = (safeSec % 60).toFixed(2);
  return `${minutes} minutes ${remainingSeconds} seconds`;
}

/**
 * Procedural runtime feedback generator:
 * Constructs descriptive feedback paragraphs on the fly combining runtime variables.
 * No rigid pre-written static sentences!
 */
export function constructProceduralFeedback({
  score,
  rank,
  timeSpentSeconds,
  parTimeSeconds,
  totalMoves,
  optimalMoves,
  timePenalty,
  inefficiencyPenalty
}) {
  const timeDelta = timeSpentSeconds - parTimeSeconds;
  const moveDelta = totalMoves - optimalMoves;
  const moveEfficiencyRatio = totalMoves > 0 ? ((optimalMoves / totalMoves) * 100).toFixed(1) : "100.0";
  
  // Dynamic tempo analysis segment
  let tempoAnalysis = "";
  if (timeDelta <= 0) {
    const underPar = Math.abs(timeDelta).toFixed(2);
    tempoAnalysis = `The solver resolved the color matrix ${underPar} seconds ahead of the par threshold (${parTimeSeconds}s), capturing peak acceleration without incurring any temporal penalties.`;
  } else {
    const overPar = timeDelta.toFixed(2);
    tempoAnalysis = `The puzzle solution registered ${overPar} seconds beyond the ideal par window of ${parTimeSeconds}s, imparting a -${timePenalty} point temporal deceleration tax across the run.`;
  }

  // Dynamic kinematic move analysis segment
  let kinematicAnalysis = "";
  if (moveDelta <= 0) {
    kinematicAnalysis = `Execution pathing matched the theoretical optimum of ${optimalMoves} moves with ${moveEfficiencyRatio}% heuristic precision, avoiding extraneous vial decanting.`;
  } else if (moveDelta <= 3) {
    kinematicAnalysis = `Solution recorded ${totalMoves} decanting actions (+${moveDelta} above minimum threshold of ${optimalMoves}), yielding a minor -${inefficiencyPenalty} point deviation penalty while maintaining high structural control.`;
  } else {
    kinematicAnalysis = `Pathing traversed ${totalMoves} actions against an optimal baseline of ${optimalMoves} transfers, generating ${moveDelta} redundant state shifts and a -${inefficiencyPenalty} move economy penalty.`;
  }

  // Dynamic algorithmic guidance segment
  let recommendation = "";
  if (score >= 95) {
    recommendation = `Classification: ${rank}. The fluid sorting topology demonstrated masterful lookahead. To sustain this tier on higher complexity matrices, prioritize multi-layer color buffer reservations.`;
  } else if (score >= 85) {
    recommendation = `Classification: ${rank}. Strong topological clarity with rapid resolution. Shaving ${Math.max(1, moveDelta)} additional vial transfers will elevate your profile directly to QUANTUM EDGE.`;
  } else if (score >= 70) {
    recommendation = `Classification: ${rank}. Competent puzzle stabilization observed. Minimize repetitive vial cycling by scanning top-tier color matches before committing the opening pour.`;
  } else if (score >= 50) {
    recommendation = `Classification: ${rank}. Decent puzzle resolution achieved. Focus on preserving at least one empty vial as a pure overflow buffer to prevent forced multi-step redistributions.`;
  } else {
    recommendation = `Classification: ${rank}. Matrix completed with noticeable entropy. Review the core color sorting invariants in the Rules console to optimize vial depth planning.`;
  }

  return `${tempoAnalysis} ${kinematicAnalysis} ${recommendation}`;
}

/**
 * Arithmetic calculation function evaluating performance telemetry
 * Points Gained: Max(0, 100 - TimePenalty - InefficiencyPenalty)
 * Time Penalty: -1 point for every 2 seconds exceeding par time
 * Inefficiency Penalty: -2 points for every extra move made beyond optimalMoves
 */
export function evaluatePerformanceTelemetry(timeSpentSeconds, totalMoves, optimalMoves, parTimeSeconds) {
  const safeTime = Math.max(0, Number(timeSpentSeconds) || 0);
  const safeMoves = Math.max(0, Number(totalMoves) || 0);
  const safeOptMoves = Math.max(1, Number(optimalMoves) || 1);
  const safeParTime = Math.max(1, Number(parTimeSeconds) || 60);

  // Time penalty: -1 point for every 2 seconds exceeding par time
  const excessTime = Math.max(0, safeTime - safeParTime);
  const timePenalty = Math.floor(excessTime / 2);

  // Inefficiency penalty: -2 points for every extra move beyond optimalMoves
  const excessMoves = Math.max(0, safeMoves - safeOptMoves);
  const inefficiencyPenalty = excessMoves * 2;

  // Final points gained
  const rawScore = 100 - timePenalty - inefficiencyPenalty;
  const score = Math.max(0, Math.min(100, Math.round(rawScore)));

  // Architectural rank matching
  let rankObj = ARCHITECTURAL_RANKS.find(r => score >= r.minScore && score <= r.maxScore);
  if (!rankObj) {
    rankObj = ARCHITECTURAL_RANKS[ARCHITECTURAL_RANKS.length - 1];
  }

  // Construct dynamic procedural recommendation paragraph
  const dynamicFeedback = constructProceduralFeedback({
    score,
    rank: rankObj.name,
    timeSpentSeconds: safeTime,
    parTimeSeconds: safeParTime,
    totalMoves: safeMoves,
    optimalMoves: safeOptMoves,
    timePenalty,
    inefficiencyPenalty
  });

  // Pick appropriate rapid commentary string based on run metrics
  let rapidComment = "";
  if (timeDeltaIsFast(safeTime, safeParTime) && excessMoves === 0) {
    rapidComment = pickRandom(RAPID_PERFORMANCE_COMMENTS.speed);
  } else if (excessMoves === 0) {
    rapidComment = pickRandom(RAPID_PERFORMANCE_COMMENTS.accuracy);
  } else if (score >= 70) {
    rapidComment = pickRandom(RAPID_PERFORMANCE_COMMENTS.streak);
  } else {
    rapidComment = pickRandom(RAPID_PERFORMANCE_COMMENTS.positionalRecovery);
  }

  return {
    score,
    rank: rankObj.name,
    rankDetails: rankObj,
    timeSpentSeconds: safeTime,
    formattedTime: formatFractionalTime(safeTime),
    totalMoves: safeMoves,
    optimalMoves: safeOptMoves,
    parTimeSeconds: safeParTime,
    timePenalty,
    inefficiencyPenalty,
    rapidComment,
    dynamicFeedback,
    timestamp: new Date().toISOString()
  };
}

function timeDeltaIsFast(actual, par) {
  return actual <= par * 0.85;
}

function pickRandom(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
