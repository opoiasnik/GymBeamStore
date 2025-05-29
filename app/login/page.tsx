"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginImageSection from '@/app/components/auth/LoginImageSection';
import LoginModeSwitcher from '@/app/components/auth/LoginModeSwitcher';
import LoginForm from './components/LoginForm';

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
                    router.replace('/products');
                } else {
                    setError('Invalid username or password');
                }
            } catch {
                setError('Login failed');
            }
        } else if (mode === 'register') {
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
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-black min-h-screen">
                <div className="max-w-md w-full mx-auto space-y-6 bg-black/80 rounded-xl border border-orange-500 shadow-xl p-4 sm:p-6 md:p-8 mt-8">
                    <div className="flex items-center gap-2 mb-6 justify-center">
                        <span className="italic font-normal text-3xl text-white">Gym</span>
                        <span className="italic font-bold text-3xl text-orange-500">Beam</span>
                    </div>
                    <LoginModeSwitcher
                        mode={mode}
                        setMode={setMode}
                        setLoginError={setError}
                        setLoginSuccess={setSuccess}
                    />
                    <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
                        {mode === 'login' ? 'Sign in to your account' : mode === 'register' ? 'Register' : 'Email Verification'}
                    </h1>
                    <LoginForm
                        mode={mode}
                        username={username}
                        setUsername={setUsername}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        verificationCode={verificationCode}
                        setVerificationCode={setVerificationCode}
                        sentCode={sentCode}
                        error={error}
                        success={success}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
            <LoginImageSection />
        </div>
    );
}
