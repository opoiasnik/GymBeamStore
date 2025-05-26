"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function LoginPage() {
    const router = useRouter();
    const [mode, setMode] = useState<'login' | 'register' | 'verify'>('login');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [sentCode, setSentCode] = useState('');
    const [pendingUser, setPendingUser] = useState<{ username: string, email: string, password: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (mode === 'login') {
            // Login via FakeStoreAPI
            try {
                const res = await fetch('https://fakestoreapi.com/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });
                const data = await res.json();
                if (data.token) {
                    localStorage.setItem('currentUser', username);
                    document.cookie = `currentUser=${username}; path=/;`;
                    router.replace('/');
                } else {
                    setError('Invalid username or password');
                }
            } catch {
                setError('Login failed');
            }
        } else if (mode === 'register') {
            // Register via FakeStoreAPI
            try {
                const res = await fetch('https://fakestoreapi.com/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email,
                        username,
                        password,
                        name: { firstname: 'User', lastname: 'User' },
                        address: {
                            city: 'City',
                            street: 'Street',
                            number: 1,
                            zipcode: '00000',
                            geolocation: { lat: '0', long: '0' }
                        },
                        phone: '0000000000',
                    }),
                });
                const data = await res.json();
                if (data.id) {
                    const code = generateCode();
                    setSentCode(code);
                    setPendingUser({ username, email, password });
                    setMode('verify');
                    setSuccess(`Verification code sent to ${email}. (For testing: ${code})`);
                } else {
                    setError('Registration failed');
                }
            } catch {
                setError('Registration failed');
            }
        } else if (mode === 'verify') {
            if (verificationCode === sentCode && pendingUser) {
                setSuccess('Email verified! Please log in.');
                setMode('login');
                setUsername(pendingUser.username);
                setPassword('');
                setEmail(pendingUser.email);
                setPendingUser(null);
                setVerificationCode('');
                setSentCode('');
            } else {
                setError('Invalid verification code');
            }
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-white">
                <div className="max-w-md mx-auto space-y-10">
                    <div className="flex justify-center gap-2">
                        <button
                            type="button"
                            className={`px-4 py-2 rounded ${mode === 'login' ? 'bg-black text-white' : 'bg-gray-200'}`}
                            onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                            disabled={mode === 'verify'}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 rounded ${mode === 'register' ? 'bg-black text-white' : 'bg-gray-200'}`}
                            onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
                            disabled={mode === 'verify'}
                        >
                            Register
                        </button>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-serif font-normal leading-tight text-center lg:text-left">
                        {mode === 'login' ? 'Sign in to your account' : mode === 'register' ? 'Register' : 'Email Verification'}
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {mode === 'register' && (
                            <>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-light mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="you@company.com"
                                        className="w-full border-b border-gray-300 focus:border-black pb-2 text-lg font-light placeholder-gray-400 transition"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="username" className="block text-sm font-light mb-1">
                                        Username <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        required
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        placeholder="username"
                                        className="w-full border-b border-gray-300 focus:border-black pb-2 text-lg font-light placeholder-gray-400 transition"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-light mb-1">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full border-b border-gray-300 focus:border-black pb-2 text-lg font-light placeholder-gray-400 transition"
                                    />
                                </div>
                            </>
                        )}
                        {mode === 'login' && (
                            <>
                                <div>
                                    <label htmlFor="username" className="block text-sm font-light mb-1">
                                        Username <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        required
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        placeholder="username"
                                        className="w-full border-b border-gray-300 focus:border-black pb-2 text-lg font-light placeholder-gray-400 transition"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-light mb-1">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full border-b border-gray-300 focus:border-black pb-2 text-lg font-light placeholder-gray-400 transition"
                                    />
                                </div>
                                <div className="text-xs text-gray-500">
                                    Use for login: <span className="font-mono">johnd</span> / <span className="font-mono">m38rmF$</span>
                                </div>
                            </>
                        )}
                        {mode === 'verify' && (
                            <>
                                <div>
                                    <label htmlFor="code" className="block text-sm font-light mb-1">
                                        Verification code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="code"
                                        type="text"
                                        required
                                        value={verificationCode}
                                        onChange={e => setVerificationCode(e.target.value)}
                                        placeholder="Enter the code from email"
                                        className="w-full border-b border-gray-300 focus:border-black pb-2 text-lg font-light placeholder-gray-400 transition"
                                    />
                                </div>
                                <div className="text-xs text-gray-500">
                                    (For testing: <span className="font-mono">{sentCode}</span>)
                                </div>
                            </>
                        )}
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        {success && <div className="text-green-600 text-sm">{success}</div>}
                        <button
                            type="submit"
                            className="mt-8 w-full py-3 bg-black text-white uppercase text-sm tracking-widest rounded-md hover:bg-gray-900 transition"
                        >
                            {mode === 'login'
                                ? 'Sign in'
                                : mode === 'register'
                                    ? 'Register'
                                    : 'Verify'}
                        </button>
                    </form>
                </div>
            </div>
            <div className="hidden lg:block lg:w-1/2 relative">
                <Image
                    src="/images/gymbeam-kosice-showroom.webp"
                    alt="Gym setup"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex flex-col justify-end items-end pr-16 pb-24 text-white">
                    <blockquote className="text-xl sm:text-2xl italic leading-snug max-w-md">
                        “Using GymBeam is a no-brainer for us. Our customers can access
                        workouts and nutrition plans whenever they need — deadline or
                        middle of the night.”
                    </blockquote>
                    <div className="mt-8 flex items-center gap-4">
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white bg-gray-200">
                            <Image
                                src="/images/woman.png"
                                alt="Alexandra Kentmann"
                                fill
                                className="object-center object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-lg">Alexandra Kentmann</p>
                            <p className="text-sm">Fitness Enthusiast</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}