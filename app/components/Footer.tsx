import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white pt-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">About Us</h3>
                    <ul className="space-y-2">
                        {['Our Story', 'Careers', 'Sustainability', 'Press'].map((text) => (
                            <li key={text}>
                                <Link href="#" className="hover:underline hover:text-orange-500">
                                    {text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Products</h3>
                    <ul className="space-y-2">
                        {['Men', 'Women', 'Kids', 'Gear'].map((text) => (
                            <li key={text}>
                                <Link href="#" className="hover:underline hover:text-orange-500">
                                    {text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
                    <ul className="space-y-2">
                        {['Contact Us', 'FAQ', 'Shipping & Returns', 'Size Guide'].map((text) => (
                            <li key={text}>
                                <Link href="#" className="hover:underline hover:text-orange-500">
                                    {text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
                    <div className="flex flex-col space-y-3">
                        {[
                            { name: 'Facebook', path: /* svg */ '' },
                            { name: 'Instagram', path: '' },
                            { name: 'Twitter', path: '' },
                            { name: 'YouTube', path: '' },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href="#"
                                className="flex items-center gap-2 hover:text-orange-500 transition"
                            >
                                {/* вставьте SVG-иконку здесь */}
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-6 space-y-1 text-gray-400">
                        <p className="text-sm">📞 +1 (555) 123-4567</p>
                        <p className="text-sm">✉️ support@gymbeam.com</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 pt-4 pb-6">
                <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
                    © 2025 GymBeam. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
