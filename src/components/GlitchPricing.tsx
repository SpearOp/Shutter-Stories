import React from "react";
import { Check, X, Shield, Camera, Award } from "lucide-react";

interface Package {
  name: string;
  price: string;
  badge: string;
  icon: React.ReactNode;
  desc: string;
  features: string[];
}

interface PricingProps {
  onSelectPackage: (pName: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const GlitchPricing: React.FC<PricingProps> = ({ onSelectPackage, onNavigate }) => {
  const packages: Package[] = [
    {
      name: "ESSENTIAL",
      price: "$2,999",
      badge: "STABLE ESSENCE",
      icon: <Shield size={18} className="text-luxury-gold" />,
      desc: "Prismatic photographic and cinematic highlights carefully composed. Perfect for intimate or micro celebrations.",
      features: [
        "1 Senior Photography Specialist",
        "6 Hours of Continuous Photographic Coverage",
        "300 Fully Edited High-Resolution Prints",
        "Private Online Cinematic Digital Gallery",
        "Lifetime Cloud Preservation Guarantee",
        "Digital Print Rights Release Included"
      ]
    },
    {
      name: "SIGNATURE",
      price: "$5,499",
      badge: "THE GRAND COVENANT",
      icon: <Camera size={18} className="text-luxury-gold" />,
      desc: "Our highly sought-after comprehensive coverage, capturing every raw, emotional highlight with dual cameras.",
      features: [
        "2 Senior Specialists (Photo & Cinematic)",
        "10 Hours of Continuous Coverage",
        "600 Fully Edited High-Resolution Prints",
        "15-Minute Cinematic Highlight Movie",
        "1 Classic Hand-Sewn Leather Wedding Album",
        "Complimentary Pre-Wedding Consultation Session",
        "Digital & Print Rights Archive"
      ]
    },
    {
      name: "ROYAL",
      price: "$9,999",
      badge: "THE HEIRLOOM COLLECTION",
      icon: <Award size={18} className="text-luxury-gold" />,
      desc: "The ultimate destination and weekend experience. Comprehensive narrative structure. Complete artistic commitment.",
      features: [
        "Primary Creative Director & 2 Specialists",
        "Unlimited Event Coverage (Full Weekend Setup)",
        "1000+ Uncompressed Ultra-High-Def Prints",
        "40-Minute Cinematic Wedding Feature Film",
        "Pre & Post-Wedding Celebration Coverage",
        "2 Handcrafted Bespoke Keepsake Photo Books",
        "Full Aerial / Drone Cinematic Highlights",
        "VIP Fast-Track 14-Day Delivery Frame"
      ]
    }
  ];

  const handleBookNow = (pName: string) => {
    onSelectPackage(pName);
    onNavigate("sector-booking");
  };

  return (
    <section id="sector-pricing" className="relative py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Module Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-xs tracking-[0.3em] font-semibold text-[#C9A66B] uppercase mb-3 block">
              INVESTMENTS & SELECTIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white uppercase leading-tight font-extrabold tracking-tight">
              OUR INVESTMENTS & COLLECTIONS
            </h2>
          </div>
          <p className="font-sans text-xs max-w-sm text-neutral-400 leading-relaxed font-light">
            Each collection is custom tailored to capture the elegance, scale, and unique pacing of your celebration.
          </p>
        </div>

        {/* Package grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative bg-[#1A1A1A] border border-[rgba(201,166,107,0.25)] flex flex-col justify-between overflow-hidden transition-all duration-300 rounded-lg hover:shadow-[0_12px_30px_rgba(201,166,107,0.18)] hover:border-[#C9A66B] ${
                pkg.name === "SIGNATURE" 
                  ? "shadow-xl border-[#C9A66B]" 
                  : "shadow-md"
              }`}
            >
              {pkg.name === "SIGNATURE" && (
                <div className="absolute top-0 right-0 bg-[#C9A66B] text-white text-[9px] font-sans font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-bl-lg">
                  POPULAR SELECTION
                </div>
              )}

              {/* Price block */}
              <div className="p-8 border-b border-[rgba(201,166,107,0.15)] bg-[#1A1A1A]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-sans text-neutral-400 tracking-[0.2em] uppercase font-semibold">{pkg.badge}</span>
                  {React.cloneElement(pkg.icon as React.ReactElement, { className: "text-[#C9A66B]" })}
                </div>
                
                <h3 className="text-lg font-serif text-white uppercase tracking-wider font-bold">{pkg.name} COLLECTION</h3>
                
                <div className="flex items-baseline gap-1.5 mt-4">
                  <span className="text-3xl font-serif text-[#C9A66B] font-bold">{pkg.price}</span>
                  <span className="font-sans text-[9px] text-neutral-400 tracking-[0.15em] uppercase font-semibold">USD TOTAL</span>
                </div>
                
                <p className="font-sans text-[11px] text-neutral-300 font-light leading-relaxed mt-4">
                  {pkg.desc}
                </p>
              </div>

              {/* Features list */}
              <div className="p-8 flex-grow bg-[#1A1A1A]">
                <ul className="space-y-4 font-sans text-xs text-neutral-300 font-light leading-relaxed">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check size={14} className="text-[#C9A66B] shrink-0 mt-0.5" />
                      <span className="text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Book button */}
              <div className="p-8 bg-[#131313] border-t border-[rgba(201,166,107,0.15)]">
                {pkg.name === "SIGNATURE" ? (
                  // Primary Button style
                  <button
                    onClick={() => handleBookNow(pkg.name)}
                    className="w-full py-3.5 bg-[#C9A66B] text-white hover:bg-[#B89058] font-sans text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 cursor-pointer shadow-md rounded"
                  >
                    SECURE THIS DATE
                  </button>
                ) : (
                  // Secondary Button style
                  <button
                    onClick={() => handleBookNow(pkg.name)}
                    className="w-full py-3.5 bg-transparent text-[#C9A66B] border border-[#C9A66B] hover:bg-[#C9A66B]/10 font-sans text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 cursor-pointer rounded"
                  >
                    SECURE THIS DATE
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* COMPARISON TABLE */}
        <div className="hidden md:block overflow-hidden border border-[rgba(201,166,107,0.15)] bg-[#1A1A1A] shadow-md rounded-lg">
          <table className="w-full font-sans text-xs text-neutral-300 text-left border-collapse">
            <thead>
              <tr className="bg-[#252525] text-[#C9A66B] border-b border-[rgba(201,166,107,0.15)] font-bold">
                <th className="p-5 tracking-widest uppercase font-semibold">COLLECTION COMPARISON</th>
                <th className="p-5 text-center tracking-widest uppercase font-semibold">ESSENTIAL</th>
                <th className="p-5 text-center text-white tracking-widest uppercase font-semibold">SIGNATURE</th>
                <th className="p-5 text-center tracking-widest uppercase font-semibold">ROYAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(201,166,107,0.1)] font-light">
              <tr className="hover:bg-[#252525]/40 transition-colors">
                <td className="p-5 font-medium text-white">Primary Photographers</td>
                <td className="p-5 text-center text-neutral-300">One Specialist</td>
                <td className="p-5 text-center text-white font-semibold">Two Specialists</td>
                <td className="p-5 text-center text-[#C9A66B] font-bold">Director + 2 Specialists</td>
              </tr>
              <tr className="hover:bg-[#252525]/40 transition-colors">
                <td className="p-5 font-medium text-white">Coverage Allocation</td>
                <td className="p-5 text-center text-neutral-300">6 Hours Coverage</td>
                <td className="p-5 text-center text-white font-semibold">10 Hours Coverage</td>
                <td className="p-5 text-center text-[#C9A66B] font-bold">Full Weekend (Unlimited)</td>
              </tr>
              <tr className="hover:bg-[#252525]/40 transition-colors">
                <td className="p-5 font-medium text-white">Archival Aerial Drone Footage</td>
                <td className="p-5 text-center"><X size={14} className="mx-auto text-red-400" /></td>
                <td className="p-5 text-center text-white"><Check size={14} className="mx-auto text-[#C9A66B]" /></td>
                <td className="p-5 text-center text-[#C9A66B]"><Check size={14} className="mx-auto" /></td>
              </tr>
              <tr className="hover:bg-[#252525]/40 transition-colors">
                <td className="p-5 font-medium text-white">Bespoke Printed Album</td>
                <td className="p-5 text-center"><X size={14} className="mx-auto text-red-400" /></td>
                <td className="p-5 text-center text-white font-semibold">1 Signature Album</td>
                <td className="p-5 text-center text-[#C9A66B] font-bold">2 Keepsake Photo Books</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
