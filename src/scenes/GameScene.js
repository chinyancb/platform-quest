// GameScene - Main gameplay scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        console.log('Starting Level', window.gameState.currentLevel);

        // Reset goal flag
        this.goalReached = false;

        // Get current level data
        this.levelData = LEVELS[window.gameState.currentLevel];

        // Create background
        this.createBackground();

        // Initialize groups
        this.platforms = this.physics.add.staticGroup();
        this.enemies = [];
        this.coins = [];

        // Create level
        this.createPlatforms();
        this.createPlayer();
        this.createEnemies();
        this.createCoins();
        this.createGoal();

        // Setup collisions
        this.setupCollisions();

        // Create UI
        this.createUI();

        // Camera setup
        this.cameras.main.setBounds(0, 0, 800, 600);
        this.cameras.main.startFollow(this.player.getSprite(), true, 0.1, 0.1);
    }

    createBackground() {
        // Sky gradient
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x87ceeb, 0x87ceeb, 0xe0f6ff, 0xe0f6ff, 1);
        graphics.fillRect(0, 0, 800, 600);

        // Clouds
        this.createCloud(100, 80, 1);
        this.createCloud(300, 120, 0.8);
        this.createCloud(550, 90, 1.2);
        this.createCloud(700, 140, 0.9);

        // Distant mountains
        graphics.fillStyle(0x78909c, 0.3);
        graphics.beginPath();
        graphics.moveTo(0, 400);
        graphics.lineTo(200, 300);
        graphics.lineTo(400, 350);
        graphics.lineTo(600, 280);
        graphics.lineTo(800, 380);
        graphics.lineTo(800, 600);
        graphics.lineTo(0, 600);
        graphics.closePath();
        graphics.fillPath();
    }

    createCloud(x, y, scale) {
        const cloud = this.add.graphics();
        cloud.fillStyle(0xffffff, 0.7);
        cloud.fillCircle(0, 0, 20 * scale);
        cloud.fillCircle(25 * scale, -5 * scale, 25 * scale);
        cloud.fillCircle(50 * scale, 0, 20 * scale);
        cloud.fillCircle(25 * scale, 10 * scale, 18 * scale);

        cloud.x = x;
        cloud.y = y;

        // Slow floating animation
        this.tweens.add({
            targets: cloud,
            x: x + 100,
            duration: 30000 / scale,
            repeat: -1,
            yoyo: true,
            ease: 'Sine.inOut'
        });
    }

    createPlatforms() {
        this.levelData.platforms.forEach(platform => {
            const p = this.platforms.create(platform.x, platform.y, 'platform');
            p.setDisplaySize(platform.width, platform.height);
            p.refreshBody();
        });
    }

    createPlayer() {
        const start = this.levelData.playerStart;
        this.player = new Player(this, start.x, start.y);
    }

    createEnemies() {
        this.levelData.enemies.forEach(enemyData => {
            const enemy = new Enemy(this, enemyData.x, enemyData.y);
            this.enemies.push(enemy);
        });
    }

    createCoins() {
        this.levelData.coins.forEach(coinData => {
            const coin = new Coin(this, coinData.x, coinData.y);
            this.coins.push(coin);
        });
    }

    createGoal() {
        const goalData = this.levelData.goal;
        this.goal = this.physics.add.sprite(goalData.x, goalData.y, 'goal');
        this.goal.body.setAllowGravity(false);
        this.goal.setImmovable(true);

        // Make the goal hitbox slightly larger for easier collision detection
        this.goal.setSize(40, 60);
        this.goal.setOrigin(0.5, 0.5);

        // Goal animation
        this.tweens.add({
            targets: this.goal,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 800,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });
    }

    setupCollisions() {
        // Player and platforms
        this.physics.add.collider(this.player.getSprite(), this.platforms);

        // Enemies and platforms
        this.enemies.forEach(enemy => {
            this.physics.add.collider(enemy.getSprite(), this.platforms);
        });

        // Player and enemies
        this.enemies.forEach(enemy => {
            this.physics.add.overlap(
                this.player.getSprite(),
                enemy.getSprite(),
                () => enemy.onCollideWithPlayer(this.player),
                null,
                this
            );
        });

        // Player and coins
        this.coins.forEach(coin => {
            this.physics.add.overlap(
                this.player.getSprite(),
                coin.getSprite(),
                () => coin.collect(),
                null,
                this
            );
        });

        // Player and goal
        this.physics.add.overlap(
            this.player.getSprite(),
            this.goal,
            () => this.reachGoal(),
            null,
            this
        );
    }

    createUI() {
        // UI Background panel
        const panel = this.add.graphics();
        panel.fillStyle(0x000000, 0.5);
        panel.fillRoundedRect(8, 8, 240, 110, 8);
        panel.setScrollFactor(0);
        panel.setDepth(99);

        // Score icon and text
        const scoreIcon = this.add.text(20, 16, '★', {
            fontSize: '28px',
            fill: '#f1c40f'
        });
        scoreIcon.setScrollFactor(0);
        scoreIcon.setDepth(100);

        this.scoreText = this.add.text(50, 20, 'Score: 0', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        });
        this.scoreText.setScrollFactor(0);
        this.scoreText.setDepth(100);

        // Lives with hearts
        this.livesText = this.add.text(20, 50, '♥♥♥', {
            fontSize: '24px',
            fill: '#e74c3c'
        });
        this.livesText.setScrollFactor(0);
        this.livesText.setDepth(100);

        const livesLabel = this.add.text(90, 52, 'Lives', {
            fontSize: '18px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });
        livesLabel.setScrollFactor(0);
        livesLabel.setDepth(100);

        // Level text (top center)
        const levelPanel = this.add.graphics();
        levelPanel.fillStyle(0x000000, 0.6);
        levelPanel.fillRoundedRect(330, 8, 140, 40, 8);
        levelPanel.setScrollFactor(0);
        levelPanel.setDepth(99);

        this.levelText = this.add.text(400, 18, 'LEVEL 1', {
            fontSize: '22px',
            fill: '#2ecc71',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.levelText.setOrigin(0.5, 0);
        this.levelText.setScrollFactor(0);
        this.levelText.setDepth(100);

        // Dash indicator
        this.dashText = this.add.text(20, 84, '', {
            fontSize: '18px',
            fill: '#f39c12',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        });
        this.dashText.setScrollFactor(0);
        this.dashText.setDepth(100);
    }

    update() {
        // Update player
        this.player.update();

        // Update enemies
        this.enemies.forEach(enemy => enemy.update());

        // Update UI
        this.updateUI();
    }

    updateUI() {
        this.scoreText.setText('Score: ' + window.gameState.score);

        // Update hearts based on lives
        const hearts = '♥'.repeat(window.gameState.lives) + '♡'.repeat(3 - window.gameState.lives);
        this.livesText.setText(hearts);

        this.levelText.setText('LEVEL ' + window.gameState.currentLevel);

        // Show dash indicator with animation
        if (this.player.isDashing) {
            this.dashText.setText('⚡ DASH!');
        } else {
            this.dashText.setText('');
        }
    }

    reachGoal() {
        // Prevent multiple triggers
        if (this.goalReached) return;
        this.goalReached = true;

        console.log('Goal reached!');

        // Check if there's a next level
        if (window.gameState.currentLevel < window.gameState.maxLevel) {
            window.gameState.currentLevel++;

            // Show level complete message
            const width = this.cameras.main.width;
            const height = this.cameras.main.height;

            const completeText = this.add.text(width / 2, height / 2, 'Level Complete!', {
                fontSize: '48px',
                fill: '#2ecc71',
                backgroundColor: '#000000',
                padding: { x: 20, y: 10 }
            });
            completeText.setOrigin(0.5);
            completeText.setScrollFactor(0);
            completeText.setDepth(1000);

            this.time.delayedCall(2000, () => {
                this.scene.restart();
            });
        } else {
            // All levels complete - game won!
            this.gameOver(true);
        }
    }

    gameOver(won) {
        this.scene.start('GameOverScene', { won: won });
    }
}
