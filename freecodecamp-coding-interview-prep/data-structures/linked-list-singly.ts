import { expect } from 'jsr:@std/expect';

class Node<T> {
  element: T;
  next: Node<T> | null;

  constructor(element: T) {
    this.element = element;
    this.next = null;
  }
}

class SinglyLinkedList<T> {
  private head: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.length = 0;
  }

  add(element: T): void {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    } else {
      let curr: Node<T> | null = this.head;

      while (curr.next) {
        curr = curr.next;
      }

      curr.next = node;
    }

    this.length++;
  }

  remove(element: T): void {
    let prev: Node<T> | null = null;
    let curr: Node<T> | null = this.head;

    while (curr) {
      if (curr.element === element) {
        if (curr === this.head) {
          this.head = curr.next;
        } else {
          prev!.next = curr.next;
        }

        this.length--;

        return;
      }

      prev = curr;
      curr = curr.next;
    }
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  indexOf = (element: T): number => {
    let index: number = 0;
    let current: Node<T> | null = this.head;

    while (current) {
      if (current.element === element) {
        return index;
      }

      index++;

      current = current.next;
    }

    return -1;
  };

  elementAt(at: number): T | undefined {
    let index: number = 0;
    let curr: Node<T> | null = this.head;

    while (curr) {
      if (index === at) {
        return curr.element;
      }

      index++;
      curr = curr.next;
    }
  }

  addAt(at: number, element: T) {
    const node = new Node(element);

    let index: number = 0;
    let prev: Node<T> | null = null;
    let curr: Node<T> | null = this.head;

    while (curr) {
      if (index === at) {
        if (curr === this.head) {
          node.next = this.head;
          this.head = node;
        } else {
          prev!.next = node;
          node.next = curr;
        }

        this.length++;
      }

      index++;
      prev = curr;
      curr = curr.next;
    }
  }
}

Deno.test('add elements', () => {
  const list = new SinglyLinkedList<number>();
  list.add(10);
  list.add(20);
  list.add(30);

  expect(list.length).toStrictEqual(3);
  expect(list.elementAt(0)).toStrictEqual(10);
  expect(list.elementAt(1)).toStrictEqual(20);
  expect(list.elementAt(2)).toStrictEqual(30);
});

Deno.test('remove elements', () => {
  const list = new SinglyLinkedList<number>();
  list.add(10);
  list.add(20);
  list.add(30);
  list.remove(20);

  expect(list.length).toStrictEqual(2);
  expect(list.indexOf(20)).toStrictEqual(-1);
  expect(list.elementAt(1)).toStrictEqual(30);
});

Deno.test('check if empty', () => {
  const list = new SinglyLinkedList<number>();

  expect(list.isEmpty()).toStrictEqual(true);

  list.add(10);

  expect(list.isEmpty()).toStrictEqual(false);
});

Deno.test('indexOf', () => {
  const list = new SinglyLinkedList<number>();
  list.add(10);
  list.add(20);
  list.add(30);

  expect(list.indexOf(10)).toStrictEqual(0);
  expect(list.indexOf(20)).toStrictEqual(1);
  expect(list.indexOf(40)).toStrictEqual(-1);
});

Deno.test('elementAt', () => {
  const list = new SinglyLinkedList<number>();
  list.add(10);
  list.add(20);
  list.add(30);

  expect(list.elementAt(0)).toStrictEqual(10);
  expect(list.elementAt(2)).toStrictEqual(30);
  expect(list.elementAt(3)).toStrictEqual(undefined);
});

Deno.test('addAt', () => {
  const list = new SinglyLinkedList<number>();

  list.add(10);
  list.add(20);
  list.add(30);

  list.addAt(1, 15);

  expect(list.length).toStrictEqual(4);
  expect(list.elementAt(1)).toStrictEqual(15);
  expect(list.elementAt(2)).toStrictEqual(20);
});

Deno.test('addAt at head', () => {
  const list = new SinglyLinkedList<number>();
  list.add(20);
  list.add(30);

  list.addAt(0, 10);

  expect(list.length).toStrictEqual(3);
  expect(list.elementAt(0)).toStrictEqual(10);
  expect(list.elementAt(1)).toStrictEqual(20);
});

Deno.test('addAt out of bounds', () => {
  const list = new SinglyLinkedList<number>();
  list.add(10);

  list.addAt(5, 20); // Out of bounds; should do nothing

  expect(list.length).toStrictEqual(1);
  expect(list.indexOf(20)).toStrictEqual(-1);
});
