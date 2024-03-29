import React, { useEffect } from "react";
import "../styling/sidebarOption.css";
import { useDataLayerValue } from "../app_context/DataLayer";

function SidebarOption({ title, Icon, img, index, playlistID }) {
  const [{selectedPlaylistId }, dispatch] = useDataLayerValue()
  const handlePlaylist = () => {
    dispatch({type:'SET_SELECTED_PLAYLIST_ID' ,id : playlistID })
  }
  return (
    <div className="sidebarOption" onClick={playlistID ? handlePlaylist : null} >
      {Icon && <Icon className="sidebarOption_icon" />}
      {img ? <img src={img?.[0].url} /> : null}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
}

export default SidebarOption;