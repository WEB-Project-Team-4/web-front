import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
import { Box, Typography, Divider, Avatar, Card, CardContent, CardActionArea, TextField, Button } from '@mui/material';

import '../../assets/styles/Review.css';
import '../../assets/styles/General.css';

function Detail() {
  const { reviewId } = useParams();
  const navigate = useNavigate(); // navigate 훅 사용
  const [review, setReview] = useState(null);
  const [error, setError] = useState(false);
  const [newComment, setNewComment] = useState(""); // 새로운 댓글 상태
  const [comments, setComments] = useState([]); // 댓글 리스트 상태

  useEffect(() => {
    if (reviewId === '1') {
      setReview({
        title: '광수님 없는 광수러닝 모임에 대하여 (샘플 데이터)',
        description: '이 모임은 정말 유익했습니다! 다양한 사람들과 교류할 수 있어 좋았어요.',
        commentCount: 10,
        author: '김철수',
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
        { author: '박영희', content: '정말 좋은 모임이었어요!', createdAt: '2024-11-14 13:45' },
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

  const handleBackToMain = () => {
    navigate('/review/main'); // '리뷰 목록' 페이지로 이동
  };

  if (error) return <div>리뷰 데이터를 불러오는 데 실패했습니다.</div>;
  if (!review) return <div>No Review Exist for this ID...</div>;

  return (
    <Box className="review-detail">
      <Typography className="review-title">{review.title}</Typography>

      <Box className="review-detail-author-info">
        <Avatar src={review.authorProfilePic} className="review-detail-author-avatar" />
        <Typography className="review-detail-author-name">{review.author}</Typography>
        <Typography className="review-detail-author-time">{review.createdAt}</Typography>
      </Box>

      <Divider className="review-detail-divider" />

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

      <Divider className="review-detail-divider" />

      {review.relatedMeeting && (
        <Card className="review-detail-related-meeting-card">
          <CardActionArea href="/related-meeting-url">
            <Box display="flex" alignItems="center">
              <img src={review.relatedMeeting.imageUrl} alt="Related Meeting" className="review-detail-related-meeting-image" />
              <CardContent>
                <Typography className="review-detail-related-meeting-title">{review.relatedMeeting.title}</Typography>
                <Typography className="review-detail-related-meeting-description">{review.relatedMeeting.description}</Typography>
              </CardContent>
            </Box>
          </CardActionArea>
        </Card>
      )}

      <Typography className="review-detail-comments-title">댓글 {comments.length}개</Typography>
      
      {/* 댓글 목록 */}
      <Box>
        {comments.map((comment, index) => (
          <Box key={index} className="comment-item" style={{ marginBottom: '10px' }}>
            <Typography variant="body2" className="comment-author" style={{ fontWeight: 'bold' }}>{comment.author}</Typography>
            <Typography variant="body2" className="comment-content">{comment.content}</Typography>
            <Typography variant="caption" color="textSecondary">{comment.createdAt}</Typography>
          </Box>
        ))}
      </Box>

      <Divider className="review-detail-divider" />

      {/* 댓글 작성 필드 */}
      <Box display="flex" alignItems="center" style={{ marginTop: '10px' }}>
        <TextField
          label="댓글 작성"
          variant="outlined"
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleCommentSubmit}>작성</Button>
      </Box>

      {/* 돌아가기 버튼 추가 */}
      <Box mt={2}>
        <Button variant="outlined" onClick={handleBackToMain}>리뷰 목록으로 돌아가기</Button>
      </Box>
    </Box>
  );
}

export default Detail;
