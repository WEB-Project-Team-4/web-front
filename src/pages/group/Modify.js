import React, { useState } from 'react';
import '../../assets/styles/Group.css';
import '../../assets/styles/General.css';

const GroupModify = () => {
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
    <div className="regist-main-container">
        <div className="general-form-title">모임수정</div>
        <span><span style={{ color: 'red' }}>*</span>표기는 필수입력입니다.</span>
      
      <form onSubmit={handleSubmit}>
        <div className="general-row">
          <label className='regist-group-label'>모임명(20자 이내) *</label>
          <input
            type="text"
            name="recruitmentName"
            maxLength="20"
            value={formData.recruitmentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="regist-group-input-field">
          <label className='regist-group-label'>소개글(25자 이내)</label>
          <textarea
            name="description"
            maxLength="25"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="regist-group-row">
          <div className="regist-group-input-field">
            <label className='regist-group-label'>모임 카테고리</label>
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
          <div className="regist-group-input-field">
          <label className='regist-group-label'>대표이미지</label>
            <input type="file" onChange={handleFileChange} />
          </div>
        </div>

        <div className="regist-group-row">
          <div className="regist-group-input-field">
            <label className='regist-group-label'>모임 장소</label>
            <button type="button">지도 또는 주소 찾기</button>
          </div>
          <div className="regist-group-input-field">
            <label className='regist-group-label'>최대참여인원</label>
            <input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="regist-group-row">
          <div className="regist-group-input-field">
            <label className='regist-group-label'>모임일시</label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="regist-group-input-field">
            <label className='regist-group-label'>모임마감 일시</label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="regist-group-input-field">
          <label className='regist-group-label'>상세내용</label>
          <textarea
            name="detailedInfo"
            value={formData.detailedInfo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="regist-group-buttons">
          <button type="button" onClick={() => setFormData({})}>작성취소</button>
          <button type="submit">작성완료</button>
        </div>
      </form>
    </div>
  );
};

export default GroupModify;
