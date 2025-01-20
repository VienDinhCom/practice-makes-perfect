import { expect } from 'jsr:@std/expect';

class Map<T> {
  private table: Record<string, T>;

  constructor() {
    this.table = {};
  }

  set(key: string, value: T): Map<T> {
    this.table[key] = value;

    return this;
  }

  get(key: string): T | undefined {
    return this.table[key];
  }

  has(key: string): boolean {
    return this.table[key] !== undefined;
  }

  size(): number {
    return Object.keys(this.table).length;
  }

  delete(key: string): void {
    delete this.table[key];
  }

  clear(): void {
    for (const key of Object.keys(this.table)) {
      this.delete(key);
    }
  }

  entries(): [string, T][] {
    return Object.entries(this.table);
  }

  forEach(callback: (value: T, key: string) => void): void {
    for (const key in this.table) {
      if (Object.prototype.hasOwnProperty.call(this.table, key)) {
        const value = this.table[key];

        callback(value, key);
      }
    }
  }

  keys(): string[] {
    return Object.keys(this.table);
  }

  values(): T[] {
    return Object.values(this.table);
  }
}

Deno.test('set and get methods', () => {
  const hashTable = new Map<number>();

  hashTable.set('key1', 100);

  expect(hashTable.get('key1')).toStrictEqual(100);
});

Deno.test('has method', () => {
  const hashTable = new Map<number>();

  hashTable.set('key1', 100);

  expect(hashTable.has('key1')).toStrictEqual(true);
  expect(hashTable.has('key2')).toStrictEqual(false);
});

Deno.test('size method', () => {
  const hashTable = new Map<number>();

  hashTable.set('key1', 100).set('key2', 200);

  expect(hashTable.size()).toStrictEqual(2);
});

Deno.test('clear method', () => {
  const hashTable = new Map<number>();

  hashTable.set('key1', 100).set('key2', 200);
  hashTable.clear();

  expect(hashTable.size()).toStrictEqual(0);
  expect(hashTable.has('key1')).toStrictEqual(false);
});

Deno.test('delete method', () => {
  const hashTable = new Map<number>();

  hashTable.set('key1', 100);
  hashTable.delete('key1');

  expect(hashTable.get('key1')).toStrictEqual(undefined);
  expect(hashTable.size()).toStrictEqual(0);
});

Deno.test('entries method', () => {
  const hashTable = new Map<number>();

  hashTable.set('key1', 100).set('key2', 200);

  expect(hashTable.entries()).toStrictEqual([
    ['key1', 100],
    ['key2', 200],
  ]);
});

Deno.test('forEach method', () => {
  const hashTable = new Map<number>();

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
  const hashTable = new Map<number>();

  hashTable.set('key1', 100).set('key2', 200);

  expect(hashTable.keys()).toStrictEqual(['key1', 'key2']);
});

Deno.test('values method', () => {
  const hashTable = new Map<number>();

  hashTable.set('key1', 100).set('key2', 200);

  expect(hashTable.values()).toStrictEqual([100, 200]);
});
