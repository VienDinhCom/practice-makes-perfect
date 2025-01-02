import { expect } from 'jsr:@std/expect';

// https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/depth-first-search

function depthFirstSearch(graph: number[][], root: number) {
  const visited = new Set();
  const values: number[] = [];

  const traverse = (node: number) => {
    visited.add(node);
    values.push(node);

    graph[node].forEach((connected, neighbor) => {
      if (connected && !visited.has(neighbor)) {
        traverse(neighbor);
      }
    });
  };

  traverse(root);

  return values;
}

Deno.test('DFS from node 1 in a fully connected graph', () => {
  const graph = [
    [0, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 0],
  ];
  const start = 1;
  expect(depthFirstSearch(graph, start)).toStrictEqual([1, 0, 2, 3]);
});

Deno.test('DFS from node 3 in a fully connected graph', () => {
  const graph = [
    [0, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 0],
  ];
  const start = 3;
  expect(depthFirstSearch(graph, start)).toStrictEqual([3, 2, 1, 0]);
});

Deno.test('DFS result length from node 1 in a fully connected graph', () => {
  const graph = [
    [0, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 0],
  ];
  const start = 1;
  const result = depthFirstSearch(graph, start);
  expect(result.length).toBe(4);
});

Deno.test('DFS from node 3 in a disconnected graph', () => {
  const graph = [
    [0, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ];
  const start = 3;
  expect(depthFirstSearch(graph, start)).toStrictEqual([3]);
});

Deno.test('DFS result length from node 3 in a disconnected graph', () => {
  const graph = [
    [0, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ];
  const start = 3;
  const result = depthFirstSearch(graph, start);
  expect(result.length).toBe(1);
});

Deno.test('DFS from node 3 in a partially connected graph', () => {
  const graph = [
    [0, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
  ];
  const start = 3;
  expect(depthFirstSearch(graph, start)).toStrictEqual([3, 2]);
});

Deno.test('DFS result length from node 3 in a partially connected graph', () => {
  const graph = [
    [0, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
  ];
  const start = 3;
  const result = depthFirstSearch(graph, start);
  expect(result.length).toBe(2);
});

Deno.test('DFS from node 0 in a partially connected graph', () => {
  const graph = [
    [0, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
  ];
  const start = 0;
  expect(depthFirstSearch(graph, start)).toStrictEqual([0, 1]);
});

Deno.test('DFS result length from node 0 in a partially connected graph', () => {
  const graph = [
    [0, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
  ];
  const start = 0;
  const result = depthFirstSearch(graph, start);
  expect(result.length).toBe(2);
});
