
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Analytics: React.FC = () => {
  // Mock data for charts
  const visitorData = [
    { name: 'Mon', visitors: 2400, pageViews: 4800 },
    { name: 'Tue', visitors: 1398, pageViews: 2796 },
    { name: 'Wed', visitors: 9800, pageViews: 19600 },
    { name: 'Thu', visitors: 3908, pageViews: 7816 },
    { name: 'Fri', visitors: 4800, pageViews: 9600 },
    { name: 'Sat', visitors: 3800, pageViews: 7600 },
    { name: 'Sun', visitors: 4300, pageViews: 8600 },
  ];

  const categoryData = [
    { name: 'Politics', value: 45, color: '#dc2626' },
    { name: 'Economy', value: 25, color: '#059669' },
    { name: 'International', value: 20, color: '#2563eb' },
    { name: 'Opinion', value: 10, color: '#7c3aed' },
  ];

  const topArticles = [
    { title: 'Virginia Election Update', views: 12450 },
    { title: 'Political Commentary Today', views: 9876 },
    { title: 'Breaking Political News', views: 8765 },
    { title: 'Campaign Analysis 2024', views: 7654 },
    { title: 'Local Government Changes', views: 6543 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
      
      {/* Visitor Statistics */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Weekly Visitor Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#374151', 
                  border: '1px solid #6b7280',
                  borderRadius: '6px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="visitors" fill="#dc2626" />
              <Bar dataKey="pageViews" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Content Categories */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Content by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#374151', 
                    border: '1px solid #6b7280',
                    borderRadius: '6px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Articles */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Top Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topArticles.map((article, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-gray-300">{article.title}</span>
                  </div>
                  <span className="text-white font-semibold">{article.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Trends */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Traffic Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#374151', 
                  border: '1px solid #6b7280',
                  borderRadius: '6px',
                  color: '#fff'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="visitors" 
                stroke="#dc2626" 
                strokeWidth={2}
                dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="pageViews" 
                stroke="#059669" 
                strokeWidth={2}
                dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
