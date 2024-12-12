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
      let prev = this.head;
      let current = this.head?.next;

      while (current) {
        if (current.element === element) {
          prev!.next = current.next;
          this.length--;
          return;
        }

        prev = current;
        current = current.next;
      }
    }
  }

  isEmpty() {
    return this.length === 0;
  }

  indexOf = (element: T) => {
    let index = 0;
    let current = this.head;

    while (current) {
      if (current.element === element) {
        return index;
      }

      index++;
      current = current.next;
    }

    return -1;
  };

  elementAt(at: number) {
    let index = 0;
    let current = this.head;

    while (current) {
      if (at === index) {
        return current.element;
      }

      index++;
      current = current.next;
    }
  }

  addAt(at: number, element: T) {
    const node = new Node(element);

    if (at === 0) {
      node.next = this.head;
      this.head = node;
      this.length++;
    } else {
      let index = 1;
      let prev = this.head;
      let current = this.head?.next;

      while (current) {
        if (at === index) {
          node.next = current;
          prev!.next = node;

          this.length++;

          return;
        }

        index++;
        prev = current;
        current = current.next;
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
