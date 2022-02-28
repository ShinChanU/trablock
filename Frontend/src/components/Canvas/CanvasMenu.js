import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import oc from 'open-color';

const Menu = styled.div`
  /* height: calc(100vh - 58px); // header 크기가 58px(55 + 3) */
  /* height: 100vh; */
  /* z-index: 1; */
  /* background-color: ${oc.teal[6]}; */
  background-color: rgb(109, 144, 176);
  font-family: 'Rajdhani';

  width: 220px;
`;

const List = styled.ul`
  /* position: absolute;
  top: 25%;
  width: 14vw; */
  padding: 0;
  /* margin: 0; */
  /* z-index: 1; */
  /* background-color: blue; */

  padding-left: 40px;
  margin-top: 100px;
`;

const Item = styled.li`
  font-size: 20px; // 반응형 고민
  font-weight: 550;
  padding-bottom: 20px;
  /* margin-left: 20%; */
  list-style: none;
  a {
    color: ${(props) => (props.selected ? `black` : 'white')};
  }
`;

const MenuLink = styled(Link)`
  text-decoration: none;
`;

const CanvasMenu = () => {
  const { pathname } = useLocation();
  return (
    <Menu>
      <List>
        <Item selected={pathname === '/canvas/setting'}>
          <MenuLink to="../setting">여행 설정</MenuLink>
        </Item>
        <Item selected={pathname === '/canvas/select'}>
          <MenuLink to="../select">블록 선택</MenuLink>
        </Item>
        <Item selected={pathname === '/canvas/build'}>
          <MenuLink to="../build">여행 캔버스</MenuLink>
        </Item>
        <Item selected={pathname === '/canvas/share'}>
          <MenuLink to="../share">여행 공유</MenuLink>
        </Item>
      </List>
    </Menu>
  );
};

export default CanvasMenu;
