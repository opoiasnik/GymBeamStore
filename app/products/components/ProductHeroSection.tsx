import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import type { Product } from '../../hooks/useProductState';

interface ProductHeroSectionProps {
    allProducts: Product[];
}

const ProductHeroSection: React.FC<ProductHeroSectionProps> = ({ allProducts }) => {
    const heroItems = React.useMemo(() => {
        if (!allProducts.length) return [];
        const men = allProducts.find((p) => /men's clothing/i.test(p.category));
        const women = allProducts.find((p) => /women's clothing/i.test(p.category));
        const gear = allProducts.find((p) => /electronics/i.test(p.category));
        return [men, women, gear]
            .filter(Boolean)
            .map((p, i) => ({
                src: (p as Product).image,
                title: i === 0 ? 'New Men\'s Collection' : i === 1 ? 'Spring Women\'s Styles' : 'Performance Gear',
                label: i === 0 ? 'Men' : i === 1 ? 'Women' : 'Gear',
            }));
    }, [allProducts]);

    const containerVariants: Variants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.3 } },
    };
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
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
                    <div className="bg-white w-full pb-[56.25%] relative">
                        <Image
                            src={item.src}
                            alt={item.label}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white px-4">
                        <h2 className="text-2xl font-bold">{item.title}</h2>
                        <p className="mt-1 uppercase tracking-wide">{item.label}</p>
                    </div>
                </motion.div>
            ))}
        </motion.section>
    );
};

export default ProductHeroSection; 