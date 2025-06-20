'use client';

import AbasSimplex from "@/components/UI/AbasSimplex";

export default function Home() {
    return (
        <div className="h-screen flex dark:bg-black items-start w-full p-6 bg-slate-50">
            <div className={'w-full'}>
                <AbasSimplex/>
            </div>
        </div>
    );
}
