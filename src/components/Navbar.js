import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import eventEmitter from './eventEmitter';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const visibilityChange = (msg) => {
    console.log("event emitted: "+msg);
    
    const status = msg.toLowerCase() === 'true';
    setIsVisible(!status); 
  };

  eventEmitter.on('message', visibilityChange);
  
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'black', width: '100%' }}>
        <Toolbar>
          <Container>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              Fitness Tracker App
            </Typography>
            <br />
            <br />
            {isVisible && <Button color="inherit" component={Link} to="/login">Login</Button>}
            {isVisible && <Button color="inherit" component={Link} to="/register">Register</Button>}
            {!isVisible && <Button color="inherit" component={Link} to="/exercise">Exercise List</Button>}
            {!isVisible && <Button color="inherit" component={Link} to="/create">Add exercise</Button>}
           {!isVisible && <Button color="inherit" component={Link} to="/logout">Logout</Button>}
          </Container>
          <ImageCarousel />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
