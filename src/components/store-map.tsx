'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import type { StoreLayout } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ZoomIn, ZoomOut, Move, LocateFixed, ArrowUp, ShoppingCart, MapPin, Maximize2 } from 'lucide-react';

interface StoreMapProps {
  layout: StoreLayout;
  path?: [number, number][];
  itemLocations?: { location: { x: number; y: number }, interpreted_item: string }[];
  currentPosition?: [number, number];
  autoZoomToCurrentPosition?: boolean;
}

// Category colors and icons for different store sections
const categoryStyles = {
  produce: {
    bg: 'bg-green-100',
    border: 'border-green-300',
    text: 'text-green-800',
    icon: '🥬',
    color: '#dcfce7'
  },
  dairy: {
    bg: 'bg-blue-100',
    border: 'border-blue-300',
    text: 'text-blue-800',
    icon: '🥛',
    color: '#dbeafe'
  },
  meat: {
    bg: 'bg-red-100',
    border: 'border-red-300',
    text: 'text-red-800',
    icon: '🥩',
    color: '#fee2e2'
  },
  bakery: {
    bg: 'bg-orange-100',
    border: 'border-orange-300',
    text: 'text-orange-800',
    icon: '🍞',
    color: '#fed7aa'
  },
  pantry: {
    bg: 'bg-amber-100',
    border: 'border-amber-300',
    text: 'text-amber-800',
    icon: '🥫',
    color: '#fef3c7'
  },
  frozen: {
    bg: 'bg-cyan-100',
    border: 'border-cyan-300',
    text: 'text-cyan-800',
    icon: '🧊',
    color: '#cffafe'
  },
  beverages: {
    bg: 'bg-purple-100',
    border: 'border-purple-300',
    text: 'text-purple-800',
    icon: '🥤',
    color: '#e9d5ff'
  },
  snacks: {
    bg: 'bg-yellow-100',
    border: 'border-yellow-300',
    text: 'text-yellow-800',
    icon: '🍿',
    color: '#fef9c3'
  },
  cleaning: {
    bg: 'bg-teal-100',
    border: 'border-teal-300',
    text: 'text-teal-800',
    icon: '🧽',
    color: '#ccfbf1'
  },
  checkout: {
    bg: 'bg-gray-100',
    border: 'border-gray-400',
    text: 'text-gray-800',
    icon: '🛒',
    color: '#f3f4f6'
  }
};

export default function StoreMap({ layout, path = [], itemLocations = [], currentPosition, autoZoomToCurrentPosition = false }: StoreMapProps) {
  const [scale, setScale] = useState(0.4); // Start with smaller initial scale
  const [panning, setPanning] = useState(false);
  const [view, setView] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const pathSet = new Set(path.map(([x, y]) => `${x},${y}`));
  const wallSet = new Set(layout.walls.map(([x, y]) => `${x},${y}`));
  
  // Calculate optimal scale to fit the entire store
  const calculateFitScale = () => {
    if (!containerRef.current) return 0.4;
    
    const container = containerRef.current;
    const containerWidth = container.clientWidth - 32; // Account for padding
    const containerHeight = container.clientHeight - 32;
    
    const storeWidth = layout.width * 48; // 3rem = 48px
    const storeHeight = layout.height * 48;
    
    const scaleX = containerWidth / storeWidth;
    const scaleY = containerHeight / storeHeight;
    
    return Math.min(scaleX, scaleY, 1); // Don't scale up beyond 1
  };
  
  const handleFitToView = () => {
    const fitScale = calculateFitScale();
    setScale(fitScale);
    setView({ x: 0, y: 0 });
  };

  const handleZoomToCurrentLocation = () => {
    if (!containerRef.current) return;
    
    // If no current position, fit to view instead
    if (!currentPosition) {
      handleFitToView();
      return;
    }
    
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Set a comfortable zoom level for viewing current location
    const targetScale = 0.8;
    setScale(targetScale);
    
    // Calculate the position to center the current location
    const cellSize = 48; // 3rem = 48px
    const currentX = currentPosition[0] * cellSize * targetScale;
    const currentY = currentPosition[1] * cellSize * targetScale;
    
    // Center the current position in the container
    const centerX = containerWidth / 2 - currentX;
    const centerY = containerHeight / 2 - currentY;
    
    setView({ x: centerX, y: centerY });
  };
  
  // Auto-fit on mount and when layout changes
  useEffect(() => {
    const timer = setTimeout(() => {
      handleFitToView();
    }, 100); // Small delay to ensure container is rendered
    
    return () => clearTimeout(timer);
  }, [layout.width, layout.height]);

  // Auto-zoom to current position when it changes (if enabled)
  useEffect(() => {
    if (autoZoomToCurrentPosition && currentPosition) {
      const timer = setTimeout(() => {
        handleZoomToCurrentLocation();
      }, 200); // Small delay to ensure smooth transition
      
      return () => clearTimeout(timer);
    }
  }, [currentPosition, autoZoomToCurrentPosition]);
  
  // Create path connections for smoother visualization
  const pathConnections = useMemo(() => {
    const connections = new Map<string, { prev?: [number, number], next?: [number, number] }>();
    
    path.forEach((point, index) => {
      const key = `${point[0]},${point[1]}`;
      connections.set(key, {
        prev: index > 0 ? path[index - 1] : undefined,
        next: index < path.length - 1 ? path[index + 1] : undefined
      });
    });
    
    return connections;
  }, [path]);

  const pathDirectionMap = useMemo(() => {
    const map = new Map<string, Set<'up' | 'down' | 'left' | 'right'>>();
    if (path.length < 2) return map;

    for (let i = 0; i < path.length - 1; i++) {
      const currentPoint = path[i];
      const nextPoint = path[i + 1];
      const key = `${currentPoint[0]},${currentPoint[1]}`;
      const dx = nextPoint[0] - currentPoint[0];
      const dy = nextPoint[1] - currentPoint[1];
      
      let direction: 'up' | 'down' | 'left' | 'right' | null = null;
      if (dx === 1) direction = 'right';
      else if (dx === -1) direction = 'left';
      else if (dy === 1) direction = 'down';
      else if (dy === -1) direction = 'up';

      if (direction) {
        if (!map.has(key)) {
          map.set(key, new Set());
        }
        map.get(key)!.add(direction);
      }
    }
    return map;
  }, [path]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setPanning(true);
    setDragStart({ x: e.clientX - view.x, y: e.clientY - view.y });
  };

  const handleMouseUp = () => {
    setPanning(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!panning) return;
    setView({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(s => Math.min(Math.max(s + delta, 0.1), 2));
  };

  const renderCell = (x: number, y: number) => {
    const key = `${x},${y}`;
    const section = layout.sections.find(
      (s) => x >= s.coordinates[0] && x <= s.coordinates[2] && y >= s.coordinates[1] && y <= s.coordinates[3]
    );
    const landmark = layout.landmarks.find((l) => l.coordinates[0] === x && l.coordinates[1] === y);
    const isEntrance = layout.entrance[0] === x && layout.entrance[1] === y;
    const isExit = layout.exit[0] === x && layout.exit[1] === y;
    const isPath = pathSet.has(key);
    const isWall = wallSet.has(key);
    const item = itemLocations.find(i => i.location.x === x && i.location.y === y);
    const isCurrentPosition = currentPosition && currentPosition[0] === x && currentPosition[1] === y;
    const directions = pathDirectionMap.get(key);
    const pathConnection = pathConnections.get(key);

    // Get category styling
    const categoryStyle = section ? categoryStyles[section.category as keyof typeof categoryStyles] : null;

    const cellClasses = cn(
      'relative flex items-center justify-center text-xs transition-all duration-300 border-r border-b border-gray-200',
      // Base styling
      !isWall && !section && !landmark && !isEntrance && !isExit && 'bg-gray-50',
      // Wall styling
      isWall && 'bg-gray-800 border-gray-900',
      // Section styling with category colors
      section && categoryStyle && `${categoryStyle.bg} ${categoryStyle.border} border-2`,
      // Landmark styling
      landmark && 'bg-indigo-100 border-indigo-300 border-2',
      // Entrance/Exit styling
      (isEntrance || isExit) && 'bg-green-200 border-green-400 border-2 font-bold',
      // Path styling - clean and simple
      isPath && !isWall && 'bg-blue-500 border-blue-600',
      // Current position styling
      isCurrentPosition && 'z-20 ring-4 ring-red-500 ring-opacity-75',
      // Hover effects
      section && 'hover:shadow-lg hover:scale-105 cursor-pointer',
      landmark && 'hover:shadow-md'
    );
    
    const isSectionCenter = section && 
      x === Math.floor((section.coordinates[0] + section.coordinates[2]) / 2) &&
      y === Math.floor((section.coordinates[1] + section.coordinates[3]) / 2);

    const isLandmarkCenter = landmark && landmark.coordinates[0] === x && landmark.coordinates[1] === y;

    const hasUp = directions?.has('up');
    const hasDown = directions?.has('down');
    const hasLeft = directions?.has('left');
    const hasRight = directions?.has('right');
    
    const isVerticalPath = !!(hasUp && hasDown && directions?.size === 2);
    const isHorizontalPath = !!(hasLeft && hasRight && directions?.size === 2);

    return (
      <div 
        key={key} 
        className={cellClasses}
        style={{
          backgroundColor: section && categoryStyle ? categoryStyle.color : undefined,
          minHeight: '3rem',
          minWidth: '3rem'
        }}
        title={section?.name || landmark?.name || (isWall ? 'Wall' : isPath ? 'Path' : 'Aisle')}
      >
        {/* Clean path visualization */}
        {isPath && !isWall && (
          <>
            {/* Simple path background */}
            <div className="absolute inset-0 bg-blue-500 opacity-80 z-5"></div>
            
            {/* Subtle path border */}
            <div className="absolute inset-0 border border-blue-600 z-6"></div>
            
            {/* Single direction arrow - clean and minimal */}
            {directions && directions.size === 1 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                {Array.from(directions).map((direction) => (
                  <ArrowUp
                    key={direction}
                    className={cn(
                      'text-white drop-shadow-sm',
                      'h-5 w-5',
                      direction === 'up' && 'rotate-0',
                      direction === 'right' && 'rotate-90',
                      direction === 'down' && 'rotate-180',
                      direction === 'left' && '-rotate-90'
                    )}
                    strokeWidth={2}
                  />
                ))}
              </div>
            )}
            
                         {/* For multi-direction intersections, show a simple dot */}
             {directions && directions.size > 1 && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                 <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
               </div>
             )}
             
             {/* Step numbers only for start, end, and item pickup points */}
             {(() => {
               const stepIndex = path.findIndex(([px, py]) => px === x && py === y);
               const isStart = stepIndex === 0;
               const isEnd = stepIndex === path.length - 1;
               const hasItem = item !== undefined;
               
               if (isStart || isEnd || hasItem) {
                 return (
                   <div className="absolute -top-2 -right-2 z-15">
                     <div className="bg-white text-blue-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md border border-blue-200">
                       {isStart ? 'S' : isEnd ? 'E' : stepIndex + 1}
                     </div>
                   </div>
                 );
               }
               return null;
             })()}
          </>
        )}

        {/* Current position indicator */}
        {isCurrentPosition && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="relative">
              <div className="h-6 w-6 rounded-full bg-red-500 border-2 border-white shadow-lg animate-pulse"></div>
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-600 animate-ping"></div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          {/* Item indicator */}
          {item && (
            <div className="absolute -top-2 -right-2 z-20">
              <ShoppingCart className="h-4 w-4 text-green-600 bg-white rounded-full p-0.5 shadow-md" />
            </div>
          )}

          {/* Section content */}
          {isSectionCenter && section && categoryStyle && (
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">{categoryStyle.icon}</span>
              <span className={cn("text-xs font-semibold", categoryStyle.text)}>
                {section.name}
              </span>
              {section.aisle && (
                <span className={cn("text-xs", categoryStyle.text)}>
                  Aisle {section.aisle}
                </span>
              )}
            </div>
          )}

          {/* Landmark content */}
          {isLandmarkCenter && landmark && (
            <div className="flex flex-col items-center">
              <MapPin className="h-4 w-4 text-indigo-600 mb-1" />
              <span className="text-xs font-semibold text-indigo-800 text-center leading-tight">
                {landmark.name}
              </span>
            </div>
          )}

          {/* Entrance/Exit */}
          {isEntrance && (
            <div className="flex flex-col items-center">
              <span className="text-lg">🚪</span>
              <span className="text-xs font-bold text-green-800">ENTRANCE</span>
            </div>
          )}
          {isExit && !isEntrance && (
            <div className="flex flex-col items-center">
              <span className="text-lg">🚪</span>
              <span className="text-xs font-bold text-green-800">EXIT</span>
            </div>
          )}

          {/* Wall pattern */}
          {isWall && (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 opacity-80"></div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="h-full w-full flex flex-col gap-4">
      {/* Map Legend */}
      <div className="bg-white rounded-lg border p-3 shadow-sm">
        <h3 className="text-sm font-semibold mb-2">Store Map Legend</h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {Object.entries(categoryStyles).map(([category, style]) => (
            <div key={category} className="flex items-center gap-1">
              <span className="text-sm">{style.icon}</span>
              <span className={cn("px-2 py-1 rounded", style.bg, style.text)}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-1">
            <div className="relative">
              <div className="w-4 h-4 bg-blue-500 border border-blue-600 rounded"></div>
              <ArrowUp className="absolute inset-0 h-3 w-3 text-white m-auto" strokeWidth={2} />
            </div>
            <span>Your Route</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span>Your Location</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={containerRef} 
        className="relative flex-grow w-full h-full overflow-hidden rounded-lg border bg-gray-100 shadow-inner"
        style={{ cursor: panning ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      >
        <div 
          ref={contentRef}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${layout.width}, 3rem)`,
            gridTemplateRows: `repeat(${layout.height}, 3rem)`,
            gap: '1px',
            transform: `translate(${view.x}px, ${view.y}px) scale(${scale})`,
            transformOrigin: 'top left',
            transition: panning ? 'none' : 'transform 0.5s ease-out',
            padding: '1rem',
            backgroundColor: '#f8fafc'
          }}
          className="absolute"
        >
          {Array.from({ length: layout.height }, (_, y) =>
            Array.from({ length: layout.width }, (_, x) => renderCell(x, y))
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center gap-2 bg-white rounded-lg border p-2 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Move className="h-4 w-4" />
          <span>Drag to pan • Scroll to zoom • Use buttons to navigate</span>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setScale(s => Math.min(s + 0.1, 2))}
            className="h-8"
            title="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setScale(s => Math.max(s - 0.1, 0.1))}
            className="h-8"
            title="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleZoomToCurrentLocation}
            className={`h-8 ${currentPosition ? 'bg-blue-50 border-blue-300 text-blue-700' : ''}`}
            title={currentPosition ? "Go to current location" : "Fit to view"}
          >
            <LocateFixed className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleFitToView}
            className="h-8"
            title="View whole store"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
