// Resume Templates Database - 20 High-Rating Professional Templates
// Each template renders resume data in a different professional format

import { ResumeData } from './resumeDataExtractor';

export interface ResumeTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  bestFor: string;
  preview: string;
  rating: number;
  render: (data: ResumeData) => string;
}

export const resumeTemplates: ResumeTemplate[] = [
  // CATEGORY 1: CLASSIC PROFESSIONAL (5 templates)
  {
    id: 'classic-traditional',
    name: 'Classic Traditional',
    category: 'Classic',
    description: 'Timeless professional format',
    bestFor: 'Corporate, Finance, Legal',
    preview: '📄',
    rating: 4.9,
    render: (data) => `${data.personalInfo.name.toUpperCase()}
${data.personalInfo.title}

CONTACT INFORMATION
Email: ${data.personalInfo.email}
Phone: ${data.personalInfo.phone}
Location: ${data.personalInfo.location}
${data.personalInfo.linkedin ? 'LinkedIn: ' + data.personalInfo.linkedin : ''}

PROFESSIONAL SUMMARY
${data.summary}

PROFESSIONAL EXPERIENCE
${data.experience.map(exp => `
${exp.title}
${exp.company} | ${exp.duration}
${exp.description.map(d => `• ${d}`).join('\n')}
`).join('\n')}

EDUCATION
${data.education.map(edu => `
${edu.degree}
${edu.institution} | ${edu.year}
${edu.details.map(d => `• ${d}`).join('\n')}
`).join('\n')}

SKILLS
${Object.values(data.skills).flat().filter(s => s).join(' • ')}

${data.certifications.length > 0 ? `CERTIFICATIONS\n${data.certifications.map(c => `• ${c.name} - ${c.issuer}`).join('\n')}` : ''}
`
  },

  {
    id: 'modern-executive',
    name: 'Modern Executive',
    category: 'Classic',
    description: 'Sophisticated leadership format',
    bestFor: 'Executives, Senior Management',
    preview: '👔',
    rating: 4.8,
    render: (data) => `${data.personalInfo.name}
${data.personalInfo.title}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 ${data.personalInfo.email} | 📱 ${data.personalInfo.phone} | 📍 ${data.personalInfo.location}

EXECUTIVE SUMMARY
${data.summary}

LEADERSHIP EXPERIENCE
${data.experience.map(exp => `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${exp.title.toUpperCase()}
${exp.company} • ${exp.duration}

Key Achievements:
${exp.description.map(d => `  → ${d}`).join('\n')}
`).join('\n')}

EDUCATION & CREDENTIALS
${data.education.map(edu => `• ${edu.degree} - ${edu.institution} (${edu.year})`).join('\n')}

CORE COMPETENCIES
${Object.values(data.skills).flat().filter(s => s).join(' | ')}
`
  },

  {
    id: 'minimal-professional',
    name: 'Minimal Professional',
    category: 'Classic',
    description: 'Clean and streamlined',
    bestFor: 'All Industries',
    preview: '📋',
    rating: 4.7,
    render: (data) => `${data.personalInfo.name}
${data.personalInfo.title}

${data.personalInfo.email} • ${data.personalInfo.phone} • ${data.personalInfo.location}

──────────────────────────────────────────────────────

SUMMARY
${data.summary}

──────────────────────────────────────────────────────

EXPERIENCE

${data.experience.map(exp => `${exp.title} | ${exp.company}
${exp.duration}
${exp.description.map(d => `• ${d}`).join('\n')}
`).join('\n')}

──────────────────────────────────────────────────────

EDUCATION

${data.education.map(edu => `${edu.degree} | ${edu.institution}
${edu.year}`).join('\n\n')}

──────────────────────────────────────────────────────

SKILLS
${Object.values(data.skills).flat().filter(s => s).join(', ')}
`
  },

  {
    id: 'corporate-standard',
    name: 'Corporate Standard',
    category: 'Classic',
    description: 'Professional corporate style',
    bestFor: 'Fortune 500, Large Companies',
    preview: '🏢',
    rating: 4.8,
    render: (data) => `${data.personalInfo.name.toUpperCase()}
${data.personalInfo.title}

Contact: ${data.personalInfo.email} | ${data.personalInfo.phone}
Location: ${data.personalInfo.location}
${data.personalInfo.linkedin ? 'LinkedIn: ' + data.personalInfo.linkedin : ''}

═══════════════════════════════════════════════════════════

PROFESSIONAL PROFILE
${data.summary}

═══════════════════════════════════════════════════════════

WORK HISTORY

${data.experience.map(exp => `${exp.title}
${exp.company} — ${exp.duration}

Responsibilities & Achievements:
${exp.description.map(d => `  • ${d}`).join('\n')}
`).join('\n')}

═══════════════════════════════════════════════════════════

ACADEMIC BACKGROUND

${data.education.map(edu => `${edu.degree}
${edu.institution}, ${edu.year}
${edu.details.map(d => `• ${d}`).join('\n')}`).join('\n\n')}

═══════════════════════════════════════════════════════════

TECHNICAL SKILLS
${data.skills.technical.join(' • ')}

PROFESSIONAL SKILLS
${data.skills.soft.join(' • ')}
`
  },

  {
    id: 'elegant-simple',
    name: 'Elegant Simple',
    category: 'Classic',
    description: 'Simple elegance',
    bestFor: 'Consultants, Freelancers',
    preview: '✨',
    rating: 4.6,
    render: (data) => `${data.personalInfo.name}
${data.personalInfo.title}

${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}

About Me
${data.summary}

Professional Experience
${data.experience.map(exp => `
${exp.title} at ${exp.company}
${exp.duration}
${exp.description.map(d => `• ${d}`).join('\n')}
`).join('\n')}

Education
${data.education.map(edu => `${edu.degree}, ${edu.institution} (${edu.year})`).join('\n')}

Skills & Expertise
${Object.values(data.skills).flat().filter(s => s).join(' · ')}
`
  },

  // CATEGORY 2: MODERN TECH (5 templates)
  {
    id: 'tech-modern',
    name: 'Tech Modern',
    category: 'Tech',
    description: 'Modern tech-focused design',
    bestFor: 'Software Engineers, Developers',
    preview: '💻',
    rating: 4.9,
    render: (data) => `╔═══════════════════════════════════════════════════════════╗
║  ${data.personalInfo.name.toUpperCase()}
║  ${data.personalInfo.title}
╚═══════════════════════════════════════════════════════════╝

📧 ${data.personalInfo.email}  |  📱 ${data.personalInfo.phone}  |  📍 ${data.personalInfo.location}
${data.personalInfo.github ? '🔗 ' + data.personalInfo.github : ''}  ${data.personalInfo.linkedin ? '🔗 ' + data.personalInfo.linkedin : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 PROFILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.summary}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💼 EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.experience.map(exp => `
▸ ${exp.title} @ ${exp.company}
  ${exp.duration}
  ${exp.description.map(d => `  ✓ ${d}`).join('\n')}
`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 TECHNICAL SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.skills.technical.join(' | ')}

${data.projects.length > 0 ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📂 PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.projects.map(p => `▸ ${p.name}\n  ${p.description}`).join('\n\n')}
` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎓 EDUCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.education.map(edu => `${edu.degree} - ${edu.institution} (${edu.year})`).join('\n')}
`
  },

  {
    id: 'developer-pro',
    name: 'Developer Pro',
    category: 'Tech',
    description: 'Developer-focused layout',
    bestFor: 'Full Stack, Backend, Frontend Devs',
    preview: '⚡',
    rating: 4.8,
    render: (data) => `// ${data.personalInfo.name}
// ${data.personalInfo.title}

const contact = {
  email: "${data.personalInfo.email}",
  phone: "${data.personalInfo.phone}",
  location: "${data.personalInfo.location}",
  github: "${data.personalInfo.github}",
  linkedin: "${data.personalInfo.linkedin}"
};

/* ═══════════════════════════════════════════════════════ */
/* ABOUT                                                     */
/* ═══════════════════════════════════════════════════════ */

${data.summary}

/* ═══════════════════════════════════════════════════════ */
/* EXPERIENCE                                                */
/* ═══════════════════════════════════════════════════════ */

${data.experience.map(exp => `→ ${exp.title} | ${exp.company}
  ${exp.duration}
  
${exp.description.map(d => `  ✓ ${d}`).join('\n')}`).join('\n\n')}

/* ═══════════════════════════════════════════════════════ */
/* TECH STACK                                                */
/* ═══════════════════════════════════════════════════════ */

Languages: ${data.skills.technical.filter(s => ['JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'Go', 'Rust'].some(lang => s.includes(lang))).join(', ')}
Frameworks: ${data.skills.technical.filter(s => ['React', 'Angular', 'Vue', 'Node', 'Django', 'Flask', 'Spring'].some(fw => s.includes(fw))).join(', ')}
Tools: ${data.skills.tools.join(', ')}

/* ═══════════════════════════════════════════════════════ */
/* EDUCATION                                                 */
/* ═══════════════════════════════════════════════════════ */

${data.education.map(edu => `${edu.degree}\n${edu.institution} | ${edu.year}`).join('\n\n')}
`
  },

  {
    id: 'github-style',
    name: 'GitHub Style',
    category: 'Tech',
    description: 'GitHub README inspired',
    bestFor: 'Open Source Contributors',
    preview: '🐙',
    rating: 4.7,
    render: (data) => `# ${data.personalInfo.name}
## ${data.personalInfo.title}

[![Email](badge)](${data.personalInfo.email}) [![LinkedIn](badge)](${data.personalInfo.linkedin}) [![GitHub](badge)](${data.personalInfo.github})

---

### 👋 About Me
${data.summary}

---

### 💼 Work Experience

${data.experience.map(exp => `#### ${exp.title} @ **${exp.company}**
_${exp.duration}_

${exp.description.map(d => `- ${d}`).join('\n')}
`).join('\n')}

---

### 🛠️ Tech Stack

\`\`\`
${data.skills.technical.join(' | ')}
\`\`\`

---

### 🎓 Education

${data.education.map(edu => `**${edu.degree}**  \n${edu.institution} • ${edu.year}`).join('\n\n')}

${data.projects.length > 0 ? `---\n\n### 📂 Featured Projects\n\n${data.projects.map(p => `**${p.name}**  \n${p.description}`).join('\n\n')}` : ''}
`
  },

  {
    id: 'startup-dynamic',
    name: 'Startup Dynamic',
    category: 'Tech',
    description: 'Dynamic startup culture',
    bestFor: 'Startups, Fast-paced Companies',
    preview: '🚀',
    rating: 4.8,
    render: (data) => `${data.personalInfo.name} ⚡
${data.personalInfo.title}

💌 ${data.personalInfo.email} | 📞 ${data.personalInfo.phone} | 🌍 ${data.personalInfo.location}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 WHO I AM
${data.summary}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💪 WHAT I'VE DONE

${data.experience.map(exp => `🔹 ${exp.title} | ${exp.company}
   ⏱️ ${exp.duration}
   
${exp.description.map(d => `   ✨ ${d}`).join('\n')}`).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔥 SKILLS THAT MATTER
${data.skills.technical.map(s => `• ${s}`).join('  ')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 LEARNING BACKGROUND
${data.education.map(edu => `${edu.degree} @ ${edu.institution} (${edu.year})`).join('\n')}
`
  },

  {
    id: 'data-science',
    name: 'Data Science Focus',
    category: 'Tech',
    description: 'Analytics and data focus',
    bestFor: 'Data Scientists, ML Engineers',
    preview: '📊',
    rating: 4.9,
    render: (data) => `${data.personalInfo.name}
${data.personalInfo.title}

Contact: ${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}
Portfolio: ${data.personalInfo.website} | GitHub: ${data.personalInfo.github}

═══════════════════════════════════════════════════════════

PROFESSIONAL SUMMARY
${data.summary}

═══════════════════════════════════════════════════════════

WORK EXPERIENCE

${data.experience.map(exp => `${exp.title}
${exp.company} | ${exp.duration}

Key Contributions:
${exp.description.map(d => `  → ${d}`).join('\n')}`).join('\n\n')}

═══════════════════════════════════════════════════════════

TECHNICAL PROFICIENCIES

Programming: ${data.skills.technical.filter(s => ['Python', 'R', 'SQL', 'Julia', 'Scala'].some(l => s.includes(l))).join(', ')}
ML/DL Frameworks: ${data.skills.technical.filter(s => ['TensorFlow', 'PyTorch', 'Keras', 'Scikit'].some(f => s.includes(f))).join(', ')}
Tools & Platforms: ${data.skills.tools.join(', ')}

${data.projects.length > 0 ? `═══════════════════════════════════════════════════════════\n\nKEY PROJECTS\n\n${data.projects.map(p => `▸ ${p.name}\n  ${p.description}\n  Technologies: ${p.technologies.join(', ')}`).join('\n\n')}` : ''}

═══════════════════════════════════════════════════════════

EDUCATION

${data.education.map(edu => `${edu.degree}\n${edu.institution}, ${edu.year}\n${edu.details.map(d => `• ${d}`).join('\n')}`).join('\n\n')}
`
  },

  // CATEGORY 3: CREATIVE (5 templates)
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    category: 'Creative',
    description: 'Bold and eye-catching',
    bestFor: 'Designers, Creatives, Marketing',
    preview: '🎨',
    rating: 4.7,
    render: (data) => `╔══════════════════════════════════════════════════════════╗
║                                                          ║
║         ${data.personalInfo.name.toUpperCase()}                    ║
║         ${data.personalInfo.title}                ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

${data.personalInfo.email} ★ ${data.personalInfo.phone} ★ ${data.personalInfo.location}
${data.personalInfo.website}

● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ●

MY STORY
${data.summary}

● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ●

PROFESSIONAL JOURNEY

${data.experience.map(exp => `★ ${exp.title}
  ${exp.company} • ${exp.duration}
  
${exp.description.map(d => `  ◆ ${d}`).join('\n')}`).join('\n\n')}

● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ●

SKILLS & SUPERPOWERS
${Object.values(data.skills).flat().filter(s => s).map(s => `◆ ${s}`).join('  ')}

● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● ●

EDUCATION
${data.education.map(edu => `★ ${edu.degree} - ${edu.institution} (${edu.year})`).join('\n')}
`
  },

  {
    id: 'designer-portfolio',
    name: 'Designer Portfolio',
    category: 'Creative',
    description: 'Portfolio-style layout',
    bestFor: 'UX/UI Designers, Graphic Designers',
    preview: '🖌️',
    rating: 4.8,
    render: (data) => `${data.personalInfo.name}
${data.personalInfo.title}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT
✉️  ${data.personalInfo.email}
📱  ${data.personalInfo.phone}
🌐  ${data.personalInfo.website}
📍  ${data.personalInfo.location}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ABOUT
${data.summary}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WORK

${data.experience.map(exp => `${exp.title}
${exp.company} ⋅ ${exp.duration}

${exp.description.map(d => `• ${d}`).join('\n')}`).join('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n')}

SKILLS

Design: ${data.skills.technical.join(', ')}
Tools: ${data.skills.tools.join(', ')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EDUCATION
${data.education.map(edu => `${edu.degree}\n${edu.institution} ⋅ ${edu.year}`).join('\n\n')}
`
  },

  {
    id: 'artistic-flair',
    name: 'Artistic Flair',
    category: 'Creative',
    description: 'Artistic presentation',
    bestFor: 'Artists, Content Creators',
    preview: '🎭',
    rating: 4.6,
    render: (data) => `✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦

           ${data.personalInfo.name}
           ${data.personalInfo.title}

✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦

${data.personalInfo.email} ❋ ${data.personalInfo.phone}
${data.personalInfo.website}

═══════════════════════════════════════════════════════════

  WHO I AM
  ${data.summary}

═══════════════════════════════════════════════════════════

  EXPERIENCE

${data.experience.map(exp => `  ◈ ${exp.title}
    ${exp.company} · ${exp.duration}
    
${exp.description.map(d => `    ✧ ${d}`).join('\n')}`).join('\n\n')}

═══════════════════════════════════════════════════════════

  EXPERTISE
  ${Object.values(data.skills).flat().filter(s => s).join(' · ')}

═══════════════════════════════════════════════════════════

  EDUCATION
${data.education.map(edu => `  ${edu.degree}\n  ${edu.institution} · ${edu.year}`).join('\n\n')}

✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦
`
  },

  {
    id: 'marketing-impact',
    name: 'Marketing Impact',
    category: 'Creative',
    description: 'Marketing-focused design',
    bestFor: 'Marketing, Social Media, PR',
    preview: '📢',
    rating: 4.7,
    render: (data) => `${data.personalInfo.name.toUpperCase()}
${data.personalInfo.title}

${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 PERSONAL BRAND
${data.summary}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💼 PROFESSIONAL EXPERIENCE

${data.experience.map(exp => `${exp.title} | ${exp.company}
${exp.duration}

KEY WINS:
${exp.description.map(d => `⚡ ${d}`).join('\n')}`).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 CORE STRENGTHS
${Object.values(data.skills).flat().filter(s => s).map(s => `▸ ${s}`).join('  ')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 CREDENTIALS
${data.education.map(edu => `${edu.degree} | ${edu.institution} (${edu.year})`).join('\n')}

${data.achievements.length > 0 ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🏆 ACHIEVEMENTS\n${data.achievements.map(a => `★ ${a}`).join('\n')}` : ''}
`
  },

  {
    id: 'media-modern',
    name: 'Media Modern',
    category: 'Creative',
    description: 'Modern media style',
    bestFor: 'Journalists, Writers, Editors',
    preview: '📰',
    rating: 4.5,
    render: (data) => `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${data.personalInfo.name}
${data.personalInfo.title}

${data.personalInfo.email} • ${data.personalInfo.phone} • ${data.personalInfo.location}
${data.personalInfo.website}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROFILE
${data.summary}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXPERIENCE

${data.experience.map(exp => `${exp.title}
${exp.company}, ${exp.duration}

${exp.description.map(d => `• ${d}`).join('\n')}`).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SKILLS
${Object.values(data.skills).flat().filter(s => s).join(' | ')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EDUCATION
${data.education.map(edu => `${edu.degree}, ${edu.institution} (${edu.year})`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`
  },

  // CATEGORY 4: ATS-OPTIMIZED (5 templates)
  {
    id: 'ats-optimized-pro',
    name: 'ATS Optimized Pro',
    category: 'ATS',
    description: 'Maximum ATS compatibility',
    bestFor: 'Any ATS-based Application',
    preview: '✅',
    rating: 5.0,
    render: (data) => `${data.personalInfo.name}
${data.personalInfo.title}

Email: ${data.personalInfo.email}
Phone: ${data.personalInfo.phone}
Location: ${data.personalInfo.location}
LinkedIn: ${data.personalInfo.linkedin}

PROFESSIONAL SUMMARY
${data.summary}

WORK EXPERIENCE

${data.experience.map(exp => `${exp.title}
${exp.company}
${exp.duration}

${exp.description.map(d => `- ${d}`).join('\n')}`).join('\n\n')}

EDUCATION

${data.education.map(edu => `${edu.degree}
${edu.institution}
${edu.year}
${edu.details.map(d => `- ${d}`).join('\n')}`).join('\n\n')}

SKILLS
${Object.values(data.skills).flat().filter(s => s).join(', ')}

${data.certifications.length > 0 ? `CERTIFICATIONS\n${data.certifications.map(c => `${c.name}, ${c.issuer}, ${c.date}`).join('\n')}` : ''}

${data.projects.length > 0 ? `PROJECTS\n${data.projects.map(p => `${p.name}\n${p.description}`).join('\n\n')}` : ''}
`
  },

  {
    id: 'ats-keyword-rich',
    name: 'ATS Keyword Rich',
    category: 'ATS',
    description: 'Keyword-optimized format',
    bestFor: 'High ATS Score Needed',
    preview: '🎯',
    rating: 4.9,
    render: (data) => `${data.personalInfo.name.toUpperCase()}
${data.personalInfo.title}

CONTACT INFORMATION
Email: ${data.personalInfo.email} | Phone: ${data.personalInfo.phone} | Location: ${data.personalInfo.location}
LinkedIn: ${data.personalInfo.linkedin} | GitHub: ${data.personalInfo.github}

PROFESSIONAL SUMMARY
${data.summary}

CORE COMPETENCIES
${Object.values(data.skills).flat().filter(s => s).join(' | ')}

PROFESSIONAL EXPERIENCE

${data.experience.map(exp => `${exp.title.toUpperCase()}
${exp.company} | ${exp.duration}

Key Accomplishments:
${exp.description.map(d => `• ${d}`).join('\n')}`).join('\n\n')}

EDUCATION

${data.education.map(edu => `${edu.degree}
${edu.institution} | ${edu.year}`).join('\n\n')}

TECHNICAL SKILLS
${data.skills.technical.join(', ')}

TOOLS & TECHNOLOGIES
${data.skills.tools.join(', ')}

${data.certifications.length > 0 ? `PROFESSIONAL CERTIFICATIONS\n${data.certifications.map(c => `• ${c.name} - ${c.issuer} (${c.date})`).join('\n')}` : ''}
`
  },

  {
    id: 'ats-clean',
    name: 'ATS Clean',
    category: 'ATS',
    description: 'Clean ATS-friendly format',
    bestFor: 'Online Applications',
    preview: '📝',
    rating: 4.8,
    render: (data) => `${data.personalInfo.name}
${data.personalInfo.title}

${data.personalInfo.email}
${data.personalInfo.phone}
${data.personalInfo.location}

SUMMARY
${data.summary}

EXPERIENCE

${data.experience.map(exp => `${exp.title}
${exp.company}, ${exp.duration}
${exp.description.map(d => `- ${d}`).join('\n')}`).join('\n\n')}

EDUCATION

${data.education.map(edu => `${edu.degree}
${edu.institution}, ${edu.year}`).join('\n\n')}

SKILLS
Technical: ${data.skills.technical.join(', ')}
Tools: ${data.skills.tools.join(', ')}
${data.skills.soft.length > 0 ? `Soft Skills: ${data.skills.soft.join(', ')}` : ''}
`
  },

  {
    id: 'ats-standard',
    name: 'ATS Standard',
    category: 'ATS',
    description: 'Standard ATS format',
    bestFor: 'Most ATS Systems',
    preview: '📄',
    rating: 4.7,
    render: (data) => `${data.personalInfo.name}
${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}

OBJECTIVE
${data.summary}

PROFESSIONAL EXPERIENCE

${data.experience.map(exp => `${exp.title}, ${exp.company}
${exp.duration}
${exp.description.map(d => `• ${d}`).join('\n')}`).join('\n\n')}

EDUCATION

${data.education.map(edu => `${edu.degree}, ${edu.institution} (${edu.year})`).join('\n')}

SKILLS
${Object.values(data.skills).flat().filter(s => s).join(', ')}
`
  },

  {
    id: 'ats-simple',
    name: 'ATS Simple',
    category: 'ATS',
    description: 'Simplest ATS format',
    bestFor: 'Basic ATS Requirements',
    preview: '📋',
    rating: 4.6,
    render: (data) => `${data.personalInfo.name}
${data.personalInfo.email}
${data.personalInfo.phone}
${data.personalInfo.location}

SUMMARY
${data.summary}

EXPERIENCE
${data.experience.map(exp => `${exp.title}\n${exp.company}\n${exp.duration}\n${exp.description.join('\n')}`).join('\n\n')}

EDUCATION
${data.education.map(edu => `${edu.degree}\n${edu.institution}\n${edu.year}`).join('\n\n')}

SKILLS
${Object.values(data.skills).flat().filter(s => s).join(', ')}
`
  }
];

export function getTemplateById(id: string): ResumeTemplate | undefined {
  return resumeTemplates.find(t => t.id === id);
}

export function getTemplatesByCategory(category: string): ResumeTemplate[] {
  return resumeTemplates.filter(t => t.category === category);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(resumeTemplates.map(t => t.category)));
}
