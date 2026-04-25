'use client';

import React, { useState, useCallback, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Clipboard, Binary, Sparkles, Loader2, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { explainBaseConversion } from '@/lib/ai-helper';
import { ScrollArea } from '@/components/ui/scroll-area';

const isValid = (base: number, value: string) => {
  if (value === '') return true;
  const regex = {
    2: /^[01]+$/,
    8: /^[0-7]+$/,
    10: /^[0-9]+$/,
    16: /^[0-9a-fA-F]+$/,
  };
  return regex[base as keyof typeof regex]?.test(value) ?? false;
};

export function BaseConverter() {
  const [values, setValues] = useState({
    '2': '',
    '8': '',
    '10': '',
    '16': '',
  });

  const [errors, setErrors] = useState({
    '2': false,
    '8': false,
    '10': false,
    '16': false,
  });

  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);
  const { toast } = useToast();

  const handleExplain = async () => {
    // Find the first base that has a value
    const fromBaseStr = Object.keys(values).find(b => values[b as keyof typeof values] !== '');
    if (!fromBaseStr) {
      toast({ variant: 'destructive', title: 'No input provided', description: 'Enter a number to see the explanation.' });
      return;
    }

    // For simplicity, explain conversion to Decimal if fromBase is not Decimal, else to Binary
    const fromBase = parseInt(fromBaseStr);
    const toBase = fromBase === 10 ? 2 : 10;
    const number = values[fromBaseStr as keyof typeof values];

    setIsExplaining(true);
    try {
      const result = await explainBaseConversion(number, fromBase, toBase);
      setExplanation(result);
      toast({ title: 'Explanation Ready!', description: `Logic for Base ${fromBase} to Base ${toBase}.` });
    } catch (err) {
      toast({ variant: 'destructive', title: 'AI Error', description: 'Failed to generate explanation.' });
    } finally {
      setIsExplaining(false);
    }
  };

  const handleCopy = (text: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast({ title: 'Copied to clipboard!' });
    }
  };

  const handleChange = useCallback((base: 2 | 8 | 10 | 16, value: string) => {
    if (!isValid(base, value)) {
      setErrors((prev: any) => ({ ...prev, [base]: true }));
      setValues((prev: any) => ({ ...prev, [base]: value }));
      return;
    }

    setErrors((prev: any) => ({ ...prev, [base]: false }));

    if (value === '') {
      setValues({ '2': '', '8': '', '10': '', '16': '' });
      setErrors({ '2': false, '8': false, '10': false, '16': false });
      return;
    }

    try {
      const decimalValue = parseInt(value, base);
      if (isNaN(decimalValue)) {
        setValues({ '2': '', '8': '', '10': '', '16': '' });
        return;
      }
      setValues({
        '2': decimalValue.toString(2),
        '8': decimalValue.toString(8),
        '10': decimalValue.toString(10),
        '16': decimalValue.toString(16).toUpperCase(),
      });
    } catch (e) {
      // It might fail for very large numbers, clear everything
      setValues({ '2': '', '8': '', '10': '', '16': '' });
    }
  }, []);

  const createInput = (base: 2 | 8 | 10 | 16, label: string) => (
    <div className="space-y-2">
      <Label htmlFor={`base-${base}`}>{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          id={`base-${base}`}
          value={values[String(base) as keyof typeof values]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(base, e.target.value)}
          className={`font-mono ${errors[String(base) as keyof typeof errors] ? 'border-destructive focus-visible:ring-destructive' : ''}`}
          placeholder={`Enter ${label.toLowerCase()} value`}
        />
        <Button variant="ghost" size="icon" onClick={() => handleCopy(values[String(base) as keyof typeof values])}>
          <Clipboard className="h-4 w-4" />
        </Button>
      </div>
      {errors[base] && <p className="text-xs text-destructive">Invalid {label.toLowerCase()} value</p>}
    </div>
  );

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
            <Binary className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Base Converter</CardTitle>
          <p className="text-muted-foreground">Convert numbers between different bases.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {createInput(2, 'Binary')}
          {createInput(8, 'Octal')}
          {createInput(10, 'Decimal')}
          {createInput(16, 'Hexadecimal')}

          <div className="pt-4 border-t border-border/50">
            <Button
              onClick={handleExplain}
              disabled={isExplaining || !Object.values(values).some(v => v !== '')}
              className="w-full bg-gradient-to-r to-pink-500 to-red-500 hover:to-pink-500 hover:to-red-600 text-white shadow-lg shadow-pink-500/20"
            >
              {isExplaining ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Brain className="mr-2 h-4 w-4" />}
              Explain Mathematical Logic
            </Button>

            {explanation && (
              <div className="mt-6 p-4 rounded-xl bg-pink-500/5 border border-pink-500/20 animate-in zoom-in-95 duration-500">
                <div className="flex items-center gap-2 text-pink-600 mb-3 font-bold italic text-sm">
                  <Sparkles className="h-3 w-3" />
                  <span>Step-by-Step Logic</span>
                </div>
                <ScrollArea className="h-48 w-full pr-4">
                  <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap prose prose-sm dark:prose-invert max-w-none">
                    {explanation}
                  </div>
                </ScrollArea>
              </div>
            )}
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
              <p>This tool helps you convert numbers between binary, octal, decimal, and hexadecimal bases in real-time.</p>
              <ol>
                <li>Start typing a number in any of the input fields (e.g., type `1010` in the Binary field).</li>
                <li>As you type, all other fields will automatically update with the converted values.</li>
                <li>If you enter an invalid character for a specific base (e.g., typing '2' in the binary field), the border will turn red to indicate an error.</li>
                <li>Use the copy icon next to any field to quickly copy its value to your clipboard.</li>
              </ol>
              <p>It's a handy utility for developers, computer science students, and anyone working with different number systems.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
