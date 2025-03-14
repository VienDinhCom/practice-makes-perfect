import { expect } from 'jsr:@std/expect';

// https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/create-a-trie-search-tree
// https://www.geeksforgeeks.org/trie-insert-and-search/

// review
class Node {
  children: Map<string, Node>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  root: Node;

  constructor() {
    this.root = new Node();
  }

  add(word: string): void {
    let curr: Node = this.root;

    for (const char of word) {
      if (!curr.children.has(char)) {
        curr.children.set(char, new Node());
      }

      curr = curr.children.get(char)!;
    }

    curr.isEndOfWord = true;
  }

  isWord(word: string): boolean {
    let current: Node = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        return false;
      }

      current = current.children.get(char)!;
    }

    return current.isEndOfWord;
  }

  print(): string[] {
    const words: string[] = [];

    const traverse = (node: Node, prefix: string) => {
      if (node.isEndOfWord) {
        words.push(prefix);
      }

      node.children.forEach((node, char) => {
        traverse(node, prefix + char);
      });
    };

    traverse(this.root, '');

    return words;
  }
}

Deno.test('add and isWord test', () => {
  const trie = new Trie();

  // Test adding words
  trie.add('cat');
  trie.add('car');
  trie.add('cart');

  // Test isWord for existing words
  expect(trie.isWord('cat')).toStrictEqual(true);
  expect(trie.isWord('car')).toStrictEqual(true);
  expect(trie.isWord('cart')).toStrictEqual(true);

  // Test isWord for non-existing words
  expect(trie.isWord('ca')).toStrictEqual(false);
  expect(trie.isWord('cats')).toStrictEqual(false);
  expect(trie.isWord('dog')).toStrictEqual(false);
});

Deno.test('print test', () => {
  const trie = new Trie();

  // Add words
  trie.add('apple');
  trie.add('app');
  trie.add('bat');
  trie.add('ball');

  // Test print method
  expect(trie.print().sort()).toStrictEqual(['app', 'apple', 'ball', 'bat']);
});

Deno.test('empty trie test', () => {
  const trie = new Trie();

  // Test isWord on an empty trie
  expect(trie.isWord('')).toStrictEqual(false);
  expect(trie.isWord('random')).toStrictEqual(false);

  // Test print on an empty trie
  expect(trie.print()).toStrictEqual([]);
});

Deno.test('prefix as non-word test', () => {
  const trie = new Trie();

  // Add words
  trie.add('prefix');
  trie.add('pre');

  // Test prefixes
  expect(trie.isWord('pre')).toStrictEqual(true);
  expect(trie.isWord('prefix')).toStrictEqual(true);
  expect(trie.isWord('pref')).toStrictEqual(false);
});
