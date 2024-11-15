import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import '../../assets/styles/General.css';
import '../../assets/styles/Member.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  
  const [verification, setVerification ] = useState('');
  const [verificationError, setVerificationError] = useState('');

  const [name, setName] = useState('');
  const [nickname, setNickName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [emailError, setEmailError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const [profilePicture, setProfilePicture] = useState(null); // 프로필 사진 상태 추가

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleSubmit = () => {
    if (!username || !password || !confirmPassword || !name || !nickname|| !email ) {
      setDialogMessage('모든 필드를 입력해주세요.');
      setOpenDialog(true);
      return;
    }

    if (password !== confirmPassword) {
      setDialogMessage('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      setOpenDialog(true);
      return;
    }

    if (phone.length > 0 && phone.length <= 6) {
      setDialogMessage('전화번호가 너무 짧습니다.');
      setOpenDialog(true);
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
      return;
    } else {
      setEmailError('');
    }

    setDialogMessage('회원가입이 완료되었습니다!');
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
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

      <Typography variant="body1" className="general-form-label">아이디<span style={{ color: 'red' }}>*</span></Typography>
        
        <TextField
          variant="outlined"
          label={<span>아이디를 입력해주세요 </span>}
          fullWidth
          margin='normal'
          className="general-form-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          variant="outlined"
          className="button-general-click"
          onClick={() => alert('아이디 중복확인 클릭!')}
        >
          중복확인
        </Button>
      </Box>

<Box className="general-form-row">
      {/* 비밀번호 입력 */}
      <Typography variant="body1" className="general-form-label">비밀번호<span style={{ color: 'red' }}>*</span></Typography>
      
      <TextField
        variant="outlined"
        label={<span>비밀번호를 입력해주세요 </span>}
        type="password"
        fullWidth
        className="general-form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
</Box>

      {/* 비밀번호 확인 입력 */}
      <Box className="general-form-row">
      <Typography variant="body1" className="general-form-label">비밀번호 확인<span style={{ color: 'red' }}>*</span></Typography>
      
      <TextField
        variant="outlined"
        label={<span>비밀번호 확인 </span>}
        type="password"
        fullWidth
        className="general-form-input"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
</Box>
      

      {/* 이름 입력과 "중복확인" 버튼 */}
      <Box className="general-form-row">
      <Typography variant="body1" className="general-form-label">이름<span style={{ color: 'red' }}>*</span></Typography>
      
        <TextField
          variant="outlined"
          label={<span>이름을 입력해주세요 </span>}
          fullWidth
          className="general-form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          variant="outlined"
          className="button-general-click"
          onClick={() => alert('이름 중복확인 클릭!')}
        >
          중복확인
        </Button>
      </Box>

      {/* 닉네임 입력과 "중복확인" 버튼 */}
      <Box className="general-form-row">
      <Typography variant="body1" className="general-form-label">닉네임<span style={{ color: 'red' }}>*</span></Typography>
      
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
          className="button-general-click"
          onClick={() => alert('닉네임 중복확인 클릭!')}
        >
          중복확인
        </Button>
      </Box>

{/* 이메일 입력과 "중복확인" 버튼 */}
      
<Box className="general-form-row">
<Typography variant="body1" className="general-form-label">이메일<span style={{ color: 'red' }}>*</span></Typography>
      
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
          className="button-general-click"
          onClick={() => alert('이메일 중복확인 클릭!')}
        >
          인증번호 발송
        </Button>
      </Box>


      {/* 인증번호 입력과 "인증" 버튼 */}
      
      <Box className="general-form-row">
      <Typography variant="body1" className="general-form-label">인증번호<span style={{ color: 'red' }}>*</span></Typography>
      
        <TextField
          variant="outlined"
          label={<span>인증 번호를 입력해 주세요 </span>}
          type="String"
          fullWidth
          className="general-form-input"
          value={verification}
          onChange={(e) => setVerification(e.target.value)}
          error={!!verificationError}
          helperText={verificationError}
        />
        <Button
          variant="outlined"
          className="button-general-click"
          onClick={() => alert('인증 버튼 클릭!')}
        >
          인증
        </Button>
      </Box>


      {/* 휴대폰 번호 입력 */}
      <Box className="general-form-row">
      <Typography variant="body1" className="general-form-label">휴대폰 번호</Typography>
      
      <TextField
        variant="outlined"
        label="휴대폰 번호를 입력해주세요"
        fullWidth
        className="general-form-input"
        value={phone}
        onChange={(e) => {
          const value = e.target.value.replace(/[^0-9]/g, '');
          setPhone(value);
        }}
      />
      </Box>

      {/* 관심 카테고리 선택 */}
      <Box className="general-form-row">
      <Typography variant="body1" className="general-form-label">카테고리</Typography>
      
      <FormControl fullWidth className="general-form-input">
        <InputLabel id="category-label">관심 카테고리</InputLabel>
        <Select
          labelId="category-label"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="sports">스터디</MenuItem>
          <MenuItem value="music">스포츠</MenuItem>
          <MenuItem value="tech">음식</MenuItem>
          <MenuItem value="art">기타</MenuItem>
        </Select>
      </FormControl>
      </Box>
      

      {/* 프로필 사진 업로드 */}
      <Box className="general-form-row">
        <Typography variant="body1" className="general-form-label">프로필 사진</Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: 'none' }}
          id="profile-pic-upload"
        />
        <label htmlFor="profile-pic-upload">
          <Button variant="outlined" component="span">사진 업로드</Button>
        </label>
        {profilePicture && (
          <Box mt={2}>
            <img
              src={profilePicture}
              alt="Profile Preview"
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
            />
          </Box>
        )}
      </Box>

      {/* 회원가입 버튼 */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className="button-general"
        style={{ marginTop: '16px' }}
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
