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
  text: `The top view of a rectangular package of 6 tightly packed balls is shown. If each ball has a radius of 2 centimeters, which of the following are closest to the dimensions, in centimeters, of the rectangular package?
![Top view of a rectangular package with 6 tightly packed balls](https://cdn.mathpix.com/cropped/2025_07_31_dc2e3d22c70b1617b86dg-33.jpg?height=451&width=307&top_left_y=1130&top_left_x=280)
(A) $2 \\times 3 \\times 6$
(B) $4 \\times 6 \\times 6$
(C) $2 \\times 4 \\times 6$
(D) $4 \\times 8 \\times 12$
(E) $6 \\times 8 \\times 12$`,
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
