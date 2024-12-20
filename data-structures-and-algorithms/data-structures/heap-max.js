class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  print() {
    return [...this.heap];
  }

  leftChildIndex(i) {
    return 2 * i;
  }

  rightChildIndex(i) {
    return 2 * i + 1;
  }

  parentIndex(i) {
    return Math.floor(i / 2);
  }

  // Method to insert a new item into the heap
  insert(item) {
    this.heap.push(item);

    let currentIndex = this.heap.length - 1;
    let parentIndex = this.parentIndex(currentIndex);

    // Bubble up the new item to maintain max-heap property
    while (currentIndex > 1 && this.heap[currentIndex] > this.heap[parentIndex]) {
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];

      currentIndex = parentIndex;
      parentIndex = this.parentIndex(currentIndex);
    }
  }

  remove() {
    if (this.heap.length === 1) {
      return null;
    }

    const max = this.heap[1];

    if (this.heap.length === 2) {
      return this.heap.pop();
    }

    this.heap[1] = this.heap.pop();

    const heapify = (index) => {
      let largest = index;
      const left = this.leftChildIndex(index);
      const right = this.rightChildIndex(index);

      // Check if the left child exists and is greater than the current largest
      if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
        largest = left;
      }

      // Check if the right child exists and is greater than the current largest
      if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
        largest = right;
      }

      // If the largest index is not the current index, swap and continue heapifying
      if (largest !== index) {
        [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
        heapify(largest);
      }
    };

    heapify(1);

    return max;
  }
}
