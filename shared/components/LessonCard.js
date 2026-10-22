export class LessonCard extends HTMLElement {
  static get observedAttributes() {
    return ['lesson', 'title', 'desc', 'icon', 'href', 'status'];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const lesson = this.getAttribute('lesson') || '1';
    const title = this.getAttribute('title') || 'Judul Pertemuan';
    const desc = this.getAttribute('desc') || '';
    const icon = this.getAttribute('icon') || '📘';
    const href = this.getAttribute('href') || '#';
    const status = this.getAttribute('status') || 'ready'; // ready | soon

    const isReady = status === 'ready';

    this.innerHTML = `
      <div class="card" style="
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        transition: transform 0.2s, border-color 0.2s;
        ${isReady ? 'cursor: pointer;' : 'opacity: 0.6;'}
      " onmouseover="${isReady ? "this.style.transform='translateY(-4px)'; this.style.borderColor='#f59e0b';" : ''}"
        onmouseout="${isReady ? "this.style.transform='none'; this.style.borderColor='var(--border-color)';" : ''}">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span class="badge ${isReady ? 'badge-amber' : 'badge-rose'}">Pertemuan ${lesson}</span>
            <span style="font-size: 1.75rem;">${icon}</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #f8fafc; margin-bottom: 0.35rem;">${title}</h3>
          <p style="font-size: 0.82rem; color: #94a3b8; line-height: 1.4;">${desc}</p>
        </div>
        <div>
          ${isReady 
            ? `<a href="${href}" style="
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                width: 100%;
                background: #f59e0b;
                color: #0f172a;
                font-weight: 800;
                font-size: 0.85rem;
                padding: 0.75rem;
                border-radius: 10px;
                text-decoration: none;
                transition: background 0.2s;
              " onmouseover="this.style.background='#fbbf24'" onmouseout="this.style.background='#f59e0b'">
                Buka Alat Peraga &rarr;
              </a>`
            : `<div style="
                text-align: center;
                padding: 0.75rem;
                background: #334155;
                color: #94a3b8;
                font-size: 0.8rem;
                font-weight: 700;
                border-radius: 10px;
              ">Segera Hadir</div>`
          }
        </div>
      </div>
    `;
  }
}
