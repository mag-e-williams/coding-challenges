# Given two events with a start and end time, return whether they overlap
# Example:
# Event A: {"start": 11, "end": 22}
# Event B: {"start": 19, "end": 33}

# -> Returns true because Event A and Event B overlap
# start_b is within start_a, end_a
# end_b is within start_a, end_a

# find the first event

#s1 is within bounds of even


# overlap if satisfies all:
# 1. first event ends AFTER the second event starts 

def overlap(EventA, EventB):
    if EventA["start"] < EventB["start"]:
        first_event = EventA
        second_event = EventB
    else : 
        first_event = EventB
        second_event = EventA
    return (first_event["end"] >  second_event["start"])

EventA = {"start": 11, "end": 22}
EventB = {"start": 19, "end": 33}
print(overlap(EventA, EventB))

EventA = {"start": 11, "end": 22}
EventB = {"start": 25, "end": 33}
print(overlap(EventA, EventB))

EventB = {"start": 11, "end": 22}
EventA = {"start": 25, "end": 33}
print(overlap(EventA, EventB))

EventB = {"start": 11, "end": 38}
EventA = {"start": 8, "end": 33}
print(overlap(EventA, EventB))