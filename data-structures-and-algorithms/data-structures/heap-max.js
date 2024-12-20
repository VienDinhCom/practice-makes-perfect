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
}
