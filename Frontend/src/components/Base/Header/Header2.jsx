import React from 'react';
import styled from 'styled-components';
import Button2 from 'components/common/Button2';

const Header = ({ user, onLogout }) => {
  return (
    <>
    <div>
      <Button2 to="/about">About</Button2>
      <Button2 to="/contact">Contact</Button2>
    </div>
    </>
  );
};

export default Header;