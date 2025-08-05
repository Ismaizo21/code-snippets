// Importation des dépendances React et des composants nécessaires
import React, { useState } from 'react';
// Importation des icônes depuis la bibliothèque lucide-react
import { Copy, Check, Calendar, Tag } from 'lucide-react';
// Importation du type Snippet pour le typage TypeScript
import { Snippet } from '../types/Snippet';

// Définition des propriétés attendues par le composant SnippetCard
interface SnippetCardProps {
  snippet: Snippet; // L'objet snippet à afficher
}

// Composant pour afficher une carte de snippet
const SnippetCard: React.FC<SnippetCardProps> = ({ snippet }) => {
  // État pour suivre si le code a été copié
  const [copied, setCopied] = useState(false);

  // Fonction pour copier le code dans le presse-papier
  const handleCopy = async () => {
    try {
      // Copie du code dans le presse-papier
      await navigator.clipboard.writeText(snippet.code);
      // Mise à jour de l'état pour indiquer que le code a été copié
      setCopied(true);
      // Réinitialisation de l'état après 2 secondes
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erreur lors de la copie :', error);
    }
  };

  // Fonction pour formater la date en français
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',       // Jour du mois (1-31)
      month: 'short',      // Mois abrégé (janv., févr., etc.)
      year: 'numeric',     // Année (2023)
      hour: '2-digit',     // Heure (01-23)
      minute: '2-digit'    // Minutes (00-59)
    }).format(new Date(dateString));
  };

  // Fonction pour obtenir les classes CSS en fonction de la catégorie
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'PHP':
        return 'bg-purple-100 text-purple-800';  // Couleur violette pour PHP
      case 'HTML':
        return 'bg-orange-100 text-orange-800'; // Couleur orange pour HTML
      case 'CSS':
        return 'bg-blue-100 text-blue-800';     // Couleur bleue pour CSS
      default:
        return 'bg-gray-100 text-gray-800';     // Couleur grise par défaut
    }
  };

  // Rendu du composant
  return (
    // Conteneur principal de la carte avec animations au survol
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        {/* En-tête de la carte avec le titre et la catégorie */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {/* Titre du snippet avec limite de 2 lignes */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
              {snippet.title}
            </h3>
            {/* Description du snippet (affichée si elle existe) */}
            {snippet.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {snippet.description}
              </p>
            )}
          </div>
          
          {/* Badge de catégorie */}
          <div className="flex items-center gap-2 ml-4">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(snippet.category)}`}>
              <Tag className="w-3 h-3 mr-1" />
              {snippet.category}
            </span>
          </div>
        </div>

        {/* Zone d'affichage du code */}
        <div className="relative">
          {/* Conteneur du code avec défilement si nécessaire */}
          <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm overflow-x-auto max-h-48 overflow-y-auto">
            <code className="text-gray-800 font-mono whitespace-pre-wrap break-all">
              {snippet.code}
            </code>
          </pre>
          
          {/* Bouton de copie avec retour visuel */}
          <button
            onClick={handleCopy}
            className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-200 ${
              copied 
                ? 'bg-green-100 text-green-600' // Style quand le code est copié
                : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm border border-gray-200' // Style par défaut
            }`}
            title={copied ? 'Copié !' : 'Copier le code'}
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Pied de carte avec la date de création */}
        <div className="flex items-center text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
          <Calendar className="w-3 h-3 mr-1" />
          Ajouté le {formatDate(snippet.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;