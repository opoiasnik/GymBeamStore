// app/products/[id]/ProductDetails.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    ChevronDownIcon,
    ChevronUpIcon,
    TruckIcon,
    GiftIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    oldPrice?: number;
    onSale?: boolean;
    image: string;
    category: string;
    rating: { rate: number; count: number };
}

interface ProductDetailsProps {
    product: Product;
}

function Accordion({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-t border-gray-200">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full py-4 flex justify-between items-center text-left"
            >
                <span className="font-medium text-gray-900">{title}</span>
                {open ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                )}
            </button>
            {open && <div className="pb-4 text-gray-700 text-sm">{children}</div>}
        </div>
    );
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const router = useRouter();

    const [enriched, setEnriched] = useState<Product | null>(null);
    useEffect(() => {
        const raw = localStorage.getItem('enrichedProducts');
        if (raw) {
            try {
                const arr: Product[] = JSON.parse(raw);
                const found = arr.find((p) => p.id === product.id);
                if (found) setEnriched(found);
            } catch { }
        }
    }, [product.id]);


    const displayPrice = enriched ? enriched.price : product.price;
    const displayOldPrice = enriched ? enriched.oldPrice : product.oldPrice;
    const displayOnSale = enriched ? enriched.onSale : false;

    const discountPercent =
        displayOnSale && displayOldPrice
            ? Math.round(((displayOldPrice - displayPrice) / displayOldPrice) * 100)
            : 0;


    const gallery = [product.image, product.image, product.image];
    const [mainImage, setMainImage] = useState(gallery[0]);

    const totalDots = 5;
    const rate = product.rating.rate ?? 0;
    let dotColor = 'bg-gray-300';
    if (rate >= 4) dotColor = 'bg-green-500';
    else if (rate >= 2) dotColor = 'bg-yellow-400';
    else dotColor = 'bg-red-500';

    return (
        <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">

            <nav className="px-6 pt-6 text-sm text-gray-500">
                Home / Products / <span className="text-gray-800">{product.title}</span>
            </nav>


            <div className="flex flex-col lg:flex-row gap-6 p-6">

                <div className="flex gap-4">
                    <ul className="flex flex-col space-y-4">
                        {gallery.map((src, i) => (
                            <li key={i}>
                                <button
                                    onClick={() => setMainImage(src)}
                                    className={`w-20 h-20 border rounded-lg overflow-hidden ${mainImage === src ? 'ring-2 ring-black' : 'border-gray-200'
                                        }`}
                                >
                                    <Image
                                        src={src}
                                        alt={product.title}
                                        width={80}
                                        height={80}
                                        className="object-contain"
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex-1 rounded-lg overflow-hidden bg-white">
                        <Image
                            src={mainImage}
                            alt={product.title}
                            width={500}
                            height={500}
                            className="object-contain p-4"
                        />
                    </div>
                </div>


                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">{product.title}</h1>
                        <p className="text-sm text-gray-500 uppercase mt-1">{product.category}</p>


                        <div className="flex items-center gap-2 mt-3">
                            <div className="flex gap-1">
                                {Array.from({ length: totalDots }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={`w-3 h-3 rounded-full ${i < Math.round(rate) ? dotColor : 'bg-gray-200'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">({product.rating.count})</span>
                        </div>


                        <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>
                    </div>


                    <div className="mt-6">
                        <div className="flex items-baseline gap-4">
                            {displayOnSale && displayOldPrice && (
                                <>
                                    <span className="text-gray-400 line-through">
                                        ${displayOldPrice.toFixed(2)}
                                    </span>
                                    <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                                        -{discountPercent}%
                                    </span>
                                </>
                            )}
                            <span className="text-3xl font-bold text-black">
                                ${displayPrice.toFixed(2)}
                            </span>
                        </div>
                        <button
                            onClick={() => router.push('/')}
                            className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                        >
                            Go to Store
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                    <TruckIcon className="w-6 h-6 text-gray-600" />
                    <div>
                        <p className="font-medium text-gray-900">Fast Delivery</p>
                        <p className="text-sm text-gray-500">2–4 business days</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <GiftIcon className="w-6 h-6 text-gray-600" />
                    <div>
                        <p className="font-medium text-gray-900">Free Samples</p>
                        <p className="text-sm text-gray-500">Choose 2 with every order</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ClockIcon className="w-6 h-6 text-gray-600" />
                    <div>
                        <p className="font-medium text-gray-900">Free Shipping</p>
                        <p className="text-sm text-gray-500">On orders over $50</p>
                    </div>
                </div>
            </div>

            <div className="px-6">
                <Accordion title="Product Information">
                    Add details like material, dimensions, origin, etc.
                </Accordion>
                <Accordion title="Specifications">
                    Technical specs: weight, SKU, certifications, and other data.
                </Accordion>
                <Accordion title="Usage Instructions">
                    How to use or care for this product.
                </Accordion>
                <Accordion title="Ingredients">
                    List of ingredients or materials.
                </Accordion>
                <Accordion title="Customer Reviews">
                    User reviews, star ratings, and comments.
                </Accordion>
            </div>
        </div>
    );
}
