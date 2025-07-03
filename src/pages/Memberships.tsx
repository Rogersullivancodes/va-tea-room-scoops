import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Star, Crown, Zap, Check, Gift, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { useToast } from "@/components/ui/use-toast"; // For showing alerts

const Memberships: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null); // State to track loading
  const navigate = useNavigate(); // Hook for navigation
  const { toast } = useToast(); // Hook for showing notifications

  // Function to handle the checkout process
  const handleCheckout = async (planId: string, priceId: string) => {
    setLoadingPlan(planId); // Set loading state for the clicked button

    try {
      // This is where you call YOUR backend.
      // Do not put Stripe secret keys here. EVER.
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: priceId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session.');
      }

      const { url } = await response.json();

      if (url) {
        // Redirect the user to Stripe's checkout page
        window.location.href = url;
      } else {
        throw new Error('Stripe session URL not found.');
      }

    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "We couldn't connect to the payment gateway. Please try again later.",
      });
      setLoadingPlan(null); // Reset loading state on error
    }
  };


  const plans = [
    {
      id: 'observer',
      name: 'Political Observer',
      description: 'Perfect for casual political followers',
      monthlyPrice: 4.99,
      yearlyPrice: 49.99,
      // IMPORTANT: These IDs must match the Price IDs in your Stripe account
      priceIds: {
        monthly: 'price_your_observer_monthly_id',
        yearly: 'price_your_observer_yearly_id'
      },
      features: [
        'Daily political updates',
        'Basic news access',
        '10 character credits/month',
        'Community discussions',
        'Email newsletter',
        'Mobile app access'
      ],
      icon: <Star className="h-8 w-8" />,
      popular: false,
      trialDays: 7
    },
    {
      id: 'insider',
      name: 'Capitol Insider',
      description: 'For serious political enthusiasts',
      monthlyPrice: 12.99,
      yearlyPrice: 129.99,
      priceIds: {
        monthly: 'price_your_insider_monthly_id',
        yearly: 'price_your_insider_yearly_id'
      },
      features: [
        'All Observer features',
        'Exclusive insider reports',
        '50 character credits/month',
        'Ad-free experience',
        'Premium chat access',
        'Weekly analysis calls',
        'Early story access',
        'Comment priority'
      ],
      icon: <Crown className="h-8 w-8" />,
      popular: true,
      trialDays: 14
    },
    {
      id: 'elite',
      name: 'Political Elite',
      description: 'Ultimate political insider access',
      monthlyPrice: 24.99,
      yearlyPrice: 249.99,
      priceIds: {
        monthly: 'price_your_elite_monthly_id',
        yearly: 'price_your_elite_yearly_id'
      },
      features: [
        'All Insider features',
        'Direct source access',
        'Unlimited character credits',
        'VIP discussion rooms',
        'Monthly exclusive events',
        'Priority customer support',
        'Custom news alerts',
        'One-on-one briefings',
        'Archive access'
      ],
      icon: <Zap className="h-8 w-8" />,
      popular: false,
      trialDays: 21
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (billingCycle === 'yearly') {
      const monthlyCost = plan.monthlyPrice * 12;
      const savings = monthlyCost - plan.yearlyPrice;
      return Math.round((savings / monthlyCost) * 100);
    }
    return 0;
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-red-700 to-slate-800 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Choose Your Political Access Level
                </h1>
                <p className="text-xl leading-relaxed mb-8">
                  From casual observer to political insider - find the perfect membership for your Virginia political news needs.
                </p>
                <div className="bg-green-600 rounded-lg p-4 mb-8">
                  <div className="flex items-center justify-center">
                    <Gift className="h-6 w-6 mr-2" />
                    <span className="font-bold text-lg">All plans include FREE TRIAL + 10 bonus credits!</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Billing Toggle */}
          <section className="py-8 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-center mb-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
                    <button
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                        billingCycle === 'monthly'
                          ? 'bg-red-600 text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:text-red-600'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle('yearly')}
                      className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                        billingCycle === 'yearly'
                          ? 'bg-red-600 text-white'
                          : 'text-gray-600 dark:text-gray-300 hover:text-red-600'
                      }`}
                    >
                      Yearly
                      <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Save up to 20%
                      </span>
                    </button>
                  </div>
                </div>

                {/* Plans Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                  {plans.map((plan) => {
                    const priceId = billingCycle === 'monthly' ? plan.priceIds.monthly : plan.priceIds.yearly;
                    const isLoading = loadingPlan === plan.id;
                    
                    return (
                      <Card 
                        key={plan.id} 
                        className={`relative ${
                          plan.popular 
                            ? 'ring-2 ring-red-600 shadow-2xl scale-105' 
                            : 'hover:shadow-xl'
                        } transition-all duration-300`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                              MOST POPULAR
                            </span>
                          </div>
                        )}
                        
                        <CardHeader className="text-center pb-4">
                            <div className="text-red-600 mb-4">{plan.icon}</div>
                            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                            {plan.name}
                            </CardTitle>
                            <p className="text-gray-600 dark:text-gray-300">{plan.description}</p>
                            
                            <div className="mt-6">
                            <div className="flex items-baseline justify-center">
                                <span className="text-4xl font-bold text-red-600">
                                ${getPrice(plan)}
                                </span>
                                <span className="text-gray-500 ml-1">
                                /{billingCycle === 'monthly' ? 'month' : 'year'}
                                </span>
                            </div>
                            
                            {billingCycle === 'yearly' && getSavings(plan) > 0 && (
                                <p className="text-green-600 font-semibold mt-2">
                                Save {getSavings(plan)}% annually
                                </p>
                            )}
                            
                            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg p-2 mt-4">
                                <p className="font-semibold text-sm">
                                {plan.trialDays}-Day FREE Trial
                                </p>
                            </div>
                            </div>
                        </CardHeader>
                        
                        <CardContent>
                            <ul className="space-y-3 mb-8">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center">
                                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                                </li>
                            ))}
                            </ul>
                            
                            <Button 
                                onClick={() => handleCheckout(plan.id, priceId)}
                                disabled={isLoading}
                                className={`w-full ${
                                    plan.popular 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : 'bg-gray-800 hover:bg-gray-700'
                                } text-white py-3 text-lg font-semibold`}
                            >
                                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : null}
                                {isLoading ? 'Redirecting...' : `Start ${plan.trialDays}-Day Free Trial`}
                            </Button>
                            
                            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
                            Cancel anytime during trial. No commitment.
                            </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ... (Keep your FAQ section as is) ... */}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Memberships;
