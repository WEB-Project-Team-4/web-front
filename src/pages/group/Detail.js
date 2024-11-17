import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, Avatar, Button, IconButton, TextField, Menu, MenuItem, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import cardTestImage from '../../img/card_test.jpg';
import '../../assets/styles/Group.css';

function GroupDetailPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [comments, setComments] = useState([
    { author: '박영희', content: '모임 정말 재미있었어요!', createdAt: '2024-11-14 14:00' },
    { author: '이수진', content: '다음에도 꼭 참여하고 싶습니다.', createdAt: '2024-11-14 15:45' },
  ]);

  const members = [
    { id: 1, name: '작성자', avatar: 'A' },
    { id: 2, name: '참가자1', avatar: 'B' },
    { id: 3, name: '참가자2', avatar: 'C' },
    { id: 4, name: '참가자3', avatar: 'D' },
    { id: 5, name: '참가자4', avatar: 'E' },
  ];

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() === '') return;
    const newCommentObj = {
      author: '현재 사용자',
      content: newComment,
      createdAt: new Date().toLocaleString(),
    };
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Box className="group-detail-container">
      {/* 상단 바 */}
      <Box className="group-detail-header group-detail-container-padding ">
        <Box className="group-header-left">
          <Typography variant="h6" className="group-category">
            스포츠
          </Typography>
          <Typography variant="caption" className="group-category-id">
            #124
          </Typography>
        </Box>

        <Box className="group-header-center">
          <IconButton onClick={toggleBookmark} className="group-bookmarkIconBorder">
            <BookmarkBorderIcon />
          </IconButton>
          {isBookmarked && <BookmarkIcon className="group-bookmarkIcon" />}
          <Typography variant="h6">8</Typography>
        </Box>

        <Box className="group-header-right">
          <Typography variant="caption" className='group-header-end-date-padding'>마감일시 2023-12-31 16:33</Typography>
          <Box className="group-recruitingBox">모집중</Box>
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
            <MenuItem component={Link} to="/group/modify">모임 수정</MenuItem>
            <MenuItem component={Link} to="/delete">모임 삭제</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Divider />

      {/* 모임 정보 */}
      <Box className="group-info group-detail-container-padding">
        {/* 왼쪽 절반 */}
        <Box className="group-info-left">
          <Typography variant="h5" className="group-name-detail">광수님과 함께하는 건대 런닝1광수님과 함께하는 건대 런닝2</Typography>
          <Typography variant="h6" className="group-short-description">광수님과 함께라면 어디든 갈 수 있어~~</Typography>

          <Box className="group-info-bottom">
            {/* 작성자 정보 */}
            <Box className="group-author-card">
              <Avatar className="group-author-avatar">A</Avatar>
              <Typography variant="body1" className="group-author-name">최대길이인닉네임</Typography>
            </Box>

            {/* 모임 일시 및 장소 정보 */}
            <Box className="group-details-info">
              <Box className="group-info-detail-item">
                <CalendarTodayIcon fontSize="small" />
                <Box>
                  <Typography variant="body2">모임 일시</Typography>
                  <Typography variant="caption" sx={{ color: '#909090' }}>
                    2024-11-24 17:30
                  </Typography>
                </Box>
              </Box>

              <Box className="group-info-detail-item">
                <LocationOnIcon fontSize="small" />
                <Box sx={{ maxWidth: '200px', overflow: 'hidden' }}>
                  <Typography variant="body2" sx={{ display: 'block' }}>
                    서울 광진구
                  </Typography>
                  <Typography
                    variant="caption"
                    onClick={handleModalOpen}
                    sx={{
                      color: '#909090',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'block', // 블록 요소로 표시
                      maxWidth: '100%', // 부모 박스의 최대 너비를 사용
                    }}
                  >
                    무슨로50 건국대학교 대운동장 무슨로50 건국대학교 대운동장
                  </Typography>
                </Box>

              </Box>
            </Box>
          </Box>
        </Box>

        {/* 오른쪽 절반: 썸네일 이미지 */}
        <Box className="group-info-right">
          <Box className="group-thumbnail-container">
            <img src={cardTestImage} alt="모임 썸네일" className="group-thumbnail" />
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* 모달 구현 */}
      <Dialog
        open={showModal}
        onClose={handleModalClose}
        classes={{ paper: 'group-custom-dialog' }}
      >

        <DialogTitle align="center" className="group-dialog-title">
          상세 주소
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: '#333', textAlign: 'center', fontWeight: 'bold' }}>
            무슨로50 건국대학교 대운동장, 서울특별시 강남구
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
          <Button
            onClick={handleModalClose}
            className="group-button-dialog group-primary"
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>




      {/* 모임 내용 */}
      <Box className="group-content group-detail-container-padding">
        <Typography className='group-content-text'>
          저희는 건대 운동장에서 런닝하는 씻사 대표 스포츠인입니다. 금요일 9시마다 건대 운동장에서 만나요~
          저희는 건대 운동장에서 런닝하는 씻사 대표 스포츠인입니다. 금요일 9시마다 건대 운동장에서 만나요~
          저희는 건대 운동장에서 런닝하는 씻사 대표 스포츠인입니다. 금요일 9시마다 건대 운동장에서 만나요~
          저희는 건대 운동장에서 런닝하는 씻사 대표 스포츠인입니다. 금요일 9시마다 건대 운동장에서 만나요~
          저희는 건대 운동장에서 런닝하는 씻사 대표 스포츠인입니다. 금요일 9시마다 건대 운동장에서 만나요~
          저희는 건대 운동장에서 런닝하는 씻사 대표 스포츠인입니다. 금요일 9시마다 건대 운동장에서 만나요~
          저희는 건대 운동장에서 런닝하는 씻사 대표 스포츠인입니다. 금요일 9시마다 건대 운동장에서 만나요~
          저희는 건대 운동장에서 런닝하는 씻사 대표 스포츠인입니다. 금요일 9시마다 건대 운동장에서 만나요~
          저희는 건대 운동장에서 런닝하는 씻사 대표 스포츠인입니다. 금요일 9시마다 건대 운동장에서 만나요~
          저희는 건대 운동장에서 런닝하는 씻사 대표 스포츠인입니다. 금요일 9시마다 건대 운동장에서 만나요~
          저희는 건대 운동장에서 런닝하는 씻사 대표 스포츠인입니다. 금요일 9시마다 건대 운동장에서 만나요~
          저희는 건대 운동장에서 런닝하는 씻사 대표 스포츠인입니다. 금요일 9시마다 건대 운동장에서 만나요~
          저희는 건대 운동장에서 런닝하는 씻사 대표 스포츠인입니다. 금요일 9시마다 건대 운동장에서 만나요~
          저희는 건대 운동장에서 런닝하는 씻사 대표 스포츠인입니다. 금요일 9시마다 건대 운동장에서 만나요~
        </Typography>
      </Box>

      <Divider />

      {/* 참가자 정보 */}
      <Box className="group-participants group-detail-container-padding">
        {/* 참가자 헤더 */}
        <Box className="group-participants-header">
          <PeopleIcon />
          <Typography>참가자 {members.length} / 20</Typography>
          <Button
            variant="contained"
            className="group-join-button"
            sx={{ marginLeft: 'auto' }}
          >
            참가하기
          </Button>
        </Box>

        {/* 참가자 목록 */}
        <Box className="group-participant-list">
          {members.slice(0, showAllMembers ? members.length : 4).map((member, index) => (
            <Box key={member.id} className="group-participant">
              <Avatar>{member.avatar}</Avatar>
              <Typography variant="body2">{member.name}</Typography>
              {member.id !== 1 && <CloseIcon className="group-remove-icon" />}
            </Box>
          ))}
        </Box>

        {/* 더보기/줄이기 버튼 */}
        {members.length > 4 && (
          <Button
            className="group-toggle-button"
            onClick={() => setShowAllMembers(!showAllMembers)}
          >
            {showAllMembers ? '줄이기' : '더보기'}
          </Button>
        )}
      </Box>



      <Divider />

      {/* 댓글 섹션 */}
      <Box className="group-comments-container group-detail-container-padding">
        <Typography className="group-comments-title">댓글 {comments.length}개</Typography>

        <Box className="group-comments-list">
          {comments.map((comment, index) => (
            <Box key={index} className="group-comment-item">
              <Typography variant="body2" className="group-comment-author">{comment.author}</Typography>
              <Typography variant="body2" className="group-comment-content">{comment.content}</Typography>
              <Typography variant="caption" className="group-comment-date">{comment.createdAt}</Typography>
            </Box>
          ))}
        </Box>

        <Divider className="group-comments-divider" />

        <Box className="group-comments-form">
          <TextField
            label="댓글 작성"
            variant="outlined"
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="group-comment-input"
          />
          <Button
            variant="contained"
            className="group-comment-submit-button"
            onClick={handleCommentSubmit}
          >
            작성
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default GroupDetailPage;
