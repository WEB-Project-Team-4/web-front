import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../assets/styles/Review.css';  

function Modify() {
    const location = useLocation();
    const navigate = useNavigate();
  const [reviewData, setReviewData] = useState({
    id: null,
    title: '',
    content: '',
    relatedMeeting: '예시 모임 이름',  // 연관 모임 이름을 가져오는 로직이 필요할 수 있음
  });

  // URL 쿼리 파라미터에서 ID를 가져오기
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const reviewId = searchParams.get('=');
    if (reviewId) {
      // 서버나 데이터 소스로부터 데이터를 가져온다고 가정
      fetchReviewData(reviewId);
    }
  }, [location.search]);

  // 특정 ID의 데이터를 가져와서 상태를 설정하는 함수
  const fetchReviewData = (id) => {
    // 여기에 서버나 데이터 소스로부터 리뷰 정보를 불러오는 로직을 추가합니다
    // 예를 들어, `fetch` 또는 `axios`를 사용할 수 있습니다.
    // 임시로 데이터를 설정하는 코드입니다:
    setReviewData({
      id: id,
      title: `후기 제목 ${id}`,
      content: `후기 내용 ${id}`,
      relatedMeeting: '예시 모임 이름', // 실제 연관 모임 이름을 가져오는 로직으로 교체
    });
  };

  // 수정하기 버튼에서 navigate 사용
  const handleUpdate = () => {
    console.log('수정 완료:', reviewData);
    navigate('/review');  // 수정 후 리뷰 목록으로 이동
  };

  // 데이터 삭제 처리 함수
  // 삭제하기 버튼에서 navigate 사용
  const handleDelete = () => {
    console.log('삭제 완료:', reviewData.id);
    navigate('/my/review');  // 삭제 후 리뷰 목록으로 이동
  };

  // 수정취소 버튼에서 이전 페이지로 돌아가기
  const handleCancel = () => {
    navigate(-1);  // 이전 페이지로 돌아가기
  };

  // 입력 핸들러 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="modify-container">
      <h2>후기 수정 페이지</h2>
      
      <div className="form-group">
        <label>제목</label>
        <input
          type="text"
          name="title"
          value={reviewData.title}
          onChange={handleChange}
          className="input-title"
        />
      </div>
      
      <div className="form-group">
        <label>본문 작성란</label>
        <textarea
          name="content"
          value={reviewData.content}
          onChange={handleChange}
          className="input-content"
          rows="25"
        />
      </div>
      
      <div className="form-group">
      <p>작성 중인 모임 : {reviewData.relatedMeeting}  {/* 연관 모임 이름 */}</p>
        
      </div>

      <div className="modify-button-group">
        <button onClick={handleDelete} className="delete-button left">삭제하기</button>
        <div className="right">
          <button onClick={handleCancel} className="cancel-button">수정취소</button>
          <button onClick={handleUpdate} className="update-button">수정하기</button>
        </div>
      </div>
    </div>
  );
}

export default Modify;
