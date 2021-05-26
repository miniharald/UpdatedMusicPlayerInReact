export default function Time(props) {
  return (
    <div className="time">
      <span id="currenttime"><p>{props.progressSec < 10 ? props.progressMin + ":0" + props.progressSec : props.progressMin + ":" + props.progressSec}</p></span>
      <div id="bar"><span id="progressbar" style={{width: + props.songProgress * 100 + "%"}}></span></div>
      <span id="songlength"><p>{props.lengthSec < 10 ? props.lengthMin + ":0" + props.lengthSec : props.lengthMin + ":" + props.lengthSec}</p></span>
    </div>
  );
}