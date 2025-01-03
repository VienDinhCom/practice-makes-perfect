import { expect } from 'jsr:@std/expect';

class Graph {
  private adjMatrix: number[][];
  private vertexData: string[];
  private size: number;

  // review
  constructor(size: number) {
    this.adjMatrix = Array(size)
      .fill(null)
      .map(() => Array(size).fill(0));
    this.vertexData = Array(size).fill('');
    this.size = size;
  }

  private isValidVertex(vertex: number): boolean {
    return vertex >= 0 && vertex < this.size;
  }

  addEdge(u: number, v: number): void {
    if (this.isValidVertex(u) && this.isValidVertex(v)) {
      this.adjMatrix[u][v] = 1;
      this.adjMatrix[v][u] = 1;
    }
  }

  addVertexData(vertex: number, data: string): void {
    if (this.isValidVertex(vertex)) {
      this.vertexData[vertex] = data;
    }
  }

  breadthFirstSearch(startVertex: number): number[] {
    if (!this.isValidVertex(startVertex)) {
      return [];
    }

    const visited: boolean[] = Array(this.size).fill(false);
    const result: number[] = [];
    const queue: number[] = [];

    // Start BFS from the given vertex
    visited[startVertex] = true;
    queue.push(startVertex);

    while (queue.length > 0) {
      const currentVertex = queue.shift()!;
      result.push(currentVertex);

      // Visit all adjacent vertices
      for (let i = 0; i < this.size; i++) {
        if (this.adjMatrix[currentVertex][i] === 1 && !visited[i]) {
          visited[i] = true;
          queue.push(i);
        }
      }
    }

    return result;
  }

  depthFirstSearch(startVertex: number): number[] {
    const visited: boolean[] = Array(this.size).fill(false);
    const result: number[] = [];

    if (!this.isValidVertex(startVertex)) {
      return result;
    }

    const dfsHelper = (vertex: number): void => {
      visited[vertex] = true;
      result.push(vertex);

      for (let i = 0; i < this.size; i++) {
        if (this.adjMatrix[vertex][i] === 1 && !visited[i]) {
          dfsHelper(i);
        }
      }
    };

    dfsHelper(startVertex);
    return result;
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
  const graph = new Graph(5);

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
  expect(graph['vertexData'][4]).toBe(''); // Should remain unchanged
});

Deno.test('Graph BFS traversal', () => {
  const graph = new Graph(6);

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
  const graph = new Graph(6);

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
  const graph = new Graph(4);

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
