// Importation du type Snippet pour le typage TypeScript
import { Snippet } from '../types/Snippet';

// Clé utilisée pour stocker les données dans le localStorage
const STORAGE_KEY = 'snippets_data';

// Objet contenant les utilitaires de stockage
export const storageUtils = {
  /**
   * Récupère tous les snippets depuis le localStorage
   * @returns Un tableau de Snippet ou un tableau vide si aucune donnée n'est trouvée
   */
  getSnippets: (): Snippet[] => {
    try {
      // Récupération des données brutes depuis le localStorage
      const data = localStorage.getItem(STORAGE_KEY);
      // Retourne les données parsées ou un tableau vide si aucune donnée n'existe
      return data ? JSON.parse(data) : [];
    } catch (error) {
      // En cas d'erreur, affiche l'erreur et retourne un tableau vide
      console.error('Erreur lors de la lecture du localStorage :', error);
      return [];
    }
  },

  /**
   * Enregistre la liste des snippets dans le localStorage
   * @param snippets - Tableau de Snippet à enregistrer
   */
  saveSnippets: (snippets: Snippet[]): void => {
    try {
      // Conversion du tableau en chaîne JSON et sauvegarde dans le localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
    } catch (error) {
      // En cas d'erreur lors de la sauvegarde
      console.error('Erreur lors de la sauvegarde dans le localStorage :', error);
    }
  },

  /**
   * Ajoute un nouveau snippet à la liste existante
   * @param snippet - Les données du snippet à ajouter (sans id ni createdAt)
   * @returns Le nouveau snippet avec son ID et sa date de création
   */
  addSnippet: (snippet: Omit<Snippet, 'id' | 'createdAt'>): Snippet => {
    // Récupération des snippets existants
    const snippets = storageUtils.getSnippets();
    
    // Création d'un nouveau snippet avec un ID unique et la date actuelle
    const newSnippet: Snippet = {
      ...snippet, // Copie des propriétés du snippet fourni
      id: crypto.randomUUID(), // Génération d'un ID unique
      createdAt: new Date().toISOString(), // Date de création actuelle
    };
    
    // Ajout du nouveau snippet au début du tableau
    snippets.unshift(newSnippet);
    
    // Sauvegarde de la liste mise à jour
    storageUtils.saveSnippets(snippets);
    
    // Retour du nouveau snippet créé
    return newSnippet;
  },

  /**
   * Récupère les snippets filtrés par catégorie
   * @param category - La catégorie à filtrer (ou 'ALL' pour toutes les catégories)
   * @returns Un tableau de Snippet filtré par la catégorie spécifiée
   */
  getSnippetsByCategory: (category: string): Snippet[] => {
    // Récupération de tous les snippets
    const snippets = storageUtils.getSnippets();
    
    // Retourne tous les snippets si la catégorie est 'ALL', sinon filtre par catégorie
    return category === 'ALL' 
      ? snippets 
      : snippets.filter(snippet => snippet.category === category);
  }
};