import React, { useState, useEffect, useRef } from 'react';
import { Code, Share2, Github } from 'lucide-react';
import SnippetForm from './components/SnippetForm';
import SnippetCard from './components/SnippetCard';
import CategoryFilter from './components/CategoryFilter';
import EmptyState from './components/EmptyState';
import { Snippet, CategoryFilter as CategoryFilterType } from './types/Snippet';
import { storageUtils } from './utils/storage';

function App() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [activeFilter, setActiveFilter] = useState<CategoryFilterType>('ALL');
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const storedSnippets = storageUtils.getSnippets();
      setSnippets(storedSnippets);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const filtered = storageUtils.getSnippetsByCategory(activeFilter);
    setFilteredSnippets(filtered);
  }, [snippets, activeFilter]);

  const handleAddSnippet = (newSnippetData: Omit<Snippet, 'id' | 'createdAt'>) => {
    const newSnippet = storageUtils.addSnippet(newSnippetData);
    setSnippets(prev => [newSnippet, ...prev]);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getSnippetCounts = (): Record<CategoryFilterType, number> => {
    return {
      ALL: snippets.length,
      PHP: snippets.filter(s => s.category === 'PHP').length,
      HTML: snippets.filter(s => s.category === 'HTML').length,
      CSS: snippets.filter(s => s.category === 'CSS').length,
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des snippets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Code Snippets</h1>
                <p className="text-gray-600 text-sm">Partagez et organisez vos morceaux de code</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Share2 className="w-4 h-4" />
                {snippets.length} snippet{snippets.length !== 1 ? 's' : ''}
              </div>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Voir sur GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Snippet Form */}
        <div ref={formRef}>
          <SnippetForm onAddSnippet={handleAddSnippet} />
        </div>

        {/* Snippets Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Mes Snippets
              {activeFilter !== 'ALL' && (
                <span className="ml-2 text-base font-normal text-gray-600">
                  - {activeFilter}
                </span>
              )}
            </h2>
          </div>

          <CategoryFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            snippetCounts={getSnippetCounts()}
          />

          {filteredSnippets.length === 0 ? (
            <EmptyState activeFilter={activeFilter} onAddSnippet={scrollToForm} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSnippets.map((snippet) => (
                <SnippetCard key={snippet.id} snippet={snippet} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>Application de partage de snippets - Stockage local</p>
            <p className="mt-1">
              Pour une version production avec PHP/MySQL, contactez votre développeur
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;