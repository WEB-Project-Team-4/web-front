import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../../assets/styles/My.css";
import CardItem from "../../components/CardItem";
import defaultImg from "../../img/card_test.jpg";
import { fetchMyGroups } from "../../API/groupMy";

function Group() {
  const [filter, setFilter] = useState("myMeetings");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  // const itemsPerPage = 5;

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  const [cards, setCards] = useState([]); // 서버에서 가져온 그룹 데이터
  const cardsPerPage = 6; // 페이지당 카드 수

  // 현재 페이지에 표시할 카드 항목 계산
  const startIndex = (page - 1) * cardsPerPage;
  const displayedCards = cards.slice(startIndex, startIndex + cardsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMyGroups(
          {
            currentPage: page,
            pageSize: cardsPerPage,
          },
          filter
        );

        setCards(data.list); // 그룹 데이터 추출
        setTotalPages(data.totalPages); // 전체 페이지 수 설정
      } catch (error) {
        console.error("모임 조회에 실패했습니다!", error);
      }
    };

    fetchData();
  }, [page, filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // const mockData = {
  //   myMeetings: [
  //     { id: 1, title: "내가 만든 모임 1", description: "모임 1 설명" },
  //     { id: 2, title: "내가 만든 모임 2", description: "모임 2 설명" },
  //   ],
  //   participating: [
  //     { id: 3, title: "참여중인 모임 1", description: "모임 3 설명" },
  //     { id: 4, title: "참여중인 모임 2", description: "모임 4 설명" },
  //   ],
  //   pastMeetings: [
  //     { id: 5, title: "지난 모임 1", description: "모임 5 설명" },
  //     { id: 6, title: "지난 모임 2", description: "모임 6 설명" },
  //   ],
  //   likedMeetings: [
  //     {
  //       id: 7,
  //       title: "좋아요 한 모임 1",
  //       description: "모임 7 설명",
  //       participated: false,
  //       myMeeting: false,
  //     },
  //     {
  //       id: 8,
  //       title: "좋아요 한 모임 2",
  //       description: "모임 8 설명",
  //       participated: true,
  //       myMeeting: false,
  //     },
  //     {
  //       id: 9,
  //       title: "좋아요 한 모임 3",
  //       description: "모임 9 설명",
  //       participated: false,
  //       myMeeting: true,
  //     },
  //   ],
  // };

  // const currentData = mockData[filter] || [];
  // const totalPages = Math.ceil(currentData.length / itemsPerPage);
  // const currentPageData = currentData.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  const renderMenuItems = (meeting) => {
    switch (filter) {
      case "myMeetings":
        return (
          <>
            <MenuItem onClick={() => handleMenuAction("edit")}>
              수정하기
            </MenuItem>
            <MenuItem onClick={() => handleMenuAction("delete")}>
              삭제하기
            </MenuItem>
          </>
        );
      case "participating":
        return (
          <MenuItem onClick={() => handleMenuAction("leave")}>나가기</MenuItem>
        );
      case "pastMeetings":
        return (
          <MenuItem onClick={() => handleMenuAction("writeReview")}>
            후기 작성
          </MenuItem>
        );
      case "likedMeetings":
        if (meeting.myMeeting) {
          return (
            <>
              <MenuItem onClick={() => handleMenuAction("edit")}>
                수정하기
              </MenuItem>
              <MenuItem onClick={() => handleMenuAction("delete")}>
                삭제하기
              </MenuItem>
            </>
          );
        }
        if (meeting.participated) {
          return (
            <MenuItem onClick={() => handleMenuAction("leave")}>
              나가기
            </MenuItem>
          );
        }
        return (
          <MenuItem onClick={() => handleMenuAction("participate")}>
            참여하기
          </MenuItem>
        );
      default:
        return null;
    }
  };

  return (
    <Box className="mypage-container">
      <Box className="content">
        {/* 필터 바 */}
        <Box className="filter-bar">
          <Button
            onClick={() => handleFilterChange("myMeetings")}
            className={filter === "myMeetings" ? "active" : ""}
          >
            내가 만든 모임
          </Button>
          <Button
            onClick={() => handleFilterChange("participating")}
            className={filter === "participating" ? "active" : ""}
          >
            참여중인 모임
          </Button>
          <Button
            onClick={() => handleFilterChange("pastMeetings")}
            className={filter === "pastMeetings" ? "active" : ""}
          >
            지난 참여 모임
          </Button>
          <Button
            onClick={() => handleFilterChange("likedMeetings")}
            className={filter === "likedMeetings" ? "active" : ""}
          >
            좋아요 한 모임
          </Button>
        </Box>

        {/* 카드 컴포넌트 사용 */}
        <Box className="card-container">
          <Grid container spacing={2} columns={12}>
            {/* 카드 데이터 렌더링 */}
            {cards.map((cardItem, index) => (
              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                key={cardItem.group.groupId || `card-${index}`}
              >
                <CardItem
                  to={`/group/detail/${cardItem.group.groupId}`}
                  category={cardItem.categoryName}
                  location={`${cardItem.group.city}`}
                  title={cardItem.group.groupName}
                  date={
                    cardItem.dday === 0
                      ? "오늘"
                      : cardItem.dday > 0
                      ? `D-${cardItem.dday}`
                      : `D+${Math.abs(cardItem.dday)}`
                  }
                  description={cardItem.group.introText}
                  people={`${cardItem.group.participationCount}/${cardItem.group.groupLimit}`}
                  comments={cardItem.group.commentCount}
                  imageUrl={
                    cardItem.group.groupImg === null
                      ? defaultImg
                      : cardItem.group.groupImg
                  }
                  curBookMark={
                    cardItem.isCurUserFavorite === "Y" ? true : false
                  }
                  groupId={cardItem.group.groupId}
                  // recruitText={isRecruiting ? "모집중" : "모집마감"}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 필터 상태에 따른 카드
        <Box className="meeting-cards">
          {currentPageData.length === 0 ? (
            <Typography>데이터가 없습니다.</Typography>
          ) : (
            currentPageData.map((meeting) => (
              <Box key={meeting.id} className="meeting-card">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box flexGrow={1} display="flex" justifyContent="center">
                    <Typography variant="h6" align="center">
                      {meeting.title}
                    </Typography>
                  </Box>
                  <IconButton onClick={(e) => handleClick(e, meeting.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2">{meeting.description}</Typography>
                <Link
                  to={`/group/detail/${meeting.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="outlined">상세보기</Button>
                </Link>
                <Menu
                  anchorEl={anchorEl}
                  open={selectedMeetingId === meeting.id}
                  onClose={handleClose}
                >
                  {renderMenuItems(meeting)}
                </Menu>
              </Box>
            ))
          )}
        </Box> */}

        <Box className="pagination-box">
          <Pagination
            count={totalPages}
            shape="rounded"
            page={page}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#7F86EC",
                fontSize: "1.2rem",
                minWidth: "48px",
                minHeight: "48px",
                padding: "8px",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#7F86EC",
                color: "#fff",
              },
              "& .MuiPaginationItem-root:hover": {
                backgroundColor: "rgba(127, 134, 236, 0.1)",
              },
            }}
          />
        </Box>

        {/* 페이지네이션 */}
        {/* <Box className="pagination">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            이전
          </Button>
          <Typography>{`${currentPage} / ${totalPages}`}</Typography>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            다음
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
}

export default Group;
