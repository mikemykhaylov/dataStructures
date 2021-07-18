import { SinglyLinkedList } from './linkedLists.ts';

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  insert(val: number, tree = this.root): TreeNode {
    if (!tree) {
      const node = new TreeNode(val);
      this.root = node;
      return node;
    }
    // If value is bigger than root, we try to insert to the right
    // Else we try to insert to the left
    if (val >= tree.val) {
      // If there's right, we insert to tree with root = right
      // Else we create right
      if (tree.right) {
        return this.insert(val, tree.right);
      } else {
        const node = new TreeNode(val);
        tree.right = node;
        return node;
      }
    } else {
      // If there's left, we insert to tree with root = left
      // Else we create left
      if (tree.left) {
        return this.insert(val, tree.left);
      } else {
        const node = new TreeNode(val);
        tree.left = node;
        return node;
      }
    }
  }
  find(val: number, tree = this.root): TreeNode {
    if (!tree) {
      if (!this.root) {
        throw new Error('Binary tree empty');
      } else {
        throw new Error('Not found');
      }
    }
    if (val > tree.val) {
      return this.find(val, tree.right);
    } else if (val < tree.val) {
      return this.find(val, tree.left);
    } else {
      return tree;
    }
  }
  bfs(tree = this.root): Array<number> {
    if (!tree) {
      if (!this.root) {
        throw new Error('Binary tree empty');
      } else {
        return [];
      }
    }
    const queue = new SinglyLinkedList<TreeNode>();
    const array: Array<number> = [];
    queue.push(tree);
    while (queue.length > 0) {
      const { val: node } = queue.shift();
      array.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return array;
  }
  dfPreOrder(tree = this.root): Array<number> {
    if (!tree) {
      if (!this.root) {
        throw new Error('Binary tree empty');
      } else {
        return [];
      }
    }
    return [tree.val, ...this.dfPreOrder(tree.left), ...this.dfPreOrder(tree.right)];
  }
  dfPostOrder(tree = this.root): Array<number> {
    if (!tree) {
      if (!this.root) {
        throw new Error('Binary tree empty');
      } else {
        return [];
      }
    }
    return [...this.dfPostOrder(tree.left), ...this.dfPostOrder(tree.right), tree.val];
  }
  dfInOrder(tree = this.root): Array<number> {
    if (!tree) {
      if (!this.root) {
        throw new Error('Binary tree empty');
      } else {
        return [];
      }
    }
    return [...this.dfInOrder(tree.left), tree.val, ...this.dfInOrder(tree.right)];
  }
}

export class BinaryHeap {
  array: Array<number>;

  private swap(i: number, j: number): void {
    if (i !== j) {
      [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
    }
  }

  constructor() {
    this.array = [11, 5, 8, 3, 4];
  }

  insert(val: number) {
    this.array.push(val);
    let insertIndex = this.array.length - 1;
    // If there's at least one other node, we bubble up
    if (this.array.length > 1) {
      while (
        insertIndex > 0 &&
        val > this.array[Math.floor((insertIndex - 1) / 2)]
      ) {
        this.swap(insertIndex, Math.floor((insertIndex - 1) / 2));
        insertIndex = Math.floor((insertIndex - 1) / 2);
      }
    }
  }

  extract() {
    if (this.array.length === 0) {
      throw new RangeError('Heap empty');
    }
    this.swap(0, this.array.length - 1);
    const rootNode = this.array.pop() as number;
    if (this.array.length < 2) {
      return rootNode;
    }
    let swappedIndex = 0;
    let leftChildIndex = swappedIndex * 2 + 1;
    let rightChildIndex = swappedIndex * 2 + 2;
    /*
    Looping while there's at least one child to swap with
    Have to check only left, as it always comes before right
    */
    while (leftChildIndex < this.array.length) {
      let biggerChildIndex;
      /*
      If right is out of range, left is the biggest child
      If it isnt, we have to compare
      */
      if (rightChildIndex >= this.array.length) {
        biggerChildIndex = leftChildIndex;
        /* 
        If left has higher value we swap and stop
        The latter is because if right doesnt exist then surely left doesnt have children

        If it's not, we just stop, node is in the right place
        */
        if (this.array[swappedIndex] < this.array[biggerChildIndex]) {
          this.swap(swappedIndex, biggerChildIndex);
          break;
        } else {
          break;
        }
      } else {
        // Picking a bigger child out of two
        if (this.array[leftChildIndex] > this.array[rightChildIndex]) {
          biggerChildIndex = leftChildIndex;
        } else {
          biggerChildIndex = rightChildIndex;
        }
        /* 
        If bigger child has higher value we swap and continue
        We dont know if the bigger child has children

        If it's not, we just stop, node is in the right placec
        */
        if (this.array[swappedIndex] < this.array[biggerChildIndex]) {
          this.swap(swappedIndex, biggerChildIndex);
          swappedIndex = biggerChildIndex;
          leftChildIndex = swappedIndex * 2 + 1;
          rightChildIndex = swappedIndex * 2 + 2;
        } else {
          break;
        }
      }
    }
    return rootNode;
  }
}

class PriorityNode<T> {
  val: T;
  priority: number;

  constructor(val: T, priority: number) {
    this.val = val;
    this.priority = priority;
  }
}

export class PriorityQueue<T> {
  array: Array<PriorityNode<T>>;

  private swap(i: number, j: number): void {
    if (i !== j) {
      [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
    }
  }

  constructor() {
    this.array = [];
  }

  queue(val: T, priority: number) {
    const node = new PriorityNode<T>(val, priority);
    this.array.push(node);
    let insertIndex = this.array.length - 1;
    // If there's at least one other node, we bubble up
    if (this.array.length > 1) {
      while (
        insertIndex > 0 &&
        node.priority < this.array[Math.floor((insertIndex - 1) / 2)].priority
      ) {
        this.swap(insertIndex, Math.floor((insertIndex - 1) / 2));
        insertIndex = Math.floor((insertIndex - 1) / 2);
      }
    }
  }

  dequeue() {
    if (this.array.length === 0) {
      throw new RangeError('Queue empty');
    }
    this.swap(0, this.array.length - 1);
    const rootNode = this.array.pop() as PriorityNode<T>;
    if (this.array.length < 2) {
      return rootNode;
    }
    let swappedIndex = 0;
    let leftChildIndex = swappedIndex * 2 + 1;
    let rightChildIndex = swappedIndex * 2 + 2;
    /*
    Looping while there's at least one child to swap with
    Have to check only left, as it always comes before right
    */
    while (leftChildIndex < this.array.length) {
      let smallerChildIndex;
      /*
      If right is out of range, left is the smallest child
      If it isnt, we have to compare
      */
      if (rightChildIndex >= this.array.length) {
        smallerChildIndex = leftChildIndex;
        /* 
        If left has smaller priority we swap and stop
        The latter is because if right doesnt exist then surely left doesnt have children

        If it's not, we just stop, node is in the right placec
        */
        if (this.array[swappedIndex].priority > this.array[smallerChildIndex].priority) {
          this.swap(swappedIndex, smallerChildIndex);
          break;
        } else {
          break;
        }
      } else {
        // Picking a smaller child out of two
        if (this.array[leftChildIndex].priority < this.array[rightChildIndex].priority) {
          smallerChildIndex = leftChildIndex;
        } else {
          smallerChildIndex = rightChildIndex;
        }
        /* 
        If smaller child has smaller priority we swap and continue
        We dont know if the smaller child has children

        If it's not, we just stop, node is in the right placec
        */
        if (this.array[swappedIndex].priority > this.array[smallerChildIndex].priority) {
          this.swap(swappedIndex, smallerChildIndex);
          swappedIndex = smallerChildIndex;
          leftChildIndex = swappedIndex * 2 + 1;
          rightChildIndex = swappedIndex * 2 + 2;
        } else {
          break;
        }
      }
    }
    return rootNode;
  }
}
