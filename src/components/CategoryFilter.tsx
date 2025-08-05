// Importation des dépendances React et des composants nécessaires
import React from 'react';
// Importation des icônes depuis la bibliothèque lucide-react
import { Filter, Code2, FileText, Palette } from 'lucide-react';
// Importation du type CategoryFilterType pour le typage TypeScript
import { CategoryFilter as CategoryFilterType } from '../types/Snippet';

// Définition des propriétés attendues par le composant CategoryFilter
interface CategoryFilterProps {
  activeFilter: CategoryFilterType; // Filtre actuellement sélectionné
  onFilterChange: (filter: CategoryFilterType) => void; // Fonction de rappel pour le changement de filtre
  snippetCounts: Record<CategoryFilterType, number>; // Nombre de snippets par catégorie
}

// Composant pour afficher les filtres de catégorie
const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  activeFilter, // Filtre actif reçu en props
  onFilterChange, // Fonction de rappel pour le changement de filtre
  snippetCounts // Nombre de snippets par catégorie
}) => {
  // Définition des filtres disponibles avec leurs propriétés
  const filters = [
    { key: 'ALL' as const, label: 'Tous', icon: Filter, color: 'text-gray-600' }, // Tous les snippets
    { key: 'PHP' as const, label: 'PHP', icon: Code2, color: 'text-purple-600' }, // Filtre PHP
    { key: 'HTML' as const, label: 'HTML', icon: FileText, color: 'text-orange-600' }, // Filtre HTML
    { key: 'CSS' as const, label: 'CSS', icon: Palette, color: 'text-blue-600' }, // Filtre CSS
  ];

  // Rendu du composant
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {/* Mappage des filtres pour créer les boutons */}
      {filters.map(({ key, label, icon: Icon, color }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)} // Gestion du clic sur un filtre
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeFilter === key
              ? 'bg-blue-600 text-white shadow-lg transform scale-105' // Style pour le filtre actif
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300' // Style par défaut
          }`}
        >
          {/* Icône du filtre */}
          <Icon className={`w-4 h-4 ${activeFilter === key ? 'text-white' : color}`} />
          {label}
          {/* Compteur de snippets pour la catégorie */}
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            activeFilter === key
              ? 'bg-blue-500 text-white' // Style du compteur pour le filtre actif
              : 'bg-gray-100 text-gray-600' // Style par défaut du compteur
          }`}>
            {snippetCounts[key]} {/* Affichage du nombre de snippets */}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;