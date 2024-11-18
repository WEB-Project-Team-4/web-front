import React, { useState } from 'react';
import { Box, Typography, TextField, Select, MenuItem, Switch, Button, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import '../../assets/styles/Review.css';
import '../../assets/styles/General.css';
import { regionData } from '../../data/regionData';
import thumbnail1 from '../../img/thumbnail1.jpg';
import thumbnail2 from '../../img/thumbnail2.jpg';

function Main() {
  const [activeLink, setActiveLink] = useState('전체');
  const [region, setRegion] = useState('');
  const [subRegion, setSubRegion] = useState('');
  const [isRecruiting, setIsRecruiting] = useState(true);
  const [page, setPage] = useState(1);

  const reviews = [
    {
      id: 1,
      title: '모임 후기 1',
      description: '이 모임은 정말 유익했습니다! 다양한 사람들과 교류할 수 있어 좋았어요.',
      commentCount: 10,
      author: '김철수',
      createdAt: '2024-11-14 12:30',
      thumbnail: thumbnail1
    },
    {
      id: 2,
      title: '모임 후기 2',
      description: '정말 재밌는 시간이었고, 모임의 분위기도 아주 좋았습니다.',
      commentCount: 5,
      author: '박지민',
      createdAt: '2024-11-12 14:00',
    },
    {
      id: 3,
      title: '모임 후기 3',
      description: '이 모임을 통해 많은 정보를 얻을 수 있어서 매우 만족스럽습니다.',
      commentCount: 3,
      author: '이영희',
      createdAt: '2024-11-10 16:45',
      thumbnail: thumbnail2
    },
    {
      id: 4,
      title: '모임 후기 4',
      description: '이 모임을 통해 많은 정보를 얻을 수 있어서 매우 만족스럽습니다.',
      commentCount: 3,
      author: '이영희',
      createdAt: '2024-11-10 16:45',
      thumbnail: thumbnail2
    },
    {
      id: 5,
      title: '모임 후기 5',
      description: '이 모임을 통해 많은 정보를 얻을 수 있어서 매우 만족스럽습니다.',
      commentCount: 3,
      author: '이영희',
      createdAt: '2024-11-10 16:45',
      thumbnail: thumbnail2
    }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  // 페이지에 맞는 리뷰들만 선택
  const displayedReviews = reviews.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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

  return (
    <Box className="main-container">
      {/* 배너 */}
      <Box className="banner">
        <Typography variant="h2" component="h1" className="banner-text">BANNER</Typography>
      </Box>

      {/* 검색창 */}
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
              marginRight: index < 4 ? 2 : 0,
              cursor: 'pointer',
              color: activeLink === label ? '#fff' : '#7F86EC',
              backgroundColor: activeLink === label ? '#7F86EC' : 'transparent',
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

      {/* 지역 지정 */}
      <Box className="filter-container">
        <Select
          value={region}
          onChange={handleRegionChange}
          displayEmpty
          variant="outlined"
          className="region-select"
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
        />
      </Box>

      {/* 후기 카드 */}
      <Box className="review-form-container" sx={{ position: 'relative' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          모임 후기
        </Typography>

        <Link to="/review/regist">
          <Button className="write-button-right">작성하기</Button>
        </Link>

        {displayedReviews.map((review) => (
          <Link key={review.id} to={`/review/detail/${review.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box className="review-card">
              <Box className="review-card-content">
                <Typography className="review-card-title">{review.title}</Typography>
                <Typography className="review-card-description">{review.description}</Typography>
                <Typography className="review-card-meta">
                  댓글 {review.commentCount}개 | 작성자 {review.author} | {review.createdAt}
                </Typography>
              </Box>
              {review.thumbnail && (
                <img src={review.thumbnail} alt="" className="review-card-thumbnail" />
              )}
            </Box>
          </Link>
        ))}
      </Box>

      {/* 페이지네이션 */}
      <Box className="pagination-box">
        <Pagination
          count={totalPages}
          shape="rounded"
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

export default Main;
