import { audioSynth } from '../js/audio.js';

export class LessonHeader extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'subtitle', 'lesson'];
  }

  connectedCallback() {
    this.render();
    window.addEventListener('audio-toggle', (e) => {
      this.updateSoundBtn(e.detail.enabled);
    });
  }

  updateSoundBtn(enabled) {
    const btn = this.querySelector('#btn-sound');
    if (btn) {
      btn.innerHTML = `${enabled ? '🔊' : '🔇'} Suara: ${enabled ? 'ON' : 'OFF'}`;
    }
  }

  render() {
    const title = this.getAttribute('title') || 'Visual Coding Lab';
    const subtitle = this.getAttribute('subtitle') || 'Media Peraga Interaktif Algoritmika &bull; Khusus Siswa ADHD';
    const lesson = this.getAttribute('lesson') || '';

    this.innerHTML = `
      <header class="card" style="padding: 1.25rem 1.5rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.85rem;">
          <a href="../index.html" title="Kembali ke Dashboard Menu" style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 42px;
            height: 42px;
            background: #334155;
            color: #f8fafc;
            border-radius: 12px;
            text-decoration: none;
            font-size: 1.25rem;
            transition: background 0.2s;
          " onmouseover="this.style.background='#475569'" onmouseout="this.style.background='#334155'">🏠</a>
          <div>
            <h1 style="font-size: 1.35rem; font-weight: 900; color: #f59e0b; display: flex; align-items: center; gap: 0.5rem;">
              ${lesson ? `<span class="badge badge-amber" style="font-size: 0.75rem;">P.${lesson}</span>` : ''}
              ${title}
            </h1>
            <p style="font-size: 0.8rem; color: #94a3b8; margin-top: 2px;">${subtitle}</p>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="badge badge-emerald">🎮 Mode Interaktif Anak</span>
          <button id="btn-sound" style="
            background: #334155;
            color: #f8fafc;
            border: 1px solid #475569;
            border-radius: 8px;
            padding: 0.4rem 0.75rem;
            font-size: 0.75rem;
            font-weight: 600;
            cursor: pointer;
          ">${audioSynth.isEnabled() ? '🔊' : '🔇'} Suara: ${audioSynth.isEnabled() ? 'ON' : 'OFF'}</button>
        </div>
      </header>
    `;

    this.querySelector('#btn-sound').addEventListener('click', () => {
      audioSynth.toggle();
    });
  }
}
