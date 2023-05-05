import React from 'react'
import Header from './Header'
import SongRow from './SongRow'
import './body.css'
import { useDataLayerValue } from './DataLayer'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material//Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useEffect } from 'react'
import axios from 'axios'

function Body() {

  const [{token, top_Songs ,selectedPlaylistId }, dispatch]  = useDataLayerValue();
  console.log('hello', top_Songs )
  useEffect(()=>{
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,   
            "Content-Type": "application/json",
          },
        }
        );
      dispatch({ type: "SET_TOP_SONGS",top_songs: response.data,});
      
    };
    getInitialPlaylist();
  
  },[token , dispatch])

  return (
    <div className='body'>
      <Header />

      <div className="body_info">
      <img src={top_Songs?.images[0].url} alt="" />
        <div className="body_infoText">
          <strong>PLAYLIST</strong>
          <h2>Your Top Songs 2022</h2>
          <p>{top_Songs?.description}</p>
        </div>
      </div>
      <div className="body_songs">
        <div className="body_icons">
          <PlayCircleFilledIcon
            className="body_shuffle"
            />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {top_Songs?.tracks.items.map((item) => (
          <>
          <SongRow  track={item.track} />
          </>
        ))}
      </div>

    </div>
  )
}

export default Body