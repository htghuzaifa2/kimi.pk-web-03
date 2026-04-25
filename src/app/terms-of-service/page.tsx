
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gavel, Info, Copy, XCircle } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-primary tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>
      
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="shadow-lg animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <CardHeader>
            <h2 className="flex items-center gap-3 text-2xl font-headline font-bold">
              <Info className="h-7 w-7 text-primary" />
              1. Introduction
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base leading-relaxed">
              Welcome to {APP_NAME}. By accessing our website, you agree to be bound by these Terms of Service. This website provides information about our products and allows you to initiate orders via WhatsApp.
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <h2 className="flex items-center gap-3 text-2xl font-headline font-bold">
             <Copy className="h-7 w-7 text-primary" />
              2. Intellectual Property
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base leading-relaxed">
              All content on this website, including text, graphics, logos, and images, is the property of {APP_NAME} and is protected by copyright laws. You may not reproduce, distribute, or transmit any content without our prior written permission.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg animate-fade-in-up" style={{ animationDelay: '450ms' }}>
          <CardHeader>
            <h2 className="flex items-center gap-3 text-2xl font-headline font-bold">
              <XCircle className="h-7 w-7 text-primary" />
              3. Disclaimer of Warranties
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base leading-relaxed">
              This website is provided "as is," without any warranties of any kind. We do not guarantee that the information is always accurate, complete, or current. Product prices and availability are subject to change without notice.
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <CardHeader>
            <h2 className="flex items-center gap-3 text-2xl font-headline font-bold">
              <Gavel className="h-7 w-7 text-primary" />
              4. Governing Law
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-base leading-relaxed">
              These Terms of Service are governed by and construed in accordance with the laws of Pakistan. Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of Pakistan.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
