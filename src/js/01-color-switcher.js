const refs = {
  startBtnEL: document.querySelector('[data-start]'),
  stopBtnEL: document.querySelector('[data-stop]'),
  body: document.body,
};

//variable for setInterval
let timerId = null;

refs.startBtnEL.addEventListener('click', changeBodyBgColor);
refs.stopBtnEL.addEventListener('click', stopChangeBodyColor);

function changeBodyBgColor() {
  refs.startBtnEL.disabled = 'true';
  refs.stopBtnEL.removeAttribute('disabled');

  changeColor();
  timerId = setInterval(changeColor, 1000);
}

function stopChangeBodyColor() {
  refs.stopBtnEL.disabled = 'true';
  refs.startBtnEL.removeAttribute('disabled');

  clearInterval(timerId);
}

function changeColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
