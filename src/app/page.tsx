import QuestionGenerator from '@/components/question-generator';

const baseQuestion1 = {
  id: 'q1',
  text: `Each student at Central Middle School wears a uniform consisting of 1 shirt and 1 pair of pants. The table shows the colors available for each item of clothing. How many different uniforms are possible?

| Shirt Color | Pants Color |
| :---: | :---: |
| Tan | Black |
| Red | Khaki |
| White | Navy |
| Yellow | |

(A) Three
(B) Four
(C) Seven
(D) Ten
(E) Twelve`,
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
