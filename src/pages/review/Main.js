import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../assets/styles/Review.css'; // Review.css를 import
import '../../assets/styles/General.css';

import thumbnail1 from '../../img/thumbnail1.jpg';
import thumbnail2 from '../../img/thumbnail2.jpg';

function Main() {
  const reviews = [
    {
      id: 1,  // 각 글의 고유 ID 추가
      title: '모임 후기 1',
      description: '이 모임은 정말 유익했습니다! 다양한 사람들과 교류할 수 있어 좋았어요. 정말 재밌는 시간이었고, 모임의 분위기도 아주 좋았습니다.',
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
    }
  ];

  return (
    <Box className="review-form-container" sx={{ position: 'relative' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        모임 후기
      </Typography>

      {/* '작성하기' 버튼 */}
      <Link to="/review/regist">
        <Button className="write-button-right">작성하기</Button>
      </Link>

      {/* 모임후기 카드들 */}
      {reviews.map((review, index) => (
        <Link key={review.id} to={`/review/detail/${review.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box className="review-card" sx={{ borderBottom: index !== reviews.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
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

      <Button className="button-general" sx={{ marginTop: '20px' }}>
        더 보기
      </Button>
    </Box>
  );
}

export default Main;
