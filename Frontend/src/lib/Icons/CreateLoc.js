// 자체 로케이션 추가 버튼
import React, { useState } from 'react';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import ModalModule from 'components/common/modal/ModalModule';

const CreateLocBtn = styled(MdOutlineLibraryAdd)`
  cursor: pointer;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const Input = styled.input`
  margin-right: 10px;
`;

const CreateLoc = ({ size, onClick }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [time, setTime] = useState({
  //   startHour: '',
  //   startMinute: '',
  //   stayHour: '',
  //   stayMinute: '',
  // });

  const onChange = (e) => {
    // const { name, value } = e.target;
    // let tmpVal = value;
    // if (value < 0) {
    //   tmpVal = 0;
    // }
    // if (value.length > 3) {
    //   tmpVal = Math.floor(value / 10);
    // }
    // setTime({
    //   ...time,
    //   [name]: tmpVal,
    // });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // const { startHour, startMinute, stayHour, stayMinute } = time;

  return (
    <>
      <CreateLocBtn
        size={size}
        onClick={openModal}
        data-tip
        data-for="createLoc"
      />
      <ReactTooltip id="createLoc" place="left" type="info" effect="solid">
        <div>자체 로케이션을 생성할 수 있습니다.</div>
      </ReactTooltip>
      <ModalModule
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        title="자체 블록"
      >
        <Container>
          {/* 수정 필요 0317 */}
          <Div>
            <label htmlFor="name">블록명</label>
            <Input
              id="name"
              onChange={onChange}
              placeholder="블록 이름을 지정해주세요."
              // name="stayHour"
              // value={stayHour}
            />
          </Div>
          <Div>
            <label htmlFor="coord">블록 좌표</label>
            <Input
              id="coord"
              onChange={onChange}
              placeholder="좌표를 지정하세요."
              // name="stayHour"
              // value={stayHour}
            />
          </Div>
          <Div>
            <label htmlFor="operateT">운영시간(선택)</label>
            <Input
              id="operateT"
              onChange={onChange}
              placeholder="?"
              // name="stayHour"
              // value={stayHour}
            />
          </Div>
        </Container>
      </ModalModule>
    </>
  );
};

export default CreateLoc;
