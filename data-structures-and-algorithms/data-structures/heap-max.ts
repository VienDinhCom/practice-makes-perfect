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

    let currentIndex = this.heap.length - 1;
    let parentIndex = this.parentIndex(currentIndex);

    // Bubble up the new item to maintain max-heap property
    while (currentIndex > 1 && this.heap[currentIndex]! > this.heap[parentIndex]!) {
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];

      currentIndex = parentIndex;
      parentIndex = this.parentIndex(currentIndex);
    }
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
}

Deno.test('MaxHeap: Insert and Peek', () => {
  const heap = new MaxHeap();

  heap.insert(10);
  expect(heap.peek()).toStrictEqual(10);

  heap.insert(20);
  expect(heap.peek()).toStrictEqual(20); // Max-heap property: root should be the max element

  heap.insert(5);
  expect(heap.peek()).toStrictEqual(20);
});

Deno.test('MaxHeap: Remove', () => {
  const heap = new MaxHeap();

  heap.insert(10);
  heap.insert(20);
  heap.insert(15);

  expect(heap.remove()).toStrictEqual(20); // Remove max
  expect(heap.print()).toStrictEqual([null, 15, 10]); // Ensure heap structure is maintained

  expect(heap.remove()).toStrictEqual(15);
  expect(heap.remove()).toStrictEqual(10);

  // Test removing from empty heap
  expect(() => heap.remove()).toThrow('Heap is empty, cannot remove elements.');
});

Deno.test('MaxHeap: Peek', () => {
  const heap = new MaxHeap();

  expect(heap.peek()).toStrictEqual(null); // Empty heap

  heap.insert(30);
  expect(heap.peek()).toStrictEqual(30);

  heap.insert(40);
  expect(heap.peek()).toStrictEqual(40);
});

Deno.test('MaxHeap: Size', () => {
  const heap = new MaxHeap();

  expect(heap.size()).toStrictEqual(0);

  heap.insert(5);
  expect(heap.size()).toStrictEqual(1);

  heap.insert(15);
  expect(heap.size()).toStrictEqual(2);

  heap.remove();
  expect(heap.size()).toStrictEqual(1);
});

Deno.test('MaxHeap: Print', () => {
  const heap = new MaxHeap();

  heap.insert(50);
  heap.insert(20);
  heap.insert(30);

  expect(heap.print()).toStrictEqual([null, 50, 20, 30]); // Verify internal heap structure
});
