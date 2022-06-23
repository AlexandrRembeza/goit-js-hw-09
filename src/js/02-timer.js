import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  inputEL: document.querySelector('#datetime-picker'),
  startButtonEL: document.querySelector('button[data-start]'),
  stopButtonEL: document.querySelector('button[data-stop]'),
  spanSecEL: document.querySelector('span[data-seconds]'),
  spanMinEL: document.querySelector('span[data-minutes]'),
  spanHoursEL: document.querySelector('span[data-hours]'),
  spanDaysEL: document.querySelector('span[data-days]'),
};

//variable for setInterval
let timerId = null;
//variable for user date
let chosenDate = null;
//variable for now Date
let dateNow = null;

refs.startButtonEL.addEventListener('click', startBackTimeout);
refs.stopButtonEL.addEventListener('click', stopTimer);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0].getTime();
    dateNow = new Date();

    if (dateNow >= chosenDate) {
      refs.startButtonEL.disabled = 'true';
      return setTimeout(
        () =>
          Notiflix.Notify.failure('Введите пожалуйста дату из будущего', {
            width: '400px',
            position: 'center-top',
            clickToClose: true,
            svgSize: '120px',
            fontSize: '18px',
          }),
        200
      );
    }
    refs.startButtonEL.removeAttribute('disabled');
  },
});

function startBackTimeout() {
  refs.startButtonEL.disabled = 'true';
  refs.stopButtonEL.removeAttribute('disabled');
  refs.inputEL.disabled = 'true';

  timerId = setInterval(updateTimer, 1000);
}

//update time value
function updateTimer() {
  chosenDate -= 1000;
  let time = chosenDate - dateNow;

  if (time <= 0) {
    clearInterval(timerId);
    return;
  }
  const resultTime = convertMs(time);
  updateInterface(resultTime);
}

//update timer text content
function updateInterface({ days, hours, seconds, minutes }) {
  refs.spanDaysEL.textContent = days;
  refs.spanHoursEL.textContent = hours;
  refs.spanMinEL.textContent = minutes;
  refs.spanSecEL.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(num) {
  return String(num).padStart(2, '0');
}

function stopTimer() {
  refs.stopButtonEL.disabled = 'true';
  refs.inputEL.removeAttribute('disabled');

  clearInterval(timerId);

  flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      chosenDate = selectedDates[0].getTime();
      dateNow = new Date();

      if (dateNow >= chosenDate) {
        refs.startButtonEL.disabled = 'true';
        return setTimeout(
          () =>
            Notiflix.Notify.failure('Введите пожалуйста дату из будущего', {
              width: '400px',
              position: 'center-top',
              clickToClose: true,
              svgSize: '120px',
              fontSize: '18px',
            }),
          200
        );
      }
      refs.startButtonEL.removeAttribute('disabled');
    },
  });

  refs.spanDaysEL.textContent = '00';
  refs.spanHoursEL.textContent = '00';
  refs.spanMinEL.textContent = '00';
  refs.spanSecEL.textContent = '00';
}
