import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdMode } from 'react-icons/md';
import oc from 'open-color';
// import Modal from 'react-modal';
import 'lib/styles/Modal.css';
// import ModalModule from './ModalModule';
import ModalModule from 'components/common/modal/ModalModule';
import MoveSettingChild from './MoveSettingChild';
import { useStore } from 'lib/store';
// import Map from '../Map';

const Container = styled.div`
  position: relative;
`;

const Div = styled.div`
  position: absolute;
  // 수정 예정 0317
  left: 270px;
  top: -20px;
  :after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 15px;
    top: 50%;
    margin-top: -10px;
    /* border-color: transparent ${oc.teal[6]} transparent transparent; */
    border-color: transparent black transparent transparent;
    left: -25px;
  }
  :hover {
    cursor: pointer;
  }
`;

const Span = styled.span`
  /* border: 1px solid black; */
  display: inline-block;
  padding: 5px;
  color: white;
  /* background: blue; */
  /* background-color: ${oc.teal[6]}; */
  background-color: black;
  border-radius: 20px;
`;

const BubbleDiv = styled.div`
  display: flex;
  ${(props) =>
    props.margin &&
    css`
      padding-left: 10px;
      color: red;
      /* margin-left: 30px; */
    `}
`;

const MoveDataDiv = ({ day, index }) => {
  const { userPlan, setTimeData } = useStore();
  const vehicleList = ['car', 'bus', 'walk', 'bike'];
  const [isChecked, setIsChecked] = useState(false);
  const [checkVehicles, setCheckVehicles] = useState(new Set());
  const [time, setTime] = useState({
    hour: '',
    minute: '',
  });
  const [moveObj, setMoveObj] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const checkedVehicleHandler = (value, isChecked) => {
    if (isChecked) {
      checkVehicles.add(value);
      setCheckVehicles(checkVehicles);
    } else if (!isChecked && checkVehicles.has(value)) {
      checkVehicles.delete(value);
      setCheckVehicles(checkVehicles);
    }
    console.log(checkVehicles);
  };

  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    checkedVehicleHandler(target.value, target.checked);
    console.log(target.value, target.checked);
  };

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

  const getTime = (time) => {
    let hour = Number(time.hour);
    let minute = Number(time.minute);
    if (minute > 60) {
      hour += Math.floor(minute / 60);
      minute = minute % 60;
      // return `${hour} h ${minute} min`;
    }
    if (hour === 0) {
      // return `${minute} min`;
    } else {
      // return `${hour} h ${minute} min`;
    }
    return [hour, minute];
  };

  const onSubmit = (e) => {
    let tmp = getTime(time);
    setTime({
      hour: tmp[0],
      minute: tmp[1],
    });
    setTimeData(day.days, index, time, 'move');
    closeModal();
  };

  return (
    <Container>
      <Div>
        <Span>
          <MdMode onClick={openModal} />
        </Span>
        {console.log(
          userPlan.travelDays[day.days - 1].locations[index].movingTime,
        )}
        {/* 작업중 0411 */}
      </Div>
      {/* {userPlan.movingTime === undefined && (
        <Div>
          <Span>
            <MdMode onClick={openModal} />
          </Span>
        </Div>
      )}
      {moveData[index] !== undefined && (
        <Div>
          <Span>
            <BubbleDiv>
              {moveObj.vehicle}
              <BubbleDiv margin>
                <div>{getTime(moveObj.time)}</div>
                <MdMode onClick={openModal} />
              </BubbleDiv>
            </BubbleDiv>
          </Span>
        </Div>
      )} */}
      <ModalModule
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        title="이동수단"
        onSubmit={onSubmit}
      >
        <MoveSettingChild
          vehicleList={vehicleList}
          checkHandler={checkHandler}
          onChange={onChange}
          time={time}
        />
        {/* 내부요소, children */}
      </ModalModule>
    </Container>
  );
};

export default MoveDataDiv;

// ,
//           "moveData": [
//             {
//               "vehicle": "car",
//               "time": "100"
//             }
//           ]
