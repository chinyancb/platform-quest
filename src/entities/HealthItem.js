// Health Item Class - Restores player's life
class HealthItem {
    constructor(scene, x, y) {
        this.scene = scene;

        // Create sprite
        this.sprite = scene.physics.add.sprite(x, y, 'heart');
        this.sprite.setCollideWorldBounds(false);
        this.sprite.body.setAllowGravity(false);

        // Health item properties
        this.isCollected = false;
        this.healAmount = 1; // Restores 1 life

        // Floating animation
        scene.tweens.add({
            targets: this.sprite,
            y: y - 10,
            duration: 800,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });

        // Pulsing animation
        scene.tweens.add({
            targets: this.sprite,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 600,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });

        // Store reference to this health item in the sprite
        this.sprite.healthItemRef = this;
    }

    collect() {
        if (this.isCollected) return;

        this.isCollected = true;

        // Restore life
        if (window.gameState.lives < window.gameState.maxLives) {
            window.gameState.lives++;

            // Show life restored message
            const healText = this.scene.add.text(this.sprite.x, this.sprite.y - 30, '💖 +1 LIFE!', {
                fontSize: '24px',
                fill: '#ff69b4',
                fontStyle: 'bold',
                stroke: '#ffffff',
                strokeThickness: 4
            });
            healText.setOrigin(0.5);
            healText.setDepth(1000);

            this.scene.tweens.add({
                targets: healText,
                y: healText.y - 50,
                alpha: 0,
                scaleX: 1.5,
                scaleY: 1.5,
                duration: 1500,
                ease: 'Power2',
                onComplete: () => healText.destroy()
            });

            console.log('Life restored! Lives:', window.gameState.lives);
        } else {
            // Max lives - give bonus score instead
            window.gameState.score += 50;

            const bonusText = this.scene.add.text(this.sprite.x, this.sprite.y - 30, '+50 BONUS!', {
                fontSize: '20px',
                fill: '#f1c40f',
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 3
            });
            bonusText.setOrigin(0.5);
            bonusText.setDepth(1000);

            this.scene.tweens.add({
                targets: bonusText,
                y: bonusText.y - 40,
                alpha: 0,
                duration: 1200,
                ease: 'Power2',
                onComplete: () => bonusText.destroy()
            });

            console.log('Max lives! Bonus score:', window.gameState.score);
        }

        // Create healing particles
        this.createHealParticles();

        // Collection animation
        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0,
            scaleX: 2,
            scaleY: 2,
            angle: 360,
            duration: 500,
            ease: 'Back.easeIn',
            onComplete: () => {
                this.sprite.destroy();
            }
        });
    }

    createHealParticles() {
        // Create healing sparkle particles
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12;
            const speed = 40 + Math.random() * 40;

            const particle = this.scene.add.graphics();
            particle.fillStyle(0xff69b4, 1);
            particle.fillCircle(0, 0, 3);
            particle.x = this.sprite.x;
            particle.y = this.sprite.y;

            this.scene.tweens.add({
                targets: particle,
                x: particle.x + Math.cos(angle) * speed,
                y: particle.y + Math.sin(angle) * speed - 20,
                alpha: 0,
                duration: 600 + Math.random() * 400,
                ease: 'Power2',
                onComplete: () => particle.destroy()
            });
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
