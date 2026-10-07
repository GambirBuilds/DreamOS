/**
 * DreamOS Ambient Soundscape Generator
 * 100% Procedural Web Audio API soundscapes (Zero external audio files).
 * Generates Rain, Cosmic Theta Binaural Drone, Celestial Chimes, and Oceanic Tides.
 */

class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.activePreset = 'theta'; // 'theta' | 'rain' | 'chimes' | 'ocean'
    this.isPlaying = false;
    this.volume = 0.5;
    this.masterGain = null;
    this.nodes = [];
    this.timerId = null;
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  stop() {
    this.nodes.forEach((n) => {
      try {
        if (n.stop) n.stop();
        if (n.disconnect) n.disconnect();
      } catch (e) {
        // Safe disconnect
      }
    });
    this.nodes = [];
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.isPlaying = false;
  }

  play(preset = this.activePreset) {
    this.initContext();
    if (!this.ctx) return;
    this.stop();
    this.activePreset = preset;
    this.isPlaying = true;

    switch (preset) {
      case 'theta':
        this.startThetaDrone();
        break;
      case 'rain':
        this.startRainSound();
        break;
      case 'chimes':
        this.startCelestialChimes();
        break;
      case 'ocean':
        this.startOceanWaves();
        break;
      default:
        this.startThetaDrone();
    }
  }

  // 1. Cosmic Theta Waves (432Hz & 438Hz = 6Hz Theta binaural beat for lucid sleep)
  startThetaDrone() {
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    const gain2 = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(216, this.ctx.currentTime); // Base octave of 432Hz

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(222, this.ctx.currentTime); // 6Hz binaural delta/theta

    gain1.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain2.gain.setValueAtTime(0.18, this.ctx.currentTime);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.masterGain);
    gain2.connect(this.masterGain);

    osc1.start();
    osc2.start();
    this.nodes.push(osc1, osc2, gain1, gain2);
  }

  // 2. Lucid Rain & Mist (Filtered White Noise generator)
  startRainSound() {
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate soft raindrops hitting leaves
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.masterGain);

    whiteNoise.start();
    this.nodes.push(whiteNoise, filter, rainGain);
  }

  // 3. Celestial Chimes (Procedural pentatonic arpeggio)
  startCelestialChimes() {
    const scale = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]; // C major pentatonic
    const playChime = () => {
      if (!this.isPlaying || !this.ctx) return;
      const freq = scale[Math.floor(Math.random() * scale.length)];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 3.2);
    };

    playChime();
    this.timerId = setInterval(playChime, 2200);
  }

  // 4. Oceanic Tide (Slow modulated filter swell)
  startOceanWaves() {
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    // LFO modulator to simulate waves rolling in and out every 6 seconds
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.16, this.ctx.currentTime); // ~6 second wave period

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(250, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const waveGain = this.ctx.createGain();
    waveGain.gain.setValueAtTime(0.24, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(this.masterGain);

    noise.start();
    lfo.start();
    this.nodes.push(noise, filter, lfo, lfoGain, waveGain);
  }
}

export const ambientAudio = new AmbientAudioEngine();
