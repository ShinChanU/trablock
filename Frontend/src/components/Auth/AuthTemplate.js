import React from 'react';
import styled, { css } from 'styled-components';
import Header2 from 'components/Base/Header/Header2';
import Logo from 'components/Landing/Logo';

const AuthTemplateBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: #FFF1A9;
`;

const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 45%;
  background: white;
  border-radius: 0 45px 45px 0;
`;

const Main = styled.div`
  width: 55%;
  height: 100vh;
`;

const Illustration = styled.div`
  ${props =>
    props.plane && css`
      margin-top: 20px;
      padding-left: 40px;
    `
  }

${props =>
    props.traveler && css`
      position: relative;
      text-align: center;
      top: -30px;
    `
  }
`;

const MainCharacter = styled.img`
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <Logo />
        {children}
      </WhiteBox>
      <Main>
        <Header2 />
        <Illustration plane>
          <MainCharacter src={process.env.PUBLIC_URL + '/images/plane.png'} />
        </Illustration>
        <Illustration traveler>
          <MainCharacter src={process.env.PUBLIC_URL + '/images/mainCharacter.png'} />
        </Illustration>
      </Main>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;