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

const Input = styled.input`
  width: 65%;
  ${(props) =>
    !props.sub &&
    props.value !== '' &&
    css`
      border: 2.5px ${OpenColor.teal[4]} solid;
      border-radius: 5px;
    `}
`;

const Textarea = styled.textarea`
  width: 65%;
  ${(props) =>
    !props.sub &&
    props.value !== '' &&
    css`
      border: 2.5px ${OpenColor.teal[4]} solid;
      border-radius: 5px;
    `}
`;

const DivInput = ({
  title,
  onChange,
  val,
  id,
  placeholder,
  essen,
  detail,
  sub,
}) => {
  return (
    <Div>
      <Label htmlFor={id}>
        {essen && <EssenSpan>*</EssenSpan>}
        {title}
      </Label>
      {sub && (
        <Input
          id={id}
          name={id}
          onChange={onChange}
          value={val}
          placeholder={placeholder}
          sub
        />
      )}
      {!sub && !detail && (
        <Input
          id={id}
          name={id}
          onChange={onChange}
          value={val}
          placeholder={placeholder}
        />
      )}
      {detail && (
        <Textarea
          id={id}
          name={id}
          onChange={onChange}
          value={val}
          placeholder={placeholder}
        />
      )}
    </Div>
  );
};

export default DivInput;
