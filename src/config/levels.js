// Level Configuration Data
const LEVELS = {
    1: {
        platforms: [
            { x: 400, y: 568, width: 800, height: 32 }, // Ground
            { x: 150, y: 450, width: 200, height: 32 },
            { x: 500, y: 380, width: 150, height: 32 },
            { x: 250, y: 300, width: 100, height: 32 },
            { x: 600, y: 250, width: 150, height: 32 },
            { x: 150, y: 180, width: 100, height: 32 },
            // Vertical wall climb challenge
            { x: 680, y: 468, width: 32, height: 200 }, // Right wall
            { x: 720, y: 368, width: 32, height: 200 }, // Left wall
            { x: 680, y: 268, width: 32, height: 100 }  // Right wall top
        ],
        enemies: [
            { x: 300, y: 400 },
            { x: 550, y: 330 },
            { x: 700, y: 518 }
        ],
        coins: [
            { x: 150, y: 400 },
            { x: 200, y: 400 },
            { x: 500, y: 330 },
            { x: 550, y: 330 },
            { x: 600, y: 330 },
            { x: 250, y: 250 },
            { x: 600, y: 200 },
            { x: 650, y: 200 },
            { x: 150, y: 130 },
            { x: 200, y: 130 },
            // Coins in wall climb area
            { x: 700, y: 450 },
            { x: 700, y: 380 },
            { x: 700, y: 310 },
            { x: 700, y: 240 }
        ],
        goal: { x: 700, y: 180 },
        playerStart: { x: 100, y: 450 }
    },
    2: {
        platforms: [
            { x: 400, y: 568, width: 800, height: 32 }, // Ground
            { x: 100, y: 480, width: 120, height: 32 },
            { x: 300, y: 420, width: 100, height: 32 },
            { x: 500, y: 360, width: 120, height: 32 },
            { x: 700, y: 300, width: 100, height: 32 },
            { x: 550, y: 240, width: 100, height: 32 },
            { x: 350, y: 200, width: 120, height: 32 },
            { x: 150, y: 150, width: 100, height: 32 },
            { x: 650, y: 150, width: 100, height: 32 }
        ],
        enemies: [
            { x: 250, y: 518 },
            { x: 450, y: 518 },
            { x: 500, y: 310 },
            { x: 700, y: 250 },
            { x: 350, y: 150 }
        ],
        coins: [
            { x: 100, y: 430 },
            { x: 140, y: 430 },
            { x: 300, y: 370 },
            { x: 500, y: 310 },
            { x: 540, y: 310 },
            { x: 580, y: 310 },
            { x: 700, y: 250 },
            { x: 550, y: 190 },
            { x: 590, y: 190 },
            { x: 350, y: 150 },
            { x: 390, y: 150 },
            { x: 430, y: 150 },
            { x: 150, y: 100 },
            { x: 650, y: 100 },
            { x: 690, y: 100 }
        ],
        goal: { x: 680, y: 70 },
        playerStart: { x: 100, y: 450 }
    },
    3: {
        platforms: [
            { x: 400, y: 568, width: 800, height: 32 }, // Ground
            // Zigzag ascending path
            { x: 100, y: 500, width: 80, height: 32 },
            { x: 250, y: 450, width: 80, height: 32 },
            { x: 400, y: 400, width: 80, height: 32 },
            { x: 550, y: 350, width: 80, height: 32 },
            { x: 700, y: 300, width: 80, height: 32 },
            // Wall climb section
            { x: 750, y: 450, width: 32, height: 150 },
            { x: 700, y: 350, width: 32, height: 150 },
            { x: 750, y: 250, width: 32, height: 120 },
            // Upper platforms
            { x: 600, y: 200, width: 100, height: 32 },
            { x: 400, y: 160, width: 100, height: 32 },
            { x: 200, y: 120, width: 100, height: 32 },
            { x: 50, y: 80, width: 100, height: 32 },
            // Difficult jumps
            { x: 300, y: 280, width: 60, height: 32 },
            { x: 150, y: 320, width: 60, height: 32 },
            { x: 450, y: 240, width: 60, height: 32 }
        ],
        enemies: [
            { x: 200, y: 518 },
            { x: 400, y: 518 },
            { x: 600, y: 518 },
            { x: 250, y: 400 },
            { x: 550, y: 300 },
            { x: 400, y: 110 },
            { x: 200, y: 70 },
            { x: 600, y: 150 }
        ],
        coins: [
            { x: 100, y: 450 },
            { x: 250, y: 400 },
            { x: 400, y: 350 },
            { x: 550, y: 300 },
            { x: 700, y: 250 },
            { x: 725, y: 430 },
            { x: 725, y: 360 },
            { x: 725, y: 290 },
            { x: 600, y: 150 },
            { x: 640, y: 150 },
            { x: 400, y: 110 },
            { x: 440, y: 110 },
            { x: 200, y: 70 },
            { x: 240, y: 70 },
            { x: 50, y: 30 },
            { x: 90, y: 30 },
            // Bonus coins for difficult jumps
            { x: 300, y: 230 },
            { x: 150, y: 270 },
            { x: 450, y: 190 }
        ],
        goal: { x: 75, y: 20 },
        playerStart: { x: 50, y: 500 }
    },
    4: {
        // Boss Arena - Open space for boss battle
        platforms: [
            { x: 400, y: 568, width: 800, height: 32 }, // Ground
            // Side platforms for dodging
            { x: 100, y: 450, width: 150, height: 32 },
            { x: 650, y: 450, width: 150, height: 32 },
            // Center elevated platform
            { x: 400, y: 350, width: 200, height: 32 },
            // High escape platforms
            { x: 200, y: 250, width: 100, height: 32 },
            { x: 500, y: 250, width: 100, height: 32 }
        ],
        enemies: [], // No regular enemies, only boss
        coins: [
            // Health/power coins around the arena
            { x: 100, y: 400 },
            { x: 750, y: 400 },
            { x: 400, y: 300 },
            { x: 200, y: 200 },
            { x: 500, y: 200 }
        ],
        boss: { x: 600, y: 400 }, // Boss spawn position
        goal: { x: 400, y: 500 }, // Goal appears after boss defeat
        playerStart: { x: 100, y: 500 }
    }
};
