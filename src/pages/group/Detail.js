// /group/detail/{groupId}
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Divider,
  Avatar,
  Button,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import defaultImg from "../../img/group_default_img.jpg";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  deleteGroup,
  fetchGroupDetail,
  likeGroup,
  unlikeGroup,
} from "../../API/group"; // 추가한 API 함수 import
import { fetchRemoveGroupComment, registComment } from "../../API/groupComment"; // API 요청 함수 import
import {
  registNotParticipation,
  registParticipation,
} from "../../API/groupParticipate";
import "../../assets/styles/Group.css";
import { UserContext } from "../../context/UserContext";

function GroupDetailPage() {
  const { groupId } = useParams(); // URL 파라미터에서 groupId 추출
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // 상태 관리
  const [groupDetail, setGroupDetail] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [isChange, setIsChange] = useState(false);
  const [leaderName, setLeaderName] = useState("");
  const [isParticipation, setIsParticipation] = useState("");

  // 서버 데이터 로드
  useEffect(() => {
    const loadGroupDetail = async () => {
      try {
        const data = await fetchGroupDetail(groupId);
        setGroupDetail(data.groupDetailVO.group);
        setComments(data.groupDetailVO.groupCommentList || []);
        setMembers(data.groupDetailVO.members || []);
        setIsBookmarked(data.isLike === "Y"); // 북마크 여부
        setCategoryName(data.categoryName);
        setLeaderName(data.groupLeaderName);
        setIsParticipation(data.isParticipation);
        setIsChange(false);
      } catch (error) {
        console.error("Failed to load group detail:", error);
        alert("해당 페이지가 삭제되었거나, 찾을 수 없습니다.");
        navigate("/"); // 에러 발생 시 에러 페이지로 이동
      }
    };

    loadGroupDetail();
  }, [groupId, navigate, isChange, isBookmarked]);

  const isMenuOpen = Boolean(anchorEl);

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다."); // 혹은 다른 안내 메시지
      return; // Token이 없으므로 함수 실행 중단
    }

    if (newComment.trim() === "") return;

    await registComment({
      groupId: groupId,
      commentContent: newComment,
    });

    // const newCommentObj = {
    //   author: "현재 사용자",
    //   content: newComment,
    //   createdAt: new Date().toLocaleString(),
    // };
    // setComments([...comments, newCommentObj]);

    setIsChange(true);
    setNewComment("");
  };

  // 댓글 삭제
  const handleCommentRemove = async (commentId, commentWriterId) => {
    console.log(commentWriterId);
    const response = await fetchRemoveGroupComment(
      commentId,
      groupId,
      commentWriterId
    );

    if (response.status === 405) {
      alert("삭제 권한이 없습니다.");
    } else if (response.status === 200) {
      alert("댓글이 삭제되었습니다.");
    }
    setIsChange(true);
  };

  // const toggleBookmark = () => {
  //   setIsBookmarked(!isBookmarked);
  // };

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

  const handleGroupDelete = async () => {
    const response = await deleteGroup({
      groupId: groupId,
    });

    if (response.status == 200) {
      alert("모임이 삭제되었습니다.");
      navigate("/");
    } else if (response.status == 405) {
      alert("삭제 권한이 없습니다");
      navigate("/");
    } else {
      alert("삭제에 실패했습니다.");
      navigate("/");
    }
  };

  const handleParticipation = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다."); // 혹은 다른 안내 메시지
      return; // Token이 없으므로 함수 실행 중단
    } else if (groupDetail.groupLimit <= groupDetail.participationCount) {
      alert("최대 참석 인원을 초과할 수 없습니다!");
      return;
    }

    const status = await registParticipation({
      groupId: groupId,
    });

    if (status == 200) {
      alert("참가 성공");
      setIsChange(true);
    } else if (status == 208) {
      alert("이미 참가한 모임입니다");
    } else {
      alert("참여에 실패했습니다.");
    }
  };

  const handleNotParticipation = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다."); // 혹은 다른 안내 메시지
      return; // Token이 없으므로 함수 실행 중단
    }
    const status = await registNotParticipation({
      groupId: groupId,
    });

    if (status == 200) {
      alert("참가를 취소했습니다.");
      setIsChange(true);
    } else {
      alert("참가 취소에 실패했습니다.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString); // ISO 형식을 Date 객체로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`; // 원하는 형식으로 반환
  };

  const toggleBookmark = async (e) => {
    e.preventDefault(); // 링크 이동 방지
    e.stopPropagation(); // 이벤트 전파 방지

    if (groupId !== 0 && isBookmarked) {
      // true였을 경우, 좋아요 취소 api 호출
      const response = await unlikeGroup(groupId);
      if (response == 200) {
        alert("좋아요가 해제되었습니다.");
      } else if (response == 405) {
        alert("로그인 후 이용 가능합니다.");
      }
    } else if (groupId !== 0 && !isBookmarked) {
      // false였을 경우, 좋아요 등록 api 호출
      const response = await likeGroup(groupId);
      if (response == 200) {
        alert("좋아요가 등록되었습니다.");
      } else if (response == 405) {
        alert("로그인 후 이용 가능합니다.");
      }
    }

    setIsBookmarked(!isBookmarked);
  };

  // UI 렌더링 조건 확인
  if (!groupDetail) {
    return <Typography>Loading...</Typography>; // 로딩 상태
  }

  return (
    <Box className="group-detail-container">
      {/* 상단 바 */}
      <Box className="group-detail-header group-detail-container-padding ">
        <Box className="group-header-left">
          <Typography variant="h6" className="group-category">
            {categoryName} {/* 카테고리 표시 */}
          </Typography>
          <Typography variant="caption" className="group-category-id">
            #{groupDetail.groupId}
          </Typography>
        </Box>

        <Box className="group-header-center">
          {/* <IconButton onClick={toggleBookmark} className="group-bookmarkIconBorder">
            <BookmarkBorderIcon />
          </IconButton> */}
          {user && (
            <IconButton
              onClick={toggleBookmark}
              className="group-bookmarkIconBorder"
            >
              {isBookmarked ? (
                <BookmarkIcon className="group-bookmarked" />
              ) : (
                <BookmarkBorderIcon />
              )}
            </IconButton>
          )}

          {user && isBookmarked && (
            <BookmarkIcon className="group-bookmarkIcon" />
          )}
          <Typography variant="h6">
            {groupDetail.likeCount}명의 사람들이 좋아하는 모임이에요!
          </Typography>
        </Box>

        <Box className="group-header-right">
          {groupDetail.closeDate && (
            <Typography
              variant="caption"
              className="group-header-end-date-padding"
            >
              {/* 마감일시 */}
              {/* {formatDate(groupDetail.closeDate)} */}
              {"마감일시" +
                " " +
                new Date(groupDetail.closeDate)
                  .toISOString()
                  .slice(0, 16)
                  .split("T")[0] +
                " " +
                new Date(groupDetail.closeDate)
                  .toISOString()
                  .slice(0, 16)
                  .split("T")[1]}
            </Typography>
          )}
          {/* <Box className="group-recruitingBox">모집중</Box> */}
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          {/* 현재 ID와 모임 작성자 ID가 동일한 경우만 뜨게 해야할 듯 */}
          <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
            <MenuItem component={Link} to={`/group/modify/${groupId}`}>
              모임 수정
            </MenuItem>
            <MenuItem onClick={handleGroupDelete}>모임 삭제</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Divider />

      {/* 모임 정보 */}
      <Box className="group-info group-detail-container-padding">
        {/* 왼쪽 절반 */}
        <Box className="group-info-left">
          <Typography variant="h5" className="group-name-detail">
            {groupDetail.groupName}
          </Typography>
          <Typography variant="h6" className="group-short-description">
            {groupDetail.introText}
          </Typography>

          <Box className="group-info-bottom">
            {/* 작성자 정보 */}
            <Box className="group-author-card">
              <Avatar className="group-author-avatar">L</Avatar>
              <Typography variant="body1" className="group-author-name">
                Leader. {leaderName}
              </Typography>
            </Box>
            {/* 모임 일시 및 장소 정보 */}
            <Box className="group-details-info">
              <Box className="group-info-detail-item">
                <CalendarTodayIcon fontSize="small" />
                <Box>
                  <Typography variant="body4">모임 일시 </Typography>
                  <Typography
                    variant="body4 caption"
                    sx={{ color: "#909090", marginLeft: "10px" }}
                  >
                    {/* {formatDate(groupDetail.groupDate)} */}
                    {new Date(groupDetail.groupDate)
                      .toISOString()
                      .slice(0, 16)
                      .split("T")[0] +
                      " " +
                      new Date(groupDetail.groupDate)
                        .toISOString()
                        .slice(0, 16)
                        .split("T")[1]}
                  </Typography>
                </Box>
              </Box>

              <Box className="group-info-detail-item">
                <LocationOnIcon fontSize="small" />
                <Box sx={{ maxWidth: "200px", overflow: "hidden" }}>
                  <Typography variant="body4" sx={{ display: "block" }}>
                    {groupDetail.city === null
                      ? "장소 미정"
                      : groupDetail.detailAddr}{" "}
                    {groupDetail.district}
                  </Typography>
                  <Typography
                    variant="caption"
                    onClick={handleModalOpen}
                    sx={{
                      color: "#909090",
                      cursor: "pointer",
                      textDecoration: "underline",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "block", // 블록 요소로 표시
                      maxWidth: "100%", // 부모 박스의 최대 너비를 사용
                    }}
                  >
                    {groupDetail.detailAddr}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 오른쪽 절반: 썸네일 이미지 */}
        <Box className="group-info-right">
          <Box className="group-thumbnail-container">
            <img
              src={
                groupDetail.groupImg === null ||
                groupDetail.groupImg === "default url"
                  ? defaultImg
                  : groupDetail.groupImg
              }
              alt="모임 썸네일"
              className="group-thumbnail"
            />
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* 모달 구현 */}
      <Dialog
        open={showModal}
        onClose={handleModalClose}
        classes={{ paper: "group-custom-dialog" }}
      >
        <DialogTitle align="center" className="group-dialog-title">
          상세 주소
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{ color: "#333", textAlign: "center", fontWeight: "bold" }}
          >
            {groupDetail.detailAddr}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
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
        <Typography className="group-content-text">
          {groupDetail.groupContent}
        </Typography>
      </Box>

      <Divider />

      {/* 참가자 정보 */}
      <Box className="group-participants group-detail-container-padding">
        <Box className="group-participants-header">
          <PeopleIcon />
          <Typography>
            참가자 {members.length} / {groupDetail.groupLimit}
          </Typography>
          {isParticipation == "N" ? (
            <Button
              variant="contained"
              className="group-join-button"
              sx={{ marginLeft: "auto" }}
              onClick={handleParticipation}
            >
              참가하기
            </Button>
          ) : !user || groupDetail.groupLeaderId !== user.id ? (
            <Button
              variant="contained"
              className="group-join-button"
              sx={{ marginLeft: "auto" }}
              onClick={handleNotParticipation}
            >
              참가취소
            </Button>
          ) : (
            ""
          )}
        </Box>

        <Box className="group-participant-list">
          {members && members.length > 0 ? (
            members
              .slice(0, showAllMembers ? members.length : 4)
              .map((member, index) => (
                <Box key={member.id} className="group-participant">
                  <Avatar>{member.nickname.charAt(0)}</Avatar>
                  <Typography variant="body2">{member.nickname}</Typography>
                </Box>
              ))
          ) : (
            <Typography>참가자가 없습니다.</Typography>
          )}
        </Box>

        {members.length > 4 && (
          <Button
            className="group-toggle-button"
            onClick={() => setShowAllMembers(!showAllMembers)}
          >
            {showAllMembers ? "줄이기" : "더보기"}
          </Button>
        )}
      </Box>

      <Divider />

      {/* 댓글 섹션 */}
      <Box className="group-comments-container group-detail-container-padding">
        <Typography className="group-comments-title">
          댓글 {comments.length}개
        </Typography>

        <Box className="group-comments-list">
          {comments.map((comment, index) => (
            <Box key={index} className="group-comment-item">
              <Box
                className="group-author-container"
                sx={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Avatar></Avatar>
                <Typography variant="body2" className="group-comment-author">
                  {comment.writerNickname}
                </Typography>
              </Box>
              <Typography variant="body2" className="group-comment-content">
                {comment.commentContent}
              </Typography>
              <Typography variant="caption" className="group-comment-date">
                {formatDate(comment.createdAt)}
              </Typography>
              <DeleteForeverIcon
                color="disabled"
                fontSize="small"
                sx={{ marginLeft: "10px" }}
                onClick={() =>
                  handleCommentRemove(comment.commentId, comment.id)
                }
              ></DeleteForeverIcon>
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
