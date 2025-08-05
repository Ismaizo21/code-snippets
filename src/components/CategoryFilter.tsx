import React from 'react';
import { Filter, Code2, FileText, Palette } from 'lucide-react';
import { CategoryFilter as CategoryFilterType } from '../types/Snippet';

interface CategoryFilterProps {
  activeFilter: CategoryFilterType;
  onFilterChange: (filter: CategoryFilterType) => void;
  snippetCounts: Record<CategoryFilterType, number>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  activeFilter, 
  onFilterChange, 
  snippetCounts 
}) => {
  const filters = [
    { key: 'ALL' as const, label: 'Tous', icon: Filter, color: 'text-gray-600' },
    { key: 'PHP' as const, label: 'PHP', icon: Code2, color: 'text-purple-600' },
    { key: 'HTML' as const, label: 'HTML', icon: FileText, color: 'text-orange-600' },
    { key: 'CSS' as const, label: 'CSS', icon: Palette, color: 'text-blue-600' },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {filters.map(({ key, label, icon: Icon, color }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeFilter === key
              ? 'bg-blue-600 text-white shadow-lg transform scale-105'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          <Icon className={`w-4 h-4 ${activeFilter === key ? 'text-white' : color}`} />
          {label}
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            activeFilter === key
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {snippetCounts[key]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;