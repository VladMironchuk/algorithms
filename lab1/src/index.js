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
      this.count += 1
    }
    while (arr[j] > arr[sep]) {
      this.count += 3
      j -= 1
      this.count += 1
    }

    // swap elements
    if (i <= j) {
      this.count += 1
      let swap = arr[j]
      arr[j] = arr[i]
      arr[i] = swap 
      this.count += 3
      i += 1
      j -= 1
      this.count += 2
    }
  }

  return i
}

const quickHybridSort = (arr, k, left = 0, right = arr.length - 1) => {
  if (right - left) {
    this.count += 1
    if (right - left <= k) {
      this.count += 2
      return insertionSort(arr, left, right)
    } else if (left <= right) {
      this.count += 1
      const i = partition(arr, left, right)
      if (left < i - 1) {
        this.count += 2
        quickHybridSort(arr, k, left, i - 1)
        this.count += 1
      }
      if (i < right) {
        this.count += 1
        quickHybridSort(arr, k, i, right)
      }
    }
  }

  this.count += 2

  return arr
}

const merge = (a, b) => {
  const c = []
  this.count += 1
  while(a.length && b.length) {
      this.count += 2
      c.push(a[0] > b[0] ? b.shift() : a.shift())
      this.count += 5
  }
  while (a.length) {
      this.count += 1
      c.push(a.shift())
      this.count += 2
    }
    while (b.length) {
      c.push(b.shift())
      this.count += 3
    }
  return c
}

const mergeHybridSort = (arr, k) => {
  if (arr.length < 2) {
    this.count += 2
    return arr
  } else if (arr.length < k) {
    this.count += 2
    return insertionSort(arr, this.count)
  }

  const sep = Math.floor(arr.length / 2)
  this.count += 4
  
  const leftPart = mergeHybridSort(arr.slice(0, sep), k)
  const rightPart = mergeHybridSort(arr.slice(sep), k)

  return merge(leftPart, rightPart)
}

const insertionSort = arr => {
  this.count += 1
  for (let i = 1; i < arr.length; i++) {
    this.count += 3
    const current = arr[i];
    this.count += 2
    let j = i;
    this.count += 1
    while (j > 0 && arr[j - 1] > current) {
      this.count += 4
      arr[j] = arr[j - 1];
      this.count += 3
      j--;
      this.count += 1
    }
    arr[j] = current;
    this.count += 1
  }
  return arr;
};

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
