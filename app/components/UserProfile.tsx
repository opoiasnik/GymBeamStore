'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline';

interface ProfileData {
    email: string;
    username: string;
    phone: string;
    promoCode: string;
}

export default function UserProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<ProfileData>({
        email: '',
        username: '',
        phone: '',
        promoCode: '',
    });
    const [editing, setEditing] = useState({
        username: false,
        phone: false,
        promoCode: false,
    });


    useEffect(() => {
        const currentEmail = localStorage.getItem('currentUser');
        if (!currentEmail) {
            router.replace('/login');
            return;
        }
        const saved = localStorage.getItem(`profile_${currentEmail}`);
        if (saved) {
            setProfile(JSON.parse(saved));
        } else {
            setProfile({
                email: currentEmail,
                username: '',
                phone: '',
                promoCode: '',
            });
        }
    }, [router]);

    const toggleEdit = (field: keyof typeof editing) => {
        setEditing(e => ({ ...e, [field]: !e[field] }));
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        const { name, value } = e.target;
        setProfile(p => ({ ...p, [name]: value }));
    };

    const handleDone = () => {
        localStorage.setItem(`profile_${profile.email}`, JSON.stringify(profile));
        router.push('/');
    };

    const initial = profile.email.charAt(0).toUpperCase();

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


                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="username"
                            value={profile.username}
                            onChange={handleChange}
                            disabled={!editing.username}
                            className={`w-full px-3 py-2 border ${editing.username ? 'border-blue-500 bg-white' : 'border-gray-300 bg-gray-200'
                                } focus:outline-none`}
                            placeholder="Enter your name"
                        />
                        <button
                            onClick={() => toggleEdit('username')}
                            className="absolute top-2.5 right-3 text-gray-600 hover:text-gray-900"
                            aria-label={editing.username ? 'Save name' : 'Edit name'}
                        >
                            {editing.username ? (
                                <CheckIcon className="w-5 h-5" />
                            ) : (
                                <PencilSquareIcon className="w-5 h-5" />
                            )}
                        </button>
                    </div>


                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone no.</label>
                        <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            disabled={!editing.phone}
                            className={`w-full px-3 py-2 border ${editing.phone ? 'border-blue-500 bg-white' : 'border-gray-300 bg-gray-200'
                                } focus:outline-none`}
                            placeholder="Enter your phone no."
                        />
                        <button
                            onClick={() => toggleEdit('phone')}
                            className="absolute top-2.5 right-3 text-gray-600 hover:text-gray-900"
                            aria-label={editing.phone ? 'Save phone' : 'Edit phone'}
                        >
                            {editing.phone ? (
                                <CheckIcon className="w-5 h-5" />
                            ) : (
                                <PencilSquareIcon className="w-5 h-5" />
                            )}
                        </button>
                    </div>


                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                        <input
                            type="text"
                            name="promoCode"
                            value={profile.promoCode}
                            onChange={handleChange}
                            disabled={!editing.promoCode}
                            className={`w-full px-3 py-2 border ${editing.promoCode ? 'border-blue-500 bg-white' : 'border-gray-300 bg-gray-200'
                                } focus:outline-none`}
                            placeholder="Enter your promo code"
                        />
                        <button
                            onClick={() => toggleEdit('promoCode')}
                            className="absolute top-2.5 right-3 text-gray-600 hover:text-gray-900"
                            aria-label={editing.promoCode ? 'Save code' : 'Edit code'}
                        >
                            {editing.promoCode ? (
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
