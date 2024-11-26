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
  length: number;
  head: Node<T> | null;

  constructor() {
    this.length = 0;
    this.head = null;
  }

  add(element: T) {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    this.length++;
  }

  remove(element: T) {
    if (this.head?.element === element) {
      this.head = this.head.next;

      this.length--;
    } else {
      let previous = this.head!;
      let current = this.head?.next;

      while (current) {
        if (current.element === element) {
          previous.next = current.next;

          this.length--;

          return;
        }

        previous = current;
        current = current.next;
      }
    }
  }

  isEmpty() {
    return this.length === 0;
  }

  indexOf = (element: T) => {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.element === element) {
        return index;
      }

      current = current.next;
      index++;
    }

    return -1;
  };

  elementAt(at: number) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (index === at) {
        return current.element;
      }

      current = current.next;
      index++;
    }
  }

  addAt(at: number, element: T) {
    if (at === 0) {
      const node = new Node(element);
      node.next = this.head;
      this.head = node;
      this.length++;
    } else {
      let previous = this.head!;
      let current = previous?.next;
      let index = 1;

      while (current) {
        if (index === at) {
          const node = new Node(element);

          previous.next = node;
          node.next = current;

          this.length++;

          return;
        }

        previous = current;
        current = current.next;
        index++;
      }
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
