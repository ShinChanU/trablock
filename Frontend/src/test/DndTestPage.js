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

const getItems = (count, offset = 0) => {
  return Array.from({length: count}, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`
  }));
};

// dnd 후 배열 재정렬 로직
const reorder = (data, startIndex, endIndex) => {
  const items = [...data];
  const [removed] = items.splice(startIndex, 1); // splice는 제거한 요소를 담은 배열 리턴
  items.splice(endIndex, 0, removed); // 기존 배열에서 움직인 요소를 목적지에 저장

  return items;
};

const DndTestPage = () => {
  const [data, setData] = useState([]);

  // const [data, setData] = useState({
  //   items: getItems(10),
  //   selected: getItems(5, 10)
  // });

  // const {items, selected} = data;
  // // const [items, setItems] = useState([]);
  // // const [selected, setSelected] = useState([]);

  // // list마다 고유 id
  // const idList = {
  //   droppable: 'items',
  //   droppable2: 'selected'
  // };

  // const getList = (id) => {
  //   // return 
  //   setData({
  //     ...setData,
  //     idList(id) 
  //   })
  // }

  useEffect(() => {
    axios.get('http://localhost:4000/travelPlans/1')
    .then(({ data }) => {
      setData(data.selectedLocations);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  
  // 드래그 끝났을 시, 배열 상태 저장 메서드(메모리상에서 되는 것 같음)
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if(!destination) return ;

    // 같은 리스트에서 dnd
    if(source.droppableId === destination.droppableId) {
      const items = reorder(
        

      )
    }
    // const items = [...data]; // 움직이지 않은 요소들만..
    // console.log(items);
    // const [reorderedItem] = items.splice(source.index, 1); // splice는 제거한 요소를 담은 배열 리턴
    // items.splice(result.destination.index, 0, reorderedItem); // 기존 배열에서 움직인 요소를 목적지에 저장
    
    setData(items);
  };

  return (
    <DragDropContext 
      onDragEnd={onDragEnd}
    >
      <h1>DragDropContext</h1>
      <Body>
      <BigDiv>
      <h2>droppable</h2>
        <Droppable droppableId="droppable">
        {provided => (
          <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.map(({id, name}, index) => (
              <Draggable 
                key={id} 
                draggableId={String(id)} 
                index={index}
              >
                {provided => (    
                  <Div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {name}
                  </Div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
        </Droppable>
      </BigDiv>
      <BigDiv>
      <h2>droppable</h2>
        <Droppable droppableId="droppable2">
        {provided => (
          <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.map(({id, name}, index) => (
              <Draggable 
                key={id} 
                draggableId={String(id+"1")} 
                index={index}
              >
                {provided => (    
                  <Div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {name}
                  </Div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
        </Droppable>
      </BigDiv>
      </Body>
    </DragDropContext>
  );
};

export default DndTestPage;


// 0210 
// https://velog.io/@yjs3819/react-beautiful-dnd
// drop 후 상태 저장 함수 작성하기
// result 오브젝트 분석해보기

// 0215
// 여러개의 리스트가 있을 때 저장을 어떻게 할지..
// dnd 이후 상태저장에 대해서,,
// immer 를 사용해서 객체의 불변성을 유지해라..
// https://react.vlpt.us/basic/23-immer.html
// https://codedaily.io/tutorials/Multi-List-Drag-and-Drop-With-react-beautiful-dnd-Immer-and-useReducer
// https://www.freakyjolly.com/react-draggable-sortable-lists-examples/