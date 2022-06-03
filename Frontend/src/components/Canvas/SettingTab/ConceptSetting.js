import React from 'react';
import { useStore } from 'lib/store/planStore';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

const TitleSpan = styled.span`
  font-size: 1.2em;
`;
const ConceptSettingDiv = styled.div`
  margin-top: 10px;
  margin-left: 30px;
  width: 40%;
  height: 180px;
  @media only screen and (max-width: 800px) {
    width: 80%;
    height: 100px;
  }
`;
const TooltipButton = styled.button`
  margin-left: 10px;
  border: 1px solid gray;
  cursor: pointer;
  border-radius: 100%;
  font-size: 1.2em;
  :hover {
    background: lightgray;
  }
`;
const CheckboxDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 20px;
  font-weight: bold;
`;
const ElementDiv = styled.li`
  list-style: none;
  width: 20%;
`;

export const ConceptSetting = () => {
  const { userPlanConcept, Concepts, setConcept } = useStore();

  const onClickConcept = (checked, word) => {
    if (checked) {
      setConcept([...userPlanConcept.concept, word]);
    } else {
      setConcept(userPlanConcept.concept.filter((el) => el !== word));
    }
  };

  return (
    <ConceptSettingDiv>
      <TitleSpan>3. 여행 컨셉 </TitleSpan>
      <TooltipButton data-tip data-for="conceptsetting">
        ?
      </TooltipButton>
      <ReactTooltip
        id="conceptsetting"
        place="right"
        type="info"
        effect="solid"
      >
        <div>블록 추천을 위해 누구와 함께 여행하는지 알려주세요.</div>
      </ReactTooltip>
      <CheckboxDiv>
        {Concepts.map((item, id) => {
          return (
            <ElementDiv key={id}>
              <input
                type="checkbox"
                onChange={(e) => {
                  onClickConcept(e.target.checked, `${item.eword}`);
                }}
                checked={
                  userPlanConcept.concept.includes(item.eword) ? true : false
                }
              />{' '}
              {item.name}
            </ElementDiv>
          );
        })}
      </CheckboxDiv>
    </ConceptSettingDiv>
  );
};
