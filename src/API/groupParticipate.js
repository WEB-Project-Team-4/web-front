import axios from "axios";

/**
 * 참가 신청
 */
export const registParticipation = async ({ groupId }) => {
  const path = process.env.REACT_APP_API_BASE_URL + `group/join`;
  const token = localStorage.getItem("token");
  console.log(token);
  // 쿼리 매개변수 설정
  const params = {
    groupId: groupId,
  };
  // 요청 보내기
  try {
    const response = await axios.post(path, params, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });
    // console.log(response);
    return response.status; // 데이터 반환
  } catch (err) {
    return err.status;
  }
};

export const registNotParticipation = async ({ groupId }) => {
  const path = process.env.REACT_APP_API_BASE_URL + `group/join`;
  const token = localStorage.getItem("token");
  console.log(token);
  // 쿼리 매개변수 설정
  const params = {
    groupId: groupId,
  };
  // 요청 보내기
  try {
    const response = await axios.delete(path, {
      data: params,
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });
    // console.log(response);
    return response.status; // 데이터 반환
  } catch (err) {
    return err.status;
  }
};
