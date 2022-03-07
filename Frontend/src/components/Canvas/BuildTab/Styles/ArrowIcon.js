import React from 'react';
import { styled } from '@mui/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const MyArrowIcon = styled(ArrowDropDownIcon)({
  '&:hover': {
    // color: "red",
    cursor: 'pointer',
    transform: 'scale(1.7)',
    transition: 'all 0.2s linear',
  },
});

const ArrowIcon = ({ onClick, clickState }) => {
  console.log(clickState);
  return <MyArrowIcon onClick={onClick} clickState={clickState} />;
};

export default ArrowIcon;
