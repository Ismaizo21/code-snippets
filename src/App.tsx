// Importation des hooks React nécessaires
import { useState, useEffect, useRef } from 'react';
// Importation des icônes depuis la bibliothèque lucide-react
import { Code, Share2, Github } from 'lucide-react';
// Importation des composants personnalisés
import SnippetForm from './components/SnippetForm';
import SnippetCard from './components/SnippetCard';
import CategoryFilter from './components/CategoryFilter';
import EmptyState from './components/EmptyState';
// Importation des types et utilitaires
import { Snippet, CategoryFilter as CategoryFilterType } from './types/Snippet';
import { storageUtils } from './utils/storage';

// Composant principal de l'application
function App() {
  // États pour gérer les snippets et le chargement
  const [snippets, setSnippets] = useState<Snippet[]>([]); // Liste des snippets
  const [activeFilter, setActiveFilter] = useState<CategoryFilterType>('ALL'); // Filtre actif
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([]); // Snippets filtrés
  const [isLoading, setIsLoading] = useState(true); // État de chargement
  const formRef = useRef<HTMLDivElement>(null); // Référence pour le défilement vers le formulaire

  // Effet pour charger les snippets au chargement du composant
  useEffect(() => {
    // Simulation de chargement avec un délai pour une meilleure expérience utilisateur
    setTimeout(() => {
      const storedSnippets = storageUtils.getSnippets(); // Récupération des snippets depuis le stockage local
      setSnippets(storedSnippets); // Mise à jour de l'état des snippets
      setIsLoading(false); // Fin du chargement
    }, 500);
  }, []);

  // Effet pour filtrer les snippets lorsque la liste des snippets ou le filtre change
  useEffect(() => {
    // Filtrage des snippets selon la catégorie sélectionnée
    const filtered = storageUtils.getSnippetsByCategory(activeFilter);
    setFilteredSnippets(filtered); // Mise à jour des snippets filtrés
  }, [snippets, activeFilter]);

  // Gestion de l'ajout d'un nouveau snippet
  const handleAddSnippet = (newSnippetData: Omit<Snippet, 'id' | 'createdAt'>) => {
    // Ajout du nouveau snippet via l'utilitaire de stockage
    const newSnippet = storageUtils.addSnippet(newSnippetData);
    // Mise à jour de la liste des snippets avec le nouveau en premier
    setSnippets(prev => [newSnippet, ...prev]);
  };

  // Fonction pour faire défiler la page jusqu'au formulaire
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' }); // Défilement fluide vers le formulaire
  };

  // Fonction pour compter le nombre de snippets par catégorie
  const getSnippetCounts = (): Record<CategoryFilterType, number> => {
    return {
      ALL: snippets.length, // Nombre total de tous les snippets
      PHP: snippets.filter(s => s.category === 'PHP').length, // Nombre de snippets PHP
      HTML: snippets.filter(s => s.category === 'HTML').length, // Nombre de snippets HTML
      CSS: snippets.filter(s => s.category === 'CSS').length, // Nombre de snippets CSS
    };
  };

  // Affichage du chargement pendant le chargement des données
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          {/* Animation de chargement */}
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des snippets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête de l'application */}
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

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Formulaire d'ajout de snippet */}
        <div ref={formRef}>
          <SnippetForm onAddSnippet={handleAddSnippet} />
        </div>

        {/* Section d'affichage des snippets */}
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

      {/* Pied de page */}
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