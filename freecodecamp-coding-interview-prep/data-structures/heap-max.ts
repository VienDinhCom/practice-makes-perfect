import { expect } from 'jsr:@std/expect';

// https://www.youtube.com/watch?v=0wPlzMU-k00

class MaxHeap {
  heap: (number | null)[];

  constructor() {
    this.heap = [null];
  }

  private leftChildIndex(index: number): number {
    return index * 2;
  }

  private rightChildIndex(index: number): number {
    return index * 2 + 1;
  }

  private parentIndex(index: number): number {
    return Math.floor(index / 2);
  }

  print() {
    return [...this.heap];
  }

  // https://media.geeksforgeeks.org/wp-content/uploads/20230901130152/Insertion-In-Max-Heap.png
  insert(value: number) {
    this.heap.push(value);

    const bubbleUp = (currentIndex: number) => {
      const parentIndex = this.parentIndex(currentIndex);

      const current = this.heap[currentIndex]!;
      const parent = this.heap[parentIndex]!;

      if (currentIndex > 1 && parent < current) {
        [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];

        bubbleUp(parentIndex);
      }
    };

    bubbleUp(this.heap.length - 1);
  }

  remove() {
    if (this.heap.length === 1) {
      throw new Error('Heap is empty, cannot remove elements.');
    }

    if (this.heap.length === 2) {
      return this.heap.pop();
    }

    const result = this.heap[1];

    this.heap[1] = this.heap.pop()!;

    const bubbleDown = (current: number) => {
      const left = this.leftChildIndex(current);
      const right = this.rightChildIndex(current);

      let largest = current;

      if (left < this.heap.length && this.heap[left]! > this.heap[largest]!) {
        largest = left;
      }

      if (right < this.heap.length && this.heap[right]! > this.heap[largest]!) {
        largest = right;
      }

      if (largest !== current) {
        [this.heap[current], this.heap[largest]] = [this.heap[largest], this.heap[current]];

        bubbleDown(right);
      }
    };

    bubbleDown(1);

    return result;
  }
  peek(): number | null {
    return this.heap.length > 1 ? this.heap[1] : null;
  }

  size(): number {
    return this.heap.length - 1;
  }

  sort(): number[] {
    const temp = [...this.heap];

    const result: number[] = [];

    while (this.heap.length > 1) {
      result.unshift(this.remove()!);
    }

    this.heap = temp;

    return result;
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
