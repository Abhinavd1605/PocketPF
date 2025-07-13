import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });
config({ path: '.env' });

const prisma = new PrismaClient();

const groceryItems = [
  // Dairy
  { name: 'milk', category: 'dairy', aliases: ['2% milk', 'whole milk', 'skim milk'], description: 'Fresh milk' },
  { name: 'cheese', category: 'dairy', aliases: ['cheddar', 'swiss', 'american cheese'], description: 'Cheese varieties' },
  { name: 'butter', category: 'dairy', aliases: ['salted butter', 'unsalted butter'], description: 'Butter' },
  { name: 'yogurt', category: 'dairy', aliases: ['greek yogurt', 'plain yogurt'], description: 'Yogurt products' },
  { name: 'eggs', category: 'dairy', aliases: ['dozen eggs', 'large eggs'], description: 'Fresh eggs' },
  
  // Produce
  { name: 'apples', category: 'produce', aliases: ['red apples', 'green apples', 'gala apples'], description: 'Fresh apples' },
  { name: 'bananas', category: 'produce', aliases: ['yellow bananas', 'ripe bananas'], description: 'Fresh bananas' },
  { name: 'oranges', category: 'produce', aliases: ['navel oranges', 'valencia oranges'], description: 'Fresh oranges' },
  { name: 'lettuce', category: 'produce', aliases: ['iceberg lettuce', 'romaine lettuce'], description: 'Fresh lettuce' },
  { name: 'tomatoes', category: 'produce', aliases: ['cherry tomatoes', 'roma tomatoes'], description: 'Fresh tomatoes' },
  { name: 'onions', category: 'produce', aliases: ['yellow onions', 'red onions', 'white onions'], description: 'Fresh onions' },
  { name: 'carrots', category: 'produce', aliases: ['baby carrots', 'carrot sticks'], description: 'Fresh carrots' },
  { name: 'potatoes', category: 'produce', aliases: ['russet potatoes', 'red potatoes'], description: 'Fresh potatoes' },
  
  // Meat
  { name: 'chicken breast', category: 'meat', aliases: ['boneless chicken', 'chicken breasts'], description: 'Fresh chicken breast' },
  { name: 'ground beef', category: 'meat', aliases: ['ground chuck', 'hamburger meat'], description: 'Ground beef' },
  { name: 'salmon', category: 'meat', aliases: ['fresh salmon', 'salmon fillet'], description: 'Fresh salmon' },
  { name: 'pork chops', category: 'meat', aliases: ['bone-in pork chops', 'boneless pork chops'], description: 'Pork chops' },
  
  // Bakery
  { name: 'bread', category: 'bakery', aliases: ['white bread', 'wheat bread', 'whole grain bread'], description: 'Fresh bread' },
  { name: 'bagels', category: 'bakery', aliases: ['plain bagels', 'everything bagels'], description: 'Fresh bagels' },
  { name: 'croissants', category: 'bakery', aliases: ['butter croissants', 'plain croissants'], description: 'Fresh croissants' },
  
  // Pantry
  { name: 'rice', category: 'pantry', aliases: ['white rice', 'brown rice', 'jasmine rice'], description: 'Rice varieties' },
  { name: 'pasta', category: 'pantry', aliases: ['spaghetti', 'penne', 'macaroni'], description: 'Pasta varieties' },
  { name: 'olive oil', category: 'pantry', aliases: ['extra virgin olive oil', 'cooking oil'], description: 'Olive oil' },
  { name: 'salt', category: 'pantry', aliases: ['table salt', 'sea salt'], description: 'Salt' },
  { name: 'sugar', category: 'pantry', aliases: ['white sugar', 'granulated sugar'], description: 'Sugar' },
  { name: 'flour', category: 'pantry', aliases: ['all-purpose flour', 'wheat flour'], description: 'Flour' },
  
  // Beverages
  { name: 'water', category: 'beverages', aliases: ['bottled water', 'spring water'], description: 'Drinking water' },
  { name: 'orange juice', category: 'beverages', aliases: ['fresh orange juice', 'pulp-free orange juice'], description: 'Orange juice' },
  { name: 'coffee', category: 'beverages', aliases: ['ground coffee', 'coffee beans'], description: 'Coffee' },
  { name: 'tea', category: 'beverages', aliases: ['green tea', 'black tea', 'herbal tea'], description: 'Tea varieties' },
  { name: 'soda', category: 'beverages', aliases: ['coca cola', 'pepsi', 'soft drinks'], description: 'Carbonated beverages' },
  
  // Frozen
  { name: 'frozen vegetables', category: 'frozen', aliases: ['frozen peas', 'frozen corn', 'mixed vegetables'], description: 'Frozen vegetables' },
  { name: 'ice cream', category: 'frozen', aliases: ['vanilla ice cream', 'chocolate ice cream'], description: 'Ice cream' },
  { name: 'frozen pizza', category: 'frozen', aliases: ['pepperoni pizza', 'cheese pizza'], description: 'Frozen pizza' },
  
  // Snacks
  { name: 'chips', category: 'snacks', aliases: ['potato chips', 'tortilla chips'], description: 'Snack chips' },
  { name: 'crackers', category: 'snacks', aliases: ['saltine crackers', 'graham crackers'], description: 'Crackers' },
  { name: 'nuts', category: 'snacks', aliases: ['peanuts', 'almonds', 'mixed nuts'], description: 'Nuts' },
  
  // Cleaning
  { name: 'dish soap', category: 'cleaning', aliases: ['dishwashing liquid', 'dawn'], description: 'Dish soap' },
  { name: 'laundry detergent', category: 'cleaning', aliases: ['tide', 'washing powder'], description: 'Laundry detergent' },
  { name: 'paper towels', category: 'cleaning', aliases: ['kitchen towels', 'bounty'], description: 'Paper towels' },
  { name: 'toilet paper', category: 'cleaning', aliases: ['bathroom tissue', 'tp'], description: 'Toilet paper' },
];

const alternatives = [
  // Milk alternatives
  { from: 'milk', to: 'almond milk', reason: 'dairy-free alternative' },
  { from: 'milk', to: 'soy milk', reason: 'dairy-free alternative' },
  { from: 'milk', to: 'oat milk', reason: 'dairy-free alternative' },
  
  // Meat alternatives
  { from: 'ground beef', to: 'ground turkey', reason: 'leaner protein' },
  { from: 'chicken breast', to: 'tofu', reason: 'vegetarian alternative' },
  { from: 'salmon', to: 'tuna', reason: 'similar fish' },
  
  // Bread alternatives
  { from: 'bread', to: 'tortillas', reason: 'alternative carb' },
  { from: 'bread', to: 'pita bread', reason: 'alternative bread type' },
  
  // Sugar alternatives
  { from: 'sugar', to: 'honey', reason: 'natural sweetener' },
  { from: 'sugar', to: 'stevia', reason: 'low-calorie sweetener' },
  
  // Oil alternatives
  { from: 'olive oil', to: 'coconut oil', reason: 'alternative cooking oil' },
  { from: 'olive oil', to: 'vegetable oil', reason: 'neutral flavor oil' },
];

async function main() {
  console.log('🌱 Seeding database...');
  
  // Create categories
  const categories = [...new Set(groceryItems.map(item => item.category))];
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: {
        name: category,
        description: `${category.charAt(0).toUpperCase() + category.slice(1)} items`
      }
    });
  }
  
  // Create items
  const createdItems = new Map<string, string>(); // name -> id
  
  for (const item of groceryItems) {
    const created = await prisma.item.upsert({
      where: { name: item.name },
      update: {},
      create: {
        name: item.name,
        category: item.category,
        aliases: item.aliases,
        description: item.description
      }
    });
    createdItems.set(item.name, created.id);
  }
  
  // Add some additional alternatives that might not be in the main list
  const additionalAlternatives = [
    { name: 'almond milk', category: 'dairy', aliases: ['unsweetened almond milk'], description: 'Dairy-free milk alternative' },
    { name: 'soy milk', category: 'dairy', aliases: ['unsweetened soy milk'], description: 'Dairy-free milk alternative' },
    { name: 'oat milk', category: 'dairy', aliases: ['unsweetened oat milk'], description: 'Dairy-free milk alternative' },
    { name: 'ground turkey', category: 'meat', aliases: ['turkey mince'], description: 'Lean ground turkey' },
    { name: 'tofu', category: 'meat', aliases: ['firm tofu', 'silken tofu'], description: 'Soy-based protein' },
    { name: 'tuna', category: 'meat', aliases: ['canned tuna', 'tuna steak'], description: 'Tuna fish' },
    { name: 'tortillas', category: 'bakery', aliases: ['flour tortillas', 'corn tortillas'], description: 'Flatbread' },
    { name: 'pita bread', category: 'bakery', aliases: ['pita pockets'], description: 'Middle Eastern bread' },
    { name: 'honey', category: 'pantry', aliases: ['raw honey', 'organic honey'], description: 'Natural sweetener' },
    { name: 'stevia', category: 'pantry', aliases: ['stevia sweetener'], description: 'Zero-calorie sweetener' },
    { name: 'coconut oil', category: 'pantry', aliases: ['virgin coconut oil'], description: 'Tropical cooking oil' },
    { name: 'vegetable oil', category: 'pantry', aliases: ['canola oil', 'cooking oil'], description: 'Neutral cooking oil' },
  ];
  
  for (const item of additionalAlternatives) {
    const created = await prisma.item.upsert({
      where: { name: item.name },
      update: {},
      create: {
        name: item.name,
        category: item.category,
        aliases: item.aliases,
        description: item.description
      }
    });
    createdItems.set(item.name, created.id);
  }
  
  // Create alternative relationships
  for (const alt of alternatives) {
    const fromId = createdItems.get(alt.from);
    const toId = createdItems.get(alt.to);
    
    if (fromId && toId) {
      await prisma.alternative.upsert({
        where: {
          itemId_alternativeItemId: {
            itemId: fromId,
            alternativeItemId: toId
          }
        },
        update: {},
        create: {
          itemId: fromId,
          alternativeItemId: toId,
          reason: alt.reason,
          priority: 1
        }
      });
    }
  }
  
  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created ${createdItems.size} items and ${alternatives.length} alternative relationships`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 