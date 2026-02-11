const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const heartsContainer = document.querySelector(".hearts");

const popup = document.getElementById("yesPopup");
const closePopup = document.getElementById("closePopup");

let yesSize = 24;
let noSpeed = 60;

document.addEventListener("mousemove", (e) => {
  const container = document.querySelector(".button-container");
  const noRect = noBtn.getBoundingClientRect();

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const noCenterX = noRect.left + noRect.width / 2;
  const noCenterY = noRect.top + noRect.height / 2;

  const distanceX = noCenterX - mouseX;
  const distanceY = noCenterY - mouseY;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  if (distance < 140 && distance > 0) {
    if (noBtn.style.position !== "absolute") {
      noBtn.style.position = "absolute";
      noBtn.style.left = noBtn.offsetLeft + "px";
      noBtn.style.top = noBtn.offsetTop + "px";
    }

    let newLeft = noBtn.offsetLeft + (distanceX / distance) * noSpeed;
    let newTop = noBtn.offsetTop + (distanceY / distance) * noSpeed;

    newLeft = Math.max(
      0,
      Math.min(container.clientWidth - noBtn.offsetWidth, newLeft)
    );

    newTop = Math.max(
      0,
      Math.min(container.clientHeight - noBtn.offsetHeight, newTop)
    );

    noBtn.style.left = newLeft + "px";
    noBtn.style.top = newTop + "px";

    yesSize += 0.5;
    yesBtn.style.fontSize = yesSize + "px";

    noSpeed += 0.4;
  }
});

yesBtn.addEventListener("click", () => {
  message.textContent = "She said YES!! 💕";
  launchConfetti();
  popup.classList.remove("hidden");
  burstHearts(yesBtn);
});

closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
});

function createHeart() {
  const heart = document.createElement("span");
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 500);

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let confetti = [];

function launchConfetti() {
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: -10,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 3 + 2,
    });
  }
}

function updateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((c, i) => {
    c.y += c.speed;
    ctx.fillRect(c.x, c.y, c.size, c.size);
    if (c.y > canvas.height) confetti.splice(i, 1);
  });

  requestAnimationFrame(updateConfetti);
}

updateConfetti();
