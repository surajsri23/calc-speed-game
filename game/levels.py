LEVEL_RULES = [
    {"max_level": 2,  "types": ["add"], "min": 1, "max": 20},
    {"max_level": 5,  "types": ["add", "sub"], "min": 10, "max": 99},
    {"max_level": 10, "types": ["add", "sub", "mul"]},
]


def get_level_rule(level):
    for rule in LEVEL_RULES:
        if level <= rule["max_level"]:
            return rule
    return {"types": ["add", "sub", "mul", "div", "square"]}
