import { Brain, TrendingDown } from 'lucide-react';

interface SkillGapAnalysisProps {
  resumeData: any;
  jobDescription: string;
  companyName: string;
}

export function SkillGapAnalysis({ resumeData, jobDescription, companyName }: SkillGapAnalysisProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold text-gray-900">Skill Gap Analysis</h3>
      </div>

      {resumeData.missingSkills.length > 0 ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Based on the job description{companyName && ` and ${companyName}'s requirements`}, 
            we identified the following skill gaps:
          </p>

          <div className="space-y-3">
            {resumeData.missingSkills.map((skill: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{skill.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{skill.category}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    skill.priority === 'High'
                      ? 'bg-red-100 text-red-700'
                      : skill.priority === 'Medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {skill.priority} Priority
                  </span>
                </div>
                <p className="text-sm text-gray-600">{skill.reason}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          <TrendingDown className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-sm text-gray-600">
            Great! No significant skill gaps detected for this role.
          </p>
        </div>
      )}
    </div>
  );
}
