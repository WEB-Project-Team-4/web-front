import axios from "axios";

/**
 * 서버로 그룹 데이터를 요청하는 함수
 * @param {Object} options 요청 옵션 (카테고리, 페이지 번호, 페이지 크기, 검색어, 지역, 모집 중 여부 등)
 * @returns {Promise} 서버에서 반환된 데이터
 */
export const fetchMyGroups = async (
  { currentPage = 1, pageSize = 9 },
  filter
) => {
  const path =
    process.env.REACT_APP_API_BASE_URL +
    (filter === "myMeetings"
      ? `group/my/${currentPage}/${pageSize}`
      : filter === "participating"
      ? `group/my-participation/${currentPage}/${pageSize}`
      : filter === "pastMeetings"
      ? `group/my-participation-past/${currentPage}/${pageSize}`
      : `group/my-like/${currentPage}/${pageSize}`);

  // 요청 보내기
  const response = await axios.get(path, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });
  console.log(response);
  return response.data; // 데이터 반환
};
