import { MarkdownRenderer } from "@/components/MarkdownRenderer";

const content = `
# Welcome to my Digital Garden

Hi, My name is Toye Adesomoju and I'm a software engineer with a mission to be the best possible programmer I can become, this will developing a deep understanding of the computer and its associated components.

I will document my learning processes and the things I learn along the way. This is my digital garden - a place where I share my thoughts, notes and learnings.

![Oil Painting](assets/images/oil-painting.jpg)

## What you'll find here

- Posts about software development and things that interest me
- Notes from books I read
- Learning reflections and documentation
- My study tools and methods

Feel free to explore using the sidebar navigation or the interactive graph visualization!
`;

export function Home() {
  return (
    <div className="max-w-3xl mx-auto">
      <MarkdownRenderer content={content} />
    </div>
  );
}
