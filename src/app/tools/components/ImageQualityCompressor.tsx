'use client';

import React, { useState, useCallback, useMemo, ChangeEvent, DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Download, ImageUp, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const formatBytes = (bytes: number, decimals = 2) => {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

interface ImageFile {
  original: { src: string; name: string; size: number };
  optimized: { src: string; size: number } | null;
  id: string;
}

export function ImageQualityCompressor() {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [quality, setQuality] = useState(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (file: File | null) => {
    if (!file) return;
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = e => {
      if (!e.target?.result) {
        setIsProcessing(false);
        return;
      }
      const newImage = {
        id: `${file.name}-${file.lastModified}`,
        original: { src: e.target.result as string, name: file.name, size: file.size },
        optimized: null
      };
      setImage(newImage);
      compressImage(newImage.original.src, quality);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = useCallback((src: string, qualityValue: number) => {
    setIsProcessing(true);
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/webp', qualityValue / 100);
        const base64Data = dataUrl.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/webp' });

        setImage(prev => prev ? ({ ...prev, optimized: { src: dataUrl, size: blob.size } }) : null);
      }
      setIsProcessing(false);
    };
    img.onerror = () => {
      toast({ variant: 'destructive', title: "Failed to load image." });
      setIsProcessing(false);
    }
  }, [toast]);

  const handleQualityChange = (value: number[]) => {
    const newQuality = value[0];
    setQuality(newQuality);
    if (image) {
      compressImage(image.original.src, newQuality);
    }
  };

  const handleDownload = () => {
    if (image?.optimized) {
      const link = document.createElement('a');
      link.href = image.optimized.src;
      const originalName = image.original.name.split('.').slice(0, -1).join('.') || 'optimized-image';
      link.download = `${originalName}.webp`;
      link.click();
    }
  };

  const handleClear = () => {
    setImage(null);
  };

  const reductionPercentage = useMemo(() => {
    if (!image?.optimized || !image.original.size) return 0;
    return Math.round(100 - (image.optimized.size / image.original.size) * 100);
  }, [image]);

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
            <ImageIcon className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Image Compressor & Quality Preview</CardTitle>
          <p className="text-muted-foreground">Compress images to WEBP with a live quality preview.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!image ? (
            <div
              className="flex items-center justify-center w-full"
              onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
              onDrop={(e: DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleImageUpload(e.dataTransfer.files[0]);
                }
              }}
            >
              <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-background/50 hover:bg-background">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageUp className="w-10 h-10 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-muted-foreground">Upload a PNG, JPG, or GIF file</p>
                </div>
                <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageUpload(e.target.files ? e.target.files[0] : null)} />
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Original ({formatBytes(image.original.size)})</Label>
                  <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden">
                    <Image src={image.original.src} alt="Original" fill className="object-contain" sizes="(max-width: 768px) 50vw, 33vw" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Optimized ({formatBytes(image.optimized?.size ?? 0)}) - <span className="text-green-600 font-bold">-{reductionPercentage}%</span></Label>
                  <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden">
                    {isProcessing ? <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 animate-spin" /> :
                      (image.optimized && <Image src={image.optimized.src} alt="Optimized" fill className="object-contain" sizes="(max-width: 768px) 50vw, 33vw" />)
                    }
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="quality-slider">Quality: {quality}%</Label>
                <Slider
                  id="quality-slider"
                  min={10}
                  max={100}
                  step={10}
                  value={[quality]}
                  onValueChange={handleQualityChange}
                />
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={handleDownload} disabled={!image.optimized || isProcessing}>
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Button onClick={handleClear} variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Clear Image
                </Button>
              </div>
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
              <p>This advanced tool helps you visually compress your images to find the perfect balance between quality and file size.</p>
              <ol>
                <li>Upload an image by clicking the upload area or by dragging and dropping a file.</li>
                <li>The tool will automatically convert the image to the efficient WEBP format.</li>
                <li>Use the "Quality" slider to adjust the compression level from 10% to 100%.</li>
                <li>The side-by-side preview updates in real-time, showing you the visual result and the new file size.</li>
                <li>Once you're happy with the result, click "Download" to save your optimized WEBP image.</li>
              </ol>
              <p>It's the perfect utility for web developers, bloggers, and content creators who need granular control over their image optimization process.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}

