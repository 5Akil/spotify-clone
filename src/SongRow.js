import React from "react";
import "./SongRow.css";

function SongRow({ track, playSong }) {
  // console.log("hey", track);
  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <div className="songRow" onClick={() => playSong(track.id)}>
      <span></span>
      <img className="songRow_album" src={track.album.images[0].url} alt="" />
      <div className="songRow_info">
        <div className="left">
          <h1>{track.name}</h1>
          <p>
            {track.artists.map((artist) => artist.name).join(", ")} -{" "}
            {track.album.name}
          </p>
        </div>
        <div className="right">{msToMinutesAndSeconds(track.duration_ms)}</div>
      </div>
    </div>
  );
}

export default SongRow;
