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
    }
};
