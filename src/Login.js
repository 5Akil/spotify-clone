
import React from 'react'
import './login.css'
import { loginUrl } from './Spotify';

export default function Login() {
  return (
    <div className='login'>
      <img src="https://thekellygirls.com/wp-content/uploads/2018/08/spotify-logo-png-file-spotify-badge-large-png-1280.png" ></img>
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}


