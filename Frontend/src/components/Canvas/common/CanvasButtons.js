import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import StyledButton from 'components/common/Button';
import {
  planDepart,
  planPeriods,
  planConcept,
  planDestination,
} from 'containers/Canvas/TravelSettingForm';
import { travelPlan } from 'containers/Canvas/BuildBlockForm';

const AllbuttonsDiv = styled.div`
  height: 50px;
  /* position: relative; */
  /* top: 80%; */
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 30px;
  margin-right: 20px;
  margin-top: 10px;
`;

const ButtonDiv = styled.div`
  margin-bottom: 2px;

  .next {
    /* float: left; */
    /* margin-left: 70%; */
  }

  .exit {
    /* flex: 1; */
    /* float: right; */
    /* margin-right: 7%; */
  }

  .prev {
    /* float: left; */
    /* margin-left: 5%; */
  }
`;

const siteMap = ['setting', 'select', 'build', 'share'];

const CanvasButtons = () => {
  const location = useLocation();

  // location.pathname은 '/canvas/setting'
  // const idx = siteMap.indexOf(location.pathname.substring(8));

  const urlName = location.pathname.replace(/\/trablock\/canvas\//g, '');
  const idx = siteMap.indexOf(urlName); // 0316 찬우 수정

  // 다음 버튼: post 에러로 patch 사용
  const onClickSettingNextButton = (id) => {
    const pid = id; //plan id
    axios
      .patch(`http://localhost:8080/travelPlans/${pid}`, {
        //URL 수정
        periods: planPeriods,
        concept: planConcept,
        startDay: planDepart,
        destination: planDestination,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //0319 추가, 다른 데이터 추가 예정
  const onClickBuildNextButton = (id) => {
    const pid = id; //plan id
    console.log(travelPlan);
    axios
      .patch(`http://localhost:8080/travelPlans/${pid}`, {
        //URL 수정
        travelDays: travelPlan.travelDays,
        selectedLocations: travelPlan.selectedLocations,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onClickNext = (idx) => {
    idx === 0 ? onClickSettingNextButton(1) : console.log('next');
    // idx === 0 ? onClickSettingNextButton(1) : console.log('next');
    idx === 2 ? onClickBuildNextButton(1) : console.log('next');
    // idx === 0 ? onClickSettingNextButton(1) : console.log('next');
  };

  const onClickPrev = () => {
    console.log('prev');
  };

  // const LastPageButton = () => {
  //   alert('마지막 페이지입니다.');
  // };

  // const FirstPageButton = () => {
  //   alert('첫 페이지입니다.');
  // };

  return (
    <AllbuttonsDiv>
      <Div>
        <ButtonDiv className="prev">
          <Link to={process.env.PUBLIC_URL + `/canvas/${siteMap[idx - 1]}`}>
            {idx !== 0 && (
              <StyledButton onClick={onClickPrev}> &lt; 이전으로</StyledButton>
            )}
            {/* 리팩토링 0319 신찬우 */}
            {/* <StyledButton
              onClick={() => {
                idx === 0 ? FirstPageButton() : onClickPrev();
              }}
            >
              &lt; 이전으로
            </StyledButton> */}
          </Link>
        </ButtonDiv>
        <div>
          <ButtonDiv className="next">
            <Link
              to={
                process.env.PUBLIC_URL +
                `/canvas/${idx === 3 ? siteMap[3] : siteMap[idx + 1]}`
              }
            >
              {idx !== 3 && (
                <StyledButton
                  onClick={() => {
                    onClickNext(idx);
                  }}
                >
                  다음으로 &gt;
                </StyledButton>
              )}
              {/* <StyledButton
                onClick={() => {
                  idx === 3 ? LastPageButton() : onClickNext(idx);
                }}
              >
                다음으로 &gt;
              </StyledButton> */}
            </Link>
          </ButtonDiv>
          <ButtonDiv className="exit">
            <Link to="/trablock">
              <StyledButton onClick={() => console.log('나가기')}>
                저장하고 나가기
              </StyledButton>
            </Link>
          </ButtonDiv>
        </div>
      </Div>
    </AllbuttonsDiv>
  );
};

export default CanvasButtons;
