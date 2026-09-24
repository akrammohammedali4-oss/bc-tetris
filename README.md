# Tetris Game

A classic Tetris game built with HTML5 Canvas and JavaScript, featuring modern UI design and persistent localStorage high score tracking.

## Features

- **Classic Tetris Gameplay**: All 7 standard Tetris pieces (I, O, T, S, Z, J, L)
- **Persistent High Score**: Your best score is saved in localStorage so it survives browser restarts
- **Progressive Difficulty**: Speed increases as you level up
- **Modern UI**: Beautiful gradient design with responsive layout
- **Next Piece Preview**: See what piece is coming next
- **Pause Functionality**: Pause and resume the game at any time
- **Mobile Responsive**: Works on both desktop and mobile devices

## How to Play

1. **Start the Game**: Click the "Start Game" button
2. **Move Pieces**: Use arrow keys to move pieces left and right
3. **Rotate**: Press the up arrow key to rotate pieces
4. **Soft Drop**: Press the down arrow key to move pieces down faster
5. **Hard Drop**: Press the spacebar to instantly drop pieces
6. **Pause**: Press 'P' or click the pause button to pause/resume

## Controls

| Key   | Action                       |
| ----- | ---------------------------- |
| ← →   | Move piece left/right        |
| ↓     | Soft drop (move down faster) |
| ↑     | Rotate piece                 |
| SPACE | Hard drop (instant drop)     |
| P     | Pause/Resume game            |

## Scoring System

- **Single Line**: 100 × Level
- **Double Lines**: 300 × Level
- **Triple Lines**: 500 × Level
- **Tetris (4 Lines)**: 800 × Level
- **Hard Drop**: 2 points per cell dropped

## Level System

- Level increases every 10 lines cleared
- Game speed increases with each level
- Higher levels = higher scores

## Installation

1. Download all files to a folder
2. Open `index.html` in your web browser
3. Start playing!

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and responsive design
- `tetris.js` - Game logic and mechanics
- `README.md` - This file

## Browser Compatibility

Works in all modern browsers that support:

- HTML5 Canvas
- ES6 Classes
- Session Storage

## Session Storage

The game uses browser localStorage to remember your high score. This means:

- Your high score stays saved between browser sessions
- High score survives reopening the page or restarting the browser
- No login required - just play and enjoy!

Enjoy playing Tetris! 🎮
