import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdMode } from 'react-icons/md';
import oc from 'open-color';
// import Modal from 'react-modal';
import 'lib/styles/Modal.css';
// import ModalModule from './ModalModule';
import ModalModule from 'components/common/modal/ModalModule';
import MoveSettingChild from './MoveSettingChild';
import Map from './Map';

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
    border-color: transparent ${oc.teal[6]} transparent transparent;
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
  background-color: ${oc.teal[6]};
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

const MoveDataDiv = ({ moveData, index }) => {
  const [moveObj, setMoveObj] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getTime = (time) => {
    let hour = 0;
    let minute = time;
    if (time > 60) {
      hour = Math.floor(time / 60);
      minute = time % 60;
      return `${hour} h ${minute} min`;
    } else {
      return `${minute} min`;
    }
  };

  return (
    <Container>
      <Div>
        <Span>
          <MdMode onClick={openModal} />
        </Span>
      </Div>
      {/* {moveData[index] === undefined && (
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
      >
        <MoveSettingChild />
        {/* 내부요소, chlidren */}
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
