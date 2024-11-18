import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
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
  { id: 10, name: '모임 10', description: '모임 설명 10' },
  { id: 11, name: '모임 11', description: '모임 설명 11' },
  { id: 12, name: '모임 12', description: '모임 설명 12' },
  { id: 13, name: '모임 13', description: '모임 설명 13' },
  { id: 14, name: '모임 14', description: '모임 설명 14' },
  { id: 15, name: '모임 15', description: '모임 설명 15' },
  { id: 16, name: '모임 16', description: '모임 설명 16' },
  { id: 17, name: '모임 17', description: '모임 설명 17' },
  { id: 18, name: '모임 18', description: '모임 설명 18' },
  { id: 19, name: '모임 19', description: '모임 설명 19' },
  { id: 20, name: '모임 20', description: '모임 설명 20' },
  { id: 21, name: '모임 21', description: '모임 설명 21' },
  { id: 22, name: '모임 22', description: '모임 설명 22' },
  { id: 23, name: '모임 23', description: '모임 설명 23' },
  { id: 24, name: '모임 24', description: '모임 설명 24' },
  { id: 25, name: '모임 25', description: '모임 설명 25' },
  { id: 26, name: '모임 26', description: '모임 설명 26' },
  { id: 27, name: '모임 27', description: '모임 설명 27' },
  { id: 28, name: '모임 28', description: '모임 설명 28' },
  { id: 29, name: '모임 29', description: '모임 설명 29' },
];

function RegistPage() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = meetings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(meetings.length / itemsPerPage);

  return (
    <Box className="regist-container">
      <Typography variant="h4" className="regist-title">
        후기를 작성하고 싶은 모임을 선택하세요
      </Typography>

      {/* 모임 선택 3x3 그리드 */}
      <div className="meeting-grid">
        {currentItems.map((meeting) => (
          <div className="regist-meeting-card" key={meeting.id}>
            <Link to={`/review/write?=${meeting.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6">{meeting.name}</Typography>
              <Typography>{meeting.description}</Typography>
            </Link>
          </div>
        ))}
      </div>

      <Box className="regist-pagination-container">
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
