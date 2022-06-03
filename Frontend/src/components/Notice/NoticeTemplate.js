import React from 'react';
import styled, { css } from 'styled-components';
import AuthHeader from 'components/Base/Header/AuthHeader';
import Logo from 'components/Landing/Logo';

const NoticeTemplateBlock = styled.div`
  height: 100%;
  flex-direction: row;
  background-color: #fff1a9;
`;

const WhiteBox = styled.div`
  padding: 2rem;
  width: 45%;
  background: #fff1a9;
  border-radius: 0 45px 45px 0;
`;

const Main = styled.div`
  float: right;
`;

const Div = styled.div`
  display: flax;
`;

const NoticeTemplate = ({ children }) => {
  return (
    <NoticeTemplateBlock>
      <Div>
        <WhiteBox>
          <Logo />
        </WhiteBox>
        <Main>
          <AuthHeader />
        </Main>
      </Div>
      {children}
    </NoticeTemplateBlock>
  );
};

export default NoticeTemplate;
