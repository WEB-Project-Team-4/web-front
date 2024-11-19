// src/review/Modify.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography, TextField } from '@mui/material';
import '../../assets/styles/Review.css';

function Modify() {
  const location = useLocation();
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [reviewData, setReviewData] = useState({
    id: null,
    title: '',
    content: '',
    relatedMeeting: '예시 모임 이름',
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const reviewId = searchParams.get('=');
    if (reviewId) {
      fetchReviewData(reviewId);
    }

    // Initialize Summernote
    window.$(editorRef.current).summernote({
      lang: 'ko-KR',
      height: 800,
      placeholder: '후기 내용을 작성해주세요...',
      callbacks: {
        onChange: (contents) => {
          setReviewData((prev) => ({ ...prev, content: contents }));
        },
      },
    });

    return () => {
      if (window.$(editorRef.current).summernote) {
        window.$(editorRef.current).summernote('destroy');
      }
    };
  }, [location.search]);

  const fetchReviewData = (id) => {
    setReviewData({
      id,
      title: `후기 제목 ${id}`,
      content: `후기 내용 ${id}`,
      relatedMeeting: '예시 모임 이름',
    });
  };

  const handleUpdate = () => {
    console.log('수정된 데이터:', reviewData);
    navigate('/my/review'); // 수정 완료 후 리뷰 목록 페이지로 이동
  };

  const handleDelete = () => {
    console.log('삭제된 리뷰 ID:', reviewData.id);
    navigate('/my/review'); // 삭제 후 내 리뷰 목록 페이지로 이동
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box className="review-write-container">
      {/* 상단 제목 */}
      <Typography variant="h4" className="review-header">
        후기 수정
      </Typography>

      {/* 제목 입력 섹션 */}
      <Box className="review-title-section">
        <Typography variant="h5" className="review-title-label">
          제목:
        </Typography>
        <TextField
          name="title"
          value={reviewData.title}
          onChange={handleChange}
          placeholder="제목을 입력해주세요"
          fullWidth
          className="review-title-input"
        />
      </Box>

      {/* Summernote 에디터 */}
      <Box>
        <div ref={editorRef} className="review-editor" dangerouslySetInnerHTML={{ __html: reviewData.content }}></div>
      </Box>

      {/* 작성 중인 모임 정보 */}
      <Typography variant="subtitle1" className="review-meeting-info">
        작성 중인 모임: {reviewData.relatedMeeting}
      </Typography>

      {/* 수정 및 삭제 버튼 */}
      <Box className="review-submit-container">
        <Button
          variant="contained"
          color="primary"
          className="button-general"
          onClick={handleUpdate}
        sx={{ marginRight: 2 }}
        >
          수정하기
        </Button>
        <Button
          variant="outlined"
          color="error"
          className="button-general"
          onClick={handleDelete}
        >
          삭제하기
        </Button>
      </Box>
    </Box>
  );
}

export default Modify;

