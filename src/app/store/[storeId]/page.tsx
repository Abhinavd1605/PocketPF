import { stores } from '@/data/stores';
import { notFound } from 'next/navigation';
import { StoreLayoutClient } from '@/components/store-layout-client';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type StorePageProps = {
  params: {
    storeId: string;
  };
};

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const store = stores.find((s) => s.id === resolvedParams.storeId);
  return {
    title: `Create List - ${store?.name || 'Store'} - ShopSavvy Navigator`,
    description: `Create a shopping list for ${store?.name} and get an optimized route.`,
  };
}

export default async function StorePage({ params }: StorePageProps) {
  const resolvedParams = await params;
  const store = stores.find((s) => s.id === resolvedParams.storeId);

  if (!store) {
    notFound();
  }

  return (
    <div className="relative min-h-screen">
       <Button asChild variant="outline" className="absolute top-4 left-4 z-20">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Stores
        </Link>
      </Button>
      <StoreLayoutClient store={store} />
    </div>
  );
}

export async function generateStaticParams() {
  return stores.map((store) => ({
    storeId: store.id,
  }));
}
