'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, List } from 'lucide-react';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Extract headings from the article
        const elements = Array.from(document.querySelectorAll('article h2, article h3'))
            .map((element) => {
                if (!element.id) {
                    element.id = element.textContent?.toLowerCase().replace(/\W+/g, '-') || Math.random().toString(36).substring(2, 9);
                }
                return {
                    id: element.id,
                    text: element.textContent || '',
                    level: parseInt(element.tagName[1], 10),
                };
            });

        setHeadings(elements);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' }
        );

        document.querySelectorAll('article h2, article h3').forEach((elem) => observer.observe(elem));

        return () => observer.disconnect();
    }, []);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
            setIsOpen(false);
            setIsHovered(false);
        }
    };

    if (headings.length === 0) return null;

    return (
        <>
            {/* PC Version: Sidebar with Bars (Right Middle) */}
            <div
                className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 items-center justify-end group/toc h-[400px] pr-4 pointer-events-auto"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={cn(
                    "bg-card/95 backdrop-blur-2xl border border-border shadow-2xl rounded-2xl transition-all duration-500 overflow-hidden flex flex-col",
                    isHovered ? "w-72 max-h-[85vh] opacity-100 translate-x-0 scale-100 mr-4" : "w-0 max-h-0 opacity-0 translate-x-8 scale-95 pointer-events-none"
                )}>
                    <div className="p-4 border-b border-border bg-muted/50">
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                            <List className="h-3 w-3" />
                            <span>Navigation Panel</span>
                        </div>
                    </div>

                    <nav className="p-4 overflow-y-auto thin-scrollbar max-h-[60vh]">
                        <ul className="space-y-1">
                            {headings.map((heading) => (
                                <li key={heading.id}>
                                    <button
                                        onClick={() => scrollToHeading(heading.id)}
                                        className={cn(
                                            "w-full text-left py-2 px-3 rounded-lg text-sm transition-all duration-300 flex items-start gap-2 group/item",
                                            activeId === heading.id
                                                ? "text-primary font-bold bg-primary/10 border-l-2 border-primary pl-4"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted border-l-2 border-transparent"
                                        )}
                                    >
                                        {heading.level === 3 && <span className="ml-2 opacity-40">•</span>}
                                        <span className="flex-1 truncate">{heading.text}</span>
                                        <ChevronRight className={cn(
                                            "h-3 w-3 mt-1 opacity-0 group-hover/item:opacity-100 transition-opacity",
                                            activeId === heading.id && "opacity-100 text-primary"
                                        )} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Sidebar Bar Indicator (PC only) */}
                <div className={cn(
                    "flex flex-col gap-1.5 transition-all duration-500 items-end cursor-pointer",
                    isHovered ? "opacity-0 translate-x-4 pointer-events-none" : "opacity-100 translate-x-0"
                )}>
                    {headings.slice(0, 12).map((h) => (
                        <div
                            key={h.id}
                            className={cn(
                                "h-0.5 transition-all duration-300 rounded-full",
                                activeId === h.id ? "w-8 bg-primary shadow-[0_0_10px_rgba(225,29,115,0.6)]" : "w-4 bg-muted-foreground/30"
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Mobile Version: Floating Dot (Bottom Right) */}
            <div className="lg:hidden fixed right-6 bottom-24 z-50 flex items-center justify-end">
                <div className={cn(
                    "bg-card/95 backdrop-blur-xl border border-border shadow-2xl rounded-3xl transition-all duration-500 overflow-hidden flex flex-col absolute bottom-20 right-0",
                    isOpen ? "w-64 max-h-[60vh] opacity-100 scale-100" : "w-0 max-h-0 opacity-0 scale-90 pointer-events-none"
                )}>
                    <div className="p-4 border-b border-border bg-muted/50">
                        <span className="text-primary font-black uppercase tracking-widest text-[10px]">Contents</span>
                    </div>
                    <nav className="p-4 overflow-y-auto max-h-[50vh]">
                        <ul className="space-y-4">
                            {headings.map((heading) => (
                                <li key={heading.id}>
                                    <button
                                        onClick={() => scrollToHeading(heading.id)}
                                        className={cn(
                                            "w-full text-left transition-all text-sm",
                                            activeId === heading.id ? "text-primary font-bold" : "text-muted-foreground"
                                        )}
                                    >
                                        <span className="truncate block">{heading.text}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "h-14 w-14 rounded-full border flex items-center justify-center transition-all duration-500 active:scale-95 shadow-2xl relative overflow-hidden group",
                        isOpen ? "bg-primary border-primary text-white" : "bg-card border-border text-primary"
                    )}
                >
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <List className={cn("h-6 w-6 transition-transform duration-500", isOpen && "rotate-90")} />
                </button>
            </div>
        </>
    );
}
