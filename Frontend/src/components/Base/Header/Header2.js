import React from 'react';
import styled from 'styled-components';
import Button2 from 'components/common/Button2';

const Div = styled.div`
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      <Div>
        <Button2 to={process.env.PUBLIC_URL + '/canvas/setting'}>
          Go Plan
        </Button2>
        <Button2 to="/about">About</Button2>
        <Button2 to="/contact">Contact</Button2>
      </Div>
    </>
  );
};

export default Header;
