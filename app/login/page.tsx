'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('currentUser', email);
        router.replace('/');
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-white">
                <div className="max-w-md mx-auto space-y-10">

                    <div className="flex justify-center gap-2">
                        <span className="w-2 h-2 bg-pink-400 rounded-full" />
                        <span className="w-2 h-2 bg-gray-300 rounded-full" />
                        <span className="w-2 h-2 bg-gray-300 rounded-full" />
                        <span className="w-2 h-2 bg-gray-300 rounded-full" />
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-serif font-normal leading-tight text-center lg:text-left">
                        Create a GymBeam account<br />for your brand
                    </h1>

                    <form onSubmit={handleContinue} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-light mb-1">
                                Work email <span className="text-red-500">*</span>
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
                            <label htmlFor="password" className="block text-sm font-light mb-1">
                                Create a password <span className="text-red-500">*</span>
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

                        <button
                            type="submit"
                            className="mt-8 w-full py-3 bg-black text-white uppercase text-sm tracking-widest rounded-md hover:bg-gray-900 transition"
                        >
                            Continue
                        </button>
                    </form>

                    <p className="text-xs text-gray-500 text-center">
                        By clicking “Continue” I agree to GymBeam’s{' '}
                        <Link href="#" className="underline">Terms of Service</Link> and{' '}
                        <Link href="#" className="underline">Privacy Policy</Link>. Already have an account?{' '}
                        <Link href="/login" className="underline">Sign in</Link>
                    </p>

                    <hr className="border-gray-300" />

                    <p className="text-xs text-gray-500 text-center">
                        NOT A BRAND?{' '}
                        <Link href="#" className="underline">Create a Content Publisher</Link>{' '}
                        or <Link href="#" className="underline">PR Agency account</Link>
                    </p>
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
