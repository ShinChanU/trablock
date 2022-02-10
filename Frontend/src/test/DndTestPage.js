import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Body = styled.div`
  display: flex;
  border: 2px solid red;
  width: 500px;
  padding: 30px 0;
  justify-content: center;
  /* align-items: center; */
`;

const BigDiv = styled.div`
  border: 1px solid blue;
  margin: 20px;
`;

const Div = styled.div`
  border: 1px solid black;
  width: 100px;
  height: 100px;
  /* margin: auto; */
  margin: 30px;
`;

const DndTestPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/travelPlans/1')
    .then(({ data }) => {
      setData(data.selectedLocations);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  
  console.log(data);
  // 드래그 끝났을 시
  const onDragEnd = (result) => { 
    if(!result.destination) return ;
    console.log('result ?', result);
    const items = [...data];
    // console.log(items);
    console.log(result.source.index);

    const [reorderedItem] = items.splice(result.source.index, 1);
    // console.log(reorderedItem);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h1>DragDropContext</h1>
      <Body>
      <BigDiv>
      <h2>droppable</h2>
        <Droppable droppableId={String('test')}>
        {provided => (
          <div 
          {...provided.droppableProps}
          ref={provided.innerRef}
          // style={style.container}
          >
            {data.map(({id, name}, index) => (
              <Draggable draggableId={String(id)} index={index}>
                {provided => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >      
                    <Div key={id} name={name} index={index} id={id} >
                      {name}
                    </Div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
        </Droppable>
      </BigDiv>
      {/* <BigDiv>
      <h2>droppable</h2>
        <Droppable droppableId="test2">
        {provided => (
          <div 
          {...provided.droppableProps}
          ref={provided.innerRef}
          // style={style.container}
          >
            {data.map(({id, name}, index) => (
              <Draggable draggableId={String(id)} index={index}>
                {provided => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >      
                    <Div key={id} name={name} index={index} id={id} >
                      {name}
                    </Div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
        </Droppable>
      </BigDiv> */}
      </Body>
    </DragDropContext>
  );
};

export default DndTestPage;


// 0210 
// https://velog.io/@yjs3819/react-beautiful-dnd
// drop 후 상태 저장 함수 작성하기
// result 오브젝트 분석해보기