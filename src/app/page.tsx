import { stores } from '@/data/stores';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, ListChecks } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-2 font-headline flex items-center justify-center gap-4">
          <ListChecks className="h-10 w-10 sm:h-12 sm:w-12" />
          Pocket PathFinder
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Navigate large stores with ease. Get optimized routes for your shopping list and save time.
        </p>
      </div>
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">Select a Store to Begin</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stores.map((store) => (
            <Card key={store.id} className="h-full flex flex-col hover:shadow-primary/20 hover:shadow-lg hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-headline">
                  <MapPin className="text-primary" />
                  {store.name}
                </CardTitle>
                <CardDescription>{store.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                 <Button asChild className="w-full" variant="outline">
                    <Link href={`/store/${store.id}`}>
                      Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
       <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Pocket PathFinder. All rights reserved.</p>
      </footer>
    </main>
  );
}
