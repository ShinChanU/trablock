import React from 'react';
import styled from 'styled-components';
import {
  MdDirectionsCar,
  MdDirectionsBus,
  MdDirectionsWalk,
  MdDirectionsBike,
} from 'react-icons/md';
// import TimeInput from 'components/Canvas/common/TimeInput';

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

const Input = styled.input`
  margin: 0px;
  margin-right: 5px;
  width: 16px;
  height: 16px;
`;

const TimeInput = styled.input`
  margin-left: 10px;
`;

const Time = styled.div`
  margin-left: 20px;
  margin-right: 10px;
`;

const MoveSettingChild = ({
  vehicleList,
  checkHandler,
  onChange,
  time,
  checkVehicles,
}) => {
  const { hour, min } = time;
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
              key={i}
              checked={checkVehicles.includes(e) ? true : false}
            />
          ))}
        </Vehicle>
      </VehicleDiv>
      <Time>
        <div>이동 시간</div>
        <TimeInput
          type="number"
          onChange={onChange}
          placeholder="시간"
          name="hour"
          value={hour}
          min="0"
          max="23"
        />
        <TimeInput
          type="number"
          onChange={onChange}
          placeholder="분"
          name="min"
          value={min}
          min="0"
          max="59"
        />
        <div>
          {parseInt(hour) > 0 ? `${hour}시간` : ''}
          {parseInt(min) > 0 ? ` ${min}분` : ''}
          {parseInt(hour) > 0 || parseInt(min) > 0 ? ' 이동 예상' : ''}
        </div>
      </Time>
    </Container>
  );
};

export default MoveSettingChild;

// https://goddino.tistory.com/229
