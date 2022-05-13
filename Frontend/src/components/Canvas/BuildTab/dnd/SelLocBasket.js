import React, { useState } from 'react';
import { useStore } from 'lib/store';
import Location from '../Detail/Location';
import styled from 'styled-components';
import oc from 'open-color';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${oc.teal[6]};
  justify-content: space-around;
`;

const Item = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 20px;
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

const SelLocBasket = () => {
  const { category, selCateLoc } = useStore();
  const list = Object.keys(category);
  const [type, setType] = useState(category[list[0]].eng);
  const [typeId, setTypeId] = useState(list[0]);

  const onClick = (cate) => {
    setType(category[cate].eng);
    setTypeId(cate);
  };

  return (
    <Container>
      {/* 카테고리 */}
      <List>
        {list.map((cateNum) => (
          <Item key={cateNum} onClick={() => onClick(cateNum)}>
            {category[cateNum].kor}
          </Item>
        ))}
      </List>
      {/* 현재 카테고리 담은 블록 */}
      <Droppable
        droppableId={typeId}
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
                // <div>test</div>
                console.log(location);
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
    </Container>
  );
};

export default SelLocBasket;
