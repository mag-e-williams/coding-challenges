# Convert dates in deserialized JSON.
# Every property whose name ends in "Date" should be converted
# to a Date object / class instance
# Input = { "startDate": "2012-10-12", "owner": {
#     "createdDate": "2012-10-12", "owner2": { "createdDate2": "2012-10-12", } 
# } }
# Output: { "startDate": date.fromisoformat('2021-01-01T00:00:00'), ...}

Input = { 
    "startDate": "2012-10-12", 
    "owner": {
        "createdDate": "2012-10-12", 
        "owner2": { 
            "createdDate2": "2012-10-12"
        } 
    }   
}

from datetime import date

def deserializeJsonDates(Input):
    for key in Input: 
        if type(Input[key]) is dict:
            deserializeJsonDates(Input[key])
        elif 'date' in key.lower():
            Input[key] = date.fromisoformat(Input[key])

