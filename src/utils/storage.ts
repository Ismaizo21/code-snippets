import { Snippet } from '../types/Snippet';

const STORAGE_KEY = 'snippets_data';

export const storageUtils = {
  getSnippets: (): Snippet[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  saveSnippets: (snippets: Snippet[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  addSnippet: (snippet: Omit<Snippet, 'id' | 'createdAt'>): Snippet => {
    const snippets = storageUtils.getSnippets();
    const newSnippet: Snippet = {
      ...snippet,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    
    snippets.unshift(newSnippet);
    storageUtils.saveSnippets(snippets);
    return newSnippet;
  },

  getSnippetsByCategory: (category: string): Snippet[] => {
    const snippets = storageUtils.getSnippets();
    return category === 'ALL' 
      ? snippets 
      : snippets.filter(snippet => snippet.category === category);
  }
};