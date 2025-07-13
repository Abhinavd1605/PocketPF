export interface Section {
  id: string;
  name: string;
  category: string;
  coordinates: [number, number, number, number]; // [x1, y1, x2, y2]
  aisle?: number;
}

export interface Landmark {
  id:string;
  name: string;
  coordinates: [number, number]; // [x, y]
}

export interface StoreLayout {
  width: number;
  height: number;
  entrance: [number, number];
  exit: [number, number];
  sections: Section[];
  landmarks: Landmark[];
  walls: [number, number][]; // Array of [x, y] coordinates for walls
}

export interface Store {
  id: string;
  name: string;
  description: string;
  layout: StoreLayout;
}

export type ProcessedItem = {
  original_text: string;
  interpreted_item: string;
  category: string;
  confidence: number;
  alternatives: string[];
  checked: boolean;
  found_in_database: boolean;
  database_alternatives: string[];
};

export type NavigationInstruction = {
  id: number;
  instruction: string;
  location: [number, number] | null;
}
