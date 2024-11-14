import React, { useState, useEffect } from 'react';
import { DoublyLinkedList } from '../DataStructure/DoublyLinkedList';
import ExerciseCard from './ExerciseCard';
import './ShowPlaylist.css';

import back from '../public/assets/back.json';
import chest from '../public/assets/chest.json';
import waist from '../public/assets/waist.json';
import shoulders from '../public/assets/shoulders.json';
import cardio from '../public/assets/cardio.json';
import legs from '../public/assets/legs.json';

const ShowPlaylist = ({ playlist, exerciseTree }) => {
  const [exerciseList, setExerciseList] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const loadPlaylistData = () => {
      let data = [];
      if (playlist.name === 'waist') data = waist;
      else if (playlist.name === 'back') data = back;
      else if (playlist.name === 'chest') data = chest;
      else if (playlist.name === 'shoulders') data = shoulders;
      else if (playlist.name === 'cardio') data = cardio;
      else if (playlist.name === 'legs') data = legs;
      else {
        setError('Unknown playlist');
        setLoading(false);
        return;
      }

      const newExerciseList = new DoublyLinkedList();
      data.forEach(exercise => {
        newExerciseList.append(exercise);
        exerciseTree.insert(exercise.name);
      });
      setExerciseList(newExerciseList);
      setCurrentNode(newExerciseList.head);
      setLoading(false);
    };

    loadPlaylistData();
  }, [playlist.name, exerciseTree]);

  const handleNext = () => {
    if (currentNode && currentNode.next) {
      setCurrentNode(currentNode.next);
    } else {
      alert('No more available exercises.');
    }
  };

  const handlePrevious = () => {
    if (currentNode && currentNode.prev) {
      setCurrentNode(currentNode.prev);
    }
  };

  const handleAddExerciseClick = () => {
    setIsSearchVisible(true);
  };

  const handleAddExercise = async (exerciseName) => {
    const apiUrl = `https://exercisedb.p.rapidapi.com/exercises/name/${exerciseName}?offset=0&limit=10`;
    const headers = {
      'X-RapidAPI-Key': '95cd3bbce8mshe5eb4b4b816876ep19c607jsn9c39e85200c7',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    };

    try {
      const response = await fetch(apiUrl, { headers });
      if (!response.ok) throw new Error('Failed to fetch exercise data');
      const data = await response.json();

      if (data.length > 0) {
        const newExercise = data[0];
        if (exerciseList && currentNode) {
          exerciseList.insertAfter(currentNode, newExercise);
          setCurrentNode(currentNode.next);
        }
      }
    } catch (error) {
      setError('Failed to add exercise: ' + error.message);
    }
  };

  const handleDeleteExercise = () => {
    if (exerciseList && currentNode) {
      const nextNode = currentNode.next || currentNode.prev;
      exerciseList.deleteNode(currentNode);
      setCurrentNode(nextNode);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value) {
      const results = exerciseTree.search(event.target.value);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectExercise = (exercise) => {
    handleAddExercise(exercise.name);
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchVisible(false);
  };

  const getExerciseNumber = () => {
    let currentNodeIndex = 0;
    let tempNode = exerciseList.head;
    while (tempNode && tempNode !== currentNode) {
      tempNode = tempNode.next;
      currentNodeIndex++;
    }
    return currentNodeIndex + 1; // To show human-friendly numbering (1-based index)
  };

  if (loading) {
    return <div className="loading">Loading exercises...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="show-playlist">
      <h2>{playlist.name} Playlist</h2>
      {/* <button onClick={handleAddExerciseClick}>Add Exercise</button> */}
      {isSearchVisible && (
        <div className="search-bar-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search exercises"
          />
          {searchResults.length > 0 && (
            <ul className="search-suggestions">
              {searchResults.map((exercise, index) => (
                <li key={index} onClick={() => handleSelectExercise(exercise)}>
                  {exercise.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {currentNode ? (
        <div>
          <h3>Exercise {getExerciseNumber()} / {exerciseList.size}</h3>
          <ExerciseCard
            exercise={currentNode.exercise}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onAddExercise={handleAddExercise}
            onDeleteExercise={handleDeleteExercise}
            handleAddExerciseClick={handleAddExerciseClick}
          />
        </div>
      ) : (
        <div>No exercises found</div>
      )}
    </div>
  );
};

export default ShowPlaylist;
