import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const LogoLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const SubDiv = styled.div`
  margin: 0px 12px;
`;

const Img = styled.img``;

const Logo = () => {
  return (
    <LogoLink to={process.env.PUBLIC_URL + '/'}>
      <SubDiv>
        <Img
          src={process.env.PUBLIC_URL + '/images/logoPainting.png'}
          alt=""
          picture
        />
      </SubDiv>
      <SubDiv letter>
        <Img
          src={process.env.PUBLIC_URL + '/images/FontLogo.png'}
          alt=""
          letter
        />
      </SubDiv>
    </LogoLink>
  );
};

export default Logo;
