import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import StyledButton from 'components/common/Button';
import { useStore } from 'lib/store/planStore';

const AllbuttonsDiv = styled.div`
  height: 50px;
  top: 80%;
`;

const ButtonDiv = styled.div`
  text-align: right;
  position: relative;
  top: 15%;
  .next {
    float: left;
    margin-left: 70%;
  }
  .exit {
    float: right;
    margin-right: 7%;
  }
  .prev {
    float: left;
    margin-left: 5%;
  }
`;

const siteMap = ['setting', 'select', 'build', 'share'];

const CanvasButtons = () => {
  const location = useLocation();
  const { postPlan } = useStore();

  const urlName = location.pathname.replace(/\/trablock\/canvas\//g, '');
  const idx = siteMap.indexOf(urlName);

  const onClickSettingNextButton = () => {
    postPlan(2);
  };

  const onClickNext = (idx) => {
    idx === 0 ? onClickSettingNextButton() : console.log('next');
  };
  const onClickPrev = () => {
    console.log('prev');
  };
  const onClickExit = () => {
    postPlan(1);
    console.log('저장하고 나가기');
  };

  return (
    <AllbuttonsDiv>
      <ButtonDiv>
        <ButtonDiv className="prev">
          <Link to={process.env.PUBLIC_URL + `/canvas/${siteMap[idx - 1]}`}>
            {idx !== 0 && (
              <StyledButton onClick={onClickPrev}> &lt; 이전으로</StyledButton>
            )}
          </Link>
        </ButtonDiv>
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
                  onClickNext(0);
                }}
              >
                다음으로 &gt;
              </StyledButton>
            )}
          </Link>
        </ButtonDiv>
        <ButtonDiv className="exit">
          <Link to="/trablock">
            {/*trablock*/}
            <StyledButton
              onClick={() => {
                onClickExit();
              }}
            >
              저장하고 나가기
            </StyledButton>
          </Link>
        </ButtonDiv>
      </ButtonDiv>
    </AllbuttonsDiv>
  );
};

export default CanvasButtons;
