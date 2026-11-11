import React, { useState } from 'react';
import { 
  ExternalLink, 
  Heart, 
  MessageSquare, 
  Play, 
  Sparkles, 
  CheckCircle2,
  Video
} from 'lucide-react';
import { InstagramIcon, TikTokIcon } from './SocialIcons';
import { SOCIAL_LINKS, INSTAGRAM_POSTS, TIKTOK_VIDEOS } from '../data/socialPosts';

export default function SocialFeed() {
  const [activeTab, setActiveTab] = useState('instagram');
  const [hoveredPost, setHoveredPost] = useState(null);

  return (
    <section className="py-20 bg-[#FAF9F5] border-t border-stone-200 text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-amber-900 bg-amber-100 border border-amber-300 px-4 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>JOIN 45,000+ FASHION ENTHUSIASTS ACROSS KENYA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-stone-950">
            FOLLOW THE <span className="gold-gradient-text">TFC DRIP</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600">
            See how Kenyan men are styling our streetwear, unboxings from our Eldoret & Nairobi branches, and daily arrival drops.
          </p>

          {/* Social Switcher Tabs */}
          <div className="pt-2 flex justify-center space-x-3">
            <button
              onClick={() => setActiveTab('instagram')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition ${
                activeTab === 'instagram'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                  : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900 shadow-sm'
              }`}
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram ({SOCIAL_LINKS.instagramHandle})</span>
            </button>

            <button
              onClick={() => setActiveTab('tiktok')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition ${
                activeTab === 'tiktok'
                  ? 'bg-stone-950 text-amber-400 border border-amber-500/40 shadow-md'
                  : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900 shadow-sm'
              }`}
            >
              <TikTokIcon className="w-4 h-4 text-cyan-400" />
              <span>TikTok ({SOCIAL_LINKS.tiktokHandle})</span>
            </button>
          </div>
        </div>

        {/* Instagram Grid View */}
        {activeTab === 'instagram' && (
          <div>
            <div className="flex items-center justify-between mb-6 px-1">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 shadow-sm">
                  <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center font-bold text-amber-400 text-xs">
                    TFC
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-sm text-stone-900">{SOCIAL_LINKS.instagramHandle}</span>
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-xs text-stone-500">{SOCIAL_LINKS.followersInstagram} followers • Wholesale & Retail</span>
                </div>
              </div>

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-amber-500/20"
              >
                <span>Follow on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {INSTAGRAM_POSTS.map((post) => (
                <a
                  key={post.id}
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 group border border-stone-200/90 block shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between text-left">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <div className="flex items-center space-x-1 text-pink-400">
                        <Heart className="w-3.5 h-3.5 fill-pink-400" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-stone-300">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{post.comments}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-200 line-clamp-3 leading-snug">
                      {post.caption}
                    </p>

                    <span className="text-[10px] text-amber-400 font-bold">
                      {post.tag}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* TikTok Showcase View */}
        {activeTab === 'tiktok' && (
          <div>
            <div className="flex items-center justify-between mb-6 px-1">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-12 h-12 rounded-full bg-stone-950 border border-stone-300 flex items-center justify-center font-bold text-white text-xs shadow-sm">
                  TikTok
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-sm text-stone-900">{SOCIAL_LINKS.tiktokHandle}</span>
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                  </div>
                  <span className="text-xs text-stone-500">{SOCIAL_LINKS.followersTikTok} followers • Trendsetter Videos</span>
                </div>
              </div>

              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-stone-950 text-white hover:bg-stone-800 flex items-center space-x-1.5 transition shadow-sm"
              >
                <span>Watch on TikTok</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {TIKTOK_VIDEOS.map((vid) => (
                <a
                  key={vid.id}
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden hover:border-amber-400 transition-all group block relative shadow-sm hover:shadow-xl"
                >
                  <div className="relative aspect-[9/14] bg-stone-100 overflow-hidden">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent"></div>

                    {/* Play Button Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-neutral-600 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-400 transition-all shadow-2xl">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-4 inset-x-4 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-cyan-300">
                        {vid.views} views • {vid.likes} likes
                      </span>
                      <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                        {vid.title}
                      </h4>
                      <span className="text-[11px] text-stone-300 block pt-1">
                        {vid.author}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
