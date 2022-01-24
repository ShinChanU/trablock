import React from 'react';
import './CanvasComponent.scss';
import CanvasBlock from './CanvasBlock';

const SelectedLoc = ({ data }) => {
  return (
    <div className="SelectedLoc">
      <CanvasBlock data={data} />
    </div>
  );
};

export default SelectedLoc;