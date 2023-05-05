import React, { useEffect } from "react";
import "./sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SearchIcon from "@mui/icons-material/Search";
import { useDataLayerValue } from "./DataLayer";
import axios from "axios";

function Sidebar() {
  const [{token, playlists }, dispatch] = useDataLayerValue();

  useEffect(() => {
    // getting playlists
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      dispatch({ type: "SET_PLAYLISTS", playlists });
    };
    getPlaylistData();
  }, [token , dispatch]);

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

      {playlists?.map((playlist) => (
        <SidebarOption title={playlist.name} />
      ))}
    </div>
  );
}

export default Sidebar;
