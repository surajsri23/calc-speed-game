let username =
localStorage.getItem("username");

let unlockedLevel =
parseInt(localStorage.getItem("unlockedLevel") || "1");

let totalPoints =
parseInt(localStorage.getItem("totalPoints") || "0");


let level = 1;

let questions = [];
let answers = [];

let currentIndex = 0;

let score = 0;

let streak = 0;

let correctAnswers = 0;
let wrongAnswers = 0;

let timerInterval = null;

let timeLeft = 0;

let dailyMode = false;

let gameEnded = false;


let selectedTopic = "mixed";



const correctSound =
new Audio("/static/sounds/correct.mp3");

const wrongSound =
new Audio("/static/sounds/wrong.mp3");

const levelPassSound =
new Audio("/static/sounds/level_pass.mp3");

correctSound.volume = 0.5;
wrongSound.volume = 0.6;
levelPassSound.volume = 0.7;


window.onload = () => {

    if(username){

        showDashboard();

    }

};



function hideAll(){

    [

        "username-screen",
        "dashboard",
        "level-map",
        "game-screen",
        "result-screen",
        "leaderboard-screen"

    ]

    .forEach(id => {

        const el =
        document.getElementById(id);

        if(el){

            el.classList.add("hidden");

        }

    });

}


function saveUsername(){

    const input =

    document
    .getElementById("username-input")
    .value
    .trim();

    if(!input) return;

    username = input;

    localStorage.setItem(
        "username",
        username
    );

    if(!localStorage.getItem("unlockedLevel")){

        localStorage.setItem(
            "unlockedLevel",
            "1"
        );

        localStorage.setItem(
            "totalPoints",
            "0"
        );

    }

    unlockedLevel =

    parseInt(
        localStorage.getItem("unlockedLevel")
    );

    totalPoints =

    parseInt(
        localStorage.getItem("totalPoints")
    );

    showDashboard();

}


function showDashboard(){

    clearInterval(timerInterval);

    hideAll();

    document
    .getElementById("dashboard")
    .classList.remove("hidden");

    document
    .getElementById("welcome-text")
    .innerText = `Hello, ${username}`;

    document
    .getElementById("total-points")
    .innerText = totalPoints;

    document
    .getElementById("highest-level")
    .innerText = unlockedLevel;

}


function setTopic(topic,btn){

    selectedTopic = topic;

    document
    .querySelectorAll(".topic-btn")
    .forEach(button => {

        button.classList.remove("active");

    });

    btn.classList.add("active");

}


function showLevelMap(){

    clearInterval(timerInterval);

    hideAll();

    document
    .getElementById("level-map")
    .classList.remove("hidden");

    const container =

    document.getElementById(
        "levels-container"
    );

    container.innerHTML = "";

    const maxVisible =
    unlockedLevel + 12;

    for(let i=1; i<=maxVisible; i++){

        const btn =
        document.createElement("button");

        btn.className =
        "h-16 rounded-2xl font-bold text-lg transition";

        if(i <= unlockedLevel){

            btn.innerText = i;

            btn.classList.add(

                "bg-green-500",
                "hover:bg-green-400",
                "text-black"

            );

            btn.onclick = () => {

                startGame(i);

            };

        }

        else{

            btn.innerText = "🔒";

            btn.classList.add(

                "bg-slate-800",
                "text-slate-500"

            );

        }

        container.appendChild(btn);

    }

}


function startGame(selectedLevel = unlockedLevel){

    clearInterval(timerInterval);

    gameEnded = false;

    dailyMode = false;

    level = selectedLevel;

    fetch(

        `/api/start?level=${level}&topic=${selectedTopic}`

    )

    .then(res => res.json())

    .then(data => {

        questions =
        data.questions.map(q => q.question);

        answers = data.answers;

        currentIndex = 0;

        score = 0;

        streak = 0;

        correctAnswers = 0;
        wrongAnswers = 0;

        hideAll();

        document
        .getElementById("game-screen")
        .classList.remove("hidden");

        showQuestion();

    });

}

// ================= DAILY QUIZ =================

function startDailyQuiz(){

    clearInterval(timerInterval);

    gameEnded = false;

    dailyMode = true;

    fetch("/api/daily")

    .then(res => res.json())

    .then(data => {

        questions =
        data.questions.map(q => q.question);

        answers = data.answers;

        currentIndex = 0;

        score = 0;

        streak = 0;

        correctAnswers = 0;
        wrongAnswers = 0;

        hideAll();

        document
        .getElementById("game-screen")
        .classList.remove("hidden");

        showQuestion();

    });

}

// ================= QUESTION =================

function showQuestion(){

    if(gameEnded){
        return;
    }

    document
    .getElementById("level")
    .innerText =

    dailyMode
    ? "Daily Quiz"
    : `Level ${level}`;

    document
    .getElementById("score")
    .innerText =
    `Score : ${score}`;

    document
    .getElementById("streak")
    .innerText =

    streak >= 2
    ? `Streak x${streak}`
    : "";

    document
    .getElementById("question")
    .innerText =
    questions[currentIndex];

    const input =

    document.getElementById(
        "answer"
    );

    input.value = "";

    input.focus();

    updateProgress();

    startTimer();

}

// ================= PROGRESS =================

function updateProgress(){

    const progress =

    ((currentIndex) / questions.length) * 100;

    document
    .getElementById("progress-bar")
    .style.width = `${progress}%`;

}

// ================= TIMER =================

function getLevelTime(level){

    if(level <= 2) return 12;

    if(level <= 5) return 14;

    if(level <= 10) return 16;

    if(level <= 20) return 18;

    return 20;

}

function startTimer(){

    clearInterval(timerInterval);

    const maxTime =

    dailyMode
    ? 15
    : getLevelTime(level);

    timeLeft = maxTime;

    updateTimerUI(maxTime);

    timerInterval = setInterval(() => {

        if(gameEnded){

            clearInterval(timerInterval);

            return;

        }

        timeLeft--;

        updateTimerUI(maxTime);

        if(timeLeft <= 0){

            gameEnded = true;

            clearInterval(timerInterval);

            wrongSound.currentTime = 0;
            wrongSound.play();

            wrongAnswers++;

            showResultScreen(
                "Time Up!"
            );

        }

    },1000);

}

function updateTimerUI(maxTime){

    document
    .getElementById("timer-text")
    .innerText = timeLeft;

    const circle =

    document.getElementById(
        "timer-circle"
    );

    const circumference = 251;

    const offset =

    circumference -
    ((timeLeft / maxTime) * circumference);

    circle.style.strokeDashoffset = offset;

}

// ================= ANSWER SUBMIT =================

function handleAnswer(event){

    if(event.key !== "Enter"){
        return;
    }

    checkAnswer();

}

// ================= CHECK ANSWER =================

function checkAnswer(){

    if(gameEnded){
        return;
    }

    const inputField =

    document.getElementById(
        "answer"
    );

    const value =
    inputField.value.trim();

    if(value === "") return;

    const userAnswer =
    parseInt(value);

    const correctAnswer =
    answers[currentIndex];

    // WRONG ANSWER

    if(userAnswer !== correctAnswer){

        streak = 0;

        inputField.classList.add(
            "border-red-500"
        );

        setTimeout(() => {

            inputField.classList.remove(
                "border-red-500"
            );

        },250);

        return;

    }

    // CORRECT ANSWER

    correctSound.currentTime = 0;
    correctSound.play();

    correctAnswers++;

    streak++;

    const base =
    getPointsPerQuestion(level);

    score +=

    base +
    timeLeft +
    (streak * 2);

    currentIndex++;

    // COMPLETE

    if(currentIndex >= questions.length){

        if(dailyMode){

            completeDailyQuiz();

        }

        else{

            completeLevel();

        }

        return;

    }

    showQuestion();

}

// ================= POINTS =================

function getPointsPerQuestion(level){

    if(level <= 2) return 10;

    if(level <= 5) return 15;

    if(level <= 10) return 20;

    if(level <= 20) return 30;

    return 40;

}

// ================= COMPLETE LEVEL =================

function completeLevel(){

    gameEnded = true;

    clearInterval(timerInterval);

    levelPassSound.currentTime = 0;
    levelPassSound.play();

    totalPoints += score;

    localStorage.setItem(
        "totalPoints",
        totalPoints
    );

    if(level === unlockedLevel){

        unlockedLevel++;

        localStorage.setItem(

            "unlockedLevel",

            unlockedLevel

        );

    }

    fetch("/api/save_score",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            username: username,

            totalScore: totalPoints,

            level: unlockedLevel

        })

    });

    showResultScreen(
        "Level Complete"
    );

}

// ================= DAILY COMPLETE =================

function completeDailyQuiz(){

    gameEnded = true;

    clearInterval(timerInterval);

    totalPoints += score;

    localStorage.setItem(
        "totalPoints",
        totalPoints
    );

    showResultScreen(
        "Daily Quiz Complete"
    );

}

// ================= RESULT SCREEN =================

function showResultScreen(title){

    clearInterval(timerInterval);

    hideAll();

    document
    .getElementById("result-screen")
    .classList.remove("hidden");

    const totalAttempts =

    correctAnswers + wrongAnswers;

    const accuracy =

    Math.round(

        (correctAnswers /

        (totalAttempts || 1))

        * 100

    );

    document
    .getElementById("result-title")
    .innerText = title;

    document
    .getElementById("result-score")
    .innerText = score;

    document
    .getElementById("result-accuracy")
    .innerText = `${accuracy}%`;

    document
    .getElementById("result-correct")
    .innerText = correctAnswers;

    document
    .getElementById("result-wrong")
    .innerText = wrongAnswers;

    if(dailyMode){

        document
        .getElementById("next-level-btn")
        .style.display = "none";

    }

    else{

        document
        .getElementById("next-level-btn")
        .style.display = "block";

    }

}

// ================= NEXT LEVEL =================

function goNextLevel(){

    gameEnded = false;

    level++;

    startGame(level);

}

// ================= QUIT =================

function quitGame(){

    clearInterval(timerInterval);

    gameEnded = true;

    showDashboard();

}

// ================= LEADERBOARD =================

function showLeaderboard(){

    clearInterval(timerInterval);

    hideAll();

    document
    .getElementById("leaderboard-screen")
    .classList.remove("hidden");

    fetch("/api/leaderboard")

    .then(res => res.json())

    .then(data => {

        const list =

        document.getElementById(
            "leaderboard-list"
        );

        list.innerHTML = "";

        if(data.length === 0){

            list.innerHTML = `

            <div class="text-center text-slate-400 py-10">

                No scores yet

            </div>

            `;

            return;

        }

        data.forEach((user,index) => {

            const row =
            document.createElement("div");

            row.className =
            "bg-slate-900 rounded-2xl p-5 flex items-center justify-between";

            row.innerHTML = `

            <div class="flex items-center gap-4">

                <div
                class="
                w-12 h-12 rounded-full
                bg-green-500 text-black
                flex items-center justify-center
                font-black
                ">
                    ${index + 1}
                </div>

                <div>

                    <div class="font-bold text-lg">
                        ${user.username}
                    </div>

                    <div class="text-slate-400 text-sm">
                        Level ${user.level}
                    </div>

                </div>

            </div>

            <div class="text-2xl font-black">

                ${user.totalScore}

            </div>

            `;

            list.appendChild(row);

        });

    });

}


function goDashboard(){

    showDashboard();

}