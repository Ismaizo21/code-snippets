import React from 'react';
import { FileCode, Plus } from 'lucide-react';
import { CategoryFilter } from '../types/Snippet';

interface EmptyStateProps {
  activeFilter: CategoryFilter;
  onAddSnippet: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ activeFilter, onAddSnippet }) => {
  const getEmptyMessage = () => {
    if (activeFilter === 'ALL') {
      return {
        title: 'Aucun snippet trouvé',
        description: 'Commencez par ajouter votre premier snippet de code !',
        showButton: true
      };
    }
    
    return {
      title: `Aucun snippet ${activeFilter}`,
      description: `Vous n'avez pas encore de snippets dans la catégorie ${activeFilter}.`,
      showButton: true
    };
  };

  const { title, description, showButton } = getEmptyMessage();

  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <FileCode className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
      
      {showButton && (
        <button
          onClick={onAddSnippet}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 mx-auto"
        >
          <Plus className="w-4 h-4" />
          Ajouter un snippet
        </button>
      )}
    </div>
  );
};

export default EmptyState;