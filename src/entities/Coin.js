// Coin Class
class Coin {
    constructor(scene, x, y) {
        this.scene = scene;

        // Create sprite
        this.sprite = scene.physics.add.sprite(x, y, 'coin');
        this.sprite.setCollideWorldBounds(false);
        this.sprite.body.setAllowGravity(false);

        // Coin properties
        this.isCollected = false;
        this.value = 10;

        // Floating animation
        scene.tweens.add({
            targets: this.sprite,
            y: y - 5,
            duration: 600,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        });

        // Rotation animation
        scene.tweens.add({
            targets: this.sprite,
            angle: 360,
            duration: 2000,
            ease: 'Linear',
            repeat: -1
        });

        // Store reference to this coin in the sprite
        this.sprite.coinRef = this;
    }

    collect() {
        if (this.isCollected) return;

        this.isCollected = true;

        // Add score
        window.gameState.score += this.value;
        if (window.soundManager) window.soundManager.play('coin');
        console.log('Coin collected! Score:', window.gameState.score);

        // Create sparkle particles
        this.createSparkles();

        // Score popup text
        const scoreText = this.scene.add.text(this.sprite.x, this.sprite.y - 20, '+' + this.value, {
            fontSize: '16px',
            fill: '#f1c40f',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        });
        scoreText.setOrigin(0.5);

        this.scene.tweens.add({
            targets: scoreText,
            y: scoreText.y - 40,
            alpha: 0,
            duration: 800,
            ease: 'Power2',
            onComplete: () => scoreText.destroy()
        });

        // Collection animation
        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0,
            scaleX: 1.8,
            scaleY: 1.8,
            y: this.sprite.y - 30,
            duration: 300,
            ease: 'Back.easeIn',
            onComplete: () => {
                this.sprite.destroy();
            }
        });
    }

    createSparkles() {
        // Create multiple sparkle particles
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8;
            const speed = 50 + Math.random() * 50;

            const particle = this.scene.add.graphics();
            particle.fillStyle(0xfff9c4, 1);
            particle.fillCircle(0, 0, 2);
            particle.x = this.sprite.x;
            particle.y = this.sprite.y;

            this.scene.tweens.add({
                targets: particle,
                x: particle.x + Math.cos(angle) * speed,
                y: particle.y + Math.sin(angle) * speed,
                alpha: 0,
                duration: 400 + Math.random() * 200,
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
