import React from 'react';
import { styled } from '@mui/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const MyAccountCircleIcon = styled(AccountCircleIcon)({
  "&": {
    position: "absolute",
    left: "30px",
    top: "15px",
    color: "gray",
  }
});

const AccountCircle = () => {
  return (
    <MyAccountCircleIcon />
  );
};

export default AccountCircle;