import React, { useState } from 'react';
import styled from 'styled-components';
import {
  MdDirectionsCar,
  MdDirectionsBus,
  MdDirectionsWalk,
  MdDirectionsBike,
} from 'react-icons/md';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 5px;
`;
const Vehicle = styled.div`
  display: flex;
  margin-left: 10px;
`;

const VehicleBox = styled.div`
  margin-right: 10px;
`;

const Time = styled.div`
  margin-right: 10px;
`;

const TimeInput = styled.input`
  width: 60px;
  margin-left: 5px;
  margin-right: 5px;
`;

const MoveSettingChild = () => {
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
  return (
    <Container>
      <Vehicle>
        <VehicleBox>
          <div>
            <MdDirectionsCar />
          </div>
          <input type="checkbox" />
        </VehicleBox>
        <VehicleBox>
          <div>
            <MdDirectionsBus />
          </div>
          <input type="checkbox" />
        </VehicleBox>
        <VehicleBox>
          <div>
            <MdDirectionsWalk />
          </div>
          <input type="checkbox" />
        </VehicleBox>
        <VehicleBox>
          <div>
            <MdDirectionsBike />
          </div>
          <input type="checkbox" />
        </VehicleBox>
      </Vehicle>
      <Time>
        <div>소요 시간(선택)</div>
        <TimeInput
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
        />
        <div>
          {time.hour}시간 {time.minute}분 소요
        </div>
      </Time>
    </Container>
  );
};

export default MoveSettingChild;
