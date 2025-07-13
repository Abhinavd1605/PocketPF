# PocketPF - AI-Powered Shopping Route Optimizer

An intelligent shopping assistant that transforms your shopping list into an optimized route through the store, powered by AI and real-time navigation.

## 🚀 Features

### 🤖 AI-Powered Shopping List Processing
- **Smart Item Recognition**: AI processes natural language shopping lists
- **Database Integration**: Matches items against store inventory database
- **Alternative Suggestions**: Suggests available alternatives when items aren't in stock
- **Category Classification**: Automatically categorizes items by store section

### 🗺️ Interactive Store Maps
- **Multiple Store Layouts**: Support for various Walmart and Target configurations
- **Real-time Navigation**: Step-by-step directions with visual path highlighting
- **Responsive Design**: Mobile-first design with collapsible directions panel
- **Zoom Controls**: Pan, zoom, and navigate with mouse/touch controls

### 📱 Mobile-Optimized Experience
- **Touch-Friendly Interface**: Optimized for mobile shopping
- **Collapsible Directions**: Minimizable directions panel for more map space
- **Auto-Zoom Navigation**: Click any step to zoom to that location
- **Smooth Animations**: Fluid transitions between navigation steps

### 🛣️ Route Optimization
- **Optimal Pathfinding**: Calculates most efficient route through store
- **Visual Path Display**: Clear blue path with directional arrows
- **Step-by-Step Instructions**: Detailed turn-by-turn directions
- **Current Location Tracking**: Real-time position indicator

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Lucide Icons
- **Database**: Supabase (PostgreSQL) with Prisma ORM
- **AI**: Google AI Genkit for natural language processing
- **Styling**: Tailwind CSS with custom components
- **State Management**: React hooks and local storage

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd PocketPF
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   DATABASE_URL="your-supabase-database-url"
   GOOGLE_GENAI_API_KEY="your-google-ai-api-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏪 Store Layouts

The application includes several pre-configured store layouts:

### Walmart Variations
- **Walmart Supercenter** (20×15) - Standard large format
- **Walmart Supercenter XL** (30×20) - Expanded with pharmacy, vision center
- **Walmart Neighborhood Market** (18×12) - Grocery-focused format
- **Walmart Downtown** (25×18) - Multi-story urban format
- **Walmart Express** (15×10) - Compact city center format

### Target
- **Target** (15×12) - Medium department store format

## 🎯 How to Use

1. **Select a Store**: Choose from available store layouts
2. **Create Shopping List**: Enter items in natural language
3. **AI Processing**: Let AI categorize and match items to store inventory
4. **Review Suggestions**: Confirm items and alternatives
5. **Generate Route**: Get optimized path through the store
6. **Navigate**: Follow step-by-step directions with interactive map

## 🗂️ Database Schema

### Items
- Product information with categories, aliases, and descriptions
- Support for brand and size variations

### Alternatives
- Intelligent alternative suggestions with reasons
- Priority-based recommendations

### Categories
- Store section mapping for accurate routing

## 🔧 Development

### Project Structure
```
src/
├── ai/                 # AI processing and flows
├── app/               # Next.js app router pages
├── components/        # React components
├── data/              # Store layout data
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and services
└── types/             # TypeScript type definitions
```

### Key Components
- **StoreMap**: Interactive map with zoom and navigation
- **ShoppingList**: AI-powered list processing interface
- **NavigationPanel**: Step-by-step directions display
- **RouteDisplayClient**: Main route visualization component

## 🏆 About Walmart's Challenge

This project was developed for a Walmart innovation challenge, and it's exciting to share how they evaluate submissions! Walmart chooses winners based on four key criteria that really showcase what they value in innovative solutions:

**What Walmart Looks For:**
- **Innovation, Creativity & Scalability** - They want solutions that think outside the box and can grow with their business
- **Technical Feasibility** - Your idea needs to actually work in the real world (no pipe dreams!)
- **Impact & Benefit to Walmart** - How will this make shopping better for customers and operations smoother for Walmart?
- **Quality of Proof of Concept & Demo** - Show, don't just tell! A working demo speaks volumes

It's clear that Walmart values practical innovation that can genuinely improve the shopping experience. PocketPF addresses these criteria by offering a scalable AI solution that enhances customer navigation, reduces shopping time, and could potentially integrate with Walmart's existing infrastructure to benefit both shoppers and store operations.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google AI Genkit** for natural language processing
- **Supabase** for database hosting
- **Radix UI** for accessible UI components
- **Tailwind CSS** for styling system

---

**PocketPF** - Making shopping smarter, one route at a time! 🛒✨ 