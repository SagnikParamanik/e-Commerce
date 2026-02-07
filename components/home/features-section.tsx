import { Truck, Shield, RotateCcw, Headphones } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $50. Fast and reliable delivery to your door.',
    },
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Your payment information is encrypted and secure at all times.',
    },
    {
      icon: RotateCcw,
      title: '30-Day Returns',
      description: 'Not satisfied? Return items within 30 days for a full refund.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our customer service team is ready to help any time you need.',
    },
  ];

  return (
    <section className="py-20 px-sides bg-card border-t border-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-4 text-center">
          Why Shop With Us
        </h2>
        <p className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto">
          We're committed to delivering exceptional products and service to our customers worldwide.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-accent/10 rounded-lg">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
