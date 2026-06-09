import React from 'react';
import { Landmark, Brain, Database, Cpu, BookOpen, GraduationCap, Award } from 'lucide-react';

const tp   = 'text-[#1A1E21] dark:text-[#EDE9DF]';
const tm   = 'text-[#6B6560] dark:text-[#C8B89A]';
const surf = 'bg-[#EDEAE4] dark:bg-[#23282D]';
const bdr  = 'border-[#D5CFC6] dark:border-[#3D494F]';

export default function About() {
  return (
    <div className="flex-1 w-full bg-[#F5F2ED] dark:bg-[#141618] py-10 px-6 select-none font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Title */}
        <div className="text-center space-y-3">
          <span className="text-xs font-sans uppercase text-[#1D9E75]" style={{fontWeight: 500, letterSpacing: '0.08em'}}>Academic Portfolio</span>
          <h1 className={`text-3xl md:text-5xl font-serif font-bold ${tp} tracking-tight`}>
            About HeritageAI Pakistan
          </h1>
          <p className={`text-xs ${tm} max-w-md mx-auto`}>
            An intelligent retrieval project bridging South Asian history and modern machine learning frameworks.
          </p>
          <div className="w-24 h-0.5 bg-[#1D9E75] mx-auto mt-2" />
        </div>

        {/* 1. Mission */}
        <section className={`${surf} p-6 md:p-8 rounded-2xl border ${bdr} shadow-sm text-center space-y-4`}>
          <div className="w-12 h-12 rounded-full bg-[#1D9E75]/10 flex items-center justify-center text-[#1D9E75] mx-auto">
            <Landmark className="w-6 h-6" />
          </div>
          <h2 className={`font-serif font-bold text-xl ${tp}`}>Our Core Mission</h2>
          <p className={`text-xs md:text-sm ${tp} opacity-85 max-w-2xl mx-auto leading-relaxed`}>
            "To digitalize, preserve, and intelligently index Pakistan's 74 key archaeological nodes. We aim to render South Asian heritage accessible, educational, and easily bookable for global explorers, scholars, and future generations."
          </p>
        </section>

        {/* 2. AI Pipeline */}
        <section className="space-y-6">
          <div className="text-center space-y-1.5">
            <h2 className={`font-serif font-bold text-2xl ${tp}`}>AI Match Pipeline</h2>
            <p className={`text-xs ${tm}`}>Under the hood of the semantic heritage recommendation engine</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { Icon: Brain,    title: '1. Vector Embeddings',  desc: 'When you specify interests, our transformer models convert natural text queries into high-dimensional vector embeddings, mapping user intent semantically.' },
              { Icon: Database, title: '2. Pinecone DB Search',  desc: 'We store the historical archives of 74 Pakistan heritage sites in a Pinecone vector database, enabling instant cosine-similarity matching in sub-milliseconds.' },
              { Icon: Cpu,      title: '3. Dynamic Scoring',    desc: 'The matched results are scored, filtered by regional bounds, and ranked to present the top 6 heritage recommendations containing high satisfaction indexes.' }
            ].map(({ Icon, title, desc }) => (
              <div key={title} className={`${surf} p-5 border ${bdr} rounded-2xl flex flex-col gap-3`}>
                <div className="w-10 h-10 rounded-full bg-[#1D9E75]/15 text-[#1D9E75] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className={`font-serif font-bold text-base ${tp}`}>{title}</h3>
                <p className={`text-xs ${tm} leading-relaxed`}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Team */}
        <section className="space-y-6">
          <div className="text-center space-y-1.5">
            <h2 className={`font-serif font-bold text-2xl ${tp}`}>Expedition Project Team</h2>
            <p className={`text-xs ${tm}`}>University of Sahiwal · Computer Science Department</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {[
              { Icon: GraduationCap, name: 'Muhammad Maizun', role: 'Lead Developer',     detail: 'BSCS Final Year Student (2022–2026)\nUniversity of Sahiwal' },
              { Icon: Award,         name: 'Hina Mehmood',    role: 'Project Supervisor', detail: 'Lecturer, Computer Science Dept\nUniversity of Sahiwal' }
            ].map(({ Icon, name, role, detail }) => (
              <div key={name} className={`${surf} border ${bdr} rounded-2xl overflow-hidden shadow-sm flex flex-col items-center p-6 text-center space-y-4`}>
                <div className={`w-24 h-24 rounded-full bg-[#D5CFC6] dark:bg-[#3D494F]/50 flex flex-col items-center justify-center border ${bdr}`}>
                  <Icon className="w-8 h-8 text-[#6B6560] dark:text-[#C8B89A]" />
                  <span className={`text-[9px] font-mono mt-1 ${tm} opacity-60`}>[ Photo ]</span>
                </div>
                <div>
                  <h3 className={`font-serif font-bold text-base ${tp}`}>{name}</h3>
                  <span className="text-[10px] font-sans uppercase text-[#1D9E75] block mt-0.5" style={{fontWeight: 500, letterSpacing: '0.08em'}}>{role}</span>
                  <p className={`text-xs ${tm} font-sans mt-2 leading-relaxed whitespace-pre-line`}>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Research Paper */}
        <section className={`${surf} p-6 rounded-2xl border ${bdr} flex flex-col md:flex-row items-center gap-6`}>
          <div className="w-12 h-12 rounded-full bg-[#1D9E75]/15 text-[#1D9E75] flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1 text-center md:text-left">
            <h4 className={`font-serif font-bold text-sm ${tp}`}>Research Publication Reference</h4>
            <p className={`text-xs ${tm} font-sans leading-relaxed`}>
              Our implementation methodology is referenced in the research paper: <br />
              <strong className={tp}>"Semantic Information Retrieval and Vector Search Database Indexing of South Asian Historical Monuments"</strong> (2026).
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
