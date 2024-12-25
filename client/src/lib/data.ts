import { Section, GraphData } from './types';

export const sections: Section[] = [
  {
    id: 'topics',
    title: 'Topics',
    items: [
      {
        title: 'Getting Started',
        slug: 'getting-started',
        path: '/topics/getting-started',
        content: '',
        datePosted: '2023-10-10' // Example date
      },
      {
        title: 'A Little Bit About Me',
        slug: 'a-little-bit-about-me',
        path: '/topics/a-little-bit-about-me',
        content: ``,
        datePosted: '2023-10-10' // Today's date
      },
      {
        title: 'What I Want Out of Life',
        slug: 'what-i-want-out-of-life',
        path: '/topics/what-i-want-out-of-life',
        content: '',
        datePosted: '2023-10-10' // Today's date
      }
    ]
  },
  {
    id: 'learning',
    title: 'Learning',
    items: [
      {
        title: 'Weekly Reflections',
        slug: 'weekly-reflections',
        path: '/learning/weekly-reflections',
        content: `# Weekly Learning Reflections\n\nDocumenting my journey...`
      }
    ]
  },
  {
    id: 'study',
    title: 'Tools and Methods',
    items: [
      {
        title: 'Task Management',
        slug: 'task-management',
        path: '/study/task-management',
        content: `# Task Management\n\nHow I manage my tasks...`
      }
    ]
  }
];

export const graphData: GraphData = {
  nodes: [
    { id: '/', title: 'Home', path: '/' },
    ...sections.flatMap(section => 
      section.items.map(item => ({
        id: item.path,
        title: item.title,
        path: item.path
      }))
    )
  ],
  links: sections.flatMap(section =>
    section.items.map(item => ({
      source: '/',
      target: item.path
    }))
  )
};

export async function getContent(section?: string, slug?: string): Promise<string | null> {
  if (!section || !slug) return null;
  try {
    const response = await fetch(`http://localhost:3000/api/content?section=${section}&slug=${slug}`);
    if (!response.ok) throw new Error('Failed to fetch content');
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error(error);
    return null;
  }
}