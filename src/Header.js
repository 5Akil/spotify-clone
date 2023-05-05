import React from 'react'
import "./header.css";
import { useDataLayerValue } from './DataLayer'
import SearchIcon from '@mui/icons-material/Search'
import Avatar from '@mui/material/Avatar';

function Header() {
    const [{ user }, dispatch] = useDataLayerValue();
  return (
      
    <div className='header'>
       <div className="header_left">
         <SearchIcon />
         <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"/>
      </div>
      <div className="header_right">
      <Avatar alt={user?.name} src={user?.userImg} />
      <h4>{user?.name}</h4>
      </div>
    </div>
  )
}

export default Header