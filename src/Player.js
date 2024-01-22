import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Body from "./Body";
import Footer from "./Footer";
import "./player.css";
import { useNavigate } from "react-router-dom";
import { useDataLayerValue } from "./DataLayer";

function Player() {
  const navigate = useNavigate()
  const [{ token }, dispatch] = useDataLayerValue();
  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className="player">
      <div className="player_body">
        <Sidebar />
        <Body />
      </div>
      <Footer />
    </div>
  );
}

export default Player;
