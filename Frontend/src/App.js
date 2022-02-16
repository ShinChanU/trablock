import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUpPage from 'pages/SignupPage';
import LoginPage from 'pages/LoginPage';
import CanvasMainPage from 'pages/CanvasPages/CanvasMainPage';
// import HeaderContainer from './containers/common/HeaderContainer';
// import LandingPage from 'pages/LandingPage';

import DndTestPage from './test/DndTestPage';

function App() {
  return (
    <>
      {/* <HeaderContainer /> */}
      <Routes>
        <Route element={<SignUpPage />} path="/" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<CanvasMainPage />} path="/canvas/*" />
        <Route element={<DndTestPage />} path="/dnd" />
      </Routes>
    </>
  );
}

export default App;

//  0206
// https://velog.io/@yjs3819/react-beautiful-dnd

// 0207
// LandingPage 작업중
// Main에 header 만들어야함, button 컴포넌트 재사용, 아니 수정해야함

// 0208
// LandingPage 전체적인 틀 완료, 세부적인 구조 다듬기 필요, 사실상 랜딩이아니고 회원가입, 로그인임, 랜딩은 디자인 작업 중
// 로고 클릭시 홈

// 0216
// dnd 적용 (drop, drag 영역 찾기)
// 3개의 카테고리로 나누어서 각자다른 3개의 요소를 day에다가 옮기는 작업을 해봐
