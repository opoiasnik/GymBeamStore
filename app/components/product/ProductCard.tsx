import React from 'react';
import Image from 'next/image';
import {
    StarIcon,
    FireIcon,
    HandThumbUpIcon,
    CheckBadgeIcon,
} from '@heroicons/react/24/solid';
import type { Product } from '@/hooks/types';

export interface PromoInfo {
    label: string;
    color: string;
    iconName: 'star' | 'fire' | 'thumb' | 'badge';
}

export const ICONS: Record<PromoInfo['iconName'], React.FC<React.SVGProps<SVGSVGElement>>> = {
    star: StarIcon,
    fire: FireIcon,
    thumb: HandThumbUpIcon,
    badge: CheckBadgeIcon,
};

interface ProductCardProps {
    product: Product;
    promo: PromoInfo | null;
    IconComp: React.FC<React.SVGProps<SVGSVGElement>> | null;
    onCardClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    promo,
    IconComp,
    onCardClick,
}) => {
    const rate = product.rating?.rate ?? 0;
    const count = product.rating?.count ?? 0;
    let dotColor = 'bg-gray-300';
    if (rate >= 4) dotColor = 'bg-green-500';
    else if (rate >= 2) dotColor = 'bg-yellow-400';
    else dotColor = 'bg-red-500';

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
};

export default ProductCard; 