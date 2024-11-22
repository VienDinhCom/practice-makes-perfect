import { expect } from 'jsr:@std/expect';

class SetES6 {
  private set: Set<number>;

  constructor() {
    this.set = new Set();
  }

  has(element: number): boolean {
    return this.set.has(element);
  }

  size(): number {
    return this.set.size;
  }

  values(): number[] {
    return [...this.set];
  }

  add(element: number): boolean {
    if (this.set.has(element)) return false;
    this.set.add(element);

    return true;
  }

  remove(element: number): number {
    this.set.delete(element);

    return element;
  }

  union(anotherSet: SetES6): SetES6 {
    const newSet = new SetES6();

    this.set.union(anotherSet.set).forEach((elm) => {
      newSet.add(elm);
    });

    return newSet;
  }

  intersection(anotherSet: SetES6): SetES6 {
    const newSet = new SetES6();

    this.set.intersection(anotherSet.set).forEach((elm) => {
      newSet.add(elm);
    });

    return newSet;
  }

  difference(anotherSet: SetES6): SetES6 {
    const newSet = new SetES6();

    this.set.difference(anotherSet.set).forEach((elm) => {
      newSet.add(elm);
    });

    return newSet;
  }

  isSubsetOf(anotherSet: SetES6): boolean {
    return this.set.isSubsetOf(anotherSet.set);
  }
}

// Test case for the constructor
Deno.test('SetES6 constructor initializes an empty set', () => {
  const set = new SetES6();
  expect(set.size()).toStrictEqual(0);
  expect(set.values()).toStrictEqual([]);
});

// Test case for the `has` method
Deno.test('SetES6.has() checks if an element is in the set', () => {
  const set = new SetES6();
  set.add(5);
  expect(set.has(5)).toStrictEqual(true);
  expect(set.has(10)).toStrictEqual(false);
});

// Test case for the `values` method
Deno.test('SetES6.values() returns all values in the set', () => {
  const set = new SetES6();
  set.add(1);
  set.add(2);
  set.add(3);
  expect(set.values()).toStrictEqual([1, 2, 3]);
});

// Test case for the `add` method
Deno.test('SetES6.add() adds a new element to the set', () => {
  const set = new SetES6();
  expect(set.add(5)).toStrictEqual(true); // Successfully added
  expect(set.add(5)).toStrictEqual(false); // Already exists
  expect(set.values()).toStrictEqual([5]);
  expect(set.size()).toStrictEqual(1);
});

// Test case for the `remove` method
Deno.test('SetES6.remove() removes an element from the set', () => {
  const set = new SetES6();
  set.add(1);
  set.add(2);
  set.remove(1);
  expect(set.has(1)).toStrictEqual(false); // Element is removed
  expect(set.size()).toStrictEqual(1);
  expect(set.values()).toStrictEqual([2]);
});

// Test case for the `size` method
Deno.test('SetES6.size() returns the number of elements in the set', () => {
  const set = new SetES6();
  expect(set.size()).toStrictEqual(0);
  set.add(10);
  set.add(20);
  expect(set.size()).toStrictEqual(2);
  set.remove(10);
  expect(set.size()).toStrictEqual(1);
});

// Test case for `union` method
Deno.test('SetES6: union() method creates a new set containing elements from both sets', () => {
  const setA = new SetES6();
  const setB = new SetES6();

  setA.add(1);
  setA.add(2);
  setB.add(3);
  setB.add(4);

  const unionSetES6 = setA.union(setB);

  expect(unionSetES6.values()).toStrictEqual([1, 2, 3, 4]);
  expect(unionSetES6.size()).toStrictEqual(4);
});

// Test case for `intersection` method
Deno.test(
  'SetES6: intersection() method creates a new set containing elements values that are common to two sets',
  () => {
    const setA = new SetES6();

    setA.add(1);
    setA.add(2);
    setA.add(3);

    const setB = new SetES6();

    setB.add(3);
    setB.add(4);
    setB.add(5);

    const unionSetES6 = setA.intersection(setB);

    expect(unionSetES6.values()).toStrictEqual([3]);
    expect(unionSetES6.size()).toStrictEqual(1);
  }
);

// Test case for `difference` method
Deno.test(
  'SetES6: difference() method creates a new set containing elements present in the first set that are absent in the second',
  () => {
    const setA = new SetES6();

    setA.add(1);
    setA.add(2);
    setA.add(3);

    const setB = new SetES6();

    setB.add(1);
    setB.add(2);
    setB.add(4);

    const unionSetES6 = setA.difference(setB);

    expect(unionSetES6.values()).toStrictEqual([3]);
    expect(unionSetES6.size()).toStrictEqual(1);
  }
);

// Test case for `isSubsetOf` method
Deno.test(
  'SetES6: isSubsetOf() method compares the first set against the second, and if the first set is fully contained within the second, it will return true',
  () => {
    const setA = new SetES6();

    setA.add(1);
    setA.add(2);

    const setB = new SetES6();

    setB.add(1);
    setB.add(2);
    setB.add(3);

    expect(setA.isSubsetOf(setB)).toStrictEqual(true);
    expect(setB.isSubsetOf(setA)).toStrictEqual(false);
  }
);
