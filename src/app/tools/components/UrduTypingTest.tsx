'use client';

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Keyboard, RefreshCw, Sparkles, Loader2, Brain, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { analyzeTypingAccuracy } from '@/lib/ai-helper';
import { ScrollArea } from '@/components/ui/scroll-area';

const sentences = [
  "استاد: نالائق، تم کل اسکول کیوں نہیں آئے؟ شاگرد: سر، کل میرے خواب میں ایک گدھا مر گیا تھا، اس لیے میں نہیں آیا۔",
  "ایک فقیر: اللہ کے نام پر کچھ دے دو بابا۔ آدمی: میرے پاس کچھ نہیں ہے۔ فقیر: تو پھر میرے ساتھ آ جاؤ، ہم دونوں مل کر مانگیں گے۔",
  "ڈاکٹر: آپ روزانہ ورزش کیا کریں۔ مریض: ڈاکٹر صاحب، میں روز کرکٹ کھیلتا ہوں۔ ڈاکٹر: کتنی دیر؟ مریض: جب تک میرے موبائل کی بیٹری ختم نہیں ہو جاتی۔",
  "جج: تم نے ایک ہی دکان میں تین دن لگاتار چوری کیوں کی؟ چور: جناب، میں نے اپنی بیوی کے لیے ایک سوٹ چوری کیا تھا، باقی دو دن تو صرف سائز بدلوانے گیا تھا۔",
  "ایک دوست دوسرے سے: یار، میری بیوی بہت شک کرتی ہے۔ दूसरा دوست: کیوں، کیا ہوا؟ پہلا دوست: کل میں نے خواب میں کسی لڑکی کا نام لیا، صبح اٹها تو میری آدھی تنخواہ غائب تھی۔"
];

export function UrduTypingTest() {
  const [currentSentence, setCurrentSentence] = useState('');
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAiFeedback = async () => {
    if (!typedText || !currentSentence) return;
    setIsAnalyzing(true);
    try {
      const feedback = await analyzeTypingAccuracy(currentSentence, typedText);
      setAiFeedback(feedback);
    } catch (err) {
      // Silent error
    } finally {
      setIsAnalyzing(false);
    }
  };

  const startNewTest = () => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    setCurrentSentence(sentences[randomIndex]);
    setTypedText('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    startNewTest();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTypedText = e.target.value;

    if (isFinished) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    setTypedText(newTypedText);

    if (newTypedText.length >= currentSentence.length) {
      const endTime = Date.now();
      if (startTime) {
        const durationInMinutes = (endTime - startTime) / 1000 / 60;
        const wordsTyped = currentSentence.split(' ').length;
        const calculatedWpm = Math.round(wordsTyped / durationInMinutes);
        setWpm(calculatedWpm > 0 ? calculatedWpm : 0);

        let correctChars = 0;
        for (let i = 0; i < currentSentence.length; i++) {
          if (currentSentence[i] === newTypedText[i]) {
            correctChars++;
          }
        }
        const calculatedAccuracy = Math.round((correctChars / currentSentence.length) * 100);
        setAccuracy(calculatedAccuracy);
      }
      setIsFinished(true);
    }
  };

  const getCharClass = (char: string, index: number) => {
    if (index < typedText.length) {
      return typedText[index] === char ? 'text-green-500' : 'text-red-500 bg-red-500/20';
    }
    return 'text-muted-foreground';
  };

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
            <Keyboard className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Urdu Script Typing Test</CardTitle>
          <p className="text-muted-foreground">Check your WPM and accuracy with fun Urdu jokes.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            dir="rtl"
            className="relative rounded-md border bg-background p-4 font-mono text-lg tracking-wider h-28 overflow-y-auto"
          >
            <p className="whitespace-pre-wrap">
              {currentSentence.split('').map((char: string, index: number) => (
                <span key={index} className={cn('transition-colors duration-200', getCharClass(char, index))}>
                  {char}
                </span>
              ))}
            </p>
            <input
              ref={inputRef}
              type="text"
              value={typedText}
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full bg-transparent border-none outline-none text-transparent caret-primary p-4 font-mono text-lg tracking-wider"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              dir="rtl"
            />
          </div>

          {(isFinished || wpm > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <StatCard label="WPM" value={wpm} />
              <StatCard label="Accuracy" value={`${accuracy}%`} />
              <StatCard label="Time" value={startTime && isFinished ? `${Math.round((Date.now() - startTime) / 1000)}s` : '0s'} />
            </div>
          )}

          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center gap-2">
              <Button onClick={startNewTest} size="lg" variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Restart Test
              </Button>
              {isFinished && (
                <Button
                  onClick={handleAiFeedback}
                  disabled={isAnalyzing}
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20"
                >
                  {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Brain className="mr-2 h-4 w-4" />}
                  Get AI Analysis
                </Button>
              )}
            </div>

            {aiFeedback && (
              <div className="w-full mt-4 p-4 rounded-xl bg-violet-500/5 border border-violet-500/20 animate-in slide-in-from-right-4 duration-700">
                <div className="flex items-center gap-2 text-violet-600 mb-3 font-bold italic text-sm">
                  <MessageSquare className="h-4 w-4" />
                  <span>AI Accuracy Feedback</span>
                </div>
                <ScrollArea className="h-32 w-full pr-4">
                  <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                    {aiFeedback}
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
              <p>This tool helps you measure your typing speed and accuracy using fun Urdu script jokes.</p>
              <ol>
                <li>Click on the text box or start typing to begin the test. A timer will start automatically.</li>
                <li>Type the displayed joke in Urdu script as accurately and quickly as you can.</li>
                <li>Correct characters will be highlighted in green, and incorrect ones will be red.</li>
                <li>Once you finish typing the sentence, your Words Per Minute (WPM) and accuracy will be displayed.</li>
                <li>Click "Restart Test" to try a new joke and improve your speed.</li>
              </ol>
              <p>This tool is perfect for anyone looking to improve their Urdu typing skills for professional or personal use.</p>
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

