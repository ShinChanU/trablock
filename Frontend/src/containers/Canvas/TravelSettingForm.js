import { DateSetting } from 'components/Canvas/SettingTab/DateSetting';
import { ConceptSetting } from 'components/Canvas/SettingTab/ConceptSetting';
import { DestSetting } from 'components/Canvas/SettingTab/DestSetting';
import { ImageSetting } from 'components/Canvas/SettingTab/ImageSetting';
import React, { useEffect } from 'react';
import { useStore } from 'lib/store/planStore';
import styled from 'styled-components';

const StyledDiv = styled.div`
  @media only screen and (min-width: 800px) {
    display: flex;
  }
`;
const TravelSettingForm = () => {
  // 여행 계획 이어서 버튼 누르면
  const { getPlan } = useStore();

  // useEffect(() => {
  //   getPlan(2);
  // }, [getPlan]);

  return (
    <div>
      <DateSetting />
      <DestSetting />
      <StyledDiv>
        <ConceptSetting />
        <ImageSetting />
      </StyledDiv>
    </div>
  );
};

export default TravelSettingForm;
