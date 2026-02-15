// Player Class
class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        // Create sprite
        this.sprite = scene.physics.add.sprite(x, y, 'player');
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setBounce(0.1);

        // Player properties
        this.normalSpeed = 200;
        this.dashSpeed = 350; // Speed when dashing
        this.speed = this.normalSpeed;
        this.normalJumpVelocity = -450; // Increased for easier platforming
        this.dashJumpVelocity = -520; // Higher jump when dashing
        this.jumpVelocity = this.normalJumpVelocity;
        this.wallJumpVelocityX = 300; // Horizontal velocity for wall jump
        this.wallJumpVelocityY = -350; // Vertical velocity for wall jump
        this.wallSlideSpeed = 100; // Max fall speed when sliding on wall
        this.isAlive = true;
        this.isInvincible = false;
        this.isWallSliding = false;
        this.isDashing = false;
        this.canWallJump = true;

        // Setup controls
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.wasd = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        // Dash key (Shift)
        this.dashKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // Track jump key state for better control
        this.jumpKeyWasDown = false;
    }

    update() {
        if (!this.isAlive) return;

        const sprite = this.sprite;
        const body = sprite.body;

        // Check if dash key is pressed
        this.isDashing = this.dashKey.isDown;

        // Update speed and jump velocity based on dash state
        if (this.isDashing) {
            this.speed = this.dashSpeed;
            this.jumpVelocity = this.dashJumpVelocity;
        } else {
            this.speed = this.normalSpeed;
            this.jumpVelocity = this.normalJumpVelocity;
        }

        // Check if jump key is currently pressed
        const jumpKeyDown = this.cursors.up.isDown || this.wasd.up.isDown || this.wasd.space.isDown;
        const jumpKeyJustPressed = jumpKeyDown && !this.jumpKeyWasDown;

        // Check for wall contact
        const onWall = (body.touching.left || body.touching.right) && !body.touching.down;
        const onLeftWall = body.touching.left && !body.touching.down;
        const onRightWall = body.touching.right && !body.touching.down;

        // Wall sliding
        if (onWall && body.velocity.y > 0) {
            this.isWallSliding = true;
            // Limit fall speed when sliding on wall
            if (body.velocity.y > this.wallSlideSpeed) {
                sprite.setVelocityY(this.wallSlideSpeed);
            }
        } else {
            this.isWallSliding = false;
        }

        // Horizontal movement
        const isMovingLeft = this.cursors.left.isDown || this.wasd.left.isDown;
        const isMovingRight = this.cursors.right.isDown || this.wasd.right.isDown;

        if (isMovingLeft) {
            sprite.setVelocityX(-this.speed);
        } else if (isMovingRight) {
            sprite.setVelocityX(this.speed);
        } else {
            // Only stop if not wall jumping and on ground
            // Keep momentum in air for better jump control
            if (body.touching.down) {
                sprite.setVelocityX(0);
            } else {
                // Gradually slow down in air
                sprite.setVelocityX(body.velocity.x * 0.95);
            }
        }

        // Wall Jump
        if (jumpKeyJustPressed && onWall) {
            if (onLeftWall) {
                // Jump to the right
                sprite.setVelocityX(this.wallJumpVelocityX);
                sprite.setVelocityY(this.wallJumpVelocityY);
                this.createJumpEffect();
                console.log('Wall jump right!');
            } else if (onRightWall) {
                // Jump to the left
                sprite.setVelocityX(-this.wallJumpVelocityX);
                sprite.setVelocityY(this.wallJumpVelocityY);
                this.createJumpEffect();
                console.log('Wall jump left!');
            }
        }
        // Normal Jump (only from ground)
        else if (jumpKeyJustPressed && body.touching.down) {
            sprite.setVelocityY(this.jumpVelocity);
            this.createJumpEffect();
            if (this.isDashing) {
                this.createDashJumpEffect();
                console.log('Dash jump!');
            } else {
                console.log('Normal jump!');
            }
        }

        // Dash trail effect
        if (this.isDashing && Math.abs(body.velocity.x) > 100) {
            this.createDashTrail();
        }

        // Update jump key state
        this.jumpKeyWasDown = jumpKeyDown;

        // Check if fallen off the world
        if (sprite.y > this.scene.cameras.main.height + 50) {
            this.die();
        }
    }

    takeDamage() {
        if (this.isInvincible || !this.isAlive) return;

        window.gameState.lives--;
        console.log('Player hit! Lives remaining:', window.gameState.lives);

        if (window.gameState.lives <= 0) {
            this.die();
        } else {
            this.makeInvincible();
        }
    }

    makeInvincible() {
        this.isInvincible = true;

        // Blinking effect
        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0.3,
            duration: 100,
            ease: 'Linear',
            yoyo: true,
            repeat: 10,
            onComplete: () => {
                this.isInvincible = false;
                this.sprite.alpha = 1;
            }
        });
    }

    die() {
        if (!this.isAlive) return;

        this.isAlive = false;
        this.sprite.setVelocity(0, -300);
        this.sprite.setCollideWorldBounds(false);

        console.log('Player died!');

        this.scene.time.delayedCall(1000, () => {
            this.scene.gameOver(false);
        });
    }

    getSprite() {
        return this.sprite;
    }

    createJumpEffect() {
        // Jump dust particles
        for (let i = 0; i < 5; i++) {
            const dust = this.scene.add.graphics();
            dust.fillStyle(0xcccccc, 0.6);
            dust.fillCircle(0, 0, 2 + Math.random() * 2);
            dust.x = this.sprite.x + (Math.random() - 0.5) * 20;
            dust.y = this.sprite.y + this.sprite.height / 2;

            this.scene.tweens.add({
                targets: dust,
                x: dust.x + (Math.random() - 0.5) * 30,
                y: dust.y + 10,
                alpha: 0,
                duration: 300 + Math.random() * 200,
                ease: 'Power2',
                onComplete: () => dust.destroy()
            });
        }
    }

    createDashJumpEffect() {
        // Special effect for dash jump
        const ring = this.scene.add.graphics();
        ring.lineStyle(3, 0xf39c12, 1);
        ring.strokeCircle(this.sprite.x, this.sprite.y, 10);

        this.scene.tweens.add({
            targets: ring,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 400,
            ease: 'Power2',
            onComplete: () => ring.destroy()
        });
    }

    createDashTrail() {
        // Create trail effect when dashing (throttled)
        if (!this.lastTrailTime || Date.now() - this.lastTrailTime > 50) {
            this.lastTrailTime = Date.now();

            const trail = this.scene.add.graphics();
            trail.fillStyle(0x3498db, 0.4);
            trail.fillRect(0, 0, this.sprite.width, this.sprite.height);
            trail.x = this.sprite.x - this.sprite.width / 2;
            trail.y = this.sprite.y - this.sprite.height / 2;

            this.scene.tweens.add({
                targets: trail,
                alpha: 0,
                scaleX: 0.5,
                scaleY: 0.5,
                duration: 200,
                ease: 'Power2',
                onComplete: () => trail.destroy()
            });
        }
    }

    destroy() {
        this.sprite.destroy();
    }
}
