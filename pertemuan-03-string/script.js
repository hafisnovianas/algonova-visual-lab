import { audioSynth } from '../shared/js/audio.js';

// ==========================================
// 1. TAB NAVIGATION
// ==========================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    audioSynth.playTone(440, 'triangle');
    const targetId = btn.getAttribute('data-tab');

    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
      targetContent.classList.add('active');
    }

    if (targetId === 'tab-slice') updateSlicing();
    if (targetId === 'tab-find') runFind();
  });
});

// ==========================================
// 1.5. TAB 0: BEDAH KODE (X-RAY & SINTAKS)
// ==========================================
const xrayInputVar = document.getElementById('xray-input-var');
const xrayInputVal = document.getElementById('xray-input-val');
const btnXrayInsert = document.getElementById('btn-xray-insert');
const xrayChestLabel = document.getElementById('xray-chest-label');
const xrayChestContent = document.getElementById('xray-chest-content');
const xrayChestVisual = document.getElementById('xray-chest-visual');
const btnRunMeter = document.getElementById('btn-run-meter');
const xrayMeterTapeDisplay = document.getElementById('xray-meter-tape-display');
const liveCodeXray = document.getElementById('live-code-xray');
const btnXrayModeAssign = document.getElementById('btn-xray-mode-assign');
const btnXrayModeLen = document.getElementById('btn-xray-mode-len');

function syncXRay() {
  const vName = xrayInputVar.value || 'masukan';
  const vVal = xrayInputVal.value || 'Bunga Matahari';

  if (xrayChestLabel) xrayChestLabel.textContent = vName;
  if (xrayChestContent) xrayChestContent.textContent = `"${vVal}"`;

  if (liveCodeXray) {
    liveCodeXray.setAttribute('var-name', vName);
    liveCodeXray.setAttribute('str-val', vVal);
    liveCodeXray.render();
  }

  // Sinkronkan juga ke Stasiun 1 Gerbong
  if (inputStr1) {
    inputStr1.value = vVal;
    renderTrain();
  }
}

if (xrayInputVar && xrayInputVal) {
  xrayInputVar.addEventListener('input', syncXRay);
  xrayInputVal.addEventListener('input', syncXRay);
}

if (btnXrayInsert) {
  btnXrayInsert.addEventListener('click', () => {
    audioSynth.playPreset('success');
    xrayChestContent.classList.remove('slide-in-anim');
    void xrayChestContent.offsetWidth; // trigger reflow
    xrayChestContent.classList.add('slide-in-anim');
    syncXRay();
  });
}

if (btnXrayModeAssign) {
  btnXrayModeAssign.addEventListener('click', () => {
    audioSynth.playTone(500, 'sine', 0.05);
    liveCodeXray.setAttribute('mode', 'assign');
    syncXRay();
  });
}

if (btnXrayModeLen) {
  btnXrayModeLen.addEventListener('click', () => {
    audioSynth.playTone(500, 'sine', 0.05);
    liveCodeXray.setAttribute('mode', 'len');
    syncXRay();
  });
}

if (btnRunMeter) {
  btnRunMeter.addEventListener('click', () => {
    const text = xrayInputVal.value || 'Bunga Matahari';
    xrayMeterTapeDisplay.style.display = 'flex';
    xrayMeterTapeDisplay.innerHTML = '';

    // Otomatis ubah mode X-Ray ke mode len (inside-out)
    liveCodeXray.setAttribute('mode', 'len');
    syncXRay();

    // Animasi meteran meluncur per huruf dengan audio tick
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        audioSynth.playTone(400 + (i * 20), 'triangle', 0.04, 0.06);
        const unit = document.createElement('div');
        unit.className = 'meter-unit';
        unit.innerHTML = `<span>#${i + 1}</span><span style="font-size: 11px; font-weight: 900;">${text[i] === ' ' ? '·' : text[i]}</span>`;
        xrayMeterTapeDisplay.appendChild(unit);

        if (i === text.length - 1) {
          setTimeout(() => {
            audioSynth.playPreset('success');
            const total = document.createElement('div');
            total.style.background = '#10b981';
            total.style.color = '#020617';
            total.style.padding = '0.25rem 0.65rem';
            total.style.borderRadius = '6px';
            total.style.fontSize = '0.9rem';
            total.style.fontWeight = '900';
            total.textContent = `TOTAL: ${text.length}`;
            xrayMeterTapeDisplay.appendChild(total);
          }, 100);
        }
      }, i * 40);
    }
  });
}

// ==========================================
// 2. TAB 1: GERBONG INDEKS & LEN()
// ==========================================
const inputStr1 = document.getElementById('input-string-1');
const trainContainer = document.getElementById('train-container');
const labelLen = document.getElementById('label-len');
const liveCodeIndex = document.getElementById('live-code-index');
const liveResultLen = document.getElementById('live-result-len');
const liveResultFirst = document.getElementById('live-result-first');

function renderTrain() {
  const text = inputStr1.value || '';
  trainContainer.innerHTML = '';
  labelLen.textContent = text.length;
  liveCodeIndex.textContent = `teks = "${text}"`;
  liveResultLen.textContent = `len(teks) → ${text.length}`;
  liveResultFirst.textContent = text.length > 0 ? `teks[0] → '${text[0]}'` : `teks[0] → (kosong)`;

  if (text.length === 0) {
    trainContainer.innerHTML = `<span style="font-size: 0.8rem; color: #64748b; font-style: italic;">Ketik teks untuk memunculkan gerbong...</span>`;
    return;
  }

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const car = document.createElement('train-car');
    car.setAttribute('char', char);
    car.setAttribute('index', i);
    if (char === ' ') car.setAttribute('space', 'true');
    trainContainer.appendChild(car);
  }

  // Update slider slice max
  const sStart = document.getElementById('slider-start');
  const sEnd = document.getElementById('slider-end');
  if (sStart && sEnd) {
    sStart.max = text.length;
    sEnd.max = text.length;
    if (parseInt(sEnd.value) > text.length) sEnd.value = text.length;
  }
}

inputStr1.addEventListener('input', () => {
  audioSynth.playTone(520, 'sine', 0.03);
  renderTrain();
});

// Preset Buttons Tab 1
document.querySelectorAll('[data-preset]').forEach(btn => {
  btn.addEventListener('click', () => {
    inputStr1.value = btn.getAttribute('data-preset');
    renderTrain();
  });
});

// ==========================================
// 3. TAB 2: PISAU SLICING
// ==========================================
const sliderStart = document.getElementById('slider-start');
const sliderEnd = document.getElementById('slider-end');
const valSliceStart = document.getElementById('val-slice-start');
const valSliceEnd = document.getElementById('val-slice-end');
const sliceContainer = document.getElementById('slice-container');
const sliceCodeSyntax = document.getElementById('slice-code-syntax');
const sliceResultOutput = document.getElementById('slice-result-output');

function updateSlicing() {
  const text = inputStr1.value || 'Kate dan Jim';
  let start = parseInt(sliderStart.value) || 0;
  let end = parseInt(sliderEnd.value) || 0;

  if (start > end) {
    end = start;
    sliderEnd.value = end;
  }

  valSliceStart.textContent = start;
  valSliceEnd.textContent = end;

  sliceContainer.innerHTML = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const inSlice = i >= start && i < end;
    const car = document.createElement('train-car');
    car.setAttribute('char', char);
    car.setAttribute('index', i);
    car.setAttribute('active', inSlice ? 'true' : 'false');
    if (char === ' ') car.setAttribute('space', 'true');
    sliceContainer.appendChild(car);
  }

  const slicedPart = text.substring(start, end);
  sliceCodeSyntax.textContent = `potongan = teks[${start}:${end}]`;
  sliceResultOutput.textContent = `"${slicedPart}"`;
  audioSynth.playTone(280 + (end - start) * 20, 'sine', 0.03);
}

sliderStart.addEventListener('input', updateSlicing);
sliderEnd.addEventListener('input', updateSlicing);

document.getElementById('preset-slice-kate').addEventListener('click', () => {
  inputStr1.value = 'Kate dan Jim';
  renderTrain();
  sliderStart.value = 0;
  sliderEnd.value = 4;
  updateSlicing();
});

document.getElementById('preset-slice-jim').addEventListener('click', () => {
  inputStr1.value = 'Kate dan Jim';
  renderTrain();
  sliderStart.value = 9;
  sliderEnd.value = 12;
  updateSlicing();
});

// ==========================================
// 4. TAB 3: DETEKTIF .FIND()
// ==========================================
const findSource = document.getElementById('find-source');
const findQuery = document.getElementById('find-query');
const findRadar = document.getElementById('find-radar');
const findWordLabel = document.getElementById('find-word-label');
const findResBadge = document.getElementById('find-res-badge');
const findBoolBadge = document.getElementById('find-bool-badge');

function runFind() {
  const source = findSource.value || '';
  const query = findQuery.value || '';
  findWordLabel.textContent = query;
  findRadar.innerHTML = '';

  const idx = source.indexOf(query);

  if (idx !== -1 && query.length > 0) {
    findResBadge.textContent = `Hasil: ${idx}`;
    findResBadge.className = 'badge badge-emerald';
    findBoolBadge.textContent = 'True (Ada!)';
    findBoolBadge.className = 'badge badge-emerald';
    audioSynth.playPreset('success');
  } else {
    findResBadge.textContent = 'Hasil: -1 (Tidak ada!)';
    findResBadge.className = 'badge badge-rose';
    findBoolBadge.textContent = 'False (Nggak ada)';
    findBoolBadge.className = 'badge badge-rose';
    audioSynth.playPreset('error');
  }

  for (let i = 0; i < source.length; i++) {
    const isMatch = (idx !== -1 && query.length > 0 && i >= idx && i < idx + query.length);
    const box = document.createElement('div');
    box.style.display = 'flex';
    box.style.flexDirection = 'column';
    box.style.alignItems = 'center';
    box.style.padding = '0.35rem 0.5rem';
    box.style.borderRadius = '8px';
    box.style.fontFamily = 'var(--font-mono)';
    box.style.fontSize = '0.85rem';
    box.style.fontWeight = '700';
    box.style.border = isMatch ? '2px solid #8b5cf6' : '1px solid #334155';
    box.style.background = isMatch ? '#8b5cf6' : '#020617';
    box.style.color = isMatch ? '#ffffff' : '#94a3b8';

    box.innerHTML = `
      <span style="font-size: 9px; opacity: 0.7;">${i}</span>
      <span>${source[i] === ' ' ? '&nbsp;' : source[i]}</span>
    `;
    findRadar.appendChild(box);
  }
}

document.getElementById('btn-run-find').addEventListener('click', runFind);
findQuery.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') runFind();
});

document.querySelectorAll('[data-find-preset]').forEach(btn => {
  btn.addEventListener('click', () => {
    findQuery.value = btn.getAttribute('data-find-preset');
    runFind();
  });
});

// ==========================================
// 5. TAB 4: CONVERTER STR()
// ==========================================
const inputConvert = document.getElementById('input-str-convert');
const labelConvertIn = document.getElementById('label-convert-in');
const labelConvertOut = document.getElementById('label-convert-out');

inputConvert.addEventListener('input', (e) => {
  const val = e.target.value || '0';
  labelConvertIn.textContent = val;
  labelConvertOut.textContent = `"${val}"`;
  audioSynth.playTone(400);
});

// ==========================================
// 6. TAB 5: SAKLAR BINER 0 & 1
// ==========================================
const switchContainer = document.getElementById('switch-container');
const switchBits = [1, 0, 1, 1, 0, 0, 1, 1];

function renderSwitches() {
  switchContainer.innerHTML = '';
  switchBits.forEach((bit, idx) => {
    const btn = document.createElement('button');
    btn.className = `switch-btn ${bit === 1 ? 'on' : 'off'}`;
    btn.innerHTML = `<span>${bit === 1 ? '💡' : '⚫'}</span><span>${bit}</span>`;
    btn.addEventListener('click', () => {
      switchBits[idx] = switchBits[idx] === 1 ? 0 : 1;
      audioSynth.playPreset('switch');
      renderSwitches();
    });
    switchContainer.appendChild(btn);
  });
}

// Inisialisasi Pertama
syncXRay();
renderTrain();
renderSwitches();
