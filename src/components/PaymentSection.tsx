
import React, { useState } from 'react';
import { CreditCard, Coffee, Star, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentSection: React.FC = () => {
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  const tipAmounts = [5, 10, 25, 50];
  
  const premiumPlans = [
    {
      name: 'Political Insider',
      price: '$9.99/month',
      features: [
        'Daily exclusive political insights',
        'Early access to breaking news',
        'Ad-free browsing experience',
        'Weekly political analysis newsletter'
      ],
      icon: <Star className="h-6 w-6" />
    },
    {
      name: 'Capitol Elite',
      price: '$19.99/month',
      features: [
        'Everything in Political Insider',
        'Direct access to political sources',
        'Monthly virtual town halls',
        'Premium investigative reports',
        'Priority comment placement'
      ],
      icon: <Crown className="h-6 w-6" />
    }
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Support Independent Political Journalism
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Help us keep Virginia politics transparent and accessible
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Tips Section */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="text-center mb-6">
                <Coffee className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Buy Us a Coffee
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Support our reporting with a one-time tip
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {tipAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedTip(amount)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      selectedTip === amount
                        ? 'border-red-600 bg-red-50 dark:bg-red-900/20 text-red-600'
                        : 'border-gray-200 dark:border-gray-600 hover:border-red-300'
                    }`}
                  >
                    <span className="font-bold">${amount}</span>
                  </button>
                ))}
              </div>

              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                <CreditCard className="h-4 w-4 mr-2" />
                Send Tip {selectedTip ? `$${selectedTip}` : ''}
              </Button>
            </div>

            {/* Premium Plans */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
                Premium Subscriptions
              </h3>
              
              {premiumPlans.map((plan, index) => (
                <div key={index} className="border-2 border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:border-red-300 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="text-red-600 mr-3">{plan.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {plan.name}
                      </h4>
                      <p className="text-red-600 font-semibold">{plan.price}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                        <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Subscribe to {plan.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
