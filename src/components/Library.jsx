import React from 'react';
import LibrarySong from './LibrarySong';

const Library = (props) => {
    const { songs, currentSong, setCurrentSong, setSongs, libraryIsOpen, setLibraryIsOpen } = props;

    return (
        <div className={`library ${libraryIsOpen ? "open" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => {
                    return (
                        <LibrarySong key={song.id} song={song} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} currentSong={currentSong} setLibraryIsOpen={setLibraryIsOpen} />
                    )
                })}
            </div>

        </div>
    );
};

export default Library;