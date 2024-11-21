import React, { useState } from "react";
import {
  IconButton,
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import "../../assets/styles/General.css";
import "../../assets/styles/Member.css";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import axiosInstance from '../../API/axiosInstance'; // axiosInstance import
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [certiNum, setVerification] = useState("");
  const [verificationError, setVerificationError] = useState("");

  const [name, setName] = useState("");
  const [nickname, setNickName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [emailError, setEmailError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const [profilePicture, setProfilePicture] = useState(null); // 프로필 사진 상태 추가

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const navigate = useNavigate();

  //인증체크용 변수들
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // conflict 예상1 : 아래 두줄은 그냥 사용하면됩니다.
  const [showNewPassword, setShowNewPassword] = useState(false); // 새 비밀번호 보이기 상태
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 확인 보이기 상태

  //초기 인증전 설정
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleSubmit = () => {
    if (
      !username ||
      !password ||
      !confirmPassword ||
      !name ||
      !nickname ||
      !email
    ) {
      setDialogMessage("모든 필드를 입력해주세요.");
      setOpenDialog(true);
      return;
    }

    if (password !== confirmPassword) {
      setDialogMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      setOpenDialog(true);
      return;
    }

    if (phone.length > 0 && phone.length <= 6) {
      setDialogMessage("전화번호가 너무 짧습니다.");
      setOpenDialog(true);
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      return;
    } else {
      setEmailError("");
    }

    setDialogMessage("회원가입이 완료되었습니다!");
    setOpenDialog(true);
    navigate("/member/login");

    if (!isFormValid) {
      setDialogMessage("모든 인증과정을 거쳐야 합니다.");
      setOpenDialog(true);
      return;
    }

    // 회원가입 클릭시 제출될 데이터
    const data = {
      id: username,
      password: password,
      name: name,
      nickname: nickname,
      phoneNumber: phone || "", // 비어있을 경우 빈 값
      email: email,
      favCategoryId: category || 900, // 선택하지 않았을 경우 0
      profileUrl: profilePicture ? profilePicture : "default url", // 프로필 사진이 있으면 해당 사진을, 없으면 디폴트 URL로 설정
    };

    //회원가입 버튼 axios 추가
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "register/register-confirm",
        data
      )
      .then((response) => {
        if (response.status === 200) {
          alert("회원가입이 완료되었습니다!");
        } else {
          setDialogMessage("회원가입 중 문제가 발생했습니다.");
        }
        setOpenDialog(true);
      })
      .catch((error) => {
        setDialogMessage("회원가입 요청 중 오류가 발생했습니다.");
        setOpenDialog(true);
        console.error("회원가입 오류:", error);
      });
  };

  const handleUsernameCheck = () => {
    if (!username) {
      setDialogMessage("아이디를 입력해주세요.");
      setOpenDialog(true);
      return;
    }

    // axiosInstance를 사용한 아이디 중복확인 API 호출
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "register/id-check",
        {
          id: username,
        },
        {
          withCredentials: true, // 이 옵션을 설정하여 쿠키와 인증 정보를 함께 보냄
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setIsUsernameAvailable(true);
          setDialogMessage("사용 가능한 아이디입니다.");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setDialogMessage("이미 사용 중인 아이디입니다.");
        } else {
          setDialogMessage("서버에 문제가 발생했습니다.");
        }
      })
      .finally(() => {
        setOpenDialog(true);

        const handleUsernameCheck = () => {
          if (!username) {
            setDialogMessage("아이디를 입력해주세요.");
            setOpenDialog(true);
            return;
          }

          // axiosInstance를 사용한 아이디 중복확인 API 호출
          axios
            .post(
              process.env.REACT_APP_API_BASE_URL + "register/id-check",
              {
                id: username,
              },
              {
                withCredentials: true, // 이 옵션을 설정하여 쿠키와 인증 정보를 함께 보냄
              }
            )
            .then((response) => {
              if (response.status === 200) {
                setIsUsernameAvailable(true);
                setDialogMessage("사용 가능한 아이디입니다.");
              }
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                setDialogMessage("이미 사용 중인 아이디입니다.");
              } else {
                setDialogMessage("서버에 문제가 발생했습니다.");
              }
            })
            .finally(() => {
              setOpenDialog(true);
            });
          // 아이디 중복확인 후 전체 폼의 유효성 확인
          setIsFormValid(
            username &&
              nickname &&
              email &&
              certiNum &&
              verificationError === ""
          );
        };
      });
  };

  // 닉네임 중복확인
  const handleNicknameCheck = () => {
    if (!nickname) {
      setDialogMessage("닉네임을 입력해주세요.");
      setOpenDialog(true);
      return;
    }

    // axiosInstance를 사용한 닉네임 중복확인 API 호출
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "register/nickname-check",
        {
          nickname,
        },
        {
          withCredentials: true, // 이 옵션을 설정하여 쿠키와 인증 정보를 함께 보냄
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setIsNicknameAvailable(true);
          setDialogMessage("사용 가능한 닉네임입니다.");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setDialogMessage("이미 사용 중인 닉네임입니다.");
        } else {
          setDialogMessage("서버에 문제가 발생했습니다.");
        }
      })
      .finally(() => {
        setOpenDialog(true);
        setIsFormValid(
          username && nickname && email && certiNum && verificationError === ""
        );
      });
  };

  // 이메일 인증번호 발송
  const handleEmailVerification = () => {
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      return;
    }

    // 서버로 이메일 인증번호 발송 요청
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "register/send-code",
        { email },
        {
          withCredentials: true, // 이 옵션을 설정하여 쿠키와 인증 정보를 함께 보냄
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setDialogMessage("인증번호가 발송되었습니다.");
        } else {
          setDialogMessage("인증번호 발송에 실패했습니다.");
        }
      })
      .catch((error) => {
        //! 되살려야하는 부분
        console.error("인증번호 발송 실패:", error); // 에러 로그 추가
        setDialogMessage("인증번호 발송에 실패했습니다.");
      })
      .finally(() => {
        setOpenDialog(true);
      });
  };

  // 인증번호 확인
  const handleVerifyCode = () => {
    if (!certiNum) {
      setVerificationError("인증번호를 입력해주세요.");
      return;
    }

    // 인증번호 확인 요청
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "register/certi-check",
        { certiNum },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // 인증 성공
          setDialogMessage("인증이 완료되었습니다.");
          setVerificationError(""); // 오류 메시지 초기화
          setIsEmailVerified(true); // 인증 상태 업데이트
          setOpenDialog(true); // 다이얼로그 열기
          // 인증 완료 후 폼 유효성 체크
          setIsFormValid(
            username &&
              nickname &&
              email &&
              certiNum &&
              verificationError === "" &&
              isUsernameAvailable && // 아이디 중복 확인 상태 유지
              isNicknameAvailable // 닉네임 중복 확인 상태 유지
          );
        }
      })
      .catch((error) => {
        setVerificationError("인증번호가 잘못되었습니다."); // 오류 메시지 설정
        setDialogMessage("인증번호 확인에 실패했습니다.");
        setOpenDialog(true); // 다이얼로그 열기
      });
  };

  // 프로필 사진 업로드 핸들러
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file)); // 파일을 미리보기로 설정
    }
  };

  return (
    <Box className="form-container">
      <Typography variant="h5" component="h1" className="form-title">
        회원가입
      </Typography>

      {/* 아이디 입력과 "중복확인" 버튼 */}
      <Box className="general-form-row">
        {/* <Typography variant="body1" className="general-form-label">
          아이디<span style={{ color: "red" }}>*</span>
        </Typography> */}

        <Typography
          variant="body1"
          className="general-form-label registerTopMargin"
        >
          아이디<span style={{ color: "red" }}>*</span>
        </Typography>

        <TextField
          variant="outlined"
          label={<span>아이디를 입력해주세요 </span>}
          fullWidth
          margin="normal"
          className="general-form-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          variant="outlined"
          className="register-button-general-click"
          onClick={handleUsernameCheck} // 중복확인 버튼 클릭 시 호출되는 함수
        >
          중복확인
        </Button>
      </Box>

      <Box className="general-form-row">
        {/* 비밀번호 입력 */}
        <Typography
          variant="body1"
          className="general-form-label registerTopMargin"
        >
          비밀번호<span style={{ color: "red" }}>*</span>
        </Typography>

        {/* // conflict 예상2 : 비밀번호의 type을 텍스트-비밀번호 변동으로 바꾸고 InputProps로 버튼생성. */}
        <TextField
          variant="outlined"
          type={showNewPassword ? "text" : "password"} // 비밀번호 보이기/숨기기
          label={<span>비밀번호를 입력해주세요 </span>}
          fullWidth
          className="general-form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <Typography
          variant="body1"
          className="general-form-label registerTopMargin"
        >
          비밀번호 확인<span style={{ color: "red" }}>*</span>
        </Typography>
        {/* // conflict 예상3 : 비밀번호의 type을 텍스트-비밀번호 변동으로 바꾸고 InputProps로 버튼생성. */}
        <TextField
          variant="outlined"
          label={<span>비밀번호 확인 </span>}
          type={showConfirmPassword ? "text" : "password"} // 비밀번호 보이기/숨기기
          fullWidth
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

      {/* 이름 입력과 "중복확인" 버튼 */}
      <Box className="general-form-row">
        <Typography
          variant="body1"
          className="general-form-label registerTopMargin"
        >
          이름<span style={{ color: "red" }}>*</span>
        </Typography>

        <TextField
          variant="outlined"
          label={<span>이름을 입력해주세요 </span>}
          fullWidth
          className="general-form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>

      {/* 닉네임 입력과 "중복확인" 버튼 */}
      <Box className="general-form-row">
        <Typography
          variant="body1"
          className="general-form-label registerTopMargin"
        >
          닉네임<span style={{ color: "red" }}>*</span>
        </Typography>

        <TextField
          variant="outlined"
          label={<span>닉네임을 입력해주세요 </span>}
          fullWidth
          className="general-form-input"
          value={nickname}
          onChange={(e) => setNickName(e.target.value)}
        />
        <Button
          variant="outlined"
          className="regist-marginTop-button-general-click"
          onClick={handleNicknameCheck} // 닉네임 중복확인 버튼 클릭 시 호출되는 함수
        >
          중복확인
        </Button>
      </Box>

      {/* 이메일 입력과 "중복확인" 버튼 */}

      <Box className="general-form-row">
        <Typography
          variant="body1"
          className="general-form-label registerTopMargin"
        >
          이메일<span style={{ color: "red" }}>*</span>
        </Typography>

        <TextField
          variant="outlined"
          label={<span>이메일을 입력해주세요.</span>}
          type="email"
          fullWidth
          className="general-form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />
        <Button
          variant="outlined"
          className="regist-marginTop-button-general-click"
          onClick={handleEmailVerification} // 인증번호 발송 버튼 클릭 시 호출되는 함수
        >
          인증번호 발송
        </Button>
      </Box>

      {/* 인증번호 입력과 "인증" 버튼 */}

      <Box className="general-form-row">
        <Typography
          variant="body1"
          className="general-form-label registerTopMargin"
        >
          인증번호<span style={{ color: "red" }}>*</span>
        </Typography>

        <TextField
          variant="outlined"
          label={<span>인증 번호를 입력해 주세요 </span>}
          type="String"
          fullWidth
          className="general-form-input"
          value={certiNum}
          onChange={(e) => setVerification(e.target.value)}
          error={!!verificationError}
          helperText={verificationError}
        />
        <Button
          variant="outlined"
          className="regist-marginTop-button-general-click"
          onClick={handleVerifyCode} // 인증번호 확인 요청
        >
          인증
        </Button>
      </Box>

      {/* 휴대폰 번호 입력 */}
      <Box className="general-form-row">
        <Typography
          variant="body1"
          className="general-form-label registerTopMargin"
        >
          휴대폰 번호
        </Typography>

        <TextField
          variant="outlined"
          label="휴대폰 번호를 입력해주세요"
          fullWidth
          className="general-form-input"
          value={phone}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            setPhone(value);
          }}
        />
      </Box>

      {/* 관심 카테고리 선택 */}
      <Box className="general-form-row">
        <Typography
          variant="body1"
          className="general-form-label registerTopMargin"
        >
          카테고리
        </Typography>

        <FormControl fullWidth className="general-form-input">
          <InputLabel id="category-label">관심 카테고리</InputLabel>
          <Select
            labelId="category-label"
            value={category || 900} // 선택하지 않았을 경우 900을 기본값으로 설정
            onChange={(e) => setCategory(Number(e.target.value))} // 선택된 값을 숫자로 변환
          >
            <MenuItem value={100}>스터디</MenuItem>
            <MenuItem value={200}>스포츠</MenuItem>
            <MenuItem value={300}>음식</MenuItem>
            <MenuItem value={400}>기타</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 프로필 사진 업로드 
      <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label ">
          프로필 사진
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: "none" }}
          id="profile-pic-upload"
        />
         사진 업로드 버튼 css
        <label
          htmlFor="profile-pic-upload"
          style={{
            display: "block", // block으로 설정하여 여유 공간 확보
            textAlign: "center", // 중앙 정렬
            margin: "10px 0", // 상하 여백
          }}
        >
          <Button
            variant="outlined"
            component="span"
            sx={{
              color: "#555", // 버튼 텍스트 색상
              borderColor: "#000", // 버튼 테두리 색상
              fontWeight: "bold", // 굵은 텍스트
              padding: "10px 20px", // 여유 있는 버튼 크기
              borderRadius: "10px",
              ":hover": {
                // 호버 효과
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            사진 업로드
          </Button>
        </label>
        {profilePicture && (
          <Box mt={2}>
            <img
              src={profilePicture}
              alt="Profile Preview"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </Box>
        )} 
      </Box>*/}

      {/* 회원가입 버튼 */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className="button-general"
        // disabled={!isFormValid} // 조건이 만족될 때만 활성화 -> 클릭불가되버림. 클릭은되되 워닝뜨게 변경
        style={{ marginTop: "16px" }}
      >
        회원가입
      </Button>

      {/* Dialog for displaying messages */}
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
