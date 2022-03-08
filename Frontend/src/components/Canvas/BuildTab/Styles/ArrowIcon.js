import React from 'react';
import styled from 'styled-components';
import { MdArrowDropDown } from 'react-icons/md';

const ArrowDropDownI = styled(MdArrowDropDown)`
  cursor: pointer;
  size: 3em;
  &:hover {
    transform: scale(1.4);
    transition: all 0.2s linear;
  }
`;

const ArrowIcon = ({ onClick, clickState }) => {
  // console.log(clickState);
  return (
    <>
      <ArrowDropDownI
        size="1.5em"
        onClick={onClick}
        // clickState={clickState}
      />
    </>
  );
};

export default ArrowIcon;
