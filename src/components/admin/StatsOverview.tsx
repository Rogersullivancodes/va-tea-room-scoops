
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Globe, Mail } from 'lucide-react';

interface StatsData {
  articles: number;
  users: number;
  pageViews: number;
  newsletter: number;
}

interface StatsOverviewProps {
  stats?: StatsData;
  isLoading: boolean;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, isLoading }) => {
  const statsCards = [
    {
      title: "Total Articles",
      value: stats?.articles ?? 0,
      icon: FileText,
    },
    {
      title: "Active Users",
      value: stats?.users ?? 0,
      icon: Users,
    },
    {
      title: "Page Views",
      value: stats?.pageViews ?? 0,
      icon: Globe,
    },
    {
      title: "Newsletter Subscribers",
      value: stats?.newsletter ?? 0,
      icon: Mail,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <IconComponent className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {isLoading ? 'Loading...' : stat.value}
              </div>
              <p className="text-xs text-green-400"></p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsOverview;
