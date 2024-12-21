class MinHeap {
  constructor() {
    this.heap = [null];
  }

  static isSorted(a) {
    for (let i = 0; i < a.length - 1; i++) {
      if (a[i] > a[i + 1]) {
        return false;
      }
    }
    return true;
  }

  static createRandomArray(size = 5) {
    const a = new Array(size);
    for (let i = 0; i < size; i++) {
      a[i] = Math.floor(Math.random() * 100);
    }
    return a;
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

    const heapify = (index) => {
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

        heapify(smallest);
      }
    };

    heapify(1);

    return item;
  }
}
