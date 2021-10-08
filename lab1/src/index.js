const chalk = require("chalk")

const sortTiming = (sortName, arrLength, maxValue, sortFn) => {
  const start = new Date().getTime()

  const k = getK(arrLength)

  const array = fillArray(arrLength, maxValue)

  sortFn(array, k)

  const end = new Date().getTime()

  console.log(chalk.blue(`Time for ${sortName === "merge" ? "merge" : "quick"} hybrid sort: ${convertToSec(end - start)} seconds`));
  console.log(chalk.yellow(`Operations amount: ${this.count}`));
}



const getRandom = (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min)

const fillArray = (n, max) => {
  return [...new Array(n)].map(() => getRandom(max))
}

const getK = k => {
  let i = k
  while (i >= 64) {
    i /= 2
  }
  return i
}

const convertToSec = ms => ms / 1000

const mergeHybridSortExperiment = (array) => {
  let k = array.length
  while (k /= 2) {
    const start = new Date().getTime()
    mergeHybridSort(array, k)
    const end = new Date().getTime()

    console.log(`${k}: ${end - start}`)
  }
}

const quickHybridSortExperiment = array => {
  let k = array.length
  while (k /=2 ) {
    const start = new Date().getTime()
    quickHybridSort(array, k)
    const end = new Date().getTime()

    console.log(`${k}: ${end - start}`)
  }
}

const partition = (arr, left, right) => {
  const sep = left
  this.count += 1
  let i = left
  let j = right
  this.count += 2

  while (i <= j) {
    this.count += 1
    while (arr[i] < arr[sep]) {
      this.count += 3
      i += 1
      this.count += 2
    }
    while (arr[j] > arr[sep]) {
      this.count += 3
      j -= 1
      this.count += 2
    }

    // swap elements
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i += 1
      j -= 1
      this.count += 11
    }
  }

  return i
}

const quickHybridSort = (arr, k, left = 0, right = arr.length - 1) => {
  if (right - left) {
    this.count += 2
    if (right - left <= k) {
      this.count += 2
      return insertionSort(arr, left, right)
    } else if (left <= right) {
      this.count += 2
      const i = partition(arr, left, right)
      if (left < i - 1) {
        this.count += 3
        quickHybridSort(arr, k, left, i - 1)
      }
      if (i < right) {
        this.count += 1
        quickHybridSort(arr, k, i, right)
      }
    }
  }

  return arr
}

const merge = (left, right) => {
  const res = []

  let i = 0
  let j = 0
  
  this.count += 3
  while (i < left.length && j < right.length) {
    this.count += 5
    if (left[i] < right[j]) {
      res.push(left[i])
      i += 1
      this.count += 7
    } else {
      res.push(right[j])
      j += 1
      this.count += 4
    }
  }

  return [...res, ...left.slice(i), ...right.slice(j)]
}

const mergeHybridSort = (arr, k) => {
  if (arr.length < 2) {
    this.count += 2
    return arr
  } else if (arr.length < k) {
    this.count += 2
    return insertionSort(arr)
  }

  const sep = Math.floor(arr.length / 2)
  this.count += 4
  
  const leftPart = mergeHybridSort(arr.slice(0, sep), k)
  const rightPart = mergeHybridSort(arr.slice(sep), k)

  return merge(leftPart, rightPart)
}

const insertionSort = (arr, left = 0, right = arr.length - 1) => {
  this.count += 2
  for (let i = left; i <= right; i += 1) {
    this.count += 3
    for (let j = i; j > 0 && arr[j - 1] > arr[j]; j -= 1) {
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
      this.count += 13
    }
  }

  return arr
}

const config = {
  arrayCount: +process.argv[2],
  arrayLen: +process.argv[3],
  maxElem: +process.argv[4],
  sort: process.argv[5]
}

this.count = 0

for(let i = 0; i < config.arrayCount; i++) {
  this.count = 0
  sortTiming(
    config.sort,
    config.arrayLen,
    config.maxElem,
    config.sort === "merge" ? mergeHybridSort : quickHybridSort,
  )
}
