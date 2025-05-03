import { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  onSale?: boolean;
  promoBadge?: {
    label: string;
    color: string;
    iconName: 'star' | 'fire' | 'thumb' | 'badge';
  };
  image: string;
  rating?: { rate: number; count: number };
  category: string;
}

export function useProductState() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'men' | 'women' | 'jewelry'>('all');

  useEffect(() => {
    const STORAGE_KEY = 'enrichedProducts';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProducts(JSON.parse(stored));
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
          setProducts(enriched);
        })
        .catch(console.error);
    }
  }, []);

  const displayedProducts = products.filter(p => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'men') return p.category === "men's clothing";
    if (categoryFilter === 'women') return p.category === "women's clothing";
    if (categoryFilter === 'jewelry') return p.category === 'jewelery';
    return true;
  });

  return {
    products: displayedProducts,
    selectedProduct,
    setSelectedProduct,
    categoryFilter,
    setCategoryFilter,
  };
} 