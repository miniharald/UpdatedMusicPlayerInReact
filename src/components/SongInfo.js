export default function Time(props) {
  return (
    <div>
      <div className="album">
        <img id="album" src={"images/" + props.songs[props.currentSong].id + ".jpg"} alt="album" />
      </div>
      <div className="title">
        <span><i className="fas fa-plus-circle"></i></span>
        <span>
          <p id="artist">
            {props.songs[props.currentSong].artist}
          </p>
          <p id="songTitle">
            {props.songs[props.currentSong].songTitle}
          </p>
        </span>
        <span><i className="fas fa-heart"></i></span>
      </div>
    </div>
  );
}