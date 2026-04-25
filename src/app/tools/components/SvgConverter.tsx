
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Download, ImageUp, Trash2, Copy, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';

export function SvgConverter() {
  const [originalImage, setOriginalImage] = useState<{ src: string; name: string, type: string } | null>(null);
  const [svgCode, setSvgCode] = useState<string>('');
  const { toast } = useToast();

  const handleImageUpload = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ variant: 'destructive', title: 'Invalid file type', description: 'Please upload an image file.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      if (e.target?.result) {
        const imageSrc = e.target.result as string;
        setOriginalImage({ src: imageSrc, name: file.name, type: file.type });
        
        const img = new window.Image();
        img.onload = () => {
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}" viewBox="0 0 ${img.width} ${img.height}">
  <image href="${imageSrc}" width="${img.width}" height="${img.height}" />
</svg>`;
            setSvgCode(svg);
            toast({ title: 'SVG generated successfully!' });
        };
        img.src = imageSrc;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!svgCode) return;
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const originalName = originalImage?.name.split('.').slice(0, -1).join('.') || 'converted-image';
    a.download = `${originalName}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!svgCode) return;
    navigator.clipboard.writeText(svgCode);
    toast({ title: 'SVG code copied to clipboard!' });
  };
  
  const handleClear = () => {
    setOriginalImage(null);
    setSvgCode('');
  }

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <ImageIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">Image to SVG Converter</CardTitle>
            <p className="text-muted-foreground">Convert any image (PNG, JPG) to an SVG file.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!originalImage ? (
            <div 
                className="flex items-center justify-center w-full"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
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
                        <p className="text-xs text-muted-foreground">Upload a PNG, JPG, or GIF</p>
                    </div>
                    <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0] ?? null)} />
                </label>
            </div>
          ) : (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-center">Original Image</h3>
                        <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden border">
                             <Image src={originalImage.src} alt="Original" fill className="object-contain p-2" sizes="(max-width: 768px) 50vw, 33vw" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <h3 className="font-semibold text-center">Generated SVG</h3>
                         <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden border">
                            {svgCode && <div className="w-full h-full p-2" dangerouslySetInnerHTML={{ __html: svgCode }} />}
                        </div>
                    </div>
                </div>

                {svgCode && (
                    <div className="space-y-4">
                        <Textarea value={svgCode} readOnly rows={6} className="font-mono text-xs" />
                        <div className="flex justify-center gap-4">
                            <Button onClick={handleCopy} variant="outline">
                                <Copy className="mr-2 h-4 w-4" /> Copy Code
                            </Button>
                            <Button onClick={handleDownload}>
                                <Download className="mr-2 h-4 w-4" /> Download .svg
                            </Button>
                        </div>
                    </div>
                )}
                 <div className="text-center">
                    <Button onClick={handleClear} variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Clear and Start Over
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
                    <p>This tool converts raster images like PNGs and JPGs into an SVG file by embedding the image data directly.</p>
                    <ol>
                        <li>Upload your image by clicking the upload area or dragging and dropping a file.</li>
                        <li>The tool will instantly generate the SVG code and show a preview.</li>
                        <li>You can then download the result as an `.svg` file or copy the raw SVG code to your clipboard for use in your web projects.</li>
                    </ol>
                    <p>It's perfect for web developers and designers who need to wrap an image in an SVG format for use in modern web layouts.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
