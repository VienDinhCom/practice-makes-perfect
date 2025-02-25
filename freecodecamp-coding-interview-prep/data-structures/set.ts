import { expect } from 'jsr:@std/expect';

class Set {
  private set: Record<string, number>;

  constructor() {
    this.set = {};
  }

  add(value: number): Set {
    this.set[value] = value;

    return this;
  }

  has(value: number): boolean {
    return this.set[value] !== undefined;
  }

  values(): number[] {
    return Object.values(this.set);
  }

  forEach(callback: (value: number) => void): void {
    this.values().forEach(callback);
  }

  delete(value: number): boolean {
    if (!this.has(value)) return false;

    delete this.set[value];

    return true;
  }

  clear(): void {
    for (const key in this.set) {
      this.delete(Number(key));
    }
  }

  union(other: Set): Set {
    const newSet = new Set();

    this.forEach((value) => newSet.add(value));

    other.forEach((value) => newSet.add(value));

    return newSet;
  }

  intersection(other: Set): Set {
    const newSet = new Set();

    other.forEach((value) => {
      if (this.has(value)) newSet.add(value);
    });

    return newSet;
  }

  difference(other: Set): Set {
    const newSet = new Set();

    this.forEach((value) => {
      if (!other.has(value)) newSet.add(value);
    });

    return newSet;
  }

  symmetricDifference(other: Set): Set {
    const newSet = new Set();

    other.forEach((value) => {
      if (!this.has(value)) newSet.add(value);
    });

    this.forEach((value) => {
      if (!other.has(value)) newSet.add(value);
    });

    return newSet;
  }

  isSubsetOf(other: Set): boolean {
    for (const value of this.values()) {
      if (!other.has(value)) {
        return false;
      }
    }

    return true;
  }

  isSupersetOf(other: Set): boolean {
    for (const value of other.values()) {
      if (!this.has(value)) return false;
    }

    return true;
  }

  isDisjointFrom(other: Set): boolean {
    for (const value of this.values()) {
      if (other.has(value)) return false;
    }

    return true;
  }
}

Deno.test('Set - Basic Operations', () => {
  const set = new Set();

  // Test add
  expect(set.add(1)).toBe(set);
  expect(set.add(2)).toBe(set);

  // Test has
  expect(set.has(1)).toBe(true);
  expect(set.has(3)).toBe(false);

  // Test delete
  expect(set.delete(1)).toBe(true);
  expect(set.delete(3)).toBe(false);
  expect(set.has(1)).toBe(false);

  // Test clear
  set.add(1).add(2).add(3);
  set.clear();
  expect(set.has(1)).toBe(false);
  expect(set.has(2)).toBe(false);
  expect(set.has(3)).toBe(false);
});

Deno.test('Set - Collection Operations', () => {
  const set = new Set();
  set.add(1).add(2).add(3);

  // Test values
  expect(set.values()).toStrictEqual([1, 2, 3]);

  // Test forEach
  const result: number[] = [];

  set.forEach((value) => {
    result.push(value);
  });

  expect(result).toStrictEqual([1, 2, 3]);
});

Deno.test('Set - Set Operations', () => {
  const set1 = new Set();
  const set2 = new Set();

  set1.add(1).add(2).add(3);
  set2.add(2).add(3).add(4);

  // Test union
  const union = set1.union(set2);
  expect(union.values()).toStrictEqual([1, 2, 3, 4]);

  // Test intersection
  const intersection = set1.intersection(set2);
  expect(intersection.values()).toStrictEqual([2, 3]);

  // Test difference
  const difference = set1.difference(set2);
  expect(difference.values()).toStrictEqual([1]);

  const symmetricDifference = set1.symmetricDifference(set2);
  expect(symmetricDifference.values()).toStrictEqual([1, 4]);
});

Deno.test('Set - Set Relations', () => {
  const set1 = new Set();
  const set2 = new Set();
  const set3 = new Set();

  set1.add(1).add(2);
  set2.add(1).add(2).add(3);
  set3.add(4).add(5);

  // Test isSubsetOf
  expect(set1.isSubsetOf(set2)).toBe(true);
  expect(set2.isSubsetOf(set1)).toBe(false);

  // // Test isSupersetOf
  expect(set2.isSupersetOf(set1)).toBe(true);
  expect(set1.isSupersetOf(set2)).toBe(false);

  // // Test isDisjointFrom
  expect(set1.isDisjointFrom(set3)).toBe(true);
  expect(set1.isDisjointFrom(set2)).toBe(false);
});

Deno.test('Set - Edge Cases', () => {
  const set = new Set();

  // Empty set operations
  expect(set.values()).toStrictEqual([]);
  expect(set.delete(1)).toBe(false);

  // Operations with empty sets
  const otherSet = new Set();
  expect(set.union(otherSet).values()).toStrictEqual([]);
  expect(set.intersection(otherSet).values()).toStrictEqual([]);
  expect(set.difference(otherSet).values()).toStrictEqual([]);

  // Adding duplicate values
  set.add(1).add(1);
  expect(set.values()).toStrictEqual([1]);
});
