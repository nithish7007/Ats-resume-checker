export function analyzeResumeText(text: string) {
  const lowerText = text.toLowerCase();
  
  // Check if resume is empty or too short
  if (!text.trim() || text.trim().length < 50) {
    return {
      score: 0,
      keywordDensity: 0,
      formatQuality: 0,
      sections: {
        found: [],
        missing: ['Contact', 'Summary/Objective', 'Experience', 'Education', 'Skills', 'Projects', 'Certifications', 'Achievements']
      },
      keywords: {
        strong: [],
        weak: []
      },
      tips: [
        'Start by adding your resume content',
        'Include contact information at the top',
        'Add a professional summary or objective',
        'List your work experience with achievements',
        'Include your educational background'
      ],
      suggestedKeywords: []
    };
  }
  
  // Analyze sections
  const sections = {
    found: [] as string[],
    missing: [] as string[]
  };

  const requiredSections = [
    { name: 'Contact', keywords: ['email', 'phone', 'contact', 'location'] },
    { name: 'Summary/Objective', keywords: ['summary', 'objective', 'about'] },
    { name: 'Experience', keywords: ['experience', 'work history', 'employment'] },
    { name: 'Education', keywords: ['education', 'degree', 'university', 'college'] },
    { name: 'Skills', keywords: ['skills', 'technologies', 'technical skills'] },
  ];

  const optionalSections = [
    { name: 'Projects', keywords: ['projects', 'portfolio'] },
    { name: 'Certifications', keywords: ['certification', 'certificate', 'certified'] },
    { name: 'Achievements', keywords: ['achievement', 'award', 'recognition'] },
  ];

  requiredSections.forEach(section => {
    if (section.keywords.some(keyword => lowerText.includes(keyword))) {
      sections.found.push(section.name);
    } else {
      sections.missing.push(section.name);
    }
  });

  optionalSections.forEach(section => {
    if (section.keywords.some(keyword => lowerText.includes(keyword))) {
      sections.found.push(section.name);
    } else {
      sections.missing.push(section.name);
    }
  });

  // Analyze keywords
  const strongVerbs = [
    'achieved', 'improved', 'increased', 'decreased', 'developed',
    'created', 'implemented', 'designed', 'led', 'managed',
    'optimized', 'automated', 'built', 'launched', 'delivered',
    'streamlined', 'enhanced', 'accelerated', 'reduced', 'generated'
  ];

  const weakPhrases = [
    'responsible for', 'worked on', 'helped with', 'assisted',
    'duties included', 'involved in', 'participated in'
  ];

  const keywords = {
    strong: strongVerbs.filter(verb => lowerText.includes(verb)),
    weak: weakPhrases.filter(phrase => lowerText.includes(phrase))
  };

  // Calculate keyword density
  const totalWords = text.split(/\s+/).filter(w => w.length > 0).length;
  const technicalKeywords = [
    'javascript', 'python', 'java', 'react', 'node', 'aws', 'docker',
    'kubernetes', 'sql', 'api', 'cloud', 'agile', 'git', 'ci/cd'
  ];
  
  const techKeywordCount = technicalKeywords.filter(keyword => 
    lowerText.includes(keyword)
  ).length;

  const keywordDensity = Math.min(100, Math.round((techKeywordCount / technicalKeywords.length) * 100));

  // Calculate format quality
  let formatQuality = 50;
  
  // Check for proper email format
  if (lowerText.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/)) {
    formatQuality += 10;
  }
  
  // Check for phone number
  if (lowerText.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)) {
    formatQuality += 10;
  }
  
  // Check for bullet points or line breaks (good structure)
  if (text.split('\n').length > 10) {
    formatQuality += 15;
  }
  
  // Check for numbers/metrics
  if (lowerText.match(/\d+%/) || lowerText.match(/\d+\+/)) {
    formatQuality += 15;
  }

  formatQuality = Math.min(100, formatQuality);

  // Calculate overall score
  const sectionScore = (sections.found.length / (requiredSections.length + optionalSections.length)) * 100;
  const keywordScore = (keywords.strong.length * 5) - (keywords.weak.length * 3);
  const score = Math.min(100, Math.max(0, Math.round(
    (sectionScore * 0.3) + (keywordDensity * 0.3) + (formatQuality * 0.2) + (keywordScore * 0.2)
  )));

  // Generate tips
  const tips = [];
  
  if (keywords.weak.length > 2) {
    tips.push('Replace passive phrases with strong action verbs (e.g., "achieved", "developed", "led")');
  }
  
  if (!lowerText.match(/\d+%/)) {
    tips.push('Add quantifiable achievements with percentages or numbers');
  }
  
  if (sections.missing.includes('Projects')) {
    tips.push('Include a Projects section to showcase your practical work');
  }
  
  if (sections.missing.includes('Certifications')) {
    tips.push('Add relevant certifications to boost credibility');
  }
  
  if (keywords.strong.length < 5) {
    tips.push('Use more action verbs to describe your accomplishments');
  }

  if (techKeywordCount < 5) {
    tips.push('Include more relevant technical keywords from the job description');
  }

  // Suggested keywords
  const allTechKeywords = [
    'Agile', 'Scrum', 'CI/CD', 'REST API', 'Microservices',
    'Cloud Computing', 'Problem Solving', 'Team Leadership',
    'Code Review', 'Unit Testing', 'Version Control'
  ];

  const suggestedKeywords = allTechKeywords
    .filter(keyword => !lowerText.includes(keyword.toLowerCase()))
    .slice(0, 8);

  return {
    score,
    keywordDensity,
    formatQuality,
    sections,
    keywords,
    tips: tips.slice(0, 5),
    suggestedKeywords
  };
}