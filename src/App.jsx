import React, { useState } from 'react';
import './App.scss';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Navbar from './components/Navbar';
import data from './utils';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryIsOpen, setLibraryIsOpen] = useState(false);


  return (
    <div className="App">
      <Navbar libraryIsOpen={libraryIsOpen} setLibraryIsOpen={setLibraryIsOpen} />
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} songs={songs} />
      <Library songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} currentSong={currentSong} libraryIsOpen={libraryIsOpen} />
    </div>
  );
}

export default App;
