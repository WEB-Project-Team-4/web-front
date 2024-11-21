import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import axios from 'axios';
import '../../assets/styles/Member.css';

function PasswordReset() {
  const [id, setId] = useState('');
  const [emailLocal, setEmailLocal] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  // 이메일 도메인 변경 처리
  const handleDomainChange = (event) => {
    setEmailDomain(event.target.value);
  };

  // 인증번호 받기 처리
  const handleSendVerificationCode = async () => {
    const email = `${emailLocal}${emailDomain}`;

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + 'member/send-code',
        {
          id: id,
          email: email,
        }
      );

      // 성공 응답 처리
      if (response.status === 200) {
        setDialogTitle('성공');
        setDialogMessage('인증되었습니다.');
        window.location.href = '/member/pwd-modify';
      } else {
        setDialogTitle('오류');
        setDialogMessage('인증에 실패했습니다 : 아이디와 이메일을 확인해주세요.');
      }
    } catch (error) {
      console.error('인증 실패:', error);
      setDialogTitle('오류');
      setDialogMessage('인증에 실패했습니다 : 아이디와 이메일을 확인해주세요.');
    }

    setDialogOpen(true);
  };

  // // 인증번호 확인 처리
  // const handleVerifyCode = () => {
  //     axios.post(
  //       process.env.REACT_APP_API_BASE_URL + 'member/code-confirm',
  //       // {"code" : verificationCode},
  //       { verificationCode},
  //         {
  //           withCredentials: true,
  //         }
  //     )

  //     // 성공 응답 처리
  //     .then((response) => {
  //     if (response.status === 200) {
  //       handlePasswordModifyRedirect(); // 비밀번호 변경 페이지로 이동
  //     } else {
  //       setDialogTitle('오류');
  //       setDialogMessage('인증번호가 틀렸습니다.');
  //       setDialogOpen(true);
  //     }
  //   })
  //    .catch((error)=> {
  //     console.error('인증번호 확인 실패:', error);
  //     setDialogTitle('오류');
  //     setDialogMessage('인증번호가 틀렸습니다.');
  //     setDialogOpen(true);
  //   });
  // };

  // 다이얼로그 닫기
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // 비밀번호 변경 페이지로 리다이렉트
  // const handlePasswordModifyRedirect = () => {
  //   window.location.href = '/member/pwd-modify';
  // };

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
          value={id}
          onChange={(e) => setId(e.target.value)}
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
          value={emailLocal}
          onChange={(e) => setEmailLocal(e.target.value)}
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
        <Button
          variant="outlined"
          className="button-general-click"
          onClick={handleSendVerificationCode}
        >
          인증
        </Button>
      </Box>

      {/* 인증번호 입력과 "인증하기" 버튼 */}
      {/* <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label">인증번호</Typography>
        <TextField
          variant="outlined"
          placeholder="인증번호를 입력해주세요"
          fullWidth
          margin="normal"
          className="general-form-input"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <Button
          variant="outlined"
          className="button-general-click"
          onClick={handleVerifyCode}
        >
          인증하기
        </Button>
      </Box> */}

      {/* 다이얼로그 창 */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default PasswordReset;
