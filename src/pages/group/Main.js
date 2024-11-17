// src/pages/Main.js
import React, { useState } from 'react';
import { Box, Typography, Divider, TextField, Select, MenuItem, Switch, Grid, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../../assets/styles/Group.css';
import '../../assets/styles/General.css';
import { regionData } from '../../data/regionData';
import CardItem from '../../components/CardItem';
import cardTestImage from '../../img/card_test.jpg';
import cardTestImage2 from '../../img/card_test2.png';

function Main() {
  const [activeLink, setActiveLink] = useState('전체');
  const [region, setRegion] = useState('');
  const [subRegion, setSubRegion] = useState('');
  const [isRecruiting, setIsRecruiting] = useState(true);
  const [page, setPage] = useState(1);
  const cardsPerPage = 9; // 페이지당 카드 수

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

  const mockData2 = {
    category: '스포츠',
    location: '경기도 군포',
    title: '광수님없는 광수님 러닝',
    description: '광수님이 모집하는 러닝모임',
    people: '2/6',
    comments: '2',
    imageUrl: cardTestImage2,
  };

  // const cards = Array(10).fill(mockData);
  // cards 배열을 mockData 10개와 mockData2 4개로 구성
  const cards = Array(10).fill(mockData).concat(Array(4).fill(mockData2));

  // 현재 페이지에 표시할 카드 항목 계산
  const startIndex = (page - 1) * cardsPerPage;
  const displayedCards = cards.slice(startIndex, startIndex + cardsPerPage);
  const totalPages = Math.ceil(cards.length / cardsPerPage);

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

      {/* 네비게이션 메뉴 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        {['전체', '스터디', '스포츠', '음식', '기타'].map((label, index) => (
          <Typography
            key={label}
            onClick={() => handleNavigation(label)}
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              padding: '8px 77px',
              marginRight: index < 4 ? 2 : 0, // 마지막 항목은 여백 제거
              cursor: 'pointer',
              color: activeLink === label ? '#fff' : '#7F86EC', // 선택된 텍스트는 흰색, 나머지는 파란색 계열
              backgroundColor: activeLink === label ? '#7F86EC' : 'transparent', // 선택된 배경 색상 변경
              borderRadius: '20px',
              transition: 'background-color 0.3s ease, color 0.3s ease',
              '&:hover': {
                backgroundColor: '#5a68b3',
                color: 'white',
              },
            }}
          >
            {label}
          </Typography>
        ))}
      </Box>

      <Divider orientation="horizontal" sx={{ mx: 1, height: 20 }} />

      <Box className="filter-container">
        <Select
          value={region}
          onChange={handleRegionChange}
          displayEmpty
          variant="outlined"
          className="region-select"
          sx={{
            minWidth: 120,
            borderRadius: '10px',
            textAlign: 'center',
            fontWeight: 'bold',
            '& .MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#b3b3b3',
              borderWidth: '1px',
            },
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200, // 드롭다운 메뉴의 최대 높이 설정
              },
            },
          }}
        >
          <MenuItem value="">시/도 선택</MenuItem>
          <MenuItem value="gangwon">강원</MenuItem>
          <MenuItem value="gyeonggi">경기</MenuItem>
          <MenuItem value="gyeongnam">경남</MenuItem>
          <MenuItem value="gyeongbuk">경북</MenuItem>
          <MenuItem value="gwangju">광주</MenuItem>
          <MenuItem value="daegu">대구</MenuItem>
          <MenuItem value="daejeon">대전</MenuItem>
          <MenuItem value="busan">부산</MenuItem>
          <MenuItem value="seoul">서울</MenuItem>
          <MenuItem value="ulsan">울산</MenuItem>
          <MenuItem value="incheon">인천</MenuItem>
          <MenuItem value="jeonnam">전남</MenuItem>
          <MenuItem value="jeonbuk">전북</MenuItem>
          <MenuItem value="jeju">제주</MenuItem>
          <MenuItem value="chungnam">충남</MenuItem>
          <MenuItem value="chungbuk">충북</MenuItem>
        </Select>

        <Select
          value={subRegion}
          onChange={(e) => setSubRegion(e.target.value)}
          displayEmpty
          variant="outlined"
          className="region-select"
          sx={{
            minWidth: 120,
            borderRadius: '10px',
            textAlign: 'center',
            fontWeight: 'bold',
            '& .MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#b3b3b3',
              borderWidth: '1px',
            },
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200, // 드롭다운 메뉴의 최대 높이 설정
              },
            },
          }}
        >
          <MenuItem value="">군/구 선택</MenuItem>
          {(regionData[region] || []).map((subRegionName, idx) => (
            <MenuItem key={idx} value={subRegionName}>{subRegionName}</MenuItem>
          ))}
        </Select>

        <Typography sx={{ paddingLeft: '16px', fontWeight: 'bold' }}>모집중</Typography>

        <Switch
          checked={isRecruiting}
          onChange={handleRecruitingSwitch}
          sx={{
            marginLeft: '-1.5%',
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#7F86EC',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#7F86EC',
            },
          }}
        />
      </Box>
      
      {/* 카드 컴포넌트 사용 */}
      <Box className="card-container">
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          {displayedCards.map((cardData, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
              <CardItem
                to={`/group/detail/${index}`}
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

export default Main;
