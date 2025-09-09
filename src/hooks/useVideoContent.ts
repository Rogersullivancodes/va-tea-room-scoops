import { useState, useEffect } from 'react';

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  duration?: string;
  category: 'politics' | 'entertainment' | 'news';
}

// Mock video content - in production, these would be actual MP4 files
const mockVideoContent: VideoContent[] = [
  {
    id: 'va-politics-1',
    title: "Virginia's 2025 Election: A Political Barometer",
    description: "Watch live coverage of Virginia's gubernatorial race - viewed nationally as a key indicator for the Trump administration",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    posterUrl: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=450&fit=crop",
    duration: "5:30",
    category: 'politics'
  },
  {
    id: 'va-politics-2', 
    title: "Virginia General Assembly Session Highlights",
    description: "Key legislative battles and political movements from Richmond",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    posterUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop",
    duration: "8:15",
    category: 'politics'
  },
  {
    id: 'va-politics-3',
    title: "Virginia Local Elections and Political Trends", 
    description: "Analysis of local political races across Virginia counties",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    posterUrl: "https://images.unsplash.com/photo-1566562882230-fd1c5c2b9347?w=800&h=450&fit=crop",
    duration: "6:45",
    category: 'politics'
  },
  {
    id: 'va-politics-4',
    title: "Virginia Politics: Federal Impact Analysis",
    description: "How federal politics affects Virginia's local political landscape", 
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    posterUrl: "https://images.unsplash.com/photo-1520637836862-4d197d17c559?w=800&h=450&fit=crop",
    duration: "10:20",
    category: 'politics'
  },
  {
    id: 'va-entertainment-1',
    title: "Virginia Beach Music Festival 2024",
    description: "Highlights from the largest music festival in Virginia featuring local and national artists",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    posterUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop",
    duration: "4:55",
    category: 'entertainment'
  },
  {
    id: 'va-entertainment-2',
    title: "Richmond Entertainment District Tour",
    description: "Exploring Virginia's growing entertainment and nightlife scene",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", 
    posterUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=450&fit=crop",
    duration: "7:30",
    category: 'entertainment'
  }
];

export const useVideoContent = () => {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);

  useEffect(() => {
    // Initialize with mock content
    setVideos(mockVideoContent);
    
    // Create initial shuffle
    const initialShuffle = Array.from({length: mockVideoContent.length}, (_, i) => i)
      .sort(() => Math.random() - 0.5);
    setShuffledOrder(initialShuffle);
  }, []);

  const getCurrentVideo = () => {
    if (shuffledOrder.length === 0 || videos.length === 0) return null;
    return videos[shuffledOrder[currentVideoIndex]] || null;
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % shuffledOrder.length);
    setIsPlaying(false);
  };

  const previousVideo = () => {
    setCurrentVideoIndex((prev) => 
      prev === 0 ? shuffledOrder.length - 1 : prev - 1
    );
    setIsPlaying(false);
  };

  const shuffleVideos = () => {
    const newShuffle = Array.from({length: videos.length}, (_, i) => i)
      .sort(() => Math.random() - 0.5);
    setShuffledOrder(newShuffle);
    setCurrentVideoIndex(0);
    setIsPlaying(false);
  };

  const goToVideo = (index: number) => {
    if (index >= 0 && index < shuffledOrder.length) {
      setCurrentVideoIndex(index);
      setIsPlaying(false);
    }
  };

  const getVideoByCategory = (category: VideoContent['category']) => {
    return videos.filter(video => video.category === category);
  };

  return {
    videos,
    currentVideo: getCurrentVideo(),
    currentVideoIndex,
    isPlaying,
    setIsPlaying,
    nextVideo,
    previousVideo,
    shuffleVideos,
    goToVideo,
    getVideoByCategory,
    shuffledOrder
  };
};