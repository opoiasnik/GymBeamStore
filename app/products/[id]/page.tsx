// app/products/[id]/page.tsx

import ProductDetails from './ProductDetails';
import { notFound } from 'next/navigation';

interface Params {
    params: {
        id: string;
    };
}

export default async function ProductPage({ params }: Params) {

    const { id } = await params;


    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        return notFound();
    }

    const product = await res.json();

    return (
        <main className="container mx-auto py-8">
            <ProductDetails product={product} />
        </main>
    );
}
