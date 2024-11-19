import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../assets/styles/Group.css';
import '../../assets/styles/Review.css';
import '../../assets/styles/General.css';
import CardItem from '../../components/CardItem';

// 가상의 모임 데이터 예시
const meetings = [
  { id: 1, name: '모임 1', description: '모임 설명 1', location: '서울', imageUrl: '', participants: '3/10' },
  { id: 2, name: '모임 2', description: '모임 설명 2', location: '부산', imageUrl: '', participants: '5/10' },
  { id: 3, name: '모임 3', description: '모임 설명 3', location: '대구', imageUrl: '', participants: '8/10' },
  { id: 4, name: '모임 4', description: '모임 설명 4', location: '인천', imageUrl: '', participants: '2/10' },
  { id: 5, name: '모임 5', description: '모임 설명 5', location: '광주', imageUrl: '', participants: '7/10' },
  { id: 6, name: '모임 6', description: '모임 설명 6', location: '대전', imageUrl: '', participants: '4/10' },
  { id: 7, name: '모임 7', description: '모임 설명 7', location: '울산', imageUrl: '', participants: '9/10' },
  { id: 8, name: '모임 8', description: '모임 설명 8', location: '경기', imageUrl: '', participants: '6/10' },
  { id: 9, name: '모임 9', description: '모임 설명 9', location: '충북', imageUrl: '', participants: '10/10' },
  { id: 9, name: '모임 9', description: '모임 설명 9', location: '충북', imageUrl: '', participants: '10/10' },
];

function RegistPage() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = meetings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(meetings.length / itemsPerPage);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box className="regist-container">
      {/* 페이지 제목 */}
      <Typography variant="h4" className="review-regist-header">
        후기를 작성할 모임을 선택하세요
      </Typography>

      {/* 카드 컨테이너 */}
      <Box className="card-container">
        <Grid container spacing={2} columns={12}>
          {/* 카드 데이터 렌더링 */}
          {currentItems.map((meeting) => (
            <Grid item xs={4} sm={4} md={4} key={meeting.id}>
              <Link to={`/review/write?=${meeting.id}`} style={{ textDecoration: 'none' }}>
                <CardItem
                  to=""
                  category={meeting.name}
                  location={meeting.location}
                  title={meeting.name}
                  description={meeting.description}
                  people={meeting.participants}
                  imageUrl={meeting.imageUrl || '/default-image.png'} // 기본 이미지 사용
                />
              </Link>
            </Grid>
          ))}

          {/* 빈 카드로 레이아웃 채우기 */}
          {Array.from({ length: itemsPerPage - currentItems.length }).map((_, index) => (
            <Grid item xs={4} sm={4} md={4} key={`empty-card-${index}`}>
              <Box className="empty-card">
                {/* 빈 카드에 내용 없음 */}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 페이지네이션 */}
      <Box className="pagination-box">
        <Pagination
          count={totalPages}
          shape="rounded"
          page={page}
          onChange={handlePageChange}
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#7F86EC',
              fontSize: '1.2rem',
              minWidth: '48px',
              minHeight: '48px',
              padding: '8px',
            },
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: '#7F86EC',
              color: '#fff',
            },
            '& .MuiPaginationItem-root:hover': {
              backgroundColor: 'rgba(127, 134, 236, 0.1)',
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default RegistPage;
