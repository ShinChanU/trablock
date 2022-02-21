import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUpPage from 'pages/SignupPage';
import LoginPage from 'pages/LoginPage';
import CanvasMainPage from 'pages/CanvasPages/CanvasMainPage';
// import HeaderContainer from './containers/common/HeaderContainer';
// import LandingPage from 'pages/LandingPage';

function App() {
  return (
    <>
      {/* <HeaderContainer /> */}
      <Routes>
        <Route element={<SignUpPage />} path="/" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<CanvasMainPage />} path="/canvas/*" />
      </Routes>
    </>
  );
}

export default App;
