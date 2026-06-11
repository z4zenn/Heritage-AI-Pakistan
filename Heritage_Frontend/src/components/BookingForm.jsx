import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Shield, CreditCard, ChevronRight, CheckCircle, FileText } from 'lucide-react';
import { addEarnedStamp, getStampMotif } from '../utils/passport.js';

export default function BookingForm({ site }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Tour Details, 2: Personal Info, 3: Confirmation
  
  // Form state
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [groupSize, setGroupSize] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nationality, setNationality] = useState('Pakistani');
  const [specialReq, setSpecialReq] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('JazzCash');
  const [bookingRef] = useState(`HA-2026-${Math.floor(100000 + Math.random() * 900000)}`);

  // Passport Stamp Earning states
  const [showStampAnim, setShowStampAnim] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Earn stamp on successful registration
  useEffect(() => {
    if (step === 3 && site) {
      addEarnedStamp(site);
      setShowStampAnim(true);
      setToastMessage(`🏛️ New stamp unlocked — ${site.name}`);
      const t1 = setTimeout(() => {
        setToastMessage('');
      }, 4500);
      return () => clearTimeout(t1);
    }
  }, [step, site]);

  // Calculations
  const baseTicket = site?.unescoListed ? 800 : 500;
  const guideFeePerPerson = 1200;
  const ticketSubtotal = baseTicket * groupSize;
  const guideSubtotal = guideFeePerPerson * groupSize;
  const totalPKR = ticketSubtotal + guideSubtotal;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    }
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      alert('Please fill out all required contact fields.');
      return;
    }
    setStep(3);
  };

  return (
    <div className="w-full flex flex-col gap-8 select-none">
      
      {/* 1. Progress Stepper at top */}
      <div className="w-full max-w-2xl mx-auto flex items-center justify-between px-4">
        {[
          { label: 'Tour Details', num: 1 },
          { label: 'Personal Info', num: 2 },
          { label: 'Confirmation', num: 3 }
        ].map((s, idx) => (
          <React.Fragment key={s.num}>
            {idx > 0 && (
              <div className={`flex-1 h-1 mx-4 rounded ${step >= s.num ? 'bg-[#A0522D] dark:bg-[#D4A843]' : 'bg-stone-300 dark:bg-stone-800'}`} />
            )}
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-sans transition-all duration-300 ${
                step === s.num
                  ? 'bg-[#A0522D] dark:bg-[#D4A843] text-[#FAF6F0] dark:text-stone-900 ring-4 ring-[#A0522D]/10 dark:ring-[#D4A843]/15'
                  : step > s.num
                    ? 'bg-[#D4A843] text-[#2D1B00] dark:bg-[#FAF6F0]'
                    : 'bg-stone-300 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
              }`}>
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider font-sans ${
                step >= s.num ? 'text-[#A0522D] dark:text-[#D4A843]' : 'text-stone-500 dark:text-stone-400'
              }`}>
                {s.label}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {step !== 3 ? (
        /* Two-Column Layout for steps 1 and 2 */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Order Summary (4 cols) */}
          <div className="lg:col-span-5 bg-[#FAF6F0] dark:bg-[#1C1C1C] border border-[#A0522D]/10 dark:border-[#FAF6F0]/10 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            <h3 className="font-serif font-bold text-lg text-[#A0522D] dark:text-[#D4A843] border-b border-[#A0522D]/10 dark:border-[#FAF6F0]/10 pb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#D4A843]" />
              <span>Order Summary</span>
            </h3>

            <div className="space-y-4 text-xs font-sans text-[#2D1B00] dark:text-[#FAF6F0]">
              <div>
                <span className="text-stone-500 dark:text-stone-400 block uppercase tracking-wider text-[9px] font-bold">Destination Site</span>
                <span className="font-serif font-bold text-sm text-[#2D1B00] dark:text-[#FAF6F0]">{site?.name || 'Mughal Monument'}</span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-0.5">{site?.city}, {site?.province}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block uppercase tracking-wider text-[9px] font-bold">Travel Date</span>
                  <span className="font-bold flex items-center gap-1.5 mt-0.5"><Calendar className="w-3.5 h-3.5 text-[#A0522D] dark:text-[#D4A843]" /> {date}</span>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block uppercase tracking-wider text-[9px] font-bold">Group Size</span>
                  <span className="font-bold flex items-center gap-1.5 mt-0.5"><Users className="w-3.5 h-3.5 text-[#A0522D] dark:text-[#D4A843]" /> {groupSize} {groupSize === 1 ? 'Explorer' : 'Explorers'}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-[#A0522D]/10 dark:border-[#FAF6F0]/10 pt-4 space-y-2.5">
                <div className="flex justify-between">
                  <span className="opacity-75">Base Entry Tickets ({groupSize} × {baseTicket} PKR)</span>
                  <span>{ticketSubtotal.toLocaleString()} PKR</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Certified Heritage Guide Fee</span>
                  <span>{guideSubtotal.toLocaleString()} PKR</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#A0522D] dark:text-[#D4A843] border-t border-[#A0522D]/10 dark:border-[#FAF6F0]/10 pt-2.5">
                  <span>Total Est. Cost</span>
                  <span className="font-mono text-base">{totalPKR.toLocaleString()} PKR</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF6F0] dark:bg-[#121212] p-3 rounded-lg border border-[#D4A843]/20 dark:border-stone-800 flex items-start gap-2 text-[10px] text-[#2D1B00]/70 dark:text-[#FAF6F0]/70 leading-relaxed font-sans mt-2">
              <Shield className="w-4 h-4 text-[#D4A843] shrink-0 mt-0.5" />
              <span>Payments are processed securely. Final billing is settled at the check-in counters of the monument site.</span>
            </div>
          </div>

          {/* RIGHT: Booking Form Inputs (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF6F0] dark:bg-[#1C1C1C] border border-[#A0522D]/10 dark:border-[#FAF6F0]/10 rounded-2xl p-6 shadow-sm">
            
            {step === 1 ? (
              /* STEP 1: Tour Details Form */
              <form onSubmit={handleNextStep} className="space-y-6">
                <h3 className="font-serif font-bold text-lg text-[#2D1B00] dark:text-[#FAF6F0] border-b border-[#A0522D]/10 dark:border-[#FAF6F0]/10 pb-3">
                  Specify Tour Parameters
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="travel-date-picker" className="text-[11px] font-bold uppercase tracking-wider text-[#A0522D] dark:text-[#D4A843]">
                      Preferred Travel Date
                    </label>
                    <input
                      type="date"
                      id="travel-date-picker"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="px-4 py-3 bg-[#FAF6F0] dark:bg-[#121212] border border-[#A0522D]/20 dark:border-[#FAF6F0]/15 focus:border-[#A0522D] dark:focus:border-[#D4A843] rounded-xl font-sans text-xs text-[#2D1B00] dark:text-[#FAF6F0] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="group-size-input" className="text-[11px] font-bold uppercase tracking-wider text-[#A0522D] dark:text-[#D4A843]">
                      Group Size (Number of Persons)
                    </label>
                    <input
                      type="number"
                      id="group-size-input"
                      required
                      min={1}
                      max={40}
                      value={groupSize}
                      onChange={(e) => setGroupSize(Number(e.target.value))}
                      className="px-4 py-3 bg-[#FAF6F0] dark:bg-[#121212] border border-[#A0522D]/20 dark:border-[#FAF6F0]/15 focus:border-[#A0522D] dark:focus:border-[#D4A843] rounded-xl font-sans text-xs text-[#2D1B00] dark:text-[#FAF6F0] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#A0522D]/10 dark:border-[#FAF6F0]/10 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-[#D4A843] hover:bg-[#D4A843]/90 text-[#2D1B00] font-sans font-bold text-xs shadow-md transition-all duration-300 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed to Contact Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              /* STEP 2: Personal Info Form */
              <form onSubmit={handleConfirmBooking} className="space-y-6">
                <h3 className="font-serif font-bold text-lg text-[#2D1B00] dark:text-[#FAF6F0] border-b border-[#A0522D]/10 dark:border-[#FAF6F0]/10 pb-3">
                  Explorer Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullname-input" className="text-[11px] font-bold uppercase tracking-wider text-[#A0522D] dark:text-[#D4A843]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullname-input"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Muhammad Maizun"
                      className="px-4 py-2.5 bg-[#FAF6F0] dark:bg-[#121212] border border-[#A0522D]/20 dark:border-[#FAF6F0]/15 focus:border-[#A0522D] dark:focus:border-[#D4A843] rounded-xl font-sans text-xs text-[#2D1B00] dark:text-[#FAF6F0] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email-input" className="text-[11px] font-bold uppercase tracking-wider text-[#A0522D] dark:text-[#D4A843]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email-input"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="maizun@sahiwal.edu.pk"
                      className="px-4 py-2.5 bg-[#FAF6F0] dark:bg-[#121212] border border-[#A0522D]/20 dark:border-[#FAF6F0]/15 focus:border-[#A0522D] dark:focus:border-[#D4A843] rounded-xl font-sans text-xs text-[#2D1B00] dark:text-[#FAF6F0] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone-input" className="text-[11px] font-bold uppercase tracking-wider text-[#A0522D] dark:text-[#D4A843]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone-input"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300-1234567"
                      className="px-4 py-2.5 bg-[#FAF6F0] dark:bg-[#121212] border border-[#A0522D]/20 dark:border-[#FAF6F0]/15 focus:border-[#A0522D] dark:focus:border-[#D4A843] rounded-xl font-sans text-xs text-[#2D1B00] dark:text-[#FAF6F0] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="nationality-input" className="text-[11px] font-bold uppercase tracking-wider text-[#A0522D] dark:text-[#D4A843]">
                      Nationality
                    </label>
                    <input
                      type="text"
                      id="nationality-input"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="px-4 py-2.5 bg-[#FAF6F0] dark:bg-[#121212] border border-[#A0522D]/20 dark:border-[#FAF6F0]/15 focus:border-[#A0522D] dark:focus:border-[#D4A843] rounded-xl font-sans text-xs text-[#2D1B00] dark:text-[#FAF6F0] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Special Requirements Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="requirements-textarea" className="text-[11px] font-bold uppercase tracking-wider text-[#A0522D] dark:text-[#D4A843]">
                    Special Requirements / Accessibility Request
                  </label>
                  <textarea
                    id="requirements-textarea"
                    rows={3}
                    value={specialReq}
                    onChange={(e) => setSpecialReq(e.target.value)}
                    placeholder="Specify if wheelchair assist, audio script, or local language guide is requested..."
                    className="px-4 py-3 bg-[#FAF6F0] dark:bg-[#121212] border border-[#A0522D]/20 dark:border-[#FAF6F0]/15 focus:border-[#A0522D] dark:focus:border-[#D4A843] rounded-xl font-sans text-xs text-[#2D1B00] dark:text-[#FAF6F0] focus:outline-none resize-none"
                  />
                </div>

                {/* Payment Method Selector */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A0522D] dark:text-[#D4A843]">
                    Preferred Verification Payment
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {['JazzCash', 'EasyPaisa', 'Cash on Arrival'].map((method) => {
                      const isSel = paymentMethod === method;
                      return (
                        <div
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`cursor-pointer px-4 py-3 rounded-xl border font-sans text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-colors ${
                            isSel
                              ? 'border-[#A0522D] dark:border-[#D4A843] bg-[#A0522D]/5 dark:bg-[#D4A843]/10 text-[#A0522D] dark:text-[#D4A843]'
                              : 'border-[#A0522D]/15 dark:border-[#FAF6F0]/10 bg-[#FAF6F0] dark:bg-[#121212] text-[#2D1B00]/70 dark:text-[#FAF6F0]/70 hover:bg-[#FAF6F0]/50 dark:hover:bg-[#121212]/50'
                          }`}
                        >
                          <CreditCard className="w-3.5 h-3.5 shrink-0" />
                          <span>{method}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#A0522D]/10 dark:border-[#FAF6F0]/10 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-stone-500 dark:text-stone-400 font-bold hover:text-[#A0522D] dark:hover:text-[#D4A843] transition-colors cursor-pointer"
                  >
                    ← Back to Details
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-[#A0522D] dark:bg-[#D4A843] hover:bg-[#A0522D]/90 dark:hover:bg-[#D4A843]/90 text-[#FAF6F0] dark:text-stone-900 font-sans font-bold text-xs shadow-md transition-all duration-300 active:scale-95 cursor-pointer"
                  >
                    Confirm Heritage Booking
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      ) : (
        /* STEP 3: Success Confirmation Page */
        <div className="max-w-xl mx-auto w-full bg-[#FAF6F0] dark:bg-[#1C1C1C] p-8 border border-[#A0522D]/10 dark:border-[#FAF6F0]/10 rounded-2xl shadow-lg flex flex-col items-center text-center space-y-6 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-10 h-10" />
          </div>

          {/* Stamp Unlock Animation */}
          {showStampAnim && (
            <div className="relative w-full py-4 flex flex-col items-center justify-center overflow-hidden">
              {/* Radial glow burst element */}
              <div className="absolute w-32 h-32 rounded-full bg-[#1D9E75]/20 animate-glow-burst pointer-events-none" />
              {/* Stamp Circle Container (drops and spring rotates) */}
              <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-[#1a3a30] to-[#0f2420] border-[2.5px] border-[#1D9E75] flex items-center justify-center text-5xl shadow-[0_0_24px_rgba(29,158,117,0.3)] z-10 animate-stamp-drop">
                {getStampMotif(site.civilizationEra, site.siteType).emoji}
              </div>
              <div className="text-center mt-3.5 z-10">
                <span className="text-[10px] font-sans font-semibold text-[#1D9E75] uppercase tracking-[0.1em]">
                  Stamp Earned
                </span>
                <h4 className="font-serif font-bold text-sm text-[#2D1B00] dark:text-[#FAF6F0] leading-none mt-1">
                  {site.name}
                </h4>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h2 className="text-2xl font-serif font-bold text-[#A0522D] dark:text-[#D4A843]">
              Expedition Registered!
            </h2>
            <p className="text-xs text-[#2D1B00]/70 dark:text-[#FAF6F0]/70 font-sans leading-relaxed">
              Your tour booking request for <strong className="text-[#A0522D] dark:text-[#D4A843]">{site?.name}</strong> has been successfully registered in the HeritageAI central pipeline.
            </p>
          </div>

          {/* Detailed Receipts */}
          <div className="w-full bg-stone-100 dark:bg-stone-900 p-5 rounded-xl border border-stone-200 dark:border-stone-800 text-left text-xs font-sans space-y-3 text-[#2D1B00] dark:text-[#FAF6F0]">
            <div className="flex justify-between border-b border-stone-200/50 dark:border-stone-800/50 pb-2">
              <span className="text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wider text-[9px]">Booking Reference:</span>
              <span className="font-bold font-mono text-[#A0522D] dark:text-[#D4A843]">{bookingRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Travel Date:</span>
              <span className="font-bold">{date}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Group Size:</span>
              <span className="font-bold">{groupSize} Persons</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Contact Explorer:</span>
              <span className="font-bold">{fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-75">Settlement Method:</span>
              <span className="font-bold">{paymentMethod}</span>
            </div>
            <div className="border-t border-stone-200 dark:border-stone-800 pt-2.5 flex justify-between text-sm font-bold text-[#A0522D] dark:text-[#D4A843]">
              <span>Est. Amount Due:</span>
              <span className="font-mono">{totalPKR.toLocaleString()} PKR</span>
            </div>
          </div>

          <p className="text-[10px] text-stone-500 dark:text-stone-450 leading-normal max-w-sm">
            A check-in confirmation dispatch containing local coordinate maps has been routed to <strong>{email}</strong>. Present this booking voucher at the site ticket counter to claim entry.
          </p>

          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-full bg-[#D4A843] hover:bg-[#D4A843]/90 text-[#2D1B00] font-sans font-bold text-xs transition-all duration-300 w-full active:scale-95 shadow cursor-pointer"
          >
            Return to Home Portal
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#23282D] border-[0.5px] border-[#1D9E75] rounded-xl px-5 py-3.5 shadow-2xl flex items-center gap-3 z-50 text-left animate-quiz-slide text-xs text-[#EDE9DF]">
          <span className="text-base">🏛️</span>
          <div>
            <span className="text-[#1D9E75] font-semibold tracking-wide block uppercase text-[9px] mb-0.5">NEW STAMP UNLOCKED</span>
            <span className="font-sans font-medium">{site.name}</span>
          </div>
        </div>
      )}

    </div>
  );
}
