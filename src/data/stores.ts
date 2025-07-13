import type { Store } from '@/types';

export const stores: Store[] = [
  {
    id: 'walmart-supercenter',
    name: 'Walmart Supercenter - Main Street',
    description: 'Large store with groceries & general merchandise. (20x15)',
    layout: {
      width: 20,
      height: 15,
      entrance: [10, 14],
      exit: [10, 14],
      sections: [
        { id: 'produce', name: 'Fresh Produce', category: 'produce', coordinates: [1, 1, 3, 5], aisle: 1 },
        { id: 'bakery', name: 'Bakery', category: 'bakery', coordinates: [1, 7, 3, 11], aisle: 2 },
        { id: 'meat', name: 'Meat & Seafood', category: 'meat', coordinates: [6, 1, 8, 5], aisle: 3 },
        { id: 'dairy', name: 'Dairy & Eggs', category: 'dairy', coordinates: [6, 7, 8, 13], aisle: 4 },
        { id: 'pantry', name: 'Pantry & Canned Goods', category: 'pantry', coordinates: [11, 1, 13, 10], aisle: 5 },
        { id: 'frozen', name: 'Frozen Foods', category: 'frozen', coordinates: [16, 1, 18, 5], aisle: 6 },
        { id: 'beverages', name: 'Beverages', category: 'beverages', coordinates: [16, 7, 18, 11], aisle: 7 },
        { id: 'snacks', name: 'Snacks & Chips', category: 'snacks', coordinates: [11, 11, 13, 13], aisle: 8 },
        { id: 'cleaning', name: 'Cleaning Supplies', category: 'cleaning', coordinates: [6, 14, 8, 14], aisle: 9 },
        { id: 'checkout', name: 'Checkout', category: 'checkout', coordinates: [9, 12, 11, 14] },
      ],
      landmarks: [
        { id: 'cs', name: 'Customer Service', coordinates: [2, 13] },
        { id: 'restrooms', name: 'Restrooms', coordinates: [17, 13] },
        { id: 'pharmacy', name: 'Pharmacy', coordinates: [18, 1] },
      ],
      walls: [
        ...Array.from({ length: 13 }, (_, i) => [4, i + 1] as [number, number]),
        ...Array.from({ length: 13 }, (_, i) => [9, i + 1] as [number, number]),
        ...Array.from({ length: 13 }, (_, i) => [14, i + 1] as [number, number]),
      ],
    },
  },
  {
    id: 'target',
    name: 'Target',
    description: 'Medium department-style store with groceries. (15x12)',
    layout: {
      width: 15,
      height: 12,
      entrance: [7, 11],
      exit: [7, 11],
      sections: [
        { id: 'produce', name: 'Fresh Produce', category: 'produce', coordinates: [1, 1, 4, 3] },
        { id: 'dairy', name: 'Dairy & Eggs', category: 'dairy', coordinates: [1, 4, 4, 6] },
        { id: 'meat', name: 'Meat & Deli', category: 'meat', coordinates: [1, 7, 4, 10] },
        { id: 'bakery', name: 'Bakery', category: 'bakery', coordinates: [6, 1, 9, 4] },
        { id: 'pantry', name: 'Pantry Items', category: 'pantry', coordinates: [6, 6, 9, 10] },
        { id: 'frozen', name: 'Frozen Foods', category: 'frozen', coordinates: [11, 1, 13, 4] },
        { id: 'beverages', name: 'Beverages', category: 'beverages', coordinates: [11, 5, 13, 7] },
        { id: 'snacks', name: 'Snacks', category: 'snacks', coordinates: [11, 8, 13, 10] },
      ],
      landmarks: [
        { id: 'cs', name: 'Guest Services', coordinates: [2, 10] },
        { id: 'starbucks', name: 'Starbucks', coordinates: [12, 10] },
      ],
      walls: [
        ...Array.from({ length: 10 }, (_, i) => [5, i + 1] as [number, number]),
        ...Array.from({ length: 10 }, (_, i) => [10, i + 1] as [number, number]),
      ],
    },
  },
  {
    id: 'local-grocery',
    name: 'Local Grocery',
    description: 'Small, simple grocery store. (10x8)',
    layout: {
      width: 10,
      height: 8,
      entrance: [1, 7],
      exit: [8, 7],
      sections: [
        { id: 'produce', name: 'Produce', category: 'Produce', coordinates: [1, 1, 2, 5] },
        { id: 'dairy', name: 'Dairy', category: 'Dairy', coordinates: [4, 1, 5, 5] },
        { id: 'meat', name: 'Meat', category: 'Meat', coordinates: [7, 1, 8, 5] },
        { id: 'pantry', name: 'Pantry', category: 'Pantry', coordinates: [1, 1, 8, 1] },
      ],
      landmarks: [
        { id: 'checkout', name: 'Checkout', coordinates: [4, 7] },
      ],
      walls: [
        ...Array.from({ length: 5 }, (_, i) => [3, i + 1] as [number, number]),
        ...Array.from({ length: 5 }, (_, i) => [6, i + 1] as [number, number]),
      ],
    },
  },
  {
    id: 'walmart-supercenter-xl',
    name: 'Walmart Supercenter XL - Highway Plaza',
    description: 'Extra large supercenter with expanded grocery and general merchandise. (30x20)',
    layout: {
      width: 30,
      height: 20,
      entrance: [15, 19],
      exit: [15, 19],
      sections: [
        // Left side - Fresh departments
        { id: 'produce', name: 'Fresh Produce', category: 'produce', coordinates: [1, 1, 5, 6], aisle: 1 },
        { id: 'deli', name: 'Deli & Hot Foods', category: 'meat', coordinates: [1, 7, 5, 10], aisle: 2 },
        { id: 'bakery', name: 'Bakery', category: 'bakery', coordinates: [1, 11, 5, 14], aisle: 3 },
        { id: 'meat', name: 'Meat & Seafood', category: 'meat', coordinates: [1, 15, 5, 18], aisle: 4 },
        
        // Center-left - Dairy and frozen
        { id: 'dairy', name: 'Dairy & Eggs', category: 'dairy', coordinates: [7, 1, 11, 8], aisle: 5 },
        { id: 'frozen', name: 'Frozen Foods', category: 'frozen', coordinates: [7, 9, 11, 16], aisle: 6 },
        
        // Center - Pantry aisles
        { id: 'pantry1', name: 'Canned Goods', category: 'pantry', coordinates: [13, 1, 17, 4], aisle: 7 },
        { id: 'pantry2', name: 'Cereal & Breakfast', category: 'pantry', coordinates: [13, 5, 17, 8], aisle: 8 },
        { id: 'pantry3', name: 'Pasta & Sauces', category: 'pantry', coordinates: [13, 9, 17, 12], aisle: 9 },
        { id: 'pantry4', name: 'Baking Supplies', category: 'pantry', coordinates: [13, 13, 17, 16], aisle: 10 },
        
        // Right side - Beverages and snacks
        { id: 'beverages1', name: 'Soft Drinks', category: 'beverages', coordinates: [19, 1, 23, 6], aisle: 11 },
        { id: 'beverages2', name: 'Water & Juices', category: 'beverages', coordinates: [19, 7, 23, 12], aisle: 12 },
        { id: 'snacks', name: 'Snacks & Chips', category: 'snacks', coordinates: [19, 13, 23, 16], aisle: 13 },
        
        // Far right - Non-food
        { id: 'cleaning', name: 'Cleaning & Paper', category: 'cleaning', coordinates: [25, 1, 28, 8], aisle: 14 },
        { id: 'health', name: 'Health & Beauty', category: 'cleaning', coordinates: [25, 9, 28, 16], aisle: 15 },
        
        // Front area - Checkout and services
        { id: 'checkout', name: 'Checkout Lanes', category: 'checkout', coordinates: [12, 17, 18, 19] },
        { id: 'customer-service', name: 'Customer Service', category: 'checkout', coordinates: [6, 17, 11, 19] },
        { id: 'exit-area', name: 'Exit Area', category: 'checkout', coordinates: [19, 17, 24, 19] },
      ],
      landmarks: [
        { id: 'pharmacy', name: 'Pharmacy', coordinates: [28, 1] },
        { id: 'vision-center', name: 'Vision Center', coordinates: [28, 8] },
        { id: 'restrooms', name: 'Restrooms', coordinates: [28, 16] },
        { id: 'mcdonald', name: "McDonald's", coordinates: [2, 17] },
        { id: 'auto-center', name: 'Auto Center', coordinates: [29, 19] },
      ],
      walls: [
        // Vertical separators
        ...Array.from({ length: 16 }, (_, i) => [6, i + 1] as [number, number]),
        ...Array.from({ length: 16 }, (_, i) => [12, i + 1] as [number, number]),
        ...Array.from({ length: 16 }, (_, i) => [18, i + 1] as [number, number]),
        ...Array.from({ length: 16 }, (_, i) => [24, i + 1] as [number, number]),
        // Horizontal separators for aisles
        ...Array.from({ length: 6 }, (_, i) => [i + 7, 8] as [number, number]),
        ...Array.from({ length: 6 }, (_, i) => [i + 19, 6] as [number, number]),
        ...Array.from({ length: 6 }, (_, i) => [i + 19, 12] as [number, number]),
      ],
    },
  },
  {
    id: 'walmart-neighborhood',
    name: 'Walmart Neighborhood Market',
    description: 'Compact grocery-focused store with essentials. (18x12)',
    layout: {
      width: 18,
      height: 12,
      entrance: [9, 11],
      exit: [9, 11],
      sections: [
        { id: 'produce', name: 'Fresh Produce', category: 'produce', coordinates: [1, 1, 4, 5], aisle: 1 },
        { id: 'deli', name: 'Deli', category: 'meat', coordinates: [1, 6, 4, 8], aisle: 2 },
        { id: 'bakery', name: 'Bakery', category: 'bakery', coordinates: [1, 9, 4, 10], aisle: 3 },
        
        { id: 'meat', name: 'Meat & Seafood', category: 'meat', coordinates: [6, 1, 9, 4], aisle: 4 },
        { id: 'dairy', name: 'Dairy', category: 'dairy', coordinates: [6, 5, 9, 8], aisle: 5 },
        
        { id: 'pantry', name: 'Pantry Items', category: 'pantry', coordinates: [11, 1, 14, 6], aisle: 6 },
        { id: 'frozen', name: 'Frozen', category: 'frozen', coordinates: [11, 7, 14, 8], aisle: 7 },
        
        { id: 'beverages', name: 'Beverages', category: 'beverages', coordinates: [16, 1, 17, 6], aisle: 8 },
        { id: 'snacks', name: 'Snacks', category: 'snacks', coordinates: [16, 7, 17, 8], aisle: 9 },
        
        { id: 'checkout', name: 'Self-Checkout', category: 'checkout', coordinates: [7, 9, 11, 11] },
      ],
      landmarks: [
        { id: 'customer-service', name: 'Customer Service', coordinates: [2, 11] },
        { id: 'pharmacy', name: 'Pharmacy', coordinates: [16, 11] },
        { id: 'restrooms', name: 'Restrooms', coordinates: [15, 9] },
      ],
      walls: [
        ...Array.from({ length: 8 }, (_, i) => [5, i + 1] as [number, number]),
        ...Array.from({ length: 8 }, (_, i) => [10, i + 1] as [number, number]),
        ...Array.from({ length: 8 }, (_, i) => [15, i + 1] as [number, number]),
      ],
    },
  },
  {
    id: 'walmart-multistory',
    name: 'Walmart Supercenter - Downtown (Ground Floor)',
    description: 'Multi-story urban Walmart - Ground floor with groceries. (25x18)',
    layout: {
      width: 25,
      height: 18,
      entrance: [12, 17],
      exit: [12, 17],
      sections: [
        // Ground floor - Groceries only
        { id: 'produce', name: 'Fresh Produce', category: 'produce', coordinates: [1, 1, 6, 6], aisle: 1 },
        { id: 'deli', name: 'Deli & Prepared Foods', category: 'meat', coordinates: [1, 7, 6, 10], aisle: 2 },
        { id: 'bakery', name: 'In-Store Bakery', category: 'bakery', coordinates: [1, 11, 6, 14], aisle: 3 },
        
        { id: 'meat', name: 'Meat & Seafood', category: 'meat', coordinates: [8, 1, 12, 6], aisle: 4 },
        { id: 'dairy', name: 'Dairy & Eggs', category: 'dairy', coordinates: [8, 7, 12, 12], aisle: 5 },
        { id: 'frozen', name: 'Frozen Foods', category: 'frozen', coordinates: [8, 13, 12, 16], aisle: 6 },
        
        { id: 'pantry1', name: 'Canned & Packaged', category: 'pantry', coordinates: [14, 1, 18, 6], aisle: 7 },
        { id: 'pantry2', name: 'Cereal & Breakfast', category: 'pantry', coordinates: [14, 7, 18, 10], aisle: 8 },
        { id: 'pantry3', name: 'International Foods', category: 'pantry', coordinates: [14, 11, 18, 14], aisle: 9 },
        
        { id: 'beverages', name: 'Beverages', category: 'beverages', coordinates: [20, 1, 23, 8], aisle: 10 },
        { id: 'snacks', name: 'Snacks & Candy', category: 'snacks', coordinates: [20, 9, 23, 12], aisle: 11 },
        { id: 'cleaning', name: 'Household Items', category: 'cleaning', coordinates: [20, 13, 23, 16], aisle: 12 },
        
        // Services and checkout
        { id: 'checkout', name: 'Checkout Lanes', category: 'checkout', coordinates: [10, 15, 16, 17] },
        { id: 'customer-service', name: 'Customer Service', category: 'checkout', coordinates: [6, 15, 9, 17] },
        { id: 'escalator-area', name: 'Escalator to 2nd Floor', category: 'checkout', coordinates: [17, 15, 20, 17] },
      ],
      landmarks: [
        { id: 'escalator-up', name: 'Escalator ↑', coordinates: [18, 16] },
        { id: 'elevator', name: 'Elevator', coordinates: [19, 16] },
        { id: 'pharmacy', name: 'Pharmacy', coordinates: [24, 1] },
        { id: 'restrooms', name: 'Restrooms', coordinates: [24, 8] },
        { id: 'starbucks', name: 'Starbucks', coordinates: [2, 15] },
        { id: 'grocery-pickup', name: 'Grocery Pickup', coordinates: [24, 16] },
      ],
      walls: [
        ...Array.from({ length: 14 }, (_, i) => [7, i + 1] as [number, number]),
        ...Array.from({ length: 14 }, (_, i) => [13, i + 1] as [number, number]),
        ...Array.from({ length: 14 }, (_, i) => [19, i + 1] as [number, number]),
        // Separate checkout area
        ...Array.from({ length: 7 }, (_, i) => [i + 6, 14] as [number, number]),
      ],
    },
  },
  {
    id: 'walmart-multistory-floor2',
    name: 'Walmart Supercenter - Downtown (2nd Floor)',
    description: 'Multi-story urban Walmart - 2nd floor with general merchandise. (25x18)',
    layout: {
      width: 25,
      height: 18,
      entrance: [18, 17], // Escalator entrance
      exit: [18, 17],
      sections: [
        // Electronics and entertainment
        { id: 'electronics', name: 'Electronics', category: 'cleaning', coordinates: [1, 1, 6, 6] },
        { id: 'gaming', name: 'Video Games', category: 'cleaning', coordinates: [1, 7, 6, 10] },
        { id: 'music-movies', name: 'Music & Movies', category: 'cleaning', coordinates: [1, 11, 6, 14] },
        
        // Clothing and accessories
        { id: 'mens-clothing', name: "Men's Clothing", category: 'cleaning', coordinates: [8, 1, 12, 6] },
        { id: 'womens-clothing', name: "Women's Clothing", category: 'cleaning', coordinates: [8, 7, 12, 12] },
        { id: 'kids-clothing', name: "Kids' Clothing", category: 'cleaning', coordinates: [8, 13, 12, 16] },
        
        // Home and garden
        { id: 'home-decor', name: 'Home Decor', category: 'cleaning', coordinates: [14, 1, 18, 6] },
        { id: 'furniture', name: 'Furniture', category: 'cleaning', coordinates: [14, 7, 18, 10] },
        { id: 'garden-center', name: 'Garden Center', category: 'cleaning', coordinates: [14, 11, 18, 14] },
        
        // Sports and automotive
        { id: 'sports', name: 'Sports & Outdoors', category: 'cleaning', coordinates: [20, 1, 23, 8] },
        { id: 'automotive', name: 'Automotive', category: 'cleaning', coordinates: [20, 9, 23, 12] },
        { id: 'toys', name: 'Toys', category: 'cleaning', coordinates: [20, 13, 23, 16] },
        
        // Customer service area
        { id: 'returns', name: 'Returns & Exchanges', category: 'checkout', coordinates: [10, 15, 16, 17] },
        { id: 'escalator-down', name: 'Escalator to Ground Floor', category: 'checkout', coordinates: [17, 15, 20, 17] },
      ],
      landmarks: [
        { id: 'escalator-down-landmark', name: 'Escalator ↓', coordinates: [18, 16] },
        { id: 'elevator-2f', name: 'Elevator', coordinates: [19, 16] },
        { id: 'fitting-rooms', name: 'Fitting Rooms', coordinates: [12, 8] },
        { id: 'restrooms-2f', name: 'Restrooms', coordinates: [24, 8] },
        { id: 'layaway', name: 'Layaway', coordinates: [24, 16] },
      ],
      walls: [
        ...Array.from({ length: 14 }, (_, i) => [7, i + 1] as [number, number]),
        ...Array.from({ length: 14 }, (_, i) => [13, i + 1] as [number, number]),
        ...Array.from({ length: 14 }, (_, i) => [19, i + 1] as [number, number]),
        // Separate service area
        ...Array.from({ length: 7 }, (_, i) => [i + 6, 14] as [number, number]),
      ],
    },
  },
  {
    id: 'walmart-urban-compact',
    name: 'Walmart Express - City Center',
    description: 'Compact urban store with essentials and quick checkout. (15x10)',
    layout: {
      width: 15,
      height: 10,
      entrance: [7, 9],
      exit: [7, 9],
      sections: [
        { id: 'produce', name: 'Fresh Produce', category: 'produce', coordinates: [1, 1, 3, 4], aisle: 1 },
        { id: 'deli', name: 'Grab & Go', category: 'meat', coordinates: [1, 5, 3, 7], aisle: 2 },
        
        { id: 'dairy', name: 'Dairy', category: 'dairy', coordinates: [5, 1, 7, 4], aisle: 3 },
        { id: 'frozen', name: 'Frozen', category: 'frozen', coordinates: [5, 5, 7, 7], aisle: 4 },
        
        { id: 'pantry', name: 'Essentials', category: 'pantry', coordinates: [9, 1, 11, 6], aisle: 5 },
        { id: 'beverages', name: 'Drinks', category: 'beverages', coordinates: [13, 1, 14, 4], aisle: 6 },
        { id: 'snacks', name: 'Snacks', category: 'snacks', coordinates: [13, 5, 14, 6], aisle: 7 },
        
        { id: 'checkout', name: 'Express Checkout', category: 'checkout', coordinates: [5, 8, 9, 9] },
      ],
      landmarks: [
        { id: 'atm', name: 'ATM', coordinates: [1, 8] },
        { id: 'customer-service-express', name: 'Service Desk', coordinates: [13, 8] },
        { id: 'restrooms-express', name: 'Restrooms', coordinates: [14, 7] },
      ],
      walls: [
        ...Array.from({ length: 7 }, (_, i) => [4, i + 1] as [number, number]),
        ...Array.from({ length: 7 }, (_, i) => [8, i + 1] as [number, number]),
        ...Array.from({ length: 7 }, (_, i) => [12, i + 1] as [number, number]),
      ],
    },
  },
];
