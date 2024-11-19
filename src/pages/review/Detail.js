// src/pages/review/Details.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, Avatar, Card, CardContent, CardActionArea, TextField, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Import icon

import '../../assets/styles/Review.css';
import '../../assets/styles/Group.css';
import '../../assets/styles/General.css';

function Detail() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [error, setError] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor

  // Dummy data for logged-in user ID
  //이 loggedInUserId를 크롬등을 통해 현재 로그인한 사람 username 혹은 id로 지정하면 됨. => 점3개 보이고 안보이고
  const loggedInUserId = '김철수'; // Replace with real logged-in user ID after implementing login

  useEffect(() => {
    if (reviewId === '1') {
      setReview({
        title: '광수님 없는 광수러닝 모임에 대하여 (샘플 데이터)',
        description: '이 모임은 정말 유익했습니다! 다양한 사람들과 교류할 수 있어 좋았어요.',
        commentCount: 10,
        author: '김철수', // Author ID (used for comparison)
        authorProfilePic: '/path/to/sample-profile.jpg',
        createdAt: '2024-11-14 12:30',
        content: '달리기 모임이 잡힌 날, 평소보다 일찍 일어나 마음을 단단히 먹고 출발했다. 날씨도 상쾌했고, 마음은 어느 때보다 기대감으로 가득 차 있었다. 모임 장소에 도착해 시간을 보니 약속 시간보다 약간 일찍 도착한 듯했다. 주변을 둘러보며 사람들을 기다리는데, 시간이 지나도 모임 멤버들은 보이지 않았다. 혹시 내가 장소를 잘못 온 걸까? 싶어 여러 번 안내문을 확인했지만, 장소와 시간은 분명했다. 시간이 지나면서 한 명이라도 오겠지 하는 마음이 점점 조바심으로 바뀌었다. 끝내 아무도 나타나지 않자, 모임이 취소되었다는 공지라도 있었나 싶어 핸드폰을 꺼내 확인해보았다. 아쉽게도 모임이 불참하는 경우에 대한 공지는 없었다. 홀로 멍하니 서 있다가, 이왕 나온 김에 혼자라도 달려보기로 하고 조용히 발걸음을 옮겼다. 텅 빈 공원을 달리며 마음속 깊이 밀려오는 쓸쓸함이 바람처럼 가슴을 스치고 지나갔다.... 광수님 없는 광수님 러닝에 대하여 이러 저러한 일들이 있었는데요 이거 참 재밌는 일이었어요.. 근데 있잖아요? 가장 재밌는 사실은... api에 작성한 내용이 여기에 들어갈 예정입니다 광수님 없는 광수님 러닝에 대하여 이러 저러한 일들이 있었는데요 이거 참 재밌는 일이었어요.. 근데 있잖아요? 가장 재밌는 사실은... api에 작성한 내용이 여기에 들어갈 예정입니다.광수님 없는 광수님 러닝에 대하여 이러 저러한 일들이 있었는데요 이거 참 재밌는 일이었어요.. 근데 있잖아요? 가장 재밌는 사실은... api에 작성한 내용이 여기에 들어갈 예정입니다.광수님 없는 광수님 러닝에 대하여 이러 저러한 일들이 있었는데요 이거 참 재밌는 일이었어요.. 근데 있잖아요? 가장 재밌는 사실은... api에 작성한 내용이 여기에 들어갈 예정입니다.광수님 없는 광수님 러닝에 대하여 이러 저러한 일들이 있었는데요 이거 참 재밌는 일이었어요.. 근데 있잖아요? 가장 재밌는 사실은... api에 작성한 내용이 여기에 들어갈 예정입니다광수님 없는 광수님 러닝에 대하여 이러 저러한 일들이 있었는데요 이거 참 재밌는 일이었어요.. 근데 있잖아요? 가장 재밌는 사실은... api에 작성한 내용이 여기에 들어갈 예정입니다.집에가고싶어요?집에갈수있어요.집에갈래요?집에가고싶어요?',
        uploadedImages: ['/path/to/sample-image1.jpg', '/path/to/sample-image2.jpg'],
        relatedMeeting: {
          title: '관련 모임 예시',
          description: '관련 모임에 대한 간략한 설명입니다.',
          imageUrl: '/path/to/related-meeting-image.jpg',
        },
      });
      setComments([
        { author: '박영희', content: '정말 좋은 모임이었어요!', createdAt: '2024-11-14 13:45', authorProfilePic: '/path/to/sample-profile.jpg', },
        { author: '이수진', content: '다음에도 참여하고 싶네요.', createdAt: '2024-11-14 14:20' },
      ]);
    } else {
      fetch(`/api/review/${reviewId}`)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then(data => setReview(data))
        .catch(() => setError(true));
    }
  }, [reviewId]);

  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return;
    const newCommentObj = { author: '현재 사용자', content: newComment, createdAt: new Date().toLocaleString() };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString); // ISO 형식을 Date 객체로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`; // 원하는 형식으로 반환
  };

  const handleBackToMain = () => {
    navigate('/review/main');
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    navigate(`/review/modify?=${reviewId}`);
    handleMenuClose();
  };

  if (error) return <div>리뷰 데이터를 불러오는 데 실패했습니다.</div>;
  if (!review) return <div>No Review Exist for this ID...</div>;

  return (
    <Box className="review-detail">
      <Typography variant="h5" className="review-title">{review.title} {review.author === loggedInUserId && (
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
      )}</Typography>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>수정하기</MenuItem>
        <MenuItem onClick={handleMenuClose}>삭제하기</MenuItem>
      </Menu>

      <Box className="review-detail-author-info">
        <Avatar src={review.authorProfilePic} className="review-detail-author-avatar" />
        <Typography className="review-detail-author-name">{review.author}</Typography>
        <Divider orientation="vertical" className="review-author-divider" flexItem />
        <Typography className="review-detail-author-time">{review.createdAt}</Typography>
      </Box>

      <Divider orientation="horizenal" className="review-detail-divider" flexItem />

      <Typography className="review-content">
        {review.content || review.description}
      </Typography>

      {review.uploadedImages && review.uploadedImages.length > 0 && (
        <Box className="review-detail-uploaded-images">
          {review.uploadedImages.map((image, index) => (
            <img key={index} src={image} alt={`Uploaded ${index + 1}`} className="review-detail-uploaded-image" />
          ))}
        </Box>
      )}

      <Divider className="review-detail-divider" flexItem />

      {/* 모임 바로가기와 스포츠 카테고리 모임 더 보러가기 */}
  <Box className="review-detail-navigation" sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: 3, mb: 3 }}>
    {/* 모임 바로가기 */}
    <Box className="review-detail-go-meeting">
      <Typography variant="h5" className="review-detail-navigation-title"
      onClick={() => navigate('/group/detail/1')} // 이동할 경로 지정
      style={{ cursor: 'pointer'}} // 클릭 가능한 UI 스타일
      >모임 바로가기 {'>'} </Typography>
      <Card className="review-detail-navigation-card">
        <CardActionArea href="/group/detail/1">
          <CardContent>
            <Typography className="review-detail-navigation-category">스포츠</Typography>
            <Typography className="review-detail-navigation-cardtitle">광수님과 함께하는 건대 런닝광수님과 함께하는 건대 런닝</Typography>
            <Typography className="review-detail-navigation-subtitle">광수님과 함께라면 어디든 갈 수 있어</Typography>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Avatar sx={{ width: 20, height: 20, mr: 1 }}>👤</Avatar>
              <Typography>참가자 2/3</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>

    {/* 스포츠 카테고리 모임 더 보러가기 */}
    <Box className="review-detail-more-category">
      <Typography variant="h6" className="review-detail-navigation-title"
      onClick={() => navigate('/category/sports')} // 이동할 경로 지정
      style={{ cursor: 'pointer'}} // 클릭 가능한 UI 스타일
      >스포츠 카테고리 모임 보러가기 {'>'}  </Typography>
      <Card className="review-detail-navigation-card">
        <CardActionArea href="/category/sports">
          <CardContent>
            <Typography className="review-detail-navigation-category">스포츠</Typography>
            <Typography className="review-detail-navigation-cardtitle">건대와 함께하는 달리기</Typography>
            <Typography className="review-detail-navigation-subtitle">건대의 달리기와 함께 새벽을~</Typography>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Avatar sx={{ width: 20, height: 20, mr: 1 }}>👤</Avatar>
              <Typography>참가자 5/10</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  </Box>


      {/* 댓글 섹션 */}
      <Box className="group-comments-container group-detail-container-padding review-detail-comment-width">
        <Typography className="group-comments-title">댓글 {comments.length}개</Typography>

        <Box className="group-comments-list">
          {comments.map((comment, index) => (
            <Box key={index} className="group-comment-item">
              <Box className="review-author-container" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Avatar src={review.authorProfilePic} className="review-detail-author-avatar" />
                <Typography className="review-detail-author-name">{comment.author}</Typography>
              </Box>
              <Typography variant="body2" className="group-comment-content">{comment.content}</Typography>
              <Typography variant="caption" className="group-comment-date">{formatDate(comment.createdAt)}</Typography>
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

      <Box mt={2}>
        <Button variant="outlined" onClick={handleBackToMain}>리뷰 목록으로 돌아가기</Button>
      </Box>
    </Box>
  );
}

export default Detail;
