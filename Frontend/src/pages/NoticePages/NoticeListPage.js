import React from 'react';
import NoticeList from 'components/Notice/NoticeList';
import NoticeTemplate from 'components/Notice/NoticeTemplate';

const NoticeListPage = () => {
  return (
    <NoticeTemplate>
      <NoticeList />
    </NoticeTemplate>
  );
};

export default NoticeListPage;
