import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from 'lib/styles/palette';

const buttonStyle = css`
  /* margin-left: 100px; */
  font-weight: 600;
  font-size: 23px;
  color: black;
  cursor: pointer;
  text-decoration: none;
  transition: 0.2s all;
  border: none;
  background-color: transparent;

  &:hover {
  }

  &:active {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
  }
  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
      color: white;
    `}
  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[5]};
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const AuthPageButton = (props) => {
  return props.to ? <StyledLink {...props} /> : <StyledButton {...props} />;
};

export default AuthPageButton;
