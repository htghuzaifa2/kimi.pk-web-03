'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { ProductImage } from '@/lib/products';
import { BLUR_DATA_URL } from '@/lib/constants';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

type FullScreenImageViewerProps = {
  images: ProductImage[];
  startIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function FullScreenImageViewer({ images, startIndex, open, onOpenChange }: FullScreenImageViewerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: startIndex });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (open && emblaApi) {
      emblaApi.scrollTo(startIndex, true);
    }
  }, [open, startIndex, emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollPrev();
      if (e.key === 'ArrowRight') scrollNext();
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, scrollPrev, scrollNext, onOpenChange]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 border-0 bg-black/95 w-screen h-screen max-w-none flex items-center justify-center overflow-hidden"
        hideCloseButton={true}
        aria-describedby={undefined} // Eliminate missing description warning if content self-describes
      >
        <DialogTitle className="sr-only">Full-screen Product Image Viewer</DialogTitle>
        <DialogDescription className="sr-only">
          A full-screen, zoomable view of product images. Use arrows to navigate.
        </DialogDescription>

        {/* Carousel Area */}
        <div className="overflow-hidden w-full h-full" ref={emblaRef}>
          <div className="flex h-full">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative flex-[0_0_100%] min-w-0 h-full flex items-center justify-center"
              >
                <TransformWrapper
                  initialScale={1}
                  minScale={1}
                  maxScale={4}
                  centerOnInit
                  onZoom={(ref) => setScale(ref.state.scale)}
                  onTransformed={(ref) => setScale(ref.state.scale)}
                  panning={{ disabled: scale === 1, velocityDisabled: true }}
                  wheel={{ disabled: true }} // Let user scroll page or standard behavior? Better disable to avoid confusion
                  doubleClick={{ disabled: true }} // We'll custom handle or let default? Default double click to zoom is nice.
                >
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                      {/* Controls Overlay */}
                      <div className="absolute top-4 right-4 z-[60] flex items-center gap-2 pointer-events-auto">
                        <div className="flex bg-black/50 backdrop-blur-md rounded-full p-1 border border-white/10">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => zoomOut()}
                            disabled={scale <= 1}
                            className="h-10 w-10 text-white hover:bg-white/20 rounded-full"
                          >
                            <ZoomOut className="h-5 w-5" />
                          </Button>
                          <div className="flex items-center px-2 text-white font-mono text-sm min-w-[3ch] justify-center">
                            {Math.round(scale * 100)}%
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => zoomIn()}
                            disabled={scale >= 4}
                            className="h-10 w-10 text-white hover:bg-white/20 rounded-full"
                          >
                            <ZoomIn className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => resetTransform()}
                            disabled={scale === 1}
                            className="h-10 w-10 text-white hover:bg-white/20 rounded-full"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onOpenChange(false)}
                          className="h-12 w-12 rounded-full bg-black/30 hover:bg-white/20 text-white border border-white/10"
                          aria-label="Close image viewer"
                        >
                          <X className="h-6 w-6" />
                        </Button>
                      </div>

                      <TransformComponent
                        wrapperStyle={{ width: '100%', height: '100%' }}
                        contentStyle={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10">
                          <Image
                            src={image.url}
                            alt={image.altText}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            data-ai-hint="product image"
                            placeholder="blur"
                            blurDataURL={BLUR_DATA_URL}
                            draggable={false}
                          />
                        </div>
                      </TransformComponent>
                    </>
                  )}
                </TransformWrapper>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows (Only show if not zoomed in deep, or allow anyway for switching?) 
            Usually better to hide if zoomed in to avoid accidental switch, or keep and just reset zoom (which logic handles).
        */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-black/20 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm z-50 hover:scale-110 disabled:opacity-0 transition-all"
              aria-label="Previous image"
              disabled={scale > 1.1} // Disable nav when zoomed in to prevent confusion
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-black/20 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm z-50 hover:scale-110 disabled:opacity-0 transition-all"
              aria-label="Next image"
              disabled={scale > 1.1}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </>
        )}

        {/* Bottom Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white text-sm z-50">
          {images.length > 0 && emblaApi ? `${emblaApi.selectedScrollSnap() + 1} / ${images.length}` : ''}
        </div>
      </DialogContent>
    </Dialog>
  );
}

