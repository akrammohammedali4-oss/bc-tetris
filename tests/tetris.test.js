const test = require("node:test");
const assert = require("node:assert/strict");

function createStorage() {
  const store = {};
  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(store, key)
        ? store[key]
        : null;
    },
    setItem(key, value) {
      store[key] = String(value);
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      Object.keys(store).forEach((key) => delete store[key]);
    },
  };
}

function makeContext() {
  return {
    clearRect() {},
    fillRect() {},
    strokeRect() {},
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 1,
  };
}

function makeDocument() {
  const elements = new Map();
  const ensureElement = (id) => {
    if (!elements.has(id)) {
      const element = {
        id,
        disabled: false,
        textContent: "",
        value: "",
        width: 240,
        height: 480,
        classList: {
          add() {},
          remove() {},
          contains() {
            return false;
          },
        },
        addEventListener() {},
        getContext() {
          return makeContext();
        },
      };
      elements.set(id, element);
    }
    return elements.get(id);
  };

  const document = {
    _events: {},
    getElementById(id) {
      return ensureElement(id);
    },
    addEventListener(eventName, handler) {
      this._events[eventName] = handler;
    },
    dispatch(eventName, event) {
      if (this._events[eventName]) {
        this._events[eventName](event);
      }
    },
  };

  return { document, ensureElement };
}

function setupEnvironment() {
  global.localStorage = createStorage();
  global.sessionStorage = createStorage();
  const { document } = makeDocument();
  global.document = document;
  delete require.cache[require.resolve("../tetris.js")];
  return require("../tetris.js");
}

test("persistent high score is read from localStorage", () => {
  setupEnvironment();
  global.localStorage.setItem("tetrisHighScore", "321");
  const { Tetris } = require("../tetris.js");

  const game = new Tetris();
  assert.equal(game.highScore, 321);
});

test("pressing P while paused resumes the game", () => {
  const { document } = makeDocument();
  global.localStorage = createStorage();
  global.sessionStorage = createStorage();
  global.document = document;
  delete require.cache[require.resolve("../tetris.js")];
  const { Tetris } = require("../tetris.js");

  const game = new Tetris();
  game.gameRunning = true;
  game.gamePaused = true;
  document.dispatch("keydown", { code: "KeyP", preventDefault() {} });

  assert.equal(game.gamePaused, false);
});

test("line clear scoring follows the documented rules by level", () => {
  const { document } = makeDocument();
  global.localStorage = createStorage();
  global.sessionStorage = createStorage();
  global.document = document;
  delete require.cache[require.resolve("../tetris.js")];
  const { Tetris } = require("../tetris.js");

  const cases = [
    { level: 1, lines: 2, expectedScore: 300 },
    { level: 2, lines: 3, expectedScore: 1000 },
    { level: 3, lines: 4, expectedScore: 2400 },
  ];

  for (const { level, lines, expectedScore } of cases) {
    const game = new Tetris();
    game.level = level;
    game.score = 0;
    game.lines = 0;

    const fullRows = Array.from({ length: lines }, () =>
      Array.from({ length: 10 }, () => 1),
    );
    game.board = [
      ...Array.from({ length: 20 - lines }, () => Array(10).fill(0)),
      ...fullRows,
    ];
    game.currentPiece = null;

    game.clearLines();

    assert.equal(game.lines, lines);
    assert.equal(game.score, expectedScore);
  }
});
