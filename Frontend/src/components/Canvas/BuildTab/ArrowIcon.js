import React from 'react';
import { styled } from '@mui/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const MyArrowIcon = styled(ArrowDropDownIcon)({
  '&:hover': {
    // color: "red",
    cursor: 'pointer',
    transform: 'scale(1.5)',
    transition: 'all 0.2s linear',
  },
});

const ArrowIcon = ({ onClick }) => {
  return <MyArrowIcon onClick={onClick} />;
};

export default ArrowIcon;
