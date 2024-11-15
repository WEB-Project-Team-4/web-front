import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AxiosErrorHandler = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        // 정상 응답은 그대로 반환
        return response;
      },
      (error) => {
        if (error.response && error.response.data && error.response.data.message) {
          // 에러 메시지가 있을 경우 alert 띄우기
          alert(error.response.data.message);
        }
        // 에러 발생 시 무조건 이전 페이지로 리다이렉트
        navigate(-1); // `-1`은 이전 페이지로 돌아가기
        return Promise.reject(error);
      }
    );

    // 컴포넌트가 언마운트 될 때 인터셉터를 제거하여 메모리 누수 방지
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return <>{children}</>;
};

export default AxiosErrorHandler;
