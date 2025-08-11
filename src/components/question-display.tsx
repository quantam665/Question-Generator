"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import type { GenerateSimilarQuestionOutput } from '@/ai/flows/generate-similar-question';
import ContentRenderer from './content-renderer';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface QuestionDisplayProps {
  questionData: GenerateSimilarQuestionOutput;
}

export default function QuestionDisplay({ questionData }: QuestionDisplayProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    const textToCopy = `
@title ${questionData.title}
@description ${questionData.description}
@question ${questionData.newQuestionText || questionData.question}
@instruction ${questionData.instruction}
@difficulty ${questionData.difficulty}
@Order ${questionData.order}
${questionData.options.map(opt => (opt === questionData.correctOption ? `@@option ${opt}` : `@option ${opt}`)).join('\n')}
@explanation
${questionData.explanation}
@subject ${questionData.subject}
@unit ${questionData.unit}
@topic ${questionData.topic}
@plusmarks ${questionData.plusmarks}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    toast({
      title: 'Copied to clipboard!',
      description: 'The generated question has been copied.',
    });
  };

  return (
    <Card className="border-primary/50 shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>{questionData.title}</CardTitle>
                <CardDescription>
                {questionData.description}
                </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCopy} aria-label="Copy to clipboard">
                <Copy className="h-5 w-5" />
            </Button>
        </div>
        <div className="flex items-center gap-2 pt-2">
            <Badge variant="secondary">{questionData.subject}</Badge>
            <Badge variant="secondary">{questionData.unit}</Badge>
            <Badge variant="secondary">{questionData.topic}</Badge>
            <Badge variant="outline">{questionData.difficulty}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className='mb-4'>
            <ContentRenderer content={questionData.newQuestionText || questionData.question} />
        </div>

        <p className="text-sm font-medium text-muted-foreground mb-2">{questionData.instruction}</p>

        <RadioGroup className="space-y-2">
          {questionData.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-1">
                <ContentRenderer content={option} />
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="mt-6">
            <h4 className="font-semibold text-lg">Explanation</h4>
            <div className="prose prose-sm max-w-none text-muted-foreground mt-2">
             <ContentRenderer content={questionData.explanation} />
            </div>
        </div>

      </CardContent>
    </Card>
  );
}
