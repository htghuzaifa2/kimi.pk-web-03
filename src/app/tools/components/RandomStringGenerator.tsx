
'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Copy, RefreshCw, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

const charset = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>/?',
};

type CharsetOptions = {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
}

export function RandomStringGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState<CharsetOptions>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [generatedString, setGeneratedString] = useState('');
  const { toast } = useToast();

  const generateString = useCallback(() => {
    let availableChars = '';
    if (options.uppercase) availableChars += charset.uppercase;
    if (options.lowercase) availableChars += charset.lowercase;
    if (options.numbers) availableChars += charset.numbers;
    if (options.symbols) availableChars += charset.symbols;

    if (!availableChars || length <= 0) {
      setGeneratedString('');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
    }
    setGeneratedString(result);
  }, [length, options]);
  
  useEffect(() => {
    generateString();
  }, [generateString]);


  const handleCopy = () => {
    if (generatedString) {
      navigator.clipboard.writeText(generatedString);
      toast({ title: 'Copied to clipboard!' });
    }
  };

  const handleOptionChange = (option: keyof CharsetOptions) => {
    setOptions(prev => {
        const newOptions = { ...prev, [option]: !prev[option] };
        // Ensure at least one option is selected
        if (Object.values(newOptions).every(v => !v)) {
            toast({ variant: 'destructive', title: 'At least one character type must be selected.' });
            return prev;
        }
        return newOptions;
    });
  };

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
            <KeyRound className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Random String Generator</CardTitle>
          <p className="text-muted-foreground">Create secure random strings for passwords, keys, and more.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="length-slider">String Length: {length}</Label>
            <Slider
              id="length-slider"
              min={4}
              max={128}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.keys(options) as Array<keyof CharsetOptions>).map(key => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox id={key} checked={options[key]} onCheckedChange={() => handleOptionChange(key)} />
                <Label htmlFor={key} className="capitalize">{key}</Label>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="generated-string">Generated String</Label>
            <div className="flex items-center gap-2">
              <Input
                id="generated-string"
                value={generatedString}
                readOnly
                className="font-mono text-base"
                placeholder="Your random string will appear here..."
              />
              <Button variant="ghost" size="icon" onClick={handleCopy} disabled={!generatedString}>
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          </div>
          
          <Button onClick={generateString} size="lg" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Regenerate
          </Button>

        </CardContent>
      </Card>
      
      <div className="mt-6">
        <Accordion type="single" collapsible>
            <AccordionItem value="guide" className="border-none">
                <AccordionTrigger className="p-0 hover:no-underline [&>svg]:hidden">
                    <FancyAccordionButton />
                </AccordionTrigger>
                <AccordionContent className="mt-2 p-6 rounded-lg bg-card/50 dark:bg-card/20 prose dark:prose-invert max-w-none text-sm">
                    <p>This tool helps you generate secure, random strings for various purposes like passwords, API keys, or unique identifiers.</p>
                    <ol>
                        <li>Use the slider to set the desired length for your string (from 4 to 128 characters).</li>
                        <li>Select the character types you want to include: uppercase letters, lowercase letters, numbers, and symbols.</li>
                        <li>The tool automatically generates a new string whenever you change the settings.</li>
                        <li>Click the "Regenerate" button to create a new string with the current settings.</li>
                        <li>Use the copy icon next to the output to quickly copy the generated string to your clipboard.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
