
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Copy, Clipboard, Trash2, PenLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

function convertChunk(num: number): string {
    if (num === 0) return '';
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    
    const ten = Math.floor(num / 10);
    const one = num % 10;
    
    return `${tens[ten]} ${ones[one]}`.trim();
}

function numberToWords(num: number): string {
    if (num === 0) return 'Zero';
    
    const isNegative = num < 0;
    if (isNegative) num = -num;

    let words = '';
    let scaleIndex = 0;
    
    while (num > 0) {
        if (num % 1000 !== 0) {
            const chunk = num % 1000;
            const hundreds = Math.floor(chunk / 100);
            const remainder = chunk % 100;
            
            let chunkWords = '';
            if (hundreds > 0) {
                chunkWords += `${ones[hundreds]} Hundred`;
            }
            if (remainder > 0) {
                if (hundreds > 0) chunkWords += ' ';
                chunkWords += convertChunk(remainder);
            }

            words = `${chunkWords} ${scales[scaleIndex]} ${words}`.trim();
        }
        num = Math.floor(num / 1000);
        scaleIndex++;
    }
    
    return (isNegative ? 'Minus ' : '') + words.trim();
}


export function NumberToWordsConverter() {
  const [inputNumber, setInputNumber] = useState('');
  const { toast } = useToast();

  const convertedText = useMemo(() => {
    if (!inputNumber.trim()) return '';
    const num = parseFloat(inputNumber.replace(/,/g, ''));
    if (isNaN(num)) return 'Invalid number';
    if (num > 9007199254740991) return 'Number is too large to be safely represented.';

    const [integerPart, decimalPart] = String(num).split('.');

    const integerWords = numberToWords(parseInt(integerPart, 10));
    let decimalWords = '';

    if (decimalPart) {
      decimalWords = ' point ' + decimalPart.split('').map(digit => ones[parseInt(digit, 10)] || 'Zero').join(' ');
    }

    return (integerWords + decimalWords).trim();
  }, [inputNumber]);
  

  const handleCopy = () => {
    if (convertedText && convertedText !== 'Invalid number') {
      navigator.clipboard.writeText(convertedText);
      toast({ title: 'Copied to clipboard!' });
    }
  };

  const handleClear = () => {
    setInputNumber('');
  };

  const handlePaste = async () => {
    try {
        const text = await navigator.clipboard.readText();
        setInputNumber(text);
        toast({ title: 'Pasted from clipboard!' });
    } catch (err) {
        toast({ variant: 'destructive', title: 'Failed to read clipboard.' });
    }
  }

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
            <PenLine className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Number to Words Converter</CardTitle>
          <p className="text-muted-foreground">Convert numbers into English words instantly.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
             <Label htmlFor="number-input">Enter Number</Label>
             <div className="flex gap-2">
                <Textarea
                    id="number-input"
                    value={inputNumber}
                    onChange={(e) => setInputNumber(e.target.value)}
                    placeholder="e.g., 12345.67"
                    rows={2}
                    className="font-mono text-lg"
                />
                <div className="flex flex-col gap-2">
                    <Button variant="outline" size="icon" onClick={handlePaste} aria-label="Paste">
                        <Clipboard className="h-4 w-4" />
                    </Button>
                     <Button variant="destructive" size="icon" onClick={handleClear} aria-label="Clear" disabled={!inputNumber}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
             </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="words-output">Result in Words</Label>
            <div className="flex items-start gap-2">
                <Textarea
                    id="words-output"
                    value={convertedText}
                    readOnly
                    placeholder="Your result will appear here..."
                    rows={4}
                    className="text-base"
                />
                <Button variant="outline" size="icon" onClick={handleCopy} disabled={!convertedText || convertedText === 'Invalid number'}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                </Button>
            </div>
          </div>

        </CardContent>
      </Card>
      
      <div className="mt-6">
        <Accordion type="single" collapsible>
            <AccordionItem value="guide" className="border-none">
                <AccordionTrigger className="p-0 hover:no-underline [&>svg]:hidden">
                    <FancyAccordionButton />
                </AccordionTrigger>
                <AccordionContent className="mt-2 p-6 rounded-lg bg-card/50 dark:bg-card/20 prose dark:prose-invert max-w-none text-sm">
                    <p>This tool helps you convert any number into its English word representation, which is useful for writing checks, formal documents, or educational purposes.</p>
                    <ol>
                        <li>Enter any number (including decimals) into the input box. You can also paste a number from your clipboard.</li>
                        <li>The number will be instantly converted into words in the "Result in Words" box.</li>
                        <li>The tool handles integers and decimal points.</li>
                        <li>Use the copy icon to copy the result, or the trash icon to clear your input.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
