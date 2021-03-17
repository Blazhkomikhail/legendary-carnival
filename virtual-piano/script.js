const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const notesBtn = document.querySelector('.btn-notes');
const lettersBtn = document.querySelector('.btn-letters');
const fullscreenBtn = document.querySelector('.fullscreen ');
let mouseDown = 0;

document.addEventListener('mousedown', () => ++mouseDown);
document.addEventListener('mouseup', () => --mouseDown);

piano.addEventListener('mousedown', event => {
  const el = event.target;
  if ( el.classList.contains('piano-key') ) sound(el);
})

piano.addEventListener('mouseup', event => {
  const el = event.target;
  el.classList.remove('piano-key-active');
  el.classList.remove ('piano-key-active-pseudo');
})

piano.addEventListener('mouseout', event => {
  event.target.classList.remove('piano-key-active');
})

piano.addEventListener('mouseover', event => {
  const el = event.target;
  if ( mouseDown && el.classList.contains('piano-key') ) sound(el);
})

function sound(key) {
  const note = key.dataset.note;
  const src =`./assets/audio/${note}.mp3`;
  key.classList.add('piano-key-active');
  key.classList.add('piano-key-active-pseudo');
  playAudio(src);
}
function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}