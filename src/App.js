import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './Spotify';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';
import axios from 'axios';




function App() {
  // const[token,setToken]=useState(null);
  const[{  token , selectedPlaylistId  },dispatch]= useDataLayerValue();
  
  useEffect(()=>{
  const hash = getTokenFromUrl();
  const _token=hash.access_token;
  
  //clear the URL for security perpose..... 
  window.location.hash="";
   
  if(_token){
    dispatch({
      type : 'SET_TOKEN',
      token : _token
    }
    )
    // get user details
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer" + _token,
          "Content-Type": "application/json",
        },
      });
      const user = {
        userId: data.id,
        userImg: data.images[0].url ,
        name: data.display_name,
      };
      dispatch({ type :'SET_USER', user});
    };
    getUserInfo();

  }
  }, [token, dispatch])

  return (
    <div className="App">
    {
      token ?<Player />:

    <Login/>
    }
    </div>
  );
}

export default App;

















// convert this code spotify.getUserPlaylists().then((playlists)=>{
//   dispatch({
//     type : 'SET_PLAYLISTS',
//     playlists : playlists,
//   })
// })  in axios format 