import React from 'react';

const LibrarySong = (props) => {
    const { song, songs, setCurrentSong, setSongs, currentSong, setLibraryIsOpen } = props;

    const songSelectHandler = () => {
        setCurrentSong(song);

        if (window.innerWidth <= 768) {
            setLibraryIsOpen(false);
        }

        // for (const songEle of songs) {
        //     if (songEle == song) {
        //         songEle.active = true;
        //     } else songEle.active = false;
        // }

    }

    return (
        <div onClick={songSelectHandler} className={`library-song ${song == currentSong ? 'selected' : ''}`}>
            <img src={song.cover} alt="" />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;