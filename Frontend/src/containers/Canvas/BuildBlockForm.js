import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DndMainArea from 'components/Canvas/BuildTab/DndMainArea';
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
  const { selLocSort, selLoc, userPlan } = useStore();

  useEffect(() => {
    selLocSort();
  }, []);

  return (
    <>
      {Object.keys(selLoc).length === 0 && <div>로딩 중....</div>}
      {Object.keys(selLoc).length !== 0 && (
        <Container>
          <DndMainArea
            // setUserPlanData={setUserPlanData}
            userPlan={userPlan}
            selLoc={selLoc}
          />
          <Buttons>
            <CreateLoc size="30" />
          </Buttons>
        </Container>
      )}
    </>
  );
};

export default BuildBlockForm;
