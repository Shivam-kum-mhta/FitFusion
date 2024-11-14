const fs = require('fs');

// Read the original JSON file
fs.readFile('exercises.json', 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  
  // Parse the JSON data
  let exercises = JSON.parse(data);

  // Extract only the "name" property from each exercise
  let exerciseNames = exercises.map(exercise => ({ name: exercise.name }));

  // Save the extracted names into 'name.json'
  fs.writeFile('name.json', JSON.stringify(exerciseNames, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Exercise names have been saved to 'name.json'!");
    }
  });
});
