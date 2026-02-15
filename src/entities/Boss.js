// Boss Enemy Class - Mega Golem
class Boss {
    constructor(scene, x, y) {
        this.scene = scene;

        // Create sprite (larger than normal enemy)
        this.sprite = scene.physics.add.sprite(x, y, 'boss');
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setBounce(0);
        this.sprite.setScale(2); // Bigger size

        // Boss properties
        this.maxHealth = 6; // Test value - easier to defeat
        this.health = this.maxHealth;
        this.hasDroppedHealthItem = false; // Track if health item was dropped
        this.speed = 60;
        this.jumpPower = -300;
        this.direction = 1; // 1 for right, -1 for left
        this.isAlive = true;
        this.isInvulnerable = false;

        // Attack properties
        this.lastAttackTime = 0;
        this.attackCooldown = 2000; // 2 seconds
        this.phase = 1; // Boss gets harder as health decreases

        // Movement AI
        this.movementTimer = 0;
        this.actionState = 'walking'; // walking, jumping, charging
        this.turnCooldown = 0; // Prevent rapid direction changes

        // Invulnerability cycle system
        this.invulnerabilityCycleTime = 0;
        this.vulnerableTime = 3000; // 3 seconds vulnerable (red)
        this.invulnerableTime = 2000; // 2 seconds invulnerable (blue)
        this.isInCycle = true; // Start in cycle mode

        // Store reference
        this.sprite.bossRef = this;

        // Set default color (red = attackable)
        this.sprite.setTint(0xff0000);
        this.isInvulnerable = false;

        // Create health bar
        this.createHealthBar();
    }

    createHealthBar() {
        // Health bar background
        this.healthBarBg = this.scene.add.graphics();
        this.healthBarBg.fillStyle(0x000000, 0.7);
        this.healthBarBg.fillRect(150, 30, 500, 30);
        this.healthBarBg.setScrollFactor(0);
        this.healthBarBg.setDepth(101);

        // Health bar fill
        this.healthBar = this.scene.add.graphics();
        this.healthBar.setScrollFactor(0);
        this.healthBar.setDepth(102);

        // Boss name text
        this.bossNameText = this.scene.add.text(400, 35, '🐲 MEGA GOLEM 🐲', {
            fontSize: '20px',
            fill: '#ff4444',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.bossNameText.setOrigin(0.5, 0);
        this.bossNameText.setScrollFactor(0);
        this.bossNameText.setDepth(103);

        this.updateHealthBar();
    }

    updateHealthBar() {
        this.healthBar.clear();

        // Determine color based on health
        let healthPercent = this.health / this.maxHealth;
        let color = 0x00ff00; // Green
        if (healthPercent < 0.3) {
            color = 0xff0000; // Red
        } else if (healthPercent < 0.6) {
            color = 0xffaa00; // Orange
        }

        this.healthBar.fillStyle(color, 1);
        this.healthBar.fillRect(155, 35, 490 * healthPercent, 20);
    }

    updateInvulnerabilityCycle() {
        if (!this.isInCycle) return; // Skip if in damage-triggered invulnerability

        this.invulnerabilityCycleTime += 16; // Increment by ~16ms per frame

        const totalCycleTime = this.vulnerableTime + this.invulnerableTime;
        const timeInCycle = this.invulnerabilityCycleTime % totalCycleTime;

        if (timeInCycle < this.vulnerableTime) {
            // Vulnerable phase (RED)
            if (this.isInvulnerable) {
                this.isInvulnerable = false;
                this.sprite.setTint(0xff0000); // Red = attackable
                console.log('Boss is now VULNERABLE (RED) - Attack now!');

                // Show indicator
                this.showStateIndicator('🔴 ATTACK NOW!', '#ff0000');
            }
        } else {
            // Invulnerable phase (BLUE)
            if (!this.isInvulnerable) {
                this.isInvulnerable = true;
                this.sprite.setTint(0x0066ff); // Blue = invulnerable
                console.log('Boss is now INVULNERABLE (BLUE) - Wait!');

                // Show indicator
                this.showStateIndicator('🔵 WAIT!', '#00ffff');
            }
        }
    }

    showStateIndicator(text, color) {
        const indicator = this.scene.add.text(
            this.sprite.x,
            this.sprite.y - 80,
            text,
            {
                fontSize: '18px',
                fill: color,
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 3
            }
        );
        indicator.setOrigin(0.5);
        indicator.setDepth(1000);

        this.scene.tweens.add({
            targets: indicator,
            alpha: 0,
            y: indicator.y - 30,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => indicator.destroy()
        });
    }

    update() {
        if (!this.isAlive) return;

        const body = this.sprite.body;
        this.movementTimer += 16; // Approximate delta time

        // Update invulnerability cycle
        this.updateInvulnerabilityCycle();

        // Decrease turn cooldown
        if (this.turnCooldown > 0) {
            this.turnCooldown--;
        }

        // Update phase based on health
        if (this.health < this.maxHealth * 0.33) {
            this.phase = 3;
            this.speed = 100;
            this.attackCooldown = 1200;
        } else if (this.health < this.maxHealth * 0.66) {
            this.phase = 2;
            this.speed = 80;
            this.attackCooldown = 1500;
        }

        // AI behavior
        this.updateBehavior();

        // Reverse direction if hitting a wall or world bounds
        if ((body.blocked.left || body.blocked.right) && this.turnCooldown === 0) {
            this.direction *= -1;
            this.turnCooldown = 10;
        }

        // Failsafe: If velocity is too low (stuck), reverse direction
        if (Math.abs(body.velocity.x) < 10 && this.actionState === 'walking' && this.turnCooldown === 0) {
            this.direction *= -1;
            this.sprite.setVelocityX(this.speed * this.direction);
            this.turnCooldown = 10;
        }

        // Perform attacks
        const currentTime = Date.now();
        if (currentTime - this.lastAttackTime > this.attackCooldown) {
            this.performAttack();
            this.lastAttackTime = currentTime;
        }
    }

    updateBehavior() {
        const body = this.sprite.body;

        switch (this.actionState) {
            case 'walking':
                this.sprite.setVelocityX(this.speed * this.direction);

                // Randomly jump
                if (body.touching.down && Math.random() < 0.01) {
                    this.sprite.setVelocityY(this.jumpPower);
                    this.actionState = 'jumping';
                }

                // Change to charging occasionally
                if (this.movementTimer > 3000 && Math.random() < 0.3) {
                    this.actionState = 'charging';
                    this.movementTimer = 0;
                }
                break;

            case 'jumping':
                this.sprite.setVelocityX(this.speed * this.direction);
                if (body.touching.down) {
                    this.actionState = 'walking';
                }
                break;

            case 'charging':
                // Fast charge attack
                this.sprite.setVelocityX(this.speed * 2.5 * this.direction);
                if (this.movementTimer > 1000) {
                    this.actionState = 'walking';
                    this.movementTimer = 0;
                }
                break;
        }
    }

    performAttack() {
        // Spawn projectile in phase 2 and 3
        if (this.phase >= 2) {
            this.spawnProjectile();
        }

        // Ground pound in phase 3
        if (this.phase >= 3 && this.sprite.body.touching.down) {
            this.groundPound();
        }
    }

    spawnProjectile() {
        const projectile = this.scene.add.graphics();
        projectile.fillStyle(0xff4444, 1);
        projectile.fillCircle(0, 0, 8);
        projectile.x = this.sprite.x;
        projectile.y = this.sprite.y;

        // Enable physics
        this.scene.physics.add.existing(projectile);
        projectile.body.setAllowGravity(false);
        projectile.body.setVelocityX(this.direction * 200);
        projectile.body.setCircle(8);

        // Collision with player
        this.scene.physics.add.overlap(
            this.scene.player.getSprite(),
            projectile,
            () => {
                this.scene.player.takeDamage();
                projectile.destroy();
            }
        );

        // Auto destroy after 3 seconds
        this.scene.time.delayedCall(3000, () => {
            if (projectile) projectile.destroy();
        });
    }

    groundPound() {
        // Create shockwave effect
        const shockwave = this.scene.add.graphics();
        shockwave.lineStyle(4, 0xff8800, 1);
        shockwave.strokeCircle(this.sprite.x, this.sprite.y + 32, 20);

        this.scene.tweens.add({
            targets: shockwave,
            scaleX: 4,
            scaleY: 2,
            alpha: 0,
            duration: 600,
            ease: 'Power2',
            onComplete: () => shockwave.destroy()
        });

        // Damage player if close
        const distance = Phaser.Math.Distance.Between(
            this.sprite.x,
            this.sprite.y,
            this.scene.player.getSprite().x,
            this.scene.player.getSprite().y
        );

        if (distance < 150 && this.scene.player.getSprite().body.touching.down) {
            this.scene.player.takeDamage();
        }
    }

    takeDamage() {
        if (this.isInvulnerable || !this.isAlive) return;

        this.health--;
        if (window.soundManager) window.soundManager.play('bossHit');
        console.log('Boss hit! Health:', this.health);

        this.updateHealthBar();

        // Drop health item when boss reaches half health
        if (this.health <= this.maxHealth / 2 && !this.hasDroppedHealthItem) {
            this.dropHealthItem();
            this.hasDroppedHealthItem = true;
        }

        // Damage number popup
        const damageText = this.scene.add.text(this.sprite.x, this.sprite.y - 50, '-1', {
            fontSize: '32px',
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#ff0000',
            strokeThickness: 4
        });
        damageText.setOrigin(0.5);
        damageText.setDepth(1000);

        this.scene.tweens.add({
            targets: damageText,
            y: damageText.y - 40,
            alpha: 0,
            duration: 800,
            ease: 'Power2',
            onComplete: () => damageText.destroy()
        });

        // Temporarily stop the cycle and set manual invulnerability
        this.isInCycle = false; // Stop automatic cycle
        this.isInvulnerable = true;
        const invulnerabilityDuration = 1500; // 1.5 seconds after damage

        // Change color to BLUE = invulnerable
        this.sprite.setTint(0x0066ff);
        this.sprite.setAlpha(1);

        // Show damage feedback
        this.showStateIndicator('💥 HIT! INVULNERABLE!', '#00ffff');

        // End invulnerability and resume cycle
        this.scene.time.delayedCall(invulnerabilityDuration, () => {
            // Resume the automatic cycle
            this.isInCycle = true;
            this.invulnerabilityCycleTime = 0; // Reset cycle to start with vulnerable phase
            this.isInvulnerable = false;
            this.sprite.setTint(0xff0000); // RED = attackable!
            this.sprite.setAlpha(1);

            this.showStateIndicator('🔴 CYCLE RESUMED!', '#ffff00');
        });

        if (this.health <= 0) {
            this.defeat();
        }
    }

    dropHealthItem() {
        // Create a health item at boss's position
        const healthItem = new HealthItem(
            this.scene,
            this.sprite.x + (Math.random() - 0.5) * 100,
            this.sprite.y - 80
        );

        // Add to scene's health items array
        this.scene.healthItems.push(healthItem);

        // Setup collision with player
        this.scene.physics.add.overlap(
            this.scene.player.getSprite(),
            healthItem.getSprite(),
            () => healthItem.collect(),
            null,
            this.scene
        );

        // Show notification
        const dropText = this.scene.add.text(
            this.sprite.x,
            this.sprite.y - 100,
            '💖 HEALTH ITEM!',
            {
                fontSize: '24px',
                fill: '#ff69b4',
                fontStyle: 'bold',
                stroke: '#ffffff',
                strokeThickness: 4
            }
        );
        dropText.setOrigin(0.5);
        dropText.setDepth(1001);

        this.scene.tweens.add({
            targets: dropText,
            y: dropText.y - 40,
            alpha: 0,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => dropText.destroy()
        });

        console.log('Boss dropped health item!');
    }

    defeat() {
        if (!this.isAlive) return;

        this.isAlive = false;
        this.sprite.setVelocity(0, 0);
        this.sprite.body.enable = false;

        // Add big score
        window.gameState.score += 500;
        if (window.soundManager) window.soundManager.play('bossDefeat');

        console.log('Boss defeated! Score:', window.gameState.score);

        // Hide health bar
        this.healthBarBg.destroy();
        this.healthBar.destroy();
        this.bossNameText.destroy();

        // Create epic explosion effect
        for (let i = 0; i < 30; i++) {
            const angle = (Math.PI * 2 * i) / 30;
            const speed = 100 + Math.random() * 100;

            const particle = this.scene.add.graphics();
            particle.fillStyle(0xff4444, 1);
            particle.fillCircle(0, 0, 5 + Math.random() * 5);
            particle.x = this.sprite.x;
            particle.y = this.sprite.y;

            this.scene.tweens.add({
                targets: particle,
                x: particle.x + Math.cos(angle) * speed,
                y: particle.y + Math.sin(angle) * speed,
                alpha: 0,
                scaleX: 0,
                scaleY: 0,
                duration: 1000 + Math.random() * 500,
                ease: 'Power2',
                onComplete: () => particle.destroy()
            });
        }

        // Victory text
        const victoryText = this.scene.add.text(
            this.scene.cameras.main.width / 2,
            this.scene.cameras.main.height / 2,
            '🎉 BOSS DEFEATED! 🎉\n\n+500 POINTS!',
            {
                fontSize: '48px',
                fill: '#f1c40f',
                fontStyle: 'bold',
                align: 'center',
                stroke: '#000000',
                strokeThickness: 6
            }
        );
        victoryText.setOrigin(0.5);
        victoryText.setScrollFactor(0);
        victoryText.setDepth(1000);

        // Defeat animation
        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0,
            scaleX: 3,
            scaleY: 0.1,
            angle: 360,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.sprite.destroy();

                // Show the goal after boss is defeated
                this.scene.time.delayedCall(1500, () => {
                    victoryText.destroy();

                    // Enable and show goal
                    if (this.scene.goal) {
                        this.scene.goal.body.enable = true;
                        this.scene.tweens.add({
                            targets: this.scene.goal,
                            alpha: 1,
                            scaleX: 1.5,
                            scaleY: 1.5,
                            duration: 500,
                            ease: 'Back.easeOut',
                            onComplete: () => {
                                // Add text to reach goal
                                const goalText = this.scene.add.text(
                                    this.scene.cameras.main.width / 2,
                                    100,
                                    '🎯 Reach the Goal! 🎯',
                                    {
                                        fontSize: '28px',
                                        fill: '#2ecc71',
                                        fontStyle: 'bold',
                                        stroke: '#000000',
                                        strokeThickness: 4
                                    }
                                );
                                goalText.setOrigin(0.5);
                                goalText.setScrollFactor(0);
                                goalText.setDepth(999);

                                this.scene.tweens.add({
                                    targets: goalText,
                                    alpha: 0,
                                    duration: 3000,
                                    ease: 'Linear',
                                    onComplete: () => goalText.destroy()
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    onCollideWithPlayer(player) {
        if (!this.isAlive) return;

        const playerSprite = player.getSprite();
        const bossSprite = this.sprite;

        // Stomp detection: Player must be falling AND above the boss's center
        const playerBottom = playerSprite.y + (playerSprite.height / 2);
        const bossTop = bossSprite.y - (bossSprite.height / 2);
        const isFalling = playerSprite.body.velocity.y > 100; // Must be falling with some speed
        const isPlayerAbove = playerBottom < bossSprite.y; // Player's bottom is above boss's center

        const isStomping = isFalling && isPlayerAbove;

        console.log('Collision - isFalling:', isFalling, 'isPlayerAbove:', isPlayerAbove, 'isStomping:', isStomping);

        if (isStomping) {
            // Player stomped on boss
            playerSprite.setVelocityY(-300); // Bounce

            if (this.isInvulnerable) {
                // Boss is invulnerable (BLUE) - show feedback
                const blockedText = this.scene.add.text(
                    bossSprite.x,
                    bossSprite.y - 60,
                    '🛡️ INVULNERABLE! 🛡️',
                    {
                        fontSize: '24px',
                        fill: '#00ffff',
                        fontStyle: 'bold',
                        stroke: '#000000',
                        strokeThickness: 4
                    }
                );
                blockedText.setOrigin(0.5);
                blockedText.setDepth(1001);

                this.scene.tweens.add({
                    targets: blockedText,
                    y: blockedText.y - 40,
                    alpha: 0,
                    duration: 600,
                    ease: 'Power2',
                    onComplete: () => blockedText.destroy()
                });

                if (window.soundManager) window.soundManager.play('bossInvulnerable');
                console.log('Boss is BLUE = invulnerable! Wait for RED!');
            } else {
                // Deal damage
                this.takeDamage();

                // Success feedback
                const hitText = this.scene.add.text(
                    bossSprite.x,
                    bossSprite.y - 60,
                    'HIT!',
                    {
                        fontSize: '24px',
                        fill: '#ffff00',
                        fontStyle: 'bold',
                        stroke: '#ff0000',
                        strokeThickness: 4
                    }
                );
                hitText.setOrigin(0.5);
                hitText.setDepth(1001);

                this.scene.tweens.add({
                    targets: hitText,
                    y: hitText.y - 40,
                    scaleX: 1.5,
                    scaleY: 1.5,
                    alpha: 0,
                    duration: 500,
                    ease: 'Power2',
                    onComplete: () => hitText.destroy()
                });
            }

            // IMPORTANT: Return here to prevent player from taking damage
            return;
        } else {
            // Boss hurts player - show clear DANGER feedback
            console.log('Player hit from side!');

            // Show danger warning
            const dangerText = this.scene.add.text(
                playerSprite.x,
                playerSprite.y - 50,
                '⚠️ SIDE HIT! ⚠️',
                {
                    fontSize: '24px',
                    fill: '#ff0000',
                    fontStyle: 'bold',
                    stroke: '#ffffff',
                    strokeThickness: 4
                }
            );
            dangerText.setOrigin(0.5);
            dangerText.setDepth(1001);

            this.scene.tweens.add({
                targets: dangerText,
                y: dangerText.y - 30,
                alpha: 0,
                duration: 600,
                ease: 'Power2',
                onComplete: () => dangerText.destroy()
            });

            // Flash red indicator around player
            const dangerZone = this.scene.add.graphics();
            dangerZone.fillStyle(0xff0000, 0.4);
            dangerZone.fillCircle(playerSprite.x, playerSprite.y, 40);
            dangerZone.setDepth(98);

            this.scene.tweens.add({
                targets: dangerZone,
                alpha: 0,
                scaleX: 2,
                scaleY: 2,
                duration: 300,
                ease: 'Power2',
                onComplete: () => dangerZone.destroy()
            });

            player.takeDamage();
            console.log('Player hit by boss from the side! Jump on the HEAD (yellow circle)!');
        }
    }

    getSprite() {
        return this.sprite;
    }

    destroy() {
        if (this.healthBarBg) this.healthBarBg.destroy();
        if (this.healthBar) this.healthBar.destroy();
        if (this.bossNameText) this.bossNameText.destroy();
        if (this.sprite) this.sprite.destroy();
    }
}
