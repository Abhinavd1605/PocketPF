import type { ProcessedItem, StoreLayout } from '@/types';

type Point = [number, number];
class Node {
  constructor(
    public x: number,
    public y: number,
    public g: number = 0, // cost from start
    public h: number = 0, // heuristic cost to end
    public f: number = 0, // g + h
    public parent: Node | null = null
  ) {}
}

function heuristic(a: Point, b: Point): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]); // Manhattan distance
}

function findShortestPath(start: Point, end: Point, layout: StoreLayout): Point[] {
  const openSet: Node[] = [new Node(start[0], start[1])];
  const closedSet: Set<string> = new Set();
  const walls = new Set(layout.walls.map(([x, y]) => `${x},${y}`));

  while (openSet.length > 0) {
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }
    const currentNode = openSet[lowestIndex];

    if (currentNode.x === end[0] && currentNode.y === end[1]) {
      const path: Point[] = [];
      let temp: Node | null = currentNode;
      while (temp) {
        path.push([temp.x, temp.y]);
        temp = temp.parent;
      }
      return path.reverse();
    }

    openSet.splice(lowestIndex, 1);
    closedSet.add(`${currentNode.x},${currentNode.y}`);

    const neighbors: Point[] = [
      [currentNode.x + 1, currentNode.y],
      [currentNode.x - 1, currentNode.y],
      [currentNode.x, currentNode.y + 1],
      [currentNode.x, currentNode.y - 1],
    ];

    for (const neighborPos of neighbors) {
      const [nx, ny] = neighborPos;
      if (
        nx < 0 || nx >= layout.width || ny < 0 || ny >= layout.height ||
        walls.has(`${nx},${ny}`) ||
        closedSet.has(`${nx},${ny}`)
      ) {
        continue;
      }

      const gScore = currentNode.g + 1;
      let neighborNode = openSet.find(n => n.x === nx && n.y === ny);

      if (!neighborNode) {
        neighborNode = new Node(nx, ny);
        neighborNode.g = gScore;
        neighborNode.h = heuristic([nx, ny], end);
        neighborNode.f = neighborNode.g + neighborNode.h;
        neighborNode.parent = currentNode;
        openSet.push(neighborNode);
      } else if (gScore < neighborNode.g) {
        neighborNode.g = gScore;
        neighborNode.f = neighborNode.g + neighborNode.h;
        neighborNode.parent = currentNode;
      }
    }
  }

  return []; // No path found
}


export function findOptimalRoute(items: ProcessedItem[], layout: StoreLayout): Point[] {
  const itemCategories = [...new Set(items.map(item => item.category.toLowerCase()))];

  const sectionLocations = itemCategories.map(category => {
    const section = layout.sections.find(s => s.category.toLowerCase() === category.toLowerCase());
    if (!section) return null;
    const [x1, y1, x2, y2] = section.coordinates;
    return {
      category,
      point: [Math.floor((x1 + x2) / 2), Math.floor((y1 + y2) / 2)] as Point
    };
  }).filter(Boolean) as { category: string, point: Point }[];

  if (sectionLocations.length === 0) return [];

  let remaining = [...sectionLocations];
  const visitOrder: Point[] = [];
  let currentPos = layout.entrance;

  while (remaining.length > 0) {
    remaining.sort((a, b) => heuristic(currentPos, a.point) - heuristic(currentPos, b.point));
    const nextStop = remaining.shift()!;
    visitOrder.push(nextStop.point);
    currentPos = nextStop.point;
  }
  
  const waypoints = [layout.entrance, ...visitOrder, layout.exit];

  let fullPath: Point[] = [];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const segment = findShortestPath(waypoints[i], waypoints[i + 1], layout);
    fullPath = fullPath.concat(segment.slice(i > 0 ? 1 : 0));
  }
  
  return fullPath;
}
