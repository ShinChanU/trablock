import React from 'react';
import styled from 'styled-components';
import palette from 'lib/styles/palette';
import { useDrag } from 'react-dnd';

const List = styled.li`
  /* border: 3px solid black; */
  /* border-radius: 5px; */
  display: flex;
  list-style: none;
  margin-bottom: 11px;
  background-color: ${palette.gray[0]};
  box-shadow: 3px 3px 3px 3px ${palette.gray[5]};
  padding: 5px;
`;

const Img = styled.img`
  /* height: 5vh; */
  width: 5vw;
  height: 3.2vw;
`;

const ListDiv = styled.div`
  margin-left: 5px;
  font-weight: bold;
  /* text-align: center; */
  /* display: table-cell; */
  /* vertical-align: middle; */
  /* margin: 0 auto; */
  /* justify-content: center; */
`;

const Item = ({ data }) => {
  // const [{ isDragging }, drag] = useDrag({
  //   item: {
  //     name: 'any custom name',
  //     type: 'Our first type'
  //   },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // });

  // const opacity = isDragging ? 0.4 : 1;

  return (
    <List
    // ref={drag} style={{ opacity }}
    >
      <Img src={data.image} alt="img" />
      <ListDiv>{data.name}<br />2021.01.26</ListDiv>
    </List>
  );
};

export default Item;