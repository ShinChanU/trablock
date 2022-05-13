import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MainArea from 'components/Canvas/BuildTab/MainArea';
import CreateLoc from 'lib/Icons/CreateLoc';
import palette from 'lib/styles/palette';
import { useStore, sysLocStore } from 'lib/store';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin-top: 10px; */
  background-color: ${palette.gray[3]};
  height: 70vh;
  overflow: auto;
  /* border-radius: 7px; */
`;

const Buttons = styled.div`
  width: 100px;
`;

export let travelPlan = {};

const BuildBlockForm = () => {
  const { userTravelDay, selCateLoc } = useStore();

  useEffect(() => {
    console.log(selCateLoc, selCateLoc);
  }, []);

  return (
    <>
      <Container>
        <MainArea />
        {/* <Buttons>
          <CreateLoc size="30" />
        </Buttons> */}
      </Container>
    </>
  );
};

export default BuildBlockForm;
