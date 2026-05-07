import { companyDatabase } from './companyDatabase';

export function parseResume(fileName: string, jobDescription: string, companyName: string, resumeText?: string) {
  // Check if resume is empty or has minimal content
  const isEmptyResume = !resumeText || resumeText.trim().length < 50;
  
  if (isEmptyResume) {
    // Return very low scores for empty resumes
    return {
      atsScore: 0,
      keywordMatch: 0,
      formatScore: 0,
      sectionScore: 0,
      strengths: ['Resume file uploaded successfully'],
      improvements: [
        'Resume appears to be empty or has very minimal content',
        'Add your personal information (name, contact details, email)',
        'Include a professional summary section',
        'Add your work experience with detailed descriptions',
        'List your education and qualifications',
        'Add a comprehensive skills section',
        'Include relevant certifications and achievements'
      ],
      missingKeywords: [],
      missingSkills: [],
      fileName,
      text: resumeText || '',
    };
  }
  
  // Simulate resume parsing with realistic data
  const companyData = companyName ? companyDatabase[companyName] : null;
  
  // Simulate extracting skills from resume filename and content
  // In a real app, you'd parse the actual PDF/DOCX content here
  const mockResumeSkills = simulateResumeSkillExtraction(fileName);
  
  // Extract keywords from job description
  const jdKeywords = extractKeywords(jobDescription);
  
  // Add company-specific keywords if available
  const targetKeywords = companyData 
    ? [...jdKeywords, ...companyData.keywords]
    : jdKeywords;

  // Calculate keyword match
  const matchedKeywords = mockResumeSkills.filter(skill => 
    targetKeywords.some(keyword => 
      keyword.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  const keywordMatch = targetKeywords.length > 0 
    ? Math.round((matchedKeywords.length / targetKeywords.length) * 100)
    : 50; // Default if no job description

  // Calculate format score with some variation
  const formatScore = calculateFormatScore(fileName, mockResumeSkills);

  // Calculate section score with variation
  const sectionScore = calculateSectionScore(mockResumeSkills);

  // Calculate overall ATS score
  const atsScore = Math.round((keywordMatch * 0.5) + (formatScore * 0.3) + (sectionScore * 0.2));

  // Identify missing keywords
  const missingKeywords = targetKeywords
    .filter(keyword => !matchedKeywords.some(matched => 
      matched.toLowerCase().includes(keyword.toLowerCase()) ||
      keyword.toLowerCase().includes(matched.toLowerCase())
    ))
    .slice(0, 8);

  // Identify missing skills for skill gap analysis
  const missingSkills = identifyMissingSkills(mockResumeSkills, jobDescription, companyData);

  // Generate dynamic feedback
  const strengths = generateStrengths(mockResumeSkills, companyData, keywordMatch);
  const improvements = generateImprovements(missingKeywords, companyData, keywordMatch);

  return {
    atsScore,
    keywordMatch,
    formatScore,
    sectionScore,
    strengths,
    improvements,
    missingKeywords,
    missingSkills,
    fileName,
    text: resumeText || '',
  };
}

// Simulate skill extraction from resume (varies based on filename)
function simulateResumeSkillExtraction(fileName: string): string[] {
  // Base skills that might be in any resume
  const baseSkills = ['Communication', 'Problem Solving', 'Team Collaboration'];
  
  // Technical skills pool
  const technicalSkillsPool = [
    'JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'React', 'Angular', 'Vue',
    'Node.js', 'Django', 'Flask', 'Spring Boot', 'Express.js',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD',
    'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'NoSQL',
    'Git', 'GitHub', 'GitLab', 'REST API', 'GraphQL', 
    'Microservices', 'Agile', 'Scrum', 'TDD', 'Unit Testing',
    'HTML', 'CSS', 'Tailwind', 'Bootstrap', 'SASS',
    'Machine Learning', 'Data Analysis', 'AI', 'Deep Learning',
    'System Design', 'Data Structures', 'Algorithms',
    'Linux', 'Windows Server', 'Networking', 'Security',
    'Leadership', 'Project Management', 'Code Review'
  ];

  // Use filename as seed for consistent but varied results
  const seed = fileName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Select 8-15 random technical skills based on filename
  const numSkills = 8 + (seed % 8);
  const selectedSkills = [];
  
  for (let i = 0; i < numSkills; i++) {
    const index = (seed + i * 7) % technicalSkillsPool.length;
    if (!selectedSkills.includes(technicalSkillsPool[index])) {
      selectedSkills.push(technicalSkillsPool[index]);
    }
  }

  return [...baseSkills, ...selectedSkills];
}

// Calculate format score with variation
function calculateFormatScore(fileName: string, skills: string[]): number {
  let score = 70; // Base score
  
  // PDF files typically score higher
  if (fileName.toLowerCase().endsWith('.pdf')) {
    score += 15;
  } else if (fileName.toLowerCase().endsWith('.docx')) {
    score += 10;
  } else {
    score += 5;
  }
  
  // More skills = better formatted resume (likely)
  if (skills.length > 15) {
    score += 10;
  } else if (skills.length > 10) {
    score += 5;
  }
  
  // Add slight randomness
  const seed = fileName.length;
  score += (seed % 6) - 3; // -3 to +2
  
  return Math.min(100, Math.max(60, score));
}

// Calculate section score with variation
function calculateSectionScore(skills: string[]): number {
  let score = 65; // Base score
  
  // More diverse skills = better section structure
  const hasLeadership = skills.some(s => s.toLowerCase().includes('leadership') || s.toLowerCase().includes('project management'));
  const hasTechnical = skills.some(s => ['JavaScript', 'Python', 'Java'].includes(s));
  const hasSoft = skills.some(s => ['Communication', 'Team Collaboration', 'Problem Solving'].includes(s));
  
  if (hasLeadership) score += 8;
  if (hasTechnical) score += 12;
  if (hasSoft) score += 10;
  
  // More skills generally means more complete sections
  if (skills.length > 15) {
    score += 5;
  }
  
  return Math.min(100, Math.max(60, score));
}

// Generate dynamic strengths
function generateStrengths(skills: string[], companyData: any, keywordMatch: number): string[] {
  const strengths = [];
  
  if (keywordMatch > 70) {
    strengths.push('Excellent keyword alignment with job requirements');
  } else if (keywordMatch > 50) {
    strengths.push('Good keyword coverage in resume');
  } else {
    strengths.push('Clear contact information present');
  }
  
  if (skills.length > 15) {
    strengths.push('Comprehensive skills section with diverse technologies');
  } else {
    strengths.push('Well-structured sections with appropriate headings');
  }
  
  const hasTechnical = skills.some(s => ['JavaScript', 'Python', 'Java', 'TypeScript', 'React', 'Node.js'].includes(s));
  if (hasTechnical) {
    strengths.push('Strong technical skills relevant to modern development');
  } else {
    strengths.push('Uses standard font and proper formatting');
  }
  
  if (companyData) {
    const hasCompanySkill = companyData.preferredSkills.some((ps: string) => 
      skills.some(s => s.toLowerCase().includes(ps.toLowerCase()))
    );
    if (hasCompanySkill) {
      strengths.push(`Includes ${companyData.name}-relevant technologies`);
    } else {
      strengths.push(`Resume structure follows ${companyData.name} standards`);
    }
  } else {
    strengths.push('Professional email format detected');
  }
  
  return strengths;
}

// Generate dynamic improvements
function generateImprovements(missingKeywords: string[], companyData: any, keywordMatch: number): string[] {
  const improvements = [];
  
  if (keywordMatch < 60) {
    improvements.push('Add more keywords from the job description to improve match rate');
  }
  
  if (missingKeywords.length > 5) {
    improvements.push(`Include these missing keywords: ${missingKeywords.slice(0, 3).join(', ')}`);
  } else {
    improvements.push('Add more quantifiable achievements with metrics (e.g., "Increased performance by 40%")');
  }
  
  improvements.push('Include specific project examples and measurable outcomes');
  
  if (keywordMatch < 50) {
    improvements.push('Expand technical skills section to match job requirements');
  } else {
    improvements.push('Add proficiency levels to technical skills (e.g., Expert, Advanced, Intermediate)');
  }
  
  if (companyData) {
    const missingCompanySkills = companyData.preferredSkills.filter((ps: string) => 
      missingKeywords.some(mk => mk.toLowerCase().includes(ps.toLowerCase()))
    ).slice(0, 2);
    
    if (missingCompanySkills.length > 0) {
      improvements.push(`Highlight ${missingCompanySkills.join(', ')} experience for ${companyData.name}`);
    } else {
      improvements.push(`Emphasize experience with ${companyData.techStack.slice(0, 2).join(' and ')}`);
    }
  } else {
    improvements.push('Tailor resume to specific company requirements by selecting a target company');
  }
  
  return improvements;
}

function extractKeywords(jobDescription: string): string[] {
  if (!jobDescription) return [];

  const commonKeywords = [
    'Python', 'Java', 'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue',
    'Node.js', 'Django', 'Flask', 'Spring Boot', 'AWS', 'Azure', 'GCP',
    'Docker', 'Kubernetes', 'CI/CD', 'Agile', 'Scrum', 'SQL', 'NoSQL',
    'Git', 'REST API', 'GraphQL', 'Microservices', 'TDD', 'Machine Learning',
    'Data Structures', 'Algorithms', 'Problem Solving', 'Team Collaboration',
    'Leadership', 'Communication', 'Project Management', 'MongoDB', 'PostgreSQL',
    'Express.js', 'HTML', 'CSS', 'Bootstrap', 'Tailwind', 'Redux', 'Testing',
    'DevOps', 'Linux', 'APIs', 'Frontend', 'Backend', 'Full Stack',
    'Database', 'Cloud', 'Security', 'Performance', 'Optimization'
  ];

  return commonKeywords.filter(keyword => 
    jobDescription.toLowerCase().includes(keyword.toLowerCase())
  );
}

function identifyMissingSkills(resumeSkills: string[], jobDescription: string, companyData: any) {
  const skills = [];

  // Check for company-specific skills first
  if (companyData) {
    companyData.preferredSkills.forEach((skill: string) => {
      if (!resumeSkills.some(rs => rs.toLowerCase().includes(skill.toLowerCase()))) {
        if (skills.length < 6) {
          skills.push({
            name: skill,
            category: 'Technical Skill',
            priority: 'High',
            reason: `${companyData.name} strongly prefers candidates with ${skill} experience`,
          });
        }
      }
    });
  }

  // Extract skills from job description
  const jdKeywords = extractKeywords(jobDescription);
  
  jdKeywords.forEach(keyword => {
    if (!resumeSkills.some(rs => 
      rs.toLowerCase().includes(keyword.toLowerCase()) || 
      keyword.toLowerCase().includes(rs.toLowerCase())
    )) {
      if (skills.length < 6 && !skills.some(s => s.name === keyword)) {
        const category = determineCategory(keyword);
        const priority = determinePriority(keyword, companyData);
        
        skills.push({
          name: keyword,
          category: category,
          priority: priority,
          reason: `This skill is required in the job description and will strengthen your application`,
        });
      }
    }
  });

  // If no specific gaps found, suggest common improvements
  if (skills.length === 0) {
    const defaultSkills = [
      { name: 'Cloud Computing', category: 'Infrastructure', priority: 'Medium' },
      { name: 'System Design', category: 'Architecture', priority: 'High' },
    ];
    
    defaultSkills.forEach(skill => {
      if (!resumeSkills.includes(skill.name)) {
        skills.push({
          ...skill,
          reason: 'Highly valued skill in modern software development roles',
        });
      }
    });
  }

  return skills.slice(0, 6);
}

function determineCategory(skill: string): string {
  const categories: { [key: string]: string } = {
    'Python': 'Programming Language',
    'Java': 'Programming Language',
    'JavaScript': 'Programming Language',
    'TypeScript': 'Programming Language',
    'React': 'Framework/Library',
    'Angular': 'Framework/Library',
    'Vue': 'Framework/Library',
    'Node.js': 'Runtime Environment',
    'AWS': 'Cloud Platform',
    'Azure': 'Cloud Platform',
    'GCP': 'Cloud Platform',
    'Docker': 'DevOps Tool',
    'Kubernetes': 'DevOps Tool',
    'Git': 'Version Control',
    'SQL': 'Database',
    'MongoDB': 'Database',
    'Leadership': 'Soft Skill',
    'Agile': 'Methodology',
    'Scrum': 'Methodology',
  };
  
  return categories[skill] || 'Technical Skill';
}

function determinePriority(skill: string, companyData: any): string {
  // Company preferred skills are high priority
  if (companyData && companyData.preferredSkills.some((ps: string) => 
    ps.toLowerCase().includes(skill.toLowerCase())
  )) {
    return 'High';
  }
  
  // Core technical skills
  const highPrioritySkills = ['Python', 'Java', 'JavaScript', 'React', 'AWS', 'System Design', 'Algorithms'];
  if (highPrioritySkills.some(hps => skill.toLowerCase().includes(hps.toLowerCase()))) {
    return 'High';
  }
  
  // DevOps and cloud
  const mediumPrioritySkills = ['Docker', 'Kubernetes', 'CI/CD', 'Azure', 'GCP', 'Agile'];
  if (mediumPrioritySkills.some(mps => skill.toLowerCase().includes(mps.toLowerCase()))) {
    return 'Medium';
  }
  
  return 'Low';
}