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
  const [checked, setChecked] = useState(false);


  return (
    <div className=
      {`App ${libraryIsOpen ? "library-active" : ""}
    ${checked ? "dark" : ""}
    `}>
      <Navbar libraryIsOpen={libraryIsOpen} setLibraryIsOpen={setLibraryIsOpen} checked={checked} setChecked={setChecked} />
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} songs={songs} />
      <Library songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} currentSong={currentSong} libraryIsOpen={libraryIsOpen} setLibraryIsOpen={setLibraryIsOpen} />
    </div>
  );
}

export default App;
