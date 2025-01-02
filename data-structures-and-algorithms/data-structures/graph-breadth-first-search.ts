import { expect } from 'jsr:@std/expect';

// https://www.freecodecamp.org/learn/coding-interview-prep/data-structures/breadth-first-search

function breadthFirstSearch(graph: number[][], root: number) {
  const distances: Record<number, number> = {};
  const queue: number[] = [];

  graph.forEach((_, index) => {
    distances[index] = Infinity;
  });

  distances[root] = 0;
  queue.push(root);

  while (queue.length) {
    const current = queue.shift()!;

    graph[current].forEach((connected, neighbor) => {
      if (connected && distances[neighbor] === Infinity) {
        distances[neighbor] = distances[current] + 1;

        queue.push(neighbor);
      }
    });
  }

  return distances;
}

Deno.test('Test 1', () => {
  const adjacencyMatrixGraph = [
    [0, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 0],
  ];

  const distances = breadthFirstSearch(adjacencyMatrixGraph, 1);

  expect(distances).toStrictEqual({ 0: 1, 1: 0, 2: 1, 3: 2 });
});

Deno.test('Test 1', () => {
  const adjacencyMatrixGraph = [
    [0, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ];

  const distances = breadthFirstSearch(adjacencyMatrixGraph, 1);

  expect(distances).toStrictEqual({ 0: 1, 1: 0, 2: 1, 3: Infinity });
});

Deno.test('Test 3', () => {
  const adjacencyMatrixGraph = [
    [0, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 0],
  ];

  const distances = breadthFirstSearch(adjacencyMatrixGraph, 0);

  expect(distances).toStrictEqual({ 0: 0, 1: 1, 2: 2, 3: 3 });
});

Deno.test('Test 4', () => {
  const adjacencyMatrixGraph = [
    [0, 1],
    [1, 0],
  ];

  const distances = breadthFirstSearch(adjacencyMatrixGraph, 0);

  expect(distances).toStrictEqual({ 0: 0, 1: 1 });
});
