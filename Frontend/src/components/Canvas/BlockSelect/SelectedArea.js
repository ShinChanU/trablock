import React, { useState } from 'react';
import styled from 'styled-components';


const BlueBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 700px;
  height: 100px;
  background: skyblue;
  border-radius: 8px;
`;

const Blockssss = styled.div`
  margin: 5px;
  width: 336px;
  height: 50px;
  left: 331px;
  top: 332px;
  background: violet;
`;

const SelectedArea = () => {

  return (
    <div>
      <BlueBox>

      </BlueBox>
    </div>
  );
};

export default SelectedArea;