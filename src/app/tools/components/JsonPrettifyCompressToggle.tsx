'use client';

import React, { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Copy, Braces, Trash2, Sparkles, Loader2, Wand2, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { generateJsonSchema } from '@/lib/ai-helper';
import { ScrollArea } from '@/components/ui/scroll-area';

export function JsonPrettifyCompressToggle() {
  const [jsonInput, setJsonInput] = useState('');
  const [isPrettified, setIsPrettified] = useState(true);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSchema, setGeneratedSchema] = useState('');
  const { toast } = useToast();

  const handleAiGenerate = async () => {
    if (!jsonInput.trim() || error) {
      toast({ variant: 'destructive', title: 'Invalid JSON', description: 'Please provide valid JSON to generate schema.' });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateJsonSchema(jsonInput);
      setGeneratedSchema(result);
      toast({
        title: 'Schema Generated!',
        description: 'TypeScript interface and JSON Schema are ready.',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'AI was unable to generate schema for this JSON.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggle = () => {
    if (!jsonInput.trim()) return;
    try {
      const parsed = JSON.parse(jsonInput);
      if (isPrettified) {
        setJsonInput(JSON.stringify(parsed));
      } else {
        setJsonInput(JSON.stringify(parsed, null, 2));
      }
      setIsPrettified(!isPrettified);
      setError('');
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      toast({ variant: 'destructive', title: 'Invalid JSON', description: e.message });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setJsonInput(newText);
    if (!newText.trim()) {
      setError('');
      return;
    }
    try {
      JSON.parse(newText);
      setError('');
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
    }
  };

  const handleCopy = () => {
    if (jsonInput && !error) {
      navigator.clipboard.writeText(jsonInput);
      toast({ title: "Copied to clipboard!" });
    }
  }

  const handleClear = () => {
    setJsonInput('');
    setError('');
  };


  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
            <Braces className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">JSON Formatter</CardTitle>
          <p className="text-muted-foreground">Prettify or compress JSON data, and validate it on the fly.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <Label htmlFor="mode-switch" className={!isPrettified ? 'text-primary font-bold' : ''}>Compress</Label>
            <Switch
              id="mode-switch"
              checked={isPrettified}
              onCheckedChange={handleToggle}
              aria-label="Toggle between prettify and compress"
            />
            <Label htmlFor="mode-switch" className={isPrettified ? 'text-primary font-bold' : ''}>Prettify</Label>
          </div>

          <div className="space-y-2">
            <Textarea
              value={jsonInput}
              onChange={handleInputChange}
              placeholder='Paste your JSON here...'
              rows={12}
              className={`font-mono text-sm ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="flex justify-center gap-4">
            <Button onClick={handleCopy} disabled={!jsonInput || !!error}>
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button onClick={handleAiGenerate} disabled={!jsonInput || !!error || isGenerating} className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/20">
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Generate Schema
            </Button>
            <Button onClick={handleClear} variant="destructive" disabled={!jsonInput}>
              <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
          </div>

          {generatedSchema && (
            <div className="mt-8 pt-8 border-t border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-2 text-emerald-600 mb-4 font-bold italic">
                <Code className="h-4 w-4" />
                <span>AI Generated Interface & Schema</span>
              </div>
              <ScrollArea className="h-64 w-full rounded-xl border bg-muted/30 p-4">
                <pre className="text-xs font-mono whitespace-pre text-muted-foreground leading-relaxed">
                  {generatedSchema}
                </pre>
              </ScrollArea>
              <Button
                variant="link"
                className="mt-2 text-xs text-muted-foreground hover:text-emerald-600 p-0 h-auto"
                onClick={() => {
                  navigator.clipboard.writeText(generatedSchema);
                  toast({ title: "Schema copied to clipboard!" });
                }}
              >
                <Copy className="mr-1 h-3 w-3" /> Copy Schema
              </Button>
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
              <p>This tool helps you format, validate, and toggle between human-readable (pretty) and minified (compressed) JSON.</p>
              <ol>
                <li>Paste your JSON data into the text area. The tool will instantly validate it and show an error if it's invalid.</li>
                <li>Use the "Prettify / Compress" toggle to switch between a formatted, indented view and a compact, single-line view.</li>
                <li>Click the "Copy" button to copy the formatted JSON to your clipboard.</li>
                <li>Use the "Clear" button to empty the text area.</li>
              </ol>
              <p>It's perfect for developers working with APIs or anyone needing to inspect or clean up JSON data.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
