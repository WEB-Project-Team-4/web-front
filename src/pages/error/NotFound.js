// src/pages/error/NotFound.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        페이지를 찾을 수 없습니다.
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        요청하신 페이지가 존재하지 않거나 이동된 것 같습니다.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        메인 페이지로 이동
      </Button>
    </Box>
  );
}

export default NotFound;
