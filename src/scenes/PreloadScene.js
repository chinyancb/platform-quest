// PreloadScene - Asset creation and loading
class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Display loading text
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const loadingText = this.add.text(width / 2, height / 2, 'Loading...', {
            fontSize: '32px',
            fill: '#ffffff'
        });
        loadingText.setOrigin(0.5);

        // Create graphics assets programmatically
        this.createPlayerGraphic();
        this.createEnemyGraphic();
        this.createCoinGraphic();
        this.createPlatformGraphic();
        this.createGoalGraphic();
        this.createBossGraphic();
        this.createHeartGraphic();
    }

    createPlayerGraphic() {
        const graphics = this.add.graphics();

        // Body - gradient blue with darker outline
        graphics.fillStyle(0x2980b9, 1);
        graphics.fillRoundedRect(2, 2, 28, 28, 4);

        // Lighter blue highlight
        graphics.fillStyle(0x5dade2, 1);
        graphics.fillRoundedRect(4, 4, 12, 12, 2);

        // Eyes
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(10, 12, 3);
        graphics.fillCircle(22, 12, 3);
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(11, 12, 2);
        graphics.fillCircle(23, 12, 2);

        // Outline
        graphics.lineStyle(2, 0x1a5276, 1);
        graphics.strokeRoundedRect(2, 2, 28, 28, 4);

        graphics.generateTexture('player', 32, 32);
        graphics.destroy();
    }

    createEnemyGraphic() {
        const graphics = this.add.graphics();

        // Body - gradient red
        graphics.fillStyle(0xc0392b, 1);
        graphics.fillRoundedRect(2, 2, 28, 28, 4);

        // Darker red bottom
        graphics.fillStyle(0x922b21, 1);
        graphics.fillRoundedRect(2, 20, 28, 10, 4);

        // Angry eyes
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(10, 12, 3);
        graphics.fillCircle(22, 12, 3);
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(10, 11, 2);
        graphics.fillCircle(22, 11, 2);

        // Angry eyebrows
        graphics.lineStyle(2, 0x000000, 1);
        graphics.lineBetween(6, 8, 12, 10);
        graphics.lineBetween(18, 10, 24, 8);

        // Outline
        graphics.lineStyle(2, 0x7b241c, 1);
        graphics.strokeRoundedRect(2, 2, 28, 28, 4);

        graphics.generateTexture('enemy', 32, 32);
        graphics.destroy();
    }

    createCoinGraphic() {
        const graphics = this.add.graphics();

        // Outer glow
        graphics.fillStyle(0xf39c12, 0.3);
        graphics.fillCircle(8, 8, 9);

        // Main coin body
        graphics.fillStyle(0xf1c40f, 1);
        graphics.fillCircle(8, 8, 7);

        // Highlight
        graphics.fillStyle(0xfff9c4, 1);
        graphics.fillCircle(6, 6, 3);

        // Inner circle detail
        graphics.lineStyle(1, 0xf39c12, 1);
        graphics.strokeCircle(8, 8, 5);

        // Sparkle
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(11, 5, 1);

        graphics.generateTexture('coin', 16, 16);
        graphics.destroy();
    }

    createPlatformGraphic() {
        const graphics = this.add.graphics();

        // Base brown
        graphics.fillStyle(0x6d4c41, 1);
        graphics.fillRect(0, 0, 32, 32);

        // Top grass layer
        graphics.fillStyle(0x4caf50, 1);
        graphics.fillRect(0, 0, 32, 6);

        // Grass details
        graphics.fillStyle(0x66bb6a, 1);
        graphics.fillRect(2, 2, 4, 4);
        graphics.fillRect(10, 2, 3, 4);
        graphics.fillRect(20, 2, 5, 4);
        graphics.fillRect(28, 2, 3, 4);

        // Dirt texture
        graphics.fillStyle(0x5d4037, 1);
        graphics.fillRect(3, 10, 2, 2);
        graphics.fillRect(12, 14, 2, 2);
        graphics.fillRect(22, 18, 2, 2);
        graphics.fillRect(8, 24, 2, 2);
        graphics.fillRect(26, 22, 2, 2);

        graphics.generateTexture('platform', 32, 32);
        graphics.destroy();
    }

    createGoalGraphic() {
        const graphics = this.add.graphics();

        // Flag pole
        graphics.fillStyle(0x8d6e63, 1);
        graphics.fillRect(2, 0, 4, 60);

        // Pole highlight
        graphics.fillStyle(0xa1887f, 1);
        graphics.fillRect(2, 0, 2, 60);

        // Flag - gradient green
        graphics.fillStyle(0x2ecc71, 1);
        graphics.fillRect(6, 5, 30, 20);

        // Flag highlight
        graphics.fillStyle(0x58d68d, 1);
        graphics.fillRect(6, 5, 30, 8);

        // Flag star
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(21, 15, 4);

        // Star detail
        graphics.fillStyle(0xf1c40f, 1);
        graphics.fillCircle(21, 15, 2);

        // Pole top
        graphics.fillStyle(0xf39c12, 1);
        graphics.fillCircle(4, 2, 3);

        graphics.generateTexture('goal', 40, 60);
        graphics.destroy();
    }

    createBossGraphic() {
        const graphics = this.add.graphics();

        // Main body - large dark red
        graphics.fillStyle(0x8b0000, 1);
        graphics.fillRoundedRect(4, 4, 56, 56, 6);

        // Armor plates
        graphics.fillStyle(0x4a0000, 1);
        graphics.fillRoundedRect(8, 12, 20, 16, 3);
        graphics.fillRoundedRect(36, 12, 20, 16, 3);
        graphics.fillRoundedRect(20, 36, 24, 20, 3);

        // Spikes on shoulders
        graphics.fillStyle(0x666666, 1);
        graphics.beginPath();
        graphics.moveTo(8, 12);
        graphics.lineTo(12, 4);
        graphics.lineTo(16, 12);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(48, 12);
        graphics.lineTo(52, 4);
        graphics.lineTo(56, 12);
        graphics.closePath();
        graphics.fillPath();

        // Glowing eyes
        graphics.fillStyle(0xff0000, 1);
        graphics.fillCircle(20, 24, 4);
        graphics.fillCircle(44, 24, 4);

        // Eye glow
        graphics.fillStyle(0xff6666, 0.5);
        graphics.fillCircle(20, 24, 6);
        graphics.fillCircle(44, 24, 6);

        // Menacing mouth
        graphics.lineStyle(3, 0xff0000, 1);
        graphics.lineBetween(18, 42, 26, 46);
        graphics.lineBetween(26, 46, 32, 44);
        graphics.lineBetween(32, 44, 38, 46);
        graphics.lineBetween(38, 46, 46, 42);

        // Outline
        graphics.lineStyle(3, 0x000000, 1);
        graphics.strokeRoundedRect(4, 4, 56, 56, 6);

        graphics.generateTexture('boss', 64, 64);
        graphics.destroy();
    }

    createHeartGraphic() {
        const graphics = this.add.graphics();

        // Simple heart shape using circles and triangle
        graphics.fillStyle(0xff1744, 1); // Red heart

        // Left circle
        graphics.fillCircle(8, 8, 6);
        // Right circle
        graphics.fillCircle(16, 8, 6);

        // Bottom triangle
        graphics.beginPath();
        graphics.moveTo(2, 8);
        graphics.lineTo(12, 20);
        graphics.lineTo(22, 8);
        graphics.closePath();
        graphics.fillPath();

        // Add highlight
        graphics.fillStyle(0xff6b9d, 0.6);
        graphics.fillCircle(8, 7, 3);

        // Add shine
        graphics.fillStyle(0xffffff, 0.8);
        graphics.fillCircle(7, 6, 1.5);

        graphics.generateTexture('heart', 24, 24);
        graphics.destroy();
    }

    create() {
        // Move to menu scene
        this.scene.start('MenuScene');
    }
}
