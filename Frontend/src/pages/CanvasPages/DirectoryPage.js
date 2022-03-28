import React, { useEffect } from 'react';
import styled from 'styled-components';
import { planStore, useStore } from 'lib/store';
import { Link } from 'react-router-dom';

const Container = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin: auto; // */
  border: 1px solid black;
  /* height: 80vh; */
`;

const DirectoryPage = () => {
  const { travelPlans, getPlans } = planStore();
  const { getPlan } = useStore();

  useEffect(() => {
    getPlans(); // 나중에는 userId를 파라미터로
  }, []);

  const onClick = (id) => {
    getPlan(id);
  };

  return (
    <Container>
      {travelPlans.length !== 0 && (
        <div>
          {travelPlans.map((e) => (
            <>
              <div key={e.id}>플랜 id: {e.id}</div>
              <Link
                to={process.env.PUBLIC_URL + '/canvas/setting'}
                onClick={() => onClick(e.id)}
              >
                수정하러가기
              </Link>
            </>
          ))}
        </div>
      )}
    </Container>
  );
};

export default DirectoryPage;
