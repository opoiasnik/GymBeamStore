// app/products/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProductDetails from './ProductDetails';
import type { Product } from '../../types';

export default function ProductPage() {
    const router = useRouter();
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (!id) {
            router.replace('/');
            return;
        }

        const raw = localStorage.getItem('enrichedProducts');
        if (raw) {
            const all: Product[] = JSON.parse(raw);
            const found = all.find((p) => String(p.id) === id);
            if (found) {
                setProduct(found);
                return;
            }
        }

        router.replace('/');
    }, [id, router]);

    if (!product) return null;

    return (
        <main className="bg-black min-h-screen py-8">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <ProductDetails product={product} />
            </div>
        </main>
    );
}
