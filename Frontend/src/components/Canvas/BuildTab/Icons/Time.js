// 시간 추가, 변경 버튼
import React, { useState } from 'react';
import { MdMoreTime } from 'react-icons/md';
import styled from 'styled-components';
import ModalModule from 'components/Canvas/BuildTab/modal/ModalModule';
import TimeInput from 'components/Canvas/BuildTab/TimeInput';

const TimeBtn = styled(MdMoreTime)`
  cursor: pointer;
  /* margin-left: 7px; */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Time = ({ title }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [time, setTime] = useState({
    hour: '',
    minute: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    let tmpVal = value;
    if (value < 0) {
      tmpVal = 0;
    }
    if (value.length > 3) {
      tmpVal = Math.floor(value / 10);
    }
    setTime({
      ...time,
      [name]: tmpVal,
    });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <TimeBtn size="18" onClick={openModal} />
      <ModalModule
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        title={title}
      >
        <Container>
          {title === '1일차 출발/체류시간 설정' && (
            <div>
              출발시간
              <TimeInput
                onChange={onChange}
                placeholder="시간"
                name="hour"
                value={time.hour}
              />
              <TimeInput
                onChange={onChange}
                placeholder="분"
                name="minute"
                value={time.minute}
              />
            </div>
          )}
          <div>
            체류시간
            <TimeInput
              onChange={onChange}
              placeholder="시간"
              name="hour"
              value={time.hour}
            />
            <TimeInput
              onChange={onChange}
              placeholder="분"
              name="minute"
              value={time.minute}
            />
          </div>
        </Container>
      </ModalModule>
    </>
  );
};

export default Time;
