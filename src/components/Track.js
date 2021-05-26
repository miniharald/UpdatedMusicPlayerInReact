export default function Track(props) {
  return (
    <div 
         className={props.id === props.currentSong ? "song active" : "song"} 
         id={props.id}
         onClick={() => {props.playSong(props.id);}}
    >
      <span>
        <img src={"images/" + props.id + ".jpg"} alt="album"/>
        <p><strong>{props.artist}</strong><br />{props.songTitle}</p>
      </span>
      <span><i className="fas fa-play-circle"></i></span>
    </div>
  );
}