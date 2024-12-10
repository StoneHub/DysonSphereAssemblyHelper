import React from 'react';
import { GRID_SIZE } from '../utils/constants';
import MachineIcon from './MachineIcon';

function GridItem({ item }) {
  const size = GRID_SIZE;
  
  if (item.type === 'conveyor') {
    // Conveyors are drawn on canvas, not as an item div. 
    // This is a placeholder if needed. 
    // Typically, we'd not render a GridItem for conveyors since they are paths.
    return null;
  } else {
    return (
      <div
        style={{
          position: 'absolute',
          top: item.y,
          left: item.x,
          width: size,
          height: size,
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <MachineIcon type={item.type} size={size} />
      </div>
    );
  }
}

export default GridItem;
