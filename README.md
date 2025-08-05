# Code Snippets - Application de Partage

Une application moderne pour partager et organiser vos snippets de code avec React, TypeScript et Tailwind CSS.

## 🚀 Fonctionnalités

- ✨ Interface moderne et responsive
- 📝 Formulaire d'ajout de snippets avec validation
- 🏷️ Catégorisation (PHP, HTML, CSS)
- 📋 Copie en un clic
- 🔍 Filtrage par catégorie
- 💾 Stockage local persistant
- 🎨 Design élégant avec animations

## 🛠️ Technologies

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build**: Vite
- **Deployment**: Vercel

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/code-snippets.git

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement la configuration
3. Le déploiement se fera automatiquement à chaque push

### Netlify

```bash
npm run build
# Uploadez le dossier 'dist' sur Netlify
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants React
│   ├── SnippetForm.tsx
│   ├── SnippetCard.tsx
│   ├── CategoryFilter.tsx
│   └── EmptyState.tsx
├── types/              # Types TypeScript
│   └── Snippet.ts
├── utils/              # Utilitaires
│   └── storage.ts
├── App.tsx             # Composant principal
└── main.tsx           # Point d'entrée
```

## 🔧 Configuration

Le projet utilise le stockage local du navigateur. Pour une version production avec backend PHP/MySQL, voir la documentation d'architecture.

## 📝 Utilisation

1. **Ajouter un snippet**: Remplissez le formulaire avec titre, description, catégorie et code
2. **Filtrer**: Utilisez les boutons de catégorie pour filtrer les snippets
3. **Copier**: Cliquez sur l'icône de copie pour copier le code
4. **Organiser**: Les snippets sont automatiquement triés par date d'ajout

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

MIT License - voir le fichier LICENSE pour plus de détails.