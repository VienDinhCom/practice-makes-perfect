import { expect } from 'jsr:@std/expect';

// https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/create-a-circular-queue

class CircularQueue<T> {
  private items: Array<T | null>;
  private read: number;
  private write: number;
  private max: number;

  constructor(size: number) {
    this.items = new Array(size).fill(null);

    // Indices
    this.read = 0;
    this.write = 0;
    this.max = size - 1;
  }

  enqueue(item: T) {
    // isFull
    if (this.items[this.write] !== null) return null;

    this.items[this.write] = item;

    if (this.write >= this.max) {
      this.write = 0;
    } else {
      this.write++;
    }

    return item;
  }

  dequeue() {
    // isEmpty
    if (this.items[this.read] === null) return null;

    const item = this.items[this.read];

    this.items[this.read] = null;

    this.read = this.read >= this.max ? 0 : this.read + 1;

    return item;
  }
}

Deno.test('CircularQueue: Enqueue and Dequeue basic functionality', () => {
  const queue = new CircularQueue<number>(5);

  // Enqueue elements
  expect(queue.enqueue(1)).toStrictEqual(1);
  expect(queue.enqueue(2)).toStrictEqual(2);

  // Dequeue elements
  expect(queue.dequeue()).toStrictEqual(1);
  expect(queue.dequeue()).toStrictEqual(2);

  // Dequeue from an empty queue
  expect(queue.dequeue()).toStrictEqual(null);
});

Deno.test('CircularQueue: Overwriting when full', () => {
  const queue = new CircularQueue<number>(3);

  // Fill the queue
  expect(queue.enqueue(1)).toStrictEqual(1);
  expect(queue.enqueue(2)).toStrictEqual(2);
  expect(queue.enqueue(3)).toStrictEqual(3);

  // Attempt to enqueue when full
  expect(queue.enqueue(4)).toStrictEqual(null);

  // Dequeue and enqueue again to test circular behavior
  expect(queue.dequeue()).toStrictEqual(1);
  expect(queue.enqueue(4)).toStrictEqual(4);

  // Dequeue remaining elements
  expect(queue.dequeue()).toStrictEqual(2);
  expect(queue.dequeue()).toStrictEqual(3);
  expect(queue.dequeue()).toStrictEqual(4);
  expect(queue.dequeue()).toStrictEqual(null);
});

Deno.test('CircularQueue: Edge case - boundary conditions', () => {
  const queue = new CircularQueue<number>(3);

  // Enqueue and dequeue at boundaries
  expect(queue.enqueue(1)).toStrictEqual(1);
  expect(queue.enqueue(2)).toStrictEqual(2);
  expect(queue.enqueue(3)).toStrictEqual(3);

  // Dequeue all to reset positions
  expect(queue.dequeue()).toStrictEqual(1);
  expect(queue.dequeue()).toStrictEqual(2);
  expect(queue.dequeue()).toStrictEqual(3);

  // Test circular wrapping
  expect(queue.enqueue(4)).toStrictEqual(4);
  expect(queue.enqueue(5)).toStrictEqual(5);
  expect(queue.dequeue()).toStrictEqual(4);
  expect(queue.enqueue(6)).toStrictEqual(6);
  expect(queue.dequeue()).toStrictEqual(5);
  expect(queue.dequeue()).toStrictEqual(6);
  expect(queue.dequeue()).toStrictEqual(null);
});

Deno.test('CircularQueue: Handling multiple wraparounds', () => {
  const queue = new CircularQueue<number>(4);

  // Perform multiple enqueue and dequeue operations
  expect(queue.enqueue(1)).toStrictEqual(1);
  expect(queue.enqueue(2)).toStrictEqual(2);
  expect(queue.enqueue(3)).toStrictEqual(3);
  expect(queue.dequeue()).toStrictEqual(1);
  expect(queue.enqueue(4)).toStrictEqual(4);
  expect(queue.enqueue(5)).toStrictEqual(5);
  expect(queue.dequeue()).toStrictEqual(2);
  expect(queue.dequeue()).toStrictEqual(3);
  expect(queue.enqueue(6)).toStrictEqual(6);
  expect(queue.enqueue(7)).toStrictEqual(7);
  expect(queue.dequeue()).toStrictEqual(4);
  expect(queue.dequeue()).toStrictEqual(5);
  expect(queue.dequeue()).toStrictEqual(6);
  expect(queue.dequeue()).toStrictEqual(7);
  expect(queue.dequeue()).toStrictEqual(null);
});
