import React, { useState } from 'react';
import styled from 'styled-components';
import AuthPageButton from 'components/common/AuthPageButton';
import ModalModule from 'components/common/modal/ModalModule';
import InsertCanvas from './InsertCanvas';

const Div = styled.div`
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* justify-content: center; */
`;

const AuthHeader = ({ user, onLogout }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Div>
        <AuthPageButton onClick={openModal}>Go Plan</AuthPageButton>
        {/* <AuthPageButton to="/about">About</AuthPageButton> */}
        {/* <AuthPageButton to="/contact">Contact</AuthPageButton> */}
        <AuthPageButton to={process.env.PUBLIC_URL + '/notice/noticeList'}>
          Notice
        </AuthPageButton>
      </Div>
      <ModalModule
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        title="새로운 여행? 이미 있는 여행?"
      >
        <InsertCanvas closeModal={closeModal} />
      </ModalModule>
    </>
  );
};

export default AuthHeader;
