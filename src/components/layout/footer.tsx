'use client';

import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const footerLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Shipping Policy', href: '/shipping-policy' },
  { name: 'Return Policy', href: '/return-policy' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
  { name: 'Cash on Delivery', href: '/cash-on-delivery' },
  { name: 'FAQ', href: '/faq' },
];

export function Footer() {
  const pathname = usePathname();
  const showAd = pathname.startsWith('/blogs') || pathname.startsWith('/tools');

  return (
    <>
      {showAd && (
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-center gap-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/40 to-border/10"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 whitespace-nowrap">Sponsored Content</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border/40 to-border/10"></div>
          </div>
          <div className="rounded-2xl border border-border bg-muted/30 p-6 shadow-2xl backdrop-blur-md">
            <div id="ad-container" className="flex min-h-[90px] items-center justify-center text-xs text-muted-foreground/30">
              Ad placement available
            </div>
          </div>
        </div>
      )}
      <footer className="border-t bg-background text-foreground">
        <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
              {footerLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                  {link.name}
                </Link>
              ))}
            </nav>
            <p className="mt-6 text-center text-xs">
              <span className="animate-text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-[200%_auto] bg-clip-text font-semibold text-transparent">
                &copy; {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
