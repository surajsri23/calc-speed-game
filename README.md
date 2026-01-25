# ⚡ Calc Speed Challenge

A **mobile-friendly calculation speed training platform** for
**SSC, Banking & competitive exam aspirants**, focused on **real exam-like speed, timing, and accuracy**.

This is **not a casual math game** — it is a **serious speed-training tool**.

---

## 🚀 Key Features

### 🧠 Practice Mode (Topic-wise)

* Topic-wise practice:

  * Addition, Subtraction, Multiplication, Division
  * Square, Cube, Percentage, BODMAS
  * Mixed (all topics combined)
* 🔓 **Unlimited levels** per topic
* 📈 Progressive difficulty (no hard cap)
* 🔁 Auto-move to **next level on level clear**
* 🎉 Level-clear greeting + sound effect

### ⏱ Intelligent Timer System

* **Question-based timing** (not random, not fixed)
* Faster questions → less time
* Concept-heavy questions → more time
* Designed with **SSC & Banking aspirant mindset**
* Circular animated timer for focus

### 🔊 Audio Feedback

* `correct.mp3` → every correct answer
* `wrong.mp3` → **only when time runs out**
* `level_pass.mp3` → level completion
* No sound disturbance while typing

### 📅 Daily Quiz

* 10 fixed questions per day
* Same questions for all users on the same day
* Replay allowed
* Adds to total score
* No level unlock interference

### 🧪 Mock Exam Mode

* Mixed questions
* Fixed exam-like timer
* No streak bonus
* Designed to simulate **real exam pressure**

### 📊 Performance Analytics

* Strong topic detection
* Weak topic detection
* Accuracy tracked per topic
* Analytics visible directly in the **navigation bar**

### 🏆 Leaderboard

* Global leaderboard (Top 50)
* Stores:

  * Username
  * Total Score
  * Highest Level
* Updates **only if user beats their own previous best**
* JSON-based persistence (no database)

### 📱 Mobile-First Design

* Fully responsive UI
* Numeric keyboard support
* Clean, exam-oriented layout
* No cartoon UI, no distractions

---

## 🛠 Tech Stack

* **Backend:** Flask (Python)
* **Frontend:** HTML + Tailwind CSS + Vanilla JavaScript
* **Storage:**

  * Leaderboard → JSON file
  * User progress → LocalStorage
* **Deployment:** Render (Free Tier Compatible)

---

## ⚙️ Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/surajsri23/calc-speed-game.git
cd calc-speed-game
```

### 2️⃣ Create virtual environment (optional)

```bash
python -m venv venv
venv\Scripts\activate   # Windows
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

Place the following files inside:

```
static/sounds/
```

* `correct.mp3` → correct answer feedback
* `wrong.mp3` → time-up feedback
* `level_pass.mp3` → level completion

---


## 📈 Planned Enhancements

* 📊 Accuracy percentage view
* 🧠 Weak-topic quick practice
* 📄 Mock exam result summary
* 📈 Performance graphs
* 🏆 Topic-wise leaderboard

---

## 👨‍💻 Author

**Suraj Srivastav**
B.Tech CSE | SSC & Banking Aspirant | Python Developer

GitHub:
👉 [https://github.com/surajsri23](https://github.com/surajsri23)

---

## 📜 License

This project is licensed under the **MIT License**.
Free to use, modify, and distribute with attribution.

⚡ **Train fast. Think sharp. Build speed, accuracy & confidence for competitive exams.**

