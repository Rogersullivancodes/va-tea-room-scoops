
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plus } from 'lucide-react';

interface NewsHeaderProps {
  onFetchNews: () => void;
  onCreateArticle: () => void;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({ onFetchNews, onCreateArticle }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">News Management</h2>
      <div className="flex space-x-2">
        <Button 
          onClick={onFetchNews}
          variant="outline"
          className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Fetch Latest News
        </Button>
        <Button 
          onClick={onCreateArticle}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Article
        </Button>
      </div>
    </div>
  );
};

export default NewsHeader;
