interface CompanyData {
  name: string;
  keywords: string[];
  preferredSkills: string[];
  techStack: string[];
  culture: string[];
}

export const companyDatabase: { [key: string]: CompanyData } = {
  Google: {
    name: 'Google',
    keywords: [
      'Algorithm', 'Data Structures', 'System Design', 'Scalability',
      'Python', 'Java', 'C++', 'Go', 'Machine Learning', 'AI',
      'Distributed Systems', 'Cloud Computing', 'GCP', 'Kubernetes',
      'Problem Solving', 'Innovation', 'Code Quality'
    ],
    preferredSkills: ['Python', 'Java', 'C++', 'Go', 'System Design', 'Algorithms'],
    techStack: ['GCP', 'Kubernetes', 'TensorFlow', 'Angular', 'Protobuf'],
    culture: ['Innovation', 'Data-driven', 'User-focused', 'Collaborative']
  },
  Microsoft: {
    name: 'Microsoft',
    keywords: [
      'C#', '.NET', 'Azure', 'TypeScript', 'SQL Server',
      'Cloud Computing', 'DevOps', 'Agile', 'System Design',
      'Scalability', 'Security', 'AI', 'Machine Learning',
      'Team Collaboration', 'Leadership'
    ],
    preferredSkills: ['C#', '.NET', 'Azure', 'TypeScript', 'SQL Server'],
    techStack: ['Azure', '.NET Core', 'Visual Studio', 'TypeScript', 'Power Platform'],
    culture: ['Growth mindset', 'Customer obsession', 'Diversity', 'Innovation']
  },
  Amazon: {
    name: 'Amazon',
    keywords: [
      'AWS', 'Java', 'Python', 'Distributed Systems', 'Scalability',
      'System Design', 'Data Structures', 'Algorithms', 'Microservices',
      'Leadership Principles', 'Customer Obsession', 'Ownership',
      'Bias for Action', 'High Performance'
    ],
    preferredSkills: ['Java', 'Python', 'AWS', 'System Design', 'Distributed Systems'],
    techStack: ['AWS', 'Java', 'Python', 'DynamoDB', 'Lambda', 'S3'],
    culture: ['Customer obsession', 'Ownership', 'Invent and simplify', 'Deliver results']
  },
  Meta: {
    name: 'Meta',
    keywords: [
      'React', 'JavaScript', 'Python', 'PHP', 'Hack',
      'Mobile Development', 'React Native', 'GraphQL',
      'System Design', 'Scalability', 'Data Engineering',
      'Machine Learning', 'AI', 'Social Impact'
    ],
    preferredSkills: ['React', 'JavaScript', 'Python', 'PHP', 'System Design'],
    techStack: ['React', 'React Native', 'GraphQL', 'PyTorch', 'Hack'],
    culture: ['Move fast', 'Bold', 'Focus on impact', 'Be open']
  },
  Apple: {
    name: 'Apple',
    keywords: [
      'Swift', 'Objective-C', 'iOS', 'macOS', 'UI/UX',
      'Performance Optimization', 'Security', 'Privacy',
      'Hardware-Software Integration', 'Design Excellence',
      'Attention to Detail', 'Innovation'
    ],
    preferredSkills: ['Swift', 'Objective-C', 'iOS Development', 'UI/UX', 'Performance'],
    techStack: ['Swift', 'Objective-C', 'Xcode', 'SwiftUI', 'Core Data'],
    culture: ['Excellence', 'Innovation', 'Privacy', 'User experience']
  },
  TCS: {
    name: 'TCS',
    keywords: [
      'Java', 'Spring Boot', 'Microservices', 'SQL', 'REST API',
      'Angular', 'React', 'Cloud', 'Azure', 'AWS',
      'Agile', 'Scrum', 'Client Interaction', 'Banking Domain',
      'Healthcare', 'Retail', 'BFSI'
    ],
    preferredSkills: ['Java', 'Spring Boot', 'Microservices', 'Angular', 'SQL'],
    techStack: ['Java', 'Spring', 'Angular', 'Oracle', 'Azure', 'Jenkins'],
    culture: ['Client-first', 'Excellence', 'Innovation', 'Integrity']
  },
  Infosys: {
    name: 'Infosys',
    keywords: [
      'Java', 'Python', 'SAP', 'Salesforce', 'Oracle',
      'Cloud Computing', 'AI', 'Automation', 'DevOps',
      'Digital Transformation', 'Agile', 'SDLC',
      'Client Management', 'Domain Expertise'
    ],
    preferredSkills: ['Java', 'Python', 'Cloud', 'SAP', 'Salesforce'],
    techStack: ['Java', 'Python', 'SAP', 'Salesforce', 'Oracle', 'AWS'],
    culture: ['Navigate your next', 'Learning', 'Client value', 'Innovation']
  },
  Wipro: {
    name: 'Wipro',
    keywords: [
      'Java', 'Python', '.NET', 'Cloud', 'Azure', 'AWS',
      'DevOps', 'Automation', 'Testing', 'Selenium',
      'Agile', 'SDLC', 'Digital', 'AI/ML',
      'Client Engagement', 'Domain Knowledge'
    ],
    preferredSkills: ['Java', 'Python', '.NET', 'Cloud', 'DevOps'],
    techStack: ['Java', '.NET', 'Python', 'Azure', 'AWS', 'Selenium'],
    culture: ['Spirit of Wipro', 'Integrity', 'Client focus', 'Excellence']
  },
  Deloitte: {
    name: 'Deloitte',
    keywords: [
      'Consulting', 'Business Analysis', 'Data Analytics',
      'Python', 'R', 'Tableau', 'Power BI', 'SQL',
      'Cloud', 'Azure', 'AWS', 'Digital Transformation',
      'Strategy', 'Client Management', 'Problem Solving',
      'Financial Services', 'Risk Management'
    ],
    preferredSkills: ['Business Analysis', 'Data Analytics', 'Python', 'Cloud', 'Consulting'],
    techStack: ['Python', 'R', 'Tableau', 'Power BI', 'Azure', 'SQL'],
    culture: ['Lead the way', 'Serve with integrity', 'Take care of each other', 'Collaborate']
  },
  Accenture: {
    name: 'Accenture',
    keywords: [
      'Java', 'Python', 'Salesforce', 'SAP', 'Cloud',
      'AI', 'Automation', 'Digital Transformation',
      'Consulting', 'Business Process', 'Agile',
      'Client Engagement', 'Industry Knowledge',
      'Innovation', 'Analytics'
    ],
    preferredSkills: ['Java', 'Python', 'Salesforce', 'Cloud', 'Consulting'],
    techStack: ['Java', 'Python', 'Salesforce', 'SAP', 'Azure', 'AWS'],
    culture: ['Client value creation', 'One global network', 'Respect for the individual', 'Integrity']
  },
  IBM: {
    name: 'IBM',
    keywords: [
      'Java', 'Python', 'Cloud', 'IBM Cloud', 'Watson',
      'AI', 'Machine Learning', 'Blockchain', 'Quantum Computing',
      'Mainframe', 'Enterprise Solutions', 'Consulting',
      'DevOps', 'Hybrid Cloud', 'Red Hat', 'OpenShift'
    ],
    preferredSkills: ['Java', 'Python', 'Cloud', 'AI', 'Enterprise Solutions'],
    techStack: ['Java', 'Python', 'IBM Cloud', 'Watson', 'Red Hat', 'Kubernetes'],
    culture: ['Innovation', 'Trust', 'Client success', 'Excellence']
  },
  Oracle: {
    name: 'Oracle',
    keywords: [
      'Java', 'SQL', 'PL/SQL', 'Oracle Database', 'Cloud',
      'OCI', 'Enterprise Applications', 'ERP', 'SCM',
      'Database Administration', 'Performance Tuning',
      'RAC', 'Data Guard', 'Exadata'
    ],
    preferredSkills: ['Java', 'SQL', 'PL/SQL', 'Oracle Database', 'Cloud'],
    techStack: ['Java', 'Oracle Database', 'PL/SQL', 'OCI', 'WebLogic'],
    culture: ['Innovation', 'Customer first', 'Collaboration', 'Excellence']
  }
};
