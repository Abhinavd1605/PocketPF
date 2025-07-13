import { prisma } from './db';

// Define types based on Prisma models
export type Item = {
  id: string;
  name: string;
  category: string;
  aliases: string[];
  description: string | null;
  brand: string | null;
  size: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Alternative = {
  id: string;
  itemId: string;
  alternativeItemId: string;
  reason: string | null;
  priority: number;
};

export interface ItemWithAlternatives extends Item {
  alternatives: (Alternative & {
    alternativeItem: Item;
  })[];
}

export interface ItemSearchResult {
  item: Item | null;
  alternatives: Item[];
  isExactMatch: boolean;
  confidence: number;
}

/**
 * Search for an item in the database by name or alias
 */
export async function searchItem(searchTerm: string): Promise<ItemSearchResult> {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  // Create variations of the search term
  const searchVariations = [
    normalizedSearch,
    normalizedSearch.endsWith('s') ? normalizedSearch.slice(0, -1) : normalizedSearch + 's', // Handle plurals
    normalizedSearch.replace(/\s+/g, ''), // Remove spaces
    normalizedSearch.replace(/[^\w\s]/g, ''), // Remove special characters
  ];
  
  // Try exact match first with all variations
  let item = await prisma.item.findFirst({
    where: {
      OR: [
        ...searchVariations.map(variation => ({ name: { equals: variation, mode: 'insensitive' as const } })),
        ...searchVariations.map(variation => ({ aliases: { has: variation } }))
      ]
    },
    include: {
      alternatives: {
        include: {
          alternativeItem: true
        },
        orderBy: {
          priority: 'asc'
        }
      }
    }
  });

  if (item) {
    return {
      item,
      alternatives: item.alternatives.map((alt: any) => alt.alternativeItem),
      isExactMatch: true,
      confidence: 1.0
    };
  }

  // Try partial match with variations
  item = await prisma.item.findFirst({
    where: {
      OR: [
        ...searchVariations.map(variation => ({ name: { contains: variation, mode: 'insensitive' as const } })),
        ...searchVariations.flatMap(variation => [
          { aliases: { hasSome: [variation] } },
          { description: { contains: variation, mode: 'insensitive' as const } }
        ])
      ]
    },
    include: {
      alternatives: {
        include: {
          alternativeItem: true
        },
        orderBy: {
          priority: 'asc'
        }
      }
    }
  });

  if (item) {
    return {
      item,
      alternatives: item.alternatives.map((alt: any) => alt.alternativeItem),
      isExactMatch: false,
      confidence: 0.7
    };
  }

  // No match found, get alternatives by category
  const alternatives = await getAlternativesByCategory(normalizedSearch);
  
  return {
    item: null,
    alternatives,
    isExactMatch: false,
    confidence: 0.3
  };
}

/**
 * Get alternative items by category when no direct match is found
 */
export async function getAlternativesByCategory(searchTerm: string): Promise<Item[]> {
  // Try to find items in similar categories
  const categoryMatches = await prisma.item.findMany({
    where: {
      OR: [
        { category: { contains: searchTerm, mode: 'insensitive' } },
        { name: { contains: searchTerm, mode: 'insensitive' } }
      ]
    },
    take: 5,
    orderBy: {
      name: 'asc'
    }
  });

  return categoryMatches;
}

/**
 * Get all items in a specific category
 */
export async function getItemsByCategory(category: string): Promise<Item[]> {
  return await prisma.item.findMany({
    where: {
      category: {
        equals: category,
        mode: 'insensitive'
      }
    },
    orderBy: {
      name: 'asc'
    }
  });
}

/**
 * Add a new item to the database
 */
export async function addItem(data: {
  name: string;
  category: string;
  aliases?: string[];
  description?: string;
  brand?: string;
  size?: string;
}): Promise<Item> {
  return await prisma.item.create({
    data: {
      name: data.name.toLowerCase().trim(),
      category: data.category.toLowerCase().trim(),
      aliases: data.aliases?.map(alias => alias.toLowerCase().trim()) || [],
      description: data.description,
      brand: data.brand,
      size: data.size
    }
  });
}

/**
 * Add an alternative relationship between two items
 */
export async function addAlternative(
  itemId: string,
  alternativeItemId: string,
  reason?: string,
  priority: number = 1
): Promise<Alternative> {
  return await prisma.alternative.create({
    data: {
      itemId,
      alternativeItemId,
      reason,
      priority
    }
  });
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<string[]> {
  const categories = await prisma.item.findMany({
    select: {
      category: true
    },
    distinct: ['category']
  });
  
  return categories.map((c: any) => c.category);
}

/**
 * Batch search for multiple items
 */
export async function searchMultipleItems(searchTerms: string[]): Promise<ItemSearchResult[]> {
  const results = await Promise.all(
    searchTerms.map(term => searchItem(term))
  );
  
  return results;
} 