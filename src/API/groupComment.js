import axios from "axios";

/**
 * 댓글 등록
 */
export const registComment = async ({ groupId, commentContent }) => {
  const path = process.env.REACT_APP_API_BASE_URL + `group/comment`;
  // 쿼리 매개변수 설정
  const params = {
    groupId: groupId,
    commentContent: commentContent,
  };
  // 요청 보내기
  const response = await axios.post(path, params, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });
  console.log(response);
  return response.status; // 데이터 반환
};

/**
 * 모임 댓글 삭제
 * @param {*} commentId
 * @returns
 */
export const fetchRemoveGroupComment = async (commentId, groupId) => {
  // 요청 경로 설정
  const path = process.env.REACT_APP_API_BASE_URL + `group/comment`;
  try {
    // 요청 보내기
    const response = await axios.delete(path, {
      data: {
        commentId: commentId,
        groupId: groupId,
      },
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });
    return response.status; // 데이터 반환
  } catch (error) {
    console.error(`Failed to remove comment`, error);
    throw error; // 에러 다시 던지기
  }
};
