'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Toast from '../components/ui/Toast';
import ProductList from '../components/product/ProductList';
import { useProductState } from '../hooks/useProductState';
import type { Product } from '../hooks/useProductState';
import { motion, Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ProductCategoriesNav from './components/ProductCategoriesNav';
import ProductHeroSection from './components/ProductHeroSection';

export default function ProductsPage() {
    const [username, setUsername] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const { products: filteredProducts, categoryFilter, setCategoryFilter } = useProductState();
    const [menuOpen, setMenuOpen] = useState(false);

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

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data: Product[]) => setAllProducts(data));
    }, []);

    const containerVariants: Variants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.3 } },
    };
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <Header username={username} onLogout={handleLogout} />
            <Toast
                message="To see product details, please log in"
                visible={showToast}
                onClose={() => setShowToast(false)}
            />

            <ProductCategoriesNav
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
            />

            <ProductHeroSection allProducts={allProducts} />

            <main className="flex-grow px-6 mt-10 max-w-screen-xl mx-auto">
                <h1 className="text-3xl font-semibold text-center mb-6">
                    PRODUCTS LINEUP
                </h1>
                <ProductList products={filteredProducts} onCardClick={handleProductClick} />
            </main>

            <Footer />
        </div>
    );
}
