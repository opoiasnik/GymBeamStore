import React from 'react';
import Link from 'next/link';

interface AuthStatusProps {
    username: string | null;
    onLogout: () => void;
}

const AuthStatus: React.FC<AuthStatusProps> = ({ username, onLogout }) => {
    return (
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
    );
};

export default AuthStatus; 