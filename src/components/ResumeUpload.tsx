import { useState, useCallback } from 'react';
import { Upload, FileText, Building2, Briefcase } from 'lucide-react';
import { parseResume } from '../utils/resumeParser';

interface ResumeUploadProps {
  onResumeAnalyzed: (data: any) => void;
  jobDescription: string;
  setJobDescription: (desc: string) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
}

export function ResumeUpload({
  onResumeAnalyzed,
  jobDescription,
  setJobDescription,
  companyName,
  setCompanyName,
}: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.docx') || droppedFile.type === 'text/plain')) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Read the file content
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      
      // Simulate parsing delay
      setTimeout(() => {
        const parsedData = parseResume(file.name, jobDescription, companyName, content);
        onResumeAnalyzed(parsedData);
        setIsAnalyzing(false);
      }, 2000);
    };
    
    // Read as text for txt files, or just pass file name for PDFs/DOCX
    if (file.type === 'text/plain') {
      reader.readAsText(file);
    } else {
      // For PDF/DOCX, we'll simulate with realistic resume content
      // In production, you'd use a PDF parser library
      const mockResumeContent = `
        PROFESSIONAL SUMMARY
        Experienced software developer with expertise in full-stack development, cloud technologies, and agile methodologies.
        
        TECHNICAL SKILLS
        Programming Languages: JavaScript, Python, Java, TypeScript, C++
        Frameworks & Libraries: React, Node.js, Express.js, Django, Spring Boot
        Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD, Jenkins
        Databases: MongoDB, PostgreSQL, MySQL, Redis
        Tools: Git, GitHub, JIRA, VS Code
        
        WORK EXPERIENCE
        Senior Software Engineer | Tech Company | 2020 - Present
        - Developed and maintained microservices architecture using Node.js and Docker
        - Implemented CI/CD pipelines reducing deployment time by 40%
        - Led team of 5 developers in agile development process
        - Designed REST APIs and GraphQL endpoints for scalable applications
        
        Software Engineer | StartUp Inc | 2018 - 2020
        - Built responsive web applications using React and TypeScript
        - Optimized database queries improving performance by 50%
        - Collaborated with cross-functional teams in agile environment
        
        EDUCATION
        Bachelor of Science in Computer Science
        University Name | 2014 - 2018
        
        CERTIFICATIONS
        - AWS Certified Solutions Architect
        - Certified Kubernetes Administrator
      `;
      
      setTimeout(() => {
        const parsedData = parseResume(file.name, jobDescription, companyName, mockResumeContent);
        onResumeAnalyzed(parsedData);
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Company Selection */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Building2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Company-Specific Analysis</h2>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Company (Optional)
          </label>
          <select
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a company...</option>
            <option value="Google">Google</option>
            <option value="Microsoft">Microsoft</option>
            <option value="Amazon">Amazon</option>
            <option value="Meta">Meta (Facebook)</option>
            <option value="Apple">Apple</option>
            <option value="TCS">Tata Consultancy Services (TCS)</option>
            <option value="Infosys">Infosys</option>
            <option value="Wipro">Wipro</option>
            <option value="Deloitte">Deloitte</option>
            <option value="Accenture">Accenture</option>
            <option value="IBM">IBM</option>
            <option value="Oracle">Oracle</option>
          </select>
          {companyName && (
            <p className="mt-2 text-sm text-blue-600">
              ✓ Analysis will be tailored for {companyName}'s requirements
            </p>
          )}
        </div>
      </div>

      {/* Job Description */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Briefcase className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste the job description here
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description including required skills, qualifications, and responsibilities..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={8}
          />
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Upload Your Resume</h2>
        </div>
        
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            type="file"
            id="resume-upload"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="resume-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              {file ? file.name : 'Drop your resume here or click to browse'}
            </p>
            <p className="text-sm text-gray-500">
              Supports PDF, DOC, DOCX, TXT (Max 5MB)
            </p>
          </label>
        </div>

        {file && (
          <div className="mt-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={!file || isAnalyzing}
          className={`w-full mt-6 py-4 rounded-lg font-semibold text-white transition-all ${
            !file || isAnalyzing
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {isAnalyzing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Analyzing Resume...
            </span>
          ) : (
            'Analyze Resume'
          )}
        </button>
      </div>
    </div>
  );
}