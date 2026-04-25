'use client';

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from './FancyAccordionButton';
import { Copy, Mic, MicOff, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { polishText } from '@/lib/ai-helper';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: {
    length: number;
    [key: number]: {
      isFinal: boolean;
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

export function VoiceToText() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [isSupported, setIsSupported] = useState(true);
  const [isPolishing, setIsPolishing] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      toast({
        variant: 'destructive',
        title: 'Browser Not Supported',
        description: 'Your browser does not support the Web Speech API. Please try Chrome or Edge.',
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(prev => prev + finalTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        toast({
          variant: 'destructive',
          title: 'Permission Denied',
          description: 'Please allow microphone access to use this feature.',
        });
      }
      setIsListening(false);
    };

    recognitionRef.current = recognition;

  }, [language, toast]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Could not start recognition", e);
        toast({
          variant: 'destructive',
          title: 'Could not start',
          description: 'There was an issue starting the speech recognition.',
        });
      }
    }
  };

  const handleAiPolish = async () => {
    if (!transcript) return;
    setIsPolishing(true);
    try {
      const polished = await polishText(transcript);
      setTranscript(polished);
      toast({
        title: 'AI Polish Complete',
        description: 'Your text has been refined for grammar and clarity.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Polish Failed',
        description: 'AI was unable to process the request. Please try again.',
      });
    } finally {
      setIsPolishing(false);
    }
  };

  const handleCopy = () => {
    if (transcript) {
      navigator.clipboard.writeText(transcript);
      toast({ title: 'Copied to clipboard!' });
    }
  };

  const handleClear = () => {
    setTranscript('');
  };

  return (
    <div className="w-full">
      <Card className="bg-card/50 dark:bg-card/20 backdrop-blur-sm border-border/50">
        <CardHeader className="items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
            <Mic className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Voice-to-Text Transcription</CardTitle>
          <p className="text-muted-foreground">Transcribe your speech into text in Urdu or English.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="w-full sm:w-auto space-y-2">
              <Label htmlFor="language-select">Language</Label>
              <Select value={language} onValueChange={setLanguage} disabled={isListening}>
                <SelectTrigger id="language-select" className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="ur-PK">Urdu (Pakistan)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={toggleListening} disabled={!isSupported} size="lg" className="w-full sm:w-auto">
              {isListening ? <MicOff className="mr-2 h-5 w-5" /> : <Mic className="mr-2 h-5 w-5" />}
              {isListening ? 'Stop Listening' : 'Start Listening'}
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transcript-output">Your Transcribed Text</Label>
            <Textarea
              id="transcript-output"
              value={transcript}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTranscript(e.target.value)}
              placeholder="Your spoken words will appear here..."
              rows={10}
              className="text-base"
              dir={language === 'ur-PK' ? 'rtl' : 'ltr'}
            />
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <Button onClick={handleAiPolish} disabled={!transcript || isPolishing} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none shadow-lg shadow-purple-500/20">
              {isPolishing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              AI Polish
            </Button>
            <Button onClick={handleCopy} disabled={!transcript} variant="outline" className="border-primary/20 hover:bg-primary/10">
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <Button onClick={handleClear} disabled={!transcript} variant="destructive">
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
              <p>This tool converts your speech into written text in real-time, supporting both English and Urdu.</p>
              <ol>
                <li>Select your desired language (English or Urdu) from the dropdown menu.</li>
                <li>Click the "Start Listening" button. Your browser may ask for microphone permission. Please allow it.</li>
                <li>Start speaking clearly. The transcribed text will appear in the text box as you talk.</li>
                <li>Click "Stop Listening" when you are finished.</li>
                <li>Use the "Copy" button to copy the text to your clipboard, or "Clear" to start over.</li>
              </ol>
              <p>This tool works best in a quiet environment. It's perfect for taking quick notes, drafting emails, or practicing pronunciation.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

    </div>
  );
}
