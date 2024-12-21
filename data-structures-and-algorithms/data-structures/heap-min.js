class MinHeap {
  constructor() {
    this.heap = [];
  }

  static isSorted(a) {
    for (let i = 0; i < a.length - 1; i++) {
      if (a[i] > a[i + 1]) {
        return false;
      }
    }
    return true;
  }

  static createRandomArray(size = 5) {
    const a = new Array(size);
    for (let i = 0; i < size; i++) {
      a[i] = Math.floor(Math.random() * 100);
    }
    return a;
  }
}
