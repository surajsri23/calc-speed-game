let username = localStorage.getItem("username");
let unlockedLevel = parseInt(localStorage.getItem("unlockedLevel") || "1");
let totalPoints = parseInt(localStorage.getItem("totalPoints") || "0");

let level = unlockedLevel;
let questions = [];
let answers = [];
let currentIndex = 0;
let score = 0;
let streak = 0;

let timeLeft = 15;
let timerInterval = null;

const correctSound = new Audio("/static/sounds/correct.mp3");
const wrongSound = new Audio("/static/sounds/wrong.mp3");

window.onload = () => {
  if (username) {
    showDashboard();
  }
};

/* ----------------------------
   UTILITIES
---------------------------- */

function hideAll() {
  [
    "username-screen",
    "dashboard",
    "level-map",
    "game-screen",
    "game-over-screen",
    "leaderboard-screen"
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
}

function getPointsPerQuestion(level) {
  if (level <= 2) return 10;
  if (level <= 5) return 15;
  if (level <= 9) return 20;
  return 25;
}

/* ----------------------------
   USERNAME + DASHBOARD
---------------------------- */

function saveUsername() {
  const input = document.getElementById("username-input").value.trim();
  if (!input) return alert("Enter your name");

  username = input;
  localStorage.setItem("username", username);

  // New user reset
  localStorage.setItem("unlockedLevel", "1");
  localStorage.setItem("totalPoints", "0");

  unlockedLevel = 1;
  totalPoints = 0;

  showDashboard();
}

function showDashboard() {
  hideAll();
  document.getElementById("dashboard").classList.remove("hidden");

  document.getElementById("welcome-text").innerText =
    `Welcome, ${username}`;

  document.getElementById("total-points").innerText = totalPoints;
}

/* ----------------------------
   LEVEL MAP
---------------------------- */

function showLevelMap() {
  hideAll();
  const container = document.getElementById("levels-container");
  container.innerHTML = "";

  const maxVisible = 10;

  for (let i = 1; i <= maxVisible; i++) {
    const btn = document.createElement("button");

    if (i <= unlockedLevel) {
      btn.innerText = i;
      btn.className = "bg-green-500 p-3 rounded text-black";
      btn.onclick = () => startGame(i);
    } else {
      btn.innerText = "🔒";
      btn.className = "bg-slate-600 p-3 rounded opacity-60 text-white";
      btn.disabled = true;
    }

    container.appendChild(btn);
  }

  document.getElementById("level-map").classList.remove("hidden");
}

/* ----------------------------
   GAME START
---------------------------- */

function startGame(lvl = unlockedLevel) {
  level = lvl;

  fetch(`/api/start?level=${level}`)
    .then(res => res.json())
    .then(data => {
      questions = data.questions;
      answers = data.answers;

      currentIndex = 0;
      score = 0;
      streak = 0;

      hideAll();
      document.getElementById("game-screen").classList.remove("hidden");

      showQuestion();
    })
    .catch(err => {
      alert("Server error. Try again.");
      console.error(err);
    });
}

/* ----------------------------
   QUESTION FLOW
---------------------------- */

function showQuestion() {
  document.getElementById("level").innerText = `Level ${level}`;
  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById("progress").innerText =
    `${currentIndex + 1} / ${questions.length}`;

  document.getElementById("question").innerText =
    questions[currentIndex].question;

  document.getElementById("answer").value = "";

  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 15;
  updateCircle();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateCircle();

    if (timeLeft <= 0) {
      gameOver("⏱ Time up!");
    }
  }, 1000);
}

function updateCircle() {
  const circle = document.getElementById("timer-circle");
  const circumference = 176;
  const offset = circumference - (timeLeft / 15) * circumference;
  circle.style.strokeDashoffset = offset;
}

function checkAnswer() {
  const input = document.getElementById("answer").value;
  if (input === "") return;

  const userAnswer = parseInt(input);
  const correctAnswer = answers[currentIndex];

  if (userAnswer === correctAnswer) {
    correctSound.play();

    streak++;

    const basePoints = getPointsPerQuestion(level);
    const speedBonus = timeLeft;
    const streakBonus = streak * 2;

    score += basePoints + speedBonus + streakBonus;

    currentIndex++;

    if (currentIndex >= questions.length) {
      levelComplete();
    } else {
      showQuestion();
    }
  }
}

/* ----------------------------
   LEVEL COMPLETE
---------------------------- */

function levelComplete() {
  clearInterval(timerInterval);

  // Add to total points
  totalPoints += score;
  localStorage.setItem("totalPoints", totalPoints);

  // Unlock next level (max 10)
  if (level === unlockedLevel && unlockedLevel < 10) {
    unlockedLevel++;
    localStorage.setItem("unlockedLevel", unlockedLevel);
  }

  // Save leaderboard
  fetch("/api/save_score", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username,
      totalScore: totalPoints,
      level: unlockedLevel
    })
  });

  // Flash message
  document.getElementById("question").innerText = "🎉 Level Complete!";

  setTimeout(() => {
    // AUTO START NEXT LEVEL
    if (level < unlockedLevel) {
      level++;
      startGame(level);
    } else {
      showDashboard();
    }
  }, 1200);
}

/* ----------------------------
   GAME OVER
---------------------------- */

function gameOver(reason) {
  clearInterval(timerInterval);
  wrongSound.play();
  streak = 0;

  hideAll();
  document.getElementById("game-over-screen").classList.remove("hidden");

  document.getElementById("final-score").innerText =
    `${reason}
Correct Answer: ${answers[currentIndex]}
Level Score: ${score}
Total Points: ${totalPoints}`;
}

/* ----------------------------
   LEADERBOARD
---------------------------- */

function showLeaderboard() {
  hideAll();

  fetch("/api/leaderboard")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("leaderboard-list");
      list.innerHTML = "";

      data.forEach((u, index) => {
        const li = document.createElement("li");
        li.innerText = `${index + 1}. ${u.username} — ${u.totalScore} pts`;
        list.appendChild(li);
      });

      document.getElementById("leaderboard-screen").classList.remove("hidden");
    });
}


/* ----------------------------
   NAVIGATION
---------------------------- */

function goDashboard() {
  hideAll();
  showDashboard();
}
