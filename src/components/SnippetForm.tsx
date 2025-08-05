// Importation des dépendances React et des composants nécessaires
import React, { useState } from 'react';
// Importation des icônes depuis la bibliothèque lucide-react
import { Plus, Code } from 'lucide-react';
// Importation du type Snippet pour le typage TypeScript
import { Snippet } from '../types/Snippet';

// Définition des propriétés attendues par le composant SnippetForm
interface SnippetFormProps {
  // Fonction de rappel appelée lors de l'ajout d'un nouveau snippet
  onAddSnippet: (snippet: Omit<Snippet, 'id' | 'createdAt'>) => void;
}

// Composant fonctionnel pour le formulaire d'ajout de snippet
const SnippetForm: React.FC<SnippetFormProps> = ({ onAddSnippet }) => {
  // État pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    title: '',          // Titre du snippet
    description: '',    // Description du snippet
    category: 'PHP' as const,  // Catégorie par défaut
    code: ''            // Code du snippet
  });
  // État pour gérer l'affichage du chargement pendant la soumission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    // Vérification que les champs obligatoires sont remplis
    if (!formData.title.trim() || !formData.code.trim()) return;

    setIsSubmitting(true); // Activation de l'état de soumission
    
    // Simulation d'un délai d'appel API (pour démonstration)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Appel de la fonction parent avec les données du formulaire
    onAddSnippet(formData);
    
    // Réinitialisation du formulaire après soumission
    setFormData({
      title: '',
      description: '',
      category: 'PHP',
      code: ''
    });
    
    setIsSubmitting(false); // Désactivation de l'état de soumission
  };

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Mise à jour de l'état avec la nouvelle valeur du champ modifié
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Rendu du composant
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
      {/* En-tête du formulaire */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Code className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Nouveau Snippet</h2>
      </div>

      {/* Formulaire de création de snippet */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grille à deux colonnes pour les champs sur les grands écrans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Champ Titre */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Titre *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Ex: Fonction de validation d'email"
              required
            />
          </div>

          {/* Sélecteur de catégorie */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="PHP">PHP</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
            </select>
          </div>
        </div>

        {/* Zone de description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Brève description de votre snippet..."
          />
        </div>

        {/* Zone de code */}
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
            Code *
          </label>
          <textarea
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-sm resize-none bg-gray-50"
            placeholder="Votre code ici..."
            required
          />
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          // Désactivé pendant la soumission ou si les champs requis ne sont pas remplis
          disabled={isSubmitting || !formData.title.trim() || !formData.code.trim()}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Ajout en cours...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Ajouter le Snippet
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SnippetForm;