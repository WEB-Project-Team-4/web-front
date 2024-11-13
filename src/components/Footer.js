import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Logo from '../img/Logo.png'; // 상대 경로로 이미지 불러오기
import Divider from '@mui/material/Divider';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        backgroundColor: 'white',
        borderTop: '1px solid #e0e0e0',
        paddingTop: '10px',
      }}
    >
      {/* 로고 이미지 */}
      <img src={Logo} alt="Logo" style={{ height: 60 }} />

      {/* 링크와 저작권 정보 */}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © Moin Corp.
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Link href="#" color="text.secondary" underline="hover">
          회사소개
        </Link>
        <Divider orientation="vertical" flexItem />
        <Link href="#" color="text.secondary" underline="hover">
          인재채용
        </Link>
        <Divider orientation="vertical" flexItem />
        <Link href="#" color="text.secondary" underline="hover">
          이용약관
        </Link>
        <Divider orientation="vertical" flexItem />
        <Link href="#" color="text.secondary" underline="hover">
          개인정보처리방침
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;
