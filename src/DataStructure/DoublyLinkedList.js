// DoublyLinkedList.js

// Node class represents each exercise as a node
class Node {
    constructor(exercise) {
      this.exercise = exercise;
      this.next = null;
      this.prev = null;
    }
  }
  
  // DoublyLinkedList class
  class DoublyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
    }
  
    // Add a new exercise node at the end of the list
    append(exercise) {
      const newNode = new Node(exercise);
      if (!this.head) {
        this.head = this.tail = newNode;
      } else {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }
  
    // Insert a new exercise node after a given node
    insertAfter(node, exercise) {
      const newNode = new Node(exercise);
      newNode.next = node.next;
      newNode.prev = node;
      if (node.next) {
        node.next.prev = newNode;
      } else {
        this.tail = newNode; // If the node is the tail, update tail to newNode
      }
      node.next = newNode;
    }
  
    // Delete a given node from the list
    deleteNode(node) {
      if (!node.prev) {
        this.head = node.next; // Node is head
      } else {
        node.prev.next = node.next;
      }
      if (!node.next) {
        this.tail = node.prev; // Node is tail
      } else {
        node.next.prev = node.prev;
      }
    }
  }
  
  export { DoublyLinkedList, Node };
  