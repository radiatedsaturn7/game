const rooms = [
  {
    id: 0,
    name: "Control Bay",
    description: "Camera consoles hum. The robot hates the light.",
    theme: "linear-gradient(135deg, rgba(73, 103, 146, 0.5), rgba(9, 16, 28, 0.9))",
    hideSpots: ["Console Shadow", "Cable Duct"],
    noiseRisk: 0.2,
  },
  {
    id: 1,
    name: "Assembly Line",
    description: "Conveyor belts shudder like heartbeat monitors.",
    theme: "linear-gradient(135deg, rgba(126, 98, 62, 0.55), rgba(15, 12, 8, 0.9))",
    item: "Copper Wire",
    hideSpots: ["Crate Stack", "Hydraulic Pit"],
    noiseRisk: 0.3,
  },
  {
    id: 2,
    name: "Power Junction",
    description: "Sparks arc. The robot feeds here.",
    theme: "linear-gradient(135deg, rgba(96, 151, 142, 0.55), rgba(10, 16, 18, 0.9))",
    hideSpots: ["Breaker Alcove", "Voltage Cabinet"],
    noiseRisk: 0.4,
  },
  {
    id: 3,
    name: "Coolant Vault",
    description: "Cold vapor hides footsteps but muffles sound.",
    theme: "linear-gradient(135deg, rgba(80, 135, 184, 0.45), rgba(6, 9, 15, 0.95))",
    hideSpots: ["Cryo Rack", "Frosted Duct"],
    noiseRisk: 0.25,
  },
  {
    id: 4,
    name: "Maintenance Shafts",
    description: "Tight tunnels. Every metal scrape is a signal.",
    theme: "linear-gradient(135deg, rgba(67, 84, 115, 0.55), rgba(5, 7, 10, 0.9))",
    item: "Resistors",
    hideSpots: ["Tool Cage", "Vent Crawlspace"],
    noiseRisk: 0.35,
  },
  {
    id: 5,
    name: "Server Nest",
    description: "The AI watches you through cracked monitors.",
    theme: "linear-gradient(135deg, rgba(96, 66, 146, 0.5), rgba(12, 8, 18, 0.92))",
    schematic: "Signal Scrambler",
    hideSpots: ["Server Rack", "Data Alcove"],
    noiseRisk: 0.3,
  },
  {
    id: 6,
    name: "Fabrication Lab",
    description: "Half-built drones dangle like corpses.",
    theme: "linear-gradient(135deg, rgba(112, 94, 124, 0.5), rgba(9, 7, 12, 0.92))",
    item: "Capacitors",
    hideSpots: ["Drone Cradle", "Workbench Shadow"],
    noiseRisk: 0.28,
  },
  {
    id: 7,
    name: "Logistics Depot",
    description: "Crates are stacked in impossible patterns.",
    theme: "linear-gradient(135deg, rgba(92, 78, 66, 0.55), rgba(9, 7, 5, 0.9))",
    hideSpots: ["Crate Maze", "Lift Platform"],
    noiseRisk: 0.32,
  },
  {
    id: 8,
    name: "Substation",
    description: "Every switch flips on its own.",
    theme: "linear-gradient(135deg, rgba(86, 106, 88, 0.55), rgba(7, 10, 8, 0.9))",
    item: "Servo Motor",
    hideSpots: ["Fuse Closet", "Service Bay"],
    noiseRisk: 0.3,
  },
  {
    id: 9,
    name: "Diagnostics Bay",
    description: "Your vitals read on cold glass.",
    theme: "linear-gradient(135deg, rgba(61, 120, 140, 0.6), rgba(8, 12, 15, 0.95))",
    hideSpots: ["Scanner Bed", "Supply Locker"],
    noiseRisk: 0.22,
  },
  {
    id: 10,
    name: "Shipping Docks",
    description: "Water laps under the floor plates.",
    theme: "linear-gradient(135deg, rgba(59, 99, 122, 0.55), rgba(6, 9, 13, 0.95))",
    schematic: "Motion Dampener",
    hideSpots: ["Dock Bay", "Cargo Net"],
    noiseRisk: 0.3,
  },
  {
    id: 11,
    name: "Hydraulic Core",
    description: "Pistons thump, hiding the robot's movement.",
    theme: "linear-gradient(135deg, rgba(132, 82, 70, 0.55), rgba(13, 8, 8, 0.9))",
    item: "Microcontroller",
    hideSpots: ["Pump Alcove", "Oil Pit"],
    noiseRisk: 0.4,
  },
  {
    id: 12,
    name: "Research Annex",
    description: "Schematics are scattered like warning signs.",
    theme: "linear-gradient(135deg, rgba(95, 89, 129, 0.55), rgba(9, 8, 13, 0.95))",
    schematic: "Override Key",
    hideSpots: ["Prototype Pod", "Blueprint Archive"],
    noiseRisk: 0.28,
  },
  {
    id: 13,
    name: "Escape Workshop",
    description: "The only way out is built here.",
    theme: "linear-gradient(135deg, rgba(147, 111, 75, 0.55), rgba(13, 9, 6, 0.9))",
    isExit: true,
    hideSpots: ["Assembly Pit", "Scrap Curtain"],
    noiseRisk: 0.35,
  },
];

const ROOM_BG = {
  0: "1.png",
  1: "2.png",
  2: "3.png",
  3: "4.png",
  4: "5.png",
  5: "6.png",
  6: "7.png",
  7: "8.png",
  8: "9.png",
  9: "10.png",
  10: "11.png",
  11: "12.png",
  12: "13.png",
  13: "14.png",
};

const ROOM_BG_BASE_PATH = "images/";
const preloadedRoomImages = new Set();

function preloadImages(urls) {
  urls.filter(Boolean).forEach((url) => {
    if (preloadedRoomImages.has(url)) return;
    const image = new Image();
    image.src = url;
    preloadedRoomImages.add(url);
  });
}

function getRoomBackgroundImage(room) {
  if (!room) return null;

  if (state.currentNight === 11) {
    if (room.name === "Entrance") return `${ROOM_BG_BASE_PATH}15.png`;
    if (room.name === "Grassy Field") return `${ROOM_BG_BASE_PATH}16.png`;
  }

  const file = ROOM_BG[room.id];
  return file ? `${ROOM_BG_BASE_PATH}${file}` : null;
}

function getNightBackgroundUrls() {
  if (state.currentNight === 11) {
    return [`${ROOM_BG_BASE_PATH}15.png`, `${ROOM_BG_BASE_PATH}16.png`];
  }
  return Object.values(ROOM_BG).map((file) => `${ROOM_BG_BASE_PATH}${file}`);
}

function preloadRoomBackgrounds() {
  const urls = new Set(getNightBackgroundUrls());
  const currentRoom = rooms[state.playerRoom];
  if (currentRoom) {
    const currentUrl = getRoomBackgroundImage(currentRoom);
    if (currentUrl) urls.add(currentUrl);
    (roomConnections[state.playerRoom] || []).forEach((neighborId) => {
      const neighbor = rooms[neighborId];
      const neighborUrl = getRoomBackgroundImage(neighbor);
      if (neighborUrl) urls.add(neighborUrl);
    });
  }
  preloadImages([...urls]);
}

const ITEM_CLASSES = {
  Resistors: "MATERIAL",
  Capacitors: "MATERIAL",
  "Copper Wire": "MATERIAL",
  Microcontroller: "MATERIAL",
  "Servo Motor": "MATERIAL",
  "9V Battery": "MATERIAL",
  "Small Fuse (5A)": "MATERIAL",
  "24V Power Pack": "POWER_ACCESS",
  "Main Fuse (30A)": "POWER_ACCESS",
};

const TOOL_ITEMS = new Set(["Pulse Scanner", "Blowtorch"]);
const DEPLOYABLE_ITEMS = new Set(["Noise Lure", "Door Jam"]);
const REUSABLE_SCHEMATICS = new Set(["Noise Lure Schematic", "Door Jam Schematic"]);

const CAIT_DIALOGUE_URL = "assets/cait-dialogue.json";
let caitDialoguePromise = null;
let caitDialogueData = null;

function formatCaitLine(template, tokens = {}) {
  if (typeof template !== "string") return template ?? "";
  return Object.entries(tokens).reduce((text, [key, value]) => {
    if (value === undefined || value === null) return text;
    return text.replaceAll(`{${key}}`, String(value));
  }, template);
}

async function ensureCaitDialogueLoaded() {
  if (!caitDialoguePromise) {
    caitDialoguePromise = fetch(CAIT_DIALOGUE_URL)
      .then((response) => (response.ok ? response.json() : null))
      .catch(() => null);
  }
  const data = await caitDialoguePromise;
  caitDialogueData = data || {};
  if (!data) {
    console.warn("Failed to load Cait dialogue data.");
  }
  return caitDialogueData;
}

function getCaitDialogueData() {
  return caitDialogueData ?? {};
}

function getCaitLine(key) {
  return getCaitDialogueData().lines?.[key] ?? "";
}

function getCaitNightData(night) {
  return getCaitDialogueData().nights?.[String(night)] ?? {};
}

function getCaitPickupDetail(itemName) {
  return getCaitDialogueData().pickupDetails?.[itemName] ?? "";
}

function isMaterial(item) {
  return ITEM_CLASSES[item] === "MATERIAL";
}

function isPowerAccess(item) {
  return ITEM_CLASSES[item] === "POWER_ACCESS";
}

const requiredParts = [
  "Resistors",
  "Capacitors",
  "Microcontroller",
  "Servo Motor",
  "Copper Wire",
  "9V Battery",
  "Small Fuse (5A)",
];

const OBJECTIVE_RECIPES = [
  {
    name: "Override Key",
    schematic: "Override Key",
    parts: ["Microcontroller", "Copper Wire"],
  },
  {
    name: "Power Bypass Module",
    schematic: "Power Bypass Module",
    parts: ["Capacitors", "Microcontroller", "Small Fuse (5A)"],
  },
  {
    name: "Lock Override Module",
    schematic: "Lock Override Module",
    parts: ["Microcontroller", "Capacitors", "Resistors"],
  },
  {
    name: "Noise Lure (Decoy Emitter)",
    schematic: "Noise Lure Schematic",
    parts: ["Microcontroller", "Capacitors", "Copper Wire", "9V Battery"],
    nightOnly: 5,
    unlockDeployable: "noiseLure",
    chargesGranted: 3,
  },
  {
    name: "Door Jam (Wedge Clamp)",
    schematic: "Door Jam Schematic",
    parts: ["Servo Motor", "Resistors", "Copper Wire"],
    nightOnly: 6,
    unlockDeployable: "doorJam",
    chargesGranted: 2,
  },
  {
    name: "Flame-Saw",
    schematic: "Flame-Saw",
    parts: ["Microcontroller", "Servo Motor", "Copper Wire", "Capacitors", "Resistors"],
    nightOnly: 10,
  },
];

const OBJECTIVE_RECIPES_BY_SCHEMATIC = new Map(
  OBJECTIVE_RECIPES.map((recipe) => [recipe.schematic, recipe])
);
const OBJECTIVE_RECIPES_BY_NAME = new Map(
  OBJECTIVE_RECIPES.map((recipe) => [recipe.name, recipe])
);
const DATA_FRAGMENT_SCHEMATIC = "Data Fragment";

const NIGHT_PLAN = {
  1: { objectiveId: "CIRCUIT_STABILIZE", room: "Power Junction" },
  2: { objectiveId: "CHEM_BALANCE", room: "Coolant Vault" },
  3: { objectiveId: "ASM_PATCH", room: "Server Nest" },
  4: { objectiveId: "CIRCUIT_STABILIZE", room: "Power Junction" },
  5: { objectiveId: "CHEM_BALANCE", room: "Coolant Vault" },
  6: { objectiveId: "ASM_PATCH", room: "Server Nest" },
  7: { objectiveId: "CIRCUIT_STABILIZE", room: "Power Junction" },
  8: { objectiveId: "CHEM_BALANCE", room: "Coolant Vault" },
  9: { objectiveId: "ASM_PATCH", room: "Server Nest" },
  10: { objectiveId: "FLAMESAW_FINAL", room: "Escape Workshop", miniGameId: "FLAMESAW_FINISH" },
};

const MINI_GAME_TEMPLATES = {
  INTRO_ESCAPE: {
    id: "INTRO_ESCAPE",
    title: "Escape Console Calibration",
    actionLabel: "Calibrate Escape Console",
    type: "circuit_trace",
    roomHintText: "Route power cleanly. No shorts.",
    difficultyByNight: { nodeCount: 6, hotCount: 0, pathLength: 4 },
    generate: generateCircuitTrace,
  },
  CIRCUIT_STABILIZE: {
    id: "CIRCUIT_STABILIZE",
    title: "Circuit Stabilization",
    actionLabel: "Stabilize Door Coil",
    type: "resistor_kit",
    roomHintText: "Stabilize the coil regulator.",
    generate: generateCircuitStabilizeResistorKit,
  },
  ALARM_CALIBRATION: {
    id: "ALARM_CALIBRATION",
    title: "Tuner Calibration",
    actionLabel: "Calibrate Alarm Array",
    type: "signal_tuner",
    roomHintText: "Lock the sweep in-band, then crack the decrypt windows.",
    difficultyByNight: (night) => ({
      sweepWindowSize: clamp(0.26 - night * 0.01, 0.14, 0.26),
      locksNeeded: night < 5 ? 2 : 3,
      decryptWindowSize: clamp(0.16 - night * 0.008, 0.08, 0.16),
      sweepPeriod: clamp(1800 - night * 80, 1000, 1800),
    }),
    generate: generateSignalTuner,
  },
  SCANNER_DIAGNOSTIC: {
    id: "SCANNER_DIAGNOSTIC",
    title: "Scanner Gain Lock",
    actionLabel: "Run Scanner Diagnostic",
    type: "signal_tuner",
    roomHintText: "Lock the sweep in-band, then crack the decrypt windows.",
    difficultyByNight: (night) => ({
      sweepWindowSize: clamp(0.24 - night * 0.01, 0.12, 0.24),
      locksNeeded: night < 5 ? 2 : 3,
      decryptWindowSize: clamp(0.14 - night * 0.008, 0.07, 0.14),
      sweepPeriod: clamp(1700 - night * 80, 900, 1700),
    }),
    generate: generateSignalTuner,
  },
  SIGNAL_FILTER_RC: {
    id: "SIGNAL_FILTER_RC",
    title: "Filter Lock",
    actionLabel: "Filter Signal Noise",
    type: "signal_tuner",
    roomHintText: "Lock the sweep in-band, then crack the decrypt windows.",
    difficultyByNight: (night) => ({
      sweepWindowSize: clamp(0.22 - night * 0.01, 0.12, 0.22),
      locksNeeded: night < 5 ? 2 : 3,
      decryptWindowSize: clamp(0.12 - night * 0.008, 0.06, 0.12),
      sweepPeriod: clamp(1600 - night * 70, 850, 1600),
    }),
    generate: generateSignalTuner,
  },
  CHEM_BALANCE: {
    id: "CHEM_BALANCE",
    title: "Acid-Base Neutralization",
    actionLabel: "Neutralize Sample",
    type: "titration_transfer",
    roomHintText: "Achieve acid-base neutralization. Too much base ruins the batch.",
    generate: generateTitrationTransfer,
  },
  MECH_TOLERANCE: {
    id: "MECH_TOLERANCE",
    title: "Pressure Regulator",
    actionLabel: "Set Pressure Tolerances",
    type: "dial_lock",
    roomHintText: "Align the valve stops in sequence.",
    difficultyByNight: { tolerance: 2, pattern: ["R", "L", "R"] },
    generate: generateDialLock,
  },
  ASM_PATCH: {
    id: "ASM_PATCH",
    title: "ASM Hack",
    actionLabel: "Patch Door Controller",
    type: "patch_drag",
    roomHintText: "Door controller is stuck. Patch the loop.",
    difficultyByNight: (night) => ({
      initialCx: clamp(2 + Math.floor(night / 3), 2, 5),
      maxSteps: 25,
    }),
    generate: generatePatchDrag,
  },
  CONTROL_LOOP: {
    id: "CONTROL_LOOP",
    title: "PID Knob",
    actionLabel: "Tune Control Loop",
    type: "dial_lock",
    roomHintText: "Align the valve stops in sequence.",
    difficultyByNight: { tolerance: 1, pattern: ["L", "L", "R"] },
    generate: generateDialLock,
  },
  FLAMESAW_GAS: {
    id: "FLAMESAW_GAS",
    title: "Gas Valve",
    actionLabel: "Open Gas",
    type: "dial_lock",
    roomHintText: "Turn the gas fully on. One clean sequence.",
    difficultyByNight: { tolerance: 1, pattern: ["L", "L", "R"] },
    generate: generateDialLock,
  },
  FLAMESAW_IGNITE: {
    id: "FLAMESAW_IGNITE",
    title: "Ignition Tuner",
    actionLabel: "Ignite",
    type: "signal_tuner",
    roomHintText: "Catch the ignition window. No second chances.",
    difficultyByNight: (night) => ({
      sweepWindowSize: clamp(0.26 - night * 0.01, 0.14, 0.26),
      locksNeeded: night < 5 ? 2 : 3,
      decryptWindowSize: clamp(0.16 - night * 0.008, 0.08, 0.16),
      sweepPeriod: clamp(1800 - night * 80, 1000, 1800),
    }),
    generate: generateSignalTuner,
  },
  FLAMESAW_FINISH: {
    id: "FLAMESAW_FINISH",
    title: "Flame-Saw Finish",
    actionLabel: "Use Flame-Saw",
    type: "boss_finish",
    roomHintText: "Hold the flame on the seam. Stay on rhythm.",
    difficultyByNight: {
      heatBand: [0.62, 0.78],
      alignWindow: 0.08,
      cutBand: [0.42, 0.62],
      cutStrokesNeeded: 5,
      cutTimeLimitMs: 6500,
      driftPeriod: 2000,
    },
    generate: generateBossFinish,
  },
  FLAMESAW_BALANCE: {
    id: "FLAMESAW_BALANCE",
    title: "Saw Balance",
    actionLabel: "Hold Steady",
    type: "balance_hold",
    roomHintText: "Balance the saw on the seam. Hold it steady.",
    difficultyByNight: {
      safeBand: [0.44, 0.56],
      winInsideMs: 5500,
      maxOutsideMs: 1200,
      timeLimitMs: 12000,
      driftStrength: 0.0025,
      nudgeImpulse: 0.06,
    },
    generate: generateBalanceHold,
  },
};

function getMiniGameDifficulty(template, night) {
  if (typeof template.difficultyByNight === "function") {
    return template.difficultyByNight(night);
  }
  return template.difficultyByNight ?? {};
}

function generateSignalTuner(rngSeed, night, template) {
  const rng = createRng(rngSeed);
  const difficulty = getMiniGameDifficulty(template, night);
  const sweepWindowSize = difficulty.sweepWindowSize ?? 0.2;
  const decryptWindowSize = difficulty.decryptWindowSize ?? 0.12;
  const locksNeeded = difficulty.locksNeeded ?? 2;
  const sweepPeriod = difficulty.sweepPeriod ?? 1600;
  const sweepCenter = rng.nextFloat() * 0.6 + 0.2;
  const sweepWindow = [
    clamp(sweepCenter - sweepWindowSize / 2, 0.05, 0.95),
    clamp(sweepCenter + sweepWindowSize / 2, 0.05, 0.95),
  ];
  const decryptWindows = Array.from({ length: 3 }, () => {
    const center = rng.nextFloat() * 0.7 + 0.15;
    return [
      clamp(center - decryptWindowSize / 2, 0.03, 0.97),
      clamp(center + decryptWindowSize / 2, 0.03, 0.97),
    ];
  });
  return {
    state: {
      phase: "sweep",
      progress: 0,
      strikes: 0,
      decryptIndex: 0,
      sweepStart: null,
    },
    solution: {
      sweepWindow,
      decryptWindows,
      locksNeeded,
      sweepPeriod,
      strikesAllowed: 3,
    },
    ui: {
      text: template.roomHintText,
    },
  };
}

function generateDialLock(rngSeed, night, template) {
  const rng = createRng(rngSeed);
  const difficulty = getMiniGameDifficulty(template, night);
  const sequence = [];
  while (sequence.length < 3) {
    const value = rng.nextInt(0, 99);
    if (sequence.every((entry) => Math.abs(entry - value) >= 8)) {
      sequence.push(value);
    }
  }
  return {
    state: {
      value: rng.nextInt(0, 99),
      stepIndex: 0,
      lastDirection: null,
      dragStartX: null,
      dragStartValue: null,
    },
    solution: {
      sequence,
      pattern: difficulty.pattern ?? ["L", "R", "L"],
      tolerance: difficulty.tolerance ?? 2,
    },
    ui: {
      text: template.roomHintText,
    },
  };
}

function generateBalanceHold(rngSeed, night, template) {
  const difficulty = getMiniGameDifficulty(template, night);
  return {
    state: {
      value: 0.5,
      velocity: 0,
      startedAt: null,
      insideMs: 0,
      outsideMs: 0,
      lastTickAt: null,
      nudgeDirection: 0,
      lastNudgeAt: null,
    },
    solution: {
      safeBand: difficulty.safeBand ?? [0.44, 0.56],
      winInsideMs: difficulty.winInsideMs ?? 5500,
      maxOutsideMs: difficulty.maxOutsideMs ?? 1200,
      timeLimitMs: difficulty.timeLimitMs ?? 12000,
      driftStrength: difficulty.driftStrength ?? 0.0025,
      nudgeImpulse: difficulty.nudgeImpulse ?? 0.06,
    },
    ui: {
      text: template.roomHintText,
    },
  };
}

function generateCircuitTrace(rngSeed, night, template) {
  const rng = createRng(rngSeed);
  const difficulty = getMiniGameDifficulty(template, night);
  const nodeCount = clamp(difficulty.nodeCount ?? 8, 6, 10);
  const pathLength = clamp(difficulty.pathLength ?? 5, 4, 7);
  const hotCount = clamp(difficulty.hotCount ?? 1, 0, 2);
  const grid = [
    { id: 0, x: 20, y: 20 },
    { id: 1, x: 110, y: 20 },
    { id: 2, x: 200, y: 20 },
    { id: 3, x: 290, y: 20 },
    { id: 4, x: 20, y: 110 },
    { id: 5, x: 110, y: 110 },
    { id: 6, x: 200, y: 110 },
    { id: 7, x: 290, y: 110 },
    { id: 8, x: 20, y: 200 },
    { id: 9, x: 110, y: 200 },
    { id: 10, x: 200, y: 200 },
    { id: 11, x: 290, y: 200 },
  ];
  const shuffled = [...grid].sort(() => rng.nextFloat() - 0.5);
  const selected = shuffled.slice(0, nodeCount);
  const selectedIds = new Set(selected.map((node) => node.id));
  const adjacency = new Map();
  selected.forEach((node) => {
    const neighbors = [];
    grid.forEach((candidate) => {
      if (!selectedIds.has(candidate.id)) return;
      const distance = Math.abs(candidate.x - node.x) + Math.abs(candidate.y - node.y);
      if (distance === 90) {
        neighbors.push(candidate.id);
      }
    });
    adjacency.set(node.id, neighbors);
  });

  let path = [];
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const start = selected[rng.nextInt(0, selected.length - 1)].id;
    path = [start];
    while (path.length < pathLength) {
      const current = path[path.length - 1];
      const options = (adjacency.get(current) || []).filter((id) => !path.includes(id));
      if (!options.length) break;
      path.push(options[rng.nextInt(0, options.length - 1)]);
    }
    if (path.length >= pathLength) break;
  }
  if (path.length < pathLength) {
    path = selected.slice(0, Math.min(pathLength, selected.length)).map((node) => node.id);
  }
  const source = path[0];
  const target = path[path.length - 1];
  const hotNodes = selected
    .map((node) => node.id)
    .filter((id) => !path.includes(id))
    .sort(() => rng.nextFloat() - 0.5)
    .slice(0, hotCount);
  const edges = new Set();
  for (let i = 0; i < path.length - 1; i += 1) {
    edges.add(`${path[i]}-${path[i + 1]}`);
    edges.add(`${path[i + 1]}-${path[i]}`);
  }
  const decoyBranches = Math.min(2, rng.nextInt(1, 2));
  for (let i = 0; i < decoyBranches; i += 1) {
    const anchor = path[rng.nextInt(0, path.length - 1)];
    const options = (adjacency.get(anchor) || []).filter((id) => !path.includes(id));
    if (!options.length) continue;
    const decoy = options[rng.nextInt(0, options.length - 1)];
    edges.add(`${anchor}-${decoy}`);
    edges.add(`${decoy}-${anchor}`);
  }
  return {
    state: {
      selectedPath: [source],
    },
    solution: {
      nodes: selected,
      source,
      target,
      hotNodes,
      edges,
      path,
    },
    ui: {
      text: template.roomHintText,
    },
  };
}

const E12_VALUES = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
const E24_VALUES = [
  10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, 43, 47, 51, 56, 62, 68, 75,
  82, 91,
];

function getResistorDecadeBase(idealR) {
  if (idealR >= 1000) return 100;
  if (idealR >= 100) return 10;
  return 1;
}

function pickResistorKit({ rng, series = "E24", count = 8, decadeBase = 1 }) {
  const values = series === "E12" ? E12_VALUES : E24_VALUES;
  const desiredUnique = Math.min(values.length, Math.min(count, 6));
  const pool = [...values];
  const unique = [];
  for (let i = 0; i < desiredUnique; i += 1) {
    const index = rng.nextInt(0, pool.length - 1);
    unique.push(pool.splice(index, 1)[0]);
  }
  const duplicates = [];
  const duplicateCount = Math.max(0, count - unique.length);
  for (let i = 0; i < duplicateCount; i += 1) {
    const dup = unique[rng.nextInt(0, unique.length - 1)];
    duplicates.push(dup);
  }
  return [...unique, ...duplicates].map((value) => value * decadeBase).sort((a, b) => a - b);
}

function isResistorKitSolvable({ kit, V, I_target, toleranceA, PmaxW }) {
  const total = 1 << kit.length;
  for (let mask = 1; mask < total; mask += 1) {
    let req = 0;
    for (let i = 0; i < kit.length; i += 1) {
      if (mask & (1 << i)) req += kit[i];
    }
    const Icalc = V / req;
    const Pcalc = (V * V) / req;
    if (Pcalc <= PmaxW && Math.abs(Icalc - I_target) <= toleranceA) {
      return true;
    }
  }
  return false;
}

function forceSolvableResistorKit({ rng, V, I_target, toleranceA, PmaxW, idealR }) {
  const decades = [getResistorDecadeBase(idealR), 1, 10, 100];
  const checked = new Set();
  for (const decade of decades) {
    if (checked.has(decade)) continue;
    checked.add(decade);
    for (const value of E24_VALUES) {
      const resistor = value * decade;
      const Icalc = V / resistor;
      const Pcalc = (V * V) / resistor;
      if (Pcalc <= PmaxW && Math.abs(Icalc - I_target) <= toleranceA) {
        const baseKit = pickResistorKit({ rng, series: "E24", count: 7, decadeBase: decade });
        return [...baseKit, resistor].sort((a, b) => a - b);
      }
    }
  }
  const decade = getResistorDecadeBase(idealR);
  return pickResistorKit({ rng, series: "E24", count: 8, decadeBase: decade });
}

function generateCircuitStabilizeResistorKit(rngSeed, night, template) {
  const rng = createRng(rngSeed);
  const toleranceA = night < 5 ? 0.05 : 0.03;
  let V = 12;
  let I_target = 0.6;
  let PmaxW = 8;
  let idealR = V / I_target;
  let kit = [];
  for (let attempt = 0; attempt < 80; attempt += 1) {
    V = rng.nextInt(8, 18);
    I_target = rng.nextInt(4, 12) / 10;
    const P = V * I_target;
    if (P > 11.2) continue;
    const margin = rng.nextInt(1, 3);
    PmaxW = clamp(Math.round(P + margin), 6, 12);
    idealR = V / I_target;
    const decadeBase = getResistorDecadeBase(idealR);
    kit = pickResistorKit({ rng, series: "E24", count: 8, decadeBase });
    if (isResistorKitSolvable({ kit, V, I_target, toleranceA, PmaxW })) {
      break;
    }
  }
  if (!isResistorKitSolvable({ kit, V, I_target, toleranceA, PmaxW })) {
    kit = forceSolvableResistorKit({ rng, V, I_target, toleranceA, PmaxW, idealR });
  }
  return {
    state: {
      kit,
      selected: Array(kit.length).fill(false),
      reqOhms: 0,
    },
    solution: {
      V,
      I_target,
      toleranceA,
      PmaxW,
      idealR,
    },
    ui: {
      text: template.roomHintText,
    },
  };
}

function generateTitrationQuick(rngSeed, night, template) {
  const rng = createRng(rngSeed);
  const tolerancePct = night < 5 ? 5 : 3;
  const variants = ["dilution", "neutralization"];
  let variant = variants[rng.nextInt(0, variants.length - 1)];
  let targetMl = 50;
  let displayValues = {};
  for (let attempt = 0; attempt < 80; attempt += 1) {
    variant = variants[rng.nextInt(0, variants.length - 1)];
    if (variant === "dilution") {
      const C1 = rng.nextInt(10, 30) / 10;
      const C2 = rng.nextInt(2, 10) / 10;
      const V2 = rng.nextInt(40, 100) / 10 * 10;
      const V1 = (C2 * V2) / C1;
      if (V1 <= 0 || V1 > 100) continue;
      if (Math.abs(V1 / 5 - Math.round(V1 / 5)) > 0.01) continue;
      targetMl = Math.round(V1);
      displayValues = { C1, C2, V2 };
      break;
    } else {
      const M1 = rng.nextInt(5, 15) / 10;
      const V1 = rng.nextInt(20, 80);
      const M2 = rng.nextInt(5, 20) / 10;
      const V2 = (M1 * V1) / M2;
      if (V2 <= 0 || V2 > 100) continue;
      if (Math.abs(V2 / 5 - Math.round(V2 / 5)) > 0.01) continue;
      targetMl = Math.round(V2);
      displayValues = { M1, V1, M2 };
      break;
    }
  }
  let mlSelected = clamp(targetMl + rng.nextInt(-30, 30), 0, 100);
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const diffPct = Math.abs(mlSelected - targetMl) / targetMl * 100;
    if (diffPct > tolerancePct) break;
    mlSelected = clamp(targetMl + rng.nextInt(-30, 30), 0, 100);
  }
  return {
    state: {
      mlSelected,
      mlPoured: 0,
      lastFeedback: "",
      lastSuccess: false,
    },
    solution: {
      targetMl,
      tolerancePct,
      variant,
      displayValues,
    },
    ui: {
      text: template.roomHintText,
    },
  };
}

function generateTitrationTransfer(rngSeed, night, template) {
  const rng = createRng(rngSeed);
  const maxLoadMl = 100;
  const maxSampleMl = 100;
  const acidMlOptions = [];
  for (let ml = 20; ml <= maxSampleMl; ml += 5) {
    acidMlOptions.push(ml);
  }
  const acidMOptions = new Set();
  for (let m = 0.5; m <= 2.0001; m += 0.1) {
    acidMOptions.add(Number(m.toFixed(2)));
  }
  for (let m = 0.5; m <= 2.0001; m += 0.25) {
    acidMOptions.add(Number(m.toFixed(2)));
  }
  const baseMOptions = new Set();
  for (let m = 0.4; m <= 1.5001; m += 0.1) {
    baseMOptions.add(Number(m.toFixed(2)));
  }
  for (let m = 0.4; m <= 1.5001; m += 0.2) {
    baseMOptions.add(Number(m.toFixed(2)));
  }
  const acidMList = Array.from(acidMOptions);
  const baseMList = Array.from(baseMOptions);
  let bestCandidate = null;
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const acidMl = acidMlOptions[rng.nextInt(0, acidMlOptions.length - 1)];
    const acidM = acidMList[rng.nextInt(0, acidMList.length - 1)];
    const baseM = baseMList[rng.nextInt(0, baseMList.length - 1)];
    const baseTargetRaw = (acidM * acidMl) / baseM;
    if (baseTargetRaw < 8 || baseTargetRaw > maxLoadMl) continue;
    if (baseTargetRaw > maxSampleMl - acidMl) continue;
    const rounded = Math.round(baseTargetRaw * 2) / 2;
    const isClean = Math.abs(baseTargetRaw * 2 - Math.round(baseTargetRaw * 2)) <= 0.05;
    if (!isClean) continue;
    const candidate = {
      acidMl,
      acidM,
      baseM,
      baseTargetMl: rounded,
    };
    if (!bestCandidate) bestCandidate = candidate;
    if (rounded % 5 === 0 && rounded <= maxLoadMl) {
      bestCandidate = candidate;
      break;
    }
  }
  if (!bestCandidate) {
    const acidMl = acidMlOptions[rng.nextInt(0, acidMlOptions.length - 1)];
    const acidM = acidMList[rng.nextInt(0, acidMList.length - 1)];
    const baseM = baseMList[rng.nextInt(0, baseMList.length - 1)];
    const maxAllowedBase = Math.max(8, maxSampleMl - acidMl);
    const baseTargetRaw = clamp((acidM * acidMl) / baseM, 8, Math.min(maxLoadMl, maxAllowedBase));
    bestCandidate = {
      acidMl,
      acidM,
      baseM,
      baseTargetMl: Math.round(baseTargetRaw * 2) / 2,
    };
  }
  const tol = night <= 4 ? 3 : night <= 7 ? 2 : 1;
  return {
    type: "titration_transfer",
    title: "ACID-BASE NEUTRALIZATION",
    actionLabel: "POUR",
    roomHintText: template.roomHintText,
    solution: {
      acidMl: bestCandidate.acidMl,
      acidM: bestCandidate.acidM,
      baseM: bestCandidate.baseM,
      baseTargetMl: bestCandidate.baseTargetMl,
      toleranceMl: tol,
      sampleMl: bestCandidate.acidMl,
      targetPh: 7.0,
      maxLoadMl,
      maxSampleMl,
    },
    state: {
      selectedLoadStep: 10,
      loadedMl: 0,
      baseAddedMl: 0,
      phase: "loading",
      lastResult: null,
      statusMessage: "",
      lockControls: false,
      attemptStartedAtMs: null,
      attemptTimeLimitMs: 25000,
      timeoutHandled: false,
      timeoutResetQueued: false,
    },
  };
}

function generatePatchDrag(rngSeed, night, template) {
  const rng = createRng(rngSeed);
  const difficulty = getMiniGameDifficulty(template, night);
  const initialCx = difficulty.initialCx ?? rng.nextInt(2, 4);
  const maxSteps = difficulty.maxSteps ?? 12;
  const tilePool = [
    { op: "DEC", label: "DEC" },
    { op: "JNZ", label: "JNZ" },
    { op: "RET", label: "RET" },
    { op: "INC", label: "INC" },
    { op: "XOR", label: "CLR" },
    { op: "ADD", label: "MUL 2" },
    { op: "SUB2", label: "DIV 2" },
  ];
  const required = ["DEC", "JNZ", "RET"];
  const tiles = [];
  required.forEach((op) => {
    const entry = tilePool.find((tile) => tile.op === op);
    tiles.push({ id: `${op}-${tiles.length}`, op: entry.op, label: entry.label });
  });
  while (tiles.length < 7) {
    const entry = tilePool[rng.nextInt(0, tilePool.length - 1)];
    tiles.push({ id: `${entry.op}-${tiles.length}`, op: entry.op, label: entry.label });
  }
  const shuffled = [...tiles].sort(() => rng.nextFloat() - 0.5);
  return {
    state: {
      tiles: shuffled,
      slots: Array.from({ length: 5 }, () => null),
      selectedOp: null,
      focusedSlot: 0,
      phase: "idle",
      initialCx,
      maxSteps,
      autoRunning: false,
      autoRunTimer: null,
      autoRunIntervalMs: 420,
      sim: {
        pc: 0,
        cx: initialCx,
        steps: 0,
        halted: false,
        status: "idle",
        firstErrorIndex: null,
        latch: 0,
        failReason: null,
        trace: [],
      },
      simMessage: "",
    },
    solution: {
      initialCx,
      maxSteps,
    },
    ui: {
      text: template.roomHintText,
    },
  };
}

function generateBossFinish(rngSeed, night, template) {
  const rng = createRng(rngSeed);
  const difficulty = getMiniGameDifficulty(template, night);
  const heatBand = difficulty.heatBand ?? [0.62, 0.78];
  const alignWindow = difficulty.alignWindow ?? 0.08;
  const alignCenter = rng.nextFloat() * 0.5 + 0.25;
  const alignBand = [
    clamp(alignCenter - alignWindow / 2, 0.05, 0.95),
    clamp(alignCenter + alignWindow / 2, 0.05, 0.95),
  ];
  const cutBand = difficulty.cutBand ?? [0.42, 0.62];
  return {
    state: {
      step: 1,
      heatHoldStart: null,
      holdReleased: false,
      heatAttempts: 0,
      alignmentStart: null,
      cutStart: null,
      goodStrokes: 0,
      missCount: 0,
      cutFeedback: "",
      cutPressureStart: null,
      cutBandStart: null,
      stepFeedback: "",
      startedAt: null,
      elapsedMs: 0,
      mistakes: 0,
      timePenaltyMs: 0,
    },
    solution: {
      heatBand,
      alignBand,
      alignPeriod: 1400,
      cutBand,
      cutStrokesNeeded: difficulty.cutStrokesNeeded ?? 5,
      cutTimeLimitMs: difficulty.cutTimeLimitMs ?? 6500,
      driftPeriod: difficulty.driftPeriod ?? 2000,
      totalTimeLimitMs: 60000,
    },
    ui: {
      text: template.roomHintText,
    },
  };
}

const componentDescriptions = {
  Resistors: "Limits electrical current and stabilizes fragile circuits.",
  Capacitors: "Stores charge to buffer power spikes and short bursts.",
  Microcontroller: "Coordinates logic and safety overrides in the schematic.",
  "Servo Motor": "Drives precision movement for locking mechanisms.",
  "Copper Wire": "Routes power between subsystems and anchors the circuit.",
  "9V Battery": "Small battery used for handheld or improvised electronics.",
  "Small Fuse (5A)": "Low-current fuse used to protect fragile circuits.",
  "24V Power Pack": "Industrial power source for doors, machinery, and system startup.",
  "Main Fuse (30A)": "Heavy fuse rated for core systems and facility infrastructure.",
  "Override Key": "Overrides local locks and reduces the robot's alertness.",
  "Power Bypass Module": "Bridges power nodes to force critical systems online.",
  "Lock Override Module": "Rewrites access logic for sealed exit controls.",
  "Noise Lure Schematic": "Blueprint for a decoy emitter built from spare components.",
  "Door Jam Schematic": "Blueprint for a wedge clamp that can brace doors shut.",
  "Noise Lure (Decoy Emitter)": "Objective emitter designed to unlock deployable Noise Lure charges.",
  "Door Jam (Wedge Clamp)": "Objective clamp used to unlock Door Jam deployable charges.",
  "Data Fragment": "Encrypted slice of the lock override data stream.",
  "Pulse Scanner": "A toggleable scanner that hums with static to reveal nearby robot intel.",
  "Noise Lure": "Creates a loud distraction to pull the robot off your trail.",
  "Door Jam": "Temporarily wedges a nearby door to slow pursuit.",
  "Blowtorch": "Burns through permanent jams. Loud, but it frees a locked edge.",
  "Flame-Saw": "A brutal cutting tool built to breach the robot's armor plating.",
};

const deviceTypes = {
  scan: { name: "Pulse Scanner", cooldown: 0, uses: [] },
  noise: { name: "Noise Lure", cooldown: 0, uses: [] },
};

const mapPositions = {
  0: { x: 70, y: 45 },
  1: { x: 190, y: 40 },
  2: { x: 320, y: 45 },
  3: { x: 70, y: 145 },
  4: { x: 190, y: 160 },
  5: { x: 320, y: 150 },
  6: { x: 430, y: 135 },
  7: { x: 120, y: 260 },
  8: { x: 240, y: 260 },
  9: { x: 360, y: 240 },
  10: { x: 470, y: 240 },
  11: { x: 140, y: 350 },
  12: { x: 300, y: 340 },
  13: { x: 420, y: 340 },
};

let roomConnections = {
  0: [1, 3],
  1: [0, 2, 4],
  2: [1, 5, 8],
  3: [0, 4, 6],
  4: [1, 3, 7],
  5: [2, 6, 9],
  6: [3, 5, 10],
  7: [4, 8, 11],
  8: [2, 7, 12],
  9: [5, 10, 13],
  10: [6, 9, 12],
  11: [7, 12],
  12: [8, 10, 11, 13],
  13: [9, 12],
};

const NIGHT_11 = 11;
const NIGHT_11_THEME = "linear-gradient(135deg, rgba(88, 138, 88, 0.7), rgba(10, 18, 12, 0.92))";
const NIGHT_11_DESCRIPTION = "Open grass sways under an empty sky.";
const NIGHT_11_CONNECTIONS = {
  0: [1, 2, 3],
  1: [0, 4, 5],
  2: [0, 5, 6],
  3: [0, 6, 7],
  4: [1, 8],
  5: [1, 2, 8, 9],
  6: [2, 3, 9, 10],
  7: [3, 10],
  8: [4, 5, 11],
  9: [5, 6, 11, 12],
  10: [6, 7, 12, 13],
  11: [8, 9],
  12: [9, 10],
  13: [10],
};
const NIGHT_11_POSITIONS = {
  0: { x: 260, y: 40 },
  1: { x: 200, y: 60 },
  2: { x: 320, y: 60 },
  3: { x: 440, y: 80 },
  4: { x: 140, y: 160 },
  5: { x: 260, y: 160 },
  6: { x: 380, y: 160 },
  7: { x: 480, y: 180 },
  8: { x: 140, y: 260 },
  9: { x: 260, y: 260 },
  10: { x: 380, y: 260 },
  11: { x: 140, y: 360 },
  12: { x: 260, y: 360 },
  13: { x: 380, y: 360 },
};

const BASE_ROOMS = rooms.map((room) => ({
  ...room,
  hideSpots: [...room.hideSpots],
}));
const BASE_ROOM_CONNECTIONS = JSON.parse(JSON.stringify(roomConnections));
const BASE_MAP_POSITIONS = JSON.parse(JSON.stringify(mapPositions));

const TICK_MS = 1200;
const DEBUG_AI = false;
const DEBUG_UI = true;
const DEBUG_ALWAYS_VISIBLE = false;
// AI tuning: focus, pacing, and investigation pacing.
const ROBOT_FOCUS_TTL = 6;
const ROBOT_FOCUS_ARRIVAL_LINGER = 1;
const ROBOT_FOCUS_BIAS = 0.35;
const ROBOT_FOCUS_OVERRIDE_SIGNAL = 0.6;
const ROBOT_RECHARGE_MIN_TURNS = 6;
const ROBOT_RECHARGE_MAX_TURNS = 10;
const ROBOT_RECHARGE_DORMANT_MIN = 2;
const ROBOT_RECHARGE_DORMANT_MAX = 3;
// Director nudges are soft hints near (not on) the player.
const DIRECTOR_SAFE_TURNS_THRESHOLD = 8;
const DIRECTOR_COOLDOWN = 7;
const DIRECTOR_SIGNAL_STRENGTH = 0.45;
const DIRECTOR_LAST_KNOWN_CHANCE = 0.05;
// Double-backs are rare false retreats after a trail cools.
const DOUBLE_BACK_CHANCE = 0.15;
const DOUBLE_BACK_SIGNAL_WINDOW = 3;
const DOUBLE_BACK_SIGNAL_COLD = 0.25;
// Investigation pacing nudges the robot to move occasionally.
const INVESTIGATE_MOVE_INTERVAL = 2;
const INVESTIGATE_CONFIDENCE_MOVE = 0.65;
const INVESTIGATE_FORCED_MOVE_TURNS = 4;
const INVESTIGATE_MAX_TURNS = 6;
const TITLE_FADE_IN_MS = 5000;
const TITLE_FADE_OUT_MS = 5000;
const MUSIC_BUS_DEFAULT = 0.8;
const REWIRE_DAMPEN_TURNS = 3;
const REWIRE_DAMPEN_DECAY = 0.05;
const REWIRE_DAMPEN_CURRENT = 0.18;
const REWIRE_DAMPEN_ADJACENT = 0.1;
const REWIRE_SIGNAL_STRENGTH = 0.06;
const RUN_AUDIO_VOLUME = 0.55;
const RUN_AUDIO_FADE_IN_MS = 90;
const RUN_AUDIO_FADE_OUT_MS = 450;
const SNEAK_AUDIO_VOLUME = 0.45;
const SNEAK_AUDIO_FADE_IN_MS = 140;
const SNEAK_AUDIO_FADE_OUT_MS = 450;
const TYPING_AUDIO_VOLUME = 0.5;
const TYPING_AUDIO_FADE_IN_MS = 250;
const TYPING_AUDIO_FADE_OUT_MS = 300;

const NIGHT_UNLOCKS = {
  1: {
    showMap: true,
    robotActive: false,
    allowSirens: false,
    allowSlowRewire: false,
    allowScannerToggle: false,
    allowNoiseLure: false,
    allowCrafting: true,
    allowDoorJams: false,
    showRobotIntelOnMap: false,
    allowAlarmedRooms: false,
  },
  2: {
    showMap: true,
    robotActive: false,
    allowSirens: false,
    allowSlowRewire: false,
    allowScannerToggle: false,
    allowNoiseLure: false,
    allowCrafting: true,
    allowDoorJams: false,
    showRobotIntelOnMap: false,
    allowAlarmedRooms: false,
  },
  3: {
    showMap: true,
    robotActive: false,
    allowSirens: true,
    allowSlowRewire: true,
    allowScannerToggle: false,
    allowNoiseLure: false,
    allowCrafting: true,
    allowDoorJams: false,
    showRobotIntelOnMap: false,
    allowAlarmedRooms: true,
  },
  4: {
    showMap: true,
    robotActive: false,
    allowSirens: true,
    allowSlowRewire: true,
    allowScannerToggle: true,
    allowNoiseLure: false,
    allowCrafting: true,
    allowDoorJams: false,
    showRobotIntelOnMap: true,
    allowAlarmedRooms: true,
  },
  5: {
    showMap: true,
    robotActive: true,
    allowSirens: true,
    allowSlowRewire: true,
    allowScannerToggle: true,
    allowNoiseLure: true,
    allowCrafting: true,
    allowDoorJams: false,
    showRobotIntelOnMap: true,
    allowAlarmedRooms: true,
  },
  6: {
    showMap: true,
    robotActive: true,
    allowSirens: true,
    allowSlowRewire: true,
    allowScannerToggle: true,
    allowNoiseLure: true,
    allowCrafting: true,
    allowDoorJams: true,
    showRobotIntelOnMap: true,
    allowAlarmedRooms: true,
  },
  7: {
    showMap: true,
    robotActive: true,
    allowSirens: true,
    allowSlowRewire: true,
    allowScannerToggle: true,
    allowNoiseLure: true,
    allowCrafting: true,
    allowDoorJams: true,
    showRobotIntelOnMap: true,
    allowAlarmedRooms: true,
  },
  8: {
    showMap: true,
    robotActive: true,
    allowSirens: true,
    allowSlowRewire: true,
    allowScannerToggle: true,
    allowNoiseLure: true,
    allowCrafting: true,
    allowDoorJams: true,
    showRobotIntelOnMap: true,
    allowAlarmedRooms: true,
  },
  9: {
    showMap: true,
    robotActive: true,
    allowSirens: true,
    allowSlowRewire: true,
    allowScannerToggle: true,
    allowNoiseLure: true,
    allowCrafting: true,
    allowDoorJams: true,
    showRobotIntelOnMap: true,
    allowAlarmedRooms: true,
  },
  10: {
    showMap: true,
    robotActive: true,
    allowSirens: true,
    allowSlowRewire: true,
    allowScannerToggle: true,
    allowNoiseLure: true,
    allowCrafting: true,
    allowDoorJams: true,
    showRobotIntelOnMap: true,
    allowAlarmedRooms: true,
  },
  11: {
    showMap: true,
    robotActive: false,
    allowSirens: false,
    allowSlowRewire: false,
    allowScannerToggle: false,
    allowNoiseLure: false,
    allowCrafting: true,
    allowDoorJams: false,
    showRobotIntelOnMap: false,
    allowAlarmedRooms: false,
  },
};
const DEFAULT_UNLOCKS = {
  showMap: true,
  robotActive: true,
  allowSirens: true,
  allowSlowRewire: true,
  allowScannerToggle: true,
  allowNoiseLure: true,
  allowCrafting: true,
  allowDoorJams: true,
  showRobotIntelOnMap: true,
  allowAlarmedRooms: true,
};

Object.values(NIGHT_UNLOCKS).forEach((unlocks) => Object.freeze(unlocks));
Object.freeze(DEFAULT_UNLOCKS);
Object.freeze(NIGHT_UNLOCKS);

const SCANNER_TOGGLE_SPIKE = 0.16;
const SCANNER_TICK_SIGNAL = 0.08;
const SCANNER_BLEED_SIGNAL = 0.04;
const ALARM_TICK_SIGNAL = 0.07;
const ALARM_BLEED_SIGNAL = 0.03;
const PICKUP_START_ROOM = 0;
const CONTROL_ROOM_ID = 0;

const LURE_TYPES = {
  siren: {
    name: "Alarm Beacon",
    strength: 0.6,
    linger: 4,
    steps: 1,
  },
  beacon: {
    name: "High-Power Beacon",
    strength: 0.78,
    linger: 5,
    steps: 2,
  },
};

const WEATHER_TYPES = [
  {
    type: "Rain",
    description: "Rain dampens the signal bleed. The halls sound softer.",
    modifiers: { signalStrength: 0.92, signalDecay: 1.08, scannerFog: false, surgeBonus: 0, bleedMultiplier: 0.85 },
  },
  {
    type: "Clear",
    description: "Clear air carries every sound. Sunlight slices the rooms.",
    modifiers: { signalStrength: 1.05, signalDecay: 0.98, scannerFog: false, surgeBonus: 0, bleedMultiplier: 1 },
  },
  {
    type: "Fog",
    description: "Fog smothers sightlines. Scanner readings smear and drift.",
    modifiers: { signalStrength: 0.97, signalDecay: 1.02, scannerFog: true, surgeBonus: 0, bleedMultiplier: 1 },
  },
  {
    type: "Storm",
    description: "Storms hammer the grid. Surges roll more often.",
    modifiers: { signalStrength: 1.08, signalDecay: 0.96, scannerFog: false, surgeBonus: 1, bleedMultiplier: 1 },
  },
];

const MISSION_TYPES = {
  ESCAPE: "escape",
  STABILIZE: "stabilize",
  DATA: "data",
};

const STABILIZE_SYSTEMS = [
  { room: "Power Junction", part: "24V Power Pack" },
  { room: "Control Bay", part: "Main Fuse (30A)" },
  { room: "Coolant Vault", part: "Small Fuse (5A)" },
  { room: "Hydraulic Core", part: "9V Battery" },
];

const NIGHT_PROFILES = {
  1: {
    signalStrength: { sneak: 0.5, run: 0.9, device: 0.8 },
    signalDecay: 0.12,
    lastKnownChance: 0.6,
    confidenceGain: 0.8,
    confidenceDecay: 1.1,
    trailStaleness: 1,
    investigateTurns: { min: 2, max: 3 },
    sweepDepth: { low: 1, mid: 1, high: 2 },
    sweepCooldown: 5,
    prediction: { enabled: false, chance: 0.1, cooldown: 7, confidence: 0.8, signal: 0.75 },
    moodChance: { irritated: 0.2, cautious: 0.4, confident: 0.2 },
    killAggression: 0.85,
    sneakBreakRooms: 2,
    sneakDecayBoost: 0.06,
    deviceFatigue: 0.8,
    sneakLastKnownScale: 1,
  },
  2: {
    signalStrength: { sneak: 0.55, run: 0.95, device: 0.85 },
    signalDecay: 0.11,
    lastKnownChance: 0.65,
    confidenceGain: 0.85,
    confidenceDecay: 1.05,
    trailStaleness: 1,
    investigateTurns: { min: 2, max: 3 },
    sweepDepth: { low: 1, mid: 2, high: 2 },
    sweepCooldown: 5,
    prediction: { enabled: false, chance: 0.12, cooldown: 7, confidence: 0.8, signal: 0.7 },
    moodChance: { irritated: 0.25, cautious: 0.4, confident: 0.25 },
    killAggression: 0.9,
    sneakBreakRooms: 2,
    sneakDecayBoost: 0.05,
    deviceFatigue: 0.85,
    sneakLastKnownScale: 0.95,
  },
  3: {
    signalStrength: { sneak: 0.6, run: 1.0, device: 0.9 },
    signalDecay: 0.1,
    lastKnownChance: 0.7,
    confidenceGain: 0.9,
    confidenceDecay: 1.0,
    trailStaleness: 2,
    investigateTurns: { min: 2, max: 4 },
    sweepDepth: { low: 1, mid: 2, high: 3 },
    sweepCooldown: 4,
    prediction: { enabled: true, chance: 0.18, cooldown: 6, confidence: 0.75, signal: 0.7 },
    moodChance: { irritated: 0.3, cautious: 0.35, confident: 0.3 },
    killAggression: 0.95,
    sneakBreakRooms: 2,
    sneakDecayBoost: 0.05,
    deviceFatigue: 0.9,
    sneakLastKnownScale: 0.9,
  },
  4: {
    signalStrength: { sneak: 0.65, run: 1.05, device: 0.95 },
    signalDecay: 0.095,
    lastKnownChance: 0.72,
    confidenceGain: 0.95,
    confidenceDecay: 0.95,
    trailStaleness: 2,
    investigateTurns: { min: 3, max: 4 },
    sweepDepth: { low: 1, mid: 2, high: 3 },
    sweepCooldown: 4,
    prediction: { enabled: true, chance: 0.22, cooldown: 6, confidence: 0.72, signal: 0.68 },
    moodChance: { irritated: 0.35, cautious: 0.3, confident: 0.35 },
    killAggression: 1.0,
    sneakBreakRooms: 2,
    sneakDecayBoost: 0.04,
    deviceFatigue: 0.95,
    sneakLastKnownScale: 0.85,
  },
  5: {
    signalStrength: { sneak: 0.7, run: 1.1, device: 1.0 },
    signalDecay: 0.09,
    lastKnownChance: 0.75,
    confidenceGain: 1.0,
    confidenceDecay: 0.9,
    trailStaleness: 2,
    investigateTurns: { min: 3, max: 5 },
    sweepDepth: { low: 2, mid: 3, high: 3 },
    sweepCooldown: 3,
    prediction: { enabled: true, chance: 0.28, cooldown: 5, confidence: 0.7, signal: 0.65 },
    moodChance: { irritated: 0.4, cautious: 0.25, confident: 0.4 },
    killAggression: 1.05,
    sneakBreakRooms: 3,
    sneakDecayBoost: 0.04,
    deviceFatigue: 1.0,
    sneakLastKnownScale: 0.8,
  },
  6: {
    signalStrength: { sneak: 0.75, run: 1.15, device: 1.05 },
    signalDecay: 0.085,
    lastKnownChance: 0.78,
    confidenceGain: 1.05,
    confidenceDecay: 0.88,
    trailStaleness: 3,
    investigateTurns: { min: 3, max: 5 },
    sweepDepth: { low: 2, mid: 3, high: 4 },
    sweepCooldown: 3,
    prediction: { enabled: true, chance: 0.32, cooldown: 5, confidence: 0.7, signal: 0.63 },
    moodChance: { irritated: 0.45, cautious: 0.2, confident: 0.45 },
    killAggression: 1.1,
    sneakBreakRooms: 3,
    sneakDecayBoost: 0.035,
    deviceFatigue: 1.05,
    sneakLastKnownScale: 0.75,
  },
  7: {
    signalStrength: { sneak: 0.8, run: 1.2, device: 1.1 },
    signalDecay: 0.08,
    lastKnownChance: 0.82,
    confidenceGain: 1.1,
    confidenceDecay: 0.82,
    trailStaleness: 3,
    investigateTurns: { min: 4, max: 6 },
    sweepDepth: { low: 2, mid: 3, high: 4 },
    sweepCooldown: 2,
    prediction: { enabled: true, chance: 0.36, cooldown: 4, confidence: 0.68, signal: 0.6 },
    moodChance: { irritated: 0.5, cautious: 0.15, confident: 0.5 },
    killAggression: 1.15,
    sneakBreakRooms: 3,
    sneakDecayBoost: 0.03,
    deviceFatigue: 1.1,
    sneakLastKnownScale: 0.7,
  },
  8: {
    signalStrength: { sneak: 0.85, run: 1.25, device: 1.15 },
    signalDecay: 0.075,
    lastKnownChance: 0.85,
    confidenceGain: 1.15,
    confidenceDecay: 0.78,
    trailStaleness: 3,
    investigateTurns: { min: 4, max: 6 },
    sweepDepth: { low: 2, mid: 4, high: 4 },
    sweepCooldown: 2,
    prediction: { enabled: true, chance: 0.4, cooldown: 4, confidence: 0.66, signal: 0.6 },
    moodChance: { irritated: 0.55, cautious: 0.15, confident: 0.55 },
    killAggression: 1.2,
    sneakBreakRooms: 3,
    sneakDecayBoost: 0.025,
    deviceFatigue: 1.15,
    sneakLastKnownScale: 0.65,
  },
  9: {
    signalStrength: { sneak: 0.9, run: 1.3, device: 1.2 },
    signalDecay: 0.07,
    lastKnownChance: 0.88,
    confidenceGain: 1.2,
    confidenceDecay: 0.75,
    trailStaleness: 4,
    investigateTurns: { min: 4, max: 7 },
    sweepDepth: { low: 3, mid: 4, high: 5 },
    sweepCooldown: 2,
    prediction: { enabled: true, chance: 0.45, cooldown: 3, confidence: 0.64, signal: 0.58 },
    moodChance: { irritated: 0.6, cautious: 0.1, confident: 0.6 },
    killAggression: 1.25,
    sneakBreakRooms: 4,
    sneakDecayBoost: 0.02,
    deviceFatigue: 1.2,
    sneakLastKnownScale: 0.6,
  },
  10: {
    signalStrength: { sneak: 0.95, run: 1.35, device: 1.25 },
    signalDecay: 0.065,
    lastKnownChance: 0.9,
    confidenceGain: 1.25,
    confidenceDecay: 0.7,
    trailStaleness: 4,
    investigateTurns: { min: 5, max: 7 },
    sweepDepth: { low: 3, mid: 5, high: 5 },
    sweepCooldown: 2,
    prediction: { enabled: true, chance: 0.5, cooldown: 3, confidence: 0.62, signal: 0.55 },
    moodChance: { irritated: 0.65, cautious: 0.1, confident: 0.65 },
    killAggression: 1.3,
    sneakBreakRooms: 4,
    sneakDecayBoost: 0.02,
    deviceFatigue: 1.25,
    sneakLastKnownScale: 0.55,
  },
  11: {
    signalStrength: { sneak: 0.95, run: 1.35, device: 1.25 },
    signalDecay: 0.065,
    lastKnownChance: 0.9,
    confidenceGain: 1.25,
    confidenceDecay: 0.7,
    trailStaleness: 4,
    investigateTurns: { min: 5, max: 7 },
    sweepDepth: { low: 3, mid: 5, high: 5 },
    sweepCooldown: 2,
    prediction: { enabled: true, chance: 0.5, cooldown: 3, confidence: 0.62, signal: 0.55 },
    moodChance: { irritated: 0.65, cautious: 0.1, confident: 0.65 },
    killAggression: 1.3,
    sneakBreakRooms: 4,
    sneakDecayBoost: 0.02,
    deviceFatigue: 1.25,
    sneakLastKnownScale: 0.55,
  },
};

const state = {
  playerRoom: 0,
  robotRoom: 0,
  hidden: false,
  hiddenSpot: null,
  pendingHide: null,
  learnedHidingSpots: new Set(),
  hideHistory: new Map(),
  threat: 1,
  turn: 0,
  titrationBatch: 0,
  inventory: new Map(),
  foundSchematics: new Set(),
  objectiveItemName: null,
  objectiveItemCrafted: false,
  objectiveItemInstalled: false,
  objectiveBlocksEscapeConsole: false,
  completedObjectiveItems: new Set(),
  bagTab: "schematics",
  systemMenuTab: "save",
  inventoryView: "items",
  usedDevices: new Map(),
  robotFocus: null,
  robotFocusTTL: 0,
  lastKnownPlayerRoom: null,
  trailTurns: 0,
  routePreviewRoom: null,
  selectedRoom: null,
  roomSignals: new Map(),
  checkedRooms: new Set(),
  robotLinger: 0,
  robotDormant: 0,
  robotRechargeCooldown: null,
  robotSearchTurns: 0,
  robotSearchSpot: null,
  robotPlannedTarget: null,
  robotLookTurns: 0,
  robotScanTarget: null,
  sawPlayerHide: false,
  hideEncounteredRobotInRoom: false,
  hideSpotArmKey: null,
  robotDisabled: true,
  selectedSchematic: null,
  requiredEscapeSchematic: null,
  escapeReady: false,
  alertTicks: 0,
  objectiveBlocked: false,
  craftMiniGameActive: false,
  craftMiniGame: null,
  miniGameActive: false,
  miniGame: null,
  nightObjectiveId: null,
  nightObjectiveComplete: false,
  robotKilled: false,
  hasFlameSaw: false,
  flameSawFinaleStage: null,
  flameSawFinaleActive: false,
  robotKillGrace: 0,
  actionLock: null,
  escapeConsoleInspected: false,
  tasksAcknowledgedNightOne: false,
  runAcknowledgedNightOne: false,
  runHighlightActive: false,
  runHighlightConsumed: false,
  liveAcknowledgedNightOne: false,
  liveEscapePrompted: false,
  noiseLureCharges: 0,
  playerPath: [],
  playerTravelMode: "sneak",
  playerTravelTotal: 0,
  playerTravelStepStart: null,
  playerTravelStepDuration: 0,
  robotPath: [],
  robotTravelStepStart: null,
  robotTravelStepDuration: 0,
  robotInvestigateTurns: 0,
  robotSweepQueue: [],
  robotCheckedCooldown: new Map(),
  robotPresenceHeat: new Map(),
  robotAlarmVisits: new Map(),
  robotSfxCooldowns: new Map(),
  robotAlarmStreak: 0,
  robotAlarmLoopEdge: null,
  robotAlarmLoopTurns: 0,
  robotMovedThisTick: false,
  robotMode: "idle",
  robotTargetConfidence: 0,
  robotSweepCooldown: 0,
  robotPredictionCooldown: 0,
  robotMood: null,
  robotMoodTicks: 0,
  robotLockOnPlayed: false,
  currentNight: 1,
  completedNight: null,
  nightProfile: null,
  missionType: MISSION_TYPES.ESCAPE,
  escapeMode: "fabricate",
  stabilizeTargets: [],
  stabilizedTargets: new Set(),
  dataFragmentsNeeded: 0,
  dataFragmentsFound: new Set(),
  manualOverrideNeeded: 0,
  manualOverrideTargets: new Set(),
  manualOverridesDone: new Set(),
  dayCount: 1,
  baseDate: new Date("2326-12-25T00:00:00Z"),
  unlocks: {},
  skipNextObjectiveModal: false,
  isAlive: true,
  hasEscaped: false,
  godMode: false,
  debugEyes: false,
  robotAlertQueued: false,
  robotAlertText: "",
  pendingObjectiveModal: null,
  pendingIntroModal: null,
  debugStoryQueue: [],
  statusMessage: "",
  statusTicks: 0,
  bannerMessage: "",
  bannerTicks: 0,
  thoughtMessage: "",
  thoughtTicks: 0,
  playerTrail: [],
  signalDecayBoost: new Map(),
  rewireDampen: new Map(),
  lastStrongSignalTick: -999,
  lastStrongSignalRoom: null,
  lastKnownTick: -999,
  lastTrailBreakTick: -999,
  lastDeviceFatigueTick: -999,
  sneakStepsWithoutSignal: 0,
  turnsSinceStrongSignal: 0,
  directorCooldown: 0,
  pendingSignals: [],
  persistentSignals: new Map(),
  roomNoisePenalty: new Map(),
  burnedHidingSpots: new Set(),
  jammedEdges: new Map(),
  doorJamCharges: 0,
  robotTask: null,
  robotFocusLinger: 0,
  scanPulseTicks: 0,
  scanFocusRoom: null,
  scannerOn: false,
  scannerHighlight: false,
  alarmedRooms: new Set(),
  triggeredAlarms: new Set(),
  alarmTriggerTTL: new Map(),
  disabledAlarmedRooms: new Set(),
  alarmDisableProgress: new Map(),
  alarmedRoomsRequired: 0,
  activeLures: new Map(),
  sunlitRooms: new Set(),
  specialPickups: new Map(),
  requiredPickup: null,
  toolCollected: new Set(),
  deployableUnlocks: { noiseLure: false, doorJam: false },
  nightIntroLine: null,
  storyQueue: [],
  objectiveHoldUntil: 0,
  containmentLineShown: false,
  weather: null,
  weatherAnnounced: false,
  surgeCountdown: null,
  surgeForeshadowed: false,
  surgeTargetRoom: null,
  surgeCharges: 0,
  surgeWarningActive: false,
  surgeWarningRoom: null,
  surgeWarningEndsAt: 0,
  surgeWarningLineShown: false,
  surgeMapFlashRoom: null,
  surgeMapFlashActive: false,
  lightningCooldown: null,
  vista: 0,
  hiddenTurns: 0,
  lastMoveType: "sneak",
  ohShitTriggered: false,
  sanity: 1,
  minSanity: 1,
  prevSanity: 1,
  sanityGlitchCooldown: 0,
  sanityScanCooldown: 0,
  phantomCueShown: false,
  lastSanityRecoveryTick: -999,
  caitCooldown: 0,
  caitTalkCount: 0,
  caitQuietRoomId: null,
  caitQuietSeen: false,
  night11CreditsRolling: false,
  meta: getDefaultMetaFlags(),
  runMoments: [],
  runSummary: "",
  mapTargetMode: null,
  mapTargetSourceRoom: null,
  mapTargetSelection: null,
  robotLastRoom: null,
  recentMoves: [],
  lastMeaningfulActionTurn: -999,
  goofWarningsThisNight: 0,
  lastGoofTriggerTurn: -999,
  permaJammedEdges: new Set(),
  lastNightSpawnedParts: new Set(),
  introStep: null,
  introSequenceActive: false,
  startRevealPending: false,
  introEscapeVisited: false,
  escapeMapSelected: false,
  escapeRunPrompted: false,
  escapeArrivalPrompted: false,
  escapeArrivalAcknowledged: false,
};

let travelAnimationId = null;
let actionLockTimeoutId = null;
let actionLockStepTimeoutId = null;
let lastActionLockStart = null;
let pendingMoveTimeoutId = null;
let miniGameAnimationId = null;
let miniGameAnimationToken = 0;
let miniGameStylesInjected = false;
const ACTION_LOCK_MS = 1200;
const ALARM_TRIGGER_TTL_MIN = 4;
const ALARM_TRIGGER_TTL_MAX = 6;
let schematicSpriteReady = false;
let schematicSpriteLoading = false;
let schematicSpriteFailed = false;
let runAudioActive = false;
let sneakAudioActive = false;
let runAudioTransitionToken = 0;
let sneakAudioTransitionToken = 0;
let runAudioStopTimeoutId = null;
let sneakAudioStopTimeoutId = null;
let runAudioBurstTimeoutId = null;
let runAudioBurstToken = 0;
let sneakAudioBurstTimeoutId = null;
let sneakAudioBurstToken = 0;
let typingTransitionToken = 0;
let typingAudioActive = false;
let typingAudioTimeoutId = null;
let screenQueryApplied = false;
const SUNLIGHT_MEMORY_TEXT = "You remember sunlight on a chipped mug.\nIt mattered then.";
const SUNLIGHT_MEMORY_CHANCE = 0.28;
const SUNLIGHT_MEMORY_TICKS = 3;
const INVENTORY_VIEWS = [
  { key: "items", label: "Items" },
  { key: "power", label: "Power & Access" },
];

const dom = {
  svgSpriteHost: document.getElementById("svgSpriteHost"),
  audioGate: document.getElementById("audioGate"),
  audioGateBtn: document.getElementById("audioGateBtn"),
  audioGateDebugBtn: document.getElementById("audioGateDebugBtn"),
  titleScreen: document.getElementById("titleScreen"),
  titleVideoBackdrop: document.getElementById("titleVideoBackdrop"),
  titleVideo: document.getElementById("titleVideo"),
  titleVideos: document.querySelectorAll(".title-video"),
  titleAudio: document.getElementById("titleAudio"),
  titleDebugBtn: document.getElementById("titleDebugBtn"),
  introFade: document.getElementById("introFade"),
  rainAudio: document.getElementById("rainAudio"),
  fogAudio: document.getElementById("fogAudio"),
  sunnyAudio: document.getElementById("sunnyAudio"),
  sneakAudio: document.getElementById("sneakAudio"),
  runningAudio: document.getElementById("runningAudio"),
  typingAudio: document.getElementById("typingAudio"),
  alarmAudio: document.getElementById("alarmAudio"),
  surgeAudio: document.getElementById("surgeAudio"),
  lightningAudio: document.getElementById("lightningAudio"),
  menuPressAudio: document.getElementById("menuPressAudio"),
  caitRadioAudio: document.getElementById("caitRadioAudio"),
  robotDistantMoveAudio: document.getElementById("robotDistantMoveAudio"),
  robotNearMoveAudio: document.getElementById("robotNearMoveAudio"),
  robotEnterAudio: document.getElementById("robotEnterAudio"),
  robotInspectAudio: document.getElementById("robotInspectAudio"),
  robotLockOnAudio: document.getElementById("robotLockOnAudio"),
  robotRerouteAudio: document.getElementById("robotRerouteAudio"),
  robotCaptureAudio: document.getElementById("robotCaptureAudio"),
  titleStartBtn: document.getElementById("titleStartBtn"),
  app: document.querySelector(".app"),
  overlayFooter: document.querySelector(".overlay-footer"),
  dateLabel: document.getElementById("dateLabel"),
  roomMedia: document.getElementById("roomMedia"),
  currentRooms: document.querySelectorAll(".current-room"),
  robotStatuses: document.querySelectorAll(".robot-status"),
  travelStatus: document.getElementById("travelStatus"),
  roomActions: document.getElementById("roomActions"),
  inventoryList: document.getElementById("inventoryList"),
  itemsPrevBtn: document.getElementById("itemsPrevBtn"),
  itemsNextBtn: document.getElementById("itemsNextBtn"),
  itemsCategoryLabel: document.getElementById("itemsCategoryLabel"),
  schematicInventory: document.getElementById("schematicInventory"),
  schematicList: document.getElementById("schematicList"),
  toolsList: document.getElementById("toolsList"),
  floorplanMap: document.getElementById("floorplanMap"),
  mapWeatherLabel: document.getElementById("mapWeatherLabel"),
  randomizeBtn: document.getElementById("randomizeBtn"),
  forceEscapeBtn: document.getElementById("forceEscapeBtn"),
  testRunAudioBtn: document.getElementById("testRunAudioBtn"),
  silenceAudioBtn: document.getElementById("silenceAudioBtn"),
  unmuteAudioBtn: document.getElementById("unmuteAudioBtn"),
  giveAllBtn: document.getElementById("giveAllBtn"),
  godModeBtn: document.getElementById("godModeBtn"),
  eyesBtn: document.getElementById("eyesBtn"),
  debugStoryBtn: document.getElementById("debugStoryBtn"),
  debugMiniGameIntroEscape: document.getElementById("debugMiniGameIntroEscape"),
  debugMiniGameCircuit: document.getElementById("debugMiniGameCircuit"),
  debugMiniGameAlarmCalibration: document.getElementById("debugMiniGameAlarmCalibration"),
  debugMiniGameScannerDiagnostic: document.getElementById("debugMiniGameScannerDiagnostic"),
  debugMiniGameSignalFilter: document.getElementById("debugMiniGameSignalFilter"),
  debugMiniGameChem: document.getElementById("debugMiniGameChem"),
  debugMiniGameMechTolerance: document.getElementById("debugMiniGameMechTolerance"),
  debugMiniGameAsm: document.getElementById("debugMiniGameAsm"),
  debugMiniGameControlLoop: document.getElementById("debugMiniGameControlLoop"),
  debugMiniGameFlameSaw: document.getElementById("debugMiniGameFlameSaw"),
  debugSanityInput: document.getElementById("debugSanity"),
  debugSanityValue: document.getElementById("debugSanityValue"),
  selectedRoom: document.getElementById("selectedRoom"),
  selectedRoomNote: document.getElementById("selectedRoomNote"),
  menuBtn: document.getElementById("menuBtn"),
  mapBtn: document.getElementById("mapBtn"),
  liveBtn: document.getElementById("liveBtn"),
  tasksBtn: document.getElementById("tasksBtn"),
  useBtn: document.getElementById("useBtn"),
  systemMenuBtn: document.getElementById("systemMenuBtn"),
  toggleRobotBtn: document.getElementById("toggleRobotBtn"),
  sneakBtn: document.getElementById("sneakBtn"),
  runBtn: document.getElementById("runBtn"),
  menuPanel: document.getElementById("menuPanel"),
  bagTabSchematics: document.getElementById("bagTabSchematics"),
  bagTabItems: document.getElementById("bagTabItems"),
  bagTabTools: document.getElementById("bagTabTools"),
  systemMenuPanel: document.getElementById("systemMenuPanel"),
  systemTabSave: document.getElementById("systemTabSave"),
  systemTabLoad: document.getElementById("systemTabLoad"),
  systemTabHelp: document.getElementById("systemTabHelp"),
  systemTabSettings: document.getElementById("systemTabSettings"),
  systemTabDebug: document.getElementById("systemTabDebug"),
  saveGameBtn: document.getElementById("saveGameBtn"),
  saveNameInput: document.getElementById("saveNameInput"),
  saveList: document.getElementById("saveList"),
  saveStatus: document.getElementById("saveStatus"),
  loadStatus: document.getElementById("loadStatus"),
  loadRecentBtn: document.getElementById("loadRecentBtn"),
  masterVolumeSlider: document.getElementById("masterVolumeSlider"),
  musicVolumeSlider: document.getElementById("musicVolumeSlider"),
  ambienceVolumeSlider: document.getElementById("ambienceVolumeSlider"),
  movementVolumeSlider: document.getElementById("movementVolumeSlider"),
  uiVolumeSlider: document.getElementById("uiVolumeSlider"),
  sfxVolumeSlider: document.getElementById("sfxVolumeSlider"),
  openDebugPanelBtn: document.getElementById("openDebugPanelBtn"),
  mapPanel: document.getElementById("mapPanel"),
  usePanel: document.getElementById("usePanel"),
  debugPanel: document.getElementById("debugPanel"),
  useList: document.getElementById("useList"),
  componentPanel: document.getElementById("componentPanel"),
  componentTitle: document.getElementById("componentTitle"),
  componentDetails: document.getElementById("componentDetails"),
  componentCount: document.getElementById("componentCount"),
  componentRequirements: document.getElementById("componentRequirements"),
  componentOkBtn: document.getElementById("componentOkBtn"),
  tasksPanel: document.getElementById("tasksPanel"),
  tasksText: document.getElementById("tasksText"),
  tasksOkBtn: document.getElementById("tasksOkBtn"),
  objectiveModal: document.getElementById("objectiveModal"),
  objectiveModalTitle: document.getElementById("objectiveModalTitle"),
  objectiveModalText: document.getElementById("objectiveModalText"),
  ackObjectiveBtn: document.getElementById("ackObjectiveBtn"),
  craftMiniGame: document.getElementById("craftMiniGame"),
  craftMiniGameSubtitle: document.getElementById("craftMiniGameSubtitle"),
  craftMiniGameBoard: document.getElementById("craftMiniGameBoard"),
  craftMiniGameTray: document.getElementById("craftMiniGameTray"),
  craftMiniGameCancelBtn: document.getElementById("craftMiniGameCancelBtn"),
  craftMiniGameCommitBtn: document.getElementById("craftMiniGameCommitBtn"),
  miniGamePanel: document.getElementById("miniGamePanel"),
  miniGameTitle: document.getElementById("miniGameTitle"),
  miniGameText: document.getElementById("miniGameText"),
  miniGameOptions: document.getElementById("miniGameOptions"),
  miniGameCancelBtn: document.getElementById("miniGameCancelBtn"),
  miniGameSubmitBtn: document.getElementById("miniGameSubmitBtn"),
  caitQuietModal: document.getElementById("caitQuietModal"),
  caitQuietText: document.getElementById("caitQuietText"),
  ackCaitQuietBtn: document.getElementById("ackCaitQuietBtn"),
  robotAlertModal: document.getElementById("robotAlertModal"),
  robotAlertText: document.getElementById("robotAlertText"),
  ackRobotAlertBtn: document.getElementById("ackRobotAlertBtn"),
  buildBtn: document.getElementById("buildBtn"),
  cancelBtn: document.getElementById("cancelBtn"),
  deployBtn: document.getElementById("deployBtn"),
  deployStatus: document.getElementById("deployStatus"),
  scannerToggleBtn: document.getElementById("scannerToggleBtn"),
  scannerToggleStatus: document.getElementById("scannerToggleStatus"),
  deathScreen: document.getElementById("deathScreen"),
  victoryScreen: document.getElementById("victoryScreen"),
  retryBtn: document.getElementById("retryBtn"),
  nextNightBtn: document.getElementById("nextNightBtn"),
  victoryTitle: document.getElementById("victoryTitle"),
  actionStatus: document.getElementById("actionStatus"),
  actionLock: document.getElementById("actionLock"),
  actionLockLabel: document.getElementById("actionLockLabel"),
  nightSelect: document.getElementById("nightSelect"),
  debugWeatherSelect: document.getElementById("debugWeatherSelect"),
  debugLog: document.getElementById("debugLog"),
  creditsScreen: document.getElementById("creditsScreen"),
  creditsScroll: document.getElementById("creditsScroll"),
  creditsText: document.getElementById("creditsText"),
};

const NORMALIZED_AUDIO_DIR = "mp3_normalized";
const RAW_AUDIO_DIR = "mp3_raw";
const SOUND_SETTINGS_FILE = "sound_settings.txt";
const soundSettings = new Map();
const AUDIO_SOURCE_MAP = [
  { element: dom.titleAudio, filename: "title-screen.mp3" },
  { element: dom.rainAudio, filename: "rainy.mp3" },
  { element: dom.fogAudio, filename: "foggy.mp3" },
  { element: dom.sunnyAudio, filename: "sunny.mp3" },
  { element: dom.sneakAudio, filename: "sneak.mp3" },
  { element: dom.runningAudio, filename: "running.mp3" },
  { element: dom.typingAudio, filename: "Typing.mp3" },
  { element: dom.alarmAudio, filename: "alarm.mp3" },
  { element: dom.surgeAudio, filename: "surge.mp3" },
  { element: dom.lightningAudio, filename: "lightning_loud.mp3" },
];
const SAVE_LIST_KEY = "robtergeist_saves_v2";
const SAVE_COUNTER_KEY = "robtergeist_save_counter_v1";
const LEGACY_SAVE_KEY = "robtergeist_save_v1";
const META_STORAGE_KEY = "robtergeist_meta_v1";

function getDefaultMetaFlags() {
  return {
    surgeAlertShown: false,
    alarmAlertShown: false,
    caitFrayedTutorialShown: false,
    sunlightMemoryShown: false,
  };
}

function loadMetaFlags() {
  try {
    const raw = window.localStorage.getItem(META_STORAGE_KEY);
    if (!raw) return getDefaultMetaFlags();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return getDefaultMetaFlags();
    return { ...getDefaultMetaFlags(), ...parsed };
  } catch (error) {
    console.warn("Failed to load meta flags:", error);
    return getDefaultMetaFlags();
  }
}

function saveMetaFlags() {
  try {
    window.localStorage.setItem(META_STORAGE_KEY, JSON.stringify(state.meta));
  } catch (error) {
    console.warn("Failed to save meta flags:", error);
  }
}

function markMetaFlag(flag) {
  if (!state.meta) {
    state.meta = getDefaultMetaFlags();
  }
  if (state.meta[flag]) return;
  state.meta[flag] = true;
  saveMetaFlags();
}

function clearMetaFlags() {
  state.meta = getDefaultMetaFlags();
  saveMetaFlags();
}
const STATE_MAP_KEYS = [
  "hideHistory",
  "inventory",
  "usedDevices",
  "roomSignals",
  "robotCheckedCooldown",
  "robotPresenceHeat",
  "robotAlarmVisits",
  "robotSfxCooldowns",
  "signalDecayBoost",
  "rewireDampen",
  "persistentSignals",
  "roomNoisePenalty",
  "jammedEdges",
  "alarmTriggerTTL",
  "alarmDisableProgress",
  "activeLures",
  "specialPickups",
];
const STATE_SET_KEYS = [
  "learnedHidingSpots",
  "foundSchematics",
  "completedObjectiveItems",
  "checkedRooms",
  "stabilizedTargets",
  "dataFragmentsFound",
  "manualOverrideTargets",
  "manualOverridesDone",
  "alarmedRooms",
  "triggeredAlarms",
  "disabledAlarmedRooms",
  "burnedHidingSpots",
  "sunlitRooms",
  "toolCollected",
  "permaJammedEdges",
  "lastNightSpawnedParts",
];

function setAudioSource(element, filename, baseDir) {
  const sources = element.querySelectorAll("source");
  if (sources.length > 0) {
    sources[0].src = `${baseDir}/${filename}`;
    sources.forEach((source, index) => {
      if (index > 0) {
        source.remove();
      }
    });
  } else {
    element.src = `${baseDir}/${filename}`;
  }
}

function attachAudioFallback(element, filename) {
  if (element.dataset.audioFallbackBound === "true") return;
  element.dataset.audioFallbackBound = "true";

  const handleError = () => {
    const currentSrc = element.currentSrc || element.src;
    if (!currentSrc.includes(`/${NORMALIZED_AUDIO_DIR}/`)) return;
    setAudioSource(element, filename, RAW_AUDIO_DIR);
    if (typeof element.load === "function") {
      element.load();
    }
  };

  element.addEventListener("error", handleError);
  element.querySelectorAll("source").forEach((source) => {
    source.addEventListener("error", handleError);
  });
}

function setNormalizedAudioSources() {
  AUDIO_SOURCE_MAP.forEach(({ element, filename }) => {
    if (!element) return;
    setAudioSource(element, filename, NORMALIZED_AUDIO_DIR);
    attachAudioFallback(element, filename);
    if (typeof element.load === "function") {
      element.load();
    }
  });
}

function parseSoundSettings(text) {
  const nextSettings = new Map();
  const lines = String(text ?? "").split(/\r?\n/);
  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) return;
    const [name, value] = line.split(/\s+/);
    if (!name || !value) {
      console.warn(`sound settings: invalid line ${index + 1}:`, rawLine);
      return;
    }
    const parsedValue = Number.parseFloat(value);
    if (!Number.isFinite(parsedValue)) {
      console.warn(`sound settings: invalid volume for ${name}:`, rawLine);
      return;
    }
    nextSettings.set(name, clamp(parsedValue, 0, 1));
  });
  return nextSettings;
}

async function loadSoundSettings() {
  try {
    const response = await fetch(SOUND_SETTINGS_FILE, { cache: "no-store" });
    if (!response.ok) {
      console.warn("sound settings: missing or unreadable", response.status);
      return;
    }
    const text = await response.text();
    soundSettings.clear();
    parseSoundSettings(text).forEach((value, key) => {
      soundSettings.set(key, value);
    });
    applySoundSettingsToTracks();
  } catch (error) {
    console.warn("sound settings: failed to load", error);
  }
}

function getSoundSettingsKey(audioEl) {
  if (!audioEl) return null;
  if (audioEl.dataset?.audioKey) return audioEl.dataset.audioKey;
  const src = audioEl.currentSrc || audioEl.src;
  if (!src) return null;
  const lastSlash = src.lastIndexOf("/");
  return lastSlash >= 0 ? src.slice(lastSlash + 1) : src;
}

function getSoundSettingVolumeForElement(audioEl) {
  const key = getSoundSettingsKey(audioEl);
  if (!key) return 1;
  const setting = soundSettings.get(key);
  return Number.isFinite(setting) ? setting : 1;
}

const audioBuses = {
  master: 1,
  music: 1,
  ambience: 1,
  movement: 1,
  ui: 1,
  sfx: 1,
};
const loopTracks = new Map();
let audioMutedByUser = false;
let audioRecoveryEventsAttached = false;

function registerLoopTrack(name, element, bus, baseVolume) {
  if (!element) return;
  const maxVolume = getSoundSettingVolumeForElement(element);
  loopTracks.set(name, {
    name,
    element,
    bus,
    baseVolume,
    maxVolume,
    currentTargetVolume: 0,
    fadeToken: 0,
    isPrimed: false,
    isReady: false,
    readyListenerAttached: false,
    pendingPlay: false,
    loadRequested: false,
  });
}

function primeLoopTrack(track) {
  if (!track?.element) return;
  const audio = track.element;
  audio.loop = true;
  if (track.isPrimed) return;
  audio.muted = audioMutedByUser;
  audio.volume = 0;
  track.isPrimed = true;
  if (!track.loadRequested && typeof audio.load === "function") {
    audio.load();
    track.loadRequested = true;
  }
}

function ensureLoopTrackPlaying(name, { restart = false } = {}) {
  const track = loopTracks.get(name);
  if (!track?.element) return;
  primeLoopTrack(track);
  const audio = track.element;
  if (restart || audio.ended) {
    audio.currentTime = 0;
  }
  if (audio.paused) {
    queueLoopTrackPlay(track);
  }
}

function isTrackStalled(name) {
  const track = loopTracks.get(name);
  if (!track?.element) return false;
  const audio = track.element;
  const now = performance.now();
  const stats = trackPlaybackStats.get(name);
  const lastTime = Number.isFinite(stats?.lastTime) ? stats.lastTime : audio.currentTime;
  const lastWallClock = Number.isFinite(stats?.lastWallClock) ? stats.lastWallClock : now;
  if (audio.paused) {
    trackPlaybackStats.set(name, { lastTime: audio.currentTime, lastWallClock: now });
    return true;
  }
  if (audio.readyState < 2) {
    trackPlaybackStats.set(name, { lastTime: audio.currentTime, lastWallClock: now });
    return true;
  }
  if (audio.muted || audio.volume <= 0.01) {
    trackPlaybackStats.set(name, { lastTime: audio.currentTime, lastWallClock: now });
    return false;
  }
  const wallClockDelta = now - lastWallClock;
  const playbackDelta = audio.currentTime - lastTime;
  const stalled = wallClockDelta > 500 && playbackDelta < 0.02;
  trackPlaybackStats.set(name, { lastTime: audio.currentTime, lastWallClock: now });
  return stalled;
}

function forceStartLoopTrack(name) {
  if (!audioUnlockedOnce) return;
  const track = loopTracks.get(name);
  if (!track?.element) return;
  primeLoopTrack(track);
  const audio = track.element;
  audio.loop = true;
  audio.muted = false;
  if (audio.readyState < 2 && typeof audio.load === "function") {
    audio.load();
  }
  audio.currentTime = 0;
  const now = performance.now();
  const lastLog = movementForceLogTimes.get(name) ?? 0;
  if (now - lastLog > 3000) {
    movementForceLogTimes.set(name, now);
    console.info("audio: forceStartLoopTrack", name, {
      paused: audio.paused,
      readyState: audio.readyState,
      networkState: audio.networkState,
    });
  }
  attemptPlayAudio(audio, `${name}-force`);
}

function ensureTrackAudible(name) {
  const track = loopTracks.get(name);
  if (!track?.element) return;
  if (!audioUnlockedOnce || !hasStartedGame) return;
  if (audioMutedByUser) return;
  const effectiveTarget = getEffectiveVolume(track, track.currentTargetVolume);
  if (effectiveTarget <= 0.01) return;
  const audio = track.element;
  if (audio.paused || audio.ended || audio.readyState < 2 || isTrackStalled(name)) {
    forceStartLoopTrack(name);
  }
  if (audio.muted && effectiveTarget > 0) {
    audio.muted = false;
  }
}

function ensureTypingAudibleIfNeeded() {
  if (!dom.typingAudio) return;
  if (!audioUnlockedOnce || !hasStartedGame) return;
  if (audioMutedByUser) return;
  if (!typingAudioActive) return;
  const audio = dom.typingAudio;
  if (audio.volume <= 0.01) return;
  if (audio.paused || audio.ended || audio.readyState < 2) {
    audio.loop = true;
    audio.currentTime = 0;
    attemptPlayAudio(audio, "typing");
  }
  if (audio.muted) {
    audio.muted = false;
  }
}

registerLoopTrack("rain", dom.rainAudio, "ambience", 0.6);
registerLoopTrack("fog", dom.fogAudio, "ambience", 0.5);
registerLoopTrack("sunny", dom.sunnyAudio, "ambience", 0.5);
registerLoopTrack("run", dom.runningAudio, "movement", RUN_AUDIO_VOLUME);
registerLoopTrack("sneak", dom.sneakAudio, "movement", SNEAK_AUDIO_VOLUME);
registerLoopTrack("alarm", dom.alarmAudio, "sfx", 0.35);

const fxState = {
  overlay: null,
  warp: null,
  ctx: null,
  animationId: null,
  jitterTimeoutId: null,
  jitterEnabled: false,
  nextJitterTime: 0,
  level: 0,
};

const fxAudioState = {
  alarmGain: null,
  alarmFilter: null,
  alarmOscillators: [],
  alarmLfo: null,
  alarmLfoGain: null,
  noiseBuffer: null,
};

let alarmFxActive = false;
let surgeWarningTimeoutId = null;
let surgeMapFlashTimeoutId = null;

let gameLoopId = null;
let hasStartedGame = false;
let audioUnlockedOnce = false;
let titleSyncAnimationId = null;
let canStartAmbience = false;
let audioLoopsPrimed = false;
let audioHealthIntervalId = null;
const audioPlayFailureLogged = new Map();
const trackPlaybackStats = new Map();
const movementForceLogTimes = new Map();
let creditsTextPromise = null;
const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
const debugLogBuffer = [];

function formatConsoleArg(arg) {
  if (arg instanceof Error) {
    return `${arg.name}: ${arg.message}`;
  }
  if (typeof arg === "string") {
    return arg;
  }
  try {
    return JSON.stringify(arg);
  } catch (err) {
    return String(arg);
  }
}

function appendDebugLog(level, args) {
  const message = args.map(formatConsoleArg).join(" ");
  const timestamp = new Date().toLocaleTimeString();
  const lineText = `[${timestamp}] [${level}] ${message}`;
  if (!dom.debugLog) {
    debugLogBuffer.push({ level, text: lineText });
    return;
  }
  const line = document.createElement("div");
  line.className = `debug-log-line ${level}`;
  line.textContent = lineText;
  dom.debugLog.appendChild(line);
  dom.debugLog.scrollTop = dom.debugLog.scrollHeight;
}

function flushDebugLogBuffer() {
  if (!dom.debugLog || debugLogBuffer.length === 0) return;
  debugLogBuffer.splice(0).forEach((entry) => {
    const line = document.createElement("div");
    line.className = `debug-log-line ${entry.level}`;
    line.textContent = entry.text;
    dom.debugLog.appendChild(line);
  });
  dom.debugLog.scrollTop = dom.debugLog.scrollHeight;
}

function mirrorConsole() {
  const consoleProxy = {
    log: console.log.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    info: console.info.bind(console),
    debug: console.debug.bind(console),
  };
  console.log = (...args) => {
    consoleProxy.log(...args);
    appendDebugLog("log", args);
  };
  console.warn = (...args) => {
    consoleProxy.warn(...args);
    appendDebugLog("warn", args);
  };
  console.error = (...args) => {
    consoleProxy.error(...args);
    appendDebugLog("error", args);
  };
  console.info = (...args) => {
    consoleProxy.info(...args);
    appendDebugLog("info", args);
  };
  console.debug = (...args) => {
    consoleProxy.debug(...args);
    appendDebugLog("debug", args);
  };
}

function logAudioPlayFailure(label, audio, err) {
  const errorName = err?.name ?? "UnknownError";
  let loggedNames = audioPlayFailureLogged.get(label);
  if (!loggedNames) {
    loggedNames = new Set();
    audioPlayFailureLogged.set(label, loggedNames);
  }
  if (loggedNames.has(errorName)) return;
  loggedNames.add(errorName);
  console.warn(`${label} audio play() failed (${errorName}):`, err);
  if (audio) {
    const mediaError = audio.error
      ? { code: audio.error.code, message: audio.error.message }
      : null;
    console.log(
      `${label}Audio currentSrc:`,
      audio.currentSrc,
      "readyState:",
      audio.readyState,
      "networkState:",
      audio.networkState,
      "error:",
      mediaError,
    );
  }
}

function attemptPlayAudio(audio, label) {
  if (!audio) return;
  if (!audioUnlockedOnce) return;
  const playAttempt = audio.play();
  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch((err) => logAudioPlayFailure(label, audio, err));
  }
}

const ROBOT_SFX_VOLUMES = {
  distantMove: 0.25,
  nearMove: 0.35,
  enterThunk: 0.55,
  inspectClicks: 0.3,
  lockOnTone: 0.4,
  rerouteScrape: 0.45,
  captureImpact: 0.65,
};
const ROBOT_SFX_LABELS = new Set([
  "robot-distant-move",
  "robot-near-move",
  "robot-enter-room",
  "robot-inspect",
  "robot-lock-on",
  "robot-reroute",
  "robot-capture",
]);

function getRobotSfxDistanceMultiplier(label) {
  if (!ROBOT_SFX_LABELS.has(label)) return 1;
  const distance = getRobotDistance();
  if (distance === null || distance <= 0) return 1;
  if (distance === 1) return 0.7;
  if (distance === 2) return 0.45;
  return 0.25;
}

function playSfx(
  audioEl,
  label,
  { volume = 1, cooldownTicks = 0, skipIfPlaying = false } = {},
) {
  if (!audioEl) return;
  if (!audioUnlockedOnce || !hasStartedGame) return;
  const cooldowns = state.robotSfxCooldowns;
  if (cooldowns && cooldowns.get(label) > 0) return;
  if (skipIfPlaying && !audioEl.paused && !audioEl.ended) return;
  audioEl.currentTime = 0;
  audioEl.muted = false;
  const distanceMultiplier = getRobotSfxDistanceMultiplier(label);
  const maxVolume = getSoundSettingVolumeForElement(audioEl);
  const busVolume = audioBuses.sfx ?? 1;
  const masterVolume = audioBuses.master ?? 1;
  audioEl.volume = clamp(volume * distanceMultiplier * maxVolume * busVolume * masterVolume, 0, 1);
  attemptPlayAudio(audioEl, label);
  if (cooldownTicks > 0 && cooldowns) {
    cooldowns.set(label, cooldownTicks);
  }
}

function playUiSfx(
  audioEl,
  label,
  { volume = 1, allowBeforeStart = false, skipIfPlaying = false } = {},
) {
  if (!audioEl) return;
  if (!audioUnlockedOnce) return;
  if (audioMutedByUser) return;
  if (!allowBeforeStart && !hasStartedGame) return;
  if (skipIfPlaying && !audioEl.paused && !audioEl.ended) return;
  audioEl.currentTime = 0;
  audioEl.muted = false;
  const maxVolume = getSoundSettingVolumeForElement(audioEl);
  const busVolume = audioBuses.ui ?? 1;
  const masterVolume = audioBuses.master ?? 1;
  audioEl.volume = clamp(volume * maxVolume * busVolume * masterVolume, 0, 1);
  attemptPlayAudio(audioEl, label);
}

function shouldSuppressMenuPress(button) {
  if (!button) return false;
  if (button === dom.sneakBtn || button === dom.runBtn) return true;
  if (button.classList.contains("escape-button")) return true;
  if (button.dataset?.suppressMenuPress === "true") return true;
  if (isPlayerTraveling()) return true;
  if (state.hasEscaped) return true;
  return false;
}

function isHotkeyBlocked() {
  const active = document.activeElement;
  if (active) {
    const tag = active.tagName?.toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select" || active.isContentEditable) {
      return true;
    }
  }
  const modals = [
    dom.objectiveModal,
    dom.robotAlertModal,
    dom.craftMiniGame,
    dom.caitQuietModal,
    dom.deathScreen,
    dom.victoryScreen,
    dom.creditsScreen,
  ];
  return modals.some((modal) => modal?.classList.contains("active"));
}

const NAVIGATION_PANELS = [
  () => dom.miniGamePanel,
  () => dom.craftMiniGame,
  () => dom.menuPanel,
  () => dom.systemMenuPanel,
  () => dom.usePanel,
  () => dom.debugPanel,
  () => dom.componentPanel,
  () => dom.tasksPanel,
  () => dom.objectiveModal,
  () => dom.robotAlertModal,
  () => dom.caitQuietModal,
  () => dom.deathScreen,
  () => dom.victoryScreen,
  () => dom.creditsScreen,
];

function getActiveNavigationRoot() {
  const activePanel = NAVIGATION_PANELS
    .map((getPanel) => getPanel())
    .find((panel) => panel?.classList.contains("active"));
  if (activePanel) return activePanel;
  return dom.roomActions ?? null;
}

function getFocusableCandidates(root) {
  if (!root) return [];
  return Array.from(
    root.querySelectorAll("button, [role=\"button\"], [tabindex]")
  ).filter((el) => {
    if (!el) return false;
    if (el.closest("[aria-hidden=\"true\"]")) return false;
    if (el.tabIndex < 0) return false;
    if (!el.getClientRects().length) return false;
    if (el.matches("button") && el.disabled) return false;
    if (el.getAttribute("aria-disabled") === "true") return false;
    return true;
  });
}

function getDirectionalFocusTarget(candidates, current, direction) {
  if (!candidates.length) return null;
  if (!current || !candidates.includes(current)) {
    return candidates[0];
  }
  const currentRect = current.getBoundingClientRect();
  const currentCenter = {
    x: currentRect.left + currentRect.width / 2,
    y: currentRect.top + currentRect.height / 2,
  };
  const primaryAxis = direction === "up" || direction === "down" ? "y" : "x";
  const directionSign = direction === "up" || direction === "left" ? -1 : 1;
  const candidatesInDirection = candidates.filter((candidate) => {
    if (candidate === current) return false;
    const rect = candidate.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    const delta = center[primaryAxis] - currentCenter[primaryAxis];
    return directionSign * delta > 0;
  });
  if (!candidatesInDirection.length) {
    return direction === "up" || direction === "left"
      ? candidates[candidates.length - 1]
      : candidates[0];
  }
  const scored = candidatesInDirection.map((candidate) => {
    const rect = candidate.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    const dx = center.x - currentCenter.x;
    const dy = center.y - currentCenter.y;
    const primaryDistance = primaryAxis === "y" ? Math.abs(dy) : Math.abs(dx);
    const secondaryDistance = primaryAxis === "y" ? Math.abs(dx) : Math.abs(dy);
    return {
      candidate,
      score: primaryDistance * 1000 + secondaryDistance,
    };
  });
  scored.sort((a, b) => a.score - b.score);
  return scored[0]?.candidate ?? null;
}

function handleDirectionalNavigation(event) {
  if (!event) return false;
  if (event.metaKey || event.ctrlKey || event.altKey) return false;
  const direction = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  }[event.key];
  const isSpace = event.key === " " || event.key === "Spacebar";
  if (!direction && !isSpace) return false;
  if (dom.mapPanel?.classList.contains("active")) return false;
  const root = getActiveNavigationRoot();
  const candidates = getFocusableCandidates(root);
  if (!candidates.length) return false;
  const active = document.activeElement;
  if (active) {
    const tag = active.tagName?.toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select" || active.isContentEditable) {
      return false;
    }
  }
  if (isSpace) {
    if (active && candidates.includes(active)) {
      if (active.matches("button") && active.disabled) return false;
      active.click();
      event.preventDefault();
      return true;
    }
    return false;
  }
  const target = getDirectionalFocusTarget(candidates, active, direction);
  if (!target) return false;
  target.focus({ preventScroll: true });
  event.preventDefault();
  return true;
}

function getActiveModalOkButton() {
  const modalButtons = [
    { modal: dom.componentPanel, button: dom.componentOkBtn },
    { modal: dom.objectiveModal, button: dom.ackObjectiveBtn },
    { modal: dom.robotAlertModal, button: dom.ackRobotAlertBtn },
    { modal: dom.caitQuietModal, button: dom.ackCaitQuietBtn },
  ];
  return (
    modalButtons.find(({ modal }) => modal?.classList.contains("active"))?.button ?? null
  );
}

const ACTION_HOTKEY_LABELS = new Map([
  ["escape", "E"],
  ["inspect-console", "I"],
  ["align-override", "A"],
  ["disable-alarm", "D"],
  ["talk-cait", "K"],
]);

function appendHotkeyHint(button, actionKey) {
  if (!button || !actionKey) return;
  const hint = ACTION_HOTKEY_LABELS.get(actionKey);
  if (!hint) return;
  const hotkey = document.createElement("span");
  hotkey.textContent = hint;
  hotkey.classList.add("hotkey-hint");
  hotkey.setAttribute("aria-hidden", "true");
  button.appendChild(hotkey);
}

function triggerRoomAction(actionKey) {
  if (!actionKey) return false;
  const button = dom.roomActions?.querySelector(`button[data-action-key="${actionKey}"]`);
  if (!button || button.disabled) return false;
  button.click();
  return true;
}

function clickButton(button) {
  if (!button || button.disabled) return false;
  button.click();
  return true;
}

function applySoundSettingsToTracks() {
  loopTracks.forEach((track) => {
    track.maxVolume = getSoundSettingVolumeForElement(track.element);
    if (track.isPrimed) {
      applyLoopTrackMix(track, { ensurePlaying: false });
    }
  });
}

function queueLoopTrackPlay(track) {
  if (!track?.element) return;
  const audio = track.element;
  const readyState = Number.isFinite(audio.readyState) ? audio.readyState : 0;
  if (readyState >= 2) {
    track.isReady = true;
    track.pendingPlay = false;
    attemptPlayAudio(audio, track.name);
    return;
  }
  track.pendingPlay = true;
  if (track.readyListenerAttached) return;
  track.readyListenerAttached = true;
  const readyEvents = ["loadeddata", "canplay", "canplaythrough"];
  const cleanup = () => {
    track.readyListenerAttached = false;
    readyEvents.forEach((eventName) => {
      audio.removeEventListener(eventName, onReady);
    });
    audio.removeEventListener("error", onError);
  };
  const onReady = () => {
    cleanup();
    track.isReady = true;
    if (track.pendingPlay) {
      track.pendingPlay = false;
      attemptPlayAudio(audio, track.name);
    }
  };
  const onError = () => {
    cleanup();
    track.pendingPlay = false;
    console.warn(`${track.name} audio error:`, audio.error, {
      currentSrc: audio.currentSrc,
      readyState: audio.readyState,
      networkState: audio.networkState,
    });
  };
  readyEvents.forEach((eventName) => {
    audio.addEventListener(eventName, onReady, { once: true });
  });
  audio.addEventListener("error", onError, { once: true });
  if (!track.loadRequested && typeof audio.load === "function") {
    audio.load();
    track.loadRequested = true;
  }
}

function clearLoopTrackPending(name) {
  const track = loopTracks.get(name);
  if (!track) return;
  track.pendingPlay = false;
}

function setBusVolume(busName, volume) {
  if (!(busName in audioBuses)) return;
  const nextVolume = clamp(volume, 0, 1);
  const busesToUpdate = new Set([busName]);
  if (busName === "sfx") {
    busesToUpdate.add("movement");
  } else if (busName === "movement") {
    busesToUpdate.add("sfx");
  }
  busesToUpdate.forEach((name) => {
    if (name in audioBuses) {
      audioBuses[name] = nextVolume;
    }
  });
  loopTracks.forEach((track) => {
    if (busName !== "master" && !busesToUpdate.has(track.bus)) return;
    if (!track.isPrimed) return;
    applyLoopTrackMix(track, { ensurePlaying: false });
  });
}

function silenceAllSound() {
  audioMutedByUser = true;
  setBusVolume("master", 0);
  setBusVolume("music", 0);
  setBusVolume("ambience", 0);
  setBusVolume("movement", 0);
  setBusVolume("ui", 0);
  setBusVolume("sfx", 0);
  AudioManager.setMasterVolume(0);
  AudioManager.setMusicVolume(0);
  AudioManager.setAmbienceVolume(0);
  AudioManager.setSfxVolume(0);
  AudioManager.setUiVolume(0);
  if (dom.titleAudio) {
    dom.titleAudio.pause();
    dom.titleAudio.currentTime = 0;
  }
  if (dom.typingAudio) {
    dom.typingAudio.pause();
    dom.typingAudio.currentTime = 0;
  }
  loopTracks.forEach((track) => {
    if (!track.element) return;
    track.element.volume = 0;
    track.element.muted = true;
  });
}

function unmuteAllSound() {
  audioMutedByUser = false;
  setBusVolume("master", 1);
  setBusVolume("music", 1);
  setBusVolume("ambience", 1);
  setBusVolume("movement", 1);
  setBusVolume("ui", 1);
  setBusVolume("sfx", 1);
  AudioManager.setMasterVolume(1);
  AudioManager.setMusicVolume(MUSIC_BUS_DEFAULT);
  AudioManager.setAmbienceVolume(1);
  AudioManager.setSfxVolume(1);
  AudioManager.setUiVolume(1);
  loopTracks.forEach((track) => {
    if (!track.element) return;
    track.element.muted = false;
  });
  recoverLoopAudio();
}

function playRunTestSound() {
  setBusVolume("master", 1);
  setBusVolume("music", 0);
  setBusVolume("ambience", 0);
  setBusVolume("movement", 1);
  setBusVolume("ui", 0);
  setBusVolume("sfx", 0);
  AudioManager.setMasterVolume(1);
  AudioManager.setMusicVolume(0);
  AudioManager.setAmbienceVolume(0);
  AudioManager.setSfxVolume(0);
  AudioManager.setUiVolume(0);
  ensureLoopTrackPlaying("run", { restart: true });
  if (dom.runningAudio) {
    dom.runningAudio.currentTime = 0;
    dom.runningAudio.muted = false;
    dom.runningAudio.volume = 1;
    attemptPlayAudio(dom.runningAudio, "run-test");
  }
}

function getEffectiveVolume(track, targetVolume) {
  if (!track) return 0;
  const base = Number.isFinite(targetVolume) ? targetVolume : track.baseVolume;
  const maxVolume = Number.isFinite(track.maxVolume) ? track.maxVolume : 1;
  const busVolume = audioBuses[track.bus] ?? 1;
  const masterVolume = audioBuses.master ?? 1;
  return clamp(base * maxVolume * busVolume * masterVolume, 0, 1);
}

function applyLoopTrackMix(track, { ensurePlaying = false } = {}) {
  if (!track?.element) return;
  if (!track.isPrimed) {
    primeLoopTrack(track);
  }
  const effective = audioMutedByUser ? 0 : getEffectiveVolume(track, track.currentTargetVolume);
  track.element.volume = effective;
  track.element.muted = audioMutedByUser;
  if (
    ensurePlaying &&
    effective > 0.01 &&
    audioUnlockedOnce &&
    hasStartedGame
  ) {
    ensureLoopTrackPlaying(track.name);
    ensureTrackAudible(track.name);
  }
}

function fadeTrackTo(name, targetVolume, durationMs) {
  const track = loopTracks.get(name);
  if (!track?.element) return;
  if (!track.isPrimed) {
    primeLoopTrack(track);
  }
  const audio = track.element;
  const nextTarget = Number.isFinite(targetVolume) ? targetVolume : track.baseVolume;
  track.currentTargetVolume = nextTarget;
  const effectiveTarget = audioMutedByUser ? 0 : getEffectiveVolume(track, nextTarget);
  if (effectiveTarget > 0.01) {
    applyLoopTrackMix(track, { ensurePlaying: true });
  }
  const token = ++track.fadeToken;
  const duration = Math.max(0, durationMs ?? 0);
  const startVolume = Number.isFinite(audio.volume) ? audio.volume : 0;
  if (duration === 0) {
    audio.volume = audioMutedByUser ? 0 : getEffectiveVolume(track, track.currentTargetVolume);
    return;
  }
  const start = performance.now();
  const tick = (now) => {
    if (token !== track.fadeToken) return;
    const progress = Math.min(1, (now - start) / duration);
    const liveTarget = audioMutedByUser ? 0 : getEffectiveVolume(track, track.currentTargetVolume);
    audio.volume = startVolume + (liveTarget - startVolume) * progress;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
    }
  };
  requestAnimationFrame(tick);
}

function recoverLoopAudio() {
  if (!audioUnlockedOnce || audioMutedByUser) return;
  const shouldRun =
    hasStartedGame &&
    isPlayerTraveling() &&
    state.playerTravelMode === "run";
  const shouldSneak =
    hasStartedGame &&
    isPlayerTraveling() &&
    state.playerTravelMode === "sneak";
  if (shouldRun) {
    ensureTrackAudible("run");
  }
  if (shouldSneak) {
    ensureTrackAudible("sneak");
  }
  const shouldPlayAmbience = hasStartedGame && audioUnlockedOnce && canStartAmbience;
  const ambienceTarget = shouldPlayAmbience ? getAmbientTrackForWeather(state.weather?.type) : null;
  if (ambienceTarget?.name) {
    const track = loopTracks.get(ambienceTarget.name);
    const effectiveTarget = getEffectiveVolume(track, track?.currentTargetVolume);
    if (effectiveTarget > 0.01) {
      ensureTrackAudible(ambienceTarget.name);
    }
  }
}

function audioHealthTick() {
  if (!audioUnlockedOnce) return;
  if (audioMutedByUser) return;
  if (isTitleScreenActive()) {
    if (!dom.titleAudio) return;
    const audio = dom.titleAudio;
    if (audio.volume > 0.01 && !audio.muted) {
      if (audio.paused || audio.ended || audio.readyState < 2) {
        audio.currentTime = 0;
        attemptPlayAudio(audio, "title-health");
      }
    }
    return;
  }
  if (hasStartedGame) {
    recoverLoopAudio();
    ensureTypingAudibleIfNeeded();
  }
}

function startAudioHealthTicker() {
  if (audioHealthIntervalId) return;
  audioHealthIntervalId = window.setInterval(audioHealthTick, 750);
}

function attachAudioRecoveryEvents() {
  if (audioRecoveryEventsAttached) return;
  audioRecoveryEventsAttached = true;
  const handler = () => {
    if (!audioUnlockedOnce) return;
    const ctx = AudioManager.ctx;
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    recoverLoopAudio();
  };
  document.addEventListener("visibilitychange", handler);
  window.addEventListener("focus", handler);
  window.addEventListener("pageshow", handler);
}

function primeLoopTracksInGesture() {
  if (audioLoopsPrimed) return;
  audioLoopsPrimed = true;
  loopTracks.forEach((track) => {
    const audio = track.element;
    primeLoopTrack(track);
    if (audio.paused) {
      queueLoopTrackPlay(track);
    }
  });
}

const AudioManager = {
  ctx: null,
  masterBus: null,
  musicBus: null,
  sfxBus: null,
  ambienceBus: null,
  uiBus: null,
  unlocked: false,
  musicSource: null,
  musicElement: null,
  async init() {
    if (this.ctx || typeof window.AudioContext === "undefined") {
      return Boolean(this.ctx);
    }
    const ctx = new window.AudioContext();
    const master = ctx.createGain();
    const music = ctx.createGain();
    const sfx = ctx.createGain();
    const ambience = ctx.createGain();
    const ui = ctx.createGain();
    master.gain.value = 1;
    music.gain.value = MUSIC_BUS_DEFAULT;
    sfx.gain.value = 1.0;
    ambience.gain.value = 0.7;
    ui.gain.value = 0.9;
    music.connect(master);
    sfx.connect(master);
    ambience.connect(master);
    ui.connect(master);
    master.connect(ctx.destination);
    this.ctx = ctx;
    this.masterBus = master;
    this.musicBus = music;
    this.sfxBus = sfx;
    this.ambienceBus = ambience;
    this.uiBus = ui;
    return true;
  },
  async unlock() {
    if (!this.ctx) return false;
    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }
    this.unlocked = true;
    return true;
  },
  async loadMusicFromElement(audioEl) {
    if (!audioEl) return false;
    if (!this.ctx) return false;
    if (this.musicSource) return true;
    this.musicElement = audioEl;
    this.musicSource = this.ctx.createMediaElementSource(audioEl);
    this.musicSource.connect(this.musicBus);
    return true;
  },
  setMasterVolume(value) {
    if (this.masterBus) this.masterBus.gain.value = value;
  },
  setMusicVolume(value) {
    if (this.musicBus) this.musicBus.gain.value = value;
  },
  setSfxVolume(value) {
    if (this.sfxBus) this.sfxBus.gain.value = value;
  },
  setAmbienceVolume(value) {
    if (this.ambienceBus) this.ambienceBus.gain.value = value;
  },
  setUiVolume(value) {
    if (this.uiBus) this.uiBus.gain.value = value;
  },
  getBus(name) {
    switch (name) {
      case "music":
        return this.musicBus;
      case "ambience":
        return this.ambienceBus;
      case "ui":
        return this.uiBus;
      case "sfx":
      default:
        return this.sfxBus;
    }
  },
  playOneShot(bufferOrUrl, { bus = "sfx", volume = 1, rate = 1 } = {}) {
    if (!this.ctx) return null;
    if (bufferOrUrl instanceof AudioBuffer) {
      const source = this.ctx.createBufferSource();
      const gain = this.ctx.createGain();
      gain.gain.value = volume;
      source.buffer = bufferOrUrl;
      source.playbackRate.value = rate;
      source.connect(gain);
      gain.connect(this.getBus(bus));
      source.start();
      return source;
    }
    return null;
  },
};

function getFxAudioContext() {
  if (!audioUnlockedOnce) return null;
  if (!AudioManager.ctx) return null;
  return AudioManager.ctx;
}

function getNoiseBuffer(ctx) {
  if (fxAudioState.noiseBuffer) return fxAudioState.noiseBuffer;
  const length = Math.floor(ctx.sampleRate * 1);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  fxAudioState.noiseBuffer = buffer;
  return buffer;
}

function playTone({
  frequency = 440,
  durationMs = 120,
  volume = 0.5,
  type = "sine",
  bus = "sfx",
} = {}) {
  const ctx = getFxAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + durationMs / 1000);
  osc.connect(gain);
  gain.connect(AudioManager.getBus(bus));
  osc.start(now);
  osc.stop(now + durationMs / 1000 + 0.05);
}

function playNoiseBurst({
  durationMs = 120,
  volume = 0.6,
  filterType = "highpass",
  frequency = 900,
  bus = "sfx",
} = {}) {
  const ctx = getFxAudioContext();
  if (!ctx) return;
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  const now = ctx.currentTime;
  source.buffer = getNoiseBuffer(ctx);
  filter.type = filterType;
  filter.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + durationMs / 1000);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(AudioManager.getBus(bus));
  source.start(now);
  source.stop(now + durationMs / 1000 + 0.05);
}

function startAlarmDrone(volume = 0.16) {
  const ctx = getFxAudioContext();
  if (!ctx || fxAudioState.alarmGain) return;
  const now = ctx.currentTime;
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(180, now);
  osc1.type = "sawtooth";
  osc1.frequency.setValueAtTime(52, now);
  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(67, now);
  lfo.type = "sine";
  lfo.frequency.setValueAtTime(0.5, now);
  lfoGain.gain.setValueAtTime(0.08, now);
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);
  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(AudioManager.getBus("ambience"));
  osc1.start(now);
  osc2.start(now);
  lfo.start(now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.6);
  fxAudioState.alarmGain = gain;
  fxAudioState.alarmFilter = filter;
  fxAudioState.alarmOscillators = [osc1, osc2];
  fxAudioState.alarmLfo = lfo;
  fxAudioState.alarmLfoGain = lfoGain;
}

function stopAlarmDrone() {
  const ctx = getFxAudioContext();
  if (!ctx || !fxAudioState.alarmGain) return;
  const now = ctx.currentTime;
  fxAudioState.alarmGain.gain.cancelScheduledValues(now);
  fxAudioState.alarmGain.gain.setValueAtTime(fxAudioState.alarmGain.gain.value, now);
  fxAudioState.alarmGain.gain.linearRampToValueAtTime(0.001, now + 0.4);
  const stopAt = now + 0.45;
  fxAudioState.alarmOscillators.forEach((osc) => osc.stop(stopAt));
  fxAudioState.alarmLfo?.stop(stopAt);
  fxAudioState.alarmGain = null;
  fxAudioState.alarmFilter = null;
  fxAudioState.alarmOscillators = [];
  fxAudioState.alarmLfo = null;
  fxAudioState.alarmLfoGain = null;
}

function playAlarmChirp(volume = 0.5) {
  const ctx = getFxAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;
  osc.type = "square";
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(760, now + 0.08);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
  osc.connect(gain);
  gain.connect(AudioManager.getBus("sfx"));
  osc.start(now);
  osc.stop(now + 0.18);
}

function playSurgePop(volume = 0.9) {
  playTone({ frequency: 90, durationMs: 120, volume: volume * 0.6, type: "sine" });
  playNoiseBurst({ durationMs: 140, volume: volume * 0.7, frequency: 750 });
}

function playSurgeCrack(volume = 0.8) {
  playNoiseBurst({ durationMs: 160, volume: volume * 0.8, frequency: 1200 });
  playTone({ frequency: 220, durationMs: 90, volume: volume * 0.4, type: "triangle" });
}

function playSurgeBuzz(volume = 0.5) {
  const ctx = getFxAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  const now = ctx.currentTime;
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(140, now);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(600, now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(AudioManager.getBus("sfx"));
  osc.start(now);
  osc.stop(now + 0.5);
}

const fxController = {
  classTimers: new Map(),
  toggleRootClass(className, durationMs) {
    if (!dom.app) return;
    dom.app.classList.add(className);
    if (!durationMs) return;
    const existing = this.classTimers.get(className);
    if (existing) {
      clearTimeout(existing);
    }
    const timer = window.setTimeout(() => {
      dom.app?.classList.remove(className);
      this.classTimers.delete(className);
    }, durationMs);
    this.classTimers.set(className, timer);
  },
  clearRootClass(className) {
    if (!dom.app) return;
    dom.app.classList.remove(className);
    const existing = this.classTimers.get(className);
    if (existing) {
      clearTimeout(existing);
      this.classTimers.delete(className);
    }
  },
  playSfx(name, volume = 1, { inRoom = false } = {}) {
    switch (name) {
      case "alarm-chirp":
        playAlarmChirp(volume);
        break;
      case "surge-pop":
        playSurgePop(volume);
        if (inRoom) {
          playSurgeCrack(volume * 0.9);
        }
        break;
      case "surge-buzz":
        playSurgeBuzz(volume);
        break;
      default:
        break;
    }
  },
  showHudLine(text, durationMs = 2400) {
    if (!text) return;
    const ticks = Math.max(1, Math.round(durationMs / TICK_MS));
    pushBanner(text, ticks);
  },
};

function isTitleScreenActive() {
  return Boolean(dom.titleScreen) &&
    dom.titleScreen.getAttribute("aria-hidden") !== "true" &&
    !hasStartedGame;
}

function initSchematicSprite() {
  if (schematicSpriteReady || schematicSpriteLoading || schematicSpriteFailed) return;
  const host = dom.svgSpriteHost;
  if (!host) {
    schematicSpriteFailed = true;
    console.warn("Schematic sprite host missing; falling back to glyphs.");
    return;
  }
  schematicSpriteLoading = true;
  fetch("assets/schematics/sprite.svg")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Sprite fetch failed: ${response.status}`);
      }
      return response.text();
    })
    .then((markup) => {
      host.innerHTML = markup;
      schematicSpriteReady = true;
      schematicSpriteLoading = false;
    })
    .catch((error) => {
      schematicSpriteFailed = true;
      schematicSpriteLoading = false;
      console.warn("Failed to load schematic sprite.", error);
      if (state.craftMiniGameActive) {
        renderCraftMiniGame();
      }
    });
}

async function init() {
  flushDebugLogBuffer();
  await ensureCaitDialogueLoaded();
  initSchematicSprite();
  state.nightProfile = getNightProfile();
  state.unlocks = getUnlocks();
  applyNightLayout();
  renderMap();
  setupMissionForNight();
  if (!isNight11()) {
    assignRoomFinds();
    announceWeather();
    updateWeatherAmbience({ forceRestart: true });
    configureRobotStart();
  }
  updateSchematicList();
  updatePlayerTrail(state.playerRoom);
  preloadRoomBackgrounds();
  updateUI();
  updateSystemTabs();
  updateSystemMenuDebugVisibility();
  syncSystemMenuFromAudio();
  refreshSaveStatus();
  attachEvents();
  setupDebugPanel();
  startGameLoop();
  applyScreenQuery();
  if (!isNight11()) {
    const introText = getInitialObjectiveModalText();
    if (state.introSequenceActive && state.introStep === "intro-modal") {
      state.pendingIntroModal = introText;
    } else {
      showObjectiveModal(introText);
    }
  }
}

function initHorrorFX() {
  ensureFxOverlay();
  startFxLoop();
  updateHorrorFX();
}

function getScreenQuery() {
  const params = new URLSearchParams(window.location.search);
  const rawScreen = params.get("screen");
  if (!rawScreen) return null;
  const normalized = rawScreen.trim().toLowerCase();
  if (!normalized) return null;
  const [target, subTarget] = normalized.split(/[:/._-]/);
  return { target, subTarget };
}

async function startGameFromQuery() {
  if (hasStartedGame) return;
  hasStartedGame = true;
  canStartAmbience = true;
  state.startRevealPending = false;
  state.introSequenceActive = false;
  state.introStep = null;
  state.introEscapeVisited = false;
  document.body.classList.remove("intro-blackout");
  await ensureCaitDialogueLoaded();
  setCurrentNight(1);
  initHorrorFX();
  await init();
  if (dom.titleAudio) {
    dom.titleAudio.pause();
    dom.titleAudio.currentTime = 0;
  }
  dom.titleVideos.forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });
  if (dom.titleScreen) {
    dom.titleScreen.setAttribute("aria-hidden", "true");
  }
  document.body.classList.remove("title-active");
  if (dom.app) {
    dom.app.classList.remove("is-hidden");
  }
}

async function initTitleScreen() {
  const screenQuery = getScreenQuery();
  state.meta = loadMetaFlags();
  initSchematicSprite();
  mirrorConsole();
  setNormalizedAudioSources();
  loadSoundSettings();
  attachAudioRecoveryEvents();
  if (screenQuery) {
    if (dom.audioGate) {
      dom.audioGate.setAttribute("aria-hidden", "true");
    }
    await startGameFromQuery();
    return;
  }
  if (!dom.titleScreen || !dom.titleStartBtn) {
    canStartAmbience = true;
    initHorrorFX();
    await init();
    return;
  }
  document.body.classList.add("title-active");
  if (dom.app) {
    dom.app.classList.add("is-hidden");
  }
  if (dom.titleScreen) {
    const shouldRevealTitle =
      !dom.audioGate ||
      dom.audioGate.getAttribute("aria-hidden") === "true" ||
      audioUnlockedOnce;
    dom.titleScreen.classList.remove("title-video-visible");
    dom.titleScreen.classList.remove("title-fade-out");
    dom.titleScreen.classList.remove("title-visible");
    if (shouldRevealTitle) {
      requestAnimationFrame(() => {
        dom.titleScreen?.classList.add("title-visible");
      });
    }
  }
  if (dom.audioGate) {
    dom.audioGate.setAttribute("aria-hidden", "false");
    dom.audioGate.addEventListener("click", handleAudioGateGesture, true);
  }
  if (dom.audioGateBtn) {
    dom.audioGateBtn.addEventListener("click", handleAudioGateGesture, true);
    dom.audioGateBtn.focus({ preventScroll: true });
  }
  dom.titleStartBtn.addEventListener("click", startGameFromTitle);
  dom.titleStartBtn.disabled = true;
  dom.titleStartBtn.classList.add("is-locked");
  dom.titleVideos.forEach((video) => {
    if (!video.dataset.loopBound) {
      video.dataset.loopBound = "true";
      video.addEventListener("ended", () => {
        if (!isTitleScreenActive() || prefersReducedMotion) return;
        video.currentTime = 0;
        const playAttempt = video.play();
        if (playAttempt && typeof playAttempt.catch === "function") {
          playAttempt.catch((err) => {
            console.warn("title video replay failed:", err);
          });
        }
      });
    }
    video.muted = true;
    video.loop = true;
    video.autoplay = !prefersReducedMotion;
    if (prefersReducedMotion) {
      video.pause();
    }
  });
  if (dom.titleAudio) {
    dom.titleAudio.loop = true;
    dom.titleAudio.muted = true;
  }
}

async function ensureAudioUnlockedFromGesture(event) {
  if (audioUnlockedOnce) return true;
  if (!event) return false;
  if (event.type === "keydown") {
    const allowedKeys = new Set(["Enter", " ", "Spacebar"]);
    if (!allowedKeys.has(event.key)) return false;
    event.preventDefault();
  }
  try {
    const audioReady = await AudioManager.init();
    if (audioReady) {
      await AudioManager.unlock();
    }
  } catch (err) {
    console.warn("audio: unlock failed, continuing without audio:", err);
  }
  audioUnlockedOnce = true;
  primeLoopTracksInGesture();
  startAudioHealthTicker();
  loopTracks.forEach((track) => {
    const audio = track.element;
    if (!audio) return;
    if (typeof audio.load === "function") {
      audio.load();
    }
    track.loadRequested = true;
  });
  if (dom.titleAudio && typeof dom.titleAudio.load === "function") {
    dom.titleAudio.load();
  }
  return true;
}

async function handleAudioGateGesture(event) {
  let audioUnlocked = false;
  let unlockFailed = false;
  try {
    audioUnlocked = await ensureAudioUnlockedFromGesture(event);
  } catch (err) {
    unlockFailed = true;
    console.warn("audio: unlock gesture failed; continuing to title screen", err);
  }
  if (!audioUnlocked && !unlockFailed) {
    console.warn("audio: unlock gesture rejected; continuing to title screen");
  }
  if (dom.audioGate) {
    dom.audioGate.removeEventListener("click", handleAudioGateGesture, true);
    dom.audioGate.setAttribute("aria-hidden", "true");
  }
  if (dom.audioGateBtn) {
    dom.audioGateBtn.removeEventListener("click", handleAudioGateGesture, true);
  }
  if (dom.titleScreen) {
    dom.titleScreen.setAttribute("aria-hidden", "false");
    document.body.classList.add("title-active");
    if (!dom.titleScreen.classList.contains("title-visible")) {
      requestAnimationFrame(() => {
        dom.titleScreen?.classList.add("title-visible");
      });
    }
  }
  if (dom.titleStartBtn) {
    dom.titleStartBtn.disabled = false;
    dom.titleStartBtn.classList.remove("is-locked");
  }
  const audioEl = dom.titleAudio;
  const videoEl = dom.titleVideo;
  const videoEls = dom.titleVideos;
  if (audioEl) {
    audioEl.loop = true;
    audioEl.muted = false;
    audioEl.volume = 1;
    audioEl.currentTime = 0;
  }
  videoEls.forEach((video) => {
    video.muted = true;
    video.loop = true;
    video.currentTime = 0;
  });
  if (!isTitleScreenActive()) return;
  if (audioEl) {
    attemptPlayAudio(audioEl, "title");
  }
  if (!prefersReducedMotion) {
    videoEls.forEach((video) => {
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch((err) => {
          console.warn("title video play() failed:", err);
        });
      }
    });
  } else {
    videoEls.forEach((video) => {
      video.pause();
    });
  }
  const finishAudioSetup = () => {
    AudioManager.loadMusicFromElement(audioEl);
  };
  finishAudioSetup();
  if (dom.titleScreen) {
    dom.titleScreen.classList.add("title-video-visible");
  }
  startTitleSyncLoop();
}

function startTitleSyncLoop() {
  if (titleSyncAnimationId) {
    cancelAnimationFrame(titleSyncAnimationId);
  }
  const loop = () => {
    if (!isTitleScreenActive() || !audioUnlockedOnce) {
      titleSyncAnimationId = null;
      return;
    }
    syncTitleMediaPlayback();
    titleSyncAnimationId = requestAnimationFrame(loop);
  };
  titleSyncAnimationId = requestAnimationFrame(loop);
}

function isDebugPanelPersistent() {
  return DEBUG_ALWAYS_VISIBLE;
}

function setupDebugPanel() {
  if (!dom.debugPanel) return;
  if (!isDebugPanelPersistent()) return;
  dom.debugPanel.classList.add("debug-docked");
  openPanel(dom.debugPanel);
}

function stopTitleSyncLoop() {
  if (!titleSyncAnimationId) return;
  cancelAnimationFrame(titleSyncAnimationId);
  titleSyncAnimationId = null;
}

function syncTitleMediaPlayback() {
  if (!dom.titleAudio || !dom.titleVideo) return;
  if (dom.titleAudio.paused) return;
  if (prefersReducedMotion) return;
  const videoDuration = Number.isFinite(dom.titleVideo.duration) ? dom.titleVideo.duration : 0;
  const targetTime = videoDuration > 0
    ? dom.titleAudio.currentTime % videoDuration
    : dom.titleAudio.currentTime;
  if (dom.titleVideo.paused || dom.titleVideo.ended) {
    dom.titleVideos.forEach((video) => {
      video.currentTime = targetTime;
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch((err) => {
          console.warn("title video resume failed:", err);
        });
      }
    });
    return;
  }
  const drift = Math.abs(dom.titleVideo.currentTime - targetTime);
  if (drift > 0.1) {
    dom.titleVideos.forEach((video) => {
      video.currentTime = targetTime;
    });
  }
}

function fadeGain(gainNode, fromValue, toValue, durationMs) {
  if (!gainNode) return Promise.resolve();
  const duration = Math.max(0, durationMs);
  const ctx = gainNode.context;
  const startTime = ctx.currentTime;
  gainNode.gain.cancelScheduledValues(startTime);
  gainNode.gain.setValueAtTime(fromValue, startTime);
  gainNode.gain.linearRampToValueAtTime(toValue, startTime + duration / 1000);
  return new Promise((resolve) => {
    if (duration === 0) {
      resolve();
      return;
    }
    setTimeout(resolve, duration);
  });
}

function fadeOutMusicBus(duration = TITLE_FADE_OUT_MS) {
  const musicBus = AudioManager.musicBus;
  if (!musicBus) return Promise.resolve();
  const startValue = Number.isFinite(musicBus.gain.value) ? musicBus.gain.value : MUSIC_BUS_DEFAULT;
  if (startValue <= 0) return Promise.resolve();
  return fadeGain(musicBus, startValue, 0, duration);
}

function ensureFxOverlay() {
  if (!fxState.overlay) {
    const overlay = document.createElement("div");
    overlay.id = "fxOverlay";
    document.body.appendChild(overlay);
    fxState.overlay = overlay;
  }
  if (!fxState.warp) {
    const warp = document.createElement("canvas");
    warp.id = "fxWarp";
    document.body.appendChild(warp);
    fxState.warp = warp;
    fxState.ctx = warp.getContext("2d");
    resizeFxCanvas();
    window.addEventListener("resize", resizeFxCanvas);
  }
}

function resizeFxCanvas() {
  if (!fxState.warp || !fxState.ctx) return;
  const dpr = window.devicePixelRatio || 1;
  fxState.warp.width = Math.floor(window.innerWidth * dpr);
  fxState.warp.height = Math.floor(window.innerHeight * dpr);
  fxState.warp.style.width = `${window.innerWidth}px`;
  fxState.warp.style.height = `${window.innerHeight}px`;
  fxState.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function startFxLoop() {
  if (fxState.animationId) {
    cancelAnimationFrame(fxState.animationId);
  }
  const loop = (now) => {
    renderFxWarp(now);
    fxState.animationId = requestAnimationFrame(loop);
  };
  fxState.animationId = requestAnimationFrame(loop);
}

function renderFxWarp(now) {
  if (!fxState.ctx || !fxState.warp) return;
  const level = fxState.level ?? 0;
  const ctx = fxState.ctx;
  ctx.clearRect(0, 0, fxState.warp.width, fxState.warp.height);
  if (level <= 0.02) {
    updateFxJitter(now);
    return;
  }
  const width = fxState.warp.width;
  const height = fxState.warp.height;
  const lineCount = Math.floor(6 + level * 18);
  ctx.globalAlpha = 0.08 + level * 0.2;
  for (let i = 0; i < lineCount; i += 1) {
    const y = Math.random() * height;
    const lineWidth = 40 + Math.random() * 200;
    const x = Math.random() * (width - lineWidth);
    ctx.fillStyle = `rgba(120, 180, 255, ${0.06 + Math.random() * 0.12})`;
    ctx.fillRect(x, y, lineWidth, 1 + Math.random() * 2);
  }
  updateFxJitter(now);
}

function updateFxJitter(now) {
  if (!fxState.overlay) return;
  if (!fxState.jitterEnabled) {
    fxState.overlay.classList.remove("fx-jitter");
    return;
  }
  if (now < fxState.nextJitterTime) return;
  const intensity = 2 + fxState.level * 6;
  const jitterX = (Math.random() - 0.5) * intensity;
  const jitterY = (Math.random() - 0.5) * intensity;
  fxState.overlay.style.setProperty("--fx-jitter-x", `${jitterX}px`);
  fxState.overlay.style.setProperty("--fx-jitter-y", `${jitterY}px`);
  fxState.overlay.classList.add("fx-jitter");
  if (fxState.jitterTimeoutId) {
    clearTimeout(fxState.jitterTimeoutId);
  }
  fxState.jitterTimeoutId = setTimeout(() => {
    fxState.overlay?.classList.remove("fx-jitter");
  }, 120);
  fxState.nextJitterTime = now + 400 + Math.random() * 700;
}

async function startGameFromTitle() {
  if (hasStartedGame) return;
  hasStartedGame = true;
  canStartAmbience = true;
  clearMetaFlags();
  primeLoopTracksInGesture();
  stopTitleSyncLoop();
  const waitForTitleFadeOut = () =>
    new Promise((resolve) => {
      if (!dom.titleScreen) {
        resolve();
        return;
      }
      let resolved = false;
      const finish = () => {
        if (resolved) return;
        resolved = true;
        dom.titleScreen?.removeEventListener("transitionend", onFadeEnd);
        resolve();
      };
      const onFadeEnd = (event) => {
        if (event.propertyName === "opacity") {
          finish();
        }
      };
      dom.titleScreen.addEventListener("transitionend", onFadeEnd);
      setTimeout(finish, TITLE_FADE_OUT_MS + 200);
    });
  if (dom.titleScreen) {
    dom.titleScreen.classList.add("title-fade-out");
  }
  if (dom.introFade) {
    dom.introFade.classList.add("is-visible");
    dom.introFade.setAttribute("aria-hidden", "false");
  }
  if (dom.titleAudio) {
    dom.titleAudio.pause();
    dom.titleAudio.currentTime = 0;
  }
  state.startRevealPending = true;
  state.introSequenceActive = true;
  state.introStep = "intro-modal";
  state.introEscapeVisited = false;
  document.body.classList.add("intro-blackout");
  await ensureCaitDialogueLoaded();
  setCurrentNight(1);
  initHorrorFX();
  await init();
  const finishStart = () => {
    if (dom.titleAudio) {
      dom.titleAudio.pause();
      dom.titleAudio.currentTime = 0;
    }
    dom.titleVideos.forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
    AudioManager.setMusicVolume(MUSIC_BUS_DEFAULT);
    if (dom.titleScreen) {
      dom.titleScreen.setAttribute("aria-hidden", "true");
      dom.titleScreen.classList.remove("title-fade-out");
    }
    document.body.classList.remove("title-active");
    if (dom.app) {
      dom.app.classList.remove("is-hidden");
    }
    canStartAmbience = true;
    updateWeatherAmbience();
    if (state.introSequenceActive && state.introStep === "intro-modal") {
      const introText = state.pendingIntroModal ?? getInitialObjectiveModalText();
      state.pendingIntroModal = null;
      if (introText) {
        requestAnimationFrame(() => showObjectiveModal(introText));
      }
    }
  };
  Promise.allSettled([fadeOutMusicBus(TITLE_FADE_OUT_MS), waitForTitleFadeOut()]).then(finishStart);
}

function attachEvents() {
  dom.buildBtn.addEventListener("click", craftItem);
  dom.craftMiniGameCancelBtn.addEventListener("click", cancelCraftMiniGame);
  dom.craftMiniGameCommitBtn.addEventListener("click", commitCraftMiniGame);
  dom.miniGameCancelBtn?.addEventListener("click", cancelMiniGame);
  dom.miniGameSubmitBtn?.addEventListener("click", submitMiniGameAnswer);
  dom.retryBtn.addEventListener("click", resetGame);
  dom.nextNightBtn.addEventListener("click", advanceNight);
  dom.randomizeBtn.addEventListener("click", randomizeLayout);
  dom.forceEscapeBtn.addEventListener("click", forceEscape);
  dom.testRunAudioBtn.addEventListener("click", async (event) => {
    const unlocked = await ensureAudioUnlockedFromGesture(event);
    if (!unlocked) return;
    playRunTestSound();
  });
  dom.silenceAudioBtn.addEventListener("click", silenceAllSound);
  dom.unmuteAudioBtn?.addEventListener("click", unmuteAllSound);
  dom.giveAllBtn.addEventListener("click", giveAllDebugItems);
  dom.godModeBtn.addEventListener("click", toggleGodMode);
  dom.eyesBtn.addEventListener("click", toggleDebugEyes);
  dom.debugStoryBtn?.addEventListener("click", startDebugStoryPreview);
  dom.debugMiniGameIntroEscape?.addEventListener("click", () => startDebugMiniGame("INTRO_ESCAPE"));
  dom.debugMiniGameCircuit?.addEventListener("click", () => startDebugMiniGame("CIRCUIT_STABILIZE"));
  dom.debugMiniGameAlarmCalibration?.addEventListener("click", () => startDebugMiniGame("ALARM_CALIBRATION"));
  dom.debugMiniGameScannerDiagnostic?.addEventListener("click", () => startDebugMiniGame("SCANNER_DIAGNOSTIC"));
  dom.debugMiniGameSignalFilter?.addEventListener("click", () => startDebugMiniGame("SIGNAL_FILTER_RC"));
  dom.debugMiniGameChem?.addEventListener("click", () => startDebugMiniGame("CHEM_BALANCE"));
  dom.debugMiniGameMechTolerance?.addEventListener("click", () => startDebugMiniGame("MECH_TOLERANCE"));
  dom.debugMiniGameAsm?.addEventListener("click", () => startDebugMiniGame("ASM_PATCH"));
  dom.debugMiniGameControlLoop?.addEventListener("click", () => startDebugMiniGame("CONTROL_LOOP"));
  dom.debugMiniGameFlameSaw?.addEventListener("click", () => startDebugMiniGame("FLAMESAW_FINISH"));
  if (dom.debugSanityInput) {
    dom.debugSanityInput.addEventListener("input", (event) => {
      const next = clamp(Number(event.target.value) / 100, 0, 1);
      if (Number.isNaN(next)) return;
      state.sanity = next;
      state.minSanity = Math.min(state.minSanity, state.sanity);
      updateHorrorFX();
      updateUI();
    });
  }
  dom.debugWeatherSelect?.addEventListener("change", (event) => {
    const nextWeather = WEATHER_TYPES.find((entry) => entry.type === event.target.value);
    if (!nextWeather) return;
    state.weather = nextWeather;
    state.weatherAnnounced = false;
    state.surgeCharges = state.weather.modifiers.surgeBonus || 0;
    updateWeatherAmbience({ forceRestart: true });
    announceWeather();
    updateUI();
  });
  dom.cancelBtn.addEventListener("click", cancelMovement);
  dom.scannerToggleBtn.addEventListener("click", () => handleAction("scan-toggle"));
  dom.sneakBtn?.addEventListener("click", () => handleMapMove(false));
  dom.runBtn?.addEventListener("click", () => handleMapMove(true));
  if (dom.sneakBtn) {
    dom.sneakBtn.dataset.suppressMenuPress = "true";
  }
  if (dom.runBtn) {
    dom.runBtn.dataset.suppressMenuPress = "true";
  }
  dom.deployBtn?.addEventListener("click", handleDeployAction);
  dom.menuBtn.addEventListener("click", openMenu);
  dom.mapBtn.addEventListener("click", openMap);
  dom.liveBtn.addEventListener("click", returnToRoom);
  dom.tasksBtn.addEventListener("click", openTasks);
  dom.tasksOkBtn?.addEventListener("click", closeTasks);
  dom.componentOkBtn.addEventListener("click", closeComponent);
  dom.useBtn.addEventListener("click", openUse);
  dom.systemMenuBtn.addEventListener("click", openSystemMenu);
  dom.toggleRobotBtn.addEventListener("click", toggleRobot);
  dom.ackObjectiveBtn.addEventListener("click", acknowledgeObjective);
  dom.ackRobotAlertBtn.addEventListener("click", acknowledgeRobotAlert);
  if (dom.ackCaitQuietBtn) {
    dom.ackCaitQuietBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      acknowledgeCaitQuietModal();
    });
  }
  dom.bagTabSchematics?.addEventListener("click", () => setBagTab("schematics"));
  dom.bagTabItems?.addEventListener("click", () => setBagTab("items"));
  dom.bagTabTools?.addEventListener("click", () => setBagTab("tools"));
  dom.itemsPrevBtn?.addEventListener("click", () => cycleInventoryView(-1));
  dom.itemsNextBtn?.addEventListener("click", () => cycleInventoryView(1));
  if (dom.caitQuietModal) {
    dom.caitQuietModal.addEventListener("click", acknowledgeCaitQuietModal);
  }
  dom.nightSelect.addEventListener("change", (event) => {
    const next = Number(event.target.value);
    setCurrentNight(next);
    resetGame();
  });
  dom.menuPanel.addEventListener("click", (event) => {
    if (event.target === dom.menuPanel) {
      closeMenu();
    }
  });
  dom.systemMenuPanel.addEventListener("click", (event) => {
    if (event.target === dom.systemMenuPanel) {
      closeSystemMenu();
    }
  });
  dom.mapPanel.addEventListener("click", (event) => {
    if (event.target === dom.mapPanel) {
      closeMap();
    }
  });
  dom.usePanel.addEventListener("click", (event) => {
    if (event.target === dom.usePanel) {
      closeUse();
    }
  });
  dom.debugPanel.addEventListener("click", (event) => {
    if (event.target === dom.debugPanel) {
      if (isDebugPanelPersistent()) return;
      closeDebug();
    }
  });
  dom.componentPanel.addEventListener("click", (event) => {
    if (event.target === dom.componentPanel) {
      closeComponent();
    }
  });
  dom.tasksPanel.addEventListener("click", (event) => {
    if (event.target === dom.tasksPanel) {
      closeTasks();
    }
  });
  dom.systemTabSave?.addEventListener("click", () => setSystemTab("save"));
  dom.systemTabLoad?.addEventListener("click", () => setSystemTab("load"));
  dom.systemTabHelp?.addEventListener("click", () => setSystemTab("help"));
  dom.systemTabSettings?.addEventListener("click", () => setSystemTab("settings"));
  dom.systemTabDebug?.addEventListener("click", () => {
    if (!DEBUG_UI) return;
    openDebug();
    closeSystemMenu();
  });
  dom.saveGameBtn?.addEventListener("click", saveGame);
  dom.loadRecentBtn?.addEventListener("click", loadMostRecentSave);
  dom.saveList?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-save-id]");
    if (!button) return;
    loadGameById(button.dataset.saveId);
  });
  dom.openDebugPanelBtn?.addEventListener("click", () => {
    if (!DEBUG_UI) return;
    openDebug();
    closeSystemMenu();
  });
  dom.audioGateDebugBtn?.addEventListener("click", () => {
    if (!DEBUG_UI) return;
    openDebug();
    closeSystemMenu();
  });
  dom.titleDebugBtn?.addEventListener("click", () => {
    if (!DEBUG_UI) return;
    openDebug();
    closeSystemMenu();
  });
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("button");
    if (!button || button.disabled) return;
    if (!audioUnlockedOnce) {
      const unlocked = await ensureAudioUnlockedFromGesture(event);
      if (!unlocked) return;
    }
    if (shouldSuppressMenuPress(button)) return;
    playUiSfx(dom.menuPressAudio, "menu-press", { volume: 0.6, allowBeforeStart: true });
  });
  const setHotkeyVisibility = (visible) => {
    document.body.classList.toggle("hotkeys-visible", visible);
  };
  document.addEventListener("keydown", (event) => {
    if (event.key === "Alt") {
      setHotkeyVisibility(true);
    }
  });
  document.addEventListener("keyup", (event) => {
    if (event.key === "Alt") {
      setHotkeyVisibility(false);
    }
  });
  window.addEventListener("blur", () => {
    setHotkeyVisibility(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey) return;
    const key = event.key;
    const isSpace = key === " " || key === "Spacebar";
    if (key === "Enter" || isSpace) {
      const active = document.activeElement;
      const tag = active?.tagName?.toLowerCase();
      if (
        tag !== "input" &&
        tag !== "textarea" &&
        tag !== "select" &&
        tag !== "button" &&
        !active?.isContentEditable
      ) {
        const modalOkButton = getActiveModalOkButton();
        if (modalOkButton && clickButton(modalOkButton)) {
          event.preventDefault();
          return;
        }
      }
    }
    if (handleDirectionalNavigation(event)) {
      return;
    }
    if (isHotkeyBlocked()) return;
    if (event.altKey) return;
    const lower = key.toLowerCase();
    const mapActive = dom.mapPanel?.classList.contains("active");
    let handled = false;
    if (mapActive) {
      const direction = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      }[key];
      if (direction) {
        handled = navigateMapSelection(direction);
      }
      if (!handled) {
        if (key === "Enter" || isSpace) {
          handled = true;
          handleMapMove(key === "Enter");
        }
      }
    }
    if (!handled && key === "Escape") {
      handled = true;
      openSystemMenu();
    }
    if (!handled) {
      switch (lower) {
        case "1":
        case "b":
          handled = clickButton(dom.menuBtn);
          break;
        case "2":
        case "m":
          handled = clickButton(dom.mapBtn);
          break;
        case "3":
        case "l":
          handled = clickButton(dom.liveBtn);
          break;
        case "4":
        case "t":
          handled = clickButton(dom.tasksBtn);
          break;
        case "5":
        case "u":
          handled = clickButton(dom.useBtn);
          break;
        case "s":
          handled = mapActive && clickButton(dom.sneakBtn);
          break;
        case "r":
          handled = mapActive && clickButton(dom.runBtn);
          break;
        case "p":
          handled = mapActive && clickButton(dom.deployBtn);
          break;
        case "c":
          handled = clickButton(dom.cancelBtn);
          break;
        case "e":
          handled = triggerRoomAction("escape");
          break;
        case "i":
          handled = triggerRoomAction("inspect-console");
          break;
        case "a":
          handled = triggerRoomAction("align-override");
          break;
        case "d":
          handled = triggerRoomAction("disable-alarm");
          break;
        case "k":
          handled = triggerRoomAction("talk-cait");
          break;
        default:
          handled = false;
          break;
      }
    }
    if (handled) {
      event.preventDefault();
    }
  });
  const handleVolumeInput = async (event, busName) => {
    if (!event) return;
    if (!audioUnlockedOnce) {
      const unlocked = await ensureAudioUnlockedFromGesture(event);
      if (!unlocked) return;
    }
    const rawValue = Number(event.target.value);
    if (Number.isNaN(rawValue)) return;
    const volume = clamp(rawValue / 100, 0, 1);
    setBusVolume(busName, volume);
    switch (busName) {
      case "master":
        AudioManager.setMasterVolume(volume);
        break;
      case "music":
        AudioManager.setMusicVolume(volume);
        break;
      case "ambience":
        AudioManager.setAmbienceVolume(volume);
        break;
      case "ui":
        AudioManager.setUiVolume(volume);
        break;
      case "sfx":
        AudioManager.setSfxVolume(volume);
        break;
      default:
        break;
    }
    if (busName === "sfx" || busName === "movement") {
      if (dom.sfxVolumeSlider) {
        dom.sfxVolumeSlider.value = String(Math.round((audioBuses.sfx ?? 1) * 100));
      }
      if (dom.movementVolumeSlider) {
        dom.movementVolumeSlider.value = String(Math.round((audioBuses.movement ?? 1) * 100));
      }
    }
  };
  dom.masterVolumeSlider?.addEventListener("input", (event) => handleVolumeInput(event, "master"));
  dom.musicVolumeSlider?.addEventListener("input", (event) => handleVolumeInput(event, "music"));
  dom.ambienceVolumeSlider?.addEventListener("input", (event) => handleVolumeInput(event, "ambience"));
  dom.movementVolumeSlider?.addEventListener("input", (event) => handleVolumeInput(event, "movement"));
  dom.uiVolumeSlider?.addEventListener("input", (event) => handleVolumeInput(event, "ui"));
  dom.sfxVolumeSlider?.addEventListener("input", (event) => handleVolumeInput(event, "sfx"));
}

function updateAlarmFx(isActive) {
  if (isActive) {
    fxController.toggleRootClass("alarm-active");
    startAlarmDrone();
    fadeTrackTo("alarm", 1, 150);
  } else {
    fxController.clearRootClass("alarm-active");
    if (alarmFxActive) {
      stopAlarmDrone();
    }
    fadeTrackTo("alarm", 0, 200);
  }
  alarmFxActive = isActive;
}

function updateUI() {
  document.body.classList.toggle("night-11", isNight11());
  const weatherType = state.weather?.type ?? "Clear";
  const weatherKey = weatherType === "Rain" || weatherType === "Storm" ? "rain" : "clear";
  document.body.dataset.weather = weatherKey;
  if (isPlayerTraveling()) {
    document.body.dataset.move = state.playerTravelMode === "run" ? "run" : "sneak";
  } else {
    delete document.body.dataset.move;
  }
  const threatValue = state.threat ?? 1;
  const threatKey = threatValue >= 4 ? "high" : threatValue >= 2.75 ? "med" : "low";
  document.body.dataset.threat = threatKey;
  const room = rooms[state.playerRoom];
  const alarmActive = isAlarmTriggered(room.id);
  const sunlitRoom = state.sunlitRooms.has(room.id);
  room.alarmActive = alarmActive;
  updateAlarmFx(alarmActive);
  dom.roomMedia.classList.toggle("sunlit", sunlitRoom);
  if (state.surgeWarningActive) {
    const remaining = state.surgeWarningEndsAt - performance.now();
    if (state.playerRoom === state.surgeWarningRoom && remaining > 0) {
      if (dom.app && !dom.app.classList.contains("surge-warning")) {
        dom.app.style.setProperty("--surge-warning-duration", `${remaining}ms`);
        fxController.toggleRootClass("surge-warning", remaining);
      }
      if (!state.surgeWarningLineShown) {
        fxController.showHudLine("The lights tighten. Something is about to snap.", 1800);
        state.surgeWarningLineShown = true;
      }
    } else {
      fxController.clearRootClass("surge-warning");
    }
  } else {
    fxController.clearRootClass("surge-warning");
  }
  const playerAdjacents = new Set(roomConnections[state.playerRoom] || []);
  const dangerRoom = !state.robotDisabled &&
    (state.robotRoom === state.playerRoom || playerAdjacents.has(state.robotRoom));
  dom.currentRooms.forEach((node) => {
    node.textContent = room.name;
  });
  dom.roomMedia.classList.toggle("threat-nearby", dangerRoom);
  dom.roomMedia.classList.toggle("glitch", false);
  dom.roomMedia.style.background = "transparent";
  const roomBackground = getRoomBackgroundImage(room);
  if (roomBackground) {
    dom.roomMedia.style.backgroundImage = `url("${roomBackground}")`;
    dom.roomMedia.style.backgroundSize = "112% 112%";
    dom.roomMedia.style.backgroundPosition = "45% center";
    dom.roomMedia.style.backgroundRepeat = "no-repeat";
  } else {
    dom.roomMedia.style.backgroundImage = "";
  }
  document.body.style.setProperty("--room-theme", room.theme);
  const robotLabel = robotStatusLabel();
  dom.robotStatuses.forEach((node) => {
    const label = node.querySelector("span");
    const bannerLabel = state.bannerTicks > 0 ? state.bannerMessage : robotLabel;
    if (label) {
      label.textContent = bannerLabel;
    } else {
      node.textContent = bannerLabel;
    }
    const labelNode = label || node;
    const overflow = labelNode.scrollWidth - node.clientWidth;
    const shouldMarquee = overflow > 6;
    node.classList.toggle("marquee", shouldMarquee);
    node.style.setProperty("--marquee-shift", `${Math.max(0, overflow)}px`);
  });
  const thoughtBlocked = state.objectiveBlocked ||
    dom.objectiveModal.classList.contains("active") ||
    dom.robotAlertModal.classList.contains("active");
  const showThought = state.thoughtTicks > 0 && !thoughtBlocked;
  dom.actionStatus.textContent = showThought ? state.thoughtMessage : "";
  dom.actionStatus.classList.toggle("hidden", !showThought);
  dom.actionStatus.classList.toggle("thought", showThought);
  updateActionLockUI();
  updateTravelStatus();
  updateMapWeatherLabel();
  if (dom.dateLabel) {
    dom.dateLabel.textContent = formatDate(state.baseDate, state.currentNight + 1);
  }
  if (dom.nightSelect) {
    dom.nightSelect.value = String(state.currentNight);
  }
  let selectedMapRoomId = null;
  if (state.mapTargetMode) {
    if (state.mapTargetSelection !== null) {
      selectedMapRoomId = state.mapTargetSelection;
      const targetName = rooms[state.mapTargetSelection].name;
      const sourceId = state.mapTargetSourceRoom ?? state.playerRoom;
      const sourceName = rooms[sourceId].name;
      if (state.mapTargetMode === "noise") {
        dom.selectedRoom.textContent = `Noise Lure: ${targetName}`;
      } else if (state.mapTargetMode === "jam") {
        dom.selectedRoom.textContent = `Door Jam: ${sourceName} ↔ ${targetName}`;
      } else {
        dom.selectedRoom.textContent = `Clear Jam: ${sourceName} ↔ ${targetName}`;
      }
    } else {
      dom.selectedRoom.textContent = state.mapTargetMode === "noise"
        ? "Select noise target"
        : state.mapTargetMode === "jam"
          ? "Select door to jam"
          : "Select door to unjam";
    }
  } else {
    selectedMapRoomId = state.selectedRoom;
    dom.selectedRoom.textContent = state.selectedRoom === null
      ? "None"
      : rooms[state.selectedRoom].name;
  }
  if (dom.selectedRoomNote) {
    const showCaitNote = isNight11() &&
      selectedMapRoomId !== null &&
      selectedMapRoomId === state.caitQuietRoomId;
    dom.selectedRoomNote.textContent = showCaitNote ? "Cait is waiting for you." : "";
    dom.selectedRoomNote.classList.toggle("hidden", !showCaitNote);
  }
  updateItemList();
  updateSchematicsInventory();
  updateToolsList();
  updateRequiredComponents();
  updateUseList();
  updateScannerToggleButton();
  updateRoomActions();
  updatePanels();
  updateBagTabs();
  updateMap();
  ensureTravelAnimation();
  updateBuildButton();
  updateMoveButtons();
  updateDeployButton();
  if (dom.mapPanel) {
    dom.mapPanel.classList.toggle("deploy-mode", state.mapTargetMode !== null);
    dom.mapPanel.classList.toggle("is-traveling", isPlayerTraveling());
  }
  if (dom.toggleRobotBtn) {
    dom.toggleRobotBtn.textContent = state.robotDisabled ? "Enable Robot" : "Disable Robot";
  }
  renderTasksText();
  const controlBlocked = state.objectiveBlocked || state.actionLock;
  if (dom.useBtn) {
    const allowUse = true;
    dom.useBtn.classList.toggle("hidden", !allowUse);
    dom.useBtn.disabled = !allowUse || controlBlocked;
  }
  if (dom.mapBtn) {
    dom.mapBtn.classList.toggle("hidden", !state.unlocks.showMap);
    dom.mapBtn.disabled = !state.unlocks.showMap || controlBlocked;
  }
  if (dom.menuBtn) {
    dom.menuBtn.disabled = controlBlocked;
  }
  if (dom.tasksBtn) {
    dom.tasksBtn.disabled = controlBlocked;
    dom.tasksBtn.classList.toggle(
      "objective-highlight",
      state.currentNight === 1 &&
        state.escapeConsoleInspected &&
        !state.tasksAcknowledgedNightOne
    );
  }
  if (state.currentNight === 1 &&
    rooms[state.playerRoom]?.isExit &&
    !state.liveAcknowledgedNightOne) {
    state.liveEscapePrompted = true;
  }
  if (dom.liveBtn) {
    dom.liveBtn.disabled = controlBlocked;
    dom.liveBtn.classList.toggle(
      "objective-highlight",
      state.introStep === "highlight-live" ||
        state.escapeArrivalPrompted ||
        (state.currentNight === 1 && state.liveEscapePrompted && !state.liveAcknowledgedNightOne)
    );
  }
  if (dom.systemMenuBtn) {
    dom.systemMenuBtn.disabled = controlBlocked;
  }
  updateDebugUI();
}

function getFxLevel() {
  if (state.currentNight < 4 || isNight11()) {
    return 0;
  }
  return clamp(1 - state.sanity, 0, 1);
}

function updateHorrorFX() {
  if (!fxState.overlay) {
    ensureFxOverlay();
  }
  const fx = getFxLevel();
  const earlyNight = state.currentNight < 4;
  fxState.level = fx;
  const root = document.documentElement;
  const grain = earlyNight ? 0.08 : 0.08 + fx * 0.18;
  const lines = earlyNight ? 0 : fx * 0.22;
  const vignette = earlyNight ? 0 : 0.1 + fx * 0.35;
  root.style.setProperty("--fx", fx.toFixed(3));
  root.style.setProperty("--fx-grain", grain.toFixed(3));
  root.style.setProperty("--fx-lines", lines.toFixed(3));
  root.style.setProperty("--fx-vignette", vignette.toFixed(3));
  const frayed = !isNight11() && state.currentNight >= 4 && state.sanity < 0.4;
  const critical = !isNight11() && state.currentNight >= 4 && state.sanity < 0.2;
  document.body.classList.toggle("fx-frayed", frayed);
  document.body.classList.toggle("fx-critical", critical);
  fxState.jitterEnabled = frayed;
  if (fxState.warp) {
    fxState.warp.style.opacity = earlyNight ? "0" : String(0.04 + fx * 0.2);
  }
}

function ensureTravelAnimation() {
  if (travelAnimationId !== null) return;
  if (isPlayerTraveling() || isRobotTraveling()) {
    travelAnimationId = requestAnimationFrame(animateTravel);
  }
}

function animateTravel() {
  if (!isPlayerTraveling() && !isRobotTraveling()) {
    travelAnimationId = null;
    return;
  }
  updateMap();
  travelAnimationId = requestAnimationFrame(animateTravel);
}

function createInspectButton(item) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Inspect";
  button.classList.add("inspect-button");
  button.addEventListener("click", () => openComponent(item, { keepMenuOpen: true }));
  return button;
}

function appendListHeader(list, label) {
  const header = document.createElement("li");
  header.classList.add("list-header");
  header.textContent = label;
  list.appendChild(header);
}

function appendItemRow(list, item) {
  let count = null;
  let labelText = item;
  if (typeof item === "object" && item !== null) {
    count = item.count ?? null;
    labelText = item.name ?? "";
  }
  const li = document.createElement("li");
  li.classList.add("list-row");
  const label = document.createElement("span");
  label.classList.add("item-label");
  label.textContent = count && count > 1 ? `${labelText} x${count}` : labelText;
  const actions = document.createElement("div");
  actions.classList.add("item-actions");
  actions.appendChild(createInspectButton(labelText));
  li.appendChild(label);
  li.appendChild(actions);
  list.appendChild(li);
}

function getInventoryViewIndex() {
  const index = INVENTORY_VIEWS.findIndex((view) => view.key === state.inventoryView);
  return index === -1 ? 0 : index;
}

function setInventoryView(viewKey) {
  const view = INVENTORY_VIEWS.find((entry) => entry.key === viewKey);
  if (!view) return;
  state.inventoryView = view.key;
  updateInventorySelector();
  updateItemList();
}

function cycleInventoryView(direction) {
  const count = INVENTORY_VIEWS.length;
  if (count === 0) return;
  const currentIndex = getInventoryViewIndex();
  const nextIndex = (currentIndex + direction + count) % count;
  setInventoryView(INVENTORY_VIEWS[nextIndex].key);
}

function updateInventorySelector() {
  if (!dom.itemsCategoryLabel) return;
  const view = INVENTORY_VIEWS[getInventoryViewIndex()];
  dom.itemsCategoryLabel.textContent = view.label;
}

function updateItemList() {
  dom.inventoryList.innerHTML = "";
  if (state.inventory.size === 0) {
    const empty = document.createElement("li");
    empty.textContent = "Empty - you feel exposed.";
    dom.inventoryList.appendChild(empty);
    return;
  }
  const items = [];
  const powerAccess = [];
  state.inventory.forEach((count, item) => {
    if (TOOL_ITEMS.has(item)) {
      return;
    }
    if (isPowerAccess(item)) {
      powerAccess.push({ name: item, count });
    } else {
      items.push({ name: item, count });
    }
  });
  const viewKey = state.inventoryView;
  updateInventorySelector();
  const visibleItems = viewKey === "power" ? powerAccess : items;
  if (visibleItems.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = viewKey === "power"
      ? "No power & access items collected yet."
      : "No items collected yet.";
    dom.inventoryList.appendChild(empty);
    return;
  }
  visibleItems.forEach((item) => appendItemRow(dom.inventoryList, item));
}

function updateToolsList() {
  if (!dom.toolsList) return;
  dom.toolsList.innerHTML = "";
  const collectedTools = [...state.toolCollected].sort();
  const deployables = [];
  if (isDeployableUnlocked("noiseLure")) {
    deployables.push({ name: "Noise Lure", count: state.noiseLureCharges });
  }
  if (isDeployableUnlocked("doorJam")) {
    deployables.push({ name: "Door Jam", count: state.doorJamCharges });
  }
  if (collectedTools.length === 0 && deployables.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "None";
    dom.toolsList.appendChild(empty);
    return;
  }
  if (collectedTools.length > 0) {
    appendListHeader(dom.toolsList, "Collected Tools");
    collectedTools.forEach((item) => appendItemRow(dom.toolsList, item));
  }
  if (deployables.length > 0) {
    appendListHeader(dom.toolsList, "Deployables");
    deployables.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("list-row");
      const label = document.createElement("span");
      label.classList.add("item-label");
      label.textContent = `${item.name}: ${item.count}`;
      const actions = document.createElement("div");
      actions.classList.add("item-actions");
      actions.appendChild(createInspectButton(item.name));
      li.appendChild(label);
      li.appendChild(actions);
      dom.toolsList.appendChild(li);
    });
  }
}

function updateSchematicsInventory() {
  dom.schematicInventory.innerHTML = "";
  if (!state.unlocks.allowCrafting && state.foundSchematics.size === 0) {
    const locked = document.createElement("li");
    const unlockNight = getNextUnlockNightFromNow("allowCrafting");
    locked.textContent = unlockNight
      ? `Crafting locked (Night ${unlockNight}).`
      : "Crafting locked.";
    dom.schematicInventory.appendChild(locked);
    return;
  }
  const schematics = [...state.foundSchematics];
  if (schematics.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No schematics found.";
    dom.schematicInventory.appendChild(empty);
    return;
  }
  schematics.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("list-row");
    const button = document.createElement("button");
    button.textContent = item;
    button.classList.add("item-select");
    button.addEventListener("click", () => selectSchematic(item));
    if (state.selectedSchematic === item) {
      button.classList.add("primary");
    }
    if (state.requiredEscapeSchematic === item) {
      button.classList.add("objective-highlight");
    }
    const actions = document.createElement("div");
    actions.classList.add("item-actions");
    actions.appendChild(createInspectButton(item));
    li.appendChild(button);
    li.appendChild(actions);
    dom.schematicInventory.appendChild(li);
  });
}

function updateSchematicList(schematicName = null) {
  dom.schematicList.innerHTML = "";
  const selected = schematicName
    ? getObjectiveRecipeBySchematic(schematicName)
    : getSelectedSchematic();
  const hasSelectedSchematic = selected && state.foundSchematics.has(selected.schematic);
  if (!state.unlocks.allowCrafting && !hasSelectedSchematic && state.foundSchematics.size === 0) {
    const locked = document.createElement("li");
    const unlockNight = getNextUnlockNightFromNow("allowCrafting");
    locked.textContent = unlockNight
      ? `Crafting locked (Night ${unlockNight}).`
      : "Crafting locked.";
    dom.schematicList.appendChild(locked);
    return;
  }
  if (!selected) {
    const empty = document.createElement("li");
    empty.textContent = "Select a schematic to view required components.";
    dom.schematicList.appendChild(empty);
    return;
  }
  const requiredCounts = getRequiredPartCounts(selected.parts);
  requiredCounts.forEach((requiredCount, part) => {
    const count = countInventory(part);
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = requiredCount > 1 ? `${part} x${requiredCount}` : part;
    li.appendChild(label);
    const info = document.createElement("button");
    info.type = "button";
    info.textContent = "Inspect";
    info.addEventListener("click", () => openComponent(part, { keepMenuOpen: true }));
    li.appendChild(info);
    const tally = document.createElement("span");
    tally.textContent = `${count}/${requiredCount}`;
    li.appendChild(tally);
    li.dataset.part = part;
    dom.schematicList.appendChild(li);
  });
}

function updateBuildButton() {
  const selected = getSelectedSchematic();
  const hasSelectedSchematic = selected && state.foundSchematics.has(selected.schematic);
  const isObjective = Boolean(state.requiredEscapeSchematic) &&
    selected?.schematic === state.requiredEscapeSchematic;
  const isReusable = Boolean(selected?.schematic) &&
    REUSABLE_SCHEMATICS.has(selected.schematic);
  if (!state.unlocks.allowCrafting && !hasSelectedSchematic) {
    const unlockNight = getNextUnlockNightFromNow("allowCrafting");
    dom.buildBtn.disabled = true;
    dom.buildBtn.textContent = unlockNight
      ? `Build locked (Night ${unlockNight})`
      : "Build locked";
    return;
  }
  if (!selected) {
    dom.buildBtn.disabled = true;
    dom.buildBtn.textContent = "Select a Schematic";
    return;
  }
  if (state.craftMiniGameActive) {
    dom.buildBtn.disabled = true;
    dom.buildBtn.textContent = "Assembly board active";
    return;
  }
  if (isObjective && state.objectiveItemInstalled) {
    dom.buildBtn.disabled = true;
    dom.buildBtn.textContent = "Objective already installed";
    return;
  }
  if (isObjective && state.objectiveItemCrafted) {
    dom.buildBtn.disabled = true;
    dom.buildBtn.textContent = "Objective item crafted";
    return;
  }
  if (!isObjective && !isReusable && state.completedObjectiveItems.has(selected.name)) {
    dom.buildBtn.disabled = true;
    dom.buildBtn.textContent = "Schematic already built";
    return;
  }
  const requiredCounts = getRequiredPartCounts(selected.parts);
  const hasAllParts = [...requiredCounts.entries()]
    .every(([part, count]) => hasInventoryItem(part, count));
  dom.buildBtn.disabled = !(hasAllParts && state.isAlive && !state.hasEscaped);
  dom.buildBtn.textContent = hasAllParts
    ? `Build ${selected.name}`
    : "Need More Components";
  dom.buildBtn.classList.toggle("objective-highlight", isObjective);
}

function updateMoveButtons() {
  const hasSelection = state.selectedRoom !== null;
  const canMove = hasSelection &&
    getShortestPath(state.playerRoom, state.selectedRoom).length > 1;
  const isMoving = isPlayerTraveling();
  const controlBlocked = state.objectiveBlocked || state.actionLock;
  const isDeployMode = Boolean(state.mapTargetMode);
  const blockMove = controlBlocked || isDeployMode || !canMove;
  const canCancel = isMoving || state.mapTargetMode || hasSelection;
  dom.cancelBtn.disabled = !canCancel || controlBlocked;
  const highlightRunBase = state.currentNight === 1 && state.escapeRunPrompted && !isDeployMode;
  if (state.runHighlightActive && !highlightRunBase) {
    state.runHighlightActive = false;
  }
  const highlightRun = state.runHighlightActive && highlightRunBase;
  if (dom.sneakBtn && dom.runBtn) {
    const sneakLabel = dom.sneakBtn.querySelector(".quick-label");
    const sneakSub = dom.sneakBtn.querySelector(".quick-sub");
    const runLabel = dom.runBtn.querySelector(".quick-label");
    const runSub = dom.runBtn.querySelector(".quick-sub");
    if (isDeployMode) {
      if (sneakLabel) sneakLabel.textContent = "Deploy";
      if (sneakSub) sneakSub.textContent = "Confirm";
      if (runLabel) runLabel.textContent = "Cancel";
      if (runSub) runSub.textContent = "Back";
      dom.sneakBtn.disabled = controlBlocked || state.mapTargetSelection === null;
      dom.runBtn.disabled = controlBlocked;
    } else {
      if (sneakLabel) sneakLabel.textContent = "Sneak";
      if (sneakSub) sneakSub.textContent = "Quiet";
      if (runLabel) runLabel.textContent = "Run";
      if (runSub) runSub.textContent = "Motion";
      dom.sneakBtn.disabled = blockMove;
      dom.runBtn.disabled = blockMove;
    }
    dom.runBtn.classList.toggle("objective-highlight", highlightRun);
  }
}

function getDeployableAvailability() {
  const canNoise = state.unlocks.allowNoiseLure &&
    isDeployableUnlocked("noiseLure") &&
    state.noiseLureCharges > 0;
  if (!state.unlocks.allowDoorJams || !isDeployableUnlocked("doorJam")) {
    return { canNoise, canJam: false };
  }
  if (state.doorJamCharges <= 0) {
    return { canNoise, canJam: false };
  }
  const adjacent = roomConnections[state.playerRoom] || [];
  const validTargets = adjacent.filter((roomId) => {
    const disallowed = rooms[roomId].isExit || rooms[state.playerRoom].isExit;
    if (disallowed) return false;
    return !isEdgeJammed(state.playerRoom, roomId);
  });
  return { canNoise, canJam: validTargets.length > 0 };
}

function updateDeployButton() {
  if (!dom.deployBtn) return;
  const controlBlocked = state.objectiveBlocked || isActionLocked();
  const isBusy = isPlayerTraveling() || state.mapTargetMode;
  const { canNoise, canJam } = getDeployableAvailability();
  dom.deployBtn.disabled = controlBlocked || isBusy || (!canNoise && !canJam);
  if (dom.deployStatus) {
    dom.deployStatus.textContent = canNoise && canJam
      ? "Jam / Lure"
      : canJam
        ? "Jam"
        : canNoise
          ? "Lure"
          : "Jam / Lure";
  }
}

function handleDeployAction() {
  if (state.objectiveBlocked || isActionLocked()) return;
  const { canNoise, canJam } = getDeployableAvailability();
  if (canNoise && canJam) {
    openUse();
    return;
  }
  if (canNoise) {
    beginMapTarget("noise");
    return;
  }
  if (canJam) {
    beginMapTarget("jam");
  }
}

function setButtonLabel(button, text, risk) {
  button.innerHTML = "";
  const label = document.createElement("span");
  label.textContent = text;
  button.appendChild(label);
  if (risk) {
    const hint = document.createElement("span");
    hint.textContent = risk;
    hint.classList.add("risk-hint");
    button.appendChild(hint);
  }
}

function updatePanels() {
  return;
}

function stripCaitPrefix(message) {
  if (typeof message !== "string") return message;
  return message.replace(/^Cait:\s*/i, "");
}

function isCaitMessage(message) {
  return typeof message === "string" && /^Cait:\s*/i.test(message);
}

function getCaitSanityTag() {
  if (state.currentNight < 4) return "";
  const band = sanityBand();
  if (band === "strained") {
    return "Slow down. I’m here.";
  }
  if (band === "frayed") {
    return "Stay with me. Name the sounds.";
  }
  if (band === "critical") {
    return "You’re still here. Don’t disappear.";
  }
  return "";
}

function formatCaitModalText(text) {
  const isCait = /^Cait:\s*/i.test(text);
  const base = stripCaitPrefix(text);
  if (!isCait) return base;
  const tag = getCaitSanityTag();
  if (!tag) return base;
  return `${base}\n${tag}`;
}

function pushStatus(message, ticks = 3) {
  pushBanner(message, ticks);
  state.statusMessage = "";
  state.statusTicks = 0;
}

function pushBanner(message, ticks = 3) {
  state.bannerMessage = stripCaitPrefix(message);
  state.bannerTicks = ticks;
}

function showThought(message, ticks = 3) {
  state.thoughtMessage = message;
  state.thoughtTicks = ticks;
}

function clearThought() {
  state.thoughtMessage = "";
  state.thoughtTicks = 0;
}

function canShowThought() {
  if (state.objectiveBlocked) return false;
  if (dom.objectiveModal.classList.contains("active")) return false;
  if (dom.robotAlertModal.classList.contains("active")) return false;
  if (state.pendingObjectiveModal) return false;
  if (isActionLocked()) return false;
  return true;
}

function setRobotMode(mode) {
  if (state.robotMode === mode) return;
  state.robotMode = mode;
  logDebug("robot-mode", { mode, confidence: state.robotTargetConfidence });
  if (mode === "investigate" || mode === "search" || mode === "sweep") {
    playSfx(dom.robotInspectAudio, "robot-inspect", {
      volume: ROBOT_SFX_VOLUMES.inspectClicks,
      cooldownTicks: 4,
    });
  }
  if (mode === "search") {
    pushStatus("Servos whirr as the robot sweeps the area.", 3);
  } else if (mode === "investigate") {
    pushStatus("Footsteps slow. The robot investigates.", 3);
  } else if (mode === "sweep") {
    pushStatus("The robot fans out to nearby halls.", 3);
  }
}

function recordMeaningfulAction() {
  state.lastMeaningfulActionTurn = state.turn;
}

function resetGoofingState() {
  state.recentMoves = [];
  state.lastMeaningfulActionTurn = -999;
  state.goofWarningsThisNight = 0;
  state.lastGoofTriggerTurn = -999;
}

function detectGoofing() {
  const windowSize = 8;
  const moves = state.recentMoves.slice(-windowSize);
  if (moves.length < 4) return null;
  const runCount = moves.filter((move) => move.mode === "run").length;
  const runRatio = runCount / moves.length;
  const runThreshold = state.currentNight >= 4 ? 0.65 : 0.75;
  if (runRatio < runThreshold) return null;
  const meaningfulRecent = state.turn - state.lastMeaningfulActionTurn <= 4;
  if (meaningfulRecent) return null;
  const uniqueRooms = new Set(moves.map((move) => move.roomId)).size;
  if (uniqueRooms >= 6) return null;
  if (state.turn - state.lastGoofTriggerTurn < 6) return null;

  let loopScore = 0;
  const roomsWindow = moves.map((move) => move.roomId);
  const modeWindow = moves.map((move) => move.mode);
  for (let i = 0; i <= roomsWindow.length - 4; i += 1) {
    const a = roomsWindow[i];
    const b = roomsWindow[i + 1];
    if (a === b) continue;
    if (a === roomsWindow[i + 2] && b === roomsWindow[i + 3]) {
      const runSegment = modeWindow.slice(i, i + 4).filter((mode) => mode === "run").length;
      if (runSegment >= 3) {
        loopScore += 1;
      }
    }
  }
  for (let i = 0; i <= roomsWindow.length - 6; i += 1) {
    const a = roomsWindow[i];
    const b = roomsWindow[i + 1];
    const c = roomsWindow[i + 2];
    if (a === b || b === c || a === c) continue;
    if (a === roomsWindow[i + 3] && b === roomsWindow[i + 4] && c === roomsWindow[i + 5]) {
      const runSegment = modeWindow.slice(i, i + 6).filter((mode) => mode === "run").length;
      if (runSegment >= 4) {
        loopScore += 1;
      }
    }
  }

  const loopThreshold = state.currentNight >= 4 ? 1 : 2;
  if (loopScore < loopThreshold) return null;

  const visitCounts = new Map();
  moves.forEach((move) => {
    visitCounts.set(move.roomId, (visitCounts.get(move.roomId) || 0) + 1);
  });
  let sourceRoomId = moves[moves.length - 1].roomId;
  let bestCount = visitCounts.get(sourceRoomId) || 0;
  moves.forEach((move) => {
    const count = visitCounts.get(move.roomId) || 0;
    if (count >= bestCount) {
      bestCount = count;
      sourceRoomId = move.roomId;
    }
  });

  return { sourceRoomId, reason: "looping-run" };
}

function triggerDisciplineCheck(sourceRoomId) {
  const wasDisabled = state.robotDisabled;
  state.robotDisabled = false;
  const adjacentRooms = roomConnections[sourceRoomId] || [];
  const spawnCandidates = adjacentRooms.filter((roomId) => roomId !== state.playerRoom);
  const spawnRoom = spawnCandidates.length > 0 ? spawnCandidates[0] : sourceRoomId;
  const shouldTeleport = wasDisabled || state.currentNight <= 3;
  if (shouldTeleport) {
    state.robotRoom = spawnRoom;
    state.robotDormant = Math.max(state.robotDormant, 1);
  }
  setRobotFocus(sourceRoomId, { reason: "discipline" });
  state.robotPath = [];
  state.robotPlannedTarget = sourceRoomId;
  state.robotPath = getShortestPath(state.robotRoom, sourceRoomId).slice(1);
  if (state.robotPath.length > 0) {
    startRobotTravelStep();
  }

  const earlyNight = state.currentNight <= 3;
  const warningOnly = earlyNight && state.goofWarningsThisNight === 0;
  if (warningOnly) {
    state.robotInvestigateTurns = Math.max(state.robotInvestigateTurns, 2);
    setRobotMode("investigate");
  } else if (earlyNight) {
    state.robotInvestigateTurns = 0;
    state.threat = Math.min(5, state.threat + 0.5);
    setRobotMode("hunt");
  } else {
    state.robotInvestigateTurns = Math.max(state.robotInvestigateTurns, 1);
    setRobotMode("hunt");
  }

  pushStatus("Metal shifts toward your noise.", 4);
  queueObjectiveModal(getCaitLine("goofWarning"));
  state.goofWarningsThisNight += 1;
  state.lastGoofTriggerTurn = state.turn;
}

function setRobotMood(mood, ticks) {
  if (!mood || ticks <= 0 || state.robotDisabled || state.robotDormant > 0) return;
  const profile = getNightProfile();
  const chance = profile.moodChance[mood] ?? 0.3;
  if (Math.random() > chance) return;
  if (state.robotMood === mood) {
    state.robotMoodTicks = Math.max(state.robotMoodTicks, ticks);
    return;
  }
  state.robotMood = mood;
  state.robotMoodTicks = ticks;
  if (mood === "irritated") {
    pushStatus("The robot grows impatient.", 3);
  } else if (mood === "cautious") {
    pushStatus("Its pace slows. It seems unsure.", 3);
  } else if (mood === "confident") {
    pushStatus("It moves with renewed confidence.", 3);
  }
  logDebug("robot-mood", { mood, ticks });
}

function updatePlayerTrail(roomId) {
  state.playerTrail.push(roomId);
  if (state.playerTrail.length > 3) {
    state.playerTrail.shift();
  }
}

function getInventoryCount(item) {
  return state.inventory.get(item) ?? 0;
}

function hasInventoryItem(item, count = 1) {
  return getInventoryCount(item) >= count;
}

function addInventoryItem(item, count = 1) {
  if (count <= 0) return;
  state.inventory.set(item, getInventoryCount(item) + count);
}

function removeInventoryItem(item, count = 1) {
  if (count <= 0) return;
  const current = getInventoryCount(item);
  if (current <= count) {
    state.inventory.delete(item);
    return;
  }
  state.inventory.set(item, current - count);
}

function hasPart(name) {
  return hasInventoryItem(name);
}

function hasObjectiveItemCrafted(name) {
  return state.objectiveItemCrafted && state.objectiveItemName === name;
}

function getObjectiveRecipeBySchematic(schematic) {
  return OBJECTIVE_RECIPES_BY_SCHEMATIC.get(schematic) ?? null;
}

function getObjectiveRecipeByName(name) {
  return OBJECTIVE_RECIPES_BY_NAME.get(name) ?? null;
}

function getDeployableKey(name) {
  if (name === "Noise Lure") return "noiseLure";
  if (name === "Door Jam") return "doorJam";
  return null;
}

function isDeployableUnlocked(key) {
  return Boolean(state.deployableUnlocks[key]);
}

function setObjectiveRecipe(recipe, { blocksEscapeConsole = false } = {}) {
  state.requiredEscapeSchematic = recipe?.schematic ?? null;
  state.objectiveItemName = recipe?.name ?? null;
  state.objectiveItemCrafted = false;
  state.objectiveItemInstalled = false;
  state.objectiveBlocksEscapeConsole = blocksEscapeConsole;
  state.selectedSchematic = null;
}

function getPassiveEffects() {
  return {
    noisePenaltyGain: hasPart("Resistors") ? 0.85 : 1,
    signalSpike: hasPart("Capacitors") ? 0.85 : 1,
    fatigueReliefChance: hasPart("Microcontroller") ? 0.5 : 0,
    jamBonus: hasPart("Servo Motor") ? 1 : 0,
    bleedBoost: hasPart("Copper Wire") ? 1.1 : 1,
    persistentBonus: hasPart("24V Power Pack") ? 1 : 0,
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createRng(seed) {
  let value = Math.abs(seed) % 2147483647;
  if (value === 0) value = 2147483646;
  return {
    nextFloat() {
      value = (value * 48271) % 2147483647;
      return (value - 1) / 2147483646;
    },
    nextInt(min, max) {
      return Math.floor(this.nextFloat() * (max - min + 1)) + min;
    },
  };
}

function isNight11(night = state.currentNight) {
  return night === NIGHT_11;
}

function isScriptedNight(night = state.currentNight) {
  return night >= 1 && night <= 10 && !isNight11(night);
}

function getNightPlan(night = state.currentNight) {
  return NIGHT_PLAN[night] ?? null;
}

function getNightObjectiveRoomId(night = state.currentNight) {
  const plan = getNightPlan(night);
  if (!plan) return null;
  const room = rooms.find((entry) => entry.name === plan.room);
  return room?.id ?? null;
}

function getNightMiniGameId(night = state.currentNight) {
  const plan = getNightPlan(night);
  if (!plan) return null;
  return plan.miniGameId ?? plan.objectiveId ?? null;
}

function getWeatherModifiers() {
  return state.weather?.modifiers ?? {
    signalStrength: 1,
    signalDecay: 1,
    scannerFog: false,
    surgeBonus: 0,
    bleedMultiplier: 1,
  };
}

function adjustSanity(amount, reason) {
  if (state.currentNight < 4 || isNight11()) return;
  const prev = state.sanity;
  state.sanity = clamp(state.sanity + amount, 0, 1);
  state.minSanity = Math.min(state.minSanity, state.sanity);
  if (amount > 0 && state.sanity > prev) {
    const delta = state.sanity - prev;
    const shouldCue = delta >= 0.04 && state.turn !== state.lastSanityRecoveryTick;
    if (shouldCue) {
      const lines = [
        "Your thoughts settle.",
        "The noise thins.",
        "Your breathing steadies.",
      ];
      pushBanner(lines[Math.floor(Math.random() * lines.length)], 3);
      state.lastSanityRecoveryTick = state.turn;
    }
  }
  if (amount < 0 && reason === "surge") {
    state.runMoments.push("A power surge rattled your nerves.");
  }
  if (amount > 0 && reason === "cait") {
    state.runMoments.push("Cait pulled you back from the edge.");
  }
  if (prev >= 0.4 && state.sanity < 0.4) {
    state.runMoments.push("Panic blurred your read of the halls.");
  }
}

function sanityBand() {
  if (state.sanity >= 0.7) return "steady";
  if (state.sanity >= 0.4) return "strained";
  if (state.sanity >= 0.2) return "frayed";
  return "critical";
}

function sanityPressurePhrase() {
  if (state.currentNight < 4 || isNight11()) return "";
  const band = sanityBand();
  if (band === "strained") {
    return "Stress: rising.";
  }
  if (band === "frayed") {
    return "Stress: high.";
  }
  if (band === "critical") {
    return "Stress: critical.";
  }
  return "";
}

function maybeTriggerCaitFrayedTutorial() {
  if (state.meta.caitFrayedTutorialShown) return;
  if (state.currentNight < 4) return;
  if (!(state.prevSanity > 0.4 && state.sanity < 0.4)) return;
  markMetaFlag("caitFrayedTutorialShown");
  state.robotDormant = Math.max(state.robotDormant, 3);
  state.robotPath = [];
  state.robotLinger = 0;
  state.robotInvestigateTurns = 0;
  state.robotSearchTurns = 0;
  queueObjectiveModal(getCaitNightData(4).frayedTutorial);
}

function logDebug(event, payload) {
  if (!DEBUG_AI) return;
  console.log(`[AI] ${event}`, payload);
}

function getNightProfile() {
  return NIGHT_PROFILES[state.currentNight] ?? NIGHT_PROFILES[1];
}

function getUnlocks() {
  return getUnlocksForNight(state.currentNight);
}

function hasCollectedTool(name) {
  if (name === "Noise Lure") return isDeployableUnlocked("noiseLure") || hasInventoryItem(name);
  if (name === "Door Jam") return isDeployableUnlocked("doorJam") || hasInventoryItem(name);
  return state.toolCollected.has(name) || hasInventoryItem(name);
}

function isRequiredPickupComplete() {
  if (!state.requiredPickup) return true;
  if (state.requiredPickup.type === "schematic") {
    return state.foundSchematics.has(state.requiredPickup.itemName);
  }
  return hasCollectedTool(state.requiredPickup.itemName);
}

function canUseScanner() {
  return state.unlocks.allowScannerToggle && hasCollectedTool("Pulse Scanner");
}

function cloneUnlocks(unlocks) {
  if (typeof structuredClone === "function") {
    return structuredClone(unlocks);
  }
  return { ...unlocks };
}

function getUnlocksForNight(night) {
  const baseUnlocks = NIGHT_UNLOCKS[night] ?? DEFAULT_UNLOCKS;
  return cloneUnlocks(baseUnlocks);
}

function isTwistNight(night) {
  return [5, 6, 10].includes(night);
}

function shouldRobotStartActive(night = state.currentNight) {
  const unlocks = getUnlocksForNight(night);
  if (!unlocks.robotActive) return false;
  return night === 5;
}

function getFirstUnlockNight(feature) {
  const nights = Object.keys(NIGHT_UNLOCKS)
    .map((value) => Number(value))
    .sort((a, b) => a - b);
  for (const night of nights) {
    const unlocks = NIGHT_UNLOCKS[night];
    if (unlocks?.[feature]) return night;
  }
  return null;
}

function getNextUnlockNightFromNow(feature) {
  const nights = Object.keys(NIGHT_UNLOCKS)
    .map((value) => Number(value))
    .sort((a, b) => a - b);
  for (const night of nights) {
    if (night < state.currentNight) continue;
    const unlocks = NIGHT_UNLOCKS[night];
    if (unlocks?.[feature]) return night;
  }
  return null;
}

function listNewUnlockMessages(prevUnlocks, nextUnlocks) {
  const messages = [];
  const labelMap = {
    showMap: "Map access unlocked.",
    allowSirens: "Room sirens can now be triggered.",
    allowSlowRewire: "Slow Rewire unlocked: reduce signal after sneaking.",
    allowScannerToggle: "Pulse Scanner unlocked.",
    allowNoiseLure: "Noise Lure unlocked.",
    allowCrafting: "Fabrication unlocked: scan schematics and build tools.",
    allowDoorJams: "Door Jams unlocked: wedge doors to block paths (briefly).",
    showRobotIntelOnMap: "Scanner can expose robot routes on the map.",
    allowAlarmedRooms: "Alarmed rooms introduced across the facility.",
  };
  Object.keys(labelMap).forEach((key) => {
    if (!prevUnlocks?.[key] && nextUnlocks?.[key]) {
      messages.push(labelMap[key]);
    }
  });
  return messages;
}

function weightedPick(options) {
  const total = options.reduce((sum, option) => sum + option.weight, 0);
  let roll = Math.random() * total;
  for (const option of options) {
    roll -= option.weight;
    if (roll <= 0) return option.value;
  }
  return options[options.length - 1].value;
}

function pickMissionForNight(night) {
  if (night <= 1) return MISSION_TYPES.ESCAPE;
  if (night <= 3) {
    return weightedPick([
      { value: MISSION_TYPES.ESCAPE, weight: 0.55 },
      { value: MISSION_TYPES.STABILIZE, weight: 0.25 },
      { value: MISSION_TYPES.DATA, weight: 0.2 },
    ]);
  }
  // Night 4+ biases away from ESCAPE to reduce repetition.
  return weightedPick([
    { value: MISSION_TYPES.ESCAPE, weight: 0.15 },
    { value: MISSION_TYPES.STABILIZE, weight: 0.45 },
    { value: MISSION_TYPES.DATA, weight: 0.4 },
  ]);
}

function applyNight11Rooms() {
  rooms.forEach((room, index) => {
    room.name = index === 0 ? "Entrance" : "Grassy Field";
    room.description = NIGHT_11_DESCRIPTION;
    room.theme = NIGHT_11_THEME;
    room.hideSpots = [];
    room.isExit = false;
    room.item = undefined;
    room.schematic = undefined;
    room.noiseRisk = 0;
  });
}

function restoreDefaultRooms() {
  BASE_ROOMS.forEach((base, index) => {
    rooms[index] = {
      ...rooms[index],
      ...base,
      hideSpots: [...base.hideSpots],
    };
  });
}

function applyNightLayout() {
  if (isNight11()) {
    applyNight11Rooms();
    roomConnections = JSON.parse(JSON.stringify(NIGHT_11_CONNECTIONS));
    Object.keys(NIGHT_11_POSITIONS).forEach((key) => {
      mapPositions[key] = { ...NIGHT_11_POSITIONS[key] };
    });
    return;
  }
  restoreDefaultRooms();
  roomConnections = JSON.parse(JSON.stringify(BASE_ROOM_CONNECTIONS));
  Object.keys(BASE_MAP_POSITIONS).forEach((key) => {
    mapPositions[key] = { ...BASE_MAP_POSITIONS[key] };
  });
}

function setupNight11State() {
  state.missionType = MISSION_TYPES.ESCAPE;
  state.escapeMode = "manual";
  resetGoofingState();
  state.escapeReady = false;
  state.escapeConsoleInspected = false;
  state.tasksAcknowledgedNightOne = false;
  state.runAcknowledgedNightOne = false;
  state.runHighlightActive = false;
  state.runHighlightConsumed = false;
  state.liveAcknowledgedNightOne = false;
  state.liveEscapePrompted = false;
  state.stabilizeTargets = [];
  state.stabilizedTargets = new Set();
  state.dataFragmentsNeeded = 0;
  state.dataFragmentsFound = new Set();
  state.manualOverrideNeeded = 0;
  state.manualOverrideTargets = new Set();
  state.manualOverridesDone = new Set();
  state.alarmedRooms = new Set();
  state.triggeredAlarms = new Set();
  state.alarmTriggerTTL = new Map();
  state.disabledAlarmedRooms = new Set();
  state.alarmDisableProgress = new Map();
  state.alarmedRoomsRequired = 0;
  state.activeLures = new Map();
  state.sunlitRooms = new Set(rooms.map((room) => room.id));
  state.specialPickups = new Map();
  state.requiredPickup = null;
  state.nightIntroLine = null;
  state.storyQueue = [];
  state.objectiveHoldUntil = 0;
  state.containmentLineShown = false;
  state.permaJammedEdges = new Set();
  state.surgeCountdown = null;
  state.surgeForeshadowed = false;
  state.surgeTargetRoom = null;
  state.surgeCharges = 0;
  state.surgeWarningActive = false;
  state.surgeWarningRoom = null;
  state.surgeWarningEndsAt = 0;
  state.surgeWarningLineShown = false;
  state.surgeMapFlashRoom = null;
  state.surgeMapFlashActive = false;
  state.weather = WEATHER_TYPES.find((entry) => entry.type === "Clear") ?? WEATHER_TYPES[0];
  state.weatherAnnounced = true;
  updateWeatherAmbience({ forceRestart: true });
  state.robotDisabled = true;
  state.robotDormant = 0;
  state.robotRoom = state.playerRoom;
  state.caitQuietRoomId = pickRandomRoomId(new Set([PICKUP_START_ROOM]));
  state.caitQuietSeen = false;
}

function setupMissionForNight() {
  if (isNight11()) {
    setupNight11State();
    return;
  }
  state.robotRechargeCooldown = getRobotRechargeCooldown();
  resetGoofingState();
  state.missionType = MISSION_TYPES.ESCAPE;
  state.escapeMode = "manual";
  state.stabilizeTargets = [];
  state.stabilizedTargets = new Set();
  state.dataFragmentsFound = new Set();
  state.dataFragmentsNeeded = 0;
  state.manualOverrideNeeded = 0;
  state.manualOverrideTargets = new Set();
  state.manualOverridesDone = new Set();
  state.objectiveItemName = null;
  state.objectiveItemCrafted = false;
  state.objectiveItemInstalled = false;
  state.objectiveBlocksEscapeConsole = false;
  state.completedObjectiveItems = new Set();
  state.miniGameActive = false;
  state.miniGame = null;
  state.nightObjectiveId = null;
  state.nightObjectiveComplete = false;
  state.robotKilled = false;
  state.hasFlameSaw = false;
  state.robotKillGrace = 0;

  if (isScriptedNight()) {
    const plan = getNightPlan();
    if (plan) {
      state.nightObjectiveId = plan.objectiveId;
    }
    state.escapeConsoleInspected = false;
    if (state.currentNight === 10) {
      const flameRecipe = getObjectiveRecipeByName("Flame-Saw");
      if (flameRecipe) {
        state.escapeMode = "fabricate";
        setObjectiveRecipe(flameRecipe);
      }
    } else {
      state.requiredEscapeSchematic = null;
      state.selectedSchematic = null;
    }
    const startRobotActive = shouldRobotStartActive();
    state.robotDisabled = !startRobotActive;
    if (!startRobotActive) {
      state.robotRoom = CONTROL_ROOM_ID;
      state.robotDormant = 0;
    }
    setupEnvironmentForNight();
    const objectiveIntro = getNightObjectiveIntroLine();
    if (objectiveIntro && state.currentNight !== 1) {
      if (state.pendingObjectiveModal) {
        state.storyQueue.push({
          triggerTurn: state.turn + 1,
          type: "objective-intro",
          text: objectiveIntro,
        });
      } else {
        state.pendingObjectiveModal = objectiveIntro;
      }
    }
    return;
  }

  if (!state.unlocks.allowCrafting) {
    state.escapeMode = "manual";
  }

  setupEnvironmentForNight();
}

function setupEnvironmentForNight() {
  setupWeatherForNight();
  setupAlarmedRooms();
  setupLureRooms();
  setupSunlitRooms();
  setupContainmentForNight();
  setupSpecialPickupsForNight();
  state.robotAlarmVisits.clear();
  state.robotAlarmStreak = 0;
  state.robotAlarmLoopEdge = null;
  state.robotAlarmLoopTurns = 0;
}

function setupWeatherForNight() {
  if (isNight11()) {
    state.weather = WEATHER_TYPES.find((entry) => entry.type === "Clear") ?? WEATHER_TYPES[0];
    state.weatherAnnounced = true;
    state.surgeCharges = 0;
    updateWeatherAmbience({ forceRestart: true });
    return;
  }
  const scriptedWeather = {
    1: "Rain",
    2: "Rain",
    3: "Rain",
    4: "Clear",
    5: "Fog",
    6: "Storm",
    10: "Rain",
  };
  const scriptedType = scriptedWeather[state.currentNight];
  if (scriptedType) {
    state.weather = WEATHER_TYPES.find((entry) => entry.type === scriptedType) ?? WEATHER_TYPES[0];
  } else if (state.currentNight >= 7 && state.currentNight <= 9) {
    const options = WEATHER_TYPES.filter((entry) => ["Clear", "Fog", "Storm"].includes(entry.type));
    state.weather = options[Math.floor(Math.random() * options.length)];
  } else {
    state.weather = WEATHER_TYPES[Math.floor(Math.random() * WEATHER_TYPES.length)];
  }
  state.weatherAnnounced = false;
  state.surgeCharges = state.weather.modifiers.surgeBonus || 0;
  updateWeatherAmbience({ forceRestart: true });
}

function setupAlarmedRooms() {
  state.alarmedRooms = new Set();
  state.triggeredAlarms = new Set();
  state.disabledAlarmedRooms = new Set();
  state.alarmDisableProgress = new Map();
  state.alarmedRoomsRequired = 0;
  if (!state.unlocks.allowAlarmedRooms) return;
  const available = rooms.filter((room) => !room.isExit);
  if (available.length === 0) return;
  if (state.missionType === MISSION_TYPES.STABILIZE) {
    state.alarmedRoomsRequired = Math.min(2, Math.floor(Math.random() * 2) + 1);
  }
  const alarmCount = state.alarmedRoomsRequired > 0
    ? state.alarmedRoomsRequired
    : Math.min(2, Math.floor(Math.random() * 2) + 1);
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  const selected = [];
  const remaining = [];
  shuffled.forEach((room) => {
    const adjacentAlarm = selected.some((picked) => (roomConnections[picked] || []).includes(room.id));
    if (!adjacentAlarm && selected.length < alarmCount) {
      selected.push(room.id);
    } else {
      remaining.push(room.id);
    }
  });
  while (selected.length < alarmCount && remaining.length > 0) {
    selected.push(remaining.shift());
  }
  state.alarmedRooms = new Set(selected);
}

function setupLureRooms() {
  state.activeLures = new Map();
  if (!state.unlocks.allowSirens) return;
  const eligible = rooms.filter((room) => !room.isExit).map((room) => room.id);
  const shuffled = [...eligible].sort(() => Math.random() - 0.5);
  const sirenCount = Math.min(5, Math.max(3, Math.floor(Math.random() * 3) + 3));
  const beaconCount = Math.min(2, Math.max(1, Math.floor(Math.random() * 2) + 1));
  const sirenRooms = shuffled.slice(0, sirenCount);
  const remaining = shuffled.slice(sirenCount);
  const beaconRooms = remaining.slice(0, beaconCount);
  sirenRooms.forEach((roomId) => {
    state.activeLures.set(roomId, { ...LURE_TYPES.siren });
  });
  beaconRooms.forEach((roomId) => {
    state.activeLures.set(roomId, { ...LURE_TYPES.beacon });
  });
}

function setupSunlitRooms() {
  state.sunlitRooms = new Set();
  if (state.currentNight < 4) return;
  if (state.weather?.type !== "Clear") return;
  const eligible = rooms.filter((room) => !room.isExit).map((room) => room.id);
  const shuffled = [...eligible].sort(() => Math.random() - 0.5);
  const count = Math.min(4, Math.max(2, Math.floor(Math.random() * 3) + 2));
  const selected = [];
  const remaining = [];
  shuffled.forEach((roomId) => {
    const adjacentSun = selected.some((picked) => (roomConnections[picked] || []).includes(roomId));
    if (!adjacentSun && selected.length < count) {
      selected.push(roomId);
    } else {
      remaining.push(roomId);
    }
  });
  while (selected.length < count && remaining.length > 0) {
    selected.push(remaining.shift());
  }
  state.sunlitRooms = new Set(selected);
}

function pickRandomRoomId(exclusions = new Set()) {
  const eligible = rooms
    .filter((room) => !room.isExit && !exclusions.has(room.id))
    .map((room) => room.id);
  if (eligible.length === 0) return PICKUP_START_ROOM;
  return eligible[Math.floor(Math.random() * eligible.length)];
}

function setupSpecialPickupsForNight() {
  state.specialPickups = new Map();
  state.requiredPickup = null;
  state.nightIntroLine = null;
  state.storyQueue = [];
  state.objectiveHoldUntil = 0;
  state.toolCollected = new Set();
  if (hasInventoryItem("Pulse Scanner")) {
    state.toolCollected.add("Pulse Scanner");
  }
  if (hasInventoryItem("Blowtorch")) {
    state.toolCollected.add("Blowtorch");
  }
  if (state.currentNight === 4) {
    state.unlocks.allowScannerToggle = false;
    state.scannerOn = false;
    state.scannerHighlight = false;
  }

  if (state.currentNight === 4) {
    const roomId = pickRandomRoomId(new Set([PICKUP_START_ROOM]));
    const night4Data = getCaitNightData(4);
    state.requiredPickup = {
      itemName: "Pulse Scanner",
      roomId,
      caitIntroLine: formatCaitLine(night4Data.intro, { room: rooms[roomId].name }),
      caitWarnLine: night4Data.pickupWarning,
      blocksEscapeConsole: true,
      warned: false,
    };
    state.specialPickups.set(roomId, "Pulse Scanner");
    state.nightIntroLine = state.requiredPickup.caitIntroLine;
  }

  if (state.currentNight === 5) {
    const roomId = pickRandomRoomId(new Set([PICKUP_START_ROOM]));
    const night5Data = getCaitNightData(5);
    state.requiredPickup = {
      itemName: "Noise Lure Schematic",
      roomId,
      type: "schematic",
      caitIntroLine: night5Data.intro,
      caitWarnLine: night5Data.pickupWarning,
      blocksEscapeConsole: true,
      warned: false,
    };
    state.nightIntroLine = state.requiredPickup.caitIntroLine;
  }

  if (state.currentNight === 6) {
    const roomId = pickRandomRoomId(new Set([PICKUP_START_ROOM]));
    const night6Data = getCaitNightData(6);
    const introLine = formatCaitLine(night6Data.intro, { room: rooms[roomId].name });
    state.requiredPickup = {
      itemName: "Door Jam Schematic",
      roomId,
      type: "schematic",
      caitIntroLine: introLine,
      caitWarnLine: night6Data.pickupWarning,
      blocksEscapeConsole: true,
      warned: false,
    };
    state.nightIntroLine = state.requiredPickup.caitIntroLine;
  }

  if (state.currentNight === 7) {
    const roomId = pickRandomRoomId(new Set([PICKUP_START_ROOM]));
    state.requiredPickup = {
      itemName: "Blowtorch",
      roomId,
      caitIntroLine: null,
      caitWarnLine: null,
      blocksEscapeConsole: true,
      warned: false,
    };
    state.nightIntroLine = getCaitNightData(7).intro;
    state.objectiveHoldUntil = 3;
    state.storyQueue.push({
      triggerTurn: 2,
      type: "night7-lockdown",
      roomId,
    });
  }

  if (state.currentNight === 8) {
    state.nightIntroLine = getCaitNightData(8).intro;
  }

  if (state.currentNight === 9) {
    state.nightIntroLine = getCaitNightData(9).intro;
  }

  if (state.currentNight === 10) {
    state.nightIntroLine = getCaitNightData(10).intro;
  }

  if (!state.nightIntroLine && state.currentNight === 1) {
    state.nightIntroLine = getCaitNightData(1).intro;
  }

  if (!state.nightIntroLine && state.unlocks.robotActive && isTwistNight(state.currentNight)) {
    state.nightIntroLine = getCaitLine("twistNightIntro");
  }

  if (!state.nightIntroLine && state.currentNight === 2) {
    state.nightIntroLine = getCaitNightData(2).intro;
  }

  if (!state.nightIntroLine && state.currentNight === 3) {
    const night3Data = getCaitNightData(3);
    state.nightIntroLine = night3Data.intro;
    state.pendingObjectiveModal = night3Data.comment;
  }
}

function isGraphConnectedWithEdgeBlocked(blockedEdges) {
  const start = PICKUP_START_ROOM;
  const visited = new Set();
  const queue = [start];
  while (queue.length) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);
    (roomConnections[current] || []).forEach((neighbor) => {
      const key = edgeKey(current, neighbor);
      if (blockedEdges.has(key)) return;
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    });
  }
  return visited.size === rooms.length;
}

function addPermaJam(edge) {
  state.permaJammedEdges.add(edge);
}

function removePermaJam(edge) {
  state.permaJammedEdges.delete(edge);
}

function getExitEdges() {
  const exitRoom = rooms.find((room) => room.isExit)?.id ?? 13;
  return (roomConnections[exitRoom] || []).map((neighbor) => edgeKey(exitRoom, neighbor));
}

function pickPermaJamEdge({ excludedEdges = new Set(), ensureExitAccess = false } = {}) {
  const edges = [];
  rooms.forEach((room) => {
    (roomConnections[room.id] || []).forEach((neighbor) => {
      if (neighbor < room.id) return;
      edges.push(edgeKey(room.id, neighbor));
    });
  });
  const shuffled = edges.sort(() => Math.random() - 0.5);
  const exitEdges = ensureExitAccess ? getExitEdges() : [];
  for (const edge of shuffled) {
    if (state.permaJammedEdges.has(edge)) continue;
    if (excludedEdges.has(edge)) continue;
    const blocked = new Set(state.permaJammedEdges);
    blocked.add(edge);
    if (ensureExitAccess && exitEdges.length > 0) {
      const exitBlocked = exitEdges.every((exitEdge) => blocked.has(exitEdge));
      if (exitBlocked) continue;
    }
    if (isGraphConnectedWithEdgeBlocked(blocked)) {
      return edge;
    }
  }
  return null;
}

function jamEscapeEdges() {
  getExitEdges().forEach((edge) => {
    addPermaJam(edge);
  });
}

function setupContainmentForNight() {
  state.permaJammedEdges = new Set();
  state.containmentLineShown = false;
  if (state.currentNight === 2) {
    const edge = pickPermaJamEdge();
    if (edge) addPermaJam(edge);
    return;
  }
  if (state.currentNight === 3) {
    const edge = pickPermaJamEdge();
    if (edge) addPermaJam(edge);
    return;
  }
  if (state.currentNight === 7) {
    const exitEdges = getExitEdges();
    const shuffled = [...exitEdges].sort(() => Math.random() - 0.5);
    shuffled.slice(0, 2).forEach((edge) => addPermaJam(edge));
    return;
  }
  if (state.currentNight >= 8) {
    for (let i = 0; i < 2; i += 1) {
      const edge = pickPermaJamEdge({ ensureExitAccess: true });
      if (!edge) break;
      addPermaJam(edge);
    }
  }
}

function announceWeather() {
  if (!state.weather || state.weatherAnnounced) return;
  if (state.currentNight < 4) {
    state.weatherAnnounced = true;
    return;
  }
  pushBanner(`Weather: ${state.weather.type}. ${state.weather.description}`, 4);
  state.weatherAnnounced = true;
}

const AMBIENT_FADE_IN_MS = 1200;
const AMBIENT_FADE_OUT_MS = 1200;
const STORM_LIGHTNING_MIN_TICKS = 12;
const STORM_LIGHTNING_MAX_TICKS = 22;

function getAmbientTrackForWeather(weatherType) {
  if (weatherType === "Rain") {
    return { name: "rain", volume: 0.6 };
  }
  if (weatherType === "Storm") {
    return { name: "rain", volume: 0.7 };
  }
  if (weatherType === "Fog") {
    return { name: "fog", volume: 0.5 };
  }
  if (weatherType === "Clear") {
    return { name: "sunny", volume: 0.5 };
  }
  return null;
}

function updateWeatherAmbience({ forceRestart = false } = {}) {
  const shouldPlay = hasStartedGame && audioUnlockedOnce && canStartAmbience;
  const targetTrack = shouldPlay ? getAmbientTrackForWeather(state.weather?.type) : null;
  const targetName = targetTrack?.name ?? null;
  const targetVolume = targetTrack?.volume ?? 0;
  const fadeIn = forceRestart ? AMBIENT_FADE_IN_MS : AMBIENT_FADE_IN_MS;
  const fadeOut = AMBIENT_FADE_OUT_MS;

  if (targetName && !audioMutedByUser) {
    ensureLoopTrackPlaying(targetName);
  }
  if (targetName !== "rain") {
    clearLoopTrackPending("rain");
  }
  if (targetName !== "fog") {
    clearLoopTrackPending("fog");
  }
  if (targetName !== "sunny") {
    clearLoopTrackPending("sunny");
  }
  fadeTrackTo("rain", targetName === "rain" ? targetVolume : 0, targetName === "rain" ? fadeIn : fadeOut);
  fadeTrackTo("fog", targetName === "fog" ? targetVolume : 0, targetName === "fog" ? fadeIn : fadeOut);
  fadeTrackTo("sunny", targetName === "sunny" ? targetVolume : 0, targetName === "sunny" ? fadeIn : fadeOut);
}

function getStormLightningDelay() {
  const spread = STORM_LIGHTNING_MAX_TICKS - STORM_LIGHTNING_MIN_TICKS;
  return STORM_LIGHTNING_MIN_TICKS + Math.floor(Math.random() * (spread + 1));
}

function triggerStormLightning() {
  if (!dom.lightningAudio) return;
  playSfx(dom.lightningAudio, "lightning-crash", {
    volume: 0.8,
    skipIfPlaying: true,
  });
}

function tickStormLightning() {
  if (state.weather?.type !== "Storm") {
    state.lightningCooldown = null;
    return;
  }
  if (state.lightningCooldown === null) {
    state.lightningCooldown = getStormLightningDelay();
    return;
  }
  state.lightningCooldown -= 1;
  if (state.lightningCooldown > 0) return;
  triggerStormLightning();
  state.lightningCooldown = getStormLightningDelay();
}

function fadeTypingAudioVolume(audio, fromVolume, toVolume, duration, token, onComplete) {
  if (!audio) {
    if (onComplete) onComplete();
    return;
  }
  if (duration <= 0) {
    audio.volume = toVolume;
    if (onComplete) onComplete();
    return;
  }
  const start = performance.now();
  const tick = (now) => {
    if (token !== typingTransitionToken) return;
    const progress = Math.min(1, (now - start) / duration);
    audio.volume = fromVolume + (toVolume - fromVolume) * progress;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else if (onComplete) {
      onComplete();
    }
  };
  requestAnimationFrame(tick);
}

function startTypingAudio(durationMs) {
  if (!dom.typingAudio) return;
  if (!audioUnlockedOnce || !hasStartedGame) return;
  if (audioMutedByUser) return;
  const audio = dom.typingAudio;
  const token = ++typingTransitionToken;
  if (typingAudioTimeoutId) {
    clearTimeout(typingAudioTimeoutId);
    typingAudioTimeoutId = null;
  }
  const maxVolume = getSoundSettingVolumeForElement(audio);
  const busVolume = audioBuses.ui ?? 1;
  const masterVolume = audioBuses.master ?? 1;
  const targetVolume = clamp(TYPING_AUDIO_VOLUME * maxVolume * busVolume * masterVolume, 0, 1);
  if (audio.paused) {
    audio.loop = true;
    audio.muted = false;
    audio.volume = 0;
    audio.currentTime = 0;
    attemptPlayAudio(audio, "typing");
  }
  const startVolume = Number.isFinite(audio.volume) ? audio.volume : 0;
  fadeTypingAudioVolume(audio, startVolume, targetVolume, TYPING_AUDIO_FADE_IN_MS, token);
  typingAudioActive = true;
  if (Number.isFinite(durationMs) && durationMs > 0) {
    typingAudioTimeoutId = setTimeout(() => {
      if (token !== typingTransitionToken) return;
      stopTypingAudio();
    }, durationMs);
  }
}

function stopTypingAudio() {
  if (typingAudioTimeoutId) {
    clearTimeout(typingAudioTimeoutId);
    typingAudioTimeoutId = null;
  }
  if (!dom.typingAudio) return;
  const audio = dom.typingAudio;
  if (audio.paused || audio.volume <= 0.01) {
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0;
    typingAudioActive = false;
    return;
  }
  const token = ++typingTransitionToken;
  const startVolume = Number.isFinite(audio.volume) ? audio.volume : 0;
  fadeTypingAudioVolume(audio, startVolume, 0, TYPING_AUDIO_FADE_OUT_MS, token, () => {
    if (token !== typingTransitionToken) return;
    audio.pause();
    audio.currentTime = 0;
    typingAudioActive = false;
  });
}

function playRunBurst(durationMs = 350) {
  if (!dom.runningAudio) return;
  if (!audioUnlockedOnce || !hasStartedGame) return;
  if (audioMutedByUser) return;
  if (runAudioActive || (isPlayerTraveling() && state.playerTravelMode === "run")) return;
  const audio = dom.runningAudio;
  const token = ++runAudioBurstToken;
  if (runAudioBurstTimeoutId) {
    clearTimeout(runAudioBurstTimeoutId);
    runAudioBurstTimeoutId = null;
  }
  audio.loop = false;
  audio.muted = false;
  const maxVolume = getSoundSettingVolumeForElement(audio);
  const busVolume = audioBuses.movement ?? 1;
  const masterVolume = audioBuses.master ?? 1;
  audio.volume = clamp(RUN_AUDIO_VOLUME * maxVolume * busVolume * masterVolume, 0, 1);
  audio.currentTime = 0;
  attemptPlayAudio(audio, "run-burst");
  runAudioBurstTimeoutId = setTimeout(() => {
    if (token !== runAudioBurstToken) return;
    audio.pause();
    audio.currentTime = 0;
    audio.loop = true;
    runAudioBurstTimeoutId = null;
  }, durationMs);
}

function playSneakBurst(durationMs = 300) {
  if (!dom.sneakAudio) return;
  if (!audioUnlockedOnce || !hasStartedGame) return;
  if (audioMutedByUser) return;
  if (sneakAudioActive || (isPlayerTraveling() && state.playerTravelMode === "sneak")) return;
  const audio = dom.sneakAudio;
  const token = ++sneakAudioBurstToken;
  if (sneakAudioBurstTimeoutId) {
    clearTimeout(sneakAudioBurstTimeoutId);
    sneakAudioBurstTimeoutId = null;
  }
  audio.loop = false;
  audio.muted = false;
  const maxVolume = getSoundSettingVolumeForElement(audio);
  const busVolume = audioBuses.movement ?? 1;
  const masterVolume = audioBuses.master ?? 1;
  audio.volume = clamp(SNEAK_AUDIO_VOLUME * maxVolume * busVolume * masterVolume, 0, 1);
  audio.currentTime = 0;
  attemptPlayAudio(audio, "sneak-burst");
  sneakAudioBurstTimeoutId = setTimeout(() => {
    if (token !== sneakAudioBurstToken) return;
    if (sneakAudioActive || (isPlayerTraveling() && state.playerTravelMode === "sneak")) {
      audio.loop = true;
      return;
    }
    audio.pause();
    audio.currentTime = 0;
    audio.loop = true;
    sneakAudioBurstTimeoutId = null;
  }, durationMs);
}

function startRunningAudio() {
  if (!dom.runningAudio) return;
  if (!audioUnlockedOnce || !hasStartedGame) return;
  const audio = dom.runningAudio;
  const token = ++runAudioTransitionToken;
  if (runAudioStopTimeoutId) {
    clearTimeout(runAudioStopTimeoutId);
    runAudioStopTimeoutId = null;
  }
  ensureLoopTrackPlaying("run", { restart: true });
  audio.muted = false;
  if (token !== runAudioTransitionToken) return;
  if (!audioMutedByUser && isPlayerTraveling() && state.playerTravelMode === "run") {
    forceStartLoopTrack("run");
  }
  fadeTrackTo("run", RUN_AUDIO_VOLUME, RUN_AUDIO_FADE_IN_MS);
  applyLoopTrackMix(loopTracks.get("run"), { ensurePlaying: true });
  runAudioActive = true;
}

function stopRunningAudio() {
  if (!dom.runningAudio) return;
  clearLoopTrackPending("run");
  const audio = dom.runningAudio;
  const token = ++runAudioTransitionToken;
  if (runAudioStopTimeoutId) {
    clearTimeout(runAudioStopTimeoutId);
    runAudioStopTimeoutId = null;
  }
  runAudioActive = false;
  if (audio.paused) {
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0;
    return;
  }
  fadeTrackTo("run", 0, RUN_AUDIO_FADE_OUT_MS);
  if (RUN_AUDIO_FADE_OUT_MS <= 0) {
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0;
    return;
  }
  runAudioStopTimeoutId = setTimeout(() => {
    if (token !== runAudioTransitionToken) return;
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0;
    runAudioStopTimeoutId = null;
  }, RUN_AUDIO_FADE_OUT_MS);
}

function updateRunningAudioState() {
  if (audioMutedByUser) return;
  const shouldPlay =
    audioUnlockedOnce &&
    hasStartedGame &&
    isPlayerTraveling() &&
    state.playerTravelMode === "run";
  if (shouldPlay) {
    if (!runAudioActive) startRunningAudio();
  } else if (runAudioActive) {
    stopRunningAudio();
  }
}

function startSneakAudio() {
  if (!dom.sneakAudio) return;
  if (!audioUnlockedOnce || !hasStartedGame) return;
  const audio = dom.sneakAudio;
  const token = ++sneakAudioTransitionToken;
  if (sneakAudioStopTimeoutId) {
    clearTimeout(sneakAudioStopTimeoutId);
    sneakAudioStopTimeoutId = null;
  }
  ensureLoopTrackPlaying("sneak", { restart: true });
  audio.muted = false;
  if (token !== sneakAudioTransitionToken) return;
  if (!audioMutedByUser && isPlayerTraveling() && state.playerTravelMode === "sneak") {
    forceStartLoopTrack("sneak");
  }
  fadeTrackTo("sneak", SNEAK_AUDIO_VOLUME, SNEAK_AUDIO_FADE_IN_MS);
  applyLoopTrackMix(loopTracks.get("sneak"), { ensurePlaying: true });
  sneakAudioActive = true;
}

function stopSneakAudio() {
  if (!dom.sneakAudio) return;
  clearLoopTrackPending("sneak");
  const audio = dom.sneakAudio;
  const token = ++sneakAudioTransitionToken;
  if (sneakAudioStopTimeoutId) {
    clearTimeout(sneakAudioStopTimeoutId);
    sneakAudioStopTimeoutId = null;
  }
  sneakAudioActive = false;
  if (audio.paused) {
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0;
    return;
  }
  fadeTrackTo("sneak", 0, SNEAK_AUDIO_FADE_OUT_MS);
  if (SNEAK_AUDIO_FADE_OUT_MS <= 0) {
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0;
    return;
  }
  sneakAudioStopTimeoutId = setTimeout(() => {
    if (token !== sneakAudioTransitionToken) return;
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0;
    sneakAudioStopTimeoutId = null;
  }, SNEAK_AUDIO_FADE_OUT_MS);
}

function updateSneakAudioState() {
  if (audioMutedByUser) return;
  const shouldPlay =
    audioUnlockedOnce &&
    hasStartedGame &&
    isPlayerTraveling() &&
    state.playerTravelMode === "sneak";
  if (shouldPlay) {
    if (!sneakAudioActive) startSneakAudio();
  } else if (sneakAudioActive) {
    stopSneakAudio();
  }
}

function updateMovementAudioState() {
  if (audioMutedByUser) return;
  const shouldPlayRun =
    audioUnlockedOnce &&
    hasStartedGame &&
    isPlayerTraveling() &&
    state.playerTravelMode === "run";
  const shouldPlaySneak =
    audioUnlockedOnce &&
    hasStartedGame &&
    isPlayerTraveling() &&
    state.playerTravelMode === "sneak";
  if (shouldPlayRun) {
    if (!runAudioActive) startRunningAudio();
  } else if (runAudioActive) {
    stopRunningAudio();
  }
  if (shouldPlaySneak) {
    if (!sneakAudioActive) startSneakAudio();
  } else if (sneakAudioActive) {
    stopSneakAudio();
  }
  const runTrack = loopTracks.get("run");
  const sneakTrack = loopTracks.get("sneak");
  if (runTrack) {
    applyLoopTrackMix(runTrack, { ensurePlaying: shouldPlayRun });
  }
  if (sneakTrack) {
    applyLoopTrackMix(sneakTrack, { ensurePlaying: shouldPlaySneak });
  }
}

function setCurrentNight(night) {
  const next = clamp(Math.floor(night), 1, 11);
  state.currentNight = next;
  state.nightProfile = getNightProfile();
  state.unlocks = getUnlocks();
  applyNightLayout();
  if (!state.unlocks.robotActive) {
    state.robotDisabled = true;
  }
  if (DEBUG_UI) {
    // Reset mission state for coherent debug night swaps.
    setupMissionForNight();
    state.escapeReady = false;
    if (!isScriptedNight()) {
      state.requiredEscapeSchematic = null;
      state.selectedSchematic = null;
      state.escapeConsoleInspected = false;
      state.tasksAcknowledgedNightOne = false;
      state.runAcknowledgedNightOne = false;
      state.runHighlightActive = false;
      state.runHighlightConsumed = false;
      state.liveAcknowledgedNightOne = false;
      state.liveEscapePrompted = false;
    }
  }
  announceWeather();
  updateNextNightButton();
  preloadRoomBackgrounds();
  updateUI();
  pushStatus(`Night ${next} protocols loaded.`, 3);
}

function configureRobotStart() {
  const startActive = shouldRobotStartActive();
  if (!startActive) {
    state.robotDisabled = true;
    state.robotRoom = CONTROL_ROOM_ID;
    return;
  }
  state.robotRechargeCooldown = getRobotRechargeCooldown();
  if (state.currentNight === 5) {
    const exitRoom = rooms.find((room) => room.isExit)?.id ?? 13;
    state.robotRoom = exitRoom;
    state.robotDisabled = false;
    state.robotDormant = Math.max(state.robotDormant, 3);
    pushStatus("The escape room isn’t empty.", 4);
    if (state.weather?.type === "Storm") {
      schedulePowerSurge();
    }
    return;
  }
  if (state.robotRoom === state.playerRoom) {
    state.robotRoom = pickRandomRoomId(new Set([state.playerRoom]));
  }
}

function scheduleSignal(roomId, strength, delay, options = {}) {
  state.pendingSignals.push({
    roomId,
    strength,
    delay,
    options,
  });
}

function processPendingSignals() {
  if (state.pendingSignals.length === 0) return;
  state.pendingSignals.forEach((entry) => {
    entry.delay -= 1;
  });
  const ready = state.pendingSignals.filter((entry) => entry.delay <= 0);
  state.pendingSignals = state.pendingSignals.filter((entry) => entry.delay > 0);
  ready.forEach((entry) => {
    registerSignal(entry.roomId, entry.strength, entry.options);
  });
}

function tickPersistentSignals() {
  state.persistentSignals.forEach((value, roomId) => {
    registerSignal(roomId, 0.32, { type: "linger", lastKnownChance: 0.2 });
    const next = value - 1;
    if (next <= 0) {
      state.persistentSignals.delete(roomId);
    } else {
      state.persistentSignals.set(roomId, next);
    }
  });
}

function tickAlarmedRooms() {
  if (state.alarmedRooms.size === 0) return;
  const profile = getNightProfile();
  const base = ALARM_TICK_SIGNAL * profile.signalStrength.device;
  const bleed = ALARM_BLEED_SIGNAL * profile.signalStrength.device;
  state.alarmedRooms.forEach((roomId) => {
    if (!isAlarmTriggered(roomId)) return;
    registerSignal(roomId, base, { type: "alarm", lastKnownChance: 0.08 });
    const neighbors = roomConnections[roomId] || [];
    neighbors.forEach((neighbor) => {
      registerSignal(neighbor, bleed, { type: "alarm-bleed", lastKnownChance: 0.04 });
    });
  });
}

function tickSunlitRooms() {
  if (state.sunlitRooms.size === 0) return;
  if (isNight11()) return;
  const profile = getNightProfile();
  const base = 0.04 * profile.signalStrength.device;
  const bleed = 0.02 * profile.signalStrength.device;
  state.sunlitRooms.forEach((roomId) => {
    registerSignal(roomId, base, { type: "sunlight", lastKnownChance: 0.04 });
    const neighbors = roomConnections[roomId] || [];
    neighbors.forEach((neighbor) => {
      registerSignal(neighbor, bleed, { type: "sunlight-bleed", lastKnownChance: 0.02 });
    });
  });
}

function pickDirectorSignalRoom() {
  const adjacent = roomConnections[state.playerRoom] || [];
  const directOptions = adjacent.filter((roomId) => roomId !== state.playerRoom);
  if (directOptions.length > 0) {
    return directOptions[Math.floor(Math.random() * directOptions.length)];
  }
  const twoHop = new Set();
  adjacent.forEach((neighbor) => {
    (roomConnections[neighbor] || []).forEach((roomId) => {
      if (roomId !== state.playerRoom) {
        twoHop.add(roomId);
      }
    });
  });
  const options = [...twoHop];
  if (options.length === 0) return null;
  return options[Math.floor(Math.random() * options.length)];
}

function tickDirector() {
  if (state.robotDisabled) return;
  if (state.directorCooldown > 0) {
    state.directorCooldown -= 1;
  }
  if (hasStrongSignal()) {
    state.turnsSinceStrongSignal = 0;
    return;
  }
  // Only nudge when the player has been "too safe" for several turns.
  state.turnsSinceStrongSignal += 1;
  if (state.directorCooldown > 0) return;
  if (state.turnsSinceStrongSignal < DIRECTOR_SAFE_TURNS_THRESHOLD) return;
  const roomId = pickDirectorSignalRoom();
  if (roomId === null || roomId === state.playerRoom) return;
  const profile = getNightProfile();
  registerSignal(
    roomId,
    DIRECTOR_SIGNAL_STRENGTH * profile.signalStrength.sneak,
    { type: "director", lastKnownChance: DIRECTOR_LAST_KNOWN_CHANCE }
  );
  state.directorCooldown = DIRECTOR_COOLDOWN;
}

function tickStoryQueue() {
  if (!state.storyQueue.length) return;
  const ready = state.storyQueue.filter((entry) => state.turn >= entry.triggerTurn);
  if (ready.length === 0) return;
  state.storyQueue = state.storyQueue.filter((entry) => state.turn < entry.triggerTurn);
  ready.forEach((entry) => {
    if (entry.type === "objective-intro") {
      showObjectiveModal(entry.text);
      return;
    }
    if (entry.type === "night7-lockdown") {
      showObjectiveModal(getCaitNightData(7).lockdown);
      state.storyQueue.push({
        triggerTurn: state.turn + 1,
        type: "night7-blowtorch",
        roomId: entry.roomId,
      });
    }
    if (entry.type === "night7-blowtorch") {
      const roomId = entry.roomId;
      const night7Data = getCaitNightData(7);
      state.specialPickups.set(roomId, "Blowtorch");
      showObjectiveModal(
        formatCaitLine(night7Data.blowtorch, { room: rooms[roomId].name })
      );
    }
  });
}

function applyRoomStress(roomId) {
  const effects = getPassiveEffects();
  const current = state.roomNoisePenalty.get(roomId) || 0;
  const next = clamp(current + 0.05 * effects.noisePenaltyGain, 0, 0.2);
  state.roomNoisePenalty.set(roomId, next);
}

function getRoomNoiseRisk(roomId) {
  const base = rooms[roomId].noiseRisk ?? 0.2;
  const penalty = state.roomNoisePenalty.get(roomId) || 0;
  return clamp(base + penalty, 0, 0.6);
}

function schedulePowerSurge() {
  if (state.surgeCountdown !== null) return;
  if (state.ohShitTriggered && state.surgeCharges <= 0) return;
  if (state.robotDisabled) return;
  if (isNight11()) return;
  if (state.weather?.type !== "Storm") return;
  const minTurns = state.currentNight <= 3 ? 6 : state.currentNight <= 6 ? 4 : 3;
  const maxTurns = state.currentNight <= 3 ? 9 : state.currentNight <= 6 ? 7 : 6;
  const weatherMods = getWeatherModifiers();
  const surgeBoost = weatherMods.surgeBonus ?? 0;
  const delayMin = Math.max(2, minTurns - surgeBoost);
  const delayMax = Math.max(delayMin, maxTurns - surgeBoost);
  const delay = Math.floor(Math.random() * (delayMax - delayMin + 1)) + delayMin;
  state.surgeCountdown = delay;
  state.surgeForeshadowed = false;
  state.surgeTargetRoom = pickSurgeRoom();
}

function pickSurgeRoom() {
  const options = rooms.filter((room) => !room.isExit);
  if (options.length === 0) return state.playerRoom;
  const weighted = options.map((room) => ({
    roomId: room.id,
    weight: 1 + (room.noiseRisk ?? 0.2) * 2,
  }));
  const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * total;
  for (const entry of weighted) {
    roll -= entry.weight;
    if (roll <= 0) return entry.roomId;
  }
  return weighted[weighted.length - 1].roomId;
}

function clearSurgeWarning() {
  state.surgeWarningActive = false;
  state.surgeWarningRoom = null;
  state.surgeWarningEndsAt = 0;
  state.surgeWarningLineShown = false;
  if (surgeWarningTimeoutId) {
    clearTimeout(surgeWarningTimeoutId);
    surgeWarningTimeoutId = null;
  }
  fxController.clearRootClass("surge-warning");
}

function startSurgeWarning(roomId) {
  if (state.surgeWarningActive) return;
  const duration = 1500 + Math.random() * 1500;
  state.surgeWarningActive = true;
  state.surgeWarningRoom = roomId;
  state.surgeWarningEndsAt = performance.now() + duration;
  state.surgeWarningLineShown = false;
  if (surgeWarningTimeoutId) {
    clearTimeout(surgeWarningTimeoutId);
  }
  surgeWarningTimeoutId = setTimeout(() => {
    clearSurgeWarning();
    updateUI();
  }, duration);
  if (roomId === state.playerRoom && dom.app) {
    dom.app.style.setProperty("--surge-warning-duration", `${duration}ms`);
    fxController.toggleRootClass("surge-warning", duration);
    fxController.showHudLine("The lights tighten. Something is about to snap.", 1800);
    state.surgeWarningLineShown = true;
  }
}

function triggerPowerSurge(roomId) {
  if (roomId === null || roomId === undefined) return;
  clearSurgeWarning();
  const firstSurge = !state.ohShitTriggered;
  state.ohShitTriggered = true;
  setRobotFocus(roomId, { reason: "surge" });
  state.surgeTargetRoom = null;
  registerSignal(roomId, 0.85, { type: "surge", forceLastKnown: true, bleed: true });
  const effects = getPassiveEffects();
  state.persistentSignals.set(roomId, 3 + effects.persistentBonus);
  fxController.toggleRootClass("surge-zap", 260);
  const inSurgeRoom = roomId === state.playerRoom;
  if (inSurgeRoom) {
    fxController.showHudLine("The lights snap. Your teeth hum.", 2400);
  } else {
    fxController.showHudLine("Somewhere nearby, something pops—hard.", 2200);
  }
  playSfx(dom.surgeAudio, "surge", { volume: 0.8, skipIfPlaying: true });
  if (!state.meta.surgeAlertShown) {
    showObjectiveModal(getCaitLine("surgeAlert"));
    markMetaFlag("surgeAlertShown");
  }
  if (isAlarmCapable(roomId)) {
    setAlarmTriggered(roomId);
    if (roomId === state.playerRoom) {
      onAlarmTriggered(roomId);
    }
  }
  state.runMoments.push("A sudden power surge forced you into the open.");
  if (firstSurge) {
    adjustSanity(-0.14, "surge");
  }
  if (state.surgeCharges > 0) {
    state.surgeCharges -= 1;
    schedulePowerSurge();
  }
  if (
    roomId !== state.playerRoom &&
    dom.mapPanel?.classList.contains("active") &&
    (roomConnections[state.playerRoom] || []).includes(roomId)
  ) {
    state.surgeMapFlashRoom = roomId;
    state.surgeMapFlashActive = true;
    if (surgeMapFlashTimeoutId) {
      clearTimeout(surgeMapFlashTimeoutId);
    }
    surgeMapFlashTimeoutId = setTimeout(() => {
      state.surgeMapFlashActive = false;
      state.surgeMapFlashRoom = null;
      updateUI();
    }, 500);
  }
}

function tickPowerSurge() {
  if (state.weather?.type !== "Storm") {
    state.surgeCountdown = null;
    clearSurgeWarning();
    return;
  }
  if (state.surgeCountdown === null) return;
  if (state.robotDisabled) return;
  if (isNight11()) return;
  state.surgeCountdown -= 1;
  if (!state.surgeForeshadowed && state.surgeCountdown <= 2) {
    state.surgeForeshadowed = true;
    const targetRoom = state.surgeTargetRoom ?? pickSurgeRoom();
    startSurgeWarning(targetRoom);
  }
  if (state.surgeCountdown <= 0) {
    const roomId = state.surgeTargetRoom ?? pickSurgeRoom();
    triggerPowerSurge(roomId);
    state.surgeCountdown = null;
  }
}

function buildRunSummary(outcome) {
  const lines = [];
  const night = state.completedNight ?? state.currentNight;
  lines.push(`Night ${night} log:`);
  if (state.missionType === MISSION_TYPES.STABILIZE) {
    lines.push("Stabilization protocol initiated.");
  } else if (state.missionType === MISSION_TYPES.DATA) {
    lines.push("Data recovery protocol initiated.");
  } else {
    lines.push("Escape protocol initiated.");
  }
  if (outcome === "win") {
    lines.push(`You escaped the factory on Night ${night}.`);
  } else {
    lines.push(`You were caught in ${rooms[state.playerRoom].name}.`);
  }
  if (night >= 6) {
    lines.push(`By Night ${night}, the robot anticipated your routes.`);
  }
  if (night >= 8) {
    lines.push(`Your tricks stopped working by Night ${night}.`);
  }
  if (outcome === "win" && night >= 9) {
    lines.push(`You escaped on Night ${night} by breaking the trail one last time.`);
  }
  if (state.learnedHidingSpots.size > 0) {
    lines.push("The robot adapted to your hiding habits.");
  }
  if (state.roomNoisePenalty.size > 0) {
    lines.push("The facility grew louder with every search.");
  }
  if (state.ohShitTriggered) {
    lines.push("A power surge blew your cover at the worst time.");
  }
  if (state.minSanity < 0.4) {
    lines.push("Panic blurred your read of the halls.");
  }
  if (state.caitTalkCount > 0) {
    lines.push("Cait pulled you back from the edge.");
  }
  state.runMoments.forEach((moment) => {
    if (!lines.includes(moment)) {
      lines.push(moment);
    }
  });
  return lines.join(" ");
}

function tickStatus() {
  if (state.statusTicks > 0) {
    state.statusTicks -= 1;
    if (state.statusTicks <= 0) {
      state.statusMessage = "";
    }
  }
  if (state.bannerTicks > 0) {
    state.bannerTicks -= 1;
    if (state.bannerTicks <= 0) {
      state.bannerMessage = "";
    }
  }
  if (state.thoughtTicks > 0) {
    state.thoughtTicks -= 1;
    if (state.thoughtTicks <= 0) {
      state.thoughtMessage = "";
    }
  }
}

function tickRobotSfxCooldowns() {
  if (state.robotSfxCooldowns.size === 0) return;
  state.robotSfxCooldowns.forEach((value, key) => {
    const next = value - 1;
    if (next <= 0) {
      state.robotSfxCooldowns.delete(key);
    } else {
      state.robotSfxCooldowns.set(key, next);
    }
  });
}

function tickRobotMemory() {
  state.robotCheckedCooldown.forEach((value, roomId) => {
    const next = value - 1;
    if (next <= 0) {
      state.robotCheckedCooldown.delete(roomId);
    } else {
      state.robotCheckedCooldown.set(roomId, next);
    }
  });
  state.robotAlarmVisits.forEach((value, roomId) => {
    const next = value - 1;
    if (next <= 0) {
      state.robotAlarmVisits.delete(roomId);
    } else {
      state.robotAlarmVisits.set(roomId, next);
    }
  });
  if (state.robotSweepCooldown > 0) {
    state.robotSweepCooldown -= 1;
  }
  if (state.robotPredictionCooldown > 0) {
    state.robotPredictionCooldown -= 1;
  }
  if (state.robotMoodTicks > 0) {
    state.robotMoodTicks -= 1;
    if (state.robotMoodTicks <= 0) {
      state.robotMood = null;
    }
  }
  if (state.robotFocusTTL > 0) {
    state.robotFocusTTL -= 1;
    if (state.robotFocusTTL <= 0) {
      clearRobotFocus("ttl");
    }
  }
  state.robotPresenceHeat.forEach((value, roomId) => {
    const next = Math.max(0, value - 0.08);
    if (next <= 0.02) {
      state.robotPresenceHeat.delete(roomId);
    } else {
      state.robotPresenceHeat.set(roomId, next);
    }
  });
}

function isActionLocked() {
  return Boolean(state.actionLock);
}

function clearActionLock() {
  if (actionLockTimeoutId) {
    clearTimeout(actionLockTimeoutId);
    actionLockTimeoutId = null;
  }
  if (actionLockStepTimeoutId) {
    clearTimeout(actionLockStepTimeoutId);
    actionLockStepTimeoutId = null;
  }
  state.actionLock = null;
  updateActionLockUI();
  flushPendingModals();
}

function setActionLock(label, durationMs) {
  closePanels();
  state.actionLock = {
    label,
    durationMs,
    startedAt: Date.now(),
  };
  if (actionLockTimeoutId) {
    clearTimeout(actionLockTimeoutId);
  }
  actionLockTimeoutId = setTimeout(() => {
    clearActionLock();
    updateUI();
  }, durationMs);
  updateActionLockUI();
}

function updateActionLockUI() {
  if (!dom.actionLock) return;
  if (!state.actionLock) {
    dom.actionLock.classList.add("hidden");
    dom.actionLock.hidden = true;
    lastActionLockStart = null;
    return;
  }
  dom.actionLockLabel.textContent = state.actionLock.label;
  dom.actionLock.style.setProperty("--action-duration", `${state.actionLock.durationMs}ms`);
  dom.actionLock.classList.remove("hidden");
  dom.actionLock.hidden = false;
  if (state.actionLock.startedAt !== lastActionLockStart) {
    const bar = dom.actionLock.querySelector(".action-bar");
    if (bar) {
      const span = bar.querySelector("span");
      if (span) {
        const reset = span.cloneNode(false);
        bar.replaceChild(reset, span);
      }
    }
    lastActionLockStart = state.actionLock.startedAt;
  }
}

function runLockedAction({ label, steps, onStep }) {
  if (isActionLocked()) return;
  const durationMs = ACTION_LOCK_MS * steps;
  setActionLock(label, durationMs);
  let currentStep = 0;
  const runStep = () => {
    currentStep += 1;
    onStep(currentStep, steps);
    if (currentStep < steps) {
      actionLockStepTimeoutId = setTimeout(runStep, ACTION_LOCK_MS);
    }
  };
  runStep();
}

function runLockedActionWithTypingSfx({ label, steps, onStep }) {
  if (isActionLocked()) return;
  const durationMs = ACTION_LOCK_MS * steps;
  startTypingAudio(durationMs);
  runLockedAction({ label, steps, onStep });
}

function pulseActionSignal(roomId, type) {
  const profile = getNightProfile();
  const effects = getPassiveEffects();
  if (type === "trace") {
    registerSignal(
      roomId,
      0.16 * profile.signalStrength.device * effects.signalSpike,
      { type: "action-trace", lastKnownChance: 0.16 }
    );
    return;
  }
  if (type === "quiet") {
    registerSignal(
      roomId,
      0.07 * profile.signalStrength.sneak,
      { type: "action-quiet", lastKnownChance: 0.08 }
    );
  }
}

const PANEL_CLOSE_DURATION = 140;
const panelCloseTimers = new WeakMap();

function clearPanelCloseTimer(panel) {
  const timer = panelCloseTimers.get(panel);
  if (!timer) return;
  window.clearTimeout(timer);
  panelCloseTimers.delete(panel);
}

function openPanel(panel) {
  if (!panel) return;
  clearPanelCloseTimer(panel);
  panel.setAttribute("aria-hidden", "false");
  window.requestAnimationFrame(() => {
    panel.classList.add("active");
  });
}

function closePanel(panel) {
  if (!panel) return;
  clearPanelCloseTimer(panel);
  panel.classList.remove("active");
  const timer = window.setTimeout(() => {
    panel.setAttribute("aria-hidden", "true");
    panelCloseTimers.delete(panel);
  }, PANEL_CLOSE_DURATION);
  panelCloseTimers.set(panel, timer);
}

function closePanels() {
  [dom.menuPanel, dom.systemMenuPanel, dom.mapPanel, dom.usePanel, dom.debugPanel, dom.componentPanel, dom.tasksPanel]
    .forEach((panel) => {
      if (!panel) return;
      if (panel === dom.debugPanel && isDebugPanelPersistent()) {
        openPanel(panel);
        return;
      }
      closePanel(panel);
    });
}

function applyScreenQuery() {
  if (screenQueryApplied) return;
  const screenQuery = getScreenQuery();
  if (!screenQuery) return;
  screenQueryApplied = true;
  const { target, subTarget } = screenQuery;
  switch (target) {
    case "map":
      openMap();
      break;
    case "bag":
      openMenu();
      if (subTarget && subTarget in bagTabPanels) {
        setBagTab(subTarget);
      }
      break;
    case "menu":
      openSystemMenu();
      if (subTarget && subTarget in systemTabPanels) {
        setSystemTab(subTarget);
      }
      break;
    case "tasks":
      openTasks();
      break;
    case "use":
      openUse();
      break;
    case "live":
      returnToRoom();
      break;
    case "debug":
      if (DEBUG_UI) {
        openDebug();
      }
      break;
    default:
      break;
  }
}

function togglePanel(panel) {
  if (state.objectiveBlocked || isActionLocked()) return;
  if (panel === dom.debugPanel && isDebugPanelPersistent()) {
    openPanel(panel);
    return;
  }
  const shouldOpen = !panel.classList.contains("active");
  if (panel !== dom.mapPanel && state.mapTargetMode) {
    clearMapTarget();
    state.selectedRoom = null;
  }
  closePanels();
  if (shouldOpen) {
    openPanel(panel);
  }
}

function openMenu() {
  setBagTab("schematics");
  togglePanel(dom.menuPanel);
}

function closeMenu() {
  closePanel(dom.menuPanel);
}

function openSystemMenu() {
  setSystemTab(state.systemMenuTab || "save");
  updateSystemMenuDebugVisibility();
  syncSystemMenuFromAudio();
  togglePanel(dom.systemMenuPanel);
}

function closeSystemMenu() {
  closePanel(dom.systemMenuPanel);
}

const bagTabPanels = {
  schematics: document.querySelector('[data-bag-panel="schematics"]'),
  items: document.querySelector('[data-bag-panel="items"]'),
  tools: document.querySelector('[data-bag-panel="tools"]'),
};

function setBagTab(tab) {
  if (!tab) return;
  state.bagTab = tab;
  updateBagTabs();
}

function updateBagTabs() {
  const tabs = [
    { name: "schematics", button: dom.bagTabSchematics, panel: bagTabPanels.schematics },
    { name: "items", button: dom.bagTabItems, panel: bagTabPanels.items },
    { name: "tools", button: dom.bagTabTools, panel: bagTabPanels.tools },
  ];
  tabs.forEach(({ name, button, panel }) => {
    const isActive = state.bagTab === name;
    if (button) {
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    }
    if (panel) {
      panel.classList.toggle("active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    }
  });
}

const systemTabPanels = {
  save: document.querySelector('[data-system-panel="save"]'),
  load: document.querySelector('[data-system-panel="load"]'),
  help: document.querySelector('[data-system-panel="help"]'),
  settings: document.querySelector('[data-system-panel="settings"]'),
  debug: document.querySelector('[data-system-panel="debug"]'),
};

function setSystemTab(tab) {
  if (!tab) return;
  state.systemMenuTab = tab;
  updateSystemTabs();
}

function updateSystemTabs() {
  const tabs = [
    { name: "save", button: dom.systemTabSave, panel: systemTabPanels.save },
    { name: "load", button: dom.systemTabLoad, panel: systemTabPanels.load },
    { name: "help", button: dom.systemTabHelp, panel: systemTabPanels.help },
    { name: "settings", button: dom.systemTabSettings, panel: systemTabPanels.settings },
    { name: "debug", button: dom.systemTabDebug, panel: systemTabPanels.debug },
  ];
  tabs.forEach(({ name, button, panel }) => {
    const isActive = state.systemMenuTab === name;
    if (button) {
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    }
    if (panel) {
      panel.classList.toggle("active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    }
  });
}

function updateSystemMenuDebugVisibility() {
  const showDebug = Boolean(DEBUG_UI);
  if (dom.systemTabDebug) {
    dom.systemTabDebug.classList.toggle("hidden", !showDebug);
    dom.systemTabDebug.setAttribute("aria-hidden", String(!showDebug));
  }
  if (systemTabPanels.debug) {
    systemTabPanels.debug.classList.toggle("hidden", !showDebug);
  }
  if (!showDebug && state.systemMenuTab === "debug") {
    setSystemTab("save");
  }
}

function formatSaveIndex(index) {
  return `save${String(index).padStart(3, "0")}`;
}

function parseSaveIndex(name) {
  if (!name) return null;
  const match = /^save(\d+)$/i.exec(name.trim());
  if (!match) return null;
  const value = Number.parseInt(match[1], 10);
  return Number.isFinite(value) ? value : null;
}

function setSaveList(saves) {
  window.localStorage.setItem(SAVE_LIST_KEY, JSON.stringify(saves));
}

function migrateLegacySave() {
  const raw = window.localStorage.getItem(LEGACY_SAVE_KEY);
  if (!raw) return [];
  try {
    const payload = JSON.parse(raw);
    if (!payload?.state) {
      return [];
    }
    const savedAt = payload.savedAt ?? new Date().toISOString();
    const entry = {
      id: `legacy-${Date.now()}`,
      name: formatSaveIndex(1),
      savedAt,
      payload: { ...payload, savedAt },
    };
    const saves = [entry];
    setSaveList(saves);
    window.localStorage.removeItem(LEGACY_SAVE_KEY);
    return saves;
  } catch (error) {
    console.warn("Failed to migrate legacy save:", error);
    return [];
  }
}

function getSaveList() {
  const raw = window.localStorage.getItem(SAVE_LIST_KEY);
  if (!raw) {
    return migrateLegacySave();
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Failed to read save list:", error);
    return [];
  }
}

function getSortedSaveList() {
  return getSaveList()
    .slice()
    .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
}

function getNextSaveIndex() {
  const stored = Number.parseInt(window.localStorage.getItem(SAVE_COUNTER_KEY), 10);
  if (Number.isFinite(stored) && stored > 0) {
    return stored;
  }
  const saves = getSaveList();
  let maxIndex = 0;
  saves.forEach((entry) => {
    const parsed = parseSaveIndex(entry?.name);
    if (parsed && parsed > maxIndex) {
      maxIndex = parsed;
    }
  });
  return maxIndex + 1;
}

function setNextSaveIndex(index) {
  window.localStorage.setItem(SAVE_COUNTER_KEY, String(index));
}

function getDefaultSaveName() {
  return formatSaveIndex(getNextSaveIndex());
}

function setSaveNameInputDefault() {
  if (dom.saveNameInput) {
    dom.saveNameInput.value = getDefaultSaveName();
  }
}

function getSaveNameInputValue() {
  const value = dom.saveNameInput?.value?.trim();
  return value || getDefaultSaveName();
}

function updateSaveStatus(text) {
  if (dom.saveStatus) {
    dom.saveStatus.textContent = text;
  }
}

function updateLoadStatus(text) {
  if (dom.loadStatus) {
    dom.loadStatus.textContent = text;
  }
}

function serializeState() {
  const snapshot = {};
  Object.keys(state).forEach((key) => {
    snapshot[key] = state[key];
  });
  snapshot.baseDate = state.baseDate ? state.baseDate.toISOString() : null;
  STATE_MAP_KEYS.forEach((key) => {
    snapshot[key] = Array.from(state[key]?.entries?.() ?? []);
  });
  STATE_SET_KEYS.forEach((key) => {
    snapshot[key] = Array.from(state[key]?.values?.() ?? []);
  });
  return snapshot;
}

function applySerializedState(serialized) {
  if (!serialized || typeof serialized !== "object") return false;
  Object.keys(state).forEach((key) => {
    if (!(key in serialized)) return;
    state[key] = serialized[key];
  });
  state.baseDate = serialized.baseDate ? new Date(serialized.baseDate) : new Date("2326-12-25T00:00:00Z");
  STATE_MAP_KEYS.forEach((key) => {
    state[key] = new Map(serialized[key] ?? []);
  });
  STATE_SET_KEYS.forEach((key) => {
    state[key] = new Set(serialized[key] ?? []);
  });
  if (!state.meta || typeof state.meta !== "object") {
    state.meta = getDefaultMetaFlags();
  } else {
    state.meta = { ...getDefaultMetaFlags(), ...state.meta };
  }
  saveMetaFlags();
  state.nightProfile = getNightProfile();
  state.unlocks = getUnlocks();
  updateDebugUI();
  updateUI();
  updateWeatherAmbience({ forceRestart: true });
  return true;
}

function renderSaveList() {
  if (!dom.saveList) return;
  const saves = getSortedSaveList();
  dom.saveList.textContent = "";
  if (saves.length === 0) {
    const empty = document.createElement("li");
    empty.className = "list-row";
    empty.textContent = "No saves yet.";
    dom.saveList.appendChild(empty);
    return;
  }
  saves.forEach((entry) => {
    const row = document.createElement("li");
    row.className = "list-row";

    const label = document.createElement("div");
    label.className = "item-label";
    label.textContent = entry.name || "Unnamed save";

    const meta = document.createElement("span");
    meta.textContent = new Date(entry.savedAt).toLocaleString();
    label.appendChild(document.createTextNode(" "));
    label.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "item-actions";

    const loadButton = document.createElement("button");
    loadButton.className = "inspect-button";
    loadButton.type = "button";
    loadButton.textContent = "Load";
    loadButton.dataset.saveId = entry.id;

    actions.appendChild(loadButton);
    row.appendChild(label);
    row.appendChild(actions);
    dom.saveList.appendChild(row);
  });
}

function saveGame() {
  try {
    const saveName = getSaveNameInputValue();
    const payload = {
      version: 1,
      savedAt: new Date().toISOString(),
      state: serializeState(),
      roomConnections,
      mapPositions,
      hasStartedGame,
      canStartAmbience,
    };
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: saveName,
      savedAt: payload.savedAt,
      payload,
    };
    const saves = getSaveList();
    saves.push(entry);
    setSaveList(saves);
    setNextSaveIndex(getNextSaveIndex() + 1);
    setSaveNameInputDefault();
    renderSaveList();
    updateSaveStatus(`Saved ${saveName} at ${new Date(payload.savedAt).toLocaleTimeString()}.`);
    updateLoadStatus("Save ready to load.");
    updateLoadMostRecentButton();
  } catch (error) {
    console.warn("Failed to save game:", error);
    updateSaveStatus("Save failed.");
  }
}

function loadGame(entry) {
  const payload = entry?.payload;
  if (!payload?.state) {
    updateLoadStatus("Save data missing.");
    return;
  }
  if (payload.roomConnections) {
    roomConnections = payload.roomConnections;
  }
  if (payload.mapPositions) {
    Object.keys(mapPositions).forEach((key) => {
      if (payload.mapPositions[key]) {
        mapPositions[key] = { ...payload.mapPositions[key] };
      }
    });
  }
  if (typeof payload.hasStartedGame === "boolean") {
    hasStartedGame = payload.hasStartedGame;
  }
  if (typeof payload.canStartAmbience === "boolean") {
    canStartAmbience = payload.canStartAmbience;
  }
  if (applySerializedState(payload.state)) {
    renderMap();
    updateLoadStatus(`Loaded ${entry?.name ?? "save"} at ${new Date(payload.savedAt).toLocaleTimeString()}.`);
  } else {
    updateLoadStatus("Load failed.");
  }
}

function loadGameById(saveId) {
  if (!saveId) return;
  const saves = getSaveList();
  const entry = saves.find((item) => item.id === saveId);
  if (!entry) {
    updateLoadStatus("Save not found.");
    return;
  }
  loadGame(entry);
}

function loadMostRecentSave() {
  const saves = getSortedSaveList();
  const latest = saves[0];
  if (!latest) {
    updateLoadStatus("No saves to load.");
    return;
  }
  loadGame(latest);
}

function updateLoadMostRecentButton() {
  if (!dom.loadRecentBtn) return;
  const hasSaves = getSortedSaveList().length > 0;
  dom.loadRecentBtn.disabled = !hasSaves;
}

function syncSystemMenuFromAudio() {
  if (dom.masterVolumeSlider) {
    dom.masterVolumeSlider.value = String(Math.round((audioBuses.master ?? 1) * 100));
  }
  if (dom.musicVolumeSlider) {
    dom.musicVolumeSlider.value = String(Math.round((audioBuses.music ?? 1) * 100));
  }
  if (dom.ambienceVolumeSlider) {
    dom.ambienceVolumeSlider.value = String(Math.round((audioBuses.ambience ?? 1) * 100));
  }
  if (dom.movementVolumeSlider) {
    dom.movementVolumeSlider.value = String(Math.round((audioBuses.movement ?? 1) * 100));
  }
  if (dom.uiVolumeSlider) {
    dom.uiVolumeSlider.value = String(Math.round((audioBuses.ui ?? 1) * 100));
  }
  if (dom.sfxVolumeSlider) {
    dom.sfxVolumeSlider.value = String(Math.round((audioBuses.sfx ?? 1) * 100));
  }
}

function refreshSaveStatus() {
  const saves = getSortedSaveList();
  if (saves.length === 0) {
    updateSaveStatus("No save yet.");
    updateLoadStatus("No save loaded.");
    renderSaveList();
    setSaveNameInputDefault();
    updateLoadMostRecentButton();
    return;
  }
  const latest = saves[0];
  if (latest?.savedAt) {
    updateSaveStatus(`Saved ${latest.name ?? "save"} at ${new Date(latest.savedAt).toLocaleTimeString()}.`);
    updateLoadStatus("Save ready to load.");
  } else {
    updateSaveStatus("Save data unreadable.");
    updateLoadStatus("Save data corrupted.");
  }
  renderSaveList();
  setSaveNameInputDefault();
  updateLoadMostRecentButton();
}

function openMap() {
  togglePanel(dom.mapPanel);
  updateMapWeatherLabel();
}

function closeMap() {
  closePanel(dom.mapPanel);
  clearMapTarget();
  clearSelectedRoom();
}

function returnToRoom() {
  closePanels();
  clearMapTarget();
  state.routePreviewRoom = null;
  if (state.introStep === "highlight-live") {
    state.introStep = "complete";
    state.introSequenceActive = false;
  }
  if (state.escapeArrivalPrompted) {
    state.escapeArrivalPrompted = false;
  }
  if (state.currentNight === 1 && state.liveEscapePrompted) {
    state.liveAcknowledgedNightOne = true;
    state.liveEscapePrompted = false;
  }
  clearSelectedRoom();
}

function openUse() {
  togglePanel(dom.usePanel);
}

function closeUse() {
  closePanel(dom.usePanel);
}

function openDebug() {
  togglePanel(dom.debugPanel);
}

function closeDebug() {
  if (isDebugPanelPersistent()) return;
  closePanel(dom.debugPanel);
}

function openComponent(part, { keepMenuOpen = false } = {}) {
  if (keepMenuOpen) {
    [dom.systemMenuPanel, dom.mapPanel, dom.usePanel, dom.debugPanel, dom.tasksPanel]
      .forEach((panel) => {
        if (!panel) return;
        if (panel === dom.debugPanel && isDebugPanelPersistent()) {
          openPanel(panel);
          return;
        }
        closePanel(panel);
      });
  } else {
    closePanels();
  }
  dom.componentTitle.textContent = part;
  dom.componentDetails.textContent = componentDescriptions[part] || "Critical component.";
  dom.componentCount.textContent = `You have ${countOwnedItem(part)}.`;
  const recipe = getObjectiveRecipeBySchematic(part);
  if (dom.componentRequirements) {
    dom.componentRequirements.classList.toggle("hidden", !recipe);
  }
  if (recipe) {
    updateSchematicList(part);
  }
  openPanel(dom.componentPanel);
}

function closeComponent() {
  closePanel(dom.componentPanel);
}

function openTasks() {
  if (state.currentNight === 1) {
    state.tasksAcknowledgedNightOne = true;
    if (dom.tasksBtn) {
      dom.tasksBtn.classList.remove("objective-highlight");
    }
  }
  togglePanel(dom.tasksPanel);
}

function closeTasks() {
  closePanel(dom.tasksPanel);
}

function setObjectiveModalTitle(title) {
  if (!dom.objectiveModalTitle) return;
  dom.objectiveModalTitle.textContent = title;
}

function showObjectiveModal(text, title = "Cait") {
  if (isActionLocked()) {
    state.pendingObjectiveModal = text;
    return;
  }
  clearThought();
  if (isCaitMessage(text)) {
    playUiSfx(dom.caitRadioAudio, "cait-radio", { volume: 1 });
  }
  setObjectiveModalTitle(title);
  dom.objectiveModalText.textContent = formatCaitModalText(text);
  openPanel(dom.objectiveModal);
  state.objectiveBlocked = true;
}

function queueObjectiveModal(text) {
  if (!text) return;
  if (state.objectiveBlocked || isActionLocked()) {
    state.pendingObjectiveModal = text;
    return;
  }
  showObjectiveModal(text);
}

function acknowledgeObjective() {
  closePanel(dom.objectiveModal);
  state.objectiveBlocked = false;
  if (state.startRevealPending && state.introStep === "intro-modal") {
    revealIntroMap();
  }
  flushPendingModals();
}

function pickStoryRoomId(exclusions = new Set()) {
  const room = rooms.find((entry) => !entry.isExit && !exclusions.has(entry.id));
  return room?.id ?? PICKUP_START_ROOM;
}

function buildDebugStoryQueue() {
  const night4RoomId = pickStoryRoomId(new Set([PICKUP_START_ROOM]));
  const night4RoomName = rooms[night4RoomId]?.name ?? "a nearby room";
  const night6RoomName = rooms[PICKUP_START_ROOM]?.name ?? "a nearby room";
  const night7RoomId = pickStoryRoomId(new Set([PICKUP_START_ROOM, night4RoomId]));
  const night7RoomName = rooms[night7RoomId]?.name ?? "a nearby room";
  const sampleObjective = OBJECTIVE_RECIPES.find((recipe) => !recipe.nightOnly) ?? OBJECTIVE_RECIPES[0];
  const sampleObjectiveName = sampleObjective?.name ?? "the objective item";
  const sampleObjectiveSchematic = sampleObjective?.schematic ?? "objective schematic";
  const entries = [];
  const pushEntry = (night, text, label) => {
    if (!text) return;
    const suffix = label ? ` (${label})` : "";
    entries.push({
      title: `CAIT - NIGHT ${night}${suffix}`,
      text,
    });
  };

  const night1Data = getCaitNightData(1);
  const night2Data = getCaitNightData(2);
  const night3Data = getCaitNightData(3);
  const night4Data = getCaitNightData(4);
  const night5Data = getCaitNightData(5);
  const night6Data = getCaitNightData(6);
  const night7Data = getCaitNightData(7);
  const night8Data = getCaitNightData(8);
  const night9Data = getCaitNightData(9);
  const night10Data = getCaitNightData(10);
  const night11Data = getCaitNightData(11);

  pushEntry(1, night1Data.intro, "Intro");
  pushEntry(1, night1Data.comment, "Comment");
  pushEntry(1, night1Data.escapeConsoleInspect, "Console");
  pushEntry(1, night1Data.objectiveComplete, "Objective Complete");
  pushEntry(1, night1Data.escapeReady, "Escape Ready");

  pushEntry(2, night2Data.intro, "Intro");
  pushEntry(2, night2Data.escapeConsoleInspect, "Console");
  pushEntry(2, night2Data.robotActivation, "Robot Online");
  pushEntry(2, night2Data.objectiveComplete, "Objective Complete");
  pushEntry(2, night2Data.comment, "Comment");

  pushEntry(3, night3Data.intro, "Intro");
  pushEntry(3, night3Data.comment, "Comment");
  pushEntry(3, night3Data.alarms?.[0], "Alarm");
  pushEntry(3, night3Data.alarms?.[1], "Alarm");
  pushEntry(3, night3Data.objectives?.[0], "Objective");
  pushEntry(
    3,
    formatCaitLine(night3Data.objectives?.[1], { objectiveName: sampleObjectiveName }),
    "Objective"
  );
  pushEntry(3, night3Data.objectives?.[2], "Objective");
  pushEntry(3, night3Data.objectives?.[3], "Objective");
  pushEntry(
    3,
    formatCaitLine(night3Data.objectives?.[4], { schematic: sampleObjectiveSchematic }),
    "Objective"
  );
  pushEntry(3, night3Data.tutorial, "Comment");
  pushEntry(3, night3Data.robotActivation, "Robot Online");

  pushEntry(4, formatCaitLine(night4Data.intro, { room: night4RoomName }), "Intro");
  pushEntry(4, night4Data.pickupWarning, "Pickup Warning");
  pushEntry(4, night4Data.pickupObjective, "Objective");
  pushEntry(4, night4Data.pickupDetail, "Pickup");
  pushEntry(4, night4Data.frayedTutorial, "Comment");
  night4Data.checkIns?.forEach((line) => {
    pushEntry(4, line, "Cait Check-In");
  });
  pushEntry(4, night4Data.objectiveComplete, "Objective Complete");

  pushEntry(5, night5Data.comment ?? getCaitLine("twistNightIntro"), "Comment");
  pushEntry(5, night5Data.intro, "Intro");
  pushEntry(5, night5Data.pickupDetail, "Pickup");
  pushEntry(5, night5Data.objectiveComplete, "Objective Complete");

  pushEntry(6, formatCaitLine(night6Data.intro, { room: night6RoomName }), "Intro");
  pushEntry(6, night6Data.pickupWarning, "Pickup Warning");
  pushEntry(6, night6Data.pickupDetail, "Pickup");
  pushEntry(6, night6Data.objectiveComplete, "Objective Complete");

  pushEntry(7, night7Data.intro, "Intro");
  pushEntry(7, night7Data.lockdown, "Comment");
  pushEntry(7, formatCaitLine(night7Data.blowtorch, { room: night7RoomName }), "Comment");
  pushEntry(7, night7Data.pickupObjective, "Objective");
  pushEntry(7, night7Data.pickupDetail, "Pickup");
  pushEntry(7, night7Data.wrongDoor, "Comment");
  pushEntry(7, night7Data.objectiveComplete, "Objective Complete");

  pushEntry(8, night8Data.intro, "Intro");
  pushEntry(8, night8Data.objectiveComplete, "Objective Complete");

  pushEntry(9, night9Data.intro, "Intro");
  pushEntry(9, night9Data.objectiveComplete, "Objective Complete");

  pushEntry(10, night10Data.intro, "Intro");
  pushEntry(10, night10Data.objectiveComplete, "Objective Complete");
  pushEntry(10, night10Data.escapeReady, "Escape Ready");

  pushEntry(11, night11Data.final, "Final");

  return entries;
}

function showNextDebugStoryModal() {
  if (!state.debugStoryQueue.length) return;
  const entry = state.debugStoryQueue.shift();
  showObjectiveModal(entry.text, entry.title);
}

function startDebugStoryPreview() {
  state.debugStoryQueue = buildDebugStoryQueue();
  flushPendingModals();
}

function startDebugMiniGame(miniGameId) {
  const config = getMiniGameConfig(miniGameId);
  if (!config) return;
  const planEntry = Object.values(NIGHT_PLAN).find(
    (entry) => entry.objectiveId === miniGameId || entry.miniGameId === miniGameId
  );
  const roomName = planEntry?.room ?? rooms[state.playerRoom]?.name;
  const room = rooms.find((entry) => entry.name === roomName);
  state.robotDisabled = true;
  state.robotDormant = Math.max(state.robotDormant, 3);
  if (room) {
    state.playerRoom = room.id;
  }
  openMiniGame(miniGameId);
  updateUI();
}

function queueRobotAlert(text) {
  state.robotAlertText = text;
  if (state.objectiveBlocked || dom.robotAlertModal.classList.contains("active") || isActionLocked()) {
    state.robotAlertQueued = true;
    return;
  }
  showRobotAlert();
}

function showRobotAlert() {
  state.robotAlertQueued = false;
  clearThought();
  dom.robotAlertText.textContent = state.robotAlertText || "Warning: Robot online.";
  openPanel(dom.robotAlertModal);
  state.objectiveBlocked = true;
}

function acknowledgeRobotAlert() {
  closePanel(dom.robotAlertModal);
  state.objectiveBlocked = false;
  flushPendingModals();
}

function showCaitQuietModal() {
  if (!dom.caitQuietModal) return;
  clearThought();
  playUiSfx(dom.caitRadioAudio, "cait-radio", { volume: 1 });
  dom.caitQuietText.textContent = "Ready to go?";
  openPanel(dom.caitQuietModal);
  state.objectiveBlocked = true;
}

function acknowledgeCaitQuietModal() {
  if (!dom.caitQuietModal) return;
  closePanel(dom.caitQuietModal);
  state.objectiveBlocked = false;
  flushPendingModals();
}

async function loadCreditsText() {
  if (!creditsTextPromise) {
    creditsTextPromise = fetch("credits.txt")
      .then((response) => (response.ok ? response.text() : ""))
      .catch(() => "");
  }
  const text = await creditsTextPromise;
  return text || "Thank you for playing.";
}

function stopGameLoop() {
  if (gameLoopId) {
    clearInterval(gameLoopId);
    gameLoopId = null;
  }
}

async function startNight11Credits() {
  if (state.night11CreditsRolling) return;
  state.night11CreditsRolling = true;
  state.isAlive = false;
  state.hasEscaped = true;
  state.objectiveBlocked = true;
  clearActionLock();
  closePanels();
  closeMap();
  fadeTrackTo("rain", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("fog", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("sunny", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("run", 0, RUN_AUDIO_FADE_OUT_MS);
  fadeTrackTo("sneak", 0, SNEAK_AUDIO_FADE_OUT_MS);
  stopGameLoop();
  const creditsText = await loadCreditsText();
  if (dom.creditsText) {
    dom.creditsText.textContent = creditsText.trim();
  }
  const lineCount = creditsText.trim().split("\n").filter(Boolean).length;
  const duration = Math.max(22, lineCount * 2.4);
  if (dom.creditsScreen) {
    dom.creditsScreen.style.setProperty("--credits-duration", `${duration}s`);
    dom.creditsScreen.classList.add("active");
    dom.creditsScreen.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => {
      dom.creditsScreen?.classList.add("rolling");
    });
  }
  if (dom.creditsScroll) {
    dom.creditsScroll.addEventListener("animationend", finishNight11Credits, { once: true });
  }
}

function finishNight11Credits() {
  if (dom.creditsScreen) {
    dom.creditsScreen.classList.remove("rolling");
    dom.creditsScreen.classList.remove("active");
    dom.creditsScreen.setAttribute("aria-hidden", "true");
  }
  state.night11CreditsRolling = false;
  returnToTitleScreen({ clearMeta: true });
}

function returnToTitleScreen({ clearMeta = false } = {}) {
  hasStartedGame = false;
  canStartAmbience = false;
  state.objectiveBlocked = false;
  if (clearMeta) {
    clearMetaFlags();
  }
  document.body.classList.remove("intro-blackout");
  if (dom.introFade) {
    dom.introFade.classList.remove("is-visible");
    dom.introFade.setAttribute("aria-hidden", "true");
  }
  if (dom.titleAudio) {
    dom.titleAudio.pause();
    dom.titleAudio.currentTime = 0;
  }
  dom.titleVideos.forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });
  if (dom.app) {
    dom.app.classList.add("is-hidden");
    dom.app.classList.remove("alarm-active", "surge-warning", "surge-zap");
  }
  if (dom.titleScreen) {
    dom.titleScreen.setAttribute("aria-hidden", "false");
    dom.titleScreen.classList.remove("title-fade-out");
    dom.titleScreen.classList.add("title-visible");
    if (audioUnlockedOnce) {
      dom.titleScreen.classList.add("title-video-visible");
    }
  }
  if (dom.titleStartBtn) {
    dom.titleStartBtn.disabled = false;
    dom.titleStartBtn.classList.remove("is-locked");
  }
  if (dom.audioGate) {
    dom.audioGate.setAttribute("aria-hidden", "true");
  }
  document.body.classList.add("title-active");
  document.body.classList.remove("night-11");
  document.body.style.removeProperty("--room-theme");
  startTitleSyncLoop();
}

function flushPendingModals() {
  if (state.objectiveBlocked || isActionLocked()) return;
  if (state.debugStoryQueue.length) {
    showNextDebugStoryModal();
    return;
  }
  if (state.pendingObjectiveModal) {
    const text = state.pendingObjectiveModal;
    state.pendingObjectiveModal = null;
    showObjectiveModal(text);
    return;
  }
  if (state.robotAlertQueued && !dom.robotAlertModal.classList.contains("active")) {
    showRobotAlert();
  }
}

function isAlarmCapable(roomId) {
  return state.alarmedRooms.has(roomId) && !state.disabledAlarmedRooms.has(roomId);
}

function isAlarmTriggered(roomId) {
  if (!isAlarmCapable(roomId)) return false;
  const ttl = state.alarmTriggerTTL.get(roomId) || 0;
  return ttl > 0 && state.triggeredAlarms.has(roomId);
}

function canStartNightObjective() {
  if (!isScriptedNight()) return false;
  if (state.nightObjectiveComplete) return false;
  if (state.objectiveHoldUntil > 0 && state.turn < state.objectiveHoldUntil) return false;
  if (state.requiredPickup && !isRequiredPickupComplete()) return false;
  if (!state.escapeConsoleInspected) return false;
  return true;
}

function getNightObjectiveActionLabel() {
  const miniGameId = getNightMiniGameId();
  const config = getMiniGameConfig(miniGameId);
  return config?.actionLabel ?? "Run Calibration";
}

function getAlarmTriggerTTL() {
  return ALARM_TRIGGER_TTL_MIN +
    Math.floor(Math.random() * (ALARM_TRIGGER_TTL_MAX - ALARM_TRIGGER_TTL_MIN + 1));
}

function setAlarmTriggered(roomId) {
  if (!isAlarmCapable(roomId)) return;
  state.triggeredAlarms.add(roomId);
  state.alarmTriggerTTL.set(roomId, getAlarmTriggerTTL());
}

function clearAlarmTrigger(roomId) {
  state.triggeredAlarms.delete(roomId);
  state.alarmTriggerTTL.delete(roomId);
  state.alarmDisableProgress.delete(roomId);
}

function tickAlarms() {
  if (state.alarmTriggerTTL.size === 0) return;
  state.alarmTriggerTTL.forEach((ttl, roomId) => {
    if (!isAlarmCapable(roomId)) {
      clearAlarmTrigger(roomId);
      return;
    }
    const next = ttl - 1;
    if (next <= 0) {
      clearAlarmTrigger(roomId);
    } else {
      state.alarmTriggerTTL.set(roomId, next);
    }
  });
}

function getActiveLure(roomId) {
  return state.activeLures.get(roomId) || null;
}

function hasActiveLure(roomId) {
  return Boolean(getActiveLure(roomId));
}

function recordRobotAlarmVisit(roomId) {
  if (!isAlarmTriggered(roomId)) return;
  const current = state.robotAlarmVisits.get(roomId) || 0;
  state.robotAlarmVisits.set(roomId, current + 1);
}

function alarmVisitPenalty(roomId) {
  if (!isAlarmTriggered(roomId)) return 0;
  const visits = state.robotAlarmVisits.get(roomId) || 0;
  return visits * 0.12;
}

function pickNonAlarmedNeighbor(roomId) {
  const neighbors = roomConnections[roomId] || [];
  const options = neighbors.filter((neighbor) => !isAlarmTriggered(neighbor));
  if (options.length === 0) return null;
  return options[Math.floor(Math.random() * options.length)];
}

function pickHighestPressureNonAlarmedRoom() {
  let bestRoom = null;
  let bestScore = 0;
  rooms.forEach((room) => {
    if (room.isExit) return;
    if (isAlarmTriggered(room.id)) return;
    const score = getRoomPressure(room.id);
    if (score > bestScore) {
      bestScore = score;
      bestRoom = room.id;
    }
  });
  return bestRoom;
}

function shouldForceAlarmBreak() {
  return state.robotAlarmStreak >= 2 || state.robotAlarmLoopTurns >= 2;
}

function forceAlarmBreak() {
  const neighbor = pickNonAlarmedNeighbor(state.robotRoom);
  const target = neighbor ?? pickHighestPressureNonAlarmedRoom();
  if (target === null || target === undefined) {
    if (state.robotAlarmStreak >= 2 && isAlarmTriggered(state.robotRoom)) {
      clearAlarmTrigger(state.robotRoom);
      state.robotAlarmStreak = 0;
      state.robotAlarmLoopTurns = 0;
      state.robotAlarmLoopEdge = null;
    }
    return false;
  }
  state.robotPlannedTarget = target;
  state.robotPath = getShortestPath(state.robotRoom, target).slice(1);
  if (state.robotPath.length > 0) {
    startRobotTravelStep();
  }
  state.robotInvestigateTurns = 0;
  state.robotSweepQueue = [];
  state.robotLookTurns = 0;
  state.robotScanTarget = null;
  setRobotMode("hunt");
  state.robotAlarmStreak = 0;
  state.robotAlarmLoopTurns = 0;
  state.robotAlarmLoopEdge = null;
  return true;
}

function alarmDisableTurnsRequired() {
  const canRewire = state.unlocks.allowSlowRewire &&
    (hasPart("Resistors") || hasPart("Capacitors"));
  return canRewire ? 1 : 2;
}

function applyAlarmDisableStep(roomId, step, totalSteps) {
  if (!isAlarmCapable(roomId)) return;
  recordMeaningfulAction();
  const progress = state.alarmDisableProgress.get(roomId) || 0;
  const next = progress + 1;
  state.alarmDisableProgress.set(roomId, next);
  const profile = getNightProfile();
  registerSignal(
    roomId,
    0.22 * profile.signalStrength.device,
    { type: "alarm", lastKnownChance: 0.2 }
  );
  if (step === 1) {
    pushStatus("You reach for the alarm panel.", 3);
  } else if (step < totalSteps) {
    pushStatus("You keep pressure on the alarm switch.", 2);
  }
  if (next < totalSteps) {
    state.turn += 1;
    updateUI();
    return;
  }
  state.disabledAlarmedRooms.add(roomId);
  clearAlarmTrigger(roomId);
  state.threat = Math.max(1, state.threat - 0.2);
  pushStatus("Alarm silenced. The air thins.", 3);
  updateEscapeReadiness();
  state.turn += 1;
  updateUI();
}

function disableAlarm(roomId) {
  if (!isAlarmCapable(roomId)) return;
  const required = alarmDisableTurnsRequired();
  runLockedAction({
    label: required > 1 ? "Disabling alarm system…" : "Disabling alarm…",
    steps: required,
    onStep: (step, total) => applyAlarmDisableStep(roomId, step, total),
  });
}

function onAlarmTriggered(roomId) {
  if (state.robotDisabled) return;
  if (!isAlarmTriggered(roomId)) {
    setAlarmTriggered(roomId);
  }
  if (!state.meta.alarmAlertShown) {
    showObjectiveModal(getCaitLine("alarmTripped"));
    markMetaFlag("alarmAlertShown");
  }
  const night = state.currentNight;
  const profile = getNightProfile();
  if (night <= 3) {
    registerSignal(roomId, 0.12 * profile.signalStrength.device, {
      type: "alarm",
      lastKnownChance: 0.12,
    });
    return;
  }
  const threatBoost = night >= 6 ? 0.35 : 0.22;
  state.threat = Math.min(5, state.threat + threatBoost);
  setRobotFocus(roomId, { reason: "alarm", ttl: night >= 6 ? ROBOT_FOCUS_TTL + 1 : ROBOT_FOCUS_TTL });
  registerSignal(roomId, 0.22 * profile.signalStrength.device, {
    type: "alarm",
    forceLastKnown: true,
    lastKnownChance: 0.2,
  });
  if (state.robotDormant > 0) {
    const reduction = night >= 6 ? 2 : 1;
    state.robotDormant = Math.max(0, state.robotDormant - reduction);
  }
}

function updateRoomActions() {
  dom.roomActions.innerHTML = "";
  const room = rooms[state.playerRoom];
  const actions = [];
  const blocked = state.objectiveBlocked || isActionLocked();
  const canEscape = state.escapeReady && room.isExit && state.isAlive;

  if (isNight11()) {
    actions.push({
      label: "Leave",
      onClick: () => startNight11Credits(),
      disabled: false,
      highlight: true,
      className: "escape-button",
      suppressMenuPress: true,
      actionKey: "escape",
    });
  } else if (canEscape) {
    actions.push({
      label: "Escape",
      onClick: () => handleEscape(),
      disabled: blocked,
      highlight: true,
      className: "escape-button",
      suppressMenuPress: true,
      actionKey: "escape",
    });
  }

  if (isNight11()) {
    actions.forEach((action) => {
      const button = document.createElement("button");
      const label = document.createElement("span");
      label.textContent = action.label;
      button.appendChild(label);
      appendHotkeyHint(button, action.actionKey);
      if (action.className) {
        button.classList.add(action.className);
      }
      if (action.actionKey) {
        button.dataset.actionKey = action.actionKey;
      }
      button.disabled = action.disabled;
      if (action.highlight) {
        button.classList.add("objective-highlight");
      }
      if (action.onClick) {
        button.addEventListener("click", action.onClick);
      }
      dom.roomActions.appendChild(button);
    });
    return;
  }

  if (state.hidden) {
    actions.push({
      label: "Unhide",
      onClick: () => startHideAction(null),
      disabled: blocked,
      suppressMenuPress: true,
    });
  }

  const canRewire = state.unlocks.allowSlowRewire &&
    !state.hidden &&
    state.lastMoveType !== "run" &&
    (hasPart("Resistors") || hasPart("Capacitors"));
  if (canRewire) {
    actions.push({
      label: "Slow Rewire",
      onClick: () => slowRewire(),
      disabled: blocked,
      risk: "Quiet",
    });
  }

  const specialPickup = state.specialPickups.get(room.id);
  if (specialPickup && !hasCollectedTool(specialPickup)) {
    actions.push({
      label: `Collect ${specialPickup}`,
      onClick: () => startSpecialPickup(room.id),
      disabled: state.hidden || blocked,
      highlight: true,
      risk: "Trace",
    });
  }

  if (state.escapeConsoleInspected && room.item && !hasInventoryItem(room.item)) {
    actions.push({
      label: `Collect ${room.item}`,
      onClick: () => startCollectItem(room.id),
      disabled: state.hidden || blocked,
      risk: "Quiet",
    });
  }

  if (room.schematic && !state.foundSchematics.has(room.schematic)) {
    const isDataMission = state.missionType === MISSION_TYPES.DATA;
    const isRecoveredFragment = isDataMission &&
      room.schematic === DATA_FRAGMENT_SCHEMATIC &&
      state.dataFragmentsFound.has(room.id);
    const isObjectiveSchematic = state.requiredEscapeSchematic === room.schematic;
    const canScanSchematic = state.unlocks.allowCrafting || isDataMission || isObjectiveSchematic;
    const allowScanBeforeConsole = isObjectiveSchematic && state.objectiveBlocksEscapeConsole;
    if (!isRecoveredFragment &&
      !state.objectiveItemInstalled &&
      (state.escapeConsoleInspected || isDataMission || allowScanBeforeConsole)) {
      const scanLabel = isDataMission
        ? "Recover Data Fragment"
        : canScanSchematic
          ? `Scan Schematic: ${room.schematic}`
          : `Schematic Scan (Night ${getNextUnlockNightFromNow("allowCrafting") ?? "?"})`;
      actions.push({
        label: scanLabel,
        onClick: (event) => startSchematicScan(room.id, event),
        disabled: state.hidden || blocked || (!isDataMission && !canScanSchematic),
        risk: "Quiet",
        highlight: isDataMission || isObjectiveSchematic,
      });
    }
  }

  if (room.isExit && !state.escapeConsoleInspected) {
    const requiredBlocked = state.requiredPickup?.blocksEscapeConsole && !isRequiredPickupComplete();
    const objectiveBlocked =
      state.objectiveBlocksEscapeConsole &&
      state.requiredEscapeSchematic &&
      !state.objectiveItemInstalled &&
      !state.foundSchematics.has(state.requiredEscapeSchematic);
    actions.push({
      label: "Inspect Escape Console",
      onClick: (event) => startEscapeConsoleInspect(event),
      disabled: state.hidden || blocked,
      highlight: !(requiredBlocked || objectiveBlocked),
      risk: "Exposed",
      actionKey: "inspect-console",
    });
  }

  if (room.isExit && state.escapeConsoleInspected &&
    state.objectiveItemCrafted &&
    !state.objectiveItemInstalled &&
    state.currentNight !== 10) {
    actions.push({
      label: `Install ${state.objectiveItemName}`,
      onClick: () => installObjectiveItem(),
      disabled: state.hidden || blocked,
      highlight: true,
      risk: "Trace",
    });
  }

  if (isScriptedNight() && state.currentNight !== 10) {
    const objectiveRoomId = getNightObjectiveRoomId();
    if (objectiveRoomId === room.id && canStartNightObjective()) {
      actions.push({
        label: getNightObjectiveActionLabel(),
        onClick: () => openMiniGame(getNightMiniGameId()),
        disabled: state.hidden || blocked,
        highlight: true,
        risk: "Trace",
      });
    }
  }

  if (state.missionType === MISSION_TYPES.STABILIZE && state.escapeConsoleInspected) {
    const target = getStabilizeTarget(room.id);
    if (target && !state.stabilizedTargets.has(room.id)) {
      actions.push({
        label: `Stabilize ${target.room}`,
        onClick: () => startStabilizeSystem(target),
        disabled: state.hidden || blocked || !canStabilizeTarget(target),
        highlight: true,
        risk: "Trace",
      });
    }
  }

  if (state.missionType === MISSION_TYPES.ESCAPE &&
    state.escapeConsoleInspected &&
    state.escapeMode === "manual" &&
    state.manualOverrideTargets.has(room.id) &&
    !state.manualOverridesDone.has(room.id)) {
    actions.push({
      label: "Align Override Node",
      onClick: (event) => startAlignManualOverride(room.id, event),
      disabled: state.hidden || blocked,
      highlight: true,
      risk: "Quiet",
      suppressMenuPress: true,
      actionKey: "align-override",
    });
  }

  if (isAlarmCapable(room.id)) {
    actions.push({
      label: "Disable Alarm",
      onClick: () => disableAlarm(room.id),
      disabled: state.hidden || blocked,
      highlight: state.alarmedRoomsRequired > 0,
      risk: "Trace",
      actionKey: "disable-alarm",
    });
  }

  if (state.currentNight >= 4 && state.currentNight !== 6 && !state.hidden && !isPlayerTraveling()) {
    if (state.caitCooldown <= 0) {
      actions.push({
        label: "Talk to Cait",
        onClick: () => talkToCait(),
        disabled: blocked,
        risk: "Trace",
        actionKey: "talk-cait",
      });
    } else {
      actions.push({
        label: `Cait channel cooling down (${state.caitCooldown})`,
        disabled: true,
        info: true,
      });
    }
  }

  if (state.currentNight === 10 &&
    state.hasFlameSaw &&
    !state.robotKilled &&
    state.robotRoom === room.id &&
    state.robotDormant === 0) {
    actions.push({
      label: "Use Flame-Saw",
      onClick: () => startFlameSawAssault(),
      disabled: state.hidden || blocked,
      highlight: true,
      risk: "Final",
    });
  }

  const isRobotSearchingHere = state.robotRoom === room.id && state.robotSearchTurns > 0;
  room.hideSpots.forEach((spot) => {
    const key = hideSpotKey(room.id, spot);
    const burned = state.burnedHidingSpots.has(key);
    const used = isHideSpotUsed(room.id, spot);
    const searching = isRobotSearchingHere && state.robotSearchSpot === spot;
    const tags = [];
    if (used) {
      tags.push({ label: "USED", className: "tag-used" });
    }
    if (searching) {
      tags.push({ label: "SEARCHING", className: "tag-searching" });
    }
    actions.push({
      label: `Hide: ${spot}`,
      onClick: () => startHideAction(spot),
      disabled: blocked || (state.hidden && state.hiddenSpot === spot),
      risk: burned ? "Risky" : "Quiet",
      className: [
        "hide-action",
        used ? "hide-used" : "",
        searching ? "hide-searching" : "",
      ].filter(Boolean),
      tags,
      suppressMenuPress: true,
    });
  });

  if (state.hidden && state.hiddenTurns >= 2) {
    const strainedAction = state.currentNight >= 4 && state.sanity < 0.4;
    actions.push({
      label: strainedAction ? "Don’t move." : "Hold Breath",
      onClick: () => holdBreath(),
      disabled: blocked,
      risk: "Time",
    });
  }

  const lure = getActiveLure(room.id);
  if (lure && state.unlocks.allowSirens) {
    actions.push({
      label: `Trigger ${lure.name}`,
      onClick: () => triggerSiren(room.id),
      disabled: blocked,
      risk: "Distract",
    });
  }

  if (actions.length === 0) {
    const empty = document.createElement("button");
    empty.textContent = "No immediate actions here.";
    empty.disabled = true;
    dom.roomActions.appendChild(empty);
    return;
  }

  actions.forEach((action) => {
    const button = document.createElement("button");
    const label = document.createElement("span");
    label.textContent = action.label;
    button.appendChild(label);
    if (action.className) {
      const classes = Array.isArray(action.className)
        ? action.className
        : String(action.className).split(" ");
      button.classList.add(...classes.filter(Boolean));
    }
    if (action.risk) {
      const risk = document.createElement("span");
      risk.textContent = action.risk;
      risk.classList.add("risk-hint");
      button.appendChild(risk);
    }
    if (action.tags && action.tags.length > 0) {
      const tagWrap = document.createElement("div");
      tagWrap.classList.add("action-tags");
      action.tags.forEach((tag) => {
        const tagNode = document.createElement("span");
        tagNode.textContent = tag.label;
        tagNode.classList.add("action-tag");
        if (tag.className) {
          tagNode.classList.add(tag.className);
        }
        tagWrap.appendChild(tagNode);
      });
      button.appendChild(tagWrap);
    }
    if (action.suppressMenuPress) {
      button.dataset.suppressMenuPress = "true";
    }
    if (action.actionKey) {
      button.dataset.actionKey = action.actionKey;
    }
    appendHotkeyHint(button, action.actionKey);
    button.disabled = action.disabled;
    if (action.highlight) {
      button.classList.add("objective-highlight");
    }
    if (action.onClick) {
      button.addEventListener("click", action.onClick);
    }
    dom.roomActions.appendChild(button);
  });
}

function getStabilizeTarget(roomId) {
  return state.stabilizeTargets.find((target) => target.roomId === roomId) ?? null;
}

function canStabilizeTarget(target) {
  return hasPart(target.part);
}

function stabilizeSystem(target) {
  if (!target || state.stabilizedTargets.has(target.roomId)) return;
  if (!canStabilizeTarget(target)) return;
  if (hasPart(target.part)) {
    removeInventoryItem(target.part);
  }
  state.stabilizedTargets.add(target.roomId);
  const profile = getNightProfile();
  registerSignal(
    target.roomId,
    0.22 * profile.signalStrength.device,
    { type: "stabilize", lastKnownChance: 0.18 }
  );
  pushStatus(`${target.room} stabilized.`, 3);
  updateEscapeReadiness();
  updateUI();
}

function getManualOverrideCountForNight(night) {
  if (night <= 1) return 2;
  if (night === 2) return 3;
  if (night === 3) return Math.random() < 0.5 ? 3 : 4;
  return 3;
}

function assignManualOverrideTargets() {
  const choices = rooms.filter((room) => !room.isExit);
  const shuffled = [...choices].sort(() => Math.random() - 0.5);
  const count = Math.min(state.manualOverrideNeeded, shuffled.length);
  state.manualOverrideTargets = new Set(shuffled.slice(0, count).map((room) => room.id));
  state.manualOverridesDone = new Set();
}

function alignManualOverride(roomId) {
  if (state.manualOverridesDone.has(roomId)) return;
  state.manualOverridesDone.add(roomId);
  const profile = getNightProfile();
  registerSignal(
    roomId,
    0.16 * profile.signalStrength.device,
    { type: "override", lastKnownChance: 0.12 }
  );
  pushStatus("Override node aligned.", 3);
  updateEscapeReadiness();
  updateUI();
}

function startFlameSawFinale() {
  state.flameSawFinaleActive = true;
  state.flameSawFinaleStage = "gas";
  openMiniGame("FLAMESAW_GAS");
}

function advanceFlameSawFinale(nextStage) {
  state.flameSawFinaleStage = nextStage;
  if (nextStage === "ignite") {
    openMiniGame("FLAMESAW_IGNITE");
  } else if (nextStage === "heat") {
    openMiniGame("FLAMESAW_FINISH");
  } else if (nextStage === "balance") {
    openMiniGame("FLAMESAW_BALANCE");
  }
}

function startFlameSawAssault() {
  if (state.objectiveBlocked || isActionLocked()) return;
  if (!state.hasFlameSaw || state.robotKilled) return;
  if (state.robotDormant > 0) return;
  if (state.robotRoom !== state.playerRoom) return;
  state.objectiveBlocked = true;
  runLockedAction({
    label: "Charging Flame-Saw…",
    steps: 3,
    onStep: (step, steps) => {
      if (step === 1) {
        pushStatus("Heating the armor seam…", 3);
      }
      if (step >= steps) {
        startFlameSawFinale();
      }
    },
  });
}

function hasCompletedAlarmedRooms() {
  if (state.alarmedRoomsRequired <= 0) return true;
  return state.disabledAlarmedRooms.size >= state.alarmedRoomsRequired;
}

function updateEscapeReadiness() {
  const wasReady = state.escapeReady;
  if (isScriptedNight()) {
    let ready = false;
    if (state.currentNight !== 10) {
      ready = state.escapeConsoleInspected && state.nightObjectiveComplete;
    }
    if (ready && !hasCompletedAlarmedRooms()) {
      ready = false;
    }
    state.escapeReady = ready;
    return;
  }
  if (!state.escapeConsoleInspected) {
    state.escapeReady = false;
    return;
  }
  let ready = false;
  if (state.missionType === MISSION_TYPES.ESCAPE) {
    if (state.escapeMode === "manual") {
      ready = state.manualOverridesDone.size >= state.manualOverrideNeeded;
    } else if (state.requiredEscapeSchematic || state.objectiveItemName) {
      ready = state.objectiveItemInstalled;
    }
  } else if (state.missionType === MISSION_TYPES.STABILIZE) {
    ready = state.stabilizedTargets.size >= state.stabilizeTargets.length;
  } else if (state.missionType === MISSION_TYPES.DATA) {
    const fragmentsReady = state.dataFragmentsFound.size >= state.dataFragmentsNeeded;
    ready = fragmentsReady && state.objectiveItemInstalled;
  }
  if (ready && !hasCompletedAlarmedRooms()) {
    ready = false;
  }
  state.escapeReady = ready;
  if (!wasReady && ready) {
    const preLine = getEscapeReadyLine();
    const line = getObjectiveCompleteLine();
    if (preLine) {
      showObjectiveModal(preLine);
      if (line) {
        queueObjectiveModal(line);
      }
      return;
    }
    if (line) {
      showObjectiveModal(line);
    }
  }
}

function applyRewireDampen(roomId, amount) {
  const current = state.roomSignals.get(roomId) || 0;
  const next = Math.max(0, current - amount);
  if (next === 0) {
    state.roomSignals.delete(roomId);
  } else {
    state.roomSignals.set(roomId, next);
  }
  state.rewireDampen.set(roomId, REWIRE_DAMPEN_TURNS);
}

function slowRewire() {
  if (!hasPart("Resistors") && !hasPart("Capacitors")) return;
  runLockedAction({
    label: "Rewiring panel…",
    steps: 1,
    onStep: () => {
      pulseActionSignal(state.playerRoom, "quiet");
      const roomId = state.playerRoom;
      const neighbors = roomConnections[roomId] || [];
      const dampenRooms = new Set([roomId, ...neighbors]);
      dampenRooms.forEach((target) => {
        const amount = target === roomId ? REWIRE_DAMPEN_CURRENT : REWIRE_DAMPEN_ADJACENT;
        applyRewireDampen(target, amount);
      });
      const profile = getNightProfile();
      registerSignal(roomId, REWIRE_SIGNAL_STRENGTH * profile.signalStrength.sneak, {
        type: "rewire",
        lastKnownChance: 0.1,
      });
      pushStatus("You rewire the panel. The static softens.", 3);
      state.turn += 1;
      updateUI();
    },
  });
}

function talkToCait() {
  if (state.currentNight < 4) return;
  if (state.caitCooldown > 0) return;
  const band = sanityBand();
  const lines = getCaitDialogueData().talkToCait ?? {};
  const linePool = lines[band] || lines.steady || [];
  if (linePool.length === 0) return;
  const line = linePool[Math.floor(Math.random() * linePool.length)];
  const steps = band === "frayed" || band === "critical" ? 2 : 1;
  runLockedAction({
    label: "Talking to Cait…",
    steps,
    onStep: (step, total) => {
      pulseActionSignal(state.playerRoom, "trace");
      state.turn += 1;
      if (step < total) {
        updateUI();
        return;
      }
      const profile = getNightProfile();
      const noiseRisk = getRoomNoiseRisk(state.playerRoom);
      const strength = (0.25 + noiseRisk * 0.15) * profile.signalStrength.device;
      registerSignal(state.playerRoom, strength, { type: "cait", lastKnownChance: 0.2, bleed: true });
      adjustSanity(0.3, "cait");
      state.caitCooldown = Math.floor(Math.random() * 3) + 3;
      state.caitTalkCount += 1;
      showObjectiveModal(line);
      pushStatus("Cait steadies your breathing.", 3);
      updateUI();
    },
  });
}

function holdBreath() {
  if (!state.hidden || state.hiddenTurns < 2) return;
  runLockedAction({
    label: "Holding breath…",
    steps: 2,
    onStep: (step, total) => {
      pulseActionSignal(state.playerRoom, "quiet");
      const currentSignal = state.roomSignals.get(state.playerRoom) || 0;
      state.roomSignals.set(state.playerRoom, Math.max(0, currentSignal - 0.05));
      state.turn += 1;
      if (step < total) {
        updateUI();
        return;
      }
      state.robotTargetConfidence = Math.max(0, state.robotTargetConfidence - 0.2);
      state.robotPredictionCooldown = Math.max(state.robotPredictionCooldown, 2);
      if (state.robotRoom === state.playerRoom && state.robotLookTurns > 0) {
        const signal = state.roomSignals.get(state.playerRoom) || 0;
        state.roomSignals.set(state.playerRoom, Math.max(0, signal - 0.2));
      }
      pushStatus("You go still. The noise thins.", 3);
      updateUI();
    },
  });
}

function giveAllDebugItems() {
  state.unlocks.allowCrafting = true;
  state.unlocks.allowDoorJams = true;
  state.unlocks.allowNoiseLure = true;
  state.unlocks.allowScannerToggle = true;
  const schematicNames = [
    ...rooms.map((room) => room.schematic).filter(Boolean),
    ...OBJECTIVE_RECIPES.map((recipe) => recipe.schematic),
  ];
  schematicNames.forEach((schematic) => state.foundSchematics.add(schematic));
  const allParts = Object.keys(ITEM_CLASSES);
  allParts.forEach((item) => {
    if (isMaterial(item)) {
      addInventoryItem(item, 99);
    } else {
      addInventoryItem(item);
    }
  });
  state.toolCollected.add("Pulse Scanner");
  state.toolCollected.add("Blowtorch");
  addInventoryItem("Pulse Scanner");
  addInventoryItem("Blowtorch");
  state.deployableUnlocks.noiseLure = true;
  state.deployableUnlocks.doorJam = true;
  state.noiseLureCharges = 99;
  state.doorJamCharges = 99;
  updateUI();
  pushStatus("Debug: inventory packed.", 3);
}

function toggleGodMode() {
  state.godMode = !state.godMode;
  updateDebugUI();
  pushStatus(`God mode ${state.godMode ? "enabled" : "disabled"}.`, 2);
}

function toggleDebugEyes() {
  state.debugEyes = !state.debugEyes;
  updateDebugUI();
  updateMap();
  pushStatus(`Eyes ${state.debugEyes ? "opened" : "closed"}.`, 2);
}

function updateDebugSanityUI() {
  if (!dom.debugSanityInput || !dom.debugSanityValue) return;
  const percent = Math.round(state.sanity * 100);
  dom.debugSanityInput.value = String(percent);
  dom.debugSanityValue.textContent = `${percent}%`;
}

function updateDebugUI() {
  const debugLabel = dom.nightSelect?.closest(".night-debug");
  if (debugLabel) {
    debugLabel.classList.toggle("hidden", !DEBUG_UI);
  }
  if (dom.debugWeatherSelect) {
    dom.debugWeatherSelect.value = state.weather?.type ?? dom.debugWeatherSelect.value;
  }
  if (dom.godModeBtn) {
    dom.godModeBtn.textContent = `God Mode: ${state.godMode ? "ON" : "OFF"}`;
  }
  if (dom.eyesBtn) {
    dom.eyesBtn.textContent = `Eyes: ${state.debugEyes ? "ON" : "OFF"}`;
  }
  updateDebugSanityUI();
  updateSystemMenuDebugVisibility();
}

function forceEscape() {
  if (!state.isAlive || state.hasEscaped) return;
  const exitRoom = rooms.find((room) => room.isExit)?.id ?? state.playerRoom;
  clearActionLock();
  closeMap();
  state.hidden = false;
  state.hiddenSpot = null;
  state.hiddenTurns = 0;
  state.playerPath = [];
  state.playerTravelTotal = 0;
  state.playerTravelStepStart = null;
  state.playerTravelStepDuration = 0;
  state.routePreviewRoom = null;
  state.selectedRoom = exitRoom;
  state.escapeConsoleInspected = true;
  state.escapeReady = true;
  state.playerRoom = exitRoom;
  updateUI();
  buildEscape();
}

function updateRequiredComponents() {
  if (!dom.componentPanel || !dom.componentRequirements) return;
  if (!dom.componentPanel.classList.contains("active")) return;
  if (dom.componentRequirements.classList.contains("hidden")) return;
  const schematicName = dom.componentTitle?.textContent;
  if (!schematicName) return;
  updateSchematicList(schematicName);
}

function selectSchematic(name) {
  state.selectedSchematic = name;
  updateUI();
}

function getSelectedSchematic() {
  if (!state.selectedSchematic) return null;
  return getObjectiveRecipeBySchematic(state.selectedSchematic);
}

function getRequiredPartCounts(parts) {
  return parts.reduce((counts, part) => {
    counts.set(part, (counts.get(part) ?? 0) + 1);
    return counts;
  }, new Map());
}

function countInventory(item) {
  return getInventoryCount(item);
}

function countOwnedItem(item) {
  let count = countInventory(item);
  if (DEPLOYABLE_ITEMS.has(item)) {
    return item === "Noise Lure" ? state.noiseLureCharges : state.doorJamCharges;
  }
  if (state.objectiveItemName === item && (state.objectiveItemCrafted || state.objectiveItemInstalled)) {
    count += 1;
  }
  if (state.toolCollected.has(item) && !hasInventoryItem(item)) {
    count += 1;
  }
  return count;
}


function updateTravelStatus() {
  const total = state.playerTravelTotal;
  const remaining = state.playerPath.length;
  if (total > 0 && remaining > 0) {
    const completed = total - remaining;
    dom.travelStatus.textContent = `Traveling: ${completed}/${total}`;
    dom.travelStatus.classList.remove("hidden");
  } else {
    dom.travelStatus.textContent = "";
    dom.travelStatus.classList.add("hidden");
  }
}

function updateMapWeatherLabel() {
  if (!dom.mapWeatherLabel) return;
  if (!state.weather) {
    dom.mapWeatherLabel.textContent = "—";
    dom.mapWeatherLabel.setAttribute("title", "Unknown weather");
    dom.mapWeatherLabel.setAttribute("aria-label", "Weather: Unknown");
    return;
  }
  const weatherSymbols = {
    Rain: "🌧️",
    Clear: "☀️",
    Fog: "🌫️",
    Storm: "⛈️",
  };
  const symbol = weatherSymbols[state.weather.type] ?? "❔";
  const label = state.weather.type ?? "Unknown";
  dom.mapWeatherLabel.textContent = `${symbol} ${label}`;
  dom.mapWeatherLabel.setAttribute("title", `${state.weather.type}: ${state.weather.description}`);
  dom.mapWeatherLabel.setAttribute("aria-label", `Weather: ${state.weather.type}. ${state.weather.description}`);
}

function revealEscapeSchematic() {
  if (state.escapeConsoleInspected) return;
  state.escapeReady = false;
  if (isScriptedNight()) {
    state.escapeConsoleInspected = true;
    const objectiveIntro = getNightObjectiveIntroLine();
    const inspectLine = getEscapeConsoleInspectLine();
    if (inspectLine) {
      showObjectiveModal(inspectLine);
      if (objectiveIntro) {
        queueObjectiveModal(objectiveIntro);
      }
    } else if (objectiveIntro) {
      showObjectiveModal(objectiveIntro);
    } else {
      showObjectiveModal(getObjectiveText());
    }
    if (state.unlocks.robotActive) {
      state.robotDisabled = false;
    } else {
      state.robotDisabled = true;
    }
    schedulePowerSurge();
    updateEscapeReadiness();
    updateUI();
    return;
  }
  if (state.missionType === MISSION_TYPES.ESCAPE) {
    if (state.escapeMode === "fabricate") {
      if (!state.requiredEscapeSchematic) {
        const options = OBJECTIVE_RECIPES.filter((recipe) => !recipe.nightOnly);
        const recipe = options[Math.floor(Math.random() * options.length)];
        setObjectiveRecipe(recipe);
      }
      state.selectedSchematic = state.requiredEscapeSchematic;
    } else {
      state.requiredEscapeSchematic = null;
      state.selectedSchematic = null;
      state.manualOverrideNeeded = getManualOverrideCountForNight(state.currentNight);
      assignManualOverrideTargets();
    }
  }
  if (state.missionType === MISSION_TYPES.DATA &&
    state.dataFragmentsFound.size >= state.dataFragmentsNeeded) {
    state.objectiveItemName = "Lock Override Module";
    state.objectiveItemCrafted = true;
  }
  state.escapeConsoleInspected = true;
  const escapeInspectLine = getEscapeConsoleInspectLine();
  if (escapeInspectLine) {
    showObjectiveModal(escapeInspectLine);
  } else if (state.missionType === MISSION_TYPES.ESCAPE) {
    if (state.escapeMode === "manual") {
      showObjectiveModal(getCaitLine("objectiveOverrideNodes"));
    } else {
      const itemName = state.objectiveItemName ?? state.requiredEscapeSchematic ?? "the objective item";
      showObjectiveModal(formatCaitLine(getCaitLine("objectiveBuildItem"), { itemName }));
    }
  } else if (state.missionType === MISSION_TYPES.STABILIZE) {
    showObjectiveModal(getCaitLine("objectiveStabilize"));
  } else {
    showObjectiveModal(getCaitLine("objectiveRecoverData"));
  }
  if (state.currentNight === 3) {
    queueObjectiveModal(getCaitLine("objectiveTutorial"));
  }
  if (state.unlocks.robotActive) {
    state.robotDisabled = false;
  } else {
    state.robotDisabled = true;
  }
  if (state.currentNight === 1 && state.introSequenceActive) {
    state.introStep = "highlight-run";
  }
  schedulePowerSurge();
  updateEscapeReadiness();
  updateUI();
}

function getPartSpawnBudget(night) {
  if (isNight11(night)) return 0;
  return 4;
}

function getSchematicSpawnBudget(night) {
  return 0;
}

function getSpawnWeight(room) {
  const noiseRisk = room.noiseRisk ?? 0.2;
  return 1 + noiseRisk * 3;
}

function pickSpawnRooms(count, exclusions = new Set(), avoidAdjacentTo = []) {
  const picks = [];
  const excluded = new Set(exclusions);
  const avoid = new Set(avoidAdjacentTo);
  const isAdjacentTo = (roomId, targetId) =>
    roomId === targetId || (roomConnections[roomId] || []).includes(targetId);
  const getCandidates = () => rooms.filter((room) => !room.isExit && !excluded.has(room.id));
  while (picks.length < count) {
    let candidates = getCandidates();
    if (candidates.length === 0 && excluded.has(PICKUP_START_ROOM)) {
      excluded.delete(PICKUP_START_ROOM);
      candidates = getCandidates();
    }
    if (candidates.length === 0) break;
    const avoidRooms = [...picks, ...avoid];
    const nonAdjacent = candidates.filter(
      (room) => !avoidRooms.some((picked) => isAdjacentTo(picked, room.id))
    );
    const pool = nonAdjacent.length > 0 ? nonAdjacent : candidates;
    const options = pool.map((room) => ({
      value: room.id,
      weight: getSpawnWeight(room),
    }));
    const selected = weightedPick(options);
    picks.push(selected);
    excluded.add(selected);
  }
  return picks;
}

function pickPartList(count) {
  const shuffled = [...requiredParts].sort(() => Math.random() - 0.5);
  const fresh = shuffled.filter((part) => !state.lastNightSpawnedParts.has(part));
  const repeats = shuffled.filter((part) => state.lastNightSpawnedParts.has(part));
  const picks = [...fresh, ...repeats].slice(0, count);
  state.lastNightSpawnedParts = new Set(picks);
  return picks;
}

function pickSchematicList(count) {
  return [];
}

function pickDataFragmentSchematics(count) {
  if (count <= 0) return [];
  return Array.from({ length: count }, () => DATA_FRAGMENT_SCHEMATIC);
}

function getGuaranteedItems() {
  const guaranteed = [];
  if (state.missionType === MISSION_TYPES.STABILIZE) {
    guaranteed.push(...state.stabilizeTargets.map((target) => target.part));
  }
  if (state.missionType === MISSION_TYPES.ESCAPE && state.escapeMode === "fabricate") {
    const recipe = getObjectiveRecipeBySchematic(state.requiredEscapeSchematic);
    if (recipe && !state.objectiveItemCrafted && !state.objectiveItemInstalled) {
      guaranteed.push(...recipe.parts);
    }
  }
  return guaranteed.filter(Boolean);
}

function assignRoomFinds() {
  rooms.forEach((room) => {
    room.item = undefined;
    room.schematic = undefined;
  });
  const baseExclusions = new Set([PICKUP_START_ROOM]);
  const requiredSchematicPickup = state.requiredPickup?.type === "schematic"
    ? state.requiredPickup
    : null;
  if (requiredSchematicPickup?.roomId != null) {
    baseExclusions.add(requiredSchematicPickup.roomId);
  }
  const guaranteedItems = getGuaranteedItems();
  const basePartBudget = getPartSpawnBudget(state.currentNight);
  const partBudget = Math.max(basePartBudget, guaranteedItems.length);
  const guaranteedPartRooms = pickSpawnRooms(guaranteedItems.length, baseExclusions);
  guaranteedPartRooms.forEach((roomId, index) => {
    const part = guaranteedItems[index];
    if (part) {
      rooms[roomId].item = part;
    }
  });
  const remainingPartBudget = partBudget - guaranteedItems.length;
  const remainingParts = pickPartList(remainingPartBudget);
  const remainingPartRooms = pickSpawnRooms(
    remainingParts.length,
    new Set([...baseExclusions, ...guaranteedPartRooms]),
    guaranteedPartRooms
  );
  remainingPartRooms.forEach((roomId, index) => {
    const part = remainingParts[index];
    if (part) {
      rooms[roomId].item = part;
    }
  });
  const materialSpawns = [...guaranteedItems, ...remainingParts].filter((item) => isMaterial(item));
  state.lastNightSpawnedParts = new Set(materialSpawns);

  const baseSchematicBudget = getSchematicSpawnBudget(state.currentNight);
  const guaranteedSchematics = [];
  if (state.missionType === MISSION_TYPES.DATA) {
    guaranteedSchematics.push(...pickDataFragmentSchematics(state.dataFragmentsNeeded));
  }
  if (state.escapeMode === "fabricate" &&
    state.requiredEscapeSchematic &&
    !state.objectiveItemCrafted &&
    !state.objectiveItemInstalled &&
    !state.foundSchematics.has(state.requiredEscapeSchematic)) {
    guaranteedSchematics.push(state.requiredEscapeSchematic);
  }
  const schematicBudget = Math.max(baseSchematicBudget, guaranteedSchematics.length);
  const partRooms = [...guaranteedPartRooms, ...remainingPartRooms];
  const guaranteedSchematicRooms = pickSpawnRooms(
    guaranteedSchematics.length,
    new Set([...baseExclusions, ...partRooms]),
    partRooms
  );
  guaranteedSchematicRooms.forEach((roomId, index) => {
    const schematic = guaranteedSchematics[index];
    if (schematic) {
      rooms[roomId].schematic = schematic;
    }
  });
  const remainingSchematicBudget = schematicBudget - guaranteedSchematics.length;
  if (remainingSchematicBudget > 0) {
    const schematics = pickSchematicList(remainingSchematicBudget);
    const schematicRooms = pickSpawnRooms(
      schematics.length,
      new Set([...baseExclusions, ...partRooms, ...guaranteedSchematicRooms]),
      [...partRooms, ...guaranteedSchematicRooms]
    );
    schematicRooms.forEach((roomId, index) => {
      const schematic = schematics[index];
      if (schematic) {
        rooms[roomId].schematic = schematic;
      }
    });
  }
  if (requiredSchematicPickup?.roomId != null && requiredSchematicPickup.itemName) {
    rooms[requiredSchematicPickup.roomId].schematic = requiredSchematicPickup.itemName;
  }
}

function alarmObjectiveText() {
  if (state.alarmedRoomsRequired <= 0) return "";
  const done = state.disabledAlarmedRooms.size;
  return `Disable ${done}/${state.alarmedRoomsRequired} alarmed rooms`;
}

function getObjectiveText() {
  let objective = "";
  if (isNight11()) {
    return "Leave";
  }
  if (state.objectiveHoldUntil > 0 && state.turn < state.objectiveHoldUntil) {
    objective = "Keep moving. Listen for Cait.";
  } else if (state.requiredPickup && !isRequiredPickupComplete()) {
    const roomName = rooms[state.requiredPickup.roomId]?.name ?? "a nearby room";
    const verb = state.requiredPickup.type === "schematic" ? "Scan" : "Collect";
    objective = `${verb} the ${state.requiredPickup.itemName} in ${roomName}.`;
  } else if (
    state.objectiveBlocksEscapeConsole &&
    state.requiredEscapeSchematic &&
    !state.objectiveItemInstalled &&
    !state.foundSchematics.has(state.requiredEscapeSchematic)
  ) {
    objective = `Collect the ${state.requiredEscapeSchematic}.`;
  } else if (!state.escapeConsoleInspected) {
    objective = "Inspect the Escape Workshop console to receive your mission.";
  } else if (isScriptedNight()) {
    if (state.currentNight === 10) {
      if (!state.hasFlameSaw) {
        if (state.requiredEscapeSchematic && !state.foundSchematics.has(state.requiredEscapeSchematic)) {
          objective = `Collect the ${state.requiredEscapeSchematic} schematic.`;
        } else if (!state.objectiveItemCrafted) {
          objective = "Build the Flame-Saw.";
        } else {
          objective = "Hunt the robot and use the Flame-Saw.";
        }
      } else if (!state.robotKilled) {
        objective = "Hunt the robot and use the Flame-Saw.";
      } else {
        objective = "Finish it.";
      }
      return objective;
    }
    const plan = getNightPlan();
    const miniGame = getMiniGameConfig(getNightMiniGameId());
    const objectiveName = miniGame?.title ?? "the objective";
    const roomName = plan?.room ?? "the facility";
    if (!state.nightObjectiveComplete) {
      objective = `Complete ${objectiveName} in ${roomName}.`;
    } else {
      objective = "Return to the Escape Workshop and press Escape.";
    }
    return objective;
  } else {
    const alarmText = alarmObjectiveText();
    if (state.missionType === MISSION_TYPES.ESCAPE) {
      if (state.escapeMode === "manual") {
        if (!state.escapeReady) {
          const done = state.manualOverridesDone.size;
          const total = state.manualOverrideNeeded;
          const base = `Find and align override nodes (${done}/${total})`;
          const alarm = alarmText ? `, ${alarmText.toLowerCase()}` : "";
          objective = `${base}${alarm}, then escape.`;
        }
      } else if (!state.escapeReady && state.requiredEscapeSchematic) {
        const alarm = alarmText ? `, ${alarmText.toLowerCase()}` : "";
        const itemName = state.objectiveItemName ?? state.requiredEscapeSchematic;
        if (!state.foundSchematics.has(state.requiredEscapeSchematic)) {
          objective = `Collect the ${state.requiredEscapeSchematic}${alarm}.`;
        } else if (!state.objectiveItemCrafted) {
          objective = `Build the ${itemName}${alarm}, then install it at the Escape Workshop console.`;
        } else if (!state.objectiveItemInstalled) {
          objective = `Install the ${itemName} at the Escape Workshop console${alarm}.`;
        }
      }
    }
    if (state.missionType === MISSION_TYPES.STABILIZE) {
      const total = state.stabilizeTargets.length;
      const done = state.stabilizedTargets.size;
      if (!state.escapeReady) {
        const targets = state.stabilizeTargets
          .map((target) => {
            const marker = state.stabilizedTargets.has(target.roomId) ? "✓" : "•";
            return `${marker} ${target.room}`;
          })
          .join(" ");
        const alarm = alarmText ? ` and ${alarmText.toLowerCase()}` : "";
        objective = `Stabilize ${done}/${total} systems (${targets})${alarm}, then escape.`;
      }
    }
    if (state.missionType === MISSION_TYPES.DATA) {
      const done = state.dataFragmentsFound.size;
      const total = state.dataFragmentsNeeded;
      if (!state.escapeReady) {
        const alarm = alarmText ? ` and ${alarmText.toLowerCase()}` : "";
        if (done < total) {
          objective = `Recover ${done}/${total} data fragments${alarm} to assemble the Lock Override Module.`;
        } else if (!state.objectiveItemInstalled) {
          objective = `Install the Lock Override Module at the Escape Workshop console${alarm}.`;
        }
      }
    }
    if (state.escapeReady) {
      objective = "Return to the Escape Workshop and press Escape.";
    }
    if (!objective) {
      objective = "Explore the factory and collect components.";
    }
  }
  return objective;
}

function getStabilizeObjectiveTargets() {
  if (state.objectiveHoldUntil > 0 && state.turn < state.objectiveHoldUntil) return null;
  if (state.requiredPickup && !isRequiredPickupComplete()) return null;
  if (
    state.objectiveBlocksEscapeConsole &&
    state.requiredEscapeSchematic &&
    !state.objectiveItemInstalled &&
    !state.foundSchematics.has(state.requiredEscapeSchematic)
  ) {
    return null;
  }
  if (!state.escapeConsoleInspected) return null;
  if (state.missionType !== MISSION_TYPES.STABILIZE) return null;
  if (state.escapeReady) return null;
  return state.stabilizeTargets.map((target) => ({
    roomId: target.roomId,
    room: target.room,
    part: target.part,
    stabilized: state.stabilizedTargets.has(target.roomId),
  }));
}

function renderTasksText() {
  const stabilizeTargets = getStabilizeObjectiveTargets();
  if (!stabilizeTargets) {
    dom.tasksText.textContent = getObjectiveText();
    return;
  }
  const done = state.stabilizedTargets.size;
  const total = state.stabilizeTargets.length;
  const alarmText = alarmObjectiveText();
  dom.tasksText.textContent = "";
  dom.tasksText.append(`Stabilize ${done}/${total} systems (`);
  stabilizeTargets.forEach((target, index) => {
    const marker = target.stabilized ? "✓" : "•";
    dom.tasksText.append(`${marker} ${target.room} `);
    const icon = createSchematicIcon(target.part, { size: 18 });
    icon.classList.add("objective-icon");
    icon.setAttribute("role", "img");
    icon.setAttribute("aria-label", target.part);
    icon.setAttribute("title", target.part);
    dom.tasksText.append(icon);
    if (index < stabilizeTargets.length - 1) {
      dom.tasksText.append(", ");
    }
  });
  const alarmSuffix = alarmText ? ` and ${alarmText.toLowerCase()}` : "";
  dom.tasksText.append(`)${alarmSuffix}, then escape.`);
}

function getInitialObjectiveModalText() {
  const text = state.nightIntroLine ?? getObjectiveText();
  return stripCaitPrefix(text);
}

function getNightDialogue(night) {
  return getCaitNightData(night);
}

function getEscapeConsoleInspectLine() {
  return getNightDialogue(state.currentNight)?.escapeConsoleInspect ?? null;
}

function getObjectiveCompleteLine() {
  return getNightDialogue(state.currentNight)?.objectiveComplete ?? null;
}

function getEscapeReadyLine() {
  return getNightDialogue(state.currentNight)?.escapeReady ?? null;
}

function getNightObjectiveIntroLine() {
  return getNightDialogue(state.currentNight)?.objectiveIntro ?? null;
}

function getNightObjectiveSuccessLine() {
  return getNightDialogue(state.currentNight)?.objectiveSuccess ?? null;
}

function getRobotActivationAlertText() {
  return getNightDialogue(state.currentNight)?.robotActivation ?? "Warning: Robot online.";
}

function showRobotActivationDialog() {
  const text = getRobotActivationAlertText();
  if (state.currentNight === 2 || state.currentNight === 3) {
    showObjectiveModal(text);
    return;
  }
  queueRobotAlert(text);
}

function isPlayerTraveling() {
  return state.playerPath.length > 0 || state.playerTravelStepStart !== null;
}

function movePlayer(roomId, isRun, options = {}) {
  if (!state.isAlive || state.hasEscaped) return;
  if (state.objectiveBlocked || isActionLocked()) return;
  if (roomId === state.playerRoom) return;
  const path = getShortestPath(state.playerRoom, roomId);
  if (path.length <= 1) return;
  if (state.hidden && !options.skipUnhide) {
    if (pendingMoveTimeoutId) {
      clearTimeout(pendingMoveTimeoutId);
      pendingMoveTimeoutId = null;
    }
    playSneakBurst();
    runLockedAction({
      label: "Leaving hiding spot…",
      steps: 1,
      onStep: () => {
        setHidden(null, { force: true });
        state.turn += 1;
        updateUI();
        pendingMoveTimeoutId = setTimeout(() => {
          pendingMoveTimeoutId = null;
          if (!state.isAlive || state.hasEscaped) return;
          movePlayer(roomId, isRun, { skipUnhide: true });
        }, ACTION_LOCK_MS);
      },
    });
    return;
  }
  state.playerPath = path.slice(1);
  state.playerTravelMode = isRun ? "run" : "sneak";
  state.playerTravelTotal = state.playerPath.length;
  startPlayerTravelStep();
  state.selectedRoom = roomId;
  updateUI();
  updateMovementAudioState();
}

function setRoutePreview(roomId) {
  if (!state.isAlive || state.hasEscaped) return;
  if (isActionLocked()) return;
  state.routePreviewRoom = roomId;
  updateMap();
}

function setSelectedRoom(roomId) {
  if (!state.isAlive || state.hasEscaped) return;
  if (isActionLocked()) return;
  state.selectedRoom = roomId;
  updateUI();
}

function startPlayerTravelStep() {
  const isRun = state.playerTravelMode === "run";
  state.playerTravelStepStart = Date.now();
  state.playerTravelStepDuration = (isRun ? 1 : 2) * TICK_MS;
}

function startRobotTravelStep() {
  const ticks = Math.floor(Math.random() * 2) + 2;
  let adjusted = ticks;
  if (state.robotMood === "irritated") {
    adjusted = Math.max(1, ticks - 1);
  }
  if (state.robotMood === "cautious") {
    adjusted = ticks + 1;
  }
  if (state.robotMood === "confident") {
    adjusted = Math.max(1, ticks - 0.5);
  }
  state.robotTravelStepStart = Date.now();
  state.robotTravelStepDuration = adjusted * TICK_MS;
}

function moveSelected(isRun) {
  if (isActionLocked()) return;
  if (state.selectedRoom === null) return;
  movePlayer(state.selectedRoom, isRun);
  if (isRun && state.introStep === "highlight-run" && state.playerPath.length > 0) {
    state.introStep = "await-escape";
    updateUI();
  }
}

function clearSelectedRoom() {
  state.selectedRoom = null;
  state.escapeMapSelected = false;
  state.escapeRunPrompted = false;
  updateUI();
}

function clearMapTarget() {
  state.mapTargetMode = null;
  state.mapTargetSourceRoom = null;
  state.mapTargetSelection = null;
  state.routePreviewRoom = null;
}

function beginMapTarget(type) {
  if (!state.isAlive || state.hasEscaped) return;
  if (state.objectiveBlocked || isActionLocked()) return;
  state.mapTargetMode = type;
  state.mapTargetSourceRoom = state.playerRoom;
  state.mapTargetSelection = null;
  state.selectedRoom = null;
  state.routePreviewRoom = null;
  openMap();
  updateUI();
}

function getMapTargetCandidates() {
  if (!state.mapTargetMode) return null;
  const source = state.mapTargetSourceRoom ?? state.playerRoom;
  const adjacent = roomConnections[source] || [];
  if (state.mapTargetMode === "noise") {
    return new Set([source, ...adjacent]);
  }
  if (state.mapTargetMode === "jam") {
    const valid = adjacent.filter((roomId) => {
      if (rooms[roomId].isExit || rooms[source].isExit) return false;
      return !isEdgeJammed(source, roomId);
    });
    return new Set(valid);
  }
  if (state.mapTargetMode === "unjam") {
    const valid = adjacent.filter((roomId) => {
      const key = edgeKey(source, roomId);
      return state.permaJammedEdges.has(key);
    });
    return new Set(valid);
  }
  return null;
}

function getMapTargetCandidatesForBlowtorch() {
  const source = state.playerRoom;
  const adjacent = roomConnections[source] || [];
  const valid = adjacent.filter((roomId) => state.permaJammedEdges.has(edgeKey(source, roomId)));
  return new Set(valid);
}

function getMapNavigationCandidates() {
  if (state.mapTargetMode) {
    const targets = getMapTargetCandidates();
    return targets ? Array.from(targets) : [];
  }
  return rooms.map((room) => room.id);
}

function getDirectionalMapSelection(originId, direction, candidates) {
  if (originId === null || originId === undefined) return null;
  const origin = mapPositions[originId];
  if (!origin) return null;
  let best = null;
  let bestScore = Number.POSITIVE_INFINITY;
  candidates.forEach((roomId) => {
    if (roomId === originId) return;
    const target = mapPositions[roomId];
    if (!target) return;
    const dx = target.x - origin.x;
    const dy = target.y - origin.y;
    if (direction === "up" && dy >= 0) return;
    if (direction === "down" && dy <= 0) return;
    if (direction === "left" && dx >= 0) return;
    if (direction === "right" && dx <= 0) return;
    const score = direction === "up" || direction === "down"
      ? Math.abs(dy) + Math.abs(dx) * 1.5
      : Math.abs(dx) + Math.abs(dy) * 1.5;
    if (score < bestScore) {
      bestScore = score;
      best = roomId;
    }
  });
  return best;
}

function navigateMapSelection(direction) {
  if (!dom.mapPanel?.classList.contains("active")) return false;
  const candidates = getMapNavigationCandidates();
  if (candidates.length === 0) return false;
  const originId = state.mapTargetSelection ?? state.selectedRoom ?? state.mapTargetSourceRoom ?? state.playerRoom;
  const nextId = getDirectionalMapSelection(originId, direction, candidates);
  if (nextId === null || nextId === undefined) return false;
  handleMapSelection(nextId);
  return true;
}

function handleMapSelection(roomId) {
  const isExitRoom = rooms[roomId].isExit;
  if (state.introStep === "highlight-escape" && isExitRoom) {
    state.introStep = "highlight-run";
  }
  if (state.mapTargetMode) {
    const targets = getMapTargetCandidates();
    if (!targets || !targets.has(roomId)) return;
    state.mapTargetSelection = roomId;
    updateUI();
    return;
  }
  state.escapeMapSelected = isExitRoom;
  if (state.currentNight === 1) {
    state.escapeRunPrompted = isExitRoom;
    if (isExitRoom && !state.runHighlightConsumed) {
      state.runHighlightActive = true;
      state.runHighlightConsumed = true;
    }
  }
  setRoutePreview(roomId);
  setSelectedRoom(roomId);
}

function executeMapTargetAction(target, mode) {
  if (state.objectiveBlocked || isActionLocked()) return;
  clearMapTarget();
  closeMap();
  if (mode === "noise") {
    deployNoiseLure(target);
  } else if (mode === "jam") {
    deployDoorJam(target);
  } else if (mode === "unjam") {
    useBlowtorch(target);
  }
}

function handleMapMove(isRun) {
  if (state.mapTargetMode) {
    if (isRun) {
      closeMap();
      return;
    }
    if (state.mapTargetSelection === null) {
      pushStatus("Select a deployment target first.", 2);
      return;
    }
    const target = state.mapTargetSelection;
    executeMapTargetAction(target, state.mapTargetMode);
    return;
  }
  if (
    isRun &&
    state.currentNight === 1 &&
    state.escapeConsoleInspected &&
    !state.runAcknowledgedNightOne
  ) {
    state.runAcknowledgedNightOne = true;
  }
  moveSelected(isRun);
}

function cancelMovement() {
  if (pendingMoveTimeoutId) {
    clearTimeout(pendingMoveTimeoutId);
    pendingMoveTimeoutId = null;
  }
  if (state.playerPath.length > 0 || state.playerTravelStepStart !== null) {
    state.playerPath = [];
    state.playerTravelTotal = 0;
    state.playerTravelStepStart = null;
    state.playerTravelStepDuration = 0;
  }
  clearMapTarget();
  state.routePreviewRoom = null;
  state.selectedRoom = null;
  updateUI();
  updateMovementAudioState();
}

function collectItem(roomId, { force = false } = {}) {
  if (isActionLocked() && !force) return;
  if (state.hidden) return;
  const room = rooms[roomId];
  if (room.item && !hasInventoryItem(room.item)) {
    addInventoryItem(room.item);
    const profile = getNightProfile();
    const noiseRisk = getRoomNoiseRisk(roomId);
    const strength = (0.18 + noiseRisk * 0.12) * profile.signalStrength.sneak;
    registerSignal(roomId, strength, { type: "loot", lastKnownChance: 0.16 });
  }
  updateUI();
}

function startCollectItem(roomId) {
  const room = rooms[roomId];
  if (!room?.item) return;
  runLockedAction({
    label: `Collecting ${room.item}…`,
    steps: 1,
    onStep: () => {
      recordMeaningfulAction();
      pulseActionSignal(roomId, "quiet");
      state.turn += 1;
      collectItem(roomId, { force: true });
    },
  });
}

function collectSpecialPickup(roomId, { force = false } = {}) {
  if (isActionLocked() && !force) return;
  if (state.hidden) return;
  const itemName = state.specialPickups.get(roomId);
  if (!itemName || hasCollectedTool(itemName)) return;
  if (DEPLOYABLE_ITEMS.has(itemName)) {
    if (itemName === "Noise Lure") {
      state.deployableUnlocks.noiseLure = true;
      state.noiseLureCharges += 3;
    } else if (itemName === "Door Jam") {
      state.deployableUnlocks.doorJam = true;
      state.doorJamCharges += 2;
    }
  } else {
    state.toolCollected.add(itemName);
    addInventoryItem(itemName);
  }
  state.specialPickups.delete(roomId);
  if (itemName === "Pulse Scanner") {
    state.unlocks.allowScannerToggle = true;
    state.scannerOn = false;
    state.scannerHighlight = true;
  }
  const pickupDetail = getCaitPickupDetail(itemName);
  if (pickupDetail) {
    showObjectiveModal(pickupDetail);
  }
  updateUI();
}

function collectSchematic(roomId, { force = false } = {}) {
  if (isActionLocked() && !force) return;
  if (state.hidden) return;
  const room = rooms[roomId];
  if (!state.unlocks.allowCrafting && state.missionType !== MISSION_TYPES.DATA) {
    pushStatus("You note the diagram, but you can't assemble it yet.", 3);
    return;
  }
  if (state.objectiveItemInstalled && room.schematic === state.requiredEscapeSchematic) {
    return;
  }
  const isDataFragment = state.missionType === MISSION_TYPES.DATA &&
    room.schematic === DATA_FRAGMENT_SCHEMATIC;
  if (room.schematic && !isDataFragment && !state.foundSchematics.has(room.schematic)) {
    state.foundSchematics.add(room.schematic);
  }
  if (room.schematic) {
    const profile = getNightProfile();
    const strength = 0.2 * profile.signalStrength.sneak;
    registerSignal(roomId, strength, { type: "scan", lastKnownChance: 0.12 });
  }
  if (state.missionType === MISSION_TYPES.DATA) {
    if (!state.dataFragmentsFound.has(roomId)) {
      state.dataFragmentsFound.add(roomId);
      if (state.dataFragmentsFound.size >= state.dataFragmentsNeeded) {
        state.objectiveItemName = "Lock Override Module";
        state.objectiveItemCrafted = true;
        pushStatus("Lock Override Module assembled from fragments.", 3);
      }
      updateEscapeReadiness();
    }
  }
  updateUI();
}

function startSpecialPickup(roomId) {
  const itemName = state.specialPickups.get(roomId);
  if (!itemName) return;
  runLockedAction({
    label: `Collecting ${itemName}…`,
    steps: 1,
    onStep: () => {
      recordMeaningfulAction();
      pulseActionSignal(roomId, "quiet");
      state.turn += 1;
      collectSpecialPickup(roomId, { force: true });
    },
  });
}

function shouldPlayTypingSfxForDataFragment(roomId) {
  if (state.missionType !== MISSION_TYPES.DATA) return false;
  if (!state.escapeConsoleInspected) return false;
  const room = rooms[roomId];
  if (!room?.schematic) return false;
  return !state.dataFragmentsFound.has(roomId);
}

async function startSchematicScan(roomId, event) {
  if (!audioUnlockedOnce) {
    const unlocked = await ensureAudioUnlockedFromGesture(event);
    if (!unlocked) return;
  }
  const actionRunner = shouldPlayTypingSfxForDataFragment(roomId)
    ? runLockedActionWithTypingSfx
    : runLockedAction;
  actionRunner({
    label: "Scanning schematic…",
    steps: 1,
    onStep: () => {
      recordMeaningfulAction();
      pulseActionSignal(roomId, "quiet");
      state.turn += 1;
      collectSchematic(roomId, { force: true });
    },
  });
}

async function startEscapeConsoleInspect(event) {
  if (state.requiredPickup?.blocksEscapeConsole && !isRequiredPickupComplete()) {
    const pickupName = state.requiredPickup?.itemName ?? "tool";
    showObjectiveModal(formatCaitLine(getCaitLine("pickupHold"), { pickupName }));
    return;
  }
  if (
    state.objectiveBlocksEscapeConsole &&
    state.requiredEscapeSchematic &&
    !state.objectiveItemInstalled &&
    !state.foundSchematics.has(state.requiredEscapeSchematic)
  ) {
    showObjectiveModal(
      formatCaitLine(getCaitLine("escapeSchematicHold"), { schematic: state.requiredEscapeSchematic })
    );
    return;
  }
  if (!audioUnlockedOnce) {
    const unlocked = await ensureAudioUnlockedFromGesture(event);
    if (!unlocked) return;
  }
  runLockedActionWithTypingSfx({
    label: "Inspecting console…",
    steps: 1,
    onStep: () => {
      recordMeaningfulAction();
      state.turn += 1;
      revealEscapeSchematic();
    },
  });
}

function startStabilizeSystem(target) {
  runLockedAction({
    label: `Stabilizing ${target.room}…`,
    steps: 1,
    onStep: () => {
      recordMeaningfulAction();
      state.turn += 1;
      stabilizeSystem(target);
    },
  });
}

async function startAlignManualOverride(roomId, event) {
  if (!audioUnlockedOnce) {
    const unlocked = await ensureAudioUnlockedFromGesture(event);
    if (!unlocked) return;
  }
  if (audioUnlockedOnce) {
    startTypingAudio(ACTION_LOCK_MS);
  }
  runLockedActionWithTypingSfx({
    label: "Aligning override node…",
    steps: 1,
    onStep: () => {
      recordMeaningfulAction();
      state.turn += 1;
      alignManualOverride(roomId);
    },
  });
}

function hideSpotKey(roomId, spot) {
  return `${roomId}:${spot}`;
}

function isHideSpotUsed(roomId, spot) {
  return (state.hideHistory.get(hideSpotKey(roomId, spot)) || 0) > 0;
}

function isHideSpotLearned(roomId, spot) {
  if (!spot) return false;
  return state.learnedHidingSpots.has(hideSpotKey(roomId, spot));
}

function recordHideSuccess(roomId, spot) {
  const key = hideSpotKey(roomId, spot);
  const hideCount = state.hideHistory.get(key) || 0;
  const nextCount = hideCount + 1;
  state.hideHistory.set(key, nextCount);
  if (nextCount >= 3 && !state.learnedHidingSpots.has(key)) {
    state.learnedHidingSpots.add(key);
    pushStatus("The robot hesitates… then checks the console.", 4);
    state.burnedHidingSpots.add(key);
    state.runMoments.push("The robot adapted to your hiding habits.");
  }
}

function resolvePendingHide() {
  return;
}

function setHidden(spot, { force = false } = {}) {
  if (!state.isAlive || state.hasEscaped) return;
  if (isActionLocked() && !force) return;
  if (!spot) {
    state.hidden = false;
    state.hiddenSpot = null;
    state.sawPlayerHide = false;
    state.hiddenTurns = 0;
    state.pendingHide = null;
    state.hideEncounteredRobotInRoom = false;
    state.hideSpotArmKey = null;
    updateUI();
    return;
  }
  state.hidden = true;
  state.hiddenSpot = spot;
  state.hiddenTurns = 0;
  state.hideEncounteredRobotInRoom = false;
  state.hideSpotArmKey = hideSpotKey(state.playerRoom, spot);
  if (!state.pendingHide ||
    state.pendingHide.roomId !== state.playerRoom ||
    state.pendingHide.spot !== spot) {
    state.pendingHide = { roomId: state.playerRoom, spot, startedTurn: state.turn };
  }
  state.sawPlayerHide = state.robotRoom === state.playerRoom && state.robotLookTurns > 0;
  if (state.burnedHidingSpots.has(`${state.playerRoom}:${spot}`)) {
    registerSignal(state.playerRoom, 0.25, { type: "hide", lastKnownChance: 0.2 });
  }
  if (state.sawPlayerHide) {
    registerSignal(state.playerRoom, 0.18, { type: "hide-seen", lastKnownChance: 0.25 });
  }
  updateUI();
}

function startHideAction(spot) {
  if (!state.isAlive || state.hasEscaped) return;
  if (isActionLocked()) return;
  if (!spot) {
    if (!state.hidden) return;
    playSneakBurst();
    runLockedAction({
      label: "Leaving hiding spot…",
      steps: 1,
      onStep: () => {
        recordMeaningfulAction();
        setHidden(null, { force: true });
        state.turn += 1;
        updateUI();
      },
    });
    return;
  }
  const switching = state.hidden && state.hiddenSpot !== spot;
  const label = switching ? "Shifting hiding spot…" : "Hiding…";
  playSneakBurst();
  runLockedAction({
    label,
    steps: 1,
    onStep: () => {
      recordMeaningfulAction();
      setHidden(spot, { force: true });
      state.turn += 1;
      updateUI();
    },
  });
}

function toggleScanner() {
  if (isActionLocked()) return false;
  if (!state.unlocks.allowScannerToggle) {
    const unlockNight = getNextUnlockNightFromNow("allowScannerToggle");
    pushStatus(
      unlockNight ? `Scanner locked (Night ${unlockNight}).` : "Scanner locked.",
      3
    );
    return false;
  }
  if (!hasCollectedTool("Pulse Scanner")) {
    pushStatus("Pulse Scanner not collected.", 3);
    return false;
  }
  state.scannerOn = !state.scannerOn;
  state.scannerHighlight = false;
  if (state.scannerOn) {
    const profile = getNightProfile();
    const weatherMods = getWeatherModifiers();
    registerSignal(
      state.playerRoom,
      SCANNER_TOGGLE_SPIKE * profile.signalStrength.device,
      { type: "scanner", lastKnownChance: 0.18 }
    );
    state.scanFocusRoom = pickScannerFocusRoom();
    state.scanPulseTicks = weatherMods.scannerFog ? 1 : 2;
    pushStatus("Scanner hums. Static crawls outward.", 3);
  } else {
    state.scanPulseTicks = 0;
    state.scanFocusRoom = null;
    pushStatus("The hum dies. The room feels quieter.", 3);
  }
  return true;
}

function handleAction(action) {
  if (!state.isAlive || state.hasEscaped) return;
  if (state.objectiveBlocked || isActionLocked()) return;
  if (action === "hide") {
    const room = rooms[state.playerRoom];
    startHideAction(room.hideSpots[0]);
  }

  if (action === "scan-toggle" || action === "noise") {
    if (action === "noise" && !state.unlocks.allowNoiseLure) {
      const unlockNight = getNextUnlockNightFromNow("allowNoiseLure");
      pushStatus(
        unlockNight ? `Noise Lure unlocks on Night ${unlockNight}.` : "Noise Lure locked.",
        3
      );
      return;
    }
    if (action === "noise" && !isDeployableUnlocked("noiseLure")) {
      pushStatus("Noise Lure locked. Complete the objective to unlock it.", 3);
      return;
    }
    if (action === "noise" && state.noiseLureCharges <= 0) return;
    if (action === "scan-toggle") {
      const toggled = toggleScanner();
      if (!toggled) return;
      state.turn += 1;
      updateUI();
      return;
    } else {
      beginMapTarget("noise");
      return;
    }
  }
}

function useDevice(type, targetRoom = null) {
  const profile = getNightProfile();
  const effects = getPassiveEffects();
  const history = state.usedDevices.get(type) || [];
  history.push(state.turn);
  state.usedDevices.set(type, history.slice(-4));

  let fatigueLevel = deviceLearned(type, profile.deviceFatigue);
  if (fatigueLevel > 0 && effects.fatigueReliefChance > 0 && Math.random() < effects.fatigueReliefChance) {
    fatigueLevel = Math.max(0, fatigueLevel - 1);
  }
  const strengthMultiplier = fatigueLevel === 2 ? 0.35 : fatigueLevel === 1 ? 0.6 : 1;
  const durationPenalty = fatigueLevel > 0 ? 1 : 0;
  if (fatigueLevel > 0 && state.turn - state.lastDeviceFatigueTick > 3) {
    pushStatus("It ignores the familiar signal.", 3);
    state.lastDeviceFatigueTick = state.turn;
  }

  let diversion = targetRoom;
  if (diversion === null || diversion === undefined) {
    const availableRooms = rooms
      .filter((room) => room.id !== state.playerRoom)
      .map((room) => room.id);
    diversion = availableRooms[Math.floor(Math.random() * availableRooms.length)];
  }
  setRobotFocus(diversion, { reason: "device" });
  applyRobotPause("distract");
  if (type === "noise") {
    state.noiseLureCharges = Math.max(0, state.noiseLureCharges - 1);
    registerSignal(diversion, 0.4 * profile.signalStrength.device * strengthMultiplier * effects.signalSpike, {
      type: "noise",
      forceLastKnown: true,
      bleed: true,
    });
    const decoyDelay = Math.max(1, 2 - durationPenalty);
    scheduleSignal(
      diversion,
      0.5 * profile.signalStrength.device * strengthMultiplier * effects.signalSpike,
      decoyDelay,
      {
        type: "decoy",
        forceLastKnown: true,
        bleed: true,
      }
    );
    const lingerDuration = Math.max(0, 2 - durationPenalty + effects.persistentBonus);
    if (lingerDuration > 0) {
      state.persistentSignals.set(diversion, lingerDuration);
    }
    state.robotFocusLinger = Math.max(state.robotFocusLinger, 2 - durationPenalty);
    if (state.currentNight >= 5 && fatigueLevel > 0) {
      const agitation = state.currentNight >= 7 ? 0.25 : 0.15;
      state.threat = Math.min(5, state.threat + agitation);
      const moodChance = state.currentNight >= 7 ? 0.55 : 0.35;
      if (Math.random() < moodChance) {
        setRobotMood("irritated", 3);
      }
      if (state.robotDormant > 0) {
        const reduction = state.currentNight >= 7 ? 2 : 1;
        state.robotDormant = Math.max(0, state.robotDormant - reduction);
      }
    }
  }
}

function deployNoiseLure(targetRoom) {
  if (!isDeployableUnlocked("noiseLure")) return;
  if (state.noiseLureCharges <= 0) return;
  runLockedAction({
    label: "Deploying noise lure…",
    steps: 1,
    onStep: () => {
      recordMeaningfulAction();
      pulseActionSignal(state.playerRoom, "trace");
      useDevice("noise", targetRoom);
      state.turn += 1;
      updateUI();
    },
  });
}

function deviceLearned(type, fatigue = 1) {
  const history = state.usedDevices.get(type) || [];
  const recentUses = history.filter((turn) => state.turn - turn <= 4);
  const partial = Math.ceil(2 * fatigue);
  const full = Math.ceil(3 * fatigue);
  if (recentUses.length >= full) return 2;
  if (recentUses.length >= partial) return 1;
  return 0;
}

function isRobotTraveling() {
  return state.robotPath.length > 0 || state.robotTravelStepStart !== null;
}

function advanceRobot() {
  if (state.robotDisabled) return;
  if (state.robotDormant > 0) {
    state.robotDormant -= 1;
    return;
  }

  if (isRobotTraveling()) {
    return;
  }

  handleRobotFocusArrival();

  if (!state.robotMovedThisTick) {
    if (isAlarmTriggered(state.robotRoom)) {
      recordRobotAlarmVisit(state.robotRoom);
      state.robotAlarmStreak += 1;
    } else {
      state.robotAlarmStreak = 0;
    }
  }

  if (runRobotTask()) {
    return;
  }

  if (shouldForceAlarmBreak()) {
    if (forceAlarmBreak()) {
      return;
    }
  }

  if (state.robotInvestigateTurns > 0) {
    const confidence = Math.max(state.robotTargetConfidence, getRoomConfidence(state.robotRoom));
    const shouldNudgeSweep = state.robotInvestigateTurns % INVESTIGATE_MOVE_INTERVAL === 0
      || confidence >= INVESTIGATE_CONFIDENCE_MOVE
      || state.robotInvestigateTurns >= INVESTIGATE_FORCED_MOVE_TURNS;
    if (shouldNudgeSweep && state.robotSweepQueue.length === 0) {
      buildSweepQueue(state.robotRoom);
    }
    if (state.robotSweepQueue.length > 0) {
      const nextSweep = state.robotSweepQueue.shift();
      if (nextSweep !== undefined) {
        state.robotInvestigateTurns = Math.max(0, Math.min(state.robotInvestigateTurns, INVESTIGATE_MAX_TURNS) - 1);
        state.robotPath = [nextSweep];
        startRobotTravelStep();
        setRobotMode("sweep");
        return;
      }
    }
    state.robotInvestigateTurns = Math.min(state.robotInvestigateTurns, INVESTIGATE_MAX_TURNS) - 1;
    setRobotMode("investigate");
    return;
  }

  if (state.robotLinger > 0) {
    state.robotLinger -= 1;
    setRobotMode("hunt");
    return;
  }

  if (state.robotRoom === state.playerRoom && state.hidden && getRoomConfidence(state.playerRoom) >= 0.8) {
    startSearchCycle();
  }

  if (state.robotSearchTurns > 0) {
    state.robotSearchTurns -= 1;
    if (Math.random() < 0.25) {
      updateRobotSearchSpot(pickSearchSpot());
    }
    if (state.robotSearchTurns === 0) {
      applyRobotPause("failed");
      setRobotMood("irritated", 4);
      applyRoomStress(state.robotRoom);
      maybeStartRobotTask("failed");
    }
    setRobotMode("search");
    return;
  }

  if (state.robotLookTurns > 0) {
    state.robotLookTurns -= 1;
    if (state.robotScanTarget === null) {
      const options = roomConnections[state.robotRoom];
      state.robotScanTarget = options[Math.floor(Math.random() * options.length)];
    }
    setRobotMode("search");
    return;
  }

  const profile = getNightProfile();
  const strongWindow = state.robotMood === "confident" ? profile.trailStaleness + 2 : profile.trailStaleness + 1;
  const hasRecentStrongSignal = state.turn - state.lastStrongSignalTick <= strongWindow;
  const baseThreshold = profile.prediction.confidence;
  const confidenceThreshold = state.robotMood === "irritated" ? baseThreshold - 0.05 : baseThreshold;
  const cautiousThreshold = state.robotMood === "cautious" ? baseThreshold + 0.1 : confidenceThreshold;
  const commitAllowed = state.robotTargetConfidence >= cautiousThreshold && hasRecentStrongSignal;
  if (state.robotSweepQueue.length > 0) {
    const nextSweep = state.robotSweepQueue.shift();
    if (nextSweep !== undefined) {
      state.robotPath = [nextSweep];
      startRobotTravelStep();
      setRobotMode("sweep");
      return;
    }
  }

  let target = pickRobotTarget();
  if (
    target !== null &&
    isAlarmTriggered(state.robotRoom) &&
    isAlarmTriggered(target) &&
    Math.random() < 0.6
  ) {
    const redirect = pickNonAlarmedNeighbor(state.robotRoom) ?? pickHighestPressureNonAlarmedRoom();
    if (redirect !== null && redirect !== undefined) {
      target = redirect;
    }
  }
  const confidence = target === null ? 0 : getRoomConfidence(target);
  const aggressive = state.threat >= 3;
  const chance = confidence >= 0.4 ? 0.5 : 0.85;
  const willMoveToward = target !== null && (aggressive || Math.random() > chance);

  if (willMoveToward && target !== null) {
    if (target === state.robotRoom) {
      state.robotInvestigateTurns = Math.floor(Math.random() * 3) + 3;
      buildSweepQueue(state.robotRoom);
      setRobotMode("investigate");
      return;
    }
    state.robotPlannedTarget = target;
    state.robotTargetConfidence = confidence;
    state.robotInvestigateTurns = 0;
    state.robotSweepQueue = [];
    state.robotPath = getShortestPath(state.robotRoom, target).slice(1);
    if (commitAllowed) {
      startRobotTravelStep();
      if (!state.robotLockOnPlayed && state.robotTargetConfidence >= 0.7) {
        playSfx(dom.robotLockOnAudio, "robot-lock-on", {
          volume: ROBOT_SFX_VOLUMES.lockOnTone,
        });
        state.robotLockOnPlayed = true;
      }
    } else {
      state.robotLinger = Math.floor(Math.random() * 3) + 2;
    }
    state.robotLookTurns = Math.floor(Math.random() * 3) + 2;
    state.robotScanTarget = null;
    setRobotMode(commitAllowed ? "hunt" : "investigate");
  } else {
    state.robotPlannedTarget = null;
    state.robotTargetConfidence = 0;
    if (shouldPlanDoubleBack()) {
      if (planDoubleBack()) {
        return;
      }
    }
    const avoidAlarmLoop = isAlarmTriggered(state.robotRoom);
    const roamRooms = roomConnections[state.robotRoom].filter((id) => id !== state.robotRoom);
    const roamOptions = avoidAlarmLoop
      ? roamRooms.filter((id) => !isAlarmTriggered(id))
      : roamRooms;
    const fallbackOptions = roamOptions.length > 0
      ? roamOptions
      : roamRooms.filter((id) => !(id === state.robotLastRoom && isAlarmTriggered(id)));
    if (Math.random() < 0.4 && roamOptions.length > 0) {
      const roamTarget = (fallbackOptions.length > 0
        ? fallbackOptions
        : roamRooms
      )[Math.floor(Math.random() * (fallbackOptions.length > 0 ? fallbackOptions.length : roamRooms.length))];
      state.robotPath = [roamTarget];
      startRobotTravelStep();
    }
    state.robotLinger = Math.floor(Math.random() * 6) + 4;
    state.robotScanTarget = null;
    setRobotMode("hunt");
  }

  if (state.robotRoom === state.playerRoom && state.robotFocus) {
    clearRobotFocus("caught");
  }

  markRoomChecked(state.robotRoom);
}

function handleFlameSawThreatWindow() {
  if (state.currentNight !== 10 || !state.hasFlameSaw || state.robotKilled) {
    state.robotKillGrace = 0;
    return false;
  }
  if (state.flameSawFinaleActive || isFlameSawFinaleMiniGame(state.miniGame?.id)) {
    return true;
  }
  if (state.robotRoom !== state.playerRoom) {
    state.robotKillGrace = 0;
    return false;
  }
  if (state.robotKillGrace <= 0) {
    state.robotKillGrace = 2;
    pushStatus("It looms— close enough to cut.", 3);
    adjustSanity(-0.05, "flamesaw");
    state.threat = Math.min(5, state.threat + 0.4);
    return true;
  }
  state.robotKillGrace -= 1;
  if (state.robotKillGrace <= 0) {
    triggerDeath();
  }
  return true;
}

function checkThreat() {
  if (state.robotDisabled) return;
  if (state.robotRoom !== state.playerRoom) return;
  if (handleFlameSawThreatWindow()) return;
  if (state.hidden && state.robotLookTurns > 0 && state.sanityScanCooldown <= 0) {
    adjustSanity(-0.08, "scan");
    state.sanityScanCooldown = 4;
  }
  if (state.robotSearchTurns > 0) {
    if (
      !state.hidden ||
      (
        state.hidden &&
        state.hiddenSpot === state.robotSearchSpot &&
        (state.sawPlayerHide || isHideSpotUsed(state.playerRoom, state.hiddenSpot))
      )
    ) {
      attemptKill();
    }
    return;
  }

  if (state.hidden) {
    state.robotLookTurns = Math.max(state.robotLookTurns, 1);
    const reused = isHideSpotUsed(state.playerRoom, state.hiddenSpot);
    const seen = state.sawPlayerHide;
    const confidence = getRoomConfidence(state.playerRoom);
    if (seen || reused || confidence >= 0.85) {
      startSearchCycle();
    }
    return;
  }

  const signal = state.roomSignals.get(state.playerRoom) || 0;
  const baseChance = 0.7;
  const profile = getNightProfile();
  const killChance = Math.min(0.9, baseChance * profile.killAggression + signal * 0.3);
  const killed = Math.random() < killChance;
  if (killed) {
    triggerDeath();
  } else {
    state.threat = Math.min(5, state.threat + 0.5);
    if (Math.random() < 0.5) {
      state.robotLinger = Math.floor(Math.random() * 3) + 1;
    }
    applyRobotPause("failed");
    setRobotMood("confident", 4);
  }
}

function attemptKill() {
  if (handleFlameSawThreatWindow()) return;
  const learned = state.hidden && isHideSpotLearned(state.playerRoom, state.hiddenSpot);
  const signal = state.roomSignals.get(state.playerRoom) || 0;
  const baseChance = state.hidden
    ? (state.sawPlayerHide ? (learned ? 0.45 : 0.28) : 0.01)
    : 0.7;
  const profile = getNightProfile();
  const killChance = Math.min(0.85, baseChance * profile.killAggression + signal * 0.4);
  if (Math.random() < killChance) {
    triggerDeath();
  } else if (Math.random() < 0.4) {
    state.robotLinger = Math.floor(Math.random() * 2) + 1;
    applyRobotPause("failed");
    setRobotMood("confident", 4);
  }
}

function triggerDeath() {
  if (state.godMode) {
    pushStatus("God mode: robot kill blocked.", 3);
    return;
  }
  state.isAlive = false;
  clearActionLock();
  closeMap();
  playSfx(dom.robotCaptureAudio, "robot-capture", {
    volume: ROBOT_SFX_VOLUMES.captureImpact,
  });
  fadeTrackTo("rain", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("fog", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("sunny", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("run", 0, RUN_AUDIO_FADE_OUT_MS);
  fadeTrackTo("sneak", 0, SNEAK_AUDIO_FADE_OUT_MS);
  dom.deathScreen.classList.add("active");
  dom.deathScreen.setAttribute("aria-hidden", "false");
}

function triggerFinalVictory() {
  if (!state.isAlive || state.hasEscaped) return;
  fadeTrackTo("rain", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("fog", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("sunny", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("run", 0, RUN_AUDIO_FADE_OUT_MS);
  fadeTrackTo("sneak", 0, SNEAK_AUDIO_FADE_OUT_MS);
  state.hasEscaped = true;
  state.completedNight = state.currentNight;
  state.dayCount += 1;
  state.threat = Math.min(5, state.threat + 0.4);
  updateVictoryTitle();
  updateNextNightButton();
  dom.victoryScreen.classList.add("active");
  dom.victoryScreen.setAttribute("aria-hidden", "false");
}

function buildEscape() {
  if (!state.isAlive || state.hasEscaped) return;
  if (!rooms[state.playerRoom].isExit || !state.escapeReady) return;
  fadeTrackTo("rain", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("fog", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("sunny", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("run", 0, RUN_AUDIO_FADE_OUT_MS);
  fadeTrackTo("sneak", 0, SNEAK_AUDIO_FADE_OUT_MS);
  state.hasEscaped = true;
  state.completedNight = state.currentNight;
  state.dayCount += 1;
  state.threat = Math.min(5, state.threat + 0.4);
  updateVictoryTitle();
  updateNextNightButton();
  dom.victoryScreen.classList.add("active");
  dom.victoryScreen.setAttribute("aria-hidden", "false");
}

function updateVictoryTitle() {
  if (!dom.victoryTitle) return;
  dom.victoryTitle.textContent = state.currentNight >= 2 ? "Breached Containment" : "Breached Exit";
}

function updateNextNightButton() {
  const isFinalNight = state.currentNight >= 11;
  dom.nextNightBtn.textContent = isFinalNight ? "Play Again" : "Continue";
}

function advanceNight() {
  const previousNight = state.currentNight;
  if (state.currentNight >= 11) {
    state.currentNight = 1;
  } else {
    state.currentNight = Math.min(11, state.currentNight + 1);
  }
  if (previousNight >= 11) {
    clearMetaFlags();
  }
  state.nightProfile = getNightProfile();
  state.unlocks = getUnlocks();
  const prevUnlocks = getUnlocksForNight(previousNight);
  const nextUnlocks = getUnlocksForNight(state.currentNight);
  let messages = listNewUnlockMessages(prevUnlocks, nextUnlocks);
  if (state.currentNight === 3) {
    messages = [];
  }
  state.skipNextObjectiveModal = false;
  resetGame({ preserveItems: true });
  messages.forEach((message) => {
    pushStatus(message, 4);
  });
}

function resetGame({ preserveItems = false } = {}) {
  const savedInventory = preserveItems ? new Map(state.inventory) : null;
  const savedToolCollected = preserveItems ? new Set(state.toolCollected) : null;
  const savedDeployableUnlocks = preserveItems ? { ...state.deployableUnlocks } : null;
  const savedDoorJams = preserveItems ? state.doorJamCharges : null;
  const savedNoiseLures = preserveItems ? state.noiseLureCharges : null;
  const savedVista = preserveItems ? state.vista : null;
  clearActionLock();
  closePanel(dom.craftMiniGame);
  closePanel(dom.miniGamePanel);
  if (pendingMoveTimeoutId) {
    clearTimeout(pendingMoveTimeoutId);
    pendingMoveTimeoutId = null;
  }
  fadeTrackTo("run", 0, RUN_AUDIO_FADE_OUT_MS);
  fadeTrackTo("sneak", 0, SNEAK_AUDIO_FADE_OUT_MS);
  fadeTrackTo("rain", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("fog", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("sunny", 0, AMBIENT_FADE_OUT_MS);
  runAudioActive = false;
  sneakAudioActive = false;
  runAudioTransitionToken += 1;
  sneakAudioTransitionToken += 1;
  if (runAudioStopTimeoutId) {
    clearTimeout(runAudioStopTimeoutId);
    runAudioStopTimeoutId = null;
  }
  if (sneakAudioStopTimeoutId) {
    clearTimeout(sneakAudioStopTimeoutId);
    sneakAudioStopTimeoutId = null;
  }
  state.playerRoom = 0;
  state.robotRoom = 0;
  state.hidden = false;
  state.hiddenSpot = null;
  state.pendingHide = null;
  state.hideEncounteredRobotInRoom = false;
  state.hideSpotArmKey = null;
  state.learnedHidingSpots.clear();
  state.hideHistory.clear();
  state.threat = 1;
  state.turn = 0;
  state.inventory.clear();
  state.foundSchematics.clear();
  state.objectiveItemName = null;
  state.objectiveItemCrafted = false;
  state.objectiveItemInstalled = false;
  state.objectiveBlocksEscapeConsole = false;
  state.completedObjectiveItems = new Set();
  state.craftMiniGameActive = false;
  state.craftMiniGame = null;
  state.miniGameActive = false;
  state.miniGame = null;
  state.nightObjectiveId = null;
  state.nightObjectiveComplete = false;
  state.robotKilled = false;
  state.hasFlameSaw = false;
  state.robotKillGrace = 0;
  state.usedDevices.clear();
  state.robotFocus = null;
  state.robotFocusTTL = 0;
  state.lastKnownPlayerRoom = null;
  state.trailTurns = 0;
  state.routePreviewRoom = null;
  state.selectedRoom = null;
  state.selectedSchematic = null;
  state.requiredEscapeSchematic = null;
  state.escapeReady = false;
  state.escapeConsoleInspected = false;
  state.tasksAcknowledgedNightOne = false;
  state.runAcknowledgedNightOne = false;
  state.runHighlightActive = false;
  state.runHighlightConsumed = false;
  state.liveAcknowledgedNightOne = false;
  state.liveEscapePrompted = false;
  state.manualOverrideNeeded = 0;
  state.manualOverrideTargets = new Set();
  state.manualOverridesDone = new Set();
  state.noiseLureCharges = 0;
  state.roomSignals.clear();
  state.checkedRooms.clear();
  state.robotLinger = 0;
  state.robotDormant = 0;
  state.robotRechargeCooldown = getRobotRechargeCooldown();
  state.robotSearchTurns = 0;
  state.robotSearchSpot = null;
  state.robotPlannedTarget = null;
  state.robotLookTurns = 0;
  state.robotScanTarget = null;
  state.robotInvestigateTurns = 0;
  state.robotSweepQueue = [];
  state.robotCheckedCooldown.clear();
  state.robotPresenceHeat.clear();
  state.robotAlarmVisits.clear();
  state.robotSfxCooldowns.clear();
  state.robotAlarmStreak = 0;
  state.robotAlarmLoopEdge = null;
  state.robotAlarmLoopTurns = 0;
  state.robotMovedThisTick = false;
  state.robotMode = "idle";
  state.robotTargetConfidence = 0;
  state.robotSweepCooldown = 0;
  state.robotPredictionCooldown = 0;
  state.robotMood = null;
  state.robotMoodTicks = 0;
  state.robotLockOnPlayed = false;
  state.robotLastRoom = null;
  resetGoofingState();
  state.nightProfile = getNightProfile();
  state.unlocks = getUnlocks();
  state.completedNight = null;
  state.sawPlayerHide = false;
  state.robotDisabled = true;
  state.alertTicks = 0;
  state.statusMessage = "";
  state.statusTicks = 0;
  state.bannerMessage = "";
  state.bannerTicks = 0;
  state.thoughtMessage = "";
  state.thoughtTicks = 0;
  state.playerPath = [];
  state.playerTravelMode = "sneak";
  state.playerTravelTotal = 0;
  state.playerTravelStepStart = null;
  state.playerTravelStepDuration = 0;
  state.robotPath = [];
  state.robotTravelStepStart = null;
  state.robotTravelStepDuration = 0;
  state.dayCount = 1;
  state.isAlive = true;
  state.hasEscaped = false;
  state.robotAlertQueued = false;
  state.robotAlertText = "";
  state.playerTrail = [state.playerRoom];
  state.signalDecayBoost.clear();
  state.rewireDampen.clear();
  state.lastStrongSignalTick = -999;
  state.lastStrongSignalRoom = null;
  state.lastKnownTick = -999;
  state.lastTrailBreakTick = -999;
  state.lastDeviceFatigueTick = -999;
  state.sneakStepsWithoutSignal = 0;
  state.turnsSinceStrongSignal = 0;
  state.directorCooldown = 0;
  state.pendingSignals = [];
  state.persistentSignals.clear();
  state.roomNoisePenalty.clear();
  state.burnedHidingSpots.clear();
  state.jammedEdges.clear();
  state.doorJamCharges = 0;
  state.missionType = MISSION_TYPES.ESCAPE;
  state.escapeMode = state.currentNight <= 3 ? "manual" : "fabricate";
  state.stabilizeTargets = [];
  state.stabilizedTargets = new Set();
  state.dataFragmentsNeeded = 0;
  state.dataFragmentsFound = new Set();
  state.robotTask = null;
  state.robotFocusLinger = 0;
  state.scanPulseTicks = 0;
  state.scanFocusRoom = null;
  state.scannerOn = false;
  state.scannerHighlight = false;
  state.alarmedRooms = new Set();
  state.triggeredAlarms = new Set();
  state.alarmTriggerTTL = new Map();
  state.disabledAlarmedRooms = new Set();
  state.alarmDisableProgress = new Map();
  state.alarmedRoomsRequired = 0;
  state.activeLures.clear();
  state.sunlitRooms.clear();
  state.specialPickups = new Map();
  state.requiredPickup = null;
  state.toolCollected = new Set();
  state.deployableUnlocks = { noiseLure: false, doorJam: false };
  state.nightIntroLine = null;
  state.storyQueue = [];
  state.objectiveHoldUntil = 0;
  state.containmentLineShown = false;
  state.weather = null;
  state.weatherAnnounced = false;
  state.surgeCountdown = null;
  state.surgeForeshadowed = false;
  state.surgeTargetRoom = null;
  state.surgeCharges = 0;
  state.surgeWarningActive = false;
  state.surgeWarningRoom = null;
  state.surgeWarningEndsAt = 0;
  state.surgeWarningLineShown = false;
  state.surgeMapFlashRoom = null;
  state.surgeMapFlashActive = false;
  state.vista = 0;
  state.hiddenTurns = 0;
  state.lastMoveType = "sneak";
  state.mapTargetMode = null;
  state.mapTargetSourceRoom = null;
  state.mapTargetSelection = null;
  state.unlocks = getUnlocks();
  state.permaJammedEdges = new Set();
  state.introStep = null;
  state.introSequenceActive = false;
  state.startRevealPending = false;
  state.introEscapeVisited = false;
  state.escapeMapSelected = false;
  state.escapeArrivalPrompted = false;
  state.escapeArrivalAcknowledged = false;
  if (!preserveItems) {
    state.lastNightSpawnedParts = new Set();
  }
  if (!state.unlocks.robotActive) {
    state.robotDisabled = true;
  }
  state.ohShitTriggered = false;
  state.sanity = 1;
  state.minSanity = 1;
  state.prevSanity = state.sanity;
  state.sanityGlitchCooldown = 0;
  state.sanityScanCooldown = 0;
  state.phantomCueShown = false;
  state.lastSanityRecoveryTick = -999;
  state.caitCooldown = 0;
  state.caitTalkCount = 0;
  state.caitQuietRoomId = null;
  state.caitQuietSeen = false;
  state.night11CreditsRolling = false;
  state.runMoments = [];
  state.runSummary = "";
  if (preserveItems) {
    savedInventory.forEach((count, item) => state.inventory.set(item, count));
    savedToolCollected.forEach((item) => state.toolCollected.add(item));
    state.deployableUnlocks = { ...savedDeployableUnlocks };
    state.doorJamCharges = savedDoorJams;
    state.noiseLureCharges = savedNoiseLures;
    state.vista = savedVista;
  }
  applyNightLayout();
  renderMap();
  setupMissionForNight();
  if (!isNight11()) {
    assignRoomFinds();
    announceWeather();
    configureRobotStart();
  } else {
    state.skipNextObjectiveModal = true;
  }
  dom.deathScreen.classList.remove("active");
  dom.deathScreen.setAttribute("aria-hidden", "true");
  dom.victoryScreen.classList.remove("active");
  dom.victoryScreen.setAttribute("aria-hidden", "true");
  closePanel(dom.robotAlertModal);
  if (dom.caitQuietModal) {
    closePanel(dom.caitQuietModal);
  }
  if (dom.creditsScreen) {
    dom.creditsScreen.classList.remove("active", "rolling");
    dom.creditsScreen.setAttribute("aria-hidden", "true");
  }
  updateUI();
  if (!state.skipNextObjectiveModal) {
    showObjectiveModal(getInitialObjectiveModalText());
  } else {
    state.skipNextObjectiveModal = false;
  }
}

function threatLabel() {
  if (state.threat < 2) return "Low";
  if (state.threat < 3) return "Elevated";
  if (state.threat < 4) return "Severe";
  return "Critical";
}

function formatDate(baseDate, dayCount) {
  const date = new Date(baseDate.getTime());
  date.setUTCDate(date.getUTCDate() + (dayCount - 1));
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).replace(",", "");
}

function registerSignal(roomId, strength, options = {}) {
  const profile = getNightProfile();
  const effects = getPassiveEffects();
  const weatherMods = getWeatherModifiers();
  const {
    type = "ambient",
    forceLastKnown = false,
    lastKnownChance = null,
    bleed = false,
  } = options;
  const current = state.roomSignals.get(roomId) || 0;
  const scaledStrength = strength * profile.confidenceGain * (weatherMods.signalStrength ?? 1);
  const next = Math.min(1, current + scaledStrength);
  state.roomSignals.set(roomId, next);
  if (
    !state.robotDisabled &&
    state.robotDormant > 0 &&
    (scaledStrength >= 0.35 || next >= 0.6)
  ) {
    state.robotDormant = Math.max(0, state.robotDormant - 1);
  }
  if (type === "sneak") {
    state.signalDecayBoost.set(
      roomId,
      Math.max(state.signalDecayBoost.get(roomId) || 0, profile.sneakDecayBoost)
    );
  }
  if (current < 0.6 && next >= 0.6) {
    pushBanner("Pressure spike in the halls.", 3);
  }
  const updateChance = (lastKnownChance ?? next) * profile.lastKnownChance;
  if (forceLastKnown || Math.random() < updateChance) {
    state.lastKnownPlayerRoom = roomId;
    state.lastKnownTick = state.turn;
    state.trailTurns = profile.trailStaleness;
  }
  if (scaledStrength >= 0.6 || next >= 0.7) {
    state.lastStrongSignalTick = state.turn;
    state.lastStrongSignalRoom = roomId;
  }
  if (
    state.robotFocus !== null &&
    roomId !== state.robotFocus &&
    (scaledStrength >= ROBOT_FOCUS_OVERRIDE_SIGNAL || next >= ROBOT_FOCUS_OVERRIDE_SIGNAL)
  ) {
    state.robotFocusTTL = Math.min(state.robotFocusTTL, 1);
  }
  logDebug("signal", {
    roomId,
    strength: scaledStrength,
    next,
    type,
    lastKnown: state.lastKnownPlayerRoom,
    forceLastKnown,
  });
  if (bleed) {
    const bleedBoost = ["decoy", "noise", "siren"].includes(type) ? effects.bleedBoost : 1;
    const bleedWeather = weatherMods.bleedMultiplier ?? 1;
    const neighbors = roomConnections[roomId] || [];
    neighbors.forEach((neighbor) => {
      scheduleSignal(
        neighbor,
        scaledStrength * 0.35 * bleedBoost * bleedWeather,
        1,
        { type: "bleed", lastKnownChance: 0.1 }
      );
    });
  }
  if (roomId !== state.robotRoom && next >= 0.4) {
    if (state.robotTask && scaledStrength < 0.25) {
      return;
    }
    interruptRobotTask(roomId);
  }
}

function decaySignals() {
  const profile = getNightProfile();
  const weatherMods = getWeatherModifiers();
  state.roomSignals.forEach((value, roomId) => {
    const boost = state.signalDecayBoost.get(roomId) || 0;
    const dampen = state.rewireDampen.get(roomId) || 0;
    const dampenDecay = dampen > 0 ? REWIRE_DAMPEN_DECAY : 0;
    const next = Math.max(
      0,
      value -
        profile.signalDecay * (weatherMods.signalDecay ?? 1) -
        boost * profile.confidenceDecay -
        dampenDecay
    );
    if (boost > 0) {
      const nextBoost = Math.max(0, boost - 0.02);
      if (nextBoost <= 0) {
        state.signalDecayBoost.delete(roomId);
      } else {
        state.signalDecayBoost.set(roomId, nextBoost);
      }
    }
    if (next === 0) {
      state.roomSignals.delete(roomId);
    } else {
      state.roomSignals.set(roomId, next);
    }
    if (roomId === state.lastKnownPlayerRoom && value >= 0.55 && next < 0.55) {
      applyRobotPause("lost");
      setRobotMood("cautious", 4);
      maybeStartRobotTask("lost");
    }
  });
}

function tickRewireDampen() {
  if (state.rewireDampen.size === 0) return;
  state.rewireDampen.forEach((turns, roomId) => {
    const next = turns - 1;
    if (next <= 0) {
      state.rewireDampen.delete(roomId);
    } else {
      state.rewireDampen.set(roomId, next);
    }
  });
}

function maybeExpireLastKnown() {
  if (state.lastKnownPlayerRoom === null) return;
  if (state.trailTurns > 0) return;
  const profile = getNightProfile();
  const strongCold = state.turn - state.lastStrongSignalTick > profile.trailStaleness + 1;
  const staleLastKnown = state.turn - state.lastKnownTick > profile.trailStaleness + 2;
  if (!strongCold || !staleLastKnown) return;
  state.lastKnownPlayerRoom = null;
  state.lastKnownTick = -999;
  state.robotTargetConfidence = Math.max(0, state.robotTargetConfidence - 0.2);
  state.robotLockOnPlayed = false;
  adjustSanity(0.05, "breather");
  if (state.turn - state.lastTrailBreakTick > 4) {
    pushStatus("The pressure fades.", 3);
    state.lastTrailBreakTick = state.turn;
  }
  if (state.currentNight <= 3) {
    state.threat = Math.max(1, state.threat - 0.15);
  }
}

function applyRobotPause(reason) {
  if (state.robotDisabled) return;
  const threatFactor = clamp(1 - (state.threat - 1) * 0.15, 0.4, 1);
  const skipChance = state.threat >= 4 ? 0.5 : 0.2;
  if (Math.random() < skipChance) return;
  let base = 2;
  if (reason === "failed") base = 3;
  if (reason === "lost") base = 2;
  if (reason === "distract") base = 2;
  if (reason === "blocked") base = 2;
  state.robotDormant = Math.max(state.robotDormant, Math.ceil(base * threatFactor));
}

function setRobotFocus(roomId, { ttl = ROBOT_FOCUS_TTL, linger = 0, reason = "signal" } = {}) {
  if (roomId === null || roomId === undefined) return;
  const sameRoom = state.robotFocus === roomId;
  state.robotFocus = roomId;
  state.robotFocusTTL = sameRoom ? Math.max(state.robotFocusTTL, ttl) : ttl;
  if (linger > 0) {
    state.robotFocusLinger = Math.max(state.robotFocusLinger, linger);
  }
  logDebug("robot-focus", { roomId, ttl, reason });
}

function clearRobotFocus(reason = "expired") {
  if (state.robotFocus === null) return;
  logDebug("robot-focus-clear", { roomId: state.robotFocus, reason });
  state.robotFocus = null;
  state.robotFocusTTL = 0;
  state.robotFocusLinger = 0;
}

function handleRobotFocusArrival() {
  if (state.robotFocus === null) return;
  if (state.robotRoom !== state.robotFocus) return;
  state.robotFocusTTL = Math.min(state.robotFocusTTL, ROBOT_FOCUS_ARRIVAL_LINGER);
  if (state.robotFocusTTL <= 0) {
    clearRobotFocus("arrived");
  }
}

function getRobotTaskChance() {
  if (state.currentNight <= 3) return 0.35;
  if (state.currentNight <= 6) return 0.22;
  if (state.currentNight <= 8) return 0.15;
  return 0.08;
}

function pickRobotTaskRoute() {
  const pool = rooms.filter((room) => !room.isExit).map((room) => room.id);
  const targets = [];
  const count = Math.floor(Math.random() * 2) + 2;
  while (targets.length < count && pool.length > 0) {
    const pick = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    if (pick !== state.robotRoom) {
      targets.push(pick);
    }
  }
  return targets;
}

function maybeStartRobotTask(reason) {
  if (state.robotTask || state.robotDisabled) return;
  const chance = getRobotTaskChance();
  if (Math.random() > chance) return;
  const turns = Math.floor(Math.random() * 4) + 3;
  state.robotTask = {
    type: "recalibrate",
    turnsRemaining: turns,
    route: pickRobotTaskRoute(),
  };
  pushStatus("The robot diverts to recalibrate.", 3);
  logDebug("robot-task", { reason, turns });
}

function hasStrongSignal() {
  if (state.turn - state.lastStrongSignalTick <= 2) return true;
  let strong = false;
  state.roomSignals.forEach((value) => {
    if (value >= 0.55) {
      strong = true;
    }
  });
  return strong;
}

function getRobotRechargeCooldown() {
  const base = ROBOT_RECHARGE_MIN_TURNS +
    Math.floor(Math.random() * (ROBOT_RECHARGE_MAX_TURNS - ROBOT_RECHARGE_MIN_TURNS + 1));
  const nightBias = state.currentNight <= 3 ? 2 : state.currentNight <= 6 ? 0 : -1;
  return Math.max(3, base + nightBias);
}

function runRobotTask() {
  if (!state.robotTask) return false;
  if (hasStrongSignal()) {
    state.robotTask = null;
    return false;
  }
  if (state.robotTask.turnsRemaining <= 0) {
    state.robotTask = null;
    return false;
  }
  const route = state.robotTask.route;
  if (!route || route.length === 0) {
    state.robotTask.route = pickRobotTaskRoute();
  }
  const nextTarget = state.robotTask.route[0];
  if (nextTarget === undefined) {
    state.robotTask = null;
    return false;
  }
  if (state.robotRoom === nextTarget) {
    state.robotTask.route.shift();
    state.robotTask.turnsRemaining -= 1;
    state.robotLinger = 1;
    setRobotMode("investigate");
    return true;
  }
  state.robotPath = getShortestPath(state.robotRoom, nextTarget).slice(1);
  if (state.robotPath.length > 0) {
    startRobotTravelStep();
  } else {
    state.robotTask.route.shift();
  }
  setRobotMode("investigate");
  return true;
}

function markRoomChecked(roomId) {
  state.robotCheckedCooldown.set(roomId, 6);
  state.robotPresenceHeat.set(roomId, 1);
}

function buildSweepQueue(roomId) {
  const profile = getNightProfile();
  if (state.robotSweepCooldown > 0) return;
  const neighbors = roomConnections[roomId];
  const available = neighbors.filter((neighbor) => !state.robotCheckedCooldown.has(neighbor));
  const confidence = getRoomConfidence(roomId);
  let count = 1;
  if (confidence >= 0.75 || state.threat >= 4) {
    count = Math.min(available.length, profile.sweepDepth.high);
  } else if (confidence >= 0.5 || state.threat >= 3) {
    count = Math.min(available.length, profile.sweepDepth.mid);
  } else {
    count = Math.min(available.length, profile.sweepDepth.low);
  }
  const noRecentSignal = state.turn - state.lastStrongSignalTick > profile.trailStaleness + 2;
  if (state.threat >= 4.8 && state.robotTargetConfidence >= 0.75 && noRecentSignal) {
    count = Math.max(1, count - 1);
  }
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  const scored = shuffled
    .map((roomId) => ({ roomId, penalty: alarmVisitPenalty(roomId), jitter: Math.random() }))
    .sort((a, b) => (a.penalty - b.penalty) || (a.jitter - b.jitter));
  state.robotSweepQueue = scored.slice(0, count).map((entry) => entry.roomId);
  state.robotSweepCooldown = profile.sweepCooldown;
}

// Rare false retreat: step away, then quietly double-back.
function shouldPlanDoubleBack() {
  const wasInvestigating = state.robotMode === "investigate" || state.robotMode === "search";
  const justLostTrail = state.turn - state.lastTrailBreakTick <= 1;
  if (!wasInvestigating && !justLostTrail) return false;
  if (!state.lastStrongSignalRoom || state.lastStrongSignalTick < 0) return false;
  if (state.turn - state.lastStrongSignalTick > DOUBLE_BACK_SIGNAL_WINDOW) return false;
  const signal = state.roomSignals.get(state.lastStrongSignalRoom) || 0;
  if (signal > DOUBLE_BACK_SIGNAL_COLD) return false;
  return Math.random() < DOUBLE_BACK_CHANCE;
}

function planDoubleBack() {
  const adjacent = roomConnections[state.robotRoom] || [];
  const fallbackRoom = state.robotLastRoom;
  const preferredRoom = state.lastStrongSignalRoom;
  const interestingRoom = adjacent.includes(preferredRoom)
    ? preferredRoom
    : adjacent.includes(fallbackRoom)
      ? fallbackRoom
      : state.robotRoom;
  const retreatOptions = adjacent.filter((roomId) => roomId !== interestingRoom);
  if (retreatOptions.length === 0) return false;
  const retreatRoom = retreatOptions[Math.floor(Math.random() * retreatOptions.length)];
  state.robotPath = [retreatRoom];
  state.robotSweepQueue = [interestingRoom];
  state.robotLinger = Math.max(state.robotLinger, 1);
  state.robotPlannedTarget = null;
  state.robotTargetConfidence = Math.max(0, state.robotTargetConfidence - 0.1);
  state.robotScanTarget = null;
  startRobotTravelStep();
  setRobotMode("hunt");
  return true;
}

function predictNextRoom() {
  if (state.playerTrail.length < 2) return null;
  const current = state.playerTrail[state.playerTrail.length - 1];
  const previous = state.playerTrail[state.playerTrail.length - 2];
  const neighbors = roomConnections[current] || [];
  const forward = neighbors.filter((roomId) => roomId !== previous);
  if (forward.length === 0) return previous;
  const bySignal = [...forward].sort((a, b) => {
    const signalA = state.roomSignals.get(a) || 0;
    const signalB = state.roomSignals.get(b) || 0;
    return signalB - signalA;
  });
  return bySignal[0];
}

function maybePickPredictionTarget() {
  const predicted = predictNextRoom();
  if (
    predicted === null ||
    state.lastKnownPlayerRoom === null ||
    state.robotPredictionCooldown !== 0
  ) {
    return null;
  }
  const profile = getNightProfile();
  if (!profile.prediction.enabled) return null;
  const penalty = alarmVisitPenalty(state.lastKnownPlayerRoom);
  const confidence = getRoomConfidence(state.lastKnownPlayerRoom) - penalty;
  const lastSignal = state.roomSignals.get(state.lastKnownPlayerRoom) || 0;
  const moodBoost = state.robotMood === "confident" ? 0.1 : 0;
  const moodPenalty = state.robotMood === "cautious" ? -0.1 : 0;
  const chance = clamp(profile.prediction.chance + moodBoost + moodPenalty, 0.1, 0.6);
  const signalThreshold = state.robotMood === "cautious"
    ? profile.prediction.signal + 0.05
    : profile.prediction.signal;
  if (confidence >= profile.prediction.confidence && lastSignal >= signalThreshold && Math.random() < chance) {
    state.robotPredictionCooldown = profile.prediction.cooldown;
    logDebug("predict", { predicted, confidence, lastSignal });
    return predicted;
  }
  return null;
}

function pickRobotTarget() {
  const avoidAlarmLoop = isAlarmTriggered(state.robotRoom);
  const predicted = maybePickPredictionTarget();
  const candidates = new Set(state.roomSignals.keys());
  if (state.lastKnownPlayerRoom !== null) {
    candidates.add(state.lastKnownPlayerRoom);
  }
  if (predicted !== null) {
    candidates.add(predicted);
  }
  if (state.robotFocus !== null && state.robotFocusTTL > 0) {
    candidates.add(state.robotFocus);
  }
  if (candidates.size === 0) return null;

  // Blend signals, trail memory, prediction, and focus bias into a unified score.
  let bestRoom = null;
  let bestScore = 0;
  for (const roomId of candidates) {
    if (avoidAlarmLoop && roomId === state.robotLastRoom && isAlarmTriggered(roomId)) {
      continue;
    }
    const signal = state.roomSignals.get(roomId) || 0;
    const persistent = state.persistentSignals.get(roomId) || 0;
    const persistentBoost = persistent > 0 ? Math.min(0.3, 0.1 + persistent * 0.05) : 0;
    const isLastKnown = state.trailTurns > 0 && roomId === state.lastKnownPlayerRoom;
    const lastKnownBoost = isLastKnown ? 0.35 : 0;
    const predictedBoost = roomId === predicted ? 0.25 : 0;
    const focusBoost = roomId === state.robotFocus && state.robotFocusTTL > 0
      ? ROBOT_FOCUS_BIAS * (state.robotFocusTTL / ROBOT_FOCUS_TTL)
      : 0;
    const penalty = alarmVisitPenalty(roomId);
    const distance = Math.max(0, getShortestPath(state.robotRoom, roomId).length - 1);
    const distancePenalty = Math.min(0.3, distance * 0.05);
    const checkedPenalty = state.robotCheckedCooldown.has(roomId) ? 0.2 : 0;
    let score = signal + persistentBoost + lastKnownBoost + predictedBoost + focusBoost;
    score -= penalty + distancePenalty + checkedPenalty;
    if (
      state.robotCheckedCooldown.has(roomId) &&
      signal < 0.7 &&
      !isLastKnown &&
      predictedBoost === 0 &&
      focusBoost === 0
    ) {
      score -= 0.2;
    }
    if (score > bestScore) {
      bestScore = score;
      bestRoom = roomId;
    }
  }

  return bestScore >= 0.2 ? bestRoom : null;
}

function getRoomConfidence(roomId) {
  return state.roomSignals.get(roomId) || 0;
}

function startSearchCycle() {
  state.robotSearchTurns = Math.floor(Math.random() * 4) + 5;
  updateRobotSearchSpot(pickSearchSpot());
  setRobotMode("search");
}

function updateRobotSearchSpot(spot) {
  if (state.robotSearchSpot === spot) return;
  state.robotSearchSpot = spot;
  if (state.robotRoom === state.playerRoom && state.robotSearchTurns > 0 && spot) {
    pushStatus(`It checks the ${spot}…`, 2);
  }
}

function pickSearchSpot() {
  const spots = rooms[state.robotRoom].hideSpots;
  if (!spots || spots.length === 0) return null;
  if (state.robotRoom === state.playerRoom && state.hidden && state.hiddenSpot) {
    const preferSpot = state.sawPlayerHide ||
      isHideSpotUsed(state.playerRoom, state.hiddenSpot) ||
      isHideSpotLearned(state.playerRoom, state.hiddenSpot);
    if (preferSpot && Math.random() < 0.6) {
      return state.hiddenSpot;
    }
  }
  return spots[Math.floor(Math.random() * spots.length)];
}

function triggerSiren(roomId) {
  if (!state.isAlive || state.hasEscaped) return;
  const lure = getActiveLure(roomId);
  if (!lure) return;
  const profile = getNightProfile();
  const effects = getPassiveEffects();
  runLockedAction({
    label: `Triggering ${lure.name}…`,
    steps: lure.steps,
    onStep: (step, total) => {
      pulseActionSignal(roomId, "trace");
      state.turn += 1;
      if (step < total) {
        updateUI();
        return;
      }
      setRobotFocus(roomId, { reason: "siren" });
      registerSignal(roomId, lure.strength * profile.signalStrength.device * effects.signalSpike, {
        type: "siren",
        forceLastKnown: true,
        bleed: true,
      });
      state.persistentSignals.set(roomId, lure.linger + effects.persistentBonus);
      updateUI();
    },
  });
}

function interruptRobotTask(roomId) {
  state.robotLinger = 0;
  state.robotSearchTurns = 0;
  state.robotSearchSpot = null;
  state.robotLookTurns = 0;
  state.robotSweepQueue = [];
  state.robotInvestigateTurns = 0;
  state.robotTask = null;
  setRobotFocus(roomId, { reason: "interrupt" });
  setRobotMode("hunt");
}

function getRobotDistance() {
  const path = getShortestPath(state.playerRoom, state.robotRoom);
  if (!path.length) return null;
  return Math.max(0, path.length - 1);
}

function getRobotRoomHint(roomId) {
  const hints = {
    1: "Echo: metal.",
    2: "Air: scorched.",
    3: "Vapor: cold.",
    5: "Fans: whine.",
    6: "Servos: hum.",
    8: "Switches: snap.",
    11: "Pistons: thump.",
  };
  return hints[roomId] || "";
}

function robotStatusLabel() {
  const maxStatusLength = "You cam hear the birds chirping".length;
  const fitStatus = (parts) => {
    let line = "";
    parts.forEach((part) => {
      if (!part) return;
      const candidate = line ? `${line} ${part}` : part;
      if (candidate.length <= maxStatusLength) {
        line = candidate;
      }
    });
    if (line.length <= maxStatusLength) return line;
    return `${line.slice(0, Math.max(0, maxStatusLength - 1))}…`;
  };

  if (state.robotDisabled) {
    const weatherQuietLines = {
      Rain: "Sensor: rain impact.",
      Clear: "Sensor: birds chirping.",
      Fog: "Sensor: birds silent.",
      Storm: "Sensor: distant thunder.",
    };
    return weatherQuietLines[state.weather?.type] ?? "Sensor: ambient quiet.";
  }
  if (state.robotDormant > 0) return "Sensor: halls quiet.";

  const distance = getRobotDistance();
  const distanceLabel = distance === 0
    ? "in-room"
    : distance === 1
      ? "adjacent"
      : distance === 2
        ? "near"
        : distance === null
          ? "unknown"
          : "far";

  let primary = "";
  if (distance === 0) {
    if (state.hidden && state.robotLookTurns > 0) {
      primary = "Optics: target lock.";
    } else if (state.hidden) {
      primary = "Motion: entry signal.";
    } else if (state.robotLookTurns > 0) {
      primary = "Scan: sweep in-room.";
    } else {
      primary = "Audio: footfall near.";
    }
  } else if (distance === 1 && state.hidden) {
    primary = "Motion: outside door.";
  } else if (state.robotLookTurns > 0) {
    primary = `Scan: ${distanceLabel}.`;
  } else if (state.robotSweepQueue.length > 0) {
    primary = `Motion: fast ${distanceLabel}.`;
  } else if (state.robotSearchTurns > 0) {
    primary = `Audio: search ${distanceLabel}.`;
  } else if (state.robotInvestigateTurns > 0) {
    primary = `Audio: slow ${distanceLabel}.`;
  } else if (state.robotTask) {
    primary = `Relay: tick ${distanceLabel}.`;
  } else if (distance === 1) {
    primary = "Motion: nearby.";
  } else {
    primary = `Audio: footfall ${distanceLabel}.`;
  }

  const roomHint = distance > 0 ? getRobotRoomHint(state.robotRoom) : "";
  const pressureTag = sanityPressurePhrase();
  const weightedBase = fitStatus([primary, roomHint, pressureTag]);
  if (state.currentNight >= 4 && state.sanity < 0.4) {
    const nearRobot = distance !== null && distance <= 2;
    const inTriggeredAlarm = isAlarmTriggered(state.playerRoom);
    const inSunlit = state.sunlitRooms.has(state.playerRoom);
    const pressure = getSignalPressure(state.playerRoom);
    const allowHallucination = nearRobot || inTriggeredAlarm || inSunlit || pressure >= 0.6;
    if (allowHallucination) {
      const distorted = state.sanity < 0.2
        ? [
          "Signal: static spike.",
          "Signal: severe drift.",
          "Signal: corridor pulse.",
        ]
        : [
          "Signal: static drift.",
          "Signal: brief warp.",
          "Signal: pulse noise.",
      ];
      const chance = state.sanity < 0.2 ? 0.45 : 0.25;
      if (Math.random() < chance) {
        return fitStatus([
          distorted[Math.floor(Math.random() * distorted.length)],
          weightedBase,
        ]);
      }
    }
  }
  return weightedBase;
}

function renderMap() {
  dom.floorplanMap.innerHTML = "";
  const svg = dom.floorplanMap;

  rooms.forEach((room) => {
    roomConnections[room.id].forEach((neighbor) => {
      if (neighbor < room.id) return;
      const line = createSvgElement("line", {
        x1: mapPositions[room.id].x,
        y1: mapPositions[room.id].y,
        x2: mapPositions[neighbor].x,
        y2: mapPositions[neighbor].y,
        class: "map-link",
        "data-edge": `${room.id}-${neighbor}`,
      });
      svg.appendChild(line);
      const jam = createSvgElement("text", {
        x: (mapPositions[room.id].x + mapPositions[neighbor].x) / 2,
        y: (mapPositions[room.id].y + mapPositions[neighbor].y) / 2,
        class: "map-jam",
        "data-edge": `${room.id}-${neighbor}`,
        "text-anchor": "middle",
        "dominant-baseline": "middle",
      }, "⛔");
      svg.appendChild(jam);
      const playerLine = createSvgElement("line", {
        x1: mapPositions[room.id].x,
        y1: mapPositions[room.id].y,
        x2: mapPositions[neighbor].x,
        y2: mapPositions[neighbor].y,
        class: "map-travel player-travel",
        "data-edge": `${room.id}-${neighbor}`,
      });
      svg.appendChild(playerLine);
      const robotLine = createSvgElement("line", {
        x1: mapPositions[room.id].x,
        y1: mapPositions[room.id].y,
        x2: mapPositions[neighbor].x,
        y2: mapPositions[neighbor].y,
        class: "map-travel robot-travel",
        "data-edge": `${room.id}-${neighbor}`,
      });
      svg.appendChild(robotLine);
    });
  });

  rooms.forEach((room) => {
    const group = createSvgElement("g", {
      class: "map-node",
      "data-room-id": room.id,
    });
    const pressure = createSvgElement("circle", {
      cx: mapPositions[room.id].x,
      cy: mapPositions[room.id].y,
      r: 26,
      class: "map-pressure",
    });
    const circle = createSvgElement("circle", {
      cx: mapPositions[room.id].x,
      cy: mapPositions[room.id].y,
      r: 18,
    });
    const text = createSvgElement("text", {
      x: mapPositions[room.id].x,
      y: mapPositions[room.id].y - 4,
    });
    const hazard = createSvgElement("text", {
      x: mapPositions[room.id].x,
      y: mapPositions[room.id].y - 20,
      class: "map-hazard",
      "text-anchor": "middle",
      "dominant-baseline": "middle",
    });
    const poi = createSvgElement("text", {
      x: mapPositions[room.id].x,
      y: mapPositions[room.id].y + 16,
      class: "map-poi",
      "text-anchor": "middle",
      "dominant-baseline": "middle",
    });
    const title = room.name.split(" ")[0];
    text.appendChild(createSvgElement("tspan", { x: mapPositions[room.id].x, dy: 4 }, title));
    group.appendChild(pressure);
    group.appendChild(circle);
    group.appendChild(text);
    group.appendChild(hazard);
    group.appendChild(poi);
    group.addEventListener("click", () => {
      handleMapSelection(room.id);
    });
    svg.appendChild(group);
  });
}

function canSeeRobotIntel() {
  if (!state.unlocks.showRobotIntelOnMap) return false;
  if (state.robotDisabled) return false;
  if (!hasCollectedTool("Pulse Scanner")) return false;
  if (state.robotRoom === state.playerRoom) return true;
  const weatherMods = getWeatherModifiers();
  if (state.scannerOn) {
    if (weatherMods.scannerFog) {
      return state.scanPulseTicks > 0 || state.robotRoom === state.playerRoom;
    }
    return true;
  }
  return false;
}

function canShowRobotTravelLine() {
  return canSeeRobotIntel();
}

function getRoutePlanningOrigin() {
  if (state.playerTravelStepStart !== null && state.playerPath.length > 0) {
    return state.playerPath[0];
  }
  return state.playerRoom;
}

function updateMap() {
  const isIntroEscapeHighlight = state.introStep === "highlight-escape";
  const night11 = isNight11();
  const escapeRoomId = rooms.find((room) => room.isExit)?.id ?? null;
  const robotPath = state.robotPlannedTarget === null
    ? []
    : getShortestPath(state.robotRoom, state.robotPlannedTarget);
  const robotEdges = new Set();
  for (let i = 0; i < robotPath.length - 1; i += 1) {
    const a = Math.min(robotPath[i], robotPath[i + 1]);
    const b = Math.max(robotPath[i], robotPath[i + 1]);
    robotEdges.add(`${a}-${b}`);
  }
  const showRobotIntel = canSeeRobotIntel();
  const planningOrigin = getRoutePlanningOrigin();
  const objectiveTargets = new Set();
  if (state.requiredPickup && !isRequiredPickupComplete()) {
    objectiveTargets.add(state.requiredPickup.roomId);
  }
  if (state.objectiveBlocksEscapeConsole &&
    state.requiredEscapeSchematic &&
    !state.objectiveItemInstalled &&
    !state.foundSchematics.has(state.requiredEscapeSchematic)) {
    rooms.forEach((room) => {
      if (room.schematic === state.requiredEscapeSchematic) {
        objectiveTargets.add(room.id);
      }
    });
  }
  if (state.escapeConsoleInspected || state.debugEyes) {
    if (isScriptedNight() &&
      state.currentNight !== 10 &&
      !state.nightObjectiveComplete &&
      !(state.objectiveHoldUntil > 0 && state.turn < state.objectiveHoldUntil)) {
      const objectiveRoomId = getNightObjectiveRoomId();
      if (objectiveRoomId !== null) {
        objectiveTargets.add(objectiveRoomId);
      }
    }
    if (state.missionType === MISSION_TYPES.ESCAPE && state.escapeMode === "manual") {
      state.manualOverrideTargets.forEach((roomId) => {
        if (!state.manualOverridesDone.has(roomId)) {
          objectiveTargets.add(roomId);
        }
      });
    }
    if (state.missionType === MISSION_TYPES.STABILIZE) {
      state.stabilizeTargets.forEach((target) => {
        if (!state.stabilizedTargets.has(target.roomId)) {
          objectiveTargets.add(target.roomId);
        }
      });
    }
    if (state.missionType === MISSION_TYPES.DATA) {
      rooms.forEach((room) => {
        if (room.schematic && !state.dataFragmentsFound.has(room.id)) {
          objectiveTargets.add(room.id);
        }
      });
    }
    if (state.escapeMode === "fabricate" && state.requiredEscapeSchematic && !state.objectiveItemInstalled) {
      rooms.forEach((room) => {
        if (room.schematic === state.requiredEscapeSchematic &&
          !state.foundSchematics.has(state.requiredEscapeSchematic)) {
          objectiveTargets.add(room.id);
        }
      });
    }
  }
  let plannedPath = state.routePreviewRoom !== null
    ? getShortestPath(planningOrigin, state.routePreviewRoom)
    : [];
  if (night11 && plannedPath.length === 0 && state.playerPath.length > 0) {
    plannedPath = [state.playerRoom, ...state.playerPath];
  }
  const showPlannedPath = plannedPath.length > 1;
  const plannedEdges = new Set();
  for (let i = 0; i < plannedPath.length - 1; i += 1) {
    const a = Math.min(plannedPath[i], plannedPath[i + 1]);
    const b = Math.max(plannedPath[i], plannedPath[i + 1]);
    plannedEdges.add(`${a}-${b}`);
  }
  const actionTargets = isIntroEscapeHighlight ? null : getMapTargetCandidates();
  const actionEdges = new Set();
  if (!isIntroEscapeHighlight && (state.mapTargetMode === "jam" || state.mapTargetMode === "unjam")) {
    const source = state.mapTargetSourceRoom ?? state.playerRoom;
    (roomConnections[source] || []).forEach((neighbor) => {
      const key = edgeKey(source, neighbor);
      if (actionTargets?.has(neighbor)) {
        actionEdges.add(key);
      }
    });
  }

  dom.floorplanMap.querySelectorAll(".map-link").forEach((line) => {
    const edge = line.getAttribute("data-edge");
    line.classList.toggle("robot-plan", showRobotIntel && robotEdges.has(edge));
    line.classList.toggle(
      "edge-jammed",
      state.jammedEdges.has(edge) || state.permaJammedEdges.has(edge)
    );
    line.classList.toggle("active", plannedEdges.has(edge));
    line.classList.toggle("action-edge", actionEdges.has(edge));
    line.classList.toggle(
      "action-edge-selected",
      state.mapTargetSelection !== null &&
        (state.mapTargetMode === "jam" || state.mapTargetMode === "unjam") &&
        edge === edgeKey(state.mapTargetSourceRoom ?? state.playerRoom, state.mapTargetSelection)
    );
  });
  dom.floorplanMap.querySelectorAll(".map-jam").forEach((marker) => {
    const edge = marker.getAttribute("data-edge");
    const active = state.jammedEdges.has(edge) || state.permaJammedEdges.has(edge);
    marker.classList.toggle("active", active);
    marker.classList.toggle("perma", state.permaJammedEdges.has(edge));
  });
  dom.floorplanMap.querySelectorAll(".map-travel").forEach((line) => {
    applyTravelProgress(line, line.getAttribute("data-edge"));
  });

  const playerAdjacents = new Set(roomConnections[state.playerRoom]);
  const robotNearby = !state.robotDisabled &&
    (state.robotRoom === state.playerRoom || playerAdjacents.has(state.robotRoom));
  const showRobotVision = state.robotDormant === 0 && state.robotLookTurns > 0;
  const robotAdjacents = showRobotVision ? new Set(roomConnections[state.robotRoom]) : new Set();
  dom.floorplanMap.querySelectorAll(".map-node").forEach((node) => {
    const roomId = Number(node.getAttribute("data-room-id"));
    const isEscapeRoom = roomId === escapeRoomId;
    const basePressure = showRobotIntel ? getRoomPressure(roomId) : getSignalPressure(roomId);
    const pressure = getPerceivedPressure(basePressure);
    const ring = node.querySelector(".map-pressure");
    if (ring) {
      let opacity = pressure > 0.05 ? 0.15 + pressure * 0.55 : 0;
      let radius = 24 + pressure * 10;
      if (night11) {
        opacity = 0;
        radius = 24;
      }
      if (state.scanPulseTicks > 0 && roomId === state.scanFocusRoom) {
        opacity = Math.max(opacity, 0.6);
        radius += 4;
      }
      ring.style.opacity = opacity.toFixed(2);
      ring.setAttribute("r", `${radius}`);
    }
    node.classList.toggle("active", roomId === state.playerRoom);
    node.classList.toggle(
      "intro-escape-target",
      isIntroEscapeHighlight && isEscapeRoom
    );
    node.classList.toggle(
      "alert",
      roomId === state.playerRoom &&
        roomId === state.robotRoom &&
        state.robotDormant === 0 &&
        !state.robotDisabled
    );
    node.classList.toggle(
      "robot-disabled",
      state.robotDisabled && roomId === state.playerRoom && roomId === state.robotRoom
    );
    node.classList.toggle("preview", roomId === state.routePreviewRoom);
    node.classList.toggle("adjacent", !isIntroEscapeHighlight && playerAdjacents.has(roomId));
    node.classList.toggle("action-target", !isIntroEscapeHighlight && Boolean(actionTargets?.has(roomId)));
    node.classList.toggle(
      "action-disabled",
      !isIntroEscapeHighlight &&
        state.mapTargetMode !== null &&
        Boolean(actionTargets) &&
        !actionTargets.has(roomId)
    );
    node.classList.toggle("action-selected", !isIntroEscapeHighlight && roomId === state.mapTargetSelection);
    node.classList.toggle(
      "robot-adjacent",
      showRobotIntel && showRobotVision && roomId === state.robotScanTarget
    );
    node.classList.toggle("robot-nearby", robotNearby && roomId === state.robotRoom);
    node.classList.toggle("robot-target", showRobotIntel && roomId === state.robotPlannedTarget);
    node.classList.toggle("robot-sweep", showRobotIntel && state.robotSweepQueue.includes(roomId));
    node.classList.toggle("scan-focus", state.scanPulseTicks > 0 && roomId === state.scanFocusRoom);
    node.classList.toggle(
      "surge-flash",
      state.surgeMapFlashActive && roomId === state.surgeMapFlashRoom
    );
    const poi = node.querySelector(".map-poi");
    const hazard = node.querySelector(".map-hazard");
    if (poi) {
      if (night11) {
        poi.textContent = "";
        poi.classList.remove(
          "poi-item",
          "poi-schematic",
          "poi-objective",
          "poi-exit",
          "poi-blink",
          "poi-exit-ready"
        );
      } else {
      const room = rooms[roomId];
      const discoveriesEnabled = state.escapeConsoleInspected || state.debugEyes;
      const isExit = isEscapeRoom;
      const canShowDiscoveries = isIntroEscapeHighlight ? isExit : discoveriesEnabled || isExit;
      const hasObjective = objectiveTargets.has(roomId);
      const hasItem = discoveriesEnabled && Boolean(room.item) && !hasInventoryItem(room.item);
      const allowSchematicMarkers = state.unlocks.allowCrafting ||
        state.missionType === MISSION_TYPES.DATA ||
        state.debugEyes;
      const hasSchematic = discoveriesEnabled &&
        allowSchematicMarkers &&
        Boolean(room.schematic) &&
        !state.foundSchematics.has(room.schematic);
      const specialPickup = state.specialPickups.get(roomId);
      const hasSpecialPickup = discoveriesEnabled &&
        Boolean(specialPickup) &&
        !hasCollectedTool(specialPickup);
      let marker = "";
      if (canShowDiscoveries || hasObjective) {
        if (isExit) {
          marker = "⎋";
        } else if (hasObjective) {
          marker = "◎";
        } else if (hasSpecialPickup) {
          marker = "★";
        } else if (hasSchematic) {
          marker = "◇";
        } else if (hasItem) {
          marker = "●";
        }
      }
      poi.textContent = marker;
      poi.classList.toggle(
        "poi-item",
        (hasItem || hasSpecialPickup) && !isExit && !hasSchematic
      );
      poi.classList.toggle("poi-objective", hasObjective && !isExit);
      poi.classList.toggle("poi-schematic", hasSchematic && !isExit);
      poi.classList.toggle("poi-exit", isExit);
      const allowBlink = !state.objectiveBlocked && canShowDiscoveries;
      let shouldBlink = allowBlink && isExit && state.escapeReady;
      if (isIntroEscapeHighlight) {
        shouldBlink = isExit;
      }
      poi.classList.toggle("poi-blink", shouldBlink);
      poi.classList.toggle("poi-exit-ready", isExit && state.escapeReady);
      }
    }
    if (hazard) {
      if (night11) {
        hazard.textContent = "";
        hazard.style.opacity = "0";
        hazard.classList.remove("hazard-dormant", "hazard-triggered", "hazard-sun", "hazard-alarm");
        return;
      }
      const alarmTriggered = isAlarmTriggered(roomId);
      const alarmCapable = isAlarmCapable(roomId);
      const sunlit = state.sunlitRooms.has(roomId);
      hazard.classList.remove("hazard-dormant", "hazard-triggered");
      if (alarmTriggered) {
        hazard.textContent = sunlit ? "☀⚠" : "⚠";
        hazard.classList.add("hazard-triggered");
        hazard.style.opacity = "0.95";
      } else if (alarmCapable) {
        hazard.textContent = sunlit ? "☀⚠" : "⚠";
        hazard.classList.add("hazard-dormant");
        hazard.style.opacity = "0.45";
      } else {
        hazard.textContent = sunlit ? "☀" : "";
        hazard.style.opacity = sunlit ? "0.95" : "0";
      }
      hazard.classList.toggle("hazard-sun", sunlit);
      hazard.classList.toggle("hazard-alarm", alarmTriggered);
    }
  });

  updateRouteInfo();
}

function revealIntroMap() {
  state.startRevealPending = false;
  state.introStep = "highlight-escape";
  clearMapTarget();
  state.selectedRoom = null;
  state.routePreviewRoom = null;
  document.body.classList.remove("intro-blackout");
  if (dom.introFade) {
    dom.introFade.classList.remove("is-visible");
    dom.introFade.setAttribute("aria-hidden", "true");
  }
  if (dom.app) {
    dom.app.classList.add("intro-reveal");
    dom.app.classList.remove("is-hidden");
    requestAnimationFrame(() => {
      dom.app?.classList.add("intro-reveal-active");
    });
    dom.app.addEventListener(
      "transitionend",
      (event) => {
        if (event.propertyName !== "opacity") return;
        dom.app?.classList.remove("intro-reveal", "intro-reveal-active");
      },
      { once: true },
    );
  }
  if (dom.mapPanel) {
    dom.mapPanel.classList.add("intro-reveal");
    dom.mapPanel.addEventListener(
      "transitionend",
      (event) => {
        if (event.propertyName !== "opacity") return;
        dom.mapPanel?.classList.remove("intro-reveal", "intro-reveal-active");
      },
      { once: true },
    );
  }
  if (dom.overlayFooter) {
    dom.overlayFooter.classList.add("intro-reveal");
    requestAnimationFrame(() => {
      dom.overlayFooter?.classList.add("intro-reveal-active");
    });
    dom.overlayFooter.addEventListener(
      "transitionend",
      (event) => {
        if (event.propertyName !== "opacity") return;
        dom.overlayFooter?.classList.remove("intro-reveal", "intro-reveal-active");
      },
      { once: true },
    );
  }
  openMap();
  requestAnimationFrame(() => {
    dom.mapPanel?.classList.add("intro-reveal-active");
  });
  updateUI();
}

function getRoomPressure(roomId) {
  const signal = state.roomSignals.get(roomId) || 0;
  const visit = state.robotPresenceHeat.get(roomId) || 0;
  const targetBoost = state.robotPlannedTarget === roomId ? 0.6 : 0;
  const sweepBoost = state.robotSweepQueue.includes(roomId) ? 0.4 : 0;
  const focusBoost = state.robotFocus === roomId && state.robotFocusTTL > 0 ? ROBOT_FOCUS_BIAS : 0;
  const pressure = clamp(Math.max(signal, visit, targetBoost, sweepBoost, focusBoost), 0, 1);
  if (state.robotDisabled && signal < 0.2) return 0;
  return pressure;
}

function getSignalPressure(roomId) {
  const signal = state.roomSignals.get(roomId) || 0;
  return clamp(signal, 0, 1);
}

function getPerceivedPressure(pressure) {
  if (state.currentNight < 4) return pressure;
  let multiplier = 1;
  if (state.sanity < 0.7) {
    multiplier = 1.1;
  }
  if (state.sanity < 0.4) {
    multiplier = 1.25;
  }
  if (state.sanity < 0.2) {
    multiplier = 1.45;
  }
  return clamp(pressure * multiplier, 0, 1);
}

function applyTravelProgress(line, edgeKey) {
  line.style.opacity = "0";
  const playerEdge = currentTravelEdge(state.playerRoom, state.playerPath);
  if (playerEdge && edgeKey === playerEdge.key) {
    const progress = getProgress(state.playerTravelStepStart, state.playerTravelStepDuration);
    if (line.classList.contains("player-travel")) {
      setLineProgress(line, playerEdge.startRoom, playerEdge.endRoom, progress);
    }
  }
  const robotEdge = currentTravelEdge(state.robotRoom, state.robotPath);
  if (robotEdge && edgeKey === robotEdge.key) {
    if (line.classList.contains("robot-travel") && !canShowRobotTravelLine()) {
      line.style.opacity = "0";
      return;
    }
    const progress = getProgress(state.robotTravelStepStart, state.robotTravelStepDuration);
    if (line.classList.contains("robot-travel")) {
      setLineProgress(line, robotEdge.startRoom, robotEdge.endRoom, progress);
    }
  }
}

function currentTravelEdge(startRoom, path) {
  if (!path || path.length === 0) return null;
  const nextRoom = path[0];
  const a = Math.min(startRoom, nextRoom);
  const b = Math.max(startRoom, nextRoom);
  const length = edgeLength(startRoom, nextRoom);
  return {
    key: `${a}-${b}`,
    length,
    startRoom,
    endRoom: nextRoom,
  };
}

function edgeLength(startRoom, endRoom) {
  const start = mapPositions[startRoom];
  const end = mapPositions[endRoom];
  const dx = start.x - end.x;
  const dy = start.y - end.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function getProgress(startTime, duration) {
  if (!startTime || !duration) return 1;
  const elapsed = Date.now() - startTime;
  return Math.min(1, Math.max(0, elapsed / duration));
}

function setLineProgress(line, startRoom, endRoom, progress) {
  const clamped = Math.min(1, Math.max(0, progress));
  const remaining = 1 - clamped;
  if (remaining <= 0.02) {
    line.style.opacity = "0";
    return;
  }
  const start = mapPositions[startRoom];
  const end = mapPositions[endRoom];
  const x1 = start.x + (end.x - start.x) * clamped;
  const y1 = start.y + (end.y - start.y) * clamped;
  line.style.opacity = "1";
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", end.x);
  line.setAttribute("y2", end.y);
}

function updateRouteInfo() {
}

function createSvgElement(tag, attrs, text) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs || {}).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  if (text) {
    el.textContent = text;
  }
  return el;
}

function edgeKey(a, b) {
  const start = Math.min(a, b);
  const end = Math.max(a, b);
  return `${start}-${end}`;
}

function isEdgeJammed(a, b) {
  const key = edgeKey(a, b);
  return state.jammedEdges.has(key) || state.permaJammedEdges.has(key);
}

function jamEdge(a, b, duration) {
  const key = edgeKey(a, b);
  if (state.jammedEdges.has(key)) return false;
  state.jammedEdges.set(key, duration);
  return true;
}

function tickJammedEdges() {
  state.jammedEdges.forEach((value, key) => {
    const next = value - 1;
    if (next <= 0) {
      state.jammedEdges.delete(key);
    } else {
      state.jammedEdges.set(key, next);
    }
  });
}

function getShortestPath(start, target) {
  if (start === target) return [start];
  const queue = [start];
  const visited = new Set([start]);
  const parent = new Map();

  while (queue.length) {
    const current = queue.shift();
    if (current === target) break;
    const neighbors = roomConnections[current] || [];
    neighbors.forEach((neighbor) => {
      if (isEdgeJammed(current, neighbor)) return;
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, current);
        queue.push(neighbor);
      }
    });
  }

  if (!visited.has(target)) return [];
  const path = [];
  let step = target;
  while (step !== undefined) {
    path.unshift(step);
    step = parent.get(step);
  }
  return path;
}

function nextStepToward(start, target) {
  if (start === target) return start;
  const queue = [start];
  const visited = new Set([start]);
  const parent = new Map();

  while (queue.length) {
    const current = queue.shift();
    if (current === target) break;
    const neighbors = roomConnections[current] || [];
    for (const neighbor of neighbors) {
      if (isEdgeJammed(current, neighbor)) continue;
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, current);
        queue.push(neighbor);
      }
    }
  }

  let step = target;
  while (parent.has(step) && parent.get(step) !== start) {
    step = parent.get(step);
  }
  return parent.has(step) ? step : start;
}

function randomizeLayout() {
  roomConnections = generateRandomConnections();
  state.routePreviewRoom = null;
  state.selectedRoom = null;
  state.jammedEdges.clear();
  state.permaJammedEdges.clear();
  optimizeLayout();
  renderMap();
  preloadRoomBackgrounds();
  updateUI();
}

function generateRandomConnections() {
  const connections = {};
  const ids = rooms.map((room) => room.id);
  ids.forEach((id) => {
    connections[id] = [];
  });

  const shuffled = [...ids].sort(() => Math.random() - 0.5);
  shuffled.slice(1).forEach((id, index) => {
    const attachTo = shuffled[Math.floor(Math.random() * (index + 1))];
    addConnection(connections, id, attachTo);
  });

  const extraEdges = 8;
  for (let i = 0; i < extraEdges; i += 1) {
    const a = ids[Math.floor(Math.random() * ids.length)];
    const b = ids[Math.floor(Math.random() * ids.length)];
    if (a === b) continue;
    if (connections[a].length >= 4 || connections[b].length >= 4) continue;
    addConnection(connections, a, b);
  }

  ids.forEach((id) => {
    if (connections[id].length === 0) {
      const neighbor = ids.find((candidate) => candidate !== id) ?? 0;
      addConnection(connections, id, neighbor);
    }
  });

  return connections;
}

function addConnection(connections, a, b) {
  if (!connections[a].includes(b)) {
    connections[a].push(b);
  }
  if (!connections[b].includes(a)) {
    connections[b].push(a);
  }
}

function optimizeLayout() {
  const ids = rooms.map((room) => room.id);
  const slots = Object.values(mapPositions);
  const placement = new Map();
  ids.forEach((id, index) => {
    placement.set(id, slots[index]);
  });

  let bestScore = layoutScore(placement);
  for (let i = 0; i < 600; i += 1) {
    const [a, b] = pickTwo(ids);
    const temp = placement.get(a);
    placement.set(a, placement.get(b));
    placement.set(b, temp);
    const score = layoutScore(placement);
    if (score < bestScore || Math.random() < 0.2) {
      bestScore = score;
    } else {
      const revert = placement.get(a);
      placement.set(a, placement.get(b));
      placement.set(b, revert);
    }
  }

  ids.forEach((id) => {
    mapPositions[id] = placement.get(id);
  });
}

function layoutScore(placement) {
  let total = 0;
  rooms.forEach((room) => {
    roomConnections[room.id].forEach((neighbor) => {
      if (neighbor < room.id) return;
      const a = placement.get(room.id);
      const b = placement.get(neighbor);
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      total += Math.sqrt(dx * dx + dy * dy);
    });
  });
  return total;
}

function pickTwo(ids) {
  const first = ids[Math.floor(Math.random() * ids.length)];
  let second = ids[Math.floor(Math.random() * ids.length)];
  while (second === first) {
    second = ids[Math.floor(Math.random() * ids.length)];
  }
  return [first, second];
}

function installObjectiveItem() {
  if (!state.objectiveItemCrafted || state.objectiveItemInstalled) return;
  const itemName = state.objectiveItemName ?? "Objective Item";
  runLockedAction({
    label: `Installing ${itemName}…`,
    steps: 1,
    onStep: () => {
      recordMeaningfulAction();
      pulseActionSignal(state.playerRoom, "trace");
      state.turn += 1;
      state.objectiveItemCrafted = false;
      state.objectiveItemInstalled = true;
      state.objectiveBlocksEscapeConsole = false;
      state.completedObjectiveItems.add(itemName);
      if (
        state.requiredEscapeSchematic &&
        !REUSABLE_SCHEMATICS.has(state.requiredEscapeSchematic)
      ) {
        state.foundSchematics.delete(state.requiredEscapeSchematic);
      }
      const recipe = getObjectiveRecipeByName(itemName);
      if (recipe?.unlockDeployable) {
        state.deployableUnlocks[recipe.unlockDeployable] = true;
        if (recipe.unlockDeployable === "noiseLure") {
          state.noiseLureCharges += recipe.chargesGranted ?? 0;
        } else if (recipe.unlockDeployable === "doorJam") {
          state.doorJamCharges += recipe.chargesGranted ?? 0;
        }
      }
      updateEscapeReadiness();
      updateUI();
    },
  });
}

const SCHEMATIC_SYMBOLS = {
  Resistors: "sym-resistor",
  Capacitors: "sym-capacitor",
  "Copper Wire": "sym-wire",
  Microcontroller: "sym-ic",
  "Servo Motor": "sym-motor",
  "9V Battery": "sym-battery",
  "Small Fuse (5A)": "sym-fuse",
  "24V Power Pack": "sym-battery",
  "Main Fuse (30A)": "sym-fuse",
};

const SCHEMATIC_FALLBACK_GLYPHS = {
  Resistors: "／\\/\\／",
  Capacitors: "|‖|",
  "Copper Wire": "────",
  Microcontroller: "[µ]",
  "Servo Motor": "(⟲)",
  "9V Battery": "+| |−",
  "Small Fuse (5A)": "[‒]",
  "24V Power Pack": "+| |−",
  "Main Fuse (30A)": "[‒]",
};

function getSchematicSymbolId(partName) {
  return SCHEMATIC_SYMBOLS[partName] ?? "sym-generic";
}

function getFallbackGlyph(partName) {
  return SCHEMATIC_FALLBACK_GLYPHS[partName] ?? "◇";
}

function createSchematicIcon(partName, { size = 28 } = {}) {
  const symbolId = getSchematicSymbolId(partName);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("schematic-icon");
  svg.setAttribute("viewBox", "0 0 64 64");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("aria-hidden", "true");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `#${symbolId}`);
  use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${symbolId}`);
  svg.appendChild(use);
  return svg;
}

function getMiniGameConfig(miniGameId) {
  return MINI_GAME_TEMPLATES[miniGameId] ?? null;
}

function getMiniGameSeed(night, turn, tries, variation = 0) {
  return night * 100000 + turn * 100 + tries + variation * 10000;
}

function getMiniGameSeedOffset(miniGameId) {
  if (miniGameId === "CHEM_BALANCE") {
    return state.titrationBatch ?? 0;
  }
  return 0;
}

function buildMiniGameInstance(miniGameId, tries = 0) {
  const config = getMiniGameConfig(miniGameId);
  if (!config) return null;
  const night = state.currentNight;
  const seed = getMiniGameSeed(night, state.turn, tries, getMiniGameSeedOffset(miniGameId));
  const generated = config.generate(seed, night, config);
  return {
    id: miniGameId,
    type: config.type,
    title: config.title,
    actionLabel: config.actionLabel,
    roomHintText: config.roomHintText,
    seed,
    night,
    instanceState: generated.state,
    instanceSolution: generated.solution,
    ui: generated.ui,
    tries,
    startedAtTurn: state.turn,
    result: null,
  };
}

function regenerateMiniGameInstance() {
  if (!state.miniGame) return;
  const tries = state.miniGame.tries;
  const config = getMiniGameConfig(state.miniGame.id);
  if (!config) return;
  const seed = getMiniGameSeed(
    state.currentNight,
    state.turn,
    tries,
    getMiniGameSeedOffset(state.miniGame.id)
  );
  const generated = config.generate(seed, state.currentNight, config);
  state.miniGame.seed = seed;
  state.miniGame.instanceState = generated.state;
  state.miniGame.instanceSolution = generated.solution;
  state.miniGame.ui = generated.ui;
}

function openMiniGame(miniGameId) {
  if (!miniGameId || state.miniGameActive) return;
  const instance = buildMiniGameInstance(miniGameId, 0);
  if (!instance) return;
  state.miniGame = instance;
  state.miniGameActive = true;
  state.objectiveBlocked = true;
  closePanels();
  renderMiniGame();
  openPanel(dom.miniGamePanel);
  updateUI();
}

function closeMiniGame() {
  if (!state.miniGameActive) return;
  if (state.miniGame?.type === "patch_drag") {
    const timer = state.miniGame.instanceState?.autoRunTimer;
    if (timer) {
      clearInterval(timer);
      state.miniGame.instanceState.autoRunTimer = null;
      state.miniGame.instanceState.autoRunning = false;
    }
  }
  state.miniGameActive = false;
  state.miniGame = null;
  state.objectiveBlocked = false;
  stopMiniGameAnimation();
  closePanel(dom.miniGamePanel);
  updateUI();
}

function cancelMiniGame() {
  if (!state.miniGameActive) return;
  applyMiniGameCancelPenalty();
  closeMiniGame();
}

function renderMiniGame() {
  const game = state.miniGame;
  if (!game || !dom.miniGameTitle || !dom.miniGameText || !dom.miniGameOptions) return;
  ensureMiniGameStylesInjected();
  if (dom.miniGamePanel) {
    if (game.type === "patch_drag") {
      dom.miniGamePanel.dataset.patchMode = "true";
    } else {
      delete dom.miniGamePanel.dataset.patchMode;
    }
  }
  if (dom.miniGameSubmitBtn) {
    dom.miniGameSubmitBtn.classList.remove("patch-apply");
  }
  dom.miniGameTitle.textContent = game.title;
  dom.miniGameText.textContent = game.ui?.text || game.roomHintText || "";
  dom.miniGameText.classList.remove("patch-instruction");
  dom.miniGameOptions.innerHTML = "";
  stopMiniGameAnimation();
  setMiniGameCancelVisibility({ showBottomBar: true, showInline: false });
  switch (game.type) {
    case "signal_tuner":
      renderSignalTuner(game);
      break;
    case "dial_lock":
      renderDialLock(game);
      break;
    case "titration_transfer":
      renderTitrationTransfer(game);
      break;
    case "titration_quick":
      renderTitrationQuick(game);
      break;
    case "circuit_trace":
      renderCircuitTrace(game);
      break;
    case "resistor_kit":
      renderResistorKit(game);
      break;
    case "patch_drag":
      renderPatchDrag(game);
      break;
    case "boss_finish":
      renderBossFinish(game);
      break;
    case "balance_hold":
      renderBalanceHold(game);
      break;
    default:
      break;
  }
  applyMiniGameMobileLayout();
}

function stopMiniGameAnimation() {
  if (miniGameAnimationId) {
    cancelAnimationFrame(miniGameAnimationId);
    miniGameAnimationId = null;
  }
  miniGameAnimationToken += 1;
}

function startMiniGameAnimation(callback) {
  stopMiniGameAnimation();
  const token = miniGameAnimationToken;
  const loop = () => {
    if (!state.miniGameActive || token !== miniGameAnimationToken) return;
    callback();
    miniGameAnimationId = requestAnimationFrame(loop);
  };
  miniGameAnimationId = requestAnimationFrame(loop);
}

function setMiniGameSubmitButton({ label, enabled = true, visible = true } = {}) {
  if (!dom.miniGameSubmitBtn) return;
  dom.miniGameSubmitBtn.textContent = label ?? dom.miniGameSubmitBtn.textContent;
  dom.miniGameSubmitBtn.disabled = !enabled;
  dom.miniGameSubmitBtn.style.display = visible ? "" : "none";
}

function setMiniGameCancelVisibility({ showBottomBar, showInline }) {
  if (!dom.miniGameCancelBtn) return;
  dom.miniGameCancelBtn.style.display = showBottomBar ? "" : "none";
  const actions = dom.miniGameCancelBtn.closest(".mini-game-actions");
  if (actions) {
    const submitVisible = dom.miniGameSubmitBtn && dom.miniGameSubmitBtn.style.display !== "none";
    actions.style.display = showBottomBar || submitVisible ? "" : "none";
  }
  if (dom.miniGamePanel) {
    dom.miniGamePanel.dataset.inlineCancel = showInline ? "true" : "false";
  }
}

function isMiniGameMobile() {
  return window.matchMedia?.("(pointer:coarse)")?.matches || window.innerWidth < 520;
}

function applyMiniGameMobileLayout() {
  if (!dom.miniGamePanel) return false;
  const isMobile = isMiniGameMobile();
  dom.miniGamePanel.classList.toggle("miniGameMobile", isMobile);
  const footerHeight = dom.overlayFooter?.getBoundingClientRect().height ?? 0;
  dom.miniGamePanel.style.setProperty("--mini-game-footer-height", `${Math.round(footerHeight)}px`);
  return isMobile;
}

function ensureMiniGameStylesInjected() {
  if (miniGameStylesInjected) return;
  const style = document.createElement("style");
  style.id = "miniGameMobileStyles";
  style.textContent = `
    #miniGamePanel.miniGameMobile .mini-game-content {
      max-height: calc(100vh - var(--mini-game-footer-height, 0px) - env(safe-area-inset-bottom, 0px));
      overflow: hidden;
      display: grid;
      gap: 8px;
    }
    #miniGamePanel.miniGameMobile .mini-game-options {
      overflow: hidden;
    }
    #miniGamePanel.miniGameMobile #miniGameTitle { font-size: 18px; letter-spacing: 2px; }
    #miniGamePanel.miniGameMobile #miniGameText  { font-size: 14px; line-height: 1.25; margin-bottom: 8px; }
    #miniGamePanel.miniGameMobile button         { min-height: 44px; padding: 10px 12px; }
    #miniGamePanel.miniGameMobile .btnRow        { display:flex; gap:10px; flex-wrap:wrap; }
    #miniGamePanel.miniGameMobile .btnRow > button { flex:1; }
    #miniGamePanel .mini-game-content button { min-height: 44px; }
    #miniGamePanel.miniGameMobile input[type="range"] { height: 32px; }
    #miniGamePanel.miniGameMobile .chem-beaker { height: 120px; }
    #miniGamePanel .patch-output { font-family: ui-monospace, SFMono-Regular, SFMono, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
    #miniGamePanel .patch-output { background: rgba(8, 12, 18, 0.65); border: 1px solid rgba(255,255,255,0.2); padding: 6px 8px; display: grid; gap: 4px; }
    #miniGamePanel .patch-trace-line { font-size: 11px; opacity: 0.85; }
    #miniGamePanel .patch-instruction { font-size: 12px; opacity: 0.85; }
    #miniGamePanel .patch-info { font-size: 12px; }
    #miniGamePanel .patch-running { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; opacity: 0.75; }
    #miniGamePanel .patch-tile.selected { border: 1px solid rgba(140, 220, 255, 0.9); box-shadow: 0 0 10px rgba(140, 220, 255, 0.7); }
    #miniGamePanel .patch-tile.disabled { opacity: 0.45; cursor: not-allowed; }
    #miniGamePanel .commit-pulse { animation: miniGameCommitPulse 0.6s ease-out; }
    #miniGamePanel .reskit-hud { padding: 10px; border: 1px solid rgba(255,255,255,0.15); background: rgba(0,0,0,0.35); width: 100%; display: grid; gap: 4px; }
    #miniGamePanel .reskit-hud .big { font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
    #miniGamePanel .reskit-hud .reskit-now { transition: transform 0.2s ease; }
    #miniGamePanel .reskit-hud .status { font-size: 14px; opacity: 0.9; text-transform: uppercase; }
    #miniGamePanel .reskit-hud .hint { font-size: 12px; opacity: 0.8; }
    #miniGamePanel .reskit-meter { height: 18px; border-radius: 8px; }
    #miniGamePanel .reskit-chip { min-height: 54px; font-size: 18px; }
    #miniGamePanel .reskit-chip.active { box-shadow: 0 0 16px rgba(140, 220, 255, 0.55); }
    #miniGamePanel .reskit-chip.inactive { background: rgba(14, 18, 26, 0.9); border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.8); }
    @keyframes miniGameCommitPulse {
      0% { box-shadow: 0 0 0 0 rgba(140, 220, 255, 0.9); }
      100% { box-shadow: 0 0 0 12px rgba(140, 220, 255, 0); }
    }
  `;
  document.head.appendChild(style);
  miniGameStylesInjected = true;
}

function makeBtnRow(buttons, opts = {}) {
  const { wrap = true, align = "center" } = opts;
  const row = document.createElement("div");
  row.className = "btnRow";
  row.style.display = "flex";
  row.style.gap = "8px";
  row.style.flexWrap = wrap ? "wrap" : "nowrap";
  row.style.justifyContent = align;
  buttons.forEach((button) => row.appendChild(button));
  return row;
}

function getSignalSweepPosition(game) {
  const { instanceState, instanceSolution } = game;
  if (!instanceState.sweepStart) {
    instanceState.sweepStart = performance.now();
  }
  const elapsed = performance.now() - instanceState.sweepStart;
  const phase = (elapsed % instanceSolution.sweepPeriod) / instanceSolution.sweepPeriod;
  return phase;
}

function getBossAlignmentPosition(game) {
  const { instanceState, instanceSolution } = game;
  if (!instanceState.alignmentStart) {
    instanceState.alignmentStart = performance.now();
  }
  const elapsed = performance.now() - instanceState.alignmentStart;
  return (elapsed % instanceSolution.alignPeriod) / instanceSolution.alignPeriod;
}

function getBossCutPressure(game) {
  const { instanceState } = game;
  if (!instanceState.cutPressureStart) {
    instanceState.cutPressureStart = performance.now();
  }
  const elapsed = performance.now() - instanceState.cutPressureStart;
  return (Math.sin((elapsed / 1200) * Math.PI * 2) + 1) / 2;
}

function getBossCutBand(game) {
  const { instanceState, instanceSolution } = game;
  if (!instanceState.cutBandStart) {
    instanceState.cutBandStart = performance.now();
  }
  const width = instanceSolution.cutBand[1] - instanceSolution.cutBand[0];
  const elapsed = performance.now() - instanceState.cutBandStart;
  const drift = Math.sin((elapsed / instanceSolution.driftPeriod) * Math.PI * 2) * 0.08;
  const start = clamp(instanceSolution.cutBand[0] + drift, 0, 1 - width);
  return [start, start + width];
}

function getBossFinishRemainingMs(game, timerEl) {
  const { instanceState, instanceSolution } = game;
  const now = performance.now();
  if (!instanceState.startedAt) {
    instanceState.startedAt = now;
  }
  instanceState.elapsedMs = now - instanceState.startedAt;
  const remaining =
    instanceSolution.totalTimeLimitMs - instanceState.elapsedMs - instanceState.timePenaltyMs;
  const clamped = Math.max(0, remaining);
  if (timerEl) {
    timerEl.textContent = `Time remaining: ${Math.ceil(clamped / 1000)}s`;
  }
  if (remaining <= 0) {
    handleMiniGameFailure(game);
  }
  return remaining;
}

function attemptSignalTunerLock(game) {
  const { instanceState, instanceSolution } = game;
  const position = getSignalSweepPosition(game);
  const [start, end] =
    instanceState.phase === "decrypt"
      ? instanceSolution.decryptWindows[instanceState.decryptIndex]
      : instanceSolution.sweepWindow;
  const inWindow = position >= start && position <= end;
  if (inWindow) {
    if (instanceState.phase === "sweep") {
      instanceState.progress += 1;
      if (instanceState.progress >= instanceSolution.locksNeeded) {
        instanceState.phase = "decrypt";
        instanceState.decryptIndex = 0;
      }
    } else {
      instanceState.decryptIndex += 1;
      if (instanceState.decryptIndex >= instanceSolution.decryptWindows.length) {
        handleMiniGameSuccess(game);
        return;
      }
    }
  } else {
    instanceState.strikes += 1;
    instanceState.progress = 0;
    instanceState.decryptIndex = 0;
  }
  if (instanceState.strikes >= instanceSolution.strikesAllowed) {
    handleMiniGameFailure(game);
    return;
  }
  renderMiniGame();
}

function renderSignalTuner(game) {
  const { instanceState, instanceSolution } = game;
  const status =
    instanceState.phase === "decrypt"
      ? `Decrypt locks ${instanceState.decryptIndex + 1}/${instanceSolution.decryptWindows.length}`
      : `Sweep locks ${instanceState.progress}/${instanceSolution.locksNeeded}`;
  dom.miniGameText.innerHTML =
    `Keep the sweep in the safe band, then lock each window.<br>${status}`;

  const wrapper = document.createElement("div");
  wrapper.className = "mini-game-signal";
  wrapper.style.display = "grid";
  wrapper.style.gap = "12px";

  const bar = document.createElement("div");
  bar.className = "signal-bar";
  bar.style.position = "relative";
  bar.style.height = "16px";
  bar.style.border = "1px solid rgba(255,255,255,0.4)";
  bar.style.background = "rgba(10, 15, 20, 0.6)";

  const windowEl = document.createElement("div");
  windowEl.className = "signal-window";
  windowEl.style.position = "absolute";
  windowEl.style.top = "0";
  windowEl.style.bottom = "0";
  windowEl.style.background = "rgba(66, 180, 120, 0.5)";

  const marker = document.createElement("div");
  marker.className = "signal-marker";
  marker.style.position = "absolute";
  marker.style.top = "-3px";
  marker.style.width = "4px";
  marker.style.height = "22px";
  marker.style.background = "rgba(220, 220, 220, 0.9)";

  bar.appendChild(windowEl);
  bar.appendChild(marker);
  wrapper.appendChild(bar);

  const strikeText = document.createElement("div");
  strikeText.textContent = `Strikes: ${instanceState.strikes}/3`;
  wrapper.appendChild(strikeText);

  dom.miniGameOptions.appendChild(wrapper);
  setMiniGameSubmitButton({
    label: instanceState.phase === "decrypt" ? "Lock Decrypt" : "Lock Signal",
    enabled: true,
    visible: true,
  });

  const updateSweep = () => {
    const position = getSignalSweepPosition(game);
    const windowRange =
      instanceState.phase === "decrypt"
        ? instanceSolution.decryptWindows[instanceState.decryptIndex]
        : instanceSolution.sweepWindow;
    windowEl.style.left = `${windowRange[0] * 100}%`;
    windowEl.style.width = `${(windowRange[1] - windowRange[0]) * 100}%`;
    marker.style.left = `${position * 100}%`;
  };
  updateSweep();
  startMiniGameAnimation(updateSweep);
}

function getDialDistance(a, b) {
  const diff = Math.abs(a - b);
  return Math.min(diff, 100 - diff);
}

function isTouchDevice() {
  return Boolean(window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
}

function confirmDialLockStep(game) {
  const { instanceState, instanceSolution } = game;
  const { sequence, pattern, tolerance } = instanceSolution;
  const step = instanceState.stepIndex;
  const requiredDirection = pattern[step];
  const target = sequence[step];
  const adjustedTolerance = isTouchDevice() ? tolerance + 1 : tolerance;
  if (!instanceState.lastDirection || instanceState.lastDirection !== requiredDirection) {
    handleMiniGameFailure(game);
    return;
  }
  if (getDialDistance(instanceState.value, target) > adjustedTolerance) {
    handleMiniGameFailure(game);
    return;
  }
  instanceState.stepIndex += 1;
  if (instanceState.stepIndex >= sequence.length) {
    handleMiniGameSuccess(game);
    return;
  }
  renderMiniGame();
}

function renderDialLock(game) {
  const { instanceState, instanceSolution } = game;
  const step = instanceState.stepIndex;
  const target = instanceSolution.sequence[step];
  const direction = instanceSolution.pattern[step];
  dom.miniGameText.innerHTML =
    `Align the valve stops in order. Step ${step + 1}/3: turn ${direction} to ${target}.<br>Use the dial or buttons, then confirm.`;

  const wrapper = document.createElement("div");
  wrapper.className = "mini-game-dial";
  wrapper.style.display = "grid";
  wrapper.style.justifyItems = "center";
  wrapper.style.gap = "10px";

  const dial = document.createElement("div");
  dial.className = "dial-face";
  dial.style.width = "160px";
  dial.style.height = "160px";
  dial.style.border = "2px solid rgba(255,255,255,0.4)";
  dial.style.borderRadius = "50%";
  dial.style.position = "relative";
  dial.style.background = "rgba(18, 24, 32, 0.7)";

  const pointer = document.createElement("div");
  pointer.style.position = "absolute";
  pointer.style.width = "2px";
  pointer.style.height = "70px";
  pointer.style.background = "rgba(200, 220, 240, 0.9)";
  pointer.style.left = "50%";
  pointer.style.top = "10px";
  pointer.style.transformOrigin = "bottom center";

  const readout = document.createElement("div");
  readout.textContent = `Value: ${instanceState.value}`;

  const updatePointer = () => {
    pointer.style.transform = `rotate(${instanceState.value * 3.6}deg) translateX(-50%)`;
    readout.textContent = `Value: ${instanceState.value}`;
  };
  updatePointer();

  const updateDialValue = (nextValue) => {
    if (nextValue === instanceState.value) return;
    instanceState.lastDirection = nextValue > instanceState.value ? "R" : "L";
    instanceState.value = ((nextValue % 100) + 100) % 100;
    updatePointer();
    if (slider) {
      slider.value = String(instanceState.value);
    }
  };

  const handlePointerDown = (event) => {
    event.preventDefault();
    instanceState.dragStartX = event.clientX;
    instanceState.dragStartValue = instanceState.value;
    const handleMove = (moveEvent) => {
      const delta = moveEvent.clientX - instanceState.dragStartX;
      const ticks = Math.round(delta / 4);
      let next = (instanceState.dragStartValue + ticks) % 100;
      if (next < 0) next += 100;
      if (delta !== 0) {
        instanceState.lastDirection = delta > 0 ? "R" : "L";
      }
      instanceState.value = next;
      updatePointer();
    };
    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      instanceState.dragStartX = null;
      instanceState.dragStartValue = null;
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  dial.addEventListener("pointerdown", handlePointerDown);
  dial.appendChild(pointer);
  wrapper.appendChild(dial);
  wrapper.appendChild(readout);

  const controlRow = document.createElement("div");
  controlRow.style.display = "flex";
  controlRow.style.flexWrap = "wrap";
  controlRow.style.gap = "6px";
  [1, 5].forEach((stepSize) => {
    const down = document.createElement("button");
    down.type = "button";
    down.textContent = `-${stepSize}`;
    down.addEventListener("click", () => updateDialValue(instanceState.value - stepSize));
    const up = document.createElement("button");
    up.type = "button";
    up.textContent = `+${stepSize}`;
    up.addEventListener("click", () => updateDialValue(instanceState.value + stepSize));
    controlRow.appendChild(down);
    controlRow.appendChild(up);
  });

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = "0";
  slider.max = "99";
  slider.value = String(instanceState.value);
  slider.addEventListener("input", (event) => {
    updateDialValue(Number(event.target.value));
  });

  wrapper.appendChild(controlRow);
  wrapper.appendChild(slider);
  dom.miniGameOptions.appendChild(wrapper);

  setMiniGameSubmitButton({ label: "Confirm Step", enabled: true, visible: true });
}

function handleCircuitNodeClick(nodeId) {
  const game = state.miniGame;
  if (!game) return;
  const { instanceState, instanceSolution } = game;
  const selectedPath = instanceState.selectedPath;
  const last = selectedPath[selectedPath.length - 1];
  if (nodeId === last) return;
  if (!instanceSolution.edges.has(`${last}-${nodeId}`)) {
    pushStatus("No direct trace.", 2);
    return;
  }
  if (instanceSolution.hotNodes.includes(nodeId)) {
    handleMiniGameFailure(game);
    return;
  }
  selectedPath.push(nodeId);
  if (nodeId === instanceSolution.target) {
    const matchesSolution =
      selectedPath.length === instanceSolution.path.length &&
      selectedPath.every((entry, index) => entry === instanceSolution.path[index]);
    if (matchesSolution) {
      handleMiniGameSuccess(game);
      return;
    }
    handleMiniGameFailure(game);
    return;
  }
  renderMiniGame();
}

function undoCircuitSegment(event) {
  if (event?.preventDefault) {
    event.preventDefault();
  }
  const game = state.miniGame;
  if (!game) return;
  const selectedPath = game.instanceState.selectedPath;
  if (selectedPath.length <= 1) return;
  selectedPath.pop();
  renderMiniGame();
}

function resetCircuitTrace() {
  const game = state.miniGame;
  if (!game) return;
  game.instanceState.selectedPath = [game.instanceSolution.source];
  renderMiniGame();
}

function renderCircuitTrace(game) {
  const { instanceState, instanceSolution } = game;
  dom.miniGameText.innerHTML =
    "Trace power from SRC to COIL without touching hot nodes.<br>Tap nodes to trace. Undo/Reset below.";
  const board = document.createElement("div");
  board.className = "circuit-board";
  board.style.position = "relative";
  board.style.width = "320px";
  board.style.height = "240px";
  board.style.border = "1px solid rgba(255,255,255,0.3)";
  board.style.background = "rgba(12, 18, 24, 0.65)";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "320");
  svg.setAttribute("height", "240");
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";

  for (let i = 0; i < instanceState.selectedPath.length - 1; i += 1) {
    const from = instanceSolution.nodes.find((node) => node.id === instanceState.selectedPath[i]);
    const to = instanceSolution.nodes.find((node) => node.id === instanceState.selectedPath[i + 1]);
    if (!from || !to) continue;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", from.x);
    line.setAttribute("y1", from.y);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y);
    line.setAttribute("stroke", "rgba(80, 200, 140, 0.85)");
    line.setAttribute("stroke-width", "4");
    svg.appendChild(line);
  }
  board.appendChild(svg);

  instanceSolution.nodes.forEach((node) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "circuit-node";
    button.style.position = "absolute";
    button.style.left = `${node.x}px`;
    button.style.top = `${node.y}px`;
    button.style.transform = "translate(-50%, -50%)";
    button.style.width = "46px";
    button.style.height = "32px";
    button.style.border = "1px solid rgba(255,255,255,0.5)";
    button.style.background = "rgba(20, 28, 38, 0.85)";
    button.style.color = "white";
    button.style.fontSize = "12px";
    let label = "NODE";
    if (node.id === instanceSolution.source) label = "SRC";
    if (node.id === instanceSolution.target) label = "COIL";
    if (instanceSolution.hotNodes.includes(node.id)) label = "HOT";
    button.textContent = label;
    button.addEventListener("click", () => handleCircuitNodeClick(node.id));
    board.appendChild(button);
  });

  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.gap = "8px";
  controls.style.justifyContent = "center";

  const undoButton = document.createElement("button");
  undoButton.type = "button";
  undoButton.textContent = "UNDO";
  undoButton.style.padding = "6px 12px";
  undoButton.addEventListener("click", undoCircuitSegment);

  const resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.textContent = "RESET";
  resetButton.style.padding = "6px 12px";
  resetButton.addEventListener("click", resetCircuitTrace);

  controls.appendChild(undoButton);
  controls.appendChild(resetButton);

  dom.miniGameOptions.appendChild(board);
  dom.miniGameOptions.appendChild(controls);
  setMiniGameSubmitButton({ visible: false });
}

function submitResistorKit(game) {
  const { instanceState, instanceSolution } = game;
  const { V, I_target, toleranceA, PmaxW } = instanceSolution;
  const req = instanceState.reqOhms;
  if (!req) return;
  const Icalc = V / req;
  const Pcalc = (V * V) / req;
  if (Pcalc <= PmaxW && Math.abs(Icalc - I_target) <= toleranceA) {
    handleMiniGameSuccess(game);
    return;
  }
  const profile = getNightProfile();
  pushStatus("Circuit pops— regulator burned out.", 3);
  registerSignal(state.playerRoom, 0.28 * profile.signalStrength.device, {
    type: "burnout",
    lastKnownChance: 0.25,
    bleed: true,
  });
  applyRoomStress(state.playerRoom);
  closeMiniGame();
}

function updateResistorNowLine(instanceState, nowLine, targetCurrent) {
  if (targetCurrent == null || Number.isNaN(targetCurrent)) {
    instanceState.nowDisplayValue = null;
    instanceState.nowAnimation = null;
    nowLine.textContent = "NOW: —";
    nowLine.style.transform = "translateY(0)";
    return;
  }
  const previous = instanceState.nowDisplayValue ?? targetCurrent;
  if (Math.abs(previous - targetCurrent) < 0.005) {
    instanceState.nowDisplayValue = targetCurrent;
    nowLine.textContent = `NOW: ${targetCurrent.toFixed(2)}A`;
    nowLine.style.transform = "translateY(0)";
    return;
  }
  const animation = {
    startTime: performance.now(),
    duration: 220,
    from: previous,
    to: targetCurrent,
  };
  instanceState.nowAnimation = animation;
  nowLine.style.transform = targetCurrent >= previous ? "translateY(-2px)" : "translateY(2px)";
  startMiniGameAnimation(() => {
    if (instanceState.nowAnimation !== animation) return;
    const elapsed = performance.now() - animation.startTime;
    const t = clamp(elapsed / animation.duration, 0, 1);
    const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const value = animation.from + (animation.to - animation.from) * eased;
    instanceState.nowDisplayValue = value;
    nowLine.textContent = `NOW: ${value.toFixed(2)}A`;
    if (t >= 1) {
      instanceState.nowDisplayValue = animation.to;
      instanceState.nowAnimation = null;
      nowLine.style.transform = "translateY(0)";
      stopMiniGameAnimation();
    }
  });
}

function renderResistorKit(game) {
  const { instanceState, instanceSolution } = game;
  const { V, I_target, toleranceA, PmaxW } = instanceSolution;
  dom.miniGameText.innerHTML = "Assemble resistors to hit the target current.";
  setMiniGameCancelVisibility({ showBottomBar: false, showInline: true });

  const wrapper = document.createElement("div");
  wrapper.className = "reskit-root";
  wrapper.style.display = "grid";
  wrapper.style.gap = "10px";
  wrapper.style.width = "100%";

  const computeReq = () => {
    let req = 0;
    instanceState.selected.forEach((active, index) => {
      if (active) req += instanceState.kit[index];
    });
    instanceState.reqOhms = req;
    return req;
  };

  const req = computeReq();
  const hasSelection = req > 0;
  const isShort = req <= 0;
  const Icalc = hasSelection ? V / req : null;
  const Pcalc = hasSelection ? (V * V) / req : null;
  const isOverheat = isShort ? true : hasSelection ? Pcalc > PmaxW : false;
  const isNearMax = hasSelection ? Pcalc > PmaxW * 0.9 : false;
  const isHigh = isShort ? true : hasSelection ? Icalc > I_target + toleranceA || isNearMax : false;
  const isLow = hasSelection ? Icalc < I_target - toleranceA : false;
  const statusText = isShort
    ? "OVERHEAT"
    : !hasSelection
      ? "NO CIRCUIT"
      : isOverheat
        ? "OVERHEAT"
        : isHigh
          ? "HIGH"
          : isLow
            ? "LOW"
            : "OK";
  const markerColor = isShort
    ? "rgba(220, 80, 80, 0.95)"
    : !hasSelection
      ? "rgba(160, 160, 160, 0.9)"
      : isHigh || isOverheat
        ? "rgba(220, 80, 80, 0.95)"
        : isLow
          ? "rgba(170, 170, 170, 0.95)"
          : "rgba(80, 200, 120, 0.95)";


  const hud = document.createElement("div");
  hud.className = "reskit-hud";

  const targetLine = document.createElement("div");
  targetLine.className = "big";
  targetLine.textContent = `TARGET: ${I_target.toFixed(2)}A`;

  const nowLine = document.createElement("div");
  nowLine.className = "big reskit-now";

  hud.appendChild(nowLine);
  hud.appendChild(targetLine);

  const scaleMax = Math.max(I_target + toleranceA * 3, I_target * 1.8);
  const displayCurrent = isShort ? scaleMax : Icalc;
  updateResistorNowLine(instanceState, nowLine, hasSelection || isShort ? displayCurrent : null);

  const microCopy = document.createElement("div");
  microCopy.style.fontSize = "12px";
  microCopy.style.opacity = "0.85";
  microCopy.style.textAlign = "center";
  if (statusText === "LOW") {
    microCopy.textContent = "";
  } else if (statusText === "HIGH") {
    microCopy.textContent = "";
  } else if (statusText === "OVERHEAT") {
    microCopy.textContent = "";
  } else if (statusText === "OK") {
    microCopy.textContent = "";
  } else {
    microCopy.textContent = "";
  }

  const meterBlock = document.createElement("div");
  meterBlock.style.display = "grid";
  meterBlock.style.gap = "6px";
  meterBlock.style.width = "100%";

  const meterLabels = document.createElement("div");
  meterLabels.style.display = "flex";
  meterLabels.style.justifyContent = "space-between";
  meterLabels.style.fontSize = "11px";
  meterLabels.style.opacity = "0.7";
  const lowLabel = document.createElement("div");
  lowLabel.textContent = "LOW current";
  const highLabel = document.createElement("div");
  highLabel.textContent = "HIGH current";
  meterLabels.appendChild(lowLabel);
  meterLabels.appendChild(highLabel);

  const meter = document.createElement("div");
  meter.className = "reskit-meter";
  meter.style.position = "relative";
  meter.style.width = "100%";
  meter.style.border = "1px solid rgba(255,255,255,0.4)";
  meter.style.background = "rgba(10, 15, 20, 0.6)";
  meter.style.overflow = "hidden";

  const mapCurrentToPct = (value) => clamp(value / scaleMax, 0, 1) * 100;
  const bandLeft = mapCurrentToPct(I_target - toleranceA);
  const bandRight = mapCurrentToPct(I_target + toleranceA);
  const band = document.createElement("div");
  band.style.position = "absolute";
  band.style.left = `${Math.min(bandLeft, bandRight)}%`;
  band.style.width = `${Math.max(2, Math.abs(bandRight - bandLeft))}%`;
  band.style.top = "0";
  band.style.bottom = "0";
  band.style.background = "rgba(80, 200, 120, 0.35)";
  band.style.boxShadow = "0 0 0 1px rgba(80, 200, 120, 0.75)";

  const marker = document.createElement("div");
  marker.style.position = "absolute";
  marker.style.top = "-4px";
  marker.style.width = "6px";
  marker.style.height = "26px";
  marker.style.borderRadius = "4px";
  marker.style.background = markerColor;
  marker.style.transition = "left 0.22s ease-out";
  const markerPct = hasSelection || isShort ? mapCurrentToPct(displayCurrent) : 0;
  const previousMarkerPct = instanceState.markerPct ?? markerPct;
  marker.style.left = `${previousMarkerPct}%`;

  meter.appendChild(band);
  meter.appendChild(marker);
  requestAnimationFrame(() => {
    marker.style.left = `${markerPct}%`;
  });
  instanceState.markerPct = markerPct;

  const scienceBlock = document.createElement("div");
  scienceBlock.style.display = "grid";
  scienceBlock.style.gridTemplateColumns = "1fr 1fr";
  scienceBlock.style.gap = "2px 12px";
  scienceBlock.style.fontSize = "11px";
  scienceBlock.style.opacity = "0.75";

  const supplyBlock = document.createElement("div");
  supplyBlock.style.display = "grid";
  supplyBlock.style.gap = "2px";
  const supplyLine = document.createElement("div");
  supplyLine.textContent = `Supply: ${V}V`;
  const pmaxLine = document.createElement("div");
  pmaxLine.textContent = `Pmax: ${PmaxW}W`;
  supplyBlock.appendChild(supplyLine);
  supplyBlock.appendChild(pmaxLine);

  const formulaBlock = document.createElement("div");
  formulaBlock.style.display = "grid";
  formulaBlock.style.gap = "2px";
  formulaBlock.style.justifyItems = "end";
  const ohmsLine = document.createElement("div");
  ohmsLine.textContent = "V = I·R";
  const powerFormulaLine = document.createElement("div");
  powerFormulaLine.textContent = "P = I²R = V²/R";
  formulaBlock.appendChild(ohmsLine);
  formulaBlock.appendChild(powerFormulaLine);

  scienceBlock.appendChild(supplyBlock);
  scienceBlock.appendChild(formulaBlock);

  meterBlock.appendChild(meterLabels);
  meterBlock.appendChild(meter);
  meterBlock.appendChild(scienceBlock);

  const kitTray = document.createElement("div");
  kitTray.style.display = "grid";
  kitTray.style.gap = "8px";
  kitTray.style.width = "100%";
  kitTray.style.gridTemplateColumns = isMiniGameMobile()
    ? "repeat(2, minmax(0, 1fr))"
    : "repeat(4, minmax(0, 1fr))";

  instanceState.kit.forEach((value, index) => {
    const active = instanceState.selected[index];
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `reskit-chip ${active ? "active" : "inactive"}`;
    chip.style.display = "grid";
    chip.style.alignItems = "center";
    chip.style.justifyItems = "center";
    chip.style.padding = "8px 10px";
    chip.style.borderRadius = "10px";
    chip.style.border = active ? "2px solid rgba(140, 220, 255, 0.9)" : "1px solid rgba(255,255,255,0.35)";
    chip.style.background = active ? "rgba(40, 80, 120, 0.7)" : "rgba(20, 28, 38, 0.85)";
    chip.style.color = "white";
    chip.style.fontWeight = "600";
    chip.textContent = active ? `${value}Ω ✓` : `${value}Ω`;
    chip.addEventListener("click", () => {
      instanceState.selected[index] = !instanceState.selected[index];
      renderMiniGame();
    });
    kitTray.appendChild(chip);
  });

  wrapper.appendChild(hud);
  wrapper.appendChild(microCopy);
  wrapper.appendChild(meterBlock);
  wrapper.appendChild(kitTray);

  dom.miniGameOptions.appendChild(wrapper);

  const applyButton = document.createElement("button");
  applyButton.type = "button";
  applyButton.textContent = "Apply";
  applyButton.disabled = statusText !== "OK";
  applyButton.addEventListener("click", () => submitResistorKit(game));

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", cancelMiniGame);

  const actionRow = makeBtnRow([applyButton, cancelButton], { wrap: false });
  dom.miniGameOptions.appendChild(actionRow);
  setMiniGameSubmitButton({ visible: false });
}

function submitTitrationQuick(game) {
  const { instanceState } = game;
  if (!instanceState.lastSuccess) return;
  handleMiniGameSuccess(game);
}

function mixRgb(start, end, amount) {
  const t = clamp(amount, 0, 1);
  const r = Math.round(start[0] + (end[0] - start[0]) * t);
  const g = Math.round(start[1] + (end[1] - start[1]) * t);
  const b = Math.round(start[2] + (end[2] - start[2]) * t);
  return [r, g, b];
}

function getTitrationPh(diff, toleranceMl) {
  const isSuccess = Math.abs(diff) <= toleranceMl;
  const phOffset = Math.min(7, Math.abs(diff) / (toleranceMl * 2));
  let ph = 7.0;
  if (!isSuccess) {
    if (diff < 0) {
      ph = clamp(7.0 - phOffset, 1.0, 6.9);
    } else if (diff > 0) {
      ph = clamp(7.0 + phOffset, 7.1, 14.0);
    }
  }
  return ph;
}

function getTitrationPhColor(ph) {
  const clamped = clamp(ph, 1, 14);
  const acidic = [80, 130, 230];
  const neutral = [245, 245, 245];
  const basic = [210, 70, 70];
  if (clamped <= 7) {
    const t = (clamped - 1) / 6;
    const [r, g, b] = mixRgb(acidic, neutral, t);
    return `rgba(${r}, ${g}, ${b}, 0.9)`;
  }
  const t = (clamped - 7) / 7;
  const [r, g, b] = mixRgb(neutral, basic, t);
  return `rgba(${r}, ${g}, ${b}, 0.9)`;
}

function computeTitrationColor(diff, tol) {
  const ph = getTitrationPh(diff, tol);
  const label = Math.abs(diff) <= tol ? "neutral" : diff < 0 ? "acidic" : "basic";
  return { color: getTitrationPhColor(ph), label };
}

function getTitrationReadout(diff, toleranceMl) {
  const isSuccess = Math.abs(diff) <= toleranceMl;
  const ph = getTitrationPh(diff, toleranceMl);
  const statusLabel = isSuccess ? "NEUTRAL" : diff < 0 ? "TOO ACIDIC" : "TOO BASIC";
  return {
    ph,
    diffMl: diff,
    isSuccess,
    statusLabel,
  };
}

function resetTitrationTransferState(instanceState) {
  instanceState.selectedLoadStep = 10;
  instanceState.loadedMl = 0;
  instanceState.baseAddedMl = 0;
  instanceState.phase = "loading";
  instanceState.lastResult = null;
  instanceState.statusMessage = "";
  instanceState.lockControls = false;
  instanceState.pourStartAt = null;
  instanceState.pourDurationMs = null;
  instanceState.pourStartLoadMl = null;
  instanceState.pourStartBaseMl = null;
  instanceState.successQueued = false;
  instanceState.attemptTimeLimitMs = instanceState.attemptTimeLimitMs ?? 25000;
  instanceState.attemptStartedAtMs = performance.now();
  instanceState.timeoutHandled = false;
  instanceState.timeoutResetQueued = false;
}

function renderTitrationTransfer(game) {
  const { instanceState, instanceSolution } = game;
  const { acidMl, acidM, baseM, baseTargetMl, toleranceMl, targetPh, maxLoadMl, maxSampleMl } =
    instanceSolution;
  dom.miniGameText.innerHTML = `
    Load base, then POUR to adjust the mix.<br>
    <span style="font-size:11px">V<sub>b</sub> = (M<sub>a</sub> · V<sub>a</sub>) / M<sub>b</sub></span>
  `;
  setMiniGameCancelVisibility({ showBottomBar: false, showInline: false });

  const isLoading = instanceState.phase === "loading";
  const isPouring = instanceState.phase === "pouring";
  const locked = instanceState.lockControls;
  const loadedMl = instanceState.loadedMl ?? 0;
  const baseAddedMl = instanceState.baseAddedMl ?? 0;
  const attemptLimitMs = instanceState.attemptTimeLimitMs ?? 25000;
  if (!instanceState.attemptStartedAtMs) {
    instanceState.attemptStartedAtMs = performance.now();
  }

  const wrapper = document.createElement("div");
  wrapper.style.display = "grid";
  wrapper.style.gap = "8px";
  wrapper.style.position = "relative";

  const beakerRow = document.createElement("div");
  beakerRow.style.display = "flex";
  beakerRow.style.gap = "8px";
  beakerRow.style.alignItems = "stretch";
  beakerRow.style.justifyContent = "space-between";
  beakerRow.style.position = "relative";

  const makeBeaker = ({ label, color, fillPercent, bottomText }) => {
    const container = document.createElement("div");
    container.style.display = "grid";
    container.style.gap = "6px";
    container.style.flex = "1";

    const labelEl = document.createElement("div");
    labelEl.textContent = label;
    labelEl.style.fontSize = "12px";
    labelEl.style.fontWeight = "700";
    labelEl.style.textAlign = "center";

    const beaker = document.createElement("div");
    beaker.className = "chem-beaker";
    beaker.style.position = "relative";
    beaker.style.height = "120px";
    beaker.style.border = "1px solid rgba(255,255,255,0.45)";
    beaker.style.background = "rgba(12, 16, 24, 0.75)";
    beaker.style.borderRadius = "6px";
    beaker.style.overflow = "hidden";
    beaker.style.boxShadow = "0 0 8px rgba(120, 170, 255, 0.18)";

    const fill = document.createElement("div");
    fill.style.position = "absolute";
    fill.style.left = "0";
    fill.style.right = "0";
    fill.style.bottom = "0";
    fill.style.height = `${fillPercent}%`;
    fill.style.background = color;
    fill.style.boxShadow = "0 0 12px rgba(255,255,255,0.2)";
    beaker.appendChild(fill);

    container.appendChild(labelEl);
    container.appendChild(beaker);
    if (bottomText) {
      const bottomEl = document.createElement("div");
      bottomEl.textContent = bottomText;
      bottomEl.style.fontSize = "12px";
      bottomEl.style.textAlign = "center";
      container.appendChild(bottomEl);
      return { container, fill, bottomEl, labelEl };
    }
    return { container, fill, labelEl, bottomEl: null };
  };

  const formatMl = (value) => (value % 1 === 0 ? value.toFixed(0) : value.toFixed(1));
  const transferCapMl = maxSampleMl;
  const rightTotalMl = acidMl + baseAddedMl;
  const sampleFillPercent = clamp(rightTotalMl / transferCapMl, 0, 1) * 100;
  const diff = baseAddedMl - baseTargetMl;
  const currentPh = getTitrationPh(diff, toleranceMl);
  const sampleColor = getTitrationPhColor(currentPh);

  const baseBeaker = makeBeaker({
    label: "BASE DISPENSER",
    color: "rgba(210, 70, 70, 0.9)",
    fillPercent: clamp(loadedMl / maxLoadMl, 0, 1) * 100,
    bottomText: `Loaded: ${formatMl(loadedMl)} mL`,
  });
  const sampleBeaker = makeBeaker({
    label: "ACID SAMPLE",
    color: sampleColor,
    fillPercent: sampleFillPercent,
    bottomText: `Sample: ${formatMl(rightTotalMl)}ml`,
  });

  const lastResult = instanceState.lastResult;
  const hasResult = Boolean(lastResult);
  const hasSuccess = lastResult?.isSuccess;

  beakerRow.appendChild(baseBeaker.container);
  beakerRow.appendChild(sampleBeaker.container);
  if (hasSuccess) {
    const neutralizedBanner = document.createElement("div");
    neutralizedBanner.textContent = "NEUTRALIZED";
    neutralizedBanner.style.position = "absolute";
    neutralizedBanner.style.inset = "0";
    neutralizedBanner.style.display = "flex";
    neutralizedBanner.style.alignItems = "center";
    neutralizedBanner.style.justifyContent = "center";
    neutralizedBanner.style.fontSize = "28px";
    neutralizedBanner.style.fontWeight = "800";
    neutralizedBanner.style.letterSpacing = "2px";
    neutralizedBanner.style.color = "rgba(235, 255, 235, 0.95)";
    neutralizedBanner.style.textShadow = "0 2px 10px rgba(0,0,0,0.7)";
    neutralizedBanner.style.pointerEvents = "none";
    neutralizedBanner.style.transform = "rotate(-6deg)";
    neutralizedBanner.style.background =
      "linear-gradient(90deg, rgba(40, 120, 70, 0.0), rgba(40, 120, 70, 0.45), rgba(40, 120, 70, 0.0))";
    beakerRow.appendChild(neutralizedBanner);
  }

  const readouts = document.createElement("div");
  readouts.style.display = "grid";
  readouts.style.gap = "2px";
  readouts.style.fontSize = "12px";
  readouts.style.textAlign = "center";
  const acidReadout = document.createElement("div");
  acidReadout.textContent = `Acid: ${acidMl} mL @ ${acidM.toFixed(2)} M`;
  const baseReadout = document.createElement("div");
  baseReadout.textContent = `Base: ${baseM.toFixed(2)} M`;
  readouts.appendChild(acidReadout);
  readouts.appendChild(baseReadout);

  const phPanel = document.createElement("div");
  phPanel.style.display = "grid";
  phPanel.style.gap = "4px";
  phPanel.style.textAlign = "center";

  const phHeader = document.createElement("div");
  phHeader.textContent = "PH SCALE";
  phHeader.style.fontSize = "12px";
  phHeader.style.fontWeight = "700";

  const phScale = document.createElement("div");
  phScale.style.position = "relative";
  phScale.style.height = "12px";
  phScale.style.borderRadius = "999px";
  phScale.style.border = "1px solid rgba(255,255,255,0.4)";
  phScale.style.background =
    "linear-gradient(90deg, rgba(80, 130, 230, 0.9) 0%, rgba(245, 245, 245, 0.9) 50%, rgba(210, 70, 70, 0.9) 100%)";
  phScale.style.overflow = "hidden";

  const phRangeSpan = document.createElement("div");
  phRangeSpan.style.position = "absolute";
  phRangeSpan.style.top = "0";
  phRangeSpan.style.bottom = "0";
  phRangeSpan.style.background = "rgba(255,255,255,0.35)";
  phRangeSpan.style.border = "1px solid rgba(255,255,255,0.7)";
  phRangeSpan.style.boxSizing = "border-box";

  const phMarker = document.createElement("div");
  phMarker.style.position = "absolute";
  phMarker.style.top = "-4px";
  phMarker.style.width = "2px";
  phMarker.style.height = "20px";
  phMarker.style.background = "rgba(10, 12, 16, 0.95)";
  phMarker.style.boxShadow = "0 0 6px rgba(255,255,255,0.6)";

  phScale.appendChild(phRangeSpan);
  phScale.appendChild(phMarker);

  const phValue = document.createElement("div");
  phValue.style.fontSize = "12px";
  phValue.style.fontWeight = "600";

  const phRangeLabel = document.createElement("div");
  phRangeLabel.style.fontSize = "11px";
  phRangeLabel.style.opacity = "0.85";

  const toPhPercent = (ph) => clamp((ph - 1) / 13, 0, 1) * 100;
  const targetRange = 0.3;
  const phRangeStart = clamp(targetPh - targetRange, 1, 14);
  const phRangeEnd = clamp(targetPh + targetRange, 1, 14);
  phRangeSpan.style.left = `${toPhPercent(phRangeStart)}%`;
  phRangeSpan.style.width = `${toPhPercent(phRangeEnd) - toPhPercent(phRangeStart)}%`;
  phRangeLabel.textContent = `Target range: ${phRangeStart.toFixed(1)} - ${phRangeEnd.toFixed(1)} pH`;

  const updatePhDisplay = (ph) => {
    phValue.textContent = `Sample pH: ${ph.toFixed(1)}`;
    phMarker.style.left = `${toPhPercent(ph)}%`;
  };
  updatePhDisplay(currentPh);

  phPanel.appendChild(phHeader);
  phPanel.appendChild(phScale);
  phPanel.appendChild(phValue);
  phPanel.appendChild(phRangeLabel);

  const doseRow = document.createElement("div");
  doseRow.className = "btnRow";
  doseRow.style.display = "flex";
  doseRow.style.gap = "10px";
  doseRow.style.flexWrap = "wrap";
  [1, 5, 10].forEach((dose) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `+${dose} mL`;
    button.disabled = locked || !isLoading;
    button.addEventListener("click", () => {
      if (instanceState.lockControls || instanceState.phase !== "loading") return;
      instanceState.selectedLoadStep = dose;
      instanceState.loadedMl = clamp(instanceState.loadedMl + dose, 0, maxLoadMl);
      instanceState.lastResult = null;
      renderMiniGame();
    });
    doseRow.appendChild(button);
  });

  const transferButton = document.createElement("button");
  transferButton.type = "button";
  transferButton.textContent = hasResult ? (hasSuccess ? "APPLY SOLUTION" : "TRY AGAIN") : "POUR";
  transferButton.disabled = locked || (!hasResult && (!isLoading || loadedMl <= 0));
  if (hasSuccess) {
    transferButton.style.background = "rgba(80, 200, 120, 0.9)";
    transferButton.style.border = "1px solid rgba(80, 220, 140, 0.9)";
    transferButton.style.color = "rgba(10, 20, 10, 0.95)";
  }
  transferButton.addEventListener("click", () => {
    if (instanceState.lockControls || instanceState.phase !== "loading") return;
    if (hasResult) {
      if (hasSuccess) {
        handleMiniGameSuccess(game);
        return;
      }
      resetTitrationTransferState(instanceState);
      renderMiniGame();
      return;
    }
    if (instanceState.loadedMl <= 0) return;
    instanceState.phase = "pouring";
    instanceState.lockControls = true;
    instanceState.pourStartAt = performance.now();
    instanceState.pourDurationMs = 800;
    instanceState.pourStartLoadMl = instanceState.loadedMl;
    instanceState.pourStartBaseMl = instanceState.baseAddedMl;
    renderMiniGame();
  });

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "CANCEL";
  cancelButton.addEventListener("click", cancelMiniGame);

  const actionRow = makeBtnRow([transferButton, cancelButton], { wrap: true });
  actionRow.style.width = "100%";
  transferButton.style.flex = "1";
  cancelButton.style.flex = "1";

  const statusLine = document.createElement("div");
  statusLine.style.fontSize = "12px";
  statusLine.style.textAlign = "center";
  statusLine.style.opacity = "0.9";
  statusLine.textContent = instanceState.statusMessage ?? "";

  wrapper.appendChild(beakerRow);
  wrapper.appendChild(readouts);
  wrapper.appendChild(phPanel);
  wrapper.appendChild(statusLine);
  wrapper.appendChild(doseRow);
  wrapper.appendChild(actionRow);

  dom.miniGameOptions.appendChild(wrapper);
  setMiniGameSubmitButton({ visible: false });

  let updatePour = null;
  if (isPouring) {
    const stream = document.createElement("div");
    stream.style.position = "absolute";
    stream.style.width = "10px";
    stream.style.height = "0px";
    stream.style.background =
      "linear-gradient(180deg, rgba(220, 80, 80, 0.0), rgba(220, 80, 80, 0.85), rgba(220, 80, 80, 0.0))";
    stream.style.boxShadow = "0 0 10px rgba(220, 80, 80, 0.35)";
    stream.style.left = "50%";
    stream.style.top = "40px";
    stream.style.transform = "translateX(-50%) rotate(-12deg)";
    stream.style.borderRadius = "999px";
    stream.style.opacity = "0";
    stream.style.pointerEvents = "none";
    wrapper.appendChild(stream);

    updatePour = () => {
      const start = instanceState.pourStartAt ?? performance.now();
      const duration = instanceState.pourDurationMs ?? 800;
      const elapsed = performance.now() - start;
      const progress = clamp(elapsed / duration, 0, 1);
      const startLoad = instanceState.pourStartLoadMl ?? 0;
      const startBase = instanceState.pourStartBaseMl ?? 0;
      const remainingLoad = startLoad * (1 - progress);
      const totalBase = startBase + startLoad * progress;
      baseBeaker.fill.style.height = `${clamp(remainingLoad / maxLoadMl, 0, 1) * 100}%`;
      if (baseBeaker.bottomEl) {
        baseBeaker.bottomEl.textContent = `Loaded: ${formatMl(remainingLoad)} mL`;
      }
      const rightTotal = acidMl + totalBase;
      sampleBeaker.fill.style.height = `${clamp(rightTotal / transferCapMl, 0, 1) * 100}%`;
      const samplePh = getTitrationPh(totalBase - baseTargetMl, toleranceMl);
      sampleBeaker.fill.style.background = getTitrationPhColor(samplePh);
      updatePhDisplay(samplePh);
      if (sampleBeaker.bottomEl) {
        sampleBeaker.bottomEl.textContent = `Sample: ${formatMl(acidMl + totalBase)}ml`;
      }
      const ramp =
        progress < 0.15 ? progress / 0.15 : progress > 0.85 ? (1 - progress) / 0.15 : 1;
      const streamHeight = Math.max(0, Math.min(1, ramp));
      stream.style.height = `${Math.round(110 * streamHeight)}px`;
      stream.style.opacity = `${0.85 * streamHeight}`;
      if (progress >= 1) {
        stream.style.opacity = "0";
        stream.style.height = "0px";
        stopMiniGameAnimation();
        instanceState.baseAddedMl = startBase + startLoad;
        instanceState.loadedMl = 0;
        instanceState.lockControls = false;
        instanceState.phase = "loading";
        const diffNow = instanceState.baseAddedMl - baseTargetMl;
        const result = getTitrationReadout(diffNow, toleranceMl);
        instanceState.lastResult = { isSuccess: result.isSuccess, ph: result.ph };
        instanceState.statusMessage = result.isSuccess
          ? ""
          : "";
        instanceState.pourStartAt = null;
        instanceState.pourDurationMs = null;
        instanceState.pourStartLoadMl = null;
        instanceState.pourStartBaseMl = null;
        renderMiniGame();
      }
    };
    if (!instanceState.pourStartAt) {
      instanceState.pourStartAt = performance.now();
    }
  }

  const updateThreat = () => {
    const now = performance.now();
    const elapsed = now - (instanceState.attemptStartedAtMs ?? now);
    const remaining = Math.max(0, attemptLimitMs - elapsed);
    if (remaining <= 0 && !instanceState.timeoutHandled) {
      if (instanceState.phase === "loading" || instanceState.phase === "pouring") {
        instanceState.timeoutHandled = true;
        applyMiniGamePressurePenalty();
        instanceState.statusMessage = "Time limit exceeded. Continue neutralizing.";
        stopMiniGameAnimation();
        renderMiniGame();
      }
    }
  };

  startMiniGameAnimation(() => {
    updateThreat();
    if (updatePour) {
      updatePour();
    }
  });
}

function renderTitrationQuick(game) {
  const { instanceState, instanceSolution } = game;
  const { variant, displayValues, targetMl, tolerancePct } = instanceSolution;
  dom.miniGameText.innerHTML =
    "Set the pump with the slider, pour, then test the mix.<br>C1V1 = C2V2";
  setMiniGameCancelVisibility({ showBottomBar: true, showInline: false });

  const wrapper = document.createElement("div");
  wrapper.style.display = "grid";
  wrapper.style.gap = "8px";

  const description = document.createElement("div");
  if (variant === "dilution") {
    description.textContent = `Need ${displayValues.C2.toFixed(2)}M, final volume ${displayValues.V2} mL. Stock acid ${displayValues.C1.toFixed(
      2
    )}M.`;
  } else {
    description.textContent = `Neutralize ${displayValues.V1} mL of ${displayValues.M1.toFixed(
      2
    )}M acid with ${displayValues.M2.toFixed(2)}M base.`;
  }
  description.style.fontSize = "12px";

  const equation = document.createElement("div");
  equation.style.fontSize = "12px";
  equation.innerHTML =
    variant === "dilution"
      ? "Equation: C1·<strong>V1</strong> = C2·V2"
      : "Equation: M1·V1 = M2·<strong>V2</strong>";

  const instruction = document.createElement("div");
  instruction.style.fontSize = "13px";
  instruction.style.fontWeight = "600";
  const pouredAmount = instanceState.mlPoured ?? 0;
  instruction.textContent =
    pouredAmount <= 0
      ? "Set pump amount, then POUR."
      : "TEST MIX to check strength. Adjust + pour again.";

  const beakerRow = document.createElement("div");
  beakerRow.style.display = "flex";
  beakerRow.style.gap = "12px";
  beakerRow.style.alignItems = "center";

  const beaker = document.createElement("div");
  beaker.className = "chem-beaker";
  beaker.style.position = "relative";
  beaker.style.width = "90px";
  beaker.style.height = "150px";
  beaker.style.border = "1px solid rgba(255,255,255,0.4)";
  beaker.style.background = "rgba(12, 18, 24, 0.6)";
  const fill = document.createElement("div");
  fill.style.position = "absolute";
  fill.style.left = "0";
  fill.style.right = "0";
  fill.style.bottom = "0";
  fill.style.background = "rgba(80, 160, 220, 0.7)";
  fill.style.height = "0%";
  beaker.appendChild(fill);

  const beakerLabel = document.createElement("div");
  beakerLabel.style.fontSize = "16px";
  beakerLabel.style.fontWeight = "600";
  beakerLabel.textContent = `Poured: ${instanceState.mlPoured ?? 0} mL`;

  const indicator = document.createElement("div");
  indicator.style.fontSize = "16px";
  indicator.style.fontWeight = "600";
  indicator.style.textAlign = "center";
  indicator.textContent = `Pump: ${instanceState.mlSelected} mL`;

  const setFillLevel = (ml) => {
    const percent = clamp(ml / 100, 0, 1) * 100;
    fill.style.height = `${percent}%`;
    beakerLabel.textContent = `Poured: ${ml} mL`;
  };
  if (instanceState.mlPoured !== null) {
    setFillLevel(instanceState.mlPoured);
  }

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = "0";
  slider.max = "100";
  slider.value = String(instanceState.mlSelected);
  slider.style.width = "100%";
  slider.addEventListener("input", (event) => {
    instanceState.mlSelected = Number(event.target.value);
    instanceState.lastSuccess = false;
    renderMiniGame();
  });

  const feedback = document.createElement("div");
  feedback.textContent = instanceState.lastFeedback || "Test the mix to check strength.";
  feedback.style.fontSize = "12px";

  const pumpRowButtons = [-10, -5, 5, 10].map((step) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${step > 0 ? "+" : ""}${step}`;
    button.addEventListener("click", () => {
      instanceState.mlSelected = clamp(instanceState.mlSelected + step, 0, 100);
      instanceState.lastSuccess = false;
      renderMiniGame();
    });
    return button;
  });
  const pumpRow = makeBtnRow(pumpRowButtons);

  const quickPourRow = makeBtnRow(
    [5, 10].map((step) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `POUR +${step} mL`;
      button.style.fontSize = "12px";
      button.addEventListener("click", () => {
        instanceState.mlSelected = clamp(instanceState.mlSelected + step, 0, 100);
        instanceState.mlPoured = instanceState.mlSelected;
        instanceState.lastSuccess = false;
        renderMiniGame();
      });
      return button;
    }),
    { wrap: true }
  );

  const pourButton = document.createElement("button");
  pourButton.type = "button";
  pourButton.textContent = "POUR";
  pourButton.addEventListener("click", () => {
    instanceState.mlPoured = instanceState.mlSelected;
    instanceState.lastSuccess = false;
    renderMiniGame();
  });

  const testButton = document.createElement("button");
  testButton.type = "button";
  testButton.textContent = "TEST MIX";
  testButton.addEventListener("click", () => {
    if (!instanceState.mlPoured) {
      instanceState.lastFeedback = "You haven’t poured anything.";
      renderMiniGame();
      return;
    }
    const poured = instanceState.mlPoured;
    const diffPct = Math.abs(poured - targetMl) / targetMl * 100;
    if (diffPct <= tolerancePct) {
      instanceState.lastFeedback = `Within ${tolerancePct}% — mix ready.`;
      instanceState.lastSuccess = true;
    } else {
      const isHigh = poured > targetMl;
      instanceState.lastFeedback = `${isHigh ? "Too strong" : "Too weak"} (${Math.round(
        diffPct
      )}% off)`;
      instanceState.lastSuccess = false;
      if (handleTitrationAttemptFailure(game)) {
        return;
      }
    }
    renderMiniGame();
  });

  const commitButton = document.createElement("button");
  commitButton.type = "button";
  commitButton.textContent = "COMMIT MIX";
  commitButton.disabled = !instanceState.lastSuccess || !instanceState.mlPoured;
  commitButton.addEventListener("click", () => {
    submitTitrationQuick(game);
  });

  const actionRow = makeBtnRow([pourButton, testButton, commitButton], { wrap: false });
  actionRow.style.width = "100%";
  [pourButton, testButton, commitButton].forEach((button) => {
    button.style.flex = "1";
  });

  beakerRow.appendChild(beaker);

  wrapper.appendChild(description);
  wrapper.appendChild(equation);
  wrapper.appendChild(instruction);
  wrapper.appendChild(beakerRow);
  wrapper.appendChild(beakerLabel);
  wrapper.appendChild(indicator);
  wrapper.appendChild(pumpRow);
  wrapper.appendChild(slider);
  wrapper.appendChild(feedback);
  wrapper.appendChild(quickPourRow);
  wrapper.appendChild(actionRow);

  dom.miniGameOptions.appendChild(wrapper);
  setMiniGameSubmitButton({ visible: false });
}

const PATCH_OPS = ["DEC", "INC", "ADD", "SUB2", "XOR", "JNZ", "RET"];
const PATCH_OP_ORDER = [null, ...PATCH_OPS];

function getPatchOpLabel(op) {
  if (op === "XOR") return "CLR";
  if (op === "ADD") return "MUL 2";
  if (op === "SUB2") return "DIV 2";
  return op;
}

function getPatchOpInfo(op) {
  switch (op) {
    case "DEC":
      return { title: "DEC", description: "CX = CX - 1" };
    case "INC":
      return { title: "INC", description: "CX = CX + 1" };
    case "ADD":
      return { title: "MUL 2", description: "CX = CX × 2" };
    case "SUB2":
      return { title: "DIV 2", description: "CX = floor(CX ÷ 2)" };
    case "XOR":
      return { title: "CLR", description: "CX = 0" };
    case "JNZ":
      return { title: "JNZ", description: "If CX != 0, jump back to start" };
    case "RET":
      return { title: "RET", description: "Stop. Succeeds only if CX == 0" };
    default:
      return null;
  }
}

function getPatchAvailableOps() {
  return new Set(PATCH_OPS);
}

function getPatchSimStatus(sim) {
  if (sim.status === "success") return "Success";
  if (sim.status === "running") return "Running";
  if (sim.status === "fail") {
    if (sim.failReason === "loop") return "Loop detected";
    if (sim.failReason === "ret_fail") return "RET too early";
    if (sim.failReason === "ran_off_end") return "Ran off end";
    return "Fail";
  }
  return "Idle";
}

function selectPatchOp(op) {
  const game = state.miniGame;
  if (!game) return;
  if (game.instanceState.autoRunning) return;
  if (!PATCH_OPS.includes(op)) return;
  game.instanceState.selectedOp = op;
  const { slots } = game.instanceState;
  const slotIndex = getPreferredPatchSlotIndex(slots, game.instanceState.focusedSlot);
  if (slotIndex === null) {
    renderMiniGame();
    return;
  }
  placePatchOp(op, slotIndex);
}

function getPreferredPatchSlotIndex(slots, focusedSlot) {
  const slotLimit = getPatchSlotLimit(slots);
  if (Number.isInteger(focusedSlot) && focusedSlot <= slotLimit && slots[focusedSlot] === null) {
    return focusedSlot;
  }
  return getNextPatchSlotIndex(slots, 0);
}

function getNextPatchSlotIndex(slots, startIndex) {
  const slotLimit = getPatchSlotLimit(slots);
  for (let index = startIndex; index <= slotLimit; index += 1) {
    if (!slots[index]) {
      return index;
    }
  }
  return null;
}

function getPatchSlotLimit(slots) {
  const retIndex = slots.findIndex((slot) => slot === "RET");
  return retIndex === -1 ? slots.length - 1 : retIndex;
}

function placePatchOp(op, slotIndex) {
  const game = state.miniGame;
  if (!game) return;
  if (game.instanceState.autoRunning) return;
  const { slots } = game.instanceState;
  slots[slotIndex] = op;
  if (op === "RET") {
    for (let index = slotIndex + 1; index < slots.length; index += 1) {
      slots[index] = null;
    }
  }
  game.instanceState.selectedOp = op;
  game.instanceState.focusedSlot = getNextPatchSlotIndex(slots, slotIndex + 1);
  game.instanceState.phase = "idle";
  resetPatchSim(game);
  game.instanceState.simMessage = "";
  renderMiniGame();
}

function clearPatchSlot(slotIndex) {
  const game = state.miniGame;
  if (!game) return;
  if (game.instanceState.autoRunning) return;
  game.instanceState.slots[slotIndex] = null;
  game.instanceState.focusedSlot = slotIndex;
  game.instanceState.phase = "idle";
  resetPatchSim(game);
  game.instanceState.simMessage = "";
  renderMiniGame();
}

function deleteRightmostPatchOp() {
  const game = state.miniGame;
  if (!game) return;
  if (game.instanceState.autoRunning) return;
  const { slots } = game.instanceState;
  const slotLimit = getPatchSlotLimit(slots);
  for (let index = slotLimit; index >= 0; index -= 1) {
    if (slots[index]) {
      slots[index] = null;
      game.instanceState.focusedSlot = index;
      game.instanceState.phase = "idle";
      resetPatchSim(game);
      game.instanceState.simMessage = "";
      renderMiniGame();
      return;
    }
  }
}

function cyclePatchSlot(game, slotIndex) {
  const available = getPatchAvailableOps();
  const currentOp = game.instanceState.slots[slotIndex] ?? null;
  const startIndex = PATCH_OP_ORDER.indexOf(currentOp);
  for (let i = 1; i <= PATCH_OP_ORDER.length; i += 1) {
    const nextOp = PATCH_OP_ORDER[(startIndex + i) % PATCH_OP_ORDER.length];
    if (nextOp === null || available.has(nextOp)) {
      game.instanceState.slots[slotIndex] = nextOp ?? null;
      game.instanceState.focusedSlot = slotIndex;
      game.instanceState.phase = "idle";
      resetPatchSim(game);
      game.instanceState.simMessage = "";
      renderMiniGame();
      return;
    }
  }
}

function handlePatchSlotClick(event) {
  const slotIndex = Number(event.currentTarget.dataset.slotIndex);
  if (Number.isNaN(slotIndex)) return;
  const game = state.miniGame;
  if (!game) return;
  if (game.instanceState.autoRunning) return;
  if (slotIndex > getPatchSlotLimit(game.instanceState.slots)) return;
  const selected = game.instanceState.selectedOp;
  if (game.instanceState.slots[slotIndex]) {
    clearPatchSlot(slotIndex);
    return;
  }
  if (selected) {
    placePatchOp(selected, slotIndex);
    return;
  }
  game.instanceState.focusedSlot = slotIndex;
  renderMiniGame();
}

function handlePatchSlotDrop(event) {
  event.preventDefault();
  const slotIndex = Number(event.currentTarget.dataset.slotIndex);
  if (Number.isNaN(slotIndex)) return;
  const op = event.dataTransfer?.getData("text/plain");
  if (!op) return;
  const game = state.miniGame;
  if (!game) return;
  if (game.instanceState.autoRunning) return;
  if (!PATCH_OPS.includes(op)) return;
  if (slotIndex > getPatchSlotLimit(game.instanceState.slots)) return;
  placePatchOp(op, slotIndex);
}

function getPatchProgram(game) {
  const { slots } = game.instanceState;
  const lastFilled = slots.reduce((lastIndex, slot, index) => (slot ? index : lastIndex), -1);
  if (lastFilled < 0) return [];
  const program = slots.slice(0, lastFilled + 1).map((slot) => slot ?? "NOP");
  const isFull = slots.every((slot) => slot !== null);
  if (isFull && slots[slots.length - 1] !== "RET") {
    program.push("RET");
  }
  return program;
}

function resetPatchSim(game) {
  const { initialCx } = game.instanceState;
  game.instanceState.sim = {
    pc: 0,
    cx: initialCx,
    steps: 0,
    halted: false,
    status: "idle",
    firstErrorIndex: null,
    latch: 0,
    failReason: null,
    trace: [],
  };
  game.instanceState.phase = "idle";
  game.instanceState.simMessage = "";
  game.instanceState.commitPulse = false;
}

function updatePatchLatch(sim, prevCx, prevPc, nextCx, nextPc) {
  let latch = sim.latch;
  const towardZero = Math.abs(nextCx) < Math.abs(prevCx);
  if (towardZero && nextPc !== prevPc) {
    latch += 10;
  } else if (Math.abs(nextCx) > Math.abs(prevCx)) {
    latch -= 8;
  } else if (nextPc === prevPc) {
    latch -= 6;
  } else {
    latch += 3;
  }
  sim.latch = clamp(latch, 0, 100);
}

function stepPatchSim(game) {
  const { sim, maxSteps } = game.instanceState;
  const program = getPatchProgram(game);
  if (sim.halted) return { ok: false, reason: "halted" };
  if (sim.pc < 0 || sim.pc >= program.length) {
    sim.halted = true;
    sim.status = "fail";
    sim.failReason = "ran_off_end";
    sim.firstErrorIndex ??= clamp(sim.pc - 1, 0, program.length - 1);
    return { ok: false, reason: "ran_off" };
  }
  if (sim.steps >= maxSteps) {
    sim.halted = true;
    sim.status = "fail";
    sim.failReason = "loop";
    sim.firstErrorIndex ??= sim.pc;
    return { ok: false, reason: "loop" };
  }
  const op = program[sim.pc];
  const prevCx = sim.cx;
  const prevPc = sim.pc;
  let nextPc = sim.pc;
  let nextCx = sim.cx;
  let halted = false;
  let status = "running";
  switch (op) {
    case "DEC":
      nextCx -= 1;
      nextPc += 1;
      break;
    case "INC":
      nextCx += 1;
      nextPc += 1;
      break;
    case "XOR":
      nextCx = 0;
      nextPc += 1;
      break;
    case "ADD":
      nextCx *= 2;
      nextPc += 1;
      break;
    case "SUB2":
      nextCx = Math.max(0, Math.floor(nextCx / 2));
      nextPc += 1;
      break;
    case "JNZ":
      nextPc = nextCx !== 0 ? 0 : nextPc + 1;
      break;
    case "RET":
      if (nextCx === 0) {
        halted = true;
        status = "success";
      } else {
        halted = true;
        status = "fail";
        sim.failReason = "ret_fail";
        sim.firstErrorIndex ??= sim.pc;
      }
      break;
    default:
      nextPc += 1;
      break;
  }
  if (game.instanceState.autoRunning) {
    const label = getPatchOpLabel(op ?? "NOP");
    if (op === "JNZ") {
      const jumpNote = nextPc === 0 ? "jump" : "advance";
      game.instanceState.simMessage = `Executing: ${label} (${jumpNote})`;
    } else if (op === "RET") {
      game.instanceState.simMessage = `Executing: ${label} (checking CX)`;
    } else if (op === "NOP") {
      game.instanceState.simMessage = "Executing: NOP";
    } else if (op === "XOR") {
      game.instanceState.simMessage = `Executing: ${label} (CX -> 0)`;
    } else {
      game.instanceState.simMessage = `Executing: ${label} (CX -> ${nextCx})`;
    }
  }
  sim.steps += 1;
  sim.pc = nextPc;
  sim.cx = nextCx;
  updatePatchLatch(sim, prevCx, prevPc, nextCx, nextPc);
  if (status === "success") {
    sim.latch = 100;
  }

  if (!halted && nextPc >= program.length) {
    halted = true;
    status = "fail";
    sim.failReason = "ran_off_end";
    sim.firstErrorIndex ??= clamp(prevPc, 0, program.length - 1);
  }
  sim.halted = halted;
  sim.status = status;
  return { ok: status === "success", reason: status };
}

function runPatchSim(game, maxStepsOverride) {
  const { sim } = game.instanceState;
  const limit = maxStepsOverride ?? game.instanceState.maxSteps;
  while (!sim.halted && sim.steps < limit) {
    const result = stepPatchSim(game);
    if (result.reason === "loop") break;
  }
  return sim.status;
}

function getPatchFailMessage(sim) {
  if (sim.failReason === "loop") {
    return "Timeout: loop detected before CX hit 0.";
  }
  if (sim.failReason === "ret_fail") {
    return `RET hit too early: CX still ${sim.cx}.`;
  }
  if (sim.failReason === "ran_off_end") {
    return "Program fell off end: no RET.";
  }
  return `Latch: ${Math.round(sim.latch)}% — stalled (CX=${sim.cx}).`;
}

function finishPatchAutoSim(game) {
  const { instanceState } = game;
  if (!instanceState.autoRunning) return;
  if (instanceState.autoRunTimer) {
    clearInterval(instanceState.autoRunTimer);
    instanceState.autoRunTimer = null;
  }
  instanceState.autoRunning = false;
  instanceState.phase = "result";
  const simState = instanceState.sim;
  if (simState.status === "success") {
    instanceState.simMessage = "Injection Attack Ready";
    renderMiniGame();
    return;
  }
  if (!simState.failReason && simState.steps >= instanceState.maxSteps) {
    simState.failReason = "loop";
  }
  instanceState.simMessage = getPatchFailMessage(simState);
  renderMiniGame();
}

function runPatchAutoSim(game) {
  const { instanceState } = game;
  if (instanceState.autoRunning) return;
  if (instanceState.slots.every((slot) => slot === null)) return;
  resetPatchSim(game);
  instanceState.autoRunning = true;
  instanceState.phase = "running";
  instanceState.sim.status = "running";
  instanceState.simMessage = "Executing: ...";
  if (instanceState.autoRunTimer) {
    clearInterval(instanceState.autoRunTimer);
  }
  const intervalMs = instanceState.autoRunIntervalMs ?? 420;
  instanceState.autoRunTimer = setInterval(() => {
    if (!state.miniGameActive || state.miniGame?.id !== game.id) {
      if (instanceState.autoRunTimer) {
        clearInterval(instanceState.autoRunTimer);
        instanceState.autoRunTimer = null;
      }
      instanceState.autoRunning = false;
      return;
    }
    stepPatchSim(game);
    renderMiniGame();
    if (instanceState.sim.halted || instanceState.sim.steps >= instanceState.maxSteps) {
      finishPatchAutoSim(game);
    }
  }, intervalMs);
  renderMiniGame();
}

function ensurePatchRet(game) {
  const { slots } = game.instanceState;
  if (slots.includes("RET")) return;
  if (slots.every((slot) => slot !== null)) return;
  let slotIndex = slots.findIndex((slot) => slot === null);
  if (slotIndex === -1) {
    slotIndex = slots.length - 1;
  }
  slots[slotIndex] = "RET";
  for (let index = slotIndex + 1; index < slots.length; index += 1) {
    slots[index] = null;
  }
}

function submitPatchDrag(game) {
  const { instanceState } = game;
  if (instanceState.phase === "result") {
    if (instanceState.sim.status === "success") {
      handleMiniGameSuccess(game);
      return;
    }
    resetPatchProgram(game);
    return;
  }
  if (instanceState.autoRunning) return;
  ensurePatchRet(game);
  runPatchAutoSim(game);
}

function renderPatchDrag(game) {
  const { slots, selectedOp, initialCx, sim } = game.instanceState;
  const phase = game.instanceState.phase ?? "idle";
  dom.miniGameText.textContent = "Write a program to make CX match the target.";
  dom.miniGameText.classList.remove("patch-instruction");
  setMiniGameCancelVisibility({ showBottomBar: true, showInline: false });
  const hasProgram = slots.some((slot) => slot !== null);
  const isResult = phase === "result";
  const isSuccess = sim.status === "success";
  const submitLabel = isResult ? (isSuccess ? "Apply" : "Try Again") : "Run";
  setMiniGameSubmitButton({
    label: submitLabel,
    enabled: isResult ? true : hasProgram && !game.instanceState.autoRunning,
    visible: true,
  });
  if (dom.miniGameSubmitBtn) {
    dom.miniGameSubmitBtn.classList.toggle("patch-apply", isResult && isSuccess);
  }
  const board = document.createElement("div");
  board.className = "patch-board";
  board.style.display = "grid";
  board.style.gap = "10px";

  const taskCard = document.createElement("div");
  taskCard.style.display = "grid";
  taskCard.style.gap = "4px";
  taskCard.style.padding = "8px";
  taskCard.style.border = "1px solid rgba(255,255,255,0.25)";
  taskCard.style.background = "rgba(10, 16, 22, 0.75)";
  const makeTaskLine = (text, color) => {
    const line = document.createElement("div");
    line.textContent = text;
    line.style.fontWeight = "600";
    line.style.color = color ?? "rgba(220, 240, 255, 0.95)";
    return line;
  };
  if (phase === "result") {
    const isSuccessResult = sim.status === "success";
    const resultLine = makeTaskLine(
      isSuccessResult ? "RESULT: SUCCESS" : "RESULT: FAIL",
      isSuccessResult ? "rgba(90, 220, 120, 0.95)" : "rgba(220, 80, 80, 0.95)"
    );
    const detailLine = makeTaskLine(game.instanceState.simMessage || "");
    taskCard.appendChild(resultLine);
    if (detailLine.textContent) {
      taskCard.appendChild(detailLine);
    }
  } else {
    const taskTarget = makeTaskLine("TARGET: CX \u2192 0");
    const currentCx = Number.isFinite(sim?.cx) ? sim.cx : initialCx;
    const taskInput = makeTaskLine(`CURRENT: CX = ${currentCx}`);
    taskCard.appendChild(taskTarget);
    taskCard.appendChild(taskInput);
  }

  const slotsRow = document.createElement("div");
  slotsRow.style.display = "grid";
  slotsRow.style.gridTemplateColumns = "repeat(5, minmax(0, 1fr))";
  slotsRow.style.gap = "6px";
  if (game.instanceState.autoRunning) {
    slotsRow.style.opacity = "0.8";
  }

  const retIndex = slots.findIndex((slot) => slot === "RET");
  slots.forEach((slot, index) => {
    const slotEl = document.createElement("div");
    slotEl.className = "patch-slot";
    slotEl.dataset.slotIndex = String(index);
    slotEl.style.position = "relative";
    if (retIndex !== -1 && index > retIndex) {
      slotEl.style.visibility = "hidden";
      slotEl.style.pointerEvents = "none";
    }
    if (!sim.halted && sim.pc === index) {
      slotEl.style.outline = "3px solid rgba(120, 220, 255, 0.95)";
    }
    if (sim.firstErrorIndex === index) {
      slotEl.style.outline = "2px solid rgba(220, 80, 80, 0.9)";
    }
    if (game.instanceState.focusedSlot === index) {
      slotEl.style.boxShadow = "0 0 0 2px rgba(180, 180, 240, 0.5)";
    }
    if (slot) {
      const label = getPatchOpLabel(slot);
      const token = document.createElement("div");
      token.textContent = label;
      token.style.padding = "4px 6px";
      token.style.border = "1px solid rgba(255,255,255,0.5)";
      token.style.background = "rgba(22, 30, 40, 0.9)";
      slotEl.appendChild(token);
    } else {
      slotEl.textContent = "Empty";
      slotEl.style.opacity = "0.7";
    }
    slotsRow.appendChild(slotEl);
  });

  const tray = document.createElement("div");
  tray.className = "patch-tray";
  tray.style.display = "grid";
  tray.style.gridTemplateColumns = "repeat(4, minmax(0, 1fr))";
  tray.style.gap = "8px";
  const availableOps = getPatchAvailableOps();
  const orderedOps = ["DEC", "INC", "ADD", "SUB2", "XOR", "JNZ", "RET"];
  orderedOps.forEach((op) => {
    const tileEl = document.createElement("button");
    tileEl.type = "button";
    tileEl.className = "patch-tile";
    tileEl.textContent = getPatchOpLabel(op);
    tileEl.classList.toggle("selected", selectedOp === op);
    const isAvailable = availableOps.has(op);
    tileEl.disabled = !isAvailable || game.instanceState.autoRunning;
    tileEl.addEventListener("click", () => selectPatchOp(op));
    tray.appendChild(tileEl);
  });
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "patch-tile patch-delete";
  deleteButton.textContent = "\u2190";
  deleteButton.disabled = !hasProgram || game.instanceState.autoRunning;
  deleteButton.addEventListener("click", deleteRightmostPatchOp);
  tray.appendChild(deleteButton);

  const selectedInfo = selectedOp ? getPatchOpInfo(selectedOp) : null;
  const commandInfo = document.createElement("div");
  commandInfo.className = "patch-instruction patch-help";
  commandInfo.textContent = selectedInfo
    ? `${selectedInfo.title}: ${selectedInfo.description}`
    : "Place an Instruction";

  const topPanel = document.createElement("div");
  topPanel.style.display = "grid";
  topPanel.style.gap = "6px";
  topPanel.appendChild(taskCard);
  board.appendChild(topPanel);
  board.appendChild(slotsRow);
  board.appendChild(tray);
  board.appendChild(commandInfo);
  if (phase === "result") {
    // Result details are displayed in the task card.
  }
  dom.miniGameOptions.appendChild(board);

  if (phase === "idle") {
    game.instanceState.simMessage = "";
  }
}

function resetPatchProgram(game) {
  game.instanceState.slots = Array.from({ length: game.instanceState.slots.length }, () => null);
  game.instanceState.selectedOp = null;
  game.instanceState.focusedSlot = 0;
  game.instanceState.phase = "idle";
  resetPatchSim(game);
  game.instanceState.simMessage = "";
  renderMiniGame();
}

function renderBossFinish(game) {
  const { instanceState, instanceSolution } = game;
  if (instanceState.step === 1) {
    dom.miniGameText.innerHTML =
      "Step 1/3: Build heat and release inside the green band.<br>Hold to heat, release to lock.";
  } else if (instanceState.step === 2) {
    dom.miniGameText.innerHTML =
      "Step 2/3: Align the saw with the green zone.<br>Tap lock when the marker is inside.";
  } else {
    dom.miniGameText.innerHTML =
      "Step 3/3: Apply steady pressure in the green band.<br>Land 5 good strokes before time runs out.";
  }

  const wrapper = document.createElement("div");
  wrapper.style.display = "grid";
  wrapper.style.gap = "12px";

  const timer = document.createElement("div");
  timer.style.fontSize = "12px";
  getBossFinishRemainingMs(game, timer);
  wrapper.appendChild(timer);

  if (instanceState.step === 1) {
    const meter = document.createElement("div");
    meter.style.position = "relative";
    meter.style.height = "16px";
    meter.style.border = "1px solid rgba(255,255,255,0.4)";
    meter.style.background = "rgba(10, 15, 20, 0.6)";
    const fill = document.createElement("div");
    fill.style.position = "absolute";
    fill.style.left = "0";
    fill.style.top = "0";
    fill.style.bottom = "0";
    fill.style.background = "rgba(180, 80, 60, 0.65)";
    const band = document.createElement("div");
    band.style.position = "absolute";
    band.style.top = "0";
    band.style.bottom = "0";
    band.style.left = `${instanceSolution.heatBand[0] * 100}%`;
    band.style.width = `${(instanceSolution.heatBand[1] - instanceSolution.heatBand[0]) * 100}%`;
    band.style.background = "rgba(80, 200, 120, 0.5)";
    meter.appendChild(fill);
    meter.appendChild(band);
    const button = document.createElement("button");
    button.textContent = "Hold Heat";
    button.addEventListener("pointerdown", () => {
      if (!instanceState.heatHoldStart) {
        instanceState.heatHoldStart = performance.now();
      }
    });
    button.addEventListener("pointerup", () => {
      if (!instanceState.heatHoldStart) return;
      const held = (performance.now() - instanceState.heatHoldStart) / 1200;
      instanceState.heatHoldStart = null;
      if (held >= instanceSolution.heatBand[0] && held <= instanceSolution.heatBand[1]) {
        instanceState.step = 2;
        instanceState.stepFeedback = "";
        renderMiniGame();
      } else {
        instanceState.heatAttempts += 1;
        instanceState.mistakes += 1;
        instanceState.timePenaltyMs += 4000;
        instanceState.stepFeedback = "Heat vented outside the band. +4s penalty.";
        renderMiniGame();
      }
    });
    const feedback = document.createElement("div");
    feedback.style.fontSize = "12px";
    feedback.textContent = instanceState.stepFeedback || "Aim for the green band.";
    wrapper.appendChild(meter);
    wrapper.appendChild(button);
    wrapper.appendChild(feedback);
    dom.miniGameOptions.appendChild(wrapper);
    setMiniGameSubmitButton({ visible: false });

    const updateHeat = () => {
      if (getBossFinishRemainingMs(game, timer) <= 0) return;
      const held = instanceState.heatHoldStart
        ? (performance.now() - instanceState.heatHoldStart) / 1200
        : 0;
      const clamped = clamp(held, 0, 1);
      fill.style.width = `${clamped * 100}%`;
    };
    updateHeat();
    startMiniGameAnimation(updateHeat);
    return;
  }

  if (instanceState.step === 2) {
    const bar = document.createElement("div");
    bar.style.position = "relative";
    bar.style.height = "16px";
    bar.style.border = "1px solid rgba(255,255,255,0.4)";
    bar.style.background = "rgba(10, 15, 20, 0.6)";
    const windowEl = document.createElement("div");
    windowEl.style.position = "absolute";
    windowEl.style.top = "0";
    windowEl.style.bottom = "0";
    windowEl.style.left = `${instanceSolution.alignBand[0] * 100}%`;
    windowEl.style.width = `${(instanceSolution.alignBand[1] - instanceSolution.alignBand[0]) * 100}%`;
    windowEl.style.background = "rgba(80, 200, 120, 0.5)";
    const marker = document.createElement("div");
    marker.style.position = "absolute";
    marker.style.top = "-3px";
    marker.style.width = "4px";
    marker.style.height = "22px";
    marker.style.background = "rgba(220, 220, 220, 0.9)";
    bar.appendChild(windowEl);
    bar.appendChild(marker);
    const button = document.createElement("button");
    button.textContent = "Lock Alignment";
    button.addEventListener("click", () => {
      const position = getBossAlignmentPosition(game);
      if (position >= instanceSolution.alignBand[0] && position <= instanceSolution.alignBand[1]) {
        instanceState.step = 3;
        instanceState.stepFeedback = "";
        renderMiniGame();
      } else {
        instanceState.mistakes += 1;
        instanceState.timePenaltyMs += 3000;
        instanceState.stepFeedback = "Alignment slipped. +3s penalty.";
        renderMiniGame();
      }
    });
    const feedback = document.createElement("div");
    feedback.style.fontSize = "12px";
    feedback.textContent = instanceState.stepFeedback || "Press when the marker is in the band.";
    wrapper.appendChild(bar);
    wrapper.appendChild(button);
    wrapper.appendChild(feedback);
    dom.miniGameOptions.appendChild(wrapper);
    setMiniGameSubmitButton({ visible: false });
    startMiniGameAnimation(() => {
      if (getBossFinishRemainingMs(game, timer) <= 0) return;
      marker.style.left = `${getBossAlignmentPosition(game) * 100}%`;
    });
    return;
  }

  const bar = document.createElement("div");
  bar.style.position = "relative";
  bar.style.height = "16px";
  bar.style.border = "1px solid rgba(255,255,255,0.4)";
  bar.style.background = "rgba(10, 15, 20, 0.6)";
  const band = document.createElement("div");
  band.style.position = "absolute";
  band.style.top = "0";
  band.style.bottom = "0";
  band.style.background = "rgba(80, 200, 120, 0.5)";
  const marker = document.createElement("div");
  marker.style.position = "absolute";
  marker.style.top = "-3px";
  marker.style.width = "4px";
  marker.style.height = "22px";
  marker.style.background = "rgba(220, 220, 220, 0.9)";
  bar.appendChild(band);
  bar.appendChild(marker);

  const progress = document.createElement("div");
  progress.textContent = `Strokes: ${instanceState.goodStrokes}/${instanceSolution.cutStrokesNeeded}`;

  const feedback = document.createElement("div");
  feedback.textContent = instanceState.cutFeedback || "Tap when pressure is inside the green band.";

  const button = document.createElement("button");
  button.textContent = "Cut Stroke";
  button.addEventListener("pointerdown", () => {
    if (!instanceState.cutStart) {
      instanceState.cutStart = performance.now();
    }
    const pressure = getBossCutPressure(game);
    const [start, end] = getBossCutBand(game);
    if (pressure >= start && pressure <= end) {
      instanceState.goodStrokes += 1;
      instanceState.cutFeedback = "Good cut.";
    } else if (pressure < start) {
      instanceState.mistakes += 1;
      instanceState.timePenaltyMs += 1000;
      instanceState.goodStrokes = Math.max(0, instanceState.goodStrokes - 1);
      instanceState.cutFeedback = "Too cold. +1s penalty.";
    } else {
      instanceState.mistakes += 1;
      instanceState.timePenaltyMs += 1000;
      instanceState.goodStrokes = Math.max(0, instanceState.goodStrokes - 1);
      instanceState.cutFeedback = "Skidding. +1s penalty.";
    }
    if (instanceState.goodStrokes >= instanceSolution.cutStrokesNeeded) {
      handleMiniGameSuccess(game);
      return;
    }
    renderMiniGame();
  });

  wrapper.appendChild(bar);
  wrapper.appendChild(progress);
  wrapper.appendChild(feedback);
  wrapper.appendChild(button);
  dom.miniGameOptions.appendChild(wrapper);
  setMiniGameSubmitButton({ visible: false });
  startMiniGameAnimation(() => {
    const remaining = getBossFinishRemainingMs(game, timer);
    if (remaining <= 0) return;
    const [start, end] = getBossCutBand(game);
    const pressure = getBossCutPressure(game);
    band.style.left = `${start * 100}%`;
    band.style.width = `${(end - start) * 100}%`;
    marker.style.left = `${pressure * 100}%`;
    progress.textContent = `Strokes: ${instanceState.goodStrokes}/${instanceSolution.cutStrokesNeeded} | ${Math.ceil(
      Math.max(0, remaining) / 1000
    )}s`;
  });
}

function renderBalanceHold(game) {
  const { instanceState, instanceSolution } = game;
  dom.miniGameText.textContent = game.roomHintText || "Balance the saw on the seam. Hold it steady.";

  const wrapper = document.createElement("div");
  wrapper.style.display = "grid";
  wrapper.style.gap = "12px";

  const bar = document.createElement("div");
  bar.style.position = "relative";
  bar.style.height = "16px";
  bar.style.border = "1px solid rgba(255,255,255,0.4)";
  bar.style.background = "rgba(10, 15, 20, 0.6)";

  const band = document.createElement("div");
  band.style.position = "absolute";
  band.style.top = "0";
  band.style.bottom = "0";
  band.style.left = `${instanceSolution.safeBand[0] * 100}%`;
  band.style.width = `${(instanceSolution.safeBand[1] - instanceSolution.safeBand[0]) * 100}%`;
  band.style.background = "rgba(80, 200, 120, 0.5)";

  const marker = document.createElement("div");
  marker.style.position = "absolute";
  marker.style.top = "-3px";
  marker.style.width = "4px";
  marker.style.height = "22px";
  marker.style.background = "rgba(220, 220, 220, 0.9)";

  bar.appendChild(band);
  bar.appendChild(marker);
  wrapper.appendChild(bar);

  const status = document.createElement("div");
  status.style.fontSize = "12px";
  wrapper.appendChild(status);

  const applyNudge = (direction) => {
    instanceState.value = clamp(
      instanceState.value + direction * instanceSolution.nudgeImpulse,
      0,
      1
    );
    instanceState.velocity += direction * instanceSolution.nudgeImpulse * 0.08;
  };

  const createNudgeButton = (label, direction) => {
    const button = document.createElement("button");
    button.textContent = label;
    const startHold = (event) => {
      event.preventDefault();
      instanceState.nudgeDirection = direction;
      instanceState.lastNudgeAt = null;
      applyNudge(direction);
    };
    const endHold = () => {
      if (instanceState.nudgeDirection === direction) {
        instanceState.nudgeDirection = 0;
      }
    };
    button.addEventListener("pointerdown", startHold);
    button.addEventListener("pointerup", endHold);
    button.addEventListener("pointerleave", endHold);
    button.addEventListener("click", () => applyNudge(direction));
    return button;
  };

  const leftButton = createNudgeButton("LEFT", -1);
  const rightButton = createNudgeButton("RIGHT", 1);
  wrapper.appendChild(makeBtnRow([leftButton, rightButton], { wrap: false }));

  if (isMiniGameMobile()) {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "100";
    slider.step = "1";
    slider.value = String(Math.round(instanceState.value * 100));
    slider.addEventListener("input", () => {
      instanceState.value = clamp(Number(slider.value) / 100, 0, 1);
      instanceState.velocity = 0;
    });
    wrapper.appendChild(slider);
  }

  dom.miniGameOptions.appendChild(wrapper);
  setMiniGameSubmitButton({ visible: false });

  const updateBalance = () => {
    const now = performance.now();
    if (!instanceState.startedAt) {
      instanceState.startedAt = now;
      instanceState.lastTickAt = now;
    }
    const delta = now - instanceState.lastTickAt;
    instanceState.lastTickAt = now;
    const drift = (Math.random() - 0.5) * instanceSolution.driftStrength * delta;
    instanceState.velocity += drift;
    instanceState.velocity *= 0.995;
    instanceState.velocity = clamp(instanceState.velocity, -0.004, 0.004);
    instanceState.value += instanceState.velocity * delta;
    if (instanceState.nudgeDirection !== 0) {
      const interval = 90;
      if (!instanceState.lastNudgeAt || now - instanceState.lastNudgeAt >= interval) {
        applyNudge(instanceState.nudgeDirection);
        instanceState.lastNudgeAt = now;
      }
    }
    instanceState.value = clamp(instanceState.value, 0, 1);
    if (instanceState.value === 0 || instanceState.value === 1) {
      instanceState.velocity = 0;
    }

    const inBand =
      instanceState.value >= instanceSolution.safeBand[0] &&
      instanceState.value <= instanceSolution.safeBand[1];
    if (inBand) {
      instanceState.insideMs += delta;
    } else {
      instanceState.outsideMs += delta;
    }

    const elapsed = now - instanceState.startedAt;
    const remaining = Math.max(0, instanceSolution.timeLimitMs - elapsed);
    if (instanceState.insideMs >= instanceSolution.winInsideMs) {
      handleMiniGameSuccess(game);
      return;
    }
    if (instanceState.outsideMs >= instanceSolution.maxOutsideMs || remaining <= 0) {
      handleMiniGameFailure(game);
      return;
    }

    marker.style.left = `${instanceState.value * 100}%`;
    status.textContent = `Stable: ${Math.ceil(
      Math.max(0, instanceSolution.winInsideMs - instanceState.insideMs) / 1000
    )}s | Time: ${Math.ceil(remaining / 1000)}s`;
  };

  updateBalance();
  startMiniGameAnimation(updateBalance);
}

function applyMiniGameFailurePenalty(tries = 0) {
  const profile = getNightProfile();
  const effects = getPassiveEffects();
  registerSignal(
    state.playerRoom,
    0.18 * profile.signalStrength.device * effects.signalSpike,
    { type: "minigame-fail", lastKnownChance: 0.12 }
  );
  adjustSanity(-0.03, "minigame");
  const extraThreat = tries >= 2 ? 0.1 : 0;
  state.threat = Math.min(5, state.threat + 0.2 + extraThreat);
  state.turn += 1;
  pushStatus("Wrong. Try again.", 3);
  updateUI();
}

function applyMiniGameCancelPenalty() {
  const profile = getNightProfile();
  const effects = getPassiveEffects();
  registerSignal(
    state.playerRoom,
    0.08 * profile.signalStrength.device * effects.signalSpike,
    { type: "minigame-cancel", lastKnownChance: 0.06 }
  );
  state.threat = Math.min(5, state.threat + 0.05);
  pushStatus("You back away from the panel.", 2);
  updateUI();
}

function applyMiniGamePressurePenalty() {
  const profile = getNightProfile();
  const effects = getPassiveEffects();
  registerSignal(
    state.playerRoom,
    0.04 * profile.signalStrength.device * effects.signalSpike,
    { type: "minigame-pressure", lastKnownChance: 0.04 }
  );
  state.threat = Math.min(5, state.threat + 0.03);
  pushStatus("Proximity spike. Try again.", 2);
  updateUI();
}

function completeNightObjective() {
  if (state.nightObjectiveComplete) return;
  state.nightObjectiveComplete = true;
  updateEscapeReadiness();
  updateUI();
}

function isFlameSawFinaleMiniGame(miniGameId) {
  return [
    "FLAMESAW_GAS",
    "FLAMESAW_IGNITE",
    "FLAMESAW_FINISH",
    "FLAMESAW_BALANCE",
  ].includes(miniGameId);
}

function resolveMiniGameSuccess(miniGameId) {
  if (miniGameId === "FLAMESAW_GAS") {
    advanceFlameSawFinale("ignite");
    return;
  }
  if (miniGameId === "FLAMESAW_IGNITE") {
    advanceFlameSawFinale("heat");
    return;
  }
  if (miniGameId === "FLAMESAW_FINISH") {
    advanceFlameSawFinale("balance");
    return;
  }
  if (miniGameId === "FLAMESAW_BALANCE") {
    state.robotKilled = true;
    state.nightObjectiveComplete = true;
    state.flameSawFinaleActive = false;
    state.flameSawFinaleStage = null;
    triggerFinalVictory();
    return;
  }
  completeNightObjective();
  const successLine = getNightObjectiveSuccessLine();
  if (successLine) {
    showObjectiveModal(successLine);
  }
}

function resolveMiniGameFailure(miniGameId) {
  if (isFlameSawFinaleMiniGame(miniGameId)) {
    state.flameSawFinaleActive = false;
    state.flameSawFinaleStage = null;
    closeMiniGame();
    triggerDeath();
    return;
  }
  const tries = state.miniGame?.tries ?? 0;
  applyMiniGameFailurePenalty(tries);
}

function handleMiniGameSuccess(game) {
  closeMiniGame();
  resolveMiniGameSuccess(game.id);
}

function handleMiniGameFailure(game) {
  game.tries += 1;
  resolveMiniGameFailure(game.id);
  if (!state.miniGameActive || isFlameSawFinaleMiniGame(game.id)) return;
  regenerateMiniGameInstance();
  renderMiniGame();
}

const TITRATION_MAX_ATTEMPTS = 5;

function triggerTitrationExplosion(game) {
  playSurgeCrack(0.9);
  playNoiseBurst({ durationMs: 220, volume: 0.9, frequency: 700 });
  pulseActionSignal(state.playerRoom, "trace");
  applyRoomStress(state.playerRoom);
  pushStatus("The mix explodes. Trace spike in the room.", 4);
  state.titrationBatch += 1;
  closeMiniGame();
  resolveMiniGameFailure(game.id);
}

function resetTitrationQuickState(instanceState) {
  instanceState.mlPoured = 0;
  instanceState.lastFeedback = "Adjust and pour again.";
  instanceState.lastSuccess = false;
}

function handleTitrationAttemptFailure(game) {
  game.tries += 1;
  if (game.tries >= TITRATION_MAX_ATTEMPTS) {
    triggerTitrationExplosion(game);
    return true;
  }
  if (game.type === "titration_transfer") {
    resetTitrationTransferState(game.instanceState);
  } else {
    resetTitrationQuickState(game.instanceState);
  }
  renderMiniGame();
  return false;
}

function submitBalanceHold() {
  return;
}

function submitMiniGameAnswer() {
  const game = state.miniGame;
  if (!game) return;
  switch (game.type) {
    case "signal_tuner":
      attemptSignalTunerLock(game);
      break;
    case "dial_lock":
      confirmDialLockStep(game);
      break;
    case "titration_quick":
      submitTitrationQuick(game);
      break;
    case "patch_drag":
      submitPatchDrag(game);
      break;
    case "resistor_kit":
      submitResistorKit(game);
      break;
    case "balance_hold":
      submitBalanceHold(game);
      break;
    default:
      break;
  }
}

function openCraftMiniGame(craftable) {
  if (!craftable || state.craftMiniGameActive) return;
  const requiredParts = [...craftable.parts];
  const shuffledParts = [...requiredParts];
  for (let i = shuffledParts.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledParts[i], shuffledParts[j]] = [shuffledParts[j], shuffledParts[i]];
  }
  state.craftMiniGame = {
    craftable,
    schematicName: craftable.schematic,
    requiredParts,
    placements: new Map(),
    tray: new Set(shuffledParts),
    selectedToken: null,
  };
  state.craftMiniGameActive = true;
  state.objectiveBlocked = true;
  renderCraftMiniGame();
  openPanel(dom.craftMiniGame);
  updateUI();
}

function closeCraftMiniGame() {
  if (!state.craftMiniGameActive) return;
  state.craftMiniGameActive = false;
  state.craftMiniGame = null;
  state.objectiveBlocked = false;
  closePanel(dom.craftMiniGame);
  updateUI();
}

function cancelCraftMiniGame() {
  if (!state.craftMiniGameActive) return;
  closeCraftMiniGame();
}

function commitCraftMiniGame() {
  if (!state.craftMiniGameActive || !state.craftMiniGame) return;
  if (!isCraftMiniGameComplete()) return;
  const { craftable } = state.craftMiniGame;
  closeCraftMiniGame();
  completeCraftItem(craftable);
}

function isCraftMiniGameComplete() {
  const game = state.craftMiniGame;
  if (!game) return false;
  return game.placements.size === game.requiredParts.length;
}

function selectCraftToken(partName) {
  const game = state.craftMiniGame;
  if (!game) return;
  if (!game.tray.has(partName)) return;
  game.selectedToken = game.selectedToken === partName ? null : partName;
  refreshCraftMiniGameSelection();
}

function returnCraftTokenFromSlot(slotIndex) {
  const game = state.craftMiniGame;
  if (!game) return;
  const placed = game.placements.get(slotIndex);
  if (!placed) return;
  game.placements.delete(slotIndex);
  game.tray.add(placed);
  game.selectedToken = null;
  renderCraftMiniGame();
}

function showCraftSlotError(slotEl) {
  if (!slotEl) return;
  slotEl.classList.remove("is-error");
  void slotEl.offsetWidth;
  slotEl.classList.add("is-error");
}

function placeCraftToken(partName, slotIndex, slotEl) {
  const game = state.craftMiniGame;
  if (!game) return;
  const expected = game.requiredParts[slotIndex];
  if (partName !== expected) {
    showCraftSlotError(slotEl);
    game.selectedToken = null;
    refreshCraftMiniGameSelection();
    return;
  }
  game.placements.forEach((placedPart, index) => {
    if (placedPart === partName && index !== slotIndex) {
      game.placements.delete(index);
    }
  });
  const existing = game.placements.get(slotIndex);
  if (existing && existing !== partName) {
    game.tray.add(existing);
  }
  game.placements.set(slotIndex, partName);
  game.tray.delete(partName);
  game.selectedToken = null;
  renderCraftMiniGame();
}

function handleCraftSlotClick(event) {
  const game = state.craftMiniGame;
  if (!game) return;
  const slotEl = event.currentTarget;
  const slotIndex = Number(slotEl.dataset.slotIndex);
  if (Number.isNaN(slotIndex)) return;
  const selected = game.selectedToken;
  if (selected) {
    placeCraftToken(selected, slotIndex, slotEl);
    return;
  }
  returnCraftTokenFromSlot(slotIndex);
}

function handleCraftSlotDrop(event) {
  const slotEl = event.currentTarget;
  const slotIndex = Number(slotEl.dataset.slotIndex);
  if (Number.isNaN(slotIndex)) return;
  const partName = event.dataTransfer?.getData("text/plain");
  if (!partName) return;
  event.preventDefault();
  placeCraftToken(partName, slotIndex, slotEl);
}

function renderCraftMiniGame() {
  const game = state.craftMiniGame;
  if (!game || !dom.craftMiniGameBoard || !dom.craftMiniGameTray) return;
  dom.craftMiniGameSubtitle.textContent = game.schematicName;
  dom.craftMiniGameBoard.innerHTML = "";
  dom.craftMiniGameTray.innerHTML = "";
  game.requiredParts.forEach((part, index) => {
    const slot = document.createElement("div");
    slot.className = "craft-slot";
    slot.dataset.slotIndex = String(index);
    slot.addEventListener("click", handleCraftSlotClick);
    slot.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    slot.addEventListener("drop", handleCraftSlotDrop);
    const label = document.createElement("div");
    label.className = "craft-slot-label";
    label.textContent = part;
    const placeholder = document.createElement("div");
    placeholder.className = "craft-slot-placeholder";
    placeholder.textContent = "Drop symbol";
    const placed = game.placements.get(index);
    if (placed) {
      const token = createCraftToken(placed);
      token.classList.add("in-slot");
      placeholder.textContent = "";
      placeholder.appendChild(token);
      slot.classList.add("has-token", "is-correct");
    }
    slot.appendChild(label);
    slot.appendChild(placeholder);
    dom.craftMiniGameBoard.appendChild(slot);
  });

  game.tray.forEach((partName) => {
    const token = createCraftToken(partName);
    if (game.selectedToken === partName) {
      token.classList.add("is-selected");
    }
    dom.craftMiniGameTray.appendChild(token);
  });

  dom.craftMiniGameCommitBtn.disabled = !isCraftMiniGameComplete();
}

function createCraftToken(partName) {
  const token = document.createElement("div");
  token.className = "craft-token";
  token.textContent = "";
  if (schematicSpriteFailed) {
    token.textContent = getFallbackGlyph(partName);
  } else {
    token.appendChild(createSchematicIcon(partName));
  }
  token.dataset.partName = partName;
  token.setAttribute("role", "button");
  token.setAttribute("aria-label", partName);
  token.draggable = true;
  token.addEventListener("dragstart", (event) => {
    event.dataTransfer?.setData("text/plain", partName);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
    }
  });
  token.addEventListener("click", () => {
    selectCraftToken(partName);
  });
  return token;
}

function refreshCraftMiniGameSelection() {
  if (!state.craftMiniGame) return;
  const selected = state.craftMiniGame.selectedToken;
  dom.craftMiniGameTray?.querySelectorAll(".craft-token").forEach((token) => {
    token.classList.toggle("is-selected", token.dataset.partName === selected);
  });
}

function completeCraftItem(craftable) {
  const requiredCounts = getRequiredPartCounts(craftable.parts);
  recordMeaningfulAction();
  requiredCounts.forEach((count, part) => removeInventoryItem(part, count));
  const isObjective = Boolean(state.requiredEscapeSchematic) &&
    craftable.schematic === state.requiredEscapeSchematic;
  const isReusable = Boolean(craftable.schematic) &&
    REUSABLE_SCHEMATICS.has(craftable.schematic);
  if (isObjective) {
    state.objectiveItemName = craftable.name;
    state.objectiveItemCrafted = true;
    if (craftable.schematic === "Flame-Saw") {
      state.hasFlameSaw = true;
      if (state.currentNight === 10) {
        const line = getNightObjectiveSuccessLine();
        if (line) {
          showObjectiveModal(line);
        }
      }
    }
  } else {
    const recipe = getObjectiveRecipeByName(craftable.name);
    if (!isReusable) {
      state.completedObjectiveItems.add(craftable.name);
    }
    if (recipe?.unlockDeployable) {
      state.deployableUnlocks[recipe.unlockDeployable] = true;
      if (recipe.unlockDeployable === "noiseLure") {
        state.noiseLureCharges += recipe.chargesGranted ?? 0;
      } else if (recipe.unlockDeployable === "doorJam") {
        state.doorJamCharges += recipe.chargesGranted ?? 0;
      }
    }
  }
  updateEscapeReadiness();
  const profile = getNightProfile();
  const effects = getPassiveEffects();
  registerSignal(
    state.playerRoom,
    0.28 * profile.signalStrength.device * effects.signalSpike,
    { type: "build", lastKnownChance: 0.18, bleed: false }
  );
  applyRoomStress(state.playerRoom);
  if (craftable.schematic && !REUSABLE_SCHEMATICS.has(craftable.schematic)) {
    state.foundSchematics.delete(craftable.schematic);
  }
  updateUI();
}

function craftItem() {
  if (!state.isAlive || state.hasEscaped) return;
  if (state.craftMiniGameActive) return;
  if (state.objectiveBlocked) return;
  const craftable = getSelectedSchematic();
  if (!craftable) return;
  const isObjective = Boolean(state.requiredEscapeSchematic) &&
    craftable.schematic === state.requiredEscapeSchematic;
  const isReusable = Boolean(craftable.schematic) &&
    REUSABLE_SCHEMATICS.has(craftable.schematic);
  if (!state.unlocks.allowCrafting && !state.foundSchematics.has(craftable.schematic)) {
    const unlockNight = getNextUnlockNightFromNow("allowCrafting");
    pushStatus(
      unlockNight ? `Crafting locked until Night ${unlockNight}.` : "Crafting locked.",
      3
    );
    return;
  }
  if (!state.foundSchematics.has(craftable.schematic)) return;
  if (isObjective && (state.objectiveItemInstalled || state.objectiveItemCrafted)) {
    pushStatus("Objective item already assembled.", 3);
    return;
  }
  if (!isReusable && state.completedObjectiveItems.has(craftable.name)) {
    pushStatus("Objective already completed tonight.", 3);
    return;
  }
  if (!craftable.parts.every((part) => isMaterial(part))) {
    console.error("Crafting blocked: power/access parts detected in schematic.", craftable);
    pushStatus("Crafting failed: component class mismatch.", 3);
    return;
  }
  const requiredCounts = getRequiredPartCounts(craftable.parts);
  if (![...requiredCounts.entries()].every(([part, count]) => hasInventoryItem(part, count))) {
    return;
  }
  openCraftMiniGame(craftable);
}

/*
AI loop flow:
1) Director nudges (soft signals near the player).
2) Signals decay/update, last-known memory updates.
3) Target scoring blends signals, trail, prediction, and focus bias.
4) Robot chooses to move, sweep, linger, or investigate based on confidence.
*/
function startGameLoop() {
  if (gameLoopId) {
    clearInterval(gameLoopId);
  }
  gameLoopId = setInterval(() => {
    if (!state.isAlive || state.hasEscaped) return;
    if (state.objectiveBlocked) return;
    state.robotMovedThisTick = false;
    if (state.trailTurns > 0) {
      state.trailTurns -= 1;
      if (state.trailTurns === 0) {
        state.robotLockOnPlayed = false;
      }
    }
    if (state.alertTicks > 0) {
      state.alertTicks -= 1;
    }
    tickStatus();
    tickRobotSfxCooldowns();
    tickStoryQueue();
    if (state.sanityGlitchCooldown > 0) {
      state.sanityGlitchCooldown -= 1;
    }
    if (state.sanityScanCooldown > 0) {
      state.sanityScanCooldown -= 1;
    }
    if (state.caitCooldown > 0) {
      state.caitCooldown -= 1;
    }
    updateHorrorFX();
    if (state.hidden) {
      state.hiddenTurns += 1;
    } else {
      state.hiddenTurns = 0;
    }
    if (!isNight11() && state.currentNight >= 4 &&
      state.sanity < 0.4 &&
      state.sanityGlitchCooldown <= 0 &&
      !state.phantomCueShown) {
      const exitRoom = rooms.find((room) => room.isExit)?.id ?? 13;
      const nearExit = rooms[state.playerRoom].isExit ||
        roomConnections[exitRoom]?.includes(state.playerRoom);
      const nearDeath = getRobotDistance() !== null && getRobotDistance() <= 1;
      const allowEscapeState = !state.escapeReady && !nearExit && !nearDeath;
      if (allowEscapeState) {
        const nearRobot = getRobotDistance() !== null && getRobotDistance() <= 2;
        const inTriggeredAlarm = isAlarmTriggered(state.playerRoom);
        const inSunlit = state.sunlitRooms.has(state.playerRoom);
        const pressure = getSignalPressure(state.playerRoom);
        const allowHallucination = nearRobot || inTriggeredAlarm || inSunlit || pressure >= 0.6;
        if (allowHallucination) {
          const chance = state.sanity < 0.2 ? 0.18 : 0.1;
          if (Math.random() < chance) {
            pushBanner("…footsteps everywhere…", 3);
            state.sanityGlitchCooldown = 6;
            state.phantomCueShown = true;
          }
        }
      }
    }
    if (
      !isNight11() &&
      state.currentNight >= 4 &&
      state.hidden &&
      getRobotDistance() !== null &&
      getRobotDistance() <= 1 &&
      state.hiddenTurns >= 3
    ) {
      if (state.turn % 2 === 0) {
        adjustSanity(-0.02, "hiding");
      }
    }
    if (!isNight11() && state.currentNight >= 4 && state.scannerOn && state.sunlitRooms.has(state.playerRoom)) {
      adjustSanity(-0.01, "sunlight");
    }
    if (state.scannerOn) {
      const profile = getNightProfile();
      const effects = getPassiveEffects();
      const base = SCANNER_TICK_SIGNAL * profile.signalStrength.device * effects.signalSpike;
      const bleed = SCANNER_BLEED_SIGNAL * profile.signalStrength.device * effects.bleedBoost;
      registerSignal(state.playerRoom, base, { type: "scanner", lastKnownChance: 0.12 });
      const neighbors = roomConnections[state.playerRoom] || [];
      neighbors.forEach((neighbor) => {
        registerSignal(neighbor, bleed, { type: "scanner-bleed", lastKnownChance: 0.05 });
      });
      if (state.scanPulseTicks > 0) {
        state.scanPulseTicks -= 1;
        if (state.scanPulseTicks === 0) {
          state.scanFocusRoom = null;
        }
      }
    }
    tickPlayerTravel();
    const goof = detectGoofing();
    if (goof) {
      triggerDisciplineCheck(goof.sourceRoomId);
    }
    tickRobotTravel();
    processPendingSignals();
    tickAlarms();
    tickAlarmedRooms();
    tickSunlitRooms();
    tickPowerSurge();
    tickStormLightning();
    tickPersistentSignals();
    decaySignals();
    tickDirector();
    if (!state.robotDisabled && state.robotRechargeCooldown !== null) {
      state.robotRechargeCooldown -= 1;
      if (state.robotRechargeCooldown <= 0) {
        if (
          !hasStrongSignal() &&
          !isRobotTraveling() &&
          state.robotSearchTurns === 0 &&
          state.robotRoom !== state.playerRoom
        ) {
          const dormantTurns = ROBOT_RECHARGE_DORMANT_MIN +
            Math.floor(Math.random() * (ROBOT_RECHARGE_DORMANT_MAX - ROBOT_RECHARGE_DORMANT_MIN + 1));
          state.robotDormant = Math.max(state.robotDormant, dormantTurns);
          pushStatus("The robot powers down. The halls breathe.", 3);
        }
        state.robotRechargeCooldown = getRobotRechargeCooldown();
      }
    }
    tickRewireDampen();
    tickJammedEdges();
    maybeExpireLastKnown();
    advanceRobot();
    checkThreat();
    tickRobotMemory();
    maybeTriggerCaitFrayedTutorial();
    state.prevSanity = state.sanity;
    updateUI();
  }, TICK_MS);
}

function updateUseList() {
  dom.useList.innerHTML = "";
  const controlBlocked = state.objectiveBlocked || isActionLocked();
  const options = [];
  const lockedEntries = [];
  const noiseLureUnlocked = state.unlocks.allowNoiseLure && isDeployableUnlocked("noiseLure");
  const doorJamUnlocked = state.unlocks.allowDoorJams && isDeployableUnlocked("doorJam");
  if (state.unlocks.allowNoiseLure) {
    if (!noiseLureUnlocked) {
      lockedEntries.push("Noise Lure locked. Complete tonight's objective to unlock.");
    }
    options.push(
      {
        label: `Noise Lure (${state.noiseLureCharges})`,
        action: () => beginMapTarget("noise"),
        help: "Noise Lure",
        disabled: !noiseLureUnlocked ||
          state.noiseLureCharges <= 0 ||
          isPlayerTraveling() ||
          state.mapTargetMode,
      }
    );
  }
  if (state.unlocks.allowDoorJams) {
    if (!doorJamUnlocked) {
      lockedEntries.push("Door Jam locked. Complete tonight's objective to unlock.");
    }
    const adjacent = roomConnections[state.playerRoom] || [];
    const validTargets = adjacent.filter((roomId) => {
      const disallowed = rooms[roomId].isExit || rooms[state.playerRoom].isExit;
      if (disallowed) return false;
      return !isEdgeJammed(state.playerRoom, roomId);
    });
    options.push({
      label: `Door Jam (${state.doorJamCharges})`,
      action: () => beginMapTarget("jam"),
      help: "Door Jam",
      disabled: !doorJamUnlocked ||
        state.doorJamCharges <= 0 ||
        validTargets.length === 0 ||
        isPlayerTraveling() ||
        state.mapTargetMode,
    });
  }
  if (hasCollectedTool("Blowtorch")) {
    const blowtorchTargets = getMapTargetCandidatesForBlowtorch();
    options.push({
      label: "Blowtorch",
      action: () => beginMapTarget("unjam"),
      help: "Blowtorch",
      disabled: blowtorchTargets.size === 0 || isPlayerTraveling() || state.mapTargetMode,
    });
  }

  if (options.length === 0 && lockedEntries.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No usable items.";
    dom.useList.appendChild(empty);
    return;
  }
  lockedEntries.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    dom.useList.appendChild(li);
  });

  options.forEach((item) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = `Use ${item.label}`;
    button.disabled = Boolean(item.disabled) || controlBlocked;
    button.addEventListener("click", item.action);
    li.appendChild(button);
    const help = document.createElement("button");
    help.textContent = "Inspect";
    help.disabled = controlBlocked;
    help.addEventListener("click", () => openComponent(item.help));
    li.appendChild(help);
    dom.useList.appendChild(li);
  });
}

function updateScannerToggleButton() {
  if (!dom.scannerToggleBtn) return;
  const controlBlocked = state.objectiveBlocked || isActionLocked();
  const showScanner = hasCollectedTool("Pulse Scanner") && state.unlocks.allowScannerToggle;
  dom.scannerToggleBtn.hidden = !showScanner;
  dom.scannerToggleBtn.classList.toggle("hidden", !showScanner);
  dom.scannerToggleBtn.style.display = showScanner ? "" : "none";
  if (!showScanner) return;
  const status = state.unlocks.allowScannerToggle
    ? (state.scannerOn ? "On" : "Off")
    : "Locked";
  if (dom.scannerToggleStatus) {
    dom.scannerToggleStatus.textContent = status;
  } else {
    const label = dom.scannerToggleBtn.querySelector(".quick-label");
    const statusSpan = document.createElement("span");
    statusSpan.className = "quick-sub";
    statusSpan.id = "scannerToggleStatus";
    statusSpan.textContent = status;
    if (label) {
      dom.scannerToggleBtn.appendChild(statusSpan);
    } else {
      dom.scannerToggleBtn.textContent = "";
      const labelSpan = document.createElement("span");
      labelSpan.className = "quick-label";
      labelSpan.textContent = "Scanner";
      dom.scannerToggleBtn.append(labelSpan, statusSpan);
    }
    dom.scannerToggleStatus = statusSpan;
  }
  dom.scannerToggleBtn.setAttribute("aria-label", `Scanner: ${status}`);
  dom.scannerToggleBtn.disabled = controlBlocked || !state.unlocks.allowScannerToggle;
  dom.scannerToggleBtn.classList.toggle("objective-highlight", state.scannerHighlight);
}

function pickScannerFocusRoom() {
  if (state.robotPlannedTarget !== null) return state.robotPlannedTarget;
  if (state.robotSweepQueue.length > 0) return state.robotSweepQueue[0];
  let bestRoom = null;
  let bestSignal = 0;
  state.roomSignals.forEach((value, roomId) => {
    if (value > bestSignal) {
      bestSignal = value;
      bestRoom = roomId;
    }
  });
  return bestRoom;
}

function jamDurationForNight() {
  const effects = getPassiveEffects();
  const base = state.currentNight <= 3 ? 5 : state.currentNight <= 7 ? 4 : 3;
  return base + effects.jamBonus;
}

function deployDoorJam(roomId) {
  if (!isDeployableUnlocked("doorJam")) return;
  if (state.doorJamCharges <= 0) return;
  if (!(roomConnections[state.playerRoom] || []).includes(roomId)) return;
  runLockedAction({
    label: "Setting door jam…",
    steps: 1,
    onStep: () => {
      recordMeaningfulAction();
      pulseActionSignal(state.playerRoom, "trace");
      jamDoorTo(roomId);
      state.turn += 1;
      updateUI();
    },
  });
}

function jamDoorTo(roomId) {
  if (!isDeployableUnlocked("doorJam")) return;
  if (state.doorJamCharges <= 0) return;
  if (rooms[state.playerRoom].isExit || rooms[roomId].isExit) return;
  if (isEdgeJammed(state.playerRoom, roomId)) return;
  const duration = jamDurationForNight();
  if (!jamEdge(state.playerRoom, roomId, duration)) return;
  state.doorJamCharges = Math.max(0, state.doorJamCharges - 1);
  const profile = getNightProfile();
  const effects = getPassiveEffects();
  registerSignal(
    state.playerRoom,
    0.35 * profile.signalStrength.device * effects.signalSpike,
    { type: "jam", lastKnownChance: 0.2 }
  );
  pushStatus("You wedge the door. Metal screams.", 3);
  closeUse();
  updateUI();
}

function useBlowtorch(roomId) {
  const source = state.mapTargetSourceRoom ?? state.playerRoom;
  if (!(roomConnections[source] || []).includes(roomId)) return;
  const key = edgeKey(source, roomId);
  if (!state.permaJammedEdges.has(key)) {
    showObjectiveModal(getCaitLine("wrongDoor"));
    return;
  }
  runLockedAction({
    label: "Cutting through jam…",
    steps: 2,
    onStep: (step, total) => {
      recordMeaningfulAction();
      pulseActionSignal(state.playerRoom, "trace");
      const profile = getNightProfile();
      registerSignal(
        state.playerRoom,
        0.32 * profile.signalStrength.device,
        { type: "blowtorch", lastKnownChance: 0.25 }
      );
      state.turn += 1;
      if (step < total) {
        updateUI();
        return;
      }
      removePermaJam(key);
      pushStatus("The jam melts away.", 3);
      closeUse();
      updateUI();
    },
  });
}

function handleEscape() {
  if (!state.escapeReady) return;
  if (!rooms[state.playerRoom].isExit) return;
  playRunBurst();
  buildEscape();
}

function canTriggerSunlightMemory(roomId) {
  if (isNight11()) return false;
  if (state.meta.sunlightMemoryShown) return false;
  if (state.currentNight <= 4) return false;
  if (state.vista <= 3) return false;
  if (!state.sunlitRooms.has(roomId)) return false;
  if (state.robotRoom === roomId) return false;
  if (isAlarmTriggered(roomId)) return false;
  const robotDistance = getRobotDistance();
  if (robotDistance !== null && robotDistance <= 1) return false;
  if (!canShowThought()) return false;
  return Math.random() < SUNLIGHT_MEMORY_CHANCE;
}

function maybeTriggerSunlightMemory(roomId) {
  if (!canTriggerSunlightMemory(roomId)) return;
  markMetaFlag("sunlightMemoryShown");
  showThought(SUNLIGHT_MEMORY_TEXT, SUNLIGHT_MEMORY_TICKS);
}

function tickPlayerTravel() {
  if (state.playerPath.length === 0) {
    state.playerTravelStepStart = null;
    state.playerTravelStepDuration = 0;
    updateMovementAudioState();
    return;
  }
  if (!state.playerTravelStepStart) {
    startPlayerTravelStep();
    updateMovementAudioState();
    return;
  }
  const elapsed = Date.now() - state.playerTravelStepStart;
  if (elapsed < state.playerTravelStepDuration) return;
  const nextRoom = state.playerPath.shift();
  const previousRoom = state.playerRoom;
  state.playerRoom = nextRoom;
  state.vista = Math.max(0, state.vista + 1);
  state.hidden = false;
  state.hiddenSpot = null;
  state.hiddenTurns = 0;
  state.hideEncounteredRobotInRoom = false;
  state.hideSpotArmKey = null;
  if (isNight11() && state.caitQuietRoomId === nextRoom && !state.caitQuietSeen) {
    state.caitQuietSeen = true;
    showCaitQuietModal();
  }
  if (state.introStep === "highlight-run" && rooms[nextRoom].isExit && !state.introEscapeVisited) {
    state.introEscapeVisited = true;
    state.introStep = "highlight-live";
  }
  if (state.introStep === "await-escape" && rooms[nextRoom].isExit && !state.introEscapeVisited) {
    state.introEscapeVisited = true;
    state.introStep = "highlight-live";
  }
  if (rooms[nextRoom].isExit && !state.escapeArrivalAcknowledged) {
    state.escapeArrivalPrompted = true;
    state.escapeArrivalAcknowledged = true;
  }
  if (state.currentNight === 1 && rooms[nextRoom].isExit && !state.liveAcknowledgedNightOne) {
    state.liveEscapePrompted = true;
  }
  updatePlayerTrail(nextRoom);
  const profile = getNightProfile();
  const effects = getPassiveEffects();
  const isRun = state.playerTravelMode === "run";
  // Ensure lastMoveType is based on the resolved travel mode.
  state.lastMoveType = isRun ? "run" : "sneak";
  state.recentMoves.push({ roomId: state.playerRoom, mode: state.lastMoveType, turn: state.turn });
  if (state.recentMoves.length > 10) {
    state.recentMoves.shift();
  }
  if (isRun) {
    registerSignal(nextRoom, 0.95 * profile.signalStrength.run * effects.signalSpike, {
      type: "run",
      forceLastKnown: true,
    });
    const noiseBoost = getRoomNoiseRisk(nextRoom);
    registerSignal(nextRoom, Math.max(0.35, noiseBoost) * profile.signalStrength.run * effects.signalSpike, {
      type: "run",
      forceLastKnown: true,
    });
    state.sneakStepsWithoutSignal = 0;
  } else {
    const base = 0.25;
    const noiseBoost = getRoomNoiseRisk(nextRoom);
    const strength = Math.min(0.4, base + noiseBoost * 0.2) * profile.signalStrength.sneak;
    const lastKnownScale = profile.sneakLastKnownScale ?? 1;
    registerSignal(nextRoom, strength, {
      type: "sneak",
      lastKnownChance: strength * 0.5 * lastKnownScale,
    });
    if (strength < 0.35) {
      state.sneakStepsWithoutSignal += 1;
    } else {
      state.sneakStepsWithoutSignal = 0;
    }
    if (state.sneakStepsWithoutSignal >= profile.sneakBreakRooms) {
      const hadTrail = state.trailTurns > 0;
      state.trailTurns = Math.max(0, state.trailTurns - 1);
      if (state.lastKnownPlayerRoom !== null) {
        const currentSignal = state.roomSignals.get(state.lastKnownPlayerRoom) || 0;
        state.roomSignals.set(state.lastKnownPlayerRoom, Math.max(0, currentSignal - 0.2));
      }
      if (hadTrail && state.trailTurns === 0 && state.turn - state.lastTrailBreakTick > 4) {
        pushStatus("The echoes die out.", 3);
        state.lastTrailBreakTick = state.turn;
        state.robotLockOnPlayed = false;
      }
      state.sneakStepsWithoutSignal = 0;
    }
  }
  if (isAlarmCapable(nextRoom) && !isAlarmTriggered(nextRoom)) {
    setAlarmTriggered(nextRoom);
    showObjectiveModal(getCaitLine("alarmRoomLit"));
    onAlarmTriggered(nextRoom);
  }
  if (state.requiredPickup &&
    state.requiredPickup.caitWarnLine &&
    state.requiredPickup.roomId === nextRoom &&
    !state.requiredPickup.warned) {
    state.requiredPickup.warned = true;
    showObjectiveModal(state.requiredPickup.caitWarnLine);
  }
  if (state.sunlitRooms.has(nextRoom)) {
    pushStatus("Sunlight spills across the floor. It doesn’t care how quiet you are.", 3);
  }
  maybeTriggerSunlightMemory(nextRoom);
  const prevPressure = getSignalPressure(previousRoom);
  const nextPressure = getSignalPressure(nextRoom);
  if (prevPressure >= 0.6 && nextPressure <= 0.3) {
    adjustSanity(0.04, "breather");
  }
  state.turn += 1;
  logDebug("player-move", {
    room: nextRoom,
    type: isRun ? "run" : "sneak",
    trailTurns: state.trailTurns,
    lastKnown: state.lastKnownPlayerRoom,
  });
  if (state.playerPath.length === 0) {
    if (state.selectedRoom === state.playerRoom) {
      clearSelectedRoom();
    } else {
      updateUI();
    }
    state.playerTravelTotal = 0;
    state.playerTravelStepStart = null;
    state.playerTravelStepDuration = 0;
    updateMovementAudioState();
  } else {
    startPlayerTravelStep();
    updateMovementAudioState();
  }
}

function tickRobotTravel() {
  if (state.robotPath.length === 0) {
    state.robotTravelStepStart = null;
    state.robotTravelStepDuration = 0;
    return;
  }
  if (!state.robotTravelStepStart) {
    startRobotTravelStep();
    return;
  }
  const elapsed = Date.now() - state.robotTravelStepStart;
  if (elapsed < state.robotTravelStepDuration) return;
  const nextRoom = state.robotPath[0];
  if (nextRoom !== undefined && isEdgeJammed(state.robotRoom, nextRoom)) {
    playSfx(dom.robotRerouteAudio, "robot-reroute", {
      volume: ROBOT_SFX_VOLUMES.rerouteScrape,
      cooldownTicks: 3,
    });
    const key = edgeKey(state.robotRoom, nextRoom);
    const isPerma = state.permaJammedEdges.has(key);
    if (!isPerma) {
      const remaining = state.jammedEdges.get(key) || 0;
      const moodBoost = state.robotMood === "irritated" || state.robotMood === "confident";
      const nightBoost = state.currentNight >= 7 ? 0.55 : 0.35;
      const breakChance = moodBoost ? nightBoost + 0.2 : nightBoost;
      if (Math.random() < breakChance) {
        const next = Math.max(0, remaining - 1);
        if (next <= 0) {
          state.jammedEdges.delete(key);
        } else {
          state.jammedEdges.set(key, next);
        }
      }
    }
    applyRobotPause("blocked");
    state.robotInvestigateTurns = Math.max(state.robotInvestigateTurns, Math.floor(Math.random() * 2) + 1);
    setRobotMode("investigate");
    state.robotTravelStepStart = null;
    state.robotTravelStepDuration = 0;
    state.robotPath = [];
    state.robotPlannedTarget = null;
    return;
  }
  state.robotPath.shift();
  const previousRoom = state.robotRoom;
  state.robotRoom = nextRoom;
  state.robotLastRoom = previousRoom;
  state.robotMovedThisTick = true;
  if (state.isAlive && state.hidden) {
    if (state.robotRoom === state.playerRoom) {
      state.hideEncounteredRobotInRoom = true;
    }
    if (previousRoom === state.playerRoom && state.robotRoom !== state.playerRoom) {
      if (
        state.hideEncounteredRobotInRoom &&
        state.hiddenSpot &&
        state.hideSpotArmKey === hideSpotKey(state.playerRoom, state.hiddenSpot)
      ) {
        recordHideSuccess(state.playerRoom, state.hiddenSpot);
      }
      state.hideEncounteredRobotInRoom = false;
      state.hideSpotArmKey = null;
    }
  }
  if (state.robotDormant === 0) {
    const distance = getRobotDistance();
    if (distance >= 2) {
      if (Math.random() < 0.15) {
        playSfx(dom.robotDistantMoveAudio, "robot-distant-move", {
          volume: ROBOT_SFX_VOLUMES.distantMove,
          cooldownTicks: 4,
        });
      }
    } else if (distance === 1) {
      if (Math.random() < 0.22) {
        playSfx(dom.robotNearMoveAudio, "robot-near-move", {
          volume: ROBOT_SFX_VOLUMES.nearMove,
          cooldownTicks: 3,
        });
      }
    }
  }
  if (state.robotRoom === state.playerRoom && previousRoom !== state.playerRoom) {
    playSfx(dom.robotEnterAudio, "robot-enter-room", {
      volume: ROBOT_SFX_VOLUMES.enterThunk,
      cooldownTicks: 2,
    });
  }
  handleRobotFocusArrival();
  markRoomChecked(state.robotRoom);
  recordRobotAlarmVisit(state.robotRoom);
  if (isAlarmTriggered(state.robotRoom)) {
    state.robotAlarmStreak += 1;
  } else {
    state.robotAlarmStreak = 0;
  }
  if (isAlarmTriggered(state.robotRoom) && isAlarmTriggered(previousRoom)) {
    const loopEdge = edgeKey(state.robotRoom, previousRoom);
    if (state.robotAlarmLoopEdge === loopEdge) {
      state.robotAlarmLoopTurns += 1;
    } else {
      state.robotAlarmLoopEdge = loopEdge;
      state.robotAlarmLoopTurns = 1;
    }
  } else {
    state.robotAlarmLoopEdge = null;
    state.robotAlarmLoopTurns = 0;
  }
  if (state.robotRoom === state.playerRoom && !state.hidden) {
    adjustSanity(-0.18, "robot");
  }
  if (!state.robotDisabled) {
    const adjacents = roomConnections[state.playerRoom] || [];
    if (adjacents.includes(state.robotRoom) && state.robotRoom !== state.playerRoom) {
      pushStatus("Metal steps echo nearby.", 3);
    }
  }
  logDebug("robot-move", { room: state.robotRoom, mode: state.robotMode });
  if (state.robotPath.length === 0) {
    state.robotTravelStepStart = null;
    state.robotTravelStepDuration = 0;
    if (state.robotPlannedTarget !== null && state.robotRoom === state.robotPlannedTarget) {
      const profile = getNightProfile();
      const confidence = Math.max(state.robotTargetConfidence, getRoomConfidence(state.robotRoom));
      const baseInvestigate = profile.investigateTurns.min;
      const variance = Math.max(1, profile.investigateTurns.max - profile.investigateTurns.min + 1);
      state.robotInvestigateTurns = Math.floor(Math.random() * variance) + baseInvestigate;
      if (state.robotFocus === state.robotRoom && state.robotFocusLinger > 0) {
        state.robotInvestigateTurns += state.robotFocusLinger;
        state.robotFocusLinger = 0;
      }
      if (confidence >= 0.55 || state.threat >= 3) {
        buildSweepQueue(state.robotRoom);
      } else {
        state.robotSweepQueue = [];
      }
      state.robotPlannedTarget = null;
      setRobotMode("investigate");
    }
  } else {
    startRobotTravelStep();
  }
}

function toggleRobot() {
  if (!state.unlocks.robotActive) {
    state.robotDisabled = true;
    if (dom.toggleRobotBtn) {
      dom.toggleRobotBtn.textContent = "Enable Robot";
    }
    pushStatus("Robot systems are offline.", 3);
    updateUI();
    return;
  }
  state.robotDisabled = !state.robotDisabled;
  if (dom.toggleRobotBtn) {
    dom.toggleRobotBtn.textContent = state.robotDisabled ? "Enable Robot" : "Disable Robot";
  }
  if (!state.robotDisabled) {
    showRobotActivationDialog();
    schedulePowerSurge();
  }
  if (state.robotDisabled) {
    state.robotLinger = 0;
    state.robotSearchTurns = 0;
    state.robotSearchSpot = null;
    state.robotLookTurns = 0;
    clearRobotFocus("disabled");
    state.robotPath = [];
    state.robotTravelStepStart = null;
    state.robotTravelStepDuration = 0;
    state.robotPlannedTarget = null;
    state.robotScanTarget = null;
    state.robotInvestigateTurns = 0;
    state.robotSweepQueue = [];
  }
  updateUI();
}

initTitleScreen();
