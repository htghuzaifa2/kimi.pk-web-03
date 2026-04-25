'use client';

import React, { useState, useMemo, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Clipboard, FileText, Trash2, Sparkles, Loader2, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { summarizeText, analyzeSentiment } from '@/lib/ai-helper';

interface Stats {
    words: number;
    characters: number;
    sentences: number;
    paragraphs: number;
    readingTime: string;
}

export function TextStatisticsTool() {
    const [text, setText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiResult, setAiResult] = useState<{ summary: string; sentiment: string } | null>(null);
    const { toast } = useToast();

    const handleAiAnalyze = async () => {
        if (!text.trim()) return;
        setIsAnalyzing(true);
        setAiResult(null);
        try {
            const [summary, sentiment] = await Promise.all([
                summarizeText(text),
                analyzeSentiment(text)
            ]);
            setAiResult({ summary, sentiment });
            toast({
                title: 'AI Analysis Complete',
                description: 'Text summary and sentiment analysis are ready.',
            });
        } catch (err) {
            toast({
                variant: 'destructive',
                title: 'Analysis Failed',
                description: 'AI was unable to analyze the text. Please try again.',
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    const stats: Stats = useMemo(() => {
        if (!text.trim()) {
            return { words: 0, characters: 0, sentences: 0, paragraphs: 0, readingTime: '0 minutes' };
        }
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        const characters = text.length;
        const sentences = text.match(/[^\.!\?]+[\.!\?]+/g)?.length || 0;
        const paragraphs = text.split(/\n+/).filter(p => p.trim() !== '').length;

        const wordsPerMinute = 200;
        const minutes = words / wordsPerMinute;
        const readTime = Math.ceil(minutes);
        const readingTime = `${readTime} minute${readTime !== 1 ? 's' : ''}`;

        return { words, characters, sentences, paragraphs, readingTime };
    }, [text]);

    const handleClear = () => {
        setText('');
        toast({ title: 'Text cleared!' });
    };

    const handlePaste = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setText(clipboardText);
            toast({ title: 'Text pasted from clipboard!' });
        } catch (error) {
            toast({ variant: 'destructive', title: 'Failed to paste text', description: 'Please allow clipboard access in your browser settings.' });
        }
    }

    return (
        <div className="w-full">
            <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
                <CardHeader className="items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                        <FileText className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-3xl font-bold font-headline">Text Statistics Tool</CardTitle>
                    <p className="text-muted-foreground">Analyze your text for word count, character count, and more.</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Textarea
                            value={text}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                            placeholder="Paste or type your text here..."
                            rows={10}
                            className="text-base"
                        />
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={handlePaste}>
                                <Clipboard className="mr-2 h-4 w-4" /> Paste
                            </Button>
                            <Button variant="destructive" size="sm" onClick={handleClear} disabled={!text}>
                                <Trash2 className="mr-2 h-4 w-4" /> Clear
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                        <StatCard label="Words" value={stats.words} />
                        <StatCard label="Characters" value={stats.characters} />
                        <StatCard label="Sentences" value={stats.sentences} />
                        <StatCard label="Paragraphs" value={stats.paragraphs} />
                        <StatCard label="Reading Time" value={stats.readingTime} />
                    </div>

                    <div className="pt-4 border-t border-border/50">
                        <Button
                            onClick={handleAiAnalyze}
                            disabled={!text || isAnalyzing}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20"
                        >
                            {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Brain className="mr-2 h-4 w-4" />}
                            Get AI Content Insights
                        </Button>

                        {aiResult && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
                                <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20">
                                    <h4 className="flex items-center gap-2 font-bold text-primary mb-2 text-sm italic">
                                        <Sparkles className="h-3 w-3" /> AI Summary
                                    </h4>
                                    <p className="text-sm leading-relaxed">{aiResult.summary}</p>
                                </div>
                                <div className="p-4 bg-secondary/50 dark:bg-secondary/20 rounded-xl border border-border/50">
                                    <h4 className="flex items-center gap-2 font-bold text-muted-foreground mb-2 text-sm italic">
                                        <FileText className="h-3 w-3" /> Sentiment Analysis
                                    </h4>
                                    <p className="text-sm font-medium">{aiResult.sentiment}</p>
                                </div>
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
                            <p>This tool provides a quick analysis of any text you provide.</p>
                            <ol>
                                <li>Paste or type your text into the text area.</li>
                                <li>The statistics will update automatically as you type.</li>
                                <li><strong>Words:</strong> The total number of words.</li>
                                <li><strong>Characters:</strong> The total number of characters, including spaces.</li>
                                <li><strong>Sentences:</strong> The number of sentences, based on periods, question marks, and exclamation points.</li>
                                <li><strong>Paragraphs:</strong> The number of paragraphs, separated by line breaks.</li>
                                <li><strong>Reading Time:</strong> An estimate of how long it will take to read the text, based on an average reading speed of 200 words per minute.</li>
                            </ol>
                            <p>It's great for students, writers, and anyone who needs to keep track of text length and complexity.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

        </div>
    );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="p-4 bg-background rounded-lg border">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold font-headline text-primary">{value}</p>
        </div>
    )
}
