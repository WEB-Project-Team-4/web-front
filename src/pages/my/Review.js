import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../../assets/styles/My.css';
import '../../assets/styles/General.css';

function Review() {
  const [reviews, setReviews] = useState([  // 예시 리뷰 데이터 : 다 지울경우 글없음 표기
    { id: 1, title: '재미있었던 모임', content: '정말 유익하고 즐거운 시간이었어요!' },
    { id: 2, title: '괜찮은 경험', content: '조금 아쉬웠지만 좋은 분들과 함께할 수 있었어요.' },
    { id: 3, title: '최고의 모임!', content: '다음에도 또 참여하고 싶어요!' },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const handleClick = (event, reviewId) => {
    setAnchorEl(event.currentTarget);
    setSelectedReviewId(reviewId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedReviewId(null);
  };

  const handleDelete = (reviewId) => {
    console.log(`삭제된 후기 ID: ${reviewId}`);
    setReviews(reviews.filter((review) => review.id !== reviewId));
    handleClose();
  };

  return (
    <div className="container">
      <h2 className="title-text">내가 쓴 후기</h2>
      {/* '작성하기' 버튼 추가 */}
      <div className="write-button-container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/review/regist" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            작성하기
          </Button>
        </Link>
</div>
      {/* 리뷰가 없을 경우 '작성하신 리뷰 글이 없습니다' 표시 */}
      {reviews.length === 0 ? (
        <p className="general-no-reviews-message">작성하신 리뷰 글이 없습니다</p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review.id} className="review-item">
              <div className="review-content-container">
                <div className="general-row">
                  <Link to={`/review/detail/${review.id}`} style={{ textDecoration: 'none' }}>
                    <h3>{review.title}</h3>
                  </Link>
                  <IconButton onClick={(e) => handleClick(e, review.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </div>
                <p className="review-content">{review.content}</p>
                <Menu anchorEl={anchorEl} open={selectedReviewId === review.id} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                  <Link to={`/review/modify?=${review.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    수정하기
                  </Link>
                </MenuItem>
                  <MenuItem onClick={() => handleDelete(review.id)}>삭제하기</MenuItem>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      
    </div>
  );
}

export default Review;
