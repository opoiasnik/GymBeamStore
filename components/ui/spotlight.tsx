'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion';

type SpotlightProps = {
    className?: string;
    size?: number;
    springOptions?: SpringOptions;
};

export function Spotlight({
    className,
    size = 200,
    springOptions = { bounce: 0 },
}: SpotlightProps) {
    const [isHovered, setIsHovered] = useState(true); // always true for global
    const mouseX = useSpring(0, springOptions);
    const mouseY = useSpring(0, springOptions);

    const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
    const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouseX.set(event.clientX);
            mouseY.set(event.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className={[
                'pointer-events-none fixed top-0 left-0 rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] blur-xl transition-opacity duration-200',
                'from-zinc-50 via-zinc-100 to-zinc-200',
                isHovered ? 'opacity-100' : 'opacity-0',
                className,
            ].join(' ')}
            style={{
                width: size,
                height: size,
                left: spotlightLeft,
                top: spotlightTop,
                zIndex: 50,
            }}
        />
    );
}