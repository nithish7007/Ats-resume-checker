interface LearningSuggestion {
  title: string;
  description: string;
  platform: 'Coursera' | 'Udemy' | 'YouTube';
  url: string;
  duration?: string;
  level?: string;
  skill: string;
}

const courseSuggestions: LearningSuggestion[] = [
  // TypeScript
  {
    title: 'Understanding TypeScript - 2024 Edition',
    description: 'Master TypeScript from scratch with practical projects',
    platform: 'Udemy',
    url: 'https://www.udemy.com/course/understanding-typescript/',
    duration: '15 hours',
    level: 'All Levels',
    skill: 'TypeScript'
  },
  {
    title: 'TypeScript Full Course for Beginners - FreeCodeCamp',
    description: 'Complete TypeScript tutorial covering fundamentals to advanced concepts',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=30LWjhZzg50',
    duration: '8 hours',
    level: 'Beginner',
    skill: 'TypeScript'
  },
  {
    title: 'TypeScript Tutorial - Programming with Mosh',
    description: 'Learn TypeScript in 1 hour with practical examples',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=d56mG7DezGs',
    duration: '1 hour',
    level: 'Beginner',
    skill: 'TypeScript'
  },

  // JavaScript
  {
    title: 'The Complete JavaScript Course 2024',
    description: 'From Zero to Expert: The only JavaScript course you need',
    platform: 'Udemy',
    url: 'https://www.udemy.com/course/the-complete-javascript-course/',
    duration: '69 hours',
    level: 'All Levels',
    skill: 'JavaScript'
  },
  {
    title: 'JavaScript Full Course - FreeCodeCamp',
    description: 'Learn JavaScript from scratch - beginner to advanced',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
    duration: '3.5 hours',
    level: 'Beginner',
    skill: 'JavaScript'
  },
  {
    title: 'JavaScript Crash Course For Beginners - Traversy Media',
    description: 'Modern JavaScript from the beginning',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c',
    duration: '1.5 hours',
    level: 'Beginner',
    skill: 'JavaScript'
  },

  // Python
  {
    title: 'Python for Everybody Specialization',
    description: 'Learn Python programming from University of Michigan',
    platform: 'Coursera',
    url: 'https://www.coursera.org/specializations/python',
    duration: '8 weeks',
    level: 'Beginner',
    skill: 'Python'
  },
  {
    title: 'Complete Python Bootcamp',
    description: 'Go from zero to hero in Python programming',
    platform: 'Udemy',
    url: 'https://www.udemy.com/course/complete-python-bootcamp/',
    duration: '22 hours',
    level: 'All Levels',
    skill: 'Python'
  },
  {
    title: 'Python Full Course - FreeCodeCamp',
    description: 'Learn Python in 4 hours with practical projects',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    duration: '4 hours',
    level: 'Beginner',
    skill: 'Python'
  },
  {
    title: 'Python Tutorial - Programming with Mosh',
    description: 'Python for beginners - complete course in one video',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
    duration: '6 hours',
    level: 'Beginner',
    skill: 'Python'
  },

  // Java
  {
    title: 'Java Programming Masterclass',
    description: 'Complete Java course covering Java 17 and beyond',
    platform: 'Udemy',
    url: 'https://www.udemy.com/course/java-the-complete-java-developer-course/',
    duration: '80 hours',
    level: 'All Levels',
    skill: 'Java'
  },
  {
    title: 'Object Oriented Programming in Java',
    description: 'Learn Java and OOP concepts from Duke University',
    platform: 'Coursera',
    url: 'https://www.coursera.org/learn/object-oriented-java',
    duration: '6 weeks',
    level: 'Beginner',
    skill: 'Java'
  },
  {
    title: 'Java Full Course - FreeCodeCamp',
    description: 'Complete Java programming tutorial for beginners',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=grEKMHGYyns',
    duration: '10 hours',
    level: 'Beginner',
    skill: 'Java'
  },
  {
    title: 'Java Tutorial for Beginners - Programming with Mosh',
    description: 'Learn Java in 2.5 hours',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=eIrMbAQSU34',
    duration: '2.5 hours',
    level: 'Beginner',
    skill: 'Java'
  },

  // React
  {
    title: 'React - The Complete Guide',
    description: 'Master React including Hooks, Redux, and Next.js',
    platform: 'Udemy',
    url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
    duration: '49 hours',
    level: 'All Levels',
    skill: 'React'
  },
  {
    title: 'React Course - Beginner\'s Tutorial - FreeCodeCamp',
    description: 'Learn React JS with this full course for beginners',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
    duration: '12 hours',
    level: 'Beginner',
    skill: 'React'
  },
  {
    title: 'React JS Crash Course - Traversy Media',
    description: 'Learn the fundamentals of React in 1.5 hours',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
    duration: '1.5 hours',
    level: 'Beginner',
    skill: 'React'
  },
  {
    title: 'React Tutorial for Beginners - Programming with Mosh',
    description: 'Learn React from scratch with practical examples',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
    duration: '1 hour',
    level: 'Beginner',
    skill: 'React'
  },

  // Node.js
  {
    title: 'Node.js, Express, MongoDB & More - The Complete Bootcamp',
    description: 'Master Node.js by building a real-world RESTful API',
    platform: 'Udemy',
    url: 'https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/',
    duration: '42 hours',
    level: 'All Levels',
    skill: 'Node.js'
  },
  {
    title: 'Node.js Full Course - FreeCodeCamp',
    description: 'Complete Node.js tutorial for beginners',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
    duration: '8 hours',
    level: 'Beginner',
    skill: 'Node.js'
  },
  {
    title: 'Node.js Crash Course - Traversy Media',
    description: 'Learn Node.js basics in 90 minutes',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4',
    duration: '1.5 hours',
    level: 'Beginner',
    skill: 'Node.js'
  },

  // Docker
  {
    title: 'Docker & Kubernetes: The Complete Guide',
    description: 'Build, test, and deploy Docker applications with Kubernetes',
    platform: 'Udemy',
    url: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/',
    duration: '22 hours',
    level: 'Intermediate',
    skill: 'Docker'
  },
  {
    title: 'Docker Tutorial for Beginners - TechWorld with Nana',
    description: 'Complete Docker tutorial with practical examples',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
    duration: '3 hours',
    level: 'Beginner',
    skill: 'Docker'
  },
  {
    title: 'Docker Crash Course - FreeCodeCamp',
    description: 'Learn Docker in 2 hours',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo',
    duration: '2 hours',
    level: 'Beginner',
    skill: 'Docker'
  },

  // Kubernetes
  {
    title: 'Kubernetes for Beginners - TechWorld with Nana',
    description: 'Complete Kubernetes course with hands-on demos',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=X48VuDVv0do',
    duration: '4 hours',
    level: 'Beginner',
    skill: 'Kubernetes'
  },
  {
    title: 'Kubernetes Full Course - FreeCodeCamp',
    description: 'Learn Kubernetes in 4 hours - practical guide',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=d6WC5n9G_sM',
    duration: '4 hours',
    level: 'Intermediate',
    skill: 'Kubernetes'
  },

  // AWS
  {
    title: 'AWS Certified Solutions Architect - Associate',
    description: 'Prepare for the AWS certification and master cloud architecture',
    platform: 'Coursera',
    url: 'https://www.coursera.org/learn/aws-certified-solutions-architect-associate',
    duration: '4 weeks',
    level: 'Intermediate',
    skill: 'AWS'
  },
  {
    title: 'Ultimate AWS Certified Solutions Architect Associate',
    description: 'Pass the AWS exam and become a cloud professional',
    platform: 'Udemy',
    url: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/',
    duration: '27 hours',
    level: 'All Levels',
    skill: 'AWS'
  },
  {
    title: 'AWS Full Course - FreeCodeCamp',
    description: 'Complete AWS tutorial covering EC2, S3, Lambda, RDS, and more',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=ulprqHHWlng',
    duration: '10 hours',
    level: 'Beginner',
    skill: 'AWS'
  },
  {
    title: 'AWS Tutorial for Beginners - Edureka',
    description: 'Learn AWS cloud computing basics',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=k1RI5locZE4',
    duration: '4 hours',
    level: 'Beginner',
    skill: 'AWS'
  },

  // Azure
  {
    title: 'Microsoft Azure Fundamentals - AZ-900',
    description: 'Complete Azure certification course',
    platform: 'Udemy',
    url: 'https://www.udemy.com/course/az900-azure/',
    duration: '8 hours',
    level: 'Beginner',
    skill: 'Azure'
  },
  {
    title: 'Azure Full Course - FreeCodeCamp',
    description: 'Complete Microsoft Azure tutorial for beginners',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=NKEFWyqJ5XA',
    duration: '3 hours',
    level: 'Beginner',
    skill: 'Azure'
  },

  // System Design
  {
    title: 'Grokking the System Design Interview',
    description: 'Master system design concepts for technical interviews',
    platform: 'Coursera',
    url: 'https://www.coursera.org/learn/system-design',
    duration: '6 weeks',
    level: 'Advanced',
    skill: 'System Design'
  },
  {
    title: 'System Design Interview - Gaurav Sen',
    description: 'Learn to design scalable systems like Uber, Netflix, Twitter',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=xpDnVSmNFX0&list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX',
    duration: '12 hours',
    level: 'Intermediate',
    skill: 'System Design'
  },
  {
    title: 'System Design for Beginners - FreeCodeCamp',
    description: 'Complete system design course with examples',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=m8Icp_Cid5o',
    duration: '3 hours',
    level: 'Intermediate',
    skill: 'System Design'
  },

  // Data Structures & Algorithms
  {
    title: 'Data Structures and Algorithms - FreeCodeCamp',
    description: 'Complete DSA course with Python',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=8hly31xKli0',
    duration: '5 hours',
    level: 'Intermediate',
    skill: 'Algorithms'
  },
  {
    title: 'Data Structures Easy to Advanced - WilliamFiset',
    description: 'Full course covering all important data structures',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=RBSGKlAvoiM',
    duration: '10 hours',
    level: 'All Levels',
    skill: 'Data Structures'
  },

  // GraphQL
  {
    title: 'GraphQL by Example',
    description: 'Build modern APIs with GraphQL, Node.js, and Apollo',
    platform: 'Udemy',
    url: 'https://www.udemy.com/course/graphql-by-example/',
    duration: '6 hours',
    level: 'Intermediate',
    skill: 'GraphQL'
  },
  {
    title: 'GraphQL Full Course - FreeCodeCamp',
    description: 'Complete GraphQL tutorial with React and Node.js',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=ed8SzALpx1Q',
    duration: '4 hours',
    level: 'All Levels',
    skill: 'GraphQL'
  },

  // MongoDB
  {
    title: 'MongoDB Complete Course - FreeCodeCamp',
    description: 'Learn MongoDB from scratch with practical examples',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=c2M-rlkkT5o',
    duration: '2.5 hours',
    level: 'Beginner',
    skill: 'MongoDB'
  },
  {
    title: 'MongoDB Crash Course - Traversy Media',
    description: 'Learn MongoDB basics in 30 minutes',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=-56x56UppqQ',
    duration: '30 minutes',
    level: 'Beginner',
    skill: 'MongoDB'
  },

  // SQL
  {
    title: 'SQL Full Course - FreeCodeCamp',
    description: 'Complete SQL tutorial for beginners',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
    duration: '4 hours',
    level: 'Beginner',
    skill: 'SQL'
  },
  {
    title: 'MySQL Tutorial for Beginners - Programming with Mosh',
    description: 'Learn MySQL in 3 hours',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=7S_tz1z_5bA',
    duration: '3 hours',
    level: 'Beginner',
    skill: 'SQL'
  },

  // Git & GitHub
  {
    title: 'Git and GitHub for Beginners - FreeCodeCamp',
    description: 'Complete Git course with practical examples',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
    duration: '1 hour',
    level: 'Beginner',
    skill: 'Git'
  },
  {
    title: 'Git Tutorial for Beginners - Programming with Mosh',
    description: 'Learn Git version control in 1 hour',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=8JJ101D3knE',
    duration: '1 hour',
    level: 'Beginner',
    skill: 'Git'
  },

  // Machine Learning
  {
    title: 'Machine Learning Specialization',
    description: 'Learn ML fundamentals from Andrew Ng at Stanford',
    platform: 'Coursera',
    url: 'https://www.coursera.org/specializations/machine-learning-introduction',
    duration: '10 weeks',
    level: 'Intermediate',
    skill: 'Machine Learning'
  },
  {
    title: 'Machine Learning A-Z™',
    description: 'Hands-on Python & R in data science and machine learning',
    platform: 'Udemy',
    url: 'https://www.udemy.com/course/machinelearning/',
    duration: '44 hours',
    level: 'All Levels',
    skill: 'Machine Learning'
  },
  {
    title: 'Machine Learning Full Course - FreeCodeCamp',
    description: 'Complete ML course with Python and TensorFlow',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=NWONeJKn6kc',
    duration: '10 hours',
    level: 'Intermediate',
    skill: 'Machine Learning'
  },

  // CI/CD
  {
    title: 'DevOps CI/CD Pipeline - FreeCodeCamp',
    description: 'Learn CI/CD with Jenkins, Docker, and Kubernetes',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=j5Zsa_eOXeY',
    duration: '2 hours',
    level: 'Intermediate',
    skill: 'CI/CD'
  },
  {
    title: 'GitHub Actions Tutorial - TechWorld with Nana',
    description: 'Complete GitHub Actions CI/CD tutorial',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=R8_veQiYBjI',
    duration: '1 hour',
    level: 'Intermediate',
    skill: 'CI/CD'
  },

  // Leadership & Agile
  {
    title: 'Leadership and Management Certificate',
    description: 'Develop essential leadership skills for tech professionals',
    platform: 'Coursera',
    url: 'https://www.coursera.org/specializations/leadership-management',
    duration: '8 weeks',
    level: 'Intermediate',
    skill: 'Leadership'
  },
  {
    title: 'Agile Project Management - Google',
    description: 'Learn Agile methodology and Scrum framework',
    platform: 'Coursera',
    url: 'https://www.coursera.org/learn/agile-project-management',
    duration: '4 weeks',
    level: 'Beginner',
    skill: 'Agile Methodology'
  },
  {
    title: 'Agile Scrum Full Course - Simplilearn',
    description: 'Complete guide to Scrum framework and certification prep',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=XU0llRltyFM',
    duration: '4 hours',
    level: 'All Levels',
    skill: 'Agile Methodology'
  },

  // Spring Boot (for Java developers)
  {
    title: 'Spring Boot Full Course - Amigoscode',
    description: 'Complete Spring Boot tutorial with microservices',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=9SGDpanrc8U',
    duration: '10 hours',
    level: 'Intermediate',
    skill: 'Spring Boot'
  },

  // Angular
  {
    title: 'Angular Full Course - FreeCodeCamp',
    description: 'Complete Angular tutorial for beginners',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=3qBXWUpoPHo',
    duration: '4 hours',
    level: 'Beginner',
    skill: 'Angular'
  },
  {
    title: 'Angular Crash Course - Traversy Media',
    description: 'Learn Angular fundamentals in 2 hours',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=3dHNOWTI7H8',
    duration: '2 hours',
    level: 'Beginner',
    skill: 'Angular'
  },

  // REST API
  {
    title: 'REST API Design, Development & Management',
    description: 'Learn RESTful API best practices',
    platform: 'Udemy',
    url: 'https://www.udemy.com/course/rest-api/',
    duration: '6 hours',
    level: 'Intermediate',
    skill: 'REST API'
  },
  {
    title: 'REST API Crash Course - Traversy Media',
    description: 'Build REST APIs with Node.js and Express',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=Q-BpqyOT3a8',
    duration: '40 minutes',
    level: 'Beginner',
    skill: 'REST API'
  },

  // Microservices
  {
    title: 'Microservices Architecture - FreeCodeCamp',
    description: 'Complete microservices course with Spring Boot',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=lL_j7ilk7rc',
    duration: '3 hours',
    level: 'Advanced',
    skill: 'Microservices'
  },
];

export function getLearningSuggestions(missingSkills: any[], companyName: string): LearningSuggestion[] {
  if (!missingSkills || missingSkills.length === 0) {
    return [];
  }

  const suggestions: LearningSuggestion[] = [];
  const addedSkills = new Set<string>();

  // Prioritize high-priority skills
  const sortedSkills = [...missingSkills].sort((a, b) => {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
  });

  sortedSkills.forEach(skill => {
    // Find courses for this skill
    const skillCourses = courseSuggestions.filter(course => 
      course.skill.toLowerCase() === skill.name.toLowerCase() ||
      skill.name.toLowerCase().includes(course.skill.toLowerCase()) ||
      course.skill.toLowerCase().includes(skill.name.toLowerCase())
    );

    // Prioritize YouTube videos for free learning, then Udemy, then Coursera
    const youtube = skillCourses.filter(c => c.platform === 'YouTube');
    const udemy = skillCourses.find(c => c.platform === 'Udemy');
    const coursera = skillCourses.find(c => c.platform === 'Coursera');

    // Add 1-2 YouTube videos per skill
    if (youtube.length > 0 && !addedSkills.has(skill.name)) {
      suggestions.push(youtube[0]); // Add first YouTube video
      addedSkills.add(skill.name);
      
      // Add second YouTube video if available
      if (youtube.length > 1 && suggestions.length < 12) {
        suggestions.push(youtube[1]);
      }
    }

    // Add one premium course (Udemy or Coursera) per skill
    if (suggestions.length < 12) {
      if (udemy && addedSkills.has(skill.name)) {
        suggestions.push(udemy);
      } else if (coursera && addedSkills.has(skill.name)) {
        suggestions.push(coursera);
      }
    }
  });

  // Limit to top 10 suggestions (prioritizing YouTube)
  return suggestions.slice(0, 10);
}
