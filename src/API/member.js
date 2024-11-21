import axios from "axios";

export const getUserInfo = async () => {
  const path = process.env.REACT_APP_API_BASE_URL + `my/get-member-info`;

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
