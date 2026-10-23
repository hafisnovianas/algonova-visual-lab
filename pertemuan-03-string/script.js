import { audioSynth } from '../shared/js/audio.js';

// =============================================================================
// STATE TERPUSAT (SINGLE SOURCE OF TRUTH)
// =============================================================================
const state = {
  text: 'Bunga Matahari',
  index: 0,
  sliceStart: 6,
  sliceStop: 14,
  findSource: 'Hotel ini luar biasa! Pantai yang indah!',
  findQuery: 'indah',
  typeNum: 2026,
  switchBits: [1, 0, 1, 1, 0, 0, 1, 1]
};

// =============================================================================
// 1. TAB NAVIGATION
// =============================================================================
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

    // Refresh rendering sesuai tab aktif
    if (targetId === 'tab-index') renderIndexTab();
    if (targetId === 'tab-slice') renderSliceTab();
    if (targetId === 'tab-find') runFindScan(false);
  });
});

// Helper animasi lompatan hasil (Micro-Feedback untuk ADHD)
function triggerJumpAnimation(element) {
  if (!element) return;
  element.classList.remove('jumped');
  void element.offsetWidth; // trigger reflow
  element.classList.add('jumped');
}

// =============================================================================
// 2. TAB 1: DEKLARASI VARIABEL & METERAN LEN()
// =============================================================================
const inputDeclareVal = document.getElementById('input-declare-val');
const btnPullMeter = document.getElementById('btn-pull-meter');
const labelDeclareResult = document.getElementById('label-declare-result');
const declareMeterTape = document.getElementById('declare-meter-tape');
const badgeMissionDeclare = document.getElementById('badge-mission-declare');
const presetDeclareSunflower = document.getElementById('preset-declare-sunflower');
const presetDeclareKate = document.getElementById('preset-declare-kate');

function updateDeclareTab() {
  const currentText = inputDeclareVal.value || '';
  state.text = currentText;
  labelDeclareResult.textContent = currentText.length;
  triggerJumpAnimation(labelDeclareResult);

  // Evaluasi Misi Task 51172 L5
  if (currentText.toLowerCase() === 'bunga matahari') {
    badgeMissionDeclare.className = 'mission-badge mission-badge-success';
    badgeMissionDeclare.innerHTML = `<span>🎉</span> <span>Sukses! Panjang = 14</span>`;
  } else {
    badgeMissionDeclare.className = 'mission-badge mission-badge-pending';
    badgeMissionDeclare.innerHTML = `<span>📏</span> <span>Total: ${currentText.length} Huruf</span>`;
  }
}

function runMeterTapeAnimation() {
  const currentText = state.text || '';
  declareMeterTape.innerHTML = '';

  if (currentText.length === 0) {
    declareMeterTape.innerHTML = `<span style="font-size: 0.8rem; color: #020617; font-weight: 800;">Teks kosong (0 huruf)</span>`;
    return;
  }

  // Animasi meluncur pita meteran per huruf
  for (let i = 0; i < currentText.length; i++) {
    setTimeout(() => {
      audioSynth.playTone(360 + (i * 25), 'triangle', 0.04, 0.05);
      const unit = document.createElement('div');
      unit.className = 'meter-unit';
      const char = currentText[i] === ' ' ? '·' : currentText[i];
      unit.innerHTML = `<span>#${i + 1}</span><span style="font-weight: 900;">${char}</span>`;
      declareMeterTape.appendChild(unit);

      // Selesai menghitung huruf terakhir
      if (i === currentText.length - 1) {
        setTimeout(() => {
          audioSynth.playPreset('success');
          updateDeclareTab();

          const totalBadge = document.createElement('div');
          totalBadge.style.background = '#020617';
          totalBadge.style.color = '#34d399';
          totalBadge.style.border = '2px solid #10b981';
          totalBadge.style.padding = '0.2rem 0.65rem';
          totalBadge.style.borderRadius = '6px';
          totalBadge.style.fontSize = '0.85rem';
          totalBadge.style.fontWeight = '900';
          totalBadge.textContent = `TOTAL len() = ${currentText.length}`;
          declareMeterTape.appendChild(totalBadge);
        }, 120);
      }
    }, i * 35);
  }
}

if (inputDeclareVal) {
  inputDeclareVal.addEventListener('input', () => {
    audioSynth.playTone(520, 'sine', 0.03);
    updateDeclareTab();
  });
}

if (btnPullMeter) {
  btnPullMeter.addEventListener('click', runMeterTapeAnimation);
}

if (presetDeclareSunflower) {
  presetDeclareSunflower.addEventListener('click', () => {
    inputDeclareVal.value = 'Bunga Matahari';
    state.text = 'Bunga Matahari';
    state.sliceStart = 6;
    state.sliceStop = 14;
    runMeterTapeAnimation();
  });
}

if (presetDeclareKate) {
  presetDeclareKate.addEventListener('click', () => {
    inputDeclareVal.value = 'Kate dan Jim';
    state.text = 'Kate dan Jim';
    state.sliceStart = 0;
    state.sliceStop = 4;
    runMeterTapeAnimation();
  });
}

// =============================================================================
// 3. TAB 2: GERBONG INDEKS [ i ]
// =============================================================================
const indexTrainTrack = document.getElementById('index-train-track');
const valIndexStepper = document.getElementById('val-index-stepper');
const labelIndexCharResult = document.getElementById('label-index-char-result');
const sliderIndexRange = document.getElementById('slider-index-range');
const sliderIndexValLabel = document.getElementById('slider-index-val-label');
const labelIndexLen = document.getElementById('label-index-len');
const badgeMissionIndex = document.getElementById('badge-mission-index');
const btnIndexDec = document.getElementById('btn-index-dec');
const btnIndexInc = document.getElementById('btn-index-inc');
const presetIndexSunflower = document.getElementById('preset-index-sunflower');
const presetIndexKate = document.getElementById('preset-index-kate');

function renderIndexTab() {
  const text = state.text || 'Bunga Matahari';
  const len = text.length;

  if (labelIndexLen) labelIndexLen.textContent = len;

  // Sesuaikan batas maksimal indeks (len - 1)
  const maxIdx = Math.max(0, len - 1);
  if (state.index > maxIdx) state.index = maxIdx;
  if (state.index < 0) state.index = 0;

  if (sliderIndexRange) {
    sliderIndexRange.max = maxIdx;
    sliderIndexRange.value = state.index;
  }
  if (sliderIndexValLabel) sliderIndexValLabel.textContent = state.index;
  if (valIndexStepper) valIndexStepper.textContent = state.index;

  // Render Rel Gerbong
  if (indexTrainTrack) {
    indexTrainTrack.innerHTML = '';
    for (let i = 0; i < len; i++) {
      const char = text[i];
      const car = document.createElement('train-car');
      car.setAttribute('char', char);
      car.setAttribute('index', i);
      if (char === ' ') car.setAttribute('space', 'true');
      if (i === state.index) car.setAttribute('active', 'true');

      // Klik langsung gerbong untuk memilih roda
      car.addEventListener('click', () => {
        setIndexValue(i);
      });

      indexTrainTrack.appendChild(car);
    }
  }

  // Karakter hasil terambil
  const selectedChar = len > 0 ? text[state.index] : '';
  if (labelIndexCharResult) {
    labelIndexCharResult.textContent = selectedChar === ' ' ? "' '" : `'${selectedChar}'`;
    triggerJumpAnimation(labelIndexCharResult);
  }

  // Evaluasi Misi Algonova Task 51172 L6 (Ambil huruf M pada roda 6)
  if (badgeMissionIndex) {
    if (text.toLowerCase().includes('matahari') && state.index === 6 && selectedChar.toUpperCase() === 'M') {
      badgeMissionIndex.className = 'mission-badge mission-badge-success';
      badgeMissionIndex.innerHTML = `<span>🎉</span> <span>Target Tercapai! Huruf 'M' (Roda 6)</span>`;
      audioSynth.playPreset('success');
    } else {
      badgeMissionIndex.className = 'mission-badge mission-badge-pending';
      badgeMissionIndex.innerHTML = `<span>⏳</span> <span>Roda Aktif: ${state.index} (${selectedChar})</span>`;
    }
  }
}

function setIndexValue(newVal) {
  const maxIdx = Math.max(0, (state.text || '').length - 1);
  state.index = Math.min(Math.max(0, newVal), maxIdx);
  audioSynth.playTone(320 + (state.index * 30), 'sine', 0.05);
  renderIndexTab();
}

if (btnIndexDec) {
  btnIndexDec.addEventListener('click', () => setIndexValue(state.index - 1));
}
if (btnIndexInc) {
  btnIndexInc.addEventListener('click', () => setIndexValue(state.index + 1));
}
if (sliderIndexRange) {
  sliderIndexRange.addEventListener('input', (e) => setIndexValue(parseInt(e.target.value) || 0));
}

if (presetIndexSunflower) {
  presetIndexSunflower.addEventListener('click', () => {
    state.text = 'Bunga Matahari';
    state.index = 6;
    if (inputDeclareVal) inputDeclareVal.value = 'Bunga Matahari';
    renderIndexTab();
  });
}

if (presetIndexKate) {
  presetIndexKate.addEventListener('click', () => {
    state.text = 'Kate dan Jim';
    state.index = 0;
    if (inputDeclareVal) inputDeclareVal.value = 'Kate dan Jim';
    renderIndexTab();
  });
}

// =============================================================================
// 4. TAB 3: PISAU SLICING [ a : b ]
// =============================================================================
const sliceTrainTrack = document.getElementById('slice-train-track');
const valSliceStart = document.getElementById('val-slice-start');
const valSliceStop = document.getElementById('val-slice-stop');
const labelSliceResult = document.getElementById('label-slice-result');
const sliderSliceStart = document.getElementById('slider-slice-start');
const sliderSliceStop = document.getElementById('slider-slice-stop');
const labelSliderStart = document.getElementById('label-slider-start');
const labelSliderStop = document.getElementById('label-slider-stop');
const badgeMissionSlice = document.getElementById('badge-mission-slice');
const btnSliceStartDec = document.getElementById('btn-slice-start-dec');
const btnSliceStartInc = document.getElementById('btn-slice-start-inc');
const btnSliceStopDec = document.getElementById('btn-slice-stop-dec');
const btnSliceStopInc = document.getElementById('btn-slice-stop-inc');
const presetSliceSunflower = document.getElementById('preset-slice-sunflower');
const presetSliceKate = document.getElementById('preset-slice-kate');
const presetSliceJim = document.getElementById('preset-slice-jim');

function renderSliceTab() {
  const text = state.text || 'Bunga Matahari';
  const len = text.length;

  // Validasi batas rentang
  if (state.sliceStart < 0) state.sliceStart = 0;
  if (state.sliceStart > len) state.sliceStart = len;

  if (state.sliceStop < state.sliceStart) state.sliceStop = state.sliceStart;
  if (state.sliceStop > len) state.sliceStop = len;

  // Sinkronisasi teks label & slider
  if (valSliceStart) valSliceStart.textContent = state.sliceStart;
  if (valSliceStop) valSliceStop.textContent = state.sliceStop;
  if (labelSliderStart) labelSliderStart.textContent = state.sliceStart;
  if (labelSliderStop) labelSliderStop.textContent = state.sliceStop;

  if (sliderSliceStart) {
    sliderSliceStart.max = len;
    sliderSliceStart.value = state.sliceStart;
  }
  if (sliderSliceStop) {
    sliderSliceStop.max = len;
    sliderSliceStop.value = state.sliceStop;
  }

  // Render gerbong dengan penyorotan pisau slicing
  if (sliceTrainTrack) {
    sliceTrainTrack.innerHTML = '';
    for (let i = 0; i < len; i++) {
      const char = text[i];
      const isInSlice = (i >= state.sliceStart && i < state.sliceStop);
      const car = document.createElement('train-car');
      car.setAttribute('char', char);
      car.setAttribute('index', i);
      car.setAttribute('active', isInSlice ? 'true' : 'false');
      if (char === ' ') car.setAttribute('space', 'true');
      sliceTrainTrack.appendChild(car);
    }
  }

  // Hasil potongan teks Python
  const slicedText = text.substring(state.sliceStart, state.sliceStop);
  if (labelSliceResult) {
    labelSliceResult.textContent = `"${slicedText}"`;
    triggerJumpAnimation(labelSliceResult);
  }

  // Evaluasi Misi Task 51172 / 51173
  if (badgeMissionSlice) {
    if (slicedText === 'Matahari') {
      badgeMissionSlice.className = 'mission-badge mission-badge-success';
      badgeMissionSlice.innerHTML = `<span>🎉</span> <span>Hebat! 'Matahari' Terpotong [6:14]</span>`;
      audioSynth.playPreset('success');
    } else if (slicedText === 'Kate') {
      badgeMissionSlice.className = 'mission-badge mission-badge-success';
      badgeMissionSlice.innerHTML = `<span>🎉</span> <span>Hebat! 'Kate' Terpotong [0:4]</span>`;
      audioSynth.playPreset('success');
    } else if (slicedText === 'Jim') {
      badgeMissionSlice.className = 'mission-badge mission-badge-success';
      badgeMissionSlice.innerHTML = `<span>🎉</span> <span>Hebat! 'Jim' Terpotong [9:12]</span>`;
      audioSynth.playPreset('success');
    } else {
      badgeMissionSlice.className = 'mission-badge mission-badge-pending';
      badgeMissionSlice.innerHTML = `<span>✂️</span> <span>Potongan: "${slicedText}"</span>`;
    }
  }
}

function updateSliceLimits(start, stop) {
  state.sliceStart = start;
  state.sliceStop = stop;
  audioSynth.playTone(280 + ((stop - start) * 20), 'sine', 0.04);
  renderSliceTab();
}

if (btnSliceStartDec) btnSliceStartDec.addEventListener('click', () => updateSliceLimits(state.sliceStart - 1, state.sliceStop));
if (btnSliceStartInc) btnSliceStartInc.addEventListener('click', () => updateSliceLimits(state.sliceStart + 1, state.sliceStop));
if (btnSliceStopDec) btnSliceStopDec.addEventListener('click', () => updateSliceLimits(state.sliceStart, state.sliceStop - 1));
if (btnSliceStopInc) btnSliceStopInc.addEventListener('click', () => updateSliceLimits(state.sliceStart, state.sliceStop + 1));

if (sliderSliceStart) {
  sliderSliceStart.addEventListener('input', (e) => {
    let s = parseInt(e.target.value) || 0;
    if (s > state.sliceStop) state.sliceStop = s;
    updateSliceLimits(s, state.sliceStop);
  });
}

if (sliderSliceStop) {
  sliderSliceStop.addEventListener('input', (e) => {
    let eVal = parseInt(e.target.value) || 0;
    if (eVal < state.sliceStart) state.sliceStart = eVal;
    updateSliceLimits(state.sliceStart, eVal);
  });
}

if (presetSliceSunflower) {
  presetSliceSunflower.addEventListener('click', () => {
    state.text = 'Bunga Matahari';
    if (inputDeclareVal) inputDeclareVal.value = 'Bunga Matahari';
    updateSliceLimits(6, 14);
  });
}

if (presetSliceKate) {
  presetSliceKate.addEventListener('click', () => {
    state.text = 'Kate dan Jim';
    if (inputDeclareVal) inputDeclareVal.value = 'Kate dan Jim';
    updateSliceLimits(0, 4);
  });
}

if (presetSliceJim) {
  presetSliceJim.addEventListener('click', () => {
    state.text = 'Kate dan Jim';
    if (inputDeclareVal) inputDeclareVal.value = 'Kate dan Jim';
    updateSliceLimits(9, 12);
  });
}

// =============================================================================
// 5. TAB 4: DETEKTIF PENCARIAN .FIND()
// =============================================================================
const findSourceInput = document.getElementById('find-source-input');
const findQueryInput = document.getElementById('find-query-input');
const btnScanFind = document.getElementById('btn-scan-find');
const findResVal = document.getElementById('find-res-val');
const findBoolVal = document.getElementById('find-bool-val');
const labelFindInWord = document.getElementById('label-find-in-word');
const findRadarTrack = document.getElementById('find-radar-track');
const badgeMissionFind = document.getElementById('badge-mission-find');

function runFindScan(animate = true) {
  const source = findSourceInput.value || '';
  const query = findQueryInput.value || '';
  state.findSource = source;
  state.findQuery = query;

  if (labelFindInWord) labelFindInWord.textContent = query;

  const matchIdx = source.indexOf(query);
  const isFound = (matchIdx !== -1 && query.length > 0);

  // Render radar statis
  if (findRadarTrack) {
    findRadarTrack.innerHTML = '';
    for (let i = 0; i < source.length; i++) {
      const isPart = (isFound && i >= matchIdx && i < matchIdx + query.length);
      const box = document.createElement('div');
      box.style.display = 'flex';
      box.style.flexDirection = 'column';
      box.style.alignItems = 'center';
      box.style.padding = '0.35rem 0.5rem';
      box.style.borderRadius = '8px';
      box.style.fontFamily = 'var(--font-mono)';
      box.style.fontSize = '0.85rem';
      box.style.fontWeight = '700';
      box.style.border = isPart ? '2px solid #8b5cf6' : '1px solid #334155';
      box.style.background = isPart ? '#8b5cf6' : '#020617';
      box.style.color = isPart ? '#ffffff' : '#94a3b8';

      box.innerHTML = `
        <span style="font-size: 9px; opacity: 0.7;">${i}</span>
        <span>${source[i] === ' ' ? '&nbsp;' : source[i]}</span>
      `;
      findRadarTrack.appendChild(box);
    }
  }

  // Update nilai hasil
  if (isFound) {
    findResVal.textContent = matchIdx;
    findResVal.style.color = '#34d399';
    findResVal.style.borderColor = '#10b981';

    findBoolVal.textContent = 'True (Ada!)';
    findBoolVal.className = 'badge badge-emerald';

    if (badgeMissionFind) {
      badgeMissionFind.className = 'mission-badge mission-badge-success';
      badgeMissionFind.innerHTML = `<span>🎉</span> <span>Ketemu di Indeks ${matchIdx}!</span>`;
    }

    if (animate) audioSynth.playPreset('success');
  } else {
    findResVal.textContent = '-1';
    findResVal.style.color = '#f43f5e';
    findResVal.style.borderColor = '#f43f5e';

    findBoolVal.textContent = 'False (Nggak ada)';
    findBoolVal.className = 'badge badge-rose';

    if (badgeMissionFind) {
      badgeMissionFind.className = 'mission-badge mission-badge-pending';
      badgeMissionFind.innerHTML = `<span>⚠️</span> <span>Tidak Ada (Hasil = -1)</span>`;
    }

    if (animate) audioSynth.playPreset('error');
  }

  triggerJumpAnimation(findResVal);
}

if (btnScanFind) btnScanFind.addEventListener('click', () => runFindScan(true));
if (findQueryInput) {
  findQueryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') runFindScan(true);
  });
  findQueryInput.addEventListener('input', () => runFindScan(false));
}
if (findSourceInput) {
  findSourceInput.addEventListener('input', () => runFindScan(false));
}

document.querySelectorAll('[data-find-preset]').forEach(btn => {
  btn.addEventListener('click', () => {
    findQueryInput.value = btn.getAttribute('data-find-preset');
    runFindScan(true);
  });
});

// =============================================================================
// 6. TAB 5: KONVERSI TIPE DATA STR() & SAKLAR BINER
// =============================================================================
const inputTypeConvert = document.getElementById('input-type-convert');
const labelTypeConverted = document.getElementById('label-type-converted');
const switchContainer = document.getElementById('switch-container');
const labelBinaryVal = document.getElementById('label-binary-val');

if (inputTypeConvert) {
  inputTypeConvert.addEventListener('input', (e) => {
    const val = e.target.value || '0';
    state.typeNum = val;
    labelTypeConverted.textContent = `"${val}"`;
    triggerJumpAnimation(labelTypeConverted);
    audioSynth.playTone(480, 'sine', 0.04);
  });
}

function renderBinarySwitches() {
  if (!switchContainer) return;
  switchContainer.innerHTML = '';

  state.switchBits.forEach((bit, idx) => {
    const btn = document.createElement('button');
    btn.className = `switch-btn ${bit === 1 ? 'on' : 'off'}`;
    btn.innerHTML = `<span>${bit === 1 ? '💡' : '⚫'}</span><span>${bit}</span>`;

    btn.addEventListener('click', () => {
      state.switchBits[idx] = state.switchBits[idx] === 1 ? 0 : 1;
      audioSynth.playPreset('switch');
      renderBinarySwitches();
    });

    switchContainer.appendChild(btn);
  });

  if (labelBinaryVal) {
    labelBinaryVal.textContent = `Biner: ${state.switchBits.join('')}`;
  }
}

// =============================================================================
// INITIAL RUN
// =============================================================================
updateDeclareTab();
renderIndexTab();
renderSliceTab();
runFindScan(false);
renderBinarySwitches();
