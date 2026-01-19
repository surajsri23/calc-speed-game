import json
import os
from flask import Blueprint, request, jsonify
from game.question_generator import generate_question

api = Blueprint("api", __name__)

DATA_FILE = "data/leaderboard.json"


def load_leaderboard():
    # If file does not exist → return empty list
    if not os.path.exists(DATA_FILE):
        return []

    # If file exists but empty or corrupted → reset
    try:
        with open(DATA_FILE, "r") as f:
            content = f.read().strip()
            if not content:
                return []
            return json.loads(content)
    except Exception as e:
        print("⚠ Leaderboard file corrupted, resetting:", e)
        return []


def save_leaderboard(data):
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)

    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)


@api.route("/start")
def start_game():
    level = int(request.args.get("level", 1))
    questions = [generate_question(level) for _ in range(20)]

    safe = [{"question": q["question"]} for q in questions]

    return jsonify({
        "questions": safe,
        "answers": [q["answer"] for q in questions]
    })


@api.route("/save_score", methods=["POST"])
def save_score():
    data = request.json
    leaderboard = load_leaderboard()

    # Remove old entry of same user
    leaderboard = [u for u in leaderboard if u.get("username") != data.get("username")]

    leaderboard.append(data)

    leaderboard = sorted(
        leaderboard,
        key=lambda x: x.get("totalScore", 0),
        reverse=True
    )[:50]

    save_leaderboard(leaderboard)
    return jsonify({"status": "ok"})



@api.route("/leaderboard")
def leaderboard():
    return jsonify(load_leaderboard())
