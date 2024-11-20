import { expect } from 'jsr:@std/expect';

class Set {
  private dictionary: { [key: number]: number };
  private length: number;

  constructor() {
    this.dictionary = {};
    this.length = 0;
  }

  has(element: number): boolean {
    return this.dictionary[element] !== undefined;
  }

  size(): number {
    return this.length;
  }

  values(): number[] {
    return Object.values(this.dictionary);
  }

  add(element: number): boolean {
    if (this.has(element)) return false;

    this.dictionary[element] = element;
    this.length++;

    return true;
  }

  remove(element: number): number {
    const item = this.dictionary[element];

    delete this.dictionary[element];
    this.length--;

    return item;
  }

  union(anotherSet: Set): Set {
    const newSet = new Set();

    this.values().forEach((value) => {
      newSet.add(value);
    });

    anotherSet.values().forEach((value) => {
      newSet.add(value);
    });

    return newSet;
  }

  intersection(anotherSet: Set): Set {
    const newSet = new Set();

    anotherSet.values().forEach((value) => {
      if (this.has(value)) newSet.add(value);
    });

    return newSet;
  }

  difference(anotherSet: Set): Set {
    const newSet = new Set();

    this.values().forEach((value) => {
      if (!anotherSet.has(value)) newSet.add(value);
    });

    return newSet;
  }
}

// Test case for the constructor
Deno.test('Set constructor initializes an empty set', () => {
  const set = new Set();
  expect(set.size()).toStrictEqual(0);
  expect(set.values()).toStrictEqual([]);
});

// Test case for the `has` method
Deno.test('Set.has() checks if an element is in the set', () => {
  const set = new Set();
  set.add(5);
  expect(set.has(5)).toStrictEqual(true);
  expect(set.has(10)).toStrictEqual(false);
});

// Test case for the `values` method
Deno.test('Set.values() returns all values in the set', () => {
  const set = new Set();
  set.add(1);
  set.add(2);
  set.add(3);
  expect(set.values()).toStrictEqual([1, 2, 3]);
});

// Test case for the `add` method
Deno.test('Set.add() adds a new element to the set', () => {
  const set = new Set();
  expect(set.add(5)).toStrictEqual(true); // Successfully added
  expect(set.add(5)).toStrictEqual(false); // Already exists
  expect(set.values()).toStrictEqual([5]);
  expect(set.size()).toStrictEqual(1);
});

// Test case for the `remove` method
Deno.test('Set.remove() removes an element from the set', () => {
  const set = new Set();
  set.add(1);
  set.add(2);
  set.remove(1);
  expect(set.has(1)).toStrictEqual(false); // Element is removed
  expect(set.size()).toStrictEqual(1);
  expect(set.values()).toStrictEqual([2]);
});

// Test case for the `size` method
Deno.test('Set.size() returns the number of elements in the set', () => {
  const set = new Set();
  expect(set.size()).toStrictEqual(0);
  set.add(10);
  set.add(20);
  expect(set.size()).toStrictEqual(2);
  set.remove(10);
  expect(set.size()).toStrictEqual(1);
});

// Test case for `union` method
Deno.test('Set: union() method creates a new set containing elements from both sets', () => {
  const setA = new Set();
  const setB = new Set();

  setA.add(1);
  setA.add(2);
  setB.add(3);
  setB.add(4);

  const unionSet = setA.union(setB);

  expect(unionSet.values()).toStrictEqual([1, 2, 3, 4]);
  expect(unionSet.size()).toStrictEqual(4);
});

// Test case for `intersection` method
Deno.test('Set: intersection() method creates a new set containing elements values that are common to two sets', () => {
  const setA = new Set();

  setA.add(1);
  setA.add(2);
  setA.add(3);

  const setB = new Set();

  setB.add(3);
  setB.add(4);
  setB.add(5);

  const unionSet = setA.intersection(setB);

  expect(unionSet.values()).toStrictEqual([3]);
  expect(unionSet.size()).toStrictEqual(1);
});

// Test case for `difference` method
Deno.test('Set: difference() method creates a new set containing elements values that are common to two sets', () => {
  const setA = new Set();

  setA.add(1);
  setA.add(2);
  setA.add(3);

  const setB = new Set();

  setB.add(1);
  setB.add(2);
  setB.add(4);

  const unionSet = setA.difference(setB);

  expect(unionSet.values()).toStrictEqual([3]);
  expect(unionSet.size()).toStrictEqual(1);
});
