import React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { shadow } from 'lib/styleUtils';
import palette from 'lib/styles/palette';

const buttonStyle = css`
  border: 3px solid ${oc.teal[6]};
  border-radius: 3px;
  font-weight: 600;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  color: ${oc.teal[6]};
  /* color: black; */
  cursor: pointer;
  text-decoration: none;
  transition: 0.2s all;
  background: white;

  &:hover {
    background: ${oc.teal[6]};
    color: white;
    ${shadow(1)}
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
      background: ${oc.teal[5]};
      &:hover {
        background: ${oc.teal[5]};
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? <StyledLink {...props} /> : <StyledButton {...props} />;
};

export default Button;
