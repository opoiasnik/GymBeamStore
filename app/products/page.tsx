// app/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import ProductList from '../components/ProductList';
import { useProductState } from '../hooks/useProductState';
import type { Product } from '../types';
// ← импортируем Framer Motion
import { motion, Variants } from 'framer-motion';

export default function ProductsPage() {
    const [username, setUsername] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const { products: filteredProducts, categoryFilter, setCategoryFilter } =
        useProductState();

    useEffect(() => {
        const u = localStorage.getItem('currentUser');
        setUsername(u);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setUsername(null);
        window.location.href = '/';
    };

    const handleProductClick = (product: Product) => {
        if (!username) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } else {
            window.location.href = `/products/${product.id}`;
        }
    };

    // получаем полный список для баннеров
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data: Product[]) => setAllProducts(data));
    }, []);

    // мемоизируем наши три баннера
    const heroItems = useMemo(() => {
        if (!allProducts.length) return [];
        const men = allProducts.find((p) =>
            /men’s clothing|men's clothing/i.test(p.category)
        );
        const women = allProducts.find((p) =>
            /women’s clothing|women's clothing/i.test(p.category)
        );
        const gear = allProducts.find((p) =>
            /electronics/i.test(p.category)
        );
        return [men, women, gear]
            .filter(Boolean)
            .map((p, i) => ({
                src: (p as Product).image,
                title:
                    i === 0
                        ? 'New Men’s Collection'
                        : i === 1
                            ? 'Spring Women’s Styles'
                            : 'Performance Gear',
                label: i === 0 ? 'Men' : i === 1 ? 'Women' : 'Gear',
            }));
    }, [allProducts]);

    // Анимационные варианты для контейнера и элементов
    const containerVariants: Variants = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.3 }
        }
    };
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <Header username={username} onLogout={handleLogout} />
            <Toast
                message="To see product details, please log in"
                visible={showToast}
                onClose={() => setShowToast(false)}
            />
            <nav className="flex justify-center gap-6 mt-6 px-6">
                {(['all', 'men', 'women', 'jewelery', 'electronics'] as const).map(key => {
                    const label =
                        key === 'all' ? 'All' :
                            key === 'men' ? 'Men' :
                                key === 'women' ? 'Women' :
                                    key === 'jewelery' ? 'Jewelry' :
                                        'Electronics';
                    const active = categoryFilter === key;
                    return (
                        <button
                            key={key}
                            onClick={() => setCategoryFilter(key)}
                            className={`px-3 py-1 text-lg font-medium border-b-2 transition ${active
                                ? 'border-orange-500 text-white'
                                : 'border-transparent text-gray-500 hover:text-white'
                                }`}
                        >
                            {label}
                        </button>
                    );
                })}
            </nav>

            {/* Секция баннеров с анимацией */}
            <motion.section
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {heroItems.map((item) => (
                    <motion.div
                        key={item.label}
                        variants={itemVariants}
                        className="group relative bg-black/80 border border-orange-500 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    >
                        {/* Белый фон под изображением */}
                        <div className="bg-white w-full pb-[56.25%] relative">
                            <Image
                                src={item.src}
                                alt={item.label}
                                fill
                                className="object-contain"
                            />
                        </div>
                        {/* Текст поверх */}
                        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white px-4">
                            <h2 className="text-2xl font-bold">{item.title}</h2>
                            <p className="mt-1 uppercase tracking-wide">{item.label}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.section>

            {/* Каталог */}
            <main className="flex-grow px-6 mt-10 max-w-screen-xl mx-auto">
                <h1 className="text-3xl font-semibold text-center mb-6">
                    PRODUCTS LINEUP
                </h1>
                <ProductList
                    products={filteredProducts}
                    onCardClick={handleProductClick}
                />
            </main>

            <Footer />
        </div>
    );
}
