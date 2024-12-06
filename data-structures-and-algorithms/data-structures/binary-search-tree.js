var displayTree = (tree) => console.log(JSON.stringify(tree, null, 2));

function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  this.root = null;

  this.add = (value) => {
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
  };

  this.findMin = () => {
    if (this.root === null) {
      return null;
    }

    let current = this.root;

    while (current) {
      if (current.left === null) {
        return current.value;
      }

      current = current.left;
    }
  };

  this.findMax = () => {
    if (this.root === null) {
      return null;
    }

    let current = this.root;

    while (current) {
      if (current.right === null) {
        return current.value;
      }

      current = current.right;
    }
  };

  this.isPresent = (value) => {
    let current = this.root;

    while (current) {
      if (value === current.value) {
        return true;
      }

      const dirrection = value < current.value ? 'left' : 'right';

      current = current[dirrection];
    }

    return false;
  };

  // https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-find-the-minimum-and-maximum-height-of-a-binary-search-tree/301641

  // this.findMaxHeight = () => {
  //   const heights = [];

  //   const traverse = (node, count) => {
  //     if (node === null) {
  //       heights.push(count);
  //       return;
  //     }

  //     traverse(node.left, count + 1);
  //     traverse(node.right, count + 1);
  //   };

  //   traverse(this.root, -1);

  //   return Math.max(...heights);
  // };

  this.findMaxHeight = () => {
    const traverse = (node) => {
      if (node === null) return -1;

      return 1 + Math.max(traverse(node.left), traverse(node.right));
    };

    return traverse(this.root);
  };

  // this.findMinHeight = () => {
  //   const heights = [];

  //   const traverse = (node, count) => {
  //     if (node === null) {
  //       heights.push(count);
  //       return;
  //     }

  //     traverse(node.left, count + 1);
  //     traverse(node.right, count + 1);
  //   };

  //   traverse(this.root, -1);

  //   return Math.min(...heights);
  // };

  this.findMinHeight = () => {
    const traverse = (node) => {
      if (node === null) return -1;

      return 1 + Math.min(traverse(node.left), traverse(node.right));
    };

    return traverse(this.root);
  };

  this.isBalanced = () => {
    return this.findMaxHeight() === this.findMinHeight();
  };

  // This method visits nodes in sorted order
  // useful for binary search trees
  // https://www.youtube.com/watch?v=ne5oOmYdWGw
  this.inOrder = () => {
    if (this.root === null) return null;

    const traverse = (node) => {
      if (node === null) return [];

      const nodes = [];

      nodes.push(...traverse(node.left));
      nodes.push(node.value);
      nodes.push(...traverse(node.right));

      return nodes;
    };

    return traverse(this.root);
  };

  // This method processes the root first
  // useful to create a copy of the tree or serialize it
  // https://www.youtube.com/watch?v=gLx7Px7IEzg
  this.preOrder = () => {
    if (this.root === null) return null;

    const traverse = (node) => {
      if (node === null) return [];

      const nodes = [];

      nodes.push(node.value);
      nodes.push(...traverse(node.left));
      nodes.push(...traverse(node.right));

      return nodes;
    };

    return traverse(this.root);
  };

  // This method processes all children before their parent
  // useful for deleting trees or calculating values from leaves up
  // https://www.youtube.com/watch?v=a8kmbuNm8Uo
  this.postOrder = () => {
    if (this.root === null) return null;

    const traverse = (node) => {
      if (node === null) return [];

      const nodes = [];

      nodes.push(...traverse(node.left));
      nodes.push(...traverse(node.right));
      nodes.push(node.value);

      return nodes;
    };

    return traverse(this.root);
  };

  this.levelOrder = () => {
    if (this.root === null) return null;

    const queue = [this.root];
    const results = [];

    const pushIfThere = (node) => {
      if (node) queue.push(node);
    };

    while (queue.length > 0) {
      const node = queue.shift();

      results.push(node.value);

      pushIfThere(node.left);
      pushIfThere(node.right);
    }

    return results;
  };

  
}

function isBinarySearchTree(tree) {
  const validate = (node) => {
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

  return validate(tree.root);
}
