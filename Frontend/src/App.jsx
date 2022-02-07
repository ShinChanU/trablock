import React from 'react';
import HeaderContainer from './containers/common/HeaderContainer';
import { Routes, Route } from 'react-router-dom';
import SignUpPage from 'pages/SignupPage';
import LoginPage from 'pages/LoginPage';
import CanvasMainPage from 'pages/CanvasPages/CanvasMainPage';
import LandingPage from 'pages/LandingPage';

// import { DragDropContext } from 'react-beautiful-dnd';

function App() {
  return (
    <>
      {/* <HeaderContainer /> */}
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<CanvasMainPage />} path="/canvas/*" />
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