import { expect } from 'jsr:@std/expect';

class Graph<T> {
  private size: number;
  private adjMatrix: number[][];
  private vertexData: T[];

  constructor(size: number) {
    this.size = size;
    this.adjMatrix = new Array(size).fill(null).map(() => new Array(size).fill(0));
    this.vertexData = new Array(size);
  }

  private isValidVertex(vertex: number): boolean {
    return vertex < this.size && vertex >= 0;
  }

  addEdge(x: number, y: number): void {
    if (this.isValidVertex(x) && this.isValidVertex(y)) {
      this.adjMatrix[x][y] = 1;
      this.adjMatrix[y][x] = 1;
    }
  }

  addVertexData(vertex: number, data: T): void {
    if (this.isValidVertex(vertex)) {
      this.vertexData[vertex] = data;
    }
  }

  breadthFirstSearch(start: number): number[] {
    if (!this.isValidVertex(start)) return [];

    const visited = new Set<number>();

    visited.add(start);

    const queue: number[] = [start];

    while (queue.length > 0) {
      const node = queue.shift()!;

      this.adjMatrix[node].forEach((connected, neighbor) => {
        if (connected && !visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return Array.from(visited);
  }

  depthFirstSearch(start: number): number[] {
    if (!this.isValidVertex(start)) return [];

    const visited = new Set<number>();

    visited.add(start);

    const traverse = (node: number) => {
      this.adjMatrix[node].forEach((connected, neighbor) => {
        if (connected && !visited.has(neighbor)) {
          visited.add(neighbor);

          traverse(neighbor);
        }
      });
    };

    traverse(start);

    return Array.from(visited);
  }

  printGraph(): void {
    console.log('Adjacency Matrix:');
    this.adjMatrix.forEach((row) => {
      console.log(row.join(' '));
    });

    console.log('\nVertex Data:');
    this.vertexData.forEach((data, vertex) => {
      console.log(`Vertex ${vertex}: ${data}`);
    });
  }
}

Deno.test('Graph initialization and basic operations', () => {
  const graph = new Graph<string>(5);

  // Test initial state
  expect(graph['size']).toBe(5);
  expect(graph['adjMatrix'].length).toBe(5);
  expect(graph['adjMatrix'][0].length).toBe(5);
  expect(graph['vertexData'].length).toBe(5);

  // Test edge addition
  graph.addEdge(0, 1);
  expect(graph['adjMatrix'][0][1]).toBe(1);
  expect(graph['adjMatrix'][1][0]).toBe(1);

  // Test invalid edge addition
  graph.addEdge(-1, 1);
  expect(graph['adjMatrix'][0][1]).toBe(1); // Should remain unchanged

  // Test vertex data addition
  graph.addVertexData(0, 'A');
  expect(graph['vertexData'][0]).toBe('A');

  // Test invalid vertex data addition
  graph.addVertexData(5, 'Invalid');
  expect(graph['vertexData'][4]).toBe(undefined); // Should remain unchanged
});

Deno.test('Graph BFS traversal', () => {
  const graph = new Graph<string>(6);

  // Create a test graph
  //     0
  //    / \
  //   1   2
  //  / \   \
  // 3   4   5
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(1, 3);
  graph.addEdge(1, 4);
  graph.addEdge(2, 5);

  // Test BFS from vertex 0
  const bfsResult = graph.breadthFirstSearch(0);
  expect(bfsResult).toStrictEqual([0, 1, 2, 3, 4, 5]);

  // Test BFS from invalid vertex
  const invalidBfs = graph.breadthFirstSearch(6);
  expect(invalidBfs).toStrictEqual([]);

  // Test BFS from leaf node
  const leafBfs = graph.breadthFirstSearch(3);
  expect(leafBfs).toStrictEqual([3, 1, 0, 4, 2, 5]);
});

Deno.test('Graph DFS traversal', () => {
  const graph = new Graph<string>(6);

  // Create the same test graph
  //     0
  //    / \
  //   1   2
  //  / \   \
  // 3   4   5
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(1, 3);
  graph.addEdge(1, 4);
  graph.addEdge(2, 5);

  // Test DFS from vertex 0
  const dfsResult = graph.depthFirstSearch(0);
  expect(dfsResult).toStrictEqual([0, 1, 3, 4, 2, 5]);

  // Test DFS from invalid vertex
  const invalidDfs = graph.depthFirstSearch(6);
  expect(invalidDfs).toStrictEqual([]);

  // Test DFS from leaf node
  const leafDfs = graph.depthFirstSearch(3);
  expect(leafDfs).toStrictEqual([3, 1, 0, 2, 5, 4]);
});

Deno.test('Complex graph operations', () => {
  const graph = new Graph<string>(4);

  // Create a fully connected graph
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(0, 3);
  graph.addEdge(1, 2);
  graph.addEdge(1, 3);
  graph.addEdge(2, 3);

  // Add vertex data
  graph.addVertexData(0, 'Start');
  graph.addVertexData(1, 'Middle1');
  graph.addVertexData(2, 'Middle2');
  graph.addVertexData(3, 'End');

  // Test BFS from each vertex
  expect(graph.breadthFirstSearch(0)).toStrictEqual([0, 1, 2, 3]);
  expect(graph.breadthFirstSearch(1)).toStrictEqual([1, 0, 2, 3]);
  expect(graph.breadthFirstSearch(2)).toStrictEqual([2, 0, 1, 3]);
  expect(graph.breadthFirstSearch(3)).toStrictEqual([3, 0, 1, 2]);

  // Test DFS from each vertex
  const dfsFrom0 = graph.depthFirstSearch(0);
  expect(dfsFrom0.length).toBe(4);
  expect(new Set(dfsFrom0)).toStrictEqual(new Set([0, 1, 2, 3]));
});
