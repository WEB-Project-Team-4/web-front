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
  const response = await axios.post(
    path,
    { params },
    {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      // withCredentials: true,
    }
  );
  console.log(response);
  return response.status; // 데이터 반환
};
