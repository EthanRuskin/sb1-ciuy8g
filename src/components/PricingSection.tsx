import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

interface PricingSectionProps {
  onPricingAction: (plan: string, price: string, action: 'trial' | 'contact' | 'signup') => void;
}

export function PricingSection({ onPricingAction }: PricingSectionProps) {
  const [processingTier, setProcessingTier] = useState<string | null>(null);

  const pricingTiers: PricingTier[] = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for trying out our features',
      features: [
        'Up to 50 calls per month',
        'Basic AI assistance',
        'Standard analytics',
        'Email support'
      ],
      cta: 'Get Started'
    },
    {
      name: 'Standard',
      price: '25',
      description: 'Great for individual sales reps',
      features: [
        'Up to 200 calls per month',
        'Advanced AI assistance',
        'Detailed analytics',
        'Priority email support',
        'Basic integrations'
      ],
      cta: 'Start Free Trial'
    },
    {
      name: 'Teams',
      price: '199',
      description: 'Perfect for sales teams',
      features: [
        'Up to 10 team members',
        'Team performance dashboard',
        'Executive insights',
        'Team analytics & reporting',
        'Call monitoring & coaching',
        'Custom training modules',
        'Team collaboration tools'
      ],
      highlighted: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Unlimited team members',
        'Custom AI model training',
        'Enterprise analytics',
        'Dedicated support team',
        'Custom integrations',
        'Onsite training',
        'SLA guarantees'
      ],
      cta: 'Contact Sales'
    }
  ];

  const handlePricingAction = async (tier: PricingTier) => {
    setProcessingTier(tier.name);
    try {
      switch (tier.name) {
        case 'Free':
          onPricingAction(tier.name, tier.price, 'signup');
          break;
        case 'Enterprise':
          onPricingAction(tier.name, tier.price, 'contact');
          break;
        default:
          onPricingAction(tier.name, tier.price, 'trial');
          break;
      }
    } catch (error) {
      console.error(`Error processing ${tier.name} action:`, error);
    } finally {
      setProcessingTier(null);
    }
  };

  return (
    <section id="pricing" className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-950 via-indigo-950 to-purple-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_-20%,rgba(99,102,241,0.15),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_-20%,rgba(139,92,246,0.15),transparent)]"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Simple, Transparent Pricing</h2>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            Choose the perfect plan for your team's needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col bg-white/5 backdrop-blur-sm rounded-xl p-8 border ${
                tier.highlighted
                  ? 'border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50'
                  : 'border-white/10'
              } hover:border-indigo-500/50 transition-all duration-300`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline mb-2">
                  {tier.price === 'Custom' ? (
                    <span className="text-3xl font-bold text-white">Custom</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-white">${tier.price}</span>
                      <span className="text-indigo-200 ml-2">/month</span>
                    </>
                  )}
                </div>
                <p className="text-indigo-200">{tier.description}</p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-400 mr-2 mt-0.5" />
                      <span className="text-indigo-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePricingAction(tier)}
                disabled={processingTier === tier.name}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transform hover:-translate-y-0.5'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:translate-y-0`}
              >
                {processingTier === tier.name ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  tier.cta
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}