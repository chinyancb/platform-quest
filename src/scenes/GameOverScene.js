// GameOverScene - Game over and victory screen
class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.won = data.won || false;
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Stop BGM and play appropriate sound
        if (window.soundManager) {
            window.soundManager.stopBGM();
            if (this.won) {
                window.soundManager.play('levelComplete');
            } else {
                window.soundManager.play('gameOver');
            }
        }

        // Background
        const graphics = this.add.graphics();
        if (this.won) {
            graphics.fillGradientStyle(0x1b5e20, 0x1b5e20, 0x004d40, 0x004d40, 1);
        } else {
            graphics.fillGradientStyle(0xb71c1c, 0xb71c1c, 0x4a148c, 0x4a148c, 1);
        }
        graphics.fillRect(0, 0, 800, 600);

        // Animated particles
        for (let i = 0; i < 40; i++) {
            const particle = this.add.graphics();
            particle.fillStyle(this.won ? 0xffd700 : 0x888888, 0.6);
            particle.fillCircle(0, 0, Math.random() * 3 + 1);
            particle.x = Math.random() * 800;
            particle.y = Math.random() * 600;

            this.tweens.add({
                targets: particle,
                y: particle.y + 200,
                alpha: 0,
                duration: 2000 + Math.random() * 2000,
                repeat: -1
            });
        }

        // Title
        const titleText = this.won ? '🎉 VICTORY! 🎉' : '💀 GAME OVER 💀';
        const titleColor = this.won ? '#f1c40f' : '#e74c3c';

        const titleShadow = this.add.text(width / 2 + 3, height / 3 + 3, titleText, {
            fontSize: '60px',
            fill: '#000000',
            fontStyle: 'bold'
        });
        titleShadow.setOrigin(0.5);

        const title = this.add.text(width / 2, height / 3, titleText, {
            fontSize: '60px',
            fill: titleColor,
            fontStyle: 'bold',
            stroke: '#ffffff',
            strokeThickness: 4
        });
        title.setOrigin(0.5);

        // Bounce animation
        this.tweens.add({
            targets: title,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 800,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });

        // Message panel
        const panel = this.add.graphics();
        panel.fillStyle(0x000000, 0.7);
        panel.fillRoundedRect(width / 2 - 200, height / 2 - 60, 400, 120, 10);

        // Message
        let message = '';
        if (this.won) {
            message = '✨ Amazing! You completed all levels! ✨\n\n⭐ Final Score: ' + window.gameState.score + ' ⭐';
        } else {
            message = 'Don\'t give up!\n\n💎 Final Score: ' + window.gameState.score;
        }

        const messageText = this.add.text(width / 2, height / 2, message, {
            fontSize: '22px',
            fill: '#ffffff',
            align: 'center',
            lineSpacing: 8,
            fontStyle: 'bold'
        });
        messageText.setOrigin(0.5);

        // Restart button
        const buttonBg = this.add.graphics();
        buttonBg.fillStyle(0x3498db, 1);
        buttonBg.fillRoundedRect(width / 2 - 160, height * 0.7, 320, 55, 28);

        const restartText = this.add.text(width / 2, height * 0.728, '🔄 PRESS SPACE TO CONTINUE', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        });
        restartText.setOrigin(0.5);

        // Blinking effect
        this.tweens.add({
            targets: [restartText, buttonBg],
            alpha: 0.5,
            duration: 800,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });

        // Statistics
        const statsPanel = this.add.graphics();
        statsPanel.fillStyle(0x000000, 0.5);
        statsPanel.fillRoundedRect(width / 2 - 150, height * 0.85, 300, 40, 8);

        const stats = this.add.text(width / 2, height * 0.87,
            '🏆 Levels Completed: ' + (window.gameState.currentLevel - (this.won ? 0 : 1)) + ' / ' + window.gameState.maxLevel, {
            fontSize: '18px',
            fill: '#ecf0f1',
            fontStyle: 'bold'
        });
        stats.setOrigin(0.5);

        // Return to menu on space key
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('MenuScene');
        });
    }
}
