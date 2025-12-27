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
  playerTravelTicks: 0,
  playerTravelMode: "sneak",
  playerTravelTotal: 0,
  robotPath: [],
  robotTravelTicks: 0,
  robotTravelStepTotal: 0,
  dayCount: 1,
  baseDate: new Date("2326-12-25T00:00:00Z"),
  isAlive: true,
  hasEscaped: false,
};

const dom = {
  threatLevel: document.getElementById("threatLevel"),
  dateLabel: document.getElementById("dateLabel"),
  roomMedia: document.getElementById("roomMedia"),
  currentRooms: document.querySelectorAll(".current-room"),
  robotStatuses: document.querySelectorAll(".robot-status"),
  alertText: document.getElementById("alertText"),
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
  toggleRobotBtn: document.getElementById("toggleRobotBtn"),
  closeMenuBtn: document.getElementById("closeMenuBtn"),
  closeMapBtn: document.getElementById("closeMapBtn"),
  closeUseBtn: document.getElementById("closeUseBtn"),
  menuPanel: document.getElementById("menuPanel"),
  mapPanel: document.getElementById("mapPanel"),
  usePanel: document.getElementById("usePanel"),
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
  buildBtn: document.getElementById("buildBtn"),
  goBtn: document.getElementById("goBtn"),
  runBtn: document.getElementById("runBtn"),
  cancelBtn: document.getElementById("cancelBtn"),
  movementControls: document.getElementById("movementControls"),
  adjacentMoves: document.getElementById("adjacentMoves"),
  escapeBtn: document.getElementById("escapeBtn"),
  deathScreen: document.getElementById("deathScreen"),
  victoryScreen: document.getElementById("victoryScreen"),
  restartBtn: document.getElementById("restartBtn"),
};

let gameLoopId = null;

function init() {
  renderMap();
  assignRoomFinds();
  updateSchematicList();
  updateUI();
  attachEvents();
  startGameLoop();
  showObjectiveModal(getObjectiveText());
}

function attachEvents() {
  dom.buildBtn.addEventListener("click", craftItem);
  dom.restartBtn.addEventListener("click", resetGame);
  dom.randomizeBtn.addEventListener("click", randomizeLayout);
  dom.goBtn.addEventListener("click", () => moveSelected(false));
  dom.runBtn.addEventListener("click", () => moveSelected(true));
  dom.cancelBtn.addEventListener("click", clearSelectedRoom);
  dom.menuBtn.addEventListener("click", openMenu);
  dom.mapBtn.addEventListener("click", openMap);
  dom.tasksBtn.addEventListener("click", openTasks);
  dom.useBtn.addEventListener("click", openUse);
  dom.toggleRobotBtn.addEventListener("click", toggleRobot);
  dom.closeMenuBtn.addEventListener("click", closeMenu);
  dom.closeMapBtn.addEventListener("click", closeMap);
  dom.closeUseBtn.addEventListener("click", closeUse);
  dom.closeComponentBtn.addEventListener("click", closeComponent);
  dom.closeTasksBtn.addEventListener("click", closeTasks);
  dom.ackObjectiveBtn.addEventListener("click", acknowledgeObjective);
  dom.escapeBtn.addEventListener("click", handleEscape);
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
  dom.roomMedia.style.background = "transparent";
  document.body.style.setProperty("--room-theme", room.theme);
  dom.robotStatuses.forEach((node) => {
    node.textContent = robotStatusLabel();
  });
  dom.alertText.textContent = state.alertTicks > 0 ? "Warning: Robot online." : "";
  dom.alertText.classList.toggle("hidden", state.alertTicks === 0);
  updateTravelStatus();
  dom.threatLevel.textContent = threatLabel();
  dom.dateLabel.textContent = formatDate(state.baseDate, state.dayCount);
  dom.selectedRoom.textContent = state.selectedRoom === null
    ? "None"
    : rooms[state.selectedRoom].name;
  updateInventoryList();
  updateSchematicsInventory();
  updateRequiredComponents();
  updateUseList();
  updateRoomActions();
  updatePanels();
  updateAdjacentMoves();
  updateEscapeButton();
  updateMap();
  updateBuildButton();
  updateMoveButtons();
  dom.toggleRobotBtn.textContent = state.robotDisabled ? "Enable Robot" : "Disable Robot";
  dom.tasksText.textContent = getObjectiveText();
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
  const blocked = !canMove || !state.isAlive || state.hasEscaped || state.playerTravelTicks > 0;
  dom.goBtn.disabled = blocked;
  dom.runBtn.disabled = blocked;
}

function updatePanels() {
  const showMovement = state.selectedRoom !== null;
  dom.movementControls.classList.toggle("hidden", !showMovement);
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

  if (state.escapeConsoleInspected && room.item && !state.inventory.has(room.item)) {
    actions.push({
      label: `Collect ${room.item}`,
      onClick: () => collectItem(room.id),
      disabled: state.hidden || blocked,
    });
  }

  if (state.escapeConsoleInspected && room.schematic && !state.foundSchematics.has(room.schematic)) {
    actions.push({
      label: `Scan Schematic: ${room.schematic}`,
      onClick: () => collectSchematic(room.id),
      disabled: state.hidden || blocked,
    });
  }

  if (room.isExit && !state.requiredEscapeSchematic) {
    actions.push({
      label: "Inspect Escape Console",
      onClick: () => revealEscapeSchematic(),
      disabled: state.hidden || blocked,
      highlight: true,
    });
  }

  room.hideSpots.forEach((spot) => {
    actions.push({
      label: `Hide: ${spot}`,
      onClick: () => setHidden(spot),
      disabled: blocked || (state.hidden && state.hiddenSpot === spot),
    });
  });

  if (room.siren) {
    actions.push({
      label: `Trigger ${room.siren}`,
      onClick: () => triggerSiren(room.id),
      disabled: blocked,
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
    if (action.highlight) {
      button.classList.add("objective-highlight");
    }
    button.addEventListener("click", action.onClick);
    dom.roomActions.appendChild(button);
  });
}

function updateAdjacentMoves() {
  dom.adjacentMoves.innerHTML = "";
  const adjacent = roomConnections[state.playerRoom];
  adjacent.forEach((roomId) => {
    const button = document.createElement("button");
    button.textContent = `Sneak: ${rooms[roomId].name}`;
    button.disabled = state.playerTravelTicks > 0;
    button.addEventListener("click", () => movePlayer(roomId, false));
    dom.adjacentMoves.appendChild(button);
  });
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
  if (state.requiredEscapeSchematic) return;
  const options = craftableItems.map((item) => item.name);
  state.requiredEscapeSchematic = options[Math.floor(Math.random() * options.length)];
  state.selectedSchematic = state.requiredEscapeSchematic;
  state.robotDisabled = false;
  state.alertTicks = 6;
  state.escapeConsoleInspected = true;
  showObjectiveModal(`Objective unlocked: Build ${state.requiredEscapeSchematic}.`);
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
    return "Inspect the Escape Workshop console to learn which schematic is required.";
  }
  if (!state.escapeReady && state.requiredEscapeSchematic) {
    return `Find and build the ${state.requiredEscapeSchematic} schematic, then escape.`;
  }
  if (state.escapeReady) {
    return "Return to the Escape Workshop and press Escape.";
  }
  return "Explore the factory and collect components.";
}

function movePlayer(roomId, isRun) {
  if (!state.isAlive || state.hasEscaped) return;
  if (state.objectiveBlocked) return;
  if (roomId === state.playerRoom) return;
  const path = getShortestPath(state.playerRoom, roomId);
  if (path.length <= 1) return;
  state.playerPath = path.slice(1);
  state.playerTravelMode = isRun ? "run" : "sneak";
  state.playerTravelTicks = isRun ? 1 : 2;
  state.playerTravelTotal = state.playerPath.length;
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
    state.sawPlayerHide = false;
    updateUI();
    return;
  }
  state.hidden = true;
  state.hiddenSpot = spot;
  state.sawPlayerHide = state.robotRoom === state.playerRoom && state.robotLookTurns > 0;
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
    state.noiseLures = Math.max(0, state.noiseLures - 1);
    registerSignal(diversion, 0.4);
  }
}

function deviceLearned(type) {
  const history = state.usedDevices.get(type) || [];
  const recentUses = history.filter((turn) => state.turn - turn <= 4);
  return recentUses.length >= 3;
}

function advanceRobot() {
  if (state.robotDisabled) return;
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
    if (state.robotScanTarget === null) {
      const options = roomConnections[state.robotRoom];
      state.robotScanTarget = options[Math.floor(Math.random() * options.length)];
    }
    return;
  }

  const target = pickRobotTarget();
  const aggressive = state.threat >= 3;
  const willMoveToward = target !== null && (aggressive || Math.random() > 0.8);

  if (willMoveToward && target !== null) {
    state.robotPlannedTarget = target;
    state.robotPath = getShortestPath(state.robotRoom, target).slice(1);
    state.robotTravelTicks = Math.floor(Math.random() * 2) + 2;
    state.robotTravelStepTotal = state.robotTravelTicks;
    state.robotLookTurns = Math.floor(Math.random() * 3) + 2;
    state.robotScanTarget = null;
  } else {
    state.robotPlannedTarget = null;
    const roamRooms = roomConnections[state.robotRoom].filter((id) => id !== state.robotRoom);
    if (Math.random() < 0.4 && roamRooms.length > 0) {
      const roamTarget = roamRooms[Math.floor(Math.random() * roamRooms.length)];
      state.robotPath = [roamTarget];
      state.robotTravelTicks = Math.floor(Math.random() * 2) + 2;
      state.robotTravelStepTotal = state.robotTravelTicks;
    }
    state.robotLinger = Math.floor(Math.random() * 9) + 8;
    state.robotScanTarget = null;
  }

  if (state.robotRoom === state.playerRoom && state.robotFocus) {
    state.robotFocus = null;
  }

  state.checkedRooms.add(state.robotRoom);
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
  const baseChance = state.hidden
    ? (state.sawPlayerHide ? (learned ? 0.5 : 0.3) : 0.05)
    : 0.7;
  const killChance = Math.min(0.85, baseChance + signal * 0.4);
  if (Math.random() < killChance) {
    triggerDeath();
  } else if (Math.random() < 0.4) {
    state.robotLinger = Math.floor(Math.random() * 2) + 1;
  }
}

function triggerDeath() {
  state.isAlive = false;
  closeMap();
  dom.deathScreen.classList.add("active");
  dom.deathScreen.setAttribute("aria-hidden", "false");
}

function buildEscape() {
  if (!state.isAlive || state.hasEscaped) return;
  if (!rooms[state.playerRoom].isExit || !state.escapeReady) return;
  state.hasEscaped = true;
  state.dayCount += 1;
  state.threat = Math.min(5, state.threat + 0.4);
  dom.victoryScreen.classList.add("active");
  dom.victoryScreen.setAttribute("aria-hidden", "false");
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
  state.sawPlayerHide = false;
  state.robotDisabled = true;
  state.alertTicks = 0;
  state.playerPath = [];
  state.playerTravelTicks = 0;
  state.playerTravelMode = "sneak";
  state.playerTravelTotal = 0;
  state.robotPath = [];
  state.robotTravelTicks = 0;
  state.robotTravelStepTotal = 0;
  state.dayCount = 1;
  state.isAlive = true;
  state.hasEscaped = false;
  assignRoomFinds();
  dom.deathScreen.classList.remove("active");
  dom.deathScreen.setAttribute("aria-hidden", "true");
  dom.victoryScreen.classList.remove("active");
  dom.victoryScreen.setAttribute("aria-hidden", "true");
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
  if (state.robotDisabled) return "Robot: Disabled";
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
    applyTravelProgress(line, edge);
  });

  const playerAdjacents = new Set(roomConnections[state.playerRoom]);
  const showRobotVision = state.robotDormant === 0 && state.robotLookTurns > 0;
  const robotAdjacents = showRobotVision ? new Set(roomConnections[state.robotRoom]) : new Set();
  dom.floorplanMap.querySelectorAll(".map-node").forEach((node) => {
    const roomId = Number(node.getAttribute("data-room-id"));
    node.classList.toggle("active", roomId === state.playerRoom);
    node.classList.toggle(
      "alert",
      roomId === state.robotRoom && state.robotDormant === 0 && !state.robotDisabled
    );
    node.classList.toggle("robot-disabled", state.robotDisabled && roomId === state.robotRoom);
    node.classList.toggle("preview", roomId === state.routePreviewRoom);
    node.classList.toggle("adjacent", playerAdjacents.has(roomId));
    node.classList.toggle("robot-adjacent", showRobotVision && roomId === state.robotScanTarget);
  });

  updateRouteInfo(path);
}

function applyTravelProgress(line, edgeKey) {
  line.style.strokeDasharray = "";
  line.style.strokeDashoffset = "";
  const playerEdge = currentTravelEdge(state.playerRoom, state.playerPath);
  if (playerEdge && edgeKey === playerEdge.key) {
    const progress = getProgress(state.playerTravelTicks, state.playerTravelMode === "run" ? 1 : 2);
    setLineProgress(line, playerEdge.length, progress);
  }
  const robotEdge = currentTravelEdge(state.robotRoom, state.robotPath);
  if (robotEdge && edgeKey === robotEdge.key) {
    const progress = getProgress(state.robotTravelTicks, state.robotTravelStepTotal);
    setLineProgress(line, robotEdge.length, progress);
  }
}

function currentTravelEdge(startRoom, path) {
  if (!path || path.length === 0) return null;
  const nextRoom = path[0];
  const a = Math.min(startRoom, nextRoom);
  const b = Math.max(startRoom, nextRoom);
  const length = edgeLength(startRoom, nextRoom);
  return { key: `${a}-${b}`, length };
}

function edgeLength(startRoom, endRoom) {
  const start = mapPositions[startRoom];
  const end = mapPositions[endRoom];
  const dx = start.x - end.x;
  const dy = start.y - end.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function getProgress(ticksRemaining, ticksTotal) {
  if (!ticksTotal) return 1;
  const remaining = Math.max(0, ticksRemaining);
  return Math.min(1, Math.max(0, 1 - remaining / ticksTotal));
}

function setLineProgress(line, length, progress) {
  const clamped = Math.min(1, Math.max(0, progress));
  const remaining = Math.max(1, length * (1 - clamped));
  line.style.strokeDasharray = `${remaining} ${length}`;
  line.style.strokeDashoffset = "0";
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
  const craftable = getSelectedSchematic();
  if (!craftable) return;
  if (!state.foundSchematics.has(craftable.name)) return;
  if (state.craftedItems.has(craftable.name)) return;
  if (!craftable.parts.every((part) => state.inventory.has(part))) return;
  craftable.parts.forEach((part) => state.inventory.delete(part));
  state.craftedItems.add(craftable.name);
  if (state.requiredEscapeSchematic === craftable.name) {
    state.escapeReady = true;
  }
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
    tickPlayerTravel();
    tickRobotTravel();
    decaySignals();
    advanceRobot();
    checkThreat();
    tickDormantState();
    updateUI();
  }, 1200);
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

function handleEscape() {
  if (!state.escapeReady) return;
  if (!rooms[state.playerRoom].isExit) return;
  buildEscape();
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
    state.playerTravelTotal = 0;
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
    state.robotTravelStepTotal = 0;
  } else {
    state.robotTravelTicks = 1;
    state.robotTravelStepTotal = state.robotTravelTicks;
  }
}

function tickDormantState() {
  if (state.robotDisabled) return;
  if (state.robotDormant > 0) return;
  if (Math.random() < 0.05) {
    state.robotDormant = Math.floor(Math.random() * 76) + 25;
    state.robotLinger = 0;
    state.robotSearchTurns = 0;
    state.robotSearchSpot = null;
    state.robotLookTurns = 0;
  }
}

function toggleRobot() {
  state.robotDisabled = !state.robotDisabled;
  dom.toggleRobotBtn.textContent = state.robotDisabled ? "Enable Robot" : "Disable Robot";
  if (state.robotDisabled) {
    state.robotLinger = 0;
    state.robotSearchTurns = 0;
    state.robotSearchSpot = null;
    state.robotLookTurns = 0;
    state.robotFocus = null;
    state.robotPath = [];
    state.robotTravelTicks = 0;
    state.robotPlannedTarget = null;
    state.robotScanTarget = null;
  }
  updateUI();
}

init();
