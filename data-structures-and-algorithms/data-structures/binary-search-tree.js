var displayTree = (tree) => console.log(JSON.stringify(tree, null, 2));

function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  this.root = null;

  // Only change code below this line

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

  // Only change code above this line
}
