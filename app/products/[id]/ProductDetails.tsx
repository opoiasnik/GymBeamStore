'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    ChevronDownIcon,
    ChevronUpIcon,
    HeartIcon,
    TruckIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import type { Product } from '../../types';

interface ProductDetailsProps {
    product: Product;
}


const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const;
const CLOTHING_COLORS = [
    { name: 'Black', bg: 'bg-black' },
    { name: 'White', bg: 'bg-white' },
    { name: 'Red', bg: 'bg-red-500' },
    { name: 'Blue', bg: 'bg-blue-500' },
];

const JEWELRY_METALS = ['Gold', 'Silver', 'Rose Gold'] as const;
const JEWELRY_LENGTHS = ['16″', '18″', '20″'] as const;

const ELECTRONICS_CAPACITIES = ['256GB', '512GB', '1TB'] as const;
const ELECTRONICS_INTERFACES = ['USB 2.0', 'USB 3.0', 'SATA III'] as const;

const DUMMY_HIGHLIGHTS = [
    'High-quality materials',
    'Excellent build and durability',
    'Ergonomic design for comfort',
    'Optimized performance',
];

const DUMMY_REVIEWS = [
    { id: 1, author: 'Alice', rating: 5, text: 'Absolutely love it!' },
    { id: 2, author: 'Bob', rating: 4, text: 'Very good, would recommend.' },
    { id: 3, author: 'Cara', rating: 5, text: 'Exceeded my expectations.' },
];

function Accordion({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-t border-gray-700">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
            >
                <span className="text-white font-medium">{title}</span>
                {open ? (
                    <ChevronUpIcon className="w-5 h-5 text-orange-500" />
                ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                )}
            </button>
            {open && <div className="px-6 pb-6 text-gray-300 text-sm">{children}</div>}
        </div>
    );
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const router = useRouter();
    const [mainImage, setMainImage] = useState(product.image);
    const [selectedSize, setSelectedSize] = useState<typeof CLOTHING_SIZES[number] | null>(null);
    const [selectedColor, setSelectedColor] = useState(CLOTHING_COLORS[0].name);
    const [selectedMetal, setSelectedMetal] = useState<
        typeof JEWELRY_METALS[number]
    >(JEWELRY_METALS[0]);

    const [selectedLength, setSelectedLength] = useState<
        typeof JEWELRY_LENGTHS[number]
    >(JEWELRY_LENGTHS[0]);

    const [selectedCapacity, setSelectedCapacity] = useState<
        typeof ELECTRONICS_CAPACITIES[number]
    >(ELECTRONICS_CAPACITIES[0]);

    const [selectedInterface, setSelectedInterface] = useState<
        typeof ELECTRONICS_INTERFACES[number]
    >(ELECTRONICS_INTERFACES[0]);

    const [quantity, setQuantity] = useState(1);
    const [recommendations, setRecommendations] = useState<Product[]>([]);

    const rate = Math.round(product.rating?.rate ?? 0);
    const count = product.rating?.count ?? 0;
    const discountPercent =
        product.onSale && product.oldPrice
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

    const isClothing = /clothing/i.test(product.category);
    const isJewelry = /jewelery/i.test(product.category);
    const isElectronics = /electronics/i.test(product.category);

    useEffect(() => {
        const raw = localStorage.getItem('enrichedProducts');
        if (raw) {
            const all: Product[] = JSON.parse(raw);
            const others = all.filter(p => p.id !== product.id);
            const shuffled = others.sort(() => 0.5 - Math.random());
            setRecommendations(shuffled.slice(0, 4));
        }
    }, [product.id]);

    return (
        <div className="bg-black min-h-screen py-8">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <button
                    onClick={() => router.push('/products')}
                    className="text-orange-500 hover:text-orange-400 font-medium"
                >
                    &larr; Back to Products
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-black/80 p-6 rounded-xl border border-orange-500">
                    <div>
                        <div className="mb-4 flex gap-4">
                            {[product.image, product.image, product.image].map((src, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMainImage(src)}
                                    className={`w-20 h-20 border rounded-lg overflow-hidden ${mainImage === src ? 'ring-2 ring-orange-500' : 'border-gray-700'
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
                            ))}
                        </div>
                        <div className="w-full h-[400px] bg-white rounded-lg overflow-hidden flex items-center justify-center">
                            <Image
                                src={mainImage}
                                alt={product.title}
                                width={400}
                                height={400}
                                className="object-contain p-4"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold text-white">{product.title}</h1>
                            <p className="text-sm text-gray-400 uppercase mt-1">{product.category}</p>

                            <div className="flex items-center mt-3 gap-2">
                                <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`w-5 h-5 ${i < rate ? 'text-green-500' : 'text-gray-700'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-400">({count})</span>
                            </div>
                            <div className="flex items-baseline gap-4 mt-4">
                                {product.onSale && product.oldPrice && (
                                    <>
                                        <span className="text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
                                        <span className="inline-block bg-orange-500 text-black text-xs font-semibold px-2 py-1 rounded-full">
                                            -{discountPercent}%
                                        </span>
                                    </>
                                )}
                                <span className="text-3xl font-bold text-orange-500">${product.price.toFixed(2)}</span>
                            </div>

                            <div className="mt-6 space-y-4">
                                {isClothing && (
                                    <>
                                        <div>
                                            <h3 className="text-sm text-gray-400 mb-2">Size</h3>
                                            <div className="flex gap-2">
                                                {CLOTHING_SIZES.map(sz => (
                                                    <button
                                                        key={sz}
                                                        onClick={() => setSelectedSize(sz)}
                                                        className={`w-10 h-10 border rounded-lg flex items-center justify-center text-sm ${selectedSize === sz
                                                            ? 'bg-orange-500 text-black'
                                                            : 'bg-gray-800 text-white hover:border-orange-500'
                                                            }`}
                                                    >
                                                        {sz}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-400 mb-2">Color</h3>
                                            <div className="flex gap-2">
                                                {CLOTHING_COLORS.map(c => (
                                                    <button
                                                        key={c.name}
                                                        onClick={() => setSelectedColor(c.name)}
                                                        className={`w-8 h-8 rounded-full border ${selectedColor === c.name
                                                            ? 'ring-2 ring-orange-500'
                                                            : 'border-gray-700'
                                                            } ${c.bg}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {isJewelry && (
                                    <>
                                        <div>
                                            <h3 className="text-sm text-gray-400 mb-2">Metal Type</h3>
                                            <div className="flex gap-2">
                                                {JEWELRY_METALS.map(m => (
                                                    <button
                                                        key={m}
                                                        onClick={() => setSelectedMetal(m)}
                                                        className={`px-3 py-1 border rounded-full text-sm ${selectedMetal === m
                                                            ? 'bg-orange-500 text-black'
                                                            : 'bg-gray-800 text-white hover:border-orange-500'
                                                            }`}
                                                    >
                                                        {m}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-400 mb-2">Chain Length</h3>
                                            <div className="flex gap-2">
                                                {JEWELRY_LENGTHS.map(len => (
                                                    <button
                                                        key={len}
                                                        onClick={() => setSelectedLength(len)}
                                                        className={`px-3 py-1 border rounded-full text-sm ${selectedLength === len
                                                            ? 'bg-orange-500 text-black'
                                                            : 'bg-gray-800 text-white hover:border-orange-500'
                                                            }`}
                                                    >
                                                        {len}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {isElectronics && (
                                    <>
                                        <div>
                                            <h3 className="text-sm text-gray-400 mb-2">Capacity</h3>
                                            <div className="flex gap-2">
                                                {ELECTRONICS_CAPACITIES.map(cap => (
                                                    <button
                                                        key={cap}
                                                        onClick={() => setSelectedCapacity(cap)}
                                                        className={`px-3 py-1 border rounded-full text-sm ${selectedCapacity === cap
                                                            ? 'bg-orange-500 text-black'
                                                            : 'bg-gray-800 text-white hover:border-orange-500'
                                                            }`}
                                                    >
                                                        {cap}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-400 mb-2">Interface</h3>
                                            <div className="flex gap-2">
                                                {ELECTRONICS_INTERFACES.map(ifc => (
                                                    <button
                                                        key={ifc}
                                                        onClick={() => setSelectedInterface(ifc)}
                                                        className={`px-3 py-1 border rounded-full text-sm ${selectedInterface === ifc
                                                            ? 'bg-orange-500 text-black'
                                                            : 'bg-gray-800 text-white hover:border-orange-500'
                                                            }`}
                                                    >
                                                        {ifc}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div>
                                    <h3 className="text-sm text-gray-400 mb-2">Quantity</h3>
                                    <input
                                        type="number"
                                        min={1}
                                        value={quantity}
                                        onChange={e => setQuantity(+e.target.value)}
                                        className="w-20 p-2 bg-gray-800 text-white rounded-lg text-center"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex items-center gap-4">
                            <button className="flex-1 py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-600 transition">
                                Add to Cart
                            </button>
                            <button className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                                <HeartIcon className="w-6 h-6 text-orange-500" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Accordions */}
                <div className="mt-8 bg-black/80 rounded-xl border border-orange-500 overflow-hidden">
                    <Accordion title="Product Highlights">
                        <ul className="list-disc list-inside space-y-2">
                            {DUMMY_HIGHLIGHTS.map((h, i) => (
                                <li key={i}>{h}</li>
                            ))}
                        </ul>
                    </Accordion>
                    <Accordion title="Description">
                        <p>{product.description}</p>
                    </Accordion>
                    <Accordion title="Shipping & Returns">
                        <div className="flex items-start gap-2">
                            <TruckIcon className="w-6 h-6 text-orange-500" />
                            <p className="text-sm text-gray-300">
                                Free shipping on orders over $50. Easy 30-day returns.
                            </p>
                        </div>
                    </Accordion>
                </div>

                {/* Customer Reviews */}
                <section className="mt-8 space-y-6">
                    <h2 className="text-2xl font-semibold text-white">Customer Reviews</h2>
                    {DUMMY_REVIEWS.map(r => (
                        <div key={r.id} className="bg-black/80 p-6 rounded-lg border border-orange-500">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-white">{r.author}</span>
                                <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`w-4 h-4 ${i < r.rating ? 'text-green-500' : 'text-gray-700'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm">{r.text}</p>
                        </div>
                    ))}
                </section>

                {/* Recommendations */}
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-white mb-4">You Might Also Like</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {recommendations.map(rec => (
                            <div
                                key={rec.id}
                                onClick={() => router.push(`/products/${rec.id}`)}
                                className="bg-black/80 rounded-lg p-4 border border-orange-500 cursor-pointer hover:shadow-xl transition"
                            >
                                <div className="relative w-full h-32 mb-2 bg-white rounded">
                                    <Image
                                        src={rec.image}
                                        alt={rec.title}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>
                                <h3 className="text-sm font-semibold text-white line-clamp-2">
                                    {rec.title}
                                </h3>
                                <p className="text-orange-500 font-bold mt-1">
                                    ${rec.price.toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
