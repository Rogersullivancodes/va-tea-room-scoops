
import React, { useState } from 'react';
import { CreditCard, Lock, Star, Crown, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SecureCheckout: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [creditAmount, setCreditAmount] = useState<number>(100);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const membershipPlans = [
    {
      id: 'basic',
      name: 'Political Observer',
      price: '$4.99/month',
      features: [
        'Daily political updates',
        'Basic news access',
        '10 character credits/month',
        'Community discussions'
      ],
      icon: <Star className="h-6 w-6" />,
      popular: false
    },
    {
      id: 'premium',
      name: 'Capitol Insider',
      price: '$12.99/month',
      features: [
        'All Observer features',
        'Exclusive insider reports',
        '50 character credits/month',
        'Ad-free experience',
        'Premium chat access'
      ],
      icon: <Crown className="h-6 w-6" />,
      popular: true
    },
    {
      id: 'elite',
      name: 'Political Elite',
      price: '$24.99/month',
      features: [
        'All Insider features',
        'Direct source access',
        'Unlimited character credits',
        'VIP discussion rooms',
        'Monthly exclusive events',
        'Priority customer support'
      ],
      icon: <Zap className="h-6 w-6" />,
      popular: false
    }
  ];

  const creditPackages = [
    { credits: 50, price: '$2.99', bonus: 0 },
    { credits: 100, price: '$4.99', bonus: 10 },
    { credits: 250, price: '$9.99', bonus: 50 },
    { credits: 500, price: '$17.99', bonus: 150 }
  ];

  const handleAuth = () => {
    // Simulate authentication
    console.log(isLogin ? 'Logging in...' : 'Signing up...', { userEmail, password });
  };

  const handlePurchase = () => {
    if (selectedPlan) {
      console.log('Processing membership purchase:', selectedPlan);
    } else {
      console.log('Processing credit purchase:', creditAmount);
    }
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Secure Checkout
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Choose your membership or buy character credits
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Authentication Section */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {isLogin ? 'Login' : 'Create Account'}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <Button onClick={handleAuth} className="w-full bg-red-600 hover:bg-red-700">
                    {isLogin ? 'Login' : 'Sign Up'}
                  </Button>
                  
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="w-full text-center text-red-600 hover:text-red-700 text-sm"
                  >
                    {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
                  </button>
                </div>
              </div>
            </div>

            {/* Membership Plans */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Membership Plans
                </h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {membershipPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
                        selectedPlan === plan.id
                          ? 'border-red-600 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-red-300'
                      } ${plan.popular ? 'ring-2 ring-red-600' : ''}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-red-600 text-white px-3 py-1 text-sm font-bold rounded-full">
                            POPULAR
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center">
                        <div className="text-red-600 mb-3">{plan.icon}</div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {plan.name}
                        </h4>
                        <p className="text-2xl font-bold text-red-600 mb-4">{plan.price}</p>
                        
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Character Credits */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Character Credits
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Use credits to create and interact as fictional anonymous characters in political discussions
                </p>
                
                <div className="grid md:grid-cols-4 gap-4">
                  {creditPackages.map((pkg, index) => (
                    <div
                      key={index}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        creditAmount === pkg.credits
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                      }`}
                      onClick={() => setCreditAmount(pkg.credits)}
                    >
                      <div className="text-center">
                        <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <p className="font-bold text-gray-900 dark:text-white">
                          {pkg.credits + pkg.bonus} Credits
                        </p>
                        <p className="text-blue-600 font-semibold">{pkg.price}</p>
                        {pkg.bonus > 0 && (
                          <p className="text-sm text-green-600">+{pkg.bonus} bonus!</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purchase Button */}
              <div className="text-center">
                <Button 
                  onClick={handlePurchase}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Secure Purchase
                </Button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Secured by 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecureCheckout;
