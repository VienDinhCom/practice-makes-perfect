import { expect } from 'jsr:@std/expect';

class Node<T> {
  data: T;
  prev: Node<T> | null;
  next: Node<T> | null;

  constructor(data: T, prev: Node<T> | null = null) {
    this.data = data;
    this.prev = prev;
    this.next = null;
  }
}

class DoublyLinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;

  add(data: T) {
    const node = new Node(data, this.tail);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = this.tail!.next;
    }
  }

  remove(data: T) {
    let current = this.head;

    while (current) {
      if (current.data === data) {
        if (current === this.head) {
          this.head = current.next;

          if (this.head === null) {
            this.tail = null;
          } else {
            this.head!.prev = null;
          }

          return;
        }

        if (current === this.tail) {
          this.tail = current.prev;
          this.tail!.next = null;

          return;
        }

        current.prev!.next = current.next;
        current.next!.prev = current.prev;
      }

      current = current.next;
    }
  }

  // remove(data: T) {
  //   if (this.head!.data === data) {
  //     this.head!.next!.prev = null;
  //     this.head = this.head!.next;
  //   } else if (this.tail!.data === data) {
  //     this.tail!.prev!.next = null;
  //     this.tail = this.tail!.prev;
  //   } else {
  //     let prev = this.head;
  //     let current = prev!.next;
  //     let next = current!.next;

  //     while (current) {
  //       if (current.data === data) {
  //         prev!.next = next;
  //         next!.prev = prev;

  //         return;
  //       }

  //       prev = current;
  //       current = next;
  //       next = next!.next;
  //     }
  //   }
  // }

  reverse() {
    let temp = null;
    let currentNode = this.head;

    if (this.head === null) {
      return null;
    }

    this.tail = currentNode;

    while (currentNode) {
      temp = currentNode.prev;
      currentNode.prev = currentNode.next;
      currentNode.next = temp;
      currentNode = currentNode.prev;
    }

    if (temp != null) {
      this.head = temp.prev;
    }
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
    list.reverse();

    expect(list.head?.data).toStrictEqual(3);
    expect(list.tail?.data).toStrictEqual(1);

    // Check connections
    expect(list.head?.next?.data).toStrictEqual(2);
    expect(list.head?.prev).toBeNull();
    expect(list.tail?.prev?.data).toStrictEqual(2);
    expect(list.tail?.next).toBeNull();
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
