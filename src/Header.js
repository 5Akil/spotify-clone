import React, { useState } from 'react'
import "./header.css";
import { useDataLayerValue } from './DataLayer'
import SearchIcon from '@mui/icons-material/Search'
import Avatar from '@mui/material/Avatar';
import { Button, Fade, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [{ user }, dispatch] = useDataLayerValue();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    
  };
  
  const handleLogout=()=>{
    localStorage.clear()
    
    setAnchorEl(null);
  }

  return (
    <div className='header'>
      <div className="header_left">
        <SearchIcon />
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text" />
      </div>
      <div className="header_right" >
        <Button
          id="demo-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Avatar className='avatar' alt={user?.name} src={user?.userImg} />
          <h4 className='text'>{user?.name}</h4>
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={()=>handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default Header