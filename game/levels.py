# ================= LEVEL CONFIG =================

LEVELS = {

    # ================= EASY =================

    1: {
        "name": "Starter",
        "topics": ["addition"],
        "time": 12,
        "points": 10
    },

    2: {
        "name": "Beginner",
        "topics": ["addition", "subtraction"],
        "time": 12,
        "points": 10
    },

    3: {
        "name": "Quick Solver",
        "topics": ["addition", "subtraction"],
        "time": 13,
        "points": 12
    },

    4: {
        "name": "Fast Brain",
        "topics": ["addition", "subtraction", "multiplication"],
        "time": 14,
        "points": 15
    },

    5: {
        "name": "Speed Runner",
        "topics": ["addition", "subtraction", "multiplication"],
        "time": 14,
        "points": 15
    },

    # ================= INTERMEDIATE =================

    10: {
        "name": "Intermediate Master",
        "topics": [
            "addition",
            "subtraction",
            "multiplication",
            "division"
        ],
        "time": 16,
        "points": 20
    },

    15: {
        "name": "Calculation Pro",
        "topics": [
            "multiplication",
            "division",
            "percentage",
            "square"
        ],
        "time": 18,
        "points": 25
    },

    20: {
        "name": "Mental Warrior",
        "topics": [
            "multiplication",
            "division",
            "percentage",
            "square"
        ],
        "time": 18,
        "points": 30
    },

    # ================= ADVANCED =================

    25: {
        "name": "SSC Challenger",
        "topics": [
            "square",
            "cube",
            "percentage",
            "bodmas"
        ],
        "time": 20,
        "points": 35
    },

    30: {
        "name": "Banking Expert",
        "topics": [
            "square",
            "cube",
            "percentage",
            "bodmas"
        ],
        "time": 20,
        "points": 40
    }

}

# ================= DEFAULT RULE =================

DEFAULT_LEVEL = {

    "name": "Grand Master",

    "topics": [
        "addition",
        "subtraction",
        "multiplication",
        "division",
        "square",
        "cube",
        "percentage",
        "bodmas"
    ],

    "time": 22,

    "points": 50

}

# ================= GET LEVEL DATA =================

def get_level_data(level):

    if level in LEVELS:
        return LEVELS[level]

    closest = 1

    for lvl in LEVELS.keys():

        if lvl <= level:
            closest = lvl

    return LEVELS.get(
        closest,
        DEFAULT_LEVEL
    )