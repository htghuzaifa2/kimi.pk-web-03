'use client';

import Link from 'next/link';
import type { Tool } from '@/lib/tool-data';
import * as LucideIcons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  // Dynamically resolve the icon
  const IconComponent = (LucideIcons as any)[tool.icon || 'Wrench'] || LucideIcons.Wrench;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block h-full transition-all duration-500 ease-out hover:-translate-y-2"
    >
      <Card className="h-full relative overflow-hidden bg-card/40 dark:bg-card/10 backdrop-blur-md border-border/40 group-hover:border-primary/50 group-hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.1)] transition-all duration-500">
        {/* Hover Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

        <CardContent className="relative p-6 flex flex-col h-full items-start">
          <div className="mb-4 p-3 rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner">
            <IconComponent className="h-6 w-6" strokeWidth={1.5} />
          </div>

          <div className="space-y-2 flex-grow">
            <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300 font-headline">
              {tool.title}
            </h3>
            {tool.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {tool.description}
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
            <span>Explore Tool</span>
            <LucideIcons.ArrowRight className="h-3 w-3" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
