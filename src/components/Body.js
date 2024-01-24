import React from 'react'
import Header from './Header'
import SongRow from './SongRow'
import '../styling/body.css'
import { useDataLayerValue } from '../app_context/DataLayer'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material//Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useEffect } from 'react'
import axios from 'axios'

function Body() {
  const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] = useDataLayerValue();
  useEffect(() => {
    if (selectedPlaylistId) {
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
        console.log(response.data.uri);
        if (response.status === 200) {
          const data = {
            id: response.data.id,
            image: response.data.images[0].url,
            discription: response.data.discription,
            uri:response.data.uri,
            tracks: response.data.tracks.items.map(({ track }) => {
              return {
                id: track.id,
                artists: track.artists.map((artist) => artist),
                duration: track.duration_ms,
                name: track.name,
                uri: track.uri,
                image: track.album.images[0],
                album_name: track.album.name
              }
            })
          }
          dispatch({ type: "SET_SELECTED_PLAYLIST", selectedPlaylist: data });
        }
      };
      getInitialPlaylist();
    }
  }, [token, dispatch, selectedPlaylistId])

  const playAll = async () => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        "context_uri": `${selectedPlaylist.uri}`,
        "offset": {
          "position": 0
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
        id: selectedPlaylist.tracks[0].id,
        name: selectedPlaylist.tracks[0].name,
        artists: selectedPlaylist.tracks[0].artists.map((artist) => artist.name),
        image: selectedPlaylist.tracks[0].image.url,
        isPlaying: true
      };
      dispatch({ type: 'SET_PLAYING', currentPlaying });
      dispatch({ type: 'SET_IS_PLAYING', isPlaying: true });
    } else {
      dispatch({ type: 'SET_PLAYING', currentPlaying: null });
    }
  }


  return (
    <div className='body'>
      <Header />
      <div className="body_info">
        <img src={selectedPlaylist?.image} alt="" />
        <div className="body_infoText">
          <strong>PLAYLIST</strong>
          <h2>Your Top Songs 2022</h2>
          <p>{selectedPlaylist?.description}</p>
        </div>
      </div>
      <div className="body_songs">
        <div className="body_icons">
          <PlayCircleFilledIcon
            className="body_shuffle"
            onClick={() => playAll()}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>
        {selectedPlaylist?.tracks.map((item, index) => (
          <>
            <SongRow track={item} index={index} />
          </>
        ))}
      </div>
    </div>
  )
}

export default Body