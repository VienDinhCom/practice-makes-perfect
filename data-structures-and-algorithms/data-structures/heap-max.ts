import { expect } from 'jsr:@std/expect';

class MaxHeap {
  heap: (number | null)[];

  constructor() {
    this.heap = [null];
  }

  private leftChildIndex(index: number): number {
    return 2 * index;
  }

  private rightChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private parentIndex(index: number): number {
    return Math.floor(index / 2);
  }

  print() {
    return [...this.heap];
  }

  insert(item: number): void {
    this.heap.push(item);

    const heapifyUp = (index: number) => {
      const parent = this.parentIndex(index);

      if (index > 1 && this.heap[parent]! < item) {
        [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];

        heapifyUp(parent);
      }
    };

    heapifyUp(this.heap.length - 1);

    // let currentIndex = this.heap.length - 1;
    // let parentIndex = this.parentIndex(currentIndex);

    // // Bubble up the new item to maintain max-heap property
    // while (currentIndex > 1 && this.heap[currentIndex]! > this.heap[parentIndex]!) {
    //   [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];

    //   currentIndex = parentIndex;
    //   parentIndex = this.parentIndex(currentIndex);
    // }
  }

  remove(): number | null {
    if (this.heap.length === 1) {
      throw new Error('Heap is empty, cannot remove elements.');
    }

    if (this.heap.length === 2) {
      return this.heap.pop()!;
    }

    const max = this.heap[1];
    this.heap[1] = this.heap.pop()!;

    const heapify = (index: number): void => {
      let largest = index;

      // Check if the left child exists and is greater than the current largest
      const left = this.leftChildIndex(index);
      if (left < this.heap.length && this.heap[left]! > this.heap[largest]!) {
        largest = left;
      }

      // Check if the right child exists and is greater than the current largest
      const right = this.rightChildIndex(index);
      if (right < this.heap.length && this.heap[right]! > this.heap[largest]!) {
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

  peek(): number | null {
    return this.heap.length > 1 ? this.heap[1] : null;
  }

  size(): number {
    return this.heap.length - 1;
  }

  sort() {
    const temp = [...this.heap];

    const sortedArray = [];

    while (this.heap.length > 1) {
      sortedArray.unshift(this.remove());
    }

    this.heap = temp;

    return sortedArray;
  }
}

Deno.test('MaxHeap - Initialization', () => {
  const heap = new MaxHeap();
  expect(heap.print()).toStrictEqual([null]); // The heap should start with a single null element
  expect(heap.size()).toBe(0); // The size of the heap should be 0
});

Deno.test('MaxHeap - Insert and Peek', () => {
  const heap = new MaxHeap();

  heap.insert(10);
  expect(heap.peek()).toBe(10); // The max value should be 10
  expect(heap.size()).toBe(1); // Size should be 1

  heap.insert(20);
  expect(heap.peek()).toBe(20); // The max value should now be 20
  expect(heap.size()).toBe(2); // Size should be 2

  heap.insert(15);
  expect(heap.peek()).toBe(20); // Max value remains 20
  expect(heap.size()).toBe(3); // Size should be 3
});

Deno.test('MaxHeap - Remove', () => {
  const heap = new MaxHeap();

  heap.insert(10);
  heap.insert(20);
  heap.insert(15);

  expect(heap.remove()).toBe(20); // Removing the max value
  expect(heap.print()).toStrictEqual([null, 15, 10]); // Remaining heap after removal
  expect(heap.size()).toBe(2); // Size should be 2

  expect(heap.remove()).toBe(15); // Next max value
  expect(heap.print()).toStrictEqual([null, 10]); // Remaining heap after second removal
  expect(heap.size()).toBe(1); // Size should be 1

  expect(heap.remove()).toBe(10); // Last element
  expect(heap.print()).toStrictEqual([null]); // Heap is now empty
  expect(heap.size()).toBe(0); // Size should be 0

  // Test removing from an empty heap
  try {
    heap.remove();
  } catch (e) {
    expect(e).not.toBeNull();
  }
});

Deno.test('MaxHeap - Sort', () => {
  const heap = new MaxHeap();

  heap.insert(10);
  heap.insert(20);
  heap.insert(15);

  expect(heap.sort()).toStrictEqual([10, 15, 20]); // Sorted array
  expect(heap.print()).toStrictEqual([null, 20, 10, 15]); // Original heap remains unchanged
});

Deno.test('MaxHeap - Size', () => {
  const heap = new MaxHeap();
  expect(heap.size()).toBe(0); // Initially, size is 0

  heap.insert(10);
  expect(heap.size()).toBe(1); // Size increases to 1

  heap.insert(20);
  expect(heap.size()).toBe(2); // Size increases to 2

  heap.remove();
  expect(heap.size()).toBe(1); // Size decreases to 1 after a removal
});

Deno.test('MaxHeap - Edge Cases', () => {
  const heap = new MaxHeap();

  expect(heap.peek()).toBe(null); // Peek on an empty heap should return null

  try {
    heap.remove();
  } catch (e) {
    expect(e).not.toBeNull();
  }

  heap.insert(5);
  expect(heap.sort()).toStrictEqual([5]); // Sorting a single-element heap should return the same element
});
