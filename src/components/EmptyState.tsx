// Importation des dépendances React et des composants nécessaires
import React from 'react';
// Importation des icônes depuis la bibliothèque lucide-react
import { FileCode, Plus } from 'lucide-react';
// Importation du type CategoryFilter pour le typage TypeScript
import { CategoryFilter } from '../types/Snippet';

// Définition des propriétés attendues par le composant EmptyState
interface EmptyStateProps {
  activeFilter: CategoryFilter; // Filtre actif pour personnaliser le message
  onAddSnippet: () => void; // Fonction de rappel pour l'ajout d'un nouveau snippet
}

// Composant pour afficher un état vide (quand il n'y a pas de snippets)
const EmptyState: React.FC<EmptyStateProps> = ({ activeFilter, onAddSnippet }) => {
  // Fonction pour obtenir le message approprié en fonction du filtre actif
  const getEmptyMessage = () => {
    if (activeFilter === 'ALL') {
      // Message quand il n'y a aucun snippet du tout
      return {
        title: 'Aucun snippet trouvé',
        description: 'Commencez par ajouter votre premier snippet de code !',
        showButton: true // Afficher le bouton d'ajout
      };
    }
    
    // Message quand il n'y a pas de snippets dans la catégorie sélectionnée
    return {
      title: `Aucun snippet ${activeFilter}`,
      description: `Vous n'avez pas encore de snippets dans la catégorie ${activeFilter}.`,
      showButton: true // Afficher le bouton d'ajout
    };
  };

  // Récupération du message approprié
  const { title, description, showButton } = getEmptyMessage();

  // Rendu du composant
  return (
    <div className="text-center py-16">
      {/* Icône illustrative */}
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <FileCode className="w-12 h-12 text-gray-400" />
      </div>
      
      {/* Titre et description de l'état vide */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">{description}</p>
      
      {/* Bouton pour ajouter un nouveau snippet (affiché conditionnellement) */}
      {showButton && (
        <button
          onClick={onAddSnippet} // Gestion du clic sur le bouton
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