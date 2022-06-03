import React from 'react';
import NoticeViewer from 'components/Notice/NoticeViewer';
import NoticeTemplate from 'components/Notice/NoticeTemplate';

const NoticeViewerPage = () => {
  return (
    <NoticeTemplate>
      <NoticeViewer />
    </NoticeTemplate>
  );
};

export default NoticeViewerPage;
