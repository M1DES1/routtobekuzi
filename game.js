// Zmienne globalne
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// POWIĘKSZENIE OKNA GRY
canvas.width = 1200;
canvas.height = 800;

const mainMenu = document.getElementById("mainMenu");
const settingsMenu = document.getElementById("settingsMenu");
const instructionsMenu = document.getElementById("instructionsMenu");
const gameOverMenu = document.getElementById("gameOverMenu");
const waveInfo = document.getElementById("waveInfo");
const stats = document.getElementById("stats");
const stats2 = document.getElementById("stats2");
const finalScore = document.getElementById("finalScore");
const cardSelectionMenu = document.getElementById("cardSelectionMenu");
const cardContainer = document.getElementById("cardContainer");
const statsInfo = document.getElementById("statsInfo");
const rerollButton = document.getElementById("rerollButton");
const healthFill = document.getElementById("healthFill");
const healthText = document.getElementById("healthText");
const xpFill = document.getElementById("xpFill");
const xpText = document.getElementById("xpText");
const healthFill2 = document.getElementById("healthFill2");
const healthText2 = document.getElementById("healthText2");
const xpFill2 = document.getElementById("xpFill2");
const xpText2 = document.getElementById("xpText2");
const player2Bars = document.getElementById("player2Bars");
const player2Selection = document.getElementById("player2Selection");
const dashFill = document.getElementById("dashFill");
const dashText = document.getElementById("dashText");
const dashFill2 = document.getElementById("dashFill2");
const dashText2 = document.getElementById("dashText2");

// Nowe zmienne
let waveStartDisplay = false;
let waveStartTimer = 0;
let waveStartDuration = 180;
let bossRerolls = 5;
let shootingMode = "auto";
let currentBossRerolls = 5;
let spawnWarnings = [];
let specialXpChance = 0.02;
let lightningEffects = [];
let stunEffects = [];
let poisonEffects = [];
let dustParticles = [];
let collectedCards = [];
let collectedItems = [];
let mapSections = [];
let currentMapSection = 0;
let mapWidth = 2400;
let mapHeight = 1800;

// NOWE ZMIENNE DO SYSTEMU MAPY
let cameraX = 0;
let cameraY = 0;

// Ładowanie obrazów
const crosshairImg = new Image();
crosshairImg.src = "https://files.catbox.moe/h2nfaw.png";

const kuzaLWalkImg = new Image();
kuzaLWalkImg.src = "https://files.catbox.moe/kijkt1.gif";
const kuzaRWalkImg = new Image();
kuzaRWalkImg.src = "https://files.catbox.moe/gt5v0t.gif";

// DODANE: Nowa postać Cygan
const characters = {
  kuza: { 
    img: new Image(), 
    src: "https://files.catbox.moe/kijkt1.gif",
    walkLeft: kuzaLWalkImg,
    walkRight: kuzaRWalkImg
  },
  menel: { 
    img: new Image(), 
    src: "https://files.catbox.moe/lpo1ju.png" 
  },
  cygan: {
    img: new Image(),
    src: "https://files.catbox.moe/qdkj4v.png"
  }
};
characters.kuza.img.src = characters.kuza.src;
characters.menel.img.src = characters.menel.src;
characters.cygan.img.src = characters.cygan.src;

// Obrazy broni i pocisków
const weaponImages = {
  pistol: new Image(),
  bottle: new Image(),
  knife: new Image()
};
weaponImages.pistol.src = "https://files.catbox.moe/wqyj6k.png";
weaponImages.bottle.src = "https://files.catbox.moe/6gkseq.png";
weaponImages.knife.src = "https://files.catbox.moe/89km97.png";

const bulletImages = {
  pistol: new Image(),
  bottle: new Image(),
  knife: new Image()
};
bulletImages.pistol.src = "https://files.catbox.moe/xayzud.png";
bulletImages.bottle.src = "https://files.catbox.moe/lpo1ju.png";
bulletImages.knife.src = "https://files.catbox.moe/89km97.png";

// Zmienne gry
let playerCount = 1;
let selectedCharacters = ["kuza", "kuza"];
const players = [
  { 
    x: 500, 
    y: 450, 
    r: 20, 
    speed: 2,
    hp: 25, 
    maxHp: 25,
    weapon: "pistol", 
    damageBonus: 0,
    baseDamage: 5,
    attackSpeed: 500,
    lifeSteal: 0,
    fortune: 1,
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    dashCooldown: 0,
    dashCooldownMax: 480,
    dashAvailable: true,
    isDashing: false,
    dashTime: 0,
    dashDuration: 15,
    dashTargetX: 0,
    dashTargetY: 0,
    xpMagnetRange: 80,
    critChance: 0,
    critMultiplier: 2,
    facing: 'right',
    lastMoveTime: 0,
    stats: {
      damage: 5,
      speed: 2.5,
      health: 25,
      cooldown: 480,
      xpRange: 80,
      attackSpeed: 500,
      lifeSteal: 0,
      fortune: 1,
      critChance: 0,
      shootingRange: 300
    },
    tripleShot: false,
    piercingShot: false,
    piercingLevel: 0,
    meteorSkill: false,
    meteorCooldown: 0,
    meteorCooldownMax: 780,
    maxDashes: 1,
    currentDashes: 1,
    bossRerolls: 0,
    dodgeChance: 0,
    globalCooldownReduction: 0,
    chainLightning: false,
    chainLightningCooldown: 0,
    chainLightningCooldownMax: 600,
    stunLightning: false,
    stunLightningCooldown: 0,
    stunLightningCooldownMax: 900,
    poisonSkill: false,
    poisonCooldown: 0,
    poisonCooldownMax: 450,
    isMoving: false,
    lastX: 500,
    lastY: 450,
    moveDirection: { x: 0, y: 0 }
  },
  { 
    x: 700, 
    y: 450, 
    r: 20, 
    speed: 2.5,
    hp: 25, 
    maxHp: 25,
    weapon: "pistol", 
    damageBonus: 0,
    baseDamage: 5,
    attackSpeed: 500,
    lifeSteal: 0,
    fortune: 1,
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    dashCooldown: 0,
    dashCooldownMax: 480,
    dashAvailable: true,
    isDashing: false,
    dashTime: 0,
    dashDuration: 15,
    dashTargetX: 0,
    dashTargetY: 0,
    xpMagnetRange: 80,
    critChance: 0,
    critMultiplier: 2,
    facing: 'right',
    lastMoveTime: 0,
    stats: {
      damage: 5,
      speed: 2.5,
      health: 25,
      cooldown: 480,
      xpRange: 80,
      attackSpeed: 500,
      lifeSteal: 0,
      fortune: 1,
      critChance: 0,
      shootingRange: 300
    },
    tripleShot: false,
    piercingShot: false,
    piercingLevel: 0,
    meteorSkill: false,
    meteorCooldown: 0,
    meteorCooldownMax: 780,
    maxDashes: 1,
    currentDashes: 1,
    bossRerolls: 0,
    dodgeChance: 0,
    globalCooldownReduction: 0,
    chainLightning: false,
    chainLightningCooldown: 0,
    chainLightningCooldownMax: 600,
    stunLightning: false,
    stunLightningCooldown: 0,
    stunLightningCooldownMax: 900,
    poisonSkill: false,
    poisonCooldown: 0,
    poisonCooldownMax: 450,
    isMoving: false,
    lastX: 700,
    lastY: 450,
    moveDirection: { x: 0, y: 0 }
  }
];

const bullets = [];
const enemies = [];
const enemyProjectiles = [];
const xpOrbs = [];
const meteors = [];
let score = 0;
let keys = {};
let keys2 = {};
let gameRunning = false;
let wave = 0;
let waveTimer = 0;
let waveDuration = 999999;
let waveInterval;
let boss = null;
let difficulty = "normal";
let mouseX = 0;
let mouseY = 0;
let gold = 0;
let shopActive = false;
let cardSelectionActive = false;
let bossShopActive = false;
let currentCards = [];
let lastShotTime = [0, 0];
let dashKeysPressed = {};
let dashKeysPressed2 = {};
let currentPlayerLevelingUp = 0;
let spawnInterval;
let enemiesToSpawn = 0;
let enemiesSpawned = 0;
let enemiesAlive = 0;
let spawnPaused = false;
let purchasedBossItems = [];
let enemySpawnGroups = [];
let stunTimers = {};
let dasherEnemies = [];
let lastDustSpawn = 0;

// DODANE: Zmienne dla systemu noży Cygana
let knifeUpgrades = {
  cygan: [false, false, false]
};

// Inicjalizacja sekcji mapy
function initMapSections() {
  mapSections = [
    { 
      x: 0, 
      y: 0, 
      width: canvas.width, 
      height: canvas.height, 
      active: true,
      connections: { right: 1, down: 2 }
    },
    { 
      x: canvas.width, 
      y: 0, 
      width: canvas.width, 
      height: canvas.height, 
      active: false,
      connections: { left: 0, down: 3 }
    },
    { 
      x: 0, 
      y: canvas.height, 
      width: canvas.width, 
      height: canvas.height, 
      active: false,
      connections: { right: 3, up: 0 }
    },
    { 
      x: canvas.width, 
      y: canvas.height, 
      width: canvas.width, 
      height: canvas.height, 
      active: false,
      connections: { left: 2, up: 1 }
    }
  ];
  
  cameraX = mapSections[0].x;
  cameraY = mapSections[0].y;
}

// Przechodzenie między sekcjami dla gracza
function checkPlayerSectionTransition(playerIndex) {
  const player = players[playerIndex];
  const currentSection = mapSections[currentMapSection];
  
  if (player.x < currentSection.x) {
    if (currentSection.connections && currentSection.connections.left !== undefined) {
      switchPlayerToSection(currentSection.connections.left, playerIndex, 'right');
    } else {
      player.x = currentSection.x + player.r;
    }
  } else if (player.x > currentSection.x + currentSection.width) {
    if (currentSection.connections && currentSection.connections.right !== undefined) {
      switchPlayerToSection(currentSection.connections.right, playerIndex, 'left');
    } else {
      player.x = currentSection.x + currentSection.width - player.r;
    }
  }
  
  if (player.y < currentSection.y) {
    if (currentSection.connections && currentSection.connections.up !== undefined) {
      switchPlayerToSection(currentSection.connections.up, playerIndex, 'down');
    } else {
      player.y = currentSection.y + player.r;
    }
  } else if (player.y > currentSection.y + currentSection.height) {
    if (currentSection.connections && currentSection.connections.down !== undefined) {
      switchPlayerToSection(currentSection.connections.down, playerIndex, 'up');
    } else {
      player.y = currentSection.y + currentSection.height - player.r;
    }
  }
}

function checkEnemySectionTransition(enemy) {
  enemy.x = Math.max(0, Math.min(mapWidth, enemy.x));
  enemy.y = Math.max(0, Math.min(mapHeight, enemy.y));
}

function switchPlayerToSection(newSectionIndex, playerIndex, fromDirection) {
  const oldSection = mapSections[currentMapSection];
  const newSection = mapSections[newSectionIndex];
  
  oldSection.active = false;
  newSection.active = true;
  currentMapSection = newSectionIndex;
  
  const player = players[playerIndex];
  
  switch(fromDirection) {
    case 'left':
      player.x = newSection.x + player.r;
      break;
    case 'right':
      player.x = newSection.x + newSection.width - player.r;
      break;
    case 'up':
      player.y = newSection.y + player.r;
      break;
    case 'down':
      player.y = newSection.y + newSection.height - player.r;
      break;
  }
  
  cameraX = newSection.x;
  cameraY = newSection.y;
}

// Przedmioty w sklepie
const items = {
  boots: { 
    cost: 30, 
    speedBonus: 0.8,
    hpPenalty: 1, 
    bought: false 
  },
  potion: { 
    cost: 50, 
    damageBonus: 2, 
    bought: false 
  }
};

// Sklep bossów
const bossShopItems = [
  {
    id: "extra_knife",
    name: "Dodatkowy Nóż",
    description: "+1 dodatkowy nóż (tylko dla Cygana)",
    cost: 120,
    effect: (playerIndex) => {
      const player = players[playerIndex];
      if (selectedCharacters[playerIndex] === "cygan") {
        const upgradeIndex = knifeUpgrades.cygan.findIndex(upgrade => !upgrade);
        if (upgradeIndex !== -1) {
          knifeUpgrades.cygan[upgradeIndex] = true;
        }
      }
    }
  },
  {
    id: "piercing_shot",
    name: "Przebijający Pocisk",
    description: "Pocisk przebija przeciwników (poziom 1: 2 przeciwników)",
    cost: 150,
    effect: (playerIndex) => {
      const player = players[playerIndex];
      player.piercingShot = true;
      player.piercingLevel = player.piercingLevel || 0;
      player.piercingLevel += 1;
      
      const enemiesPierced = Math.pow(2, player.piercingLevel);
      const itemElement = document.getElementById("bossItem");
      if (itemElement) {
        const descElement = itemElement.querySelector('.card-description');
        if (descElement) {
          descElement.textContent = `Pocisk przebija przeciwników (poziom ${player.piercingLevel}: ${enemiesPierced} przeciwników)`;
        }
      }
    }
  },
  {
    id: "meteor_strike",
    name: "Uderzenie Meteorytu",
    description: "Co 13s spada meteoryt zadający x3 obrażeń",
    cost: 200,
    effect: (playerIndex) => {
      players[playerIndex].meteorSkill = true;
    }
  },
  {
    id: "double_stats",
    name: "Podwójne Statystyki",
    description: "Podwaja wszystkie twoje statystyki",
    cost: 300,
    effect: (playerIndex) => {
      const player = players[playerIndex];
      player.baseDamage *= 2;
      player.speed *= 2;
      player.maxHp *= 2;
      player.hp *= 2;
      player.xpMagnetRange *= 2;
      player.fortune *= 2;
      player.critChance = Math.min(1, player.critChance * 2);
      player.critMultiplier *= 1.5;
      
      player.stats.damage = player.baseDamage;
      player.stats.speed = player.speed;
      player.stats.health = player.maxHp;
      player.stats.xpRange = player.xpMagnetRange;
      player.stats.fortune = player.fortune;
      player.stats.critChance = player.critChance;
      
      updateHealthBar(playerIndex);
    }
  },
  {
    id: "extra_dash",
    name: "Dodatkowy Dash",
    description: "+1 maksymalna liczba dashów",
    cost: 250,
    effect: (playerIndex) => {
      players[playerIndex].maxDashes += 1;
      players[playerIndex].currentDashes = players[playerIndex].maxDashes;
      updateDashBar(playerIndex);
    }
  },
  {
    id: "boss_reroll",
    name: "Dodatkowe Przerzuty",
    description: "+2 przerzuty w sklepie bossa",
    cost: 150,
    effect: (playerIndex) => {
      players[playerIndex].bossRerolls += 2;
    }
  },
  {
    id: "dodge_chance",
    name: "Unik",
    description: "+50% szansy na uniknięcie ataku",
    cost: 200,
    effect: (playerIndex) => {
      players[playerIndex].dodgeChance += 0.5;
    }
  },
  {
    id: "chain_lightning",
    name: "Piorun Łańcuchowy",
    description: "Co 10s piorun uderza w max 10 przeciwników",
    cost: 250,
    effect: (playerIndex) => {
      players[playerIndex].chainLightning = true;
    }
  },
  {
    id: "stun_lightning",
    name: "Ogłuszający Piorun",
    description: "Co 15s piorun ogłusza przeciwników na 1.5s",
    cost: 300,
    effect: (playerIndex) => {
      players[playerIndex].stunLightning = true;
    }
  },
  {
    id: "poison_skill",
    name: "Trucizna",
    description: "Co 7.5s zatruwa przeciwników w obszarze",
    cost: 200,
    effect: (playerIndex) => {
      players[playerIndex].poisonSkill = true;
    }
  }
];

// Definicje bossów
const bosses = [
  {
    name: "Golem Kamienia",
    health: 500,
    damage: 15,
    speed: 1.0,
    size: 40,
    color: "gray",
    xpValue: 200,
    special: "summon_minions",
    class: "boss"
  },
  {
    name: "Smok Ognia", 
    health: 400,
    damage: 25,
    speed: 1.5,
    size: 50,
    color: "red",
    xpValue: 250,
    special: "fire_breath",
    class: "boss"
  },
  {
    name: "Król Zombie",
    health: 600,
    damage: 20,
    speed: 0.8,
    size: 45,
    color: "green",
    xpValue: 300,
    special: "poison_aura",
    class: "boss"
  },
  {
    name: "Czarnoksiężnik",
    health: 350,
    damage: 30,
    speed: 1.2,
    size: 35,
    color: "purple",
    xpValue: 350,
    special: "magic_missiles",
    class: "boss"
  },
  {
    name: "Król Demonów",
    health: 800,
    damage: 35,
    speed: 1.0,
    size: 60,
    color: "darkred",
    xpValue: 500,
    special: "hellfire",
    class: "boss"
  }
];

// Definicje kart
const cards = {
  common: [
    {
      id: "common_speed",
      name: "Buty Biegacza",
      description: "+5% prędkości ruchu",
      rarity: "common",
      effect: (playerIndex) => { 
        players[playerIndex].speed *= 1.05;
        players[playerIndex].stats.speed = players[playerIndex].speed;
      }
    },
    {
      id: "common_damage",
      name: "Ostre Amunicje",
      description: "+5 obrażeń",
      rarity: "common",
      effect: (playerIndex) => { 
        players[playerIndex].baseDamage += 5;
        players[playerIndex].stats.damage = players[playerIndex].baseDamage;
      }
    },
    {
      id: "common_health",
      name: "Witaminy",
      description: "+5% maksymalnego zdrowia",
      rarity: "common",
      effect: (playerIndex) => { 
        players[playerIndex].maxHp = Math.floor(players[playerIndex].maxHp * 1.05);
        players[playerIndex].hp = Math.floor(players[playerIndex].hp * 1.05);
        players[playerIndex].stats.health = players[playerIndex].maxHp;
        updateHealthBar(playerIndex);
      }
    },
    {
      id: "common_cooldown",
      name: "Zimna Krew",
      description: "-5% czasu odnowienia dasza",
      rarity: "common",
      effect: (playerIndex) => { 
        players[playerIndex].dashCooldownMax = Math.floor(players[playerIndex].dashCooldownMax * 0.95);
        players[playerIndex].stats.cooldown = players[playerIndex].dashCooldownMax;
      }
    },
    {
      id: "common_heal",
      name: "Apteczka",
      description: "Ulecz 10% maksymalnego zdrowia",
      rarity: "common",
      effect: (playerIndex) => { 
        players[playerIndex].hp = Math.min(players[playerIndex].maxHp, players[playerIndex].hp + Math.floor(players[playerIndex].maxHp * 0.1));
        updateHealthBar(playerIndex);
      }
    },
    {
      id: "common_attack_speed",
      name: "Szybkostrzelność",
      description: "+5% szybkostrzelności",
      rarity: "common",
      effect: (playerIndex) => { 
        players[playerIndex].attackSpeed = Math.floor(players[playerIndex].attackSpeed * 0.95);
        players[playerIndex].stats.attackSpeed = players[playerIndex].attackSpeed;
      }
    },
    {
      id: "common_crit",
      name: "Krytyczny Cios",
      description: "+3% szansy na krytyczne obrażenia (2x)",
      rarity: "common",
      effect: (playerIndex) => { 
        players[playerIndex].critChance += 0.03;
        players[playerIndex].stats.critChance = players[playerIndex].critChance;
      }
    },
    {
      id: "common_extra_hp",
      name: "Dodatkowe Życie",
      description: "+10 maksymalnego HP",
      rarity: "common",
      effect: (playerIndex) => { 
        players[playerIndex].maxHp += 10;
        players[playerIndex].hp += 10;
        players[playerIndex].stats.health = players[playerIndex].maxHp;
        updateHealthBar(playerIndex);
      }
    },
    {
      id: "common_global_cd",
      name: "Przyspieszenie",
      description: "-3% wszystkich cooldownów",
      rarity: "common",
      effect: (playerIndex) => { 
        players[playerIndex].globalCooldownReduction += 0.03;
        applyGlobalCooldownReduction(playerIndex);
      }
    },
    {
      id: "common_shooting_range",
      name: "Luneta",
      description: "+15% zasięgu strzelania",
      rarity: "common",
      effect: (playerIndex) => { 
        players[playerIndex].stats.shootingRange *= 1.15;
      }
    },
    {
      id: "common_xp_multiplier",
      name: "Mnożnik Doświadczenia",
      description: "+10% doświadczenia",
      rarity: "common",
      effect: (playerIndex) => { 
        players[playerIndex].fortune *= 1.1;
        players[playerIndex].stats.fortune = players[playerIndex].fortune;
      }
    }
  ],
  
  rare: [
    {
      id: "rare_speed",
      name: "Buty Maratończyka",
      description: "+10% prędkości ruchu",
      rarity: "rare",
      effect: (playerIndex) => { 
        players[playerIndex].speed *= 1.1;
        players[playerIndex].stats.speed = players[playerIndex].speed;
      }
    },
    {
      id: "rare_damage",
      name: "Pociski z Rdzenia",
      description: "+10 obrażeń",
      rarity: "rare",
      effect: (playerIndex) => { 
        players[playerIndex].baseDamage += 10;
        players[playerIndex].stats.damage = players[playerIndex].baseDamage;
      }
    },
    {
      id: "rare_health",
      name: "Super Witaminy",
      description: "+10% maksymalnego zdrowia",
      rarity: "rare",
      effect: (playerIndex) => { 
        players[playerIndex].maxHp = Math.floor(players[playerIndex].maxHp * 1.1);
        players[playerIndex].hp = Math.floor(players[playerIndex].hp * 1.1);
        players[playerIndex].stats.health = players[playerIndex].maxHp;
        updateHealthBar(playerIndex);
      }
    },
    {
      id: "rare_cooldown",
      name: "Lodowa Krew",
      description: "-10% czasu odnowienia dasza",
      rarity: "rare",
      effect: (playerIndex) => { 
        players[playerIndex].dashCooldownMax = Math.floor(players[playerIndex].dashCooldownMax * 0.9);
        players[playerIndex].stats.cooldown = players[playerIndex].dashCooldownMax;
      }
    },
    {
      id: "rare_heal",
      name: "Medyk",
      description: "Ulecz 15% maksymalnego zdrowia",
      rarity: "rare",
      effect: (playerIndex) => { 
        players[playerIndex].hp = Math.min(players[playerIndex].maxHp, players[playerIndex].hp + Math.floor(players[playerIndex].maxHp * 0.15));
        updateHealthBar(playerIndex);
      }
    },
    {
      id: "rare_attack_speed",
      name: "Szybkie Palce",
      description: "+10% szybkostrzelności",
      rarity: "rare",
      effect: (playerIndex) => { 
        players[playerIndex].attackSpeed = Math.floor(players[playerIndex].attackSpeed * 0.9);
        players[playerIndex].stats.attackSpeed = players[playerIndex].attackSpeed;
      }
    },
    {
      id: "rare_life_steal",
      name: "Wampiryzm",
      description: "+3% kradzieży życia",
      rarity: "rare",
      effect: (playerIndex) => { 
        players[playerIndex].lifeSteal += 0.03;
        players[playerIndex].stats.lifeSteal = players[playerIndex].lifeSteal;
      }
    },
    {
      id: "rare_crit",
      name: "Precyzyjny Cios",
      description: "+5% szansy na krytyczne obrażenia (2x)",
      rarity: "rare",
      effect: (playerIndex) => { 
        players[playerIndex].critChance += 0.05;
        players[playerIndex].stats.critChance = players[playerIndex].critChance;
      }
    },
    {
      id: "rare_extra_hp",
      name: "Dodatkowe Życie+",
      description: "+15 maksymalnego HP",
      rarity: "rare",
      effect: (playerIndex) => { 
        players[playerIndex].maxHp += 15;
        players[playerIndex].hp += 15;
        players[playerIndex].stats.health = players[playerIndex].maxHp;
        updateHealthBar(playerIndex);
      }
    },
    {
      id: "rare_global_cd",
      name: "Szybsze Odnowienie",
      description: "-6% wszystkich cooldownów",
      rarity: "rare",
      effect: (playerIndex) => { 
        players[playerIndex].globalCooldownReduction += 0.06;
        applyGlobalCooldownReduction(playerIndex);
      }
    },
    {
      id: "rare_shooting_range",
      name: "Celownik Teleskopowy",
      description: "+25% zasięgu strzelania",
      rarity: "rare",
      effect: (playerIndex) => { 
        players[playerIndex].stats.shootingRange *= 1.25;
      }
    },
    {
      id: "rare_xp_multiplier",
      name: "Mnożnik Doświadczenia+",
      description: "+20% doświadczenia",
      rarity: "rare",
      effect: (playerIndex) => { 
        players[playerIndex].fortune *= 1.2;
        players[playerIndex].stats.fortune = players[playerIndex].fortune;
      }
    }
  ],
  
  epic: [
    {
      id: "epic_speed",
      name: "Buty Błyskawicy",
      description: "+15% prędkości ruchu",
      rarity: "epic",
      effect: (playerIndex) => { 
        players[playerIndex].speed *= 1.15;
        players[playerIndex].stats.speed = players[playerIndex].speed;
      }
    },
    {
      id: "epic_damage",
      name: "Pociski z Gwiazd",
      description: "+15 obrażeń",
      rarity: "epic",
      effect: (playerIndex) => { 
        players[playerIndex].baseDamage += 15;
        players[playerIndex].stats.damage = players[playerIndex].baseDamage;
      }
    },
    {
      id: "epic_health",
      name: "Eliksir Życia",
      description: "+15% maksymalnego zdrowia",
      rarity: "epic",
      effect: (playerIndex) => { 
        players[playerIndex].maxHp = Math.floor(players[playerIndex].maxHp * 1.15);
        players[playerIndex].hp = Math.floor(players[playerIndex].hp * 1.15);
        players[playerIndex].stats.health = players[playerIndex].maxHp;
        updateHealthBar(playerIndex);
      }
    },
    {
      id: "epic_cooldown",
      name: "Krew Merkurego",
      description: "-15% czasu odnowienia dasza",
      rarity: "epic",
      effect: (playerIndex) => { 
        players[playerIndex].dashCooldownMax = Math.floor(players[playerIndex].dashCooldownMax * 0.85);
        players[playerIndex].stats.cooldown = players[playerIndex].dashCooldownMax;
      }
    },
    {
      id: "epic_heal",
      name: "Szpital Polowy",
      description: "Ulecz 25% maksymalnego zdrowia",
      rarity: "epic",
      effect: (playerIndex) => { 
        players[playerIndex].hp = Math.min(players[playerIndex].maxHp, players[playerIndex].hp + Math.floor(players[playerIndex].maxHp * 0.25));
        updateHealthBar(playerIndex);
      }
    },
    {
      id: "epic_attack_speed",
      name: "Błyskawiczne Strzały",
      description: "+15% szybkostrzelności",
      rarity: "epic",
      effect: (playerIndex) => { 
        players[playerIndex].attackSpeed = Math.floor(players[playerIndex].attackSpeed * 0.85);
        players[playerIndex].stats.attackSpeed = players[playerIndex].attackSpeed;
      }
    },
    {
      id: "epic_life_steal",
      name: "Krwiopijca",
      description: "+5% kradzieży życia",
      rarity: "epic",
      effect: (playerIndex) => { 
        players[playerIndex].lifeSteal += 0.05;
        players[playerIndex].stats.lifeSteal = players[playerIndex].lifeSteal;
      }
    },
    {
      id: "epic_fortune",
      name: "Szczęśliwa Stopa",
      description: "+15% złota i XP",
      rarity: "epic",
      effect: (playerIndex) => { 
        players[playerIndex].fortune *= 1.15;
        players[playerIndex].stats.fortune = players[playerIndex].fortune;
      }
    },
    {
      id: "epic_crit",
      name: "Śmiertelny Cios",
      description: "+8% szansy na krytyczne obrażenia (2x)",
      rarity: "epic",
      effect: (playerIndex) => { 
        players[playerIndex].critChance += 0.08;
        players[playerIndex].stats.critChance = players[playerIndex].critChance;
      }
    },
    {
      id: "epic_crit_multiplier",
      name: "Moc Krytyka",
      description: "+0.3 do mnożnika obrażeń krytycznych",
      rarity: "epic",
      effect: (playerIndex) => { 
        players[playerIndex].critMultiplier += 0.3;
      }
    },
    {
      id: "epic_boss_reroll",
      name: "Dodatkowe Przerzuty",
      description: "+1 przerzut w sklepie bossa",
      rarity: "epic",
      effect: (playerIndex) => { 
        players[playerIndex].bossRerolls += 1;
      }
    },
    {
      id: "epic_extra_hp",
      name: "Dodatkowe Życie++",
      description: "+25 maksymalnego HP",
      rarity: "epic",
      effect: (playerIndex) => { 
        players[playerIndex].maxHp += 25;
        players[playerIndex].hp += 25;
        players[playerIndex].stats.health = players[playerIndex].maxHp;
        updateHealthBar(playerIndex);
      }
    },
    {
      id: "epic_global_cd",
      name: "Hiper Prędkość",
      description: "-10% wszystkich cooldownów",
      rarity: "epic",
      effect: (playerIndex) => { 
        players[playerIndex].globalCooldownReduction += 0.1;
        applyGlobalCooldownReduction(playerIndex);
      }
    },
    {
      id: "epic_shooting_range",
      name: "Noktowizor",
      description: "+40% zasięgu strzelania",
      rarity: "epic",
      effect: (playerIndex) => { 
        players[playerIndex].stats.shootingRange *= 1.4;
      }
    },
    {
      id: "epic_xp_multiplier",
      name: "Mnożnik Doświadczenia++",
      description: "+30% doświadczenia",
      rarity: "epic",
      effect: (playerIndex) => { 
        players[playerIndex].fortune *= 1.3;
        players[playerIndex].stats.fortune = players[playerIndex].fortune;
      }
    }
  ],
  
  legendary: [
    {
      id: "legendary_speed",
      name: "Buty Boga Prędkości",
      description: "+25% prędkości ruchu",
      rarity: "legendary",
      effect: (playerIndex) => { 
        players[playerIndex].speed *= 1.25;
        players[playerIndex].stats.speed = players[playerIndex].speed;
      }
    },
    {
      id: "legendary_damage",
      name: "Pociski z Czarnej Dziury",
      description: "+25 obrażeń",
      rarity: "legendary",
      effect: (playerIndex) => { 
        players[playerIndex].baseDamage += 25;
        players[playerIndex].stats.damage = players[playerIndex].baseDamage;
      }
    },
    {
      id: "legendary_health",
      name: "Ambrozja",
      description: "+25% maksymalnego zdrowia",
      rarity: "legendary",
      effect: (playerIndex) => { 
        players[playerIndex].maxHp = Math.floor(players[playerIndex].maxHp * 1.25);
        players[playerIndex].hp = Math.floor(players[playerIndex].hp * 1.25);
        players[playerIndex].stats.health = players[playerIndex].maxHp;
        updateHealthBar(playerIndex);
      }
    },
    {
      id: "legendary_cooldown",
      name: "Krew Feniksa",
      description: "-25% czasu odnowienia dasza",
      rarity: "legendary",
      effect: (playerIndex) => { 
        players[playerIndex].dashCooldownMax = Math.floor(players[playerIndex].dashCooldownMax * 0.75);
        players[playerIndex].stats.cooldown = players[playerIndex].dashCooldownMax;
      }
    },
    {
      id: "legendary_heal",
      name: "Fontanna Młodości",
      description: "Pełne wyleczenie zdrowia",
      rarity: "legendary",
      effect: (playerIndex) => { 
        players[playerIndex].hp = players[playerIndex].maxHp;
        updateHealthBar(playerIndex);
      }
    },
    {
      id: "legendary_attack_speed",
      name: "Strzały Światła",
      description: "+25% szybkostrzelności",
      rarity: "legendary",
      effect: (playerIndex) => { 
        players[playerIndex].attackSpeed = Math.floor(players[playerIndex].attackSpeed * 0.75);
        players[playerIndex].stats.attackSpeed = players[playerIndex].attackSpeed;
      }
    },
    {
      id: "legendary_life_steal",
      name: "Nocny Łowca",
      description: "+8% kradzieży życia",
      rarity: "legendary",
      effect: (playerIndex) => { 
        players[playerIndex].lifeSteal += 0.08;
        players[playerIndex].stats.lifeSteal = players[playerIndex].lifeSteal;
      }
    },
    {
      id: "legendary_fortune",
      name: "Złote Dotknięcie",
      description: "+25% złota i XP",
      rarity: "legendary",
      effect: (playerIndex) => { 
        players[playerIndex].fortune *= 1.25;
        players[playerIndex].stats.fortune = players[playerIndex].fortune;
      }
    },
    {
      id: "legendary_crit",
      name: "Mistrzowski Cios",
      description: "+15% szansy na krytyczne obrażenia (2x)",
      rarity: "legendary",
      effect: (playerIndex) => { 
        players[playerIndex].critChance += 0.15;
        players[playerIndex].stats.critChance = players[playerIndex].critChance;
      }
    },
    {
      id: "legendary_crit_multiplier",
      name: "Krytyczna Moc",
      description: "+0.5 do mnożnika obrażeń krytycznych",
      rarity: "legendary",
      effect: (playerIndex) => { 
        players[playerIndex].critMultiplier += 0.5;
      }
    },
    {
      id: "legendary_boss_reroll",
      name: "Mistrz Przerzutów",
      description: "+2 przerzuty w sklepie bossa",
      rarity: "legendary",
      effect: (playerIndex) => { 
        players[playerIndex].bossRerolls += 2;
      }
    },
    {
      id: "legendary_extra_hp",
      name: "Dodatkowe Życie+++",
      description: "+50 maksymalnego HP",
      rarity: "legendary",
      effect: (playerIndex) => { 
        players[playerIndex].maxHp += 50;
        players[playerIndex].hp += 50;
        players[playerIndex].stats.health = players[playerIndex].maxHp;
        updateHealthBar(playerIndex);
      }
    },
    {
      id: "legendary_global_cd",
      name: "Czasoprzestrzeń",
      description: "-20% wszystkich cooldownów",
      rarity: "legendary",
      effect: (playerIndex) => { 
        players[playerIndex].globalCooldownReduction += 0.2;
        applyGlobalCooldownReduction(playerIndex);
      }
    },
    {
      id: "legendary_shooting_range",
      name: "Satelita Szpiegowski",
      description: "+75% zasięgu strzelania",
      rarity: "legendary",
      effect: (playerIndex) => { 
        players[playerIndex].stats.shootingRange *= 1.75;
      }
    },
    {
      id: "legendary_xp_multiplier",
      name: "Mnożnik Doświadczenia+++",
      description: "+50% doświadczenia",
      rarity: "legendary",
      effect: (playerIndex) => { 
        players[playerIndex].fortune *= 1.5;
        players[playerIndex].stats.fortune = players[playerIndex].fortune;
      }
    }
  ]
};

function applyGlobalCooldownReduction(playerIndex) {
  const player = players[playerIndex];
  const reduction = player.globalCooldownReduction;
  
  player.dashCooldownMax = Math.floor(480 * (1 - reduction));
  player.stats.cooldown = player.dashCooldownMax;
  
  if (player.meteorSkill) {
    player.meteorCooldownMax = Math.floor(780 * (1 - reduction));
  }
  
  player.attackSpeed = Math.floor(500 * (1 - reduction));
  player.stats.attackSpeed = player.attackSpeed;
  
  if (player.chainLightning) {
    player.chainLightningCooldownMax = Math.floor(600 * (1 - reduction));
  }
  if (player.stunLightning) {
    player.stunLightningCooldownMax = Math.floor(900 * (1 - reduction));
  }
  if (player.poisonSkill) {
    player.poisonCooldownMax = Math.floor(450 * (1 - reduction));
  }
}

function activateChainLightning(playerIndex) {
  const player = players[playerIndex];
  if (player.chainLightningCooldown > 0 || !player.chainLightning) return;
  
  let targets = [];
  const maxTargets = 10;
  const chainRange = 150;
  
  enemies.forEach(enemy => {
    const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
    if (dist < chainRange && !enemy.isSummon) {
      targets.push({ enemy, dist });
    }
  });
  
  targets.sort((a, b) => a.dist - b.dist);
  targets = targets.slice(0, maxTargets);
  
  if (targets.length > 0) {
    targets.forEach(target => {
      const damage = player.baseDamage * 2;
      target.enemy.health -= damage;
      
      lightningEffects.push({
        x: target.enemy.x,
        y: target.enemy.y,
        timer: 30,
        size: 30
      });
      
      if (target.enemy.health <= 0 && !target.enemy.isSummon) {
        enemies.splice(enemies.indexOf(target.enemy), 1);
        enemiesAlive--;
        spawnXPOrb(target.enemy.x, target.enemy.y, target.enemy.isBoss, playerIndex, target.enemy);
        const goldGain = Math.floor((Math.floor(Math.random() * 12) + 8) * player.fortune);
        gold += goldGain;
        score += target.enemy.isBoss ? 100 : 5;
      }
    });
    
    player.chainLightningCooldown = player.chainLightningCooldownMax;
  }
}

function activateStunLightning(playerIndex) {
  const player = players[playerIndex];
  if (player.stunLightningCooldown > 0 || !player.stunLightning) return;
  
  const stunRange = 200;
  let stunnedEnemies = 0;
  
  enemies.forEach(enemy => {
    const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
    if (dist < stunRange && !enemy.isSummon) {
      stunTimers[enemies.indexOf(enemy)] = 90;
      stunnedEnemies++;
      
      stunEffects.push({
        x: enemy.x,
        y: enemy.y,
        timer: 90,
        size: enemy.r * 2
      });
    }
  });
  
  if (stunnedEnemies > 0) {
    player.stunLightningCooldown = player.stunLightningCooldownMax;
  }
}

function activatePoison(playerIndex) {
  const player = players[playerIndex];
  if (player.poisonCooldown > 0 || !player.poisonSkill) return;
  
  const poisonRange = 250;
  let poisonedEnemies = 0;
  
  enemies.forEach(enemy => {
    const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
    if (dist < poisonRange && !enemy.isSummon) {
      if (!enemy.poisoned) {
        enemy.poisoned = true;
        enemy.poisonDuration = 300;
        enemy.poisonDamage = player.baseDamage * 0.5;
        poisonedEnemies++;
        
        poisonEffects.push({
          x: enemy.x,
          y: enemy.y,
          timer: 300,
          size: enemy.r * 1.5,
          enemyIndex: enemies.indexOf(enemy)
        });
      }
    }
  });
  
  if (poisonedEnemies > 0) {
    player.poisonCooldown = player.poisonCooldownMax;
  }
}

function selectCharacter(character, playerIndex) {
  selectedCharacters[playerIndex] = character;
  
  document.querySelectorAll('.character-option').forEach(opt => {
    opt.classList.remove('selected');
  });
  
  document.querySelectorAll(`.character-option[data-character="${character}"]`).forEach(opt => {
    if (opt.closest('.player2-selection') && playerIndex === 1) {
      opt.classList.add('selected');
    } else if (!opt.closest('.player2-selection') && playerIndex === 0) {
      opt.classList.add('selected');
    }
  });
}

function setPlayerCount(count) {
  playerCount = count;
  
  document.querySelectorAll('.count-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  document.querySelectorAll('.count-btn')[count - 1].classList.add('active');
  
  if (count === 2) {
    player2Selection.style.display = 'block';
    player2Bars.style.display = 'block';
  } else {
    player2Selection.style.display = 'none';
    player2Bars.style.display = 'none';
  }
}

document.addEventListener("keydown", e => {
  keys[e.key] = true;
  dashKeysPressed[e.key] = true;
  
  if (e.key === " " && !players[0].isDashing && players[0].currentDashes > 0 && !cardSelectionActive && !shopActive && !bossShopActive) {
    performDash(0);
  }
  
  if (playerCount === 2) {
    keys2[e.key] = true;
    dashKeysPressed2[e.key] = true;
    
    if (e.key === "Enter" && !players[1].isDashing && players[1].currentDashes > 0 && !cardSelectionActive && !shopActive && !bossShopActive) {
      performDash(1);
    }
  }
  
  if (e.key === "Escape") {
    if (document.getElementById('inventoryMenu').classList.contains('active')) {
      closeInventory();
    } else if (document.getElementById('pauseMenu').classList.contains('active')) {
      resumeGame();
    } else if (gameRunning) {
      togglePause();
    }
  }
  
  if ((e.key === 'i' || e.key === 'I') && gameRunning && !cardSelectionActive && !bossShopActive) {
    openInventory();
  }
});

document.addEventListener("keyup", e => {
  keys[e.key] = false;
  dashKeysPressed[e.key] = false;
  
  if (playerCount === 2) {
    keys2[e.key] = false;
    dashKeysPressed2[e.key] = false;
  }
});

canvas.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

function togglePause() {
  if (gameRunning && !cardSelectionActive && !bossShopActive) {
    gameRunning = false;
    document.getElementById('pauseMenu').classList.add('active');
  }
}

function resumeGame() {
  gameRunning = true;
  document.getElementById('pauseMenu').classList.remove('active');
}

function openInventory() {
  if (gameRunning && !cardSelectionActive && !bossShopActive) {
    gameRunning = false;
    updateInventory();
    document.getElementById('inventoryMenu').classList.add('active');
  }
}

function closeInventory() {
  gameRunning = true;
  document.getElementById('inventoryMenu').classList.remove('active');
}

function switchInventoryTab(tabName) {
  document.querySelectorAll('.inventory-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelectorAll('.inventory-tab').forEach(btn => {
    btn.classList.remove('active');
  });
  
  document.getElementById(tabName + 'Tab').classList.add('active');
  document.querySelector(`.inventory-tab[onclick="switchInventoryTab('${tabName}')"]`).classList.add('active');
}

function updateInventory() {
  const player = players[currentPlayerLevelingUp];
  const piercingInfo = player.piercingLevel > 0 ? 
    ` (Poziom ${player.piercingLevel}: ${Math.pow(2, player.piercingLevel)} przeciwników)` : 
    "";
    
  const knifeInfo = selectedCharacters[currentPlayerLevelingUp] === "cygan" ? 
    `Noże: ${1 + knifeUpgrades.cygan.filter(upgrade => upgrade).length}/4` : "";
    
  document.getElementById('playerStats').innerHTML = `
    <h3>Statystyki Gracza ${currentPlayerLevelingUp + 1}</h3>
    <p>Postać: ${selectedCharacters[currentPlayerLevelingUp]}</p>
    <p>Poziom: ${player.level}</p>
    <p>HP: ${Math.round(player.hp)}/${Math.round(player.maxHp)}</p>
    <p>Obrażenia: ${Math.round(player.baseDamage)}</p>
    <p>Prędkość: ${player.speed.toFixed(1)}</p>
    <p>Szybkostrzelność: ${player.attackSpeed}ms</p>
    <p>Krytyczne: ${(player.critChance * 100).toFixed(1)}%</p>
    <p>Dashe: ${player.currentDashes}/${player.maxDashes}</p>
    <p>Przebijanie: ${player.piercingShot ? 'Tak' + piercingInfo : 'Nie'}</p>
    ${knifeInfo ? `<p>${knifeInfo}</p>` : ''}
    <p>Złoto: ${gold}</p>
    <p>Fala: ${wave + 1}</p>
  `;
  
  const cardsContainer = document.getElementById('collectedCards');
  cardsContainer.innerHTML = '';
  if (collectedCards.length === 0) {
    cardsContainer.innerHTML = '<p>Brak zebranych kart</p>';
  } else {
    collectedCards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.className = 'inventory-item';
      cardElement.innerHTML = `
        <h4>${card.name}</h4>
        <p>${card.description}</p>
        <p class="card-rarity">${getRarityName(card.rarity)}</p>
      `;
      cardsContainer.appendChild(cardElement);
    });
  }
  
  const itemsContainer = document.getElementById('collectedItems');
  itemsContainer.innerHTML = '';
  if (collectedItems.length === 0) {
    itemsContainer.innerHTML = '<p>Brak zebranych przedmiotów</p>';
  } else {
    collectedItems.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'inventory-item';
      itemElement.innerHTML = `
        <h4>${item.name}</h4>
        <p>${item.description}</p>
      `;
      itemsContainer.appendChild(itemElement);
    });
  }
}

function updateHealthBar(playerIndex) {
  const player = players[playerIndex];
  const healthPercent = (player.hp / player.maxHp) * 100;
  
  const currentHP = Math.round(player.hp);
  const maxHP = Math.round(player.maxHp);
  
  if (playerIndex === 0) {
    healthFill.style.width = `${healthPercent}%`;
    healthText.textContent = `${currentHP}/${maxHP}`;
  } else {
    healthFill2.style.width = `${healthPercent}%`;
    healthText2.textContent = `${currentHP}/${maxHP}`;
  }
}

function updateXPBar(playerIndex) {
  const player = players[playerIndex];
  
  if (isNaN(player.xp) || isNaN(player.xpToNextLevel)) {
    player.xp = 0;
    player.xpToNextLevel = 100;
  }
  
  const xpPercent = (player.xp / player.xpToNextLevel) * 100;
  
  if (playerIndex === 0) {
    xpFill.style.width = `${xpPercent}%`;
    xpText.textContent = `${Math.floor(player.xp)}/${Math.floor(player.xpToNextLevel)}`;
  } else {
    xpFill2.style.width = `${xpPercent}%`;
    xpText2.textContent = `${Math.floor(player.xp)}/${Math.floor(player.xpToNextLevel)}`;
  }
}

function updateDashBar(playerIndex) {
  const player = players[playerIndex];
  const dashPercent = player.currentDashes > 0 ? 100 : (1 - (player.dashCooldown / player.dashCooldownMax)) * 100;
  
  if (playerIndex === 0) {
    dashFill.style.width = `${dashPercent}%`;
    dashText.textContent = `${player.currentDashes}/${player.maxDashes}`;
  } else {
    dashFill2.style.width = `${dashPercent}%`;
    dashText2.textContent = `${player.currentDashes}/${player.maxDashes}`;
  }
}

function showGame() {
  shootingMode = "auto";
  
  for (let i = 0; i < playerCount; i++) {
    const character = selectedCharacters[i];
    
    if (character === "kuza") {
      players[i].weapon = "pistol";
      players[i].baseDamage = 5;
      players[i].hp = 25;
      players[i].maxHp = 25;
      players[i].speed = 2.5;
      players[i].critChance = 0;
    } else if (character === "menel") {
      players[i].weapon = "bottle";
      players[i].baseDamage = 7;
      players[i].hp = 30;
      players[i].maxHp = 30;
      players[i].speed = 2.2;
      players[i].critChance = 0.05;
    } else if (character === "cygan") {
      players[i].weapon = "knife";
      players[i].baseDamage = 6;
      players[i].hp = 28;
      players[i].maxHp = 28;
      players[i].speed = 2.8;
      players[i].critChance = 0.1;
      players[i].stats.shootingRange = 350;
    }
    
    players[i].stats.health = players[i].maxHp;
    players[i].stats.damage = players[i].baseDamage;
    players[i].stats.speed = players[i].speed;
    players[i].stats.critChance = players[i].critChance;
    players[i].stats.shootingRange = character === "cygan" ? 350 : 300;
    
    players[i].maxDashes = 1;
    players[i].currentDashes = 1;
    players[i].bossRerolls = 0;
    players[i].dodgeChance = 0;
    players[i].globalCooldownReduction = 0;
    players[i].chainLightning = false;
    players[i].stunLightning = false;
    players[i].poisonSkill = false;
    players[i].piercingShot = false;
    players[i].piercingLevel = 0;
    players[i].moveDirection = { x: 0, y: 0 };
    
    updateHealthBar(i);
    updateXPBar(i);
    updateDashBar(i);
  }
  
  knifeUpgrades.cygan = [false, false, false];
  
  mainMenu.classList.remove("active");
  settingsMenu.classList.remove("active");
  instructionsMenu.classList.remove("active");
  gameOverMenu.classList.remove("active");
  cardSelectionMenu.classList.remove("active");
  document.getElementById('characterTypeMenu').classList.remove("active");
  document.getElementById('pauseMenu').classList.remove("active");
  document.getElementById('inventoryMenu').classList.remove("active");
  canvas.style.display = "block";
  document.getElementById("ui").style.display = "block";
  
  if (playerCount === 2) {
    player2Bars.style.display = 'block';
  } else {
    player2Bars.style.display = 'none';
  }
  
  startGame();
}

function showCharacterTypeMenu() {
  mainMenu.classList.remove("active");
  document.getElementById('characterTypeMenu').classList.add("active");
}

function backToMainFromCharacterType() {
  document.getElementById('characterTypeMenu').classList.remove("active");
  mainMenu.classList.add("active");
}

function showSettings() {
  mainMenu.classList.remove("active");
  settingsMenu.classList.add("active");
}

function showInstructions() {
  mainMenu.classList.remove("active");
  instructionsMenu.classList.add("active");
}

function backToMenu() {
  mainMenu.classList.add("active");
  settingsMenu.classList.remove("active");
  instructionsMenu.classList.remove("active");
  gameOverMenu.classList.remove("active");
  cardSelectionMenu.classList.remove("active");
  document.getElementById('characterTypeMenu').classList.remove("active");
  document.getElementById('pauseMenu').classList.remove("active");
  document.getElementById('inventoryMenu').classList.remove("active");
  canvas.style.display = "none";
  document.getElementById("ui").style.display = "none";
  gameRunning = false;
  clearInterval(waveInterval);
  clearInterval(spawnInterval);
  boss = null;
  purchasedBossItems = [];
  waveStartDisplay = false;
  spawnWarnings = [];
  enemySpawnGroups = [];
  lightningEffects = [];
  stunEffects = [];
  poisonEffects = [];
  dustParticles = [];
  stunTimers = {};
}

function startGame() {
  console.log("Rozpoczynanie gry...");
  
  score = 0;
  gold = 0;
  spawnPaused = false;
  purchasedBossItems = [];
  currentBossRerolls = 5;
  spawnWarnings = [];
  enemySpawnGroups = [];
  specialXpChance = 0.02;
  lightningEffects = [];
  stunEffects = [];
  poisonEffects = [];
  dustParticles = [];
  stunTimers = {};
  collectedCards = [];
  collectedItems = [];
  initMapSections();
   
  for (let i = 0; i < playerCount; i++) {
    const character = selectedCharacters[i];
    
    if (character === "kuza") {
      players[i].hp = 25;
      players[i].maxHp = 25;
    } else if (character === "menel") {
      players[i].hp = 30;
      players[i].maxHp = 30;
    } else if (character === "cygan") {
      players[i].hp = 28;
      players[i].maxHp = 28;
    }
    
    players[i].x = i === 0 ? 500 : 700;
    players[i].y = 450;
    players[i].level = 1;
    players[i].xp = 0;
    players[i].xpToNextLevel = 100;
    players[i].dashCooldown = 0;
    players[i].dashAvailable = true;
    players[i].isDashing = false;
    players[i].speed = character === "cygan" ? 2.8 : (character === "kuza" ? 2.5 : 2.2);
    players[i].baseDamage = character === "kuza" ? 5 : (character === "menel" ? 7 : 6);
    players[i].damageBonus = 0;
    players[i].attackSpeed = 500;
    players[i].lifeSteal = 0;
    players[i].fortune = 1;
    players[i].xpMagnetRange = 80;
    players[i].critChance = character === "cygan" ? 0.1 : (character === "menel" ? 0.05 : 0);
    players[i].critMultiplier = 2;
    players[i].facing = 'right';
    players[i].tripleShot = false;
    players[i].piercingShot = false;
    players[i].piercingLevel = 0;
    players[i].meteorSkill = false;
    players[i].meteorCooldown = 0;
    players[i].meteorCooldownMax = 780;
    players[i].maxDashes = 1;
    players[i].currentDashes = 1;
    players[i].bossRerolls = 0;
    players[i].dodgeChance = 0;
    players[i].globalCooldownReduction = 0;
    players[i].chainLightning = false;
    players[i].chainLightningCooldown = 0;
    players[i].chainLightningCooldownMax = 600;
    players[i].stunLightning = false;
    players[i].stunLightningCooldown = 0;
    players[i].stunLightningCooldownMax = 900;
    players[i].poisonSkill = false;
    players[i].poisonCooldown = 0;
    players[i].poisonCooldownMax = 450;
    players[i].isMoving = false;
    players[i].lastX = players[i].x;
    players[i].lastY = players[i].y;
    players[i].moveDirection = { x: 0, y: 0 };
    
    players[i].stats = {
      damage: players[i].baseDamage,
      speed: players[i].speed,
      health: players[i].maxHp,
      cooldown: players[i].dashCooldownMax,
      xpRange: players[i].xpMagnetRange,
      attackSpeed: players[i].attackSpeed,
      lifeSteal: players[i].lifeSteal,
      fortune: players[i].fortune,
      critChance: players[i].critChance,
      shootingRange: character === "cygan" ? 350 : 300
    };
    
    updateHealthBar(i);
    updateXPBar(i);
    updateDashBar(i);
  }
  
  wave = 0;
  waveTimer = 0;
  enemies.length = 0;
  enemyProjectiles.length = 0;
  bullets.length = 0;
  xpOrbs.length = 0;
  meteors.length = 0;
  boss = null;
  gameRunning = true;
  difficulty = document.getElementById("difficulty").value;
  
  waveStartDisplay = true;
  waveStartTimer = waveStartDuration;
  spawnPaused = true;
  
  console.log("Gra rozpoczęta pomyślnie");
}

function nextWave() {
  enemies.length = 0;
  enemyProjectiles.length = 0;
  bullets.length = 0;
  enemiesAlive = 0;
  spawnPaused = false;
  spawnWarnings = [];
  enemySpawnGroups = [];
  stunTimers = {};
  
  if (wave < 2137) {
    waveInfo.innerText = `Fala ${wave + 1}`;
    
    enemiesSpawned = 0;
    
    if ((wave + 1) % 5 === 0) {
      enemiesToSpawn = 1;
      spawnBossWave();
    } else {
      enemiesToSpawn = 15 + wave * 12;
      startSpawning();
    }
  }
}

function getSpawnRate() {
  let spawnRate = 1200 - (wave * 30);
  if (spawnRate < 200) spawnRate = 200;
  
  if (difficulty === "easy") spawnRate *= 1.2;
  if (difficulty === "hard") spawnRate *= 0.8;
  
  return spawnRate;
}

function startSpawning() {
  if (spawnInterval) {
    clearInterval(spawnInterval);
  }

  spawnInterval = setInterval(() => {
    if (!gameRunning || enemiesSpawned >= enemiesToSpawn || spawnPaused) {
      if (enemiesSpawned >= enemiesToSpawn) {
        clearInterval(spawnInterval);
      }
      return;
    }
    
    const groupSize = 1;
    const spawnPositions = generateSpawnPositions(groupSize);
    
    spawnWarnings.push({
      x: spawnPositions.x,
      y: spawnPositions.y,
      timer: 60,
      groupSize: groupSize
    });
    
    enemySpawnGroups.push({
      x: spawnPositions.x,
      y: spawnPositions.y,
      timer: 60,
      groupSize: groupSize,
      enemiesToSpawn: groupSize
    });
    
    enemiesSpawned += groupSize;
    enemiesAlive += groupSize;
  }, getSpawnRate());
}

function generateSpawnPositions(groupSize) {
  const currentSection = mapSections[currentMapSection];
  const margin = 50;
  let x, y;
  
  let validPosition = false;
  let attempts = 0;
  
  while (!validPosition && attempts < 50) {
    x = currentSection.x + margin + Math.random() * (currentSection.width - 2 * margin);
    y = currentSection.y + margin + Math.random() * (currentSection.height - 2 * margin);
    
    validPosition = true;
    for (let i = 0; i < playerCount; i++) {
      const dist = Math.hypot(x - players[i].x, y - players[i].y);
      if (dist < 200) {
        validPosition = false;
        break;
      }
    }
    attempts++;
  }
  
  return { x, y };
}

function spawnBossWave() {
  const randomBossIndex = Math.floor(Math.random() * bosses.length);
  const selectedBoss = bosses[randomBossIndex];
  
  const spawnPos = generateSpawnPositions(1);
  spawnWarnings.push({
    x: spawnPos.x,
    y: spawnPos.y,
    timer: 90,
    groupSize: 1,
    isBoss: true
  });
  
  enemySpawnGroups.push({
    x: spawnPos.x,
    y: spawnPos.y,
    timer: 90,
    groupSize: 1,
    enemiesToSpawn: 1,
    isBoss: true,
    bossData: selectedBoss
  });
  
  enemiesSpawned++;
  enemiesAlive++;
}

function spawnBoss(bossData, x, y) {
  const waveMultiplier = 1 + (wave / 10);
  
  enemies.push({ 
    x, y, 
    r: bossData.size,
    speed: bossData.speed,
    health: Math.floor(bossData.health * waveMultiplier),
    maxHealth: Math.floor(bossData.health * waveMultiplier),
    damage: Math.floor(bossData.damage * waveMultiplier * 0.7),
    color: bossData.color,
    class: bossData.class,
    name: bossData.name,
    attackRange: 200,
    attackCooldown: 120,
    attackTimer: 0,
    projectileSpeed: 4,
    isBoss: true,
    special: bossData.special,
    xpValue: bossData.xpValue,
    isSummon: false
  });
}

function getRandomEnemyType() {
  const rand = Math.random() * 100;
  
  if (rand < 40) {
    return 0;
  } else if (rand < 65) {
    return 1;
  } else if (rand < 85) {
    return 2;
  } else if (rand < 95) {
    return 3;
  } else {
    return 4;
  }
}

function spawnEnemy(x, y, enemyType) {
  let speed, health, size, color, enemyClass, attackRange, attackCooldown, attackTimer, projectileSpeed, damage;
  
  const baseHealthMultiplier = 3 + (wave * 0.5);
  const healthMultiplier = baseHealthMultiplier;
  const damageMultiplier = 1 + wave * 0.15;

  switch(enemyType) {
    case 0:
      speed = 1.2;
      health = Math.floor((3 + wave * 0.5) * healthMultiplier);
      damage = Math.floor((1 + wave * 0.08) * damageMultiplier);
      size = 14 + wave * 0.3;
      color = "red";
      enemyClass = "warrior";
      attackRange = 50;
      attackCooldown = 60;
      projectileSpeed = 0;
      break;
    case 1:
      speed = 0.8;
      health = Math.floor((4 + wave * 0.6) * healthMultiplier);
      damage = Math.floor((2 + wave * 0.15) * damageMultiplier);
      size = 16 + wave * 0.3;
      color = "blue";
      enemyClass = "mage";
      attackRange = 300;
      attackCooldown = 120;
      projectileSpeed = 4;
      break;
    case 2:
      speed = 1.0;
      health = Math.floor((3.5 + wave * 0.55) * healthMultiplier);
      damage = Math.floor((1.5 + wave * 0.12) * damageMultiplier);
      size = 13 + wave * 0.3;
      color = "green";
      enemyClass = "archer";
      attackRange = 250;
      attackCooldown = 90;
      projectileSpeed = 5;
      break;
    case 3:
      speed = 1.5;
      health = Math.floor((2.5 + wave * 0.45) * healthMultiplier);
      damage = Math.floor((1.2 + wave * 0.08) * damageMultiplier);
      size = 12 + wave * 0.3;
      color = "purple";
      enemyClass = "assassin";
      attackRange = 40;
      attackCooldown = 45;
      projectileSpeed = 0;
      break;
    case 4:
      speed = 0.7;
      health = Math.floor((6 + wave * 0.8) * healthMultiplier);
      damage = Math.floor((2.5 + wave * 0.2) * damageMultiplier);
      size = 18 + wave * 0.3;
      color = "cyan";
      enemyClass = "summoner";
      attackRange = 200;
      attackCooldown = 180;
      projectileSpeed = 0;
      break;
  }
  
  if (difficulty === "easy") {
    speed *= 0.8;
    health *= 0.8;
    damage *= 0.8;
  }
  if (difficulty === "hard") {
    speed *= 1.3;
    health *= 1.3;
    damage *= 1.3;
  }

  enemies.push({ 
    x, y, 
    r: size, 
    speed, 
    health,
    maxHealth: health,
    damage: damage,
    color,
    class: enemyClass,
    attackRange,
    attackCooldown,
    attackTimer: 0,
    projectileSpeed,
    isBoss: false,
    summonCooldown: enemyClass === "summoner" ? 600 : 0,
    lastSummonTime: 0,
    maxSummons: 2,
    currentSummons: 0,
    lastAttackTime: 0,
    isSummon: false,
    poisoned: false,
    poisonDuration: 0,
    poisonDamage: 0
  });
}

function summonGolem(x, y, summoner) {
  if (summoner.currentSummons >= summoner.maxSummons) {
    return;
  }
  
  const healthMultiplier = 1 + wave * 0.2;
  const damageMultiplier = 1 + wave * 0.15;
  
  spawnWarnings.push({
    x: x,
    y: y,
    timer: 30,
    groupSize: 1,
    isGolem: true
  });
  
  enemySpawnGroups.push({
    x: x,
    y: y,
    timer: 30,
    groupSize: 1,
    enemiesToSpawn: 1,
    isGolem: true,
    summoner: summoner
  });
  
  enemiesAlive++;
  summoner.currentSummons++;
}

function performDash(playerIndex) {
  const player = players[playerIndex];
  if (player.currentDashes <= 0) return;
  
  const dashDistance = 100;
  let angle;
  
  if (player.moveDirection.x !== 0 || player.moveDirection.y !== 0) {
    angle = Math.atan2(player.moveDirection.y, player.moveDirection.x);
  } else {
    angle = Math.atan2(mouseY - player.y, mouseX - player.x);
  }
  
  player.dashTargetX = player.x + Math.cos(angle) * dashDistance;
  player.dashTargetY = player.y + Math.sin(angle) * dashDistance;
  
  const currentSection = mapSections[currentMapSection];
  player.dashTargetX = Math.max(currentSection.x + player.r, Math.min(currentSection.x + currentSection.width - player.r, player.dashTargetX));
  player.dashTargetY = Math.max(currentSection.y + player.r, Math.min(currentSection.y + currentSection.height - player.r, player.dashTargetY));
  
  player.isDashing = true;
  player.dashTime = 0;
  player.currentDashes--;
  player.dashCooldown = player.dashCooldownMax;
  
  updateDashBar(playerIndex);
  
  if (playerIndex === 0) {
    dashKeysPressed = {};
  } else {
    dashKeysPressed2 = {};
  }
}

setInterval(() => { 
  if(gameRunning && !shopActive && !cardSelectionActive && !bossShopActive) {
    for (let i = 0; i < playerCount; i++) {
      if (!players[i].isDashing) {
        shoot(i);
      }
    }
  }
}, 100);

function shootKnife(playerIndex) {
  if (!gameRunning || shopActive || cardSelectionActive || bossShopActive || players[playerIndex].isDashing) return;
  
  const currentTime = Date.now();
  if (currentTime - lastShotTime[playerIndex] < players[playerIndex].attackSpeed) return;
  
  lastShotTime[playerIndex] = currentTime;
  
  const player = players[playerIndex];
  let closestEnemy = null;
  let minDist = Infinity;
  const shootingRange = 350;
  
  enemies.forEach(enemy => {
    const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
    if (dist < minDist && dist < shootingRange) {
      minDist = dist;
      closestEnemy = enemy;
    }
  });
  
  if (!closestEnemy) return;
  
  const isCritical = Math.random() < player.critChance;
  let damage = player.baseDamage + player.damageBonus;
  
  if (isCritical) {
    damage = Math.floor(damage * player.critMultiplier);
  }
  
  if (Math.random() < 0.05 && !closestEnemy.isSummon) {
    const stolenXP = Math.floor(closestEnemy.xpValue * 0.3);
    collectXP(stolenXP, playerIndex);
  }
  
  const knifeCount = 1 + (knifeUpgrades.cygan.filter(upgrade => upgrade).length);
  const angles = [];
  
  angles.push(Math.atan2(closestEnemy.y - player.y, closestEnemy.x - player.x));
  
  if (knifeCount >= 2) {
    angles.push(angles[0] - Math.PI/6);
  }
  if (knifeCount >= 3) {
    angles.push(angles[0] + Math.PI/6);
  }
  if (knifeCount >= 4) {
    angles.push(angles[0] - Math.PI/3);
  }
  
  angles.forEach(angle => {
    bullets.push({ 
      x: player.x, 
      y: player.y, 
      r: 10,
      dx: Math.cos(angle) * 7, 
      dy: Math.sin(angle) * 7, 
      damage: damage,
      type: "knife",
      playerIndex: playerIndex,
      isCritical: isCritical,
      piercing: false,
      piercingCount: 0,
      piercedEnemies: [],
      returnToPlayer: false,
      startX: player.x,
      startY: player.y,
      maxDistance: 300,
      travelDistance: 0,
      hasHit: false
    });
  });
}

function shoot(playerIndex) {
  if (players[playerIndex].weapon === "knife") {
    shootKnife(playerIndex);
  } else {
    if (!gameRunning || shopActive || cardSelectionActive || bossShopActive || players[playerIndex].isDashing) return;
    
    const currentTime = Date.now();
    if (currentTime - lastShotTime[playerIndex] < players[playerIndex].attackSpeed) return;
    
    lastShotTime[playerIndex] = currentTime;
    
    const player = players[playerIndex];
    let angle;
    let targetX, targetY;
    
    let closestEnemy = null;
    let minDist = Infinity;
    const shootingRange = player.stats.shootingRange || 300;
    
    enemies.forEach(enemy => {
      const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
      if (dist < minDist && dist < shootingRange) {
        minDist = dist;
        closestEnemy = enemy;
      }
    });
    
    if (closestEnemy) {
      angle = Math.atan2(closestEnemy.y - player.y, closestEnemy.x - player.x);
      targetX = closestEnemy.x;
      targetY = closestEnemy.y;
      
      if (targetX < player.x) {
        player.facing = 'left';
      } else {
        player.facing = 'right';
      }
    } else {
      return;
    }
    
    const isCritical = Math.random() < player.critChance;
    let damage = player.baseDamage + player.damageBonus;
    
    if (isCritical) {
      damage = Math.floor(damage * player.critMultiplier);
    }
    
    const piercingCount = player.piercingLevel > 0 ? Math.pow(2, player.piercingLevel) : 0;
    
    if (player.tripleShot) {
      const angles = [angle, angle - 0.2, angle + 0.2];
      
      angles.forEach((shotAngle, index) => {
        bullets.push({ 
          x: player.x, 
          y: player.y, 
          r: player.weapon === "pistol" ? 8 : 10,
          dx: Math.cos(shotAngle) * (player.weapon === "pistol" ? 5 : 4), 
          dy: Math.sin(shotAngle) * (player.weapon === "pistol" ? 5 : 4), 
          damage: damage,
          type: player.weapon,
          playerIndex: playerIndex,
          isCritical: isCritical,
          piercing: player.piercingShot,
          piercingCount: piercingCount,
          piercedEnemies: []
        });
      });
    } else if (player.piercingShot) {
      bullets.push({ 
        x: player.x, 
        y: player.y, 
        r: player.weapon === "pistol" ? 8 : 10,
        dx: Math.cos(angle) * (player.weapon === "pistol" ? 5 : 4), 
        dy: Math.sin(angle) * (player.weapon === "pistol" ? 5 : 4), 
        damage: damage,
        type: player.weapon,
        playerIndex: playerIndex,
        isCritical: isCritical,
        piercing: true,
        piercingCount: piercingCount,
        piercedEnemies: []
      });
    } else {
      bullets.push({ 
        x: player.x, 
        y: player.y, 
        r: player.weapon === "pistol" ? 8 : 10,
        dx: Math.cos(angle) * (player.weapon === "pistol" ? 5 : 4), 
        dy: Math.sin(angle) * (player.weapon === "pistol" ? 5 : 4), 
        damage: damage,
        type: player.weapon,
        playerIndex: playerIndex,
        isCritical: isCritical,
        piercing: false,
        piercingCount: 0,
        piercedEnemies: []
      });
    }
  }
}

function updateBullets() {
  bullets.forEach((b, i) => {
    if (b.type === "knife") {
      if (!b.returnToPlayer && !b.hasHit) {
        b.x += b.dx;
        b.y += b.dy;
        b.travelDistance = Math.hypot(b.x - b.startX, b.y - b.startY);
        
        if (b.travelDistance >= b.maxDistance) {
          b.returnToPlayer = true;
          const player = players[b.playerIndex];
          const returnAngle = Math.atan2(player.y - b.y, player.x - b.x);
          b.dx = Math.cos(returnAngle) * 8;
          b.dy = Math.sin(returnAngle) * 8;
        }
      } else if (b.returnToPlayer || b.hasHit) {
        b.x += b.dx;
        b.y += b.dy;
        
        const player = players[b.playerIndex];
        const distToPlayer = Math.hypot(b.x - player.x, b.y - player.y);
        
        if (distToPlayer < 25) {
          bullets.splice(i, 1);
          return;
        }
      }
    } else {
      b.x += b.dx;
      b.y += b.dy;
    }
    
    let hitEnemy = false;
    
    for (let j = enemies.length - 1; j >= 0; j--) {
      const enemy = enemies[j];
      const dist = Math.hypot(b.x - enemy.x, b.y - enemy.y);
      
      if (dist < enemy.r + b.r) {
        if (b.type === "knife" && (b.returnToPlayer || b.hasHit)) {
          continue;
        }
        
        enemy.health -= b.damage;
        
        if (players[b.playerIndex].lifeSteal > 0) {
          const healAmount = b.damage * players[b.playerIndex].lifeSteal;
          players[b.playerIndex].hp = Math.min(players[b.playerIndex].maxHp, players[b.playerIndex].hp + healAmount);
          updateHealthBar(b.playerIndex);
        }
        
        if (enemy.health <= 0) {
          if (!enemy.isSummon) {
            enemies.splice(j, 1);
            enemiesAlive--;
            spawnXPOrb(enemy.x, enemy.y, enemy.isBoss, b.playerIndex, enemy);
            const goldGain = Math.floor((Math.floor(Math.random() * 12) + 8) * players[b.playerIndex].fortune);
            gold += goldGain;
            score += enemy.isBoss ? 100 : 5;
          } else {
            const summonerIndex = enemies.findIndex(e => e.class === "summoner" && e.currentSummons > 0);
            if (summonerIndex !== -1) {
              enemies[summonerIndex].currentSummons--;
            }
            enemies.splice(j, 1);
            enemiesAlive--;
          }
        }
        
        hitEnemy = true;
        
        if (b.type === "knife") {
          b.hasHit = true;
          b.returnToPlayer = true;
          const player = players[b.playerIndex];
          const returnAngle = Math.atan2(player.y - b.y, player.x - b.x);
          b.dx = Math.cos(returnAngle) * 8;
          b.dy = Math.sin(returnAngle) * 8;
          break;
        }
        
        if (b.piercing) {
          b.piercedEnemies.push(j);
          if (b.piercedEnemies.length >= b.piercingCount) {
            bullets.splice(i, 1);
            break;
          }
        } else {
          bullets.splice(i, 1);
          break;
        }
      }
    }
    
    if (b.type !== "knife" && (b.x < -b.r || b.y < -b.r || b.x > mapWidth + b.r || b.y > mapHeight + b.r)) {
      bullets.splice(i, 1);
    }
  });
}

function enemyAttack(enemy, targetPlayer) {
  const enemyIndex = enemies.indexOf(enemy);
  if (stunTimers[enemyIndex] && stunTimers[enemyIndex] > 0) {
    return;
  }
  
  const currentTime = Date.now();
  
  if (Math.random() < targetPlayer.dodgeChance) {
    return;
  }
  
  if (enemy.class === "warrior" || enemy.class === "assassin" || enemy.class === "golem") {
    const dist = Math.hypot(enemy.x - targetPlayer.x, enemy.y - targetPlayer.y);
    if (dist <= enemy.attackRange + targetPlayer.r) {
      if (currentTime - enemy.lastAttackTime >= enemy.attackCooldown * 16.67) {
        targetPlayer.hp -= enemy.damage;
        updateHealthBar(players.indexOf(targetPlayer));
        enemy.lastAttackTime = currentTime;
        
        if (targetPlayer.hp <= 0) {
          gameOver();
        }
      }
    }
  } else if (enemy.attackTimer <= 0) {
    enemy.attackTimer = enemy.attackCooldown;
    
    if (enemy.class === "mage") {
      const angle = Math.atan2(targetPlayer.y - enemy.y, targetPlayer.x - enemy.x);
      enemyProjectiles.push({
        x: enemy.x,
        y: enemy.y,
        r: 8,
        dx: Math.cos(angle) * enemy.projectileSpeed,
        dy: Math.sin(angle) * enemy.projectileSpeed,
        damage: enemy.damage,
        type: "fireball",
        enemyIndex: enemies.indexOf(enemy)
      });
    } else if (enemy.class === "archer") {
      const angle = Math.atan2(targetPlayer.y - enemy.y, targetPlayer.x - enemy.x);
      enemyProjectiles.push({
        x: enemy.x,
        y: enemy.y,
        r: 6,
        dx: Math.cos(angle) * enemy.projectileSpeed,
        dy: Math.sin(angle) * enemy.projectileSpeed,
        damage: enemy.damage,
        type: "arrow",
        enemyIndex: enemies.indexOf(enemy)
      });
    } else if (enemy.class === "summoner") {
      if (enemy.currentSummons < enemy.maxSummons && currentTime - enemy.lastSummonTime >= enemy.summonCooldown * 16.67) {
        summonGolem(enemy.x, enemy.y, enemy);
        enemy.lastSummonTime = currentTime;
      }
    } else if (enemy.isBoss) {
      switch(enemy.special) {
        case "fire_breath":
          for (let i = 0; i < 5; i++) {
            const spreadAngle = (Math.random() - 0.5) * 1.0;
            const angle = Math.atan2(targetPlayer.y - enemy.y, targetPlayer.x - enemy.x) + spreadAngle;
            enemyProjectiles.push({
              x: enemy.x,
              y: enemy.y,
              r: 10,
              dx: Math.cos(angle) * 3,
              dy: Math.sin(angle) * 3,
              damage: enemy.damage * 0.7,
              type: "fireball",
              enemyIndex: enemies.indexOf(enemy)
            });
          }
          break;
        case "magic_missiles":
          for (let i = 0; i < 3; i++) {
            const angle = Math.atan2(targetPlayer.y - enemy.y, targetPlayer.x - enemy.x) + (i - 1) * 0.3;
            enemyProjectiles.push({
              x: enemy.x,
              y: enemy.y,
              r: 7,
              dx: Math.cos(angle) * 4,
              dy: Math.sin(angle) * 4,
              damage: enemy.damage * 0.8,
              type: "magic",
              enemyIndex: enemies.indexOf(enemy)
            });
          }
          break;
      }
    }
  }
}

function spawnXPOrb(x, y, isBoss = false, playerIndex = null, enemy = null) {
  if (enemy && enemy.isSummon) return;
  
  const targetPlayer = playerIndex !== null ? players[playerIndex] : null;
  
  let isSpecial = false;
  let xpValue = isBoss ? 50 : 10;
  
  if ((wave + 1) % 5 === 0 && Math.random() < specialXpChance) {
    isSpecial = true;
    xpValue = isBoss ? 150 : 30;
    specialXpChance = Math.min(0.1, specialXpChance + 0.01);
  }
  
  xpValue = Math.floor(xpValue * (1 + wave * 0.1));
  
  xpOrbs.push({
    x: x,
    y: y,
    r: isSpecial ? 8 : (isBoss ? 10 : 6),
    value: xpValue,
    isBoss: isBoss,
    isSpecial: isSpecial,
    speed: 5,
    target: targetPlayer,
    playerIndex: playerIndex
  });
}

function collectXP(amount, playerIndex) {
  const player = players[playerIndex];
  
  if (isNaN(amount) || amount <= 0) {
    amount = 1;
  }
  
  player.xp += Math.floor(amount * player.fortune);
  
  if (isNaN(player.xp)) {
    player.xp = 0;
  }
  
  updateXPBar(playerIndex);
  
  if (player.xp >= player.xpToNextLevel) {
    currentPlayerLevelingUp = playerIndex;
    levelUp(playerIndex);
  }
}

function levelUp(playerIndex) {
  const player = players[playerIndex];
  player.level++;
  player.xp -= player.xpToNextLevel;
  player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.5);
  updateXPBar(playerIndex);
  
  openCardSelection(false, playerIndex);
}

function spawnMeteor(playerIndex) {
  const player = players[playerIndex];
  
  let closestEnemy = null;
  let minDist = Infinity;
  
  enemies.forEach(enemy => {
    const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
    if (dist < minDist && dist < 500) {
      minDist = dist;
      closestEnemy = enemy;
    }
  });
  
  if (closestEnemy) {
    meteors.push({
      x: closestEnemy.x,
      y: -50,
      targetX: closestEnemy.x,
      targetY: closestEnemy.y,
      r: 25,
      speed: 8,
      damage: (player.baseDamage + player.damageBonus) * 3,
      playerIndex: playerIndex,
      arrived: false
    });
  }
}

function openCardSelection(isBossReward, playerIndex) {
  cardSelectionActive = true;
  gameRunning = true;
  spawnPaused = true;
  
  cardContainer.innerHTML = '';
  currentCards = [];
  
  const cardsToShow = [];
  
  for (let i = 0; i < 3; i++) {
    const rarityRoll = Math.random() * 100;
    let rarity;
    
    if (rarityRoll < 60) {
      rarity = 'common';
    } else if (rarityRoll < 85) {
      rarity = 'rare';
    } else if (rarityRoll < 96) {
      rarity = 'epic';
    } else {
      rarity = 'legendary';
    }
    
    const availableCards = cards[rarity];
    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
    cardsToShow.push(randomCard);
  }
  
  currentCards = cardsToShow;
  generateCardElements(cardsToShow);
  updateStatsInfo(playerIndex);
  
  cardSelectionMenu.classList.add('active');
  rerollButton.disabled = gold < 10;
}

function generateCardElements(cardsToShow) {
  cardContainer.innerHTML = '';
  cardsToShow.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = `card card-${card.rarity}`;
    cardElement.innerHTML = `
      <div class="card-title">${card.name}</div>
      <div class="card-description">${card.description}</div>
      <div class="card-rarity">${getRarityName(card.rarity)}</div>
    `;
    cardElement.addEventListener('click', () => selectCard(card));
    cardContainer.appendChild(cardElement);
  });
}

function updateStatsInfo(playerIndex) {
  const player = players[playerIndex];
  const piercingInfo = player.piercingLevel > 0 ? 
    ` (Poziom ${player.piercingLevel}: ${Math.pow(2, player.piercingLevel)} przeciwników)` : 
    "";
  
  const knifeInfo = selectedCharacters[playerIndex] === "cygan" ? 
    `Noże: ${1 + knifeUpgrades.cygan.filter(upgrade => upgrade).length}/4` : "";
    
  statsInfo.innerHTML = `
    <div>Statystyki Gracza ${playerIndex + 1} (${selectedCharacters[playerIndex]}):</div>
    <div>HP: ${Math.round(player.hp)}/${Math.round(player.maxHp)} | Obrażenia: ${Math.round(player.stats.damage)}</div>
    <div>Prędkość: ${player.stats.speed.toFixed(1)} | Cooldown dasza: ${Math.ceil(player.stats.cooldown/60)}s</div>
    <div>Szybkostrzelność: ${player.stats.attackSpeed}ms | Kradzież życia: ${(player.stats.lifeSteal * 100).toFixed(1)}%</div>
    <div>Zasięg XP: ${Math.ceil(player.stats.xpRange)} | Zasięg strzelania: ${Math.ceil(player.stats.shootingRange)}px</div>
    <div>Fortuna: ${player.stats.fortune.toFixed(2)}x | Krytyczne: ${(player.stats.critChance * 100).toFixed(1)}%</div>
    <div>Mnożnik kryta: ${player.critMultiplier.toFixed(1)}x | Dashe: ${player.currentDashes}/${player.maxDashes}</div>
    <div>Przerzuty bossa: ${player.bossRerolls} | Unik: ${(player.dodgeChance * 100).toFixed(1)}% | Złoto: ${gold}</div>
    <div>Redukcja CD: ${(player.globalCooldownReduction * 100).toFixed(1)}%</div>
    <div>Przebijanie: ${player.piercingShot ? 'Tak' + piercingInfo : 'Nie'}</div>
    ${knifeInfo ? `<div>${knifeInfo}</div>` : ''}
  `;
}

function getRarityName(rarity) {
  const names = {
    'common': 'Zwykła',
    'rare': 'Rzadka',
    'epic': 'Epicka',
    'legendary': 'Legendarna'
  };
  return names[rarity] || rarity;
}

function selectCard(card) {
  card.effect(currentPlayerLevelingUp);
  collectedCards.push(card);
  cardSelectionMenu.classList.remove('active');
  cardSelectionActive = false;
  spawnPaused = false;
  gameRunning = true;
  
  if (enemiesSpawned < enemiesToSpawn && !spawnInterval) {
    startSpawning();
  } else if (enemiesAlive === 0 && enemiesSpawned >= enemiesToSpawn && enemySpawnGroups.length === 0) {
    waveTimer = 0;
    wave++;
    if (wave < 2137) {
      waveStartDisplay = true;
      waveStartTimer = waveStartDuration;
      spawnPaused = true;
    } else {
      gameOver();
    }
  }
}

function rerollCards() {
  if (gold >= 10) {
    gold -= 10;
    
    const newCards = [];
    
    for (let i = 0; i < 3; i++) {
      const rarityRoll = Math.random() * 100;
      let rarity;
      
      if (rarityRoll < 60) {
        rarity = 'common';
      } else if (rarityRoll < 85) {
        rarity = 'rare';
      } else if (rarityRoll < 96) {
        rarity = 'epic';
      } else {
        rarity = 'legendary';
      }
      
      const availableCards = cards[rarity];
      const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      newCards.push(randomCard);
    }
    
    currentCards = newCards;
    generateCardElements(newCards);
    updateStatsInfo(currentPlayerLevelingUp);
    rerollButton.disabled = gold < 10;
  }
}

function openBossShop() {
  bossShopActive = true;
  gameRunning = false;
  spawnPaused = true;
  
  let totalRerolls = currentBossRerolls;
  for (let i = 0; i < playerCount; i++) {
    totalRerolls += players[i].bossRerolls;
  }
  
  const availableItems = bossShopItems.filter(item => !purchasedBossItems.includes(item.id));
  const itemsToShow = availableItems.length > 0 ? availableItems : bossShopItems;
  
  const randomItemIndex = Math.floor(Math.random() * itemsToShow.length);
  const randomItem = itemsToShow[randomItemIndex];
  
  const bossShopMenu = document.createElement("div");
  bossShopMenu.id = "bossShopMenu";
  bossShopMenu.className = "menu active";
  bossShopMenu.innerHTML = `
    <h2>🏆 Sklep Bossów - Fala ${wave + 1}</h2>
    <p>Twoje złoto: ${gold}</p>
    <p>Pozostałe przerzuty: ${totalRerolls}</p>
    <div class="card-container">
      <div class="card card-epic" id="bossItem" onclick="buyBossItem('${randomItem.id}', ${totalRerolls})">
        <div class="card-title">${randomItem.name}</div>
        <div class="card-description">${randomItem.description}</div>
        <div class="card-rarity">${randomItem.cost} złota</div>
        ${purchasedBossItems.includes(randomItem.id) ? '<div style="color: green; font-weight: bold;">KUPIONE</div>' : ''}
      </div>
    </div>
    <button id="rerollBossBtn" onclick="rerollBossShop(${totalRerolls})" ${totalRerolls <= 0 ? 'disabled' : ''}>Przerzuć przedmiot (${totalRerolls} pozostało)</button>
    <button id="continueBtn" onclick="closeBossShop()">Kontynuuj Grę</button>
  `;
  document.body.appendChild(bossShopMenu);
}

function buyBossItem(itemId, totalRerolls) {
  const item = bossShopItems.find(i => i.id === itemId);
  if (gold >= item.cost && !purchasedBossItems.includes(itemId)) {
    gold -= item.cost;
    item.effect(currentPlayerLevelingUp);
    purchasedBossItems.push(itemId);
    collectedItems.push(item);
    
    document.getElementById("bossItem").style.pointerEvents = "none";
    document.getElementById("bossItem").style.opacity = "0.5";
    document.getElementById("rerollBossBtn").disabled = true;
    document.getElementById("rerollBossBtn").style.opacity = "0.5";
    
    document.querySelector("#bossShopMenu p").innerText = `Twoje złoto: ${gold}`;
    
    const itemElement = document.getElementById("bossItem");
    if (itemElement) {
      itemElement.innerHTML += '<div style="color: green; font-weight: bold;">KUPIONE</div>';
    }
  }
}

function rerollBossShop(totalRerolls) {
  if (totalRerolls > 0) {
    currentBossRerolls--;
    closeBossShop();
    setTimeout(openBossShop, 100);
  }
}

function closeBossShop() {
  const bossShopMenu = document.getElementById("bossShopMenu");
  if (bossShopMenu) {
    bossShopMenu.remove();
  }
  bossShopActive = false;
  spawnPaused = false;
  gameRunning = true;
  
  wave++;
  if (wave < 2137) {
    waveStartDisplay = true;
    waveStartTimer = waveStartDuration;
    spawnPaused = true;
  } else {
    gameOver();
  }
}

function drawWaveStart() {
  if (!waveStartDisplay) return;
  
  const progress = 1 - (waveStartTimer / waveStartDuration);
  const scale = 1 + Math.sin(progress * Math.PI) * 0.3;
  const alpha = Math.min(1, progress * 3);
  
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";
  ctx.font = "bold 72px Arial";
  ctx.shadowColor = "gold";
  ctx.shadowBlur = 20;
  
  ctx.translate(canvas.width/2, canvas.height/2);
  ctx.scale(scale, scale);
  ctx.translate(-canvas.width/2, -canvas.height/2);
  
  ctx.fillText(`FALA ${wave + 1}`, canvas.width/2, canvas.height/2);
  
  ctx.font = "bold 36px Arial";
  ctx.fillText("PRZYGOTUJ SIĘ!", canvas.width/2, canvas.height/2 + 80);
  
  ctx.restore();
}

function updateMiniMap() {
  const miniMapContent = document.getElementById('miniMapContent');
  miniMapContent.innerHTML = '';
  
  mapSections.forEach((section, index) => {
    const sectionElement = document.createElement('div');
    sectionElement.className = `map-section ${section.active ? 'active' : ''}`;
    sectionElement.style.left = `${(section.x / mapWidth) * 100}%`;
    sectionElement.style.top = `${(section.y / mapHeight) * 100}%`;
    sectionElement.style.width = `${(section.width / mapWidth) * 100}%`;
    sectionElement.style.height = `${(section.height / mapHeight) * 100}%`;
    miniMapContent.appendChild(sectionElement);
  });
  
  for (let i = 0; i < playerCount; i++) {
    const player = players[i];
    const playerMarker = document.createElement('div');
    playerMarker.className = 'player-marker';
    playerMarker.style.left = `${(player.x / mapWidth) * 100}%`;
    playerMarker.style.top = `${(player.y / mapHeight) * 100}%`;
    miniMapContent.appendChild(playerMarker);
  }
  
  enemies.forEach(enemy => {
    const enemyMarker = document.createElement('div');
    enemyMarker.className = 'enemy-marker';
    enemyMarker.style.left = `${(enemy.x / mapWidth) * 100}%`;
    enemyMarker.style.top = `${(enemy.y / mapHeight) * 100}%`;
    miniMapContent.appendChild(enemyMarker);
  });
}

function spawnDustParticle(x, y) {
  dustParticles.push({
    x: x,
    y: y,
    size: Math.random() * 5 + 5,
    life: 30,
    maxLife: 30
  });
}

function checkWaveCompletion() {
  if (enemiesAlive === 0 && enemiesSpawned >= enemiesToSpawn && enemySpawnGroups.length === 0) {
    waveTimer = 0;
    
    if ((wave + 1) % 5 === 0 && !bossShopActive) {
      openBossShop();
    } else {
      wave++;
      if (wave < 2137) {
        waveStartDisplay = true;
        waveStartTimer = waveStartDuration;
        spawnPaused = true;
      } else {
        gameOver();
      }
    }
  }
}

function update() {
  if (!gameRunning) return;
  
  if (waveStartDisplay) {
    waveStartTimer--;
    if (waveStartTimer <= 0) {
      waveStartDisplay = false;
      spawnPaused = false;
      nextWave();
    }
    return;
  }
  
  if (shopActive || cardSelectionActive || bossShopActive) return;
  
  for (let i = 0; i < playerCount; i++) {
    checkPlayerSectionTransition(i);
  }
  
  enemies.forEach(enemy => {
    checkEnemySectionTransition(enemy);
  });
  
  waveTimer++;
  
  for (let i = spawnWarnings.length - 1; i >= 0; i--) {
    spawnWarnings[i].timer--;
    if (spawnWarnings[i].timer <= 0) {
      spawnWarnings.splice(i, 1);
    }
  }
  
  for (let i = enemySpawnGroups.length - 1; i >= 0; i--) {
    const group = enemySpawnGroups[i];
    group.timer--;
    
    if (group.timer <= 0) {
      if (group.isBoss) {
        spawnBoss(group.bossData, group.x, group.y);
      } else if (group.isGolem) {
        const healthMultiplier = 1 + wave * 0.2;
        const damageMultiplier = 1 + wave * 0.15;
        
        enemies.push({ 
          x: group.x, 
          y: group.y, 
          r: 20, 
          speed: 0.8,
          health: Math.floor((10 + wave * 1.5) * healthMultiplier),
          maxHealth: Math.floor((10 + wave * 1.5) * healthMultiplier),
          damage: Math.floor((5 + wave * 0.8) * damageMultiplier),
          color: "gray",
          class: "golem",
          attackRange: 40,
          attackCooldown: 80,
          attackTimer: 0,
          projectileSpeed: 0,
          isBoss: false,
          lastAttackTime: 0,
          isSummon: true,
          xpValue: 0
        });
        
        if (group.summoner) {
          group.summoner.currentSummons++;
        }
      } else {
        const enemyType = getRandomEnemyType();
        const offsetX = (Math.random() - 0.5) * 50;
        const offsetY = (Math.random() - 0.5) * 50;
        spawnEnemy(group.x + offsetX, group.y + offsetY, enemyType);
      }
      
      enemySpawnGroups.splice(i, 1);
    }
  }
  
  checkWaveCompletion();
  
  for (let i = 0; i < playerCount; i++) {
    const player = players[i];
    
    player.moveDirection.x = 0;
    player.moveDirection.y = 0;
    
    if (i === 0) {
      if (keys["w"] || keys["W"]) { player.moveDirection.y = -1; }
      if (keys["s"] || keys["S"]) { player.moveDirection.y = 1; }
      if (keys["a"] || keys["A"]) { player.moveDirection.x = -1; }
      if (keys["d"] || keys["D"]) { player.moveDirection.x = 1; }
    } else {
      if (keys2["ArrowUp"]) { player.moveDirection.y = -1; }
      if (keys2["ArrowDown"]) { player.moveDirection.y = 1; }
      if (keys2["ArrowLeft"]) { player.moveDirection.x = -1; }
      if (keys2["ArrowRight"]) { player.moveDirection.x = 1; }
    }
    
    if (player.moveDirection.x !== 0 && player.moveDirection.y !== 0) {
      player.moveDirection.x *= 0.7071;
      player.moveDirection.y *= 0.7071;
    }
    
    const moved = player.x !== player.lastX || player.y !== player.lastY;
    player.isMoving = moved;
    player.lastX = player.x;
    player.lastY = player.y;
    
    if (moved && Date.now() - lastDustSpawn > 200) {
      spawnDustParticle(player.x - 20 + Math.random() * 40, player.y - 20 + Math.random() * 40);
      lastDustSpawn = Date.now();
    }
    
    if (player.chainLightning && player.chainLightningCooldown > 0) {
      player.chainLightningCooldown--;
    }
    
    if (player.stunLightning && player.stunLightningCooldown > 0) {
      player.stunLightningCooldown--;
    }
    
    if (player.poisonSkill && player.poisonCooldown > 0) {
      player.poisonCooldown--;
    }
    
    if (player.chainLightning && player.chainLightningCooldown <= 0) {
      activateChainLightning(i);
    }
    
    if (player.stunLightning && player.stunLightningCooldown <= 0) {
      activateStunLightning(i);
    }
    
    if (player.poisonSkill && player.poisonCooldown <= 0) {
      activatePoison(i);
    }
    
    if (player.currentDashes < player.maxDashes && !player.isDashing) {
      player.dashCooldown--;
      if (player.dashCooldown <= 0) {
        player.currentDashes++;
        player.dashCooldown = player.dashCooldownMax;
        updateDashBar(i);
      }
    }
    updateDashBar(i);
    
    if (player.meteorSkill && player.meteorCooldown > 0) {
      player.meteorCooldown--;
    } else if (player.meteorSkill && player.meteorCooldown <= 0) {
      spawnMeteor(i);
      player.meteorCooldown = player.meteorCooldownMax;
    }
    
    if (player.isDashing) {
      player.dashTime++;
      
      const progress = player.dashTime / player.dashDuration;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      player.x = player.x + (player.dashTargetX - player.x) * easeOut;
      player.y = player.y + (player.dashTargetY - player.y) * easeOut;
      
      if (player.dashTime >= player.dashDuration) {
        player.isDashing = false;
        player.x = player.dashTargetX;
        player.y = player.dashTargetY;
      }
    } else {
      if (player.moveDirection.x !== 0 || player.moveDirection.y !== 0) {
        player.x += player.moveDirection.x * player.speed;
        player.y += player.moveDirection.y * player.speed;
      }

      player.x = Math.max(0 + player.r, Math.min(mapWidth - player.r, player.x));
      player.y = Math.max(0 + player.r, Math.min(mapHeight - player.r, player.y));
    }
  }

  for (let i = lightningEffects.length - 1; i >= 0; i--) {
    lightningEffects[i].timer--;
    if (lightningEffects[i].timer <= 0) {
      lightningEffects.splice(i, 1);
    }
  }
  
  for (let i = stunEffects.length - 1; i >= 0; i--) {
    stunEffects[i].timer--;
    if (stunEffects[i].timer <= 0) {
      stunEffects.splice(i, 1);
    }
  }
  
  for (let i = poisonEffects.length - 1; i >= 0; i--) {
    poisonEffects[i].timer--;
    if (poisonEffects[i].timer <= 0) {
      poisonEffects.splice(i, 1);
    }
  }
  
  for (let i = dustParticles.length - 1; i >= 0; i--) {
    dustParticles[i].life--;
    if (dustParticles[i].life <= 0) {
      dustParticles.splice(i, 1);
    }
  }

  for (let enemyIndex in stunTimers) {
    if (stunTimers[enemyIndex] > 0) {
      stunTimers[enemyIndex]--;
    } else {
      delete stunTimers[enemyIndex];
    }
  }

  enemies.forEach((enemy, i) => {
    if (enemy.poisoned && enemy.poisonDuration > 0) {
      enemy.poisonDuration--;
      
      if (enemy.poisonDuration % 60 === 0) {
        enemy.health -= enemy.poisonDamage;
        
        if (enemy.health <= 0 && !enemy.isSummon) {
          enemies.splice(i, 1);
          enemiesAlive--;
          spawnXPOrb(enemy.x, enemy.y, enemy.isBoss, 0, enemy);
          const goldGain = Math.floor((Math.floor(Math.random() * 12) + 8) * players[0].fortune);
          gold += goldGain;
          score += enemy.isBoss ? 100 : 5;
        }
      }
      
      if (enemy.poisonDuration <= 0) {
        enemy.poisoned = false;
      }
    }
  });

  meteors.forEach((meteor, index) => {
    if (!meteor.arrived) {
      meteor.y += meteor.speed;
      
      if (meteor.y >= meteor.targetY) {
        meteor.arrived = true;
        
        enemies.forEach((enemy, i) => {
          const dist = Math.hypot(meteor.x - enemy.x, meteor.y - enemy.y);
          if (dist < 100) {
            enemy.health -= meteor.damage;
            
            if (enemy.health <= 0 && !enemy.isSummon) {
              enemies.splice(i, 1);
              enemiesAlive--;
              spawnXPOrb(enemy.x, enemy.y, enemy.isBoss, meteor.playerIndex, enemy);
              const goldGain = Math.floor((Math.floor(Math.random() * 12) + 8) * players[meteor.playerIndex].fortune);
              gold += goldGain;
            }
          }
        });
        
        setTimeout(() => {
          const meteorIndex = meteors.indexOf(meteor);
          if (meteorIndex > -1) {
            meteors.splice(meteorIndex, 1);
          }
        }, 500);
      }
    }
  });

  updateBullets();

  enemyProjectiles.forEach((p, i) => {
    p.x += p.dx;
    p.y += p.dy;
    
    for (let j = 0; j < playerCount; j++) {
      const player = players[j];
      const dist = Math.hypot(p.x - player.x, p.y - player.y);
      
      if (dist < player.r + p.r) {
        if (Math.random() < player.dodgeChance) {
          enemyProjectiles.splice(i, 1);
          break;
        }
        
        player.hp -= p.damage;
        updateHealthBar(j);
        
        if (player.hp <= 0) {
          gameOver();
        }
        
        enemyProjectiles.splice(i, 1);
        break;
      }
    }
    
    if (p.x < -p.r || p.y < -p.r || p.x > mapWidth + p.r || p.y > mapHeight + p.r) {
      enemyProjectiles.splice(i, 1);
    }
  });

  xpOrbs.forEach((orb, i) => {
    if (orb.target) {
      const dx = orb.target.x - orb.x;
      const dy = orb.target.y - orb.y;
      const dist = Math.hypot(dx, dy);
      
      if (dist > 5) {
        orb.x += (dx / dist) * orb.speed;
        orb.y += (dy / dist) * orb.speed;
      } else {
        collectXP(orb.value, orb.playerIndex);
        xpOrbs.splice(i, 1);
      }
    } else {
      for (let j = 0; j < playerCount; j++) {
        const player = players[j];
        const dist = Math.hypot(orb.x - player.x, orb.y - player.y);
        
        if (dist < player.xpMagnetRange) {
          orb.target = player;
          orb.playerIndex = j;
          break;
        }
      }
    }
  });

  enemies.forEach((enemy, i) => {
    const enemyIndex = enemies.indexOf(enemy);
    const isStunned = stunTimers[enemyIndex] && stunTimers[enemyIndex] > 0;
    
    if (!isStunned) {
      let closestPlayer = players[0];
      let minDist = Infinity;
      
      for (let j = 0; j < playerCount; j++) {
        const dist = Math.hypot(enemy.x - players[j].x, enemy.y - players[j].y);
        if (dist < minDist) {
          minDist = dist;
          closestPlayer = players[j];
        }
      }
      
      if (enemy.class === "summoner") {
        const fleeDistance = 150;
        const distToPlayer = Math.hypot(enemy.x - closestPlayer.x, enemy.y - closestPlayer.y);
        
        if (distToPlayer < fleeDistance) {
          const dx = enemy.x - closestPlayer.x;
          const dy = enemy.y - closestPlayer.y;
          const dist = Math.hypot(dx, dy);
          
          if (dist > 0) {
            enemy.x += (dx / dist) * enemy.speed;
            enemy.y += (dy / dist) * enemy.speed;
          }
        } else {
          enemyAttack(enemy, closestPlayer);
        }
      } else if (minDist > enemy.attackRange) {
        const dx = closestPlayer.x - enemy.x;
        const dy = closestPlayer.y - enemy.y;
        const dist = Math.hypot(dx, dy);
        
        enemy.x += (dx / dist) * enemy.speed;
        enemy.y += (dy / dist) * enemy.speed;
      } else {
        enemyAttack(enemy, closestPlayer);
      }
    }
    
    enemy.attackTimer--;
  });

  stats.innerText = `Gracz 1: HP: ${Math.round(players[0].hp)}/${Math.round(players[0].maxHp)}  Lvl: ${players[0].level}  Złoto: ${gold}  Fala: ${wave + 1}`;
  
  if (playerCount === 2) {
    stats2.innerText = `Gracz 2: HP: ${Math.round(players[1].hp)}/${Math.round(players[1].maxHp)}  Lvl: ${players[1].level}  Przeciwnicy: ${enemiesAlive}/${enemiesToSpawn}`;
  } else {
    stats2.innerText = `Przeciwnicy: ${enemiesAlive}/${enemiesToSpawn}`;
  }
  
  updateMiniMap();
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (waveStartDisplay) {
    drawWaveStart();
    return;
  }
  
  ctx.save();
  
  ctx.translate(-cameraX, -cameraY);
  
  const currentSection = mapSections[currentMapSection];
  ctx.fillStyle = "rgba(50, 50, 70, 0.3)";
  ctx.fillRect(currentSection.x, currentSection.y, currentSection.width, currentSection.height);
  
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 2;
  ctx.strokeRect(currentSection.x, currentSection.y, currentSection.width, currentSection.height);
  
  spawnWarnings.forEach(warning => {
    if (warning.x >= currentSection.x && warning.x <= currentSection.x + currentSection.width &&
        warning.y >= currentSection.y && warning.y <= currentSection.y + currentSection.height) {
      
      if (warning.isBoss) {
        ctx.fillStyle = `rgba(255, 0, 0, ${warning.timer / 90})`;
        ctx.strokeStyle = "gold";
        ctx.lineWidth = 3;
      } else if (warning.isGolem) {
        ctx.fillStyle = `rgba(128, 128, 128, ${warning.timer / 30})`;
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 2;
      } else {
        ctx.fillStyle = `rgba(255, 0, 0, ${warning.timer / 60})`;
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
      }
      
      ctx.beginPath();
      ctx.arc(warning.x, warning.y, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = "white";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${warning.groupSize}`, warning.x, warning.y);
    }
  });
  
  dustParticles.forEach(particle => {
    if (particle.x >= currentSection.x && particle.x <= currentSection.x + currentSection.width &&
        particle.y >= currentSection.y && particle.y <= currentSection.y + currentSection.height) {
      
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = `rgba(200, 200, 200, ${alpha * 0.7})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * (particle.life / particle.maxLife), 0, Math.PI * 2);
      ctx.fill();
    }
  });
  
  for (let i = 0; i < playerCount; i++) {
    const player = players[i];
    
    if (player.x >= currentSection.x && player.x <= currentSection.x + currentSection.width &&
        player.y >= currentSection.y && player.y <= currentSection.y + currentSection.height) {
      
      if (player.isDashing) {
        ctx.globalAlpha = 0.7;
        ctx.filter = "blur(5px)";
      }
      
      let characterImage = characters[selectedCharacters[i]].img;
      
      if (selectedCharacters[i] === "kuza" && player.isMoving) {
        characterImage = player.facing === 'left' ? 
          characters.kuza.walkLeft : 
          characters.kuza.walkRight;
      }
      
      if (player.isMoving) {
        const bounce = Math.sin(Date.now() / 200) * 3;
        ctx.drawImage(
          characterImage, 
          player.x - player.r, 
          player.y - player.r + bounce, 
          player.r * 2, 
          player.r * 2
        );
      } else {
        ctx.drawImage(
          characterImage, 
          player.x - player.r, 
          player.y - player.r, 
          player.r * 2, 
          player.r * 2
        );
      }
      
      let angle;
      let targetX, targetY;
      
      let closestEnemy = null;
      let minDist = Infinity;
      
      enemies.forEach(enemy => {
        if (enemy.x >= currentSection.x && enemy.x <= currentSection.x + currentSection.width &&
            enemy.y >= currentSection.y && enemy.y <= currentSection.y + currentSection.height) {
          
          const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
          if (dist < minDist && dist < player.stats.shootingRange) {
            minDist = dist;
            closestEnemy = enemy;
          }
        }
      });
      
      if (closestEnemy) {
        angle = Math.atan2(closestEnemy.y - player.y, closestEnemy.x - player.x);
        targetX = closestEnemy.x;
        targetY = closestEnemy.y;
      } else {
        angle = Math.atan2(mouseY - player.y, mouseX - player.x);
        targetX = mouseX + cameraX;
        targetY = mouseY + cameraY;
      }
      
      if (selectedCharacters[i] === "kuza") {
        const gunX = player.x + Math.cos(angle) * 15;
        const gunY = player.y + Math.sin(angle) * 15;
        
        ctx.save();
        ctx.translate(gunX, gunY);
        ctx.rotate(angle);
        ctx.drawImage(weaponImages.pistol, -20, -10, 40, 20);
        ctx.restore();
      } else if (selectedCharacters[i] === "menel") {
        const bottleX = player.x + Math.cos(angle) * 15;
        const bottleY = player.y + Math.sin(angle) * 15;
        
        ctx.save();
        ctx.translate(bottleX, bottleY);
        ctx.rotate(angle);
        ctx.drawImage(weaponImages.bottle, -15, -15, 30, 30);
        ctx.restore();
      } else if (selectedCharacters[i] === "cygan") {
        const knifeX = player.x + Math.cos(angle) * 15;
        const knifeY = player.y + Math.sin(angle) * 15;
        
        ctx.save();
        ctx.translate(knifeX, knifeY);
        ctx.rotate(angle);
        ctx.drawImage(weaponImages.knife, -10, -10, 20, 20);
        ctx.restore();
      }
      
      if (player.isDashing) {
        ctx.globalAlpha = 1;
        ctx.filter = "none";
      }
    }
  }
  
  lightningEffects.forEach(effect => {
    if (effect.x >= currentSection.x && effect.x <= currentSection.x + currentSection.width &&
        effect.y >= currentSection.y && effect.y <= currentSection.y + currentSection.height) {
      
      ctx.fillStyle = `rgba(255, 255, 0, ${effect.timer / 30})`;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, effect.size, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  
  stunEffects.forEach(effect => {
    if (effect.x >= currentSection.x && effect.x <= currentSection.x + currentSection.width &&
        effect.y >= currentSection.y && effect.y <= currentSection.y + currentSection.height) {
      
      ctx.strokeStyle = `rgba(0, 0, 255, ${effect.timer / 90})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, effect.size, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
  
  poisonEffects.forEach(effect => {
    if (effect.x >= currentSection.x && effect.x <= currentSection.x + currentSection.width &&
        effect.y >= currentSection.y && effect.y <= currentSection.y + currentSection.height) {
      
      ctx.fillStyle = `rgba(0, 255, 0, ${effect.timer / 300})`;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, effect.size, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  
  bullets.forEach(b => {
    if (b.x >= currentSection.x && b.x <= currentSection.x + currentSection.width &&
        b.y >= currentSection.y && b.y <= currentSection.y + currentSection.height) {
      
      if (b.type === "knife") {
        ctx.save();
        ctx.translate(b.x, b.y);
        
        let angle;
        if (b.returnToPlayer || b.hasHit) {
          const player = players[b.playerIndex];
          angle = Math.atan2(player.y - b.y, player.x - b.x);
        } else {
          angle = Math.atan2(b.dy, b.dx);
        }
        
        ctx.rotate(angle + Math.PI);
        ctx.drawImage(bulletImages.knife, -b.r, -b.r, b.r * 2, b.r * 2);
        ctx.restore();
      } else if (b.type === "pistol") {
        ctx.drawImage(bulletImages.pistol, b.x - b.r, b.y - b.r, b.r * 2, b.r * 2);
      } else {
        ctx.drawImage(bulletImages.bottle, b.x - b.r, b.y - b.r, b.r * 2, b.r * 2);
      }
      
      if (b.isCritical && b.type !== "knife") {
        ctx.shadowBlur = 15;
        ctx.shadowColor = "gold";
        ctx.fillStyle = "rgba(255, 215, 0, 0.3)";
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r + 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  });
  
  enemies.forEach(enemy => {
    if (enemy.x >= currentSection.x && enemy.x <= currentSection.x + currentSection.width &&
        enemy.y >= currentSection.y && enemy.y <= currentSection.y + currentSection.height) {
      
      const enemyIndex = enemies.indexOf(enemy);
      const isStunned = stunTimers[enemyIndex] && stunTimers[enemyIndex] > 0;
      
      if (isStunned) {
        ctx.globalAlpha = 0.7;
      }
      
      ctx.fillStyle = enemy.color;
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, enemy.r, 0, Math.PI * 2);
      ctx.fill();
      
      const healthPercent = enemy.health / enemy.maxHealth;
      ctx.fillStyle = "red";
      ctx.fillRect(enemy.x - enemy.r, enemy.y - enemy.r - 10, enemy.r * 2, 3);
      ctx.fillStyle = "green";
      ctx.fillRect(enemy.x - enemy.r, enemy.y - enemy.r - 10, enemy.r * 2 * healthPercent, 3);
      
      ctx.fillStyle = "white";
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      
      if (enemy.isBoss) {
        ctx.fillText(enemy.name, enemy.x, enemy.y - enemy.r - 15);
      } else if (!enemy.isSummon) {
        let className = "";
        switch(enemy.class) {
          case "warrior": className = "Wojownik"; break;
          case "mage": className = "Mag"; break;
          case "archer": className = "Łucznik"; break;
          case "assassin": className = "Zabójca"; break;
          case "summoner": className = "Przywoływacz"; break;
          case "golem": className = "Golem"; break;
          default: className = enemy.class;
        }
        ctx.fillText(className, enemy.x, enemy.y - enemy.r - 15);
      }
      
      if (isStunned) {
        ctx.globalAlpha = 1;
      }
    }
  });
  
  enemyProjectiles.forEach(p => {
    if (p.x >= currentSection.x && p.x <= currentSection.x + currentSection.width &&
        p.y >= currentSection.y && p.y <= currentSection.y + currentSection.height) {
      
      ctx.fillStyle = p.type === "fireball" ? "orange" : 
                     p.type === "arrow" ? "brown" : 
                     p.type === "magic" ? "purple" : "white";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      
      if (p.type === "fireball") {
        ctx.shadowBlur = 10;
        ctx.shadowColor = "red";
      }
    }
  });
  
  xpOrbs.forEach(orb => {
    if (orb.x >= currentSection.x && orb.x <= currentSection.x + currentSection.width &&
        orb.y >= currentSection.y && orb.y <= currentSection.y + currentSection.height) {
      
      if (orb.isSpecial) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = "yellow";
        ctx.fillStyle = "yellow";
      } else {
        ctx.shadowBlur = 10;
        ctx.shadowColor = orb.isBoss ? "red" : "blue";
        ctx.fillStyle = orb.isBoss ? "red" : "blue";
      }
      
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  });
  
  meteors.forEach(meteor => {
    if (meteor.x >= currentSection.x && meteor.x <= currentSection.x + currentSection.width &&
        meteor.y >= currentSection.y && meteor.y <= currentSection.y + currentSection.height) {
      
      if (!meteor.arrived) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = "orange";
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, meteor.r, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y - meteor.r - 10, meteor.r / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.shadowBlur = 30;
        ctx.shadowColor = "red";
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 50, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }
  });
  
  ctx.restore();
  
  ctx.drawImage(crosshairImg, mouseX - 15, mouseY - 15, 30, 30);
}

function gameOver(){
  gameRunning = false;
  clearInterval(waveInterval);
  clearInterval(spawnInterval);
  boss = null;
  finalScore.innerText = `Twój wynik: ${score} | Osiągnięta fala: ${wave + 1}`;
  canvas.style.display = "none";
  document.getElementById("ui").style.display = "none";
  gameOverMenu.classList.add("active");
}

function loop(){ 
  update(); 
  draw(); 
  requestAnimationFrame(loop); 
}

mainMenu.classList.add('active');
initMapSections();
loop();