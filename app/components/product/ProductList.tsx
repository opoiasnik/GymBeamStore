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
import type { Product } from '@/hooks/types';
import ProductCard from './ProductCard';
import { ICONS, PromoInfo } from './ProductCard';
import ProductFilters from './ProductFilters';

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
                const PROMO_BADGES: PromoInfo[] = [
                    { label: 'Bestseller', color: 'bg-purple-600', iconName: 'badge' },
                    { label: 'Top Rated', color: 'bg-yellow-500', iconName: 'star' },
                    { label: 'Hot Deal', color: 'bg-red-500', iconName: 'fire' },
                    { label: 'Popular', color: 'bg-gray-800', iconName: 'thumb' },
                    { label: 'GymBeam Pick', color: 'bg-blue-600', iconName: 'badge' },
                ];
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
                <ProductFilters
                    onlySale={onlySale}
                    setOnlySale={setOnlySale}
                    minRating={minRating}
                    setMinRating={setMinRating}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    setCurrentPage={setCurrentPage}
                />
            </div>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {currentProducts.map((product) => {
                    const promo = promoMap[product.id];
                    const IconComp = promo ? ICONS[promo.iconName] : null;

                    return (
                        <ProductCard
                            key={product.id}
                            product={product}
                            promo={promo}
                            IconComp={IconComp}
                            onCardClick={onCardClick}
                        />
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
