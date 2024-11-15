// src/pages/InfoModifyPage.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, FormControl, InputLabel  } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import '../../assets/styles/My.css';
import '../../assets/styles/General.css'; // 스타일 적용

function InfoModify() {
  const navigate = useNavigate();

    // 임의의 아이디 (DB에서 가져오는 값으로 변경 예정)
    const userId = "sampleUser123";


  
  // 사용자 정보 상태 관리
  const [userInfo, setUserInfo] = useState({
    nickname:'런닝킹쥬쓰',
    name: '김주쓰', // 예시 데이터
    email: 'jeus@example.com',
    phone: '010-1234-5678',
  });
  const [category, setCategory] = useState('');

  // 폼 입력값 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 정보 수정 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 서버로 데이터를 보내는 로직을 추가할 수 있습니다.
    console.log('수정된 정보:', userInfo);
    alert('정보가 수정되었습니다.');
    navigate('/my'); // 수정 후 마이페이지로 리다이렉트
  };

  return (
    <div className="my-form-container">
      <h2>회원 정보 변경</h2>
      <form onSubmit={handleSubmit}>

      <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label">아이디</Typography>
        <Typography variant="body2" className="general-form-id">
          {userId}
        </Typography>
      </Box>

        <div className="general-form-row">
        <Typography variant="body1" className="general-form-label">이름</Typography>
        
          <TextField
            label="이름"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </div>

        <div className="general-form-row">
        <Typography variant="body1" className="general-form-label">닉네임</Typography>
        
          <TextField
            label="닉네임"
            name="nickname"
            value={userInfo.nickname}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </div>

        <div className="general-form-row">
        <Typography variant="body1" className="general-form-label">이메일</Typography>
        
          <TextField
            label="이메일"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </div>
        <div className="general-form-row">
        <Typography variant="body1" className="general-form-label">전화번호</Typography>
        
          <TextField
            label="전화번호"
            name="phone"
            value={userInfo.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            
          />
        </div>

        <div className="general-form-row">
      <Typography variant="body1" className="general-form-label">카테고리</Typography>
      
      <FormControl className="general-form-input">
        <InputLabel id="category-label">관심 카테고리</InputLabel>
        <Select
          labelId="category-label"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="sports">스터디</MenuItem>
          <MenuItem value="music">스포츠</MenuItem>
          <MenuItem value="tech">음식</MenuItem>
          <MenuItem value="art">기타</MenuItem>
        </Select>
      </FormControl>
      </div>

        <Button type="submit" variant="contained" color="primary" className="button-general">
          수정 완료
        </Button>
      </form>
    </div>
  );
}

export default InfoModify;
