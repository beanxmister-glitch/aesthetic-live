import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#E6DCCF] opacity-20 transform -skew-y-6"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-serif text-[#4A3B35] mb-6 tracking-tight">
            Akari Sculptures
          </h1>
          <p className="text-xl md:text-2xl text-[#7A6A63] mb-10 font-light italic">
            Handcrafted light for modern spaces.
          </p>
          <Link href="/product/1" className="bg-[#4A3B35] text-[#FDFBF7] px-10 py-4 rounded-full text-lg hover:bg-[#6D5950] transition-colors duration-300">
            Discover Collection
          </Link>
        </div>
      </section>
    </main>
  );
}
