import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import routing
import Playlist from './components/Playlist';
import ShowPlaylist from './components/ShowPlaylist';
import { ExerciseBST } from './DataStructure/BST'; // Assuming TreeNode is implemented in this path
import './App.css'; // Add CSS for styling
import allExercises from './DataStructure/name.json';

function App() {
  const [playlists, setPlaylists] = useState([
    { id: 1, name: 'chest', img: 'https://v2.exercisedb.io/image/iJJUShmxWmJElT' },
    { id: 2, name: 'back', img: 'https://v2.exercisedb.io/image/tUlaXV9gl5zhtM' },
    { id: 3, name: 'waist', img: 'https://v2.exercisedb.io/image/auiaFQ6zp6758w' },
    { id: 4, name: 'shoulders', img: 'https://v2.exercisedb.io/image/AsFm5v4uJE0GdR' },
    { id: 5, name: 'legs', img: 'https://v2.exercisedb.io/image/1P4Mvr0vEodMOe' },
    { id: 6, name: 'cardio', img: 'https://v2.exercisedb.io/image/XOq0WGxBIeaJmI' },
  ]);

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [exerciseTree, setExerciseTree] = useState(new ExerciseBST()); // Instantiate the BST

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  useEffect(() => {
    const tree = new ExerciseBST();

    // Inserting all exercises into the BST
    allExercises.forEach(exercise => {
      tree.insert(exercise);
    });

    // Set the tree in state variable
    setExerciseTree(tree);
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <Link to="/" className="app-title">Exercise App</Link> {/* Clickable header */}
        </header>

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                !selectedPlaylist ? (
                  <div className="playlist-selection">
                    <h2>Select a Playlist</h2>
                    <Playlist playlists={playlists} onClick={handlePlaylistClick} />
                  </div>
                ) : (
                  <ShowPlaylist playlist={selectedPlaylist} exerciseTree={exerciseTree} />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
