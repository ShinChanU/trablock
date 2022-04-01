// 시간 추가, 변경 버튼
import React, { useEffect, useState } from 'react';
import { MdMoreTime } from 'react-icons/md';
import styled from 'styled-components';
import ModalModule from 'components/common/modal/ModalModule';
import TimeInput from 'components/Canvas/common/TimeInput';
import ReactTooltip from 'react-tooltip';
import { useStore } from 'lib/store';

const TimeBtn = styled(MdMoreTime)`
  cursor: pointer;
  /* margin-left: 7px; */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Time = ({ title, day, index }) => {
  const { setTimeData } = useStore();
  // const { id, stayTime, startTime } = day;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [time, setTime] = useState({
    startH: '',
    startM: '',
    stayH: '',
    stayM: '',
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

  const { startH, startM, stayH, stayM } = time;

  const onSubmit = () => {
    setTimeData(day.id, time, index);
    closeModal();
  };

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
        onSubmit={onSubmit}
      >
        <Container>
          {title === '출발/체류시간' && (
            <div>
              출발시간
              <TimeInput
                onChange={onChange}
                placeholder="시간"
                name="startH"
                value={startH}
              />
              <TimeInput
                onChange={onChange}
                placeholder="분"
                name="startM"
                value={startM}
              />
            </div>
          )}
          {title === '체류시간' && (
            <div>
              체류시간
              <TimeInput
                onChange={onChange}
                placeholder="시간"
                name="stayH"
                value={stayH}
              />
              <TimeInput
                onChange={onChange}
                placeholder="분"
                name="stayM"
                value={stayM}
              />
            </div>
          )}
        </Container>
      </ModalModule>
    </>
  );
};

export default Time;
