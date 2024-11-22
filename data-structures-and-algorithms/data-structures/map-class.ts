import { expect } from 'jsr:@std/expect';

class MapClass<T> {
  private object: { [key: string]: T };

  constructor() {
    this.object = {};
  }

  has(key: string) {
    return this.object[key] !== undefined;
  }

  add(key: string, value: T) {
    if (this.has(key)) return false;

    this.object[key] = value;

    return true;
  }

  get(key: string) {
    return this.object[key];
  }

  remove(key: string) {
    delete this.object[key];
  }

  values() {
    return Object.values(this.object);
  }

  entries() {
    return Object.entries(this.object);
  }

  clear() {
    Object.keys(this.object).forEach((key) => {
      delete this.object[key];
    });
  }

  size() {
    return Object.keys(this.object).length;
  }
}

Deno.test('add and get methods', () => {
  const map = new MapClass<number>();

  // Add a new key-value pair
  expect(map.add('a', 1)).toStrictEqual(true);
  expect(map.get('a')).toStrictEqual(1);

  // Attempt to add a duplicate key
  expect(map.add('a', 2)).toStrictEqual(false);
  expect(map.get('a')).toStrictEqual(1);
});

Deno.test('has method', () => {
  const map = new MapClass<string>();

  // Check for a key that does not exist
  expect(map.has('a')).toStrictEqual(false);

  // Add a key and check its existence
  map.add('a', 'value');
  expect(map.has('a')).toStrictEqual(true);
});

Deno.test('remove method', () => {
  const map = new MapClass<number>();

  map.add('a', 1);
  expect(map.has('a')).toStrictEqual(true);

  // Remove the key and verify
  map.remove('a');
  expect(map.has('a')).toStrictEqual(false);
});

Deno.test('values method', () => {
  const map = new MapClass<number>();

  map.add('a', 1);
  map.add('b', 2);

  expect(map.values()).toStrictEqual([1, 2]);
});

Deno.test('entries method', () => {
  const map = new MapClass<number>();

  map.add('a', 1);
  map.add('b', 2);

  expect(map.entries()).toStrictEqual([
    ['a', 1],
    ['b', 2],
  ]);
});

Deno.test('clear method', () => {
  const map = new MapClass<number>();

  map.add('a', 1);
  map.add('b', 2);

  map.clear();

  expect(map.size()).toStrictEqual(0);
  expect(map.values()).toStrictEqual([]);
});

Deno.test('size method', () => {
  const map = new MapClass<number>();

  expect(map.size()).toStrictEqual(0);

  map.add('a', 1);
  map.add('b', 2);

  expect(map.size()).toStrictEqual(2);

  map.remove('a');

  expect(map.size()).toStrictEqual(1);
});
