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
        <nav className="w-full px-4 sm:px-6">
            <ul className="flex flex-wrap justify-center gap-2 mt-3 sm:mt-4 lg:mt-6">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => paginate(number)}
                            className="
                w-7 h-7 sm:w-8 sm:h-8
                rounded-md
                bg-black text-white
                text-xs sm:text-sm
                flex items-center justify-center
                border border-orange-500
                hover:bg-orange-500 transition
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
