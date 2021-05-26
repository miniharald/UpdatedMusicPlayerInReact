import './App.css';
import Time from './components/Time';
import Track from './components/Track';
import SongInfo from './components/SongInfo';
import ControlPanel from './components/ControlPanel';
import React, { useState, useEffect, useRef } from 'react';



export default function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(0);
  const [songProgress, setSongProgress] = useState(null);
  const [progressSec, setProgressSec] = useState(0);
  const [progressMin, setProgressMin] = useState(0);
  const [lengthSec, setLengthSec] = useState(0);
  const [lengthMin, setLengthMin] = useState(0);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  
  const songPlaying = useRef(new Audio());

  useEffect(() => {
    getSongs()
    !isSongPlaying ? songPlaying.current.pause() : songPlaying.current.play();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSongPlaying])

  async function getSongs() {
    setSongs(await (await fetch("data/songs.json")).json());
  }

  function playSong(songId) {

    setCurrentSong(songId)
    console.log("ps ", currentSong);
    songPlaying.current.src = songs[songId].songLink;
    songPlaying.current.play();
    setIsSongPlaying(true);
  }

  function playOrPause() {
    setIsSongPlaying(!isSongPlaying);
  }

  function next() {
    let nextSong;
    if (shuffle) {
      nextSong = Math.floor(Math.random() * 7);
    } else {
      nextSong = currentSong + 1;
      if (nextSong > 6) nextSong = 0;
    }

    playSong(nextSong);
  }

  function previous() {
    let previousSong = currentSong;
    if (songPlaying.current.currentTime < 2) {
      previousSong--;
      if (previousSong < 0) {
        previousSong = 0;
      }
      playSong(previousSong);
    } else {
      songPlaying.current.currentTime = 0;
    }
  }

  function shuffleMode() {
    setShuffle(!shuffle)
  }

  function repeatSong() {
    setRepeat(!repeat)
  }

  songPlaying.current.addEventListener("timeupdate", function() {
    setSongProgress(songPlaying.current.currentTime / songPlaying.current.duration);
    convertTime(Math.round(songPlaying.current.currentTime));

    if (songPlaying.current.ended) {
      console.log(currentSong);
      if (repeat) {
        playSong(currentSong);
      } else {
        next();
      }
    }
  });

  function convertTime(seconds) {
    setProgressMin(Math.floor(seconds / 60));
    setProgressSec(seconds % 60);
    showLength(Math.round(songPlaying.current.duration));
  }

  function showLength(seconds) {
    setLengthMin(Math.floor(seconds / 60));
    setLengthSec(seconds % 60);
  }

  return (
    <div className="App">
      <div className="container">
        <header>
          <span><i className="fas fa-chevron-left"></i></span>
          <span><p>Playlist - Power</p></span>
          <span><i className="fas fa-ellipsis-v"></i></span>
        </header>
        <main>
          <section id="playlist">
            {songs.map(song => {
              return (
                <Track {...{...song, currentSong, playSong}}  key={song.id} />
              )
            })}
          </section>
          {songs.length > 0 ? (<section>
            <SongInfo {...{songs, currentSong}} />
            <Time {...{songProgress, progressMin, progressSec, lengthMin, lengthSec}} />
            <ControlPanel {...{repeatSong, previous, playOrPause, next, shuffleMode, shuffle, repeat, isSongPlaying}} />
          </section>) : ""}
        </main>
      </div>
    </div>
  );
}
