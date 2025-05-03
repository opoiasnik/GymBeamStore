import React from 'react';
import Link from 'next/link';

interface HeaderProps {
    username: string | null;
    onLogout: () => void;
    categoryFilter: 'all' | 'men' | 'women' | 'jewelry';
    setCategoryFilter: (filter: 'all' | 'men' | 'women' | 'jewelry') => void;
}

const Header: React.FC<HeaderProps> = ({ username, onLogout, categoryFilter, setCategoryFilter }) => {
    return (
        <header className="bg-gray-100 py-4 px-6 flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="text-2xl flex items-center gap-1">
                <span className="italic font-normal">Gym</span>
                <span className="italic font-bold">Beam</span>
            </div>

            <nav className="flex gap-6 mt-4 md:mt-0">
                {(['all', 'men', 'women', 'jewelry'] as const).map(key => {
                    const label = key === 'all' ? 'All'
                        : key === 'men' ? 'Men'
                            : key === 'women' ? 'Women'
                                : 'Jewelry';
                    const active = categoryFilter === key;
                    return (
                        <button
                            key={key}
                            onClick={() => setCategoryFilter(key)}
                            className={`text-lg pb-1 ${active
                                ? 'border-b-2 border-black font-semibold'
                                : 'text-gray-600 hover:underline'
                                } transition`}
                        >
                            {label}
                        </button>
                    );
                })}
            </nav>

            <div className="mt-4 md:mt-0">
                {username ? (
                    <div className="flex items-center gap-4">
                        <Link href="/user-profile">
                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold">
                                {username.charAt(0).toUpperCase()}
                            </div>
                        </Link>
                        <button
                            onClick={onLogout}
                            className="text-gray-600 hover:underline transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link href="/login">
                        <span className="text-lg text-gray-800 hover:underline cursor-pointer">
                            Login
                        </span>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header; 