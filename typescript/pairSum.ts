/*
Check if a pair exists with given sum in given array

Given an array of numbers and an integer target, check whether there are two elements in the array that add up to the target.

Example
Input: nums = [0, -1, 2, -3, 1], target = -2
Output: true

Input: nums=[1, -2, 1, 0, 5], target = 0
Output: false
*/

const a1 = [1, -2, 1, 0, 5]
const a2 = [0, -1, 2, -3, 1]

// Naive Approach, O(N*N)
function pairSum(arr: number[], target: number) {
  for (let i= 0; i < arr.length; i++) {
    const a = arr[i]
    for (let j= 0; j < arr.length; j++) {
      const b = arr[j]
      if (i != j) {
        const sum = a + b
        if (sum == target) {
          return true
        }
      }
    }
  }
  return false
}

console.log(pairSum(a1, 0))
console.log(pairSum(a2, -2))

// Optimized Approach, O(N)
function pairSumOptimized(arr: number[], target: number) {
  let visited: {[key: string]: number} = {};

  for (let i= 0; i < arr.length; i++) {
    const n = arr[i];
    const needed = target - n;
    if (visited[needed.toString()] != undefined) {
      return true
    } 
    const key_n = n.toString()
    visited[key_n] = needed
  }
  return false
}


console.log(pairSumOptimized(a1, 0))
console.log(pairSumOptimized(a2, -2))
