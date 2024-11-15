import React, { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../assets/styles/Review.css';
import '../../assets/styles/General.css';

// 가상의 모임 데이터 예시
const meetings = [
  { id: 1, name: '모임 1', description: '모임 설명 1' },
  { id: 2, name: '모임 2', description: '모임 설명 2' },
  { id: 3, name: '모임 3', description: '모임 설명 3' },
  { id: 4, name: '모임 4', description: '모임 설명 4' },
  { id: 5, name: '모임 5', description: '모임 설명 5' },
  { id: 6, name: '모임 6', description: '모임 설명 6' },
  { id: 7, name: '모임 7', description: '모임 설명 7' },
  { id: 8, name: '모임 8', description: '모임 설명 8' },
  { id: 9, name: '모임 9', description: '모임 설명 9' },
  { id: 1, name: '모임 11', description: '모임 설명 111' },
  { id: 2, name: '모임 12', description: '모임 설명 112' },
  { id: 3, name: '모임 13', description: '모임 설명 113' },
  { id: 4, name: '모임 14', description: '모임 설명 114' },
  { id: 5, name: '모임 15', description: '모임 설명 115' },
  { id: 6, name: '모임 16', description: '모임 설명 116' },
  { id: 7, name: '모임 17', description: '모임 설명 117' },
  { id: 8, name: '모임 18', description: '모임 설명 118' },
  { id: 9, name: '모임 19', description: '모임 설명 119' },
  { id: 1, name: '모임 21', description: '모임 설명 121' },
  { id: 2, name: '모임 22', description: '모임 설명 122' },
  { id: 3, name: '모임 23', description: '모임 설명 123' },
  { id: 4, name: '모임 24', description: '모임 설명 124' },
  { id: 5, name: '모임 25', description: '모임 설명 125' },
  { id: 6, name: '모임 26', description: '모임 설명 126' },
  { id: 7, name: '모임 27', description: '모임 설명 127' },
  { id: 8, name: '모임 28', description: '모임 설명 128' },
  { id: 9, name: '모임 29', description: '모임 설명 129' }
];

function RegistPage() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  // 페이지네이션 처리
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = meetings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(meetings.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box className="regist-container">
      {/* 상단 문구 */}
      <Typography variant="h4" className="regist-title">
        후기를 작성하고 싶은 모임을 선택하세요
      </Typography>

      {/* 모임 선택 3x3 그리드 */}
      <Grid container spacing={2} className="meeting-grid">
        {currentItems.map((meeting) => (
            // 누를경우 페이지 이동 처리 : 나중에 해당 카드의 실제 모임데이터 가져와야함
          <Grid item xs={3} key={meeting.id}> 
            <Link to={`/review/write?=${meeting.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box className="meeting-card">
                <Typography variant="h6">{meeting.name}</Typography>
                <Typography>{meeting.description}</Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* 페이지네이션 */}
      <Box className="pagination-container">
        <Button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
        >
          이전
        </Button>
        <Typography>{page} / {totalPages}</Typography>
        <Button
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
          disabled={page === totalPages}
        >
          다음
        </Button>
      </Box>
    </Box>
  );
}

export default RegistPage;
