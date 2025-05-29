import React from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Section {
    title: string;
    links: string[];
    contact?: string[];
}

interface FooterSectionProps {
    section: Section;
    isOpen: boolean;
    onToggle: () => void;
}

const FooterSection: React.FC<FooterSectionProps> = ({
    section,
    isOpen,
    onToggle,
}) => {
    return (
        <div key={section.title}>
            <button
                className="flex items-center justify-between w-full text-left text-base md:text-lg font-semibold mb-3 md:mb-4 focus:outline-none"
                onClick={onToggle}
            >
                {section.title}
                <span className="md:hidden">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
            </button>

            <ul
                className={`${isOpen ? 'block' : 'hidden'} md:block space-y-1 md:space-y-2 text-sm md:text-base`}
            >
                {section.links.map(text => (
                    <li key={text}>
                        <Link href="#" className="hover:underline hover:text-orange-500">
                            {text}
                        </Link>
                    </li>
                ))}
            </ul>

            {section.contact && (
                <div className="mt-4 space-y-1 text-gray-400 text-xs md:text-sm">
                    {section.contact.map(item => (
                        <p key={item}>{item}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FooterSection; 