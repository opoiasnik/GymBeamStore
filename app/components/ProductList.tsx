// components/ProductList.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
    StarIcon,
    FireIcon,
    HandThumbUpIcon,
    CheckBadgeIcon,
} from '@heroicons/react/24/solid';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import type { Product } from '../types';

interface PromoInfo {
    label: string;
    color: string;
    iconName: 'star' | 'fire' | 'thumb' | 'badge';
}

const PROMO_BADGES: PromoInfo[] = [
    { label: 'Bestseller', color: 'bg-purple-600', iconName: 'badge' },
    { label: 'Top Rated', color: 'bg-yellow-500', iconName: 'star' },
    { label: 'Hot Deal', color: 'bg-red-500', iconName: 'fire' },
    { label: 'Popular', color: 'bg-gray-800', iconName: 'thumb' },
    { label: 'GymBeam Pick', color: 'bg-blue-600', iconName: 'badge' },
];

const ICONS: Record<PromoInfo['iconName'], React.FC<React.SVGProps<SVGSVGElement>>> = {
    star: StarIcon,
    fire: FireIcon,
    thumb: HandThumbUpIcon,
    badge: CheckBadgeIcon,
};

interface ProductListProps {
    products: Product[];
    onCardClick: (product: Product) => void;
}

export default function ProductList({
    products,
    onCardClick,
}: ProductListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [onlySale, setOnlySale] = useState(false);
    const [minRating, setMinRating] = useState(0);
    const [sortOrder, setSortOrder] = useState<'none' | 'low' | 'high'>('none');

    const [draftOnly, setDraftOnly] = useState(onlySale);
    const [draftRating, setDraftRating] = useState(minRating);
    const [draftSort, setDraftSort] = useState(sortOrder);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const [promoMap, setPromoMap] = useState<Record<number, PromoInfo | null>>({});

    useEffect(() => {
        const key = 'promoMap';
        const stored = localStorage.getItem(key);
        const map: Record<number, PromoInfo | null> = stored ? JSON.parse(stored) : {};
        let changed = false;
        products.forEach((p) => {
            if (map[p.id] === undefined) {
                const rate = p.rating?.rate ?? 0;
                map[p.id] =
                    rate >= 3 && Math.random() < 0.7
                        ? PROMO_BADGES[Math.floor(Math.random() * PROMO_BADGES.length)]
                        : null;
                changed = true;
            }
        });
        if (changed) localStorage.setItem(key, JSON.stringify(map));
        setPromoMap(map);
    }, [products]);

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (filtersOpen && ref.current && !ref.current.contains(e.target as Node)) {
                setFiltersOpen(false);
            }
        };
        window.addEventListener('mousedown', onClickOutside);
        return () => window.removeEventListener('mousedown', onClickOutside);
    }, [filtersOpen]);

    let filtered = products
        .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((p) => (!onlySale || p.onSale))
        .filter((p) => minRating === 0 || (p.rating?.rate ?? 0) >= minRating);

    if (sortOrder !== 'none') {
        filtered = [...filtered].sort((a, b) =>
            sortOrder === 'low' ? a.price - b.price : b.price - a.price
        );
    }

    const idxLast = currentPage * productsPerPage;
    const idxFirst = idxLast - productsPerPage;
    const currentProducts = filtered.slice(idxFirst, idxLast);

    return (
        <div className="bg-black px-4 py-6 max-w-screen-xl mx-auto text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <SearchBar setSearchTerm={setSearchTerm} />
                <div className="relative" ref={ref}>
                    <button
                        onClick={() => {
                            setDraftOnly(onlySale);
                            setDraftRating(minRating);
                            setDraftSort(sortOrder);
                            setFiltersOpen((o) => !o);
                        }}
                        className="px-4 py-2 bg-gray-800 text-white border border-orange-500 rounded-lg hover:bg-orange-500 transition"
                    >
                        Filters ▼
                    </button>
                    {filtersOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-black border border-orange-500 rounded-lg shadow-lg p-4 space-y-3 z-50 text-white">
                            <div className="flex items-center">
                                <input
                                    id="draftOnly"
                                    type="checkbox"
                                    checked={draftOnly}
                                    onChange={() => setDraftOnly((d) => !d)}
                                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded"
                                />
                                <label htmlFor="draftOnly" className="ml-2 text-sm cursor-pointer">
                                    Only SALE
                                </label>
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="draftRating" className="text-sm w-24 font-semibold">
                                    Min Rating:
                                </label>
                                <select
                                    id="draftRating"
                                    value={draftRating}
                                    onChange={(e) => setDraftRating(+e.target.value)}
                                    className="flex-1 p-1 border border-gray-600 rounded bg-black text-white text-sm"
                                >
                                    <option value={0}>All</option>
                                    <option value={1}>1★+</option>
                                    <option value={2}>2★+</option>
                                    <option value={3}>3★+</option>
                                    <option value={4}>4★+</option>
                                    <option value={5}>5★</option>
                                </select>
                            </div>
                            <div className="flex items-center">
                                <label htmlFor="draftSort" className="text-sm w-24 font-semibold">
                                    Sort Price:
                                </label>
                                <select
                                    id="draftSort"
                                    value={draftSort}
                                    onChange={(e) => setDraftSort(e.target.value as any)}
                                    className="flex-1 p-1 border border-gray-600 rounded bg-black text-white text-sm"
                                >
                                    <option value="none">None</option>
                                    <option value="low">Lowest First</option>
                                    <option value="high">Highest First</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t border-gray-700">
                                <button
                                    onClick={() => {
                                        setOnlySale(draftOnly);
                                        setMinRating(draftRating);
                                        setSortOrder(draftSort);
                                        setCurrentPage(1);
                                        setFiltersOpen(false);
                                    }}
                                    className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition"
                                >
                                    Apply
                                </button>
                                <button
                                    onClick={() => {
                                        setDraftOnly(false);
                                        setDraftRating(0);
                                        setDraftSort('none');
                                    }}
                                    className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {currentProducts.map((product) => {
                    const rate = product.rating?.rate ?? 0;
                    const count = product.rating?.count ?? 0;
                    let dotColor = 'bg-gray-300';
                    if (rate >= 4) dotColor = 'bg-green-500';
                    else if (rate >= 2) dotColor = 'bg-yellow-400';
                    else dotColor = 'bg-red-500';

                    const promo = promoMap[product.id];
                    const IconComp = promo ? ICONS[promo.iconName] : null;

                    return (
                        <div
                            key={product.id}
                            onClick={() => onCardClick(product)}
                            className="relative bg-black/80 rounded-2xl shadow-xl p-5 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-orange-500 text-white"
                        >
                            {promo && IconComp && (
                                <div
                                    className={`${promo.color} absolute top-8 left-8 z-20 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs`}
                                >
                                    <IconComp className="w-4 h-4" />
                                    <span>{promo.label}</span>
                                </div>
                            )}

                            <div className="relative w-full h-60 mb-4 rounded-lg overflow-hidden border-2 border-white bg-white flex items-center justify-center">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>

                            <h3 className="text-lg font-bold line-clamp-2 mb-2">
                                {product.title}
                            </h3>

                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1">
                                    <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
                                    <span className="text-sm font-semibold">
                                        {rate.toFixed(1)} ({count})
                                    </span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    {product.onSale && product.oldPrice && (
                                        <span className="text-sm text-gray-500 line-through">
                                            ${product.oldPrice.toFixed(2)}
                                        </span>
                                    )}
                                    <span className="text-xl font-bold text-orange-500">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {product.onSale && (
                                <div className="flex justify-end mb-2">
                                    <div className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
                                        SALE
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-8">
                <Pagination
                    productsPerPage={productsPerPage}
                    totalProducts={filtered.length}
                    paginate={setCurrentPage}
                />
            </div>
        </div>
    );
}
