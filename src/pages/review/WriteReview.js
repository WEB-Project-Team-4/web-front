// src/review/WriteReview.js
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { fetchOpenRegistReveiw, fetchRegistReveiw } from "../../API/review";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/styles/Review.css"; // 스타일 파일 추가

function WriteReview() {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState(""); // 제목 관리
  const [isChange, setIsChange] = useState(false);
  const [meetingName, setmeetingName] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // 첨부된 이미지 파일
  const { groupId } = useParams();
  const navigate = useNavigate();

  // 서버 데이터 로드
  useEffect(() => {
    const loadwritereview = async () => {
      try {
        const response = await fetchOpenRegistReveiw(groupId);

        const data = response.data;
        setmeetingName(data);
        setIsChange(false);
      } catch (error) {
        // console.error("Failed to load group detail:", error);
        // navigate("/error"); // 에러 발생 시 에러 페이지로 이동
      }
    };

    loadwritereview();
  }, [isChange, meetingName]);

  useEffect(() => {
    window.$(editorRef.current).summernote({
      lang: "ko-KR",
      height: 800,
      placeholder: "후기를 작성해주세요...",
      toolbar: [
        ["style", ["bold", "italic", "underline", "clear"]],
        ["font", ["strikethrough", "superscript", "subscript"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["insert", ["link", "table", "hr"]],
        ["insert", ["link", "video"]],
        ["view", ["codeview"]],
      ], // 사진 관련 툴 제거
      callbacks: {
        onChange: (contents) => {
          setContent(contents);
        },
      },
    });

    return () => {
      if (window.$(editorRef.current).summernote) {
        window.$(editorRef.current).summernote("destroy");
      }
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("제목:", title);
      console.log("제출된 내용:", content);
      console.log("첨부된 파일:", selectedImage);

      // FormData 생성 및 데이터 추가
      const formData = new FormData();
      // formData.append("reviewGroupId", groupId); // 그룹 ID
      // formData.append("reviewTitle", title); // 제목
      // formData.append("reviewContent", content); // 내용
      if (selectedImage) {
        formData.append("reviewImg", selectedImage); // 첨부된 이미지
      } else if (selectedImage && selectedImage.size > 1 * 1024 * 1024) {
        alert("1MB 이하의 이미지만 업로드해주세요");
        return;
      }

      const params = {
        reviewGroupId: groupId,
        reviewTitle: title,
        reviewContent: content,
      };

      formData.append(
        "reviewDTO",
        new Blob([JSON.stringify(params)], { type: "application/json" })
      );

      // API 호출
      await fetchRegistReveiw(formData, groupId);

      console.log("리뷰 등록 성공");
      navigate(`/review/main`);
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      navigate("/error");
    }
  };

  return (
    <Box className="review-write-container">
      {/* 상단 제목 */}
      <Typography variant="h4" className="review-header">
        후기 작성
      </Typography>

      {/* 제목 입력 섹션 */}
      <Box className="review-title-section">
        <Typography variant="h5" className="review-title-label">
          제목:
        </Typography>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          fullWidth
          className="review-title-input"
        />
      </Box>

      {/* Summernote 에디터 */}
      <Box>
        <div ref={editorRef} className="review-editor"></div>
      </Box>

      {/* 이미지 첨부 섹션 */}
      <Box className="group-grid-item" sx={{ marginTop: "20px" }}>
        <label htmlFor="image-upload" style={{ marginRight: "10px" }}>
          대표 이미지:
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Box>

      {/* 첨부된 이미지 미리보기 */}
      {selectedImage && (
        <Box
          sx={{
            marginTop: "20px",
            width: "100px",
            height: "100px",
            backgroundImage: `url(${URL.createObjectURL(selectedImage)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
          }}
        />
      )}
      <Typography variant="subtitle1" className="review-meeting-info">
        작성 중인 모임: {meetingName}
      </Typography>

      {/* 작성하기 버튼 */}
      <Box className="review-submit-container">
        <Button
          variant="outlined"
          // fullWidth
          className="button-general"
          onClick={handleSubmit}
        >
          작성하기
        </Button>
      </Box>
    </Box>
  );
}

export default WriteReview;
