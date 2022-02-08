import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const SubDiv = styled.div`
  ${props => 
    props.letter && css`
    text-align: center;
    height: 80px;
    padding-top: 15px;
    `
  }
`;

const Img = styled.img`
  ${props => 
    props.picture && css`
      position: absolute;
      left: 3%;
    `
  }
`;

const Logo = () => {
  return (
    <Link to="/">
      <SubDiv>
        <Img src={process.env.PUBLIC_URL + '/images/logoPainting.png'} alt="" picture />
      </SubDiv>
      <SubDiv letter>
        <Img src={process.env.PUBLIC_URL + '/images/logoLetter.png'} alt="" letter />
      </SubDiv>
    </Link>
  );
};

export default Logo;