"use server";

import { generateSimilarQuestion } from '@/ai/flows/generate-similar-question';
import type { GenerateSimilarQuestionOutput } from '@/ai/flows/generate-similar-question';


export async function generateQuestionAction(questionText: string): Promise<GenerateSimilarQuestionOutput | { error: string }> {
  try {
    const result = await generateSimilarQuestion({ questionText });
    return result;
  } catch (e: any) {
    console.error("Error generating question:", e);
    return { error: e.message || "An unknown error occurred." };
  }
}
