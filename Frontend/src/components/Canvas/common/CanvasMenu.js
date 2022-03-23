import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { shadow } from 'lib/styleUtils';

const Menu = styled.div`
  /* height: calc(100vh - 58px); // header 크기가 58px(55 + 3) */
  /* height: 100vh; */
  /* z-index: 1; */
  /* background-color: ${oc.teal[6]}; */
  /* background-color: rgb(109, 144, 176); */
  font-family: 'Rajdhani';
  /* width: 100vw; */
  /* width: 220px; */
  /* margin-top: 20px; */
`;

const List = styled.ul`
  /* border: 1px solid red; */
  /* position: absolute;
  top: 25%;
  width: 14vw; */
  display: flex;
  justify-content: space-around;
  padding: 0;
  margin: 0;
  /* margin: 0; */
  /* z-index: 1; */
  /* background-color: blue; */
  /* padding-left: 40px; */
  /* margin-top: 100px; */
`;

const Item = styled.li`
  padding: 10px 0px;
  /* border: 2px solid ${oc.teal[2]}; */
  /* background-color: ${oc.teal[6]}; */
  /* background-color: ${(props) =>
    props.selected ? `${oc.teal[6]}` : 'white'}; */
  /* background-color: rgb(109, 144, 176); */
  /* font-size: 20px; // 반응형 고민
  font-weight: 550; */
  /* width: 25vw; */
  /* padding-bottom: 20px; */
  /* margin-left: 20%; */
  list-style: none;
  a {
    /* color: ${(props) => (props.selected ? `black` : 'white')}; */
  }
`;

const MenuLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  width: 25vw;
  /* border: 3px ridge #00bcf1; */
  border-radius: 50px 0px;
  ${(props) =>
    props.selected &&
    css`
      background: linear-gradient(to right, ${oc.teal[5]}, ${oc.teal[6]});
      ${shadow(1)}
    `}
  // background: linear-gradient(to right, ${oc.teal[5]}, ${oc.teal[6]});
  /* background: linear-gradient(to right, ${oc.teal[4]}, ${oc.cyan[6]}); */
  color: ${(props) => (props.selected ? 'white' : 'black')};
  font-size: 20px; // 반응형 고민
  font-weight: 550;
  padding: 10px 0px;
`;

const CanvasMenu = () => {
  const { pathname } = useLocation();
  return (
    <Menu>
      <List>
        {/* 링크 주소 변경 필요 */}
        {/* <Item
          selected={pathname === process.env.PUBLIC_URL + '/canvas/setting'}
        >
          <MenuLink to="../setting">여행 설정</MenuLink>
        </Item>
        <Item selected={pathname === process.env.PUBLIC_URL + '/canvas/select'}>
          <MenuLink to="../select">블록 선택</MenuLink>
        </Item>
        <Item selected={pathname === process.env.PUBLIC_URL + '/canvas/build'}>
          <MenuLink to="../build">여행 캔버스</MenuLink>
        </Item>
        <Item selected={pathname === process.env.PUBLIC_URL + '/canvas/share'}>
          <MenuLink to="../share">여행 공유</MenuLink>
        </Item> */}
        <MenuLink
          selected={pathname === process.env.PUBLIC_URL + '/canvas/setting'}
          to="../setting"
        >
          여행 설정
        </MenuLink>
        <MenuLink
          selected={pathname === process.env.PUBLIC_URL + '/canvas/select'}
          to="../select"
        >
          블록 선택
        </MenuLink>
        <MenuLink
          selected={pathname === process.env.PUBLIC_URL + '/canvas/build'}
          to="../build"
        >
          여행 캔버스
        </MenuLink>
        <MenuLink
          selected={pathname === process.env.PUBLIC_URL + '/canvas/share'}
          to="../share"
        >
          여행 공유
        </MenuLink>
      </List>
    </Menu>
  );
};

export default CanvasMenu;
