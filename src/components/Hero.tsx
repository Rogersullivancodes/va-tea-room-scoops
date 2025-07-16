
import React from 'react';
import { Badge } from '@/components/ui/badge';

const Hero: React.FC = () => {
  return (
    <section className="text-center py-8 mb-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm font-semibold">
          🔥 Virginia's Hottest Political Gossip
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold font-playfair text-foreground">
          CrabsFried<span className="text-primary">Politically</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Serving up Virginia's spiciest political news, scandals, and behind-the-scenes drama
        </p>
      </div>
    </section>
  );
};

export default Hero;
