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
  const { selLocSort, userPlan } = useStore();
  const { loading } = userPlan;

  useEffect(() => {
    selLocSort();
  }, []);

  return (
    <>
      {loading === 0 && <div>로케이션을 담아오세요</div>}
      {loading && (
        <Container>
          <MainArea />
          <Buttons>
            <CreateLoc size="30" />
          </Buttons>
        </Container>
      )}
    </>
  );
};

export default BuildBlockForm;
