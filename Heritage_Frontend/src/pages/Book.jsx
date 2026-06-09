import React from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { siteData } from '../data/siteData';

export default function Book() {
  const { siteId } = useParams();

  // Find site
  const site = siteDatabase[siteId] || siteDatabase['lahore-fort'];

  return (
    <div className="flex-1 w-full bg-[#FAF6F0] dark:bg-[#121212] py-10 px-6 select-none transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Title */}
        <div className="border-b border-[#A0522D]/10 dark:border-[#FAF6F0]/10 pb-6 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A0522D] dark:text-[#D4A843]">Expedition Secure Checkout</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2D1B00] dark:text-[#FAF6F0] mt-1">
            Book Your Heritage Tour
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-sans mt-1">
            Finalize parameters, assign local guides, and secure confirmation tickets.
          </p>
        </div>

        {/* Modular Wizard Booking Form */}
        <BookingForm site={site} />

      </div>
    </div>
  );
}

// Custom internal database mapper
const siteDatabase = siteData.reduce((acc, current) => {
  acc[current.id] = current;
  return acc;
}, {});
