const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const notesBtn = document.querySelector('.btn-notes');
const lettersBtn = document.querySelector('.btn-letters');
const fullscreenBtn = document.querySelector('.fullscreen ');
let mouseDown = 0;
let fullScreen = 0;

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

lettersBtn.addEventListener('click', showLetters);
notesBtn.addEventListener('click', showNotes);

fullscreenBtn.addEventListener('click', openFullScreen);
fullscreenBtn.addEventListener('click', closeFullScreen);

window.addEventListener('keydown', event => {
  console.log(event);
})

function openFullScreen() {
  const doc = document.documentElement;
  if (doc.requestFullscreen) {
    doc.requestFullscreen();
    fullScreen = 1;
  }
}
function closeFullScreen() {
  if (fullScreen) {
    document.exitFullscreen();
    fullScreen = 0;
  }
}
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
function showNotes(){
  pianoKeys.forEach(key => {
    key.classList.remove('piano-key-letter');
  });
  notesBtn.classList.add('btn-active');
  lettersBtn.classList.remove('btn-active');
}
function showLetters(){
  pianoKeys.forEach(key => {
    key.classList.add('piano-key-letter');
  });
  lettersBtn.classList.add('btn-active');
  notesBtn.classList.remove('btn-active');
}