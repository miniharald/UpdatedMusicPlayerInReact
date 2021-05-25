import './App.css';
import React, { useState } from 'react';



export default function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(0);

  let songPlaying = new Audio();

  async function getSongs() {
    setSongs(await (await fetch("data/songs.json")).json());
    console.log(currentSong);
  }

  function playSong() {
    songPlaying.src = songs[currentSong].songLink;
    songPlaying.play();
  }
  
  getSongs();

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
                <div className={song.id === currentSong ? "song active" : "song"} id={song.id} onClick={() => {
                  setCurrentSong(song.id);
                  playSong();
                }}>
                  <span>
                    <img src={"images/" + song.id + ".jpg"} alt="album"/>
                    <p><strong>{song.artist}</strong><br />{song.songTitle}</p>
                  </span>
                  <span><i class="fas fa-play-circle"></i></span>
                </div>
              )
            })}
          </section>
          <section>
            {/* <article>
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
            </article> */}
            <article className="time">
              <span id="currenttime"><p>0:00</p></span>
              <time><span id="progressbar"></span></time>
              <span id="songlength"><p>0:30</p></span>
            </article>
            <article className="control">
              <span id="repeat"><i className="fas fa-retweet"></i></span>
              <span id="previous"><i className="fas fa-backward"></i></span>
              <span id="play"><i className="fas fa-play-circle"></i></span>
              <span id="next"><i className="fas fa-forward"></i></span>
              <span id="shuffle"
                ><i className="fas fa-random"></i
              ></span>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
