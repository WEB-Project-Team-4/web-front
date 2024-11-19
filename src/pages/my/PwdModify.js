// src/pages/member/PwdModify.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import '../../assets/styles/My.css';

function PwdModify() {
  const [newPassword, setNewPassword] = useState(''); // 새 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인
  const [error, setError] = useState(''); // 에러 메시지
  const [successMessage, setSuccessMessage] = useState(''); // 성공 메시지
  
  // 비밀번호 변경 처리
  const handlePasswordChange = () => {
    // 비밀번호 필드 값 검증
    if ( !newPassword || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    // 새 비밀번호와 확인 비밀번호가 일치하는지 확인
    if (newPassword !== confirmPassword) {
      setError('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    // 비밀번호 변경 성공
    setError('');
    setSuccessMessage('비밀번호가 성공적으로 변경되었습니다!');
  };

  // 로그인 페이지로 리디렉션
  const handleLoginRedirect = () => {
    window.location.href = '/member/login'; // 로그인 페이지로 이동
  };

  return (
    <Box className="form-container">
      <Typography variant="h5" component="h1" className="general-form-title">
        비밀번호 변경
      </Typography>


      {/* 새 비밀번호 입력 */}
      <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label">새 비밀번호</Typography>
        <TextField
          variant="outlined"
          type="password"
          placeholder="새 비밀번호를 입력해주세요"
          fullWidth
          margin="normal"
          className="general-form-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Box>

      {/* 비밀번호 확인 입력 */}
      <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label">비밀번호 확인</Typography>
        <TextField
          variant="outlined"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          fullWidth
          margin="normal"
          className="general-form-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Box>

      {/* 에러 메시지 출력 */}
      {error && (
        <Typography color="error" variant="body2" className="error-message">
          {error}
        </Typography>
      )}

      {/* 성공 메시지 출력 */}
      {successMessage && (
        <Typography color="primary" variant="body2" className="success-message">
          {successMessage}
        </Typography>
      )}

      {/* 비밀번호 변경 버튼 */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="button-general pwdModify-topMargin"
        onClick={handlePasswordChange}
      >
        수정하기
      </Button>

      {/* 로그인 페이지로 이동 버튼 */}
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={handleLoginRedirect}
        className="button-general2"
      >
        로그인 페이지로 가기
      </Button>
    </Box>
  );
}

export default PwdModify;
