import { expect } from 'jsr:@std/expect';

class Map<T> {
  private map: Record<string, T>;

  constructor() {
    this.map = {};
  }

  set(key: string, value: T): Map<T> {
    this.map[key] = value;

    return this;
  }

  get(key: string): T | undefined {
    return this.map[key];
  }

  has(key: string): boolean {
    return this.map[key] !== undefined;
  }

  size(): number {
    return Object.keys(this.map).length;
  }

  delete(key: string): void {
    delete this.map[key];
  }

  clear(): void {
    for (const key of Object.keys(this.map)) {
      this.delete(key);
    }
  }

  entries(): [string, T][] {
    return Object.entries(this.map);
  }

  forEach(callback: (value: T, key: string) => void): void {
    for (const key in this.map) {
      if (Object.prototype.hasOwnProperty.call(this.map, key)) {
        const value = this.map[key];

        callback(value, key);
      }
    }
  }

  keys(): string[] {
    return Object.keys(this.map);
  }

  values(): T[] {
    return Object.values(this.map);
  }
}

Deno.test('set and get methods', () => {
  const map = new Map<number>();

  map.set('key1', 100);

  expect(map.get('key1')).toStrictEqual(100);
});

Deno.test('has method', () => {
  const map = new Map<number>();

  map.set('key1', 100);

  expect(map.has('key1')).toStrictEqual(true);
  expect(map.has('key2')).toStrictEqual(false);
});

Deno.test('size method', () => {
  const map = new Map<number>();

  map.set('key1', 100).set('key2', 200);

  expect(map.size()).toStrictEqual(2);
});

Deno.test('clear method', () => {
  const map = new Map<number>();

  map.set('key1', 100).set('key2', 200);
  map.clear();

  expect(map.size()).toStrictEqual(0);
  expect(map.has('key1')).toStrictEqual(false);
});

Deno.test('delete method', () => {
  const map = new Map<number>();

  map.set('key1', 100);
  map.delete('key1');

  expect(map.get('key1')).toStrictEqual(undefined);
  expect(map.size()).toStrictEqual(0);
});

Deno.test('entries method', () => {
  const map = new Map<number>();

  map.set('key1', 100).set('key2', 200);

  expect(map.entries()).toStrictEqual([
    ['key1', 100],
    ['key2', 200],
  ]);
});

Deno.test('forEach method', () => {
  const map = new Map<number>();

  map.set('key1', 100).set('key2', 200);

  const keys: string[] = [];
  const values: number[] = [];

  map.forEach((value, key) => {
    keys.push(key);
    values.push(value);
  });

  expect(keys).toStrictEqual(['key1', 'key2']);
  expect(values).toStrictEqual([100, 200]);
});

Deno.test('keys method', () => {
  const map = new Map<number>();

  map.set('key1', 100).set('key2', 200);

  expect(map.keys()).toStrictEqual(['key1', 'key2']);
});

Deno.test('values method', () => {
  const map = new Map<number>();

  map.set('key1', 100).set('key2', 200);

  expect(map.values()).toStrictEqual([100, 200]);
});
