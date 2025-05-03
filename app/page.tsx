// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import { useProductState } from './hooks/useProductState';
import { Product } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const { products, selectedProduct, setSelectedProduct, categoryFilter, setCategoryFilter } = useProductState();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setUsername(user);

    const STORAGE_KEY = 'enrichedProducts';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      // If products are already stored in localStorage, use them
      // This is useful for testing or if you want to keep the existing products
    } else {
      fetch('https://fakestoreapi.com/products?limit=20')
        .then(r => r.json())
        .then((data: any[]) => {
          const BADGES = [
            { label: 'Bestseller', color: 'bg-orange-500', iconName: 'badge' as const },
            { label: 'Top Rated', color: 'bg-yellow-400', iconName: 'star' as const },
            { label: 'Hot Deal', color: 'bg-red-500', iconName: 'fire' as const },
            { label: 'Popular', color: 'bg-gray-800', iconName: 'thumb' as const },
            { label: 'GymBeam Pick', color: 'bg-blue-500', iconName: 'badge' as const },
          ];

          const enriched: Product[] = data.map(item => {
            const copy: Product = {
              id: item.id,
              title: item.title,
              description: item.description,
              price: item.price,
              image: item.image,
              rating: item.rating,
              category: item.category,
            };

            if (Math.random() < 0.3) {
              copy.onSale = true;
              copy.oldPrice = item.price;
              copy.price = +(item.price * 0.8).toFixed(2);
            }

            const rate = item.rating?.rate ?? 0;
            if (rate >= 3 && Math.random() < 0.7) {
              const b = BADGES[Math.floor(Math.random() * BADGES.length)];
              copy.promoBadge = b;
            }

            return copy;
          });

          localStorage.setItem(STORAGE_KEY, JSON.stringify(enriched));
          // This is where you would update the state with the enriched products
        })
        .catch(console.error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUsername(null);
    router.push('/');
  };

  const handleProductClick = (product: Product) => {
    if (!username) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      setSelectedProduct(product);
    }
  };

  const displayed = products.filter(p => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'men') return p.category === "men's clothing";
    if (categoryFilter === 'women') return p.category === "women's clothing";
    if (categoryFilter === 'jewelry') return p.category === 'jewelery';
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">

      <Header
        username={username}
        onLogout={handleLogout}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      <Toast
        message="To see product details please Log In"
        visible={showToast}
        onClose={() => setShowToast(false)}
      />

      <main className="flex-grow">
        <ProductList products={displayed} onProductClick={handleProductClick} />
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
