// /**
// Imagine that each shift on Traba has a number of slots requested by the company that posted it. However, for some shifts, we want to have certain constraints around the percentage of slots that may be filled by workers with different work histories. For example, we might say the following:

// At shift A, only B% of the workers may be new to the platform (i.e. have never worked any shifts on Traba before).

// _______________________________________________________

// In the provided dataset, we are given the following:

// an array of workers, each with the following properties
// {
//   id: string; // The ID of the worker
// }

// an array of shifts, each with the following properties
// {
//   id: string; // The ID of the shift
//   companyId: string; // The ID of the company who posted the shift
//   slots: number; // The number of workers that may complete the shift
//   maxNew: number | undefined; // If present, represents the portion (0 - 1) of slots that may be filled by workers new to Traba. 0.5 means 50% of slots can be filled by new workers
// }

// an array of signUps, each with the following properties
// {
//   workerId: string; // The ID of the worker that signed up
//   shiftId: string; // The ID of the shift for which they signed up
//   status: string; // The status of the shift: COMPLETE, TO_DO, NO_SHOW, CANCELED
// }


// To be considered 'not new' a worker needs to have COMPLETED a shift

// _______________________________________________________

// Write a function that, given a worker ID and a shift ID, determines whether the provided worker can sign up to the provided shift based on the shift's specified slots and maxNew values.

// Typescript Eg:

// // load in datasets
// const { workers, shifts, signUps } = require('./data')

// const canAcceptShift = (workerId: string, shiftId: string): boolean => {
//   // TODO
// }


const { shifts, signUps } = require('.utils/data')

const isNewWorker = (workerId) => {
  const workerSignups = signUps.filter((e) => {
    return e.workerId == workerId && e.status == 'COMPLETE'
  })
  if (workerSignups.length) { return false }
  else { return true }
}

const canAcceptShift = (workerId, shiftId) => {
  const shift = shifts.find(e => e.id == shiftId)
  const workerIsNew = isNewWorker(workerId)
  const shiftSignUps = signUps.filter(e => e.shiftId == shiftId && e.status != 'CANCELED')
  
  const numWorkersAssigned = shiftSignUps.length
  const availableTotalSlots = shift.slots - numWorkersAssigned
  
  if (!workerIsNew && availableTotalSlots > 0) {
    return true
  } else { // worker is new
    if (shift.maxNew) {
      const newWorkerSlots = shift.maxNew * shift.slots
      const newWorkersAssigned = shiftSignUps.filter(e => isNewWorker(e.workerId)).length
      return (newWorkerSlots >= newWorkersAssigned + 1)
    } else {
      // if maxNew is undefined, then there is no maximum number of new workers
      // anyone can be assigned as long as there are available slots
      return true 
    }
    
  }
}



// Test Workers:
const xpWorker = 'cba213e4-4d0e-4293-b7e6-333b2198a466'
const newWorker = 'e60a8006-c57a-4d2e-9b35-99d88c9499f9'

console.log(`TEST_1: ${isNewWorker(xpWorker) == false}`)
console.log(`TEST_2: ${isNewWorker(newWorker) == true}`)

// Test Shifts:
// We can use the last two shifts in the shifts array (These two shifts are the only upcoming shifts in the shifts array; they may have existing sign-ups but none that are "COMPLETE"):

// New worker can accept: shift e00d2f65-0c43-469b-acc6-91e6eaea2e46
// 20 workers. 20% max new.
// 10 slots taken, 1 slot taken by new workers, 10 slots by existing, 9 slots free
console.log(`TEST_3: ${canAcceptShift(newWorker, 'e00d2f65-0c43-469b-acc6-91e6eaea2e46') == true}`)
console.log(`TEST_4: ${canAcceptShift(xpWorker, '4e658073-e78e-47ed-a046-d02226330f5a') == true}`)

// New workers cannot accept: shift 4e658073-e78e-47ed-a046-d02226330f5a
// 20 workers. 5% max new
// 10 slots taken, 1 slot taken by new workers, 10 by existing, 9 slots free.
console.log(`TEST_5: ${canAcceptShift(newWorker, '4e658073-e78e-47ed-a046-d02226330f5a') == false}`)

