import React from 'react';
import styled, { css } from 'styled-components';
import AuthHeader from 'components/Base/Header/AuthHeader';
import Logo from 'components/Landing/Logo';

const AuthTemplateBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: #fff1a9;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;

const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  width: 45%;
  background: white;
  border-radius: 0 45px 45px 0;
  @media screen and (max-width: 1023px) {
    width: 70%;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    border-radius: 0px;
  }
`;

const Div = styled.div`
  padding: 50px 0px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  align-items: center;
  min-height: 100vh;
  /* width: 100px; */
  /* width: 70%; */
`;

const Main = styled.div`
  width: 55%;
  height: 100vh;
  @media screen and (max-width: 767px) {
    width: 0%;
    display: none; // 0529  임시 none 처리, 메뉴 바 삽입 예정
  }
`;

const Illustration = styled.div`
  ${(props) =>
    props.plane &&
    css`
      margin-top: 20px;
      padding-left: 40px;
    `}

  ${(props) =>
    props.traveler &&
    css`
      position: relative;
      text-align: center;
      top: -30px;
    `}
`;

const MainCharacter = styled.img`
  @media screen and (max-width: 1023px) {
    width: 60%;
  }
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <Div>
          <Logo />
          {children}
        </Div>
      </WhiteBox>
      <Main>
        <AuthHeader />
        <Illustration plane>
          <MainCharacter src={process.env.PUBLIC_URL + '/images/plane.png'} />
        </Illustration>
        <Illustration traveler>
          <MainCharacter
            src={process.env.PUBLIC_URL + '/images/mainCharacter.png'}
          />
        </Illustration>
      </Main>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
