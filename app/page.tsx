// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductList from './components/ProductList';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { useProductState } from './hooks/useProductState';
import { Product } from './types';

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const {
    products,
    categoryFilter,
    setCategoryFilter,
  } = useProductState();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setUsername(user);
    if (!user) {
      router.replace('/login');
    }
  }, [router]);

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
      router.push(`/products/${product.id}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header
        username={username}
        onLogout={handleLogout}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      <Toast
        message="To see product details, please log in"
        visible={showToast}
        onClose={() => setShowToast(false)}
      />

      <main className="flex-grow">
        <ProductList products={products} onCardClick={handleProductClick} />
      </main>

      <Footer />
    </div>
  );
}
