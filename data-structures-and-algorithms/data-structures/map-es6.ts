import { expect } from 'jsr:@std/expect';

class MapES6<T> {
  map: Map<string, T>;

  constructor() {
    this.map = new Map();
  }

  has(key: string) {
    return this.map.has(key);
  }

  add(key: string, value: T) {
    if (this.has(key)) {
      return false;
    }

    this.map.set(key, value);

    return true;
  }

  get(key: string) {
    return this.map.get(key);
  }

  remove(key: string) {
    this.map.delete(key);
  }

  values(): T[] {
    return this.map.values().toArray();
  }

  entries(): [string, T][] {
    return [...this.map.entries()];
  }

  clear() {
    this.map.clear();
  }

  size() {
    return this.map.size;
  }
}

Deno.test('add and get methods', () => {
  const map = new MapES6<number>();

  // Add a new key-value pair
  expect(map.add('a', 1)).toStrictEqual(true);
  expect(map.get('a')).toStrictEqual(1);

  // Attempt to add a duplicate key
  expect(map.add('a', 2)).toStrictEqual(false);
  expect(map.get('a')).toStrictEqual(1);
});

Deno.test('has method', () => {
  const map = new MapES6<string>();

  // Check for a key that does not exist
  expect(map.has('a')).toStrictEqual(false);

  // Add a key and check its existence
  map.add('a', 'value');
  expect(map.has('a')).toStrictEqual(true);
});

Deno.test('remove method', () => {
  const map = new MapES6<number>();

  map.add('a', 1);
  expect(map.has('a')).toStrictEqual(true);

  // Remove the key and verify
  map.remove('a');
  expect(map.has('a')).toStrictEqual(false);
});

Deno.test('values method', () => {
  const map = new MapES6<number>();

  map.add('a', 1);
  map.add('b', 2);

  expect(map.values()).toStrictEqual([1, 2]);
});

Deno.test('entries method', () => {
  const map = new MapES6<number>();

  map.add('a', 1);
  map.add('b', 2);

  expect(map.entries()).toStrictEqual([
    ['a', 1],
    ['b', 2],
  ]);
});

Deno.test('clear method', () => {
  const map = new MapES6<number>();

  map.add('a', 1);
  map.add('b', 2);

  map.clear();

  expect(map.size()).toStrictEqual(0);
  expect(map.values()).toStrictEqual([]);
});

Deno.test('size method', () => {
  const map = new MapES6<number>();

  expect(map.size()).toStrictEqual(0);

  map.add('a', 1);
  map.add('b', 2);

  expect(map.size()).toStrictEqual(2);

  map.remove('a');

  expect(map.size()).toStrictEqual(1);
});
