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
        setProfile(p => ({ ...p, promoCode: e.target.value }));
    };

    const handlePromoEditToggle = () => {
        if (editingPromo) {
            const original = originalUsernameRef.current;
            if (original) localStorage.setItem(`profile_${original}`, JSON.stringify(profile));
        }
        setEditingPromo(e => !e);
    };

    const handleDone = () => {
        const original = originalUsernameRef.current;
        if (original) localStorage.setItem(`profile_${original}`, JSON.stringify(profile));
        router.push('/products');
    };

    const initial = profile.email ? profile.email.charAt(0).toUpperCase() : '';

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <span>Loading profile...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="relative bg-black/80 h-32 sm:h-40">
                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 100">
                    <path
                        fill="#000"
                        d="M0,32 C360,96 720,0 1080,64 1260,96 1440,32 1440,32 L1440,100 L0,100 Z"
                    />
                </svg>
            </div>

            <div className="flex justify-center -mt-12 sm:-mt-16 relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-orange-500 bg-black flex items-center justify-center">
                    <span className="text-white text-3xl sm:text-4xl font-bold">{initial}</span>
                </div>
            </div>

            <div className="mt-6 sm:mt-8 px-4 sm:px-6 lg:px-24">
                <div className="max-w-md sm:max-w-lg mx-auto space-y-6 bg-black/80 p-6 rounded-xl border border-orange-500">
                    {[
                        { label: 'E-Mail', value: profile.email },
                        { label: 'First Name', value: profile.firstname || '' },
                        { label: 'Last Name', value: profile.lastname || '' },
                        { label: 'Username', value: profile.username },
                        { label: 'Phone', value: profile.phone },
                    ].map((field) => (
                        <div key={field.label}>
                            <label className="block text-sm font-medium text-white mb-1">
                                {field.label}
                            </label>
                            <input
                                type="text"
                                value={field.value}
                                readOnly
                                className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded focus:outline-none text-white"
                            />
                        </div>
                    ))}

                    <div className="relative">
                        <label className="block text-sm font-medium text-white mb-1">
                            Promo Code
                        </label>
                        <input
                            type="text"
                            value={profile.promoCode}
                            onChange={handlePromoChange}
                            disabled={!editingPromo}
                            className={`w-full px-3 py-2 border ${editingPromo ? 'border-orange-500 bg-black/60' : 'border-gray-700 bg-black/60'
                                } rounded focus:outline-none text-white`}
                        />
                        <button
                            onClick={handlePromoEditToggle}
                            className="absolute top-2.5 right-3 text-gray-400 hover:text-orange-500 transition"
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
                        className="w-full py-3 bg-orange-500 text-black font-semibold rounded tracking-wide hover:bg-orange-600 transition"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
