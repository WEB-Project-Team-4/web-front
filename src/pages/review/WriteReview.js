import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import '../../assets/styles/Review.css';

const meetings = [
  { id: 1, name: '모임 1' },
  { id: 2, name: '모임 2' },
  { id: 3, name: '모임 3' },
];

function WriteReview() {
  const meetingId = 1; // 하드코딩된 모임 ID
  const [meeting, setMeeting] = useState(null);
  const [content, setContent] = useState(''); // Summernote 내용 저장
  const editorRef = useRef(null); // Summernote를 초기화할 DOM 요소 참조

  useEffect(() => {
    // 모임 데이터 설정
    if (meetingId) {
      const foundMeeting = meetings.find((m) => m.id === meetingId);
      setMeeting(foundMeeting);
    }
  }, [meetingId]);

  useEffect(() => {
    // Summernote 리소스 로드 및 초기화
    const loadCSS = (href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    };

    const loadJS = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };

    loadJS(`${process.env.PUBLIC_URL}/summernote/summernote-lite.js`).then(() => {
      if (!window.$.fn.summernote) {
        console.error('Summernote is not loaded correctly.');
      } else {
        console.log('Summernote loaded successfully.');
      }
    });

    loadCSS('/summernote/summernote-lite.css');
    loadJS('/summernote/summernote-lite.js').then(() => {
      loadJS('/summernote/lang/summernote-ko-KR.js').then(() => {
        window.$(editorRef.current).summernote({
          lang: 'ko-KR',
          height: 200,
          callbacks: {
            onChange: (contents) => setContent(contents),
          },
        });
      });
    });
    



    // 컴포넌트가 언마운트될 때 Summernote 정리
    return () => {
      if (window.$(editorRef.current).summernote) {
        window.$(editorRef.current).summernote('destroy');
      }
    };
  }, []);

  const handleSubmit = () => {
    console.log('제출된 내용:', content);
  };

  return (
    <Box className="write-review-container">
      <Typography variant="h4">후기 작성</Typography>
      {meeting ? (
        <Box>
          <Typography variant="h6">모임: {meeting.name}</Typography>
          <div ref={editorRef} id="summernote"></div> {/* Summernote 초기화 대상 */}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            작성 완료
          </Button>
        </Box>
      ) : (
        <Typography>모임 정보를 불러오는 중입니다...</Typography>
      )}
    </Box>
  );
}

export default WriteReview;
