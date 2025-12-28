const rooms = [
  {
    id: 0,
    name: "Control Bay",
    description: "Camera consoles hum. The robot hates the light.",
    theme: "linear-gradient(135deg, rgba(73, 103, 146, 0.5), rgba(9, 16, 28, 0.9))",
    hideSpots: ["Console Shadow", "Cable Duct"],
    siren: "Alarm Beacon",
    noiseRisk: 0.2,
  },
  {
    id: 1,
    name: "Assembly Line",
    description: "Conveyor belts shudder like heartbeat monitors.",
    theme: "linear-gradient(135deg, rgba(126, 98, 62, 0.55), rgba(15, 12, 8, 0.9))",
    item: "Copper Wire",
    hideSpots: ["Crate Stack", "Hydraulic Pit"],
    siren: "Conveyor Siren",
    noiseRisk: 0.3,
  },
  {
    id: 2,
    name: "Power Junction",
    description: "Sparks arc. The robot feeds here.",
    theme: "linear-gradient(135deg, rgba(96, 151, 142, 0.55), rgba(10, 16, 18, 0.9))",
    item: "Power Cell",
    hideSpots: ["Breaker Alcove", "Voltage Cabinet"],
    siren: "Surge Tone",
    noiseRisk: 0.4,
  },
  {
    id: 3,
    name: "Coolant Vault",
    description: "Cold vapor hides footsteps but muffles sound.",
    theme: "linear-gradient(135deg, rgba(80, 135, 184, 0.45), rgba(6, 9, 15, 0.95))",
    hideSpots: ["Cryo Rack", "Frosted Duct"],
    siren: "Coolant Alarm",
    noiseRisk: 0.25,
  },
  {
    id: 4,
    name: "Maintenance Shafts",
    description: "Tight tunnels. Every metal scrape is a signal.",
    theme: "linear-gradient(135deg, rgba(67, 84, 115, 0.55), rgba(5, 7, 10, 0.9))",
    item: "Resistors",
    hideSpots: ["Tool Cage", "Vent Crawlspace"],
    siren: "Service Klaxon",
    noiseRisk: 0.35,
  },
  {
    id: 5,
    name: "Server Nest",
    description: "The AI watches you through cracked monitors.",
    theme: "linear-gradient(135deg, rgba(96, 66, 146, 0.5), rgba(12, 8, 18, 0.92))",
    schematic: "Signal Scrambler",
    hideSpots: ["Server Rack", "Data Alcove"],
    siren: "Rack Resonator",
    noiseRisk: 0.3,
  },
  {
    id: 6,
    name: "Fabrication Lab",
    description: "Half-built drones dangle like corpses.",
    theme: "linear-gradient(135deg, rgba(112, 94, 124, 0.5), rgba(9, 7, 12, 0.92))",
    item: "Capacitors",
    hideSpots: ["Drone Cradle", "Workbench Shadow"],
    siren: "Lab Chime",
    noiseRisk: 0.28,
  },
  {
    id: 7,
    name: "Logistics Depot",
    description: "Crates are stacked in impossible patterns.",
    theme: "linear-gradient(135deg, rgba(92, 78, 66, 0.55), rgba(9, 7, 5, 0.9))",
    hideSpots: ["Crate Maze", "Lift Platform"],
    siren: "Forklift Horn",
    noiseRisk: 0.32,
  },
  {
    id: 8,
    name: "Substation",
    description: "Every switch flips on its own.",
    theme: "linear-gradient(135deg, rgba(86, 106, 88, 0.55), rgba(7, 10, 8, 0.9))",
    item: "Servo Motor",
    hideSpots: ["Fuse Closet", "Service Bay"],
    siren: "Switch Alarm",
    noiseRisk: 0.3,
  },
  {
    id: 9,
    name: "Diagnostics Bay",
    description: "Your vitals read on cold glass.",
    theme: "linear-gradient(135deg, rgba(61, 120, 140, 0.6), rgba(8, 12, 15, 0.95))",
    hideSpots: ["Scanner Bed", "Supply Locker"],
    siren: "Vitals Ping",
    noiseRisk: 0.22,
  },
  {
    id: 10,
    name: "Shipping Docks",
    description: "Water laps under the floor plates.",
    theme: "linear-gradient(135deg, rgba(59, 99, 122, 0.55), rgba(6, 9, 13, 0.95))",
    schematic: "Motion Dampener",
    hideSpots: ["Dock Bay", "Cargo Net"],
    siren: "Fog Horn",
    noiseRisk: 0.3,
  },
  {
    id: 11,
    name: "Hydraulic Core",
    description: "Pistons thump, hiding the robot's movement.",
    theme: "linear-gradient(135deg, rgba(132, 82, 70, 0.55), rgba(13, 8, 8, 0.9))",
    item: "Microcontroller",
    hideSpots: ["Pump Alcove", "Oil Pit"],
    siren: "Hydraulic Whistle",
    noiseRisk: 0.4,
  },
  {
    id: 12,
    name: "Research Annex",
    description: "Schematics are scattered like warning signs.",
    theme: "linear-gradient(135deg, rgba(95, 89, 129, 0.55), rgba(9, 8, 13, 0.95))",
    schematic: "Override Key",
    hideSpots: ["Prototype Pod", "Blueprint Archive"],
    siren: "Research Bell",
    noiseRisk: 0.28,
  },
  {
    id: 13,
    name: "Escape Workshop",
    description: "The only way out is built here.",
    theme: "linear-gradient(135deg, rgba(147, 111, 75, 0.55), rgba(13, 9, 6, 0.9))",
    isExit: true,
    hideSpots: ["Assembly Pit", "Scrap Curtain"],
    siren: "Exit Klaxon",
    noiseRisk: 0.35,
  },
];

const requiredParts = [
  "Resistors",
  "Capacitors",
  "Microcontroller",
  "Servo Motor",
  "Copper Wire",
  "Power Cell",
];

const craftableItems = [
  { name: "Signal Scrambler", parts: ["Capacitors", "Copper Wire"] },
  { name: "Motion Dampener", parts: ["Resistors", "Servo Motor"] },
  { name: "Override Key", parts: ["Power Cell", "Microcontroller"] },
  { name: "Door Jam", parts: ["Resistors", "Copper Wire"] },
];

const componentDescriptions = {
  Resistors: "Limits electrical current and stabilizes fragile circuits.",
  Capacitors: "Stores charge to buffer power spikes and short bursts.",
  Microcontroller: "Coordinates logic and safety overrides in the schematic.",
  "Servo Motor": "Drives precision movement for locking mechanisms.",
  "Copper Wire": "Routes power between subsystems and anchors the circuit.",
  "Power Cell": "Main power source required to energize the escape build.",
  "Signal Scrambler": "Jams the robot's sensors and clears accumulated signals.",
  "Motion Dampener": "Buys time by slowing the robot's movement for a short while.",
  "Override Key": "Overrides local locks and reduces the robot's alertness.",
  "Door Jam": "Temporarily wedges a nearby door to slow pursuit.",
  "Pulse Scanner": "Pings the area to reveal robot attention and nearby threats.",
  "Noise Lure": "Creates a loud distraction to pull the robot off your trail.",
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

const MISSION_TYPES = {
  ESCAPE: "escape",
  STABILIZE: "stabilize",
  DATA: "data",
};

const STABILIZE_SYSTEMS = [
  { room: "Power Junction", part: "Power Cell", tool: "Signal Scrambler" },
  { room: "Coolant Vault", part: "Capacitors", tool: "Signal Scrambler" },
  { room: "Hydraulic Core", part: "Servo Motor", tool: "Motion Dampener" },
  { room: "Server Nest", part: "Microcontroller", tool: "Override Key" },
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
  escapeConsoleInspected: false,
  devicesUnlocked: true,
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
  stabilizeTargets: [],
  stabilizedTargets: new Set(),
  dataFragmentsNeeded: 0,
  dataFragmentsFound: new Set(),
  dayCount: 1,
  baseDate: new Date("2326-12-25T00:00:00Z"),
  isAlive: true,
  hasEscaped: false,
  robotAlertQueued: false,
  robotAlertText: "",
  statusMessage: "",
  statusTicks: 0,
  playerTrail: [],
  signalDecayBoost: new Map(),
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
  hiddenTurns: 0,
  lastMoveType: "sneak",
  ohShitTriggered: false,
  runMoments: [],
  runSummary: "",
};

let travelAnimationId = null;

const dom = {
  threatLevel: document.getElementById("threatLevel"),
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
  routeInfo: document.getElementById("routeInfo"),
  randomizeBtn: document.getElementById("randomizeBtn"),
  selectedRoom: document.getElementById("selectedRoom"),
  menuBtn: document.getElementById("menuBtn"),
  mapBtn: document.getElementById("mapBtn"),
  tasksBtn: document.getElementById("tasksBtn"),
  useBtn: document.getElementById("useBtn"),
  debugBtn: document.getElementById("debugBtn"),
  toggleRobotBtn: document.getElementById("toggleRobotBtn"),
  closeMenuBtn: document.getElementById("closeMenuBtn"),
  closeMapBtn: document.getElementById("closeMapBtn"),
  closeUseBtn: document.getElementById("closeUseBtn"),
  closeDebugBtn: document.getElementById("closeDebugBtn"),
  menuPanel: document.getElementById("menuPanel"),
  mapPanel: document.getElementById("mapPanel"),
  usePanel: document.getElementById("usePanel"),
  debugPanel: document.getElementById("debugPanel"),
  useList: document.getElementById("useList"),
  componentPanel: document.getElementById("componentPanel"),
  componentTitle: document.getElementById("componentTitle"),
  componentDetails: document.getElementById("componentDetails"),
  componentCount: document.getElementById("componentCount"),
  closeComponentBtn: document.getElementById("closeComponentBtn"),
  tasksPanel: document.getElementById("tasksPanel"),
  tasksText: document.getElementById("tasksText"),
  closeTasksBtn: document.getElementById("closeTasksBtn"),
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
  movementControls: document.getElementById("movementControls"),
  escapeBtn: document.getElementById("escapeBtn"),
  deathScreen: document.getElementById("deathScreen"),
  victoryScreen: document.getElementById("victoryScreen"),
  retryBtn: document.getElementById("retryBtn"),
  nextNightBtn: document.getElementById("nextNightBtn"),
  roomStatus: document.querySelector(".room-status"),
  deathSummary: document.getElementById("deathSummary"),
  victorySummary: document.getElementById("victorySummary"),
  nightLabel: document.getElementById("nightLabel"),
  nightSelect: document.getElementById("nightSelect"),
};

let gameLoopId = null;

function init() {
  state.nightProfile = getNightProfile();
  renderMap();
  assignRoomFinds();
  setupMissionForNight();
  updateSchematicList();
  updatePlayerTrail(state.playerRoom);
  updateUI();
  attachEvents();
  startGameLoop();
  showObjectiveModal(getObjectiveText());
}

function attachEvents() {
  dom.buildBtn.addEventListener("click", craftItem);
  dom.retryBtn.addEventListener("click", resetGame);
  dom.nextNightBtn.addEventListener("click", advanceNight);
  dom.randomizeBtn.addEventListener("click", randomizeLayout);
  dom.goBtn.addEventListener("click", () => moveSelected(false));
  dom.runBtn.addEventListener("click", () => moveSelected(true));
  dom.cancelBtn.addEventListener("click", clearSelectedRoom);
  dom.menuBtn.addEventListener("click", openMenu);
  dom.mapBtn.addEventListener("click", openMap);
  dom.tasksBtn.addEventListener("click", openTasks);
  dom.useBtn.addEventListener("click", openUse);
  dom.debugBtn.addEventListener("click", openDebug);
  dom.toggleRobotBtn.addEventListener("click", toggleRobot);
  dom.closeMenuBtn.addEventListener("click", closeMenu);
  dom.closeMapBtn.addEventListener("click", closeMap);
  dom.closeUseBtn.addEventListener("click", closeUse);
  dom.closeDebugBtn.addEventListener("click", closeDebug);
  dom.closeComponentBtn.addEventListener("click", closeComponent);
  dom.closeTasksBtn.addEventListener("click", closeTasks);
  dom.ackObjectiveBtn.addEventListener("click", acknowledgeObjective);
  dom.ackRobotAlertBtn.addEventListener("click", acknowledgeRobotAlert);
  dom.escapeBtn.addEventListener("click", handleEscape);
  dom.nightSelect.addEventListener("change", (event) => {
    const next = Number(event.target.value);
    setCurrentNight(next);
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
  const dangerRoom = !state.robotDisabled && state.robotRoom === state.playerRoom;
  dom.currentRooms.forEach((node) => {
    node.textContent = room.name;
  });
  dom.roomMedia.classList.toggle("threat-nearby", dangerRoom);
  dom.roomMedia.classList.toggle("glitch", state.statusTicks > 0);
  dom.roomMedia.style.background = "transparent";
  document.body.style.setProperty("--room-theme", room.theme);
  dom.robotStatuses.forEach((node) => {
    node.textContent = robotStatusLabel();
  });
  dom.roomStatus.textContent = state.statusMessage;
  dom.roomStatus.classList.toggle("hidden", state.statusTicks <= 0);
  updateTravelStatus();
  dom.threatLevel.textContent = threatLabel();
  dom.dateLabel.textContent = formatDate(state.baseDate, state.dayCount);
  dom.nightLabel.textContent = `${state.currentNight}`.padStart(2, "0");
  if (dom.nightSelect) {
    dom.nightSelect.value = String(state.currentNight);
  }
  dom.selectedRoom.textContent = state.selectedRoom === null
    ? "None"
    : rooms[state.selectedRoom].name;
  updateInventoryList();
  updateSchematicsInventory();
  updateRequiredComponents();
  updateUseList();
  updateRoomActions();
  updatePanels();
  updateEscapeButton();
  updateMap();
  ensureTravelAnimation();
  updateBuildButton();
  updateMoveButtons();
  dom.toggleRobotBtn.textContent = state.robotDisabled ? "Enable Robot" : "Disable Robot";
  dom.tasksText.textContent = getObjectiveText();
  updateDebugUI();
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
  state.inventory.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    dom.inventoryList.appendChild(li);
  });
}

function updateSchematicsInventory() {
  dom.schematicInventory.innerHTML = "";
  if (state.foundSchematics.size === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No schematics found.";
    dom.schematicInventory.appendChild(empty);
    return;
  }
  state.foundSchematics.forEach((item) => {
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
  if (!selected) {
    dom.buildBtn.disabled = true;
    dom.buildBtn.textContent = "Select a Schematic";
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
  const canMove = state.selectedRoom !== null &&
    getShortestPath(state.playerRoom, state.selectedRoom).length > 1;
  const blocked = !canMove || !state.isAlive || state.hasEscaped || isPlayerTraveling();
  setButtonLabel(dom.goBtn, "Sneak", "Quiet");
  setButtonLabel(dom.runBtn, "Run", "Trace");
  dom.goBtn.disabled = blocked;
  dom.runBtn.disabled = blocked;
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
  const showMovement = state.selectedRoom !== null;
  dom.movementControls.classList.toggle("hidden", !showMovement);
}

function pushStatus(message, ticks = 3) {
  state.statusMessage = message;
  state.statusTicks = ticks;
}

function setRobotMode(mode) {
  if (state.robotMode === mode) return;
  state.robotMode = mode;
  logDebug("robot-mode", { mode, confidence: state.robotTargetConfidence });
  if (mode === "hunt") {
    pushStatus("The air tightens. The robot shifts into a hunt.", 4);
  } else if (mode === "search") {
    pushStatus("Servos whirr as the robot sweeps the area.", 3);
  } else if (mode === "investigate") {
    pushStatus("Footsteps slow. The robot investigates.", 3);
  } else if (mode === "sweep") {
    pushStatus("The robot fans out to nearby halls.", 3);
  }
}

function setRobotMood(mood, ticks) {
  if (!mood || ticks <= 0) return;
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
    persistentBonus: hasPart("Power Cell") ? 1 : 0,
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function logDebug(event, payload) {
  if (!DEBUG_AI) return;
  console.log(`[AI] ${event}`, payload);
}

function getNightProfile() {
  return NIGHT_PROFILES[state.currentNight] ?? NIGHT_PROFILES[1];
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
  state.stabilizeTargets = [];
  state.stabilizedTargets = new Set();
  state.dataFragmentsFound = new Set();
  state.dataFragmentsNeeded = 0;

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
}

function setCurrentNight(night) {
  const next = clamp(Math.floor(night), 1, 10);
  state.currentNight = next;
  state.nightProfile = getNightProfile();
  if (DEBUG_UI) {
    // Reset mission state for coherent debug night swaps.
    setupMissionForNight();
    state.escapeReady = false;
    state.requiredEscapeSchematic = null;
    state.selectedSchematic = null;
    state.escapeConsoleInspected = false;
  }
  updateNextNightButton();
  updateUI();
  pushStatus(`Night ${next} protocols loaded.`, 3);
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

function triggerOhShit(roomId) {
  if (state.ohShitTriggered || !state.escapeConsoleInspected) return;
  if (rooms[roomId].isExit) return;
  state.ohShitTriggered = true;
  state.robotFocus = roomId;
  registerSignal(roomId, 0.9, { type: "surge", forceLastKnown: true, bleed: true });
  const effects = getPassiveEffects();
  state.persistentSignals.set(roomId, 3 + effects.persistentBonus);
  showObjectiveModal("Power surge! The room erupts in noise.");
  state.runMoments.push("A sudden power surge forced you into the open.");
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

function openMenu() {
  if (state.objectiveBlocked) return;
  dom.menuPanel.classList.add("active");
  dom.menuPanel.setAttribute("aria-hidden", "false");
}

function closeMenu() {
  dom.menuPanel.classList.remove("active");
  dom.menuPanel.setAttribute("aria-hidden", "true");
}

function openMap() {
  if (state.objectiveBlocked) return;
  dom.mapPanel.classList.add("active");
  dom.mapPanel.setAttribute("aria-hidden", "false");
}

function closeMap() {
  dom.mapPanel.classList.remove("active");
  dom.mapPanel.setAttribute("aria-hidden", "true");
  clearSelectedRoom();
}

function openUse() {
  if (state.objectiveBlocked) return;
  dom.usePanel.classList.add("active");
  dom.usePanel.setAttribute("aria-hidden", "false");
}

function closeUse() {
  dom.usePanel.classList.remove("active");
  dom.usePanel.setAttribute("aria-hidden", "true");
}

function openDebug() {
  if (state.objectiveBlocked) return;
  dom.debugPanel.classList.add("active");
  dom.debugPanel.setAttribute("aria-hidden", "false");
}

function closeDebug() {
  dom.debugPanel.classList.remove("active");
  dom.debugPanel.setAttribute("aria-hidden", "true");
}

function openComponent(part) {
  dom.componentTitle.textContent = part;
  dom.componentDetails.textContent = componentDescriptions[part] || "Critical component.";
  dom.componentCount.textContent = `You have ${countInventory(part)}.`;
  dom.componentPanel.classList.add("active");
  dom.componentPanel.setAttribute("aria-hidden", "false");
}

function closeComponent() {
  dom.componentPanel.classList.remove("active");
  dom.componentPanel.setAttribute("aria-hidden", "true");
}

function openTasks() {
  if (state.objectiveBlocked) return;
  dom.tasksPanel.classList.add("active");
  dom.tasksPanel.setAttribute("aria-hidden", "false");
}

function closeTasks() {
  dom.tasksPanel.classList.remove("active");
  dom.tasksPanel.setAttribute("aria-hidden", "true");
}

function showObjectiveModal(text) {
  dom.objectiveModalText.textContent = text;
  dom.objectiveModal.classList.add("active");
  dom.objectiveModal.setAttribute("aria-hidden", "false");
  state.objectiveBlocked = true;
}

function acknowledgeObjective() {
  dom.objectiveModal.classList.remove("active");
  dom.objectiveModal.setAttribute("aria-hidden", "true");
  state.objectiveBlocked = false;
  if (state.robotAlertQueued) {
    showRobotAlert();
  }
}

function queueRobotAlert(text) {
  state.robotAlertText = text;
  if (state.objectiveBlocked || dom.robotAlertModal.classList.contains("active")) {
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
}

function updateRoomActions() {
  dom.roomActions.innerHTML = "";
  const room = rooms[state.playerRoom];
  const actions = [];
  const blocked = state.objectiveBlocked;

  if (state.hidden) {
    actions.push({
      label: "Unhide",
      onClick: () => setHidden(null),
      disabled: blocked,
    });
  }

  const canRewire = !state.hidden &&
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

  if (state.escapeConsoleInspected && room.item && !state.inventory.has(room.item)) {
    actions.push({
      label: `Collect ${room.item}`,
      onClick: () => collectItem(room.id),
      disabled: state.hidden || blocked,
      risk: "Trace",
    });
  }

  if (state.escapeConsoleInspected && room.schematic && !state.foundSchematics.has(room.schematic)) {
    const isDataMission = state.missionType === MISSION_TYPES.DATA;
    const scanLabel = isDataMission
      ? "Recover Data Fragment"
      : `Scan Schematic: ${room.schematic}`;
    actions.push({
      label: scanLabel,
      onClick: () => collectSchematic(room.id),
      disabled: state.hidden || blocked,
      risk: "Quiet",
      highlight: isDataMission,
    });
  }

  if (room.isExit && !state.escapeConsoleInspected) {
    actions.push({
      label: "Inspect Escape Console",
      onClick: () => revealEscapeSchematic(),
      disabled: state.hidden || blocked,
      highlight: true,
      risk: "Exposed",
    });
  }

  if (state.missionType === MISSION_TYPES.STABILIZE && state.escapeConsoleInspected) {
    const target = getStabilizeTarget(room.id);
    if (target && !state.stabilizedTargets.has(room.id)) {
      actions.push({
        label: `Stabilize ${target.room}`,
        onClick: () => stabilizeSystem(target),
        disabled: state.hidden || blocked || !canStabilizeTarget(target),
        highlight: true,
        risk: "Trace",
      });
    }
  }

  room.hideSpots.forEach((spot) => {
    const burned = state.burnedHidingSpots.has(`${room.id}:${spot}`);
    actions.push({
      label: `Hide: ${spot}`,
      onClick: () => setHidden(spot),
      disabled: blocked || (state.hidden && state.hiddenSpot === spot),
      risk: burned ? "Risky" : "Quiet",
    });
  });

  if (state.hidden && state.hiddenTurns >= 2) {
    actions.push({
      label: "Hold Breath",
      onClick: () => holdBreath(),
      disabled: blocked,
      risk: "Risky",
    });
  }

  if (room.siren) {
    actions.push({
      label: `Trigger ${room.siren}`,
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
    button.addEventListener("click", action.onClick);
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
  if (state.stabilizedTargets.size >= state.stabilizeTargets.length) {
    state.escapeReady = true;
  }
  updateUI();
}

function slowRewire() {
  if (!hasPart("Resistors") && !hasPart("Capacitors")) return;
  const current = state.roomSignals.get(state.playerRoom) || 0;
  state.roomSignals.set(state.playerRoom, Math.max(0, current - 0.2));
  state.signalDecayBoost.set(
    state.playerRoom,
    Math.max(state.signalDecayBoost.get(state.playerRoom) || 0, 0.08)
  );
  const profile = getNightProfile();
  registerSignal(state.playerRoom, 0.08 * profile.signalStrength.sneak, {
    type: "rewire",
    lastKnownChance: 0.1,
  });
  pushStatus("You rewire the panel. The static softens.", 3);
  state.turn += 1;
  updateUI();
}

function holdBreath() {
  if (!state.hidden || state.hiddenTurns < 2) return;
  if (state.robotRoom === state.playerRoom && state.robotLookTurns > 0) {
    if (Math.random() < 0.4) {
      attemptKill();
      return;
    }
    registerSignal(state.playerRoom, 0.25, { type: "breath", lastKnownChance: 0.2 });
  }
  state.robotTargetConfidence = Math.max(0, state.robotTargetConfidence - 0.15);
  state.robotPredictionCooldown = Math.max(state.robotPredictionCooldown, 2);
  pushStatus("You go still. The noise thins.", 3);
  state.turn += 1;
  updateUI();
}

function updateDebugUI() {
  const debugLabel = dom.nightSelect?.closest(".night-debug");
  if (debugLabel) {
    debugLabel.classList.toggle("hidden", !DEBUG_UI);
  }
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

function updateEscapeButton() {
  const canEscape = state.escapeReady && rooms[state.playerRoom].isExit && state.isAlive;
  dom.escapeBtn.classList.toggle("hidden", !canEscape);
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

function revealEscapeSchematic() {
  if (state.escapeConsoleInspected) return;
  if (state.missionType === MISSION_TYPES.ESCAPE) {
    const options = craftableItems
      .map((item) => item.name)
      .filter((name) => name !== "Door Jam");
    state.requiredEscapeSchematic = options[Math.floor(Math.random() * options.length)];
    state.selectedSchematic = state.requiredEscapeSchematic;
  }
  state.robotDisabled = false;
  state.escapeConsoleInspected = true;
  if (state.missionType === MISSION_TYPES.ESCAPE) {
    showObjectiveModal(`Objective unlocked: Build ${state.requiredEscapeSchematic}.`);
  } else if (state.missionType === MISSION_TYPES.STABILIZE) {
    showObjectiveModal("Objective unlocked: Stabilize core systems.");
  } else {
    showObjectiveModal("Objective unlocked: Recover data fragments.");
  }
  queueRobotAlert("Warning: Robot online.");
  updateUI();
}

function assignRoomFinds() {
  rooms.forEach((room) => {
    room.item = undefined;
    room.schematic = undefined;
  });
  const availableRooms = rooms.filter((room) => !room.isExit);
  const shuffled = [...availableRooms].sort(() => Math.random() - 0.5);
  requiredParts.forEach((part, index) => {
    if (shuffled[index]) {
      shuffled[index].item = part;
    }
  });
  const schematicRooms = shuffled.slice(requiredParts.length);
  craftableItems.forEach((item, index) => {
    if (schematicRooms[index]) {
      schematicRooms[index].schematic = item.name;
    }
  });
}

function getObjectiveText() {
  if (!state.escapeConsoleInspected) {
    return "Inspect the Escape Workshop console to receive your mission.";
  }
  if (state.missionType === MISSION_TYPES.ESCAPE) {
    if (!state.escapeReady && state.requiredEscapeSchematic) {
      return `Find and build the ${state.requiredEscapeSchematic} schematic, then escape.`;
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
      return `Stabilize ${done}/${total} systems (${targets}), then escape.`;
    }
  }
  if (state.missionType === MISSION_TYPES.DATA) {
    const done = state.dataFragmentsFound.size;
    const total = state.dataFragmentsNeeded;
    if (!state.escapeReady) {
      return `Recover ${done}/${total} data fragments to assemble the Lock Override.`;
    }
  }
  if (state.escapeReady) {
    return "Return to the Escape Workshop and press Escape.";
  }
  return "Explore the factory and collect components.";
}

function isPlayerTraveling() {
  return state.playerPath.length > 0 || state.playerTravelStepStart !== null;
}

function movePlayer(roomId, isRun) {
  if (!state.isAlive || state.hasEscaped) return;
  if (state.objectiveBlocked) return;
  if (roomId === state.playerRoom) return;
  const path = getShortestPath(state.playerRoom, roomId);
  if (path.length <= 1) return;
  state.playerPath = path.slice(1);
  state.playerTravelMode = isRun ? "run" : "sneak";
  state.playerTravelTotal = state.playerPath.length;
  startPlayerTravelStep();
  state.selectedRoom = roomId;
  updateUI();
}

function setRoutePreview(roomId) {
  if (!state.isAlive || state.hasEscaped) return;
  state.routePreviewRoom = roomId;
  updateMap();
}

function setSelectedRoom(roomId) {
  if (!state.isAlive || state.hasEscaped) return;
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
  if (state.selectedRoom === null) return;
  movePlayer(state.selectedRoom, isRun);
}

function clearSelectedRoom() {
  state.selectedRoom = null;
  updateUI();
}

function collectItem(roomId) {
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

function collectSchematic(roomId) {
  if (state.hidden) return;
  const room = rooms[roomId];
  if (room.schematic && !state.foundSchematics.has(room.schematic)) {
    state.foundSchematics.add(room.schematic);
    const profile = getNightProfile();
    const strength = 0.2 * profile.signalStrength.sneak;
    registerSignal(roomId, strength, { type: "scan", lastKnownChance: 0.12 });
    if (state.missionType === MISSION_TYPES.DATA && state.escapeConsoleInspected) {
      if (!state.dataFragmentsFound.has(roomId)) {
        state.dataFragmentsFound.add(roomId);
        if (state.dataFragmentsFound.size >= state.dataFragmentsNeeded) {
          state.escapeReady = true;
          pushStatus("Lock Override assembled from fragments.", 3);
        }
      }
    }
  }
  updateUI();
}

function setHidden(spot) {
  if (!state.isAlive || state.hasEscaped) return;
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

function handleAction(action) {
  if (!state.isAlive || state.hasEscaped) return;
  if (state.objectiveBlocked) return;
  if (action === "hide") {
    const room = rooms[state.playerRoom];
    setHidden(room.hideSpots[0]);
  }

  if (action === "scan" || action === "noise") {
    if (action === "scan" && state.hidden && state.robotRoom === state.playerRoom) {
      triggerDeath();
      return;
    }
    if (action === "noise" && state.noiseLures <= 0) return;
    useDevice(action);
  }
  state.turn += 1;
  updateUI();
}

function useDevice(type) {
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

  const availableRooms = rooms
    .filter((room) => room.id !== state.playerRoom)
    .map((room) => room.id);
  const diversion = availableRooms[Math.floor(Math.random() * availableRooms.length)];
  state.robotFocus = diversion;
  applyRobotPause("distract");
  if (type === "scan") {
    registerSignal(state.playerRoom, 0.3 * profile.signalStrength.device * strengthMultiplier);
    state.scanFocusRoom = pickScannerFocusRoom();
    state.scanPulseTicks = 3;
    if (state.scanFocusRoom !== null) {
      pushStatus(`Scanner sweep: attention toward ${rooms[state.scanFocusRoom].name}.`, 3);
    }
  }
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

  if (runRobotTask()) {
    return;
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

  const target = pickRobotTarget();
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
    const roamRooms = roomConnections[state.robotRoom].filter((id) => id !== state.robotRoom);
    if (Math.random() < 0.4 && roamRooms.length > 0) {
      const roamTarget = roamRooms[Math.floor(Math.random() * roamRooms.length)];
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
  closeMap();
  state.runSummary = buildRunSummary("loss");
  dom.deathSummary.textContent = state.runSummary;
  dom.deathScreen.classList.add("active");
  dom.deathScreen.setAttribute("aria-hidden", "false");
}

function buildEscape() {
  if (!state.isAlive || state.hasEscaped) return;
  if (!rooms[state.playerRoom].isExit || !state.escapeReady) return;
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
  if (state.currentNight >= 10) {
    state.currentNight = 1;
  } else {
    state.currentNight = Math.min(10, state.currentNight + 1);
  }
  state.nightProfile = getNightProfile();
  resetGame();
}

function resetGame() {
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
  state.devicesUnlocked = true;
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
  state.robotMode = "idle";
  state.robotTargetConfidence = 0;
  state.robotSweepCooldown = 0;
  state.robotPredictionCooldown = 0;
  state.robotMood = null;
  state.robotMoodTicks = 0;
  state.nightProfile = getNightProfile();
  state.completedNight = null;
  state.sawPlayerHide = false;
  state.robotDisabled = true;
  state.alertTicks = 0;
  state.statusMessage = "";
  state.statusTicks = 0;
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
  state.stabilizeTargets = [];
  state.stabilizedTargets = new Set();
  state.dataFragmentsNeeded = 0;
  state.dataFragmentsFound = new Set();
  state.robotTask = null;
  state.robotFocusLinger = 0;
  state.scanPulseTicks = 0;
  state.scanFocusRoom = null;
  state.hiddenTurns = 0;
  state.lastMoveType = "sneak";
  state.ohShitTriggered = false;
  state.runMoments = [];
  state.runSummary = "";
  assignRoomFinds();
  setupMissionForNight();
  dom.deathScreen.classList.remove("active");
  dom.deathScreen.setAttribute("aria-hidden", "true");
  dom.deathSummary.textContent = "";
  dom.victoryScreen.classList.remove("active");
  dom.victoryScreen.setAttribute("aria-hidden", "true");
  dom.victorySummary.textContent = "";
  dom.robotAlertModal.classList.remove("active");
  dom.robotAlertModal.setAttribute("aria-hidden", "true");
  updateUI();
  showObjectiveModal(getObjectiveText());
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
  const {
    type = "ambient",
    forceLastKnown = false,
    lastKnownChance = null,
    bleed = false,
  } = options;
  const current = state.roomSignals.get(roomId) || 0;
  const scaledStrength = strength * profile.confidenceGain;
  const next = Math.min(1, current + scaledStrength);
  state.roomSignals.set(roomId, next);
  if (type === "sneak") {
    state.signalDecayBoost.set(
      roomId,
      Math.max(state.signalDecayBoost.get(roomId) || 0, profile.sneakDecayBoost)
    );
  }
  if (current < 0.6 && next >= 0.6) {
    pushStatus("A pressure spike ripples through the halls.", 3);
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
    const neighbors = roomConnections[roomId] || [];
    neighbors.forEach((neighbor) => {
      scheduleSignal(
        neighbor,
        scaledStrength * 0.35 * bleedBoost,
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
  state.roomSignals.forEach((value, roomId) => {
    const boost = state.signalDecayBoost.get(roomId) || 0;
    const next = Math.max(0, value - profile.signalDecay - boost * profile.confidenceDecay);
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
  state.robotSweepQueue = shuffled.slice(0, count);
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
  const signals = Array.from(state.roomSignals.entries()).sort((a, b) => b[1] - a[1]);
  for (const [roomId, value] of signals) {
    if (value <= 0.2) continue;
    if (!state.robotCheckedCooldown.has(roomId)) return roomId;
    if (value >= 0.7) return roomId;
  }

  if (state.trailTurns > 0 && state.lastKnownPlayerRoom !== null) {
    const confidence = getRoomConfidence(state.lastKnownPlayerRoom);
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
    const confidence = getRoomConfidence(state.lastKnownPlayerRoom);
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
  const profile = getNightProfile();
  const effects = getPassiveEffects();
  state.robotFocus = roomId;
  registerSignal(roomId, 0.6 * profile.signalStrength.device * effects.signalSpike, {
    type: "siren",
    forceLastKnown: true,
    bleed: true,
  });
  state.persistentSignals.set(roomId, 4 + effects.persistentBonus);
  state.turn += 1;
  updateUI();
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

function robotStatusLabel() {
  if (state.robotDisabled) return "Robot: Disabled";
  if (state.robotDormant > 0) return "Robot: Pausing";
  if (state.robotTask) return "Robot: Recalibrating";
  if (state.robotSearchTurns > 0) {
    return state.robotSearchSpot
      ? `Robot: Searching ${state.robotSearchSpot}`
      : "Robot: Searching";
  }
  if (state.robotInvestigateTurns > 0) return "Robot: Investigating";
  if (state.robotSweepQueue.length > 0) return "Robot: Sweeping halls";
  if (state.robotLookTurns > 0) return "Robot: Scanning halls";
  if (state.robotLinger > 0) return "Robot: Lurking";
  if (state.robotFocus !== null) return `Robot: Distracted by ${rooms[state.robotFocus].name}`;
  return "Robot: Searching";
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
    group.appendChild(poi);
    group.addEventListener("click", () => {
      setRoutePreview(room.id);
      setSelectedRoom(room.id);
    });
    svg.appendChild(group);
  });
}

function updateMap() {
  const path = state.routePreviewRoom === null
    ? []
    : getShortestPath(state.playerRoom, state.routePreviewRoom);
  const robotPath = state.robotPlannedTarget === null
    ? []
    : getShortestPath(state.robotRoom, state.robotPlannedTarget);
  const playerTravelPath = state.playerPath.length > 0
    ? [state.playerRoom, ...state.playerPath]
    : [];
  const robotTravelPath = state.robotPath.length > 0
    ? [state.robotRoom, ...state.robotPath]
    : [];
  const edges = new Set();
  for (let i = 0; i < path.length - 1; i += 1) {
    const a = Math.min(path[i], path[i + 1]);
    const b = Math.max(path[i], path[i + 1]);
    edges.add(`${a}-${b}`);
  }
  const robotEdges = new Set();
  for (let i = 0; i < robotPath.length - 1; i += 1) {
    const a = Math.min(robotPath[i], robotPath[i + 1]);
    const b = Math.max(robotPath[i], robotPath[i + 1]);
    robotEdges.add(`${a}-${b}`);
  }
  const playerTravelEdges = new Set();
  for (let i = 0; i < playerTravelPath.length - 1; i += 1) {
    const a = Math.min(playerTravelPath[i], playerTravelPath[i + 1]);
    const b = Math.max(playerTravelPath[i], playerTravelPath[i + 1]);
    playerTravelEdges.add(`${a}-${b}`);
  }
  const robotTravelEdges = new Set();
  for (let i = 0; i < robotTravelPath.length - 1; i += 1) {
    const a = Math.min(robotTravelPath[i], robotTravelPath[i + 1]);
    const b = Math.max(robotTravelPath[i], robotTravelPath[i + 1]);
    robotTravelEdges.add(`${a}-${b}`);
  }
  const playerEdge = currentTravelEdge(state.playerRoom, state.playerPath);
  const suppressPreviewEdge = playerEdge?.key ?? null;

  dom.floorplanMap.querySelectorAll(".map-link").forEach((line) => {
    const edge = line.getAttribute("data-edge");
    const showPreview = edges.has(edge) && edge !== suppressPreviewEdge;
    line.classList.toggle("active", showPreview);
    line.classList.toggle("robot-plan", robotEdges.has(edge));
    line.classList.toggle("edge-jammed", state.jammedEdges.has(edge));
  });
  dom.floorplanMap.querySelectorAll(".map-jam").forEach((marker) => {
    const edge = marker.getAttribute("data-edge");
    marker.classList.toggle("active", state.jammedEdges.has(edge));
  });
  dom.floorplanMap.querySelectorAll(".map-travel").forEach((line) => {
    applyTravelProgress(line, line.getAttribute("data-edge"));
  });

  const playerAdjacents = new Set(roomConnections[state.playerRoom]);
  const showRobotVision = state.robotDormant === 0 && state.robotLookTurns > 0;
  const robotAdjacents = showRobotVision ? new Set(roomConnections[state.robotRoom]) : new Set();
  dom.floorplanMap.querySelectorAll(".map-node").forEach((node) => {
    const roomId = Number(node.getAttribute("data-room-id"));
    const pressure = getRoomPressure(roomId);
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
    node.classList.toggle("adjacent", playerAdjacents.has(roomId));
    node.classList.toggle("robot-adjacent", showRobotVision && roomId === state.robotScanTarget);
    node.classList.toggle("robot-target", roomId === state.robotPlannedTarget);
    node.classList.toggle("robot-sweep", state.robotSweepQueue.includes(roomId));
    node.classList.toggle("scan-focus", state.scanPulseTicks > 0 && roomId === state.scanFocusRoom);
    const poi = node.querySelector(".map-poi");
    if (poi) {
      const room = rooms[roomId];
      const discoveriesEnabled = state.escapeConsoleInspected;
      const hasItem = discoveriesEnabled && Boolean(room.item) && !state.inventory.has(room.item);
      const hasSchematic = discoveriesEnabled &&
        Boolean(room.schematic) &&
        !state.foundSchematics.has(room.schematic);
      const isExit = Boolean(room.isExit);
      let marker = "";
      if (isExit) {
        marker = "⎋";
      } else if (hasSchematic) {
        marker = "◇";
      } else if (hasItem) {
        marker = "●";
      }
      poi.textContent = marker;
      poi.classList.toggle("poi-item", hasItem && !isExit && !hasSchematic);
      poi.classList.toggle("poi-schematic", hasSchematic && !isExit);
      poi.classList.toggle("poi-exit", isExit);
      const allowBlink = !state.objectiveBlocked;
      const shouldBlink = allowBlink && (hasItem || hasSchematic || (isExit && state.escapeReady));
      poi.classList.toggle("poi-blink", shouldBlink);
      poi.classList.toggle("poi-exit-ready", isExit && state.escapeReady);
    }
  });

  updateRouteInfo(path);
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

function updateRouteInfo(path) {
  if (state.routePreviewRoom === null) {
    dom.routeInfo.textContent = "";
    return;
  }
  if (state.routePreviewRoom === state.playerRoom) {
    dom.routeInfo.textContent = "You are already here. Select another room for a route.";
    return;
  }
  if (path.length === 0) {
    dom.routeInfo.textContent = "No route found. Randomize the layout to regenerate paths.";
    return;
  }
  const routeNames = path.map((id) => rooms[id].name).join(" → ");
  dom.routeInfo.textContent = `Route: ${routeNames}`;
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
  return state.jammedEdges.has(edgeKey(a, b));
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
    roomConnections[current].forEach((neighbor) => {
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
    for (const neighbor of roomConnections[current]) {
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
  if (!state.foundSchematics.has(craftable.name)) return;
  if (craftable.name !== "Door Jam" && state.craftedItems.has(craftable.name)) return;
  if (!craftable.parts.every((part) => state.inventory.has(part))) return;
  craftable.parts.forEach((part) => state.inventory.delete(part));
  if (craftable.name === "Door Jam") {
    state.doorJams += 1;
  } else {
    state.craftedItems.add(craftable.name);
  }
  if (state.requiredEscapeSchematic === craftable.name) {
    state.escapeReady = true;
  }
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
    if (state.trailTurns > 0) {
      state.trailTurns -= 1;
    }
    if (state.alertTicks > 0) {
      state.alertTicks -= 1;
    }
    tickStatus();
    if (state.hidden) {
      state.hiddenTurns += 1;
    } else {
      state.hiddenTurns = 0;
    }
    if (state.scanPulseTicks > 0) {
      state.scanPulseTicks -= 1;
      if (state.scanPulseTicks === 0) {
        state.scanFocusRoom = null;
      }
    }
    tickPlayerTravel();
    tickRobotTravel();
    processPendingSignals();
    tickPersistentSignals();
    decaySignals();
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
  const options = [];
  if (state.devicesUnlocked) {
    options.push(
      { label: "Pulse Scanner (∞)", action: () => handleAction("scan"), help: "Pulse Scanner" },
      { label: `Noise Lure (${state.noiseLures})`, action: () => handleAction("noise"), help: "Noise Lure" }
    );
  }
  if (state.doorJams > 0) {
    const adjacent = roomConnections[state.playerRoom] || [];
    adjacent.forEach((roomId) => {
      const disallowed = rooms[roomId].isExit || rooms[state.playerRoom].isExit;
      if (disallowed) return;
      const blocked = isEdgeJammed(state.playerRoom, roomId);
      const disabled = blocked || isPlayerTraveling();
      options.push({
        label: `Jam door to ${rooms[roomId].name} (${state.doorJams})`,
        action: () => jamDoorTo(roomId),
        help: "Door Jam",
        disabled,
      });
    });
  }
  state.craftedItems.forEach((item) => {
    options.push({ label: item, action: () => useCraftedItem(item), help: item });
  });

  if (options.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No usable items.";
    dom.useList.appendChild(empty);
    return;
  }

  options.forEach((item) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = `Use ${item.label}`;
    if (item.disabled) {
      button.disabled = true;
    }
    button.addEventListener("click", item.action);
    li.appendChild(button);
    const help = document.createElement("button");
    help.textContent = "Help";
    help.addEventListener("click", () => openComponent(item.help));
    li.appendChild(help);
    dom.useList.appendChild(li);
  });
}

function useCraftedItem(name) {
  if (!state.craftedItems.has(name)) return;
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

function handleEscape() {
  if (!state.escapeReady) return;
  if (!rooms[state.playerRoom].isExit) return;
  buildEscape();
}

function tickPlayerTravel() {
  if (state.playerPath.length === 0) {
    state.playerTravelStepStart = null;
    state.playerTravelStepDuration = 0;
    return;
  }
  if (!state.playerTravelStepStart) {
    startPlayerTravelStep();
    return;
  }
  const elapsed = Date.now() - state.playerTravelStepStart;
  if (elapsed < state.playerTravelStepDuration) return;
  const nextRoom = state.playerPath.shift();
  state.playerRoom = nextRoom;
  state.hidden = false;
  state.hiddenSpot = null;
  state.hiddenTurns = 0;
  updatePlayerTrail(nextRoom);
  const profile = getNightProfile();
  const effects = getPassiveEffects();
  const isRun = state.playerTravelMode === "run";
  // Ensure lastMoveType is based on the resolved travel mode.
  state.lastMoveType = isRun ? "run" : "sneak";
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
  triggerOhShit(nextRoom);
  state.turn += 1;
  logDebug("player-move", {
    room: nextRoom,
    type: isRun ? "run" : "sneak",
    trailTurns: state.trailTurns,
    lastKnown: state.lastKnownPlayerRoom,
  });
  if (state.playerPath.length === 0) {
    clearSelectedRoom();
    state.playerTravelTotal = 0;
    state.playerTravelStepStart = null;
    state.playerTravelStepDuration = 0;
  } else {
    startPlayerTravelStep();
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
  state.robotRoom = nextRoom;
  markRoomChecked(state.robotRoom);
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
  state.robotDisabled = !state.robotDisabled;
  dom.toggleRobotBtn.textContent = state.robotDisabled ? "Enable Robot" : "Disable Robot";
  if (!state.robotDisabled) {
    queueRobotAlert("Warning: Robot online.");
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

init();
