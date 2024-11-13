import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Dialog, DialogActions, DialogContent, DialogTitle, Divider, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import '../../assets/styles/General.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [emailError, setEmailError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleSubmit = () => {
    if (!username || !password || !confirmPassword || !email || !name ) {
      setDialogMessage('모든 필드를 입력해주세요.');
      setOpenDialog(true);
      return;
    }

    if (password !== confirmPassword) {
      setDialogMessage('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      setOpenDialog(true);
      return;
    }

    // 휴대폰 번호가 10자리가 아닐 경우 제출 막기
    if (phone.length >0 & phone.length <= 10) {
        setDialogMessage('휴대폰 번호는 10자리가 되어야 합니다.');
        setOpenDialog(true);
        return;
    }

    if (!emailRegex.test(email)) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
      return;
    } else {
      setEmailError('');
    }

    setDialogMessage('회원가입이 완료되었습니다!');
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box className="form-container">
      <Typography variant="h4" component="h1" className="form-title">
        회원가입
      </Typography>
      
      {/* Display *필수입력항목 at top-right */}
      <Typography 
        variant="body2" 
        color="textSecondary" 
        
        // style={{ position: 'absolute', top: 10, right: 10 }}    //일단 주석처리
      >
        <span style={{ color: 'red' }}>*</span>필수입력항목
      </Typography>

      {/* Input fields with asterisk */}
      <TextField
        variant="outlined"
        label={<span>아이디를 입력해주세요 <span style={{ color: 'red' }}>*</span></span>}
        fullWidth
        margin="normal"
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        variant="outlined"
        label={<span>비밀번호를 입력해주세요 <span style={{ color: 'red' }}>*</span></span>}
        type="password"
        fullWidth
        margin="normal"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextField
        variant="outlined"
        label={<span>비밀번호 확인 <span style={{ color: 'red' }}>*</span></span>}
        type="password"
        fullWidth
        margin="normal"
        className="form-input"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <TextField
        variant="outlined"
        label={<span>이메일을 입력해주세요 <span style={{ color: 'red' }}>*</span></span>}
        type="email"
        fullWidth
        margin="normal"
        className="form-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!emailError}
        helperText={emailError}
      />

      <TextField
        variant="outlined"
        label={<span>이름을 입력해주세요 <span style={{ color: 'red' }}>*</span></span>}
        fullWidth
        margin="normal"
        className="form-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        variant="outlined"
        label="휴대폰 번호를 입력해주세요"
        fullWidth
        margin="normal"
        className="form-input"
        value={phone}
        onChange={(e) => {
          // 입력값이 숫자일 경우만 상태 업데이트
          const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기고 나머지 제거
          setPhone(value);
        }}
      />

      <FormControl fullWidth margin="normal" style={{ maxWidth: '400px' }}>
        <InputLabel id="category-label">관심 카테고리</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={category}
          label="관심 카테고리"
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="sports">스터디</MenuItem>
          <MenuItem value="music">스포츠</MenuItem>
          <MenuItem value="tech">음식</MenuItem>
          <MenuItem value="art">기타</MenuItem>
        </Select>
      </FormControl>

      <Box className="link-box">
        <Link href="/member/login" underline="hover" className="link-text">
          이미 계정이 있으신가요? 로그인
        </Link>
      </Box>

      <Button variant="contained" color="primary" fullWidth className="button button-login" onClick={handleSubmit}>
        회원가입
      </Button>

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        className="button button-register"
        onClick={() => window.location.href = '/member/login'}
      >
        로그인 페이지로 돌아가기
      </Button>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>알림</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Register;
