"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateQuestionAction } from '@/app/actions';
import ContentRenderer from './content-renderer';
import QuestionDisplay from './question-display';
import { Loader2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import type { GenerateSimilarQuestionOutput } from '@/ai/flows/generate-similar-question';


interface QuestionGeneratorProps {
  baseQuestion: {
    id: string;
    text: string;
  };
}

const LoadingSkeleton = () => (
    <Card className="mt-6">
        <CardHeader>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
            <Skeleton className="h-40 w-full" />
        </CardContent>
    </Card>
);

export default function QuestionGenerator({ baseQuestion }: QuestionGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedQuestionData, setGeneratedQuestionData] = useState<GenerateSimilarQuestionOutput | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedQuestionData(null);
    try {
      const result = await generateQuestionAction(baseQuestion.text);
      if ('error' in result) {
        toast({
          variant: 'destructive',
          title: 'Error generating question',
          description: result.error,
        });
      } else {
        setGeneratedQuestionData(result);
      }
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Base Question</CardTitle>
          <CardDescription>This is the question used as a base for generation.</CardDescription>
        </CardHeader>
        <CardContent>
          <ContentRenderer content={baseQuestion.text} />
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Similar Question'
            )}
          </Button>
        </CardFooter>
      </Card>

      {isLoading && <LoadingSkeleton />}
      
      {generatedQuestionData && (
        <div className="fade-in">
          <QuestionDisplay questionData={generatedQuestionData} />
        </div>
      )}
    </div>
  );
}
