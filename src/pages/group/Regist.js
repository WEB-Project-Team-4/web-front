import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../../assets/styles/Group.css";
import "../../assets/styles/General.css";
import { registGroup } from "../../API/group";

const GroupRegist = () => {
  const [formData, setFormData] = useState({
    recruitmentName: "",
    description: "",
    category: "",
    representativeImage: null,
    location: "",
    city: "", // 시/도
    district: "", // 군/구
    detailAddr: "", // 나머지 주소

    maxParticipants: "",
    startDate: "",
    endDate: "",
    detailedInfo: "",
  });

  const [isMapOpen, setIsMapOpen] = useState(false); // 지도 모달 상태
  const navigate = useNavigate(); // Declare useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, representativeImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);

    if (formData.maxParticipants > 10000) {
      alert("최대 참여 인원은 10000명보다 클 수 없습니다");
      return;
    }

    const response = await registGroup(
      {
        categoryId:
          formData.category === "스터디"
            ? 100
            : formData.category === "스포츠"
            ? 200
            : formData.category === "음식"
            ? 300
            : 900,
        groupName: formData.recruitmentName,
        introText: formData.description,
        groupContent: formData.detailedInfo,
        groupLimit: formData.maxParticipants,
        groupDate: formData.endDate,
        closeDate: formData.startDate,
        city: formData.city,
        district: formData.district,
        detailAddr: formData.detailAddr,
      },
      formData.representativeImage
    );

    console.log(response);
    if (response == 200) {
      navigate("/");
    } else if (response == 413) {
      console.log("1MB 이하의 이미지만 업로드 가능합니다.");
    }
  };

  const openMap = () => {
    setIsMapOpen(true);
  };

  // 주소를 시/도, 군/구, 나머지 주소로 나누는 함수
  const splitAddress = (address) => {
    const addressParts = address.split(" ");
    const city = addressParts[0].slice(0, 2); // 시/도는 첫 2글자
    const district = addressParts[1] || ""; // 군/구는 두 번째 요소 (없으면 빈 문자열)
    const addr = addressParts.slice(2).join(" "); // 나머지 주소는 나머지 부분
    return { city, district, addr };
  };

  // 주소 선택 후 처리 함수
  const handleAddressSelect = (address) => {
    const { city, district, addr } = splitAddress(address);
    setFormData({
      ...formData,
      location: address,
      city: city,
      district: district,
      detailAddr: addr,
    });
    setIsMapOpen(false);
  };

  // 현재 시간을 가져오는 함수
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // 'yyyy-mm-ddThh:mm' 형식
  };

  // 모집 마감 일시와 모임 일시 입력 시 처리
  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    // if (startDate < getCurrentDateTime()) {
    //   alert('모집 마감 일시는 현재 시간 이후로 설정해주세요.');
    //   return;
    // }
    setFormData({ ...formData, startDate });
  };

  const handleEndDateChange = (e) => {
    const endDate = e.target.value;
    if (endDate <= formData.startDate) {
      alert("모임 일시는 모집 마감 일시 이후로 설정해주세요.");
      return;
    }
    setFormData({ ...formData, endDate });
  };

  return (
    <div className="regist-main-container ">
      <div className="general-form-title">모임등록</div>
      <span>
        <span style={{ color: "red" }}>*</span>표기는 필수입력입니다.
      </span>

      <form onSubmit={handleSubmit}>
        <div className="group-regist-row  regist-group-spacing regist-group-up-spacing ">
          <label className="regist-group-label">
            모임명(20자 이내) <span style={{ color: "red" }}>*</span>
          </label>
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
          <label className="regist-group-label ">
            소개글(25자 이내)<span style={{ color: "red" }}>*</span>
          </label>
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
            <label>
              모임 카테고리<span style={{ color: "red" }}>*</span>
            </label>
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
            <div className="regist-column">
              <button type="button" onClick={openMap}>
                지도 또는 주소 찾기
              </button>
              {/* 선택된 주소를 버튼 아래에 표시 */}
              {formData.city && (
                <p className="selected-address">
                  선택된 주소: {formData.city}, {formData.district},{" "}
                  {formData.detailAddr}
                </p>
              )}
            </div>
          </div>

          {/* 최대참여인원 */}
          <div className="group-grid-item">
            <label>
              최대참여인원<span style={{ color: "red" }}>*</span>
            </label>
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
            <label>
              모집 마감 일시<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleStartDateChange}
              min={getCurrentDateTime()} // 현재 시간 이후로 제한
              required
            />
          </div>

          {/* 모임 일시 */}
          <div className="group-grid-item regist-group-spacing">
            <label>
              모임 일시<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleEndDateChange}
              min={formData.startDate} // 모집 마감 일시 이후로 제한
              required
            />
          </div>
        </div>

        <div className="regist-group-input-field  regist-group-spacing ">
          <label className="regist-group-label">
            상세내용<span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            name="detailedInfo"
            value={formData.detailedInfo}
            onChange={handleChange}
            required
            className="detailTextInput"
          />
        </div>

        <div className="regist-group-buttons">
          <button
            type="button"
            onClick={() => navigate(-1)} // This will navigate to the previous page
          >
            작성취소
          </button>
          <button type="submit">작성완료</button>
        </div>
      </form>
      {/* 지도 모달 */}
      {isMapOpen && (
        <MapModal
          onClose={() => setIsMapOpen(false)}
          onSelectAddress={handleAddressSelect}
        />
      )}
    </div>
  );
};

// 지도추가요소
const MapModal = ({ onClose, onSelectAddress }) => {
  const [inputAddress, setInputAddress] = useState(""); // 입력된 주소
  const [clickedAddress, setClickedAddress] = useState(""); // 클릭된 주소
  const [extraAddress, setExtraAddress] = useState(""); // 추가 주소 입력란
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);

  const initializeMap = () => {
    const mapContainer = document.getElementById("map"); // 지도 표시 영역
    const mapOption = {
      // center: new window.kakao.maps.LatLng(37.5665, 126.978), // 기본 중심 좌표 (서울)
      center: new window.kakao.maps.LatLng(
        process.env.REACT_APP_API_POS_X !== undefined
          ? process.env.REACT_APP_API_POS_X
          : 37.5665,
        process.env.REACT_APP_API_POS_Y !== undefined
          ? process.env.REACT_APP_API_POS_Y
          : 126.978
      ), // 기본 중심 좌표
      level: 3,
    };

    const createdMap = new window.kakao.maps.Map(mapContainer, mapOption);
    const createdGeocoder = new window.kakao.maps.services.Geocoder();
    setMap(createdMap);
    setGeocoder(createdGeocoder);
  };

  const searchAddress = () => {
    if (geocoder) {
      geocoder.addressSearch(inputAddress, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          map.setCenter(coords); // 지도 중심 이동
        } else {
          alert("주소를 찾을 수 없습니다.");
        }
      });
    }
  };

  // '추가 주소 입력'란 값이 변경될 때마다 상태 업데이트
  const handleExtraAddressChange = (e) => {
    setExtraAddress(e.target.value);
  };

  // 완료 버튼 클릭 시, 주소와 추가 주소를 결합해서 전달
  const handleComplete = () => {
    const fullAddress = clickedAddress
      ? `${clickedAddress} ${extraAddress}`
      : extraAddress;
    onSelectAddress(fullAddress);
    onClose();
  };

  const handleMapClick = (mouseEvent) => {
    const coords = mouseEvent.latLng;
    geocoder.coord2Address(
      coords.getLng(),
      coords.getLat(),
      (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address = result[0].address.address_name;
          setClickedAddress(address); // 상태 업데이트 추가
        }
      }
    );
  };

  React.useEffect(() => {
    const waitForKakao = () => {
      if (window.kakao && window.kakao.maps) {
        initializeMap(); // 지도 초기화 함수 호출
      } else {
        console.warn("Kakao Maps API not loaded yet, retrying...");
        setTimeout(waitForKakao, 100); // 100ms 간격으로 다시 확인
      }
    };
    waitForKakao();
  }, []);

  React.useEffect(() => {
    if (map) {
      window.kakao.maps.event.addListener(map, "click", handleMapClick);
    }
    return () => {
      if (map) {
        window.kakao.maps.event.removeListener(map, "click", handleMapClick);
      }
    };
  }, [map]);

  return (
    <div className="map-modal">
      <div className="map-modal-content">
        <h3>지도에서 주소 선택</h3>
        <input
          type="text"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          placeholder="주소를 입력하세요"
        />
        <button onClick={searchAddress}>검색</button>
        <div
          id="map"
          style={{ width: "100%", height: "400px", margin: "10px 0" }}
        ></div>

        {/* 클릭된 주소 표시 */}
        {clickedAddress && (
          <div className="selected-address">
            <p>선택된 주소: {clickedAddress}</p>
          </div>
        )}

        {/* 추가 주소 입력란 */}
        <div className="extra-address">
          <label>추가 주소 입력 : </label>
          <input
            type="text"
            value={extraAddress}
            onChange={handleExtraAddressChange}
            placeholder="필요시 상세 주소를 입력"
          />
        </div>

        <div className="map-modal-buttons">
          <button onClick={onClose}>취소</button>
          <button onClick={handleComplete}>완료</button>
        </div>
      </div>
    </div>
  );
};

export default GroupRegist;
