import React from 'react';
import HeaderContainer from './containers/common/HeaderContainer';
import { Routes, Route } from 'react-router-dom';
import SignUpPage from 'pages/SignupPage';
import LoginPage from 'pages/LoginPage';
import CanvasMainPage from 'pages/CanvasPages/CanvasMainPage';

function App() {
  return (
    <div>
      <HeaderContainer />
      <Routes>
        <Route element={<LoginPage />} path="login" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<CanvasMainPage />} path="canvas/*" />
      </Routes>
    </div>
  );
}

export default App;

// https://velog.io/@yjs3819/react-beautiful-dnd