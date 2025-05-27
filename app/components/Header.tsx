// components/Header.tsx
'use client';

import React from 'react';
import Link from 'next/link';

interface HeaderProps {
    username: string | null;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
    return (
        <header className="bg-black px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="text-2xl flex items-center gap-1">
                <span className="italic font-normal text-white">Gym</span>
                <span className="italic font-bold text-orange-500">Beam</span>
            </div>

            {/* User Actions */}
            <div>
                {username ? (
                    <div className="flex items-center gap-4">
                        <Link href="/user-profile">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold">
                                {username.charAt(0).toUpperCase()}
                            </div>
                        </Link>
                        <button
                            onClick={onLogout}
                            className="text-gray-400 hover:text-white transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link href="/login">
                        <span className="text-lg text-gray-400 hover:text-white transition">
                            Login
                        </span>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
