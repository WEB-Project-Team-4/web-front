import React, { createContext, useState, useEffect } from "react";

// Context 생성
export const UserContext = createContext();

// Provider 컴포넌트 작성
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // LocalStorage에서 유저 정보 가져오기
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 로그인 처리
  const login = (userData) => {
    setUser(userData); // 유저 데이터 설정
    localStorage.setItem("user", JSON.stringify(userData)); // LocalStorage에 저장
  };

  // 로그아웃 처리
  const logout = () => {
    setUser(null); // 유저 데이터 삭제
    localStorage.removeItem("user"); // LocalStorage에서 제거
  };

  // user 상태가 변경될 때마다 콘솔 출력 (디버깅용)
  useEffect(() => {
    console.log("Current User State:", user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
