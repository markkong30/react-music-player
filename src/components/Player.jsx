import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward, faBackward, faShuffle, faVolumeXmark, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

const Player = (props) => {
    const { currentSong, setCurrentSong, isPlaying, setIsPlaying, songs } = props;
    const audio = useRef(null);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        volume: 0.5,
    })

    useEffect(() => {
        setSongInfo({ ...songInfo, currentTime: 0 });
        autoPlayHandler();
    }, [currentSong])

    const animationPercentage = (Math.round(songInfo.currentTime) / Math.round(songInfo.duration)) * 100;

    const volumePercentage = (songInfo.volume * 100);

    const playSongHandler = () => {
        if (isPlaying) {
            audio.current.pause();
            setIsPlaying(false);
        } else {
            audio.current.play();
            setIsPlaying(true);
        }
    }

    const autoPlayHandler = async () => {
        if (isPlaying) {
            await audio.current.load();
            await audio.current.play();
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

    const volumeHandler = e => {
        const volume = e.target.value;
        audio.current.volume = e.target.value;
        console.log(volume)
        setSongInfo({ ...songInfo, volume })
    }

    const randomShuffle = () => {
        const randomIndex = Math.floor(Math.random() * songs.length);
        setCurrentSong(songs[randomIndex]);

    }

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    const skipHandler = (direction) => {
        const currentSongIndex = songs.findIndex(song => song == currentSong);
        let index = (direction == 'back') ? currentSongIndex - 1 : currentSongIndex + 1;
        if (index < 0) {
            index = songs.length - 1;
        } else if (index > songs.length - 1) {
            index = 0;
        }

        return setCurrentSong(songs[index])
    }

    const SLIDERSTYLE = {
        background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`
    }

    return (
        <div className='player'>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={SLIDERSTYLE} className="track">
                    <input type="range" min="0" max={songInfo.duration || "1"} value={songInfo.currentTime} onChange={dragHandler} />
                    <div className="animate-track" style={{ transform: `translateX(${animationPercentage}%)` }} ></div>
                </div>
                <p>{getTime(songInfo.duration)}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon className='skip-back' size="2x" icon={faBackward} onClick={() => skipHandler('back')} />
                <FontAwesomeIcon className='play' size="2x" icon={isPlaying ? faPause : faPlay} onClick={playSongHandler} />
                <FontAwesomeIcon className='skip-forward' size="2x" icon={faForward} onClick={() => skipHandler('forward')} />
            </div>

            <div className="volume-control">
                <FontAwesomeIcon className='volume-low' icon={faVolumeXmark} />
                <div className="volume-bar track" style={SLIDERSTYLE}>
                    <input type="range" min="0" max="1" step="0.1" value={songInfo.volume} onChange={volumeHandler} />
                    <div className="animate-track volume" style={{ transform: `translateX(${volumePercentage}%)` }}></div>
                </div>
                <FontAwesomeIcon className='volume-high' icon={faVolumeHigh} />
                <FontAwesomeIcon className='shuffle' icon={faShuffle} onClick={randomShuffle} />

            </div>

            <audio onCanPlay={null} onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} onEnded={() => skipHandler('forward')} ref={audio} src={currentSong.audio} ></audio>
        </div>
    );
};

export default Player;