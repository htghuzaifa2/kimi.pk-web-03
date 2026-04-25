'use client';

import React, { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Keyboard, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const paragraphs = {
  easy: [
    "The sun is shining brightly today. A gentle breeze is blowing through the trees. Birds are singing sweet songs in the park. People are walking and enjoying the nice weather. It is a beautiful day for a picnic.",
    "My cat is very lazy. He sleeps all day on the soft couch. Sometimes he wakes up to eat his favorite food. He loves to be petted and purrs loudly. He is a very happy and contented cat.",
    "I like to read books. Books can take you to different worlds. You can learn new things and meet interesting characters. Reading is a good way to relax and use your imagination. My favorite book is about a brave knight.",
  ],
  medium: [
    "Technology has changed our lives in many ways. We use computers for work and smartphones to stay connected with friends and family. The internet provides access to a vast amount of information. While it offers many benefits, it is important to use technology wisely and maintain a balance with real-world activities.",
    "Learning a new language can be a challenging but rewarding experience. It opens up new cultures and ways of thinking. Regular practice is key to becoming fluent. Speaking with native speakers, watching movies, and reading books in the target language are all effective methods to improve your skills and confidence.",
    "Climate change is a significant global issue that requires immediate attention. Rising temperatures, melting glaciers, and extreme weather events are becoming more common. Governments, companies, and individuals must work together to reduce carbon emissions and adopt sustainable practices to protect our planet for future generations.",
  ],
  hard: [
    "The jurisprudential dichotomy between natural law and legal positivism presents a perennial philosophical quandary. Proponents of natural law assert the existence of inherent, universal moral principles that underpin just laws, whereas positivists argue that the validity of law is contingent solely upon its enactment by a recognized sovereign authority, irrespective of its moral content. This ideological schism profoundly influences judicial interpretation and legislative processes worldwide.",
    "Quantum entanglement, a phenomenon Einstein famously dismissed as 'spooky action at a distance,' describes a state where two or more quantum particles are linked in such a way that their fates are intertwined, regardless of the distance separating them. Measuring a property of one particle instantaneously influences the corresponding property of the other, challenging classical notions of locality and causality and forming the bedrock of emerging technologies like quantum computing and cryptography.",
    "Neuroplasticity elucidates the brain's remarkable capacity to reorganize its structure, functions, and connections in response to experience, learning, or injury. This malleability is not confined to early development but persists throughout adulthood, involving synaptic pruning, dendritic arborization, and the modification of cortical maps. Understanding these mechanisms is pivotal for developing therapeutic interventions for neurological disorders and enhancing cognitive rehabilitation.",
  ]
};

type Difficulty = keyof typeof paragraphs;

export function EnglishTypingTest() {
  const [currentParagraph, setCurrentParagraph] = useState('');
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const inputRef = useRef<HTMLInputElement>(null);

  const startNewTest = useCallback(() => {
    const difficultyParagraphs = paragraphs[difficulty];
    const randomIndex = Math.floor(Math.random() * difficultyParagraphs.length);
    setCurrentParagraph(difficultyParagraphs[randomIndex]);
    setTypedText('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    inputRef.current?.focus();
  }, [difficulty]);

  useEffect(() => {
    startNewTest();
  }, [startNewTest]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTypedText = e.target.value;

    if (isFinished) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    setTypedText(newTypedText);

    if (newTypedText.length >= currentParagraph.length) {
      const endTime = Date.now();
      if (startTime) {
        const durationInMinutes = (endTime - startTime) / 1000 / 60;
        const wordsTyped = currentParagraph.split(' ').length;
        const calculatedWpm = Math.round(wordsTyped / durationInMinutes);
        setWpm(calculatedWpm > 0 ? calculatedWpm : 0);

        let correctChars = 0;
        for (let i = 0; i < currentParagraph.length; i++) {
          if (currentParagraph[i] === newTypedText[i]) {
            correctChars++;
          }
        }
        const calculatedAccuracy = Math.round((correctChars / currentParagraph.length) * 100);
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
          <CardTitle className="text-3xl font-bold font-headline">English Typing Speed Test</CardTitle>
          <p className="text-muted-foreground">Check your typing speed and accuracy.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Label>Select Difficulty:</Label>
            <RadioGroup defaultValue="easy" onValueChange={(value: Difficulty) => setDifficulty(value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easy" id="easy" />
                <Label htmlFor="easy">Easy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hard" id="hard" />
                <Label htmlFor="hard">Hard</Label>
              </div>
            </RadioGroup>
          </div>

          <div
            className="relative rounded-md border bg-background p-4 font-mono text-lg tracking-wider h-36 overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
          >
            <p className="whitespace-pre-wrap">
              {currentParagraph.split('').map((char: string, index: number) => (
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
            />
          </div>

          {(isFinished || wpm > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <StatCard label="WPM" value={wpm} />
              <StatCard label="Accuracy" value={`${accuracy}%`} />
              <StatCard label="Time" value={startTime && isFinished ? `${Math.round((Date.now() - startTime) / 1000)}s` : '0s'} />
            </div>
          )}

          <div className="flex justify-center">
            <Button onClick={startNewTest} size="lg">
              <RefreshCw className="mr-2 h-4 w-4" /> Restart Test
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
              <p>This tool helps you measure your English typing speed and accuracy.</p>
              <ol>
                <li>Select your desired difficulty level: Easy, Medium, or Hard.</li>
                <li>Click on the text box or start typing to begin the test. A timer will start automatically.</li>
                <li>Type the displayed paragraph as accurately and quickly as you can. Correct characters will be highlighted in green, and incorrect ones in red.</li>
                <li>Once you finish typing the paragraph, your Words Per Minute (WPM), accuracy, and time taken will be displayed.</li>
                <li>Click "Restart Test" to try a new paragraph at the selected difficulty and improve your score.</li>
              </ol>
              <p>It's a great tool for students, professionals, and anyone who wants to improve their English typing skills.</p>
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



