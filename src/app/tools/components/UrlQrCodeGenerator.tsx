
'use client';

import { useState }from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Link as LinkIcon, Download, Loader2, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export function UrlQrCodeGenerator() {
  const [url, setUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleGenerate = () => {
    if (!url || !isValidUrl(url)) {
      toast({
        variant: 'destructive',
        title: 'Invalid URL',
        description: 'Please enter a valid URL (e.g., https://example.com)',
      });
      return;
    }
    
    setIsLoading(true);
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodedUrl}`;
    
    // Preload the image to ensure it's generated before showing
    const img = new window.Image();
    img.src = apiUrl;
    img.onload = () => {
        setQrCodeUrl(apiUrl);
        setIsLoading(false);
    };
    img.onerror = () => {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not generate QR code. Please try again.',
        });
        setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!qrCodeUrl) return;
    try {
        const response = await fetch(qrCodeUrl);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Download Failed',
            description: 'Could not download the QR code image.',
        });
    }
  };

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                <QrCode className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold font-headline">URL to QR Code Generator</CardTitle>
            <p className="text-muted-foreground">Convert any URL into a scannable QR code.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url-input">Enter URL</Label>
            <Input
              id="url-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              type="url"
            />
          </div>
          <Button onClick={handleGenerate} disabled={isLoading} className="w-full" size="lg">
            <LinkIcon className="mr-2 h-5 w-5" />
            {isLoading ? 'Generating...' : 'Generate QR Code'}
          </Button>

          {(qrCodeUrl || isLoading) && (
            <div className="space-y-4 pt-4 border-t flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold">Your QR Code</h3>
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              ) : (
                <div className="p-4 bg-white rounded-md border inline-block">
                    <Image
                        src={qrCodeUrl}
                        alt="Generated QR Code"
                        width={250}
                        height={250}
                    />
                </div>
              )}
              {!isLoading && qrCodeUrl && (
                 <Button onClick={handleDownload} variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Download QR Code
                </Button>
              )}
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
                    <p>This tool lets you create a QR code for any website link instantly.</p>
                    <ol>
                        <li>Enter the full URL (including `https://`) into the input field.</li>
                        <li>Click the "Generate QR Code" button.</li>
                        <li>The scannable QR code image will appear below.</li>
                        <li>Use the "Download QR Code" button to save the image to your device as a PNG file.</li>
                    </ol>
                    <p>It's perfect for sharing website links on posters, business cards, or social media, allowing people to visit your site with a quick camera scan.</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
