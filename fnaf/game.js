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
];

const OBJECTIVE_RECIPES_BY_SCHEMATIC = new Map(
  OBJECTIVE_RECIPES.map((recipe) => [recipe.schematic, recipe])
);
const OBJECTIVE_RECIPES_BY_NAME = new Map(
  OBJECTIVE_RECIPES.map((recipe) => [recipe.name, recipe])
);
const DATA_FRAGMENT_SCHEMATIC = "Data Fragment";

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
    robotActive: true,
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
    robotActive: true,
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
    robotActive: true,
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
  craftMiniGameActive: false,
  craftMiniGame: null,
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
  disabledAlarmedRooms: new Set(),
  alarmDisableProgress: new Map(),
  alarmedRoomsRequired: 0,
  alarmAlertShown: false,
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
  surgeAlertShown: false,
  lightningCooldown: null,
  vista: 0,
  sunlightMemoryShown: false,
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
  caitFrayedTutorialShown: false,
  caitCooldown: 0,
  caitTalkCount: 0,
  caitQuietRoomId: null,
  caitQuietSeen: false,
  night11CreditsRolling: false,
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
let pendingMoveTimeoutId = null;
const ACTION_LOCK_MS = 1200;
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
  titleScreen: document.getElementById("titleScreen"),
  titleVideoBackdrop: document.getElementById("titleVideoBackdrop"),
  titleVideo: document.getElementById("titleVideo"),
  titleVideos: document.querySelectorAll(".title-video"),
  titleAudio: document.getElementById("titleAudio"),
  introFade: document.getElementById("introFade"),
  rainAudio: document.getElementById("rainAudio"),
  fogAudio: document.getElementById("fogAudio"),
  sunnyAudio: document.getElementById("sunnyAudio"),
  sneakAudio: document.getElementById("sneakAudio"),
  runningAudio: document.getElementById("runningAudio"),
  typingAudio: document.getElementById("typingAudio"),
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
  systemTabSettings: document.getElementById("systemTabSettings"),
  systemTabDebug: document.getElementById("systemTabDebug"),
  saveGameBtn: document.getElementById("saveGameBtn"),
  saveNameInput: document.getElementById("saveNameInput"),
  saveList: document.getElementById("saveList"),
  saveStatus: document.getElementById("saveStatus"),
  loadStatus: document.getElementById("loadStatus"),
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
  { element: dom.lightningAudio, filename: "lightning_loud.mp3" },
];
const SAVE_LIST_KEY = "robtergeist_saves_v2";
const SAVE_COUNTER_KEY = "robtergeist_save_counter_v1";
const LEGACY_SAVE_KEY = "robtergeist_save_v1";
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
  const maxVolume = getSoundSettingVolumeForElement(audioEl);
  const busVolume = audioBuses.sfx ?? 1;
  const masterVolume = audioBuses.master ?? 1;
  audioEl.volume = clamp(volume * maxVolume * busVolume * masterVolume, 0, 1);
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
  if (!event || !event.isTrusted) return false;
  if (event.type === "keydown") {
    const allowedKeys = new Set(["Enter", " ", "Spacebar"]);
    if (!allowedKeys.has(event.key)) return false;
    event.preventDefault();
  }
  const audioReady = await AudioManager.init();
  if (audioReady) {
    await AudioManager.unlock();
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
  if (!(await ensureAudioUnlockedFromGesture(event))) return;
  if (dom.audioGate) {
    dom.audioGate.removeEventListener("click", handleAudioGateGesture, true);
    dom.audioGate.setAttribute("aria-hidden", "true");
  }
  if (dom.audioGateBtn) {
    dom.audioGateBtn.removeEventListener("click", handleAudioGateGesture, true);
  }
  if (dom.titleScreen && !dom.titleScreen.classList.contains("title-visible")) {
    requestAnimationFrame(() => {
      dom.titleScreen?.classList.add("title-visible");
    });
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
  dom.systemTabSettings?.addEventListener("click", () => setSystemTab("settings"));
  dom.systemTabDebug?.addEventListener("click", () => {
    if (!DEBUG_UI) return;
    openDebug();
    closeSystemMenu();
  });
  dom.saveGameBtn?.addEventListener("click", saveGame);
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
    if (!alarmFxActive) {
      fxController.playSfx("alarm-chirp", 0.6);
    }
  } else {
    fxController.clearRootClass("alarm-active");
    if (alarmFxActive) {
      stopAlarmDrone();
    }
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
  const highlightRunBase =
    (state.introStep === "highlight-run" ||
      (state.currentNight === 1 &&
        state.escapeConsoleInspected &&
        !state.runAcknowledgedNightOne) ||
      state.escapeRunPrompted) &&
    !isDeployMode;
  if (!state.runHighlightConsumed) {
    if (highlightRunBase) {
      state.runHighlightActive = true;
    } else if (state.runHighlightActive) {
      state.runHighlightConsumed = true;
      state.runHighlightActive = false;
    }
  }
  const highlightRun = highlightRunBase && !state.runHighlightConsumed;
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

function isNight11(night = state.currentNight) {
  return night === NIGHT_11;
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

function maybeTriggerCaitFrayedTutorial() {
  if (state.caitFrayedTutorialShown) return;
  if (state.currentNight < 4) return;
  if (!(state.prevSanity > 0.4 && state.sanity < 0.4)) return;
  state.caitFrayedTutorialShown = true;
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
  return state.toolCollected.has(name) || hasInventoryItem(name);
}

function isRequiredPickupComplete() {
  if (!state.requiredPickup) return true;
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
  state.disabledAlarmedRooms = new Set();
  state.alarmDisableProgress = new Map();
  state.alarmedRoomsRequired = 0;
  state.alarmAlertShown = false;
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
  state.surgeAlertShown = false;
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
  state.objectiveItemName = null;
  state.objectiveItemCrafted = false;
  state.objectiveItemInstalled = false;
  state.objectiveBlocksEscapeConsole = false;
  state.completedObjectiveItems = new Set();

  const nightObjectiveRecipe = OBJECTIVE_RECIPES.find(
    (recipe) => recipe.nightOnly === state.currentNight
  );
  if (nightObjectiveRecipe) {
    state.missionType = MISSION_TYPES.ESCAPE;
    state.escapeMode = "fabricate";
    setObjectiveRecipe(nightObjectiveRecipe, { blocksEscapeConsole: true });
  }

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

  if (!nightObjectiveRecipe) {
    if (state.missionType === MISSION_TYPES.ESCAPE && state.escapeMode === "fabricate") {
      const options = OBJECTIVE_RECIPES.filter((recipe) => !recipe.nightOnly);
      const recipe = options[Math.floor(Math.random() * options.length)];
      setObjectiveRecipe(recipe);
      state.selectedSchematic = null;
    } else {
      state.requiredEscapeSchematic = null;
      state.selectedSchematic = null;
    }
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
    const introLine = getCaitNightData(5).intro;
    state.nightIntroLine = introLine;
    if (state.requiredPickup) {
      state.requiredPickup.caitIntroLine = introLine;
    }
  }

  if (state.currentNight === 6) {
    const roomId = state.requiredPickup?.roomId ?? PICKUP_START_ROOM;
    const night6Data = getCaitNightData(6);
    const introLine = formatCaitLine(night6Data.intro, { room: rooms[roomId].name });
    state.nightIntroLine = introLine;
    if (state.requiredPickup) {
      state.requiredPickup.caitIntroLine = introLine;
      state.requiredPickup.caitWarnLine = night6Data.pickupWarning;
    }
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
  announceWeather();
  updateNextNightButton();
  preloadRoomBackgrounds();
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
  fxController.playSfx("surge-pop", inSurgeRoom ? 1 : 0.85, { inRoom: inSurgeRoom });
  if (inSurgeRoom) {
    fxController.playSfx("surge-buzz", 0.7);
  }
  if (!state.surgeAlertShown) {
    showObjectiveModal(getCaitLine("surgeAlert"));
    state.surgeAlertShown = true;
  }
  if (isAlarmCapable(roomId)) {
    state.triggeredAlarms.add(roomId);
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
  returnToTitleScreen();
}

function returnToTitleScreen() {
  hasStartedGame = false;
  canStartAmbience = false;
  state.objectiveBlocked = false;
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

function onAlarmTriggered(roomId) {
  if (state.robotDisabled) return;
  if (!state.alarmAlertShown) {
    showObjectiveModal(getCaitLine("alarmTripped"));
    state.alarmAlertShown = true;
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
    });
  } else if (canEscape) {
    actions.push({
      label: "Escape",
      onClick: () => handleEscape(),
      disabled: blocked,
      highlight: true,
      className: "escape-button",
      suppressMenuPress: true,
    });
  }

  if (isNight11()) {
    actions.forEach((action) => {
      const button = document.createElement("button");
      const label = document.createElement("span");
      label.textContent = action.label;
      button.appendChild(label);
      if (action.className) {
        button.classList.add(action.className);
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
    const isObjectiveSchematic = state.requiredEscapeSchematic === room.schematic;
    const canScanSchematic = state.unlocks.allowCrafting || isDataMission || isObjectiveSchematic;
    const allowScanBeforeConsole = isObjectiveSchematic && state.objectiveBlocksEscapeConsole;
    if (!state.objectiveItemInstalled &&
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
    });
  }

  if (room.isExit && state.escapeConsoleInspected &&
    state.objectiveItemCrafted &&
    !state.objectiveItemInstalled) {
    actions.push({
      label: `Install ${state.objectiveItemName}`,
      onClick: () => installObjectiveItem(),
      disabled: state.hidden || blocked,
      highlight: true,
      risk: "Trace",
    });
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
  }

  if (state.currentNight >= 4 && state.currentNight !== 6 && !state.hidden && !isPlayerTraveling()) {
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
  return 0;
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
    objective = `Collect the ${state.requiredPickup.itemName} in ${roomName}.`;
  } else if (
    state.objectiveBlocksEscapeConsole &&
    state.requiredEscapeSchematic &&
    !state.objectiveItemInstalled &&
    !state.foundSchematics.has(state.requiredEscapeSchematic)
  ) {
    objective = `Collect the ${state.requiredEscapeSchematic}.`;
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
  state.escapeRunPrompted = isExitRoom;
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
  state.toolCollected.add(itemName);
  addInventoryItem(itemName);
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
  const pending = state.pendingHide;
  if (!pending) return;
  if (!state.hidden ||
    state.hiddenSpot !== pending.spot ||
    state.playerRoom !== pending.roomId) {
    state.pendingHide = null;
    return;
  }
  const adjacent = roomConnections[state.playerRoom] || [];
  const robotAdjacent = adjacent.includes(state.robotRoom);
  if (state.robotRoom === state.playerRoom || robotAdjacent) return;
  recordHideSuccess(pending.roomId, pending.spot);
  state.pendingHide = null;
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
    updateUI();
    return;
  }
  state.hidden = true;
  state.hiddenSpot = spot;
  state.hiddenTurns = 0;
  if (!state.pendingHide ||
    state.pendingHide.roomId !== state.playerRoom ||
    state.pendingHide.spot !== spot) {
    state.pendingHide = { roomId: state.playerRoom, spot, startedTurn: state.turn };
  }
  state.sawPlayerHide = state.robotRoom === state.playerRoom && state.robotLookTurns > 0;
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

  const learned = state.hidden && isHideSpotLearned(state.playerRoom, state.hiddenSpot);
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
  const learned = state.hidden && isHideSpotLearned(state.playerRoom, state.hiddenSpot);
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
  const savedCaitFrayedTutorialShown = preserveItems ? state.caitFrayedTutorialShown : null;
  const savedSunlightMemoryShown = preserveItems ? state.sunlightMemoryShown : null;
  const savedVista = preserveItems ? state.vista : null;
  clearActionLock();
  closePanel(dom.craftMiniGame);
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
  state.disabledAlarmedRooms = new Set();
  state.alarmDisableProgress = new Map();
  state.alarmedRoomsRequired = 0;
  state.activeLures.clear();
  state.sunlitRooms.clear();
  state.specialPickups = new Map();
  state.requiredPickup = null;
  state.toolCollected = new Set();
  state.alarmAlertShown = false;
  state.deployableUnlocks = { noiseLure: false, doorJam: false };
  state.surgeAlertShown = false;
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
  state.sunlightMemoryShown = false;
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
  state.caitFrayedTutorialShown = false;
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
    state.caitFrayedTutorialShown = savedCaitFrayedTutorialShown;
    state.sunlightMemoryShown = savedSunlightMemoryShown;
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
    tickAlarmedRooms();
    tickSunlitRooms();
    tickPowerSurge();
    tickStormLightning();
    tickPersistentSignals();
    decaySignals();
    tickDirector();
    tickRewireDampen();
    tickJammedEdges();
    maybeExpireLastKnown();
    advanceRobot();
    resolvePendingHide();
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
  if (state.sunlightMemoryShown) return false;
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
  state.sunlightMemoryShown = true;
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
    state.triggeredAlarms.add(nextRoom);
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
