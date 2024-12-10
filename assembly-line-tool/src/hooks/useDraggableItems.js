import { useState } from 'react';
import { snapToGrid } from '../utils/helpers';

function useDraggableItems(items, setItems, addLog) {
  const [draggingItemId, setDraggingItemId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const startDragging = (itemId, x, y) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      setDraggingItemId(itemId);
      setDragOffset({ x: x - item.x, y: y - item.y });
    }
  };

  const dragItem = (x, y) => {
    if (draggingItemId !== null) {
      const { x: snappedX, y: snappedY } = snapToGrid(x - dragOffset.x, y - dragOffset.y);
      addLog(`Dragging item #${draggingItemId} to (${snappedX}, ${snappedY})`);
      setItems(prevItems => prevItems.map(item => {
        if (item.id === draggingItemId) {
          return { ...item, x: snappedX, y: snappedY };
        }
        return item;
      }));
    }
  };

  const stopDragging = () => {
    setDraggingItemId(null);
  };

  return { draggingItemId, startDragging, dragItem, stopDragging };
}

export default useDraggableItems;
