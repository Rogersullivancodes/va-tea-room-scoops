import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Star } from 'lucide-react';
import { Button } from './ui/button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  sourceName: string;
  articleUrl?: string;
  thumbnailUrl: string;
  videoUrl?: string;
  category: string;
  publishedAt: string;
}

interface FeaturedNewsSectionProps {
  featuredNews: NewsItem;
  onReadMore: () => void;
}

const FeaturedNewsSection: React.FC<FeaturedNewsSectionProps> = ({ featuredNews, onReadMore }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Use intersection observer to auto-play when in viewport
  const { elementRef: sectionRef, isIntersecting } = useIntersectionObserver({ 
    threshold: 0.5, 
    triggerOnce: false 
  });

  // Sample video for demonstration (replace with actual video URLs from your data)
  const videoSrc = featuredNews.videoUrl || "https://cdn.pixabay.com/vimeo/439842157/aurora-44671.mp4";
  const posterImage = featuredNews.thumbnailUrl || "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop";

  useEffect(() => {
    const video = videoRef.current;
    if (video && isIntersecting) {
      const playVideo = async () => {
        try {
          video.muted = true; // Start muted for autoplay compliance
          await video.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Auto-play failed:', error);
          setIsPlaying(false);
        }
      };
      
      playVideo();
    } else if (video && !isIntersecting) {
      video.pause();
      setIsPlaying(false);
    }
  }, [isIntersecting]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        try {
          await video.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Play failed:', error);
        }
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <section ref={sectionRef} className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center gap-3 mb-6">
        <Star className="h-8 w-8 text-accent animate-pulse-slow" />
        <h2 className="text-3xl font-bold text-foreground">Featured News</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
      </div>
      
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster={posterImage}
              loop
              playsInline
              preload="metadata"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-3">
                <Button
                  onClick={togglePlay}
                  size="lg"
                  variant="outline"
                  className="bg-black/50 border-white/30 text-white hover:bg-black/70 backdrop-blur-sm"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                <Button
                  onClick={toggleMute}
                  size="lg"
                  variant="outline"
                  className="bg-black/50 border-white/30 text-white hover:bg-black/70 backdrop-blur-sm"
                >
                  {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </Button>
              </div>
            </div>

            {/* Play/Pause Button when not hovering */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={togglePlay}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 shadow-2xl"
                >
                  <Play className="w-8 h-8" />
                </Button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col justify-center">
            <div className="mb-4">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                featuredNews.category === 'politics' 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {featuredNews.category.charAt(0).toUpperCase() + featuredNews.category.slice(1)}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">
              {featuredNews.title}
            </h3>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {featuredNews.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
              <span className="font-medium">{featuredNews.sourceName}</span>
              <span>{new Date(featuredNews.publishedAt).toLocaleDateString()}</span>
            </div>
            
            <Button 
              onClick={onReadMore}
              size="lg"
              className="w-full hover:scale-105 transition-all duration-300"
            >
              Read More Details
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNewsSection;