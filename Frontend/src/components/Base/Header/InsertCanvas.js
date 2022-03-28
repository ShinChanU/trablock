import React from 'react';
import styled from 'styled-components';
import { useStore } from 'lib/store';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-around;
`;

const InsertCanvas = ({ closeModal }) => {
  const { newPlan } = useStore();

  const onClickNewPlan = () => {
    newPlan(); // 새로운걸 post X, 프론트에서 관리, 저장버튼 클릭시 db전송
    console.log('새로운 계획');
    closeModal();
  };

  return (
    <Container>
      <Link
        to={process.env.PUBLIC_URL + '/canvas/setting'}
        onClick={onClickNewPlan}
      >
        새 여행지
      </Link>
      <Link
        to={process.env.PUBLIC_URL + '/canvas/directory'}
        onClick={closeModal}
      >
        기존 여행
      </Link>
    </Container>
  );
};

export default InsertCanvas;
