import { expect } from 'jsr:@std/expect';

// https://www.youtube.com/watch?v=0wPlzMU-k00

class MinHeap {
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

  // Thêm vào cuối mảng sau đó đưa về đúng vị trí
  insert(value: number) {
    this.heap.push(value);

    const bubbleUp = (currentIndex: number) => {
      const parentIndex = this.parentIndex(currentIndex);

      const parent = this.heap[parentIndex]!;
      const current = this.heap[currentIndex]!;

      if (parentIndex > 0 && parent > current) {
        [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];

        bubbleUp(parentIndex);
      }
    };

    bubbleUp(this.heap.length - 1);
  }

  remove(): number {
    if (this.heap.length === 1) throw new Error('Heap is empty, cannot remove elements.');
    if (this.heap.length === 2) return this.heap.pop()!;

    const value = this.heap[1]!;

    this.heap[1] = this.heap.pop()!;

    const bubbleDown = (currentIndex: number) => {
      const leftIndex = this.leftChildIndex(currentIndex);
      const rightIndex = this.rightChildIndex(currentIndex);

      let smallestIndex = currentIndex;

      if (leftIndex < this.heap.length && this.heap[leftIndex]! < this.heap[smallestIndex]!) {
        smallestIndex = leftIndex;
      }

      if (rightIndex < this.heap.length && this.heap[rightIndex]! < this.heap[smallestIndex]!) {
        smallestIndex = rightIndex;
      }

      if (smallestIndex !== currentIndex) {
        [this.heap[currentIndex], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[currentIndex]];

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

  sort() {
    const temp = [...this.heap];

    const result: number[] = [];

    while (this.heap.length > 1) {
      result.push(this.remove()!);
    }

    this.heap = temp;

    return result;
  }
}

Deno.test('MinHeap - insert method', () => {
  const heap = new MinHeap();

  heap.insert(5);
  heap.insert(3);
  heap.insert(8);
  heap.insert(1);

  expect(heap.print()).toStrictEqual([null, 1, 3, 8, 5]);
});

Deno.test('MinHeap - remove method', () => {
  const heap = new MinHeap();

  heap.insert(10);
  heap.insert(15);
  heap.insert(20);
  heap.insert(17);

  const removed = heap.remove();

  expect(removed).toBe(10);
  expect(heap.print()).toStrictEqual([null, 15, 17, 20]);
});

Deno.test('MinHeap - peek method', () => {
  const heap = new MinHeap();

  expect(heap.peek()).toBe(null);

  heap.insert(6);
  heap.insert(4);
  heap.insert(7);

  expect(heap.peek()).toBe(4);
});

Deno.test('MinHeap - size method', () => {
  const heap = new MinHeap();

  expect(heap.size()).toBe(0);

  heap.insert(12);
  heap.insert(8);

  expect(heap.size()).toBe(2);

  heap.remove();

  expect(heap.size()).toBe(1);
});

Deno.test('MinHeap - sort method', () => {
  const heap = new MinHeap();

  heap.insert(3);
  heap.insert(1);
  heap.insert(4);
  heap.insert(2);

  const sorted = heap.sort();

  expect(sorted).toStrictEqual([1, 2, 3, 4]);

  // Ensure heap structure remains intact after sort
  expect(heap.print()).toStrictEqual([null, 1, 2, 4, 3]);
});

Deno.test('MinHeap - remove throws error on empty heap', () => {
  const heap = new MinHeap();

  expect(() => heap.remove()).toThrow('Heap is empty, cannot remove elements.');
});
