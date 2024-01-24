import React, { useEffect } from "react";
import Body from "./Body";
import Footer from "./Footer";
import Sidebar from './Sidebar'
import "../styling/player.css";
import { useNavigate } from "react-router-dom";
import { useDataLayerValue } from "../app_context/DataLayer";

function Player() {
  const navigate = useNavigate()
  const [{ token }, dispatch] = useDataLayerValue();
  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token])

  return (
    token ?
    <div className="player">
      <div className="player_body">
        <Sidebar />
        <Body />
      </div>
      <Footer />
    </div>
     : null
  );
}

export default Player;
