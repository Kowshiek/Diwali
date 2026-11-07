// Web Audio API procedural romantic Diwali soundscape + Ambient player
// 100% copyright-free, synthesized dynamically with warm tanpura drone, acoustic chime bells, and gentle flute-like harmonies

class DiwaliAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.masterGain = null;
    this.droneGain = null;
    this.melodyTimer = null;
    this.melodyIndex = 0;
    this.listeners = new Set();
    
    // Romantic Pentatonic Raga notes (Frequencies in Hz: C4, D4, E4, G4, A4, C5, D5, E5)
    this.scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    // Gentle romantic melody sequence
    this.melody = [
      { note: 2, dur: 2.5 }, // E4
      { note: 3, dur: 2.0 }, // G4
      { note: 4, dur: 3.0 }, // A4
      { note: 3, dur: 2.0 }, // G4
      { note: 5, dur: 3.5 }, // C5
      { note: 4, dur: 2.5 }, // A4
      { note: 3, dur: 2.0 }, // G4
      { note: 2, dur: 3.0 }, // E4
      { note: 1, dur: 2.0 }, // D4
      { note: 0, dur: 4.0 }, // C4
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  start() {
    this.init();
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.startWarmDrone();
    this.scheduleNextNote();
    this.notify();
  }

  startWarmDrone() {
    if (!this.ctx || !this.masterGain) return;

    // Warm Tanpura / Indian chord drone (C3 + G3 + C4)
    const droneFreqs = [130.81, 196.00, 261.63];
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    droneFreqs.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Gentle LFO for warm breathing shimmer
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(2.5, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      osc.connect(this.droneGain);
      osc.start();
    });

    this.droneGain.connect(filter);
    filter.connect(this.masterGain);
  }

  playFluteTone(freq, duration = 3) {
    if (!this.ctx || !this.isPlaying || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm vibrato
    const vibrato = this.ctx.createOscillator();
    const vibGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(4.5, now);
    vibGain.gain.setValueAtTime(3.5, now);
    vibrato.connect(osc.frequency);
    vibrato.start();

    // Gentle lowpass to sound mellow like an Indian bamboo bansuri
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    // Smooth envelope (gentle attack, soft swell, long romantic decay)
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
    vibrato.stop(now + duration + 0.1);

    // Occasional gentle bell chime harmonic
    if (Math.random() > 0.4) {
      this.playChime(freq * 2, duration * 0.8);
    }
  }

  playChime(freq, duration = 2.0) {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  scheduleNextNote() {
    if (!this.isPlaying) return;

    const current = this.melody[this.melodyIndex % this.melody.length];
    const freq = this.scale[current.note];
    this.playFluteTone(freq, current.dur);

    this.melodyIndex++;
    const delay = (current.dur + 0.8) * 1000;

    this.melodyTimer = setTimeout(() => {
      this.scheduleNextNote();
    }, delay);
  }

  // Interactive romantic chime sound when Kowsi & Mouli buttons are clicked!
  playRomanticChime() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.25);
    });
  }

  // Firework burst sound effect
  playFireworkPop() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    
    // Crackle & sparkle
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    
    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(1.5, now);
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    whiteNoise.start(now);
  }

  stop() {
    this.isPlaying = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
    }
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
      }
      this.start();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime, 0.1);
    }
    this.notify();
    return this.isMuted;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach(cb => cb({ isPlaying: this.isPlaying, isMuted: this.isMuted }));
  }
}

export const diwaliAudio = new DiwaliAudioEngine();
