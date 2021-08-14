const filters = document.querySelector('.filters');
const image = document.querySelector('.image');
const rasetBtn = document.querySelector('.btn-reset');
const nextBtn = document.querySelector('.btn-next');
const fileInput = document.querySelector('.btn-load--input');
const saveBtn = document.querySelector('.btn-save');
const fullscreenBtn = document.querySelector('.fullscreen');
const canvas = document.querySelector('.canvas');
let counter = 2;
const timeOfDay = {
  'morning': [[6, 00],[11, 59]],
  'day': [[12, 00],[17, 59]],
  'evening': [[18, 00],[23, 59]],
  'night': [[00, 00],[5, 59]],
}

const updateOutput = (targ) => {
  const name = targ.name;
  const thisOut = document.querySelector(`.${name}`);
  thisOut.value = targ.value;
}

const changeCSSVar = (targ) => {
  const suffix = targ.dataset.sizing;
  document.documentElement.style.setProperty(`--${targ.name}`, targ.value+suffix);
}

const resetStyles = () => {
  const ranges = document.querySelectorAll('[type="range"]');
  ranges.forEach((range) => {
    range.matches('[name="saturate"]') ? range.value = '100' : range.value = '0';
    addActiveBtnStyle('btn-reset');
    updateOutput(range);
    changeCSSVar(range);
  });
  drawImage();
}

const getTimeOfDay = () => {
  const date = new Date();
  const currentHours = date.getHours();
  const currentMinutes = date.getMinutes();
  for (let time in timeOfDay) {
    if (currentHours >= timeOfDay[time][0][0] && currentHours <= timeOfDay[time][1][0]) {
      return time;
    }
  } 
}

const createImageSrc = (count) => {
  const baseImgLink = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images';
  const imgName = count > 10 ? `${count}.jpg` : `0${count}.jpg`;
  const src = `${baseImgLink}/${getTimeOfDay()}/${imgName}`;
  return src;
}

const viewImage = (count = 1) => {
  const img = new Image();
  img.src = createImageSrc(count);
  img.onload = () => {
    image.src = createImageSrc(count);
    drawImage();
  }
}

const showNextImg = () => {
  viewImage(counter);
  counter !== 20 ? counter++ : counter = 1;
  addActiveBtnStyle('btn-next');
  nextBtn.disabled = true;
  setTimeout(() => {
    nextBtn.disabled = false;
  }, 1000);
}

const addActiveBtnStyle = (btnClass) => {
  const btnToAdd = document.querySelector(`.${btnClass}`);
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach((btn) => btn.classList.remove('btn-active'));
  btnToAdd.classList.add('btn-active');
}

const loadNewImage = () => {
  const image = document.querySelector('.image');
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    image.src = reader.result;
    drawImage();
  }
  reader.readAsDataURL(file);
  addActiveBtnStyle('btn-load');
  fileInput.value = '';
}

const getFilterData = (img) => {
  const blur = document.querySelector('.blur').value * 
    (img.naturalHeight / image.height).toFixed(2);
  const sepia = document.querySelector('.sepia').value;
  const saturate = document.querySelector('.saturate').value;
  const invert = document.querySelector('.invert').value;
  const hue = document.querySelector('.hue').value;
  return `blur(${blur}px) invert(${invert}%) sepia(${sepia}%) saturate(${saturate}%) hue-rotate(${hue}deg)`;
}

const drawImage = () => {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous'); 
  img.src = image.src;
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.filter = getFilterData(img);
    ctx.drawImage(img, 0, 0); 
  };  
}

const downloadImg = () => {
  const link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
  addActiveBtnStyle('btn-save');
}

const changeScreenSize = () => {
    !document.fullscreenElement ? 
    document.documentElement.requestFullscreen() : document.exitFullscreen();
}

document.addEventListener('DOMContentLoaded', () => {
  drawImage();
  fileInput.addEventListener('input', loadNewImage);
  nextBtn.addEventListener('click', showNextImg);
  rasetBtn.addEventListener('click', resetStyles);
  saveBtn.addEventListener('click', downloadImg);
  fullscreenBtn.addEventListener('click', changeScreenSize)
  filters.addEventListener('input', (event) => {
    const target = event.target;
    if (target.matches('[type="range"]')) {
      updateOutput(target);
      changeCSSVar(target);
      drawImage();
    }
  })
})