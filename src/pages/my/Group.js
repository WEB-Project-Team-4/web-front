import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../../assets/styles/My.css';

function Group() {
  const [filter, setFilter] = useState('myMeetings');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleClick = (event, meetingId) => {
    setAnchorEl(event.currentTarget);
    setSelectedMeetingId(meetingId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMeetingId(null);
  };

  const handleMenuAction = (action) => {
    console.log(`Action: ${action}, Meeting ID: ${selectedMeetingId}`);
    handleClose();
  };

  const mockData = {
    myMeetings: [
      { id: 1, title: '내가 만든 모임 1', description: '모임 1 설명' },
      { id: 2, title: '내가 만든 모임 2', description: '모임 2 설명' },
    ],
    participating: [
      { id: 3, title: '참여중인 모임 1', description: '모임 3 설명' },
      { id: 4, title: '참여중인 모임 2', description: '모임 4 설명' },
    ],
    pastMeetings: [
      { id: 5, title: '지난 모임 1', description: '모임 5 설명' },
      { id: 6, title: '지난 모임 2', description: '모임 6 설명' },
    ],
    likedMeetings: [
      { id: 7, title: '좋아요 한 모임 1', description: '모임 7 설명', participated: false, myMeeting: false },
      { id: 8, title: '좋아요 한 모임 2', description: '모임 8 설명', participated: true, myMeeting: false },
      { id: 9, title: '좋아요 한 모임 3', description: '모임 9 설명', participated: false, myMeeting: true },
    ],
  };

  const currentData = mockData[filter] || [];
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const currentPageData = currentData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderMenuItems = (meeting) => {
    switch (filter) {
      case 'myMeetings':
        return (
          <>
            <MenuItem onClick={() => handleMenuAction('edit')}>수정하기</MenuItem>
            <MenuItem onClick={() => handleMenuAction('delete')}>삭제하기</MenuItem>
          </>
        );
      case 'participating':
        return <MenuItem onClick={() => handleMenuAction('leave')}>나가기</MenuItem>;
      case 'pastMeetings':
        return <MenuItem onClick={() => handleMenuAction('writeReview')}>후기 작성</MenuItem>;
      case 'likedMeetings':
        if (meeting.myMeeting) {
          return (
            <>
              <MenuItem onClick={() => handleMenuAction('edit')}>수정하기</MenuItem>
              <MenuItem onClick={() => handleMenuAction('delete')}>삭제하기</MenuItem>
            </>
          );
        }
        if (meeting.participated) {
          return <MenuItem onClick={() => handleMenuAction('leave')}>나가기</MenuItem>;
        }
        return <MenuItem onClick={() => handleMenuAction('participate')}>참여하기</MenuItem>;
      default:
        return null;
    }
  };

  return (
    <Box className="mypage-container">
      <Box className="content">
        {/* 필터 바 */}
        <Box className="filter-bar">
          <Button onClick={() => handleFilterChange('myMeetings')} className={filter === 'myMeetings' ? 'active' : ''}>
            내가 만든 모임
          </Button>
          <Button onClick={() => handleFilterChange('participating')} className={filter === 'participating' ? 'active' : ''}>
            참여중인 모임
          </Button>
          <Button onClick={() => handleFilterChange('pastMeetings')} className={filter === 'pastMeetings' ? 'active' : ''}>
            지난 모임
          </Button>
          <Button onClick={() => handleFilterChange('likedMeetings')} className={filter === 'likedMeetings' ? 'active' : ''}>
            좋아요 한 모임
          </Button>
        </Box>

        {/* 필터 상태에 따른 카드 */}
        <Box className="meeting-cards">
          {currentPageData.length === 0 ? (
            <Typography>데이터가 없습니다.</Typography>
          ) : (
            currentPageData.map((meeting) => (
              <Box key={meeting.id} className="meeting-card">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box flexGrow={1} display="flex" justifyContent="center">
                    <Typography variant="h6" align="center">{meeting.title}</Typography>
                  </Box>
                  <IconButton onClick={(e) => handleClick(e, meeting.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2">{meeting.description}</Typography>
                <Link to={`/group/detail/${meeting.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="outlined">상세보기</Button>
                </Link>
                <Menu anchorEl={anchorEl} open={selectedMeetingId === meeting.id} onClose={handleClose}>
                  {renderMenuItems(meeting)}
                </Menu>
              </Box>
            ))
          )}
        </Box>

        {/* 페이지네이션 */}
        <Box className="pagination">
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            이전
          </Button>
          <Typography>{`${currentPage} / ${totalPages}`}</Typography>
          <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            다음
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Group;
