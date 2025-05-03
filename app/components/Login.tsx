'use client';
import React, { useState } from 'react';

export interface LoginProps {
    onLogin: (username: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        if (username && password) {
            onLogin(username);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white text-gray-800 px-4">
            <div className="w-full max-w-md md:max-w-sm lg:max-w-md p-6 bg-gray-50 rounded-xl shadow-md">
                <h2 className="text-2xl md:text-xl font-semibold mb-6 text-center">
                    Login
                </h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full mb-4 px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full mb-6 px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <button
                    onClick={handleClick}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
