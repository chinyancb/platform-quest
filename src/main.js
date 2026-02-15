// Phaser Game Configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [PreloadScene, MenuScene, GameScene, GameOverScene]
};

// Initialize the game
const game = new Phaser.Game(config);

// Global game state
window.gameState = {
    score: 0,
    lives: 3,
    currentLevel: 1,
    maxLevel: 2
};
