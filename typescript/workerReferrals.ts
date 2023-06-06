// Context
// At Traba, one way that we've grown our worker pool is by offering incentives for our existing workers to refer people in their network. We'd like to do some analysis on which workers have been responsible for the most worker acquisition.

// Prompt
// Given an array of worker id pairs, where the 0th index represents a worker on Traba and the 1st index, if defined, represents the worker that referred the aforementioned worker, write a function that determines which worker is responsible for the most referrals on Traba, direct or indirect.

// input – workers = [
//   ['A', undefined],
//   ['C', 'A'],
//   ['B', undefined],
// ]
// output - 'A'

// input – workers = [
//   ['A', undefined],
//   ['C', 'A'],
//   ['D', 'C'],
//   ['B', undefined],
//   ['E', 'B'],
// ]
// output - 'A'

// input – workers = [
//   ['A', undefined],
//   ['C', 'A'],
//   ['D', 'C'],
//   ['B', undefined],
//   ['E', 'B'],
//   ['F', 'B'],
// ]
// output - 'A' OR 'B'


const test_workers = [
    ['A', ''],
    ['C', 'A'],
    ['D', 'C'],
    ['B', ''],
    ['E', 'B'],
    ['F', 'B'],
  ]
  
  const test_workers_2 = [
    ['A', 'F'],
    ['C', 'A'],
    ['D', 'C'],
    ['B', ''],
    ['E', 'B'],
    ['F', 'B'],
  ]
  
  const workerDirectReferralDict = (workers: string[][]) => {
    const worker_dict: { [name: string]: string[] } = {};
    workers.forEach(e => {
      const worker = e[0]
      const refferal = e[1]
      if (refferal == '') {
      } else {
        if (worker_dict.hasOwnProperty(refferal)) {
          worker_dict[refferal].push(worker)
        } else {
          worker_dict[refferal] = [worker]
        }
      }
    })
    return worker_dict;
  }
  
  const numReferrals = (referralList: string[], workers: { [name: string]: string[] }, total_referrals = 0) => {
    referralList.forEach(e => {
      if (workers.hasOwnProperty(e)) {
        total_referrals = total_referrals + 1 + numReferrals(workers[e], workers, total_referrals)
      } else {
        total_referrals = total_referrals + 1
      }
    })
    return total_referrals
  }
  
  const maxReferrer = (workers: (string)[][]) => {
    const worker_dict = workerDirectReferralDict(workers)
    const worker_refferral_count: { [name: string]: number } = {};
  
    Object.entries(worker_dict).forEach(([key, value]) => {
      const num_referrals = numReferrals(value, worker_dict)
      worker_refferral_count[key] = num_referrals
    })
  
    let max_refferer: string | undefined = undefined;
    let max_referrals: number = 0;
  
    Object.entries(worker_refferral_count).forEach(([key, value]) => {
      const worker = key
      const num_referrals = value
      if ((max_refferer == undefined) || num_referrals > max_referrals) {
        max_refferer = worker
        max_referrals = num_referrals
      }
    })
  
    return max_refferer
  }
  
  console.log(`TEST 1: ${maxReferrer(test_workers) == 'A'}`)
  console.log(`TEST 2: ${maxReferrer(test_workers_2) == 'B'}`)
  
  
  
