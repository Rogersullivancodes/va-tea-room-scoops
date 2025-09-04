import React, { useState } from 'react';
import { Check, Crown, Zap, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Memberships: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCheckout = async (planId: string, priceId: string) => {
    setLoadingPlan(planId);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          mode: 'subscription',
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Free Reader',
      description: 'Basic access to political news',
      monthlyPrice: 0,
      yearlyPrice: 0,
      stripePriceId: {
        monthly: null,
        yearly: null,
      },
      features: [
        '5 articles per month',
        'Breaking news alerts',
        'Weekly newsletter',
        'Community discussions',
      ],
      popular: false,
    },
    {
      id: 'premium',
      name: 'Premium Insider',
      description: 'Full access with exclusive content',
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      stripePriceId: {
        monthly: 'price_premium_monthly',
        yearly: 'price_premium_yearly',
      },
      features: [
        'Unlimited articles',
        'Exclusive insider reports',
        'Live political analysis',
        'Priority news alerts',
        'Ad-free experience',
        'Member-only events',
      ],
      popular: true,
    },
    {
      id: 'vip',
      name: 'VIP Political Elite',
      description: 'Ultimate political news experience',
      monthlyPrice: 24.99,
      yearlyPrice: 249.99,
      stripePriceId: {
        monthly: 'price_vip_monthly',
        yearly: 'price_vip_yearly',
      },
      features: [
        'Everything in Premium',
        'Direct access to journalists',
        'Quarterly VIP briefings',
        'Custom research requests',
        'Political consulting calls',
        'Exclusive VIP newsletter',
        'Early access to interviews',
      ],
      popular: false,
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return 0;
    const yearlyTotal = plan.monthlyPrice * 12;
    const savings = ((yearlyTotal - plan.yearlyPrice) / yearlyTotal) * 100;
    return Math.round(savings);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Choose Your Membership</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Get access to exclusive political insights and breaking news coverage
              </p>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <Label htmlFor="billing-toggle" className={billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}>
                  Monthly
                </Label>
                <Switch
                  id="billing-toggle"
                  checked={billingCycle === 'yearly'}
                  onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
                />
                <Label htmlFor="billing-toggle" className={billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}>
                  Yearly
                </Label>
                {billingCycle === 'yearly' && (
                  <Badge className="bg-green-600">Save up to 17%</Badge>
                )}
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                      MOST POPULAR
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <div className="mb-4">
                      {plan.id === 'free' && <Zap className="h-12 w-12 mx-auto text-blue-500" />}
                      {plan.id === 'premium' && <Star className="h-12 w-12 mx-auto text-yellow-500" />}
                      {plan.id === 'vip' && <Crown className="h-12 w-12 mx-auto text-purple-500" />}
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <p className="text-muted-foreground">{plan.description}</p>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">${getPrice(plan)}</span>
                      {plan.monthlyPrice > 0 && (
                        <span className="text-muted-foreground">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      )}
                    </div>
                    {billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Save {getSavings(plan)}% with yearly billing
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full"
                      variant={plan.popular ? 'default' : 'outline'}
                      disabled={loadingPlan === plan.id}
                      onClick={() => {
                        if (plan.id === 'free') {
                          toast({
                            title: "Already Free!",
                            description: "You can start reading for free right now.",
                          });
                        } else {
                          const priceId = plan.stripePriceId[billingCycle];
                          handleCheckout(plan.id, priceId);
                        }
                      }}
                    >
                      {loadingPlan === plan.id ? 'Loading...' : 
                       plan.id === 'free' ? 'Start Reading' : 'Start Free Trial'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                  <p className="text-muted-foreground text-sm">
                    Yes, you can cancel your subscription at any time. You'll continue to have access 
                    until the end of your billing period.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What's included in the free trial?</h3>
                  <p className="text-muted-foreground text-sm">
                    All paid plans include a 7-day free trial with full access to all features. 
                    No credit card required to start.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How do credits work?</h3>
                  <p className="text-muted-foreground text-sm">
                    Credits are used to access premium articles. Premium members get unlimited credits, 
                    while free users receive 10 credits monthly.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Is there a student discount?</h3>
                  <p className="text-muted-foreground text-sm">
                    Yes! Students can get 50% off any paid plan. Contact us with your student email 
                    for verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Memberships;