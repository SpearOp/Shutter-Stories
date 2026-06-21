import React from "react";
import { MediaCategory, ServiceItem } from "../types";
import { ArrowRight } from "lucide-react";

interface ServicesProps {
  servicesList?: ServiceItem[];
  onSelectCategory: (cat: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const GlitchServices: React.FC<ServicesProps> = ({ servicesList, onSelectCategory, onNavigate }) => {
  const defaultList: ServiceItem[] = [
    {
      id: "srv-1",
      num: "01",
      title: "WEDDING STORIES",
      category: MediaCategory.WEDDINGS,
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "srv-2",
      num: "02",
      title: "PRE-WEDDING SHOOTS",
      category: MediaCategory.ENGAGEMENTS,
      imageUrl: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "srv-3",
      num: "03",
      title: "CINEMATIC FILMS",
      category: MediaCategory.FILMS,
      imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "srv-4",
      num: "04",
      title: "DESTINATION WEDDINGS",
      category: MediaCategory.DESTINATIONS,
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "srv-5",
      num: "05",
      title: "CORPORATE EVENTS",
      category: MediaCategory.EVENTS,
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "srv-6",
      num: "06",
      title: "LUXURY ALBUMS",
      category: "ALBUMS",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const list = servicesList && servicesList.length > 0 ? servicesList : defaultList;

  const handleExplore = (cat: string) => {
    onSelectCategory(cat);
    onNavigate("sector-portfolio");
  };

  return (
    <section 
      id="sector-services" 
      className="relative py-20 bg-transparent border-t border-[rgba(201,166,107,0.15)]"
    >
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Luxury Columns Grid - Separated with Gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4 xl:gap-6 py-4">
          {list.map((srv) => (
            <div 
              key={srv.id}
              onClick={() => handleExplore(srv.category)}
              className="group relative flex p-[5px] rounded-2xl bg-transparent cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 min-h-[350px] sm:min-h-[420px] lg:min-h-[480px] shadow-[0_12px_32px_rgba(0,0,0,0.16)] hover:shadow-[0_20px_45px_rgba(201,166,107,0.45)]"
            >
              {/* Rotating light ray border layer - Thick laser beam with rich dark gold/amber core, running at a slow pace */}
              <div className="absolute inset-[-1000%] bg-[conic-gradient(from_0deg,transparent_0%,#5A4232_18%,#B89058_28%,#A97B42_33%,#B89058_38%,#5A4232_45%,transparent_50%,transparent_55%,#5A4232_68%,#B89058_78%,#A97B42_83%,#B89058_88%,#5A4232_95%,transparent_100%)] opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_12s_linear_infinite]" />
              
              {/* Inner card content wrapper - Dark Blackish-Grey Theme */}
              <div className="relative flex flex-col justify-between w-full bg-[#1A1A1A] rounded-[12px] p-5 z-10">
                {/* Header Box with Number and Text */}
                <div className="flex flex-col">
                  <span className="block font-sans text-sm tracking-wider text-[#C9A66B] font-medium mb-3">
                    {srv.num}
                  </span>
                  
                  {/* Fixed height container for titles to ensure EXPLORE alignment */}
                  <div className="min-h-[40px] sm:min-h-[48px] flex items-start mb-4">
                    <h3 className="font-serif text-sm sm:text-base text-white tracking-wider uppercase group-hover:text-[#B89058] transition-colors duration-300 font-semibold leading-snug">
                      {srv.title.split(' ').map((word, idx) => (
                        <span key={idx} className="inline-block whitespace-nowrap mr-1.5">
                          {word}
                        </span>
                      ))}
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-1.5 font-sans text-[10px] text-neutral-400 tracking-[0.2em] uppercase font-medium group-hover:text-[#C9A66B] transition-colors duration-300">
                    <span>EXPLORE</span>
                    <ArrowRight size={10} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>

                {/* Image panel at the bottom */}
                <div className="relative mt-8 aspect-[3/4] w-full overflow-hidden border border-[#C9A66B]/15 rounded-xl">
                  <img 
                    src={srv.imageUrl} 
                    alt={srv.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
