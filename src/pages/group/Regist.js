import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../../assets/styles/Group.css';
import '../../assets/styles/General.css';

const GroupRegist = () => {
  const [formData, setFormData] = useState({
    recruitmentName: '',
    description: '',
    category: '',
    representativeImage: null,
    location: '',
    maxParticipants: '',
    startDate: '',
    endDate: '',
    detailedInfo: '',
  });

  const navigate = useNavigate();  // Declare useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, representativeImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <div className="regist-main-container ">
      <div className="general-form-title">모임등록</div>
      <span><span style={{ color: 'red' } }>*</span>표기는 필수입력입니다.</span>

      <form onSubmit={handleSubmit}>
        <div className="group-regist-row  regist-group-spacing regist-group-up-spacing ">
          <label className='regist-group-label'>모집명(20자 이내) <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="recruitmentName"
            maxLength="20"
            value={formData.recruitmentName}
            onChange={handleChange}
            required
            className="input-long" /* 추가된 클래스 */
          />
        </div>

        <div className="regist-group-input-field  regist-group-spacing">
          <label className='regist-group-label '>소개글(25자 이내)<span style={{ color: 'red' }}>*</span></label>
          <textarea
            name="description"
            maxLength="25"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="group-grid-container">
          {/* 모임 카테고리 */}
          <div className="group-grid-item">
            <label>모임 카테고리<span style={{ color: 'red' }}>*</span></label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">선택</option>
              <option value="스터디">스터디</option>
              <option value="스포츠">스포츠</option>
              <option value="음식">음식</option>
              <option value="기타">기타</option>
            </select>
          </div>

          {/* 대표이미지 */}
          <div className="group-grid-item">
            <label>대표이미지</label>
            <input type="file" onChange={handleFileChange} />
          </div>

          {/* 모임 장소 */}
          <div className="group-grid-item">
            <label>모임 장소</label>
            <button type="button">지도 또는 주소 찾기</button>
          </div>

          {/* 최대참여인원 */}
          <div className="group-grid-item">
            <label>최대참여인원<span style={{ color: 'red' }}>*</span></label>
            <input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              required
            />
          </div>

          {/* 모집 마감 일시 */}
          <div className="group-grid-item regist-group-spacing">
            <label>모집 마감 일시</label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>

          {/* 모임 일시 */}
          <div className="group-grid-item regist-group-spacing">
            <label>모임 일시</label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
        </div>


        <div className="regist-group-input-field  regist-group-spacing">
          <label className='regist-group-label'>상세내용<span style={{ color: 'red' }}>*</span></label>
          <textarea
            name="detailedInfo"
            value={formData.detailedInfo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="regist-group-buttons">
          <button
            type="button"
            onClick={() => navigate(-1)}  // This will navigate to the previous page
          >
            작성취소
          </button>
          <button type="submit">작성완료</button>
        </div>
      </form>
    </div>
  );
};

export default GroupRegist;
