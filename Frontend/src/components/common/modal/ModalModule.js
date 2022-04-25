import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Close from 'lib/Icons/Close';
import 'lib/styles/Modal.css';
import SearchPlace from 'components/Canvas/BuildTab/Map/SearchPlace';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  background-color: #f1f1f1;
  font-weight: 700;
`;

const MapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  background-color: #f1f1f1;
  font-weight: 700;
`;

const Section = styled.section`
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  animation: modal-show 0.3s;
  overflow: hidden;
`;

const Section2 = styled.section`
  margin-right: 20px;
  border-radius: 0.3rem;
  background-color: #fff;
  animation: modal-show 0.3s;
  overflow: hidden;
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px 16px;
  text-align: right;
`;

const ModalModule = ({
  modalIsOpen,
  closeModal,
  children,
  title,
  map,
  onSubmit,
  day,
}) => {
  return (
    <Modal
      className={modalIsOpen ? 'openModal modal' : 'modal'}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
    >
      <Section>
        <Header>
          <div>{title} 설정</div>
          <Close size="20" onClick={closeModal} tooltip={false} />
        </Header>
        <main>{children}</main>
        <Btn>
          <button onClick={onSubmit}>확인</button>
        </Btn>
      </Section>
      {map && (
        <Section2>
          <MapHeader>
            <div>kakao Map Api</div>
            <Close size="20" onClick={closeModal} tooltip={false} />
          </MapHeader>
          <SearchPlace />
          <Btn>
            <button onClick={onSubmit}>닫기</button>
          </Btn>
        </Section2>
      )}
    </Modal>
  );
};

export default ModalModule;

/* 해당 모듈은 아래와 같은 형태로 호출해야합니다
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
  <MoveSettingChild /> 내부요소, children
</ModalModule>
*/
// 0313
