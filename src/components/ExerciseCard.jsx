// ExerciseCard.js
import React from 'react';

function ExerciseCard({ exercise, onNext, onPrevious, onAddExercise, onDeleteExercise, handleAddExerciseClick }) {
  // Sample new exercise data to be added
  const newExercise = {
    id: 'new-exercise',
    name: 'New Exercise',
    gifUrl: 'https://v2.exercisedb.io/image/lWIos5p-ocaI4P',
    target: 'example target',
    instructions: ['Step 1', 'Step 2'],
  };

  return (
    <div className="exercise-card">
      <h3>{exercise.name}</h3>
      <img src={exercise.gifUrl} alt={exercise.name} />
      <p><strong>Target:</strong> {exercise.target}</p>
      <ul>
        {exercise.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <div className="navigation-buttons">
        <button onClick={onPrevious} >Previous</button>
        <button onClick={()=>{console.log("clicked"); onNext();}} >Next</button>
        <button onClick={() => {handleAddExerciseClick(); onAddExercise(newExercise);}}>Add Exercise</button>
        <button onClick={onDeleteExercise}>Delete Exercise</button>
      </div>
    </div>
  );
}

export default ExerciseCard;
