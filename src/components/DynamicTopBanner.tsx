// src/components/DynamicTopBanner.tsx
import React, { useState, useEffect } from 'react';
import { useNews } from '@/hooks/useNews';
import { useArticles } from '@/hooks/useArticles';
import { useVideoContent } from '@/hooks/useVideoContent';
import { Play, Pause, Volume2, SkipForward, Shuffle, Grid } from 'lucide-react';
import { Button } from './ui/button';
import NativeVideoPlayer from './NativeVideoPlayer';
import UserArticleSlideshow from './UserArticleSlideshow';

const DynamicTopBanner: React.FC = () => {
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [isVideoMode, setIsVideoMode] = useState(true); // Start with video mode
  const { articles: newsArticles, loading: newsLoading } = useNews();
  const { articles: submittedArticles, loading: articlesLoading } = useArticles();
  const {
    currentVideo,
    isPlaying,
    setIsPlaying,
    nextVideo,
    shuffleVideos,
    videos,
    shuffledOrder,
    currentVideoIndex
  } = useVideoContent();

  // Auto-play first video on mount
  useEffect(() => {
    if (currentVideo && isVideoMode) {
      setIsPlaying(true);
    }
  }, [currentVideo, isVideoMode]);

  // Auto-advance videos every 3 minutes when playing
  useEffect(() => {
    if (!isPlaying || !isVideoMode) return;
    
    const advanceTimer = setInterval(() => {
      nextVideo();
    }, 3 * 60 * 1000); // 3 minutes

    return () => clearInterval(advanceTimer);
  }, [isPlaying, isVideoMode, nextVideo]);

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
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white text-center min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <p className="text-2xl font-bold animate-pulse">
            🔥 Loading Virginia Political Content...
          </p>
        </div>
      </div>
    );
  }

  const currentHeadline = allArticles[currentHeadlineIndex];
  const isSubmittedArticle = submittedArticles.some(article => article.id === currentHeadline.id);

  const toggleVideoMode = () => {
    setIsVideoMode(!isVideoMode);
    setIsPlaying(false);
  };

  if (!currentVideo) {
    return (
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white text-center min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <p className="text-2xl font-bold">
            🎥 Loading Video Content...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden min-h-[80vh]">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 h-full">
        {isVideoMode ? (
          // Native HTML5 Video Mode - Full Screen Experience
          <div className="py-8 h-full">
            <div className="grid lg:grid-cols-4 gap-6 h-full">
              {/* Main Video Player - Takes most space */}
              <div className="lg:col-span-3 space-y-4">
                <NativeVideoPlayer
                  videoSrc={currentVideo.videoUrl}
                  posterSrc={currentVideo.posterUrl}
                  title={currentVideo.title}
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  className="h-[60vh] lg:h-[70vh] w-full"
                  onVideoChange={nextVideo}
                />
                
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-2 text-white">{currentVideo.title}</h2>
                  <p className="text-white/90 mb-4 text-base leading-relaxed">{currentVideo.description}</p>
                  
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <Button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        variant={isPlaying ? "secondary" : "outline"}
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        size="lg"
                      >
                        {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                        {isPlaying ? 'Pause' : 'Play'}
                      </Button>
                      <Button 
                        onClick={nextVideo}
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        size="lg"
                      >
                        <SkipForward className="w-5 h-5 mr-2" />
                        Next Video
                      </Button>
                      <Button 
                        onClick={shuffleVideos}
                        variant="outline"
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        size="lg"
                      >
                        <Shuffle className="w-5 h-5 mr-2" />
                        Shuffle
                      </Button>
                    </div>
                    <Button 
                      onClick={toggleVideoMode}
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      size="lg"
                    >
                      <Grid className="w-5 h-5 mr-2" />
                      Show Articles
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar with Playlist & User Articles */}
              <div className="lg:col-span-1 space-y-4 max-h-[80vh] overflow-y-auto">
                {/* Video Playlist */}
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Video Playlist
                  </h3>
                  <div className="space-y-3">
                    {videos.slice(0, 6).map((video, index) => (
                      <button
                        key={video.id}
                        onClick={() => {
                          // Find this video in the shuffled order or add it
                          const shuffledIndex = shuffledOrder.findIndex(i => videos[i]?.id === video.id);
                          if (shuffledIndex !== -1) {
                            // Use existing position
                          } else {
                            // Add to current position
                          }
                          nextVideo();
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          video.id === currentVideo.id ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex space-x-3">
                          <div className="w-16 h-10 bg-black/50 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={video.posterUrl}
                              alt={video.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">{video.title}</p>
                            <p className="text-white/60 text-xs mt-1">{video.duration}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* User Articles Slideshow */}
                <UserArticleSlideshow className="bg-black/20 backdrop-blur-sm" />
              </div>
            </div>
          </div>
        ) : (
          // Article Headlines Mode - Compact View
          <div className="py-12 h-full flex items-center">
            <div className="w-full">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                {/* Video Thumbnail - Smaller in article mode */}
                <div className="lg:col-span-1">
                  <div className="relative group">
                    <div className="w-full h-48 bg-gradient-to-br from-red-800/20 to-red-900/20 rounded-xl shadow-xl overflow-hidden relative">
                      <img
                        src={currentVideo.posterUrl}
                        alt="Virginia Politics Video"
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      
                      <button
                        onClick={toggleVideoMode}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl hover:bg-black/70 transition-all duration-300"
                      >
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </button>
                      
                      <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg p-2">
                        <p className="text-white font-medium text-xs truncate">{currentVideo.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* News Content */}
                <div className="lg:col-span-2 space-y-4">
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                    <span className={`${isSubmittedArticle ? 'bg-blue-400' : 'bg-yellow-400'} text-black px-3 py-1 rounded-lg mr-3 text-base font-semibold`}>
                      {isSubmittedArticle ? '📝 COMMUNITY' : '🔥 BREAKING'}
                    </span>
                    <br className="md:hidden" />
                    {currentHeadline.title}
                  </h1>
                  
                  <p className="text-xl text-white/95 leading-relaxed">
                    {currentHeadline.excerpt || 'Stay informed with the latest political developments from Virginia.'}
                  </p>
                  
                  <div className="flex items-center gap-4 text-white/80">
                    <span>
                      {isSubmittedArticle 
                        ? `Community Article • ${new Date(currentHeadline.published_at || currentHeadline.created_at).toLocaleDateString()}`
                        : `Source: ${(currentHeadline as any).source || 'News'} • ${new Date(currentHeadline.published_at).toLocaleDateString()}`
                      }
                    </span>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button 
                      onClick={toggleVideoMode}
                      size="lg"
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Watch Videos
                    </Button>
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