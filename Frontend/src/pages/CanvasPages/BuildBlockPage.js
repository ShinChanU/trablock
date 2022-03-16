import React from 'react';
import CanvasTemplate from 'components/Canvas/common/CanvasTemplate';
import CanvasForm from 'components/Canvas/common/CanvasForm';

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
