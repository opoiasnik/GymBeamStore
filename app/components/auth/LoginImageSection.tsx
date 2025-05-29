import React from 'react';
import Image from 'next/image';

const LoginImageSection: React.FC = () => {
    return (
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
                    "Using GymBeam is a no-brainer for us. Our customers can access workouts and nutrition plans whenever they need — deadline or middle of the night."
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
    );
};

export default LoginImageSection; 