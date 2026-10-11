const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const storeBtn = document.getElementById("storeBtn");
const resetBtn = document.getElementById("resetBtn");
const storedList = document.getElementById("storedList");

let startTime = 0;
let elapsed = 0;
let timer = null;
let count = 0;

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centi = Math.floor((ms % 1000) / 10);

  return (
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + "." +
    String(centi).padStart(2, "0")
  );
}

function updateDisplay() {
  elapsed = Date.now() - startTime;
  display.textContent = formatTime(elapsed);
}

startBtn.addEventListener("click", () => {
  if (timer) return; // already running
  startTime = Date.now() - elapsed;
  timer = setInterval(updateDisplay, 10);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

storeBtn.addEventListener("click", () => {
  if (elapsed === 0) return;
  count++;
  const li = document.createElement("li");
  li.textContent = count + ". " + formatTime(elapsed);
  storedList.appendChild(li);
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  elapsed = 0;
  count = 0;
  display.textContent = "00:00.00";
  storedList.innerHTML = "";
});