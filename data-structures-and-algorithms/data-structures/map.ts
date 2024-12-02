import { expect } from 'jsr:@std/expect';

class HashTable<T> {
  private table: Map<string, T>;

  constructor() {
    this.table = new Map();
  }

  set(key: string, value: T): HashTable<T> {
    this.table.set(key, value);

    return this;
  }

  get(key: string): T | undefined {
    return this.table.get(key);
  }

  has(key: string): boolean {
    return this.table.has(key);
  }

  size(): number {
    return this.table.size;
  }

  clear(): void {
    this.table.clear();
  }

  delete(key: string): void {
    this.table.delete(key);
  }

  entries(): [string, T][] {
    return this.table.entries().toArray();
  }

  forEach(callback: (value: T, key: string) => void): void {
    this.table.forEach(callback);
  }

  keys(): string[] {
    return this.table.keys().toArray();
  }

  values(): T[] {
    return this.table.values().toArray();
  }
}

Deno.test('set and get methods', () => {
  const hashTable = new HashTable<number>();

  hashTable.set('key1', 100);

  expect(hashTable.get('key1')).toStrictEqual(100);
});

Deno.test('has method', () => {
  const hashTable = new HashTable<number>();

  hashTable.set('key1', 100);

  expect(hashTable.has('key1')).toStrictEqual(true);
  expect(hashTable.has('key2')).toStrictEqual(false);
});

Deno.test('size method', () => {
  const hashTable = new HashTable<number>();

  hashTable.set('key1', 100).set('key2', 200);

  expect(hashTable.size()).toStrictEqual(2);
});

Deno.test('clear method', () => {
  const hashTable = new HashTable<number>();

  hashTable.set('key1', 100).set('key2', 200);
  hashTable.clear();

  expect(hashTable.size()).toStrictEqual(0);
  expect(hashTable.has('key1')).toStrictEqual(false);
});

Deno.test('delete method', () => {
  const hashTable = new HashTable<number>();

  hashTable.set('key1', 100);
  hashTable.delete('key1');

  expect(hashTable.get('key1')).toStrictEqual(undefined);
  expect(hashTable.size()).toStrictEqual(0);
});

Deno.test('entries method', () => {
  const hashTable = new HashTable<number>();

  hashTable.set('key1', 100).set('key2', 200);

  expect(hashTable.entries()).toStrictEqual([
    ['key1', 100],
    ['key2', 200],
  ]);
});

Deno.test('forEach method', () => {
  const hashTable = new HashTable<number>();

  hashTable.set('key1', 100).set('key2', 200);

  const keys: string[] = [];
  const values: number[] = [];

  hashTable.forEach((value, key) => {
    keys.push(key);
    values.push(value);
  });

  expect(keys).toStrictEqual(['key1', 'key2']);
  expect(values).toStrictEqual([100, 200]);
});

Deno.test('keys method', () => {
  const hashTable = new HashTable<number>();

  hashTable.set('key1', 100).set('key2', 200);

  expect(hashTable.keys()).toStrictEqual(['key1', 'key2']);
});

Deno.test('values method', () => {
  const hashTable = new HashTable<number>();

  hashTable.set('key1', 100).set('key2', 200);

  expect(hashTable.values()).toStrictEqual([100, 200]);
});