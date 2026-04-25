
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { diffChars, type Change } from 'diff';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { GitCompare, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function TextDifferenceChecker() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [diff, setDiff] = useState<Change[]>([]);

    const handleCompare = () => {
        const differences = diffChars(text1, text2);
        setDiff(differences);
    };

    const handleClear = () => {
        setText1('');
        setText2('');
        setDiff([]);
    }

    const renderDiff = () => {
        if (diff.length === 0) return null;

        let leftContent: React.ReactNode[] = [];
        let rightContent: React.ReactNode[] = [];

        diff.forEach((part, index) => {
            const style = {
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
            } as React.CSSProperties;

            const addedStyle = { ...style, background: 'hsla(140, 100%, 25%, 0.3)', textDecoration: 'underline' };
            const removedStyle = { ...style, background: 'hsla(0, 100%, 35%, 0.3)', textDecoration: 'line-through' };

            const key = `diff-${index}`;

            if (part.added) {
                rightContent.push(<span key={key} style={addedStyle}>{part.value}</span>);
            } else if (part.removed) {
                leftContent.push(<span key={key} style={removedStyle}>{part.value}</span>);
            } else {
                leftContent.push(<span key={`left-${key}`} style={style}>{part.value}</span>);
                rightContent.push(<span key={`right-${key}`} style={style}>{part.value}</span>);
            }
        });

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border rounded-md bg-background overflow-hidden font-mono text-sm">
                <ScrollArea className="h-96">
                    <div className="p-4">{leftContent}</div>
                </ScrollArea>
                <ScrollArea className="h-96">
                    <div className="p-4">{rightContent}</div>
                </ScrollArea>
            </div>
        );
    };


    return (
        <div className="w-full">
            <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
                <CardHeader className="items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                        <GitCompare className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h1 className="text-3xl font-bold font-headline">Text Difference Checker</h1>
                    <p className="text-muted-foreground">Compare two blocks of text and highlight the differences.</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Textarea
                            value={text1}
                            onChange={(e) => setText1(e.target.value)}
                            placeholder="Paste the first block of text here..."
                            rows={10}
                            className="font-mono"
                        />
                        <Textarea
                            value={text2}
                            onChange={(e) => setText2(e.target.value)}
                            placeholder="Paste the second block of text here..."
                            rows={10}
                            className="font-mono"
                        />
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button onClick={handleCompare} size="lg">
                            <GitCompare className="mr-2 h-4 w-4" /> Compare Texts
                        </Button>
                        <Button onClick={handleClear} size="lg" variant="destructive" disabled={!text1 && !text2}>
                            <Trash2 className="mr-2 h-4 w-4" /> Clear
                        </Button>
                    </div>
                    {diff.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-center">Differences</h3>
                            <div className="flex items-center gap-4 text-sm justify-center">
                                <div className="flex items-center gap-2"><span className="w-4 h-4 bg-red-500/30"></span>Removed</div>
                                <div className="flex items-center gap-2"><span className="w-4 h-4 bg-green-500/30"></span>Added</div>
                            </div>
                            {renderDiff()}
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
                            <p>This tool allows you to compare two pieces of text and see what has changed.</p>
                            <ol>
                                <li>Paste the original text into the left box.</li>
                                <li>Paste the modified text into the right box.</li>
                                <li>Click the "Compare Texts" button.</li>
                                <li>The differences will be shown below: text removed from the original will be highlighted in red, and text added to the new version will be highlighted in green. The tool highlights individual character changes for granular comparison.</li>
                            </ol>
                            <p>It's useful for programmers checking code changes, writers tracking edits, or anyone needing to spot differences in documents.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

        </div>
    );
}
