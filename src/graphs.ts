import { SinglyLinkedList } from './linkedLists.ts';
import { PriorityQueue } from './binaryTrees.ts';

type Vertex = string;

type Weight = number;

type WeightedEdge = {
  vertex: Vertex;
  weight: Weight;
};

export class Graph {
  adjacencyList: {
    [index: string]: Vertex[];
  };

  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vert: Vertex) {
    if (!this.adjacencyList[vert]) {
      this.adjacencyList[vert] = [];
    }
  }

  addEdge(vert1: Vertex, vert2: Vertex) {
    if (this.adjacencyList[vert1] && this.adjacencyList[vert1]) {
      this.adjacencyList[vert1].push(vert2);
      this.adjacencyList[vert2].push(vert1);
    }
  }
  removeVertex(vert: Vertex) {
    if (this.adjacencyList[vert]) {
      this.adjacencyList[vert].forEach((neighbour: Vertex) => {
        this.adjacencyList[neighbour] = this.adjacencyList[neighbour].filter((val) => val !== vert);
      });
      delete this.adjacencyList[vert];
    }
  }
  removeEdge(vert1: Vertex, vert2: Vertex) {
    if (this.adjacencyList[vert1] && this.adjacencyList[vert1]) {
      this.adjacencyList[vert1] = this.adjacencyList[vert1].filter((val) => val !== vert2);
      this.adjacencyList[vert2] = this.adjacencyList[vert2].filter((val) => val !== vert1);
    }
  }
  dfsRecursive(vert: Vertex, visited: { [index: string]: boolean } = {}): string[] {
    visited[vert] = true;
    let result = [vert];

    if (this.adjacencyList[vert].every((neighbor) => visited[neighbor])) {
      return result;
    }

    this.adjacencyList[vert].forEach((neighbour) => {
      if (!visited[neighbour]) {
        result = [...result, ...this.dfsRecursive(neighbour, visited)];
      }
    });
    return result;
  }

  dfsIterative(vert: Vertex): string[] {
    const stack = new SinglyLinkedList<Vertex>();
    const visited: { [index: string]: boolean } = {};
    const result: Vertex[] = [];

    stack.unshift(vert);

    while (stack.length > 0) {
      const { val: currentVert } = stack.shift();
      if (visited[currentVert]) {
        continue;
      } else {
        visited[currentVert] = true;
      }
      result.push(currentVert);
      this.adjacencyList[currentVert].reverse().forEach((neighbour) => {
        if (!visited[neighbour]) {
          stack.unshift(neighbour);
        }
      });
    }
    return result;
  }
  bfsIterative(vert: Vertex): string[] {
    const queue = new SinglyLinkedList<Vertex>();
    const visited: { [index: string]: boolean } = {};
    const result: Vertex[] = [];

    queue.push(vert);

    while (queue.length > 0) {
      const { val: currentVert } = queue.shift();
      if (visited[currentVert]) {
        continue;
      } else {
        visited[currentVert] = true;
      }
      result.push(currentVert);
      this.adjacencyList[currentVert].forEach((neighbour) => {
        if (!visited[neighbour]) {
          queue.push(neighbour);
        }
      });
    }
    return result;
  }
}

export class WeightedGraph {
  adjacencyList: {
    [index: string]: WeightedEdge[];
  };

  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vert: Vertex) {
    if (!this.adjacencyList[vert]) {
      this.adjacencyList[vert] = [];
    }
  }

  addEdge(vert1: Vertex, vert2: Vertex, weight: Weight) {
    if (this.adjacencyList[vert1] && this.adjacencyList[vert1]) {
      this.adjacencyList[vert1].push({ vertex: vert2, weight });
      this.adjacencyList[vert2].push({ vertex: vert1, weight });
    }
  }

  dijkstras(vert1: Vertex, vert2: Vertex): Vertex[] {
    // Array containing all previously visited vertices
    const visited: Vertex[] = [];

    /* 
    Object containing a previous vertex of the path to each vertex
    If path was A -> C -> D -> F then:
    prev = { C: A, D: C, F: D }
    */
    const prev: {
      [index: string]: Vertex | null;
    } = { [vert1]: null };

    // Object containing a shortest current distance to a vertex
    const shortestDist = Object.keys(this.adjacencyList).reduce(
      (accum: { [index: string]: number }, next) => {
        accum[next] = next === vert1 ? 0 : Infinity;
        return accum;
      },
      {},
    );

    // Function finding a path to a vertex recursively using prev
    const findRecursivePath = (vert: Vertex): Vertex[] => {
      if (!prev[vert]) {
        return [];
      } else {
        return [prev[vert] as Vertex, ...findRecursivePath(prev[vert] as Vertex)];
      }
    };

    // Queue containing all vertices to visit with current distances as priorities
    const visitQueue = new PriorityQueue<Vertex>();
    visitQueue.queue(vert1, 0);

    while (true) {
      const currentVert = visitQueue.dequeue().val;
      visited.push(currentVert);
      if (currentVert === vert2) {
        break;
      }
      // Looping through unvisited neighbours
      for (const edge of this.adjacencyList[currentVert].filter(
        (val) => !visited.includes(val.vertex),
      )) {
        const newDistance = edge.weight + shortestDist[currentVert];
        /*
        If distance is smaller, we add neighbour to queue (potentially again, but with smaller priority);
        update shortest distance;
        update prev to be the current vertex
        */
        if (newDistance < shortestDist[edge.vertex]) {
          visitQueue.queue(edge.vertex, newDistance);
          shortestDist[edge.vertex] = newDistance;
          prev[edge.vertex] = currentVert;
        }
      }
    }
    return [vert2, ...findRecursivePath(vert2)];
  }
}
