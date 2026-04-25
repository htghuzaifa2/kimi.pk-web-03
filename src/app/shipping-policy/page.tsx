
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Banknote, Clock, PackageSearch, AlertTriangle, Mail } from 'lucide-react';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

const paymentMethods = [
  "Easypaisa",
  "JazzCash",
  "Bank Transfer",
];

const policyCards = [
    { 
        icon: <Clock className="h-7 w-7 text-primary" />,
        title: "Delivery Timeframe",
        content: `<p>Orders are processed within <strong>1–2 business days</strong> after payment confirmation.</p><p>Standard delivery time is <strong>7–10 business days</strong>, depending on your location:</p><ul class="list-disc list-inside pl-4 space-y-1"><li><strong>Major Cities (Karachi, Lahore, Islamabad, etc.):</strong> 7–8 business days.</li><li><strong>Smaller Towns and Remote Areas:</strong> 9–10 business days.</li></ul><p class="pt-2">All deliveries are handled through trusted courier partners to ensure safe and timely shipping.</p>`,
        border: false,
    },
    { 
        icon: <PackageSearch className="h-7 w-7 text-primary" />,
        title: "Order Tracking",
        content: "<p>Once your order is dispatched, a tracking ID will be shared with you via email or SMS. You can track your parcel directly on the courier partner’s website. If you face any difficulty tracking your order, our support team will be happy to assist.</p>",
        border: false,
    },
    { 
        icon: <AlertTriangle className="h-7 w-7" />,
        title: "Important Notes",
        content: `<ul class="list-disc list-inside space-y-2"><li>Delivery timelines may be affected by public holidays, weather conditions, or courier delays.</li><li>Please ensure that you provide a complete and accurate shipping address to avoid delivery issues.</li><li>If delivery fails due to an incorrect address or unavailability at the time of delivery, the customer may be required to coordinate with the courier for redelivery.</li></ul>`,
        border: true,
        borderColor: "border-amber-500/50",
        titleColor: "text-amber-600 dark:text-amber-500",
    },
];

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-primary tracking-tight">Shipping Policy</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Thank you for shopping at ${APP_NAME}. We are dedicated to ensuring that your orders are delivered safely and on time across Pakistan.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}>
          <CardHeader>
            <h2 className="flex items-center gap-3 text-2xl font-headline font-bold">
              <Truck className="h-8 w-8 text-primary" />
              Shipping Charges
            </h2>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
             <p>Free Delivery on all orders above <span className="font-bold text-primary">PKR 2,500</span>.</p>
             <p>For orders below PKR 2,500, a delivery fee of <span className="font-bold text-primary">PKR 200</span> will apply.</p>
             <p>The total amount payable at checkout includes the product price plus any applicable delivery fee.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
          <CardHeader>
            <h2 className="flex items-center gap-3 text-2xl font-headline font-bold">
              <Banknote className="h-8 w-8 text-primary" />
              Payment Methods
            </h2>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p className="mb-3">We accept Advance Payment via the following options:</p>
            <ul className="space-y-2 list-disc list-inside font-medium">
              {paymentMethods.map((method) => (
                <li key={method}>{method}</li>
              ))}
            </ul>
             <p className="mt-4 text-sm font-semibold">Cash on Delivery (COD) is also available with an additional fee of Rs. 50.</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8 mb-12">
        {policyCards.map((card, index) => (
            <Card 
                key={card.title} 
                className={`shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in-up ${card.borderColor || ''}`}
                style={{ animationDelay: `${450 + index * 150}ms`, animationFillMode: 'backwards' }}
            >
              <CardHeader>
                <h3 className={`flex items-center gap-3 font-headline text-2xl font-bold ${card.titleColor || ''}`}>
                    {card.icon}
                    {card.title}
                </h3>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3" dangerouslySetInnerHTML={{ __html: card.content }} />
            </Card>
        ))}
      </div>

      <section className="text-center max-w-3xl mx-auto bg-secondary/50 dark:bg-secondary/20 rounded-xl p-8 animate-fade-in-up" style={{ animationDelay: `${450 + policyCards.length * 150}ms`, animationFillMode: 'backwards' }}>
        <h2 className="text-3xl font-bold font-headline">Contact Us</h2>
        <p className="text-muted-foreground text-lg leading-relaxed mt-4">
           If you have any questions about our shipping process or your order, please reach out to us.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-2 mt-4 font-semibold text-primary hover:underline">
            <Mail className="h-5 w-5" /> contact@kimi.pk
        </Link>
      </section>
    </div>
  );
}
