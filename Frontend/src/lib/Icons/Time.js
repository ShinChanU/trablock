// 시간 추가, 변경 버튼
import React, { useState } from 'react';
import { MdMoreTime } from 'react-icons/md';
import styled from 'styled-components';
import ModalModule from 'components/common/modal/ModalModule';
import TimeInput from 'components/Canvas/common/TimeInput';
import ReactTooltip from 'react-tooltip';

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
    startHour: '',
    startMinute: '',
    stayHour: '',
    stayMinute: '',
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

  const { startHour, startMinute, stayHour, stayMinute } = time;

  return (
    <>
      <TimeBtn size="18" onClick={openModal} data-tip data-for="time" />
      <ReactTooltip id="time" place="right" type="info" effect="solid">
        <div>체류시간 을 설정해주세요.</div>
      </ReactTooltip>
      <ModalModule
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        title={title}
      >
        <Container>
          {title === '출발/체류시간' && (
            <div>
              출발시간
              <TimeInput
                onChange={onChange}
                placeholder="시간"
                name="startHour"
                value={startHour}
              />
              <TimeInput
                onChange={onChange}
                placeholder="분"
                name="startMinute"
                value={startMinute}
              />
            </div>
          )}
          <div>
            체류시간
            <TimeInput
              onChange={onChange}
              placeholder="시간"
              name="stayHour"
              value={stayHour}
            />
            <TimeInput
              onChange={onChange}
              placeholder="분"
              name="stayMinute"
              value={stayMinute}
            />
          </div>
        </Container>
      </ModalModule>
    </>
  );
};

export default Time;
