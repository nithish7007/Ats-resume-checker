import { useState } from 'react';
import { SkillGapAnalysis } from './SkillGapAnalysis';
import { LearningSuggestions } from './LearningSuggestions';
import { TrendingUp, AlertCircle, CheckCircle, XCircle, Target } from 'lucide-react';

interface ATSScoreDisplayProps {
  resumeData: any;
  jobDescription: string;
  companyName: string;
}

export function ATSScoreDisplay({ resumeData, jobDescription, companyName }: ATSScoreDisplayProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  return (
    <div className="space-y-6 sticky top-6">
      {/* ATS Score Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">ATS Score</h2>
          <TrendingUp className="w-5 h-5 text-blue-600" />
        </div>

        {/* Circular Score Display */}
        <div className="flex flex-col items-center py-6">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#scoreGradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(resumeData.atsScore / 100) * 440} 440`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className={`${getScoreGradient(resumeData.atsScore).split(' ')[0].replace('from-', 'text-')}`} stopColor="currentColor" />
                  <stop offset="100%" className={`${getScoreGradient(resumeData.atsScore).split(' ')[1].replace('to-', 'text-')}`} stopColor="currentColor" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${getScoreColor(resumeData.atsScore)}`}>
                {resumeData.atsScore}
              </span>
              <span className="text-sm text-gray-500 font-medium">/ 100</span>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            {resumeData.atsScore >= 80 && 'Excellent! Your resume is ATS-friendly'}
            {resumeData.atsScore >= 60 && resumeData.atsScore < 80 && 'Good, but needs improvement'}
            {resumeData.atsScore < 60 && 'Needs significant improvement'}
          </p>
        </div>

        {companyName && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-blue-600" />
              <p className="text-sm font-medium text-blue-900">
                Optimized for {companyName}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Key Metrics</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Keyword Match</span>
            <span className="font-semibold text-gray-900">
              {resumeData.keywordMatch}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${resumeData.keywordMatch}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-600">Format Score</span>
            <span className="font-semibold text-gray-900">
              {resumeData.formatScore}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${resumeData.formatScore}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-600">Section Structure</span>
            <span className="font-semibold text-gray-900">
              {resumeData.sectionScore}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${resumeData.sectionScore}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          {showDetails ? 'Hide Details' : 'Show Detailed Analysis'}
        </button>
      </div>

      {/* Detailed Feedback */}
      {showDetails && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Detailed Feedback</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                What's Working Well
              </h4>
              <ul className="space-y-2">
                {resumeData.strengths.map((strength: string, index: number) => (
                  <li key={index} className="text-sm text-gray-600 pl-6">
                    • {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                Areas to Improve
              </h4>
              <ul className="space-y-2">
                {resumeData.improvements.map((improvement: string, index: number) => (
                  <li key={index} className="text-sm text-gray-600 pl-6">
                    • {improvement}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <XCircle className="w-4 h-4 text-red-600 mr-2" />
                Missing Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {resumeData.missingKeywords.map((keyword: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full border border-red-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skill Gap Analysis */}
      <SkillGapAnalysis resumeData={resumeData} jobDescription={jobDescription} companyName={companyName} />

      {/* Learning Suggestions */}
      <LearningSuggestions missingSkills={resumeData.missingSkills} companyName={companyName} />
    </div>
  );
}
