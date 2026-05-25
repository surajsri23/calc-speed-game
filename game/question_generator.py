import random

# ================= ADDITION =================

def addition(level):

    if level <= 5:

        a = random.randint(10, 99)
        b = random.randint(10, 99)

    elif level <= 10:

        a = random.randint(100, 999)
        b = random.randint(100, 999)

    elif level <= 20:

        a = random.randint(1000, 9999)
        b = random.randint(1000, 9999)

    else:

        a = random.randint(10000, 99999)
        b = random.randint(10000, 99999)

    return {
        "question": f"{a} + {b}",
        "answer": a + b
    }

# ================= SUBTRACTION =================

def subtraction(level):

    if level <= 5:

        a = random.randint(50, 99)
        b = random.randint(10, 49)

    elif level <= 10:

        a = random.randint(500, 999)
        b = random.randint(100, 499)

    elif level <= 20:

        a = random.randint(5000, 9999)
        b = random.randint(1000, 4999)

    else:

        a = random.randint(50000, 99999)
        b = random.randint(10000, 49999)

    return {
        "question": f"{a} - {b}",
        "answer": a - b
    }

# ================= MULTIPLICATION =================

def multiplication(level):

    if level <= 5:

        a = random.randint(2, 20)
        b = random.randint(2, 20)

    elif level <= 10:

        a = random.randint(10, 99)
        b = random.randint(10, 99)

    elif level <= 20:

        a = random.randint(100, 999)
        b = random.randint(10, 99)

    else:

        a = random.randint(100, 999)
        b = random.randint(100, 999)

    return {
        "question": f"{a} × {b}",
        "answer": a * b
    }

# ================= DIVISION =================

def division(level):

    if level <= 5:

        divisor = random.randint(2, 12)
        quotient = random.randint(2, 20)

    elif level <= 10:

        divisor = random.randint(5, 20)
        quotient = random.randint(10, 50)

    else:

        divisor = random.randint(10, 50)
        quotient = random.randint(20, 100)

    dividend = divisor * quotient

    return {
        "question": f"{dividend} ÷ {divisor}",
        "answer": quotient
    }

# ================= SQUARE =================

def square(level):

    if level <= 10:

        n = random.randint(5, 30)

    elif level <= 20:

        n = random.randint(30, 70)

    else:

        n = random.randint(70, 150)

    return {
        "question": f"{n}²",
        "answer": n * n
    }

# ================= CUBE =================

def cube(level):

    if level <= 10:

        n = random.randint(2, 10)

    else:

        n = random.randint(5, 20)

    return {
        "question": f"{n}³",
        "answer": n ** 3
    }

# ================= PERCENTAGE =================

def percentage(level):

    percent = random.choice([
        5,10,15,20,25,30,35,40,
        45,50,60,70,75,80,90
    ])

    if level <= 10:

        number = random.choice([
            100,200,300,500,1000
        ])

    else:

        number = random.choice([
            1200,2500,5000,7500,10000
        ])

    answer = int((percent / 100) * number)

    return {
        "question": f"{percent}% of {number}",
        "answer": answer
    }

# ================= BODMAS =================

def bodmas(level):

    if level <= 10:

        a = random.randint(5, 50)
        b = random.randint(2, 20)
        c = random.randint(2, 10)

    else:

        a = random.randint(50, 500)
        b = random.randint(10, 50)
        c = random.randint(5, 20)

    answer = a + (b * c)

    return {
        "question": f"{a} + {b} × {c}",
        "answer": answer
    }


TOPIC_MAP = {

    "addition": addition,

    "subtraction": subtraction,

    "multiplication": multiplication,

    "division": division,

    "square": square,

    "cube": cube,

    "percentage": percentage,

    "bodmas": bodmas

}


def mixed_question(level):

    generator = random.choice([

        addition,
        subtraction,
        multiplication,
        division,
        square,
        cube,
        percentage,
        bodmas

    ])

    return generator(level)


def generate_question(level, topic="mixed"):

    if topic != "mixed":

        generator = TOPIC_MAP.get(topic)

        if generator:

            return generator(level)

    return mixed_question(level)