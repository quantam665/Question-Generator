import QuestionGenerator from '@/components/question-generator';

const baseQuestion1 = {
  id: 'q1',
  text: `The top view of a rectangular package of 6 tightly packed balls is shown. If each ball has a radius of 2 centimeters, which of the following are closest to the dimensions, in centimeters, of the rectangular package?

![Top view of a rectangular package with 6 tightly packed balls](https://placehold.co/300x200.png)

(A) $2 \\times 3 \\times 6$
(B) $4 \\times 6 \\times 6$
(C) $2 \\times 4 \\times 6$
(D) $4 \\times 8 \\times 12$
(E) $6 \\times 8 \\times 12$`,
};

const baseQuestion2 = {
  id: 'q2',
  text: `What is the value of the expression $2x^2 + 3xy - y^2$ when $x=2$ and $y=-1$?

(A) -5
(B) 1
(C) 3
(D) 9
(E) 13`,
};


export default function Home() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          MathGenius
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Generate similar math questions with the power of AI.
        </p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <QuestionGenerator baseQuestion={baseQuestion1} />
        <QuestionGenerator baseQuestion={baseQuestion2} />
      </div>
    </main>
  );
}
