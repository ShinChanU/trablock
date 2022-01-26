import React from 'react';
import { useDrop } from 'react-dnd';

const Days = () => {
  // const [{ canDrop, isOver }, drop] = useDrop({
  //   accept: 'Our first type',
  //   drop: () => ({
  //     name: 'Some name'
  //   }),
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //     canDrop: monitor.canDrop(),
  //   }),
  // });

  // console.log('options', { canDrop, isOver });

  return (
    <div className="Day"
    // ref={drop}
    >
      Days 입니다
    </div>
  );
};

export default Days;