
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Copy, Shuffle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export function TextScrambler() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const scramble = (mode: 'reverseWords' | 'shuffleLetters' | 'shuffleWords') => {
    if (!input.trim()) return;

    let result = '';
    const words = input.split(/(\s+)/); // Split by spaces, keeping them

    switch (mode) {
      case 'reverseWords':
        result = words.map(word => 
            /\s+/.test(word) ? word : word.split('').reverse().join('')
        ).join('');
        break;
      case 'shuffleLetters':
        result = words.map(word => 
            /\s+/.test(word) ? word : shuffleArray(word.split('')).join('')
        ).join('');
        break;
      case 'shuffleWords':
        const onlyWords = input.split(/\s+/).filter(Boolean);
        const shuffled = shuffleArray([...onlyWords]);
        result = shuffled.join(' ');
        break;
    }
    setOutput(result);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: 'Scrambled text copied!' });
    }
  };
  
  const handleClear = () => {
    setInput('');
    setOutput('');
  }

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
            <Shuffle className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Text Scrambler</CardTitle>
          <p className="text-muted-foreground">Shuffle, reverse, and scramble text in various ways.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="input-text">Original Text</Label>
                <Textarea
                    id="input-text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter text to scramble..."
                    rows={8}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="output-text">Scrambled Text</Label>
                <Textarea
                    id="output-text"
                    value={output}
                    readOnly
                    placeholder="Result will appear here..."
                    rows={8}
                />
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            <Button onClick={() => scramble('shuffleLetters')}>Shuffle Letters</Button>
            <Button onClick={() => scramble('reverseWords')}>Reverse Words</Button>
            <Button onClick={() => scramble('shuffleWords')}>Shuffle Words</Button>
          </div>

          <div className="flex justify-center gap-4">
            <Button onClick={handleCopy} disabled={!output} variant="outline">
              <Copy className="mr-2 h-4 w-4" /> Copy Result
            </Button>
            <Button onClick={handleClear} disabled={!input} variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
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
                    <p>This tool scrambles text in different fun ways. It's great for creating puzzles, testing layouts, or just having fun with words.</p>
                    <ol>
                        <li>Enter your text into the "Original Text" box.</li>
                        <li>Choose one of the scrambling options:</li>
                        <ul>
                            <li><strong>Shuffle Letters:</strong> Shuffles the letters inside each word (e.g., "hello world" becomes "olleh dlorw").</li>
                            <li><strong>Reverse Words:</strong> Reverses the letters of each word but keeps their order (e.g., "hello world" becomes "olleh dlrow").</li>
                            <li><strong>Shuffle Words:</strong> Shuffles the order of the words in the text (e.g., "hello world" could become "world hello").</li>
                        </ul>
                        <li>The scrambled text appears in the "Scrambled Text" box.</li>
                        <li>Use the "Copy Result" button to copy it, or "Clear" to start over.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
