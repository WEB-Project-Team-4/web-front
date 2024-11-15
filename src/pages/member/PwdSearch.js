// src/pages/member/PasswordReset.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Select, InputAdornment } from '@mui/material';
import '../../assets/styles/Member.css';

function PasswordReset() {
  const [emailDomain, setEmailDomain] = useState('');

  const handleDomainChange = (event) => {
    setEmailDomain(event.target.value);
  };

  const handlePasswordModifyRedirect = () => {
    window.location.href = '/member/pwd-modify';
  };

//   만들어야 할 요소 : 회원가입 누를경우 회원가입 후 로그인으로 이동
  const handleRegisterRedirect = () => {
    window.location.href = '/member/login';
  };

  return (
    <Box className="form-container">
      <Typography variant="h5" component="h1" className="general-form-title">
        본인 인증
      </Typography>

      {/* 아이디 입력 */}
      <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label">아이디</Typography>
        <TextField
          variant="outlined"
          placeholder="아이디를 입력해주세요"
          fullWidth
          margin="normal"
          className="general-form-input"
        />
      </Box>

      {/* 이메일 입력과 "인증번호 받기" 버튼 */}
      <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label">이메일</Typography>
        <TextField
          variant="outlined"
          placeholder="이메일을 입력해주세요"
          fullWidth
          margin="normal"
          className="general-form-input"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Select
                  value={emailDomain}
                  onChange={handleDomainChange}
                  displayEmpty
                  className="email-select"
                  inputProps={{ 'aria-label': '이메일 도메인 선택' }}
                >
                  <MenuItem value="">직접 입력</MenuItem>
                  <MenuItem value="@gmail.com">@gmail.com</MenuItem>
                  <MenuItem value="@naver.com">@naver.com</MenuItem>
                  <MenuItem value="@daum.net">daum.net</MenuItem>
                </Select>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          className="button-general-click"
        >
          인증번호 받기
        </Button>
      </Box>

      {/* 인증번호 입력과 "인증하기" 버튼 */}
      <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label">인증번호</Typography>
        <TextField
          variant="outlined"
          placeholder="인증번호를 입력해주세요"
          fullWidth
          margin="normal"
          className="general-form-input"
        />
        <Button
          variant="outlined"
          className="button-general-click"
        >
          인증하기
        </Button>
      </Box>

      {/* 비밀번호 변경 버튼 */}


    
      <Button
        variant="outlined"
        // fullWidth
        className="button-general"
        onClick={handlePasswordModifyRedirect}
      >
        비밀번호 변경하기
      </Button>

    </Box>
  );
}

export default PasswordReset;
