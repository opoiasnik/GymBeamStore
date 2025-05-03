'use client';
import React from 'react';

interface PaginationProps {
    productsPerPage: number;
    totalProducts: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    productsPerPage,
    totalProducts,
    paginate
}) => {
    const pageCount = Math.ceil(totalProducts / productsPerPage);
    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

    return (
        <nav className="w-full px-4">
            <ul className="flex flex-wrap justify-center gap-2 mt-4 sm:mt-8">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => paginate(number)}
                            className="
                w-6 h-6 sm:w-8 sm:h-8 
                rounded-md 
                bg-black text-white 
                text-xs sm:text-sm
                flex items-center justify-center
                hover:bg-gray-800 transition
              "
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
