
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Edit, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface Article {
  id: string;
  title: string;
  source: string;
  category: string;
  published_at: string;
  views: number;
}

interface NewsTableProps {
  articles: Article[];
  onDeleteArticle: (id: string) => void;
}

const NewsTable: React.FC<NewsTableProps> = ({ articles, onDeleteArticle }) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Articles ({articles.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              <TableHead className="text-gray-300">Title</TableHead>
              <TableHead className="text-gray-300">Source</TableHead>
              <TableHead className="text-gray-300">Category</TableHead>
              <TableHead className="text-gray-300">Published</TableHead>
              <TableHead className="text-gray-300">Views</TableHead>
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id} className="border-gray-700">
                <TableCell className="text-white font-medium">
                  {article.title.substring(0, 50)}...
                </TableCell>
                <TableCell className="text-gray-300">{article.source}</TableCell>
                <TableCell className="text-gray-300">{article.category}</TableCell>
                <TableCell className="text-gray-300">
                  {format(new Date(article.published_at), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell className="text-gray-300">{article.views}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-blue-600 text-blue-400">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-400">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-red-600 text-red-400"
                      onClick={() => onDeleteArticle(article.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default NewsTable;
