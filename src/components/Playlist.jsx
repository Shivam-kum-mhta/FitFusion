import React from 'react';
import './Playlist.css';

const Playlist = ({ playlists, onClick }) => {
  return (
    <div className="playlist-container">
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className="playlist-card"
          onClick={() => onClick(playlist)}
        >
          <img src={playlist.img} alt={playlist.name} className="playlist-img" />
          <h3>{playlist.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
