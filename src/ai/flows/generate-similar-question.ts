'use server';

/**
 * @fileOverview Generates a math question similar to the input question, preserving LaTeX and generating new images.
 *
 * - generateSimilarQuestion - A function that generates a similar question.
 * - GenerateSimilarQuestionInput - The input type for the generateSimilarQuestion function.
 * - GenerateSimilarQuestionOutput - The return type for the generateSimilarQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSimilarQuestionInputSchema = z.object({
  questionText: z.string().describe('The original math question text, potentially including LaTeX formatting.'),
});
export type GenerateSimilarQuestionInput = z.infer<typeof GenerateSimilarQuestionInputSchema>;

const GenerateSimilarQuestionOutputSchema = z.object({
    title: z.string().describe('Assessment title, can be a meaningful name'),
    description: z.string().describe('Assessment description'),
    question: z.string().describe('The question text.'),
    instruction: z.string().describe('Instruction for the question.'),
    difficulty: z.enum(['easy', 'moderate', 'hard']).describe('The difficulty of the question.'),
    order: z.number().describe('The question number.'),
    options: z.array(z.string()).describe('An array of options for the multiple choice question.'),
    correctOption: z.string().describe('The correct option from the options array.'),
    explanation: z.string().describe('An explanation for the correct answer.'),
    subject: z.string().describe('The subject of the question.'),
    unit: z.string().describe('The unit of the subject.'),
    topic: z.string().describe('The topic of the question.'),
    plusmarks: z.number().describe('Marks for a correct answer.'),
    newQuestionText: z.string().optional().describe('The full generated question text including any new images.')
});
export type GenerateSimilarQuestionOutput = z.infer<typeof GenerateSimilarQuestionOutputSchema>;

export async function generateSimilarQuestion(input: GenerateSimilarQuestionInput): Promise<GenerateSimilarQuestionOutput> {
  return generateSimilarQuestionFlow(input);
}

const curriculum = `
subject unit topic
Quantitative Math Problem Solving Numbers and Operations
Quantitative Math Problem Solving Algebra
Quantitative Math Problem Solving Geometry
Quantitative Math Problem Solving Problem Solving
Quantitative Math Problem Solving Probability and Statistics
Quantitative Math Problem Solving Data Analysis
Quantitative Math Algebra Algebraic Word Problems
Quantitative Math Algebra Interpreting Variables
Quantitative Math Algebra Polynomial Expressions (FOIL/Factoring)
Quantitative Math Algebra Rational Expressions
Quantitative Math Algebra Exponential Expressions (Product rule, negative exponents)
Quantitative Math Algebra Quadratic Equations & Functions (Finding roots/solutions, graphing)
Quantitative Math Algebra Functions Operations
Quantitative Math Geometry and Measurement Area & Volume
Quantitative Math Geometry and Measurement Perimeter
Quantitative Math Geometry and Measurement Lines, Angles, & Triangles
Quantitative Math Geometry and Measurement Right Triangles & Trigonometry
Quantitative Math Geometry and Measurement Circles (Area, circumference)
Quantitative Math Geometry and Measurement Coordinate Geometry
Quantitative Math Geometry and Measurement Slope
Quantitative Math Geometry and Measurement Transformations (Dilating a shape)
Quantitative Math Geometry and Measurement Parallel & Perpendicular Lines
Quantitative Math Geometry and Measurement Solid Figures (Volume of Cubes)
Quantitative Math Numbers and Operations Basic Number Theory
Quantitative Math Numbers and Operations Prime & Composite Numbers
Quantitative Math Numbers and Operations Rational Numbers
Quantitative Math Numbers and Operations Order of Operations
Quantitative Math Numbers and Operations Estimation
Quantitative Math Numbers and Operations Fractions, Decimals, & Percents
Quantitative Math Numbers and Operations Sequences & Series
Quantitative Math Numbers and Operations Computation with Whole Numbers
Quantitative Math Numbers and Operations Operations with Negatives
Quantitative Math Data Analysis & Probability Interpretation of Tables & Graphs
Quantitative Math Data Analysis & Probability Trends & Inferences
Quantitative Math Data Analysis & Probability Probability (Basic, Compound Events)
Quantitative Math Data-analysis & Probability Mean, Median, Mode, & Range
Quantitative Math Data-analysis & Probability Weighted Averages
Quantitative Math Data-analysis & Probability Counting & Arrangement Problems
Quantitative Math Reasoning Word Problems
`;

const generateSimilarQuestionPrompt = ai.definePrompt({
  name: 'generateSimilarQuestionPrompt',
  input: {schema: GenerateSimilarQuestionInputSchema},
  output: {schema: GenerateSimilarQuestionOutputSchema},
  config: {
    temperature: 0.9,
  },
  prompt: `You are a math expert. Based on the provided question, generate a new, similar math question.

The subject, unit, and topic must be chosen from the following curriculum:
${curriculum}

Original Question:
{{{questionText}}}

Instructions for image generation (if applicable):
If the original question contains an image, generate a new placeholder image for the new question by creating a URL like 'https://placehold.co/WIDTHxHEIGHT.png' where WIDTH and HEIGHT are appropriate for the question. Include this new image markdown in the 'newQuestionText' output field. For example: '![Alt text](https://placehold.co/400x300.png)'. If the original question has no image, do not generate one.

Provide the response in a structured format.`,
});

const generateSimilarQuestionFlow = ai.defineFlow(
  {
    name: 'generateSimilarQuestionFlow',
    inputSchema: GenerateSimilarQuestionInputSchema,
    outputSchema: GenerateSimilarQuestionOutputSchema,
  },
  async input => {
    const {output} = await generateSimilarQuestionPrompt(input);
    return output!;
  }
);
