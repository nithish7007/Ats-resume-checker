// Resume Data Extractor - Extracts structured data from resume text
// This enables seamless template switching without data loss

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    github: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    duration: string;
    description: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    year: string;
    details: string[];
  }>;
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
    languages: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  achievements: string[];
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
}

export function extractResumeData(resumeText: string): ResumeData {
  const lines = resumeText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  const data: ResumeData = {
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      github: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      tools: [],
      languages: []
    },
    projects: [],
    certifications: [],
    achievements: [],
    languages: []
  };

  // Extract personal info (usually first few lines)
  if (lines.length > 0) {
    data.personalInfo.name = lines[0];
  }
  if (lines.length > 1 && lines[1].length < 50 && !lines[1].includes('@')) {
    data.personalInfo.title = lines[1];
  }

  // Extract email
  const emailMatch = resumeText.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) data.personalInfo.email = emailMatch[0];

  // Extract phone
  const phoneMatch = resumeText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) data.personalInfo.phone = phoneMatch[0];

  // Extract location
  const locationMatch = resumeText.match(/(?:Location|Address|City):\s*(.+)/i);
  if (locationMatch) {
    data.personalInfo.location = locationMatch[1].split('\n')[0].trim();
  } else {
    // Look for city, state pattern
    const cityStateMatch = resumeText.match(/([A-Z][a-zA-Z\s]+),\s*([A-Z]{2})/);
    if (cityStateMatch) data.personalInfo.location = cityStateMatch[0];
  }

  // Extract LinkedIn
  const linkedinMatch = resumeText.match(/linkedin\.com\/in\/[\w-]+/i);
  if (linkedinMatch) data.personalInfo.linkedin = linkedinMatch[0];

  // Extract GitHub
  const githubMatch = resumeText.match(/github\.com\/[\w-]+/i);
  if (githubMatch) data.personalInfo.github = githubMatch[0];

  // Extract website
  const websiteMatch = resumeText.match(/(?:Website|Portfolio):\s*(https?:\/\/[^\s]+)/i);
  if (websiteMatch) data.personalInfo.website = websiteMatch[1];

  // Find section boundaries
  const sections = findSections(resumeText);

  // Extract Summary/Objective
  if (sections.summary) {
    data.summary = sections.summary.trim();
  }

  // Extract Experience
  if (sections.experience) {
    data.experience = extractExperience(sections.experience);
  }

  // Extract Education
  if (sections.education) {
    data.education = extractEducation(sections.education);
  }

  // Extract Skills
  if (sections.skills) {
    data.skills = extractSkills(sections.skills);
  }

  // Extract Projects
  if (sections.projects) {
    data.projects = extractProjects(sections.projects);
  }

  // Extract Certifications
  if (sections.certifications) {
    data.certifications = extractCertifications(sections.certifications);
  }

  // Extract Achievements
  if (sections.achievements) {
    data.achievements = extractAchievements(sections.achievements);
  }

  return data;
}

function findSections(text: string): Record<string, string> {
  const sections: Record<string, string> = {};
  
  const sectionHeaders = {
    summary: /(?:^|\n)(SUMMARY|OBJECTIVE|PROFILE|ABOUT|PROFESSIONAL SUMMARY)(?:\s*:)?\s*\n/i,
    experience: /(?:^|\n)(EXPERIENCE|WORK EXPERIENCE|EMPLOYMENT|PROFESSIONAL EXPERIENCE|WORK HISTORY)(?:\s*:)?\s*\n/i,
    education: /(?:^|\n)(EDUCATION|ACADEMIC|QUALIFICATION)(?:\s*:)?\s*\n/i,
    skills: /(?:^|\n)(SKILLS|TECHNICAL SKILLS|COMPETENCIES|EXPERTISE)(?:\s*:)?\s*\n/i,
    projects: /(?:^|\n)(PROJECTS|PERSONAL PROJECTS|KEY PROJECTS)(?:\s*:)?\s*\n/i,
    certifications: /(?:^|\n)(CERTIFICATIONS|CERTIFICATES|LICENSES)(?:\s*:)?\s*\n/i,
    achievements: /(?:^|\n)(ACHIEVEMENTS|ACCOMPLISHMENTS|AWARDS|HONORS)(?:\s*:)?\s*\n/i
  };

  const matches: Array<{ key: string; index: number; header: string }> = [];

  for (const [key, pattern] of Object.entries(sectionHeaders)) {
    const match = text.match(pattern);
    if (match && match.index !== undefined) {
      matches.push({ key, index: match.index, header: match[0] });
    }
  }

  // Sort by index
  matches.sort((a, b) => a.index - b.index);

  // Extract section content
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const next = matches[i + 1];
    const start = current.index + current.header.length;
    const end = next ? next.index : text.length;
    sections[current.key] = text.substring(start, end).trim();
  }

  return sections;
}

function extractExperience(text: string): ResumeData['experience'] {
  const experiences: ResumeData['experience'] = [];
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  let current: any = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if this is a job title line (usually followed by company)
    if (line.length > 0 && !line.startsWith('-') && !line.startsWith('•')) {
      // Check if next line might be company or date
      const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
      
      if (current && current.title) {
        experiences.push(current);
      }
      
      current = {
        title: line,
        company: '',
        location: '',
        duration: '',
        description: []
      };
      
      // Try to extract company and duration
      if (nextLine && (nextLine.includes('|') || nextLine.includes('—') || nextLine.includes('-'))) {
        const parts = nextLine.split(/[|—]/);
        if (parts.length >= 2) {
          current.company = parts[0].trim();
          current.duration = parts[1].trim();
          i++; // Skip next line
        }
      } else if (nextLine && /\d{4}/.test(nextLine)) {
        current.duration = nextLine;
        i++;
      }
    } else if (line.startsWith('-') || line.startsWith('•')) {
      if (current) {
        current.description.push(line.replace(/^[-•]\s*/, '').trim());
      }
    }
  }
  
  if (current && current.title) {
    experiences.push(current);
  }
  
  return experiences;
}

function extractEducation(text: string): ResumeData['education'] {
  const education: ResumeData['education'] = [];
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  let current: any = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.length > 0 && !line.startsWith('-') && !line.startsWith('•')) {
      if (current && current.degree) {
        education.push(current);
      }
      
      current = {
        degree: line,
        institution: '',
        location: '',
        year: '',
        details: []
      };
      
      // Next line might be institution
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        if (!nextLine.startsWith('-') && !nextLine.startsWith('•')) {
          current.institution = nextLine.trim();
          i++;
        }
      }
      
      // Extract year
      const yearMatch = line.match(/\b(19|20)\d{2}\b/);
      if (yearMatch) current.year = yearMatch[0];
    } else if (line.startsWith('-') || line.startsWith('•')) {
      if (current) {
        current.details.push(line.replace(/^[-•]\s*/, '').trim());
      }
    }
  }
  
  if (current && current.degree) {
    education.push(current);
  }
  
  return education;
}

function extractSkills(text: string): ResumeData['skills'] {
  const skills: ResumeData['skills'] = {
    technical: [],
    soft: [],
    tools: [],
    languages: []
  };
  
  // Split by common delimiters
  const skillList = text.split(/[,;\n]/).map(s => s.trim()).filter(s => s.length > 0);
  
  const technicalKeywords = ['JavaScript', 'Python', 'Java', 'C++', 'React', 'Node', 'SQL', 'MongoDB', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'TypeScript', 'Angular', 'Vue', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Go', 'Rust'];
  const toolKeywords = ['Git', 'Jira', 'VS Code', 'Figma', 'Photoshop', 'Illustrator', 'Slack', 'Trello'];
  const softKeywords = ['Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking', 'Time Management'];
  
  for (const skill of skillList) {
    const skillLower = skill.toLowerCase();
    
    if (technicalKeywords.some(k => skillLower.includes(k.toLowerCase()))) {
      skills.technical.push(skill);
    } else if (toolKeywords.some(k => skillLower.includes(k.toLowerCase()))) {
      skills.tools.push(skill);
    } else if (softKeywords.some(k => skillLower.includes(k.toLowerCase()))) {
      skills.soft.push(skill);
    } else {
      skills.technical.push(skill);
    }
  }
  
  return skills;
}

function extractProjects(text: string): ResumeData['projects'] {
  const projects: ResumeData['projects'] = [];
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  let current: any = null;
  
  for (const line of lines) {
    if (line.length > 0 && !line.startsWith('-') && !line.startsWith('•')) {
      if (current && current.name) {
        projects.push(current);
      }
      current = {
        name: line.trim(),
        description: '',
        technologies: [],
        link: ''
      };
    } else if (line.startsWith('-') || line.startsWith('•')) {
      if (current) {
        if (!current.description) {
          current.description = line.replace(/^[-•]\s*/, '').trim();
        }
      }
    }
  }
  
  if (current && current.name) {
    projects.push(current);
  }
  
  return projects;
}

function extractCertifications(text: string): ResumeData['certifications'] {
  const certifications: ResumeData['certifications'] = [];
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  for (const line of lines) {
    const parts = line.split(/[|-]/);
    certifications.push({
      name: parts[0]?.trim() || line,
      issuer: parts[1]?.trim() || '',
      date: parts[2]?.trim() || ''
    });
  }
  
  return certifications;
}

function extractAchievements(text: string): string[] {
  return text.split(/[\n•-]/).map(a => a.trim()).filter(a => a.length > 0);
}
