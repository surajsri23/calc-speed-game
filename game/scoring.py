def calculate_score(correct, time_left, streak):
    if not correct:
        return 0

    base = 10
    speed_bonus = max(0, time_left)
    streak_bonus = streak * 2

    return base + speed_bonus + streak_bonus
