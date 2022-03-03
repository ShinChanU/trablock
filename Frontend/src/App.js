import React from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';
import SignUpPage from 'pages/SignupPage';
import LoginPage from 'pages/LoginPage';
import CanvasMainPage from 'pages/CanvasPages/CanvasMainPage';
// import HeaderContainer from './containers/common/HeaderContainer';
// import LandingPage from 'pages/LandingPage';

function App() {
  return (
    <>
      {/* <HeaderContainer /> */}
      {useRoutes([
        { path: '/', element: <SignUpPage /> }, // 임시로 signup
        { path: '/signup', element: <SignUpPage /> },
        { path: '/login', element: <LoginPage /> },
        { path: '/canvas/*', element: <CanvasMainPage /> },
      ])}
      {/* <Routes>
        <Route element={<SignUpPage />} path="/" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<CanvasMainPage />} path="/canvas/*" />
      </Routes> */}
    </>
  );
}

export default App;

// 0303 useRoutes 사용
