import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import axios from "axios"; // axios 추가
import "../../assets/styles/My.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PwdModify() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
  const [error, setError] = useState(""); // 에러 메시지
  const [successMessage, setSuccessMessage] = useState(""); // 성공 메시지

  const token = localStorage.getItem("token"); // localStorage에서 토큰 가져오기

  // 비밀번호 변경 처리
  const handlePasswordChange = async () => {
    // 비밀번호 필드 값 검증
    if (!newPassword || !confirmPassword) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    // 새 비밀번호와 확인 비밀번호가 일치하는지 확인
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      // axios로 비밀번호 변경 요청
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "my/pwd-modify", // 백엔드 URL
        { password: newPassword }, // 새 비밀번호 전송
        {
          headers: {
            Authorization: `${token}`, // Authorization 헤더에 토큰 포함
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("비밀번호가 성공적으로 변경되었습니다!");
        localStorage.removeItem("token");
        window.location.href = "/member/login";
        alert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요!");
        setError(""); // 에러 메시지 초기화
      }
    } catch (error) {
      console.error(error);
      setError("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
      setSuccessMessage(""); // 성공 메시지 초기화
    }
  };

  // 로그인 페이지로 리디렉션
  const handleLoginRedirect = () => {
    window.location.href = "/member/login"; // 로그인 페이지로 이동
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <Box className="form-container">
      <Typography variant="h5" component="h1" className="general-form-title">
        비밀번호 변경
      </Typography>

      {/* 새 비밀번호 입력 */}
      <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label">
          새 비밀번호
        </Typography>
        <TextField
          variant="outlined"
          type={showPassword2 ? "text" : "password"} // 비밀번호 보이기/숨기기
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
                onClick={togglePasswordVisibility2}
                edge="end"
                // sx={{
                //   marginRight: -40,
                // }}
              >
                {showPassword2 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
      </Box>

      {/* 비밀번호 확인 입력 */}
      <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label">
          비밀번호 확인
        </Typography>
        <TextField
          variant="outlined"
          type={showPassword ? "text" : "password"} // 비밀번호 보이기/숨기기
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
                onClick={togglePasswordVisibility}
                edge="end"
                // sx={{
                //   marginRight: -40,
                // }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
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
        비밀번호 변경하기
      </Button>

      {/* 로그인 페이지로 이동 버튼 */}
      {/* <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={handleLoginRedirect}
        className="button-general2"
      >
        로그인 페이지로 가기
      </Button> */}
    </Box>
  );
}

export default PwdModify;
