import { expect } from 'jsr:@std/expect';

class Node {
  value: number;
  left: Node | null;
  right: Node | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  root: Node | null;

  constructor() {
    this.root = null;
  }

  add(value: number) {
    const node = new Node(value);

    if (this.root === null) {
      this.root = node;
      return;
    }

    let current = this.root;

    while (current) {
      if (node.value === current.value) {
        return null;
      }

      const dirrection = node.value < current.value ? 'left' : 'right';

      if (current[dirrection] === null) {
        current[dirrection] = node;
        return;
      }

      current = current[dirrection];
    }
  }

  findMin(node = this.root) {
    if (node === null) {
      return null;
    }

    let current = node;

    while (current) {
      if (current.left === null) {
        return current.value;
      }

      current = current.left;
    }
  }

  findMax(node = this.root) {
    if (node === null) {
      return null;
    }

    let current = node;

    while (current) {
      if (current.right === null) {
        return current.value;
      }

      current = current.right;
    }
  }

  isPresent(value: number) {
    let current = this.root;

    while (current) {
      if (value === current.value) {
        return true;
      }

      const dirrection = value < current.value ? 'left' : 'right';

      current = current[dirrection];
    }

    return false;
  }

  // https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-find-the-minimum-and-maximum-height-of-a-binary-search-tree/301641
  // findMaxHeight() {
  //   const heights: number[] = [];

  //   const traverse = (node: Node, count: number) => {
  //     if (node === null) {
  //       heights.push(count);
  //       return;
  //     }

  //     traverse(node.left!, count + 1);
  //     traverse(node.right!, count + 1);
  //   };

  //   traverse(this.root!, -1);

  //   return Math.max(...heights);
  // }

  findMaxHeight() {
    const traverse = (node: Node): number => {
      if (node === null) return -1;

      return 1 + Math.max(traverse(node.left!), traverse(node.right!));
    };

    return traverse(this.root!);
  }

  // findMinHeight = () => {
  //   const heights: number[] = [];

  //   const traverse = (node: Node, count: number) => {
  //     if (node === null) {
  //       heights.push(count);
  //       return;
  //     }

  //     traverse(node.left!, count + 1);
  //     traverse(node.right!, count + 1);
  //   };

  //   traverse(this.root!, -1);

  //   return Math.min(...heights);
  // };

  findMinHeight() {
    const traverse = (node: Node): number => {
      if (node === null) return -1;

      return 1 + Math.min(traverse(node.left!), traverse(node.right!));
    };

    return traverse(this.root!);
  }

  isBalanced() {
    return this.findMaxHeight() === this.findMinHeight();
  }

  // This method visits nodes in sorted order
  // useful for binary search trees
  // https://www.youtube.com/watch?v=ne5oOmYdWGw
  inOrder = () => {
    if (this.root === null) return null;

    const traverse = (node: Node): number[] => {
      if (node === null) return [];

      const nodes: number[] = [];

      nodes.push(...traverse(node.left!));
      nodes.push(node.value);
      nodes.push(...traverse(node.right!));

      return nodes;
    };

    return traverse(this.root);
  };

  // This method processes the root first
  // useful to create a copy of the tree or serialize it
  // https://www.youtube.com/watch?v=gLx7Px7IEzg
  preOrder() {
    if (this.root === null) return null;

    const traverse = (node: Node): number[] => {
      if (node === null) return [];

      const nodes = [];

      nodes.push(node.value);
      nodes.push(...traverse(node.left!));
      nodes.push(...traverse(node.right!));

      return nodes;
    };

    return traverse(this.root);
  }

  // This method processes all children before their parent
  // useful for deleting trees or calculating values from leaves up
  // https://www.youtube.com/watch?v=a8kmbuNm8Uo
  postOrder = () => {
    if (this.root === null) return null;

    const traverse = (node: Node): number[] => {
      if (node === null) return [];

      const nodes = [];

      nodes.push(...traverse(node.left!));
      nodes.push(...traverse(node.right!));
      nodes.push(node.value);

      return nodes;
    };

    return traverse(this.root);
  };

  levelOrder = () => {
    if (this.root === null) return null;

    const queue = [this.root];
    const results = [];

    const pushIfThere = (node: Node) => {
      if (node) queue.push(node);
    };

    while (queue.length > 0) {
      const node = queue.shift()!;

      results.push(node.value);

      pushIfThere(node.left!);
      pushIfThere(node.right!);
    }

    return results;
  };

  reverseLevelOrder = () => {
    if (this.root === null) return null;

    const queue = [this.root];
    const results = [];

    const pushIfThere = (node: Node) => {
      if (node) queue.push(node);
    };

    while (queue.length > 0) {
      const node = queue.shift()!;

      results.push(node.value);

      pushIfThere(node.right!);
      pushIfThere(node.left!);
    }

    return results;
  };

  remove = (value: number) => {
    if (this.root === null) {
      return null;
    }

    const hasNoChildren = (node: Node) => node.left === null && node.right === null;
    const hasOneChild = (node: Node) => (node.left === null) !== (node.right === null);
    const hasTwoChilds = (node: Node) => node.left && node.right;

    if (value === this.root.value) {
      if (hasNoChildren(this.root)) {
        this.root = null;
      } else if (hasOneChild(this.root)) {
        this.root = this.root.left || this.root.right;
      } else if (hasTwoChilds(this.root)) {
        const successorValue = this.findMin(this.root.right)!;

        this.remove(successorValue);

        this.root.value = successorValue;
      }

      return;
    }

    let parent: Node | null = null;
    let target = this.root;

    while (target) {
      if (target.value === value) {
        const dirrection = parent!.left === target ? 'left' : 'right';

        if (hasNoChildren(target)) {
          parent![dirrection] = null;
        } else if (hasOneChild(target)) {
          parent![dirrection] = target.left || target.right;
        } else if (hasTwoChilds(target)) {
          const successorValue = this.findMin(target.right)!;

          this.remove(successorValue);

          target.value = successorValue;
        }

        return;
      }

      parent = target;

      if (value > target.value) {
        target = target.right!;
      } else {
        target = target.left!;
      }
    }
  };

  invert = () => {
    if (this.root === null) return null;

    const traverse = (node: Node) => {
      if (node === null) return;

      [node.left, node.right] = [node.right, node.left];

      traverse(node.left!);
      traverse(node.right!);
    };

    traverse(this.root);
  };

  static isBinarySearchTree(tree: BinarySearchTree) {
    const validate = (node: Node): boolean => {
      if (node === null) return true;

      if (node.left === null) {
        return true;
      } else if (node.left.value >= node.value) {
        return false;
      }

      if (node.right === null) {
        return true;
      } else if (node.right.value <= node.value) {
        return false;
      }

      return validate(node.left) && validate(node.right);
    };

    return validate(tree.root!);
  }
}

Deno.test('BinarySearchTree - add method', () => {
  const tree = new BinarySearchTree();

  // Test adding first element
  tree.add(5);
  expect(tree.root?.value).toStrictEqual(5);

  // Test adding smaller element
  tree.add(3);
  expect(tree.root?.left?.value).toStrictEqual(3);

  // Test adding larger element
  tree.add(7);
  expect(tree.root?.right?.value).toStrictEqual(7);

  // Test preventing duplicate values
  tree.add(5);
  expect(tree.root?.left?.value).toStrictEqual(3);
  expect(tree.root?.right?.value).toStrictEqual(7);
});

Deno.test('BinarySearchTree - findMin method', () => {
  const tree = new BinarySearchTree();

  // Test empty tree
  expect(tree.findMin()).toBeNull();

  // Test tree with single element
  tree.add(5);
  expect(tree.findMin()).toStrictEqual(5);

  // Test tree with multiple elements
  tree.add(3);
  tree.add(7);
  tree.add(1);
  expect(tree.findMin()).toStrictEqual(1);
});

Deno.test('BinarySearchTree - findMax method', () => {
  const tree = new BinarySearchTree();

  // Test empty tree
  expect(tree.findMax()).toBeNull();

  // Test tree with single element
  tree.add(5);
  expect(tree.findMax()).toStrictEqual(5);

  // Test tree with multiple elements
  tree.add(3);
  tree.add(7);
  tree.add(9);
  expect(tree.findMax()).toStrictEqual(9);
});

Deno.test('BinarySearchTree - isPresent method', () => {
  const tree = new BinarySearchTree();

  // Test empty tree
  expect(tree.isPresent(5)).toStrictEqual(false);

  // Add elements and test presence
  tree.add(5);
  tree.add(3);
  tree.add(7);

  expect(tree.isPresent(5)).toStrictEqual(true);
  expect(tree.isPresent(3)).toStrictEqual(true);
  expect(tree.isPresent(7)).toStrictEqual(true);

  expect(tree.isPresent(1)).toStrictEqual(false);
});

Deno.test('BinarySearchTree - findMaxHeight method', () => {
  const tree = new BinarySearchTree();

  // Test empty tree
  expect(tree.findMaxHeight()).toStrictEqual(-1);

  // Test single element tree
  tree.add(5);
  expect(tree.findMaxHeight()).toStrictEqual(0);

  // Test unbalanced tree
  tree.add(3);
  tree.add(7);
  tree.add(1);
  tree.add(4);
  tree.add(6);
  tree.add(8);
  expect(tree.findMaxHeight()).toStrictEqual(2);
});

Deno.test('BinarySearchTree - findMinHeight method', () => {
  const tree = new BinarySearchTree();

  // Test empty tree
  expect(tree.findMinHeight()).toStrictEqual(-1);

  // Test single element tree
  tree.add(5);
  expect(tree.findMinHeight()).toStrictEqual(0);

  // Test balanced and unbalanced trees
  tree.add(3);
  tree.add(7);
  expect(tree.findMinHeight()).toStrictEqual(1);
});

Deno.test('BinarySearchTree - isBalanced method', () => {
  // Test empty tree
  const tree = new BinarySearchTree();
  tree.isBalanced(); // Should return true

  // Test balanced tree
  const tree1 = new BinarySearchTree();
  tree1.add(5);
  tree1.add(3);
  tree1.add(7);
  expect(tree1.isBalanced()).toStrictEqual(true);

  // Test unbalanced tree
  const tree2 = new BinarySearchTree();
  tree2.add(1);
  tree2.add(4);
  tree2.add(6);
  tree2.add(8);
  expect(tree2.isBalanced()).toStrictEqual(false);
});

Deno.test('BinarySearchTree - traversal methods', () => {
  const tree = new BinarySearchTree();
  tree.add(5);
  tree.add(3);
  tree.add(7);
  tree.add(1);
  tree.add(4);
  tree.add(6);
  tree.add(8);

  // inOrder traversal (should return sorted array)
  expect(tree.inOrder()).toStrictEqual([1, 3, 4, 5, 6, 7, 8]);

  // preOrder traversal (root first)
  expect(tree.preOrder()).toStrictEqual([5, 3, 1, 4, 7, 6, 8]);

  // postOrder traversal (children before parent)
  expect(tree.postOrder()).toStrictEqual([1, 4, 3, 6, 8, 7, 5]);

  // levelOrder traversal
  expect(tree.levelOrder()).toStrictEqual([5, 3, 7, 1, 4, 6, 8]);

  // reverseLevelOrder traversal
  expect(tree.reverseLevelOrder()).toStrictEqual([5, 7, 3, 8, 6, 4, 1]);
});

Deno.test('remove: node with no children (leaf node)', () => {
  const tree = new BinarySearchTree();
  tree.add(10);
  tree.add(5);
  tree.add(15);

  tree.remove(5);

  expect(tree.inOrder()).toStrictEqual([10, 15]);
  expect(tree.isPresent(5)).toBe(false);
});

Deno.test('remove: node with one child', () => {
  const tree = new BinarySearchTree();
  tree.add(10);
  tree.add(5);
  tree.add(15);
  tree.add(3); // Left child of 5

  tree.remove(5);

  expect(tree.inOrder()).toStrictEqual([3, 10, 15]);
  expect(tree.isPresent(5)).toBe(false);
  expect(tree.isPresent(3)).toBe(true);
});

Deno.test('remove: node with two children', () => {
  const tree = new BinarySearchTree();
  tree.add(10);
  tree.add(5);
  tree.add(15);
  tree.add(12);
  tree.add(18);

  tree.remove(15);

  expect(tree.inOrder()).toStrictEqual([5, 10, 12, 18]);
  expect(tree.isPresent(15)).toBe(false);
  expect(tree.isPresent(12)).toBe(true);
});

Deno.test('remove: root node with no children', () => {
  const tree = new BinarySearchTree();
  tree.add(10);

  tree.remove(10);

  expect(tree.inOrder()).toStrictEqual(null);
  expect(tree.isPresent(10)).toBe(false);
});

Deno.test('remove: root node with one child', () => {
  const tree = new BinarySearchTree();
  tree.add(10);
  tree.add(5); // Left child

  tree.remove(10);

  expect(tree.inOrder()).toStrictEqual([5]);
  expect(tree.isPresent(10)).toBe(false);
  expect(tree.isPresent(5)).toBe(true);
});

Deno.test('remove: root node with two children', () => {
  const tree = new BinarySearchTree();
  tree.add(10);
  tree.add(5);
  tree.add(15);

  tree.remove(10);

  expect(tree.inOrder()).toStrictEqual([5, 15]);
  expect(tree.isPresent(10)).toBe(false);
});

Deno.test('remove: node not present in the tree', () => {
  const tree = new BinarySearchTree();
  tree.add(10);
  tree.add(5);
  tree.add(15);

  tree.remove(20);

  expect(tree.inOrder()).toStrictEqual([5, 10, 15]);
  expect(tree.isPresent(20)).toBe(false);
});

Deno.test('remove: node from a more complex tree', () => {
  const tree = new BinarySearchTree();
  tree.add(50);
  tree.add(30);
  tree.add(70);
  tree.add(20);
  tree.add(40);
  tree.add(60);
  tree.add(80);

  tree.remove(30);

  expect(tree.inOrder()).toStrictEqual([20, 40, 50, 60, 70, 80]);
  expect(tree.isPresent(30)).toBe(false);
});

Deno.test('BinarySearchTree - remove method', () => {
  const tree = new BinarySearchTree();

  // Remove from empty tree
  tree.remove(5);
  expect(tree.root).toBeNull();

  // Populate tree
  tree.add(5);
  tree.add(3);
  tree.add(7);
  tree.add(1);
  tree.add(4);
  tree.add(6);
  tree.add(8);

  // Remove leaf node
  tree.remove(1);
  expect(tree.inOrder()).toStrictEqual([3, 4, 5, 6, 7, 8]);

  // Remove node with one child
  tree.remove(3);
  expect(tree.inOrder()).toStrictEqual([4, 5, 6, 7, 8]);

  // Remove node with two children (root)
  tree.remove(5);
  expect(tree.inOrder()).toStrictEqual([4, 6, 7, 8]);
});

Deno.test('BinarySearchTree - invert method', () => {
  const tree = new BinarySearchTree();
  tree.add(5);
  tree.add(3);
  tree.add(7);
  tree.add(1);
  tree.add(4);
  tree.add(6);
  tree.add(8);

  tree.invert();

  // After inversion, check reversed order traversals
  expect(tree.levelOrder()).toStrictEqual([5, 7, 3, 8, 6, 4, 1]);
});

Deno.test('BinarySearchTree - isBinarySearchTree static method', () => {
  const validTree = new BinarySearchTree();
  validTree.add(5);
  validTree.add(3);
  validTree.add(7);

  const invalidTree = new BinarySearchTree();
  invalidTree.root = {
    value: 5,
    left: { value: 6, left: null, right: null },
    right: { value: 4, left: null, right: null },
  };

  expect(BinarySearchTree.isBinarySearchTree(validTree)).toStrictEqual(true);
  expect(BinarySearchTree.isBinarySearchTree(invalidTree)).toStrictEqual(false);
});
