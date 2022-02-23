import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const Player = (props) => {
    const { currentSong, setCurrentSong, isPlaying, setIsPlaying, songs } = props;
    const audio = useRef(null);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    })

    const playSongHandler = () => {
        if (isPlaying) {
            audio.current.pause();
            setIsPlaying(false);
        } else {
            audio.current.play();
            setIsPlaying(true);
        }
    }

    const autoPlayHandler = () => {
        if (isPlaying) {
            audio.current.play();
        }
    }

    const timeUpdateHandler = e => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration || 0;
        setSongInfo({ ...songInfo, currentTime, duration })
    }

    const dragHandler = e => {
        const currentTime = e.target.value;
        audio.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime })
    }

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    const skipHandler = (direction) => {
        const currentSongIndex = songs.findIndex(song => song == currentSong);
        let index = direction == 'back' ? currentSongIndex - 1 : currentSongIndex + 1;
        if (index < 0) {
            index = songs.length - 1;
        } else if (index > songs.length - 1) {
            index = 0;
        }

        return setCurrentSong(songs[index])
    }

    return (
        <div className='player'>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input type="range" min="0" max={songInfo.duration || "1"} value={songInfo.currentTime} onChange={dragHandler} />
                <p>{getTime(songInfo.duration)}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon className='skip-back' size="2x" icon={faAngleLeft} onClick={() => skipHandler('back')} />
                <FontAwesomeIcon className='play' size="2x" icon={isPlaying ? faPause : faPlay} onClick={playSongHandler} />
                <FontAwesomeIcon className='skip-forward' size="2x" icon={faAngleRight} onClick={() => skipHandler('forward')} />
            </div>
            <audio onLoadedData={autoPlayHandler} onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audio} src={currentSong.audio} ></audio>
        </div>
    );
};

export default Player;