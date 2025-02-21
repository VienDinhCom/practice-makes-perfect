import { expect } from 'jsr:@std/expect';

// https://viendinh.com/posts/zzzb-ngan-xep/

class Stack<T> {
  items: T[];

  constructor() {
    this.items = [];
  }

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// https://www.w3schools.com/dsa/dsa_data_stacks.php

Deno.test('push adds elements and increases size', () => {
  const stack = new Stack<number>();

  stack.push(10);
  stack.push(20);

  expect(stack.size()).toStrictEqual(2);
});

Deno.test('pop removes elements and decreases size', () => {
  const stack = new Stack<number>();

  stack.push(10);
  stack.push(20);

  expect(stack.pop()).toStrictEqual(20); // Last in, first out
  expect(stack.size()).toStrictEqual(1);
  expect(stack.pop()).toStrictEqual(10);
  expect(stack.size()).toStrictEqual(0);
});

Deno.test('peek returns the top element without modifying the stack', () => {
  const stack = new Stack<number>();

  stack.push(10);
  stack.push(20);

  expect(stack.peek()).toStrictEqual(20); // Should return the top element
  expect(stack.size()).toStrictEqual(2); // Size should remain unchanged
});

Deno.test('isEmpty returns true for a new stack or after all elements are popped', () => {
  const stack = new Stack<number>();

  expect(stack.isEmpty()).toStrictEqual(true);

  stack.push(10);
  expect(stack.isEmpty()).toStrictEqual(false);

  stack.pop();
  expect(stack.isEmpty()).toStrictEqual(true);
});

Deno.test('pop on an empty stack returns undefined', () => {
  const stack = new Stack<number>();

  expect(stack.pop()).toStrictEqual(undefined); // Popping an empty stack should return undefined
});

Deno.test('peek on an empty stack returns undefined', () => {
  const stack = new Stack<number>();

  expect(stack.peek()).toStrictEqual(undefined); // Peeking at an empty stack should return undefined
});
