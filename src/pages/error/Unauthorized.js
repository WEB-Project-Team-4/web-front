// src/pages/error/Unauthorized.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
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
        401
      </Typography>
      <Typography variant="h5" gutterBottom>
        접근 권한이 없습니다.
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        이 페이지에 접근하려면 로그인이 필요합니다.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
        로그인 페이지로 이동
      </Button>
    </Box>
  );
}

export default Unauthorized;
