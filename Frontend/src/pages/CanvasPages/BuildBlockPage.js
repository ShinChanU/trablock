import React from 'react';
import CanvasTemplate from 'components/Canvas/CanvasTemplate';
import CanvasForm from 'components/Canvas/CanvasForm';

const BuildBlockPage = () => {
  return (
    <>
      <CanvasTemplate>
        <CanvasForm type="build" />
      </CanvasTemplate>
    </>
  );
};

export default BuildBlockPage;
