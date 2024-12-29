import { Section, GraphData } from './types';

function getBaseUrl() {
  return '';
}

export const sections: Section[] = [
  {
    id: 'intro',
    title: 'Introductions',
    items: [
      {
        title: 'Getting Started',
        slug: 'getting-started',
        path: '/intro/getting-started',
        content: '',
        datePosted: '2023-10-10' // Example date
      },
      {
        title: 'A Little Bit About Me',
        slug: 'a-little-bit-about-me',
        path: '/intro/a-little-bit-about-me',
        content: ``,
        datePosted: '2023-10-10' // Today's date
      },
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
        content: '',
        datePosted: '2024-12-27'
      },
      {
        title: 'Providing Context to LLMs',
        slug: 'providing-context-to-llms',
        path: '/learning/providing-context-to-llms',
        content: '',
        datePosted: '2024-12-28'
      }
    ]
  },
  {
    id: 'tools',
    title: 'Tools',
    items: [
      {
        title: 'Task Management',
        slug: 'task-management',
        path: '/tools/task-management',
        content: ``,
      },
      {
        title: 'What I Want Out of Life',
        slug: 'what-i-want-out-of-life',
        path: '/tools/what-i-want-out-of-life',
        content: '',
        datePosted: '2024-12-28' // Today's date
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

// Update getContent function
export async function getContent(section?: string, slug?: string) {
  if (!section || !slug) return null;
  
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/${slug}.md`);
    console.log('Fetching content from:', response); 

    
    if (!response.ok) {
      console.error(`Failed to fetch content: ${response.status}`);
      throw new Error('Failed to fetch content');
    }
    
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Content fetch error:', error);
    return null;
  }
}