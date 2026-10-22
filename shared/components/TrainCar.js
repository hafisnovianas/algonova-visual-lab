import { audioSynth } from '../js/audio.js';

export class TrainCar extends HTMLElement {
  static get observedAttributes() {
    return ['char', 'index', 'active', 'space'];
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', () => {
      const idx = parseInt(this.getAttribute('index')) || 0;
      audioSynth.playTone(330 + (idx * 25), 'sine', 0.08);
      
      const char = this.getAttribute('char');
      this.dispatchEvent(new CustomEvent('car-clicked', {
        bubbles: true,
        detail: { index: idx, char: char }
      }));
    });
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const char = this.getAttribute('char') || '';
    const index = this.getAttribute('index') || '0';
    const isActive = this.getAttribute('active') === 'true';
    const isSpace = char === ' ' || this.getAttribute('space') === 'true';

    this.className = `train-car-wrapper ${isActive ? 'active-slice' : ''}`;
    this.style.display = 'inline-block';
    this.style.cursor = 'pointer';
    this.style.userSelect = 'none';

    this.innerHTML = `
      <div style="
        width: 44px;
        height: 64px;
        border-radius: 12px;
        border: ${isActive ? '2px solid #f59e0b' : '1px solid ' + (isSpace ? '#334155' : 'rgba(245, 158, 11, 0.4)')};
        background: ${isActive ? 'rgba(245, 158, 11, 0.25)' : (isSpace ? 'rgba(2, 6, 23, 0.6)' : 'rgba(245, 158, 11, 0.12)')};
        color: ${isActive ? '#fef3c7' : (isSpace ? '#64748b' : '#fde68a')};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        font-family: var(--font-mono);
        transition: transform 0.15s ease;
      ">
        <span style="font-size: 10px; color: #94a3b8; font-weight: 600; padding-top: 3px;">#${index}</span>
        <span style="font-size: 18px; font-weight: 800;">${isSpace ? '&middot;' : char}</span>
        <span style="
          font-size: 10px;
          font-weight: 700;
          width: 100%;
          text-align: center;
          padding-bottom: 2px;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          background: ${isActive ? '#f59e0b' : 'rgba(15, 23, 42, 0.8)'};
          color: ${isActive ? '#020617' : 'rgba(245, 158, 11, 0.9)'};
        ">[${index}]</span>
      </div>
    `;
  }
}
