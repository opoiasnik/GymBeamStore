// components/ProductList.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    StarIcon,
    FireIcon,
    HandThumbUpIcon,
    CheckBadgeIcon,
} from '@heroicons/react/24/solid';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { Product } from '../types';

interface PromoInfo {
    label: string;
    color: string;
    iconName: 'star' | 'fire' | 'thumb' | 'badge';
}

interface ProductListProps {
    products: Product[];
    onProductClick: (product: Product) => void;
}


const PROMO_BADGES: PromoInfo[] = [
    { label: 'Bestseller', color: 'bg-purple-600', iconName: 'badge' },
    { label: 'Top Viewed', color: 'bg-yellow-500', iconName: 'star' },
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

const ProductList: React.FC<ProductListProps> = ({ products, onProductClick }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [onlySale, setOnlySale] = useState(false);
    const [minRating, setMinRating] = useState(0);
    const [sortOrder, setSortOrder] = useState<'none' | 'low' | 'high'>('none');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [draftOnly, setDraftOnly] = useState(onlySale);
    const [draftRating, setDraftRating] = useState(minRating);
    const [draftSort, setDraftSort] = useState(sortOrder);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();


    const [promoMap, setPromoMap] = useState<Record<number, PromoInfo | null>>({});


    useEffect(() => {
        const key = 'promoMap';
        const stored = localStorage.getItem(key);
        let map: Record<number, PromoInfo | null> = stored ? JSON.parse(stored) : {};

        let changed = false;
        products.forEach(p => {
            if (map[p.id] === undefined) {

                const rate = p.rating?.rate ?? 0;
                if (rate >= 3 && Math.random() < 0.7) {

                    const badge = PROMO_BADGES[
                        Math.floor(Math.random() * PROMO_BADGES.length)
                    ];
                    map[p.id] = badge;
                } else {
                    map[p.id] = null;
                }
                changed = true;
            }
        });

        if (changed) {
            localStorage.setItem(key, JSON.stringify(map));
        }
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
        .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(p => (!onlySale || p.onSale))
        .filter(p => (minRating === 0 || (p.rating?.rate ?? 0) >= minRating));


    if (sortOrder !== 'none') {
        filtered = [...filtered].sort((a, b) =>
            sortOrder === 'low' ? a.price - b.price : b.price - a.price
        );
    }


    const idxLast = currentPage * productsPerPage;
    const idxFirst = idxLast - productsPerPage;
    const currentProducts = filtered.slice(idxFirst, idxLast);
    const paginate = (page: number) => setCurrentPage(page);

    return (
        <div className="product-list-container bg-white px-4 sm:px-6 lg:px-8 py-6 max-w-screen-xl mx-auto">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <SearchBar setSearchTerm={setSearchTerm} />
                <div className="relative" ref={ref}>
                    <button
                        onClick={() => {
                            setDraftOnly(onlySale);
                            setDraftRating(minRating);
                            setDraftSort(sortOrder);
                            setFiltersOpen(o => !o);
                        }}
                        className="px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200 transition"
                    >
                        Filters ▼
                    </button>
                    {filtersOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg p-4 space-y-3 z-20">

                            <div className="flex items-center">
                                <input
                                    id="draftOnly"
                                    type="checkbox"
                                    checked={draftOnly}
                                    onChange={() => setDraftOnly(d => !d)}
                                    className="h-4 w-4"
                                />
                                <label htmlFor="draftOnly" className="ml-2 text-sm cursor-pointer">
                                    Only SALE
                                </label>
                            </div>

                            <div className="flex items-center">
                                <label htmlFor="draftRating" className="text-sm w-24">
                                    Min Rating:
                                </label>
                                <select
                                    id="draftRating"
                                    value={draftRating}
                                    onChange={e => setDraftRating(+e.target.value)}
                                    className="flex-1 p-1 border rounded text-sm"
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
                                <label htmlFor="draftSort" className="text-sm w-24">
                                    Sort Price:
                                </label>
                                <select
                                    id="draftSort"
                                    value={draftSort}
                                    onChange={e => setDraftSort(e.target.value as any)}
                                    className="flex-1 p-1 border rounded text-sm"
                                >
                                    <option value="none">None</option>
                                    <option value="low">Lowest First</option>
                                    <option value="high">Highest First</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t">
                                <button
                                    onClick={() => {
                                        setOnlySale(draftOnly);
                                        setMinRating(draftRating);
                                        setSortOrder(draftSort);
                                        setCurrentPage(1);
                                        setFiltersOpen(false);
                                    }}
                                    className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800 transition"
                                >
                                    Apply
                                </button>
                                <button
                                    onClick={() => {
                                        setDraftOnly(false);
                                        setDraftRating(0);
                                        setDraftSort('none');
                                    }}
                                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {currentProducts.map(product => {
                    const rate = product.rating?.rate || 0;
                    const count = product.rating?.count || 0;


                    const promo = promoMap[product.id];
                    const IconComp = promo ? ICONS[promo.iconName] : null;


                    let dotColor = 'bg-gray-300';
                    if (rate >= 4) dotColor = 'bg-green-500';
                    else if (rate >= 2) dotColor = 'bg-yellow-400';
                    else dotColor = 'bg-red-500';

                    return (
                        <div
                            key={product.id}
                            onClick={() => router.push(`/products/${product.id}`)}
                            className="relative bg-white rounded-2xl overflow-visible shadow-md p-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >

                            {product.onSale && (
                                <div className="absolute bottom-3 right-3 z-20 bg-red-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full animate-pulse">
                                    SALE
                                </div>
                            )}


                            {promo && IconComp && (
                                <div
                                    className={`absolute top-3 left-3 z-20 ${promo.color} text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs`}
                                >
                                    <IconComp className="w-4 h-4" />
                                    <span>{promo.label}</span>
                                </div>
                            )}


                            <div className="relative aspect-[4/3] w-full mb-4 rounded-xl overflow-hidden bg-white">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    sizes="(max-width:768px) 100vw, 33vw"
                                    className="object-contain rounded-xl transition duration-300 ease-in-out hover:scale-105"
                                />
                            </div>


                            <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                                {product.title}
                            </h3>




                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex gap-[3px]">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-3 h-3 rounded-full ${i < Math.round(rate) ? dotColor : 'bg-gray-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">({count})</span>
                            </div>


                            <div className="flex items-center gap-2 mt-2">
                                {product.onSale && (
                                    <span className="text-gray-400 line-through text-sm">
                                        ${product.oldPrice?.toFixed(2)}
                                    </span>
                                )}
                                <span
                                    className={`font-bold text-lg ${product.onSale ? 'text-red-600' : 'text-black'
                                        }`}
                                >
                                    ${product.price.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>


            <div className="mt-8">
                <Pagination
                    productsPerPage={productsPerPage}
                    totalProducts={filtered.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default ProductList;
