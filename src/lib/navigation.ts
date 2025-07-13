import type { StoreLayout, ProcessedItem, NavigationInstruction } from '@/types';

type Point = [number, number];

function getTurnDirection(oldDir: Point, newDir: Point): string {
  const [dx1, dy1] = oldDir;
  const [dx2, dy2] = newDir;
  // Cross product for Y-down coordinate system
  const crossProduct = dx1 * dy2 - dy1 * dx2;
  if (crossProduct > 0) return 'Turn right';
  if (crossProduct < 0) return 'Turn left';
  if (dx1 === -dx2 && dy1 === -dy2) return 'Turn around';
  return ''; // Should not happen for turns, but good failsafe
}

export function generateNavigationInstructions(path: Point[], layout: StoreLayout, items: ProcessedItem[]): NavigationInstruction[] {
  if (path.length < 2) return [];

  const instructions: NavigationInstruction[] = [];
  let instructionId = 0;

  instructions.push({ id: instructionId++, instruction: `Start at the entrance.`, location: layout.entrance });

  const itemLocations = new Map<string, string[]>(); // Map of "x,y" to item names
  items.forEach(item => {
    const section = layout.sections.find(s => s.category.toLowerCase() === item.category.toLowerCase());
    if(section) {
      const [x1, y1, x2, y2] = section.coordinates;
      const center_x = Math.floor((x1 + x2) / 2);
      const center_y = Math.floor((y1 + y2) / 2);
      const key = `${center_x},${center_y}`;
      if(!itemLocations.has(key)) itemLocations.set(key, []);
      itemLocations.get(key)!.push(item.interpreted_item);
    }
  });


  for (let i = 1; i < path.length; i++) {
    const prev = path[i - 1];
    const curr = path[i];
    const next = i + 1 < path.length ? path[i + 1] : null;

    const key = `${curr[0]},${curr[1]}`;
    if (itemLocations.has(key)) {
      const itemsInLocation = itemLocations.get(key)!;
      const section = layout.sections.find(s => {
          const [x1, y1, x2, y2] = s.coordinates;
          const center_x = Math.floor((x1 + x2) / 2);
          const center_y = Math.floor((y1 + y2) / 2);
          return center_x === curr[0] && center_y === curr[1];
      });

      instructions.push({
        id: instructionId++,
        instruction: `Pick up ${itemsInLocation.join(', ')} in the ${section?.name || 'area'}.`,
        location: curr,
      });
      itemLocations.delete(key);
    }

    if (!next) continue;

    const dx1 = curr[0] - prev[0];
    const dy1 = curr[1] - prev[1];
    const dx2 = next[0] - curr[0];
    const dy2 = next[1] - curr[1];

    if (dx1 !== dx2 || dy1 !== dy2) { // Turn detected
      let turnDirection = getTurnDirection([dx1, dy1], [dx2, dy2]);
      if (turnDirection) {
        instructions.push({ id: instructionId++, instruction: `${turnDirection} and continue.`, location: curr });
      }
    }
  }

  instructions.push({ id: instructionId++, instruction: `Proceed to checkout.`, location: layout.exit });

  return instructions;
}
