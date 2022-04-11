import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 60px;
  /* margin-left: 5px; */
  margin-right: 10px;
`;

const TimeInput = ({ placeholder, value, name, onChange }) => {
  return (
    <Input
      type="number"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};

export default TimeInput;
