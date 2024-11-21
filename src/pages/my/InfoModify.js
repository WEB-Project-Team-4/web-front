import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/My.css";
import "../../assets/styles/General.css"; // 스타일 적용
import { getUserInfo } from "../../API/member";

function InfoModify() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // 프로필 사진 상태 추가
  const { modify } = useContext(UserContext);

  // 사용자 정보 상태 관리
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    nickname: "",
    phone: "",
    email: "",
    favCategoryName: "",
    profileImage: "", // 사진 URL로 변경
  });

  // 카테고리 매핑
  const categoryMap = {
    Study: { name: "스터디", id: 100 },
    Sports: { name: "스포츠", id: 200 },
    Food: { name: "음식", id: 300 },
    Others: { name: "기타", id: 900 },
  };

  // 원래 정보 불러오기
  const fetchMemberInfo = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "my/get-member-info",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const data = response.data;
      const categoryKey = Object.keys(categoryMap).find(
        (key) => categoryMap[key].id === data.favCategoryId
      );

      setUserInfo({
        id: data.id,
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        phone: data.phoneNumber,
        favCategoryName: data.favCategoryName,
        profileImage: data.profileUrl,
      });

      // 가져온 favCategoryId에 맞는 드롭다운 기본값 설정
      setCategory(categoryKey || "Others"); // 기본값이 없으면 '기타'로 설정
    } catch (error) {
      console.error("회원 정보 불러오기 실패:", error);
      alert("회원 정보를 불러오는 데 실패했습니다.");
    }
  };

  // 페이지 로드 시 원래 정보 자동으로 가져오기
  useEffect(() => {
    fetchMemberInfo();
  }, []);

  // 폼 입력값 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // // 프로필 사진 파일 변경 처리
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   const imageUrl = URL.createObjectURL(file); // 파일 URL 생성
  //   setProfilePicture(file); // 파일 자체를 상태로 저장
  //   setUserInfo((prevState) => ({
  //     ...prevState,
  //     profileImage: imageUrl, // 이미지 URL 상태에 저장
  //   }));
  // };

  // 정보 수정 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const { name, nickname, phone, favCategoryName } = userInfo;

    // 선택된 카테고리의 ID 가져오기
    const favCategoryId = categoryMap[category]?.id || null;

    // 제출할 데이터 (파일 제외)
    const submitData = {
      name: name,
      nickname: nickname,
      phoneNumber: phone || "",
      favCategoryName: favCategoryName,
      favCategoryId: favCategoryId, // 카테고리 ID 추가
      profileUrl: "default url",
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "my/info-modify",
        submitData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("정보가 성공적으로 수정되었습니다.");

        /* 사이드바 정보 수정 로직!  */
        const newData = await getUserInfo();
        modify(newData); // 사이드바 정보 수정

        navigate("/my/group");
      }
    } catch (error) {
      console.error("정보 수정 실패:", error);
      alert("정보 수정에 실패했습니다.");
    }
  };

  return (
    <div className="my-form-container">
      <h2>회원 정보 변경</h2>
      <Button variant="outlined" color="primary" onClick={fetchMemberInfo}>
        원래 정보 불러오기
      </Button>
      <form onSubmit={handleSubmit}>
        <Box className="general-form-row">
          <Typography variant="body1" className="general-form-label">
            아이디
          </Typography>
          <Typography variant="body2" className="general-form-id">
            {userInfo.id}
          </Typography>
        </Box>

        <div className="general-form-row">
          <Typography variant="body1" className="general-form-label">
            이름 <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            label="이름"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
        </div>

        <div className="general-form-row">
          <Typography variant="body1" className="general-form-label">
            닉네임 <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            label="닉네임"
            name="nickname"
            value={userInfo.nickname}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
        </div>

        <Box className="general-form-row">
          <Typography variant="body1" className="general-form-label">
            이메일
          </Typography>
          <Typography variant="body2" className="general-form-id">
            {userInfo.email}
          </Typography>
        </Box>

        <div className="general-form-row">
          <Typography variant="body1" className="general-form-label">
            전화번호
          </Typography>
          <TextField
            label="전화번호"
            name="phone"
            value={userInfo.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </div>

        <div className="general-form-row">
          <Typography variant="body1" className="general-form-label">
            카테고리
          </Typography>
          <FormControl className="general-form-input category">
            <InputLabel id="category-label">관심 카테고리</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={(e) => {
                const selectedCategoryKey = e.target.value;
                setCategory(selectedCategoryKey);
                setUserInfo((prevState) => ({
                  ...prevState,
                  favCategoryName: categoryMap[selectedCategoryKey].name, // 카테고리 이름 설정
                }));
              }}
            >
              <MenuItem value="Study">스터디</MenuItem>
              <MenuItem value="Sports">스포츠</MenuItem>
              <MenuItem value="Food">음식</MenuItem>
              <MenuItem value="Others">기타</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* <div className="general-form-row">
          <Typography variant="body1" className="general-form-label">
            프로필 사진
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: "10px" }}
          />
          {userInfo.profileImage && (
            <Box style={{ marginTop: "10px" }}>
              <img
                src={userInfo.profileImage}
                alt="프로필 사진 미리보기"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}
        </div> */}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="button-general"
        >
          수정 완료
        </Button>
      </form>
    </div>
  );
}

export default InfoModify;
