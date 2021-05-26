import './App.css';
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
  
  const songPlaying = useRef(new Audio());

  useEffect(() => {
    getSongs()
    isSongPlaying ? songPlaying.current.pause() : songPlaying.current.play();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSongPlaying])

  async function getSongs() {
    setSongs(await (await fetch("data/songs.json")).json());
  }

  // useEffect(() => {
  //   async function getSongs() {
  //     if (songs.length === 0) setSongs(await (await fetch("data/songs.json")).json());
  //   }
  
  //   getSongs();
  // }, []);


  function playSong(songId) {
    if (songPlaying.current.played) songPlaying.current.pause();

    setCurrentSong(songId)
    songPlaying.current.src = songs[songId].songLink;
    songPlaying.current.play();
    setIsSongPlaying(true);
  }

  function playOrPause() {
    setIsSongPlaying(!isSongPlaying)
    // console.log(songPlaying.current.paused);
    // if (!isSongPlaying) {
    //   songPlaying.current.play();
    // } else {
    //   console.log("hallo");
    //   songPlaying.current.pause();
    // }
  }

  songPlaying.current.addEventListener("timeupdate", function() {
    setSongProgress(songPlaying.current.currentTime / songPlaying.current.duration);
    convertTime(Math.round(songPlaying.current.currentTime));
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
      <div>
        <header>
          <span><i className="fas fa-chevron-left"></i></span>
          <span><p>Playlist - Power</p></span>
          <span><i className="fas fa-ellipsis-v"></i></span>
        </header>
        <main>
          <section id="playlist">
            {songs.map(song => {
              return (
                <div key={song.id} className={song.id === currentSong ? "song active" : "song"} id={song.id} onClick={() => {
                  playSong(song.id);
                }}>
                  <span>
                    <img src={"images/" + song.id + ".jpg"} alt="album"/>
                    <p><strong>{song.artist}</strong><br />{song.songTitle}</p>
                  </span>
                  <span><i className="fas fa-play-circle"></i></span>
                </div>
              )
            })}
          </section>
          {songs.length > 0 ? (<section>
            <article>
              <img id="album" src={"images/" + songs[currentSong].id + ".jpg"} alt="album" />
            </article>
            <article className="title">
              <span><i className="fas fa-plus-circle"></i></span>
              <span>
                <p id="artist">
                  {songs[currentSong].artist}
                </p>
                <p id="songTitle">
                  {songs[currentSong].songTitle}
                </p>
              </span>
              <span><i className="fas fa-heart"></i></span>
            </article>
            <article className="time">
              <span id="currenttime"><p>{progressSec < 10 ? progressMin + ":0" + progressSec : progressMin + ":" + progressSec}</p></span>
              <time><span id="progressbar" style={{width: + songProgress * 100 + "%"}}></span></time>
              <span id="songlength"><p>{lengthSec < 10 ? lengthMin + ":0" + lengthSec : lengthMin + ":" + lengthSec}</p></span>
            </article>
            <article className="control">
              <span id="repeat"><i className="fas fa-retweet"></i></span>
              <span id="previous"><i className="fas fa-backward"></i></span>
              <span id="play" onClick={playOrPause}><i className={isSongPlaying ? "fas fa-pause-circle" : "fas fa-play-circle"}></i></span>
              <span id="next"><i className="fas fa-forward"></i></span>
              <span id="shuffle"
                ><i className="fas fa-random"></i
              ></span>
            </article>
          </section>) : ""}
        </main>
      </div>
    </div>
  );
}
