const { BinarySearchTree, loadNamesAndInsertIntoBST } = require('./BST');

// Load the names and insert them into the BST
const bst = loadNamesAndInsertIntoBST('name.json');

// Function to test searching for a specific prefix in the BST
function testSearchByPrefix(prefix) {
  const results = bst.searchByPrefix(prefix);
  if (results.length > 0) {
    console.log(`Results for prefix "${prefix}":`);
    results.forEach(name => console.log(`- ${name}`));
  } else {
    console.log(`No results found for prefix "${prefix}"`);
  }
}

// Test cases
console.log("Testing search by prefix functionality:\n");
testSearchByPrefix("bench");       // Expected output: list of names that start with "bench"
testSearchByPrefix("archer");      // Expected output: list of names that start with "archer"
testSearchByPrefix("non-existent"); // Expected output: No results found for prefix "non-existent"
