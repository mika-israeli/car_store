import { Box, Typography } from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import UserRecommendation from '../components/UserRecommendation.jsx';
import AuthContext from '../Context/AuthProvider';
import FacebookLogin from 'react-facebook-login';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import Call from '../components/call/Call';
import video from '../../assets/video.mp4';
const Home = () => {
  const value = useContext(AuthContext);

  return (
    <Box width={'100%'} display='flex' justifyContent={'center'}>
      <Box
        display={'flex'}
        width={'50%'}
        flexDirection={'column'}
        alignItems='center'
        gap={5}
      >
        <header>
          <Typography variant='h4' component='h1'>
            Welcome to our dealership
          </Typography>
        </header>
        <video
          controls
          src={video}
          style={{
            width: '750px',
            height: 'auto',
          }}
        />
      </Box>
      <Call />
    </Box>
  );
};

export default Home;
