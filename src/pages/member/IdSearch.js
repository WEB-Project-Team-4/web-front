import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  MenuItem,
  Select,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Member.css';
import '../../assets/styles/General.css';

function IdSearch() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailLocal, setEmailLocal] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [useCustomEmail, setUseCustomEmail] = useState(true); // 이메일 입력 방식 선택 상태
  const [dialogOpen, setDialogOpen] = useState(false);
  const [idResult, setIdResult] = useState(null);
  const navigate = useNavigate();

  // 이메일 입력 방식 변경 (토글 스위치)
  const handleToggleEmailMode = () => {
    setUseCustomEmail(!useCustomEmail);
    setEmail(''); // 토글 시 이메일 초기화
    setEmailLocal('');
    setEmailDomain('');
  };

  // 이름 입력 처리
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // 이메일 입력 처리 (직접 입력 모드)
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // 이메일 로컬 부분 입력 처리 (선택 입력 모드)
  const handleEmailLocalChange = (event) => {
    setEmailLocal(event.target.value);
  };

  // 도메인 선택 처리 (선택 입력 모드)
  const handleDomainChange = (event) => {
    setEmailDomain(event.target.value);
  };

  // 아이디 찾기 처리
  const handleSearch = async () => {
    // 이메일 주소 생성 (직접 입력 또는 로컬+도메인 선택)
    const finalEmail = useCustomEmail ? email : `${emailLocal}${emailDomain}`;

    try {
      // 서버에 POST 요청 보내기
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + 'member/id-search',
        {
          name: name,
          email: finalEmail,
        }
      );

      // 응답이 성공적일 경우 결과 처리
      if (response.data && response.data.includes('Found id:')) {
        const foundId = response.data.split('Found id: ')[1];
        setIdResult(foundId);
      } else {
        setIdResult(null);
      }
    } catch (error) {
      console.error('아이디 찾기 요청 실패:', error);
      setIdResult(null);
    }

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
      <Box className="idSearch-form-row">
        <Typography variant="body1" className="general-form-label"></Typography>
        <TextField
          variant="outlined"
          placeholder="이름을 입력해주세요"
          fullWidth
          margin="normal"
          className="general-form-input"
          value={name}
          onChange={handleNameChange}
        />
      </Box>

      
      {/* 이메일 입력 */}
      {useCustomEmail ? (
        // 직접 이메일 입력 모드
        <Box className="idSearch-form-row">
          <TextField
            variant="outlined"
            placeholder="이메일을 입력해주세요"
            fullWidth
            margin="normal"
            className="general-form-input"
            value={email}
            onChange={handleEmailChange}
          />
        </Box>
      ) : (
        // 도메인 선택 입력 모드
        <Box className="idSearch-form-row">
          <TextField
            variant="outlined"
            placeholder="이메일 로컬 부분 입력"
            fullWidth
            margin="normal"
            className="general-form-input"
            value={emailLocal}
            onChange={handleEmailLocalChange}
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
                    <MenuItem value="">도메인 선택</MenuItem>
                    <MenuItem value="@gmail.com">@gmail.com</MenuItem>
                    <MenuItem value="@naver.com">@naver.com</MenuItem>
                    <MenuItem value="@daum.net">@daum.net</MenuItem>
                  </Select>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
      {/* 이메일 입력 방식 선택 (스위치) */}
      <Box className="idSearch-form-row-right">
        <FormControlLabel
          control={
            <Switch
              checked={useCustomEmail}
              onChange={handleToggleEmailMode}
              color="primary"
            />
          }
          label={useCustomEmail ? "이메일 직접 입력" : "도메인 선택 입력"}
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
      <Button
        variant="contained"
        fullWidth
        className="button-general"
        onClick={handleSearch}
      >
        아이디 찾기
      </Button>

      {/* 결과 Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} classes={{ paper: 'MuiDialog-paper' }}>
        <DialogTitle align="center" className="dialog-title">
          회원님의 아이디를 확인해 주세요
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" align="center" sx={{ marginTop: 2, fontWeight: 'bold' }}>
            {idResult ? `회원님의 아이디는: ${idResult}` : "아이디가 존재하지 않습니다."}
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
