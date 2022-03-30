import React, { useState } from 'react';
import { useStore } from 'lib/store';
import Location from '../Location';
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
  const { selLoc, category } = useStore();
  const list = Object.keys(selLoc);
  const [type, setType] = useState(list[0]);

  const onClick = (cate) => {
    setType(cate);
  };

  return (
    <Container>
      {/* 카테고리 */}
      <List>
        {list.map((cate) => (
          <Item key={cate} onClick={() => onClick(cate)}>
            {category[cate]}
          </Item>
        ))}
      </List>
      {/* 현재 카테고리 담은 블록 */}
      <Droppable droppableId={type} type="location">
        {(provided) => (
          <Basket ref={provided.innerRef} {...provided.droppableProps}>
            {selLoc[type].map((location, index) => (
              <Location key={location.id} location={location} index={index} /> // location
            ))}
            {provided.placeholder}
          </Basket>
        )}
      </Droppable>
    </Container>
  );
};

export default SelLocBasket;
