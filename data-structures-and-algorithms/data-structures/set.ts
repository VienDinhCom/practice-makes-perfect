import { expect } from 'jsr:@std/expect';

class SetES6<T> {
  private set: Set<T>;

  constructor() {
    this.set = new Set();
  }

  add(value: T): SetES6<T> {
    this.set.add(value);

    return this;
  }

  has(value: T): boolean {
    return this.set.has(value);
  }

  delete(value: T): boolean {
    return this.set.delete(value);
  }

  clear(): void {
    return this.set.clear();
  }

  keys(): T[] {
    return this.set.keys().toArray();
  }

  values(): T[] {
    return this.set.values().toArray();
  }

  entries(): [T, T][] {
    return this.set.entries().toArray();
  }

  forEach(callback: (key: T, value: T) => void): void {
    this.set.forEach(callback);
  }

  union(other: SetES6<T>): SetES6<T> {
    const newSet = new SetES6<T>();

    this.set
      .union(other.set)
      .values()
      .forEach((value) => {
        newSet.add(value);
      });

    return newSet;
  }

  difference(other: SetES6<T>): SetES6<T> {
    const newSet = new SetES6<T>();

    this.set
      .difference(other.set)
      .values()
      .forEach((value) => {
        newSet.add(value);
      });

    return newSet;
  }

  intersection(other: SetES6<T>): SetES6<T> {
    const newSet = new SetES6<T>();

    this.set
      .intersection(other.set)
      .values()
      .forEach((value) => {
        newSet.add(value);
      });

    return newSet;
  }

  isSubsetOf(other: SetES6<T>): boolean {
    return this.set.isSubsetOf(other.set);
  }

  isSupersetOf(other: SetES6<T>): boolean {
    return this.set.isSupersetOf(other.set);
  }

  isDisjointFrom(other: SetES6<T>): boolean {
    return this.set.isDisjointFrom(other.set);
  }
}

Deno.test('SetES6 - Basic Operations', () => {
  const set = new SetES6<number>();

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

Deno.test('SetES6 - Collection Operations', () => {
  const set = new SetES6<number>();
  set.add(1).add(2).add(3);

  // Test keys
  expect(set.keys()).toStrictEqual([1, 2, 3]);

  // Test values
  expect(set.values()).toStrictEqual([1, 2, 3]);

  // Test entries
  expect(set.entries()).toStrictEqual([
    [1, 1],
    [2, 2],
    [3, 3],
  ]);

  // Test forEach
  const result: number[] = [];
  set.forEach((key, value) => {
    result.push(key);
    expect(key).toBe(value);
  });
  expect(result).toStrictEqual([1, 2, 3]);
});

Deno.test('SetES6 - Set Operations', () => {
  const set1 = new SetES6<number>();
  const set2 = new SetES6<number>();

  set1.add(1).add(2).add(3);
  set2.add(2).add(3).add(4);

  // Test union
  const union = set1.union(set2);
  expect(union.values()).toStrictEqual([1, 2, 3, 4]);

  // Test difference
  const difference = set1.difference(set2);
  expect(difference.values()).toStrictEqual([1]);

  // Test intersection
  const intersection = set1.intersection(set2);
  expect(intersection.values()).toStrictEqual([2, 3]);
});

Deno.test('SetES6 - Set Relations', () => {
  const set1 = new SetES6<number>();
  const set2 = new SetES6<number>();
  const set3 = new SetES6<number>();

  set1.add(1).add(2);
  set2.add(1).add(2).add(3);
  set3.add(4).add(5);

  // Test isSubsetOf
  expect(set1.isSubsetOf(set2)).toBe(true);
  expect(set2.isSubsetOf(set1)).toBe(false);

  // Test isSupersetOf
  expect(set2.isSupersetOf(set1)).toBe(true);
  expect(set1.isSupersetOf(set2)).toBe(false);

  // Test isDisjointFrom
  expect(set1.isDisjointFrom(set3)).toBe(true);
  expect(set1.isDisjointFrom(set2)).toBe(false);
});

Deno.test('SetES6 - Edge Cases', () => {
  const set = new SetES6<number>();

  // Empty set operations
  expect(set.values()).toStrictEqual([]);
  expect(set.delete(1)).toBe(false);

  // Operations with empty sets
  const otherSet = new SetES6<number>();
  expect(set.union(otherSet).values()).toStrictEqual([]);
  expect(set.intersection(otherSet).values()).toStrictEqual([]);
  expect(set.difference(otherSet).values()).toStrictEqual([]);

  // Adding duplicate values
  set.add(1).add(1);
  expect(set.values()).toStrictEqual([1]);
});
