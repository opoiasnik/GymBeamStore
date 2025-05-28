import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Section {
    title: string;
    links: string[];
    contact?: string[];
}

const sections: Section[] = [
    {
        title: 'About Us',
        links: ['Our Story', 'Careers', 'Sustainability', 'Press'],
    },
    {
        title: 'Products',
        links: ['Men', 'Women', 'Kids', 'Gear'],
    },
    {
        title: 'Support',
        links: ['Contact Us', 'FAQ', 'Shipping & Returns', 'Size Guide'],
    },
    {
        title: 'Follow Us',
        links: ['Facebook', 'Instagram', 'Twitter', 'YouTube'],
        contact: ['📞 +1 (555) 123-4567', '✉️ support@gymbeam.com'],
    },
];

const Footer: React.FC = () => {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

    const toggleSection = (title: string) => {
        setOpenSections(prev => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    return (
        <footer className="bg-black text-white pt-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {sections.map(({ title, links, contact }) => {
                        const isOpen = openSections[title];
                        return (
                            <div key={title}>
                                <button
                                    className="flex items-center justify-between w-full text-left text-base md:text-lg font-semibold mb-3 md:mb-4 focus:outline-none"
                                    onClick={() => toggleSection(title)}
                                >
                                    {title}
                                    <span className="md:hidden">
                                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </span>
                                </button>

                                <ul
                                    className={`${isOpen ? 'block' : 'hidden'} md:block space-y-1 md:space-y-2 text-sm md:text-base`}
                                >
                                    {links.map(text => (
                                        <li key={text}>
                                            <Link href="#" className="hover:underline hover:text-orange-500">
                                                {text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                {contact && (
                                    <div className="mt-4 space-y-1 text-gray-400 text-xs md:text-sm">
                                        {contact.map(item => (
                                            <p key={item}>{item}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="border-t border-gray-700 pt-4 mt-6">
                    <div className="text-center text-xs md:text-sm text-gray-400">
                        © 2025 GymBeam. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
