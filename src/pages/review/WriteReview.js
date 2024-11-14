import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import '../../assets/styles/Review.css';
import '../../assets/styles/General.css';

// 가상의 모임 데이터 예시
const meetings = [
  { id: 1, name: '모임 1' },
  { id: 2, name: '모임 2' },
  { id: 3, name: '모임 3' },
  // 더 많은 모임 데이터 추가...
];

function WriteReview() {
  // URL에서 쿼리 파라미터 가져오기 부분을 제거하고, 직접 ID 1로 설정
  const meetingId = 1;  // 하드코딩된 meetingId = 1
  
  const [meeting, setMeeting] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState('#000000');

  // 모임 정보 찾기
  useEffect(() => {
    if (meetingId) {
      const foundMeeting = meetings.find(m => m.id === meetingId);
      setMeeting(foundMeeting);
    }
  }, [meetingId]);

  // 제출 버튼 클릭 시 처리
  const handleSubmit = () => {
    // 실제 서버로 제출 처리 예시 없이 그냥 콘솔 로그
    console.log('제출 완료:', { title, content, meeting, fontSize, fontColor });
  };

  return (
    <Box className="write-review-container">
      <Typography variant="h4">후기 작성</Typography>

      {meeting ? (
        <Box>
          <Typography variant="h6">모임: {meeting.name}</Typography>
          
          {/* 제목 입력란 */}
          <TextField
            label="제목"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          
          {/* 본문 입력란 */}
          <TextField
            label="본문"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
            style={{
              fontSize: `${fontSize}px`,
              color: fontColor,
            }}
          />
          
          {/* 글씨 크기 선택 */}
          <FormControl fullWidth margin="normal">
            <InputLabel>글씨 크기</InputLabel>
            <Select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            >
              <MenuItem value={12}>12px</MenuItem>
              <MenuItem value={16}>16px</MenuItem>
              <MenuItem value={20}>20px</MenuItem>
              <MenuItem value={24}>24px</MenuItem>
            </Select>
          </FormControl>

          {/* 글씨 색상 선택 */}
          <FormControl fullWidth margin="normal">
            <InputLabel>글씨 색상</InputLabel>
            <Select
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
            >
              <MenuItem value="#000000">검정</MenuItem>
              <MenuItem value="#ff0000">빨강</MenuItem>
              <MenuItem value="#0000ff">파랑</MenuItem>
              <MenuItem value="#008000">초록</MenuItem>
            </Select>
          </FormControl>

          {/* 작성 완료 버튼 */}
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
