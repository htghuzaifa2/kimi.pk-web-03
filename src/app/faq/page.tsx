
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShoppingCart, Truck, RotateCw, ShieldCheck, Mail } from 'lucide-react';
import Link from 'next/link';

const faqSections = [
  {
    category: 'Ordering & Payment',
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We currently accept payments via Easypaisa, JazzCash, and direct Bank Transfer. We also offer Cash on Delivery.',
      },
      {
        q: 'Is Cash on Delivery (COD) available?',
        a: 'Yes, Cash on Delivery is available. A standard fee of Rs. 50 is charged by the courier for all COD orders.',
      },
      {
        q: 'How do I place an order?',
        a: 'Simply browse our products, add your desired items to the cart, and proceed to checkout. You will be guided through the payment and shipping details there. After checkout, you will finalize the order on WhatsApp.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    icon: <Truck className="h-8 w-8 text-primary" />,
    questions: [
      {
        q: 'How much does shipping cost?',
        a: 'We offer free delivery on all orders above PKR 2,500. For orders below this amount, a flat delivery fee of PKR 200 will be applied.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Delivery usually takes 7–10 business days. It’s typically 7–8 days for major cities and 9–10 days for smaller towns or remote areas. Order processing takes an additional 1–2 business days.',
      },
      {
        q: 'How can I track my order?',
        a: 'Once your order is dispatched, we will send you a tracking ID via email or SMS. You can use this ID on the courier partner’s website to track your parcel.',
      },
        {
        q: 'Do you ship internationally?',
        a: 'Currently, we only ship to addresses within Pakistan.',
      },
    ],
  },
  {
    category: 'Returns & Support',
    icon: <RotateCw className="h-8 w-8 text-primary" />,
    questions: [
      {
        q: 'What is your return policy?',
        a: 'You can request a return within 3 days of delivery if the product is damaged, defective, or incorrect. We do not accept returns for change of mind.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'Please contact our support team at contact@kimi.pk with your order number and clear photos or a video showing the issue. Our team will guide you through the process.',
      },
      {
        q: 'How will I receive my refund?',
        a: 'Once your return is approved and inspected, your refund will be processed via your original payment method or another mutually agreed-upon method.',
      },
    ],
  },
  {
    category: 'Products & Authenticity',
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    questions: [
      {
        q: 'Are all your products genuine?',
        a: 'Yes, we are committed to providing 100% original and authentic products sourced from trusted suppliers.',
      },
       {
        q: 'What if a product I want is out of stock?',
        a: 'You can contact us to inquire about restocking timelines. We are always updating our inventory and can notify you when the item becomes available.',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-primary tracking-tight">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Have questions? We’ve got answers. Find the information you need below.
        </p>
      </header>
      
      <div className="space-y-12 max-w-4xl mx-auto">
        {faqSections.map((section, index) => (
          <Card 
            key={index} 
            className="shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up"
            style={{ animationDelay: `${150 + index * 150}ms`, animationFillMode: 'backwards' }}
          >
            <CardHeader>
              <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-headline font-bold">
                {section.icon}
                {section.category}
              </h2>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {section.questions.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left font-semibold hover:text-primary">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

       <section className="text-center mt-16 max-w-3xl mx-auto bg-secondary/50 dark:bg-secondary/20 rounded-xl p-8 animate-fade-in-up" style={{ animationDelay: `${150 + faqSections.length * 150}ms`, animationFillMode: 'backwards' }}>
        <h2 className="text-3xl font-bold font-headline">Still Have Questions?</h2>
        <p className="text-muted-foreground text-lg leading-relaxed mt-4">
           If you can't find the answer you're looking for, feel free to reach out to our support team.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-2 mt-4 font-semibold text-primary hover:underline">
            <Mail className="h-5 w-5" /> Contact Us
        </Link>
      </section>
    </div>
  );
}
