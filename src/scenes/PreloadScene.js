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

        // ウサギのデザイン - 元気なウサギの戦士

        // 体（白）
        graphics.fillStyle(0xf0f0f0, 1);
        graphics.fillRect(6, 12, 20, 16);

        // 頭
        graphics.fillStyle(0xf0f0f0, 1);
        graphics.beginPath();
        graphics.arc(16, 12, 9, 0, Math.PI * 2);
        graphics.fill();

        // 長い耳
        graphics.fillStyle(0xf0f0f0, 1);
        graphics.fillRect(10, 0, 4, 12);
        graphics.fillRect(18, 0, 4, 12);

        // 耳の内側（ピンク）
        graphics.fillStyle(0xffccdd, 1);
        graphics.fillRect(11, 2, 2, 8);
        graphics.fillRect(19, 2, 2, 8);

        // 目
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.arc(12, 12, 2, 0, Math.PI * 2);
        graphics.fill();
        graphics.beginPath();
        graphics.arc(20, 12, 2, 0, Math.PI * 2);
        graphics.fill();

        // 鼻
        graphics.fillStyle(0xff99cc, 1);
        graphics.beginPath();
        graphics.arc(16, 15, 1.5, 0, Math.PI * 2);
        graphics.fill();

        // 前歯
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(14, 16, 2, 3);
        graphics.fillRect(16, 16, 2, 3);

        // 足
        graphics.fillStyle(0xf0f0f0, 1);
        graphics.fillRect(8, 24, 6, 6);
        graphics.fillRect(18, 24, 6, 6);

        // 尻尾（ふわふわ）
        graphics.fillStyle(0xf0f0f0, 1);
        graphics.beginPath();
        graphics.arc(26, 22, 3, 0, Math.PI * 2);
        graphics.fill();

        graphics.generateTexture('player', 32, 32);
        graphics.destroy();
    }

    createEnemyGraphic() {
        const graphics = this.add.graphics();

        // オオカミのデザイン - 凶暴な森のオオカミ

        // 体（灰色）
        graphics.fillStyle(0x666666, 1);
        graphics.fillRect(6, 12, 20, 14);

        // 頭
        graphics.fillStyle(0x666666, 1);
        graphics.beginPath();
        graphics.arc(16, 12, 9, 0, Math.PI * 2);
        graphics.fill();

        // 耳（三角、尖った）
        graphics.fillStyle(0x666666, 1);
        graphics.beginPath();
        graphics.moveTo(10, 6);
        graphics.lineTo(8, 0);
        graphics.lineTo(12, 4);
        graphics.fill();

        graphics.beginPath();
        graphics.moveTo(22, 6);
        graphics.lineTo(20, 4);
        graphics.lineTo(24, 0);
        graphics.fill();

        // 鼻（長め）
        graphics.fillStyle(0x888888, 1);
        graphics.fillRect(12, 14, 8, 6);
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.arc(16, 19, 2, 0, Math.PI * 2);
        graphics.fill();

        // 目（赤く光る）
        graphics.fillStyle(0xff0000, 1);
        graphics.beginPath();
        graphics.arc(12, 11, 2.5, 0, Math.PI * 2);
        graphics.fill();
        graphics.beginPath();
        graphics.arc(20, 11, 2.5, 0, Math.PI * 2);
        graphics.fill();

        // 牙
        graphics.fillStyle(0xffffff, 1);
        graphics.beginPath();
        graphics.moveTo(12, 19);
        graphics.lineTo(10, 23);
        graphics.lineTo(13, 20);
        graphics.fill();
        graphics.beginPath();
        graphics.moveTo(20, 19);
        graphics.lineTo(19, 20);
        graphics.lineTo(22, 23);
        graphics.fill();

        // しっぽ
        graphics.fillStyle(0x666666, 1);
        graphics.beginPath();
        graphics.arc(26, 20, 4, 0, Math.PI * 2);
        graphics.fill();

        // 足
        graphics.fillStyle(0x555555, 1);
        graphics.fillRect(8, 24, 5, 6);
        graphics.fillRect(19, 24, 5, 6);

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

        // クマキングのデザイン - 王冠を被った巨大なクマ

        // 体（茶色、大きい）
        graphics.fillStyle(0x8b4513, 1);
        graphics.fillRect(12, 28, 40, 32);

        // 頭
        graphics.fillStyle(0x8b4513, 1);
        graphics.beginPath();
        graphics.arc(32, 20, 18, 0, Math.PI * 2);
        graphics.fill();

        // 耳（丸い）
        graphics.fillStyle(0x8b4513, 1);
        graphics.beginPath();
        graphics.arc(18, 8, 8, 0, Math.PI * 2);
        graphics.fill();
        graphics.beginPath();
        graphics.arc(46, 8, 8, 0, Math.PI * 2);
        graphics.fill();

        // 耳の内側
        graphics.fillStyle(0xd2691e, 1);
        graphics.beginPath();
        graphics.arc(18, 8, 4, 0, Math.PI * 2);
        graphics.fill();
        graphics.beginPath();
        graphics.arc(46, 8, 4, 0, Math.PI * 2);
        graphics.fill();

        // 王冠（金色）
        graphics.fillStyle(0xffd700, 1);
        graphics.fillRect(20, 2, 24, 6);
        // 王冠の飾り
        graphics.fillRect(22, 0, 4, 3);
        graphics.fillRect(30, 0, 4, 3);
        graphics.fillRect(38, 0, 4, 3);

        // 宝石（赤）
        graphics.fillStyle(0xff0000, 1);
        graphics.beginPath();
        graphics.arc(32, 5, 2, 0, Math.PI * 2);
        graphics.fill();

        // 顔の明るい部分
        graphics.fillStyle(0xd2691e, 1);
        graphics.beginPath();
        graphics.arc(32, 24, 12, 0, Math.PI);
        graphics.fill();

        // 目（威厳のある）
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.arc(24, 20, 3, 0, Math.PI * 2);
        graphics.fill();
        graphics.beginPath();
        graphics.arc(40, 20, 3, 0, Math.PI * 2);
        graphics.fill();

        // 眉毛（怒った顔）
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(20, 17);
        graphics.lineTo(26, 18);
        graphics.stroke();
        graphics.beginPath();
        graphics.moveTo(38, 18);
        graphics.lineTo(44, 17);
        graphics.stroke();

        // 鼻
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.arc(32, 26, 4, 0, Math.PI * 2);
        graphics.fill();

        // 腕（太い）
        graphics.fillStyle(0x8b4513, 1);
        graphics.fillRect(6, 32, 8, 20);
        graphics.fillRect(50, 32, 8, 20);

        // 爪
        graphics.fillStyle(0xffffff, 1);
        for (let i = 0; i < 3; i++) {
            graphics.fillRect(6 + i * 2, 50, 2, 4);
            graphics.fillRect(50 + i * 2, 50, 2, 4);
        }

        // 傷跡（戦いの証）
        graphics.lineStyle(1.5, 0x654321, 1);
        graphics.beginPath();
        graphics.moveTo(38, 22);
        graphics.lineTo(42, 26);
        graphics.stroke();

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
        // Initialize global sound manager
        if (!window.soundManager) {
            window.soundManager = new SoundManager(this);
            console.log('Sound system initialized');
        }

        // Move to menu scene
        this.scene.start('MenuScene');
    }
}
