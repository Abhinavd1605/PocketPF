'use client';

import type { Store } from '@/types';
import ShoppingList from '@/components/shopping-list';

export function StoreLayoutClient({ store }: { store: Store }) {
  return (
    <div className="flex justify-center items-start min-h-screen bg-background p-4 pt-20">
      <div className="w-full max-w-2xl">
        <ShoppingList store={store} />
      </div>
    </div>
  );
}
