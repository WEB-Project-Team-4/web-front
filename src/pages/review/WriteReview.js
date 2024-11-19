// src/review/WriteReview.js
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

function WriteReview() {
  const editorRef = useRef(null);
  const [content, setContent] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    window.$(editorRef.current).summernote({
      lang: 'ko-KR',
      height: 800,
      placeholder: '후기를 작성해주세요...',
      callbacks: {
        onChange: (contents) => {
          setContent(contents);

          // 이미지 URL 추출
          const urls = extractImageUrlsFromContent(contents);
          setImageUrls(urls);
        },
      },
    });

    return () => {
      if (window.$(editorRef.current).summernote) {
        window.$(editorRef.current).summernote('destroy');
      }
    };
  }, []);

  const extractImageUrlsFromContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const imgElements = doc.querySelectorAll('img');
    return Array.from(imgElements).map(img => img.src);
  };

  const handleSubmit = () => {
    console.log('제출된 내용:', content);
    console.log('이미지 URL 목록:', imageUrls);
  };

  return (
    <Box>
      <Typography variant="h4">후기 작성</Typography>
      <div ref={editorRef}></div>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        작성 완료
      </Button>
    </Box>
  );
}

export default WriteReview;
