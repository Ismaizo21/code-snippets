// Interface décrivant la structure d'un snippet de code
export interface Snippet {
  id: string;           // Identifiant unique du snippet
  title: string;        // Titre du snippet
  description: string;  // Description du snippet
  category: 'PHP' | 'HTML' | 'CSS';  // Catégorie du snippet (uniquement ces valeurs possibles)
  code: string;         // Contenu du code du snippet
  createdAt: string;    // Date de création au format ISO string
}

// Type pour le filtre des catégories
export type CategoryFilter = 'ALL' | 'PHP' | 'HTML' | 'CSS';