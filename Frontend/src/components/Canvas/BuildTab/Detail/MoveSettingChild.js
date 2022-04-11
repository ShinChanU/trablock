import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  MdDirectionsCar,
  MdDirectionsBus,
  MdDirectionsWalk,
  MdDirectionsBike,
} from 'react-icons/md';
import TimeInput from 'components/Canvas/common/TimeInput';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px;
`;

const VehicleDiv = styled.div`
  /* align-items: center; */
`;

const Vehicle = styled.div`
  display: flex;
  margin-left: 10px;
  margin-bottom: 5px;
`;

const VehicleBox = styled.div`
  margin-right: 10px;
`;

const Input = styled.input`
  margin: 0px;
  margin-right: 5px;
  width: 16px;
  height: 16px;
`;

const Time = styled.div`
  margin-left: 20px;
  margin-right: 10px;
`;

// const TimeInput = styled.input`
//   width: 60px;
//   margin-left: 5px;
//   margin-right: 5px;
// `;

const MoveSettingChild = ({ vehicleList, checkHandler, onChange, time }) => {
  // const vehicleList = ['car', 'bus', 'walk', 'bike'];
  // const [isChecked, setIsChecked] = useState(false);
  // const [checkVehicles, setCheckVehicles] = useState(new Set());
  // const [time, setTime] = useState({
  //   hour: '',
  //   minute: '',
  // });

  // const checkedVehicleHandler = (value, isChecked) => {
  //   if (isChecked) {
  //     checkVehicles.add(value);
  //     setCheckVehicles(checkVehicles);
  //   } else if (!isChecked && checkVehicles.has(value)) {
  //     checkVehicles.delete(value);
  //     setCheckVehicles(checkVehicles);
  //   }
  //   console.log(checkVehicles);
  // };

  // const checkHandler = ({ target }) => {
  //   setIsChecked(!isChecked);
  //   checkedVehicleHandler(target.value, target.checked);
  //   console.log(target.value, target.checked);
  // };

  // const onChange = (e) => {
  //   const { name, value } = e.target;
  //   let tmpVal = value;
  //   if (value < 0) {
  //     tmpVal = 0;
  //   }
  //   if (value.length > 3) {
  //     tmpVal = Math.floor(value / 10);
  //   }
  //   setTime({
  //     ...time,
  //     [name]: tmpVal,
  //   });
  // };

  return (
    <Container>
      <VehicleDiv>
        <Vehicle>
          <MdDirectionsCar style={{ marginRight: '5px' }} />
          <MdDirectionsBus style={{ marginRight: '5px' }} />
          <MdDirectionsWalk style={{ marginRight: '5px' }} />
          <MdDirectionsBike style={{ marginRight: '5px' }} />
        </Vehicle>
        <Vehicle>
          {vehicleList.map((e, i) => (
            <Input
              type="checkbox"
              value={e}
              onChange={(e) => checkHandler(e)}
            />
          ))}
        </Vehicle>
      </VehicleDiv>
      <Time>
        <div>소요 시간(선택)</div>
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
        {/* <TimeInput
          type="number"
          placeholder="시간"
          value={time.hour}
          onChange={onChange}
          name="hour"
        />
        <TimeInput
          type="number"
          placeholder="분"
          value={time.minute}
          onChange={onChange}
          name="minute"
        /> */}
        <div>
          {time.hour}시간 {time.minute}분 소요
        </div>
      </Time>
    </Container>
  );
};

export default MoveSettingChild;

// https://goddino.tistory.com/229
