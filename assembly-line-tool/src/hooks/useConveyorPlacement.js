import { useState } from 'react';
import { snapToSubGrid, findNearestAnchor } from '../utils/helpers';

function useConveyorPlacement(items, setConnections, addLog) {
  const [isPlacingConveyor, setIsPlacingConveyor] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const [hoverAnchor, setHoverAnchor] = useState(null);

  const startConveyorDrag = (startAnchor) => {
    addLog(`Conveyor drag started from (${startAnchor.x}, ${startAnchor.y})`);
    setIsPlacingConveyor(true);
    setCurrentPath([startAnchor]);
  };

  const dragConveyor = (x, y) => {
    if (!isPlacingConveyor) return;
    const anchor = findNearestAnchor(items, x, y);
    setHoverAnchor(anchor || null);

    if (currentPath.length > 0) {
      if (anchor) {
        // Hovering over anchor
        setCurrentPath(prev => [prev[0], anchor]);
      } else {
        // Just follow mouse snapped to sub-grid
        const { x: sx, y: sy } = snapToSubGrid(x, y);
        setCurrentPath(prev => [prev[0], { x: sx, y: sy }]);
      }
    }
  };

  const stopConveyor = (endPoint, ctrlHeld) => {
    if (!isPlacingConveyor) return;
    const finalPath = [currentPath[0], endPoint];
    addLog(`Conveyor segment finalized from (${finalPath[0].x}, ${finalPath[0].y}) to (${finalPath[1].x}, ${finalPath[1].y})`);

    if (ctrlHeld) {
      // Ctrl held: add this segment, and continue from endPoint
      setConnections(prev => [...prev, { path: finalPath }]);
      addLog('Continuing conveyor placement from joint because Ctrl was held down.');
      // Start a new segment from this endpoint
      setCurrentPath([endPoint]);
    } else {
      // No Ctrl: finalize completely
      setConnections(prev => [...prev, { path: finalPath }]);
      resetConveyorPlacement();
    }
  };

  const resetConveyorPlacement = () => {
    addLog('Conveyor placement reset');
    setIsPlacingConveyor(false);
    setCurrentPath([]);
    setHoverAnchor(null);
  };

  return {
    isPlacingConveyor,
    currentPath,
    hoverAnchor,
    startConveyorDrag,
    dragConveyor,
    stopConveyor,
    resetConveyorPlacement
  };
}

export default useConveyorPlacement;
