import { useState, useEffect, useRef } from 'react';
import { CheckCircle, AlertTriangle, Info, Upload, Download, FileText, Trash2, Sparkles, Layout } from 'lucide-react';
import { analyzeResumeText } from '../utils/liveAnalyzer';
import { extractTextFromPDF } from '../utils/pdfParser';
import { extractResumeData, ResumeData } from '../utils/resumeDataExtractor';
import { getTemplateById, resumeTemplates } from '../utils/resumeTemplates';
import { TemplateSelector } from './TemplateSelector';

export function LiveResumeEditor() {
  const [resumeText, setResumeText] = useState('');
  const [currentTemplateId, setCurrentTemplateId] = useState('classic-traditional');
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const [analysis, setAnalysis] = useState<any>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const result = analyzeResumeText(resumeText);
    setAnalysis(result);
  }, [resumeText]);

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFileName(file.name);

    try {
      // Check if it's a PDF file
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        const text = await extractTextFromPDF(file);
        setResumeText(text);
      } else {
        // Handle text-based files (txt, doc, docx)
        const reader = new FileReader();
        
        reader.onload = (event) => {
          const text = event.target?.result as string;
          setResumeText(text);
        };
        
        reader.readAsText(file);
      }
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error reading file. Please try again or use a different format.');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle download as TXT
  const handleDownloadTxt = () => {
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const txtFileName = fileName ? fileName.replace(/\.[^/.]+$/, '.txt') : 'edited_resume.txt';
    a.download = txtFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle download as DOC (using HTML format)
  const handleDownloadDoc = () => {
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>Resume</title>
          <style>
            body {
              font-family: 'Calibri', 'Arial', sans-serif;
              font-size: 11pt;
              line-height: 1.5;
              margin: 1in;
            }
            h1 {
              font-size: 18pt;
              font-weight: bold;
              margin-bottom: 0;
            }
            h2 {
              font-size: 14pt;
              font-weight: bold;
              margin-top: 12pt;
              margin-bottom: 6pt;
              border-bottom: 1px solid #000;
            }
          </style>
        </head>
        <body>
          <pre style="font-family: 'Calibri', 'Arial', sans-serif; white-space: pre-wrap; word-wrap: break-word;">${resumeText}</pre>
        </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const docFileName = fileName ? fileName.replace(/\.[^/.]+$/, '.doc') : 'edited_resume.doc';
    a.download = docFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle download as PDF
  const handleDownloadPdf = () => {
    // Create a simple PDF-like HTML structure
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Resume</title>
          <style>
            @page { margin: 1in; }
            body {
              font-family: 'Arial', sans-serif;
              font-size: 11pt;
              line-height: 1.6;
              color: #000;
            }
          </style>
        </head>
        <body>
          <pre style="font-family: 'Arial', sans-serif; white-space: pre-wrap; word-wrap: break-word;">${resumeText}</pre>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const pdfFileName = fileName ? fileName.replace(/\.[^/.]+$/, '.html') : 'edited_resume.html';
    a.download = pdfFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Downloaded as HTML. To convert to PDF: Open the HTML file in your browser and use "Print to PDF" from the print menu.');
  };

  // Clear resume
  const handleClear = () => {
    if (confirm('Are you sure you want to clear the resume? This cannot be undone.')) {
      setResumeText('');
      setFileName('');
    }
  };

  // Handle template change - migrate data
  const handleTemplateChange = (templateId: string) => {
    const newTemplate = getTemplateById(templateId);
    if (!newTemplate) return;

    // Extract structured data from current resume text
    const resumeData = extractResumeData(resumeText);
    
    // Render in new template format
    const newResumeText = newTemplate.render(resumeData);
    
    // Update resume text with new format
    setResumeText(newResumeText);
    setCurrentTemplateId(templateId);
    
    // Show success message
    setTimeout(() => {
      alert(`✓ Resume migrated to "${newTemplate.name}" format successfully!\n\nAll your data has been preserved and formatted in the new template.`);
    }, 300);
  };

  const currentTemplate = getTemplateById(currentTemplateId);

  return (
    <>
      {showTemplateSelector && (
        <TemplateSelector
          currentTemplateId={currentTemplateId}
          onSelectTemplate={handleTemplateChange}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Editor */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Deep Checker</h2>
              <p className="text-sm text-gray-600">
                Start typing, paste your resume text, or upload a file for real-time ATS feedback.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        {!resumeText && (
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Quick Start - Choose Your Method:
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold mt-0.5">1.</span>
                <div>
                  <span className="font-medium text-gray-900">Type or Paste:</span>
                  <span className="text-gray-600"> Click below and start typing, or paste your resume text (Ctrl+V / Cmd+V)</span>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold mt-0.5">2.</span>
                <div>
                  <span className="font-medium text-gray-900">Upload TXT/DOC:</span>
                  <span className="text-gray-600"> Click "Upload Resume" and select a .txt or .doc file</span>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 font-bold mt-0.5">3.</span>
                <div>
                  <span className="font-medium text-gray-900">Try PDF:</span>
                  <span className="text-gray-600"> Upload PDF (extraction may vary - copy/paste recommended)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* File Upload & Actions */}
        <div className="mb-4 flex flex-wrap gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.txt,.doc,.docx"
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
              isUploading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'Uploading...' : 'Upload Resume'}</span>
          </button>

          <button
            onClick={handleClear}
            disabled={!resumeText.trim()}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
              resumeText.trim()
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>

        {fileName && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <p className="text-sm font-medium text-blue-900">
                Editing: {fileName}
              </p>
            </div>
          </div>
        )}

        {isUploading && (
          <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-3">
              <svg className="animate-spin h-5 w-5 text-yellow-600" viewBox="0 0 24 24">
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
              <p className="text-sm font-medium text-yellow-900">
                Processing your resume... This may take a few seconds.
              </p>
            </div>
          </div>
        )}

        <div className="relative">
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="w-full h-[500px] px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none"
            rows={20}
            placeholder="Start typing your resume here or upload a file..."
          />
        </div>

        {/* Copy-Paste Helper */}
        {!resumeText && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-sm font-semibold text-green-900 mb-2">💡 Pro Tip: Copy & Paste Method</h4>
            <ol className="text-sm text-green-800 space-y-1 ml-4 list-decimal">
              <li>Open your resume PDF in any reader</li>
              <li>Select all text (Ctrl+A or Cmd+A)</li>
              <li>Copy (Ctrl+C or Cmd+C)</li>
              <li>Click in the text box above and paste (Ctrl+V or Cmd+V)</li>
            </ol>
            <p className="text-xs text-green-700 mt-2">✨ This works with any PDF and gives 100% accurate results!</p>
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Actions:</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setResumeText(resumeText + '\n\nPROJECTS\n')}
              className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              + Add Projects Section
            </button>
            <button
              onClick={() => setResumeText(resumeText + '\n\nCERTIFICATIONS\n')}
              className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              + Add Certifications
            </button>
            <button
              onClick={() => setResumeText(resumeText + '\n\nACHIEVEMENTS\n')}
              className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              + Add Achievements
            </button>
          </div>
        </div>
      </div>

      {/* Live Analysis Panel */}
      <div className="space-y-6">
        {/* ATS Compatibility Score */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Deep Checker Score</h3>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke={analysis?.score >= 70 ? '#10b981' : analysis?.score >= 50 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${(analysis?.score || 0) * 3.52} 352`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">
                  {analysis?.score || 0}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Keyword Density</span>
              <span className="font-medium">{analysis?.keywordDensity || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${analysis?.keywordDensity || 0}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm mt-3">
              <span className="text-gray-600">Format Quality</span>
              <span className="font-medium">{analysis?.formatQuality || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${analysis?.formatQuality || 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Color Legend */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Color Guide</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Strong Keywords</p>
                <p className="text-xs text-gray-500">Action verbs and quantified achievements</p>
              </div>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Needs Attention</p>
                <p className="text-xs text-gray-500">Missing important sections</p>
              </div>
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Weak Phrases</p>
                <p className="text-xs text-gray-500">Vague or passive language</p>
              </div>
              <Info className="w-4 h-4 text-red-600" />
            </div>
          </div>
        </div>

        {/* Section Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Section Analysis</h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Found Sections</p>
              <div className="flex flex-wrap gap-2">
                {analysis?.sections.found.map((section: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200"
                  >
                    ✓ {section}
                  </span>
                ))}
              </div>
            </div>

            {analysis?.sections.missing.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Missing Sections</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.sections.missing.map((section: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full border border-red-200"
                    >
                      ✗ {section}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Tips</h3>
          
          <ul className="space-y-2">
            {analysis?.tips.map((tip: string, index: number) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Keyword Suggestions */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Suggested Keywords</h3>
          
          <p className="text-sm text-gray-600 mb-3">
            Click to add keywords to improve ATS compatibility:
          </p>
          
          <div className="flex flex-wrap gap-2">
            {analysis?.suggestedKeywords.map((keyword: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
                onClick={() => {
                  setResumeText(resumeText + ', ' + keyword);
                }}
              >
                + {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Download Reminder */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <Download className="w-5 h-5 mr-2 text-green-600" />
            Ready to Download?
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Your resume looks great! Download it in your preferred format:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownloadTxt}
              className="px-3 py-2 bg-white border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors text-xs font-medium"
            >
              TXT Format
            </button>
            <button
              onClick={handleDownloadDoc}
              className="px-3 py-2 bg-white border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors text-xs font-medium"
            >
              DOC Format
            </button>
            <button
              onClick={handleDownloadPdf}
              className="col-span-2 px-3 py-2 bg-white border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 transition-colors text-xs font-medium"
            >
              HTML (Print to PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}