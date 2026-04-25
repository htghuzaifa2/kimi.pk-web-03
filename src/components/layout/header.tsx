
'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { CartIcon } from '@/components/cart/cart-icon';
import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HeaderSearch } from '../search/header-search';
import Image from 'next/image';

const logoUrl = '/favicon.ico';


const mainNavItems = [
  { name: 'Home', href: '/' },
  { name: 'All Products', href: '/products' },
  { name: 'Categories', href: '/categories' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Tools', href: '/tools' },
];

const moreNavItems = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Shipping Policy', href: '/shipping-policy' },
    { name: 'Return Policy', href: '/return-policy' },
    { name: 'Cash on Delivery', href: '/cash-on-delivery' },
    { name: 'FAQ', href: '/faq' },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = pathname === href || (href.startsWith('/products') && pathname.startsWith('/products')) || (href.startsWith('/categories') && pathname.startsWith('/categories')) || (href.startsWith('/blogs') && pathname.startsWith('/blogs')) || (href.startsWith('/tools') && pathname.startsWith('/tools'));

    return (
        <div className="group relative">
            <Link
                href={href}
                className={cn(
                    'relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
                )}
            >
                <span className={cn('transition-colors', isActive ? 'text-primary font-semibold' : '')}>
                    {children}
                </span>
            </Link>
             <span
              className={cn(
                'absolute bottom-[-2px] left-0 h-0.5 w-full scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100',
                isActive ? 'scale-x-100' : '',
                'origin-center'
              )}
            />
        </div>
    );
}

function MobileNavLink({ href, children, closeMenu }: { href: string; children: React.ReactNode; closeMenu: () => void }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link
            href={href}
            onClick={closeMenu}
            className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                isActive ? "bg-accent text-accent-foreground font-semibold" : ""
            )}
        >
            <div className="text-base font-medium">{children}</div>
        </Link>
    );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="flex items-center gap-2 mr-2">
            <Image src={logoUrl} alt={`${APP_NAME} logo`} width={24} height={24} className="h-6 w-auto" />
            <span className="font-bold text-lg font-headline">{APP_NAME}</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {mainNavItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.name}
              </NavLink>
            ))}
             <DropdownMenu>
                <div className="group relative">
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0">
                            More
                            <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                     <span
                        className={cn(
                            'absolute bottom-[-2px] left-0 h-0.5 w-full scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100',
                            'origin-center'
                        )}
                    />
                </div>
                <DropdownMenuContent align="start">
                    {moreNavItems.map((item) => (
                        <DropdownMenuItem key={item.href} asChild>
                            <Link href={item.href}>{item.name}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
            <HeaderSearch />
            <CartIcon />
            <ThemeToggle />

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle className="text-left font-headline text-2xl">
                        {APP_NAME}
                    </SheetTitle>
                    <SheetDescription className="sr-only">Navigation menu for {APP_NAME} - Premium Cosmetics &amp; Beauty Store</SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-80px)] pr-4">
                    <nav className="flex flex-col gap-4 mt-6">
                        {mainNavItems.map((item) => (
                            <MobileNavLink key={item.href} href={item.href} closeMenu={() => setIsMobileMenuOpen(false)}>
                                {item.name}
                            </MobileNavLink>
                        ))}
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="more-pages" className="border-none">
                                <AccordionTrigger className="p-3 text-base font-medium hover:no-underline">More Pages</AccordionTrigger>
                                <AccordionContent className="pb-0 pl-4">
                                    <div className="flex flex-col gap-2">
                                        {moreNavItems.map((item) => (
                                            <MobileNavLink key={item.href} href={item.href} closeMenu={() => setIsMobileMenuOpen(false)}>
                                                {item.name}
                                            </MobileNavLink>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </nav>
                </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
