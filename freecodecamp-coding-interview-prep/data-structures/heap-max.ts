import { expect } from 'jsr:@std/expect';

// https://www.youtube.com/watch?v=0wPlzMU-k00

class MaxHeap {
  heap: (null | number)[] = [];

  constructor() {
    this.heap = [null];
  }

  private leftChildIndex(index: number) {
    return index * 2;
  }

  private rightChildIndex(index: number) {
    return index * 2 + 1;
  }

  private parentIndex(index: number) {
    return Math.floor(index / 2);
  }

  print() {
    return [...this.heap];
  }

  // https://media.geeksforgeeks.org/wp-content/uploads/20230901130152/Insertion-In-Max-Heap.png

  // Thêm vào cuối mảng sau đó đưa về đúng vị trí
  insert(value: number) {
    this.heap.push(value);

    let currentIndex = this.heap.length - 1;
    let parentIndex = this.parentIndex(currentIndex);

    while (parentIndex > 0 && this.heap[currentIndex]! > this.heap[parentIndex]!) {
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];

      currentIndex = parentIndex;
      parentIndex = this.parentIndex(currentIndex);
    }
  }

  // Lấy phần tử cuối mảng đem về đầu, rồi đẩy xuống
  remove(): number {
    if (this.heap.length === 1) throw new Error('Heap is empty, cannot remove elements.');
    if (this.heap.length === 2) return this.heap.pop()!;

    const value = this.heap[1]!;

    this.heap[1] = this.heap.pop()!;

    const bubbleDown = (currentIndex: number) => {
      const leftIndex = this.leftChildIndex(currentIndex);
      const rightIndex = this.rightChildIndex(currentIndex);

      let smallestIndex = currentIndex;

      if (leftIndex < this.heap.length && this.heap[currentIndex]! < this.heap[leftIndex]!) {
        smallestIndex = leftIndex;
      }

      if (rightIndex < this.heap.length && this.heap[currentIndex]! < this.heap[rightIndex]!) {
        smallestIndex = rightIndex;
      }

      if (smallestIndex !== currentIndex) {
        [this.heap[smallestIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[smallestIndex]];

        bubbleDown(smallestIndex);
      }
    };

    bubbleDown(1);

    return value;
  }

  peek(): number | null {
    return this.heap.length > 1 ? this.heap[1] : null;
  }

  size(): number {
    return this.heap.length - 1;
  }

  sort(): number[] {
    const values: number[] = [];

    const temp = [...this.heap];

    while (this.heap.length > 1) {
      values.unshift(this.remove());
    }

    this.heap = temp;

    return values;
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
