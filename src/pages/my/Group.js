import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';  // Link 컴포넌트 추가
import '../../assets/styles/My.css'; // CSS 파일 임포트

function Group() {
  const [filter, setFilter] = useState('myMeetings');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지에 보여줄 아이템 수

  // 더미 데이터 (id 추가)
  const myMeetingsData = [
    { id: 1, title: '내가 만든 모임 1', description: '모임 1 설명' },
    { id: 2, title: '내가 만든 모임 2', description: '모임 2 설명' },
    { id: 3, title: '내가 만든 모임 3', description: '모임 3 설명' },
    { id: 4, title: '내가 만든 모임 4', description: '모임 4 설명' },
    { id: 5, title: '내가 만든 모임 5', description: '모임 5 설명' },
    { id: 6, title: '내가 만든 모임 6', description: '모임 6 설명' },
    { id: 7, title: '내가 만든 모임 7', description: '모임 7 설명' },
    { id: 8, title: '내가 만든 모임 8', description: '모임 8 설명' },
    { id: 9, title: '내가 만든 모임 9', description: '모임 9 설명' },
    { id: 10, title: '내가 만든 모임 10', description: '모임 10 설명' },
    { id: 11, title: '내가 만든 모임 11', description: '모임 11 설명' },
    { id: 12, title: '내가 만든 모임 12', description: '모임 12 설명' },
    { id: 13, title: '내가 만든 모임 13', description: '모임 13 설명' },
    { id: 14, title: '내가 만든 모임 14', description: '모임 14 설명' },
    { id: 15, title: '내가 만든 모임 15', description: '모임 15 설명' },
    { id: 16, title: '내가 만든 모임 16', description: '모임 16 설명' },
    { id: 17, title: '내가 만든 모임 17', description: '모임 17 설명' },
    { id: 18, title: '내가 만든 모임 18', description: '모임 18 설명' },
    { id: 19, title: '내가 만든 모임 19', description: '모임 19 설명' },
    { id: 20, title: '내가 만든 모임 20', description: '모임 20 설명' },
  ];

  const participatingData = [
    { id: 1, title: '참여중인 모임 1', description: '모임 1 설명' },
    { id: 2, title: '참여중인 모임 2', description: '모임 2 설명' },
    { id: 3, title: '참여중인 모임 3', description: '모임 3 설명' },
    { id: 4, title: '참여중인 모임 4', description: '모임 4 설명' },
    { id: 5, title: '참여중인 모임 5', description: '모임 5 설명' },
  ];

  const pastMeetingsData = [
    { id: 1, title: '지난 모임 1', description: '모임 1 설명' },
    { id: 2, title: '지난 모임 2', description: '모임 2 설명' },
    { id: 3, title: '지난 모임 3', description: '모임 3 설명' },
    { id: 4, title: '지난 모임 4', description: '모임 4 설명' },
    { id: 5, title: '지난 모임 5', description: '모임 5 설명' },
  ];

  const likedMeetingsData = [
    { id: 1, title: '좋아요 한 모임 1', description: '모임 1 설명' },
    { id: 2, title: '좋아요 한 모임 2', description: '모임 2 설명' },
    { id: 3, title: '좋아요 한 모임 3', description: '모임 3 설명' },
    { id: 4, title: '좋아요 한 모임 4', description: '모임 4 설명' },
    { id: 5, title: '좋아요 한 모임 5', description: '모임 5 설명' },
  ];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 리셋
  };

  // 데이터 필터링
  let filteredData = [];
  if (filter === 'myMeetings') {
    filteredData = myMeetingsData;
  } else if (filter === 'participating') {
    filteredData = participatingData;
  } else if (filter === 'pastMeetings') {
    filteredData = pastMeetingsData;
  } else if (filter === 'likedMeetings') {
    filteredData = likedMeetingsData;
  }

  // 페이지네이션 처리
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Box className="mypage-container">
      <Box className="content">
        {/* 필터 바 */}
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

        {/* 필터 상태에 따른 카드 */}
        <Box className="meeting-cards">
          {currentData.length === 0 ? (
            <Typography>데이터가 없습니다.</Typography>
          ) : (
            currentData.map((meeting, index) => (
              <Box key={meeting.id} className="meeting-card">
                <Typography variant="h6">{meeting.title}</Typography>
                <Typography variant="body2">{meeting.description}</Typography>
                {/* Link로 이동하는 부분 */}
                <Link to={`/group/detail/${meeting.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="outlined">상세보기</Button>
                </Link>
              </Box>
            ))
          )}
        </Box>

        {/* 페이지네이션 */}
        <Box className="pagination">
          <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            이전
          </Button>
          <Typography>{`${currentPage} / ${totalPages}`}</Typography>
          <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            다음
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Group;
