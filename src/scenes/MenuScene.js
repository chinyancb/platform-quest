// MenuScene - Start menu
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Start menu BGM
        if (window.soundManager) {
            window.soundManager.playBGM('menu');
        }

        // Gradient background
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x1a237e, 0x1a237e, 0x4a148c, 0x4a148c, 1);
        graphics.fillRect(0, 0, 800, 600);

        // Animated stars
        for (let i = 0; i < 30; i++) {
            const star = this.add.text(
                Math.random() * 800,
                Math.random() * 600,
                '★',
                { fontSize: Math.random() * 20 + 10 + 'px', fill: '#ffffff' }
            );
            this.tweens.add({
                targets: star,
                alpha: 0.2,
                duration: 1000 + Math.random() * 2000,
                yoyo: true,
                repeat: -1
            });
        }

        // Title with shadow
        const titleShadow = this.add.text(width / 2 + 4, height / 3 + 4, 'PLATFORM QUEST', {
            fontSize: '56px',
            fill: '#000000',
            fontStyle: 'bold'
        });
        titleShadow.setOrigin(0.5);

        const title = this.add.text(width / 2, height / 3, 'PLATFORM QUEST', {
            fontSize: '56px',
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#f39c12',
            strokeThickness: 6
        });
        title.setOrigin(0.5);

        // Title animation
        this.tweens.add({
            targets: title,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });

        // Instruction panel
        const panel = this.add.graphics();
        panel.fillStyle(0x000000, 0.7);
        panel.fillRoundedRect(width / 2 - 220, height / 2 - 80, 440, 150, 10);

        // Instructions with icons
        const instructions = this.add.text(width / 2, height / 2,
            '🎮 Arrow Keys or WASD to Move\n⚡ SHIFT to Dash (run faster!)\n🚀 SPACE or UP to Jump\n\n💰 Collect coins • 🎯 Reach the goal • ⚔️ Stomp enemies!', {
            fontSize: '16px',
            fill: '#ffffff',
            align: 'center',
            lineSpacing: 8
        });
        instructions.setOrigin(0.5);

        // Start button with glow
        const startBg = this.add.graphics();
        startBg.fillStyle(0x2ecc71, 1);
        startBg.fillRoundedRect(width / 2 - 140, height * 0.78, 280, 50, 25);

        const startText = this.add.text(width / 2, height * 0.805, 'PRESS SPACE TO START', {
            fontSize: '24px',
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        });
        startText.setOrigin(0.5);

        // Blinking effect
        this.tweens.add({
            targets: [startText, startBg],
            alpha: 0.6,
            duration: 800,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });

        // Credit text
        const credit = this.add.text(width / 2, height - 20, 'Made with Phaser.js', {
            fontSize: '14px',
            fill: '#95a5a6'
        });
        credit.setOrigin(0.5);

        // Start game on space key
        this.input.keyboard.once('keydown-SPACE', () => {
            this.startGame();
        });
    }

    startGame() {
        // Reset game state
        window.gameState.score = 0;
        window.gameState.lives = 3;
        window.gameState.currentLevel = 1;

        // Start the game
        this.scene.start('GameScene');
    }
}
