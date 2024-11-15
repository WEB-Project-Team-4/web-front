// src/pages/MyPage.js
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import '../../assets/styles/My.css';

function Group() {
  // 필터 상태
  const [filter, setFilter] = useState('myMeetings');

  // 필터 변경 함수
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <Box className="mypage-container">


      {/* 메인 콘텐츠 영역 */}
      <Box className="content">
        {/* 우측 상단 필터 바 */}
        <Box className="filter-bar">
          <Button onClick={() => handleFilterChange('myMeetings')} className={filter === 'myMeetings' ? 'active' : ''}>
            내가 만든 모임
          </Button>
          <Button onClick={() => handleFilterChange('participating')} className={filter === 'participating' ? 'active' : ''}>
            참여중인 모임
          </Button>
          <Button onClick={() => handleFilterChange('pastMeetings')} className={filter === 'pastMeetings' ? 'active' : ''}>
            지난 모임
          </Button>
          <Button onClick={() => handleFilterChange('likedMeetings')} className={filter === 'likedMeetings' ? 'active' : ''}>
            좋아요 한 모임
          </Button>
        </Box>

        {/* 필터 상태에 따라 보여줄 카드 내용 */}
        <Box className="meeting-cards">
          {filter === 'myMeetings' && <Typography>내가 만든 모임 카드들</Typography>}
          {filter === 'participating' && <Typography>참여중인 모임 카드들</Typography>}
          {filter === 'pastMeetings' && <Typography>지난 모임 카드들</Typography>}
          {filter === 'likedMeetings' && <Typography>좋아요 한 모임 카드들</Typography>}
        </Box>
      </Box>
    </Box>
  );
}

export default Group;
