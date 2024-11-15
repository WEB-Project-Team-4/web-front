// src/pages/member/Resign.js
import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/My.css';
import '../../assets/styles/General.css'; // 스타일 적용

function Resign() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // 탈퇴 확인 다이얼로그 상태
  const navigate = useNavigate();

  const handleResign = () => {
    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    // 여기에 비밀번호 확인 로직을 추가
    if (password === 'test') {
      setError('');
      setIsPasswordValid(true);  // 비밀번호가 올바르면 탈퇴 확인 다이얼로그 띄우기
      setOpenDialog(true);  // 다이얼로그 열기
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleDialogClose = (confirm) => {
    if (confirm) {
      // 여기서 탈퇴 처리 로직을 넣을 수 있습니다.
      setTimeout(() => {
        alert('회원탈퇴가 완료되었습니다.');
        navigate('/member/login'); // 탈퇴 후 로그인 페이지로 이동
      }, 1500);
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
              type="password"
              placeholder="비밀번호를 입력해주세요"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="general-form-input"
            />

            {/* 에러 메시지 */}
            {error && (
              <Typography color="error" variant="body2" className="error-message">
                {error}
              </Typography>
            )}
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
            onClick={() => navigate('http://localhost:3000/my/group')}
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
