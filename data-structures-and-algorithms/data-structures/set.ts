class Set {
  dictionary: { [key: number]: number };
  length: number;

  constructor() {
    this.dictionary = {};
    this.length = 0;
  }

  has(element: number) {
    return this.dictionary[element] !== undefined;
  }

  values() {
    return Object.values(this.dictionary);
  }

  add(element: number) {
    if (this.has(element)) {
      return false;
    }

    this.dictionary[element] = element;
    this.length++;

    return true;
  }

  remove(element: number) {
    delete this.dictionary[element];

    this.length--;
  }

  size() {
    return this.length;
  }
}
