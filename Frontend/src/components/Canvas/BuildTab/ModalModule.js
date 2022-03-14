import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Close from 'components/Canvas/BuildTab/Icons/Close';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    // height: '200px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
  },
};

const Header = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 5px 3px; */
  border: 1px solid black;
  margin-bottom: 20px;
  padding: 5px 5px;
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const ModalModule = ({ modalIsOpen, closeModal, children, header }) => {
  return (
    <Modal isOpen={modalIsOpen} style={customStyles}>
      <Header>
        <div>{header}</div>
        <Close size="20" onClick={closeModal} />
      </Header>
      {children}
      <Btn>
        <button onClick={closeModal}>확인</button>
      </Btn>
    </Modal>
  );
};

export default ModalModule;

/* 해당 모듈은 아래와 같은 형태로 호출을 해야함
const [modalIsOpen, setModalIsOpen] = useState(false);

const openModal = () => {
  setModalIsOpen(true);
};

const closeModal = () => {
  setModalIsOpen(false);

  <ModalModule
  modalIsOpen={modalIsOpen}
  openModal={openModal}
  closeModal={closeModal}
  header="이동수단 설정"
>
  <MoveSettingChild /> 내부요소, chlidren
</ModalModule>
*/
// 0313
