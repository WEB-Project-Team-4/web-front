import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Divider,
  Avatar,
  Card,
  CardContent,
  CardActionArea,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchReviewDetail } from "../../API/review";
import "../../assets/styles/Review.css";

function Detail() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [error, setError] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const loggedInUserId = "현재 사용자"; // 더미 데이터 (로그인된 사용자 ID)

  // 리뷰 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReviewDetail(reviewId);
        setReview(data); // 데이터 상태 저장
      } catch (err) {
        console.error("Failed to fetch review detail:", err);
        setError(true); // 에러 상태 설정
      }
    };

    if (reviewId) {
      fetchData();
    } else {
      console.error("Review ID is missing");
      navigate("/error");
    }
  }, [reviewId, navigate]);

  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return;
    const newCommentObj = {
      author: loggedInUserId,
      content: newComment,
      createdAt: new Date().toISOString(),
    };
    setReview((prevReview) => ({
      ...prevReview,
      reviewCommentList: [...prevReview.reviewCommentList, newCommentObj],
    }));
    setNewComment("");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    navigate(`/review/modify/${reviewId}`);
    handleMenuClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  // 리뷰 데이터 로드 중 또는 에러 처리
  if (error) {
    return <Typography>리뷰 데이터를 불러오는 데 실패했습니다.</Typography>;
  }

  if (!review) {
    return <Typography>데이터를 불러오는 중입니다...</Typography>;
  }

  return (
    <Box className="review-detail">
      <Typography variant="h5" className="review-title">
        {review.reviewTitle}{" "}
        {/* {review.reviewWriterId === loggedInUserId && (
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
        )} */}
        <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
      </Typography>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>수정하기</MenuItem>
        <MenuItem onClick={handleMenuClose}>삭제하기</MenuItem>
      </Menu>

      <Box className="review-detail-author-info">
        <Avatar
          src={review.profileUrl}
          className="review-detail-author-avatar"
        />
        <Typography className="review-detail-author-name">
          {review.reviewWriter}
        </Typography>
        <Divider
          orientation="vertical"
          className="review-author-divider"
          flexItem
        />
        <Typography className="review-detail-author-time">
          {formatDate(review.createdAt)}
        </Typography>
      </Box>

      <Divider
        orientation="horizontal"
        className="review-detail-divider"
        flexItem
      />

      <Typography className="review-content">{review.reviewContent}</Typography>

      {/* {review.uploadedImages && review.uploadedImages.length > 0 && (
  <Box className="review-detail-uploaded-images">
    {review.uploadedImages.map((image, index) => (
      <img key={index} src={image} alt={Uploaded ${index + 1}} className="review-detail-uploaded-image" />
    ))}
  </Box>
)} */}

      <Divider className="review-detail-divider" flexItem />

      {/* 모임 바로가기와 스포츠 카테고리 모임 더 보러가기 */}
      <Box
        className="review-detail-navigation"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          mt: 3,
          mb: 3,
        }}
      >
        {/* 모임 바로가기 */}
        <Box className="review-detail-go-meeting">
          <Typography
            variant="h5"
            className="review-detail-navigation-title"
            onClick={() => navigate("/group/detail/1")}
            style={{ cursor: "pointer" }}
          >
            모임 바로가기 {">"}{" "}
          </Typography>
          <Card className="review-detail-navigation-card">
            <CardActionArea href="/group/detail/1">
              <CardContent>
                <Typography className="review-detail-navigation-category">
                  {review.reviewGroup.categoryName}
                </Typography>
                <Typography className="review-detail-navigation-cardtitle">
                  {review.reviewTitle}
                </Typography>
                <Typography className="review-detail-navigation-subtitle">
                  {review.reviewContent}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Avatar sx={{ width: 20, height: 20, mr: 1 }}>👤</Avatar>
                  <Typography>참가자 {review.reviewGroup.groupVo.participationCount}/{review.reviewGroup.groupVo.groupLimit}</Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>

        {/* 스포츠 카테고리 모임 더 보러가기 */}
        <Box className="review-detail-more-category">
          <Typography
            variant="h6"
            className="review-detail-navigation-title"
            onClick={() => navigate("/category/sports")}
            style={{ cursor: "pointer" }}
          >
            스포츠 카테고리 모임 보러가기 {">"}{" "}
          </Typography>
          <Card className="review-detail-navigation-card">
            <CardActionArea href="/category/sports">
              <CardContent>
                <Typography className="review-detail-navigation-category">
                  스포츠
                </Typography>
                <Typography className="review-detail-navigation-cardtitle">
                  건대와 함께하는 달리기
                </Typography>
                <Typography className="review-detail-navigation-subtitle">
                  건대의 달리기와 함께 새벽을~
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Avatar sx={{ width: 20, height: 20, mr: 1 }}>👤</Avatar>
                  <Typography>참가자 5/10</Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
      <Divider className="review-detail-divider" flexItem />

      {/* 댓글 섹션 */}
      <Box className="group-comments-container group-detail-container-padding review-detail-comment-width">
        <Typography className="group-comments-title">
          댓글 {review.reviewCommentList.length}개
        </Typography>

        <Box className="group-comments-list">
          {review.reviewCommentList.map((comment, index) => (
            <Box key={index} className="group-comment-item">
              <Typography variant="body2" className="group-comment-content">
                {comment.content}
              </Typography>
              <Typography variant="caption" className="group-comment-date">
                {comment.createdAt}
              </Typography>
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
        <Button variant="outlined" onClick={() => navigate("/review/main")}>
          리뷰 목록으로 돌아가기
        </Button>
      </Box>
    </Box>
  );
}

export default Detail;
