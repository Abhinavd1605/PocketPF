import { stores } from '@/data/stores';
import { notFound } from 'next/navigation';
import { RouteDisplayClient } from '@/components/route-display-client';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type RoutePageProps = {
  params: {
    storeId: string;
  };
};

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const store = stores.find((s) => s.id === resolvedParams.storeId);
  return {
    title: `Your Route - ${store?.name || 'Store'}`,
    description: `Your optimized shopping route for ${store?.name}.`,
  };
}
export default async function RoutePage({ params }: RoutePageProps) {
  const resolvedParams = await params;
  const store = stores.find((s) => s.id === resolvedParams.storeId);

  if (!store) {
    notFound();
  }

  return (
    <div className="relative min-h-screen">
      <Button asChild variant="outline" className="absolute top-4 left-4 z-20 lg:top-4 lg:left-4">
        <Link href={`/store/${store.id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Edit List</span>
          <span className="sm:hidden">Edit</span>
        </Link>
      </Button>
      <RouteDisplayClient store={store} />
    </div>
  );
}

export async function generateStaticParams() {
  return stores.map((store) => ({
    storeId: store.id,
  }));
}
