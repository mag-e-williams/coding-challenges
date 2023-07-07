
// Write a function that takes a string and returns the arithmetic evaluation of it.
// The string has only '+', '*', and non-negative integers (e.g. '42')
// "1+2*3*2+1" => 7

function customEval(s: string) {
  const eqStack: string[] = []

  const ops = ['+', '*']
  for (let i=0; i< s.length; i++) {  // O(N)
    const c = s[i]
    if (eqStack.slice(-1)[0] == '*') {
      eqStack.pop()
      const x = eqStack.pop()
      eqStack.push((Number(c) * Number(x)).toString())
    } else {
      eqStack.push(c)
    }
  }
  const filteredStack = eqStack.filter(e => e != '+').map(e => Number(e))
  const sumStack = filteredStack.reduce((partialSum, a) => partialSum + Number(a), 0)
  
  return sumStack
}

console.log(customEval('1+2*2*3'))
console.log(customEval('1+2*2*3+6'))
console.log(customEval('1+3+2*2*3+6'))