import { expect } from 'jsr:@std/expect';

class PriorityQueue<T> {
  private items: { value: T; priority: number }[];

  constructor() {
    this.items = [];
  }

  enqueue(value: T, priority: number): void {
    // this.items.push({ value, priority });
    // this.items.sort((a, b) => a.priority - b.priority);

    const index = this.items.findIndex((item) => item.priority > priority);

    if (index === -1) {
      this.items.push({ value, priority });
    } else {
      this.items.splice(index, 0, { value, priority });
    }
  }

  dequeue(): T | undefined {
    const item = this.items.shift();

    return item ? item.value : undefined;
  }

  front(): T | undefined {
    const item = this.items[0];

    return item ? item.value : undefined;
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/create-a-priority-queue-class

Deno.test('PriorityQueue: enqueue adds elements with correct priorities', () => {
  const queue = new PriorityQueue<number>();

  queue.enqueue(10, 2);
  queue.enqueue(20, 1);
  queue.enqueue(30, 3);

  expect(queue.size()).toStrictEqual(3);
  expect(queue.front()).toStrictEqual(20); // Element with highest priority
});

Deno.test('PriorityQueue: dequeue removes elements in correct priority order', () => {
  const queue = new PriorityQueue<number>();

  queue.enqueue(10, 2);
  queue.enqueue(20, 1);
  queue.enqueue(30, 3);

  expect(queue.dequeue()).toStrictEqual(20); // Highest priority (lowest number)
  expect(queue.dequeue()).toStrictEqual(10); // Next highest priority
  expect(queue.dequeue()).toStrictEqual(30); // Last item
  expect(queue.isEmpty()).toStrictEqual(true);
});

Deno.test('PriorityQueue: front returns the item with the highest priority', () => {
  const queue = new PriorityQueue<number>();

  queue.enqueue(10, 2);
  queue.enqueue(20, 1);

  expect(queue.front()).toStrictEqual(20); // Element with highest priority
  queue.dequeue();
  expect(queue.front()).toStrictEqual(10); // New element with highest priority
});

Deno.test('PriorityQueue: size returns correct number of elements', () => {
  const queue = new PriorityQueue<number>();

  expect(queue.size()).toStrictEqual(0); // Initially empty

  queue.enqueue(10, 1);
  queue.enqueue(20, 2);

  expect(queue.size()).toStrictEqual(2);

  queue.dequeue();
  expect(queue.size()).toStrictEqual(1);
});

Deno.test('PriorityQueue: isEmpty works correctly', () => {
  const queue = new PriorityQueue<number>();

  expect(queue.isEmpty()).toStrictEqual(true); // Initially empty

  queue.enqueue(10, 1);
  expect(queue.isEmpty()).toStrictEqual(false);

  queue.dequeue();
  expect(queue.isEmpty()).toStrictEqual(true);
});

Deno.test('PriorityQueue: dequeue on empty queue returns undefined', () => {
  const queue = new PriorityQueue<number>();

  expect(queue.dequeue()).toStrictEqual(undefined);
});

Deno.test('PriorityQueue: front on empty queue returns undefined', () => {
  const queue = new PriorityQueue<number>();

  expect(queue.front()).toStrictEqual(undefined);
});
