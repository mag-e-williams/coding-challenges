const charCount = (s:string) => {
    return new Set(s).size
  }
  
  function longestSubstringSize(s:string): Number {
    if (charCount(s) <= 2) {
      return s.length
    } else {
      const left_s = longestSubstringSize(s.slice(0, s.length-1))
      const right_s = longestSubstringSize(s.slice(1, s.length))
      if (left_s > right_s) {
        return left_s
      } else {
        return right_s
      }
    }
  }
  
  console.log(longestSubstringSize('cccababababb'))
  console.log(longestSubstringSize('abababa'))
  console.log(longestSubstringSize('aaaabbbbb'))
  console.log(longestSubstringSize('eaebns'))