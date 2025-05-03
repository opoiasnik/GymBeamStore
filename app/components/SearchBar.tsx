import React from 'react';

interface SearchBarProps {
    setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => {
    return (
        <div className="flex justify-center mb-6">
            <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 w-full max-w-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
        </div>
    );
};

export default SearchBar; 