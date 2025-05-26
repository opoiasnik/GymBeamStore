'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline';

interface ProfileData {
    email: string;
    username: string;
    phone: string;
    promoCode: string;
    firstname?: string;
    lastname?: string;
}

export default function UserProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<ProfileData>({
        email: '',
        username: '',
        phone: '',
        promoCode: '',
        firstname: '',
        lastname: '',
    });
    const [editingPromo, setEditingPromo] = useState(false);
    const [loading, setLoading] = useState(true);

    const originalUsernameRef = useRef<string | null>(null);

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            router.replace('/login');
            return;
        }
        originalUsernameRef.current = currentUser;
        const saved = localStorage.getItem(`profile_${currentUser}`);
        if (saved) {
            setProfile(JSON.parse(saved));
            setLoading(false);
        } else {
            fetch('https://fakestoreapi.com/users')
                .then(res => res.json())
                .then(users => {
                    const user = users.find((u: any) => u.username === currentUser);
                    if (user) {
                        const newProfile: ProfileData = {
                            email: user.email,
                            username: user.username,
                            phone: user.phone,
                            promoCode: '',
                            firstname: user.name.firstname,
                            lastname: user.name.lastname,
                        };
                        setProfile(newProfile);
                        localStorage.setItem(`profile_${currentUser}`, JSON.stringify(newProfile));
                    }
                    setLoading(false);
                });
        }
    }, [router]);

    const handlePromoChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        const { value } = e.target;
        setProfile(p => ({ ...p, promoCode: value }));
    };

    const handlePromoEditToggle = () => {
        if (editingPromo) {
            const originalUsername = originalUsernameRef.current;
            if (originalUsername) {
                localStorage.setItem(`profile_${originalUsername}`, JSON.stringify(profile));
            }
        }
        setEditingPromo(e => !e);
    };

    const handleDone = () => {
        const originalUsername = originalUsernameRef.current;
        if (originalUsername) {
            localStorage.setItem(`profile_${originalUsername}`, JSON.stringify(profile));
        }
        router.push('/');
    };

    const initial = profile.email ? profile.email.charAt(0).toUpperCase() : '';

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span>Loading profile...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="relative bg-gray-200 h-32 sm:h-40">
                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 100">
                    <path
                        fill="#F3F4F6"
                        d="M0,32 C360,96 720,0 1080,64 1260,96 1440,32 1440,32 L1440,100 L0,100 Z"
                    />
                </svg>
            </div>
            <div className="flex justify-center -mt-12 sm:-mt-16 relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-black flex items-center justify-center">
                    <span className="text-white text-3xl sm:text-4xl font-bold">{initial}</span>
                </div>
            </div>
            <div className="mt-6 sm:mt-8 px-4 sm:px-6 lg:px-24">
                <div className="max-w-md sm:max-w-lg mx-auto space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            readOnly
                            className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            value={profile.firstname || ''}
                            readOnly
                            className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            value={profile.lastname || ''}
                            readOnly
                            className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={profile.username}
                            readOnly
                            className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded focus:outline-none"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            readOnly
                            className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded focus:outline-none"
                            placeholder="Enter your phone"
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                        <input
                            type="text"
                            name="promoCode"
                            value={profile.promoCode}
                            onChange={handlePromoChange}
                            disabled={!editingPromo}
                            className={`w-full px-3 py-2 border ${editingPromo ? 'border-blue-500 bg-white' : 'border-gray-300 bg-gray-200'
                                } focus:outline-none`}
                            placeholder="Enter your promo code"
                        />
                        <button
                            onClick={handlePromoEditToggle}
                            className="absolute top-2.5 right-3 text-gray-600 hover:text-gray-900"
                            aria-label={editingPromo ? 'Save code' : 'Edit code'}
                        >
                            {editingPromo ? (
                                <CheckIcon className="w-5 h-5" />
                            ) : (
                                <PencilSquareIcon className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <button
                        onClick={handleDone}
                        className="w-full py-3 bg-black text-white font-semibold rounded tracking-wide hover:bg-gray-800 transition"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}