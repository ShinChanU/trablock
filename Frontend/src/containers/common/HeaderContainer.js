import React from 'react';
import Header from 'components/Base/Header';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'redux/modules/user';

const HeaderContainer = () => {
  const { userState } = useSelector(({ user }) => ({
    userState: user.userState
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Header user={userState} onLogout={onLogout} />
  );
};

export default HeaderContainer;