import { expect } from 'jsr:@std/expect';

// https://viendinh.com/posts/zzys-cay-tim-kiem-nhi-phan/

class Node {
  left: Node | null;
  right: Node | null;
  value: number;

  constructor(value: number) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

type Dirrection = 'left' | 'right';

class BinarySearchTree {
  root: Node | null;

  constructor() {
    this.root = null;
  }

  add(value: number): void {
    const node = new Node(value);

    if (this.root === null) {
      this.root = node;
      return;
    }

    let curr = this.root;

    while (curr) {
      if (curr.value === value) return;

      const dirrection: Dirrection = value < curr.value ? 'left' : 'right';

      if (curr[dirrection] === null) {
        curr[dirrection] = node;
        return;
      }

      curr = curr[dirrection];
    }
  }

  findMin(node = this.root): number | null {
    let curr: Node | null = node;

    while (curr) {
      if (curr.left === null) {
        return curr.value;
      }

      curr = curr.left;
    }

    return null;
  }

  findMax(node = this.root): number | null {
    let curr: Node | null = node;

    while (curr) {
      if (curr.right === null) {
        return curr.value;
      }

      curr = curr.right;
    }

    return null;
  }

  isPresent(value: number): boolean {
    let curr: Node | null = this.root;

    while (curr) {
      if (curr.value === value) {
        return true;
      }

      const dirrection: Dirrection = value < curr.value ? 'left' : 'right';

      curr = curr[dirrection];
    }

    return false;
  }

  // https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-find-the-minimum-and-maximum-height-of-a-binary-search-tree/301641
  // findMaxHeight(): number {
  //   const heights: number[] = [];

  //   const traverse = (curr: Node | null, height: number) => {
  //     if (curr === null) {
  //       heights.push(height);
  //       return;
  //     }

  //     traverse(curr.left, height + 1);
  //     traverse(curr.right, height + 1);
  //   };

  //   traverse(this.root, -1);

  //   return Math.max(...heights);
  // }

  findMaxHeight(): number {
    const traverse = (curr: Node | null): number => {
      if (curr === null) return -1;

      return 1 + Math.max(traverse(curr.left), traverse(curr.right));
    };

    return traverse(this.root);
  }

  // findMinHeight(): number {
  //   const heights: number[] = [];

  //   const traverse = (curr: Node | null, height: number) => {
  //     if (curr === null) {
  //       heights.push(height);
  //       return;
  //     }

  //     traverse(curr.left, height + 1);
  //     traverse(curr.right, height + 1);
  //   };

  //   traverse(this.root, -1);

  //   return Math.min(...heights);
  // }

  findMinHeight(): number {
    const traverse = (curr: Node | null): number => {
      if (curr === null) return -1;

      return 1 + Math.min(traverse(curr.left), traverse(curr.right));
    };

    return traverse(this.root);
  }

  isBalanced() {
    return this.findMaxHeight() === this.findMinHeight();
  }

  // Should return a sorted array
  // This method visits nodes in sorted order
  // useful for binary search trees
  // https://www.youtube.com/watch?v=ne5oOmYdWGw
  inOrder = () => {
    if (this.root === null) return null;

    const values: number[] = [];

    const traverse = (curr: Node | null) => {
      if (curr === null) return;

      traverse(curr.left);
      values.push(curr.value);
      traverse(curr.right);
    };

    traverse(this.root);

    return values;
  };

  // Root first
  // This method processes the root first
  // useful to create a copy of the tree or serialize it
  // https://www.youtube.com/watch?v=gLx7Px7IEzg
  preOrder() {
    if (this.root === null) return null;

    const traverse = (curr: Node | null): number[] => {
      if (curr === null) return [];

      return [curr.value, ...traverse(curr.left), ...traverse(curr.right)];
    };

    return traverse(this.root);
  }

  // Children first
  // This method processes all children before their parent
  // useful for deleting trees or calculating values from leaves up
  // https://www.youtube.com/watch?v=a8kmbuNm8Uo
  postOrder = () => {
    if (this.root === null) return null;

    const traverse = (curr: Node | null) => {
      if (curr === null) return [];

      const values: number[] = [];

      values.push(...traverse(curr.left));
      values.push(...traverse(curr.right));
      values.push(curr.value);

      return values;
    };

    return traverse(this.root);
  };

  // finding the shortest path in unweighted graphs or trees.
  levelOrder = () => {
    if (this.root === null) return null;

    const values: number[] = [];

    const queue: Node[] = [this.root];

    while (queue.length > 0) {
      const node = queue.shift()!;

      values.push(node.value);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return values;
  };

  reverseLevelOrder = () => {
    if (this.root === null) return null;

    const values: number[] = [];

    const queue: Node[] = [this.root];

    while (queue.length > 0) {
      const node = queue.shift()!;

      values.push(node.value);

      if (node.right) queue.push(node.right);
      if (node.left) queue.push(node.left);
    }

    return values;
  };

  findNode(value: number): { parent: Node | null; node: Node | null } {
    if (this.root === null) return { parent: null, node: null };

    const queue = [{ parent: null as Node | null, node: this.root }];

    while (queue.length > 0) {
      const { parent, node } = queue.shift()!;

      if (node.value === value) return { parent, node };

      if (node.left) queue.push({ parent: node, node: node.left });
      if (node.right) queue.push({ parent: node, node: node.right });
    }

    return { parent: null, node: null };
  }

  remove(value: number) {
    const { parent, node } = this.findNode(value);

    if (node === null) return null;

    // no child
    if (node.left === null && node.right === null) {
      if (node === this.root) {
        this.root = null;
      } else {
        const dirrection: Dirrection = node === parent?.left ? 'left' : 'right';

        parent![dirrection] = null;
      }

      return;
    }

    // one child
    if ((node.left === null) !== (node.right === null)) {
      if (node === this.root) {
        this.root = node.left || node.right;
      } else {
        const dirrection: Dirrection = node === parent?.left ? 'left' : 'right';

        parent![dirrection] = node.left || node.right;
      }

      return;
    }

    // two childs
    const successorValue = this.findMin(node)!;

    this.remove(successorValue);
    node.value = successorValue;
  }

  invert = () => {
    if (this.root === null) return null;

    const traverse = (node: Node | null) => {
      if (node === null) return;

      [node.left, node.right] = [node.right, node.left];

      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
  };

  // static isBinarySearchTree(tree: BinarySearchTree): boolean {
  //   if (tree.root === null) return true;

  //   const queue = [tree.root];

  //   while (queue.length > 0) {
  //     const node = queue.shift()!;

  //     if (node.left) {
  //       if (node.left.value >= node.value) return false;

  //       queue.push(node.left);
  //     }

  //     if (node.right) {
  //       if (node.right.value <= node.value) return false;

  //       queue.push(node.right);
  //     }
  //   }

  //   return true;
  // }

  static isBinarySearchTree(tree: BinarySearchTree) {
    const validate = (node: Node | null): boolean => {
      if (node === null) return true;

      if (node.left && node.left.value >= node.value) return false;
      if (node.right && node.right.value <= node.value) return false;

      return validate(node.left) && validate(node.right);
    };

    return validate(tree.root);
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

  const before = tree.inOrder();

  tree.invert();

  const after = tree.inOrder();

  // After inversion, check reversed order traversals
  expect(tree.levelOrder()).toStrictEqual([5, 7, 3, 8, 6, 4, 1]);
  expect(tree.inOrder()).toStrictEqual([1, 3, 4, 5, 6, 7, 8].reverse());

  expect(after).toStrictEqual(before?.reverse());
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
