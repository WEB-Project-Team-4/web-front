// src/pages/Main.js
import React, { useState } from 'react';
import { Box, Typography, Divider, TextField, Select, MenuItem, Switch, Grid, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../../assets/styles/Group.css';
import '../../assets/styles/General.css';
import { regionData } from '../../data/regionData';
import CardItem from '../../components/CardItem';
import cardTestImage from '../../img/card_test.jpg';

function Main() {
  const [activeLink, setActiveLink] = useState('전체');
  const [region, setRegion] = useState('');
  const [subRegion, setSubRegion] = useState('');
  const [isRecruiting, setIsRecruiting] = useState(true);
  const [page, setPage] = useState(1);

  const handleNavigation = (label) => {
    setActiveLink(label);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
    setSubRegion('');
  };

  const handleRecruitingSwitch = (event) => {
    setIsRecruiting(event.target.checked);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const mockData = {
    category: '스터디',
    location: '서울 이번주 일요일',
    title: '광수님과 함께하는 자바 스터디',
    description: '광수님과 함께라면 어디든 갈 수 있어',
    people: '3/12',
    comments: '3',
    imageUrl: cardTestImage,
  };

  const cards = Array(9).fill(mockData);

  return (
    <Box className="main-container">
      <Box className="banner">
        <Typography variant="h2" component="h1" className="banner-text">BANNER</Typography>
      </Box>

      <Box className="search-box">
        <TextField
          variant="outlined"
          placeholder="검색어를 입력해주세요"
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          className="search-input"
        />
      </Box>

      {/* 카드 컴포넌트 사용 */}
      <Box className="card-container">
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          {cards.map((cardData, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
              {/* 상세 페이지로 이동하는 링크 추가 */}
              <CardItem
                to={`/detail/${index}`} // 예시로 상세 페이지 링크 추가
                category={cardData.category}
                location={cardData.location}
                title={cardData.title}
                description={cardData.description}
                people={cardData.people}
                comments={cardData.comments}
                imageUrl={cardData.imageUrl}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box className="pagination-box">
        <Pagination
          count={5}
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

export default Main;
