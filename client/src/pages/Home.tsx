import { MarkdownRenderer } from "@/components/MarkdownRenderer";

const content = `
# Welcome to my Digital Garden.

Hi, My name is Toye and I'm a Software Engineer II trying to be the best programmer I can become. This will involve developing a deep understanding of the computer and its associated components.

I will document my learning processes and the things I build along the way. This is my digital garden - a place where I share my thoughts, notes and learnings.

![Oil Painting](assets/images/oil-painting.jpg)

## What you'll find here

- Posts about software development and topics that interest me
- Notes from books I've read
- Learning reflections and documentation
- My workflow tools and methods

Feel free to explore using the sidebar navigation or the interactive graph visualization!
`;

export function Home() {
  return (
    <div className="max-w-3xl mx-auto">
      <MarkdownRenderer content={content} />
    </div>
  );
}
