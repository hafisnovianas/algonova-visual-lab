import { audioSynth } from '../js/audio.js';

export class SoundButton extends HTMLElement {
  static get observedAttributes() {
    return ['freq', 'preset', 'variant'];
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', () => {
      const preset = this.getAttribute('preset');
      const freq = parseFloat(this.getAttribute('freq'));

      if (preset) {
        audioSynth.playPreset(preset);
      } else if (!isNaN(freq)) {
        audioSynth.playTone(freq);
      } else {
        audioSynth.playPreset('click');
      }
    });
  }

  render() {
    // Styling bawaan tombol sound
    if (!this.classList.contains('sound-btn-styled')) {
      this.classList.add('sound-btn-styled');
      this.style.display = 'inline-flex';
      this.style.alignItems = 'center';
      this.style.justifyContent = 'center';
      this.style.gap = '0.35rem';
      this.style.cursor = 'pointer';
      this.style.userSelect = 'none';
      this.style.transition = 'all 0.15s ease';
    }
  }
}
