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
];

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

const state = {
  playerRoom: 0,
  robotRoom: 13,
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
  playerPath: [],
  playerTravelTicks: 0,
  playerTravelMode: "sneak",
  robotPath: [],
  robotTravelTicks: 0,
  dayCount: 1,
  baseDate: new Date("2326-12-25T00:00:00Z"),
  isAlive: true,
  hasEscaped: false,
};

const dom = {
  threatLevel: document.getElementById("threatLevel"),
  dayCounter: document.getElementById("dayCounter"),
  dateLabel: document.getElementById("dateLabel"),
  roomLabel: document.getElementById("roomLabel"),
  roomDetails: document.getElementById("roomDetails"),
  roomMedia: document.getElementById("roomMedia"),
  currentRooms: document.querySelectorAll(".current-room"),
  roomDescription: document.getElementById("roomDescription"),
  playerState: document.getElementById("playerState"),
  robotStatuses: document.querySelectorAll(".robot-status"),
  roomActions: document.getElementById("roomActions"),
  inventoryList: document.getElementById("inventoryList"),
  schematicInventory: document.getElementById("schematicInventory"),
  schematicList: document.getElementById("schematicList"),
  floorplanMap: document.getElementById("floorplanMap"),
  routeInfo: document.getElementById("routeInfo"),
  randomizeBtn: document.getElementById("randomizeBtn"),
  selectedRoom: document.getElementById("selectedRoom"),
  menuBtn: document.getElementById("menuBtn"),
  closeMenuBtn: document.getElementById("closeMenuBtn"),
  menuPanel: document.getElementById("menuPanel"),
  scanBtn: document.getElementById("scanBtn"),
  noiseBtn: document.getElementById("noiseBtn"),
  craftBtn: document.getElementById("craftBtn"),
  buildBtn: document.getElementById("buildBtn"),
  goBtn: document.getElementById("goBtn"),
  runBtn: document.getElementById("runBtn"),
  cancelBtn: document.getElementById("cancelBtn"),
  movementControls: document.getElementById("movementControls"),
  roomActionsPanel: document.getElementById("roomActionsPanel"),
  deathScreen: document.getElementById("deathScreen"),
  victoryScreen: document.getElementById("victoryScreen"),
  restartBtn: document.getElementById("restartBtn"),
};

let gameLoopId = null;

function init() {
  renderMap();
  updateSchematicList();
  updateUI();
  attachEvents();
  startGameLoop();
}

function attachEvents() {
  dom.scanBtn.addEventListener("click", () => handleAction("scan"));
  dom.noiseBtn.addEventListener("click", () => handleAction("noise"));
  dom.craftBtn.addEventListener("click", craftItem);
  dom.buildBtn.addEventListener("click", buildEscape);
  dom.restartBtn.addEventListener("click", resetGame);
  dom.randomizeBtn.addEventListener("click", randomizeLayout);
  dom.goBtn.addEventListener("click", () => moveSelected(false));
  dom.runBtn.addEventListener("click", () => moveSelected(true));
  dom.cancelBtn.addEventListener("click", clearSelectedRoom);
  dom.menuBtn.addEventListener("click", openMenu);
  dom.closeMenuBtn.addEventListener("click", closeMenu);
  dom.menuPanel.addEventListener("click", (event) => {
    if (event.target === dom.menuPanel) {
      closeMenu();
    }
  });
}

function updateUI() {
  const room = rooms[state.playerRoom];
  const dangerRoom = state.robotRoom === state.playerRoom;
  const connections = roomConnections[state.playerRoom]
    .map((id) => rooms[id].name)
    .join(", ");
  dom.currentRooms.forEach((node) => {
    node.textContent = room.name;
  });
  dom.roomDescription.textContent = room.description;
  dom.roomLabel.textContent = dangerRoom ? "Robot Detected" : "Camera Feed";
  dom.roomDetails.textContent = dangerRoom
    ? "Metal steps are right outside your hiding spot."
    : `Connected: ${connections}. Static rolls across the feed. The robot is never far.`;
  dom.roomMedia.style.background = "transparent";
  document.body.style.setProperty("--room-theme", room.theme);
  dom.playerState.textContent = state.hidden
    ? `Status: Hidden (${state.hiddenSpot ?? "Unknown"}).`
    : "Status: Exposed";
  dom.robotStatuses.forEach((node) => {
    node.textContent = robotStatusLabel();
  });
  dom.threatLevel.textContent = threatLabel();
  dom.dayCounter.textContent = `Day ${String(state.dayCount).padStart(2, "0")}`;
  dom.dateLabel.textContent = formatDate(state.baseDate, state.dayCount);
  dom.selectedRoom.textContent = state.selectedRoom === null
    ? "None"
    : rooms[state.selectedRoom].name;
  updateInventoryList();
  updateSchematicsInventory();
  updateRoomActions();
  updatePanels();
  updateMap();
  updateBuildButton();
  updateCraftButton();
  updateMoveButtons();
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
    const label = document.createElement("span");
    label.textContent = "Schematic";
    li.textContent = item;
    li.appendChild(label);
    dom.schematicInventory.appendChild(li);
  });
}

function updateSchematicList() {
  dom.schematicList.innerHTML = "";
  requiredParts.forEach((part) => {
    const li = document.createElement("li");
    li.textContent = part;
    li.dataset.part = part;
    dom.schematicList.appendChild(li);
  });
}

function updateBuildButton() {
  const isExit = rooms[state.playerRoom].isExit;
  const hasAllParts = requiredParts.every((part) => state.inventory.has(part));
  dom.buildBtn.disabled = !(isExit && hasAllParts && state.isAlive && !state.hasEscaped);
  dom.buildBtn.textContent = hasAllParts
    ? "Build Escape Schematic"
    : "Need More Components";
}

function updateCraftButton() {
  const craftable = craftableItems.some(
    (item) =>
      state.foundSchematics.has(item.name) &&
      !state.craftedItems.has(item.name) &&
      item.parts.every((part) => state.inventory.has(part))
  );
  dom.craftBtn.disabled = !craftable || !state.isAlive || state.hasEscaped;
  dom.craftBtn.textContent = craftable ? "Craft Item" : "Need Schematic + Parts";
}

function updateMoveButtons() {
  const canMove = state.selectedRoom !== null &&
    getShortestPath(state.playerRoom, state.selectedRoom).length > 1;
  const blocked = !canMove || !state.isAlive || state.hasEscaped || state.playerTravelTicks > 0;
  dom.goBtn.disabled = blocked;
  dom.runBtn.disabled = blocked;
}

function updatePanels() {
  const showMovement = state.selectedRoom !== null;
  dom.movementControls.classList.toggle("hidden", !showMovement);
  dom.roomActionsPanel.classList.toggle("hidden", showMovement);
}

function openMenu() {
  dom.menuPanel.classList.add("active");
  dom.menuPanel.setAttribute("aria-hidden", "false");
}

function closeMenu() {
  dom.menuPanel.classList.remove("active");
  dom.menuPanel.setAttribute("aria-hidden", "true");
}

function updateRoomActions() {
  dom.roomActions.innerHTML = "";
  const room = rooms[state.playerRoom];
  const actions = [];

  if (state.hidden) {
    actions.push({
      label: "Unhide",
      onClick: () => setHidden(null),
      disabled: false,
    });
  }

  if (room.item && !state.inventory.has(room.item)) {
    actions.push({
      label: `Collect ${room.item}`,
      onClick: () => collectItem(room.id),
      disabled: state.hidden,
    });
  }

  if (room.schematic && !state.foundSchematics.has(room.schematic)) {
    actions.push({
      label: `Scan Schematic: ${room.schematic}`,
      onClick: () => collectSchematic(room.id),
      disabled: state.hidden,
    });
  }

  room.hideSpots.forEach((spot) => {
    actions.push({
      label: `Hide: ${spot}`,
      onClick: () => setHidden(spot),
      disabled: state.hidden && state.hiddenSpot === spot,
    });
  });

  if (room.siren) {
    actions.push({
      label: `Trigger ${room.siren}`,
      onClick: () => triggerSiren(room.id),
      disabled: false,
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
    button.textContent = action.label;
    button.disabled = action.disabled;
    button.addEventListener("click", action.onClick);
    dom.roomActions.appendChild(button);
  });
}

function movePlayer(roomId, isRun) {
  if (!state.isAlive || state.hasEscaped) return;
  if (roomId === state.playerRoom) return;
  const path = getShortestPath(state.playerRoom, roomId);
  if (path.length <= 1) return;
  state.playerPath = path.slice(1);
  state.playerTravelMode = isRun ? "run" : "sneak";
  state.playerTravelTicks = isRun ? 1 : 2;
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
  }
  updateUI();
}

function collectSchematic(roomId) {
  if (state.hidden) return;
  const room = rooms[roomId];
  if (room.schematic && !state.foundSchematics.has(room.schematic)) {
    state.foundSchematics.add(room.schematic);
  }
  updateUI();
}

function setHidden(spot) {
  if (!state.isAlive || state.hasEscaped) return;
  if (!spot) {
    state.hidden = false;
    state.hiddenSpot = null;
    updateUI();
    return;
  }
  state.hidden = true;
  state.hiddenSpot = spot;
  const hideCount = state.hideHistory.get(state.playerRoom) || 0;
  const nextCount = hideCount + 1;
  state.hideHistory.set(state.playerRoom, nextCount);
  if (nextCount >= 3) {
    state.learnedHidingSpots.add(state.playerRoom);
  }
  registerSignal(state.playerRoom, 0.2);
  updateUI();
}

function handleAction(action) {
  if (!state.isAlive || state.hasEscaped) return;
  if (action === "hide") {
    const room = rooms[state.playerRoom];
    setHidden(room.hideSpots[0]);
  }

  if (action === "scan" || action === "noise") {
    useDevice(action);
  }
  state.turn += 1;
  updateUI();
}

function useDevice(type) {
  const device = deviceTypes[type];
  const history = state.usedDevices.get(type) || [];
  history.push(state.turn);
  state.usedDevices.set(type, history.slice(-4));

  if (deviceLearned(type)) {
    state.robotFocus = null;
    return;
  }

  const availableRooms = rooms
    .filter((room) => room.id !== state.playerRoom)
    .map((room) => room.id);
  const diversion = availableRooms[Math.floor(Math.random() * availableRooms.length)];
  state.robotFocus = diversion;
  if (type === "scan") {
    registerSignal(state.playerRoom, 0.3);
  }
  if (type === "noise") {
    registerSignal(diversion, 0.4);
  }
}

function deviceLearned(type) {
  const history = state.usedDevices.get(type) || [];
  const recentUses = history.filter((turn) => state.turn - turn <= 4);
  return recentUses.length >= 3;
}

function advanceRobot() {
  if (state.robotDormant > 0) {
    state.robotDormant -= 1;
    return;
  }

  if (state.robotTravelTicks > 0) {
    state.robotTravelTicks -= 1;
    return;
  }

  if (state.robotLinger > 0) {
    state.robotLinger -= 1;
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
    return;
  }

  if (state.robotLookTurns > 0) {
    state.robotLookTurns -= 1;
    return;
  }

  const target = pickRobotTarget();
  const aggressive = state.threat >= 3;
  const willMoveToward = target !== null && (aggressive || Math.random() > 0.8);

  if (willMoveToward && target !== null) {
    state.robotPlannedTarget = target;
    state.robotPath = getShortestPath(state.robotRoom, target).slice(1);
    state.robotTravelTicks = Math.floor(Math.random() * 2) + 2;
    state.robotLookTurns = Math.floor(Math.random() * 3) + 2;
  } else {
    state.robotPlannedTarget = null;
    const roamRooms = roomConnections[state.robotRoom].filter((id) => id !== state.robotRoom);
    if (Math.random() < 0.4 && roamRooms.length > 0) {
      const roamTarget = roamRooms[Math.floor(Math.random() * roamRooms.length)];
      state.robotPath = [roamTarget];
      state.robotTravelTicks = Math.floor(Math.random() * 2) + 2;
    }
    state.robotLinger = Math.floor(Math.random() * 9) + 8;
  }

  if (state.robotRoom === state.playerRoom && state.robotFocus) {
    state.robotFocus = null;
  }

  state.checkedRooms.add(state.robotRoom);
}

function checkThreat() {
  if (state.robotRoom !== state.playerRoom) return;
  if (state.robotSearchTurns > 0) {
    if (!state.hidden || state.hiddenSpot === state.robotSearchSpot) {
      attemptKill();
    }
    return;
  }

  const learned = state.learnedHidingSpots.has(state.playerRoom);
  const signal = state.roomSignals.get(state.playerRoom) || 0;
  const baseChance = state.hidden ? (learned ? 0.55 : 0.35) : 0.75;
  const killChance = Math.min(0.9, baseChance + signal * 0.3);
  const killed = Math.random() < killChance;
  if (killed) {
    triggerDeath();
  } else {
    state.threat = Math.min(5, state.threat + 0.5);
    if (Math.random() < 0.5) {
      state.robotLinger = Math.floor(Math.random() * 3) + 1;
    }
  }
}

function attemptKill() {
  const learned = state.learnedHidingSpots.has(state.playerRoom);
  const signal = state.roomSignals.get(state.playerRoom) || 0;
  const baseChance = state.hidden ? (learned ? 0.5 : 0.3) : 0.7;
  const killChance = Math.min(0.85, baseChance + signal * 0.4);
  if (Math.random() < killChance) {
    triggerDeath();
  } else if (Math.random() < 0.4) {
    state.robotLinger = Math.floor(Math.random() * 2) + 1;
  }
}

function triggerDeath() {
  state.isAlive = false;
  dom.deathScreen.classList.add("active");
  dom.deathScreen.setAttribute("aria-hidden", "false");
}

function buildEscape() {
  if (!state.isAlive || state.hasEscaped) return;
  const hasAllParts = requiredParts.every((part) => state.inventory.has(part));
  if (!rooms[state.playerRoom].isExit || !hasAllParts) return;
  state.hasEscaped = true;
  state.dayCount += 1;
  dom.victoryScreen.classList.add("active");
  dom.victoryScreen.setAttribute("aria-hidden", "false");
}

function resetGame() {
  state.playerRoom = 0;
  state.robotRoom = 13;
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
  state.roomSignals.clear();
  state.checkedRooms.clear();
  state.robotLinger = 0;
  state.robotDormant = 0;
  state.robotSearchTurns = 0;
  state.robotSearchSpot = null;
  state.robotPlannedTarget = null;
  state.robotLookTurns = 0;
  state.playerPath = [];
  state.playerTravelTicks = 0;
  state.playerTravelMode = "sneak";
  state.robotPath = [];
  state.robotTravelTicks = 0;
  state.dayCount = 1;
  state.isAlive = true;
  state.hasEscaped = false;
  dom.deathScreen.classList.remove("active");
  dom.deathScreen.setAttribute("aria-hidden", "true");
  dom.victoryScreen.classList.remove("active");
  dom.victoryScreen.setAttribute("aria-hidden", "true");
  updateUI();
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

function registerSignal(roomId, strength) {
  const current = state.roomSignals.get(roomId) || 0;
  const next = Math.min(1, current + strength);
  state.roomSignals.set(roomId, next);
  if (Math.random() < next) {
    state.lastKnownPlayerRoom = roomId;
    state.trailTurns = 2;
  }
  if (roomId !== state.robotRoom && next >= 0.4) {
    interruptRobotTask(roomId);
  }
}

function decaySignals() {
  state.roomSignals.forEach((value, roomId) => {
    const next = Math.max(0, value - 0.08);
    if (next === 0) {
      state.roomSignals.delete(roomId);
    } else {
      state.roomSignals.set(roomId, next);
    }
  });
}

function pickRobotTarget() {
  if (state.robotFocus !== null) return state.robotFocus;
  const signals = Array.from(state.roomSignals.entries()).sort((a, b) => b[1] - a[1]);
  for (const [roomId, value] of signals) {
    if (value <= 0.2) continue;
    if (!state.checkedRooms.has(roomId)) return roomId;
    if (value >= 0.7) return roomId;
  }

  if (state.trailTurns > 0 && state.lastKnownPlayerRoom !== null) {
    const confidence = getRoomConfidence(state.lastKnownPlayerRoom);
    if (!state.checkedRooms.has(state.lastKnownPlayerRoom) || confidence >= 0.7) {
      return state.lastKnownPlayerRoom;
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
}

function pickSearchSpot() {
  const spots = rooms[state.robotRoom].hideSpots;
  if (!spots || spots.length === 0) return null;
  return spots[Math.floor(Math.random() * spots.length)];
}

function triggerSiren(roomId) {
  if (!state.isAlive || state.hasEscaped) return;
  state.robotFocus = roomId;
  registerSignal(roomId, 0.6);
  state.turn += 1;
  updateUI();
}

function interruptRobotTask(roomId) {
  state.robotLinger = 0;
  state.robotSearchTurns = 0;
  state.robotSearchSpot = null;
  state.robotLookTurns = 0;
  state.robotFocus = roomId;
}

function robotStatusLabel() {
  if (state.robotDormant > 0) return "Robot: Powered down";
  if (state.robotSearchTurns > 0) {
    return state.robotSearchSpot
      ? `Robot: Searching ${state.robotSearchSpot}`
      : "Robot: Searching";
  }
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
    });
  });

  rooms.forEach((room) => {
    const group = createSvgElement("g", {
      class: "map-node",
      "data-room-id": room.id,
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
    const title = room.name.split(" ")[0];
    text.appendChild(createSvgElement("tspan", { x: mapPositions[room.id].x, dy: 4 }, title));
    group.appendChild(circle);
    group.appendChild(text);
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

  dom.floorplanMap.querySelectorAll(".map-link").forEach((line) => {
    const edge = line.getAttribute("data-edge");
    line.classList.toggle("active", edges.has(edge));
    line.classList.toggle("robot-plan", robotEdges.has(edge));
    line.classList.toggle("player-travel", playerTravelEdges.has(edge));
    line.classList.toggle("robot-travel", robotTravelEdges.has(edge));
  });

  const playerAdjacents = new Set(roomConnections[state.playerRoom]);
  const showRobotVision = state.robotDormant === 0 && state.robotLookTurns > 0;
  const robotAdjacents = showRobotVision ? new Set(roomConnections[state.robotRoom]) : new Set();
  dom.floorplanMap.querySelectorAll(".map-node").forEach((node) => {
    const roomId = Number(node.getAttribute("data-room-id"));
    node.classList.toggle("active", roomId === state.playerRoom);
    node.classList.toggle("alert", roomId === state.robotRoom && state.robotDormant === 0);
    node.classList.toggle("preview", roomId === state.routePreviewRoom);
    node.classList.toggle("adjacent", playerAdjacents.has(roomId));
    node.classList.toggle("robot-adjacent", robotAdjacents.has(roomId));
  });

  updateRouteInfo(path);
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

function getShortestPath(start, target) {
  if (start === target) return [start];
  const queue = [start];
  const visited = new Set([start]);
  const parent = new Map();

  while (queue.length) {
    const current = queue.shift();
    if (current === target) break;
    roomConnections[current].forEach((neighbor) => {
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
  const craftable = craftableItems.find(
    (item) =>
      state.foundSchematics.has(item.name) &&
      !state.craftedItems.has(item.name) &&
      item.parts.every((part) => state.inventory.has(part))
  );
  if (!craftable) return;
  craftable.parts.forEach((part) => state.inventory.delete(part));
  state.craftedItems.add(craftable.name);
  if (craftable.name === "Signal Scrambler") {
    state.roomSignals.clear();
    state.threat = Math.max(1, state.threat - 0.6);
  }
  if (craftable.name === "Motion Dampener") {
    state.robotLinger = Math.max(state.robotLinger, 2);
  }
  if (craftable.name === "Override Key") {
    state.threat = Math.max(1, state.threat - 1);
  }
  updateUI();
}

function startGameLoop() {
  if (gameLoopId) {
    clearInterval(gameLoopId);
  }
  gameLoopId = setInterval(() => {
    if (!state.isAlive || state.hasEscaped) return;
    state.threat = Math.min(5, state.threat + 0.03);
    if (state.trailTurns > 0) {
      state.trailTurns -= 1;
    }
    tickPlayerTravel();
    tickRobotTravel();
    decaySignals();
    advanceRobot();
    checkThreat();
    tickDormantState();
    updateUI();
  }, 1200);
}

function tickPlayerTravel() {
  if (state.playerTravelTicks > 0) {
    state.playerTravelTicks -= 1;
    return;
  }
  if (state.playerPath.length === 0) return;
  const nextRoom = state.playerPath.shift();
  state.playerRoom = nextRoom;
  state.hidden = false;
  state.hiddenSpot = null;
  const isRun = state.playerTravelMode === "run";
  registerSignal(nextRoom, isRun ? 0.9 : 0.6);
  const noiseBoost = rooms[nextRoom].noiseRisk ?? 0.2;
  if (isRun) {
    registerSignal(nextRoom, noiseBoost);
  }
  state.turn += 1;
  if (state.playerPath.length === 0) {
    clearSelectedRoom();
  } else {
    state.playerTravelTicks = isRun ? 1 : 2;
  }
}

function tickRobotTravel() {
  if (state.robotTravelTicks > 0) {
    return;
  }
  if (state.robotPath.length === 0) return;
  const nextRoom = state.robotPath.shift();
  state.robotRoom = nextRoom;
  state.checkedRooms.add(state.robotRoom);
  if (state.robotPath.length === 0) {
    state.robotTravelTicks = 0;
  } else {
    state.robotTravelTicks = 1;
  }
}

function tickDormantState() {
  if (state.robotDormant > 0) return;
  if (Math.random() < 0.05) {
    state.robotDormant = Math.floor(Math.random() * 3) + 2;
    state.robotLinger = 0;
    state.robotSearchTurns = 0;
    state.robotSearchSpot = null;
    state.robotLookTurns = 0;
  }
}

init();
