import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface FullscreenVideoBannerProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const FullscreenVideoBanner: React.FC<FullscreenVideoBannerProps> = ({ onSearch, searchQuery }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundPrompt, setShowSoundPrompt] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // High-quality video library - optimized for web
  const videoLibrary = [
    {
      src: "https://cdn.pixabay.com/vimeo/330281989/waves-35675.mp4",
      title: "Abstract Waves",
      poster: "https://images.unsplash.com/photo-1586892478025-2b5472316b22?w=1920&h=1080&fit=crop"
    },
    {
      src: "https://cdn.pixabay.com/vimeo/439842157/aurora-44671.mp4", 
      title: "Aurora Motion",
      poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
    },
    {
      src: "https://cdn.pixabay.com/vimeo/395804675/liquid-39175.mp4",
      title: "Liquid Motion",
      poster: "https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?w=1920&h=1080&fit=crop"
    },
    {
      src: "https://cdn.pixabay.com/vimeo/354228207/particles-26451.mp4",
      title: "Digital Particles",
      poster: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=1920&h=1080&fit=crop"
    },
    {
      src: "https://cdn.pixabay.com/vimeo/458247771/light-49306.mp4",
      title: "Light Streams",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop"
    }
  ];

  // Randomly select video on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoLibrary.length);
    setCurrentVideoIndex(randomIndex);
  }, []);

  // Auto-play video with graceful fallback
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playVideo = async () => {
        try {
          video.muted = true; // Start muted for autoplay compliance
          await video.play();
          setIsPlaying(true);
          setShowSoundPrompt(true); // Show sound enable prompt
        } catch (error) {
          console.log('Autoplay failed:', error);
          setIsPlaying(false);
        }
      };
      
      playVideo();
    }
  }, [currentVideoIndex]);

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
      if (!video.muted) {
        setShowSoundPrompt(false); // Hide prompt when user unmutes
      }
    }
  };

  const enableSound = () => {
    setIsMuted(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
    setShowSoundPrompt(false);
  };

  const currentVideo = videoLibrary[currentVideoIndex];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        poster={currentVideo.poster}
        loop
        playsInline
        preload="auto"
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play')}
      >
        <source src={currentVideo.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Fixed Navigation Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">VA Tea Room</div>
          <nav className="hidden md:flex space-x-6 text-white">
            <a href="/news" className="hover:text-primary transition-colors">News</a>
            <a href="/articles" className="hover:text-primary transition-colors">Articles</a>
            <a href="/ads" className="hover:text-primary transition-colors">Advertise</a>
            <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-40">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Stay Informed
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Your source for Virginia political tea and breaking news analysis
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search political news..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-12 pr-4 py-4 text-lg bg-white/90 backdrop-blur-sm border-0 rounded-full text-foreground placeholder:text-muted-foreground shadow-2xl"
          />
        </div>

        {/* Call to Action */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button 
            size="lg" 
            className="px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Explore Latest News
          </Button>
        </div>
      </div>

      {/* Sound Enable Prompt */}
      {showSoundPrompt && (
        <div className="absolute top-24 right-4 z-50 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg animate-fade-in">
          <p className="mb-2 text-sm">Enable sound for full experience</p>
          <Button onClick={enableSound} size="sm" variant="outline" className="text-white border-white hover:bg-white/20">
            <Volume2 className="w-4 h-4 mr-2" />
            Enable Sound
          </Button>
        </div>
      )}

      {/* Video Controls */}
      <div className="absolute bottom-6 left-6 flex space-x-3 z-50">
        <Button
          onClick={togglePlay}
          size="sm"
          variant="outline"
          className="bg-black/50 border-white/30 text-white hover:bg-black/70 backdrop-blur-sm"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button
          onClick={toggleMute}
          size="sm"
          variant="outline"
          className="bg-black/50 border-white/30 text-white hover:bg-black/70 backdrop-blur-sm"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
      </div>

      {/* Video Info */}
      <div className="absolute bottom-6 right-6 text-white text-sm bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg z-50">
        {currentVideo.title}
      </div>
    </div>
  );
};

export default FullscreenVideoBanner;