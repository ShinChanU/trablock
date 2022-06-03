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

const Span = styled.span`
  /* width: 100px; */
  margin-left: 20px;
`;

const DivRadioInput = ({ title, onChange, id, essen, sub }) => {
  return (
    <Div>
      <Label htmlFor={id}>
        {essen && <EssenSpan>*</EssenSpan>}
        {title}
      </Label>
      <div>
        <Span>가능</Span>
        <input
          id={id}
          name={id}
          onChange={onChange}
          type="radio"
          value={true}
        />
        <Span>불가능</Span>
        <input
          id={id}
          name={id}
          onChange={onChange}
          type="radio"
          value={false}
        />
      </div>
    </Div>
  );
};

export default DivRadioInput;
