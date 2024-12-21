class MinHeap {
  constructor() {
    this.heap = [null];
  }

  leftChildIndex(index) {
    return 2 * index;
  }

  rightChildIndex(index) {
    return 2 * index + 1;
  }

  parentIndex(index) {
    return Math.floor(index / 2);
  }

  insert(item) {
    this.heap.push(item);

    let current = this.heap.length - 1;
    let parent = this.parentIndex(current);

    while (current > 1 && this.heap[current] < this.heap[parent]) {
      [this.heap[current], this.heap[parent]] = [this.heap[parent], this.heap[current]];

      current = parent;
      parent = this.parentIndex(current);
    }
  }

  remove() {
    if (this.heap.length === 1) {
      throw new Error('Heap is empty, cannot remove elements.');
    }

    if (this.heap.length === 2) {
      return this.heap.pop();
    }

    const item = this.heap[1];

    this.heap[1] = this.heap.pop();

    const heapifyDown = (index) => {
      const left = this.leftChildIndex(index);
      const right = this.rightChildIndex(index);

      let smallest = index;

      if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }

      if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];

        heapifyDown(smallest);
      }
    };

    heapifyDown(1);

    return item;
  }

  sort() {
    const temp = [...this.heap];

    const sortedArray = [];

    while (this.heap.length > 1) {
      sortedArray.push(this.remove());
    }

    this.heap = temp;

    return sortedArray;
  }
}
