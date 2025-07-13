'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { processShoppingList } from '@/ai/flows/process-shopping-list';
import type { ProcessedItem, Store } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { List, Sparkles, LoaderCircle, Mic, Camera, CheckSquare, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ShoppingListProps {
  store: Store;
}

export default function ShoppingList({ store }: ShoppingListProps) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [processedItems, setProcessedItems] = useState<ProcessedItem[]>([]);
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const storeId = params.storeId as string;

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isCameraOpen) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      return;
    }

    const getCameraPermission = async () => {
      setHasCameraPermission(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOpen, toast]);

  const handleProcessList = async () => {
    if (!text.trim()) {
      toast({
        title: 'Empty List',
        description: 'Please enter some items into your shopping list.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setProcessedItems([]);
    try {
      // Filter out non-product categories like checkout
      const storeCategories = store.layout.sections
        .map(s => s.category)
        .filter(cat => cat !== 'checkout');
      const result = await processShoppingList({ userInput: text, storeCategories });
      const itemsWithChecked = result.items.map((item) => ({ ...item, checked: item.confidence > 0.5 }));
      setProcessedItems(itemsWithChecked);
    } catch (error) {
      console.error('Error processing shopping list:', error);
      toast({
        title: 'AI Error',
        description: 'Could not process the shopping list. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUri = canvas.toDataURL('image/jpeg');
    setIsCameraOpen(false);
    
    setIsLoading(true);
    setProcessedItems([]);
    setText('');
    try {
      const storeCategories = store.layout.sections.map(s => s.category);
      const result = await processShoppingList({ userInput: '', listImage: dataUri, storeCategories });
      if (result.items.length === 0) {
        toast({
          title: 'No items found',
          description: 'The AI could not detect any items in the image. Please try again with a clearer picture.',
          variant: 'destructive'
        });
      } else {
        const itemsWithChecked = result.items.map((item) => ({ ...item, checked: item.confidence > 0.5 }));
        setProcessedItems(itemsWithChecked);
        setText(result.items.map(item => item.original_text).join('\\n'));
      }
    } catch (error) {
      console.error('Error processing scanned list:', error);
      toast({
        title: 'AI Error',
        description: 'Could not process the scanned list. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };


  const handleItemCheck = (index: number) => {
    setProcessedItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].checked = !newItems[index].checked;
      return newItems;
    });
  };

  const handleConfirm = () => {
    const confirmed = processedItems.filter((item) => item.checked);
    if(confirmed.length === 0){
       toast({
        title: 'No Items Selected',
        description: 'Please select at least one item to find.',
        variant: 'destructive',
      });
      return;
    }
    localStorage.setItem('confirmedItems', JSON.stringify(confirmed));
    router.push(`/store/${storeId}/route`);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List className="text-primary" />
            Your Shopping List
          </CardTitle>
          <CardDescription>Enter your list below, or scan it with your camera. Our AI will help organize it for your trip to {store.name}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="e.g., milk, bread, apples, 2-liters of coke..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            disabled={isLoading}
          />
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" disabled>
                  <Mic className="h-4 w-4" />
                  <span className="sr-only">Voice Input</span>
              </Button>
              <Button variant="outline" size="icon" onClick={() => setIsCameraOpen(true)} disabled={isLoading}>
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Scan List</span>
              </Button>
            </div>
            <Button onClick={handleProcessList} disabled={isLoading || !text.trim()}>
              {isLoading && !isCameraOpen ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Processing...' : 'Process List with AI'}
            </Button>
          </div>

          {processedItems.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="font-semibold text-foreground">AI Suggestions:</h3>
              <p className="text-sm text-muted-foreground">Confirm the items you want to find.</p>
              <ScrollArea className="h-48">
                <div className="space-y-3 pr-4">
                {processedItems.map((item, index) => (
                  <div key={index} className="p-3 rounded-md border bg-card">
                    <div className="flex items-start gap-3">
                    <Checkbox
                      id={`item-${index}`}
                      checked={item.checked}
                      onCheckedChange={() => handleItemCheck(index)}
                      className="mt-1"
                    />
                      <div className="grid gap-1.5 leading-none flex-1">
                      <label htmlFor={`item-${index}`} className="font-medium cursor-pointer">
                        {item.interpreted_item}
                        <Badge variant={item.confidence > 0.8 ? 'default' : item.confidence > 0.5 ? 'secondary' : 'destructive'} className="ml-2 pointer-events-none">
                          {Math.round(item.confidence * 100)}%
                        </Badge>
                          {item.found_in_database ? (
                            <Badge variant="outline" className="ml-2 pointer-events-none bg-green-50 text-green-700 border-green-200">
                              ✓ In Stock
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="ml-2 pointer-events-none bg-blue-50 text-blue-700 border-blue-200">
                              Alternative
                            </Badge>
                          )}
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Original: "{item.original_text}" | Category: {item.category}
                      </p>
                        {!item.found_in_database && item.database_alternatives.length > 0 && (
                          <div className="mt-2 p-2 bg-blue-50 rounded-md">
                            <p className="text-xs font-medium text-blue-700 mb-1">
                              Suggested because "{item.original_text}" is not in stock. Other options:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {item.database_alternatives.slice(1).map((alt, altIndex) => (
                                <Badge key={altIndex} variant="secondary" className="text-xs">
                                  {alt}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {item.found_in_database && item.alternatives.length > 0 && (
                          <div className="mt-2 p-2 bg-green-50 rounded-md">
                            <p className="text-xs font-medium text-green-700 mb-1">
                              Similar items also available:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {item.alternatives.slice(0, 3).map((alt, altIndex) => (
                                <Badge key={altIndex} variant="secondary" className="text-xs">
                                  {alt}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </CardContent>
        {processedItems.length > 0 && (
          <CardFooter>
            <Button onClick={handleConfirm} className="w-full">
              <CheckSquare className="mr-2 h-4 w-4" />
              Confirm and Generate Route
            </Button>
          </CardFooter>
        )}
      </Card>

      <Dialog open={isCameraOpen} onOpenChange={setIsCameraOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Scan Your Shopping List</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full relative">
                <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted playsInline />
                <canvas ref={canvasRef} className="hidden" />
                {hasCameraPermission === null && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                        <LoaderCircle className="h-8 w-8 animate-spin text-primary-foreground" />
                    </div>
                )}
            </div>
            {hasCameraPermission === false && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Camera Access Denied</AlertTitle>
                    <AlertDescription>
                        Please enable camera permissions in your browser settings to use this feature.
                    </AlertDescription>
                </Alert>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCapture} disabled={!hasCameraPermission || isLoading}>
                {isLoading ? (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Camera className="mr-2 h-4 w-4" />
                )}
                {isLoading ? 'Processing...' : 'Capture and Process'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
