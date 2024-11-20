import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import '../../assets/styles/My.css';
import '../../assets/styles/General.css'; // 스타일 적용

function InfoModify() {
  const navigate = useNavigate();

  // 임의의 아이디 (DB에서 가져오는 값으로 변경 예정)
  const userId = "sampleUser123";
  const userEmail = "juth@naver.com"

  // 사용자 정보 상태 관리
  const [userInfo, setUserInfo] = useState({
    nickname:'런닝킹쥬쓰',
    name: '김주쓰', // 예시 데이터
    email: 'jeus@example.com',
    phone: '010-1234-5678',
    profileImage: null,  // 프로필 사진 추가
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

  // 프로필 사진 파일 변경 처리
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);  // 파일 URL 생성
    setUserInfo((prevState) => ({
      ...prevState,
      profileImage: imageUrl,  // 이미지 URL 상태에 저장
    }));
  };

  // 정보 수정 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 서버로 데이터를 보내는 로직을 추가할 수 있습니다.
    console.log('수정된 정보:', userInfo);
    alert('정보가 수정되었습니다.');
    navigate('/my/group'); // 수정 후 마이페이지로 리다이렉트
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
        <Typography variant="body1" className="general-form-label">이름 <span style={{ color: 'red' }}>*</span></Typography>
        
          <TextField
            label="이름"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
        </div>

        <div className="general-form-row">
        <Typography variant="body1" className="general-form-label">닉네임 <span style={{ color: 'red' }}>*</span></Typography>
        
          <TextField
            label="닉네임"
            name="nickname"
            value={userInfo.nickname}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
        </div>

        <div className="general-form-row">
        <Typography variant="body1" className="general-form-label">이메일</Typography>
        
        <Typography variant="body2" className="general-form-id">
          {userEmail}
        </Typography>
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
      <Typography variant="body1" className="general-form-label categoryName">카테고리</Typography>
      
      <FormControl className="general-form-input category">
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

      
      <div className="general-form-row">
        <Typography variant="body1" className="general-form-label">프로필 사진</Typography>
        
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: '10px' }}
          />
          {userInfo.profileImage && (
            <Box style={{ marginTop: '10px' }}>
              <img
                src={userInfo.profileImage}
                alt="프로필 사진 미리보기"
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </Box>
          )}
        </div>

        <Button type="submit" variant="contained" color="primary" className="button-general">
          수정 완료
        </Button>
      </form>
    </div>
  );
}

export default InfoModify;
