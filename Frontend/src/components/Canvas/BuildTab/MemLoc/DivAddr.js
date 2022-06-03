import React from 'react';
import styled, { css } from 'styled-components';
import OpenColor from 'open-color';

const Div = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  width: 35%;
`;

const EssenSpan = styled.span`
  color: red;
`;

const AddressDiv = styled.div`
  width: 65%;
  ${(props) =>
    props.val !== '' &&
    css`
      border: 2.5px ${OpenColor.teal[4]} solid;
      border-radius: 5px;
    `}
`;

const DivAddr = ({ title, id, val, essen }) => {
  return (
    <Div>
      <Label htmlFor={id}>
        {essen && <EssenSpan>*</EssenSpan>}
        {title}
      </Label>
      <AddressDiv val={val}>
        {val ? `${val}` : `검색 후 선택하거나,  지도에 표시해주세요.`}
      </AddressDiv>
    </Div>
  );
};

export default DivAddr;
