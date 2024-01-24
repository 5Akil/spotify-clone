import React, { useEffect } from 'react'
import '../styling/footer.css'
import { useDataLayerValue } from '../app_context/DataLayer'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import SkilNextIcon from '@mui/icons-material/SkipNext'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import RepeatIcon from '@mui/icons-material/Repeat'
import { Grid, Slider } from '@mui/material'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import axios from 'axios'



function Footer() {

  const [{ token, currentPlaying, isPlaying }, dispatch] = useDataLayerValue();
  const getCurrentTrack = async () => {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response.data);
    if (response.data !== "") {
      const currentPlaying = {
        id: response.data.item.id,
        name: response.data.item.name,
        artists: response.data.item.artists.map((artist) => artist.name),
        image: response.data.item.album.images[2].url,
        isPlaying: response.data.is_playing,
        duration: response.data.item.duration_ms
      };
      dispatch({ type: 'SET_PLAYING', currentPlaying });
      dispatch({ type: 'SET_IS_PLAYING', isPlaying: response.data.is_playing });
    }
    else {
      dispatch({ type: 'SET_PLAYING', currentPlaying: null });
    }
  };
  const handlePlaybackState = async (type) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/${type}`, {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
    if (response.status === 204) {
      dispatch({ type: "SET_IS_PLAYING", isPlaying: !isPlaying })
    }
  }
  const changeTrack = async (type) => {
    const response = await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`, {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
    if (response.status === 204) {
      getCurrentTrack();
    }
  }

  useEffect(() => {
    getCurrentTrack();
  }, [token, dispatch]);

  return (
    currentPlaying ?
      <div className='footer'>
        <div className='footer_left'>
          <img className='footer_albumLogo' src={currentPlaying?.image} alt={currentPlaying?.name} />

          <div className='footer_songInfo'>
            <h4>{currentPlaying.name}</h4>
            <p>{currentPlaying.artists.join(', ')}</p>
          </div>
        </div>
        <div className='footer_center'>
          <ShuffleIcon className='footer_green' />
          <SkipPreviousIcon className='footer_icon' onClick={() => changeTrack("previous")} />

          {
            isPlaying ? (

              <PauseCircleIcon
                fontSize='large'
                className='footer_icon '
                onClick={() => handlePlaybackState("pause")}
              />
            ) : (
              <PlayCircleOutlineIcon
                fontSize="large"
                className="footer__icon"
                onClick={() => handlePlaybackState("play")}
              />
            )
          }

          <SkilNextIcon className='footer_icon' onClick={() => changeTrack("next")} />
          <RepeatIcon className='footer_green' />
        </div>
        <div className='footer_right'>
          <Grid container spacing={2}>
            <Grid item>
              <PlaylistPlayIcon />
            </Grid>
            <Grid item>
              <VolumeDownIcon />
            </Grid>
            <Grid item xs>
              <Slider sx={{ maxWidth: "70%" }} />
            </Grid>
          </Grid>
        </div>
      </div> : null
  )
}

export default Footer;