// Simple Sound Manager for Platform Quest
// Uses Web Audio API for generating retro game sounds

class SoundManager {
    constructor(scene) {
        this.scene = scene;
        this.enabled = true;
        this.musicEnabled = true;
        this.sfxVolume = 0.3;
        this.musicVolume = 0.15;

        // Initialize Audio Context
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported', e);
            this.enabled = false;
            return;
        }

        // BGM tracks
        this.currentBGM = null;
        this.bgmIntervals = {};
    }

    // Play a simple beep sound
    playBeep(frequency, duration, volume = 0.3) {
        if (!this.enabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = 'square';

            gainNode.gain.setValueAtTime(volume * this.sfxVolume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            console.warn('Failed to play sound', e);
        }
    }

    // Play complex sound with multiple tones
    playComplexSound(notes) {
        if (!this.enabled || !this.audioContext) return;

        let currentTime = this.audioContext.currentTime;
        notes.forEach(note => {
            const [frequency, duration, volume = 0.3] = note;
            try {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);

                oscillator.frequency.value = frequency;
                oscillator.type = 'square';

                gainNode.gain.setValueAtTime(volume * this.sfxVolume, currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + duration);

                oscillator.start(currentTime);
                oscillator.stop(currentTime + duration);

                currentTime += duration;
            } catch (e) {
                console.warn('Failed to play note', e);
            }
        });
    }

    play(soundName) {
        if (!this.enabled) return;

        switch(soundName) {
            case 'jump':
                this.playBeep(400, 0.1, 0.3);
                break;
            case 'wallJump':
                this.playBeep(500, 0.08, 0.25);
                break;
            case 'dash':
                this.playBeep(600, 0.12, 0.2);
                break;
            case 'coin':
                this.playComplexSound([
                    [800, 0.05, 0.2],
                    [1000, 0.05, 0.2]
                ]);
                break;
            case 'damage':
                this.playComplexSound([
                    [300, 0.1, 0.3],
                    [200, 0.15, 0.3]
                ]);
                break;
            case 'enemyDefeat':
                this.playComplexSound([
                    [150, 0.08, 0.25],
                    [100, 0.12, 0.25]
                ]);
                break;
            case 'bossHit':
                this.playComplexSound([
                    [100, 0.1, 0.4],
                    [80, 0.15, 0.4]
                ]);
                break;
            case 'bossInvulnerable':
                this.playBeep(250, 0.1, 0.2);
                break;
            case 'bossDefeat':
                this.playComplexSound([
                    [500, 0.1, 0.3],
                    [400, 0.1, 0.3],
                    [300, 0.15, 0.3],
                    [200, 0.2, 0.3]
                ]);
                break;
            case 'heal':
                this.playComplexSound([
                    [600, 0.08, 0.25],
                    [700, 0.08, 0.25],
                    [800, 0.12, 0.25]
                ]);
                break;
            case 'goal':
                this.playComplexSound([
                    [800, 0.1, 0.25],
                    [1000, 0.1, 0.25],
                    [1200, 0.15, 0.25]
                ]);
                break;
            case 'levelComplete':
                this.playComplexSound([
                    [500, 0.1, 0.3],
                    [600, 0.1, 0.3],
                    [700, 0.1, 0.3],
                    [800, 0.2, 0.3]
                ]);
                break;
            case 'gameOver':
                this.playComplexSound([
                    [400, 0.15, 0.3],
                    [350, 0.15, 0.3],
                    [300, 0.2, 0.3],
                    [200, 0.3, 0.3]
                ]);
                break;
            default:
                console.warn('Unknown sound:', soundName);
        }
    }

    // Play RPG-style BGM
    playBGM(bgmName, forceRestart = false) {
        if (!this.musicEnabled) return;

        // Stop current BGM if different
        if (this.currentBGM && this.currentBGM !== bgmName) {
            this.stopBGM();
        }

        // Don't restart if same BGM is already playing
        if (this.currentBGM === bgmName && !forceRestart) return;

        this.currentBGM = bgmName;

        // RPG-style melodies with melody and bass
        switch(bgmName) {
            case 'menu':
                // Peaceful town theme - C major scale
                this.playRPGMelody(
                    [523, 587, 659, 587, 523, 392, 440, 523], // Melody (C, D, E, D, C, G, A, C)
                    [262, 196, 262, 196, 262, 196, 220, 262], // Bass (C, G, C, G, C, G, A, C)
                    600
                );
                break;
            case 'game':
                // Adventure field theme - Upbeat
                this.playRPGMelody(
                    [392, 440, 494, 523, 494, 440, 523, 587, 523, 494, 440, 392], // G, A, B, C, B, A, C, D, C, B, A, G
                    [196, 220, 247, 262, 247, 220, 262, 294, 262, 247, 220, 196], // Bass octave lower
                    400
                );
                break;
            case 'boss':
                // Intense battle theme - Simple and fast
                this.playSimpleMelody([300, 350, 300, 250, 300, 350, 400], 200);
                break;
        }
    }

    playSimpleMelody(notes, noteDuration) {
        if (!this.musicEnabled || !this.audioContext) return;

        let noteIndex = 0;

        const playNextNote = () => {
            if (this.currentBGM === null || !this.musicEnabled) {
                return;
            }

            const frequency = notes[noteIndex];
            try {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);

                oscillator.frequency.value = frequency;
                oscillator.type = 'square'; // More intense for boss

                const volume = this.musicVolume * 0.5;
                gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + noteDuration / 1000);

                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + noteDuration / 1000);
            } catch (e) {
                console.warn('Failed to play BGM note', e);
            }

            noteIndex = (noteIndex + 1) % notes.length;
        };

        // Play first note immediately
        playNextNote();

        // Set up interval for subsequent notes
        this.bgmIntervals[this.currentBGM] = setInterval(playNextNote, noteDuration);
    }

    playRPGMelody(melodyNotes, bassNotes, noteDuration) {
        if (!this.musicEnabled || !this.audioContext) return;

        let noteIndex = 0;

        const playNextNote = () => {
            if (this.currentBGM === null || !this.musicEnabled) {
                return;
            }

            const melodyFreq = melodyNotes[noteIndex];
            const bassFreq = bassNotes[noteIndex];

            try {
                // Play melody (higher pitched, triangle wave for softer sound)
                const melodyOsc = this.audioContext.createOscillator();
                const melodyGain = this.audioContext.createGain();

                melodyOsc.connect(melodyGain);
                melodyGain.connect(this.audioContext.destination);

                melodyOsc.frequency.value = melodyFreq;
                melodyOsc.type = 'triangle'; // Softer than square

                const melodyVolume = this.musicVolume * 0.4;
                melodyGain.gain.setValueAtTime(melodyVolume, this.audioContext.currentTime);
                melodyGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + noteDuration / 1000);

                melodyOsc.start(this.audioContext.currentTime);
                melodyOsc.stop(this.audioContext.currentTime + noteDuration / 1000);

                // Play bass (lower pitched, sine wave for warmth)
                const bassOsc = this.audioContext.createOscillator();
                const bassGain = this.audioContext.createGain();

                bassOsc.connect(bassGain);
                bassGain.connect(this.audioContext.destination);

                bassOsc.frequency.value = bassFreq;
                bassOsc.type = 'sine';

                const bassVolume = this.musicVolume * 0.3;
                bassGain.gain.setValueAtTime(bassVolume, this.audioContext.currentTime);
                bassGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + noteDuration / 1000);

                bassOsc.start(this.audioContext.currentTime);
                bassOsc.stop(this.audioContext.currentTime + noteDuration / 1000);

                // Add subtle harmony (fifth above bass for richness)
                const harmonyOsc = this.audioContext.createOscillator();
                const harmonyGain = this.audioContext.createGain();

                harmonyOsc.connect(harmonyGain);
                harmonyGain.connect(this.audioContext.destination);

                harmonyOsc.frequency.value = bassFreq * 1.5; // Perfect fifth
                harmonyOsc.type = 'sine';

                const harmonyVolume = this.musicVolume * 0.15;
                harmonyGain.gain.setValueAtTime(harmonyVolume, this.audioContext.currentTime);
                harmonyGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + noteDuration / 1000);

                harmonyOsc.start(this.audioContext.currentTime);
                harmonyOsc.stop(this.audioContext.currentTime + noteDuration / 1000);

            } catch (e) {
                console.warn('Failed to play BGM note', e);
            }

            noteIndex = (noteIndex + 1) % melodyNotes.length;
        };

        // Play first note immediately
        playNextNote();

        // Set up interval for subsequent notes
        this.bgmIntervals[this.currentBGM] = setInterval(playNextNote, noteDuration);
    }

    stopBGM() {
        if (this.currentBGM && this.bgmIntervals[this.currentBGM]) {
            clearInterval(this.bgmIntervals[this.currentBGM]);
            delete this.bgmIntervals[this.currentBGM];
        }
        this.currentBGM = null;
    }

    toggleSFX() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (!this.musicEnabled) {
            this.stopBGM();
        }
        return this.musicEnabled;
    }

    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }

    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
    }
}

// Export for use in game
window.SoundManager = SoundManager;
