import React, { useState } from 'react';
import { Box, Button, Typography, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios'; // axios 추가
import '../../assets/styles/My.css';
import '../../assets/styles/General.css'; // 스타일 적용

function Resign() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이게 하는 상태 관리
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // 탈퇴 확인 다이얼로그 상태
  const navigate = useNavigate();

  // 로그인 상태 체크 (localStorage에서 토큰 확인)
  const token = localStorage.getItem('token');

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    alert('로그인 후 이용해 주세요.');
    navigate('/login');
    return null;
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleResign = async () => {
    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    try {
      // 서버에 비밀번호와 토큰을 보내서 인증 요청
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + 'my/pwd-check', // 백엔드 URL
        { password }, // 비밀번호를 JSON 형태로 전송
        {
          headers: {
            Authorization: `${token}`, // Authorization 헤더에 토큰 포함
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setError('');
        setIsPasswordValid(true); // 비밀번호가 올바르면 탈퇴 확인 다이얼로그 띄우기
        setOpenDialog(true); // 다이얼로그 열기
      }
    } catch (error) {
      console.error(error);
      setError('비밀번호가 올바르지 않습니다. 다시 시도해주세요.');
    }
  };

  const handleDialogClose = async (confirm) => {
    if (confirm) {
      try {
        // axios로 탈퇴 요청 보내기
        const response = await axios.get(
          process.env.REACT_APP_API_BASE_URL + 'my/resign', // 탈퇴 URL
          {
            headers: {
              Authorization: `${token}`, // Authorization 헤더에 토큰 포함
            },
            withCredentials: true, // 크로스 도메인 인증을 위한 옵션
          }
        );

        if (response.status === 200) {
          // 탈퇴 성공 처리
          localStorage.removeItem('token'); // 토큰 삭제
          alert('모인은 당신이 되돌아오길 손꼽아 기다리겠습니다...');
          navigate('/member/login'); // 탈퇴 후 로그인 페이지로 이동
        }
      } catch (error) {
        console.error(error);
        alert('탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
    setOpenDialog(false); // 다이얼로그 닫기
  };

  return (
    <Box className="my-form-container">
      <Typography variant="h5" component="h1" className="general-form-title">
        회원탈퇴
      </Typography>
      {!isPasswordValid ? (
        <>
          <Box className="my-form-row">
            <Typography variant="body1" className="general-form-label">
              비밀번호
            </Typography>
            <TextField
              variant="outlined"
              type={showPassword ? "text" : "password"} // 비밀번호 보이게 설정
              placeholder="비밀번호를 입력해주세요"
              fullWidth
              margin="normal"
              value={password}
              onChange={handlePasswordChange}
              className="general-form-input"
              error={!!error}
              helperText={error}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </Box>
          {/* 회원탈퇴 버튼 */}
          <Button
            color="secondary"
            fullWidth
            onClick={handleResign}
            className="button-general"
          >
            탈퇴하기
          </Button>
        </>
      ) : (
        <Box>
          <Typography variant="body1" color="green">
            우리와 계속 함께하기로 하셨군요! 멋져요!
            <Box marginBottom={3} />
          </Typography>
          {/* 마이페이지로 되돌아가기 버튼 */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/my/group')}
            className="button-general"
          >
            마이페이지로 되돌아가기
          </Button>
        </Box>
      )}

      {/* 탈퇴 확인 다이얼로그 */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>회원탈퇴 확인</DialogTitle>
        <DialogContent>
          <Typography variant="body1">주의! <br></br>
          모든 계정정보가 삭제되고, 모임에서 탈퇴되며, 운영중인 모임이 삭제됩니다.
          정말로 회원탈퇴를 하시겠습니까?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            당당하고 화목하게 취소
          </Button>
          <Button
            onClick={() => handleDialogClose(true)}
            color="secondary"
            autoFocus
          >
            외롭고 쓸쓸하게 모인에서 탈퇴
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Resign;
