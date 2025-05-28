'use client';

import React from 'react';
import Link from 'next/link';

interface HeaderProps {
    username: string | null;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
    return (
        <header className="bg-black px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
            <div className="flex items-center gap-1">
                <span className="italic text-lg sm:text-2xl font-normal text-white">Gym</span>
                <span className="italic text-lg sm:text-2xl font-bold text-orange-500">Beam</span>
            </div>

            <div>
                {username ? (
                    <div className="flex items-center gap-3 sm:gap-4">
                        <Link href="/user-profile">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm sm:text-base">
                                {username.charAt(0).toUpperCase()}
                            </div>
                        </Link>
                        <button
                            onClick={onLogout}
                            className="text-gray-400 hover:text-white transition text-sm sm:text-base"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link href="/login">
                        <span className="text-sm sm:text-lg text-gray-400 hover:text-white transition">
                            Login
                        </span>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
