// src/review/WriteReview.js
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import { uploadImage } from '../../API/review';
import { fetchOpenRegistReveiw, fetchRegistReveiw } from "../../API/review";
import { useParams,useNavigate } from "react-router-dom";
import '../../assets/styles/Review.css'; // 스타일 파일 추가

function WriteReview() {
  const editorRef = useRef(null);
  const [content, setContent] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [title, setTitle] = useState(''); // 제목 관리
  const [isChange, setIsChange] = useState(false);
  const [meetingName, setmeetingName] = useState(false);
  const { groupId } = useParams();
  const navigate = useNavigate();
  // 서버 데이터 로드
  useEffect(() => {
    const loadwritereview = async () => {
      try {
        const data = await fetchOpenRegistReveiw(groupId);
        setmeetingName(data);
        setIsChange(false);
      } catch (error) {
        console.error("Failed to load group detail:", error);
        navigate("/error"); // 에러 발생 시 에러 페이지로 이동
      }
    };

    loadwritereview();
  }, [ isChange,meetingName]);

  useEffect(() => {
    window.$(editorRef.current).summernote({
      lang: 'ko-KR',
      height: 800,
      placeholder: '후기를 작성해주세요...',
      callbacks: {
        onChange: (contents) => {
          setContent(contents);

          // 이미지 URL 추출
          // const urls = extractImageUrlsFromContent(contents);
          // setImageUrls(urls);
        },
        // onImageUpload: (files) => {
        //   handleImageUpload(files)// TODO: 이미지 업로드 API 호출
        // },
      },
    });

    return () => {
      if (window.$(editorRef.current).summernote) {
        window.$(editorRef.current).summernote('destroy');
      }
    };
  }, []);

  // const extractImageUrlsFromContent = (content) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(content, 'text/html');
  //   const imgElements = doc.querySelectorAll('img');
  //   return Array.from(imgElements).map(img => img.src);
  // };

  // const handleImageUpload = async (files) => {
  //   for (let i = 0; i < files.length; i++) {
  //     try {
  //       // const response = await uploadImage(files[i]);
  //       const response = await uploadImage(1);
  //       const imageUrl = response.data;
  //       window.$(editorRef.current).summernote('insertImage', imageUrl);
  //     } catch (error) {
  //       console.error('이미지 업로드 실패:', error);
  //     }
  //   }
  // };


  const handleSubmit = async () => {
    try {
      console.log("제목:", title);
      console.log("제출된 내용:", content);

      // API 호출
      await fetchRegistReveiw({
        reviewGroupId: groupId, // groupId를 정수로 변환
        reviewTitle: title,
        reviewContent: content,
        reviewImgList: [], // 이미지 목록 비우기
      });

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

      {/* 작성 중인 모임 정보 */}
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
