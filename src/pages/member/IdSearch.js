// src/pages/member/IdSearch.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, MenuItem, Select, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Member.css';
import '../../assets/styles/General.css'; // 스타일 적용


function IdSearch() {
  const [emailDomain, setEmailDomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [idResult, setIdResult] = useState(null);
  const navigate = useNavigate(); 

  const handleDomainChange = (event) => {
    setEmailDomain(event.target.value);
    setCustomDomain(''); // 도메인 변경 시 customDomain 초기화
  };

  const handleCustomDomainChange = (event) => {
    setCustomDomain(event.target.value);
  };

  const handleSearch = () => {
    const existingId = "dajuil"; // 예시로 존재하는 아이디를 가정
    const userEnteredName = "userInputName"; // 실제 유저가 입력한 이름
    
    setIdResult(userEnteredName === existingId ? existingId : null);
    setDialogOpen(true); // 결과에 따라 Dialog 열기
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleLoginRedirect = () => {
    navigate('/member/login'); // 로그인 페이지로 이동
  };

  const handlePasswordResetRedirect = () => {
    navigate('/member/pwd-search'); // 비밀번호 찾기 페이지로 이동
  };

  return (
    <Box className="form-container">
      <Typography variant="h5" component="h1" className="form-title">
        아이디 찾기
      </Typography>

      {/* 이름 입력 */}
      <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label"></Typography>
        <TextField
          variant="outlined"
          placeholder="이름을 입력해주세요"
          fullWidth
          margin="normal"
          className="general-form-input"
        />
      </Box>

      {/* 이메일 입력과 "직접 입력" 옵션 */}
      <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label"></Typography>
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
                  <MenuItem value="@daum.net">@daum.net</MenuItem>
                </Select>
              </InputAdornment>
            ),
          }}
        />
      </Box>


      {/* 회원가입 및 로그인 링크 */}
      <Box className="link-box">
        <Link href="/member/register" underline="hover" className="link-text">
          회원가입하기
        </Link>

        <Divider orientation="vertical" flexItem className="divider" />

        <Link href="/member/login" underline="hover" className="link-text">
          로그인하기
        </Link>
      </Box>
      {/* 아이디 찾기 버튼 */}
      <Button variant="contained" fullWidth className="button-general" onClick={handleSearch}>
        아이디 찾기
      </Button>

      {/* 결과 Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} classes={{ paper: 'MuiDialog-paper' }}>
      <DialogTitle align="center" className="dialog-title">
          회원님의 아이디를 확인해 주세요
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" align="center" sx={{ marginTop: 2, fontWeight: 'bold' }}>
            {idResult ? idResult : "아이디가 존재하지 않습니다."}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
          <Button variant="outlined" onClick={handleLoginRedirect} className="button-dialog secondary">
            로그인 하기
          </Button>
          <Button variant="contained" onClick={handlePasswordResetRedirect} className="button-dialog primary">
            비밀번호 찾기
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default IdSearch;
