const monthsEl = document.querySelector("#months");
const daysEl = document.querySelector("#days");
const hoursEl = document.querySelector("#hours");
const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");

const calcTimeTillNewYear = (year) =>
  new Date(`1 january ${year}`) - new Date();

calcTimeTillNewYear(2023);

const interval = setInterval(() => {
  const timeDiff = calcTimeTillNewYear(2023);
  const totalSeconds = Math.floor(timeDiff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalMonths = Math.floor(totalDays / 30);

  monthsEl.textContent = totalMonths % 12;
  daysEl.textContent = totalDays % 30;
  hoursEl.textContent = formatTime(totalHours % 24);
  minutesEl.textContent = formatTime(totalMinutes % 60);
  secondsEl.textContent = formatTime(totalSeconds % 60);
  if (totalSeconds === 0) clearInterval(interval);
}, 1000);

const formatTime = (time) => (time < 10 ? `0${time}` : time);
