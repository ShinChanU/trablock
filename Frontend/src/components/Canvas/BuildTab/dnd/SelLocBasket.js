import React, { useEffect, useState } from 'react';
import Location from '../LocDetail/Location';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  transition: all 0.3s;
  margin-right: 8px;
  ${(props) =>
    !props.isOpen &&
    css`
      width: 0vw;
    `}
`;

const List = styled.div`
  display: flex;
  width: 100px;
  flex-direction: column;
  border: 2px solid ${oc.teal[6]};
  justify-content: space-around;
`;

const Item = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 20px 0px;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
    background: ${oc.teal[6]};
    color: white;
    transition: background 0.2s linear;
  }
  :active {
    transform: translateY(1px);
  }
`;

const Basket = styled.div`
  padding: 10px;
  border: 2px solid ${oc.teal[6]};
`;

const SelLocBasket = ({ isOpen, category, selCateLoc }) => {
  const list = Object.keys(category);
  const [type, setType] = useState(category[list[0]].eng);
  const [typeId, setTypeId] = useState(list[0]);
  const [selectArea, setSelectArea] = useState(false);

  useEffect(() => {
    for (let key in selCateLoc) {
      if (selCateLoc[key].length > 0) setSelectArea(true);
    }
  }, [selCateLoc]);

  const onClick = (idx) => {
    setType(category[idx].eng);
    setTypeId(idx);
  };

  return (
    <Container isOpen={isOpen}>
      {/* 카테고리 */}
      {selectArea && isOpen && (
        <List>
          {Object.keys(selCateLoc).map((cate, idx) => {
            if (selCateLoc[cate].length > 0)
              return (
                <Item key={idx} onClick={() => onClick(idx + 1)}>
                  {category[idx + 1].kor}
                </Item>
              );
          })}
        </List>
      )}
      {/* 현재 카테고리 담은 블록 */}
      {isOpen && (
        <Droppable
          droppableId={String(typeId)}
          isDropDisabled={true}
          // type="location"
        >
          {(provided, snapshot) => (
            <Basket
              ref={provided.innerRef}
              // {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {selCateLoc[`sel${type}`].length === 0 && (
                <>로케이션을 담아오세요</>
              )}
              {selCateLoc[`sel${type}`].length > 0 &&
                selCateLoc[`sel${type}`].map((location, index) => {
                  return (
                    <Location
                      key={location.id}
                      location={location}
                      index={index}
                      id={location.id}
                    />
                  );
                })}
              {provided.placeholder}
            </Basket>
          )}
        </Droppable>
      )}
    </Container>
  );
};

export default SelLocBasket;
