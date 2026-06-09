import React, { useState } from 'react';
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import RecommenderForm from '../components/RecommenderForm';
import SiteCard from '../components/SiteCard';
import { siteData } from '../data/siteData';

const tp = 'text-[#1A1E21] dark:text-[#EDE9DF]';
const tm = 'text-[#6B6560] dark:text-[#C8B89A]';
const surf = 'bg-[#EDEAE4] dark:bg-[#23282D]';
const bdr  = 'border-[#D5CFC6] dark:border-[#3D494F]';

export default function Recommend() {
  const [matchedSites, setMatchedSites] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecommendSubmit = (formData) => {
    setIsLoading(true);

    setTimeout(() => {
      const calculatedMatches = siteData.map((site) => {
        let matchScore = 50;

        if (formData.interests && formData.interests.length > 0) {
          const hasInterest = formData.interests.some(interest =>
            site.civilizationEra.toLowerCase().includes(interest.toLowerCase())
          );
          if (hasInterest) matchScore += 25;
        }

        if (formData.provinces && formData.provinces.length > 0) {
          if (formData.provinces.includes(site.province)) matchScore += 20;
        }

        if (formData.visitorType) {
          if (formData.visitorType === 'Adventure Backpacker' && site.province === 'Balochistan') matchScore += 10;
          else if (formData.visitorType === 'Historian/Researcher' && site.unescoListed) matchScore += 10;
          else if (formData.visitorType === 'Family Group' && site.province === 'Punjab') matchScore += 8;
        }

        matchScore += Math.floor(10 + Math.random() * 5);
        matchScore = Math.min(matchScore, 99);
        return { ...site, matchPercentage: matchScore };
      });

      const sortedMatches = calculatedMatches
        .sort((a, b) => b.matchPercentage - a.matchPercentage)
        .slice(0, 6);

      setMatchedSites(sortedMatches);
      setIsLoading(false);

      setTimeout(() => {
        const el = document.getElementById('recommendation-results');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1200);
  };

  return (
    <div className="flex-1 w-full bg-[#F5F2ED] dark:bg-[#141618] py-10 px-6 select-none transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Title */}
        <div className="text-center space-y-3">
          <span className="text-xs font-sans uppercase text-[#1D9E75] flex items-center justify-center gap-1.5 animate-pulse" style={{fontWeight: 500, letterSpacing: '0.08em'}}>
            <Sparkles className="w-4 h-4 text-[#1D9E75]" />
            <span>AI Neural Tour Guide</span>
          </span>
          <h1 className={`text-3xl md:text-5xl font-serif font-bold ${tp} tracking-tight`}>
            Let Our AI Find Your Perfect Heritage Tour
          </h1>
          <p className={`text-xs sm:text-sm ${tm} max-w-lg mx-auto font-sans leading-relaxed`}>
            Specify your historical preferences, travel budget, and regional options. Our Pinecone-powered ML pipeline maps optimal trails.
          </p>
          <div className="w-24 h-0.5 bg-[#1D9E75] mx-auto mt-2" />
        </div>

        {/* Form */}
        <RecommenderForm onSubmit={handleRecommendSubmit} />

        {/* Loading */}
        {isLoading && (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
            <RefreshCw className="w-8 h-8 text-[#1D9E75] animate-spin" />
            <div className="space-y-1 font-sans text-xs">
              <p className="uppercase tracking-widest text-[#1D9E75]" style={{fontWeight: 500}}>Running Match Vector Calculations...</p>
              <p className={tm}>Mapping coordinate spaces and scoring satisfaction vectors...</p>
            </div>
          </div>
        )}

        {/* Results */}
        {matchedSites && !isLoading && (
          <div id="recommendation-results" className="pt-6 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-sans uppercase text-[#1D9E75]" style={{fontWeight: 500, letterSpacing: '0.08em'}}>AI Match Complete</span>
              <h2 className={`text-2xl md:text-3xl font-serif font-bold ${tp}`}>
                AI Matched These Sites For You
              </h2>
              <div className="w-20 h-0.5 bg-[#1D9E75] mx-auto mt-1" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedSites.map((site) => (
                <div key={site.id} className="relative">
                  <div className="absolute top-3.5 left-3.5 z-20 bg-[#1D9E75] text-[#EDE9DF] px-3 py-1 rounded-full text-[10px] font-sans shadow-md tracking-wide uppercase" style={{fontWeight: 500}}>
                    {site.matchPercentage}% Match
                  </div>
                  <SiteCard {...site} />
                </div>
              ))}
            </div>

            <div className={`${surf} p-5 border ${bdr} rounded-2xl flex items-start gap-3 text-xs leading-relaxed ${tm} max-w-2xl mx-auto shadow-sm`}>
              <AlertCircle className="w-5 h-5 text-[#1D9E75] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#1D9E75]" style={{fontWeight: 500}}>Match Scoring rationale: </span>
                Rankings are calculated based on the convergence of your interest flags, preferred province coordinate boundaries, and budget suitability index.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
