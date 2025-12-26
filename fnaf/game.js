const rooms = [
  {
    id: 0,
    name: "Control Bay",
    description: "Camera consoles hum. The robot hates the light.",
    theme: "linear-gradient(135deg, rgba(73, 103, 146, 0.5), rgba(9, 16, 28, 0.9))",
  },
  {
    id: 1,
    name: "Assembly Line",
    description: "Conveyor belts shudder like heartbeat monitors.",
    theme: "linear-gradient(135deg, rgba(126, 98, 62, 0.55), rgba(15, 12, 8, 0.9))",
    item: "Copper Wire",
  },
  {
    id: 2,
    name: "Power Junction",
    description: "Sparks arc. The robot feeds here.",
    theme: "linear-gradient(135deg, rgba(96, 151, 142, 0.55), rgba(10, 16, 18, 0.9))",
    item: "Power Cell",
  },
  {
    id: 3,
    name: "Coolant Vault",
    description: "Cold vapor hides footsteps but muffles sound.",
    theme: "linear-gradient(135deg, rgba(80, 135, 184, 0.45), rgba(6, 9, 15, 0.95))",
  },
  {
    id: 4,
    name: "Maintenance Shafts",
    description: "Tight tunnels. Every metal scrape is a signal.",
    theme: "linear-gradient(135deg, rgba(67, 84, 115, 0.55), rgba(5, 7, 10, 0.9))",
    item: "Resistors",
  },
  {
    id: 5,
    name: "Server Nest",
    description: "The AI watches you through cracked monitors.",
    theme: "linear-gradient(135deg, rgba(96, 66, 146, 0.5), rgba(12, 8, 18, 0.92))",
  },
  {
    id: 6,
    name: "Fabrication Lab",
    description: "Half-built drones dangle like corpses.",
    theme: "linear-gradient(135deg, rgba(112, 94, 124, 0.5), rgba(9, 7, 12, 0.92))",
    item: "Capacitors",
  },
  {
    id: 7,
    name: "Logistics Depot",
    description: "Crates are stacked in impossible patterns.",
    theme: "linear-gradient(135deg, rgba(92, 78, 66, 0.55), rgba(9, 7, 5, 0.9))",
  },
  {
    id: 8,
    name: "Substation",
    description: "Every switch flips on its own.",
    theme: "linear-gradient(135deg, rgba(86, 106, 88, 0.55), rgba(7, 10, 8, 0.9))",
    item: "Servo Motor",
  },
  {
    id: 9,
    name: "Diagnostics Bay",
    description: "Your vitals read on cold glass.",
    theme: "linear-gradient(135deg, rgba(61, 120, 140, 0.6), rgba(8, 12, 15, 0.95))",
  },
  {
    id: 10,
    name: "Shipping Docks",
    description: "Water laps under the floor plates.",
    theme: "linear-gradient(135deg, rgba(59, 99, 122, 0.55), rgba(6, 9, 13, 0.95))",
  },
  {
    id: 11,
    name: "Hydraulic Core",
    description: "Pistons thump, hiding the robot's movement.",
    theme: "linear-gradient(135deg, rgba(132, 82, 70, 0.55), rgba(13, 8, 8, 0.9))",
    item: "Microcontroller",
  },
  {
    id: 12,
    name: "Research Annex",
    description: "Schematics are scattered like warning signs.",
    theme: "linear-gradient(135deg, rgba(95, 89, 129, 0.55), rgba(9, 8, 13, 0.95))",
  },
  {
    id: 13,
    name: "Escape Workshop",
    description: "The only way out is built here.",
    theme: "linear-gradient(135deg, rgba(147, 111, 75, 0.55), rgba(13, 9, 6, 0.9))",
    isExit: true,
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
  robotRoom: 9,
  hidden: false,
  learnedHidingSpots: new Set(),
  hideHistory: new Map(),
  threat: 1,
  turn: 0,
  inventory: new Set(),
  usedDevices: new Map(),
  robotFocus: null,
  lastKnownPlayerRoom: null,
  trailTurns: 0,
  routePreviewRoom: null,
  isAlive: true,
  hasEscaped: false,
};

const dom = {
  threatLevel: document.getElementById("threatLevel"),
  shiftCounter: document.getElementById("shiftCounter"),
  roomLabel: document.getElementById("roomLabel"),
  roomDetails: document.getElementById("roomDetails"),
  roomMedia: document.getElementById("roomMedia"),
  currentRoom: document.getElementById("currentRoom"),
  roomDescription: document.getElementById("roomDescription"),
  playerState: document.getElementById("playerState"),
  robotState: document.getElementById("robotState"),
  inventoryList: document.getElementById("inventoryList"),
  schematicList: document.getElementById("schematicList"),
  roomGrid: document.getElementById("roomGrid"),
  floorplanMap: document.getElementById("floorplanMap"),
  routeInfo: document.getElementById("routeInfo"),
  randomizeBtn: document.getElementById("randomizeBtn"),
  hideBtn: document.getElementById("hideBtn"),
  scanBtn: document.getElementById("scanBtn"),
  noiseBtn: document.getElementById("noiseBtn"),
  buildBtn: document.getElementById("buildBtn"),
  deathScreen: document.getElementById("deathScreen"),
  victoryScreen: document.getElementById("victoryScreen"),
  restartBtn: document.getElementById("restartBtn"),
};

function init() {
  renderRoomButtons();
  renderMap();
  updateSchematicList();
  updateUI();
  attachEvents();
}

function attachEvents() {
  dom.hideBtn.addEventListener("click", () => handleAction("hide"));
  dom.scanBtn.addEventListener("click", () => handleAction("scan"));
  dom.noiseBtn.addEventListener("click", () => handleAction("noise"));
  dom.buildBtn.addEventListener("click", buildEscape);
  dom.restartBtn.addEventListener("click", resetGame);
  dom.randomizeBtn.addEventListener("click", randomizeLayout);
}

function renderRoomButtons() {
  dom.roomGrid.innerHTML = "";
  rooms.forEach((room) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = room.name;
    button.addEventListener("click", () => movePlayer(room.id));
    button.dataset.roomId = room.id;
    dom.roomGrid.appendChild(button);
  });
}

function updateUI() {
  const room = rooms[state.playerRoom];
  const dangerRoom = state.robotRoom === state.playerRoom;
  const connections = roomConnections[state.playerRoom]
    .map((id) => rooms[id].name)
    .join(", ");
  dom.currentRoom.textContent = room.name;
  dom.roomDescription.textContent = room.description;
  dom.roomLabel.textContent = dangerRoom ? "Robot Detected" : "Camera Feed";
  dom.roomDetails.textContent = dangerRoom
    ? "Metal steps are right outside your hiding spot."
    : `Connected: ${connections}. Static rolls across the feed. The robot is never far.`;
  dom.roomMedia.style.background = room.theme;
  dom.playerState.textContent = state.hidden ? "Status: Hidden" : "Status: Exposed";
  dom.robotState.textContent = state.robotFocus
    ? `Robot: Distracted by ${rooms[state.robotFocus].name}`
    : "Robot: Searching";
  dom.threatLevel.textContent = threatLabel();
  dom.shiftCounter.textContent = String(state.turn).padStart(2, "0");
  updateInventoryList();
  updateRoomButtons();
  updateMap();
  updateBuildButton();
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

function updateRoomButtons() {
  dom.roomGrid.querySelectorAll("button").forEach((button) => {
    const roomId = Number(button.dataset.roomId);
    button.classList.toggle("active", roomId === state.playerRoom);
    button.classList.toggle("alert", roomId === state.robotRoom);
    const canMove = roomConnections[state.playerRoom].includes(roomId);
    button.disabled = roomId !== state.playerRoom && !canMove;
  });
}

function movePlayer(roomId) {
  if (!state.isAlive || state.hasEscaped) return;
  if (roomId === state.playerRoom) return;
  if (!roomConnections[state.playerRoom].includes(roomId)) return;
  state.playerRoom = roomId;
  state.hidden = false;
  collectItem(roomId);
  handleTurn("move");
}

function setRoutePreview(roomId) {
  if (!state.isAlive || state.hasEscaped) return;
  state.routePreviewRoom = roomId;
  updateMap();
}

function collectItem(roomId) {
  const room = rooms[roomId];
  if (room.item && !state.inventory.has(room.item)) {
    state.inventory.add(room.item);
  }
}

function handleAction(action) {
  if (!state.isAlive || state.hasEscaped) return;
  if (action === "hide") {
    state.hidden = true;
    const hideCount = state.hideHistory.get(state.playerRoom) || 0;
    const nextCount = hideCount + 1;
    state.hideHistory.set(state.playerRoom, nextCount);
    if (nextCount >= 3) {
      state.learnedHidingSpots.add(state.playerRoom);
    }
  }

  if (action === "scan" || action === "noise") {
    useDevice(action);
  }

  handleTurn(action);
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
}

function deviceLearned(type) {
  const history = state.usedDevices.get(type) || [];
  const recentUses = history.filter((turn) => state.turn - turn <= 4);
  return recentUses.length >= 3;
}

function handleTurn(action) {
  state.turn += 1;
  state.threat = Math.min(5, state.threat + 0.3);
  advanceRobot(action);
  checkThreat();
  updateUI();
}

function advanceRobot(action) {
  if (action === "move") {
    state.lastKnownPlayerRoom = state.playerRoom;
    state.trailTurns = 2;
  } else if (state.trailTurns > 0) {
    state.trailTurns -= 1;
  }

  const robotTarget = state.robotFocus ?? state.lastKnownPlayerRoom;
  const aggressive = state.threat >= 3;
  const willMoveToward = robotTarget !== null && (aggressive || Math.random() > 0.35);

  if (willMoveToward && robotTarget !== null) {
    state.robotRoom = nextStepToward(state.robotRoom, robotTarget);
  } else {
    const roamRooms = roomConnections[state.robotRoom].filter((id) => id !== state.robotRoom);
    state.robotRoom = roamRooms[Math.floor(Math.random() * roamRooms.length)];
  }

  if (state.robotRoom === state.playerRoom && state.robotFocus) {
    state.robotFocus = null;
  }

  if (action === "move" && Math.random() < 0.4) {
    state.threat = Math.min(5, state.threat + 0.6);
  }
}

function checkThreat() {
  if (state.robotRoom !== state.playerRoom) return;

  const learned = state.learnedHidingSpots.has(state.playerRoom);
  const killChance = state.hidden ? (learned ? 0.9 : 0.6) : 0.95;
  const killed = Math.random() < killChance;
  if (killed) {
    triggerDeath();
  } else {
    state.threat = Math.min(5, state.threat + 0.8);
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
  dom.victoryScreen.classList.add("active");
  dom.victoryScreen.setAttribute("aria-hidden", "false");
}

function resetGame() {
  state.playerRoom = 0;
  state.robotRoom = 9;
  state.hidden = false;
  state.learnedHidingSpots.clear();
  state.hideHistory.clear();
  state.threat = 1;
  state.turn = 0;
  state.inventory.clear();
  state.usedDevices.clear();
  state.robotFocus = null;
  state.lastKnownPlayerRoom = null;
  state.trailTurns = 0;
  state.routePreviewRoom = null;
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
    group.addEventListener("click", () => setRoutePreview(room.id));
    svg.appendChild(group);
  });
}

function updateMap() {
  const path = state.routePreviewRoom === null
    ? []
    : getShortestPath(state.playerRoom, state.routePreviewRoom);
  const edges = new Set();
  for (let i = 0; i < path.length - 1; i += 1) {
    const a = Math.min(path[i], path[i + 1]);
    const b = Math.max(path[i], path[i + 1]);
    edges.add(`${a}-${b}`);
  }

  dom.floorplanMap.querySelectorAll(".map-link").forEach((line) => {
    const edge = line.getAttribute("data-edge");
    line.classList.toggle("active", edges.has(edge));
  });

  dom.floorplanMap.querySelectorAll(".map-node").forEach((node) => {
    const roomId = Number(node.getAttribute("data-room-id"));
    node.classList.toggle("active", roomId === state.playerRoom);
    node.classList.toggle("alert", roomId === state.robotRoom);
    node.classList.toggle("preview", roomId === state.routePreviewRoom);
  });

  updateRouteInfo(path);
}

function updateRouteInfo(path) {
  if (state.routePreviewRoom === null) {
    dom.routeInfo.textContent = "Select a destination to view the shortest path.";
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

init();
