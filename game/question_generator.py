import random
from .levels import get_level_rule

def generate_add(rule):
    a = random.randint(rule.get("min", 1), rule.get("max", 99))
    b = random.randint(rule.get("min", 1), rule.get("max", 99))
    return f"{a} + {b}", a + b

def generate_sub(rule):
    a = random.randint(rule.get("min", 10), rule.get("max", 999))
    b = random.randint(rule.get("min", 10), rule.get("max", 999))
    a, b = max(a, b), min(a, b)
    return f"{a} - {b}", a - b

def generate_mul(rule):
    a = random.randint(2, 20)
    b = random.randint(10, 99)
    return f"{a} × {b}", a * b

def generate_div(rule):
    b = random.randint(2, 20)
    a = b * random.randint(2, 20)
    return f"{a} ÷ {b}", a // b

def generate_square(rule):
    a = random.randint(5, 25)
    return f"{a}²", a * a

GENERATOR_MAP = {
    "add": generate_add,
    "sub": generate_sub,
    "mul": generate_mul,
    "div": generate_div,
    "square": generate_square
}

def generate_question(level):
    rule = get_level_rule(level)
    qtype = random.choice(rule["types"])
    generator = GENERATOR_MAP[qtype]
    q, a = generator(rule)
    return {"question": q, "answer": a}
