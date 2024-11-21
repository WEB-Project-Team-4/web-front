import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import "../../assets/styles/Group.css";
import "../../assets/styles/Review.css";
import "../../assets/styles/General.css";
import CardItem from "../../components/CardItem";
import { fetchReviewGroups } from "../../API/review"; // API 함수 import

function RegistPage() {
  const [page, setPage] = useState(1); // 현재 페이지
  const [items, setItems] = useState([]); // API에서 받은 데이터
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [loading, setLoading] = useState(false); // 로딩 상태
  const itemsPerPage = 9; // 페이지당 항목 수

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchReviewGroups({
          currentPage: page,
          pageSize: itemsPerPage,
        });

        setItems(data.list || []); // 받아온 데이터 리스트
        setTotalPages(data.totalPages || 1); // 총 페이지 수
      } catch (error) {
        console.error("Failed to fetch review groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  // 페이지 변경 핸들러
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
          {/* 로딩 상태 */}
          {loading && (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", width: "100%" }}
            >
              로딩 중...
            </Typography>
          )}

          {/* 카드 데이터 렌더링 */}
          {!loading &&
            items.map((item) => (
              <Grid item xs={4} sm={4} md={4} key={item.groupId}>
                <Link
                  to={`/review/write/${item.groupId}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardItem
                    category={item.categoryName}
                    location={item.groupVo.city}
                    title={item.groupVo.groupName}
                    description={item.groupVo.introText}
                    people={`${item.groupVo.participationCount}/${item.groupVo.groupLimit}`}
                    imageUrl={
                      item.groupVo.groupImg === "default url"
                        ? "/default-image.png"
                        : item.groupVo.groupImg
                    }
                  />
                </Link>
              </Grid>
            ))}

          {/* 빈 카드로 레이아웃 채우기 */}
          {!loading &&
            Array.from({ length: itemsPerPage - items.length }).map(
              (_, index) => (
                <Grid item xs={4} sm={4} md={4} key={`empty-card-${index}`}>
                  <Box className="empty-card">{/* 빈 카드에 내용 없음 */}</Box>
                </Grid>
              )
            )}
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

export default RegistPage;
