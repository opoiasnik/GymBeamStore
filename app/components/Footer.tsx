import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 text-black pt-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">About Us</h3>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:underline">Our Story</Link></li>
                        <li><Link href="#" className="hover:underline">Careers</Link></li>
                        <li><Link href="#" className="hover:underline">Sustainability</Link></li>
                        <li><Link href="#" className="hover:underline">Press</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Products</h3>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:underline">Men</Link></li>
                        <li><Link href="#" className="hover:underline">Women</Link></li>
                        <li><Link href="#" className="hover:underline">Kids</Link></li>
                        <li><Link href="#" className="hover:underline">Gear</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:underline">Contact Us</Link></li>
                        <li><Link href="#" className="hover:underline">FAQ</Link></li>
                        <li><Link href="#" className="hover:underline">Shipping & Returns</Link></li>
                        <li><Link href="#" className="hover:underline">Size Guide</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex flex-col space-y-3">
                        <Link href="#" className="flex items-center gap-2 hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597
                  24 1.325 24H12.82v-9.294H9.692V11.41h3.128V8.745c0-3.1
                  1.893-4.788 4.659-4.788 1.325 0 2.463.099
                  2.795.143v3.24l-1.918.001c-1.504
                  0-1.796.715-1.796 1.763v2.31h3.587l-.467
                  3.296h-3.12V24h6.116C23.403 24 24
                  23.403 24 22.675V1.325C24 .597 23.403
                  0 22.675 0z"/>
                            </svg>
                            Facebook
                        </Link>

                        <Link href="#" className="flex items-center gap-2 hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07
                  1.366.062 2.633.349 3.608 1.324.975.975
                  1.262 2.243 1.324 3.608.058 1.266.069
                  1.645.069 4.84s-.012 3.575-.07
                  4.84c-.062 1.366-.349 2.633-1.324
                  3.608-.975.975-2.243 1.262-3.608
                  1.324-1.266.058-1.645.069-4.85.069s-3.575-.012-4.84-.07c-1.366-.062-2.633-.349-3.608-1.324-.975-.975-1.262-2.243-1.324-3.608C2.175
                  15.584 2.163 15.204 2.163 12s.012-3.575.07-4.84c.062-1.366.349-2.633
                  1.324-3.608C4.532 2.512 5.8 2.225 7.166
                  2.163 8.431 2.105 8.811 2.094 12
                  2.094M12 0C8.741 0 8.332.014 7.052.072 5.771.131
                  4.603.443 3.603 1.444 2.602 2.444 2.29
                  3.613 2.232 4.894c-.058 1.28-.072 1.69-.072
                  4.947s.014 3.667.072 4.947c.058 1.28.371
                  2.448 1.372 3.449 1 1 2.168 1.314
                  3.449 1.372 1.28.058 1.69.072 4.947.072s3.667-.014
                  4.947-.072c1.28-.058 2.448-.371
                  3.449-1.372 1-1 1.314-2.168
                  1.372-3.449.058-1.28.072-1.69.072-4.947s-.014-3.667-.072-4.947c-.058-1.28-.371-2.448-1.372-3.449C19.448.443 18.28.131
                  16.999.072 15.719.014 15.309 0 12 0z"/>
                            </svg>
                            Instagram
                        </Link>

                        <Link href="#" className="flex items-center gap-2 hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M24 4.557a9.834 9.834 0 01-2.828.775
                  4.932 4.932 0 002.165-2.724 9.862
                  9.862 0 01-3.127 1.195 4.916 4.916 0
                  00-8.379 4.482A13.94 13.94 0 011.671
                  3.149a4.916 4.916 0 001.523 6.562
                  4.9 4.9 0 01-2.229-.616c-.054
                  2.28 1.581 4.415 3.95 4.89a4.935
                  4.935 0 01-2.224.085 4.918
                  4.918 0 004.59 3.417A9.867
                  9.867 0 010 21.542a13.94
                  13.94 0 007.548 2.212c9.055
                  0 14.01-7.496 14.01-13.986
                  0-.21 0-.423-.015-.634A10.012
                  10.012 0 0024 4.557z"/>
                            </svg>
                            Twitter
                        </Link>

                        <Link href="#" className="flex items-center gap-2 hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a2.967 2.967 0 00-2.087-2.1C19.59
                  3.667 12 3.667 12 3.667s-7.59
                  0-9.411.419a2.967 2.967 0 00-2.087
                  2.1C.001 8.009.001 12.011.001
                  12.011s0 4.002.501 5.825a2.967
                  2.967 0 002.087 2.1c1.822.419
                  9.411.419 9.411.419s7.59 0
                  9.411-.419a2.967 2.967 0 002.087-2.1c.501-1.823.501-5.825.501-5.825s0-4.002-.501-5.825zM9.545
                  15.568V8.455l6.182 3.556-6.182
                  3.557z"/>
                            </svg>
                            YouTube
                        </Link>
                    </div>
                    <div className="mt-6 space-y-1">
                        <p className="text-sm">📞 +1 (555) 123-4567</p>
                        <p className="text-sm">✉️ support@gymbeam.com</p>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 pt-4 pb-6">
                <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
                    © 2023 GymBeam. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer; 