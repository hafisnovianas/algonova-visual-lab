/**
 * ALGO VISUAL LAB - WEB COMPONENTS REGISTRY
 * Mendaftarkan semua komponen kustom W3C Native
 */

import { SoundButton } from './SoundButton.js';
import { TrainCar } from './TrainCar.js';
import { LessonHeader } from './LessonHeader.js';
import { TeacherNotes } from './TeacherNotes.js';
import { LessonCard } from './LessonCard.js';
import { CodeXRay } from './CodeXRay.js';

// Definisikan Custom Elements ke browser
if (!customElements.get('sound-button')) {
  customElements.define('sound-button', SoundButton);
}
if (!customElements.get('train-car')) {
  customElements.define('train-car', TrainCar);
}
if (!customElements.get('lesson-header')) {
  customElements.define('lesson-header', LessonHeader);
}
if (!customElements.get('teacher-notes')) {
  customElements.define('teacher-notes', TeacherNotes);
}
if (!customElements.get('lesson-card')) {
  customElements.define('lesson-card', LessonCard);
}
if (!customElements.get('code-xray')) {
  customElements.define('code-xray', CodeXRay);
}

export { SoundButton, TrainCar, LessonHeader, TeacherNotes, LessonCard, CodeXRay };
