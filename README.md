# ⚡ Calc Speed Challenge

A mobile-friendly calculation speed game for SSC & Banking aspirants to improve mental math, speed, and accuracy through levels, streaks, daily quizzes, and leaderboard.

---

## 🚀 Features

- 🧠 Level-based mental math practice  
- 🔓 Unlimited levels (auto unlock as you progress)  
- ⏱ Circular animated timer (time increases with level)  
- 🔥 Streak system with bonus points  
- 🎯 Level-wise scoring (higher level = higher reward)  
- 🎉 Level pass animation with sound effect  
- 🔊 Sound feedback (correct, wrong, level pass)  
- ⛔ Quit option anytime  
- 📊 Leaderboard system  
- 📅 Daily Quiz (10 fresh questions every day)  
- 📱 Fully mobile-friendly (numeric keyboard support)  
- 💾 Progress saved using localStorage  

Designed specially for:
- SSC CGL  
- Banking exams (IBPS / SBI / RRB)  
- Competitive exam aspirants  

---

## 🛠 Tech Stack

- **Backend:** Flask (Python)  
- **Frontend:** HTML + Tailwind CSS + Vanilla JavaScript  
- **Storage:** JSON file + LocalStorage  
- **Deployment:** Render  

---

## 📸 Preview

> A real training-game experience with clean UI, smooth flow, and exam-like feel.

---

## ⚙️ Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/surajsri23/calc-speed-game.git
cd calc-speed-game
````

### 2️⃣ Create virtual environment (optional but recommended)

```bash
python -m venv venv
venv\\Scripts\\activate   # Windows
```

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Run the app

```bash
python app.py
```

Open in browser:

```
http://127.0.0.1:5000
```

---

## 🔊 Sound Files Required

Place these files in:

```
static/sounds/
```

* `correct.mp3`   → correct answer sound
* `wrong.mp3`     → wrong answer sound
* `level_pass.mp3` → level completed sound

---

## 🌍 Deployment on Render

### Steps:

1. Push code to GitHub
2. Go to **Render Dashboard**
3. Create **New Web Service**
4. Connect this GitHub repo
5. Settings:

**Build Command**

```
pip install -r requirements.txt
```

**Start Command**

```
python app.py
```

6. Deploy 🎉

---

## 📈 Future Enhancements (Planned)

* 🧩 Mixed advanced question types (percentage, ratio, time & work)
* 🏆 Daily leaderboard
* 👤 Profile & stats page
* 🎨 Theme switch (dark / light)
* ✨ Confetti effects & combo popups

---

## 👨‍💻 Author

**Suraj Srivastav**
B.Tech CSE | SSC & Banking Aspirant | Python Developer

GitHub: [https://github.com/surajsri23](https://github.com/surajsri23)

---

## 📜 License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute with attribution.


> ⚡ Train fast. Think sharp. Crack exams.



