function bfs(graph = [[]], root = 0) {
  const distances = {};
  const queue = [];

  for (let i = 0; i < graph.length; i++) {
    distances[i] = Infinity;
  }

  distances[root] = 0;
  queue.push(root);

  while (queue.length) {
    const node = queue.shift();

    graph[node].forEach((connected, neighbor) => {
      if (connected && distances[neighbor] === Infinity) {
        distances[neighbor] = distances[node] + 1;

        queue.push(neighbor);
      }
    });
  }

  return distances;
}

const exBFSGraph = [
  [0, 1, 0, 0],
  [1, 0, 1, 0],
  [0, 1, 0, 1],
  [0, 0, 1, 0],
];

console.log(bfs(exBFSGraph, 3));
