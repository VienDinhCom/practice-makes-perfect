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
      let current = this.head?.next;
      let index = 1;

      while (current) {
        if (index === at) {
          const node = new Node(element);
          node.next = current;
          current = node;
          this.length++;
        }

        current = current.next;
        index++;
      }
    }
  }
}
