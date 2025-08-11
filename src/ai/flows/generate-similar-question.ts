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
  questionText: z.string().describe('The original math question text, potentially including LaTeX formatting and image URLs.'),
});
export type GenerateSimilarQuestionInput = z.infer<typeof GenerateSimilarQuestionInputSchema>;

const CurriculumSchema = z.object({
  subject: z.string(),
  unit: z.string(),
  topic: z.string(),
});

const GenerateSimilarQuestionOutputSchema = z.object({
  newQuestionText: z.string().describe('The generated similar math question, with updated values and a new image if applicable.'),
  subject: z.string(),
  unit: z.string(),
  topic: z.string(),
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
Quantitative Math Data Analysis & Probability Mean, Median, Mode, & Range
Quantitative Math Data Analysis & Probability Weighted Averages
Quantitative Math Data Analysis & Probability Counting & Arrangement Problems
Quantitative Math Reasoning Word Problems
`;

const generateSimilarQuestionPrompt = ai.definePrompt({
  name: 'generateSimilarQuestionPrompt',
  input: {schema: GenerateSimilarQuestionInputSchema},
  output: {schema: GenerateSimilarQuestionOutputSchema},
  config: {
    temperature: 0.8,
  },
  prompt: `You are a math expert. Generate a new question that is similar to the following question but with different values.
Preserve any LaTeX formatting in the original question.
If the original question includes a URL to an image, generate a new image appropriate for the new question, but with different details, using the image generation model if required.

Original Question: {{{questionText}}}

Choose the subject, unit, and topic for the question from the following curriculum:\n${curriculum}

Subject:
Unit:
Topic:

New Question:
`,
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
