# Platform Quest - A Phaser.js 2D Platformer

A polished 2D platformer game built with Phaser.js, featuring smooth animations, particle effects, beautiful graphics, and engaging gameplay.

## ✨ Features

### Gameplay
- **Advanced Movement**: Smooth player controls with dash, wall jump, and wall slide mechanics
- **Dash System**: Run faster and jump higher/farther when holding SHIFT!
- **Wall Jump & Wall Slide**: Climb vertical walls by jumping between them!
- **Enemy AI**: Smart enemies that patrol platforms and turn at edges
- **Coin Collection**: Collect sparkling coins with satisfying effects
- **Multiple Levels**: Two handcrafted levels with increasing difficulty
- **Life System**: Start with 3 lives displayed as hearts
- **Score System**: Earn points by collecting coins (+10) and defeating enemies (+50)

### Visuals & Polish
- **Beautiful Graphics**: Hand-crafted sprites with gradients, highlights, and details
- **Particle Effects**: Sparkles when collecting coins, explosions when defeating enemies
- **Jump Effects**: Dust particles and dash trails for dynamic movement
- **Animated Background**: Gradient sky with floating clouds and distant mountains
- **Modern UI**: Polished interface with icons, rounded panels, and smooth animations
- **Screen Transitions**: Smooth scene changes with professional menus

## How to Play

1. Open `index.html` in a modern web browser
2. Press SPACE on the menu screen to start
3. Use the following controls:
   - **Move Left**: Left Arrow or A
   - **Move Right**: Right Arrow or D
   - **Jump**: Up Arrow, W, or SPACE
   - **Dash**: Hold SHIFT while moving
   - **Super Jump**: Hold SHIFT + Jump for higher, longer jumps!
4. Avoid enemies or jump on them from above to defeat them
5. Collect all the coins you can
6. Reach the green goal flag to complete the level

## Game Mechanics

- **Dashing**: Hold SHIFT to run at 350 speed (normal is 200)
- **Dash Jump**: Jump while dashing for extra height and distance - perfect for reaching far platforms!
- **Air Control**: Maintain momentum in the air for better jump control
- **Wall Jumping**: Touch a wall while in the air and press jump to kick off in the opposite direction
- **Wall Sliding**: When touching a wall, you fall more slowly, making it easier to time your wall jumps
- **Stomping Enemies**: Jump on enemies from above to defeat them and earn 50 points
- **Taking Damage**: Touching an enemy from the side will cost you a life
- **Coin Values**: Each coin is worth 10 points
- **Invincibility Frames**: After taking damage, you become temporarily invincible
- **Falling**: Don't fall off the bottom of the screen!

### Pro Tips
- **Dash Jump** is the key to reaching distant platforms - hold SHIFT before jumping!
- Press against a wall while falling to activate wall slide
- While wall sliding, press jump to launch in the opposite direction
- Alternate between two walls to climb straight up
- Use dash jumps to cross large gaps and reach high places
- You keep horizontal momentum in the air, so use it to control your landing

## Project Structure

```
platform-quest/
├── index.html              # Main HTML file
├── src/
│   ├── main.js             # Game configuration and initialization
│   ├── config/
│   │   └── levels.js       # Level data definitions
│   ├── entities/
│   │   ├── Player.js       # Player class
│   │   ├── Enemy.js        # Enemy class
│   │   └── Coin.js         # Coin class
│   └── scenes/
│       ├── PreloadScene.js # Asset loading
│       ├── MenuScene.js    # Main menu
│       ├── GameScene.js    # Main gameplay
│       └── GameOverScene.js # Game over screen
└── README.md               # This file
```

## 🎨 Visual Effects

- **Particle Systems**: Sparkles, explosions, dust clouds
- **Smooth Animations**: Tweens for coins, enemies, UI elements
- **Dynamic Backgrounds**: Parallax clouds, gradient skies
- **Score Popups**: Floating score indicators when collecting items
- **Dash Trails**: Motion blur effect when running fast
- **Jump Effects**: Visual feedback for all player actions

## 🛠️ Technologies Used

- **Phaser 3.60**: Game framework
- **JavaScript ES6**: Game logic with OOP design
- **HTML5 Canvas**: Hardware-accelerated rendering
- **Procedural Graphics**: All sprites generated with code (no image files needed!)

## 🚀 Future Enhancements

Potential features that could be added:

- 🔊 Sound effects and background music
- 🗺️ More levels with different themes (ice, lava, sky)
- ⚡ Power-ups (double jump, speed boost, invincibility, magnet)
- 🎢 Moving platforms and elevators
- 👾 Different enemy types (flying, jumping, shooting)
- 🐲 Boss battles at the end of worlds
- 🛠️ Level editor for creating custom stages
- 💾 High score saving with localStorage
- 🎬 Cutscenes and story elements
- 🏅 Achievements and unlockables
- 📱 Mobile touch controls
- 🌐 Online leaderboards

## Development

This game uses simple colored shapes for all graphics, making it easy to understand and modify. You can easily replace these with sprite images by:

1. Adding image files to an `assets/` folder
2. Loading them in `PreloadScene.js` using `this.load.image()`
3. Using the image keys in entity constructors

## Credits

Built with Phaser.js - https://phaser.io/
