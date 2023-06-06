# store record of recent API accesses
# checking within the window of time how many accesses have occured 

from datetime import datetime, timedelta    

class RateLimiter:
    def __init__(self):
        self.APIaccess = {}
        self.limit = 5
        self.timeWindow = 2 # in seconds

    def can_access(self, user):
        now = datetime.now()
        if user not in self.APIaccess:
            self.APIaccess[user] = [now]
            return True

        access_attempts = self.APIaccess[user]

        # append new access time to list of access times
        access_attempts.append(now)
        self.APIaccess[user] = access_attempts

        # count of attempts w/in 2 sec window
        min_bound = now - timedelta(seconds=self.timeWindow)
        count = sum(1 for time in access_attempts if time > min_bound)

        # >= limit reached access limit
        if count >= self.limit:
            return False
        
        return True


class PhilzCoffee:
    def __init__(self):
        self.ratelimiter = RateLimiter()
    
    def buy_coffee(self, user):
        if not self.ratelimiter.can_access(user):
            raise Exception("Slow down!")


pc = PhilzCoffee()
pc.buy_coffee('phil')
pc.buy_coffee('phil')
pc.buy_coffee('phil')
pc.buy_coffee('phil')
pc.buy_coffee('phil')

# pc.buy_coffee('phil')
pc.buy_coffee('dan')
pc.buy_coffee('dan')
pc.buy_coffee('dan')
pc.buy_coffee('dan')
