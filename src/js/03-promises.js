import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const formEL = document.querySelector('.form');
formEL.addEventListener('submit', getFormValuesAndGetMessages);

let timerId = null;

function getFormValuesAndGetMessages(e) {
  e.preventDefault();

  const formValues = {};
  const formData = new FormData(e.currentTarget);

  formData.forEach((value, name) => (formValues[name] = Number(value)));

  e.currentTarget.reset();

  createPromise(formValues)
    .then(value => {
      Notiflix.Notify.success(`${value}`, {
        width: '400px',
        position: 'right-top',
        clickToClose: true,
        svgSize: '120px',
        fontSize: '18px',
      });
    })
    .catch(value => {
      Notiflix.Notify.failure(`${value}`, {
        width: '400px',
        position: 'right-top',
        clickToClose: true,
        svgSize: '120px',
        fontSize: '18px',
      });
    });
}

function createPromise({ amount, delay, step }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      timerId = setInterval(() => {
        for (let i = 1; i <= amount; i += 1) {
          let shouldResolve = Math.random() > 0.3;

          if (shouldResolve) {
            resolve(`✅ Fulfilled promise ${i} in ${delay}ms`);
          } else {
            reject(`❌ Rejected promise ${i} in ${delay}ms`);
          }

          let newDelay = delay;
          newDelay += delay;
        }
      }, step);
    }, delay);
  });
}
