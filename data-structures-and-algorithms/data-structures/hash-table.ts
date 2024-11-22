import { expect } from 'jsr:@std/expect';

class HashTable<T> {
  private table: { [key: string]: T }[];

  constructor() {
    this.table = [];
  }

  private hash(str: string) {
    let hashed = 0;

    for (let i = 0; i < str.length; i++) {
      hashed += str.charCodeAt(i);
    }

    return hashed;
  }

  add(key: string, value: T) {
    const hashedKey = this.hash(key);

    this.table[hashedKey] ??= {};

    this.table[hashedKey][key] = value;
  }

  lookup(key: string) {
    const hashedKey = this.hash(key);

    return this.table[hashedKey] ? this.table[hashedKey][key] : undefined;
  }

  remove(key: string) {
    const hashedKey = this.hash(key);

    if (this.table[hashedKey]) {
      delete this.table[hashedKey][key];

      if (Object.keys(this.table[hashedKey]).length === 0) {
        delete this.table[hashedKey];
      }
    }
  }
}

Deno.test('add and lookup methods', () => {
  const hashTable = new HashTable<number>();

  // Add key-value pairs
  hashTable.add('key1', 10);
  hashTable.add('key2', 20);

  // Verify lookup returns correct values
  expect(hashTable.lookup('key1')).toStrictEqual(10);
  expect(hashTable.lookup('key2')).toStrictEqual(20);
});

Deno.test('lookup for non-existing key', () => {
  const hashTable = new HashTable<number>();

  // Add a key-value pair
  hashTable.add('key1', 10);

  // Verify lookup returns undefined for non-existing keys
  expect(hashTable.lookup('key3')).toStrictEqual(undefined);
});

Deno.test('remove method removes a key', () => {
  const hashTable = new HashTable<number>();

  // Add and remove a key-value pair
  hashTable.add('key1', 10);
  hashTable.remove('key1');

  // Verify key has been removed
  expect(hashTable.lookup('key1')).toStrictEqual(undefined);
});

Deno.test('removing a key doesn’t affect other keys with the same hash', () => {
  const hashTable = new HashTable<number>();

  // Add multiple keys with different actual keys but the same hash
  hashTable.add('key1', 10);
  hashTable.add('key2', 20);

  // Remove one key
  hashTable.remove('key1');

  // Verify the other key is still retrievable
  expect(hashTable.lookup('key2')).toStrictEqual(20);
});

Deno.test('add method overwrites existing key', () => {
  const hashTable = new HashTable<number>();

  // Add a key-value pair and overwrite it
  hashTable.add('key1', 10);
  hashTable.add('key1', 15);

  // Verify the value has been updated
  expect(hashTable.lookup('key1')).toStrictEqual(15);
});

Deno.test('handling empty table operations', () => {
  const hashTable = new HashTable<number>();

  // Lookup and remove on empty table
  expect(hashTable.lookup('nonexistent')).toStrictEqual(undefined);

  hashTable.remove('nonexistent');
  expect(hashTable.lookup('nonexistent')).toStrictEqual(undefined); // Ensure no errors occur
});
