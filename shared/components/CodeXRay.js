import { audioSynth } from '../js/audio.js';

export class CodeXRay extends HTMLElement {
  static get observedAttributes() {
    return ['mode', 'var-name', 'str-val', 'target-var'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const mode = this.getAttribute('mode') || 'assign'; // 'assign' | 'len' | 'slice'
    const varName = this.getAttribute('var-name') || 'masukan';
    const strVal = this.getAttribute('str-val') || 'Bunga Matahari';
    const targetVar = this.getAttribute('target-var') || 'panjang';

    this.className = 'card';
    this.style.display = 'flex';
    this.style.flexDirection = 'column';
    this.style.gap = '1.25rem';
    this.style.backgroundColor = 'rgba(2, 6, 23, 0.85)';
    this.style.borderColor = 'var(--accent-amber)';

    if (mode === 'assign') {
      this.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="badge badge-amber">Pola 1</span>
            <h3 style="font-size: 1rem; font-weight: 800; color: var(--accent-amber);">Membuat Peti & Memasukkan Teks</h3>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-secondary);">Klik setiap bagian kode di bawah:</span>
        </div>

        <!-- Anatomi Kode Interaktif -->
        <div class="xray-syntax-container" style="
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem;
          background: #020617;
          border-radius: 14px;
          border: 1px solid #334155;
          font-family: var(--font-mono);
          font-size: 1.2rem;
          justify-content: center;
        ">
          <!-- Token: Nama Peti -->
          <div class="xray-chip xray-box-chip" data-role="wadah" style="cursor: pointer;">
            <span class="chip-tag">📦 Nama Peti</span>
            <span class="chip-code">${varName}</span>
          </div>

          <!-- Token: Tanda Sama Dengan -->
          <div class="xray-chip xray-arrow-chip" data-role="panah" style="cursor: pointer;">
            <span class="chip-tag">⬇️ Masukkan</span>
            <span class="chip-code">=</span>
          </div>

          <!-- Token: Nilai String Ber-Helm -->
          <div class="xray-chip xray-str-chip" data-role="helm" style="cursor: pointer;">
            <span class="chip-tag">🛡️ Teks Pakai Helm</span>
            <span class="chip-code">"${strVal}"</span>
          </div>
        </div>

        <!-- Penjelasan Interaktif Dinamis -->
        <div id="xray-explanation-box" class="code-banner" style="min-height: 54px; align-items: center;">
          <span style="font-size: 0.85rem; color: #cbd5e1;" id="xray-exp-text">
            👉 <b>Sentuh salah satu kotak kode di atas</b> untuk melihat perannya di dunia nyata!
          </span>
        </div>
      `;
    } else if (mode === 'len') {
      this.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="badge badge-emerald">Pola 2</span>
            <h3 style="font-size: 1rem; font-weight: 800; color: var(--accent-emerald);">Membaca Kode: Inside-Out (Dari Dalam ke Luar)</h3>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-secondary);">Ikuti urutan langkah 1 &rarr; 2 &rarr; 3</span>
        </div>

        <!-- Anatomi Kode Interaktif Inside-Out -->
        <div class="xray-syntax-container" style="
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.65rem;
          padding: 1.25rem;
          background: #020617;
          border-radius: 14px;
          border: 1px solid #334155;
          font-family: var(--font-mono);
          font-size: 1.15rem;
          justify-content: center;
        ">
          <!-- Langkah 3: Peti Hasil -->
          <div class="xray-chip xray-box-chip" data-step="3" style="cursor: pointer;">
            <span class="chip-tag" style="background: #3b82f6; color: white;">Langkah 3</span>
            <span class="chip-code">${targetVar}</span>
          </div>

          <!-- Langkah 3: Tanda Sama Dengan -->
          <div class="xray-chip xray-arrow-chip" data-step="3" style="cursor: pointer;">
            <span class="chip-tag">&larr; Simpan</span>
            <span class="chip-code">=</span>
          </div>

          <!-- Langkah 2: Fungsi len() -->
          <div class="xray-chip xray-len-chip" data-step="2" style="cursor: pointer; border: 2px dashed #10b981;">
            <span class="chip-tag" style="background: #10b981; color: #020617;">Langkah 2: Alat Ukur</span>
            <div style="display: flex; align-items: center; gap: 0.25rem;">
              <span class="chip-code" style="color: #10b981; font-weight: 900;">len(</span>
              
              <!-- Langkah 1: Peti yang Diukur (Paling Dalam) -->
              <div class="xray-chip" data-step="1" style="
                background: rgba(245, 158, 11, 0.2); 
                border: 2px solid #f59e0b; 
                padding: 0.2rem 0.5rem;
                border-radius: 8px;
              ">
                <span class="chip-tag" style="background: #f59e0b; color: #020617;">Langkah 1: Ambil Peti</span>
                <span class="chip-code" style="color: #fde68a;">${varName}</span>
              </div>

              <span class="chip-code" style="color: #10b981; font-weight: 900;">)</span>
            </div>
          </div>
        </div>

        <!-- Penjelasan Interaktif Dinamis -->
        <div id="xray-explanation-box" class="code-banner" style="min-height: 54px; align-items: center;">
          <span style="font-size: 0.85rem; color: #cbd5e1;" id="xray-exp-text">
            💡 <b>Cara baca Python:</b> Jangan baca dari kiri! Mulai dari <b>Langkah 1 (paling dalam)</b> ke <b>Langkah 3 (luar)</b>.
          </span>
        </div>
      `;
    }

    this.attachEvents();
  }

  attachEvents() {
    const expText = this.querySelector('#xray-exp-text');
    const chips = this.querySelectorAll('.xray-chip');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        audioSynth.playTone(550, 'triangle', 0.08);
        const role = chip.getAttribute('data-role');
        const step = chip.getAttribute('data-step');

        if (role === 'wadah') {
          expText.innerHTML = `📦 <b>Nama Peti:</b> Ini nama wadah penyimpanan di memori komputer. Apapun yang ada di kanan tanda <code>=</code> akan disimpan ke dalam peti ini.`;
        } else if (role === 'panah') {
          expText.innerHTML = `⬇️ <b>Tanda <code>=</code> (Corong Masuk):</b> Bukan 'sama dengan' matematika! Ini adalah aksi meluncurkan nilai di sebelah kanan masuk ke dalam peti sebelah kiri.`;
        } else if (role === 'helm') {
          expText.innerHTML = `🛡️ <b>Tanda Petik <code>""</code> (Helm Pelindung):</b> Wajib dipakai untuk semua teks manusia! Tanpa tanda petik, komputer akan mengira teks tersebut adalah perintah dan program akan meledak (error).`;
        } else if (step === '1') {
          expText.innerHTML = `1️⃣ <b>Langkah 1:</b> Komputer melihat ke dalam kurung dulu: <i>"Peti apa yang mau diukur?"</i> Peti <code>${this.getAttribute('var-name') || 'masukan'}</code>!`;
        } else if (step === '2') {
          expText.innerHTML = `2️⃣ <b>Langkah 2:</b> Alat ukur <code>len(...)</code> memeluk peti tersebut dan menghitung total ada berapa huruf di dalamnya (misal: 14).`;
        } else if (step === '3') {
          expText.innerHTML = `3️⃣ <b>Langkah 3:</b> Angka hasil hitungan (14) dikirim lewat tanda <code>=</code> untuk disimpan ke dalam peti baru bernama <code>${this.getAttribute('target-var') || 'panjang'}</code>.`;
        }
      });
    });
  }
}
