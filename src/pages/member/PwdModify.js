import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios"; // axios 추가
import "../../assets/styles/Member.css";
import "../../assets/styles/General.css";
import { useNavigate } from "react-router-dom";

function PasswordChange() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false); // 새 비밀번호 보이기 상태
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 확인 보이기 상태

  const token = localStorage.getItem("token"); // localStorage에서 토큰 가져오기
  const navigate = useNavigate();

  // 비밀번호 변경 처리
  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      // 비밀번호 변경 요청
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "member/pwd-reset", // 백엔드 URL
        {
          id: localStorage.getItem("id"),
          password: newPassword,
        } // 새 비밀번호 전송
        // {
        //   headers: {
        //     Authorization: `${token}`, // Authorization 헤더에 토큰 포함
        //   },
        // }
      );

      if (response.status === 200) {
        // 비밀번호 변경 완료 시 알림 및 페이지 이동
        alert("비밀번호가 변경되었습니다!");
        window.location.href = "/member/login"; // 로그인 페이지로 이동
      } else {
        alert("비밀번호 변경에 실패했습니다");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
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
          type={showNewPassword ? "text" : "password"} // 비밀번호 보이기/숨기기
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
        <Typography variant="body1" className="general-form-label">
          비밀번호 확인
        </Typography>
        <TextField
          variant="outlined"
          type={showConfirmPassword ? "text" : "password"} // 비밀번호 보이기/숨기기
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

      {/* 비밀번호 일치 여부 체크 */}
      {newPassword !== confirmPassword && confirmPassword && (
        <Typography color="error" variant="body2" className="error-message">
          비밀번호 확인과 일치하지 않습니다.
        </Typography>
      )}

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
        비밀번호 변경하기
      </Button>
    </Box>
  );
}

export default PasswordChange;
