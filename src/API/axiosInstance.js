// src/API/axiosInstance.js
import axios from 'axios';

// 환경 변수 가져오기
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL //|| 'http://localhost:3000/';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT, 10) || 5000;
const USE_MOCK = process.env.REACT_APP_USE_MOCK === 'true';
const AUTH_TOKEN = process.env.REACT_APP_API_AUTH_TOKEN || '';
const DEBUG_MODE = process.env.REACT_APP_DEBUG_MODE === 'true';
// axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    }
});

// 요청 인터셉터: 요청 전 공통 설정 추가
axiosInstance.interceptors.request.use(
    (config) => {
        // 인증 토큰 헤더에 추가 (환경 변수에 설정된 경우)
        if (AUTH_TOKEN) {
            config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
        }

        // 디버그 모드일 경우 요청 로그 출력
        if (DEBUG_MODE) {
            console.debug('Request:', config);
        }

        // Mock API를 사용하는 경우 URL을 Mock URL로 변경 (필요 시)
        if (USE_MOCK) {
            config.baseURL = 'http://mockapi.local/';
        }

        return config;
    },
    (error) => {
        if (DEBUG_MODE) {
            console.error('Request Error:', error);
        }
        return Promise.reject(error);
    }
);

// 응답 인터셉터: 응답 처리
axiosInstance.interceptors.response.use(
    (response) => {
        if (DEBUG_MODE) {
            console.debug('Response:', response);
        }
        return response;
    },
    (error) => {
        if (DEBUG_MODE) {
            console.error('Response Error:', error.response || error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
