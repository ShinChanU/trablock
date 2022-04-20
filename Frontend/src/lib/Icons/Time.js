// 시간 추가, 변경 버튼
import React, { useEffect, useState } from 'react';
import { MdMoreTime } from 'react-icons/md';
import styled from 'styled-components';
import ModalModule from 'components/common/modal/ModalModule';
import TimeInput from 'components/Canvas/common/TimeInput';
import ReactTooltip from 'react-tooltip';
import { useStore } from 'lib/store';
import produce from 'immer';

const TimeBtn = styled(MdMoreTime)`
  cursor: pointer;
  /* margin-left: 7px; */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-left: 10px;
`;

const Time = ({ title, day, index }) => {
  const { setTimeData } = useStore();
  // const { id, stayTime, startTime } = day;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [stayTime, setStayTime] = useState({
    hour: '',
    min: '',
  });
  const [startTime, setStartTime] = useState('00:00');
  // const { hour, min } = stayTime;

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const onChangeStayTime = (e) => {
    const { name, value } = e.target;
    // if()
    if (value.length > 2) {
      console.log(name);
      setStayTime({
        ...stayTime,
        [name]: '00',
      });
      return;
    }
    if (parseInt(value) < 0) {
      setStayTime({
        ...stayTime,
        [name]: 0,
      });
    } else if (name === 'hour' && parseInt(value) >= 24) {
      setStayTime({
        ...stayTime,
        hour: '23',
      });
    } else if (name === 'min' && parseInt(value) >= 60) {
      setStayTime({
        ...stayTime,
        min: '59',
      });
    } else {
      setStayTime({
        ...stayTime,
        [name]: value,
      });
    }
  };

  const onSubmit = (e) => {
    console.log(day.days, index);
    console.log(startTime, stayTime);
    if (index === 0) {
      setTimeData(day.days, index, startTime, 'time');
    } else {
      setTimeData(day.days, index, stayTime, 'time');
    }
    closeModal();
  };

  const { hour, min } = stayTime;
  return (
    <>
      <TimeBtn size="18" onClick={openModal} data-tip data-for="time" />
      <ReactTooltip id="time" place="right" type="info" effect="solid">
        <div>여행계획에 필요한 시간을 설정해주세요.</div>
      </ReactTooltip>
      <ModalModule
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        title={title}
        onSubmit={onSubmit}
        day={day}
      >
        <Container>
          {title === '출발시각' && (
            <div>
              출발시각
              <Input
                type="time"
                value={startTime}
                onChange={onChangeStartTime}
              />
            </div>
          )}
          {title === '체류시간' && (
            <>
              <div>
                <Input
                  type="number"
                  onChange={onChangeStayTime}
                  placeholder="시간"
                  name="hour"
                  value={hour}
                  min="0"
                  max="23"
                />
                &nbsp;시간
                <Input
                  type="number"
                  onChange={onChangeStayTime}
                  placeholder="분"
                  name="min"
                  value={min}
                  min="0"
                  max="59"
                />
                &nbsp;분
              </div>
              <div>
                {parseInt(hour) > 0 ? `${hour}시간` : ''}
                {parseInt(min) > 0 ? ` ${min}분` : ''}
                {parseInt(hour) > 0 || parseInt(min) > 0 ? ' 체류 예상' : ''}
              </div>
            </>
          )}
        </Container>
      </ModalModule>
    </>
  );
};

export default Time;
