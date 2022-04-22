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
import {
  MdDirectionsCar,
  MdDirectionsBus,
  MdDirectionsWalk,
  MdDirectionsBike,
} from 'react-icons/md';

const Container = styled.div`
  position: relative;
  width: 500px; // 이동 데이터 풍선과 관련
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
  vertical-align: middle;
  /* margin: auto; */
  /* align-items: center; */
  padding: 5px;
  color: white;
  line-height: 30px;
  /* background: blue; */
  background-color: black;
  border-radius: 20px;
`;

const BubbleDiv = styled.div`
  display: flex;
  align-items: center;
  ${(props) =>
    props.margin &&
    css`
      /* padding-left: 10px; */
      /* color: red; */
      /* margin-left: 30px; */
    `}
  > div {
    margin-right: 5px;
  }
`;

const TimeDiv = styled.div`
  margin-right: 5px;
`;

const MoveDataDiv = ({ day, index }) => {
  const { userPlan, setTimeData, setViewTime, splitTime } = useStore();
  const vehicleList = ['car', 'bus', 'walk', 'bike'];
  const [isChecked, setIsChecked] = useState(false);
  const [checkVehicles, setCheckVehicles] = useState(new Set());
  const [time, setTime] = useState({
    hour: '',
    min: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const locInfo = userPlan.travelDays[day.days - 1].locations[index];

  useEffect(() => {
    if (locInfo.movingTime !== '') {
      let [hour, min] = splitTime(locInfo.movingTime);
      console.log(hour, min);
      setTime({
        hour,
        min,
      });
    }
  }, [locInfo.movingTime, splitTime, locInfo.vehicles, checkVehicles]);

  const checkedVehicleHandler = (value, isChecked) => {
    if (isChecked) setCheckVehicles((prev) => new Set(prev.add(value)));
    else if (!isChecked && checkVehicles.has(value))
      setCheckVehicles((prev) => new Set([...prev].filter((x) => x !== value)));
  };

  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    checkedVehicleHandler(target.value, target.checked);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 2) {
      console.log(value.substr(0, 2));
      setTime({
        ...time,
        [name]: value.substr(0, 2),
      });
      return;
    }
    if (parseInt(value) < 0) {
      setTime({
        ...time,
        [name]: 0,
      });
    } else if (name === 'hour' && parseInt(value) >= 24) {
      setTime({
        ...time,
        hour: '23',
      });
    } else if (name === 'min' && parseInt(value) >= 60) {
      setTime({
        ...time,
        min: '59',
      });
    } else {
      setTime({
        ...time,
        [name]: value,
      });
    }
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSubmit = () => {
    console.log(...checkVehicles);
    setTimeData(day.days, index, time, 'move', [...checkVehicles]);
    closeModal();
  };

  return (
    <Container>
      {locInfo.movingTime === undefined && (
        <Div>
          <Span>
            <MdMode onClick={openModal} />
          </Span>
        </Div>
      )}
      {locInfo.movingTime !== undefined && (
        <Div>
          <Span>
            <BubbleDiv>
              <BubbleDiv margin>
                {locInfo.vehicles.map((e) => {
                  switch (e) {
                    case 'car':
                      return (
                        <div key={e}>
                          <MdDirectionsCar />
                        </div>
                      );
                    case 'bus':
                      return (
                        <div key={e}>
                          <MdDirectionsBus />
                        </div>
                      );
                    case 'walk':
                      return (
                        <div key={e}>
                          <MdDirectionsWalk />
                        </div>
                      );
                    case 'bike':
                      return (
                        <div key={e}>
                          <MdDirectionsBike />
                        </div>
                      );
                    default:
                      break;
                  }
                })}
                {locInfo.movingTime && (
                  <TimeDiv>{setViewTime(locInfo.movingTime)}</TimeDiv>
                )}
                <MdMode onClick={openModal} size="20px" />
              </BubbleDiv>
            </BubbleDiv>
          </Span>
        </Div>
      )}
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
          checkVehicles={[...checkVehicles]}
        />
      </ModalModule>
    </Container>
  );
};

export default MoveDataDiv;
