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

  this.findMaxHeight = () => {
    const heights = [];

    const traverse = (node, count) => {
      if (node === null) {
        heights.push(count);
        return;
      }

      traverse(node.left, count + 1);
      traverse(node.right, count + 1);
    };

    traverse(this.root, -1);

    return Math.max(...heights);
  };

  this.findMinHeight = () => {
    const heights = [];

    const traverse = (node, count) => {
      if (node === null) {
        heights.push(count);
        return;
      }

      traverse(node.left, count + 1);
      traverse(node.right, count + 1);
    };

    traverse(this.root, -1);

    return Math.min(...heights);
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
