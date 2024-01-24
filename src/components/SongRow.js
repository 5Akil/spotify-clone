import React from "react";
import "../styling/SongRow.css";
import axios from "axios";
import { useDataLayerValue } from "../app_context/DataLayer";
import PauseIcon from '@mui/icons-material/Pause';

function SongRow({ track, index }) {
  const [{ token, isPlaying, currentPlaying , selectedPlaylist }, dispatch] = useDataLayerValue()
  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const playSong = async () => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        "context_uri":`${selectedPlaylist.uri}`,
        "offset": {
          "position": --index
        },
        "position_ms": 0
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
    if (response.status === 204) {
      const currentPlaying = {
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist) => artist.name),
        image: track.image.url,
        isPlaying: true
      };
      dispatch({ type: 'SET_PLAYING', currentPlaying });
      dispatch({ type: 'SET_IS_PLAYING', isPlaying: true });
    } else {
      dispatch({ type: 'SET_PLAYING', currentPlaying: null });
    }
  }
  return (
    <div onClick={() => playSong()} className={currentPlaying?.id === track.id ? "current" : "songRow"} >
      < span style={{ marginRight: "2rem" }}>
        {++index}
      </span>
      <img className="songRow_album" src={track.image.url} alt="" />
      <div className="songRow_info">
        <div className="left">
          <h1>{track.name}</h1>
          <p>
            {track.artists.map((artist) => artist.name).join(", ")} -{" "}
            {track.album_name}
          </p>
        </div>
        <div className="right">{msToMinutesAndSeconds(track.duration)}</div>
      </div>
    </div >
  );
}

export default SongRow;
