/**
 * ALGO VISUAL LAB - AUDIO SYNTHESIZER
 * Menggunakan Web Audio API native browser (Nol dependensi library eksternal)
 */

class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playTone(587.33, 'sine', 0.1);
    }
    window.dispatchEvent(new CustomEvent('audio-toggle', { detail: { enabled: this.enabled } }));
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  playTone(freq, type = 'sine', duration = 0.08, volume = 0.12) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio context policy fallback
    }
  }

  // Preset Efek Suara Khusus Anak
  playPreset(name) {
    if (!this.enabled) return;
    switch (name) {
      case 'click':
        this.playTone(480, 'sine', 0.04, 0.08);
        break;
      case 'train':
        this.playTone(330, 'triangle', 0.1, 0.15);
        break;
      case 'slice':
        this.playTone(600, 'sine', 0.05, 0.1);
        break;
      case 'success':
        this.playTone(523.25, 'triangle', 0.08);
        setTimeout(() => this.playTone(659.25, 'triangle', 0.12), 60);
        break;
      case 'error':
        this.playTone(180, 'sawtooth', 0.2, 0.15);
        break;
      case 'switch':
        this.playTone(700, 'sine', 0.05, 0.1);
        break;
    }
  }
}

// Export singleton instance ke window
export const audioSynth = new AudioSynthesizer();
window.AudioSynth = audioSynth;
