import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Pagination,
  Divider
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import "../../assets/styles/Review.css";
import "../../assets/styles/General.css";
import { regionData } from "../../data/regionData";
import { fetchReviews } from "../../API/review";

function Main() {
  const [activeLink, setActiveLink] = useState("전체");
  const [region, setRegion] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchReviews({
          category: activeLink === "전체" ? "all" : activeLink,
          currentPage: page,
          pageSize: itemsPerPage,
          searchParam: searchQuery,
          city: region === "" ? "all" : region,
          district: subRegion === "" ? "all" : subRegion,
        });

        setReviews(data.list || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeLink, region, subRegion, page, searchQuery]);

// 작성하기 버튼
  const handleButtonClick = () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("로그인이 필요합니다.");
    } else {
      window.location.href = "/review/regist"; // 페이지 이동
    }
  };

  const handleNavigation = (label) => {
    setActiveLink(label);
    setPage(1);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
    setSubRegion("");
    setPage(1);
  };

  const handleSearchBtn = () => {
    setSearchQuery(searchText);
    // setPage(1);
  };
  const handleSearchText = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };


  const handleLinkClick = (e, reviewId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      e.preventDefault(); // 링크 기본 동작 막기
      alert("로그인이 필요합니다.");
    } else {
      console.log(`Navigating to review ID: ${reviewId}`);
    }
  };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <Box className="main-container">
      <Box className="banner">
        <Typography variant="h2" component="h1" className="banner-text">
          BANNER
        </Typography>
      </Box>

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
              marginRight: index < 4 ? 2 : 0,
              cursor: "pointer",
              color: activeLink === label ? "#fff" : "#7F86EC",
              backgroundColor: activeLink === label ? "#7F86EC" : "transparent",
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
      </Box>

      {loading ? (
        <Typography>로딩 중...</Typography>
      ) : (
        <Box className="review-form-container">
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: "100px" }}
          >
            모임 후기
          </Typography>

          <Button className="write-button-right" onClick={handleButtonClick}>
            작성하기
          </Button>

          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Link
                key={review.reviewId}
                to={`/review/detail/${review.reviewId}`}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={(e) => handleLinkClick(e, review.reviewId)}
              >
                <Divider className="id-navigation-divider" flexItem />
                <Box className="review-card">
                  <Box className="review-card-content">
                    <Typography className="review-card-title">
                      {review.reviewTitle} 
                    </Typography>
                    <Typography className="review-card-description">
                      {review.reviewContent.replace(/<[^>]+>/g, '')}
                    </Typography>
                    <Typography className="review-card-meta">
                      댓글 {review.reviewCommentCnt}개 | 작성자{" "}
                      {review.reviewWriter} | {formatDate(review.createdAt)}
                    </Typography>
                  </Box>
                  {review.reviewImgUrl && (
                    <img
                      src={review.reviewImgUrl}
                      alt=""
                      className="review-card-thumbnail"
                    />
                  )}
                </Box>
              </Link>
            ))
          ) : (
            <Typography>표시할 데이터가 없습니다.</Typography>
          )}
        </Box>
      )}

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
