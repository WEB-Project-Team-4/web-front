import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Button, Pagination } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../../assets/styles/My.css';
import '../../assets/styles/General.css';

function Review() {
  const allReviews = [  // 예시 리뷰 데이터: 실제 데이터로 변경
    {
      id: 1,
      title: '재미있었던 모임',
      category: '활동',
      content: '정말 유익하고 즐거운 시간이었어요!',
      comments: 12,
      time: '2시간 전',
      participants: 5,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: '괜찮은 경험',
      category: '스포츠',
      content: '조금 아쉬웠지만 좋은 분들과 함께할 수 있었어요.',
      comments: 8,
      time: '3시간 전',
      participants: 3,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: '최고의 모임!',
      category: '음식',
      content: '다음에도 또 참여하고 싶어요!',
      comments: 20,
      time: '1일 전',
      participants: 10,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      title: '다시 가고 싶은 모임',
      category: '문화',
      content: '위치도 좋고 분위기도 좋았어요!',
      comments: 5,
      time: '5시간 전',
      participants: 8,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      title: '아쉬운 경험',
      category: '활동',
      content: '조금 아쉬웠지만 나쁘지 않았어요.',
      comments: 7,
      time: '1일 전',
      participants: 6,
      imageUrl: 'https://via.placeholder.com/150',
    },
    // ... 더 많은 리뷰 데이터
  ];

  const reviewsPerPage = 3;  // 한 페이지에 표시할 리뷰 개수
  const totalPages = Math.ceil(allReviews.length / reviewsPerPage); // 총 페이지 수 계산

  const [reviews, setReviews] = useState(allReviews.slice(0, reviewsPerPage));  // 초기 페이지 리뷰 목록
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태

  // 페이지 변경 핸들러
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    const startIndex = (value - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    setReviews(allReviews.slice(startIndex, endIndex));  // 해당 페이지에 맞는 리뷰 업데이트
  };

  const handleClick = (event, reviewId) => {
    setAnchorEl(event.currentTarget);
    setSelectedReviewId(reviewId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedReviewId(null);
  };

  const handleDelete = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
    handleClose();
  };

  return (
    <div className="container">
      <h2 className="title-text">내가 쓴 후기</h2>
      <div className="write-button-container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/review/regist" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            작성하기
          </Button>
        </Link>
      </div>

      {reviews.length === 0 ? (
        <p className="general-no-reviews-message">작성하신 리뷰 글이 없습니다</p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="review-item"
              style={{
                display: 'flex',
                alignItems: 'flex-start', // 사진과 점 3개를 위쪽에 정렬
                justifyContent: 'flex-start', // 좌측으로 정렬
                marginBottom: '16px',
                padding: '8px',
                borderRadius: '8px',
              }}
            >
              {/* 텍스트 항목 */}
              <div className="review-content-container" style={{ flex: 1, marginRight: '16px' }}>
                {/* 첫 번째 줄: 제목 */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Link
                    to={`/review/detail/${review.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{review.title}</h3>
                  </Link>
                </div>
                {/* 두 번째 줄: 분류 | 내용 */}
                <p style={{ margin: '8px 0', color: '#555' }}>
                  <strong>{review.category}</strong> | {review.content}
                </p>
                {/* 세 번째 줄: 댓글 개수, 작성 시간, 작성자 수 */}
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#777' }}>
                  댓글 {review.comments}개 • {review.time} • 작성자 {review.participants}명
                </p>
              </div>

              {/* 이미지 */}
              <div style={{ flexShrink: 0, marginRight: '16px', marginTop: '8px' }}>
                <img
                  src={review.imageUrl}
                  alt={review.title}
                  style={{ width: '150px', height: '150px', borderRadius: '8px' }}
                />
              </div>

              {/* 점 3개 메뉴 (위쪽에 배치) */}
              <IconButton
                onClick={(e) => handleClick(e, review.id)}
                style={{
                  flexShrink: 0,
                  marginTop: '8px', // 이미지와의 간격 조정
                }}
              >
                <MoreVertIcon />
              </IconButton>

              <Menu anchorEl={anchorEl} open={selectedReviewId === review.id} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                  <Link to={`/review/modify?=${review.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    수정하기
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => handleDelete(review.id)}>삭제하기</MenuItem>
              </Menu>
            </li>
          ))}
        </ul>
      )}

      {/* 페이지네이션 추가 */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
      />
    </div>
  );
}

export default Review;
