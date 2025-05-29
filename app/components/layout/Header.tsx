'use client';

import React from 'react';
import Link from 'next/link';
import AuthStatus from '@/app/components/auth/AuthStatus';

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

            <AuthStatus username={username} onLogout={onLogout} />
        </header>
    );
};

export default Header;
