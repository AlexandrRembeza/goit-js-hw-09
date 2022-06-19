import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const formEL = document.querySelector('.form');
formEL.addEventListener('submit', getFormValues);

const formValues = {};
let timerId = null;

function getFormValues(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  formData.forEach((value, name) => (formValues[name] = Number(value)));

  e.currentTarget.reset();
}

function createPromise({ amount, delay, step }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      timerId = setInterval(() => {
        for (let i = 0; i <= amount; i += 1) {
          let shouldResolve = Math.random() > 0.3;
          let newDelay = newDelay + delay;

          if (shouldResolve) {
            resolve(`✅ Fulfilled promise ${amount}${i} in ${newDelay}ms`);
          } else {
            reject(`❌ Rejected promise ${amount}${i} in ${newDelay}ms`);
          }
        }
        clearInterval(timerId);
      }, step);
    }, delay);
  });
}

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
