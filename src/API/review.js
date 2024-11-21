// src/API/review.js
import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// axios.post(process.env.REACT_APP_API_BASE_URL + 'register/send-code', { email } , {
//   withCredentials: true, // 이 옵션을 설정하여 쿠키와 인증 정보를 함께 보냄
// })

// 이미지 업로드 API
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(
    API_BASE_URL + "api/review/image-upload",
    formData,
    { withCredentials: true },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

/**
 * 서버로 리뷰데이터를 요청하는 함수
 * @param {Object} options 요청 옵션 (카테고리, 페이지 번호, 페이지 크기, 검색어, 지역, 모집 중 여부 등)
 * @returns {Promise} 서버에서 반환된 데이터
 */
export const fetchReviews = async ({
  category = "전체",
  currentPage = 1,
  pageSize = 6,
  searchParam = "",
  city = "all",
  district = "all",
}) => {
  // 경로 동적으로 설정
  // const path = `/group/${category}/${currentPage}/${pageSize}`;
  const path =
    API_BASE_URL + `review/main/${category}/${currentPage}/${pageSize}`;
  // 쿼리 매개변수 설정
  const params = {
    // searchParam: searchParam || undefined, // 검색어
    // loc: loc || undefined, // 지역
    searchParam: searchParam || undefined, // 검색어
    city: city,
    district: district,
  };
  // 요청 보내기
  const response = await axios.get(path, { params });
  console.log(response);
  return response.data; // 데이터 반환
};

/**
 * 서버로 리뷰할 그룹 데이터를 요청하는 함수
 * @param {Object} options 요청 옵션 (카테고리, 페이지 번호, 페이지 크기, 검색어, 지역, 모집 중 여부 등)
 * @returns {Promise} 서버에서 반환된 데이터
 */
export const fetchReviewGroups = async ({ currentPage = 1, pageSize = 9 }) => {
  // 요청 경로 설정
  const path = API_BASE_URL + `review/find/${currentPage}/${pageSize}`;
  try {
    // 요청 보내기

    const response = await axios.get(path, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });
    console.log(response.data);
    return response.data; // 데이터 반환
  } catch (error) {
    console.error(`Failed to fetch review groups`, error);
    throw error; // 에러 다시 던지기
  }
};

/**
 * 서버로 그룹에 따른 리뷰 작성 페이지 오픈하는 함수
 * @param {string | number} groupId - 등록할 리뷰 그룹의 ID
 * @returns {Promise} 서버에서 반환된 데이터
 */
export const fetchOpenRegistReveiw = async (groupId) => {
  // 요청 경로 설정
  const path = API_BASE_URL + `review/regist/${groupId}`;
  try {
    // 요청 보내기
    const response = await axios.get(path, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });
    return response.data; // 데이터 반환
  } catch (error) {
    console.error(`Failed to open review regist page`, error);
    throw error; // 에러 다시 던지기
  }
};

/**
 * 서버로 그룹에 따른 리뷰 작성 페이지 등록하는 함수
 * @param {int} reviewGroupId - 등록할 리뷰 그룹의 ID
 * @param {string} reviewTitle - 등록할 리뷰 제목
 * @param {string} reviewContent - 등록할 리뷰 내용
 * @param {Array} reviewImgList - 등록할 리뷰 이미지URL들
 * @returns {Promise} 서버에서 반환된 데이터
 */
export const fetchRegistReveiw = async ({
  reviewGroupId,
  reviewTitle,
  reviewContent,
  reviewImgList = [],
}) => {
  // 요청 경로 설정
  const path = API_BASE_URL + `review/regist/${reviewGroupId}`;
  const body = {
    reviewGroupId,
    reviewTitle,
    reviewContent,
    reviewImgList: reviewImgList.map((url) => ({ reviewImgUrl: url })),
  };

  /*
const reviewImgList = [
  "https://example.com/img1.jpg",
  "https://example.com/img2.jpg",
  "https://example.com/img3.jpg"
];
  */
  console.log(body);
  try {
    // 요청 보내기
    const response = await axios.post(path, body, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });
    return response.data; // 데이터 반환
  } catch (error) {
    console.error(`Failed to fetch review regist`, error);
    throw error; // 에러 다시 던지기
  }
};

/**
 * 서버로 그룹에 따른 리뷰 수정 페이지로 이동하는 함수
 * @param {string | number} reviewId - 등록할 리뷰 그룹의 ID
 * @returns {Promise} 서버에서 반환된 데이터
 */
export const fetchOpenModifyReveiw = async (reviewId) => {
  // 요청 경로 설정
  const path = API_BASE_URL + `review/modify/${reviewId}`;
  try {
    // 요청 보내기
    const response = await axios.get(path, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });
    return response.data; // 데이터 반환
  } catch (error) {
    console.error(`Failed to open review modify page`, error);
    throw error; // 에러 다시 던지기
  }
};

/**
 * 서버로 그룹에 따른 리뷰 수정 등록하는 함수
 * @param {int} reviewGroupId - 등록할 리뷰 그룹의 ID
 * @param {string} reviewTitle - 등록할 리뷰 제목
 * @param {string} reviewContent - 등록할 리뷰 내용
 * @param {Array} reviewImgList - 등록할 리뷰 이미지URL들
 * @returns {Promise} 서버에서 반환된 데이터
 */
export const fetchModifyReveiw = async ({
  reviewGroupId,
  reviewId,
  reviewTitle,
  reviewContent,
  reviewImgList = [],
}) => {
  // 요청 경로 설정
  const path = API_BASE_URL + `review/modify/${reviewId}`;
  const body = {
    reviewGroupId,
    reviewTitle,
    reviewContent,
    reviewImgList: reviewImgList.map((url) => ({ reviewImgUrl: url })),
  };

  /*
  const reviewImgList = [
    "https://example.com/img1.jpg",
    "https://example.com/img2.jpg",
    "https://example.com/img3.jpg"
  ];
    */

  try {
    // 요청 보내기
    const response = await axios.put(path, body, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });
    return response.status; // 응답 코드 반환
  } catch (error) {
    console.error(`Failed to fetch review modify`, error);
    throw error; // 에러 다시 던지기
  }
};

/**************리뷰 상세 페이지 관련 *************/
/**
 * 리뷰 상세페이지 이동하는 함수
 * @param {string | number} reviewId - 이동할 리뷰 ID
 * @returns {Promise} 서버에서 반환된 데이터
 */
export const fetchReviewDetail = async (reviewId) => {
  // 요청 경로 설정
  const path = API_BASE_URL + `review/detail/${reviewId}`;
  console.log(path);
  try {
    // 요청 보내기
    const response = await axios.get(path, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });
    console.log(response.data);
    return response.data; // 데이터 반환
  } catch (error) {
    console.error(`Failed to fetch review detail page`, error);
    throw error; // 에러 다시 던지기
  }
};

/**
 * 리뷰 삭제하는 함수
 * @param {string | number} reviewId - 삭제할 리뷰 ID
 * @returns {Promise} 서버에서 반환된 데이터
 */
export const fetchRemoveReview = async (reviewId) => {
  // 요청 경로 설정
  const path = API_BASE_URL + `review/detail/${reviewId}`;
  try {
    // 요청 보내기
    const response = await axios.delete(path, {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });
    return response.status; // 데이터 반환
  } catch (error) {
    console.error(`Failed to remove review`, error);
    throw error; // 에러 다시 던지기
  }
};

/**
 * 리뷰 댓글 등록
 * @param {int} reviewId - 댓글 등록할 리뷰 아이디
 * @param {string} commentContent - 댓글 내용
 * @returns {Promise} 서버에서 반환된 데이터
 */
export const fetchRegistReveiwComment = async ({
  reviewId,
  commentContent,
}) => {
  // 요청 경로 설정
  const path =
    process.env.REACT_APP_API_BASE_URL + `review/detail/comment/${reviewId}`;

  try {
    // 요청 보내기
    const response = await axios.post(path, null, {
      params: {
        commentContent: commentContent,
      },
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });
    return response.status; // 데이터 반환
  } catch (error) {
    console.error(`Failed to regist review comment`, error);
    throw error; // 에러 다시 던지기
  }
};

// /**
//  * 리뷰 댓글 수정
//  * @param {int} reviewCommentId - 수정할 댓글 아이디
//  * @param {string} commentContent - 댓글 내용
//  * @returns {Promise} 서버에서 반환된 데이터
//  */
// export const fetchModifyReveiwComment = async ({
//   reviewCommentId,
//   commentContent,
// }) => {
//   // 요청 경로 설정
//   const path = `review/detail/comment/${reviewCommentId}`;
//   const param = {
//     commentContent,
//   };

//   try {
//     // 요청 보내기
//     const response = await axiosInstance.put(path, param);
//     return response.data; // 데이터 반환
//   } catch (error) {
//     console.error(`Failed to modify review comment`, error);
//     throw error; // 에러 다시 던지기
//   }
// };

/**
 * 리뷰 댓글 삭제하는 함수
 * @param {string | number} reviewCommentId - 삭제할 리뷰 댓글 아이디
 * @returns {Promise} 서버에서 반환된 데이터
 */
export const fetchRemoveReviewComment = async (reviewCommentId) => {
  // 요청 경로 설정
  const path =
    process.env.REACT_APP_API_BASE_URL +
    `review/detail/comment/${reviewCommentId}`;
  try {
    // 요청 보내기
    const response = await axios.delete(path, null, {
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

// /**
//  * 리뷰 대댓글 등록
//  * @param {int} reviewCommentId - 대댓글 등록할 리뷰 댓글 아이디
//  * @param {string} recommentContent - 대댓글 내용
//  * @returns {Promise} 서버에서 반환된 데이터
//  */
// export const fetchRegistReveiwRecomment = async ({
//   reviewCommentId,
//   recommentContent,
// }) => {
//   // 요청 경로 설정
//   const path = `review/detail/recomment/${reviewCommentId}`;
//   const param = {
//     recommentContent,
//   };

//   try {
//     // 요청 보내기
//     const response = await axiosInstance.post(path, param);
//     return response.data; // 데이터 반환
//   } catch (error) {
//     console.error(`Failed to fetch recomment regist`, error);
//     throw error; // 에러 다시 던지기
//   }
// };

// /**
//  * 리뷰 대댓글 수정
//  * @param {int} reviewRecommentId - 수정할 대댓글 아이디
//  * @param {string} recommentContent - 대댓글 내용
//  * @returns {Promise} 서버에서 반환된 데이터
//  */
// export const fetchModifyReveiwRecomment = async ({
//   reviewRecommentId,
//   recommentContent,
// }) => {
//   // 요청 경로 설정
//   const path = `review/detail/recomment/${reviewRecommentId}`;
//   const param = {
//     recommentContent,
//   };

//   try {
//     // 요청 보내기
//     const response = await axiosInstance.put(path, param);
//     return response.data; // 데이터 반환
//   } catch (error) {
//     console.error(`Failed to modify recomment`, error);
//     throw error; // 에러 다시 던지기
//   }
// };

// /**
//  * 리뷰 대댓글 삭제하는 함수
//  * @param {string | number} reviewRecommentId - 삭제할 리뷰 대댓글 아이디
//  * @returns {Promise} 서버에서 반환된 데이터
//  */
// export const fetchRemoveReviewRecomment = async (reviewRecommentId) => {
//   // 요청 경로 설정
//   const path = `review/detail/recomment/${reviewRecommentId}`;
//   try {
//     // 요청 보내기
//     const response = await axiosInstance.delete(path);
//     return response.data; // 데이터 반환
//   } catch (error) {
//     console.error(`Failed to remove recomment`, error);
//     throw error; // 에러 다시 던지기
//   }
// };
