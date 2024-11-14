class TreeNode {
    constructor(exercise) {
      this.exercise = exercise;
      this.left = null;
      this.right = null;
    }
  }
  
  class ExerciseBST {
    constructor() {
      this.root = null;
    }
  
    insert(exercise) {
      const newNode = new TreeNode(exercise);
      if (!this.root) {
        this.root = newNode;
        return;
      }
      let currentNode = this.root;
      while (true) {
        if (exercise.name < currentNode.exercise.name) {
          if (!currentNode.left) {
            currentNode.left = newNode;
            break;
          }
          currentNode = currentNode.left;
        } else {
          if (!currentNode.right) {
            currentNode.right = newNode;
            break;
          }
          currentNode = currentNode.right;
        }
      }
      console.log("Inserted:", currentNode);
    }
  
    search(prefix) {
      const results = [];
      const searchHelper = (node) => {
        if (!node) return;
        console.log("Searching in:", node.exercise);
  
        // Check if node.exercise and node.exercise.name are defined
        if (node.exercise && node.exercise.name && node.exercise.name.toLowerCase().startsWith(prefix.toLowerCase())) {
          results.push(node.exercise);
        }
  
        if (node.left) searchHelper(node.left);
        if (node.right) searchHelper(node.right);
      };
      searchHelper(this.root);
      console.log("Search results:", results);
      return results;
    }
  }
  
  export { ExerciseBST };
  