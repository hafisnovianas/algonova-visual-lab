export class TeacherNotes extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const rawContent = this.innerHTML;

    this.innerHTML = `
      <div id="teacher-drawer-trigger" style="
        position: fixed;
        bottom: 1.5rem;
        right: 1.5rem;
        z-index: 999;
      ">
        <button id="btn-open-drawer" style="
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #0f172a;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4);
          transition: transform 0.2s;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <span>📋</span> Kunci Jawaban Guru
        </button>
      </div>

      <!-- Backdrop & Drawer -->
      <div id="teacher-drawer-modal" style="
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(2, 6, 23, 0.75);
        backdrop-filter: blur(4px);
        z-index: 1000;
        justify-content: flex-end;
      ">
        <div style="
          width: 100%;
          max-width: 500px;
          height: 100%;
          background: #1e293b;
          border-left: 1px solid #334155;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: -10px 0 30px rgba(0,0,0,0.5);
          overflow-y: auto;
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 0.75rem;">
            <h3 style="font-size: 1.1rem; font-weight: 800; color: #f59e0b; display: flex; align-items: center; gap: 0.5rem;">
              <span>📋</span> Contekan Jawaban Guru
            </h3>
            <button id="btn-close-drawer" style="
              background: #334155;
              border: none;
              color: #94a3b8;
              font-size: 1.25rem;
              width: 32px;
              height: 32px;
              border-radius: 8px;
              cursor: pointer;
            ">&times;</button>
          </div>
          <div id="drawer-content" style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.6;">
            ${rawContent}
          </div>
        </div>
      </div>
    `;

    const modal = this.querySelector('#teacher-drawer-modal');
    this.querySelector('#btn-open-drawer').addEventListener('click', () => {
      modal.style.display = 'flex';
    });
    this.querySelector('#btn-close-drawer').addEventListener('click', () => {
      modal.style.display = 'none';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }
}
