import React, { useState, useEffect } from "react";
import { MediaCategory } from "../types";
import { Send, CheckCircle, AlertOctagon, Heart, MapPin, Calendar, Mail, User } from "lucide-react";

interface BookingProps {
  selectedPackage: string;
  onBookingSuccess: () => void;
}

export const GlitchBooking: React.FC<BookingProps> = ({ selectedPackage, onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    sectorEmail: "",
    commLink: "",
    eventDate: "",
    eventType: MediaCategory.WEDDINGS,
    coordinateVenue: "",
    packageTier: selectedPackage || "ESSENTIAL",
    message: ""
  });

  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        packageTier: selectedPackage
      }));
    }
  }, [selectedPackage]);

  const [txReceipt, setTxReceipt] = useState<{
    id: string;
    ledgerHash: string;
    clientName: string;
    timestamp: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientName: formData.clientName,
          sectorEmail: formData.sectorEmail,
          commLink: formData.commLink,
          eventDate: formData.eventDate,
          eventType: formData.eventType,
          coordinateVenue: formData.coordinateVenue,
          packageTier: formData.packageTier,
          message: formData.message
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Input state incomplete. Commence re-entry.");
      }

      setTxReceipt({
        id: data.booking.id,
        ledgerHash: data.booking.ledgerHash,
        clientName: data.booking.clientName,
        timestamp: data.booking.timestamp
      });

      // Clear form
      setFormData({
        clientName: "",
        sectorEmail: "",
        commLink: "",
        eventDate: "",
        eventType: MediaCategory.WEDDINGS,
        coordinateVenue: "",
        packageTier: "ESSENTIAL",
        message: ""
      });

      onBookingSuccess();
    } catch (err: any) {
      console.error("Booking write fault:", err);
      setErrorText(err.message || "Central host refused booking connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="sector-booking" className="relative py-24 bg-transparent">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] font-semibold text-[#C9A66B] uppercase mb-3 block">
            SECURE YOUR CELEBRATION
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white uppercase leading-tight font-extrabold tracking-tight">
            BOOK OUR CREATIVE SERVICES
          </h2>
          <p className="font-sans text-xs text-neutral-400 max-w-lg mx-auto leading-relaxed mt-3 font-light">
            Register your celebration coordinates to reserve the artistic directors of Shutter Stories for your timeline.
          </p>
        </div>

        {/* Display transaction receipt block */}
        {txReceipt ? (
          <div className="bg-[#1A1A1A] border border-[#C9A66B] p-8 sm:p-12 text-center text-white max-w-xl mx-auto shadow-xl rounded-lg">
            <CheckCircle className="mx-auto mb-5 text-[#C9A66B] animate-pulse" size={44} />
            
            <h3 className="font-serif text-xl tracking-wider text-white uppercase mb-2 font-bold">DATE ENCRYPTED & RESERVED</h3>
            <p className="text-xs text-neutral-400 uppercase tracking-widest max-w-md mx-auto mb-8 leading-relaxed font-light">
              We have securely authenticated your registration into our global timeline directories. An editorial manager will reach out shortly.
            </p>

            <div className="text-left bg-[#131313] p-5 border border-[rgba(201,166,107,0.15)] text-xs space-y-3.5 uppercase font-sans font-medium tracking-wider text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-400">REGISTRATION SPEC_ID:</span>
                <span className="text-white font-bold">{txReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">DIGITAL TIMELINE HASH:</span>
                <span className="text-[#C9A66B] font-bold">{txReceipt.ledgerHash}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">CLIENTS REGISTERED:</span>
                <span className="text-white font-bold">{txReceipt.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">STABILIZED STAMP:</span>
                <span className="text-white text-[10px] font-bold">{new Date(txReceipt.timestamp).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setTxReceipt(null)}
              className="mt-8 px-8 py-3 bg-[#C9A66B] text-white font-sans text-xs uppercase tracking-[0.15em] font-bold hover:bg-[#B89058] transition-all cursor-pointer rounded"
            >
              REGISTER ANOTHER DATE
            </button>
          </div>
        ) : (
          <form 
            onSubmit={handleFormSubmit}
            className="bg-[#1A1A1A] border border-[rgba(201,166,107,0.15)] p-8 sm:p-12 shadow-md space-y-8 rounded-lg"
          >
            {/* Warning notification */}
            {errorText && (
              <div className="p-4 bg-red-950/40 border border-red-800/60 text-red-200 font-sans text-xs flex items-center gap-3 rounded">
                <AlertOctagon size={16} className="shrink-0 text-red-500" />
                <span>Verification error: {errorText}. Please review fields.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 uppercase font-sans text-[11px] tracking-widest font-bold">
              
              {/* Clients Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[#C9A66B] tracking-[0.15em] font-bold">GUEST(S) OF HONOR / NAMES *</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A66B]" />
                  <input 
                    type="text" 
                    name="clientName"
                    required
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="w-full bg-[#121212] border border-[rgba(201,166,107,0.25)] p-3.5 pl-10 text-white placeholder-neutral-500 focus:border-[#C9A66B] focus:outline-none transition-all font-sans text-xs uppercase font-medium rounded"
                    placeholder="Lilly & Julian"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[#C9A66B] tracking-[0.15em] font-bold">EMAIL CORRESPONDENCE *</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A66B]" />
                  <input 
                    type="email" 
                    name="sectorEmail"
                    required
                    value={formData.sectorEmail}
                    onChange={handleInputChange}
                    className="w-full bg-[#121212] border border-[rgba(201,166,107,0.25)] p-3.5 pl-10 text-white placeholder-neutral-500 focus:border-[#C9A66B] focus:outline-none transition-all font-sans text-xs font-medium rounded animate-none"
                    placeholder="lilly@celebration.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-[#C9A66B] tracking-[0.15em] font-bold">CONTACT PHONE LINK</label>
                <input 
                  type="text" 
                  name="commLink"
                  value={formData.commLink}
                  onChange={handleInputChange}
                  className="w-full bg-[#121212] border border-[rgba(201,166,107,0.25)] p-3.5 text-white placeholder-neutral-500 focus:border-[#C9A66B] focus:outline-none transition-all font-sans text-xs uppercase font-medium rounded"
                  placeholder="+1 (555) 798-2026"
                />
              </div>

              {/* Event Date */}
              <div className="flex flex-col gap-2">
                <label className="text-[#C9A66B] tracking-[0.15em] font-bold">CELEBRATION DATE *</label>
                <div className="relative">
                  <input 
                    type="date" 
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full bg-[#121212] border border-[rgba(201,166,107,0.25)] p-3.5 text-white focus:border-[#C9A66B] focus:outline-none transition-all font-sans text-xs text-center font-bold rounded"
                  />
                </div>
              </div>

              {/* Event Type */}
              <div className="flex flex-col gap-2">
                <label className="text-[#C9A66B] tracking-[0.15em] font-bold">COLLECTION COVERAGE TYPE *</label>
                <select 
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full bg-[#121212] border border-[rgba(201,166,107,0.25)] p-3.5 text-white focus:border-[#C9A66B] focus:outline-none transition-all font-sans text-xs uppercase font-bold cursor-pointer rounded"
                >
                  <option value={MediaCategory.WEDDINGS} className="bg-[#1A1A1A] text-white">STRIKING WEDDINGS</option>
                  <option value={MediaCategory.ENGAGEMENTS} className="bg-[#1A1A1A] text-white">EDITORIAL ENGAGEMENTS</option>
                  <option value={MediaCategory.DESTINATIONS} className="bg-[#1A1A1A] text-white">ELITE DESTINATION SPECIALS</option>
                  <option value={MediaCategory.FASHION} className="bg-[#1A1A1A] text-white">FINE ART FASHION COOP</option>
                  <option value={MediaCategory.EVENTS} className="bg-[#1A1A1A] text-white">EXCLUSIVE CELEBRATION EVENTS</option>
                </select>
              </div>

              {/* Package SPEC */}
              <div className="flex flex-col gap-2">
                <label className="text-[#C9A66B] tracking-[0.15em] font-bold">COLLECTION SPEC Tier *</label>
                <select 
                  name="packageTier"
                  value={formData.packageTier}
                  onChange={handleInputChange}
                  className="w-full bg-[#121212] border border-[rgba(201,166,107,0.25)] p-3.5 text-white focus:border-[#C9A66B] focus:outline-none transition-all font-sans text-xs uppercase font-bold cursor-pointer rounded"
                >
                  <option value="ESSENTIAL" className="bg-[#1A1A1A] text-white">ESSENTIAL COLLECTION ($2,999)</option>
                  <option value="SIGNATURE" className="bg-[#1A1A1A] text-white">SIGNATURE COLLECTION ($5,499)</option>
                  <option value="ROYAL" className="bg-[#1A1A1A] text-white">ROYAL COLLECTION ($9,999)</option>
                </select>
              </div>

              {/* Venue Coordinates */}
              <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                <label className="text-[#C9A66B] tracking-[0.15em] font-bold">CELEBRATION VENUE / PHYSICAL LOCATION</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A66B]" />
                  <input 
                    type="text" 
                    name="coordinateVenue"
                    value={formData.coordinateVenue}
                    onChange={handleInputChange}
                    className="w-full bg-[#121212] border border-[rgba(201,166,107,0.25)] p-3.5 pl-10 text-white placeholder-neutral-500 focus:border-[#C9A66B] focus:outline-none transition-all font-sans text-xs uppercase font-medium rounded"
                    placeholder="E.G. Villa Balbiano, Lake Como, Italy"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
                <label className="text-[#C9A66B] tracking-[0.15em] font-bold">TELL US ABOUT YOUR CELEBRATION / INSTRUCTIONS</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-[#121212] border border-[rgba(201,166,107,0.25)] p-3.5 text-white placeholder-neutral-500 focus:border-[#C9A66B] focus:outline-none transition-all font-sans text-xs uppercase h-28 font-medium rounded"
                  placeholder="Share details of your timeline, aesthetic aspirations, or questions..."
                />
              </div>

            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#C9A66B] text-white font-sans text-xs tracking-[0.2em] font-bold uppercase hover:bg-[#B89058] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-md rounded"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-dashed border-white rounded-full animate-spin" />
                  <span>TRANSMITTING DIRECTORY PACKETS...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>REGISTER TIMELINE DETAILS</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
