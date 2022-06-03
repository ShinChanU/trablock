import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Pencil from 'lib/Icons/Pencil';
import { useStore } from 'lib/store/planStore';

const NamingDiv = styled.div`
  display: flex;
  margin-top: 15px;
  height: 50px;
  width: 50%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const StyledInput = styled.input`
  border: none;
  font-size: 1.2em;
  height: 40px;
  width: 50%;
  background: none;
  ${(props) =>
    props.disabled ||
    css`
      border: solid 1px gray;
      border-radius: 5px;
    `}
`;

const PencilButton = styled.button`
  border: none;
  margin-left: 3%;
  height: 85%;
  width: 6%;
  cursor: pointer;
  :hover {
    background: lightgray;
    border-radius: 10px;
  }
`;

const PlanName = () => {
  const [isDisabled, setIsDisabled] = useState(true); // input 활성화
  const [isChecked, setIsChecked] = useState(true); // 펜, 저장 버튼 변경
  const { userPlan, setName, postPlan } = useStore();

  const onClickPencil = () => {
    setIsDisabled(!isDisabled);
    setIsChecked(!isChecked);
  };

  const onClickSave = () => {
    postPlan(1);
    setIsChecked(!isChecked);
    setIsDisabled(!isDisabled);
  };

  const Naming = (e) => {
    setName(e.target.value);
  };

  return (
    <NamingDiv>
      <StyledInput
        type="text"
        disabled={isDisabled}
        value={userPlan.name}
        onChange={Naming}
      />
      <PencilButton
        type="button"
        onClick={() => {
          isChecked ? onClickPencil() : onClickSave();
        }}
      >
        {isChecked ? <Pencil size="20" /> : '저장'}
      </PencilButton>
    </NamingDiv>
  );
};

export default PlanName;
