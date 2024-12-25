export interface Section {
  id: string;
  title: string;
  items: ContentItem[];
}

export interface ContentItem {
  title: string;
  slug: string;
  path: string;
  content: string;
  datePosted?: string;
}

export interface GraphData {
  nodes: Array<{
    id: string;
    title: string;
    path: string;
  }>;
  links: Array<{
    source: string;
    target: string;
  }>;
}
