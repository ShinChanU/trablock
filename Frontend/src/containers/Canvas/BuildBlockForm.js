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
  // const [userPlan, setUserPlan] = useState(null);
  const [globalLocations, setGlobalLocations] = useState(null);
  const [submitting, setSubmitting] = useState(true);
  const { getPlan, userPlan, zipSelLoc } = useStore();
  const { getSysLoc, sysCateLoc, sysLoc } = sysLocStore();
  //
  //

  const getData = useCallback(async () => {
    // const userPlanResult = await axios.get(
    //   'http://localhost:8080/travelPlans/1',
    // );
    // setUserPlan(userPlanResult.data);
    // const globalLocationsResult = await axios.get(
    //   'http://localhost:8080/locations',
    // );
    // setGlobalLocations(globalLocationsResult.data);
    getPlan(1).then((data) => console.log(data));
    getSysLoc();
    zipSelLoc([
      {
        id: 1,
        name: '한라산',
        address1: '',
        address2: '',
        coords: '',
        image: 'https://i.ibb.co/zJMMHVD/image.jpg',
        type: '1',
        parking: true,
        restDate: '',
        useTime: '',
      },
      {
        id: 2,
        name: '곰막식당',
        address1: '',
        address2: '',
        coords: '',
        image: 'https://i.ibb.co/zJMMHVD/image.jpg',
        type: '6',
        parking: true,
        restDate: '',
        useTime: '',
      },
    ]);
    console.log(sysLoc);
    // getPlan(1).then((data) => console.log(data));
    // console.log(getPlan(1));
    // console.log(getSysLoc());
  }, []);

  useEffect(() => {
    if (submitting) {
      getData();
      // .then(() => setSubmitting(false))
      // .then(console.log(userPlan));
    }
  }, [submitting, getData]);

  // const setUserPlanData = (x) => {
  //   setUserPlan(x);
  //   travelPlan = userPlan;
  //   console.log(userPlan);
  // };

  // travelPlan = userPlan;

  return (
    <>
      {console.log(userPlan, sysCateLoc)}
      {(!userPlan || !sysCateLoc) && '로딩 중..'}
      {userPlan && sysCateLoc && (
        <Container>
          <DndMainArea
            // setUserPlanData={setUserPlanData}
            userPlan={userPlan}
            globalLocations={sysCateLoc}
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
