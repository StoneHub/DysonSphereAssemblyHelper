import { useCallback } from 'react';
import { GRID_SIZE, SUB_GRID_SIZE } from '../utils/constants';

function useCanvas(canvasRef, width, height) {
  const drawGrid = useCallback(() => {
    const ctx = canvasRef.current.getContext('2d');
    for (let x = 0; x <= width; x += GRID_SIZE) {
      for (let y = 0; y <= height; y += GRID_SIZE) {
        ctx.strokeStyle = '#ddd';
        ctx.strokeRect(x, y, GRID_SIZE, GRID_SIZE);
      }
    }
  }, [canvasRef, width, height]);

  const drawConnections = useCallback((connections, intersections) => {
    const ctx = canvasRef.current.getContext('2d');
    connections.forEach(connection => {
      const path = connection.path;
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw intersections as arcs to indicate crossing
    if (intersections) {
      intersections.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, SUB_GRID_SIZE * 0.6, 0, 2*Math.PI);
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fill();
      });
    }
  }, [canvasRef]);

  const drawTempConveyorPath = useCallback((path) => {
    const ctx = canvasRef.current.getContext('2d');
    if (path.length > 0) {
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [canvasRef]);

  const highlightAnchorPoints = useCallback((anchors, hoverAnchor) => {
    const ctx = canvasRef.current.getContext('2d');
    anchors.forEach(anchor => {
      ctx.beginPath();
      ctx.arc(anchor.x, anchor.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = anchor === hoverAnchor ? 'green' : 'yellow';
      ctx.fill();
    });
  }, [canvasRef]);

  return { drawGrid, drawConnections, drawTempConveyorPath, highlightAnchorPoints };
}

export default useCanvas;
