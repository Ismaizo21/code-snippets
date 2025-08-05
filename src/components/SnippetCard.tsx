import React, { useState } from 'react';
import { Copy, Check, Calendar, Tag } from 'lucide-react';
import { Snippet } from '../types/Snippet';

interface SnippetCardProps {
  snippet: Snippet;
}

const SnippetCard: React.FC<SnippetCardProps> = ({ snippet }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'PHP':
        return 'bg-purple-100 text-purple-800';
      case 'HTML':
        return 'bg-orange-100 text-orange-800';
      case 'CSS':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
              {snippet.title}
            </h3>
            {snippet.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {snippet.description}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(snippet.category)}`}>
              <Tag className="w-3 h-3 mr-1" />
              {snippet.category}
            </span>
          </div>
        </div>

        <div className="relative">
          <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm overflow-x-auto max-h-48 overflow-y-auto">
            <code className="text-gray-800 font-mono whitespace-pre-wrap break-all">
              {snippet.code}
            </code>
          </pre>
          
          <button
            onClick={handleCopy}
            className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-200 ${
              copied 
                ? 'bg-green-100 text-green-600' 
                : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm border border-gray-200'
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

        <div className="flex items-center text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
          <Calendar className="w-3 h-3 mr-1" />
          Ajouté le {formatDate(snippet.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;