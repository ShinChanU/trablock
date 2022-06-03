import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NoticeViewerPage from './NoticeViewerPage';
import NoticeListPage from './NoticeListPage';

const NoticeMainPage = () => {
  return (
    <Routes>
      <Route element={<NoticeListPage />} path="noticeList" />
      <Route element={<NoticeViewerPage />} path="noticeViewer/:numId" />
    </Routes>
  );
};

export default NoticeMainPage;
