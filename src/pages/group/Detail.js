// src/pages/Detail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

function Detail() {
  const { id } = useParams();

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>상세 페이지</Typography>
      <Typography variant="body1">선택한 카드 ID: {id}</Typography>
      {/* 여기서 id에 따라 데이터나 상세 정보를 렌더링할 수 있습니다 */}
    </Box>
  );
}

export default Detail;
