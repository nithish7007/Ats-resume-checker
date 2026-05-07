import { useState } from 'react';
import { ResumeUpload } from './components/ResumeUpload';
import { ATSScoreDisplay } from './components/ATSScoreDisplay';
import { LiveResumeEditor } from './components/LiveResumeEditor';
import { FileText, Upload, Edit3 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'upload' | 'editor'>('upload');
  const [resumeData, setResumeData] = useState<any>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">ATS Resume Checker</h1>
                <p className="text-sm text-gray-600">AI-Powered Resume Optimization Tool</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'upload'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Upload className="w-5 h-5" />
            <span>Upload & Analyze</span>
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'editor'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Edit3 className="w-5 h-5" />
            <span>Deep Checker</span>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'upload' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ResumeUpload
                onResumeAnalyzed={setResumeData}
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                companyName={companyName}
                setCompanyName={setCompanyName}
              />
            </div>
            <div className="lg:col-span-1">
              {resumeData && (
                <ATSScoreDisplay
                  resumeData={resumeData}
                  jobDescription={jobDescription}
                  companyName={companyName}
                />
              )}
            </div>
          </div>
        ) : (
          <LiveResumeEditor />
        )}
      </div>
    </div>
  );
}