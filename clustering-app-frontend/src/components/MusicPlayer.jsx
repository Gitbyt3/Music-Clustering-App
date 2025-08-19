import React, { useState } from 'react';
import './MusicPlayer.css';

const TrackResults = ({ data }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const handlePlay = (filename) => {
    // Construct the path to your local audio files
    // Adjust this path according to where your audio files are stored
    const audioPath = `${import.meta.env.BASE_URL}audios/${filename}`
    console.log("audioPath:", audioPath)
    
    if (currentlyPlaying && currentlyPlaying.src.endsWith(filename)) {
      currentlyPlaying.pause();
      setCurrentlyPlaying(null);
    } else {
      if (currentlyPlaying) {
        currentlyPlaying.pause();
      }
      
      const audio = new Audio(audioPath);
      audio.play();
      setCurrentlyPlaying(audio);
      
      audio.onended = () => setCurrentlyPlaying(null);
    }
  };

  if (!data || !data.tracks) {
    return <div className="track-results-container">No tracks to display.</div>;
  }

  // Convert the tracks object to an array while preserving the original order
  const tracksArray = Object.keys(data.tracks).map(key => {
    return {
      ...data.tracks[key],
      originalIndex: parseInt(key) // Preserve the original order from backend
    };
  });

  // Sort by original index to maintain backend ordering
  tracksArray.sort((a, b) => a.originalIndex - b.originalIndex);

  return (
    <div className="track-results-container">
      <h2>Recommended Tracks</h2>
      <div className="tracks-list">
        {tracksArray.map((track, index) => (
          <div key={index} className={`track-card ${index === 0 ? 'best-match' : ''} ${index === tracksArray.length - 1 ? 'worst-match' : ''}`}>
            <div className="track-rank">
              <span className="rank-number">{index + 1}</span>
              {index === 0 && <span className="rank-label">Best Match</span>}
              {index === tracksArray.length - 1 && <span className="rank-label">Worst Match</span>}
            </div>
            
            <div className="track-main-info">
              <h3 className="track-title">{track.film_metadata.track_title}</h3>
              <div className="track-meta-row">
                <span><strong>Composer:</strong> {track.film_metadata.track_composer}</span>
                <span><strong>Film:</strong> {track.film_metadata.film_title} ({track.film_metadata.film_release_year})</span>
                <span><strong>Director:</strong> {track.film_metadata.film_director}</span>
                <span><strong>Genre:</strong> {track.film_metadata.film_genre}</span>
              </div>
            </div>
            
            <button 
              onClick={() => handlePlay(track.audio.filename)}
              className={`play-button ${currentlyPlaying && currentlyPlaying.src.endsWith(track.audio.filename) ? 'playing' : ''}`}
            >
              {currentlyPlaying && currentlyPlaying.src.endsWith(track.audio.filename) ? '❚❚' : '▶'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackResults;