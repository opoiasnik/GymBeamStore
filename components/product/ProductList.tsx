import React from 'react';
import type { Product } from '@/hooks/types';

interface ProductListProps {
    products: Product[];
    onCardClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onCardClick }) => {
    return (
        <div>
            {/* Placeholder content for ProductList */}
            <h2>Product List Placeholder</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id} onClick={() => onCardClick(product)}>
                        {product.title} - ${product.price.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList; 