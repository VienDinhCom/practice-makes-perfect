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

  insert(value: number) {
    this.heap.push(value);

    const heapifyUp = (current: number) => {
      const parent = this.parentIndex(current);

      if (current > 1 && this.heap[parent]! > this.heap[current]!) {
        [this.heap[current], this.heap[parent]] = [this.heap[parent], this.heap[current]];

        heapifyUp(parent);
      }
    };

    heapifyUp(this.heap.length - 1);

    // let current = this.heap.length - 1;
    // let parent = this.parentIndex(current);

    // while (current > 1 && this.heap[parent]! > this.heap[current]!) {
    //   [this.heap[current], this.heap[parent]] = [this.heap[parent], this.heap[current]];

    //   current = parent;
    //   parent = this.parentIndex(current);
    // }
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

    const heapifyDown = (current: number) => {
      const left = this.leftChildIndex(current);

      if (current < this.heap.length && this.heap[left]! < this.heap[current]!) {
        [this.heap[current], this.heap[left]] = [this.heap[left], this.heap[current]];

        heapifyDown(left);

        return;
      }

      const right = this.rightChildIndex(current);

      if (current < this.heap.length && this.heap[right]! < this.heap[current]!) {
        [this.heap[current], this.heap[right]] = [this.heap[right], this.heap[current]];

        heapifyDown(right);

        return;
      }
    };

    heapifyDown(1);

    return result;
  }

  peek(): number | null {
    return this.heap.length > 1 ? this.heap[1] : null;
  }

  size(): number {
    return this.heap.length - 1;
  }

  sort() {
    const temp = this.heap.concat([]);

    const values: number[] = [];

    while (this.heap.length > 1) {
      values.push(this.remove()!);
    }

    this.heap = temp;

    return values;
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
