'use client';

import type { NavigationInstruction, ProcessedItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Map, Footprints, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface NavigationPanelProps {
  instructions: NavigationInstruction[];
  items: ProcessedItem[];
  activeInstructionId: number | null;
  onInstructionSelect: (id: number) => void;
  isMobile?: boolean;
}

export default function NavigationPanel({ instructions, items, activeInstructionId, onInstructionSelect, isMobile = false }: NavigationPanelProps) {
  if (instructions.length === 0) return null;

  // Mobile version - more compact
  if (isMobile) {
    return (
      <div className="space-y-3">
        <Accordion type="single" collapsible defaultValue="directions" className="w-full">
          <AccordionItem value="directions" className="border-none">
            <AccordionTrigger className="text-sm font-semibold py-2 hover:no-underline">
              <div className="flex items-center gap-2">
                <Footprints className="h-4 w-4" />
                Turn-by-Turn Directions
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-40">
                <ol className="space-y-1 pr-2">
                  {instructions.map((step, index) => (
                    <li
                      key={step.id}
                      onClick={() => onInstructionSelect(step.id)}
                      className={cn(
                        'flex items-start gap-2 p-2 rounded-md cursor-pointer transition-all text-sm',
                        activeInstructionId === step.id ? 'bg-primary/10 border-primary/50 border' : 'hover:bg-muted/50'
                      )}
                    >
                      <div className={cn(
                          "flex items-center justify-center h-5 w-5 rounded-full font-bold text-xs flex-shrink-0",
                          activeInstructionId === step.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      )}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-tight">{step.instruction}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="list" className="border-none">
            <AccordionTrigger className="text-sm font-semibold py-2 hover:no-underline">
              <div className="flex items-center gap-2">
                <List className="h-4 w-4" />
                Shopping List ({items.length} items)
              </div>
            </AccordionTrigger>
            <AccordionContent>
                <ScrollArea className="h-40">
                    <ul className="space-y-1 pr-2">
                        {items.map((item) => (
                            <li key={item.original_text} className="p-2 rounded-md bg-card border text-sm">
                                <p className="font-medium text-sm leading-tight">{item.interpreted_item}</p>
                                <p className="text-xs text-muted-foreground">Category: {item.category}</p>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  // Desktop version - original layout
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="text-primary" />
          Your Route
        </CardTitle>
        <CardDescription>Your optimized route. Click a step to zoom to that location.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
        <Accordion type="single" collapsible defaultValue="directions" className="w-full">
          <AccordionItem value="directions">
            <AccordionTrigger className="text-base font-semibold">
              <div className="flex items-center gap-2">
                <Footprints />
                Turn-by-Turn Directions
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-64">
                <ol className="space-y-2 pr-4">
                  {instructions.map((step, index) => (
                    <li
                      key={step.id}
                      onClick={() => onInstructionSelect(step.id)}
                      className={cn(
                        'flex items-start gap-3 p-3 rounded-md cursor-pointer transition-all',
                        activeInstructionId === step.id ? 'bg-primary/10 border-primary/50 border' : 'hover:bg-muted/50'
                      )}
                    >
                      <div className={cn(
                          "flex items-center justify-center h-6 w-6 rounded-full font-bold text-sm flex-shrink-0",
                          activeInstructionId === step.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      )}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{step.instruction}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="list">
            <AccordionTrigger className="text-base font-semibold">
              <div className="flex items-center gap-2">
                <List />
                Shopping List
              </div>
            </AccordionTrigger>
            <AccordionContent>
                <ScrollArea className="h-64">
                    <ul className="space-y-2 pr-4">
                        {items.map((item) => (
                            <li key={item.original_text} className="p-3 rounded-md bg-card border">
                                <p className="font-medium">{item.interpreted_item}</p>
                                <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
