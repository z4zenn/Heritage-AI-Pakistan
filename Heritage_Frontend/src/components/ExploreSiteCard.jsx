import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Crown, Landmark, ArrowRight } from 'lucide-react';

export default function ExploreSiteCard({
  id,
  name,
  city,
  province,
  civilizationEra,
  siteType,
  unescoListed,
  period,
  satisfactionRating
}) {
  return (
    <div className="bg-[#F5F2ED] dark:bg-[#23282D] rounded-2xl border border-[#D5CFC6] dark:border-[#3D494F] overflow-hidden shadow-sm hover:shadow-[0_12px_24px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_12px_24px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      
      {/* Placeholder Image - Taller height */}
      <div className="relative h-64 w-full bg-[#EDEAE4] dark:bg-[#3D494F]/40 border-b border-[#D5CFC6]/50 dark:border-[#3D494F]/35 flex flex-col items-center justify-center text-[#6B6560] dark:text-[#C8B89A]/60 gap-1.5 select-none p-4">
        <div className="w-12 h-12 rounded-full bg-[#D5CFC6] dark:bg-[#3D494F]/60 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-500">
          <Landmark className="w-6 h-6 text-[#6B6560] dark:text-[#C8B89A]" />
        </div>
        <span className="text-xs font-mono font-semibold tracking-wider text-[#6B6560] dark:text-[#C8B89A]/60 uppercase">
          [ Image Placeholder ]
        </span>
        <span className="text-[10px] font-sans text-[#6B6560]/70 dark:text-[#C8B89A]/40">
          {siteType} · {city}
        </span>

        {/* UNESCO badge - Minimal pill layout */}
        {unescoListed && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1D9E75]/10 text-[#1D9E75] border border-[#1D9E75]/35 text-[9px] font-sans uppercase tracking-widest" style={{fontWeight: 500}}>
              <Crown className="w-2.5 h-2.5 fill-[#1D9E75] text-[#1D9E75]" />
              <span>UNESCO</span>
            </span>
          </div>
        )}
      </div>

      {/* Metadata & Content - Increased padding */}
      <div className="flex-1 p-7 flex flex-col justify-between gap-5">
        <div className="space-y-3.5">
          {/* Province & Ratings Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Small Ghost Province Pill */}
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans tracking-wider uppercase border border-[#6B6560]/30 dark:border-[#C8B89A]/20 text-[#6B6560] dark:text-[#C8B89A]/80 font-normal">
              {province}
            </span>
            {/* Inline smaller star rating */}
            <span className="inline-flex items-center gap-1 text-[11px] font-sans text-[#6B6560]/80 dark:text-[#C8B89A]/80">
              <Star className="w-3 h-3 text-[#1D9E75] fill-[#1D9E75]" />
              <span>{satisfactionRating}</span>
            </span>
          </div>

          {/* Title - Large Libre Baskerville bold */}
          <h3 className="font-serif font-bold text-xl text-[#1A1E21] dark:text-[#EDE9DF] group-hover:text-[#1D9E75] transition-colors leading-tight">
            {name}
          </h3>

          {/* Era & Period - Softer with a thin divider line above */}
          <div className="pt-3 border-t border-[#D5CFC6]/30 dark:border-[#3D494F]/30 space-y-1">
            <div className="text-[11px] font-sans text-[#6B6560]/85 dark:text-[#C8B89A]/75 flex items-center gap-1.5">
              <span className="font-light tracking-wide text-[9px] uppercase text-[#6B6560]/60 dark:text-[#C8B89A]/50">Era:</span>
              <span className="font-medium text-[#1A1E21] dark:text-[#EDE9DF]">{civilizationEra}</span>
            </div>
            <div className="text-[11px] font-sans text-[#6B6560]/85 dark:text-[#C8B89A]/75 flex items-center gap-1.5">
              <span className="font-light tracking-wide text-[9px] uppercase text-[#6B6560]/60 dark:text-[#C8B89A]/50">Period:</span>
              <span className="font-medium text-[#1A1E21] dark:text-[#EDE9DF] truncate max-w-[200px]">{period}</span>
            </div>
          </div>
        </div>

        {/* CTA - Ghost Button sitting quietly at bottom */}
        <div className="pt-2">
          <Link
            to={`/site/${id}`}
            className="w-full py-2.5 rounded-[10px] border border-[#D5CFC6] dark:border-[#3D494F] hover:border-[#1D9E75] text-[#6B6560] dark:text-[#C8B89A] hover:text-[#1D9E75] bg-transparent font-sans text-xs transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
            style={{fontWeight: 400}}
          >
            <span>Explore Heritage Engine</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-current" />
          </Link>
        </div>
      </div>
    </div>
  );
}
