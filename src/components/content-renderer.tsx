"use client";

import Image from 'next/image';
import { InlineMath } from 'react-katex';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ContentRendererProps {
  content: string;
}

const parseContent = (content: string) => {
  const lines = content.split('\n');
  const blocks: { type: string; data: any }[] = [];
  let currentTable: string[][] = [];
  let inTable = false;

  lines.forEach(line => {
    if (line.trim().startsWith('|')) {
      if (!inTable) inTable = true;
      const cells = line.split('|').map(s => s.trim());
      // For markdown tables, the first and last elements of the split are empty strings
      currentTable.push(cells.slice(1, -1));
    } else {
      if (inTable) {
        blocks.push({ type: 'table', data: currentTable });
        currentTable = [];
        inTable = false;
      }
      const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)/);
      if (imageMatch) {
        blocks.push({ type: 'image', data: { alt: imageMatch[1], src: imageMatch[2] } });
      } else if (line.trim() !== '') {
        blocks.push({ type: 'text', data: line });
      }
    }
  });

  if (inTable) {
    blocks.push({ type: 'table', data: currentTable });
  }

  return blocks;
};

const TextBlock = ({ text }: { text: string }) => {
    const optionMatch = text.match(/^\s*(\([A-Z]\))\s*(.*)/);
    
    const renderContent = (content: string) => {
        const parts = content.split(/(\$[^$]+\$)/g);
        return parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
            return <InlineMath key={index}>{part.substring(1, part.length - 1)}</InlineMath>;
        }
        return part;
        });
    }

    if (optionMatch) {
        return (
            <div className="flex items-start gap-2 my-2">
                <span className="font-medium text-muted-foreground">{optionMatch[1]}</span>
                <div>{renderContent(optionMatch[2])}</div>
            </div>
        );
    }

    return <p className="my-2 leading-relaxed">{renderContent(text)}</p>;
};

const ContentRenderer = ({ content }: ContentRendererProps) => {
  const blocks = parseContent(content);

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'text':
            return <TextBlock key={index} text={block.data} />;
          case 'image':
            return (
              <div key={index} className="my-4 flex justify-center">
                <Image
                  src={block.data.src}
                  alt={block.data.alt}
                  width={300}
                  height={400}
                  className="rounded-lg shadow-md object-contain"
                  data-ai-hint="math diagram"
                />
              </div>
            );
          case 'table': {
            const [header, divider, ...rows] = block.data;
            return (
              <div key={index} className="my-4 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {header.map((cell: string, i: number) => <TableHead key={i}>{cell}</TableHead>)}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row: string[], i: number) => (
                      <TableRow key={i}>
                        {row.map((cell: string, j: number) => <TableCell key={j}>{cell}</TableCell>)}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ContentRenderer;
