import { useState } from 'react';
import { FileText, Sparkles, Award, Check, X } from 'lucide-react';
import { resumeTemplates, ResumeTemplate, getAllCategories } from '../utils/resumeTemplates';

interface TemplateSelectorProps {
  currentTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  onClose: () => void;
}

export function TemplateSelector({ currentTemplateId, onSelectTemplate, onClose }: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', ...getAllCategories()];
  
  const filteredTemplates = selectedCategory === 'All'
    ? resumeTemplates
    : resumeTemplates.filter(t => t.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Classic': return '📄';
      case 'Tech': return '💻';
      case 'Creative': return '🎨';
      case 'ATS': return '✅';
      default: return '📋';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Classic': return 'from-blue-500 to-blue-600';
      case 'Tech': return 'from-purple-500 to-purple-600';
      case 'Creative': return 'from-pink-500 to-pink-600';
      case 'ATS': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Choose Your Resume Template</h2>
                <p className="text-blue-100 text-sm">20 Professional Formats • One-Click Migration</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex items-center space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category !== 'All' && getCategoryIcon(category)} {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={template.id === currentTemplateId}
                onSelect={() => {
                  onSelectTemplate(template.id);
                  onClose();
                }}
                categoryColor={getCategoryColor(template.category)}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <span>All templates rated 4.5+ stars</span>
            </div>
            <span className="font-medium">{filteredTemplates.length} templates available</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TemplateCardProps {
  template: ResumeTemplate;
  isSelected: boolean;
  onSelect: () => void;
  categoryColor: string;
}

function TemplateCard({ template, isSelected, onSelect, categoryColor }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      className={`relative bg-white border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
      }`}
    >
      {/* Selected Badge */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1.5 shadow-lg">
          <Check className="w-4 h-4" />
        </div>
      )}

      {/* Template Preview Icon */}
      <div className={`w-full h-32 bg-gradient-to-br ${categoryColor} rounded-lg flex items-center justify-center mb-3`}>
        <span className="text-6xl">{template.preview}</span>
      </div>

      {/* Template Info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{template.name}</h3>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Award className="w-4 h-4" />
            <span className="text-xs font-medium">{template.rating}</span>
          </div>
        </div>

        <p className="text-xs text-gray-600 line-clamp-2">{template.description}</p>

        {/* Category Badge */}
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 bg-gradient-to-r ${categoryColor} text-white text-xs font-medium rounded-full`}>
            {template.category}
          </span>
          <FileText className="w-4 h-4 text-gray-400" />
        </div>

        {/* Best For */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            <span className="font-medium">Best for:</span> {template.bestFor}
          </p>
        </div>

        {/* Hover Action */}
        {isHovered && !isSelected && (
          <div className="absolute inset-0 bg-blue-600 bg-opacity-95 rounded-xl flex items-center justify-center">
            <div className="text-center text-white">
              <Sparkles className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Click to Use Template</p>
              <p className="text-xs text-blue-100 mt-1">Your data will migrate instantly</p>
            </div>
          </div>
        )}

        {isSelected && (
          <div className="mt-2 text-center">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              ✓ Currently Using
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
