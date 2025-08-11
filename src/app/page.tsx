
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import QuestionDisplay from '@/components/question-display';
import { generateQuestionAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { GenerateSimilarQuestionOutput } from '@/ai/flows/generate-similar-question';

const initialBaseQuestion1 = {
  id: 'q1',
  text: `The top view of a rectangular package of 6 tightly packed balls is shown. If each ball has a radius of 2 centimeters, which of the following are closest to the dimensions, in centimeters, of the rectangular package?

![Top view of a rectangular package with 6 tightly packed balls](https://placehold.co/300x200.png)

(A) $2 \\times 3 \\times 6$
(B) $4 \\times 6 \\times 6$
(C) $2 \\times 4 \\times 6$
(D) $4 \\times 8 \\times 12$
(E) $6 \\times 8 \\times 12$`,
};

const initialBaseQuestion2 = {
  id: 'q2',
  text: `What is the value of the expression $2x^2 + 3xy - y^2$ when $x=2$ and $y=-1$?

(A) -5
(B) 1
(C) 3
(D) 9
(E) 13`,
};


export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<{[key: string]: string | null}>({
    q1: null,
    q2: null,
  });
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedQuestions({ q1: null, q2: null });
    try {
      const [result1, result2] = await Promise.all([
        generateQuestionAction(initialBaseQuestion1.text),
        generateQuestionAction(initialBaseQuestion2.text)
      ]);

      const newQuestions: {[key: string]: string | null} = {};

      if ('error' in result1) {
        toast({ variant: 'destructive', title: 'Error generating question 1', description: result1.error });
        newQuestions.q1 = 'Error generating question.';
      } else {
        newQuestions.q1 = result1.generatedQuestion;
      }

      if ('error' in result2) {
        toast({ variant: 'destructive', title: 'Error generating question 2', description: result2.error });
        newQuestions.q2 = 'Error generating question.';
      } else {
        newQuestions.q2 = result2.generatedQuestion;
      }

      setGeneratedQuestions(newQuestions);

    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An unexpected error occurred',
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          MathGenius
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Generate similar math questions with the power of AI.
        </p>
      </header>

      <div className="flex justify-center mb-8">
        <Button onClick={handleGenerate} disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate New Questions'
            )}
          </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <QuestionDisplay
            baseQuestion={initialBaseQuestion1}
            generatedQuestion={generatedQuestions.q1}
            isLoading={isLoading && !generatedQuestions.q1}
         />
        <QuestionDisplay
            baseQuestion={initialBaseQuestion2}
            generatedQuestion={generatedQuestions.q2}
            isLoading={isLoading && !generatedQuestions.q2}
        />
      </div>
    </main>
  );
}
