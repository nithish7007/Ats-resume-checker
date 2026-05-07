import { BookOpen, ExternalLink, Video, Award } from 'lucide-react';
import { getLearningSuggestions } from '../utils/learningSuggestions';

interface LearningSuggestionsProps {
  missingSkills: any[];
  companyName: string;
}

export function LearningSuggestions({ missingSkills, companyName }: LearningSuggestionsProps) {
  const suggestions = getLearningSuggestions(missingSkills, companyName);

  if (suggestions.length === 0) {
    return null;
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Coursera':
      case 'Udemy':
        return <Award className="w-4 h-4" />;
      case 'YouTube':
        return <Video className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Coursera':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Udemy':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'YouTube':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="w-5 h-5 text-green-600" />
        <h3 className="font-semibold text-gray-900">Learning Suggestions</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Recommended courses and resources to bridge your skill gaps:
      </p>

      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all hover:border-blue-300"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{suggestion.title}</h4>
                <p className="text-xs text-gray-500 mb-2">{suggestion.description}</p>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded border ${getPlatformColor(suggestion.platform)} flex items-center space-x-1`}>
                    {getPlatformIcon(suggestion.platform)}
                    <span>{suggestion.platform}</span>
                  </span>
                  {suggestion.duration && (
                    <span className="text-xs text-gray-500">• {suggestion.duration}</span>
                  )}
                  {suggestion.level && (
                    <span className="text-xs text-gray-500">• {suggestion.level}</span>
                  )}
                </div>
              </div>
            </div>

            <a
              href={suggestion.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-700 mt-2"
            >
              <span>View Course</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-xs text-yellow-800">
          💡 <strong>Tip:</strong> Focus on high-priority skills first. Complete at least 2-3 courses to significantly improve your resume score.
        </p>
      </div>
    </div>
  );
}
