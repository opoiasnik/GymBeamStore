import React, { SetStateAction } from 'react';
import { Menu, X } from 'lucide-react';
import type { Category } from '../../hooks/useProductState';

interface ProductCategoriesNavProps {
    categoryFilter: Category;
    setCategoryFilter: (category: Category) => void;
    menuOpen: boolean;
    setMenuOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ProductCategoriesNav: React.FC<ProductCategoriesNavProps> = ({
    categoryFilter,
    setCategoryFilter,
    menuOpen,
    setMenuOpen,
}) => {
    const categories: { key: Category; label: string }[] = [
        { key: 'all', label: 'All' },
        { key: 'men', label: 'Men' },
        { key: 'women', label: 'Women' },
        { key: 'jewelery', label: 'Jewelry' },
        { key: 'electronics', label: 'Electronics' },
    ];

    return (
        <div className="px-6 mt-6">
            <div className="flex items-center justify-between md:hidden">
                <h2 className="text-xl font-semibold">Categories</h2>
                <button
                    aria-label="Toggle menu"
                    onClick={() => setMenuOpen((open) => !open)}
                    className="p-2"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            <nav
                className={`${menuOpen ? 'flex' : 'hidden'
                    } flex-col gap-4 mt-4 md:flex md:flex-row md:justify-center md:gap-6 md:mt-0`}
            >
                {categories.map(({ key, label }) => {
                    const active = categoryFilter === key;
                    return (
                        <button
                            key={key}
                            onClick={() => {
                                setCategoryFilter(key);
                                setMenuOpen(false);
                            }}
                            className={`px-3 py-1 text-lg font-medium transition border-b-2 ${active
                                ? 'border-orange-500 text-white'
                                : 'border-transparent text-gray-500 hover:text-white'
                                }`}
                        >
                            {label}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default ProductCategoriesNav; 