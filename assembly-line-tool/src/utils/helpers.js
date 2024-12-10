import { GRID_SIZE, SUB_GRID_SIZE } from './constants';

export function snapToGrid(x, y) {
  const snappedX = Math.floor(x / GRID_SIZE) * GRID_SIZE;
  const snappedY = Math.floor(y / GRID_SIZE) * GRID_SIZE;
  return { x: snappedX, y: snappedY };
}

export function snapToSubGrid(x, y) {
  const snappedX = Math.floor(x / SUB_GRID_SIZE) * SUB_GRID_SIZE;
  const snappedY = Math.floor(y / SUB_GRID_SIZE) * SUB_GRID_SIZE;
  return { x: snappedX, y: snappedY };
}

export function getMachineAnchorPoints(machine) {
  return [
    { x: machine.x + GRID_SIZE / 2, y: machine.y },               // top
    { x: machine.x + GRID_SIZE, y: machine.y + GRID_SIZE / 2 },   // right
    { x: machine.x + GRID_SIZE / 2, y: machine.y + GRID_SIZE },   // bottom
    { x: machine.x, y: machine.y + GRID_SIZE / 2 }                // left
  ];
}

export function findNearestAnchor(items, x, y, threshold = 10) {
  const anchors = items
    .filter(item => item.type !== 'conveyor')
    .flatMap(machine => getMachineAnchorPoints(machine));

  let nearest = null;
  let nearestDist = Infinity;
  for (let anchor of anchors) {
    const dist = Math.sqrt((anchor.x - x) ** 2 + (anchor.y - y) ** 2);
    if (dist < nearestDist && dist <= threshold) {
      nearestDist = dist;
      nearest = anchor;
    }
  }
  return nearest;
}

export function findNearestConnection(connections, x, y, threshold = 10) {
  let closestConnection = null;
  let closestDist = Infinity;

  for (const connection of connections) {
    const path = connection.path;
    for (let i = 0; i < path.length - 1; i++) {
      const p1 = path[i];
      const p2 = path[i+1];
      const dist = pointToLineDistance({x,y}, p1, p2);
      if (dist < closestDist && dist <= threshold) {
        closestDist = dist;
        closestConnection = connection;
      }
    }
  }

  return closestConnection;
}

function pointToLineDistance(point, segmentStart, segmentEnd) {
  const { x: px, y: py } = point;
  const { x: x1, y: y1 } = segmentStart;
  const { x: x2, y: y2 } = segmentEnd;

  const A = px - x1;
  const B = py - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  let param = -1;
  if (len_sq !== 0) param = dot / len_sq;

  let xx, yy;
  if (param < 0) {
    xx = x1; yy = y1;
  } else if (param > 1) {
    xx = x2; yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = px - xx;
  const dy = py - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

// Line intersection
function linesIntersect(p1, p2, p3, p4) {
  // Check intersection between segment p1-p2 and p3-p4
  const denom = (p4.y - p3.y)*(p2.x - p1.x) - (p4.x - p3.x)*(p2.y - p1.y);
  if (denom === 0) return null;
  
  const ua = ((p4.x - p3.x)*(p1.y - p3.y) - (p4.y - p3.y)*(p1.x - p3.x))/denom;
  const ub = ((p2.x - p1.x)*(p1.y - p3.y) - (p2.y - p1.y)*(p1.x - p3.x))/denom;

  if (ua >= 0 && ua <=1 && ub >= 0 && ub <= 1) {
    // Intersection point
    return {
      x: p1.x + ua*(p2.x - p1.x),
      y: p1.y + ua*(p2.y - p1.y)
    };
  }
  return null;
}

export function findAllIntersections(connections) {
  const intersections = [];
  for (let i = 0; i < connections.length; i++) {
    const pathA = connections[i].path;
    for (let j = i+1; j < connections.length; j++) {
      const pathB = connections[j].path;
      for (let a = 0; a < pathA.length -1; a++) {
        for (let b = 0; b < pathB.length -1; b++) {
          const intersect = linesIntersect(pathA[a], pathA[a+1], pathB[b], pathB[b+1]);
          if (intersect) {
            intersections.push(intersect);
          }
        }
      }
    }
  }
  return intersections;
}
