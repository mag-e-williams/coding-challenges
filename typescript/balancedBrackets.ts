// Write a function that takes a string and returns true if it's balanced and false otherwise.
// A string is balanced if (), [], {}, <> are properly nested
// "()" => true, "([)]" => false

// ([)] => false
// "()" => true


function balancedBrackets(s: string) {
  const bracketDict: {[key: string]: string} = {'[':']', '{':'}', '(':')'}
  const openBrackets = Object.keys(bracketDict) 
  const closedBrackets = Object.values(bracketDict)

  const openBracketStack = []

  for (let i=0; i< s.length; i++) {  // O(N)
    const c = s[i]

    if (openBrackets.includes(c)) { //O(1)
      openBracketStack.push(c)
    } else if (closedBrackets.includes(c)) { //O(1)
      if (c != bracketDict[openBracketStack.slice(-1)[0]]) { //O(1)
        return false
      } 
      openBracketStack.pop() // remove most recent element //O(1)
    } 
  }
  if (openBracketStack.length) return false
  return true
}

console.log(balancedBrackets('[[()[]]]'))
console.log(balancedBrackets('[[[(hello)[world]]]'))
console.log(balancedBrackets('([)3]]'))
