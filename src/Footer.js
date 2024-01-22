import React ,{useEffect} from 'react'
import './footer.css'
import { useDataLayerValue } from './DataLayer'
import  PlayCircleOutlineIcon  from '@mui/icons-material/PlayCircleOutline'
import  SkipPreviousIcon  from '@mui/icons-material/SkipPrevious'
import  SkilNextIcon  from '@mui/icons-material/SkipNext'
import  ShuffleIcon  from '@mui/icons-material/Shuffle'
import  RepeatIcon  from '@mui/icons-material/Repeat'
import { Grid, Slider } from '@mui/material'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import axios from 'axios'



function Footer() {

  const [{ token, currentPlaying }, dispatch] = useDataLayerValue();

  useEffect(() => {

    // get current playing track
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
      if (response.data !== "") {
        const currentPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
        };
        dispatch({ type:'SET_PLAYING', currentPlaying });
      } else {
        dispatch({ type:'SET_PLAYING', currentPlaying: null });
      }
    };
    getCurrentTrack();

  }, [token, dispatch]);

  return (
    <div className='footer'>
      <div className='footer_left'>
        <img className='footer_albumLogo' src={currentPlaying?.image} alt={currentPlaying?.name}/> 
       
      {currentPlaying?(

        <div className='footer_songInfo'>
          <h4>{currentPlaying.name}</h4>
          <p>{currentPlaying.artists}</p>
        </div>
       

      ):(
        <div className="footer_songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
      )}
      </div>
      <div className='footer_center'>
        <ShuffleIcon className='footer_green'/>
        <SkipPreviousIcon className='footer_icon'  />
      
          {
            currentPlaying ? (

              <PlayCircleOutlineIcon 
              fontSize='large' 
              className='footer_icon '/>
            ) : (
              <PlayCircleOutlineIcon
              
              fontSize="large"
              className="footer__icon"/>
            )
          }

        <SkilNextIcon  className='footer_icon'/>
        <RepeatIcon className='footer_green'/>
      </div>
      <div className='footer_right'>
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon/>
          </Grid>
          <Grid item>
            <VolumeDownIcon/>
          </Grid>
          <Grid item xs>
            <Slider />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Footer;