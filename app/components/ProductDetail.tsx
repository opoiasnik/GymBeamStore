'use client';

import React from 'react';
import Image from 'next/image';

interface ProductDetailProps {
    product: {
        id: number;
        title: string;
        description: string;
        price: number;
        oldPrice?: number;
        onSale?: boolean;
        image: string;
        rating?: {
            rate: number;
            count: number;
        };
    };
    onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
    const rate = product.rating?.rate ?? 0;
    const count = product.rating?.count ?? 0;
    const totalDots = 5;
    let dotColor = 'bg-gray-300';
    if (rate >= 4) dotColor = 'bg-green-500';
    else if (rate >= 2) dotColor = 'bg-yellow-400';
    else dotColor = 'bg-red-500';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div
                className="relative bg-white rounded-2xl shadow-xl overflow-hidden 
                   w-full max-w-md sm:max-w-lg transform transition-all duration-500 ease-out"
            >

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                    aria-label="Close"
                >
                    ✕
                </button>


                <div className="relative w-full h-48 sm:h-64 bg-white">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-contain"
                    />
                </div>


                <div className="p-4 sm:p-6 space-y-4">

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                        {product.title}
                    </h2>


                    <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                            {Array.from({ length: totalDots }).map((_, i) => (
                                <span
                                    key={i}
                                    className={`w-3 h-3 rounded-full ${i < Math.round(rate) ? dotColor : 'bg-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500">
                            ({count} reviews)
                        </span>
                    </div>


                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {product.description}
                    </p>


                    <div className="flex items-baseline gap-3">
                        {product.onSale && product.oldPrice && (
                            <span className="text-gray-400 line-through text-sm sm:text-base">
                                ${product.oldPrice.toFixed(2)}
                            </span>
                        )}
                        <span
                            className={`font-bold text-lg sm:text-2xl ${product.onSale ? 'text-red-600' : 'text-black'
                                }`}
                        >
                            ${product.price.toFixed(2)}
                        </span>
                    </div>


                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-black text-white font-medium rounded-lg
                       hover:bg-gray-800 transition text-sm sm:text-base"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
