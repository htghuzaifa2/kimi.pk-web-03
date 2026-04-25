
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PackagePlus, Wallet, MessageSquare, Home, AlertTriangle, Banknote } from 'lucide-react';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

const steps = [
  {
    icon: <PackagePlus className="h-10 w-10 text-primary" />,
    title: 'Place Your Order',
    description: 'Select your desired products and proceed to checkout. Fill in your shipping details accurately.',
  },
  {
    icon: <Wallet className="h-10 w-10 text-primary" />,
    title: 'Choose COD',
    description: 'In the payment section, select "Cash on Delivery (COD)" as your payment method.',
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: 'Confirm via WhatsApp',
    description: 'You\'ll be redirected to WhatsApp to confirm your order details with our team. This step is mandatory to process your order.',
  },
  {
    icon: <Home className="h-10 w-10 text-primary" />,
    title: 'Pay at Your Doorstep',
    description: 'Our courier partner will deliver the parcel to your address. Please have the exact cash amount ready to pay the rider upon delivery.',
  },
];

export default function CashOnDeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-primary tracking-tight">Cash on Delivery (COD)</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Pay for your order in cash when it arrives at your doorstep. Here’s everything you need to know.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl font-bold font-headline text-center mb-10 animate-fade-in-up" style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}>
            How It Works: Step-by-Step
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
                 <Card 
                    key={step.title}
                    className="group text-center p-6 flex flex-col items-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up bg-card/50 dark:bg-card/20 backdrop-blur-sm"
                    style={{ animationDelay: `${150 + (i + 1) * 150}ms`, animationFillMode: 'backwards' }}
                >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                        {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mt-4 mb-2 font-headline">{step.title}</h3>
                    <p className="text-muted-foreground flex-grow text-sm">{step.description}</p>
                </Card>
            ))}
        </div>
      </section>
      
      <section className="text-center max-w-3xl mx-auto bg-secondary/50 dark:bg-secondary/20 rounded-xl p-8 animate-fade-in-up" style={{ animationDelay: '900ms', animationFillMode: 'backwards' }}>
        <AlertTriangle className="h-12 w-12 mx-auto text-amber-500 mb-4" />
        <h2 className="text-3xl font-bold font-headline text-amber-600 dark:text-amber-500">COD Fee & Important Details</h2>
        <p className="text-muted-foreground text-lg leading-relaxed mt-4">
           A standard fee of <span className="font-bold text-foreground">Rs. 50</span> is automatically added to all Cash on Delivery orders. This fee is charged by the courier service for handling cash transactions.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed mt-4">
           To avoid this extra charge and enjoy faster processing, we recommend using our Advance Payment options like Bank Transfer, EasyPaisa, or JazzCash.
        </p>
         <Link href="/shipping-policy" className="inline-flex items-center gap-2 mt-6 font-semibold text-primary hover:underline">
            <Banknote className="h-5 w-5" /> Learn more about our payment methods
        </Link>
      </section>
    </div>
  );
}
