import { expect } from 'jsr:@std/expect';

// Review
class Queue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  front(): T | undefined {
    return this.items[0];
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// https://www.w3schools.com/dsa/dsa_algo_insertionsort.php

Deno.test('enqueue adds elements and increases size', () => {
  const queue = new Queue<number>();

  queue.enqueue(10);
  queue.enqueue(20);
  queue.enqueue(30);

  expect(queue.size()).toStrictEqual(3);
});

Deno.test('dequeue removes elements in FIFO order', () => {
  const queue = new Queue<number>();

  queue.enqueue(10);
  queue.enqueue(20);
  queue.enqueue(30);

  expect(queue.dequeue()).toStrictEqual(10);
  expect(queue.dequeue()).toStrictEqual(20);
  expect(queue.dequeue()).toStrictEqual(30);
  expect(queue.dequeue()).toStrictEqual(undefined); // Queue is now empty
});

Deno.test('front returns the first element without removing it', () => {
  const queue = new Queue<number>();

  queue.enqueue(10);
  queue.enqueue(20);

  expect(queue.front()).toStrictEqual(10); // First element is 10
  expect(queue.size()).toStrictEqual(2); // Size remains unchanged
});

Deno.test('isEmpty returns true for empty queue and false for non-empty queue', () => {
  const queue = new Queue<number>();

  expect(queue.isEmpty()).toStrictEqual(true); // Queue is initially empty
  queue.enqueue(10);
  expect(queue.isEmpty()).toStrictEqual(false); // Queue is no longer empty
  queue.dequeue();
  expect(queue.isEmpty()).toStrictEqual(true); // Queue is empty again
});

Deno.test('size reflects the correct number of elements', () => {
  const queue = new Queue<number>();

  expect(queue.size()).toStrictEqual(0); // Initial size is 0

  queue.enqueue(10);
  expect(queue.size()).toStrictEqual(1); // Size increases to 1

  queue.enqueue(20);
  expect(queue.size()).toStrictEqual(2); // Size increases to 2

  queue.dequeue();
  expect(queue.size()).toStrictEqual(1); // Size decreases to 1 after dequeue

  queue.dequeue();
  expect(queue.size()).toStrictEqual(0); // Size decreases to 0, queue is empty
});
