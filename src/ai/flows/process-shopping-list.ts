'use server';

/**
 * @fileOverview Processes a shopping list using AI to recognize items,
 * handle variations, and assign confidence scores.
 *
 * - processShoppingList - A function that processes the shopping list.
 * - ProcessShoppingListInput - The input type for the processShoppingList function.
 * - ProcessShoppingListOutput - The return type for the processShoppingList function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { searchMultipleItems, searchItem } from '@/lib/item-service';

const ProcessShoppingListInputSchema = z.object({
  userInput: z.string().describe('The user-provided shopping list as text. Can be empty if an image is provided.'),
  listImage: z.string().optional().describe("An image of a shopping list, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  storeCategories: z.array(z.string()).optional().describe('A list of available store categories to choose from.'),
});
export type ProcessShoppingListInput = z.infer<typeof ProcessShoppingListInputSchema>;

const ProcessShoppingListItemSchema = z.object({
  original_text: z.string().describe('The original text from the user input.'),
  interpreted_item: z.string().describe('The AI-interpreted item name.'),
  category: z.string().describe('The product category of the item.'),
  confidence: z.number().describe('Confidence score (0-1) of the item recognition.'),
  alternatives: z.array(z.string()).describe('Alternative item suggestions.'),
  found_in_database: z.boolean().describe('Whether the item was found in the database.'),
  database_alternatives: z.array(z.string()).describe('Alternative suggestions from the database.'),
});

const ProcessShoppingListOutputSchema = z.object({
  items: z.array(ProcessShoppingListItemSchema).describe('An array of recognized shopping list items.'),
});
export type ProcessShoppingListOutput = z.infer<typeof ProcessShoppingListOutputSchema>;

export async function processShoppingList(input: ProcessShoppingListInput): Promise<ProcessShoppingListOutput> {
  return processShoppingListFlow(input);
}

const prompt = ai.definePrompt({
  name: 'processShoppingListPrompt',
  input: {schema: ProcessShoppingListInputSchema},
  output: {schema: ProcessShoppingListOutputSchema},
  prompt: `Parse the shopping list provided by the user and extract the individual items.
The shopping list can be provided as text and/or an image. Prioritize the image if both are provided.
For each item, provide the most likely product category and suggest specific products available in a typical grocery store. Also provide a confidence score between 0 and 1. The closer to 1, the more certain you are of the item.

This system will later check a database of known items and provide additional alternatives if the item is not found or suggest better matches if found.

{{#if storeCategories}}
You MUST assign each item to one of the following categories: {{#each storeCategories}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.
{{/if}}

{{#if userInput}}
Shopping list text: "{{{userInput}}}"
{{/if}}
{{#if listImage}}
Shopping list image: {{media url=listImage}}
{{/if}}

Return a JSON object with the following format:
{
  "items": [
    {
      "original_text": "milk",
      "interpreted_item": "2% milk",
      "category": "dairy",
      "confidence": 0.95,
      "alternatives": ["whole milk", "almond milk"],
      "found_in_database": false,
      "database_alternatives": []
    }
  ]
}

Note: The found_in_database and database_alternatives fields will be populated automatically by the system after checking the database.
`,
});

const processShoppingListFlow = ai.defineFlow(
  {
    name: 'processShoppingListFlow',
    inputSchema: ProcessShoppingListInputSchema,
    outputSchema: ProcessShoppingListOutputSchema,
  },
  async input => {
    // If no input is provided, return an empty list.
    if (!input.userInput && !input.listImage) {
      return { items: [] };
    }
    
    // First, get AI processing results
    const {output} = await prompt(input);
    if (!output) {
      return { items: [] };
    }
    
    // For each item, check database and enhance with alternatives
    const enhancedItems = await Promise.all(
      output.items.map(async (item) => {
        // Search for the item in the database
        const dbResult = await searchItem(item.original_text);
        
        if (dbResult.item) {
          // Item found in database - use database info completely
          return {
            original_text: item.original_text,
            interpreted_item: dbResult.item.name,
            category: dbResult.item.category,
            confidence: Math.max(0.8, dbResult.confidence), // High confidence for database items
            alternatives: dbResult.alternatives.map(alt => alt.name),
            found_in_database: true,
            database_alternatives: dbResult.alternatives.map(alt => alt.name)
          };
        } else {
          // Item not found in database - check if we have good alternatives
          if (dbResult.alternatives.length > 0) {
            // We have database alternatives - suggest the best one as the main item
            const bestAlternative = dbResult.alternatives[0];
            return {
              original_text: item.original_text,
              interpreted_item: bestAlternative.name,
              category: bestAlternative.category,
              confidence: 0.7, // Medium confidence for suggested alternatives
              alternatives: dbResult.alternatives.slice(1).map(alt => alt.name), // Other alternatives
              found_in_database: false,
              database_alternatives: dbResult.alternatives.map(alt => alt.name)
            };
          } else {
            // No database alternatives - skip this item as it's not available in store
            return null;
          }
        }
      })
    );
    
    // Filter out null items (items not available in store)
    const validItems = enhancedItems.filter(item => item !== null);
    
    return { items: validItems };
  }
);
