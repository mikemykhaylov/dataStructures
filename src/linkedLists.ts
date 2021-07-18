class SinglyLinkedNode<T> {
  val: T;
  next: SinglyLinkedNode<T> | null;

  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

export class SinglyLinkedList<T> {
  public length = 0;
  public head: SinglyLinkedNode<T> | null = null;
  public tail: SinglyLinkedNode<T> | null = null;

  constructor() { }

  push(val: T): SinglyLinkedNode<T> {
    const node = new SinglyLinkedNode<T>(val);
    // If not tail then list is empty, setting head
    // Otherwise, add node to tail's next
    if (!this.tail) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    // and update tail to be the new node
    this.tail = node;
    this.length++;
    return node;
  }
  pop() {
    if (!this.head) {
      throw new RangeError('Linked list empty');
    }
    let currNode = this.head;
    let prevNode: SinglyLinkedNode<T> | null = null;
    while (currNode.next) {
      prevNode = currNode;
      currNode = currNode.next;
    }
    if (prevNode) {
      prevNode.next = null;
    }
    this.head = prevNode ? this.head : null;
    this.tail = prevNode;
    this.length--;
    return currNode;
  }
  shift() {
    if (!this.head) {
      throw new RangeError('Linked list empty');
    }
    const temp = this.head;
    this.head = this.head.next;
    if(!this.head) {
      this.tail = null;
    }
    this.length--;
    return temp;
  }
  unshift(val: T): SinglyLinkedNode<T> {
    const node = new SinglyLinkedNode<T>(val);
    node.next = this.head;
    this.head = node;
    if (this.length === 0) {
      this.tail = node;
    }
    this.length++;
    return node;
  }
  get(index: number): SinglyLinkedNode<T> {
    if (!this.head) {
      throw new RangeError('Linked list empty');
    }
    if (index < 0 || index > this.length - 1) {
      throw new RangeError('Out of range');
    }
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next as SinglyLinkedNode<T>;
    }
    return node;
  }
  set(index: number, val: T): SinglyLinkedNode<T> {
    const node = this.get(index);
    node.val = val;
    return node;
  }
  insert(index: number, val: T): SinglyLinkedNode<T> {
    const node = new SinglyLinkedNode<T>(val);
    const prevNode = this.get(index - 1);
    node.next = prevNode.next;
    prevNode.next = node;
    this.length++;
    return node;
  }
  remove(index: number): SinglyLinkedNode<T> {
    let deletedNode = null;
    switch (index) {
      case 0: {
        deletedNode = this.shift();
        break;
      }
      case this.length - 1: {
        deletedNode = this.pop();
        break;
      }
      default: {
        if (index < 0) {
          throw new Error('Out of range');
        }
        const prevNode = this.get(index - 1);
        if (!prevNode.next) {
          throw new Error('Out of range');
        }
        deletedNode = new SinglyLinkedNode<T>(prevNode.next.val);
        prevNode.next = prevNode.next.next;
        this.length--;
        break;
      }
    }
    return deletedNode;
  }
  reverse() {
    // Empty list or list with 1 element is already inverted
    if (this.length < 2) {
      return;
    }
    for (let i = this.length; i > 2; i--) {
      const node = this.get(i - 3);
      this.tail!.next = node.next;
      node.next = node.next!.next;
      this.tail!.next!.next = null;
      this.tail = this.tail!.next;
    }
    this.tail!.next = this.head;
    this.head = this.head!.next;
    this.tail = this.tail!.next;
    this.tail!.next = null;
  }
}

class DoublyLinkedNode<T> {
  val: T;
  next: DoublyLinkedNode<T> | null;
  prev: DoublyLinkedNode<T> | null;

  constructor(val: T) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList<T> {
  public length = 0;
  public head: DoublyLinkedNode<T> | null = null;
  public tail: DoublyLinkedNode<T> | null = null;

  constructor() {}

  push(val: T): DoublyLinkedNode<T> {
    const node = new DoublyLinkedNode<T>(val);
    if (!this.tail) {
      this.head = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
    }
    this.tail = node;
    this.length++;
    return node;
  }

  pop(): DoublyLinkedNode<T> {
    if (!this.tail) {
      throw new Error('Linked list empty');
    }
    const temp = this.tail;
    if (!this.tail.prev) {
      this.head = null;
    } else {
      this.tail.prev.next = null;
    }
    this.tail = this.tail.prev;
    this.length--;
    temp.prev = null;
    return temp;
  }

  shift(): DoublyLinkedNode<T> {
    if (!this.head) {
      throw new Error('Linked list empty');
    }
    const temp = this.head;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this.length--;
    temp.next = null;
    return temp;
  }

  unshift(val: T): DoublyLinkedNode<T> {
    const node = new DoublyLinkedNode<T>(val);
    if (!this.head) {
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
    }
    this.head = node;
    this.length++;
    return node;
  }

  get(index: number): DoublyLinkedNode<T> {
    if (!this.head || !this.tail) {
      throw new Error('Linked list empty');
    }
    if (index >= this.length) {
      throw new Error('Out of range');
    }
    let node: DoublyLinkedNode<T>;
    if (index <= this.length / 2) {
      node = this.head;
      for (let i = 0; i < index; i++) {
        node = node.next!;
      }
    } else {
      node = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        node = node.prev!;
      }
    }
    return node;
  }

  set(index: number, val: T): DoublyLinkedNode<T> {
    const node = this.get(index);
    node.val = val;
    return node;
  }

  insert(index: number, val: T): DoublyLinkedNode<T> {
    if (index < 0 || index > this.length) {
      throw new Error('Out of range');
    }
    let node: DoublyLinkedNode<T>;
    switch (index) {
      case 0: {
        node = this.unshift(val);
        break;
      }
      case this.length: {
        node = this.push(val);
        break;
      }
      default: {
        node = new DoublyLinkedNode<T>(val);
        const indexNode = this.get(index);
        node.next = indexNode;
        node.prev = indexNode.prev;
        indexNode.prev!.next = node;
        indexNode.prev = node;
        this.length++;
        break;
      }
    }
    return node;
  }

  remove(index: number): DoublyLinkedNode<T> {
    if (index < 0 || index > this.length) {
      throw new Error('Out of range');
    }
    let node = null;
    switch (index) {
      case 0: {
        node = this.shift();
        break;
      }
      case this.length - 1: {
        node = this.pop();
        break;
      }
      default: {
        node = this.get(index);
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
        this.length--;
        break;
      }
    }
    return node;
  }
  reverse() {
    // Empty list or list with 1 element is already inverted
    if (this.length < 2) {
      return;
    }
    for (let i = this.length; i > 2; i--) {
      const node = this.get(i - 3);
      this.tail!.next = node.next;
      node.next!.prev = this.tail;
      node.next = node.next!.next;
      node.next!.prev = node;
      this.tail!.next!.next = null;
      this.tail = this.tail!.next;
    }
    this.tail!.next = this.head;
    this.head = this.head!.next!;
    this.tail!.next!.prev = this.tail;
    this.tail = this.tail!.next;
    this.head.prev!.next = null;
    this.head.prev = null;
  }
}