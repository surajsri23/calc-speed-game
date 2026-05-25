from flask import Blueprint, jsonify, request

from game.question_generator import generate_question

import json
import os

from datetime import date

api = Blueprint("api", __name__)



BASE_DIR = os.path.dirname(
    os.path.dirname(__file__)
)

DATA_DIR = os.path.join(
    BASE_DIR,
    "data"
)

LEADERBOARD_FILE = os.path.join(
    DATA_DIR,
    "leaderboard.json"
)

DAILY_FILE = os.path.join(
    DATA_DIR,
    "daily.json"
)



def load_json(path, default):

    if not os.path.exists(path):

        return default

    try:

        with open(path, "r") as f:

            return json.load(f)

    except:

        return default


def save_json(path, data):

    os.makedirs(DATA_DIR, exist_ok=True)

    with open(path, "w") as f:

        json.dump(data, f, indent=2)



@api.route("/api/start")

def start_level():

    level = int(
        request.args.get("level", 1)
    )

    topic = request.args.get(
        "topic",
        "mixed"
    )

    questions = []
    answers = []

    for _ in range(20):

        q = generate_question(
            level,
            topic
        )

        questions.append({

            "question":
            q["question"]

        })

        answers.append(
            q["answer"]
        )

    return jsonify({

        "questions": questions,

        "answers": answers

    })



@api.route("/api/daily")

def daily_quiz():

    today = str(date.today())

    data = load_json(
        DAILY_FILE,
        {}
    )

    

    if data.get("date") == today:

        return jsonify({

            "questions":
            data["questions"],

            "answers":
            data["answers"]

        })

  

    questions = []
    answers = []

    for _ in range(10):

        q = generate_question(
            10,
            "mixed"
        )

        questions.append({

            "question":
            q["question"]

        })

        answers.append(
            q["answer"]
        )

    daily_data = {

        "date": today,

        "questions": questions,

        "answers": answers

    }

    save_json(
        DAILY_FILE,
        daily_data
    )

    return jsonify({

        "questions": questions,

        "answers": answers

    })



@api.route(
    "/api/save_score",
    methods=["POST"]
)

def save_score():

    try:

        data = request.get_json()

        username = data.get("username")

        total_score = int(
            data.get("totalScore", 0)
        )

        level = int(
            data.get("level", 1)
        )

        if not username:

            return jsonify({

                "success": False,

                "message": "Username missing"

            })

        leaderboard = load_json(

            LEADERBOARD_FILE,

            []

        )

        found = False

        for user in leaderboard:

            if user["username"] == username:

                

                if total_score > user["totalScore"]:

                    user["totalScore"] = total_score

                    user["level"] = level

                found = True

                break

    

        if not found:

            leaderboard.append({

                "username": username,

                "totalScore": total_score,

                "level": level

            })

        

        leaderboard = sorted(

            leaderboard,

            key=lambda x: x["totalScore"],

            reverse=True

        )

        

        leaderboard = leaderboard[:50]

        save_json(

            LEADERBOARD_FILE,

            leaderboard

        )

        print("✅ Leaderboard Updated")

        return jsonify({

            "success": True

        })

    except Exception as e:

        print("❌ SAVE SCORE ERROR:", e)

        return jsonify({

            "success": False,

            "error": str(e)

        })



@api.route("/api/leaderboard")

def leaderboard():

    data = load_json(

        LEADERBOARD_FILE,

        []

    )

    data = sorted(

        data,

        key=lambda x: x["totalScore"],

        reverse=True

    )

    return jsonify(data)