import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Link를 임포트하여 수정 페이지로 이동 가능하게 만들기
import { IconButton, Menu, MenuItem } from '@mui/material';  // 점 세 개 버튼과 메뉴를 만들기 위한 MUI 컴포넌트
import MoreVertIcon from '@mui/icons-material/MoreVert';  // 점 세 개 아이콘
import '../../assets/styles/My.css';
import '../../assets/styles/General.css';

function Review() {
  const [reviews, setReviews] = useState([
    { id: 1, title: '재미있었던 모임', content: '정말 유익하고 즐거운 시간이었어요!' },
    { id: 2, title: '괜찮은 경험', content: '조금 아쉬웠지만 좋은 분들과 함께할 수 있었어요.' },
    { id: 3, title: '최고의 모임!', content: '다음에도 또 참여하고 싶어요!' },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);  // 메뉴가 열릴 위치를 관리하는 상태
  const [selectedReviewId, setSelectedReviewId] = useState(null);  // 선택된 후기 ID

  // 메뉴를 열기 위한 함수
  const handleClick = (event, reviewId) => {
    setAnchorEl(event.currentTarget);
    setSelectedReviewId(reviewId);  // 클릭된 후기의 ID 저장
  };

  // 메뉴를 닫기 위한 함수
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedReviewId(null);  // 메뉴를 닫을 때 선택된 ID 초기화
  };

  // 삭제 처리 함수 (여기서는 콘솔에 로그를 출력하는 형태)
  const handleDelete = (reviewId) => {
    // 실제로는 서버에서 삭제 요청을 보내고 상태를 업데이트해야 합니다.
    console.log(`삭제된 후기 ID: ${reviewId}`);
    setReviews(reviews.filter((review) => review.id !== reviewId));  // 삭제된 후 후기를 업데이트
    handleClose();  // 메뉴 닫기
  };

  return (
    <div className="container">
      <h2 className='title-text'>내가 쓴 후기</h2>
      <ul className="review-list">
        {reviews.map((review) => (
          <li key={review.id} className="review-item">
            <div className="review-content-container">
              {/* 후기를 클릭하면 상세 페이지로 이동 */}
              <div className='general-row'>
                <Link to={`/review/detail/${review.id}`} style={{ textDecoration: 'none' }}>
                  <h3>{review.title}</h3>
                </Link>
                {/* 점 세 개 버튼 (메뉴 열기) */}
                <IconButton onClick={(e) => handleClick(e, review.id)}>
                  <MoreVertIcon />
                </IconButton>
              </div>
              <p className="review-content">{review.content}</p>
              {/* 메뉴가 열리면 '수정하기' 및 '삭제하기' 메뉴 항목을 표시 */}
              <Menu
                anchorEl={anchorEl}
                open={selectedReviewId === review.id}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to={`/review/modify?=${review.id}`}>수정하기</Link>
                </MenuItem>
                <MenuItem onClick={() => handleDelete(review.id)}>삭제하기</MenuItem>  {/* 삭제하기 메뉴 항목 추가 */}
              </Menu>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Review;
