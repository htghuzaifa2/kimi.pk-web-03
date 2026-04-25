'use client';

import React, { useState, ChangeEvent, DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Download, ImageUp, Sparkles, Trash2, Loader2, Archive, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import JSZip from 'jszip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

type ImageFormat = 'jpeg' | 'png' | 'webp' | 'gif';

interface ImageFile {
  id: string;
  original: { file: File; src: string; name: string; size: number };
  converted: { src: string; size: number; format: ImageFormat; } | null;
}

export function ImageConverter() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>('jpeg');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newImages: ImageFile[] = await Promise.all(
      Array.from(files).map(file =>
        new Promise<ImageFile>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = e => {
            if (!e.target?.result) return reject(new Error("Couldn't read file"));
            resolve({
              id: `${file.name}-${file.lastModified}-${Math.random()}`,
              original: { file, src: e.target.result as string, name: file.name, size: file.size },
              converted: null,
            });
          };
          reader.onerror = () => reject(new Error('File read error'));
          reader.readAsDataURL(file);
        })
      )
    );
    setImages(prev => [...prev, ...newImages]);
  };

  const handleConversion = async () => {
    const imagesToConvert = images.filter(img => !img.converted || img.converted.format !== targetFormat);
    if (imagesToConvert.length === 0) {
      toast({ title: 'All images are already in the selected format or not uploaded.' });
      return;
    }

    setIsProcessing(true);
    toast({ title: `Converting ${imagesToConvert.length} image(s) to ${targetFormat.toUpperCase()}...` });

    const conversionPromises = imagesToConvert.map(async (imageFile) => {
      return new Promise<ImageFile>((resolve, reject) => {
        const img = new window.Image();
        img.src = imageFile.original.src;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL(`image/${targetFormat}`, 1.0);
            const base64Data = dataUrl.split(',')[1];
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: `image/${targetFormat}` });

            resolve({ ...imageFile, converted: { src: dataUrl, size: blob.size, format: targetFormat } });
          } else {
            reject(new Error('Could not get canvas context'));
          }
        };
        img.onerror = () => reject(new Error('Image load error'));
      });
    });

    try {
      const convertedResults = await Promise.all(conversionPromises);
      setImages(currentImages => {
        const updatedImages = currentImages.map(img => {
          const convertedVersion = convertedResults.find(cImg => cImg.id === img.id);
          return convertedVersion ? convertedVersion : img;
        });
        return updatedImages;
      });
      toast({ title: 'Conversion complete!' });
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'An error occurred during conversion.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (image: ImageFile) => {
    if (image.converted) {
      const link = document.createElement('a');
      link.href = image.converted.src;
      const originalName = image.original.name.split('.').slice(0, -1).join('.') || 'converted-image';
      link.download = `${originalName}.${image.converted.format}`;
      link.click();
    }
  };

  const handleDownloadAllZip = async () => {
    const convertedImages = images.filter(img => img.converted);
    if (convertedImages.length === 0) {
      toast({ variant: 'destructive', title: 'No converted images to download. Please convert them first.' });
      return;
    }

    const zip = new JSZip();
    convertedImages.forEach((image) => {
      if (image.converted) {
        const base64Data = image.converted.src.split(',')[1];
        const originalName = image.original.name.split('.').slice(0, -1).join('.') || `image-${image.id}`;
        zip.file(`${originalName}.${image.converted.format}`, base64Data, { base64: true });
      }
    });

    try {
      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `converted-images.zip`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (e) {
      console.error(e);
      toast({ variant: 'destructive', title: 'Failed to create ZIP file.' });
    }
  }

  const handleClear = () => {
    setImages([]);
  }

  const hasConvertedImages = images.some(img => img.converted);

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
            <Settings className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Image Converter</CardTitle>
          <p className="text-muted-foreground">Convert images to JPG, PNG, WEBP, or GIF.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className="flex items-center justify-center w-full"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
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
                <p className="text-xs text-muted-foreground">Upload multiple image files</p>
              </div>
              <input id="file-upload" type="file" className="hidden" accept="image/*" multiple onChange={(e) => handleImageUpload(e.target.files)} />
            </label>
          </div>

          {images.length > 0 && (
            <>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="space-y-2">
                  <Label htmlFor="format-select">Convert to:</Label>
                  <Select value={targetFormat} onValueChange={(value: ImageFormat) => setTargetFormat(value)}>
                    <SelectTrigger id="format-select" className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Select Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jpeg">JPG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WEBP</SelectItem>
                      <SelectItem value="gif">GIF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleConversion} disabled={isProcessing} size="lg" className="sm:self-end w-full sm:w-auto">
                  {isProcessing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
                  {isProcessing ? 'Converting...' : `Convert to ${targetFormat.toUpperCase()}`}
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center gap-4">
                  <Button onClick={handleDownloadAllZip} disabled={!hasConvertedImages}>
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
                              {isProcessing && images.find(i => i.id === image.id) && !images.find(i => i.id === image.id)?.converted && <Loader2 className="h-3 w-3 animate-spin" />}
                              {image.converted ? (
                                <p>Converted: <span className="font-mono">{formatBytes(image.converted.size)} ({image.converted.format.toUpperCase()})</span></p>
                              ) : null}
                            </div>
                            {image.converted && (
                              <div className="flex items-center gap-4">
                                <p className="text-sm font-bold text-green-600">
                                  {image.original.size > image.converted.size ? '-' : '+'}
                                  {Math.abs(100 - (image.converted.size / image.original.size) * 100).toFixed(0)}%
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
            </>
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
              <p>This tool helps you convert your images to JPG, PNG, WEBP, or GIF format directly in your browser. It's useful for web development, sharing on social media, or ensuring compatibility.</p>
              <ol>
                <li>Upload one or more images by clicking the upload area or by dragging and dropping files.</li>
                <li>Select your desired output format from the dropdown menu (e.g., JPG, PNG, WEBP).</li>
                <li>Click the "Convert" button to start the process. The tool will convert all uploaded images to the selected format.</li>
                <li>You'll see a list of your images with their original and new sizes.</li>
                <li>Download individual images by clicking the "Download" button next to each one, or download all converted images at once in a ZIP file.</li>
              </ol>
              <p>It's perfect for anyone needing to quickly change image formats without installing any software.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}



