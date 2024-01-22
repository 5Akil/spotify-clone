
import React, { useEffect } from 'react'
import './login.css'
import { getTokenFromUrl, loginUrl } from './Spotify';
import logo from './pngwing.com (1).png'
import { useDataLayerValue } from './DataLayer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()
  const [{ token }, dispatch] = useDataLayerValue();
  useEffect(() => {
    const lsToken = localStorage.getItem('token')
    const lsUser = localStorage.getItem('user')
    const user = lsUser ? JSON.parse(lsUser) : null;
    if (lsToken && lsUser) {
      dispatch({
        type: 'SET_TOKEN',
        token: lsToken
      })
      dispatch({ type: 'SET_USER', user });
      navigate('/player')
    } else {
      const hash = getTokenFromUrl();
      const _token = hash.access_token;
      //clear the URL for security perpose..... 
      window.location.hash = "";
      if (_token) {
        dispatch({
          type: 'SET_TOKEN',
          token: _token
        }
        )
        localStorage.setItem('token', _token)
        // get user details
        const getUserInfo = async () => {
          const { data } = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: "Bearer" + " " + _token,
              "Content-Type": "application/json",
            },
          });
          const user = {
            userId: data.id,
            userImg: data.images[0].url,
            name: data.display_name,
          };
          dispatch({ type: 'SET_USER', user });
          localStorage.setItem('user', JSON.stringify(user))
        };
        getUserInfo();
        navigate('/player')
      }
    }
  }, [token, dispatch])
  return (
    <div className='login'>
      <img src={logo} style={{ width: '200px', height: '200px' }}></img>
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}


