import React, { useRef, useEffect, useState } from 'react';
import GridItem from './GridItem';
import useCanvas from '../hooks/useCanvas';
import useDraggableItems from '../hooks/useDraggableItems';
import useConveyorPlacement from '../hooks/useConveyorPlacement';
import { GRID_SIZE } from '../utils/constants';
import { snapToGrid, findNearestAnchor, snapToSubGrid, findNearestConnection, findAllIntersections } from '../utils/helpers';

function CanvasContainer({
  width,
  height,
  currentTool,
  setCurrentTool,
  items,
  setItems,
  connections,
  setConnections,
  addLog
}) {
  const canvasRef = useRef(null);
  const [intersections, setIntersections] = useState([]);

  const {
    drawGrid,
    drawConnections,
    drawTempConveyorPath,
    highlightAnchorPoints
  } = useCanvas(canvasRef, width, height);

  const {
    draggingItemId,
    startDragging,
    dragItem,
    stopDragging
  } = useDraggableItems(items, setItems, addLog);

  const {
    isPlacingConveyor,
    currentPath,
    hoverAnchor,
    startConveyorDrag,
    dragConveyor,
    stopConveyor,
    resetConveyorPlacement
  } = useConveyorPlacement(items, setConnections, addLog);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctrlHeld = e.ctrlKey || e.metaKey; // treat meta as ctrl on mac
    addLog(`MouseDown at (${x}, ${y}), currentTool: ${currentTool}, ctrlHeld: ${ctrlHeld}`);

    // Deletion logic
    if (currentTool === 'delete') {
      const clickedItem = items.find(item =>
        x >= item.x && x <= item.x + GRID_SIZE &&
        y >= item.y && y <= item.y + GRID_SIZE
      );
      if (clickedItem) {
        addLog(`Deleting machine #${clickedItem.id} at (${clickedItem.x}, ${clickedItem.y})`);
        setItems(prev => prev.filter(i => i.id !== clickedItem.id));
        return;
      }

      const nearestConnection = findNearestConnection(connections, x, y);
      if (nearestConnection) {
        addLog(`Deleting conveyor connection`);
        setConnections(prev => prev.filter(c => c !== nearestConnection));
      }
      return;
    }

    // Place machine if current tool is a machine type
    if (['assembler', 'smelter', 'oil_extractor', 'matrix_lab', 'solar_panel'].includes(currentTool)) {
      const { x: gx, y: gy } = snapToGrid(x, y);
      addLog(`Placing ${currentTool} at (${gx}, ${gy})`);
      setItems(prev => [...prev, { id: prev.length + 1, x: gx, y: gy, type: currentTool }]);
      if (!ctrlHeld) {
        // if ctrl not held, reset tool to null after placement
        setCurrentTool(null);
      }
      return;
    }

    // Conveyor logic
    if (currentTool === 'conveyor' || (currentTool === null && isPlacingConveyor)) {
      const anchor = findNearestAnchor(items, x, y);
      if (anchor && currentTool === 'conveyor' && !isPlacingConveyor) {
        addLog(`Starting conveyor drag from anchor (${anchor.x}, ${anchor.y})`);
        startConveyorDrag(anchor);
        return;
      }
    }

    // Drag machine if tool is null and not placing conveyor
    if (currentTool === null && !isPlacingConveyor) {
      const clickedItem = items.find(item =>
        x >= item.x && x <= item.x + GRID_SIZE &&
        y >= item.y && y <= item.y + GRID_SIZE
      );
      if (clickedItem) {
        addLog(`Start dragging machine #${clickedItem.id}`);
        startDragging(clickedItem.id, x, y);
      }
    }
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (draggingItemId !== null) {
      dragItem(x, y);
    }

    if (isPlacingConveyor) {
      dragConveyor(x, y);
    }
  };

  const handleMouseUp = (e) => {
    const ctrlHeld = e.ctrlKey || e.metaKey;
    // If dragging machine
    if (draggingItemId !== null) {
      addLog(`Stopped dragging machine #${draggingItemId}`);
      stopDragging();
    }

    // If placing conveyor, finalize segment on mouse up
    if (isPlacingConveyor) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addLog(`MouseUp at (${x}, ${y}) finalizing conveyor segment`);
      const anchor = findNearestAnchor(items, x, y);
      if (anchor) {
        addLog(`Ending conveyor on anchor (${anchor.x}, ${anchor.y})`);
        stopConveyor(anchor, ctrlHeld);
      } else {
        const { x: sx, y: sy } = snapToSubGrid(x, y);
        addLog(`Ending conveyor on sub-grid point (${sx}, ${sy})`);
        stopConveyor({ x: sx, y: sy }, ctrlHeld);
      }
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (isPlacingConveyor) {
      addLog(`Conveyor placement canceled`);
      resetConveyorPlacement();
      setCurrentTool(null);
    }
  };

  // Update intersections whenever connections change
  useEffect(() => {
    const newIntersections = findAllIntersections(connections);
    setIntersections(newIntersections);
  }, [connections]);

  const allAnchors = items
    .filter(item => item.type !== 'conveyor')
    .flatMap(item => {
      return [
        { x: item.x + GRID_SIZE / 2, y: item.y },
        { x: item.x + GRID_SIZE, y: item.y + GRID_SIZE / 2 },
        { x: item.x + GRID_SIZE / 2, y: item.y + GRID_SIZE },
        { x: item.x, y: item.y + GRID_SIZE / 2 }
      ];
    });

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    drawGrid();
    drawConnections(connections, intersections);
    if (isPlacingConveyor && currentPath.length > 0) {
      drawTempConveyorPath(currentPath);
    }
    if (isPlacingConveyor) {
      highlightAnchorPoints(allAnchors, hoverAnchor);
    }
  }, [connections, currentPath, isPlacingConveyor, hoverAnchor, intersections, drawGrid, drawConnections, drawTempConveyorPath, highlightAnchorPoints, width, height, allAnchors]);

  return (
    <div
      style={{ flexGrow: 1, position: 'relative', userSelect: 'none' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ border: '1px solid black', position: 'relative', zIndex: 2, cursor: isPlacingConveyor ? 'crosshair' : 'default' }}
      />
      {items.map((item) => (
        <GridItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CanvasContainer;
