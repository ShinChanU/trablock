import React, { useState } from 'react';
import { useStore } from 'lib/store/planStore';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import oc from 'open-color';

const TitleSpan = styled.span`
  font-size: 1.2em;
`;
const TooltipButton = styled.button`
  margin-left: 10px;
  border: 1px solid gray;
  border-radius: 100%;
  cursor: pointer;
  font-size: 1.2em;
  :hover {
    background: lightgray;
  }
`;
const DestinationSettingDiv = styled.div`
  margin-top: 10px;
  margin-left: 30px;
  height: 350px;
  width: 95%;
`;
//탭 메뉴
const TabMenu = styled.ul`
  background: white;
  height: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0;
  padding-left: 0.3%;
  padding-right: 0.3%;
  font-weight: bold;
  list-style: none;
  border: 1px solid;
  .submenu {
    flex: 0 1 50%;
    cursor: pointer;
    height: 80%;
    padding-top: 2px;
  }
  .focused {
    //background-color: ${oc.teal[6]};
    background-color: rgb(109, 144, 176);
    color: white;
  }
  & div.desc {
    text-align: center;
  }
`;
//탭내용
const TabInner = styled.ul`
  background: white;
  display: flex;
  flex-flow: row wrap;
  //justify-items: center;
  //justify-content: space-evenly;
  height: 235px; //80%;;
  margin-top: 5px;
  padding: 15px;
  list-style: none;
  border: 1px solid;
  overflow: auto;
  .submenu {
    //flex: 0 1 300px;
    flex: 0 1 18.7%;
    align-self: flex-start;
    margin: 10px;
    cursor: pointer;
    text-align: center;
    border: 1px solid gray;
    height: 180px;
  }
  .focused {
    //background-color: ${oc.teal[3]};
    background-color: rgb(109, 144, 176);
    color: white;
    //height: 100%;
    align-items: center;
  }
`;
const TabDiv = styled.div`
  height: 90%;
  padding-left: 20px;
  padding-top: 20px;
  width: 95%;
`;

const tabTitle = ['인기', '국내'];
const DestinationArr = {
  0: ['제주도', '어딘가', '여기도', '좋아요'],
  1: ['제주도', '서울', '부산', '대전', '인천', '어딘가', '여기도', '좋아요'],
};

export const DestSetting = () => {
  const { userPlan, setDestination } = useStore();
  const [activeTab, setActiveTab] = useState(0);
  //const [activeDest, setActiveDest] = useState(0);

  const onClickTab = (tabIdx) => {
    setActiveTab(tabIdx);
  };
  const onClickDestination = (destination /*, destIdx*/) => {
    console.log(destination);
    //setActiveDest(destIdx);
    setDestination(destination);
  };

  return (
    <DestinationSettingDiv>
      <TitleSpan>2. 여행지 설정 </TitleSpan>
      <TooltipButton data-tip data-for="departsetting">
        ?
      </TooltipButton>
      <ReactTooltip id="departsetting" place="right" type="info" effect="solid">
        <div>
          현재 서비스 중인 여행지만 선택할 수 있습니다.
          <br />
          향후 서비스 될 여행지는 공지사항을 참고해주세요.
        </div>
      </ReactTooltip>
      <TabDiv>
        <TabMenu>
          {tabTitle.map((el, tabIdx) => {
            return (
              <li
                key={tabIdx}
                className={`${
                  tabIdx === activeTab ? 'submenu focused' : 'submenu'
                }`}
                onClick={() => onClickTab(tabIdx)}
              >
                {el}
              </li>
            );
          })}
        </TabMenu>
        <TabInner>
          {DestinationArr[activeTab].map((dest, destIdx) => {
            return (
              <li
                key={destIdx}
                className={`${
                  userPlan.destination !== ''
                    ? DestinationArr[activeTab].indexOf(
                        userPlan.destination,
                      ) === destIdx
                      ? 'submenu focused'
                      : 'submenu'
                    : 'submenu'
                }`}
                //onClick={() => onClickDestination(dest, destIdx)}
                onClick={() => onClickDestination(dest)}
              >
                {dest}
              </li>
            );
          })}
        </TabInner>
      </TabDiv>
    </DestinationSettingDiv>
  );
};
