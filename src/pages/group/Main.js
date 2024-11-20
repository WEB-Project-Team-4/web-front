// src/pages/Main.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  Select,
  MenuItem,
  Switch,
  Grid,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../../assets/styles/Group.css";
import "../../assets/styles/General.css";
import { regionData } from "../../data/regionData";
import CardItem from "../../components/CardItem";
import cardTestImage from "../../img/card_test.jpg";
import cardTestImage2 from "../../img/card_test2.png";
import defaultImg from "../../img/card_test.jpg";

import { fetchGroups } from "../../API/group"; // API 요청 함수 import

function Main() {
  const [activeLink, setActiveLink] = useState("전체");
  const [region, setRegion] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [isRecruiting, setIsRecruiting] = useState(true); // 모집 여부
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [page, setPage] = useState(1);

  const [cards, setCards] = useState([]); // 서버에서 가져온 그룹 데이터
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [searchText, setSearchText] = useState("");
  const cardsPerPage = 9; // 페이지당 카드 수

  // // 현재 페이지에 표시할 카드 항목 계산
  const startIndex = (page - 1) * cardsPerPage;
  const displayedCards = cards.slice(startIndex, startIndex + cardsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGroups({
          category: activeLink === "전체" ? "all" : activeLink,
          currentPage: page,
          pageSize: cardsPerPage,
          searchParam: searchQuery,
          // loc: region || subRegion, // 시/도 + 군/구 결합
          isActive: isRecruiting ? "Y" : "N",
          city: region === "" ? "all" : region,
          district: subRegion === "" ? "all" : subRegion,
        });

        setCards(data.list); // 그룹 데이터 추출
        setTotalPages(data.totalPages); // 전체 페이지 수 설정
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      }
    };

    console.log(region);
    console.log(subRegion);
    fetchData();
  }, [activeLink, region, subRegion, isRecruiting, page, searchQuery]);

  const handleNavigation = (label) => {
    setActiveLink(label);
    setPage(1);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
    setSubRegion("");
    setPage(1);
  };

  const handleRecruitingSwitch = (event) => {
    setIsRecruiting(event.target.checked);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchBtn = (event) => {
    console.log(searchText);
    setSearchQuery(searchText);
  };

  const handleSearchText = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  return (
    <Box className="main-container">
      <Box className="banner">
        <Typography variant="h2" component="h1" className="banner-text">
          BANNER
        </Typography>
      </Box>
      {/* <Box className="search-box">
        <TextField
          variant="outlined"
          placeholder="검색어를 입력해주세요"
          InputProps={{
            startAdornment: <SearchIcon onClick={handleSearchBtn} />,
          }}
          className="search-input"
          onChange={handleSearchText}
        />
      </Box> */}
      <Box className="search-box">
        <TextField
          variant="outlined"
          placeholder="검색어를 입력해주세요"
          InputProps={{
            startAdornment: <SearchIcon onClick={handleSearchBtn} />,
          }}
          className="search-input"
          onChange={handleSearchText}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSearchBtn(); // 엔터키로 검색 실행
            }
          }}
        />
      </Box>

      {/* 네비게이션 메뉴 */}
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        {["전체", "스터디", "스포츠", "음식", "기타"].map((label, index) => (
          <Typography
            key={label}
            onClick={() => handleNavigation(label)}
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              padding: "8px 77px",
              marginRight: index < 4 ? 2 : 0, // 마지막 항목은 여백 제거
              cursor: "pointer",
              color: activeLink === label ? "#fff" : "#7F86EC", // 선택된 텍스트는 흰색, 나머지는 파란색 계열
              backgroundColor: activeLink === label ? "#7F86EC" : "transparent", // 선택된 배경 색상 변경
              borderRadius: "20px",
              transition: "background-color 0.3s ease, color 0.3s ease",
              "&:hover": {
                backgroundColor: "#5a68b3",
                color: "white",
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
            borderRadius: "10px",
            textAlign: "center",
            fontWeight: "bold",
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#b3b3b3",
              borderWidth: "1px",
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
          <MenuItem value="강원">강원</MenuItem>
          <MenuItem value="경기">경기</MenuItem>
          <MenuItem value="경남">경남</MenuItem>
          <MenuItem value="경북">경북</MenuItem>
          <MenuItem value="광주">광주</MenuItem>
          <MenuItem value="대구">대구</MenuItem>
          <MenuItem value="대전">대전</MenuItem>
          <MenuItem value="부산">부산</MenuItem>
          <MenuItem value="서울">서울</MenuItem>
          <MenuItem value="울산">울산</MenuItem>
          <MenuItem value="인천">인천</MenuItem>
          <MenuItem value="전남">전남</MenuItem>
          <MenuItem value="전북">전북</MenuItem>
          <MenuItem value="제주">제주</MenuItem>
          <MenuItem value="충남">충남</MenuItem>
          <MenuItem value="충북">충북</MenuItem>
        </Select>

        <Select
          value={subRegion}
          onChange={(e) => setSubRegion(e.target.value)}
          displayEmpty
          variant="outlined"
          className="region-select"
          sx={{
            minWidth: 120,
            borderRadius: "10px",
            textAlign: "center",
            fontWeight: "bold",
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#b3b3b3",
              borderWidth: "1px",
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
            <MenuItem key={idx} value={subRegionName}>
              {subRegionName}
            </MenuItem>
          ))}
        </Select>

        <Typography sx={{ paddingLeft: "16px", fontWeight: "bold" }}>
          모집중
        </Typography>

        <Switch
          checked={isRecruiting}
          onChange={handleRecruitingSwitch}
          sx={{
            marginLeft: "-1.5%",
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#7F86EC",
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#7F86EC",
            },
          }}
        />
      </Box>

      {/* 카드 컴포넌트 사용 */}
      <Box className="card-container">
        <Grid container spacing={2} columns={12}>
          {/* 카드 데이터 렌더링 */}
          {cards.map((cardItem, index) => (
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              key={cardItem.group.groupId || `card-${index}`}
            >
              <CardItem
                to={`/group/detail/${cardItem.group.groupId}`}
                category={cardItem.categoryName}
                location={`${cardItem.group.city}`}
                title={cardItem.group.groupName}
                date={
                  cardItem.dday === 0
                    ? "오늘"
                    : cardItem.dday > 0
                    ? `D-${cardItem.dday}`
                    : `D+${Math.abs(cardItem.dday)}`
                }
                description={cardItem.group.introText}
                people={`${cardItem.group.participationCount}/${cardItem.group.groupLimit}`}
                comments={cardItem.group.commentCount}
                imageUrl={
                  cardItem.group.groupImg === null
                    ? defaultImg
                    : cardItem.group.groupImg
                }
              />
            </Grid>
          ))}

          {/* 빈 카드로 레이아웃 채우기 */}
          {Array.from({ length: 9 - cards.length }).map((_, index) => (
            <Grid item xs={4} sm={4} md={4} key={`empty-card-${index}`}>
              <Box className="empty-card">{/* 빈 카드에 들어갈 내용 */}</Box>
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
            "& .MuiPaginationItem-root": {
              color: "#7F86EC",
              fontSize: "1.2rem",
              minWidth: "48px",
              minHeight: "48px",
              padding: "8px",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#7F86EC",
              color: "#fff",
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "rgba(127, 134, 236, 0.1)",
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default Main;
