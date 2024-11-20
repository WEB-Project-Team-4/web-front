import axios from "axios";

// 수정 전 기존 정보를 불러오는 api 함수
export const getGroupDetailForModify = async (groupId) => {
  // 경로 동적으로 설정
  const path = process.env.REACT_APP_API_BASE_URL + `group/update/${groupId}`;

  // 요청 보내기
  const response = await axios.get(path, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });
  return response.data; // 데이터 반환
};

// 모임 수정
export const updateGroup = async (params, fileImg) => {
  const path = process.env.REACT_APP_API_BASE_URL + `group/update`;

  const formData = new FormData();
  formData.append(
    "group",
    new Blob([JSON.stringify(params)], { type: "application/json" })
  );

  formData.append("fileImg", fileImg);

  try {
    const response = await axios.put(path, formData, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log(response);

    return response.status;
  } catch (error) {
    alert("수정에 실패했습니다");
    throw error;
  }

  // "categoryId": 100,
  //   "groupName": "스터디 그룹100",
  //   "introText": "컴퓨터 공학 스터디",
  //   "groupContent": "자세한 스터디 내용2",
  //   "groupLimit": 10,
  //   "groupDate": "2024-11-14T04:31:25.000+00:00",
  //   "closeDate": "2024-11-14T04:42:26.000+00:00",
  //   "city": "Seoul",
  //   "district": "Gwanak",
  //   "detailAddr": "서울특별시 관악구",
  //   "groupImg": "default url"
};
