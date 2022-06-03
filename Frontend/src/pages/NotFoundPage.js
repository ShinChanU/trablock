import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  height: 85vh;
`;

const StyleLink = styled(Link)`
  font-size: 50px;
  text-decoration: none;
  color: black;
  :hover {
    color: blue;
    transform: scale(1.3);
    transition: 0.5s;
  }
`;

const NotFoundPage = () => {
  return (
    <Div>
      <Img src={process.env.PUBLIC_URL + '/images/notfoundPhone.jpg'} />
      <StyleLink to={process.env.PUBLIC_URL + '/'}>
        휴대폰액정처럼 메인으로 꺼지기
      </StyleLink>
    </Div>
  );
};

export default NotFoundPage;
