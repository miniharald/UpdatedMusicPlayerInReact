export default function ControlPanel(props) {
  return (
    <div className="control">
    <span id="repeat" onClick={props.repeatSong} style={props.repeat ? { color:'white'} : {color : 'silver'}}>
      <i className="fas fa-retweet"></i>
    </span>
    <span id="previous" onClick={props.previous}>
      <i className="fas fa-backward"></i>
    </span>
    <span id="play" onClick={props.playOrPause}>
      <i className={props.isSongPlaying ? "fas fa-pause-circle" : "fas fa-play-circle"}></i>
    </span>
    <span id="next" onClick={props.next}>
      <i className="fas fa-forward"></i>
    </span>
    <span id="shuffle" onClick={props.shuffleMode} style={props.shuffle ? { color:'white'} : {color : 'silver'}}>
      <i className="fas fa-random"></i>
    </span>
  </div>
  );
}