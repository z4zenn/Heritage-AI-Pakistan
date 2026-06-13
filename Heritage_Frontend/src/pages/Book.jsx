import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { siteData } from '../data/siteData';
import { api } from '../services/api';

export default function Book() {
  const { siteId } = useParams();
  const [site, setSite] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSite = async () => {
      try {
        setIsLoading(true);
        const data = await api.fetchSiteById(siteId);
        setSite(data);
      } catch (err) {
        console.error("Failed to fetch site details for booking:", err);
        const fallback = siteData.find(s => s.id === siteId) || siteData.find(s => s.id === 'lahore-fort') || siteData[0];
        setSite(fallback);
      } finally {
        setIsLoading(false);
      }
    };
    loadSite();
  }, [siteId]);

  if (isLoading || !site) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-[#FAF6F0] dark:bg-[#121212] text-[#2D1B00] dark:text-[#FAF6F0]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#A0522D] dark:border-[#D4A843] border-t-transparent rounded-full animate-spin" />
          <p className="font-sans text-xs font-light text-stone-500 dark:text-stone-400 tracking-wider uppercase text-center">Retrieving destination details...</p>
        </div>
      </div>
    );
  }

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

