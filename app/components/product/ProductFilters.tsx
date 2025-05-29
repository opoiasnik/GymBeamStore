import React, { useState, useRef, useEffect, SetStateAction } from 'react';

interface ProductFiltersProps {
    onlySale: boolean;
    setOnlySale: React.Dispatch<SetStateAction<boolean>>;
    minRating: number;
    setMinRating: React.Dispatch<SetStateAction<number>>;
    sortOrder: 'none' | 'low' | 'high';
    setSortOrder: React.Dispatch<SetStateAction<'none' | 'low' | 'high'>>;
    setCurrentPage: (page: number) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
    onlySale,
    setOnlySale,
    minRating,
    setMinRating,
    sortOrder,
    setSortOrder,
    setCurrentPage,
}) => {
    const [draftOnly, setDraftOnly] = useState(onlySale);
    const [draftRating, setDraftRating] = useState(minRating);
    const [draftSort, setDraftSort] = useState(sortOrder);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (filtersOpen && ref.current && !ref.current.contains(e.target as Node)) {
                setFiltersOpen(false);
            }
        };
        window.addEventListener('mousedown', onClickOutside);
        return () => window.removeEventListener('mousedown', onClickOutside);
    }, [filtersOpen]);

    const handleApplyFilters = () => {
        setOnlySale(draftOnly);
        setMinRating(draftRating);
        setSortOrder(draftSort);
        setCurrentPage(1);
        setFiltersOpen(false);
    };

    const handleResetFilters = () => {
        setDraftOnly(false);
        setDraftRating(0);
        setDraftSort('none');
    };

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => {
                    setDraftOnly(onlySale);
                    setDraftRating(minRating);
                    setDraftSort(sortOrder);
                    setFiltersOpen((o) => !o);
                }}
                className="px-4 py-2 bg-gray-800 text-white border border-orange-500 rounded-lg hover:bg-orange-500 transition"
            >
                Filters ▼
            </button>
            {filtersOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-black border border-orange-500 rounded-lg shadow-lg p-4 space-y-3 z-50 text-white">
                    <div className="flex items-center">
                        <input
                            id="draftOnly"
                            type="checkbox"
                            checked={draftOnly}
                            onChange={() => setDraftOnly((d) => !d)}
                            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded"
                        />
                        <label htmlFor="draftOnly" className="ml-2 text-sm cursor-pointer">
                            Only SALE
                        </label>
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="draftRating" className="text-sm w-24 font-semibold">
                            Min Rating:
                        </label>
                        <select
                            id="draftRating"
                            value={draftRating}
                            onChange={(e) => setDraftRating(+e.target.value)}
                            className="flex-1 p-1 border border-gray-600 rounded bg-black text-white text-sm"
                        >
                            <option value={0}>All</option>
                            <option value={1}>1★+</option>
                            <option value={2}>2★+</option>
                            <option value={3}>3★+</option>
                            <option value={4}>4★+</option>
                            <option value={5}>5★</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="draftSort" className="text-sm w-24 font-semibold">
                            Sort Price:
                        </label>
                        <select
                            id="draftSort"
                            value={draftSort}
                            onChange={(e) => setDraftSort(e.target.value as any)}
                            className="flex-1 p-1 border border-gray-600 rounded bg-black text-white text-sm"
                        >
                            <option value="none">None</option>
                            <option value="low">Lowest First</option>
                            <option value="high">Highest First</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-gray-700">
                        <button
                            onClick={handleApplyFilters}
                            className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition"
                        >
                            Apply
                        </button>
                        <button
                            onClick={handleResetFilters}
                            className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductFilters; 