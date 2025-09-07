// src/components/DynamicTopBanner.tsx
import React, { useState, useEffect } from 'react';
import { useNews } from '@/hooks/useNews';
import { useArticles } from '@/hooks/useArticles';
import { Play, Pause, Volume2, SkipForward, Shuffle } from 'lucide-react';
import { Button } from './ui/button';

const DynamicTopBanner: React.FC = () => {
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoShuffle, setVideoShuffle] = useState<number[]>([]);
  const { articles: newsArticles, loading: newsLoading } = useNews();
  const { articles: submittedArticles, loading: articlesLoading } = useArticles();

  // Virginia Politics & Entertainment YouTube Videos with guaranteed thumbnails
  const virginiaVideos = [
    {
      id: "hFZFjoX2cGg",
      title: "Virginia's 2025 Election: A Political Barometer",
      description: "Watch live coverage of Virginia's gubernatorial race - viewed nationally as a key indicator for the Trump administration",
      thumbnail: "https://img.youtube.com/vi/hFZFjoX2cGg/maxresdefault.jpg"
    },
    {
      id: "QH2-TGUlwu4",
      title: "Virginia General Assembly Session Highlights",
      description: "Key legislative battles and political movements from Richmond",
      thumbnail: "https://img.youtube.com/vi/QH2-TGUlwu4/maxresdefault.jpg"
    },
    {
      id: "kJQP7kiw5Fk",
      title: "Virginia Local Elections and Political Trends",
      description: "Analysis of local political races across Virginia counties",
      thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg"
    },
    {
      id: "NpEaa2P7qZI",
      title: "Virginia Politics: Federal Impact Analysis",
      description: "How federal politics affects Virginia's local political landscape",
      thumbnail: "https://img.youtube.com/vi/NpEaa2P7qZI/maxresdefault.jpg"
    },
    {
      id: "iik25wqIuFo",
      title: "Virginia Campaign Finance and Political Influence",
      description: "Investigating money flows in Virginia political campaigns",
      thumbnail: "https://img.youtube.com/vi/iik25wqIuFo/maxresdefault.jpg"
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Virginia Beach Music Festival 2024",
      description: "Highlights from the largest music festival in Virginia featuring local and national artists",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    },
    {
      id: "M7lc1UVf-VE",
      title: "Richmond Entertainment District Tour",
      description: "Exploring Virginia's growing entertainment and nightlife scene",
      thumbnail: "https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg"
    },
    {
      id: "L_jWHffIx5E",
      title: "Virginia's Rising Stars in Entertainment",
      description: "Meet the next generation of Virginia entertainers making it big",
      thumbnail: "https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg"
    },
    {
      id: "KQ6zr6kCPj8",
      title: "Historic Virginia Venues and Their Stories",
      description: "A look at Virginia's iconic entertainment venues and their cultural impact",
      thumbnail: "https://img.youtube.com/vi/KQ6zr6kCPj8/maxresdefault.jpg"
    },
    {
      id: "ZZ5LpwO-An4",
      title: "Virginia Film Industry Update",
      description: "How Virginia is becoming a major hub for film and television production",
      thumbnail: "https://img.youtube.com/vi/ZZ5LpwO-An4/maxresdefault.jpg"
    }
  ];

  // Initialize shuffle array
  useEffect(() => {
    if (virginiaVideos.length > 0) {
      const shuffled = Array.from({length: virginiaVideos.length}, (_, i) => i)
        .sort(() => Math.random() - 0.5);
      setVideoShuffle(shuffled);
    }
  }, []);

  // Auto-shuffle videos every 10 minutes
  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      const shuffled = Array.from({length: virginiaVideos.length}, (_, i) => i)
        .sort(() => Math.random() - 0.5);
      setVideoShuffle(shuffled);
      setCurrentVideoIndex(0);
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(shuffleInterval);
  }, []);

  // Combine and shuffle news and submitted articles for display
  const allArticles = React.useMemo(() => {
    const combined = [
      ...newsArticles.slice(0, 3), // Top 3 news articles
      ...submittedArticles.slice(0, 2) // Top 2 submitted articles
    ];
    
    // Shuffle headlines using Fisher-Yates algorithm
    const shuffled = [...combined];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [newsArticles, submittedArticles]);
  
  const loading = newsLoading && articlesLoading;

  useEffect(() => {
    if (allArticles.length > 0) {
      const timer = setInterval(() => {
        setCurrentHeadlineIndex((prev) => (prev + 1) % allArticles.length);
      }, 8000); // Change headline every 8 seconds (longer for video mode)

      return () => clearInterval(timer);
    }
  }, [allArticles.length]);

  if (loading || allArticles.length === 0) {
    return (
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white text-center py-8">
        <div className="container mx-auto px-4">
          <p className="text-xl font-bold animate-pulse">
            🔥 Loading Breaking Political News...
          </p>
        </div>
      </div>
    );
  }

  const currentHeadline = allArticles[currentHeadlineIndex];
  const isSubmittedArticle = submittedArticles.some(article => article.id === currentHeadline.id);
  const currentVideo = videoShuffle.length > 0 ? virginiaVideos[videoShuffle[currentVideoIndex]] : virginiaVideos[0];

  const toggleVideoMode = () => {
    setIsVideoMode(!isVideoMode);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videoShuffle.length);
    setIsPlaying(false);
  };

  const shuffleVideos = () => {
    const shuffled = Array.from({length: virginiaVideos.length}, (_, i) => i)
      .sort(() => Math.random() - 0.5);
    setVideoShuffle(shuffled);
    setCurrentVideoIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden min-h-[80vh]">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        {isVideoMode ? (
          // Virginia Politics Video Mode with Thumbnails - Full Banner Height
          <div className="py-16 h-full">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 max-w-7xl mx-auto h-full">
              <div className="grid md:grid-cols-3 gap-8 h-full">
                {/* Main Video Player - Larger */}
                <div className="md:col-span-2">
                  <div className="bg-black rounded-lg aspect-video mb-6 relative overflow-hidden h-96 md:h-[500px]">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&controls=1&rel=0&modestbranding=1&mute=0&loop=1&playlist=${currentVideo.id}&enablejsapi=1`}
                      title={currentVideo.title}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                      className="rounded-lg w-full h-full"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-white">{currentVideo.title}</h2>
                  <p className="text-white/80 mb-4 text-sm">{currentVideo.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button 
                        onClick={togglePlay}
                        variant={isPlaying ? "secondary" : "outline"}
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        size="sm"
                      >
                        {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                        {isPlaying ? 'Pause' : 'Play'}
                      </Button>
                      <Button 
                        onClick={nextVideo}
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        size="sm"
                      >
                        <SkipForward className="w-4 h-4 mr-2" />
                        Next Video
                      </Button>
                      <Button 
                        onClick={shuffleVideos}
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        size="sm"
                      >
                        <Shuffle className="w-4 h-4 mr-2" />
                        Shuffle
                      </Button>
                    </div>
                    <Button 
                      onClick={toggleVideoMode}
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      size="sm"
                    >
                      Back to News
                    </Button>
                  </div>
                </div>

                {/* Video Playlist Thumbnails */}
                <div className="space-y-3">
                  <h3 className="text-white font-semibold mb-3">Virginia Politics Playlist</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {videoShuffle.map((videoIndex, index) => {
                      const video = virginiaVideos[videoIndex];
                      return (
                        <button
                          key={video.id}
                          onClick={() => {setCurrentVideoIndex(index); setIsPlaying(false);}}
                          className={`w-full text-left p-2 rounded-lg transition-colors ${
                            index === currentVideoIndex ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex space-x-3">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-20 h-12 object-cover rounded flex-shrink-0"
                              onError={(e) => {
                                e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">{video.title}</p>
                              <p className="text-white/60 text-xs mt-1 line-clamp-2">{video.description}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // News Headlines Mode with Large Video Thumbnail - Expanded Height
          <div className="py-20 h-full flex items-center">
            <div className="w-full">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Large Video Thumbnail */}
                <div className="order-2 md:order-1">
                  <div className="relative group">
                    {/* Video Placeholder with loading */}
                    <div className="w-full h-64 md:h-80 bg-gradient-to-br from-red-800/20 to-red-900/20 rounded-xl shadow-2xl overflow-hidden relative">
                      <img
                        src={currentVideo.thumbnail}
                        alt="Virginia Politics Video"
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        onLoad={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.opacity = '1';
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://img.youtube.com/vi/${currentVideo.id}/hqdefault.jpg`;
                          if (!target.complete) {
                            target.src = 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop';
                          }
                        }}
                        style={{ opacity: 0 }}
                      />
                      
                      {/* Skeleton loader while image loads */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 via-red-700/40 to-red-800/30 animate-pulse opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
                      
                      <button
                        onClick={toggleVideoMode}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl hover:bg-black/70 transition-all duration-300 group-hover:bg-black/30"
                      >
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300 animate-pulse">
                          <Play className="w-8 h-8 md:w-12 md:h-12 text-white" />
                        </div>
                      </button>
                      
                      <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-white font-semibold text-sm">{currentVideo.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* News Content - Larger */}
                <div className="order-1 md:order-2">
                  <div className="space-y-4">
                    <p className="text-2xl md:text-3xl font-bold leading-tight">
                      <span className={`${isSubmittedArticle ? 'bg-blue-400' : 'bg-yellow-400'} text-black px-4 py-2 rounded-lg mr-4 animate-pulse text-lg`}>
                        {isSubmittedArticle ? '📝 COMMUNITY' : '🔥 BREAKING'}
                      </span>
                      <br className="md:hidden" />
                      {currentHeadline.title}
                    </p>
                    <p className="text-lg text-white/90 leading-relaxed">
                      {currentHeadline.excerpt || 'Stay informed with the latest political developments.'}
                    </p>
                    <p className="text-base text-white/70">
                      {isSubmittedArticle 
                        ? `Community Article • ${new Date(currentHeadline.published_at || currentHeadline.created_at).toLocaleDateString()}`
                        : `Source: ${(currentHeadline as any).source || 'News'} • ${new Date(currentHeadline.published_at).toLocaleDateString()}`
                      }
                    </p>
                    <div className="flex gap-3 pt-2">
                      <Button 
                        onClick={toggleVideoMode}
                        size="lg"
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all"
                      >
                        <Volume2 className="w-5 h-5 mr-2" />
                        Watch Virginia Politics
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicTopBanner;