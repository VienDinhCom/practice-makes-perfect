import { expect } from 'jsr:@std/expect';

class HashTable<T> {
  private table: [string, T][][];
  public size: number;

  constructor() {
    this.table = [];
    this.size = 0;
  }

  private hash(str: string) {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i);
    }

    return hash;
  }

  set(key: string, value: T): HashTable<T> {
    const hash = this.hash(key);

    if (this.table[hash]) {
      const index = this.table[hash].findIndex(([k]) => k === key);

      if (index >= 0) {
        this.table[hash][index] = [key, value];
      } else {
        this.table[hash].push([key, value]);
        this.size++;
      }
    } else {
      this.table[hash] = [[key, value]];
      this.size++;
    }

    return this;
  }

  get(key: string): T | undefined {
    const hash = this.hash(key);

    const bucket = this.table[hash];

    if (bucket) {
      const item = bucket.find(([k]) => k === key);

      if (item) {
        return item[1];
      }
    }
  }

  delete(key: string): void {
    const hash = this.hash(key);

    if (this.table[hash]) {
      const index = this.table[hash].findIndex(([k]) => k === key);

      if (index >= 0) {
        this.table[hash].splice(index, 1);
        this.size--;

        if (this.table[hash].length === 0) {
          this.table.slice(hash, 1);
        }
      }
    }
  }

  has(key: string): boolean {
    const index = this.hash(key);

    if (this.table[index] === undefined) return false;

    const item = this.table[index].find((item) => item[0] === key);

    return item ? true : false;
  }

  forEach(callback: (value: T, key: string) => void): void {
    this.table.forEach((bucket) => {
      bucket.forEach(([key, value]) => {
        callback(value, key);
      });
    });
  }

  keys(): string[] {
    const keys: string[] = [];

    this.forEach((_, key) => {
      keys.push(key);
    });

    return keys;
  }

  values(): T[] {
    const values: T[] = [];

    this.forEach((value) => {
      values.push(value);
    });

    return values;
  }

  clear(): void {
    this.keys().forEach((key) => this.delete(key));
  }

  entries(): [string, T][] {
    const entries: [string, T][] = [];

    this.forEach((value, key) => {
      entries.push([key, value]);
    });

    return entries;
  }
}

Deno.test('set and get', () => {
  const hashTable = new HashTable<number>();
  hashTable.set('ab', 1);
  hashTable.set('ba', 2);

  expect(hashTable.get('ab')).toStrictEqual(1);
  expect(hashTable.get('ba')).toStrictEqual(2);
  expect(hashTable.get('cc')).toStrictEqual(undefined);
});

Deno.test('lookup for non-existing key', () => {
  const hashTable = new HashTable<number>();

  // Add a key-value pair
  hashTable.set('key1', 10);

  // Verify lookup returns undefined for non-existing keys
  expect(hashTable.get('key3')).toStrictEqual(undefined);
});

Deno.test('remove method removes a key', () => {
  const hashTable = new HashTable<number>();

  // Add and remove a key-value pair
  hashTable.set('key1', 10);
  hashTable.delete('key1');

  // Verify key has been removed
  expect(hashTable.get('key1')).toStrictEqual(undefined);
});

Deno.test('removing a key doesn’t affect other keys with the same hash', () => {
  const hashTable = new HashTable<number>();

  // Add multiple keys with different actual keys but the same hash
  hashTable.set('key1', 10);
  hashTable.set('key2', 20);

  // Remove one key
  hashTable.delete('key1');

  // Verify the other key is still retrievable
  expect(hashTable.get('key2')).toStrictEqual(20);
});

Deno.test('add method overwrites existing key', () => {
  const hashTable = new HashTable<number>();

  // Add a key-value pair and overwrite it
  hashTable.set('key1', 10);
  hashTable.set('key1', 15);

  // Verify the value has been updated
  expect(hashTable.get('key1')).toStrictEqual(15);
});

Deno.test('handling empty table operations', () => {
  const hashTable = new HashTable<number>();

  // Lookup and remove on empty table
  expect(hashTable.get('nonexistent')).toStrictEqual(undefined);

  hashTable.delete('nonexistent');
  expect(hashTable.get('nonexistent')).toStrictEqual(undefined); // Ensure no errors occur
});

Deno.test('delete', () => {
  const hashTable = new HashTable<number>();
  hashTable.set('a', 1);
  hashTable.set('b', 2);

  hashTable.delete('a');
  expect(hashTable.get('a')).toStrictEqual(undefined);
  expect(hashTable.get('b')).toStrictEqual(2);
  expect(hashTable.size).toStrictEqual(1);
});

Deno.test('has', () => {
  const hashTable = new HashTable<number>();
  hashTable.set('a', 1);
  hashTable.set('b', 2);

  expect(hashTable.has('a')).toStrictEqual(true);
  expect(hashTable.has('b')).toStrictEqual(true);
  expect(hashTable.has('c')).toStrictEqual(false);
});

Deno.test('size', () => {
  const hashTable = new HashTable<number>();
  expect(hashTable.size).toStrictEqual(0);

  hashTable.set('a', 1);
  expect(hashTable.size).toStrictEqual(1);

  hashTable.set('b', 2);
  expect(hashTable.size).toStrictEqual(2);

  hashTable.delete('a');
  expect(hashTable.size).toStrictEqual(1);
});

Deno.test('keys', () => {
  const hashTable = new HashTable<number>();
  hashTable.set('a', 1);
  hashTable.set('b', 2);

  expect(hashTable.keys().sort()).toStrictEqual(['a', 'b']);
});

Deno.test('values', () => {
  const hashTable = new HashTable<number>();
  hashTable.set('a', 1);
  hashTable.set('b', 2);

  expect(hashTable.values().sort()).toStrictEqual([1, 2]);
});

Deno.test('entries', () => {
  const hashTable = new HashTable<number>();
  hashTable.set('a', 1);
  hashTable.set('b', 2);

  const entries = hashTable.entries().sort(([k1], [k2]) => k1.localeCompare(k2));
  expect(entries).toStrictEqual([
    ['a', 1],
    ['b', 2],
  ]);
});

Deno.test('forEach', () => {
  const hashTable = new HashTable<number>();
  hashTable.set('a', 1);
  hashTable.set('b', 2);

  const result: [string, number][] = [];
  hashTable.forEach((value, key) => {
    result.push([key, value]);
  });

  result.sort(([k1], [k2]) => k1.localeCompare(k2));
  expect(result).toStrictEqual([
    ['a', 1],
    ['b', 2],
  ]);
});

Deno.test('clear', () => {
  const hashTable = new HashTable<number>();
  hashTable.set('a', 1);
  hashTable.set('b', 2);

  hashTable.clear();

  expect(hashTable.size).toStrictEqual(0);
  expect(hashTable.keys()).toStrictEqual([]);
  expect(hashTable.values()).toStrictEqual([]);
  expect(hashTable.entries()).toStrictEqual([]);
});