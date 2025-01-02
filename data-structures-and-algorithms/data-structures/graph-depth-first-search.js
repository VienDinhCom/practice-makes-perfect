function dfs(graph, root) {
  const visited = new Set();
  const result = [];

  function explore(node) {
    visited.add(node);
    result.push(node);

    graph[node].forEach((connected, neighbor) => {
      if (connected && !visited.has(neighbor)) {
        explore(neighbor);
      }
    });
  }

  explore(root);

  return result;
}

const exDFSGraph = [
  [0, 1, 0, 0],
  [1, 0, 1, 0],
  [0, 1, 0, 1],
  [0, 0, 1, 0],
];

console.log(dfs(exDFSGraph, 3));
