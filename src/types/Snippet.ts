export interface Snippet {
  id: string;
  title: string;
  description: string;
  category: 'PHP' | 'HTML' | 'CSS';
  code: string;
  createdAt: string;
}

export type CategoryFilter = 'ALL' | 'PHP' | 'HTML' | 'CSS';