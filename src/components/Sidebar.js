import React, { useEffect } from "react";
import "../styling/sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SearchIcon from "@mui/icons-material/Search";
import { useDataLayerValue } from "../app_context/DataLayer";
import axios from "axios";

function Sidebar() {
  const [{ token, playlists, user }, dispatch] = useDataLayerValue();

  useEffect(() => {
    if (user) {
      // getting playlists
      const getPlaylistData = async () => {
        const response = await axios.get(
          `https://api.spotify.com/v1/users/${user?.userId}/playlists`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          });
        const { items } = response.data;
        const playlists = items.map(({ name, id, images }) => {
          return { name, id, images };
        });
        dispatch({ type: "SET_PLAYLISTS", playlists });
        dispatch({ type: 'SET_SELECTED_PLAYLIST', id: playlists?.[0]?.id })
      };
      getPlaylistData();
    }
  }, [token, dispatch, user]);
  return (
    <div className="sidebar">
      <img
        className="sidebar_logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
      />
      <SidebarOption Icon={HomeIcon} title="Home" />
      <SidebarOption Icon={SearchIcon} title="Search" />
      <SidebarOption Icon={LibraryMusicIcon} title="Your Library" />
      <br />
      <strong className="sidebar_title">PLAYLISTS</strong>
      <hr />
      {playlists?.map((playlist, index) => (
        <SidebarOption title={playlist.name} img={playlist.images} playlistID={playlist.id} index={index} />
      ))}
    </div>
  );
}

export default Sidebar;
