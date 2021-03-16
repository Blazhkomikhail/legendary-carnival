const piano = document.querySelector('.piano');

piano.addEventListener('mousedown', event => {
  const el = event.target;
  if ( el.classList.contains('piano-key') ) {
    const note = el.dataset.note;
    const src =`./assets/audio/${note}.mp3`;
    playAudio(src);
  }
})

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}