import React from 'react';
import styled from 'styled-components';
import palette from 'lib/styles/palette';

const List = styled.li`
  display: flex;
  list-style: none;
  margin-bottom: 11px;
  background-color: ${palette.gray[0]};
  box-shadow: 3px 3px 3px 3px ${palette.gray[5]};
  padding: 5px;
`;

const Img = styled.img`
  width: 5vw;
  height: 3.2vw;
`;

const ListDiv = styled.div`
  margin-left: 5px;
  font-weight: bold;
`;

const Item = ({ data }) => {
  return (
    <List>
      <Img src={data.image} alt="img" />
      <ListDiv>
        {data.name}
        <br />
        2021.01.26
      </ListDiv>
    </List>
  );
};

export default Item;
