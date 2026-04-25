
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Database, ShoppingCart, Mail } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-primary tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Your privacy is important to us. At {APP_NAME}, we are committed to being transparent about how we handle data.
        </p>
      </header>
      
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="shadow-lg animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <CardHeader>
            <h2 className="flex items-center gap-3 text-2xl font-headline font-bold">
              <Shield className="h-7 w-7 text-primary" />
              Our Core Privacy Principle
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base leading-relaxed">
              <strong>We do not collect or store your personal data.</strong> Our website is designed to be a client-side application, meaning the core functionalities run directly in your browser without sending your personal information to our servers.
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <h2 className="flex items-center gap-3 text-2xl font-headline font-bold">
              <Database className="h-7 w-7 text-primary" />
              What Data We Handle (and Where It Stays)
            </h2>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2"><ShoppingCart className="h-5 w-5"/> Shopping Cart</h3>
              <p>When you add items to your cart, that information is stored locally in your own browser's storage. It is never transmitted to us or any third party. If you clear your browser data, your cart will be cleared.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2"><Mail className="h-5 w-5"/> Contact & Checkout</h3>
              <p>When you use our "Contact Us" or "Checkout" features, your information (like name, address, and order details) is used to pre-fill a WhatsApp message. This data is not stored on our servers. The message is sent directly from your device to our WhatsApp number, and your privacy is then subject to WhatsApp's policies.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg animate-fade-in-up" style={{ animationDelay: '450ms' }}>
          <CardHeader>
            <h2 className="flex items-center gap-3 text-2xl font-headline font-bold">
              <Shield className="h-7 w-7 text-primary" />
              Third-Party Services
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base leading-relaxed">
              We may use analytics tools that collect anonymous usage data to help us improve our website. This information is aggregated and does not contain any personally identifiable information. We also use external fonts and icons, which may involve requests to third-party servers.
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <CardHeader>
            <h2 className="flex items-center gap-3 text-2xl font-headline font-bold">
              Questions?
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base leading-relaxed">
              If you have any questions about our privacy practices, please feel free to <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
