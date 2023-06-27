
## Implement the reduce() function
# Examples:
# reduce([2,3,4], lambda a, b: a + b) = 9
# reduce([2,3,4], lambda a, b: a * b) = 24
# reduce([4,3,2], lambda a, b: a - b) = -1
# reduce([], lambda a, b: a * b) = None
# reduce([5], lambda a, b: a * b) = 5

# always take two args and return same type as elements in string
# function shouldnt assume type


def reduce(arr, lambda_f): 
    if len(arr) < 1:
        return None
    elif len(arr) == 1:
        return arr[0]
    
    elif len(arr) >= 2: 
        a = arr[0]
        b = arr[1]
        arr_x = [lambda_f(a, b)] + arr[2:]
        return reduce(arr_x, lambda_f)


print(reduce([2,3,4], lambda a, b: a + b))
print(reduce([2,3,4], lambda a, b: a * b))
print(reduce([4,3,2], lambda a, b: a - b))
print(reduce([], lambda a, b: a * b))
print(reduce([5], lambda a, b: a * b))
print(reduce(['h','e','l','l','o'], lambda a, b: a + b))