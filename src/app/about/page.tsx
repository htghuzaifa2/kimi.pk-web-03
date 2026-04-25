'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Package, ShieldCheck, Star, Truck, Users, Target, Heart, Sparkles, Flower2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_NAME } from '@/lib/constants';

const features = [
  {
    icon: <Package className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: 'Extensive Beauty Range',
    description: 'A diverse collection of skincare, makeup, fragrances, and beauty essentials to meet every need.',
  },
  {
    icon: <Award className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: 'Competitive Pricing',
    description: 'Affordable rates without compromising on quality or authenticity of your favorite beauty brands.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: '100% Authentic Products',
    description: 'Genuine and verified beauty products sourced directly from trusted suppliers and brands.',
  },
  {
    icon: <Truck className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: 'Nationwide Delivery',
    description: 'Fast and reliable shipping across Pakistan so your beauty essentials reach you promptly.',
  },
  {
    icon: <Heart className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />,
    title: 'Customer-Centered Service',
    description: 'Dedicated support to help you find the perfect products for your skin type and beauty needs.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 border-b border-border/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-10 from-primary pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
            Our Story & Mission
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-pink-500 to-rose-400 font-headline leading-[1.1]">
            Elevating Beauty <br /> Across Pakistan
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
            Welcome to <span className="text-foreground font-bold">{APP_NAME}</span>, the definitive destination for premium beauty products. We&apos;re more than just a store; we&apos;re a hub for authenticity, self-care, and beauty excellence serving the 240 million citizens of Pakistan.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 space-y-32">
        {/* Who We Are */}
        <section className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                <Users className="h-5 w-5" />
                <span>Who We Are</span>
              </div>
              <h2 className="text-4xl font-bold font-headline tracking-tight">The Beauty Pulse of Pakistan</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Founding {APP_NAME} was about one thing: <strong>Trust</strong>. In a market filled with uncertainty, we built a fortress of authenticity. From luxury skincare to everyday makeup essentials, we supply the products that help Pakistan glow with confidence.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-pink-500 rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-card/40 backdrop-blur-xl border border-border/40 rounded-2xl p-8 shadow-2xl overflow-hidden hover:border-primary/30 transition-colors">
                <blockquote className="text-xl italic font-medium text-foreground/80 leading-relaxed">
                  &ldquo;Our mission is to bridge the gap between global beauty innovation and local accessibility, ensuring every Pakistani has access to authentic, premium beauty products.&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-1 bg-primary w-12 rounded-full"></div>
                  <span className="font-bold uppercase tracking-tighter text-sm">kimi.pk Vision</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black font-headline tracking-tight">Why Beauty Lovers Choose Us</h2>
            <p className="text-muted-foreground font-medium">Curated for quality. Verified for authenticity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group relative p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/40 hover:border-primary/40 hover:bg-card/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="mb-6 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-headline group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vision & Commitment */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="relative overflow-hidden p-10 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 transition-colors group">
            <Target className="absolute -right-4 -top-4 h-32 w-32 text-primary/5 group-hover:text-primary/10 transition-colors" />
            <h3 className="text-2xl font-bold font-headline mb-4 flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary" />
              Our Vision
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed relative z-10">
              To become the most trusted beauty destination in Pakistan, where every purchase is a step toward self-care, confidence, and radiant beauty.
            </p>
          </div>

          <div className="relative overflow-hidden p-10 rounded-3xl bg-gradient-to-br from-pink-500/5 to-transparent border border-pink-500/10 hover:border-pink-500/30 transition-colors group">
            <Flower2 className="absolute -right-4 -top-4 h-32 w-32 text-pink-500/5 group-hover:text-pink-500/10 transition-colors" />
            <h3 className="text-2xl font-bold font-headline mb-4 flex items-center gap-3">
              <Flower2 className="h-6 w-6 text-pink-500" />
              Our Commitment
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed relative z-10">
              We guarantee 100% authenticity on every product. Our commitment is to your beauty journey, providing genuine products from the world&apos;s most loved brands.
            </p>
          </div>
        </section>
      </div>

      <footer className="py-20 text-center border-t border-border/40 mt-12 bg-muted/10">
        <div className="container mx-auto px-4">
          <p className="text-2xl md:text-3xl font-black font-headline max-w-2xl mx-auto leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-pink-500 to-primary bg-[200%_auto] animate-text-gradient">
              {APP_NAME} — Your Trusted Beauty Destination in Pakistan.
            </span>
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <div className="h-1.5 w-1.5 rounded-full bg-primary/40"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-primary/40"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
