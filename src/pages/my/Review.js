import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  Button,
  Pagination,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../../assets/styles/My.css";
import "../../assets/styles/General.css";
import { fetchMyReview } from "../../API/groupMy";
import defaultImg from "../../img/MOIN_review_img.jpg";
import { fetchRemoveReview } from "../../API/review";

function Review() {
  const itemsPerPage = 3; // 한 페이지에 표시할 리뷰 개수
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [isChange, setIsChagne] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMyReview({
          currentPage: page,
          pageSize: itemsPerPage,
        });
        setReviews(data.list || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchData();
  }, [page, isChange]);

  // 페이지 변경 핸들러
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleClick = (event, reviewId) => {
    setAnchorEl(event.currentTarget);
    setSelectedReviewId(reviewId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedReviewId(null);
  };

  const handleDelete = async (reviewId) => {
    // setReviews(reviews.filter((review) => review.id !== reviewId));

    try {
      // API 호출
      const response = await fetchRemoveReview(reviewId);

      console.log("리뷰 삭제 성공");
      alert("리뷰가 삭제되었습니다.");
      setIsChagne(!isChange);
      // navigate(`/review/main`);
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
      // navigate("/error");
    }

    // console.log("삭제된 리뷰 ID:", reviewData.id);
    // navigate("/my/review"); // 삭제 후 내 리뷰 목록 페이지로 이동

    handleClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  return (
    <div className="container">
      <h2 className="title-text">내가 쓴 후기</h2>
      <div
        className="write-button-container"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Link to="/review/regist" style={{ textDecoration: "none" }}>
          <Button className="my-write-button">작성하기</Button>
        </Link>
      </div>

      {reviews.length === 0 ? (
        <p className="general-no-reviews-message">
          작성하신 리뷰 글이 없습니다
        </p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <li
              key={review.reviewId}
              className="review-item"
              style={{
                display: "flex",
                alignItems: "flex-start", // 사진과 점 3개를 위쪽에 정렬
                justifyContent: "flex-start", // 좌측으로 정렬
                marginBottom: "16px",
                padding: "8px",
                borderRadius: "8px",
              }}
            >
              {/* 텍스트 항목 */}
              <div
                className="review-content-container"
                style={{ flex: 1, marginRight: "16px" }}
              >
                {/* 첫 번째 줄: 제목 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={`/review/detail/${review.reviewId}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h3 style={{ fontSize: "1.5rem", margin: 0 }}>
                      {review.reviewTitle}
                    </h3>
                  </Link>
                </div>
                {/* 두 번째 줄: 분류 | 내용 */}
                <p style={{ margin: "8px 0", color: "#555" }}>
                  <strong>{review.categoryName}</strong> |{" "}
                  {review.reviewContent.replace(/<[^>]+>/g, "")}
                </p>
                {/* 세 번째 줄: 댓글 개수, 작성 시간, 작성자 수 */}
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#777" }}>
                  댓글 {review.reviewCommentCnt}개 •{" "}
                  {formatDate(review.createdAt)} • by {review.reviewWriter}
                  {review.participants}
                </p>
              </div>

              {/* 이미지 */}
              <div
                style={{ flexShrink: 0, marginRight: "16px", marginTop: "8px" }}
              >
                <img
                  src={
                    review.reviewImgUrl === null ||
                    review.reviewImgUrl === "default url"
                      ? defaultImg
                      : review.reviewImgUrl
                  }
                  alt={review.title}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "8px",
                  }}
                />
              </div>

              {/* 점 3개 메뉴 (위쪽에 배치) */}
              <IconButton
                onClick={(e) => handleClick(e, review.reviewId)}
                style={{
                  flexShrink: 0,
                  marginTop: "8px", // 이미지와의 간격 조정
                }}
              >
                <MoreVertIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={selectedReviewId === review.reviewId}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    to={`/review/modify/${review.reviewId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    수정하기
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => handleDelete(review.reviewId)}>
                  삭제하기
                </MenuItem>
              </Menu>
            </li>
          ))}
        </ul>
      )}

      <Box className="pagination-box">
        <Pagination
          count={totalPages}
          shape="rounded"
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </div>
  );
}

export default Review;
