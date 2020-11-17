const fs = require("fs");
const readline = require("readline");

//------ Heap data structures --------

const minHeap = function () {
  const heap = Array();
  /**
   * Position of parent:      i/2
   * Position of left child:  2i
   * Position of right child: 2i + 1
   */

  this.getInfo = function () {
    return [heap[0], heap.length];
  };

  this.insert = function (value) {
    heap.push(value);
    let index = heap.length - 1;
    let parentIndex = Math.trunc(index / 2);
    while (heap[parentIndex] > heap[index]) {
      [heap[index], heap[parentIndex]] = [heap[parentIndex], heap[index]];
      index = parentIndex;
      parentIndex = Math.trunc(index / 2);
    }

    // Returns the current root
    return heap[0];
  };

  this.extractMin = function () {
    const lastIndex = heap.length - 1;
    [heap[0], heap[lastIndex]] = [heap[lastIndex], heap[0]];
    heap.pop();

    let xIndex = 0;
    let smallerChild = heap[1] > heap[2] ? 2 : 1;

    while (heap[xIndex] > heap[smallerChild]) {
      [heap[xIndex], heap[smallerChild]] = [heap[smallerChild], heap[xIndex]];
      xIndex = smallerChild;
      smallerChild =
        heap[2 * xIndex] > heap[2 * xIndex + 1] ? 2 * xIndex + 1 : 2 * xIndex;
    }
    // Returns the new updated root
    return heap[0];
  };
};

const maxHeap = function () {
  const heap = Array();
  /**
   * Position of parent:      i/2
   * Position of left child:  2i
   * Position of right child: 2i + 1
   */

  this.getInfo = function () {
    return [heap[0], heap.length];
  };

  this.insert = function (value) {
    heap.push(value);
    let index = heap.length - 1;
    let parentIndex = Math.trunc(index / 2);
    while (heap[parentIndex] < heap[index]) {
      [heap[index], heap[parentIndex]] = [heap[parentIndex], heap[index]];
      index = parentIndex;
      parentIndex = Math.trunc(index / 2);
    }
    // Returns the current root
    return heap[0];
  };

  this.extractMax = function () {
    const lastIndex = heap.length - 1;
    [heap[0], heap[lastIndex]] = [heap[lastIndex], heap[0]];
    heap.pop();

    let xIndex = 0;
    let biggerChild = heap[1] < heap[2] ? 2 : 1;

    while (heap[xIndex] < heap[biggerChild]) {
      [heap[xIndex], heap[biggerChild]] = [heap[biggerChild], heap[xIndex]];
      xIndex = biggerChild;
      biggerChild =
        heap[2 * xIndex] < heap[2 * xIndex + 1] ? 2 * xIndex + 1 : 2 * xIndex;
    }
    // Returns the new updated root
    return heap[0];
  };
};

//------ Median maintenance function --------

async function medianMaintenance() {
  const hLow = new maxHeap();
  const hHigh = new minHeap();

  let medianSum = 0;

  const readStream = fs.createReadStream(__dirname + "/median-input.txt");
  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const newValue = Number(line);

    let [currentLow, sizeHLow] = hLow.getInfo();
    let [currentHigh, sizeHHigh] = hHigh.getInfo();

    if (sizeHLow === 0 || newValue <= currentLow) {
      currentLow = hLow.insert(newValue);
      sizeHLow += 1;
    } else {
      currentHigh = hHigh.insert(newValue);
      sizeHHigh += 1;
    }

    if (sizeHLow - sizeHHigh === 2) {
      currentHigh = hHigh.insert(currentLow);
      sizeHHigh += 1;
      currentLow = hLow.extractMax();
      sizeHLow -= 1;
    } else if (sizeHHigh - sizeHLow === 2) {
      currentLow = hLow.insert(currentHigh);
      sizeHLow += 1;
      currentHigh = hHigh.extractMin();
      sizeHHigh -= 1;
    }

    let median;
    if (sizeHHigh > sizeHLow) {
      median = currentHigh;
    } else {
      median = currentLow;
    }
    medianSum += median;
  }

  console.log(medianSum);
}

medianMaintenance();
// For the test file, sum of medians should be 29335
