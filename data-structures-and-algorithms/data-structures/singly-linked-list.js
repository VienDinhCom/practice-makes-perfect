function LinkedList() {
  const length = 0;
  const head = null;

  const Node = function (element) {
    this.element = element;
    this.next = null;
  };

  this.head = function () {
    return head;
  };

  this.size = function () {
    return length;
  };

  this.add = function (element) {
    const node = new Node(element);

    if (head === null) {
      head = node;
    } else {
      let current = head;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    length++;
  };

  this.remove = function (element) {
    if (head.element === element) {
      head = head.next;

      length--;
    } else {
      let previous = head;
      let current = head.next;

      while (current) {
        if (current.element === element) {
          previous.next = current.next;

          length--;

          return;
        }

        previous = current;
        current = current.next;
      }
    }
  };

  this.isEmpty = function () {
    return length === 0;
  };

  this.indexOf = (element) => {
    let current = head;
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

  this.elementAt = function (at) {
    let current = head;
    let index = 0;

    while (current) {
      if (index === at) {
        return current.element;
      }

      current = current.next;
      index++;
    }
  };

  this.removeAt = function (at) {
    if (at === 0) {
      const current = head;
      head = head.next;
      length--;
      return current.element;
    } else {
      let index = 1;
      let previous = head;
      let current = head.next;

      while (current) {
        if (index === at) {
          previous.next = current.next;
          length--;
          return current.element;
        }

        previous = current;
        current = current.next;
        index++;
      }
    }

    return null;
  };

  this.addAt = function (at, element) {
    if (at === 0) {
      const node = new Node(element);
      node.next = head;
      head = node;
      length++;
    } else {
      let current = head.next;
      let index = 1;

      while (current) {
        if (index === at) {
          const node = new Node(element);
          node.next = current;
          current = node;
          length++;
        }

        current = current.next;
        index++;
      }
    }

    return false;
  };
}
