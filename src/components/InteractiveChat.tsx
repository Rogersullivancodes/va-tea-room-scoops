
import React, { useState } from 'react';
import { Send, MessageCircle, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: number;
  username: string;
  content: string;
  timestamp: string;
  isAnonymous: boolean;
}

const InteractiveChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      username: 'PoliticalWatcher',
      content: 'What do you all think about the new seafood industry regulations?',
      timestamp: '2 min ago',
      isAnonymous: false
    },
    {
      id: 2,
      username: 'Anonymous',
      content: 'Honestly, it\'s about time they addressed these issues. The bay needs protection.',
      timestamp: '1 min ago',
      isAnonymous: true
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      username: isAnonymous ? 'Anonymous' : username || 'Guest',
      content: newMessage,
      timestamp: 'Just now',
      isAnonymous
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Join the Political Conversation
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Share your thoughts on Virginia politics - anonymously or with your name
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            {/* Messages */}
            <div className="h-64 overflow-y-auto mb-6 space-y-4 border rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {message.isAnonymous ? (
                      <User className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <Users className="h-8 w-8 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {message.username}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                  <label htmlFor="anonymous" className="text-sm text-gray-700 dark:text-gray-300">
                    Post anonymously
                  </label>
                </div>
                {!isAnonymous && (
                  <input
                    type="text"
                    placeholder="Your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                )}
              </div>
              
              <div className="flex space-x-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Share your thoughts on Virginia politics..."
                  className="flex-1"
                  rows={3}
                />
                <Button type="submit" className="self-end">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveChat;
