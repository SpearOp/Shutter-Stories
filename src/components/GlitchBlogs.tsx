import React, { useState } from "react";
import { BlogPost } from "../types";
import { BookOpen, Calendar, ChevronRight, X, Heart } from "lucide-react";

interface BlogsProps {
  blogs: BlogPost[];
  isLoading: boolean;
}

export const GlitchBlogs: React.FC<BlogsProps> = ({ blogs, isLoading }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="sector-blog" className="relative py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Module Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-xs tracking-[0.3em] font-semibold text-[#C9A66B] uppercase mb-3 block">
              OUR JOURNAL
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white uppercase leading-tight font-extrabold tracking-tight">
              STORIES & INSIGHTS
            </h2>
          </div>
          
          <p className="font-sans text-xs max-w-sm text-neutral-400 leading-relaxed font-light">
            Insights on capturing editorial elegance, planning destination celebrations, and curating cinematic masterpieces.
          </p>
        </div>

        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-[#C9A66B] font-sans text-xs uppercase">
            <div className="w-8 h-8 border-2 border-[#C9A66B] border-t-transparent rounded-full animate-spin" />
            <span className="tracking-[0.2em]">RECEIVING DESPATCHES...</span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-[rgba(201,166,107,0.15)] p-6 font-serif text-sm text-neutral-400 italic uppercase">
            No secure journal entries loaded.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((post) => (
              <div 
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group relative bg-[#1A1A1A] border border-[rgba(201,166,107,0.15)] hover:border-[#C9A66B] transition-all duration-[400ms] p-8 flex flex-col justify-between hover:bg-[#1A1A1A]/95 cursor-pointer shadow-md rounded"
              >
                <div>
                  {/* Meta details */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(201,166,107,0.1)] pb-4 mb-5 text-[10px] font-sans text-[#C9A66B] uppercase tracking-[0.2em] font-bold">
                    <div className="flex items-center gap-1.5 font-light text-neutral-400">
                      <Calendar size={12} />
                      <span>{new Date(post.timestamp).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    
                    <div className="px-2 py-0.5 border border-[#C9A66B]/20 bg-[#C9A66B]/5 text-[9px] rounded">
                      {post.category}
                    </div>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg text-white uppercase mb-4 tracking-wide leading-snug group-hover:text-[#C9A66B] transition-colors duration-300 font-bold">
                    {post.title}
                  </h3>

                  <p className="font-sans text-xs text-neutral-300 font-light leading-relaxed mb-6">
                    {post.teaser}
                  </p>
                </div>

                {/* Expansion trigger */}
                <div className="flex items-center justify-between text-[10px] font-sans mt-4 pt-4 border-t border-[rgba(201,166,107,0.1)] uppercase tracking-[0.2em] font-medium text-neutral-400">
                  <span className="flex items-center gap-1 font-light">
                    <span>EDITED BY {post.authorHex === "ADMIN_A_E5" ? "VANCÉ EDITORS" : "CREATIVE DIRECTOR"}</span>
                  </span>

                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-1 text-[#C9A66B] group-hover:translate-x-1 transition-transform font-bold cursor-pointer"
                  >
                    <span>READ ARTICLE</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* DETAILED BLOG MODAL VIEWER */}
        {selectedPost && (
          <div className="fixed inset-0 z-[7000] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
            
            <div className="relative w-full max-w-3xl bg-[#1A1A1A] border border-[rgba(201,166,107,0.15)] flex flex-col shadow-2xl max-h-[90vh] overflow-hidden rounded-lg">
              
              {/* Header controls bar */}
              <div className="flex justify-between items-center bg-[#131313] p-4 border-b border-[rgba(201,166,107,0.15)] text-xs font-sans text-white tracking-wider">
                <div className="flex items-center gap-2 font-bold uppercase">
                  <BookOpen size={14} className="text-[#C9A66B]" />
                  <span>JOURNAL INDEX</span>
                </div>

                <button 
                  onClick={() => setSelectedPost(null)}
                  className="p-1 hover:text-[#C9A66B] text-neutral-400 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Core post article scroll viewport */}
              <div className="flex-grow p-8 sm:p-12 overflow-y-auto space-y-6 bg-[#1A1A1A] text-neutral-200">
                
                <div className="flex items-center gap-3 text-[10px] font-sans text-[#C9A66B] uppercase tracking-widest font-bold">
                  <span className="px-2.5 py-1 bg-[#C9A66B]/5 border border-[#C9A66B]/20 rounded">{selectedPost.category}</span>
                  <span>{new Date(selectedPost.timestamp).toLocaleDateString()}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-white uppercase leading-normal tracking-wide font-extrabold pb-2 border-b border-[rgba(201,166,107,0.15)]">
                  {selectedPost.title}
                </h3>

                {/* Subdued beautiful label */}
                <div className="p-3.5 bg-[#C9A66B]/5 border border-[#C9A66B]/20 text-[11px] font-sans text-[#C9A66B] leading-relaxed flex items-center gap-2 rounded">
                  <Heart size={14} className="text-[#C9A66B] shrink-0 fill-current" />
                  <span>This article contains design recommendations compiled by Shutter Stories directors.</span>
                </div>

                {/* Article Content Render */}
                <p className="font-sans text-sm leading-relaxed font-light whitespace-pre-wrap border-l border-[#C9A66B] pl-4 text-neutral-300">
                  {selectedPost.content}
                </p>

                {/* Render Tags */}
                <div className="flex gap-2 flex-wrap pt-4">
                  {selectedPost.tags.map((tag, idx) => (
                    <span key={idx} className="bg-[#C9A66B]/5 border border-[#C9A66B]/20 px-2.5 py-1 text-[9px] font-sans text-[#C9A66B] uppercase tracking-widest rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Footer */}
              <div className="bg-[#131313] border-t border-[rgba(201,166,107,0.15)] p-5 font-sans text-[10px] text-neutral-400 flex justify-between uppercase tracking-widest font-semibold">
                <div>AUTHOR: {selectedPost.authorHex}</div>
                <div>APPROVED STABILIZATION</div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
