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

const craftableItems = [
  { name: "Signal Scrambler", parts: ["Capacitors", "Copper Wire"] },
  { name: "Motion Dampener", parts: ["Resistors", "Servo Motor"] },
  { name: "Override Key", parts: ["Microcontroller", "Copper Wire"] },
  { name: "Door Jam", parts: ["Resistors", "Copper Wire"] },
  { name: "Pulse Scanner", parts: ["Copper Wire", "Capacitors", "Microcontroller"] },
];

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
  "Signal Scrambler": "Jams the robot's sensors and clears accumulated signals.",
  "Motion Dampener": "Buys time by slowing the robot's movement for a short while.",
  "Override Key": "Overrides local locks and reduces the robot's alertness.",
  "Door Jam": "Temporarily wedges a nearby door to slow pursuit.",
  "Pulse Scanner": "A toggleable scanner that hums with static to reveal nearby robot intel.",
  "Noise Lure": "Creates a loud distraction to pull the robot off your trail.",
  "Blowtorch": "Burns through permanent jams. Loud, but it frees a locked edge.",
};

const deviceTypes = {
  scan: { name: "Pulse Scanner", cooldown: 0, uses: [] },
  noise: { name: "Noise Lure", cooldown: 0, uses: [] },
};

const mapPositions = {
  0: { x: 70, y: 60 },
  1: { x: 190, y: 50 },
  2: { x: 320, y: 60 },
  3: { x: 70, y: 160 },
  4: { x: 190, y: 160 },
  5: { x: 320, y: 150 },
  6: { x: 430, y: 150 },
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

const TICK_MS = 1200;
const DEBUG_AI = false;
const DEBUG_UI = true;
const DEBUG_ALWAYS_VISIBLE = false;
const TITLE_FADE_IN_MS = 5000;
const TITLE_FADE_OUT_MS = 5000;
const MUSIC_BUS_DEFAULT = 0.8;
const REWIRE_DAMPEN_TURNS = 3;
const REWIRE_DAMPEN_DECAY = 0.05;
const REWIRE_DAMPEN_CURRENT = 0.18;
const REWIRE_DAMPEN_ADJACENT = 0.1;
const REWIRE_SIGNAL_STRENGTH = 0.06;
const RUN_AUDIO_VOLUME = 0.55;
const RUN_AUDIO_FADE_IN_MS = 300;
const RUN_AUDIO_FADE_OUT_MS = 450;
const SNEAK_AUDIO_VOLUME = 0.45;
const SNEAK_AUDIO_FADE_IN_MS = 300;
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
    allowCrafting: false,
    allowDoorJams: false,
    showRobotIntelOnMap: false,
    allowAlarmedRooms: false,
  },
  2: {
    showMap: true,
    robotActive: true,
    allowSirens: false,
    allowSlowRewire: false,
    allowScannerToggle: false,
    allowNoiseLure: false,
    allowCrafting: false,
    allowDoorJams: false,
    showRobotIntelOnMap: false,
    allowAlarmedRooms: false,
  },
  3: {
    showMap: true,
    robotActive: true,
    allowSirens: true,
    allowSlowRewire: true,
    allowScannerToggle: false,
    allowNoiseLure: false,
    allowCrafting: false,
    allowDoorJams: false,
    showRobotIntelOnMap: false,
    allowAlarmedRooms: true,
  },
  4: {
    showMap: true,
    robotActive: true,
    allowSirens: true,
    allowSlowRewire: true,
    allowScannerToggle: true,
    allowNoiseLure: false,
    allowCrafting: false,
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
};

const SCANNER_TOGGLE_SPIKE = 0.16;
const SCANNER_TICK_SIGNAL = 0.08;
const SCANNER_BLEED_SIGNAL = 0.04;
const ALARM_TICK_SIGNAL = 0.07;
const ALARM_BLEED_SIGNAL = 0.03;
const PICKUP_START_ROOM = 0;

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
  { room: "Power Junction", part: "24V Power Pack", tool: "Signal Scrambler" },
  { room: "Control Bay", part: "Main Fuse (30A)", tool: "Override Key" },
  { room: "Coolant Vault", part: "Small Fuse (5A)", tool: "Signal Scrambler" },
  { room: "Hydraulic Core", part: "9V Battery", tool: "Motion Dampener" },
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
};

const state = {
  playerRoom: 0,
  robotRoom: 0,
  hidden: false,
  hiddenSpot: null,
  learnedHidingSpots: new Set(),
  hideHistory: new Map(),
  threat: 1,
  turn: 0,
  inventory: new Set(),
  foundSchematics: new Set(),
  craftedItems: new Set(),
  usedDevices: new Map(),
  robotFocus: null,
  lastKnownPlayerRoom: null,
  trailTurns: 0,
  routePreviewRoom: null,
  selectedRoom: null,
  roomSignals: new Map(),
  checkedRooms: new Set(),
  robotLinger: 0,
  robotDormant: 0,
  robotSearchTurns: 0,
  robotSearchSpot: null,
  robotPlannedTarget: null,
  robotLookTurns: 0,
  robotScanTarget: null,
  sawPlayerHide: false,
  robotDisabled: true,
  selectedSchematic: null,
  requiredEscapeSchematic: null,
  escapeReady: false,
  alertTicks: 0,
  objectiveBlocked: false,
  actionLock: null,
  escapeConsoleInspected: false,
  tasksAcknowledgedNightOne: false,
  noiseLures: 3,
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
  robotAlertQueued: false,
  robotAlertText: "",
  pendingObjectiveModal: null,
  statusMessage: "",
  statusTicks: 0,
  bannerMessage: "",
  bannerTicks: 0,
  playerTrail: [],
  signalDecayBoost: new Map(),
  rewireDampen: new Map(),
  lastStrongSignalTick: -999,
  lastStrongSignalRoom: null,
  lastKnownTick: -999,
  lastTrailBreakTick: -999,
  lastDeviceFatigueTick: -999,
  sneakStepsWithoutSignal: 0,
  pendingSignals: [],
  persistentSignals: new Map(),
  roomNoisePenalty: new Map(),
  burnedHidingSpots: new Set(),
  jammedEdges: new Map(),
  doorJams: 1,
  robotTask: null,
  robotFocusLinger: 0,
  scanPulseTicks: 0,
  scanFocusRoom: null,
  scannerOn: false,
  scannerHighlight: false,
  alarmedRooms: new Set(),
  triggeredAlarms: new Set(),
  disabledAlarmedRooms: new Set(),
  alarmDisableProgress: new Map(),
  alarmedRoomsRequired: 0,
  activeLures: new Map(),
  sunlitRooms: new Set(),
  specialPickups: new Map(),
  requiredPickup: null,
  toolCollected: new Set(),
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
  hiddenTurns: 0,
  lastMoveType: "sneak",
  ohShitTriggered: false,
  sanity: 1,
  minSanity: 1,
  sanityGlitchCooldown: 0,
  sanityScanCooldown: 0,
  phantomCueShown: false,
  lastSanityRecoveryTick: -999,
  caitCooldown: 0,
  caitTalkCount: 0,
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
};

let travelAnimationId = null;
let actionLockTimeoutId = null;
let actionLockStepTimeoutId = null;
let pendingMoveTimeoutId = null;
const ACTION_LOCK_MS = 1200;
let desiredMovementMode = "none";
let lastMovementMode = "none";
let typingTransitionToken = 0;
let typingAudioActive = false;
let typingAudioTimeoutId = null;

const dom = {
  audioGate: document.getElementById("audioGate"),
  audioGateBtn: document.getElementById("audioGateBtn"),
  titleScreen: document.getElementById("titleScreen"),
  titleVideoBackdrop: document.getElementById("titleVideoBackdrop"),
  titleVideo: document.getElementById("titleVideo"),
  titleVideos: document.querySelectorAll(".title-video"),
  titleAudio: document.getElementById("titleAudio"),
  rainAudio: document.getElementById("rainAudio"),
  sunnyAudio: document.getElementById("sunnyAudio"),
  sneakAudio: document.getElementById("sneakAudio"),
  runningAudio: document.getElementById("runningAudio"),
  typingAudio: document.getElementById("typingAudio"),
  titleStartBtn: document.getElementById("titleStartBtn"),
  app: document.querySelector(".app"),
  dateLabel: document.getElementById("dateLabel"),
  roomMedia: document.getElementById("roomMedia"),
  currentRooms: document.querySelectorAll(".current-room"),
  robotStatuses: document.querySelectorAll(".robot-status"),
  travelStatus: document.getElementById("travelStatus"),
  roomActions: document.getElementById("roomActions"),
  inventoryList: document.getElementById("inventoryList"),
  schematicInventory: document.getElementById("schematicInventory"),
  schematicList: document.getElementById("schematicList"),
  floorplanMap: document.getElementById("floorplanMap"),
  mapWeatherLabel: document.getElementById("mapWeatherLabel"),
  randomizeBtn: document.getElementById("randomizeBtn"),
  forceEscapeBtn: document.getElementById("forceEscapeBtn"),
  selectedRoom: document.getElementById("selectedRoom"),
  menuBtn: document.getElementById("menuBtn"),
  mapBtn: document.getElementById("mapBtn"),
  liveBtn: document.getElementById("liveBtn"),
  tasksBtn: document.getElementById("tasksBtn"),
  useBtn: document.getElementById("useBtn"),
  debugBtn: document.getElementById("debugBtn"),
  toggleRobotBtn: document.getElementById("toggleRobotBtn"),
  menuPanel: document.getElementById("menuPanel"),
  mapPanel: document.getElementById("mapPanel"),
  usePanel: document.getElementById("usePanel"),
  debugPanel: document.getElementById("debugPanel"),
  useList: document.getElementById("useList"),
  componentPanel: document.getElementById("componentPanel"),
  componentTitle: document.getElementById("componentTitle"),
  componentDetails: document.getElementById("componentDetails"),
  componentCount: document.getElementById("componentCount"),
  tasksPanel: document.getElementById("tasksPanel"),
  tasksText: document.getElementById("tasksText"),
  tasksOkBtn: document.getElementById("tasksOkBtn"),
  objectiveModal: document.getElementById("objectiveModal"),
  objectiveModalText: document.getElementById("objectiveModalText"),
  ackObjectiveBtn: document.getElementById("ackObjectiveBtn"),
  robotAlertModal: document.getElementById("robotAlertModal"),
  robotAlertText: document.getElementById("robotAlertText"),
  ackRobotAlertBtn: document.getElementById("ackRobotAlertBtn"),
  buildBtn: document.getElementById("buildBtn"),
  goBtn: document.getElementById("goBtn"),
  runBtn: document.getElementById("runBtn"),
  cancelBtn: document.getElementById("cancelBtn"),
  mapConfirmBtn: document.getElementById("mapConfirmBtn"),
  scannerToggleBtn: document.getElementById("scannerToggleBtn"),
  movementControls: document.getElementById("movementControls"),
  deathScreen: document.getElementById("deathScreen"),
  victoryScreen: document.getElementById("victoryScreen"),
  retryBtn: document.getElementById("retryBtn"),
  nextNightBtn: document.getElementById("nextNightBtn"),
  actionStatus: document.getElementById("actionStatus"),
  actionLock: document.getElementById("actionLock"),
  actionLockLabel: document.getElementById("actionLockLabel"),
  deathSummary: document.getElementById("deathSummary"),
  victorySummary: document.getElementById("victorySummary"),
  nightSelect: document.getElementById("nightSelect"),
  debugLog: document.getElementById("debugLog"),
};

const audioBuses = {
  master: 1,
  music: 1,
  ambience: 1,
  movement: 1,
  ui: 1,
  sfx: 1,
};
const loopTracks = new Map();

function registerLoopTrack(name, element, bus, baseVolume) {
  if (!element) return;
  loopTracks.set(name, {
    name,
    element,
    bus,
    baseVolume,
    currentTargetVolume: 0,
    fadeToken: 0,
    isPrimed: false,
  });
}

registerLoopTrack("rain", dom.rainAudio, "ambience", 0.6);
registerLoopTrack("sunny", dom.sunnyAudio, "ambience", 0.5);
registerLoopTrack("run", dom.runningAudio, "movement", RUN_AUDIO_VOLUME);
registerLoopTrack("sneak", dom.sneakAudio, "movement", SNEAK_AUDIO_VOLUME);

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

let gameLoopId = null;
let hasStartedGame = false;
let titleAudioUnlocked = false;
let titleSyncAnimationId = null;
let canStartAmbience = false;
let audioLoopsPrimed = false;
const audioPlayFailureLogged = new Set();
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
  if (audioPlayFailureLogged.has(label)) return;
  audioPlayFailureLogged.add(label);
  console.warn(`${label} audio play() failed:`, err);
  if (audio) {
    console.log(`${label}Audio currentSrc:`, audio.currentSrc, "readyState:", audio.readyState);
  }
}

function attemptPlayAudio(audio, label) {
  if (!audio) return;
  const playAttempt = audio.play();
  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch((err) => logAudioPlayFailure(label, audio, err));
  }
}

function setBusVolume(busName, volume) {
  if (!(busName in audioBuses)) return;
  audioBuses[busName] = clamp(volume, 0, 1);
  loopTracks.forEach((track) => {
    if (busName !== "master" && track.bus !== busName) return;
    if (!track.isPrimed) return;
    const effectiveTarget = getEffectiveVolume(track, track.currentTargetVolume);
    track.element.volume = effectiveTarget;
    track.element.muted = effectiveTarget <= 0;
  });
}

function getEffectiveVolume(track, targetVolume) {
  if (!track) return 0;
  const base = Number.isFinite(targetVolume) ? targetVolume : track.baseVolume;
  const busVolume = audioBuses[track.bus] ?? 1;
  const masterVolume = audioBuses.master ?? 1;
  return clamp(base * busVolume * masterVolume, 0, 1);
}

function fadeTrackTo(name, targetVolume, durationMs) {
  const track = loopTracks.get(name);
  if (!track?.element) return;
  if (!track.isPrimed) return;
  const audio = track.element;
  const nextTarget = Number.isFinite(targetVolume) ? targetVolume : track.baseVolume;
  track.currentTargetVolume = nextTarget;
  const effectiveTarget = getEffectiveVolume(track, nextTarget);
  const token = ++track.fadeToken;
  const duration = Math.max(0, durationMs ?? 0);
  const startVolume = Number.isFinite(audio.volume) ? audio.volume : 0;
  if (effectiveTarget > 0) {
    audio.muted = false;
  }
  if (duration === 0) {
    audio.volume = effectiveTarget;
    audio.muted = effectiveTarget <= 0;
    return;
  }
  const start = performance.now();
  const tick = (now) => {
    if (token !== track.fadeToken) return;
    const progress = Math.min(1, (now - start) / duration);
    audio.volume = startVolume + (effectiveTarget - startVolume) * progress;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      audio.muted = effectiveTarget <= 0;
    }
  };
  requestAnimationFrame(tick);
}

function primeLoopTracksInGesture() {
  if (audioLoopsPrimed) return;
  audioLoopsPrimed = true;
  loopTracks.forEach((track) => {
    const audio = track.element;
    audio.loop = true;
    audio.muted = true;
    audio.volume = 0;
    if (audio.paused) {
      attemptPlayAudio(audio, track.name);
    }
    track.isPrimed = true;
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

function isTitleScreenActive() {
  return Boolean(dom.titleScreen) &&
    dom.titleScreen.getAttribute("aria-hidden") !== "true" &&
    !hasStartedGame;
}

function init() {
  flushDebugLogBuffer();
  state.nightProfile = getNightProfile();
  state.unlocks = getUnlocks();
  renderMap();
  setupMissionForNight();
  assignRoomFinds();
  announceWeather();
  updateWeatherAmbience({ forceRestart: true });
  configureRobotStart();
  updateSchematicList();
  updatePlayerTrail(state.playerRoom);
  updateUI();
  attachEvents();
  setupDebugPanel();
  startGameLoop();
  showObjectiveModal(getInitialObjectiveModalText());
}

function initHorrorFX() {
  ensureFxOverlay();
  startFxLoop();
  updateHorrorFX();
}

function initTitleScreen() {
  mirrorConsole();
  if (!dom.titleScreen || !dom.titleStartBtn) {
    canStartAmbience = true;
    initHorrorFX();
    init();
    return;
  }
  document.body.classList.add("title-active");
  if (dom.app) {
    dom.app.classList.add("is-hidden");
  }
  if (dom.titleScreen) {
    dom.titleScreen.classList.remove("title-video-visible");
    dom.titleScreen.classList.remove("title-fade-out");
    dom.titleScreen.classList.remove("title-visible");
    requestAnimationFrame(() => {
      dom.titleScreen?.classList.add("title-visible");
    });
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

function handleAudioGateGesture(event) {
  if (titleAudioUnlocked) return;
  if (!event || !event.isTrusted) return;
  if (event.type === "keydown") {
    const allowedKeys = new Set(["Enter", " ", "Spacebar"]);
    if (!allowedKeys.has(event.key)) return;
    event.preventDefault();
  }
  titleAudioUnlocked = true;
  if (dom.audioGate) {
    dom.audioGate.removeEventListener("click", handleAudioGateGesture, true);
    dom.audioGate.setAttribute("aria-hidden", "true");
  }
  if (dom.audioGateBtn) {
    dom.audioGateBtn.removeEventListener("click", handleAudioGateGesture, true);
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
  const audioReady = AudioManager.init();
  primeLoopTracksInGesture();

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
    AudioManager.unlock();
    AudioManager.loadMusicFromElement(audioEl);
  };
  if (audioReady && typeof audioReady.then === "function") {
    audioReady.then(finishAudioSetup);
  } else if (audioReady) {
    finishAudioSetup();
  }
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
    if (!isTitleScreenActive() || !titleAudioUnlocked) {
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
  if (dom.titleVideo.paused) {
    dom.titleVideos.forEach((video) => {
      video.currentTime = dom.titleAudio.currentTime;
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch((err) => {
          console.warn("title video resume failed:", err);
        });
      }
    });
    return;
  }
  const drift = Math.abs(dom.titleVideo.currentTime - dom.titleAudio.currentTime);
  if (drift > 0.1) {
    dom.titleVideos.forEach((video) => {
      video.currentTime = dom.titleAudio.currentTime;
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

function startGameFromTitle() {
  if (hasStartedGame) return;
  hasStartedGame = true;
  canStartAmbience = true;
  primeLoopTracksInGesture();
  stopTitleSyncLoop();
  if (dom.titleScreen) {
    dom.titleScreen.classList.add("title-fade-out");
  }
  state.startRevealPending = true;
  state.introSequenceActive = true;
  state.introStep = "intro-modal";
  state.introEscapeVisited = false;
  setCurrentNight(1);
  initHorrorFX();
  init();
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
    }
    document.body.classList.remove("title-active");
    if (dom.app && !state.startRevealPending) {
      dom.app.classList.remove("is-hidden");
    }
    canStartAmbience = true;
    updateWeatherAmbience();
  };
  fadeOutMusicBus(TITLE_FADE_OUT_MS).finally(finishStart);
}

function attachEvents() {
  dom.buildBtn.addEventListener("click", craftItem);
  dom.retryBtn.addEventListener("click", resetGame);
  dom.nextNightBtn.addEventListener("click", advanceNight);
  dom.randomizeBtn.addEventListener("click", randomizeLayout);
  dom.forceEscapeBtn.addEventListener("click", forceEscape);
  dom.goBtn.addEventListener("click", () => moveSelected(false));
  dom.runBtn.addEventListener("click", () => moveSelected(true));
  dom.cancelBtn.addEventListener("click", cancelMovement);
  dom.mapConfirmBtn.addEventListener("click", confirmMapTarget);
  dom.scannerToggleBtn.addEventListener("click", () => handleAction("scan-toggle"));
  dom.menuBtn.addEventListener("click", openMenu);
  dom.mapBtn.addEventListener("click", openMap);
  dom.liveBtn.addEventListener("click", returnToRoom);
  dom.tasksBtn.addEventListener("click", openTasks);
  dom.tasksOkBtn.addEventListener("click", closeTasks);
  dom.useBtn.addEventListener("click", openUse);
  dom.debugBtn.addEventListener("click", openDebug);
  dom.toggleRobotBtn.addEventListener("click", toggleRobot);
  dom.ackObjectiveBtn.addEventListener("click", acknowledgeObjective);
  dom.ackRobotAlertBtn.addEventListener("click", acknowledgeRobotAlert);
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
}

function updateUI() {
  const room = rooms[state.playerRoom];
  const playerAdjacents = new Set(roomConnections[state.playerRoom] || []);
  const dangerRoom = !state.robotDisabled &&
    (state.robotRoom === state.playerRoom || playerAdjacents.has(state.robotRoom));
  dom.currentRooms.forEach((node) => {
    node.textContent = room.name;
  });
  dom.roomMedia.classList.toggle("threat-nearby", dangerRoom);
  dom.roomMedia.classList.toggle("glitch", false);
  dom.roomMedia.style.background = "transparent";
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
  dom.actionStatus.textContent = "";
  dom.actionStatus.classList.add("hidden");
  updateActionLockUI();
  updateTravelStatus();
  updateMapWeatherLabel();
  if (dom.dateLabel) {
    dom.dateLabel.textContent = formatDate(state.baseDate, state.currentNight + 1);
  }
  if (dom.nightSelect) {
    dom.nightSelect.value = String(state.currentNight);
  }
  if (state.mapTargetMode) {
    if (state.mapTargetSelection !== null) {
      dom.selectedRoom.textContent = rooms[state.mapTargetSelection].name;
    } else {
      dom.selectedRoom.textContent = state.mapTargetMode === "noise"
        ? "Select noise target"
        : state.mapTargetMode === "jam"
          ? "Select door to jam"
          : "Select door to unjam";
    }
  } else {
    dom.selectedRoom.textContent = state.selectedRoom === null
      ? "None"
      : rooms[state.selectedRoom].name;
  }
  updateInventoryList();
  updateSchematicsInventory();
  updateRequiredComponents();
  updateUseList();
  updateScannerToggleButton();
  updateRoomActions();
  updatePanels();
  updateMap();
  ensureTravelAnimation();
  updateBuildButton();
  updateMoveButtons();
  updateMapActionControls();
  if (dom.toggleRobotBtn) {
    dom.toggleRobotBtn.textContent = state.robotDisabled ? "Enable Robot" : "Disable Robot";
  }
  dom.tasksText.textContent = getObjectiveText();
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
  if (dom.liveBtn) {
    dom.liveBtn.disabled = controlBlocked;
    dom.liveBtn.classList.toggle("objective-highlight", state.introStep === "highlight-live");
  }
  if (dom.debugBtn) {
    dom.debugBtn.disabled = controlBlocked;
  }
  updateDebugUI();
}

function getFxLevel() {
  if (state.currentNight < 4) {
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
  const frayed = state.currentNight >= 4 && state.sanity < 0.4;
  const critical = state.currentNight >= 4 && state.sanity < 0.2;
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

function updateInventoryList() {
  dom.inventoryList.innerHTML = "";
  if (state.inventory.size === 0) {
    const empty = document.createElement("li");
    empty.textContent = "Empty - you feel exposed.";
    dom.inventoryList.appendChild(empty);
    return;
  }
  const materials = [];
  const powerAccess = [];
  const other = [];
  state.inventory.forEach((item) => {
    if (isMaterial(item)) {
      materials.push(item);
    } else if (isPowerAccess(item)) {
      powerAccess.push(item);
    } else {
      other.push(item);
    }
  });
  const addGroup = (label, items) => {
    if (items.length === 0) return;
    const header = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = label;
    header.appendChild(strong);
    dom.inventoryList.appendChild(header);
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      dom.inventoryList.appendChild(li);
    });
  };
  addGroup("Materials", materials);
  addGroup("Power & Access", powerAccess);
  addGroup("Tools & Devices", other);
}

function updateSchematicsInventory() {
  dom.schematicInventory.innerHTML = "";
  const allowPulseScannerCrafting = state.currentNight === 4;
  if (!state.unlocks.allowCrafting && !allowPulseScannerCrafting) {
    const locked = document.createElement("li");
    const unlockNight = getNextUnlockNightFromNow("allowCrafting");
    locked.textContent = unlockNight
      ? `Crafting locked (Night ${unlockNight}).`
      : "Crafting locked.";
    dom.schematicInventory.appendChild(locked);
    return;
  }
  const schematics = state.unlocks.allowCrafting
    ? [...state.foundSchematics]
    : [...state.foundSchematics].filter((item) => item === "Pulse Scanner");
  if (schematics.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No schematics found.";
    dom.schematicInventory.appendChild(empty);
    return;
  }
  schematics.forEach((item) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = item;
    button.addEventListener("click", () => selectSchematic(item));
    if (state.selectedSchematic === item) {
      button.classList.add("primary");
    }
    if (state.requiredEscapeSchematic === item) {
      button.classList.add("objective-highlight");
    }
    li.appendChild(button);
    dom.schematicInventory.appendChild(li);
  });
}

function updateSchematicList() {
  dom.schematicList.innerHTML = "";
  const allowPulseScannerCrafting = state.currentNight === 4;
  if (!state.unlocks.allowCrafting && !allowPulseScannerCrafting) {
    const locked = document.createElement("li");
    const unlockNight = getNextUnlockNightFromNow("allowCrafting");
    locked.textContent = unlockNight
      ? `Crafting locked (Night ${unlockNight}).`
      : "Crafting locked.";
    dom.schematicList.appendChild(locked);
    return;
  }
  const selected = getSelectedSchematic();
  if (!selected) {
    const empty = document.createElement("li");
    empty.textContent = "Select a schematic to view required components.";
    dom.schematicList.appendChild(empty);
    return;
  }
  selected.parts.forEach((part) => {
    const count = countInventory(part);
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = part;
    li.appendChild(label);
    const info = document.createElement("button");
    info.type = "button";
    info.textContent = "Help";
    info.addEventListener("click", () => openComponent(part));
    li.appendChild(info);
    const tally = document.createElement("span");
    tally.textContent = `${count}x`;
    li.appendChild(tally);
    li.dataset.part = part;
    dom.schematicList.appendChild(li);
  });
}

function updateBuildButton() {
  const selected = getSelectedSchematic();
  const allowPulseScannerBuild = state.currentNight === 4 && selected?.name === "Pulse Scanner";
  if (!state.unlocks.allowCrafting && !allowPulseScannerBuild) {
    const unlockNight = getNextUnlockNightFromNow("allowCrafting");
    dom.buildBtn.disabled = true;
    dom.buildBtn.textContent = unlockNight
      ? `Crafting locked (Night ${unlockNight})`
      : "Crafting locked";
    return;
  }
  if (!selected) {
    dom.buildBtn.disabled = true;
    dom.buildBtn.textContent = "Select a Schematic";
    return;
  }
  if (selected.name === "Door Jam" && !state.unlocks.allowDoorJams) {
    const unlockNight = getNextUnlockNightFromNow("allowDoorJams");
    dom.buildBtn.disabled = true;
    dom.buildBtn.textContent = unlockNight
      ? `Door Jams locked (Night ${unlockNight})`
      : "Door Jams locked";
    return;
  }
  const matchesEscape = !state.requiredEscapeSchematic || selected.name === state.requiredEscapeSchematic;
  const hasAllParts = selected.parts.every((part) => state.inventory.has(part));
  dom.buildBtn.disabled = !(matchesEscape && hasAllParts && state.isAlive && !state.hasEscaped);
  dom.buildBtn.textContent = hasAllParts
    ? `Build ${selected.name}`
    : "Need More Components";
  dom.buildBtn.classList.toggle("objective-highlight", matchesEscape);
}

function updateMoveButtons() {
  const hasSelection = state.selectedRoom !== null;
  const canMove = hasSelection &&
    getShortestPath(state.playerRoom, state.selectedRoom).length > 1;
  const isMoving = isPlayerTraveling();
  const blocked = !canMove ||
    !state.isAlive ||
    state.hasEscaped ||
    isMoving ||
    state.objectiveBlocked ||
    state.actionLock ||
    state.mapTargetMode;
  dom.movementControls.classList.toggle("hidden", isMoving);
  dom.cancelBtn.classList.toggle("hidden", !isMoving);
  const actionBand = state.currentNight >= 4 && state.sanity < 0.4;
  setButtonLabel(dom.goBtn, actionBand ? "Try" : "Sneak", "Quiet");
  setButtonLabel(dom.runBtn, actionBand ? "Panic" : "Run", "Trace");
  dom.goBtn.disabled = blocked;
  dom.runBtn.disabled = blocked;
  dom.cancelBtn.disabled = !isMoving;
  dom.runBtn.classList.toggle("objective-highlight", state.introStep === "highlight-run");
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

function updateMapActionControls() {
  if (!dom.mapConfirmBtn) return;
  const controlBlocked = state.objectiveBlocked || isActionLocked();
  const active = Boolean(state.mapTargetMode);
  const hasSelection = state.mapTargetSelection !== null;
  dom.mapConfirmBtn.classList.toggle("hidden", !active || !hasSelection);
  dom.mapConfirmBtn.disabled = !hasSelection || controlBlocked;
  if (state.mapTargetMode === "noise") {
    dom.mapConfirmBtn.textContent = "Deploy Noise Lure here";
  } else if (state.mapTargetMode === "jam") {
    dom.mapConfirmBtn.textContent = "Deploy Door Jam here";
  } else if (state.mapTargetMode === "unjam") {
    dom.mapConfirmBtn.textContent = "Use Blowtorch here";
  } else {
    dom.mapConfirmBtn.textContent = "Confirm";
  }
}

function updatePanels() {
  dom.movementControls.classList.toggle("hidden", isPlayerTraveling());
}

function stripCaitPrefix(message) {
  if (typeof message !== "string") return message;
  return message.replace(/^Cait:\s*/i, "");
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

function setRobotMode(mode) {
  if (state.robotMode === mode) return;
  state.robotMode = mode;
  logDebug("robot-mode", { mode, confidence: state.robotTargetConfidence });
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
  state.robotFocus = sourceRoomId;
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
  queueObjectiveModal("Cait: Geist… stop. You’re ringing the halls.");
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

function hasPart(name) {
  return state.inventory.has(name);
}

function hasCrafted(name) {
  return state.craftedItems.has(name);
}

function getPassiveEffects() {
  const hasScrambler = hasCrafted("Signal Scrambler");
  return {
    noisePenaltyGain: hasPart("Resistors") ? 0.85 : 1,
    signalSpike: hasPart("Capacitors") ? 0.85 : 1,
    fatigueReliefChance: hasPart("Microcontroller") ? 0.5 : 0,
    jamBonus: hasPart("Servo Motor") ? 1 : 0,
    bleedBoost: hasPart("Copper Wire") || hasScrambler ? 1.1 : 1,
    persistentBonus: hasPart("24V Power Pack") ? 1 : 0,
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
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
  if (state.currentNight < 4) return;
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
  if (state.currentNight < 4) return "";
  const band = sanityBand();
  if (band === "strained") {
    return "Too close.";
  }
  if (band === "frayed") {
    return "You waited.";
  }
  if (band === "critical") {
    return "You should have moved.";
  }
  return "";
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
  return state.toolCollected.has(name) || state.inventory.has(name);
}

function isRequiredPickupComplete() {
  if (!state.requiredPickup) return true;
  return hasCollectedTool(state.requiredPickup.itemName);
}

function canUseScanner() {
  return state.unlocks.allowScannerToggle && hasCollectedTool("Pulse Scanner");
}

function getUnlocksForNight(night) {
  return NIGHT_UNLOCKS[night] ?? {
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
}

function isTwistNight(night) {
  return [5, 6, 10].includes(night);
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
    robotActive: "Robot systems restored. Expect patrols after the console.",
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

function setupMissionForNight() {
  state.missionType = pickMissionForNight(state.currentNight);
  state.escapeMode = state.currentNight <= 3 ? "manual" : "fabricate";
  resetGoofingState();
  if (!state.unlocks.allowCrafting) {
    state.escapeMode = "manual";
  }
  state.stabilizeTargets = [];
  state.stabilizedTargets = new Set();
  state.dataFragmentsFound = new Set();
  state.dataFragmentsNeeded = 0;
  state.manualOverrideNeeded = 0;
  state.manualOverrideTargets = new Set();
  state.manualOverridesDone = new Set();

  if (state.missionType === MISSION_TYPES.STABILIZE) {
    const choices = [...STABILIZE_SYSTEMS].sort(() => Math.random() - 0.5);
    const count = Math.floor(Math.random() * 2) + 2;
    state.stabilizeTargets = choices.slice(0, count).map((entry) => ({
      ...entry,
      roomId: rooms.find((room) => room.name === entry.room)?.id ?? 0,
    }));
  }

  if (state.missionType === MISSION_TYPES.DATA) {
    state.dataFragmentsNeeded = Math.floor(Math.random() * 2) + 2;
  }

  if (state.missionType === MISSION_TYPES.ESCAPE && state.escapeMode === "fabricate") {
    const options = craftableItems
      .map((item) => item.name)
      .filter((name) => name !== "Door Jam" && name !== "Pulse Scanner");
    state.requiredEscapeSchematic = options[Math.floor(Math.random() * options.length)];
    state.selectedSchematic = null;
  } else {
    state.requiredEscapeSchematic = null;
    state.selectedSchematic = null;
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
  if (state.inventory.has("Pulse Scanner")) {
    state.toolCollected.add("Pulse Scanner");
  }
  if (state.currentNight === 4) {
    state.unlocks.allowScannerToggle = false;
    state.scannerOn = false;
    state.scannerHighlight = false;
  }

  if (state.currentNight === 5) {
    const roomId = pickRandomRoomId(new Set([PICKUP_START_ROOM]));
    state.requiredPickup = {
      itemName: "Noise Lure",
      roomId,
      caitIntroLine: `Cait: I found a Noise Lure in ${rooms[roomId].name}. It’ll be loud. Use it smart.`,
      caitWarnLine: null,
      blocksEscapeConsole: true,
      warned: false,
    };
    state.specialPickups.set(roomId, "Noise Lure");
    state.nightIntroLine = state.requiredPickup.caitIntroLine;
    state.noiseLures = 0;
  }

  if (state.currentNight === 6) {
    const roomId = pickRandomRoomId(new Set([PICKUP_START_ROOM]));
    state.requiredPickup = {
      itemName: "Door Jam",
      roomId,
      caitIntroLine: `Cait: Door Jam kit in ${rooms[roomId].name}. If we get pinned, it buys seconds.`,
      caitWarnLine: null,
      blocksEscapeConsole: true,
      warned: false,
    };
    state.specialPickups.set(roomId, "Door Jam");
    state.nightIntroLine = state.requiredPickup.caitIntroLine;
    state.doorJams = 0;
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
    state.nightIntroLine = "Cait: Robtergeist… I’m so sorry… we weren’t fast enough.";
    state.objectiveHoldUntil = 3;
    state.storyQueue.push({
      triggerTurn: 2,
      type: "night7-lockdown",
      roomId,
    });
  }

  if (!state.nightIntroLine && state.currentNight === 1) {
    state.nightIntroLine = `Cait: Okay… you got what you went in for, right?
Good. Then don’t linger.

The husks breaking in were bad enough, but—
the robots are doing something out here.

I can’t tell what yet.

Get to the escape ⎋ workshop. Let’s get you out.`;
  }

  if (!state.nightIntroLine && state.unlocks.robotActive && isTwistNight(state.currentNight)) {
    state.nightIntroLine = "Cait: The escape room isn’t empty.";
  }

  if (!state.nightIntroLine && state.currentNight === 2) {
    state.nightIntroLine = `Cait: Geist…

They’re building.
Fast. Faster than I’ve ever seen.

I wanted to tell you sooner, but the husks were all around me.

I can see more frames going up.
You need to get out.`;
  }

  if (!state.nightIntroLine && state.currentNight === 3) {
    state.nightIntroLine = `Cait: Geist… what did you do to piss them off?
They’re everywhere.
Building like it’s the only thing they’ve ever loved.`;
    state.pendingObjectiveModal = `Cait: I can’t talk long. It’s still too dangerous out here.
But listen— they’ve started installing alarms inside the rooms.
If you find one, kill it. Shut it down.
…Shit. I have to move.`;
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

function getAmbientTrackForWeather(weatherType) {
  if (weatherType === "Rain") {
    return { name: "rain", volume: 0.6 };
  }
  if (weatherType === "Clear") {
    return { name: "sunny", volume: 0.5 };
  }
  return null;
}

function updateWeatherAmbience({ forceRestart = false } = {}) {
  const shouldPlay = hasStartedGame && titleAudioUnlocked && canStartAmbience;
  const targetTrack = shouldPlay ? getAmbientTrackForWeather(state.weather?.type) : null;
  const targetName = targetTrack?.name ?? null;
  const targetVolume = targetTrack?.volume ?? 0;
  const fadeIn = forceRestart ? AMBIENT_FADE_IN_MS : AMBIENT_FADE_IN_MS;
  const fadeOut = AMBIENT_FADE_OUT_MS;

  fadeTrackTo("rain", targetName === "rain" ? targetVolume : 0, targetName === "rain" ? fadeIn : fadeOut);
  fadeTrackTo("sunny", targetName === "sunny" ? targetVolume : 0, targetName === "sunny" ? fadeIn : fadeOut);
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
  if (!titleAudioUnlocked || !hasStartedGame) return;
  const audio = dom.typingAudio;
  const token = ++typingTransitionToken;
  if (typingAudioTimeoutId) {
    clearTimeout(typingAudioTimeoutId);
    typingAudioTimeoutId = null;
  }
  if (audio.paused) {
    audio.loop = true;
    audio.muted = false;
    audio.volume = 0;
    audio.currentTime = 0;
    attemptPlayAudio(audio, "typing");
  }
  const startVolume = Number.isFinite(audio.volume) ? audio.volume : 0;
  fadeTypingAudioVolume(audio, startVolume, TYPING_AUDIO_VOLUME, TYPING_AUDIO_FADE_IN_MS, token);
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

function updateMovementAudioState() {
  if (titleAudioUnlocked && hasStartedGame && isPlayerTraveling()) {
    if (state.playerTravelMode === "run") {
      desiredMovementMode = "run";
    } else if (state.playerTravelMode === "sneak") {
      desiredMovementMode = "sneak";
    } else {
      desiredMovementMode = "none";
    }
  } else {
    desiredMovementMode = "none";
  }

  if (desiredMovementMode !== lastMovementMode) {
    if (desiredMovementMode === "run") {
      fadeTrackTo("sneak", 0, SNEAK_AUDIO_FADE_OUT_MS);
      fadeTrackTo("run", RUN_AUDIO_VOLUME, RUN_AUDIO_FADE_IN_MS);
    } else if (desiredMovementMode === "sneak") {
      fadeTrackTo("run", 0, RUN_AUDIO_FADE_OUT_MS);
      fadeTrackTo("sneak", SNEAK_AUDIO_VOLUME, SNEAK_AUDIO_FADE_IN_MS);
    } else {
      fadeTrackTo("run", 0, RUN_AUDIO_FADE_OUT_MS);
      fadeTrackTo("sneak", 0, SNEAK_AUDIO_FADE_OUT_MS);
    }
    lastMovementMode = desiredMovementMode;
  }
}

function setCurrentNight(night) {
  const next = clamp(Math.floor(night), 1, 10);
  state.currentNight = next;
  state.nightProfile = getNightProfile();
  state.unlocks = getUnlocks();
  if (!state.unlocks.robotActive) {
    state.robotDisabled = true;
  }
  if (DEBUG_UI) {
    // Reset mission state for coherent debug night swaps.
    setupMissionForNight();
    state.escapeReady = false;
    state.requiredEscapeSchematic = null;
    state.selectedSchematic = null;
    state.escapeConsoleInspected = false;
    state.tasksAcknowledgedNightOne = false;
  }
  announceWeather();
  updateNextNightButton();
  updateUI();
  pushStatus(`Night ${next} protocols loaded.`, 3);
}

function configureRobotStart() {
  if (!state.unlocks.robotActive) {
    state.robotDisabled = true;
    return;
  }
  if (isTwistNight(state.currentNight)) {
    const exitRoom = rooms.find((room) => room.isExit)?.id ?? 13;
    state.robotRoom = exitRoom;
    state.robotDisabled = false;
    state.robotDormant = Math.max(state.robotDormant, 3);
    pushStatus("The escape room isn’t empty.", 4);
    schedulePowerSurge();
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

function tickStoryQueue() {
  if (!state.storyQueue.length) return;
  const ready = state.storyQueue.filter((entry) => state.turn >= entry.triggerTurn);
  if (ready.length === 0) return;
  state.storyQueue = state.storyQueue.filter((entry) => state.turn < entry.triggerTurn);
  ready.forEach((entry) => {
    if (entry.type === "night7-lockdown") {
      showObjectiveModal("Cait: They… they managed to lock you in.");
      state.storyQueue.push({
        triggerTurn: state.turn + 1,
        type: "night7-blowtorch",
        roomId: entry.roomId,
      });
    }
    if (entry.type === "night7-blowtorch") {
      const roomId = entry.roomId;
      state.specialPickups.set(roomId, "Blowtorch");
      showObjectiveModal(
        `Cait: Wait— I found a Blowtorch in ${rooms[roomId].name}. It’ll unjam those doors. It’s gonna be loud.`
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

function triggerPowerSurge(roomId) {
  if (roomId === null || roomId === undefined) return;
  const firstSurge = !state.ohShitTriggered;
  state.ohShitTriggered = true;
  state.robotFocus = roomId;
  state.surgeTargetRoom = null;
  registerSignal(roomId, 0.85, { type: "surge", forceLastKnown: true, bleed: true });
  const effects = getPassiveEffects();
  state.persistentSignals.set(roomId, 3 + effects.persistentBonus);
  showObjectiveModal("Cait: Power surge. That room just blew open.");
  if (isAlarmCapable(roomId)) {
    state.triggeredAlarms.add(roomId);
  }
  state.runMoments.push("A sudden power surge forced you into the open.");
  if (firstSurge) {
    adjustSanity(-0.14, "surge");
  }
  if (state.surgeCharges > 0) {
    state.surgeCharges -= 1;
    schedulePowerSurge();
  }
}

function tickPowerSurge() {
  if (state.surgeCountdown === null) return;
  if (state.robotDisabled) return;
  state.surgeCountdown -= 1;
  if (!state.surgeForeshadowed && state.surgeCountdown <= 2) {
    state.surgeForeshadowed = true;
    pushStatus("Power flickers somewhere in the facility.", 3);
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
    const escapeSuccessLine = getEscapeSuccessLine(night);
    if (escapeSuccessLine) {
      lines.push(escapeSuccessLine);
    } else {
      lines.push(`You escaped the factory on Night ${night}.`);
    }
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
    return;
  }
  dom.actionLockLabel.textContent = state.actionLock.label;
  dom.actionLock.style.setProperty("--action-duration", `${state.actionLock.durationMs}ms`);
  dom.actionLock.classList.remove("hidden");
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

function openPanel(panel) {
  panel.classList.add("active");
  panel.setAttribute("aria-hidden", "false");
}

function closePanel(panel) {
  panel.classList.remove("active");
  panel.setAttribute("aria-hidden", "true");
}

function closePanels() {
  [dom.menuPanel, dom.mapPanel, dom.usePanel, dom.debugPanel, dom.componentPanel, dom.tasksPanel]
    .forEach((panel) => {
      if (!panel) return;
      if (panel === dom.debugPanel && isDebugPanelPersistent()) {
        openPanel(panel);
        return;
      }
      closePanel(panel);
    });
}

function togglePanel(panel) {
  if (state.objectiveBlocked || isActionLocked()) return;
  if (panel === dom.debugPanel && isDebugPanelPersistent()) {
    openPanel(panel);
    return;
  }
  const shouldOpen = !panel.classList.contains("active");
  closePanels();
  if (shouldOpen) {
    openPanel(panel);
  }
}

function openMenu() {
  togglePanel(dom.menuPanel);
}

function closeMenu() {
  closePanel(dom.menuPanel);
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

function openComponent(part) {
  closePanels();
  dom.componentTitle.textContent = part;
  dom.componentDetails.textContent = componentDescriptions[part] || "Critical component.";
  dom.componentCount.textContent = `You have ${countInventory(part)}.`;
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

function showObjectiveModal(text) {
  if (isActionLocked()) {
    state.pendingObjectiveModal = text;
    return;
  }
  dom.objectiveModalText.textContent = formatCaitModalText(text);
  dom.objectiveModal.classList.add("active");
  dom.objectiveModal.setAttribute("aria-hidden", "false");
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
  dom.objectiveModal.classList.remove("active");
  dom.objectiveModal.setAttribute("aria-hidden", "true");
  state.objectiveBlocked = false;
  if (state.startRevealPending && state.introStep === "intro-modal") {
    revealIntroMap();
  }
  flushPendingModals();
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
  dom.robotAlertText.textContent = state.robotAlertText || "Warning: Robot online.";
  dom.robotAlertModal.classList.add("active");
  dom.robotAlertModal.setAttribute("aria-hidden", "false");
  state.objectiveBlocked = true;
}

function acknowledgeRobotAlert() {
  dom.robotAlertModal.classList.remove("active");
  dom.robotAlertModal.setAttribute("aria-hidden", "true");
  state.objectiveBlocked = false;
  flushPendingModals();
}

function flushPendingModals() {
  if (state.objectiveBlocked || isActionLocked()) return;
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
  return state.triggeredAlarms.has(roomId) && isAlarmCapable(roomId);
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
  return state.robotAlarmStreak >= 3 || state.robotAlarmLoopTurns >= 2;
}

function forceAlarmBreak() {
  const neighbor = pickNonAlarmedNeighbor(state.robotRoom);
  const target = neighbor ?? pickHighestPressureNonAlarmedRoom();
  if (target === null || target === undefined) return false;
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
  state.triggeredAlarms.delete(roomId);
  state.alarmDisableProgress.delete(roomId);
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

function updateRoomActions() {
  dom.roomActions.innerHTML = "";
  const room = rooms[state.playerRoom];
  const actions = [];
  const blocked = state.objectiveBlocked || isActionLocked();
  const canEscape = state.escapeReady && room.isExit && state.isAlive;

  if (canEscape) {
    actions.push({
      label: "Escape",
      onClick: () => handleEscape(),
      disabled: blocked,
      highlight: true,
      className: "escape-button",
    });
  }

  if (state.hidden) {
    actions.push({
      label: "Unhide",
      onClick: () => startHideAction(null),
      disabled: blocked,
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

  if (state.escapeConsoleInspected && room.item && !state.inventory.has(room.item)) {
    actions.push({
      label: `Collect ${room.item}`,
      onClick: () => startCollectItem(room.id),
      disabled: state.hidden || blocked,
      risk: "Quiet",
    });
  }

  if (state.escapeConsoleInspected && room.schematic && !state.foundSchematics.has(room.schematic)) {
    const isDataMission = state.missionType === MISSION_TYPES.DATA;
    const allowPulseScannerScan = state.currentNight === 4 && room.schematic === "Pulse Scanner";
    const canScanSchematic = state.unlocks.allowCrafting || allowPulseScannerScan;
    const scanLabel = isDataMission
      ? "Recover Data Fragment"
      : canScanSchematic
        ? `Scan Schematic: ${room.schematic}`
        : `Schematic Scan (Night ${getNextUnlockNightFromNow("allowCrafting") ?? "?"})`;
    actions.push({
      label: scanLabel,
      onClick: () => startSchematicScan(room.id),
      disabled: state.hidden || blocked || (!isDataMission && !canScanSchematic),
      risk: "Quiet",
      highlight: isDataMission,
    });
  }

  if (room.isExit && !state.escapeConsoleInspected) {
    const requiredBlocked = state.requiredPickup?.blocksEscapeConsole && !isRequiredPickupComplete();
    if (requiredBlocked) {
      const pickupName = state.requiredPickup?.itemName ?? "tool";
      actions.push({
        label: `Get the ${pickupName} first. The console can wait.`,
        disabled: true,
        info: true,
      });
    } else {
      actions.push({
        label: "Inspect Escape Console",
        onClick: () => startEscapeConsoleInspect(),
        disabled: state.hidden || blocked,
        highlight: true,
        risk: "Exposed",
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
      onClick: () => startAlignManualOverride(room.id),
      disabled: state.hidden || blocked,
      highlight: true,
      risk: "Quiet",
    });
  }

  if (isAlarmCapable(room.id)) {
    actions.push({
      label: "Disable Alarm",
      onClick: () => disableAlarm(room.id),
      disabled: state.hidden || blocked,
      highlight: state.alarmedRoomsRequired > 0,
      risk: "Trace",
    });
    if (isAlarmTriggered(room.id)) {
      actions.push({
        label: "An alarm drones here. Sneaking won’t help.",
        disabled: true,
        info: true,
      });
    }
  }

  if (state.sunlitRooms.has(room.id)) {
    actions.push({
      label: "Sunlight spills across the floor. It doesn’t care how quiet you are.",
      disabled: true,
      info: true,
    });
  }

  if (state.currentNight >= 4 && !state.hidden && !isPlayerTraveling()) {
    if (state.caitCooldown <= 0) {
      actions.push({
        label: "Talk to Cait",
        onClick: () => talkToCait(),
        disabled: blocked,
        risk: "Trace",
      });
    } else {
      actions.push({
        label: `Cait channel cooling down (${state.caitCooldown})`,
        disabled: true,
        info: true,
      });
    }
  }

  room.hideSpots.forEach((spot) => {
    const burned = state.burnedHidingSpots.has(`${room.id}:${spot}`);
    actions.push({
      label: `Hide: ${spot}`,
      onClick: () => startHideAction(spot),
      disabled: blocked || (state.hidden && state.hiddenSpot === spot),
      risk: burned ? "Risky" : "Quiet",
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
      button.classList.add(action.className);
    }
    if (action.risk) {
      const risk = document.createElement("span");
      risk.textContent = action.risk;
      risk.classList.add("risk-hint");
      button.appendChild(risk);
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
}

function getStabilizeTarget(roomId) {
  return state.stabilizeTargets.find((target) => target.roomId === roomId) ?? null;
}

function canStabilizeTarget(target) {
  return hasPart(target.part) || hasCrafted(target.tool);
}

function stabilizeSystem(target) {
  if (!target || state.stabilizedTargets.has(target.roomId)) return;
  if (!canStabilizeTarget(target)) return;
  if (hasPart(target.part)) {
    state.inventory.delete(target.part);
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

function hasCompletedAlarmedRooms() {
  if (state.alarmedRoomsRequired <= 0) return true;
  return state.disabledAlarmedRooms.size >= state.alarmedRoomsRequired;
}

function updateEscapeReadiness() {
  const wasReady = state.escapeReady;
  if (!state.escapeConsoleInspected) {
    state.escapeReady = false;
    return;
  }
  let ready = false;
  if (state.missionType === MISSION_TYPES.ESCAPE) {
    if (state.escapeMode === "manual") {
      ready = state.manualOverridesDone.size >= state.manualOverrideNeeded;
    } else if (state.requiredEscapeSchematic) {
      ready = state.craftedItems.has(state.requiredEscapeSchematic);
    }
  } else if (state.missionType === MISSION_TYPES.STABILIZE) {
    ready = state.stabilizedTargets.size >= state.stabilizeTargets.length;
  } else if (state.missionType === MISSION_TYPES.DATA) {
    ready = state.dataFragmentsFound.size >= state.dataFragmentsNeeded;
  }
  if (ready && !hasCompletedAlarmedRooms()) {
    ready = false;
  }
  state.escapeReady = ready;
  if (!wasReady && ready) {
    const line = getObjectiveCompleteLine();
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
  const lines = {
    steady: [
      "Cait: Keep it tight. The signal's thinning.",
      "Cait: You're in control. Move on my mark.",
      "Cait: Stay light. The metal listens.",
    ],
    strained: [
      "Cait: Breathe. Count the beats, not the echoes.",
      "Cait: I'm here. Focus on the next door.",
      "Cait: You're not alone. Keep moving.",
      "Cait: Slow down. I’ve got you.",
      "Cait: Stay with me. One step, one breath.",
    ],
    frayed: [
      "Cait: Hey. Look at me. Name three sounds.",
      "Cait: Stay with me. One breath at a time.",
      "Cait: I need you here. Anchor on the hum.",
      "Cait: Ground on the noise. Keep your name.",
      "Cait: You’re fading. Stay with my voice.",
    ],
    critical: [
      "Cait: Ground yourself. Five sounds. Then move.",
      "Cait: You're slipping. Grab the rail, listen.",
      "Cait: Stay present. I won't let you drown.",
      "Cait: You’re still here. Hold on to me.",
      "Cait: Don’t disappear. I’m right here.",
    ],
  };
  const linePool = lines[band] || lines.steady;
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

function updateDebugUI() {
  const debugLabel = dom.nightSelect?.closest(".night-debug");
  if (debugLabel) {
    debugLabel.classList.toggle("hidden", !DEBUG_UI);
  }
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
  updateSchematicList();
}

function selectSchematic(name) {
  state.selectedSchematic = name;
  updateUI();
}

function getSelectedSchematic() {
  if (!state.selectedSchematic) return null;
  return craftableItems.find((item) => item.name === state.selectedSchematic) ?? null;
}

function countInventory(item) {
  let count = 0;
  state.inventory.forEach((entry) => {
    if (entry === item) count += 1;
  });
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
  if (state.missionType === MISSION_TYPES.ESCAPE) {
    if (state.escapeMode === "fabricate") {
      if (!state.requiredEscapeSchematic) {
        const options = craftableItems
          .map((item) => item.name)
          .filter((name) => name !== "Door Jam" && name !== "Pulse Scanner");
        state.requiredEscapeSchematic = options[Math.floor(Math.random() * options.length)];
      }
      state.selectedSchematic = state.requiredEscapeSchematic;
    } else {
      state.requiredEscapeSchematic = null;
      state.selectedSchematic = null;
      state.manualOverrideNeeded = getManualOverrideCountForNight(state.currentNight);
      assignManualOverrideTargets();
    }
  }
  state.escapeConsoleInspected = true;
  const escapeInspectLine = getEscapeConsoleInspectLine();
  if (escapeInspectLine) {
    showObjectiveModal(escapeInspectLine);
  } else if (state.missionType === MISSION_TYPES.ESCAPE) {
    if (state.escapeMode === "manual") {
      showObjectiveModal("Cait: Override nodes are live. Line them up.");
    } else {
      showObjectiveModal(`Cait: Build ${state.requiredEscapeSchematic}.`);
    }
  } else if (state.missionType === MISSION_TYPES.STABILIZE) {
    showObjectiveModal("Cait: Stabilize the core systems.");
  } else {
    showObjectiveModal("Cait: Recover the data fragments.");
  }
  if (state.currentNight === 3) {
    queueObjectiveModal(`Cait: I’ve got a minute— that’s it.
I’m going to teach you a trick.
If you rewire a room slow and careful, you can flood their feeds with static.
It won’t hide you.
But it can make you harder to pin down— for a moment.`);
  }
  if (state.unlocks.robotActive) {
    state.robotDisabled = false;
    if (state.currentNight >= 2) {
      showRobotActivationDialog();
    }
  } else {
    state.robotDisabled = true;
  }
  schedulePowerSurge();
  updateEscapeReadiness();
  updateUI();
}

function getPartSpawnBudget(night) {
  if (night <= 1) return 2;
  if (night === 2) return Math.floor(Math.random() * 2) + 2;
  if (night === 3) return 3;
  if (night === 4) return Math.floor(Math.random() * 2) + 3;
  return Math.floor(Math.random() * 2) + 4;
}

function getSchematicSpawnBudget(night) {
  if (night <= 3) return 0;
  if (night === 4) return 1;
  return Math.floor(Math.random() * 2);
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
  if (count <= 0) return [];
  if (state.currentNight === 4) return ["Pulse Scanner"];
  const blocked = new Set(["Pulse Scanner"]);
  if (!state.unlocks.allowDoorJams) blocked.add("Door Jam");
  const options = craftableItems
    .map((item) => item.name)
    .filter((name) => !blocked.has(name));
  if (options.length === 0) return [];
  const shuffled = [...options].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function pickDataFragmentSchematics(count) {
  if (count <= 0) return [];
  const blocked = new Set(["Pulse Scanner"]);
  if (!state.unlocks.allowDoorJams) blocked.add("Door Jam");
  const options = craftableItems
    .map((item) => item.name)
    .filter((name) => !blocked.has(name));
  if (options.length === 0) return [];
  const shuffled = [...options].sort(() => Math.random() - 0.5);
  const picks = [];
  for (let i = 0; i < count; i += 1) {
    picks.push(shuffled[i % shuffled.length]);
  }
  return picks;
}

function getGuaranteedItems() {
  const guaranteed = [];
  if (state.missionType === MISSION_TYPES.STABILIZE) {
    guaranteed.push(...state.stabilizeTargets.map((target) => target.part));
  }
  if (state.missionType === MISSION_TYPES.ESCAPE && state.escapeMode === "fabricate") {
    const schematic = craftableItems.find((item) => item.name === state.requiredEscapeSchematic);
    if (schematic) {
      guaranteed.push(...schematic.parts);
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
  if (state.currentNight === 4) {
    guaranteedSchematics.push("Pulse Scanner");
  }
  if (state.missionType === MISSION_TYPES.DATA) {
    guaranteedSchematics.push(...pickDataFragmentSchematics(state.dataFragmentsNeeded));
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

function alarmObjectiveText() {
  if (state.alarmedRoomsRequired <= 0) return "";
  const done = state.disabledAlarmedRooms.size;
  return `Disable ${done}/${state.alarmedRoomsRequired} alarmed rooms`;
}

function getObjectiveText() {
  let objective = "";
  if (state.objectiveHoldUntil > 0 && state.turn < state.objectiveHoldUntil) {
    objective = "Keep moving. Listen for Cait.";
  } else if (state.requiredPickup && !isRequiredPickupComplete()) {
    const roomName = rooms[state.requiredPickup.roomId]?.name ?? "a nearby room";
    objective = `Collect the ${state.requiredPickup.itemName} in ${roomName}.`;
  } else if (!state.escapeConsoleInspected) {
    objective = "Inspect the Escape Workshop console to receive your mission.";
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
        objective = `Find and build the ${state.requiredEscapeSchematic} schematic${alarm}, then escape.`;
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
        objective = `Recover ${done}/${total} data fragments${alarm} to assemble the Lock Override.`;
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

function getInitialObjectiveModalText() {
  const text = state.nightIntroLine ?? getObjectiveText();
  return stripCaitPrefix(text);
}

const NIGHT_DIALOGUE = {
  1: {
    escapeConsoleInspect: `Cait: What the hell…?

That door shouldn’t be—

Damn it. I can’t talk long.
The robots are pushing the husks toward me.

Do this fast. Get the door unstuck.`,
    objectiveComplete: `Cait: Okay— listen.

I need to stay quiet now.
They’re everywhere out here.

Go.
Get back to the escape ⎋ workshop and get out.`,
    escapeSuccess: `Cait: I have to move.

And… Rob—

You’re not going to like what you see out here.`,
  },
  2: {
    escapeConsoleInspect: `Cait: Again?

No— this isn’t damage.

I think this is intentional.

I think they’re trying to keep you inside.

The robots are trying to contain you.

You need to force it open. Now.`,
    robotActivation: "Cait: Geist— One more thing. Stay quiet. Something is in there with you.",
    objectiveComplete: `Cait: Geist…

They normally don’t care about us.
We’re ants to them.

Why now?`,
  },
  3: {
    robotActivation: "Cait: One more thing. Watch out. I think its following you.",
  },
};

function getNightDialogue(night) {
  return NIGHT_DIALOGUE[night] ?? null;
}

function getEscapeConsoleInspectLine() {
  return getNightDialogue(state.currentNight)?.escapeConsoleInspect ?? null;
}

function getObjectiveCompleteLine() {
  return getNightDialogue(state.currentNight)?.objectiveComplete ?? null;
}

function getEscapeSuccessLine(night) {
  return getNightDialogue(night)?.escapeSuccess ?? null;
}

function getRobotActivationAlertText() {
  return getNightDialogue(state.currentNight)?.robotActivation ?? "Warning: Robot online.";
}

function showRobotActivationDialog() {
  const text = getRobotActivationAlertText();
  if (state.currentNight === 2) {
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
}

function clearSelectedRoom() {
  state.selectedRoom = null;
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

function handleMapSelection(roomId) {
  if (state.introStep === "highlight-escape" && rooms[roomId].isExit) {
    state.introStep = "highlight-run";
  }
  if (state.mapTargetMode) {
    const targets = getMapTargetCandidates();
    if (!targets || !targets.has(roomId)) return;
    state.mapTargetSelection = roomId;
    updateUI();
    return;
  }
  setRoutePreview(roomId);
  setSelectedRoom(roomId);
}

function confirmMapTarget() {
  if (!state.mapTargetMode || state.mapTargetSelection === null) return;
  if (state.objectiveBlocked || isActionLocked()) return;
  const target = state.mapTargetSelection;
  const mode = state.mapTargetMode;
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
  if (room.item && !state.inventory.has(room.item)) {
    state.inventory.add(room.item);
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
  state.toolCollected.add(itemName);
  state.inventory.add(itemName);
  state.specialPickups.delete(roomId);
  if (itemName === "Pulse Scanner") {
    state.unlocks.allowScannerToggle = true;
    state.scannerOn = false;
    state.scannerHighlight = true;
    showObjectiveModal("Cait: Scanner’s loud. Use it from the map when you need eyes.");
  }
  if (itemName === "Noise Lure") {
    state.noiseLures = Math.max(state.noiseLures, 3);
    showObjectiveModal("Cait: Lure’s armed. Remember: loud buys time, not safety.");
  }
  if (itemName === "Door Jam") {
    state.doorJams = Math.max(state.doorJams, 1);
    showObjectiveModal("Cait: Jam kit’s live. Use it when the footsteps close in.");
  }
  if (itemName === "Blowtorch") {
    showObjectiveModal("Cait: Blowtorch online. Pick the right door.");
  }
  updateUI();
}

function collectSchematic(roomId, { force = false } = {}) {
  if (isActionLocked() && !force) return;
  if (state.hidden) return;
  const room = rooms[roomId];
  const allowPulseScannerScan = state.currentNight === 4 && room?.schematic === "Pulse Scanner";
  if (!state.unlocks.allowCrafting &&
    state.missionType !== MISSION_TYPES.DATA &&
    !allowPulseScannerScan) {
    pushStatus("You note the diagram, but you can't assemble it yet.", 3);
    return;
  }
  if (room.schematic && !state.foundSchematics.has(room.schematic)) {
    state.foundSchematics.add(room.schematic);
    const profile = getNightProfile();
    const strength = 0.2 * profile.signalStrength.sneak;
    registerSignal(roomId, strength, { type: "scan", lastKnownChance: 0.12 });
    if (state.missionType === MISSION_TYPES.DATA && state.escapeConsoleInspected) {
      if (!state.dataFragmentsFound.has(roomId)) {
        state.dataFragmentsFound.add(roomId);
        if (state.dataFragmentsFound.size >= state.dataFragmentsNeeded) {
          pushStatus("Lock Override assembled from fragments.", 3);
        }
        updateEscapeReadiness();
      }
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

function startSchematicScan(roomId) {
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

function startEscapeConsoleInspect() {
  if (state.requiredPickup?.blocksEscapeConsole && !isRequiredPickupComplete()) {
    const pickupName = state.requiredPickup?.itemName ?? "tool";
    showObjectiveModal(`Cait: Not yet. Grab the ${pickupName}.`);
    return;
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

function startAlignManualOverride(roomId) {
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

function setHidden(spot, { force = false } = {}) {
  if (!state.isAlive || state.hasEscaped) return;
  if (isActionLocked() && !force) return;
  if (!spot) {
    state.hidden = false;
    state.hiddenSpot = null;
    state.sawPlayerHide = false;
    state.hiddenTurns = 0;
    updateUI();
    return;
  }
  state.hidden = true;
  state.hiddenSpot = spot;
  state.hiddenTurns = 0;
  state.sawPlayerHide = state.robotRoom === state.playerRoom && state.robotLookTurns > 0;
  const hideCount = state.hideHistory.get(state.playerRoom) || 0;
  const nextCount = hideCount + 1;
  state.hideHistory.set(state.playerRoom, nextCount);
  if (nextCount >= 3 && !state.learnedHidingSpots.has(state.playerRoom)) {
    state.learnedHidingSpots.add(state.playerRoom);
    pushStatus("The robot hesitates… then checks the console.", 4);
    const burnedSpot = `${state.playerRoom}:${spot}`;
    state.burnedHidingSpots.add(burnedSpot);
    state.runMoments.push("The robot adapted to your hiding habits.");
  }
  if (state.burnedHidingSpots.has(`${state.playerRoom}:${spot}`)) {
    registerSignal(state.playerRoom, 0.25, { type: "hide", lastKnownChance: 0.2 });
  }
  registerSignal(state.playerRoom, 0.2);
  updateUI();
}

function startHideAction(spot) {
  if (!state.isAlive || state.hasEscaped) return;
  if (isActionLocked()) return;
  if (!spot) {
    if (!state.hidden) return;
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
    if (action === "noise" && state.noiseLures <= 0) return;
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
  state.robotFocus = diversion;
  applyRobotPause("distract");
  if (type === "noise") {
    state.noiseLures = Math.max(0, state.noiseLures - 1);
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
  }
}

function deployNoiseLure(targetRoom) {
  if (state.noiseLures <= 0) return;
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
    state.robotInvestigateTurns -= 1;
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
      state.robotSearchSpot = pickSearchSpot();
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
    } else {
      state.robotLinger = Math.floor(Math.random() * 3) + 2;
    }
    state.robotLookTurns = Math.floor(Math.random() * 3) + 2;
    state.robotScanTarget = null;
    setRobotMode(commitAllowed ? "hunt" : "investigate");
  } else {
    state.robotPlannedTarget = null;
    state.robotTargetConfidence = 0;
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
    state.robotFocus = null;
  }

  markRoomChecked(state.robotRoom);
}

function checkThreat() {
  if (state.robotDisabled) return;
  if (state.robotRoom !== state.playerRoom) return;
  if (state.hidden && state.robotLookTurns > 0 && state.sanityScanCooldown <= 0) {
    adjustSanity(-0.08, "scan");
    state.sanityScanCooldown = 4;
  }
  if (state.robotSearchTurns > 0) {
    if (!state.hidden || (state.hiddenSpot === state.robotSearchSpot && state.sawPlayerHide)) {
      attemptKill();
    }
    return;
  }

  const learned = state.learnedHidingSpots.has(state.playerRoom);
  const signal = state.roomSignals.get(state.playerRoom) || 0;
  const baseChance = state.hidden ? (learned ? 0.55 : 0.35) : 0.75;
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
  const learned = state.learnedHidingSpots.has(state.playerRoom);
  const signal = state.roomSignals.get(state.playerRoom) || 0;
  const baseChance = state.hidden
    ? (state.sawPlayerHide ? (learned ? 0.5 : 0.3) : 0.05)
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
  state.isAlive = false;
  clearActionLock();
  closeMap();
  fadeTrackTo("run", 0, RUN_AUDIO_FADE_OUT_MS);
  fadeTrackTo("sneak", 0, SNEAK_AUDIO_FADE_OUT_MS);
  state.runSummary = buildRunSummary("loss");
  dom.deathSummary.textContent = state.runSummary;
  dom.deathScreen.classList.add("active");
  dom.deathScreen.setAttribute("aria-hidden", "false");
}

function buildEscape() {
  if (!state.isAlive || state.hasEscaped) return;
  if (!rooms[state.playerRoom].isExit || !state.escapeReady) return;
  fadeTrackTo("rain", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("sunny", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("run", 0, RUN_AUDIO_FADE_OUT_MS);
  fadeTrackTo("sneak", 0, SNEAK_AUDIO_FADE_OUT_MS);
  state.hasEscaped = true;
  state.completedNight = state.currentNight;
  state.dayCount += 1;
  state.threat = Math.min(5, state.threat + 0.4);
  state.runSummary = buildRunSummary("win");
  dom.victorySummary.textContent = state.runSummary;
  updateNextNightButton();
  dom.victoryScreen.classList.add("active");
  dom.victoryScreen.setAttribute("aria-hidden", "false");
}

function updateNextNightButton() {
  const isFinalNight = state.currentNight >= 10;
  dom.nextNightBtn.textContent = isFinalNight ? "Play Again" : "Next Night";
}

function advanceNight() {
  const previousNight = state.currentNight;
  if (state.currentNight >= 10) {
    state.currentNight = 1;
  } else {
    state.currentNight = Math.min(10, state.currentNight + 1);
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
  const savedInventory = preserveItems ? new Set(state.inventory) : null;
  const savedCraftedItems = preserveItems ? new Set(state.craftedItems) : null;
  const savedToolCollected = preserveItems ? new Set(state.toolCollected) : null;
  const savedFoundSchematics = preserveItems ? new Set(state.foundSchematics) : null;
  const savedDoorJams = preserveItems ? state.doorJams : null;
  const savedNoiseLures = preserveItems ? state.noiseLures : null;
  clearActionLock();
  if (pendingMoveTimeoutId) {
    clearTimeout(pendingMoveTimeoutId);
    pendingMoveTimeoutId = null;
  }
  fadeTrackTo("run", 0, RUN_AUDIO_FADE_OUT_MS);
  fadeTrackTo("sneak", 0, SNEAK_AUDIO_FADE_OUT_MS);
  fadeTrackTo("rain", 0, AMBIENT_FADE_OUT_MS);
  fadeTrackTo("sunny", 0, AMBIENT_FADE_OUT_MS);
  desiredMovementMode = "none";
  lastMovementMode = "none";
  state.playerRoom = 0;
  state.robotRoom = 0;
  state.hidden = false;
  state.hiddenSpot = null;
  state.learnedHidingSpots.clear();
  state.hideHistory.clear();
  state.threat = 1;
  state.turn = 0;
  state.inventory.clear();
  state.foundSchematics.clear();
  state.craftedItems.clear();
  state.usedDevices.clear();
  state.robotFocus = null;
  state.lastKnownPlayerRoom = null;
  state.trailTurns = 0;
  state.routePreviewRoom = null;
  state.selectedRoom = null;
  state.selectedSchematic = null;
  state.requiredEscapeSchematic = null;
  state.escapeReady = false;
  state.escapeConsoleInspected = false;
  state.tasksAcknowledgedNightOne = false;
  state.manualOverrideNeeded = 0;
  state.manualOverrideTargets = new Set();
  state.manualOverridesDone = new Set();
  state.noiseLures = 3;
  state.roomSignals.clear();
  state.checkedRooms.clear();
  state.robotLinger = 0;
  state.robotDormant = 0;
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
  state.pendingSignals = [];
  state.persistentSignals.clear();
  state.roomNoisePenalty.clear();
  state.burnedHidingSpots.clear();
  state.jammedEdges.clear();
  state.doorJams = 1;
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
  state.disabledAlarmedRooms = new Set();
  state.alarmDisableProgress = new Map();
  state.alarmedRoomsRequired = 0;
  state.activeLures.clear();
  state.sunlitRooms.clear();
  state.specialPickups = new Map();
  state.requiredPickup = null;
  state.toolCollected = new Set();
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
  if (!preserveItems) {
    state.lastNightSpawnedParts = new Set();
  }
  if (!state.unlocks.robotActive) {
    state.robotDisabled = true;
  }
  state.ohShitTriggered = false;
  state.sanity = 1;
  state.minSanity = 1;
  state.sanityGlitchCooldown = 0;
  state.sanityScanCooldown = 0;
  state.phantomCueShown = false;
  state.lastSanityRecoveryTick = -999;
  state.caitCooldown = 0;
  state.caitTalkCount = 0;
  state.runMoments = [];
  state.runSummary = "";
  if (preserveItems) {
    savedInventory.forEach((item) => state.inventory.add(item));
    savedCraftedItems.forEach((item) => state.craftedItems.add(item));
    savedToolCollected.forEach((item) => state.toolCollected.add(item));
    savedFoundSchematics.forEach((item) => state.foundSchematics.add(item));
    state.doorJams = savedDoorJams;
    state.noiseLures = savedNoiseLures;
  }
  setupMissionForNight();
  assignRoomFinds();
  announceWeather();
  configureRobotStart();
  dom.deathScreen.classList.remove("active");
  dom.deathScreen.setAttribute("aria-hidden", "true");
  dom.deathSummary.textContent = "";
  dom.victoryScreen.classList.remove("active");
  dom.victoryScreen.setAttribute("aria-hidden", "true");
  dom.victorySummary.textContent = "";
  dom.robotAlertModal.classList.remove("active");
  dom.robotAlertModal.setAttribute("aria-hidden", "true");
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

function pickRobotTarget() {
  if (state.robotFocus !== null) return state.robotFocus;
  const avoidAlarmLoop = isAlarmTriggered(state.robotRoom);
  const signals = Array.from(state.roomSignals.entries())
    .map(([roomId, value]) => ({
      roomId,
      value,
      adjusted: value - alarmVisitPenalty(roomId),
    }))
    .sort((a, b) => b.adjusted - a.adjusted);
  for (const entry of signals) {
    const { roomId, value, adjusted } = entry;
    if (adjusted <= 0.2) continue;
    if (avoidAlarmLoop && roomId === state.robotLastRoom && isAlarmTriggered(roomId)) continue;
    if (!state.robotCheckedCooldown.has(roomId)) return roomId;
    if (value >= 0.7 && adjusted >= 0.4) return roomId;
  }

  if (state.trailTurns > 0 && state.lastKnownPlayerRoom !== null) {
    const penalty = alarmVisitPenalty(state.lastKnownPlayerRoom);
    const confidence = getRoomConfidence(state.lastKnownPlayerRoom) - penalty;
    if (
      avoidAlarmLoop &&
      state.lastKnownPlayerRoom === state.robotLastRoom &&
      isAlarmTriggered(state.lastKnownPlayerRoom)
    ) {
      return null;
    }
    if (!state.robotCheckedCooldown.has(state.lastKnownPlayerRoom) || confidence >= 0.7) {
      return state.lastKnownPlayerRoom;
    }
  }

  const predicted = predictNextRoom();
  if (
    predicted !== null &&
    state.lastKnownPlayerRoom !== null &&
    state.robotPredictionCooldown === 0
  ) {
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
  }

  return null;
}

function getRoomConfidence(roomId) {
  return state.roomSignals.get(roomId) || 0;
}

function startSearchCycle() {
  state.robotSearchTurns = Math.floor(Math.random() * 4) + 5;
  state.robotSearchSpot = pickSearchSpot();
  setRobotMode("search");
}

function pickSearchSpot() {
  const spots = rooms[state.robotRoom].hideSpots;
  if (!spots || spots.length === 0) return null;
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
      state.robotFocus = roomId;
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
  state.robotFocus = roomId;
  setRobotMode("hunt");
}

function getRobotDistance() {
  const path = getShortestPath(state.playerRoom, state.robotRoom);
  if (!path.length) return null;
  return Math.max(0, path.length - 1);
}

function getRobotRoomHint(roomId) {
  const hints = {
    1: "Metal clatter.",
    2: "Burnt air.",
    3: "Cold vapor hisses.",
    5: "Fans whine.",
    6: "Servos hum.",
    8: "Switches snap.",
    11: "Pistons thump.",
  };
  return hints[roomId] || "";
}

function robotStatusLabel() {
  if (state.robotDisabled) {
    const weatherQuietLines = {
      Rain: "Rain hammers the metal roof.",
      Clear: "You can hear the birds chirping outside.",
      Fog: "The chirping outside stopped.",
      Storm: "Thunder rolls in the distance.",
    };
    return weatherQuietLines[state.weather?.type] ?? "The factory holds its breath.";
  }
  if (state.robotDormant > 0) return "The halls fall quiet.";

  const distance = getRobotDistance();
  const distanceLabel = distance === 0
    ? "in the room"
    : distance === 1
      ? "just outside"
      : distance === 2
        ? "nearby"
        : distance === null
          ? "somewhere"
          : "far away";

  let primary = "";
  if (distance === 0) {
    if (state.hidden && state.robotLookTurns > 0) {
      primary = "It stares right at you.";
    } else if (state.hidden) {
      primary = "Footsteps enter the room.";
    } else if (state.robotLookTurns > 0) {
      primary = "It scans the halls.";
    } else {
      primary = "Footsteps scrape nearby.";
    }
  } else if (distance === 1 && state.hidden) {
    primary = "Footsteps hover outside.";
  } else if (state.robotLookTurns > 0) {
    primary = `Servos move ${distanceLabel}.`;
  } else if (state.robotSweepQueue.length > 0) {
    primary = `Something runs ${distanceLabel}.`;
  } else if (state.robotSearchTurns > 0) {
    primary = `Footsteps search ${distanceLabel}.`;
  } else if (state.robotInvestigateTurns > 0) {
    primary = `Footsteps slow ${distanceLabel}.`;
  } else if (state.robotTask) {
    primary = `Relays tick ${distanceLabel}.`;
  } else if (distance === 1) {
    primary = "Something moves nearby.";
  } else {
    primary = `Footsteps ${distanceLabel}.`;
  }

  const roomHint = distance > 0 ? getRobotRoomHint(state.robotRoom) : "";
  const base = roomHint ? `${primary} ${roomHint}` : primary;
  const pressureTag = sanityPressurePhrase();
  const weightedBase = pressureTag ? `${base} ${pressureTag}` : base;
  if (state.currentNight >= 4 && state.sanity < 0.4) {
    const nearRobot = distance !== null && distance <= 2;
    const inTriggeredAlarm = isAlarmTriggered(state.playerRoom);
    const inSunlit = state.sunlitRooms.has(state.playerRoom);
    const pressure = getSignalPressure(state.playerRoom);
    const allowHallucination = nearRobot || inTriggeredAlarm || inSunlit || pressure >= 0.6;
    if (allowHallucination) {
      const distorted = state.sanity < 0.2
        ? [
          "Static claws at your ears.",
          "The signal fractures in your skull.",
          "Every corridor feels too close.",
        ]
        : [
          "Static drifts across your thoughts.",
          "The signal warps for a breath.",
          "Your pulse drowns the noise.",
      ];
      const chance = state.sanity < 0.2 ? 0.45 : 0.25;
      if (Math.random() < chance) {
        return `${distorted[Math.floor(Math.random() * distorted.length)]} ${weightedBase}`;
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
  const plannedPath = state.routePreviewRoom !== null
    ? getShortestPath(planningOrigin, state.routePreviewRoom)
    : [];
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
    node.classList.toggle("action-selected", !isIntroEscapeHighlight && roomId === state.mapTargetSelection);
    node.classList.toggle(
      "robot-adjacent",
      showRobotIntel && showRobotVision && roomId === state.robotScanTarget
    );
    node.classList.toggle("robot-nearby", robotNearby && roomId === state.robotRoom);
    node.classList.toggle("robot-target", showRobotIntel && roomId === state.robotPlannedTarget);
    node.classList.toggle("robot-sweep", showRobotIntel && state.robotSweepQueue.includes(roomId));
    node.classList.toggle("scan-focus", state.scanPulseTicks > 0 && roomId === state.scanFocusRoom);
    const poi = node.querySelector(".map-poi");
    const hazard = node.querySelector(".map-hazard");
    if (poi) {
      const room = rooms[roomId];
      const discoveriesEnabled = state.escapeConsoleInspected;
      const isExit = isEscapeRoom;
      const canShowDiscoveries = isIntroEscapeHighlight ? isExit : discoveriesEnabled || isExit;
      const hasItem = discoveriesEnabled && Boolean(room.item) && !state.inventory.has(room.item);
      const allowSchematicMarkers = state.unlocks.allowCrafting ||
        state.missionType === MISSION_TYPES.DATA ||
        (state.currentNight === 4 && room.schematic === "Pulse Scanner");
      const hasSchematic = discoveriesEnabled &&
        allowSchematicMarkers &&
        Boolean(room.schematic) &&
        !state.foundSchematics.has(room.schematic);
      let marker = "";
      if (canShowDiscoveries) {
        if (isExit) {
          marker = "⎋";
        } else if (hasSchematic) {
          marker = "◇";
        } else if (hasItem) {
          marker = "●";
        }
      }
      poi.textContent = marker;
      poi.classList.toggle("poi-item", hasItem && !isExit && !hasSchematic);
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
    if (hazard) {
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
  if (dom.app) {
    dom.app.classList.remove("is-hidden");
  }
  openMap();
  updateUI();
}

function getRoomPressure(roomId) {
  const signal = state.roomSignals.get(roomId) || 0;
  const visit = state.robotPresenceHeat.get(roomId) || 0;
  const targetBoost = state.robotPlannedTarget === roomId ? 0.6 : 0;
  const sweepBoost = state.robotSweepQueue.includes(roomId) ? 0.4 : 0;
  const focusBoost = state.robotFocus === roomId ? 0.5 : 0;
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

function craftItem() {
  if (!state.isAlive || state.hasEscaped) return;
  const craftable = getSelectedSchematic();
  if (!craftable) return;
  const isPulseScanner = craftable.name === "Pulse Scanner";
  const allowPulseScannerBuild = state.currentNight === 4 && isPulseScanner;
  if (!state.unlocks.allowCrafting && !allowPulseScannerBuild) {
    const unlockNight = getNextUnlockNightFromNow("allowCrafting");
    pushStatus(
      unlockNight ? `Crafting locked until Night ${unlockNight}.` : "Crafting locked.",
      3
    );
    return;
  }
  if (!state.foundSchematics.has(craftable.name)) return;
  if (isPulseScanner && hasCollectedTool("Pulse Scanner")) return;
  if (craftable.name !== "Door Jam" && state.craftedItems.has(craftable.name)) return;
  if (craftable.name === "Door Jam" && !state.unlocks.allowDoorJams) {
    const unlockNight = getNextUnlockNightFromNow("allowDoorJams");
    pushStatus(
      unlockNight ? `Door jams unlock on Night ${unlockNight}.` : "Door jams locked.",
      3
    );
    return;
  }
  if (!craftable.parts.every((part) => isMaterial(part))) {
    console.error("Crafting blocked: power/access parts detected in schematic.", craftable);
    pushStatus("Crafting failed: component class mismatch.", 3);
    return;
  }
  if (!craftable.parts.every((part) => state.inventory.has(part))) return;
  recordMeaningfulAction();
  craftable.parts.forEach((part) => state.inventory.delete(part));
  if (craftable.name === "Door Jam") {
    state.doorJams += 1;
  } else if (isPulseScanner) {
    state.toolCollected.add("Pulse Scanner");
    state.inventory.add("Pulse Scanner");
    state.unlocks.allowScannerToggle = true;
    state.scannerOn = false;
    state.scannerHighlight = true;
    showObjectiveModal("Cait: Scanner’s live. Don’t lean on it. Every pulse leaves a trace.");
  } else {
    state.craftedItems.add(craftable.name);
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
  updateUI();
}

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
    }
    if (state.alertTicks > 0) {
      state.alertTicks -= 1;
    }
    tickStatus();
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
    if (state.currentNight >= 4 &&
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
    if (state.currentNight >= 4 && state.scannerOn && state.sunlitRooms.has(state.playerRoom)) {
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
    tickAlarmedRooms();
    tickSunlitRooms();
    tickPowerSurge();
    tickPersistentSignals();
    decaySignals();
    tickRewireDampen();
    tickJammedEdges();
    maybeExpireLastKnown();
    advanceRobot();
    checkThreat();
    tickRobotMemory();
    updateUI();
  }, TICK_MS);
}

function updateUseList() {
  dom.useList.innerHTML = "";
  const controlBlocked = state.objectiveBlocked || isActionLocked();
  const options = [];
  const lockedEntries = [];
  if (state.unlocks.allowNoiseLure) {
    options.push(
      {
        label: `Noise Lure (${state.noiseLures})`,
        action: () => beginMapTarget("noise"),
        help: "Noise Lure",
        disabled: state.noiseLures <= 0 || isPlayerTraveling() || state.mapTargetMode,
      }
    );
  } else {
    const unlockNight = getNextUnlockNightFromNow("allowNoiseLure");
    lockedEntries.push(
      unlockNight ? `Noise Lure locked (Night ${unlockNight})` : "Noise Lure locked."
    );
  }
  if (state.unlocks.allowDoorJams && state.doorJams > 0) {
    const adjacent = roomConnections[state.playerRoom] || [];
    const validTargets = adjacent.filter((roomId) => {
      const disallowed = rooms[roomId].isExit || rooms[state.playerRoom].isExit;
      if (disallowed) return false;
      return !isEdgeJammed(state.playerRoom, roomId);
    });
    options.push({
      label: `Door Jam (${state.doorJams})`,
      action: () => beginMapTarget("jam"),
      help: "Door Jam",
      disabled: validTargets.length === 0 || isPlayerTraveling() || state.mapTargetMode,
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
  state.craftedItems.forEach((item) => {
    options.push({ label: item, action: () => useCraftedItem(item), help: item });
  });

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
    help.textContent = "Help";
    help.disabled = controlBlocked;
    help.addEventListener("click", () => openComponent(item.help));
    li.appendChild(help);
    dom.useList.appendChild(li);
  });
}

function updateScannerToggleButton() {
  if (!dom.scannerToggleBtn) return;
  const controlBlocked = state.objectiveBlocked || isActionLocked();
  const showScanner = canUseScanner();
  dom.scannerToggleBtn.classList.toggle("hidden", !showScanner);
  if (!showScanner) return;
  dom.scannerToggleBtn.textContent = state.scannerOn ? "Motion Sensor: ON" : "Motion Sensor: OFF";
  dom.scannerToggleBtn.disabled = controlBlocked;
  dom.scannerToggleBtn.classList.toggle("objective-highlight", state.scannerHighlight);
}

function useCraftedItem(name) {
  if (!state.craftedItems.has(name)) return;
  const steps = name === "Signal Scrambler" ? 2 : 1;
  runLockedAction({
    label: `Using ${name}…`,
    steps,
    onStep: (step, total) => {
      pulseActionSignal(state.playerRoom, "trace");
      state.turn += 1;
      if (step < total) {
        updateUI();
        return;
      }
      if (name === "Signal Scrambler") {
        state.roomSignals.clear();
        state.threat = Math.max(1, state.threat - 0.6);
      }
      if (name === "Motion Dampener") {
        state.robotLinger = Math.max(state.robotLinger, 2);
      }
      if (name === "Override Key") {
        state.threat = Math.max(1, state.threat - 1);
      }
      closeUse();
      updateUI();
    },
  });
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
  if (state.doorJams <= 0) return;
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
  if (state.doorJams <= 0) return;
  if (rooms[state.playerRoom].isExit || rooms[roomId].isExit) return;
  if (isEdgeJammed(state.playerRoom, roomId)) return;
  const duration = jamDurationForNight();
  if (!jamEdge(state.playerRoom, roomId, duration)) return;
  state.doorJams = Math.max(0, state.doorJams - 1);
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
    showObjectiveModal("Cait: Not here. Wrong door.");
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
  buildEscape();
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
  state.hidden = false;
  state.hiddenSpot = null;
  state.hiddenTurns = 0;
  if (state.introStep === "highlight-run" && rooms[nextRoom].isExit && !state.introEscapeVisited) {
    state.introEscapeVisited = true;
    state.introStep = "highlight-live";
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
      }
      state.sneakStepsWithoutSignal = 0;
    }
  }
  if (isAlarmCapable(nextRoom) && !isAlarmTriggered(nextRoom)) {
    state.triggeredAlarms.add(nextRoom);
    showObjectiveModal("Cait: …that room just lit up. Move.");
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
    state.robotFocus = null;
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
