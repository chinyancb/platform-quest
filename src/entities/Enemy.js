// Enemy Class
class Enemy {
    constructor(scene, x, y) {
        this.scene = scene;

        // Create sprite
        this.sprite = scene.physics.add.sprite(x, y, 'enemy');
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setBounce(0);

        // Enemy properties
        this.speed = 80;
        this.direction = 1; // 1 for right, -1 for left
        this.isAlive = true;
        this.turnCooldown = 0; // Prevent rapid direction changes

        // Start moving
        this.sprite.setVelocityX(this.speed * this.direction);

        // Store reference to this enemy in the sprite
        this.sprite.enemyRef = this;
    }

    update() {
        if (!this.isAlive) return;

        const body = this.sprite.body;

        // Decrease turn cooldown
        if (this.turnCooldown > 0) {
            this.turnCooldown--;
        }

        // Reverse direction if hitting a wall or world bounds
        if ((body.blocked.left || body.blocked.right) && this.turnCooldown === 0) {
            this.direction *= -1;
            this.sprite.setVelocityX(this.speed * this.direction);
            this.turnCooldown = 10; // Prevent immediate re-turning
        }

        // Platform edge detection - check if there's ground ahead
        // Create a raycast point slightly ahead and below the enemy
        const checkDistance = 16; // Distance ahead to check
        const checkX = this.sprite.x + (checkDistance * this.direction);
        const checkY = this.sprite.y + (this.sprite.height / 2) + 5; // Below the enemy's feet

        // Use Phaser's overlap check to detect platforms
        const platformsBelow = this.scene.physics.overlapCirc(checkX, checkY, 2, true, true);

        // If no platform detected ahead and enemy is on ground, reverse direction
        if (platformsBelow.length === 0 && body.touching.down && this.turnCooldown === 0) {
            this.direction *= -1;
            this.sprite.setVelocityX(this.speed * this.direction);
            this.turnCooldown = 10;
        }

        // Failsafe: If velocity is too low (stuck), reverse direction
        if (Math.abs(body.velocity.x) < 10 && this.turnCooldown === 0) {
            this.direction *= -1;
            this.sprite.setVelocityX(this.speed * this.direction);
            this.turnCooldown = 10;
        }
    }

    onStomp() {
        if (!this.isAlive) return;

        this.isAlive = false;
        this.sprite.setVelocity(0, 0);
        this.sprite.body.enable = false;

        // Add score
        window.gameState.score += 50;

        // Create defeat particles
        this.createDefeatParticles();

        // Score popup
        const scoreText = this.scene.add.text(this.sprite.x, this.sprite.y - 30, '+50', {
            fontSize: '18px',
            fill: '#e74c3c',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        });
        scoreText.setOrigin(0.5);

        this.scene.tweens.add({
            targets: scoreText,
            y: scoreText.y - 40,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => scoreText.destroy()
        });

        // Death animation
        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0,
            scaleX: 1.3,
            scaleY: 0.3,
            y: this.sprite.y + 10,
            angle: 180,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                this.sprite.destroy();
            }
        });

        console.log('Enemy defeated! Score:', window.gameState.score);
    }

    createDefeatParticles() {
        // Create smoke/explosion particles
        for (let i = 0; i < 10; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 30 + Math.random() * 70;

            const particle = this.scene.add.graphics();
            particle.fillStyle(0xc0392b, 1);
            particle.fillCircle(0, 0, 3 + Math.random() * 3);
            particle.x = this.sprite.x;
            particle.y = this.sprite.y;

            this.scene.tweens.add({
                targets: particle,
                x: particle.x + Math.cos(angle) * speed,
                y: particle.y + Math.sin(angle) * speed - 20,
                alpha: 0,
                scaleX: 0,
                scaleY: 0,
                duration: 500 + Math.random() * 300,
                ease: 'Power2',
                onComplete: () => particle.destroy()
            });
        }
    }

    onCollideWithPlayer(player) {
        if (!this.isAlive) return;

        const playerSprite = player.getSprite();
        const enemySprite = this.sprite;

        // Check if player is falling and above enemy (stomp)
        if (playerSprite.body.velocity.y > 0 && playerSprite.y < enemySprite.y - 10) {
            // Player stomped on enemy
            playerSprite.setVelocityY(-250); // Bounce
            this.onStomp();
        } else {
            // Enemy hurts player
            player.takeDamage();
        }
    }

    getSprite() {
        return this.sprite;
    }

    destroy() {
        if (this.sprite) {
            this.sprite.destroy();
        }
    }
}
