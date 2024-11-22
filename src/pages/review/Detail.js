import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown 지원
import {
  fetchRegistReveiwComment,
  fetchRemoveReview,
  fetchRemoveReviewComment,
  fetchReviewDetail,
} from "../../API/review";
import "../../assets/styles/Review.css";
import defaultImg from "../../img/MOIN_review_img.jpg";

function Detail() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [error, setError] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElComment, setAnchorElComment] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const { user } = useContext(UserContext);

  // const loggedInUserId = "현재 사용자"; // 더미 데이터 (로그인된 사용자 ID)

  // 리뷰 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReviewDetail(reviewId);
        setReview(data); // 데이터 상태 저장
        setIsChange(false);
      } catch (err) {
        console.error("Failed to fetch review detail:", err);
        setError(true); // 에러 상태 설정
      }
    };

    if (reviewId) {
      fetchData();
    } else {
      console.error("Review ID is missing");
      // navigate("/error");
    }
  }, [reviewId, navigate, isChange]);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") {
      alert("댓글 내용을 작성해주세요.");
      return;
    }

    if (user === null) {
      alert("로그인이 필요합니다");
      return;
    }

    const response = await fetchRegistReveiwComment({
      reviewId: reviewId,
      commentContent: newComment,
    });

    setIsChange(true);
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

  const handleReviewRemove = async (reviewCommentId) => {
    const status = await fetchRemoveReviewComment(reviewCommentId);
    if (status === 405) {
      alert("삭제 권한이 없습니다.");
    } else if (status === 200) {
      alert("댓글이 삭제되었습니다.");
    }
    setIsChange(true);
  };
  const handleNavigationGroup = () => {
    navigate(`/group/detail/${review.reviewGroup.groupVo.groupId}`);
  };
  const handleNavigationRec = () => {
    navigate(`/group/detail/${review.reviewRecGroup.groupVo.groupId}`);
  };

  const handleDeleteReview = async () => {
    try {
      // API 호출
      const response = await fetchRemoveReview(reviewId);

      console.log("리뷰 삭제 성공");
      alert("리뷰가 삭제되었습니다.");
      navigate(`/review/main`);
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
      navigate("/error");
    }
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
        {user && review.reviewWriterId === user.id && (
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
        )}
      </Typography>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>수정하기</MenuItem>
        <MenuItem onClick={handleDeleteReview}>삭제하기</MenuItem>
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
      {/* 마크다운 렌더링 */}
      {/* <div className="review-detail-image-container">
        <img
          className="review-detail-image"
          src={
            review.reviewImgUrl === null ||
            review.reviewImgUrl === "default url"
              ? defaultImg
              : review.reviewImgUrl
          }
          alt="Review Thumbnail"
        />
      </div> */}
      <ReactMarkdown
        children={review.reviewContent}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        className="review-markdown-content"
      />

      <div className="review-detail-image-container">
        <img
          className="review-detail-image"
          src={
            review.reviewImgUrl === null ||
            review.reviewImgUrl === "default url"
              ? defaultImg
              : review.reviewImgUrl
          }
          alt="Review Thumbnail"
        />
      </div>

      {/* <Typography className="review-content">{review.reviewContent}</Typography> */}

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
            onClick={() =>
              navigate(`/group/detail/${review.reviewGroup.groupVo.groupId}`)
            }
            style={{ cursor: "pointer" }}
          >
            모임 바로가기 {">"}{" "}
          </Typography>
          <Card className="review-detail-navigation-card">
            <CardActionArea onClick={handleNavigationGroup}>
              <CardContent>
                <Typography className="review-detail-navigation-category">
                  {review.reviewGroup.categoryName}
                </Typography>
                <Typography className="review-detail-navigation-cardtitle">
                  {review.reviewGroup.groupVo.groupName}
                </Typography>
                <Typography className="review-detail-navigation-subtitle">
                  {review.reviewGroup.groupVo.introText}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Avatar sx={{ width: 20, height: 20, mr: 1 }}>👤</Avatar>
                  <Typography>
                    참가자 {review.reviewGroup.groupVo.participationCount}/
                    {review.reviewGroup.groupVo.groupLimit}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>

        {/* 스포츠 카테고리 모임 더 보러가기 */}
        {review.reviewRecGroup && (
          <Box className="review-detail-more-category">
            <Typography
              variant="h6"
              className="review-detail-navigation-title"
              onClick={() =>
                navigate(
                  `/group/detail/${review.reviewRecGroup.groupVo.groupId}`
                )
              }
              style={{ cursor: "pointer" }}
            >
              {review.reviewRecGroup.categoryName} 카테고리 모임 보러가기 {">"}{" "}
            </Typography>
            <Card className="review-detail-navigation-card">
              <CardActionArea onClick={handleNavigationRec}>
                <CardContent>
                  <Typography className="review-detail-navigation-category">
                    {review.reviewRecGroup.categoryName}
                  </Typography>
                  <Typography className="review-detail-navigation-cardtitle">
                    {review.reviewRecGroup.groupVo.groupName}
                  </Typography>
                  <Typography className="review-detail-navigation-subtitle">
                    {review.reviewRecGroup.groupVo.introText}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Avatar sx={{ width: 20, height: 20, mr: 1 }}>👤</Avatar>
                    <Typography>
                      참가자 {review.reviewRecGroup.groupVo.participationCount}/
                      {review.reviewRecGroup.groupVo.groupLimit}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        )}
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
              <Box
                className="group-author-container"
                sx={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Avatar></Avatar>
                <Typography variant="body2" className="group-comment-author">
                  {comment.rcWriter}
                </Typography>
              </Box>
              <Typography variant="body2" className="group-comment-content">
                {comment.commentContent}
              </Typography>
              <Typography variant="caption" className="group-comment-date">
                {formatDate(comment.rcCreatedAt)}
              </Typography>
              <DeleteForeverIcon
                color="disabled"
                fontSize="small"
                sx={{ marginLeft: "10px" }}
                onClick={() => handleReviewRemove(comment.reviewCommentId)}
              ></DeleteForeverIcon>
            </Box>
          ))}
        </Box>

        {/* <Box className="group-comments-list">
          {review.reviewCommentList.map((comment, index) => (
            <Box key={index} className="group-comment-item">
              <Typography variant="body2" className="group-comment-content">
                {comment.commentContent}
              </Typography>
              <Typography variant="caption" className="group-comment-date">
                {formatDate(comment.rcCreatedAt)}
              </Typography>
            </Box>
          ))}
        </Box> */}

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
