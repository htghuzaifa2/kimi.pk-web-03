
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, Phone, MessageSquare, User, AtSign, Send, Heart, Sparkles, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { WHATSAPP_PHONE_NUMBER, APP_NAME } from '@/lib/constants';

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});


export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const contactMessage = `
      *New Message from ${APP_NAME} Website*
      
      *Name:* ${values.fullName}
      *Email:* ${values.email}
      
      *Message:*
      ${values.message}
    `;

    const encodedMessage = encodeURIComponent(contactMessage.trim());
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    toast({
      title: 'Redirecting to WhatsApp',
      description: 'Your message has been prepared. Please press send in WhatsApp.',
    });

    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-12 relative min-h-screen overflow-hidden">
      {/* Enhanced Animated background gradient with multiple layers and particle effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/25 via-primary/15 to-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-accent/25 via-accent/15 to-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 to-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        {/* Particle dots */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }} />
      </div>

      <header className="text-center mb-16 animate-fade-in-up relative">
        <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15 dark:from-primary/25 dark:via-accent/25 dark:to-primary/25 rounded-full border-2 border-primary/30 shadow-xl backdrop-blur-md hover:scale-105 transition-transform duration-300">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <span className="text-base font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-text-gradient">We're Here to Help</span>
          <Sparkles className="h-5 w-5 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[200%_auto] animate-text-gradient tracking-tight drop-shadow-2xl mb-2">
          Get in Touch
        </h1>
        <div className="flex justify-center gap-2 mb-6">
          <Star className="h-5 w-5 text-primary animate-pulse" fill="currentColor" />
          <Star className="h-5 w-5 text-accent animate-pulse" fill="currentColor" style={{ animationDelay: '0.3s' }} />
          <Star className="h-5 w-5 text-primary animate-pulse" fill="currentColor" style={{ animationDelay: '0.6s' }} />
        </div>
        <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
          At <span className="font-extrabold text-primary">✨ {APP_NAME} ✨</span>, we value our customers and are always here to help. Whether you have a question about our products, need assistance with an order, or simply want to connect, our support team is ready to assist you.
        </p>
      </header>

      {/* Palestine Support Banner - Made Even More Prominent */}
      <section className="mb-20 animate-fade-in-up max-w-5xl mx-auto" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-14 shadow-[0_20px_80px_rgba(34,197,94,0.3)] border-4 border-green-500/40 bg-gradient-to-br from-green-500/15 via-red-500/10 to-black/15 backdrop-blur-md hover:scale-[1.02] transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-red-500/10 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-white to-red-500 shadow-lg" />
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-white to-red-500 shadow-lg" />
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-green-500 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-red-500 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-red-500 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-green-500 rounded-br-3xl" />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="text-5xl md:text-6xl animate-bounce drop-shadow-2xl" style={{ animationDuration: '2s' }}>🇵🇸</span>
              <h2 className="text-4xl md:text-5xl font-extrabold font-headline bg-gradient-to-r from-green-600 via-red-600 to-green-600 bg-clip-text text-transparent bg-[200%_auto] animate-text-gradient drop-shadow-lg">
                We Stand with Palestine
              </h2>
              <span className="text-5xl md:text-6xl animate-bounce drop-shadow-2xl" style={{ animationDuration: '2s', animationDelay: '0.5s' }}>🇵🇸</span>
            </div>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-green-500 via-white to-red-500 rounded-full mb-6" />
            <p className="text-xl md:text-2xl font-bold text-foreground/95 leading-relaxed mb-4">
              <span className="inline-block animate-pulse text-green-600 dark:text-green-400 text-2xl">✊</span> Solidarity with the Palestinian people in their struggle for freedom, justice, and human rights. <span className="inline-block animate-pulse text-green-600 dark:text-green-400 text-2xl">✊</span>
            </p>
            <p className="mt-6 text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-600 via-white to-red-600 bg-clip-text text-transparent drop-shadow-lg">
              🕊️ FREE PALESTINE 🕊️
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-base md:text-lg font-bold">
              <span className="px-6 py-3 bg-green-500/30 border-2 border-green-500/50 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">⚖️ Justice</span>
              <span className="px-6 py-3 bg-red-500/30 border-2 border-red-500/50 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">🕊️ Freedom</span>
              <span className="px-6 py-3 bg-white/30 border-2 border-white/50 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">☮️ Peace</span>
              <span className="px-6 py-3 bg-green-500/30 border-2 border-green-500/50 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">❤️ Humanity</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-14 mb-20 max-w-5xl mx-auto">
        <Card className="group relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:shadow-[0_25px_70px_rgba(var(--primary),0.4)] hover:-translate-y-4 hover:scale-[1.05] text-center animate-fade-in-up border-[3px] border-primary/30 hover:border-primary/60 backdrop-blur-md bg-card/90 animate-float" style={{ animationDelay: '200ms', animationFillMode: 'backwards', animationDuration: '3s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 animate-shimmer" />
          </div>
          {/* Neon glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-primary/20" />
          <CardHeader className="items-center relative z-10 pb-4">
            <div className="p-6 bg-gradient-to-br from-primary/30 to-primary/15 dark:from-primary/40 dark:to-primary/25 rounded-full mb-6 group-hover:scale-[1.3] group-hover:rotate-[360deg] transition-all duration-700 shadow-2xl group-hover:shadow-[0_0_30px_rgba(var(--primary),0.6)]">
              <Mail className="h-12 w-12 text-primary group-hover:animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Email Support
            </h2>
          </CardHeader>
          <CardContent className="relative z-10">
            <a href="mailto:support@kimi.pk" className="text-xl md:text-2xl text-primary hover:text-accent transition-all duration-300 font-extrabold hover:underline hover:scale-110 inline-block">
              support@kimi.pk
            </a>
            <p className="text-muted-foreground mt-5 text-base md:text-lg font-bold">⚡ Our support team responds within 24 hours.</p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:shadow-[0_25px_70px_rgba(var(--accent),0.4)] hover:-translate-y-4 hover:scale-[1.05] text-center animate-fade-in-up border-[3px] border-accent/30 hover:border-accent/60 backdrop-blur-md bg-card/90 animate-float" style={{ animationDelay: '350ms', animationFillMode: 'backwards', animationDuration: '3s', animationDirection: 'reverse' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 animate-shimmer" />
          </div>
          {/* Neon glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-accent/20" />
          <CardHeader className="items-center relative z-10 pb-4">
            <div className="p-6 bg-gradient-to-br from-accent/30 to-accent/15 dark:from-accent/40 dark:to-accent/25 rounded-full mb-6 group-hover:scale-[1.3] group-hover:rotate-[360deg] transition-all duration-700 shadow-2xl group-hover:shadow-[0_0_30px_rgba(var(--accent),0.6)]">
              <Phone className="h-12 w-12 text-accent group-hover:animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              WhatsApp
            </h2>
          </CardHeader>
          <CardContent className="relative z-10">
            <a href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl text-accent hover:text-primary transition-all duration-300 font-extrabold hover:underline hover:scale-110 inline-block">
              +92 332 9105111
            </a>
            <p className="text-muted-foreground mt-5 text-base md:text-lg font-bold">💬 Chat with us instantly on WhatsApp.</p>
          </CardContent>
        </Card>
      </div>

      <section className="mb-20 animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-extrabold font-headline bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[200%_auto] animate-text-gradient drop-shadow-2xl">
              Send Us a Message
            </h2>
            <div className="flex justify-center gap-2 mt-4 mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
            <p className="text-muted-foreground mt-6 text-xl md:text-2xl font-bold">✨ Easily reach us on WhatsApp for quick assistance.</p>
          </div>
          <Card className="relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_30px_80px_rgba(var(--primary),0.3)] border-[3px] border-primary/40 hover:border-primary/60 backdrop-blur-lg bg-card/95">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-primary/15" />
            <div className="absolute inset-0 opacity-60">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/15 to-primary/0 animate-shimmer" style={{ animationDuration: '3s' }} />
            </div>
            <CardContent className="p-10 md:p-12 relative z-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-3 font-extrabold text-lg md:text-xl">
                        <div className="p-2.5 bg-gradient-to-br from-primary/30 to-primary/15 rounded-xl shadow-lg">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your full name"
                          {...field}
                          className="h-16 border-[3px] focus:border-primary focus:ring-[6px] focus:ring-primary/30 transition-all duration-300 text-lg font-semibold shadow-md hover:shadow-xl rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-3 font-extrabold text-lg md:text-xl">
                        <div className="p-2.5 bg-gradient-to-br from-accent/30 to-accent/15 rounded-xl shadow-lg">
                          <AtSign className="h-6 w-6 text-accent" />
                        </div>
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your.email@example.com"
                          {...field}
                          className="h-16 border-[3px] focus:border-accent focus:ring-[6px] focus:ring-accent/30 transition-all duration-300 text-lg font-semibold shadow-md hover:shadow-xl rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-3 font-extrabold text-lg md:text-xl">
                        <div className="p-2.5 bg-gradient-to-br from-primary/30 to-primary/15 rounded-xl shadow-lg">
                          <MessageSquare className="h-6 w-6 text-primary" />
                        </div>
                        Your Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your message here..."
                          rows={6}
                          {...field}
                          className="border-[3px] focus:border-primary focus:ring-[6px] focus:ring-primary/30 transition-all duration-300 resize-none text-lg font-semibold shadow-md hover:shadow-xl rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full group h-20 text-xl md:text-2xl font-extrabold bg-gradient-to-r from-primary via-accent to-primary hover:from-accent hover:via-primary hover:to-accent transition-all duration-500 shadow-[0_10px_40px_rgba(var(--primary),0.4)] hover:shadow-[0_15px_60px_rgba(var(--accent),0.5)] hover:scale-[1.03] border-[3px] border-primary/40 hover:border-accent/60 bg-[200%_auto] animate-gradient-x rounded-xl"
                  >
                    <Send className="mr-4 h-7 w-7 transition-transform duration-300 group-hover:translate-x-3 group-hover:rotate-45" />
                    Send Message via WhatsApp
                    <Sparkles className="ml-4 h-6 w-6 animate-pulse" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center max-w-4xl mx-auto relative overflow-hidden rounded-3xl p-12 md:p-16 animate-fade-in-up shadow-[0_20px_70px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_70px_rgba(0,0,0,0.5)] border-[3px] border-primary/40 backdrop-blur-md bg-card/90 hover:scale-[1.02] transition-all duration-500" style={{ animationDelay: '650ms', animationFillMode: 'backwards' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/15 to-primary/20" />
        <div className="absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/25 to-primary/0 animate-shimmer" style={{ animationDuration: '4s' }} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-4 mb-8">
            <Heart className="h-10 w-10 text-primary animate-pulse drop-shadow-2xl" fill="currentColor" />
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Commitment
            </h2>
            <Heart className="h-10 w-10 text-accent animate-pulse drop-shadow-2xl" fill="currentColor" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="h-1 w-40 mx-auto bg-gradient-to-r from-primary via-accent to-primary rounded-full mb-8" />
          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed mt-8 font-semibold">
            <span className="animate-text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-[200%_auto] bg-clip-text font-extrabold text-transparent">
              We believe in building trust through clear communication. Every query is important to us, and our goal is to provide you with fast, professional, and reliable support at every step of your journey with {APP_NAME}.
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
