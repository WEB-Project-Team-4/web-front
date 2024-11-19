import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../../assets/styles/Member.css';
import '../../assets/styles/General.css';

function PasswordChange() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);  // 새 비밀번호 보이기 상태
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // 비밀번호 확인 보이기 상태
  
  const userId = "sampleUser123";

  const handlePasswordChange = () => {
    if (!newPassword || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    setError('');
    alert('비밀번호가 변경되었습니다!');
    window.location.href = '/member/login'; // 로그인 페이지로 이동
  };

  return (
    <Box className="form-container">
      <Typography variant="h5" component="h1" className="general-form-title">
        비밀번호 변경
      </Typography>

      {/* 아이디 표시 */}
      <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label">아이디</Typography>
        <Typography variant="body2" className="general-form-id">
          {userId}
        </Typography>
      </Box>

      {/* 새 비밀번호 입력 */}
      <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label">새 비밀번호</Typography>
        <TextField
          variant="outlined"
          type={showNewPassword ? "text" : "password"}  // 비밀번호 보이기/숨기기
          placeholder="새 비밀번호를 입력해주세요"
          fullWidth
          margin="normal"
          className="general-form-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowNewPassword(!showNewPassword)}
                edge="end"
                sx={{
                  marginRight: -40,
                }}
              >
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
      </Box>

      {/* 비밀번호 확인 입력 */}
      <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label">비밀번호 확인</Typography>
        <TextField
          variant="outlined"
          type={showConfirmPassword ? "text" : "password"}  // 비밀번호 보이기/숨기기
          placeholder="비밀번호를 다시 입력해주세요"
          fullWidth
          margin="normal"
          className="general-form-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
                sx={{
                  marginRight: -40,
                }}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
      </Box>

      {/* 에러 메시지 */}
      {error && (
        <Typography color="error" variant="body2" className="error-message">
          {error}
        </Typography>
      )}

      {/* 비밀번호 변경 버튼 */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="button-general"
        onClick={handlePasswordChange}
      >
        수정하기
      </Button>
    </Box>
  );
}

export default PasswordChange;
