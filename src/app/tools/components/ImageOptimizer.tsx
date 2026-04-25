'use client';

import React, { useState, ChangeEvent, DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Download, ImageUp, Sparkles, Trash2, Loader2, Archive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import JSZip from 'jszip';
import { ScrollArea } from '@/components/ui/scroll-area';

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

interface ImageFile {
  original: { file: File; src: string; name: string; size: number };
  optimized: { src: string; size: number } | null;
  id: string;
}

export function ImageOptimizer() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    toast({ title: `Optimizing ${files.length} image(s) to high-quality JPG...` });

    const newImagesPromises = Array.from(files).map(file =>
      new Promise<ImageFile>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          if (!e.target?.result) return reject(new Error("Couldn't read file"));

          const originalSrc = e.target.result as string;
          const img = new window.Image();
          img.src = originalSrc;

          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
              const base64Data = dataUrl.split(',')[1];
              const byteCharacters = atob(base64Data);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], { type: 'image/jpeg' });

              resolve({
                id: `${file.name}-${file.lastModified}-${Math.random()}`,
                original: { file, src: originalSrc, name: file.name, size: file.size },
                optimized: { src: dataUrl, size: blob.size }
              });
            } else {
              reject(new Error('Canvas context not available'));
            }
          };
          img.onerror = () => reject(new Error('Image load error'));
        };
        reader.onerror = () => reject(new Error('File read error'));
        reader.readAsDataURL(file);
      })
    );

    try {
      const optimizedResults = await Promise.all(newImagesPromises);
      setImages(prev => [...prev, ...optimizedResults]);
      toast({ title: 'Optimization complete!' });
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'An error occurred during optimization.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (image: ImageFile) => {
    if (image.optimized) {
      const link = document.createElement('a');
      link.href = image.optimized.src;
      const originalName = image.original.name.split('.').slice(0, -1).join('.') || 'optimized-image';
      link.download = `${originalName}.jpg`;
      link.click();
    }
  };

  const handleDownloadAllZip = async () => {
    const optimizedImages = images.filter(img => img.optimized);
    if (optimizedImages.length === 0) {
      toast({ variant: 'destructive', title: 'No optimized images to download.' });
      return;
    }

    const zip = new JSZip();
    optimizedImages.forEach((image) => {
      if (image.optimized) {
        const base64Data = image.optimized.src.split(',')[1];
        const originalName = image.original.name.split('.').slice(0, -1).join('.') || `image-${image.id}`;
        zip.file(`${originalName}.jpg`, base64Data, { base64: true });
      }
    });

    try {
      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "optimized-images.zip";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Failed to create ZIP file.' });
    }
  }

  const handleClear = () => {
    setImages([]);
  }

  const hasOptimizedImages = images.some(img => img.optimized);

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Image Optimizer</CardTitle>
          <p className="text-muted-foreground">Compress and convert images to high-quality JPGs.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className="flex items-center justify-center w-full"
            onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
            onDrop={(e: DragEvent<HTMLDivElement>) => {
              e.preventDefault();
              if (e.dataTransfer.files) {
                handleImageUpload(e.dataTransfer.files);
              }
            }}
          >
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-background/50 hover:bg-background">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImageUp className="w-10 h-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-muted-foreground">Upload multiple PNG, JPG, GIF, WEBP files</p>
              </div>
              <input id="file-upload" type="file" className="hidden" accept="image/*" multiple onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageUpload(e.target.files)} />
            </label>
          </div>

          {isProcessing && (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              <span>Optimizing images...</span>
            </div>
          )}

          {images.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                <Button onClick={handleDownloadAllZip} disabled={!hasOptimizedImages}>
                  <Archive className="mr-2 h-4 w-4" /> Download All (.zip)
                </Button>
                <Button onClick={handleClear} variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Clear All
                </Button>
              </div>
              <ScrollArea className="h-96 w-full pr-4">
                <div className="space-y-4">
                  {images.map((image) => (
                    <Card key={image.id} className="p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                        <div className="relative w-full h-32">
                          <Image src={image.original.src} alt={image.original.name} fill className="object-contain" sizes="150px" />
                        </div>
                        <div className="sm:col-span-2 space-y-2">
                          <p className="font-semibold truncate text-sm" title={image.original.name}>{image.original.name}</p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                            <p>Original: <span className="font-mono">{formatBytes(image.original.size)}</span></p>
                            {image.optimized ? (
                              <p>Optimized: <span className="font-mono">{formatBytes(image.optimized.size)}</span></p>
                            ) : <Loader2 className="h-3 w-3 animate-spin" />}
                          </div>
                          {image.optimized && (
                            <div className="flex items-center gap-4">
                              <p className="text-sm font-bold text-green-600">
                                - {Math.round(100 - (image.optimized.size / image.original.size) * 100)}%
                              </p>
                              <Button size="sm" variant="outline" onClick={() => handleDownload(image)}>
                                <Download className="mr-2 h-3 w-3" /> Download
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="guide" className="border-none">
            <AccordionTrigger className="p-0 hover:no-underline [&>svg]:hidden">
              <FancyAccordionButton />
            </AccordionTrigger>
            <AccordionContent className="mt-2 p-6 rounded-lg bg-card/50 dark:bg-card/20 prose dark:prose-invert max-w-none text-sm">
              <p>This tool helps you compress and convert your images to JPG format directly in your browser, making them smaller for web use without a significant loss in quality.</p>
              <ol>
                <li>Upload one or more images by clicking the upload area or by dragging and dropping files onto it.</li>
                <li>Each image is automatically compressed to 90% JPG quality. You will see a list of your images with their original and new sizes.</li>
                <li>Download individual images by clicking the "Download" button next to each one.</li>
                <li>To download all optimized images at once, click the "Download All (.zip)" button.</li>
                <li>Click "Clear All" to remove all images and start over.</li>
              </ol>
              <p>It's perfect for web developers, bloggers, and content creators who need to quickly optimize multiple images for faster website loading times.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}



