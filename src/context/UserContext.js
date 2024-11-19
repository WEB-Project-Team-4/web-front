import React, { createContext, useState,useEffect  } from "react";

// Context 생성
export const UserContext = createContext();

// Provider 컴포넌트 작성
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 유저 정보 상태 관리

  // 로그인 처리
  const login = (userData) => {
    setUser(userData); // 유저 데이터 설정
  };

  // 로그아웃 처리
  const logout = () => {
    setUser(null); // 유저 데이터 삭제
  };
  // user 상태가 변경될 때마다 콘솔 출력
  useEffect(() => {
    console.log(user); // user 값이 변경될 때마다 출력
  }, [user]); // user 상태가 변경될 때마다 실행

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
