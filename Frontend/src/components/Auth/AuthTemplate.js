import React from 'react';
import styled from 'styled-components';
// import HeaderContainer from 'containers/common/HeaderContainer';
import Header2 from 'components/Base/Header/Header2.jsx';

const AuthTemplateBlock = styled.div`
  /* margin-top: 60px; */
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  /* align-items: center; */
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
  
`;

const MainCharacter = styled.img`
  /* width: ; */
  /* margin: auto; */
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        {children}
      </WhiteBox>
      <Main>
        <Header2 />
        <MainCharacter src={process.env.PUBLIC_URL + '/images/mainCharacter.png'} />
      </Main>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;