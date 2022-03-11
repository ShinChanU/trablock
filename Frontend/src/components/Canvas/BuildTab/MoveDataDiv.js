import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { MdMode } from 'react-icons/md';
import oc from 'open-color';
import Modal from 'react-modal';
import './Styles/Modal.css';

// modal 만들기 0311
const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    // height: '200px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Div = styled.div`
  // 오른쪽 정렬 필요 0310
  position: relative;
  display: inline-block;
  /* float: right; */
  /* clear: both; */
  :after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 15px;
    top: 50%;
    margin-top: -10px;
    border-color: transparent ${oc.indigo[2]} transparent transparent;
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
  background-color: ${oc.indigo[2]};
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
  const [moveObj, setMoveObj] = useState(moveData[index]);
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
    <>
      {moveData[index] === undefined && (
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
                {getTime(moveObj.time)}
                <MdMode onClick={openModal} />
              </BubbleDiv>
            </BubbleDiv>
          </Span>
        </Div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // portalClassName="modal"
        style={customStyles}
      >
        <button onClick={closeModal}>Modal Close</button>
      </Modal>
    </>
  );
};

export default MoveDataDiv;
