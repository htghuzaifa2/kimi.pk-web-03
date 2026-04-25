
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShoppingCart, Share2, Copy, ArrowLeft } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { AppProduct, ProductImage } from '@/lib/products';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import { BLUR_DATA_URL } from '@/lib/constants';
import { FullScreenImageViewer } from './FullScreenImageViewer';

type ProductDetailsClientProps = {
  product: AppProduct;
};

function CarouselImage({ img, index, onClick }: { img: ProductImage, index: number, onClick: () => void }) {
  return (
    <Card className="overflow-hidden cursor-pointer border-0 rounded-lg shadow-sm" onClick={onClick}>
      <CardContent className="relative aspect-square p-0">
        <Image
          src={img.url}
          alt={img.altText}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
          data-ai-hint="product image"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </CardContent>
    </Card>
  )
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const router = useRouter();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenStartIndex, setFullScreenStartIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setFullScreenStartIndex(index);
    setIsFullScreen(true);
  };

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      slug: product.slug,
    };
    addToCart(cartProduct);
  }

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    const onSelect = (api: CarouselApi) => {
      if (!api) return;
      setCurrent(api.selectedScrollSnap());
    };
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Copied to clipboard!",
      description: "You can now share the link with others.",
    });
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this product: ${product.name}`,
        url: window.location.href,
      }).catch((error) => {
        if (error.name !== 'AbortError') {
          console.error(error);
        }
      });
    } else {
      copyUrlToClipboard();
    }
  };

  const hasDetails = product.longDescription || (product.specifications && Object.keys(product.specifications).length > 0);

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="lg:sticky lg:top-24">
            <Button
              variant="outline"
              size="icon"
              className="absolute -top-4 -left-2 z-10 hidden md:flex"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Go back</span>
            </Button>
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{
                loop: true,
              }}
            >
              <CarouselContent>
                {product.images.map((img, index) => (
                  <CarouselItem key={index} className="group">
                    <CarouselImage img={img} index={index} onClick={() => handleImageClick(index)} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {product.images.length > 1 && (
                <>
                  <CarouselPrevious className="left-2 md:left-4" />
                  <CarouselNext className="right-2 md:right-4" />
                </>
              )}
            </Carousel>
            {product.images.length > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={cn(
                      'h-2 w-2 rounded-full transition-all',
                      current === index ? 'w-6 bg-primary' : 'bg-muted-foreground/50 hover:bg-muted-foreground'
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-6">
            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">{product.name}</h1>
            <div className="flex items-baseline gap-3">
              <p className="text-3xl lg:text-4xl font-bold text-primary">PKR {product.price.toLocaleString()}</p>
              {(product.compareAtPrice ?? 0) > product.price ? (
                <p className="text-lg font-medium text-muted-foreground line-through">PKR {product.compareAtPrice!.toLocaleString()}</p>
              ) : null}
            </div>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <Button size="lg" className="w-full sm:w-auto flex-grow text-lg" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <div className="flex items-center gap-2 justify-center">
                <Button variant="outline" size="icon" aria-label="Share" onClick={shareProduct}>
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Copy link" onClick={copyUrlToClipboard}>
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {hasDetails && (
              <Accordion type="single" collapsible className="w-full pt-4">
                {product.longDescription && (
                  <AccordionItem value="description">
                    <AccordionTrigger className="text-lg font-semibold">Description</AccordionTrigger>
                    <AccordionContent>
                      <div className="prose dark:prose-invert max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: product.longDescription.replace(/\n/g, '<br />') }} />
                    </AccordionContent>
                  </AccordionItem>
                )}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <AccordionItem value="specifications">
                    <AccordionTrigger className="text-lg font-semibold">Specifications</AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableBody>
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <TableRow key={key}>
                              <TableCell className="font-medium capitalize">{key.replace(/_/g, ' ')}</TableCell>
                              <TableCell>{value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            )}
          </div>
        </div>
      </div>
      <FullScreenImageViewer
        images={product.images}
        startIndex={fullScreenStartIndex}
        open={isFullScreen}
        onOpenChange={setIsFullScreen}
      />
    </>
  );
}
