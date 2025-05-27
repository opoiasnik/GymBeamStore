'use client';

import { useRouter } from 'next/navigation';
import { SplineScene } from '@/components/ui/splite';
import { Card } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';

export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="w-full min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
            />

            <Card className="w-full h-full min-h-screen bg-black/[0.96] relative overflow-hidden flex items-center justify-center border-0 shadow-none">
                {/* 3D scene */}
                <div className="absolute inset-0 w-full h-full z-0 opacity-60">
                    <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="w-full h-full"
                    />
                </div>

                {/* Text and button layer */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                    <div className="bg-black/80 rounded-xl p-8 flex flex-col items-center max-w-xl border border-orange-500 shadow-xl">
                        <div className="flex items-center gap-2 mb-2 select-none">
                            <span className="italic font-normal text-4xl text-white">Gym</span>
                            <span className="italic font-bold text-4xl text-orange-500">Beam</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-4 tracking-tight">
                            GymBeam Clothing & Gear Store
                        </h1>
                        <p className="mt-2 text-neutral-200 max-w-lg text-center text-lg">
                            Welcome to GymBeam — your source for stylish clothing and accessories for sports and active living. Discover the best fitness, bodybuilding, and healthy lifestyle products from a brand trusted by professionals.
                        </p>
                        <p className="mt-4 text-orange-400 font-semibold text-center text-lg">
                            Elevate your performance. Express your style. <br />
                            Join the GymBeam movement today!
                        </p>
                        <button
                            onClick={() => router.push('/login')}
                            className="mt-8 px-8 py-3 bg-orange-500 text-white font-bold rounded-lg shadow hover:bg-orange-600 transition pointer-events-auto text-lg"
                        >
                            Login / Register
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
}