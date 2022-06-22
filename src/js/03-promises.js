import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const formEL = document.querySelector('.form');
formEL.addEventListener('submit', getFormValuesAndGetMessages);

let timerId = null;

function getFormValuesAndGetMessages(e) {
  e.preventDefault();
  const {
    elements: { amount, step, delay },
  } = e.currentTarget;

  if (amount.value < 0 || step.value < 0 || delay.value < 0) {
    return alert(`Все числа должны быть больше нуля`);
  }

  const formValues = {};
  const formData = new FormData(e.currentTarget);

  formData.forEach((value, name) => (formValues[name] = Number(value)));

  e.currentTarget.reset();

  createPromise(formValues);
}

// function createPromise({ amount, delay, step }) {
//   return setTimeout(() => {
//     for (let i = 1; i <= amount; i += 1) {
//       let shouldResolve = Math.random() > 0.3;

//       if (shouldResolve) {
//         Promise.resolve(`✅ Fulfilled promise ${i} in ${delay}ms`).then(
//           value => {
//             setTimeout(() => {
//               Notiflix.Notify.success(`${value}`, {
//                 width: '400px',
//                 position: 'right-top',
//                 clickToClose: true,
//                 svgSize: '120px',
//                 fontSize: '18px',
//               });
//             }, step);
//           }
//         );
//       } else {
//         Promise.reject(`❌ Rejected promise ${i} in ${delay}ms`).catch(
//           value => {
//             setTimeout(() => {
//               Notiflix.Notify.failure(`${value}`, {
//                 width: '400px',
//                 position: 'right-top',
//                 clickToClose: true,
//                 svgSize: '120px',
//                 fontSize: '18px',
//               });
//             }, step);
//           }
//         );
//       }

//       delay += step;
//     }
//   }, delay);
// }

function createPromise({ amount, delay, step }) {
  let count = 1;
  let timeDelay = delay;

  setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      Promise.resolve(`✅ Fulfilled promise ${count} in ${timeDelay}ms`).then(
        showResolveMessage
      );
    } else {
      Promise.reject(`❌ Rejected promise ${count} in ${timeDelay}ms`).catch(
        showRejectMessage
      );
    }

    timeDelay += step;
    count += 1;

    timerId = setInterval(() => {
      checkCount(count, amount);

      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        Promise.resolve(`✅ Fulfilled promise ${count} in ${timeDelay}ms`).then(
          showResolveMessage
        );
      } else {
        Promise.reject(`❌ Rejected promise ${count} in ${timeDelay}ms`).catch(
          showRejectMessage
        );
      }

      timeDelay += step;
      count += 1;
    }, step);
  }, delay);
}

function showResolveMessage(value) {
  Notiflix.Notify.success(`${value}`, {
    width: '400px',
    position: 'right-top',
    clickToClose: true,
    svgSize: '120px',
    fontSize: '18px',
  });
}

function showRejectMessage(value) {
  Notiflix.Notify.failure(`${value}`, {
    width: '400px',
    position: 'right-top',
    clickToClose: true,
    svgSize: '120px',
    fontSize: '18px',
  });
}

function checkCount(currentCount, amountOfCounts) {
  if (currentCount >= amountOfCounts) {
    clearInterval(timerId);
    return;
  }
}
