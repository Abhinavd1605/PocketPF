'use client';

import type { Store, ProcessedItem, NavigationInstruction } from '@/types';
import { useState, useMemo, useEffect } from 'react';
import StoreMap from '@/components/store-map';
import NavigationPanel from '@/components/navigation-panel';
import { findOptimalRoute } from '@/lib/pathfinding';
import { generateNavigationInstructions } from '@/lib/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle, ChevronUp, ChevronDown, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function RouteDisplayClient({ store }: { store: Store }) {
  const [confirmedItems, setConfirmedItems] = useState<ProcessedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeInstructionId, setActiveInstructionId] = useState<number | null>(null);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem('confirmedItems');
      if (storedItems) {
        const items: ProcessedItem[] = JSON.parse(storedItems);
        setConfirmedItems(items);
      }
    } catch (e) {
      console.error("Failed to parse items from localStorage", e);
      toast({
        title: 'Error',
        description: 'Could not load your shopping list.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  }, [toast]);

  const { optimizedPath, navigationInstructions } = useMemo(() => {
    if (confirmedItems.length === 0) {
      return { optimizedPath: [], navigationInstructions: [] };
    }
    const path = findOptimalRoute(confirmedItems, store.layout);
    const instructions = generateNavigationInstructions(path, store.layout, confirmedItems);
    return { optimizedPath: path, navigationInstructions: instructions };
  }, [confirmedItems, store.layout]);

  useEffect(() => {
    if (navigationInstructions.length > 0 && confirmedItems.length > 0) {
      setActiveInstructionId(navigationInstructions[0].id);
      toast({
          title: 'Route Generated!',
          description: `Your optimized route for ${store.name} is ready.`,
      });
    }
  }, [navigationInstructions, confirmedItems, store.name, toast]);
  
  const handleInstructionSelect = (id: number) => {
    setActiveInstructionId(id);
  };

  const itemLocations = useMemo(() => {
    return confirmedItems.map(item => {
      const section = store.layout.sections.find(s => s.category.toLowerCase() === item.category.toLowerCase());
      if (section) {
        const [x1, y1, x2, y2] = section.coordinates;
        return {
          ...item,
          location: {
            x: Math.floor((x1 + x2) / 2),
            y: Math.floor((y1 + y2) / 2),
          },
        };
      }
      return item;
    }).filter(item => 'location' in item) as (ProcessedItem & { location: { x: number, y: number }})[];
  }, [confirmedItems, store.layout.sections]);
  
  const activeLocation = useMemo(() => {
    if (activeInstructionId === null) return store.layout.entrance;
    const instruction = navigationInstructions.find(inst => inst.id === activeInstructionId);
    return instruction?.location || store.layout.entrance;
  }, [activeInstructionId, navigationInstructions, store.layout.entrance]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (confirmedItems.length === 0 && !isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
          <Card className="text-center p-8">
            <CardHeader>
                <CardTitle>No List Found</CardTitle>
                <CardDescription>We couldn't find a shopping list. Please go back and create one.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link href={`/store/${store.id}`}>Create a List</Link>
                </Button>
            </CardContent>
          </Card>
      </div>
    )
  }

  return (
        <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex justify-center min-h-screen bg-background p-4 pt-20">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3 flex flex-col gap-6">
            <NavigationPanel
              instructions={navigationInstructions}
              items={confirmedItems}
              activeInstructionId={activeInstructionId}
              onInstructionSelect={handleInstructionSelect}
            />
          </div>
          <div className="lg:w-2/3 lg:flex-grow">
            <Card className="h-[70vh] lg:h-full">
                <CardContent className="p-2 sm:p-4 h-full">
                     <StoreMap
                      layout={store.layout}
                      path={optimizedPath}
                      itemLocations={itemLocations}
                      currentPosition={activeLocation}
                      autoZoomToCurrentPosition={true}
                    />
                </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile and Tablet Layout */}
      <div className="lg:hidden flex flex-col h-screen bg-background pt-20">
        {/* Map Section - Takes most of the screen */}
        <div className="flex-1 min-h-0 p-4 pb-2">
          <Card className="h-full">
            <CardContent className="p-2 h-full">
              <StoreMap
                layout={store.layout}
                path={optimizedPath}
                itemLocations={itemLocations}
                currentPosition={activeLocation}
                autoZoomToCurrentPosition={true}
              />
            </CardContent>
          </Card>
        </div>

        {/* Collapsible Directions Section */}
        <div className="flex-shrink-0 bg-background border-t shadow-lg">
          {/* Toggle Button */}
          <div className={`transition-all duration-300 ${isDirectionsOpen ? 'p-3' : 'p-2'}`}>
            <Button
              variant="outline"
              onClick={() => setIsDirectionsOpen(!isDirectionsOpen)}
              className={`w-full flex items-center justify-between transition-all duration-300 font-medium ${
                isDirectionsOpen 
                  ? 'h-12 text-base bg-primary/5 border-primary/30' 
                  : 'h-10 text-sm hover:bg-primary/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className={`${isDirectionsOpen ? 'h-5 w-5' : 'h-4 w-4'}`} />
                <span>{isDirectionsOpen ? 'Directions' : 'Show Directions'}</span>
                {!isDirectionsOpen && (
                  <span className="text-xs text-muted-foreground">
                    ({navigationInstructions.length} steps)
                  </span>
                )}
              </div>
              {isDirectionsOpen ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Directions Panel */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isDirectionsOpen ? 'max-h-[60vh] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-3 pb-4">
              <NavigationPanel
                instructions={navigationInstructions}
                items={confirmedItems}
                activeInstructionId={activeInstructionId}
                onInstructionSelect={handleInstructionSelect}
                isMobile={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
