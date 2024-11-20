// src/review/WriteReview.js
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import { uploadImage } from '../../API/review';
import '../../assets/styles/Review.css'; // 스타일 파일 추가

function WriteReview() {
  const editorRef = useRef(null);
  const [content, setContent] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [title, setTitle] = useState(''); // 제목 관리
  const meetingName = '모임 1'; // 모임 이름 (예제)

  useEffect(() => {
    window.$(editorRef.current).summernote({
      lang: 'ko-KR',
      height: 800,
      placeholder: '후기를 작성해주세요...',
      callbacks: {
        onChange: (contents) => {
          setContent(contents);

          // 이미지 URL 추출
          // const urls = extractImageUrlsFromContent(contents);
          // setImageUrls(urls);
        },
        // onImageUpload: (files) => {
        //   handleImageUpload(files)// TODO: 이미지 업로드 API 호출
        // },
      },
    });

    return () => {
      if (window.$(editorRef.current).summernote) {
        window.$(editorRef.current).summernote('destroy');
      }
    };
  }, []);

  // const extractImageUrlsFromContent = (content) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(content, 'text/html');
  //   const imgElements = doc.querySelectorAll('img');
  //   return Array.from(imgElements).map(img => img.src);
  // };

  // const handleImageUpload = async (files) => {
  //   for (let i = 0; i < files.length; i++) {
  //     try {
  //       // const response = await uploadImage(files[i]);
  //       const response = await uploadImage(1);
  //       const imageUrl = response.data;
  //       window.$(editorRef.current).summernote('insertImage', imageUrl);
  //     } catch (error) {
  //       console.error('이미지 업로드 실패:', error);
  //     }
  //   }
  // };

  const handleSubmit = () => {
    console.log('제목:', title);
    console.log('제출된 내용:', content);
    // console.log('이미지 URL 목록:', imageUrls);
  };

  return (
    <Box className="review-write-container">
      {/* 상단 제목 */}
      <Typography variant="h4" className="review-header">
        후기 작성
      </Typography>

      {/* 제목 입력 섹션 */}
      <Box className="review-title-section">
        <Typography variant="h5" className="review-title-label">
          제목:
        </Typography>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          fullWidth
          className="review-title-input"
        />
      </Box>

      {/* Summernote 에디터 */}
      <Box>
        <div ref={editorRef} className="review-editor"></div>
      </Box>

      {/* 작성 중인 모임 정보 */}
      <Typography variant="subtitle1" className="review-meeting-info">
        작성 중인 모임: {meetingName}
      </Typography>

      {/* 작성하기 버튼 */}
      <Box className="review-submit-container">
        <Button
          variant="outlined"
          // fullWidth
          className="button-general"
          onClick={handleSubmit}
        >
          작성하기
        </Button>
      </Box>
    </Box>
  );
}

export default WriteReview;
