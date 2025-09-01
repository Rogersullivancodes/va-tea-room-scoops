import React from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface SimpleSearchBarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const SimpleSearchBar: React.FC<SimpleSearchBarProps> = ({ onSearch, searchQuery }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <Input
        type="text"
        placeholder="Search political news..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-12 pr-4 py-4 text-lg bg-background border-2 border-border rounded-full text-foreground placeholder:text-muted-foreground shadow-lg focus:border-primary"
      />
    </div>
  );
};

export default SimpleSearchBar;