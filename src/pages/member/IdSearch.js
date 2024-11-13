// src/pages/member/IdSearch.js
import React from 'react';
import { Box, TextField, Button, Typography, Link, MenuItem, Select, InputAdornment } from '@mui/material';
import '../../assets/styles/Member.css';

function IdSearch() {
  const [emailDomain, setEmailDomain] = React.useState('');

  const handleDomainChange = (event) => {
    setEmailDomain(event.target.value);
  };

  return (
    <Box className="form-container">
      <Typography variant="h5" component="h1" className="form-title">
        아이디 찾기
      </Typography>

      <TextField
        variant="outlined"
        label="이름을 입력해주세요"
        fullWidth
        margin="normal"
        className="form-input"
      />

      <TextField
        variant="outlined"
        label="이메일을 입력해주세요"
        fullWidth
        margin="normal"
        className="form-input"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <span>@</span>
              <Select
                value={emailDomain}
                onChange={handleDomainChange}
                displayEmpty
                className="email-select"
                inputProps={{ 'aria-label': '이메일 도메인 선택' }}
              >
                <MenuItem value="">직접 입력</MenuItem>
                <MenuItem value="gmail.com">gmail.com</MenuItem>
                <MenuItem value="naver.com">naver.com</MenuItem>
                <MenuItem value="daum.net">daum.net</MenuItem>
              </Select>
            </InputAdornment>
          ),
        }}
      />

      <Button variant="contained" fullWidth className="button button-id-search">
        아이디 찾기
      </Button>

      <Box className="link-container">
        <Link href="/member/register" underline="hover" className="link-text">
          회원가입하기
        </Link>
        <span className="divider">|</span>
        <Link href="/member/login" underline="hover" className="link-text">
          로그인하기
        </Link>
      </Box>
    </Box>
  );
}

export default IdSearch;
