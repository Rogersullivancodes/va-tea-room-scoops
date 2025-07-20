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

  // Virginia Politics YouTube Videos
  const virginiaVideos = [
    {
      id: "UZiGMrAY4JE",
      title: "Virginia's 2025 Election: A Political Barometer",
      description: "Watch live coverage of Virginia's gubernatorial race - viewed nationally as a key indicator for the Trump administration",
      thumbnail: "https://img.youtube.com/vi/UZiGMrAY4JE/maxresdefault.jpg"
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Virginia General Assembly Session Highlights",
      description: "Key legislative battles and political movements from Richmond",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    },
    {
      id: "9bZkp7q19f0",
      title: "Virginia Local Elections and Political Trends",
      description: "Analysis of local political races across Virginia counties",
      thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg"
    },
    {
      id: "jNQXAC9IVRw",
      title: "Virginia Politics: Federal Impact Analysis",
      description: "How federal politics affects Virginia's local political landscape",
      thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg"
    },
    {
      id: "y6120QOlsfU",
      title: "Virginia Campaign Finance and Political Influence",
      description: "Investigating money flows in Virginia political campaigns",
      thumbnail: "https://img.youtube.com/vi/y6120QOlsfU/maxresdefault.jpg"
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

  // Combine news and submitted articles for display
  const allArticles = [
    ...newsArticles.slice(0, 3), // Top 3 news articles
    ...submittedArticles.slice(0, 2) // Top 2 submitted articles
  ];
  
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
    <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        {isVideoMode ? (
          // Virginia Politics Video Mode with Thumbnails
          <div className="py-8">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Main Video Player */}
                <div className="md:col-span-2">
                  <div className="bg-black rounded-lg aspect-video mb-4 relative overflow-hidden">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=${isPlaying ? 1 : 0}&controls=1&rel=0&modestbranding=1`}
                      title={currentVideo.title}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                      className="rounded-lg"
                    />
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
          // News Headlines Mode with Video Thumbnail
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex space-x-4">
                {/* Video Thumbnail */}
                <div className="hidden md:block">
                  <div className="relative">
                    <img
                      src={currentVideo.thumbnail}
                      alt="Virginia Politics Video"
                      className="w-32 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${currentVideo.id}/hqdefault.jpg`;
                      }}
                    />
                    <button
                      onClick={toggleVideoMode}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
                    >
                      <Play className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
                
                {/* News Content */}
                <div className="flex-1">
                  <p className="text-lg md:text-xl font-bold">
                    <span className={`${isSubmittedArticle ? 'bg-blue-400' : 'bg-yellow-400'} text-black px-3 py-1 rounded mr-3 animate-pulse`}>
                      {isSubmittedArticle ? '📝 COMMUNITY' : '🔥 BREAKING'}
                    </span>
                    {currentHeadline.title}
                  </p>
                  <p className="text-sm text-white/80 mt-1">
                    {isSubmittedArticle 
                      ? `Community Article • ${new Date(currentHeadline.published_at || currentHeadline.created_at).toLocaleDateString()}`
                      : `Source: ${(currentHeadline as any).source || 'News'} • ${new Date(currentHeadline.published_at).toLocaleDateString()}`
                    }
                  </p>
                </div>
              </div>
              <div className="ml-4 flex gap-2">
                <Button 
                  onClick={toggleVideoMode}
                  size="sm"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Volume2 className="w-4 h-4 mr-1" />
                  Watch Video
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicTopBanner;