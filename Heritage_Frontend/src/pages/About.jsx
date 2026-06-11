import React from 'react';
import { Compass, Sparkles, Landmark, GraduationCap, Award } from 'lucide-react';

export default function About() {
  const tp   = 'text-[#1A1E21] dark:text-[#EDE9DF]';
  const tm   = 'text-[#6B6560] dark:text-[#C8B89A]';

  return (
    <div className="flex-1 w-full bg-[#F5F2ED] dark:bg-[#141618] py-16 px-6 md:px-12 select-none font-sans transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex flex-col gap-0">

        {/* ── PAGE HERO — TOP SECTION ── */}
        <div className="text-center pt-12 pb-6 flex flex-col items-center">
          <h1 className="text-4xl md:text-5.5xl font-serif font-bold text-[#1A1E21] dark:text-[#EDE9DF] tracking-tight leading-tight">
            About HeritageAI Pakistan
          </h1>
          <p 
            className="text-base sm:text-lg text-[#6B6560] dark:text-[#C8B89A] italic mt-4 max-w-[520px] mx-auto text-center" 
            style={{ fontWeight: 300 }}
          >
            Built to keep Pakistan's ancient soul alive — one archaeological site at a time.
          </p>
          {/* Thin horizontal decorative divider */}
          <div className="w-[60px] h-[1px] bg-[#1D9E75] mx-auto my-8" />
        </div>

        {/* ── SECTION 1 — HERITAGE IN NUMBERS ── */}
        <section className="py-16 grid grid-cols-1 md:grid-cols-5 gap-8 items-center max-w-4xl mx-auto w-full border-b border-[#D5CFC6]/40 dark:border-[#3D494F]/25">
          {/* Stat 1 */}
          <div className="md:col-span-1 text-center flex flex-col items-center justify-center">
            <span className="font-serif font-bold text-[56px] text-[#1A1E21] dark:text-[#EDE9DF] leading-none">9,000+</span>
            <span className="font-sans text-xs tracking-[0.1em] text-[#1D9E75] uppercase mt-2 font-medium">Years of Civilization</span>
            <span className="font-sans text-xs text-[#6B6560] dark:text-[#C8B89A] italic mt-1 font-light">From Mehrgarh to the Mughal Empire</span>
          </div>
          
          {/* Divider 1 */}
          <div className="hidden md:flex md:col-span-1 justify-center items-center">
            <div className="w-[1px] h-20 bg-[#3D494F]/35" />
          </div>

          {/* Stat 2 */}
          <div className="md:col-span-1 text-center flex flex-col items-center justify-center">
            <span className="font-serif font-bold text-[56px] text-[#1A1E21] dark:text-[#EDE9DF] leading-none">74</span>
            <span className="font-sans text-xs tracking-[0.1em] text-[#1D9E75] uppercase mt-2 font-medium">Archaeological Sites</span>
            <span className="font-sans text-xs text-[#6B6560] dark:text-[#C8B89A] italic mt-1 font-light">Mapped, documented, and bookable</span>
          </div>

          {/* Divider 2 */}
          <div className="hidden md:flex md:col-span-1 justify-center items-center">
            <div className="w-[1px] h-20 bg-[#3D494F]/35" />
          </div>

          {/* Stat 3 */}
          <div className="md:col-span-1 text-center flex flex-col items-center justify-center">
            <span className="font-serif font-bold text-[56px] text-[#1A1E21] dark:text-[#EDE9DF] leading-none">6</span>
            <span className="font-sans text-xs tracking-[0.1em] text-[#1D9E75] uppercase mt-2 font-medium">UNESCO World Sites</span>
            <span className="font-sans text-xs text-[#6B6560] dark:text-[#C8B89A] italic mt-1 font-light">Preserved for future generations</span>
          </div>
        </section>

        {/* ── SECTION 2 — OUR MANIFESTO ── */}
        <section className="relative py-20 flex flex-col items-center text-center max-w-3xl mx-auto w-full border-b border-[#D5CFC6]/40 dark:border-[#3D494F]/25 overflow-hidden">
          {/* Large faint quotation mark behind the text */}
          <span 
            className="absolute -top-6 left-6 md:left-20 font-serif text-[200px] text-[#1D9E75] opacity-[0.06] select-none pointer-events-none leading-none z-0"
            style={{ fontStyle: 'normal' }}
          >
            “
          </span>
          
          <span className="text-[11px] font-sans tracking-[0.14em] text-[#1D9E75] uppercase block mb-6 z-10 font-medium">
            OUR MISSION
          </span>
          <p className="font-serif italic text-2xl md:text-3xl text-[#1A1E21] dark:text-[#EDE9DF] leading-relaxed max-w-2xl mx-auto z-10">
            "Pakistan holds some of humanity's oldest stories. HeritageAI exists to make sure those stories are never forgotten — and always findable."
          </p>
          <p className="font-sans text-sm text-[#6B6560] dark:text-[#C8B89A] italic mt-6 font-light z-10">
            From Neolithic Mehrgarh to the Mughal forts of Lahore — we mapped it all.
          </p>
        </section>

        {/* ── SECTION 3 — WHAT WE BUILT ── */}
        <section className="py-20 flex flex-col items-center w-full border-b border-[#D5CFC6]/40 dark:border-[#3D494F]/25">
          <span className="text-[11px] font-sans tracking-[0.14em] text-[#1D9E75] uppercase block mb-3 font-medium">
            WHAT WE BUILT
          </span>
          <h2 className="text-2xl md:text-3.5xl font-serif font-bold text-[#1A1E21] dark:text-[#EDE9DF] text-center mb-12">
            Three ways to experience Pakistan's heritage
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
            {/* Card 1 - Explore */}
            <div className="bg-[#EDEAE4] dark:bg-[#23282D] border border-[#D5CFC6] dark:border-[#3D494F] p-9 rounded-[20px] flex flex-col gap-4 text-left hover:-translate-y-1 hover:border-[#1D9E75] hover:shadow-[0_8px_32px_rgba(29,158,117,0.12)] transition-all duration-250 ease-out group">
              <div className="w-12 h-12 rounded-full bg-[#1D9E75]/10 text-[#1D9E75] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform duration-300">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1A1E21] dark:text-[#EDE9DF]">Explore Sites</h3>
              <p className="text-xs sm:text-sm text-[#6B6560] dark:text-[#C8B89A] leading-relaxed font-light">
                Browse 74 heritage sites filtered by era, region, and civilization. Every site documented with historical context and visitor details.
              </p>
            </div>

            {/* Card 2 - Discover */}
            <div className="bg-[#EDEAE4] dark:bg-[#23282D] border border-[#D5CFC6] dark:border-[#3D494F] p-9 rounded-[20px] flex flex-col gap-4 text-left hover:-translate-y-1 hover:border-[#1D9E75] hover:shadow-[0_8px_32px_rgba(29,158,117,0.12)] transition-all duration-250 ease-out group">
              <div className="w-12 h-12 rounded-full bg-[#1D9E75]/10 text-[#1D9E75] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1A1E21] dark:text-[#EDE9DF]">AI Recommendations</h3>
              <p className="text-xs sm:text-sm text-[#6B6560] dark:text-[#C8B89A] leading-relaxed font-light">
                Tell us what moves you — ancient forts, Sufi shrines, lost cities — and our engine builds your perfect heritage trail.
              </p>
            </div>

            {/* Card 3 - Book */}
            <div className="bg-[#EDEAE4] dark:bg-[#23282D] border border-[#D5CFC6] dark:border-[#3D494F] p-9 rounded-[20px] flex flex-col gap-4 text-left hover:-translate-y-1 hover:border-[#1D9E75] hover:shadow-[0_8px_32px_rgba(29,158,117,0.12)] transition-all duration-250 ease-out group">
              <div className="w-12 h-12 rounded-full bg-[#1D9E75]/10 text-[#1D9E75] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform duration-300">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1A1E21] dark:text-[#EDE9DF]">Book a Tour</h3>
              <p className="text-xs sm:text-sm text-[#6B6560] dark:text-[#C8B89A] leading-relaxed font-light">
                Reserve your visit in minutes. Custom itineraries, group options, and guided experiences across Pakistan.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 4 — THE TEAM ── */}
        <section className="py-20 flex flex-col items-center w-full">
          <span className="text-[11px] font-sans tracking-[0.14em] text-[#1D9E75] uppercase block mb-3 font-medium">
            THE PEOPLE BEHIND IT
          </span>
          <h2 className="text-2xl md:text-3.5xl font-serif font-bold text-[#1A1E21] dark:text-[#EDE9DF] text-center mb-1">
            Expedition Project Team
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6560] dark:text-[#C8B89A] font-sans text-center mb-12" style={{ fontWeight: 300 }}>
            University of Sahiwal · Computer Science Department
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-stretch max-w-2xl mx-auto w-full mt-4">
            
            {/* Team Member 1 */}
            <div className="flex-1 max-w-[300px] bg-[#EDEAE4] dark:bg-[#23282D] border border-[#D5CFC6] dark:border-[#3D494F] rounded-[20px] p-10 flex flex-col items-center text-center hover:-translate-y-[3px] hover:border-[#1D9E75]/70 hover:shadow-[0_4px_20px_rgba(29,158,117,0.06)] transition-all duration-300">
              {/* Photo placeholder circle */}
              <div className="w-[96px] h-[96px] rounded-full bg-[#3D494F] border-2 border-[#1D9E75] flex flex-col items-center justify-center shrink-0">
                <GraduationCap className="w-8 h-8 text-[#EDE9DF]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1A1E21] dark:text-[#EDE9DF] mt-5 leading-tight">
                Muhammad Maizun
              </h3>
              <span className="px-3 py-0.5 rounded-full bg-[#1D9E75]/10 text-[#1D9E75] font-sans text-[10px] tracking-[0.08em] uppercase mt-2 font-medium inline-block">
                Lead Developer
              </span>
              <p className="text-xs text-[#6B6560] dark:text-[#C8B89A] font-sans leading-relaxed mt-4 font-light whitespace-pre-line">
                BSCS Final Year Student{"\n"}(2022–2026){"\n"}University of Sahiwal
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="flex-1 max-w-[300px] bg-[#EDEAE4] dark:bg-[#23282D] border border-[#D5CFC6] dark:border-[#3D494F] rounded-[20px] p-10 flex flex-col items-center text-center hover:-translate-y-[3px] hover:border-[#1D9E75]/70 hover:shadow-[0_4px_20px_rgba(29,158,117,0.06)] transition-all duration-300">
              {/* Photo placeholder circle */}
              <div className="w-[96px] h-[96px] rounded-full bg-[#3D494F] border-2 border-[#1D9E75] flex flex-col items-center justify-center shrink-0">
                <Award className="w-8 h-8 text-[#EDE9DF]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1A1E21] dark:text-[#EDE9DF] mt-5 leading-tight">
                Hina Mehmood
              </h3>
              <span className="px-3 py-0.5 rounded-full bg-[#1D9E75]/10 text-[#1D9E75] font-sans text-[10px] tracking-[0.08em] uppercase mt-2 font-medium inline-block">
                Project Supervisor
              </span>
              <p className="text-xs text-[#6B6560] dark:text-[#C8B89A] font-sans leading-relaxed mt-4 font-light whitespace-pre-line">
                Lecturer{"\n"}Computer Science Dept{"\n"}University of Sahiwal
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
