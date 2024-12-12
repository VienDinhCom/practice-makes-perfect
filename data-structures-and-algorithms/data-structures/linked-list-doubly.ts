import { expect } from 'jsr:@std/expect';

class Node<T> {
  prev: Node<T> | null;
  data: T;
  next: Node<T> | null;

  constructor(data: T) {
    this.prev = null;
    this.data = data;
    this.next = null;
  }
}

class DoublyLinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(data: T) {
    const node = new Node(data);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      node.prev = this.tail;

      this.tail = node;
    }
  }

  remove(data: T) {
    if (this.head?.data === data) {
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head!.prev = null;
      }
    } else {
      let prev = this.head;
      let current = this.head?.next;

      while (current) {
        if (current.data === data) {
          if (current === this.tail) {
            this.tail = this.tail.prev;
            this.tail!.next = null;
          } else {
            prev!.next = current.next;
            current.next!.prev = prev;
          }

          return;
        }

        prev = current;
        current = current.next;
      }
    }
  }

  reverse() {
    this.head = this.tail;

    let current = this.head;

    while (current) {
      if (current.next) {
        this.tail = current;
      }

      [current.next, current.prev] = [current.prev, current.next];

      current = current.next;
    }
  }

  // reverse() {
  //   let left = this.head;
  //   let right = this.tail;

  //   while (left !== right && left?.prev !== right) {
  //     const temp = { ...left };

  //     left!.data = right!.data;
  //     right!.data = temp.data!;

  //     left = left!.next;
  //     right = right!.prev;
  //   }
  // }

  values(): T[] {
    const values: T[] = [];

    let current = this.tail;

    while (current) {
      values.unshift(current.data);

      current = current.prev;
    }

    return values;
  }
}

Deno.test('add method', async (t) => {
  await t.step('should add first element to an empty list', () => {
    const list = new DoublyLinkedList<number>();

    list.add(5);

    expect(list.head?.data).toStrictEqual(5);
    expect(list.tail?.data).toStrictEqual(5);
    expect(list.head?.prev).toBeNull();
    expect(list.head?.next).toBeNull();
  });

  await t.step('should add multiple elements', () => {
    const list = new DoublyLinkedList<number>();
    list.add(1);
    list.add(2);
    list.add(3);

    expect(list.head?.data).toStrictEqual(1);
    expect(list.tail?.data).toStrictEqual(3);
    expect(list.head?.next?.data).toStrictEqual(2);
    expect(list.tail?.prev?.data).toStrictEqual(2);
  });

  await t.step('should correctly set prev and next pointers', () => {
    const list = new DoublyLinkedList<number>();
    list.add(1);
    list.add(2);
    list.add(3);

    expect(list.head?.next?.prev?.data).toStrictEqual(1);
    expect(list.tail?.prev?.next?.data).toStrictEqual(3);
  });
});

Deno.test('values method', () => {
  const list = new DoublyLinkedList<number>();

  list.add(5);
  list.add(2);
  list.add(9);

  expect(list.values()).toStrictEqual([5, 2, 9]);
});

Deno.test('remove method', async (t) => {
  await t.step('should remove element from single-element list', () => {
    const list = new DoublyLinkedList<number>();

    list.add(5);
    list.remove(5);

    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  await t.step('should remove head element', () => {
    const list = new DoublyLinkedList<number>();
    list.add(1);
    list.add(2);
    list.add(3);
    list.remove(1);

    expect(list.head?.data).toStrictEqual(2);
    expect(list.head?.prev).toBeNull();
  });

  await t.step('should remove tail element', () => {
    const list = new DoublyLinkedList<number>();
    list.add(1);
    list.add(2);
    list.add(3);
    list.remove(3);

    expect(list.tail?.data).toStrictEqual(2);
    expect(list.tail?.next).toBeNull();
  });

  await t.step('should remove middle element', () => {
    const list = new DoublyLinkedList<number>();
    list.add(1);
    list.add(2);
    list.add(3);
    list.remove(2);

    expect(list.head?.next?.data).toStrictEqual(3);
    expect(list.tail?.prev?.data).toStrictEqual(1);
  });

  await t.step('should handle removing non-existent element', () => {
    const list = new DoublyLinkedList<number>();
    list.add(1);
    list.add(2);
    list.remove(3);

    expect(list.head?.data).toStrictEqual(1);
    expect(list.tail?.data).toStrictEqual(2);
  });
});

Deno.test('reverse method', async (t) => {
  await t.step('should reverse an empty list', () => {
    const list = new DoublyLinkedList<number>();
    list.reverse();

    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  await t.step('should reverse a single-element list', () => {
    const list = new DoublyLinkedList<number>();
    list.add(1);
    list.reverse();

    expect(list.head?.data).toStrictEqual(1);
    expect(list.tail?.data).toStrictEqual(1);
  });

  await t.step('should reverse a multi-element list', () => {
    const list = new DoublyLinkedList<number>();

    list.add(1);
    list.add(2);
    list.add(3);
    list.add(4);
    list.add(5);

    list.reverse();

    expect(list.values()).toStrictEqual([5, 4, 3, 2, 1]);
  });

  await t.step('should maintain correct prev and next pointers after reverse', () => {
    const list = new DoublyLinkedList<number>();
    list.add(1);
    list.add(2);
    list.add(3);
    list.reverse();

    let current = list.head;
    const values = [];
    while (current) {
      values.push(current.data);
      current = current.next;
    }
    expect(values).toStrictEqual([3, 2, 1]);
  });
});
