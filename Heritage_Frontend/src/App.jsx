import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import SiteDetail from './pages/SiteDetail';
import Recommend from './pages/Recommend';
import Book from './pages/Book';
import About from './pages/About';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F5F2ED] dark:bg-[#141618] text-[#1A1E21] dark:text-[#EDE9DF] transition-colors duration-300">
        
        {/* Sticky gold themed header */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/site/:id" element={<SiteDetail />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/book/:siteId" element={<Book />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Dark brown footer attributions */}
        <Footer />

      </div>
    </Router>
  );
}
