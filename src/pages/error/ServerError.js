// src/pages/error/ServerError.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ServerError() {
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
        500
      </Typography>
      <Typography variant="h5" gutterBottom>
        서버 오류가 발생했습니다.
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        잠시 후 다시 시도해 주세요.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        메인 페이지로 이동
      </Button>
    </Box>
  );
}

export default ServerError;
