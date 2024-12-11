const displayTree = (tree) => console.log(JSON.stringify(tree, null, 2));

const Node = function () {
  this.keys = new Map();
  this.end = false;
  this.setEnd = function () {
    this.end = true;
  };
  this.isEnd = function () {
    return this.end;
  };
};

const Trie = function () {
  this.root = new Node();

  this.add = (word) => {
    let current = this.root;

    for (const char of word) {
      if (!current.keys.has(char)) {
        current.keys.set(char, new Node());
      }

      current = current.keys.get(char);
    }

    current.end = true;
  };

  this.isWord = (word) => {
    let current = this.root;

    for (const char of word) {
      if (!current.keys.has(char)) {
        return false;
      }

      current = current.keys.get(char);
    }

    return current.end;
  };

  this.print = () => {
    const words = [];

    const traverse = (node, prefix) => {
      if (node.end) {
        words.push(prefix);
      }

      for (const [char, child] of node.keys.entries()) {
        traverse(child, prefix + char);
      }
    };

    traverse(this.root, '');

    return words;
  };
};
