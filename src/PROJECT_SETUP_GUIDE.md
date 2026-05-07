# ATS Resume Score Checker - VS Code Setup Guide

## 📋 Project Overview

This is a complete ATS (Applicant Tracking System) Resume Score Checker built with:
- **React** (JavaScript library for UI)
- **TypeScript** (Type-safe JavaScript)
- **Tailwind CSS** (Utility-first CSS framework)
- **Lucide React** (Icon library)

## 🗂️ Project Structure

```
ats-resume-checker/
├── src/
│   ├── App.tsx                          # Main application component (ENTRY POINT)
│   ├── components/                      # Reusable UI components
│   │   ├── ResumeUpload.tsx            # Resume upload & job description input
│   │   ├── ATSScoreDisplay.tsx         # ATS score visualization
│   │   ├── SkillGapAnalysis.tsx        # Skill gap identification
│   │   ├── LearningSuggestions.tsx     # Course recommendations
│   │   └── LiveResumeEditor.tsx        # Real-time resume editor
│   ├── utils/                           # Helper functions & data
│   │   ├── resumeParser.ts             # Resume parsing logic
│   │   ├── companyDatabase.ts          # Company-specific keywords & data
│   │   ├── learningSuggestions.ts      # Course database & matching
│   │   ├── liveAnalyzer.ts             # Real-time text analysis
│   │   └── pdfParser.ts                # PDF text extraction
│   └── styles/
│       └── globals.css                  # Global styles
```

## 🎯 Features Implemented

### 1. ✅ Company-Specific Resume Check Mode
- **File:** `utils/companyDatabase.ts`
- **Functionality:** Database of 12 major companies (Google, TCS, Deloitte, etc.)
- **Data includes:** Keywords, preferred skills, tech stacks, culture values
- **Used in:** Resume scoring algorithm to tailor results

### 2. ✅ Skill Gap Predictor + Learning Suggestions
- **Files:** 
  - `components/SkillGapAnalysis.tsx` - Identifies missing skills
  - `components/LearningSuggestions.tsx` - Shows course recommendations
  - `utils/learningSuggestions.ts` - Database of Coursera, Udemy, YouTube courses
- **Functionality:** 
  - Compares resume skills vs job requirements
  - Suggests specific courses with direct links
  - Prioritizes skills by importance

### 3. ✅ Real-time Resume Improver (Live Editor)
- **File:** `components/LiveResumeEditor.tsx`
- **Functionality:**
  - Live text editor with color-coded feedback
  - Green = Strong keywords
  - Yellow = Needs attention
  - Red = Weak phrases
  - Real-time ATS score updates
  - Section structure analysis
  - Keyword suggestions

### 4. ✅ Resume Upload Page
- **File:** `components/ResumeUpload.tsx`
- **Functionality:**
  - Drag-and-drop file upload
  - Job description input
  - Company selection dropdown
  - ATS score calculation
  - Detailed feedback

## 🚀 How to Set Up in VS Code

### Step 1: Install Prerequisites

1. **Install Node.js**
   - Download from: https://nodejs.org/
   - Version: 18.x or higher
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Install VS Code**
   - Download from: https://code.visualstudio.com/

### Step 2: Create React Project

Open VS Code terminal (Ctrl + ` or View > Terminal) and run:

```bash
# Create new React app with TypeScript
npx create-react-app ats-resume-checker --template typescript

# Navigate into project
cd ats-resume-checker
```

### Step 3: Install Required Dependencies

```bash
# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install UI libraries
npm install lucide-react

# Install PDF parser (for PDF resume upload)
npm install pdfjs-dist

# Install TypeScript types (if not already installed)
npm install --save-dev @types/react @types/node
```

### Step 4: Configure Tailwind CSS

1. **Edit `tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

2. **Edit `src/index.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 5: Copy Project Files

Copy all the following files from this project to your VS Code project:

1. **Main Application:**
   - Copy `App.tsx` to `src/App.tsx`

2. **Components folder:**
   - Create folder: `src/components/`
   - Copy all files from `components/` to `src/components/`
   - Files to copy:
     - `ResumeUpload.tsx`
     - `ATSScoreDisplay.tsx`
     - `SkillGapAnalysis.tsx`
     - `LearningSuggestions.tsx`
     - `LiveResumeEditor.tsx`

3. **Utils folder:**
   - Create folder: `src/utils/`
   - Copy all files from `utils/` to `src/utils/`
   - Files to copy:
     - `resumeParser.ts`
     - `companyDatabase.ts`
     - `learningSuggestions.ts`
     - `liveAnalyzer.ts`

### Step 6: Update Import Paths

If you encounter import errors, make sure all imports use relative paths:

**Example in `App.tsx`:**
```typescript
import { ResumeUpload } from './components/ResumeUpload';
import { ATSScoreDisplay } from './components/ATSScoreDisplay';
import { LiveResumeEditor } from './components/LiveResumeEditor';
```

**Example in components:**
```typescript
import { parseResume } from '../utils/resumeParser';
```

### Step 7: Run the Application

```bash
# Start development server
npm start
```

The application will open in your browser at `http://localhost:3000`

## 🔧 File-by-File Breakdown

### Programming Languages Used:

1. **TypeScript (.tsx, .ts files)**
   - All component and utility files
   - Provides type safety and better IDE support

2. **CSS (via Tailwind)**
   - Inline in components using className
   - Configuration in `tailwind.config.js`

3. **JavaScript**
   - React runs on JavaScript (TypeScript compiles to JS)

### Main Files Explanation:

#### `/App.tsx` (Main Entry Point)
- **Language:** TypeScript + React
- **Purpose:** Application shell with tab navigation
- **Key Features:**
  - State management for resume data
  - Tab switching between Upload and Editor modes
  - Header and layout structure

#### `/components/ResumeUpload.tsx`
- **Language:** TypeScript + React
- **Purpose:** File upload and job input interface
- **Key Features:**
  - Drag-and-drop file upload
  - Company selection dropdown
  - Job description textarea
  - File validation

#### `/components/ATSScoreDisplay.tsx`
- **Language:** TypeScript + React
- **Purpose:** Visual ATS score display
- **Key Features:**
  - Circular progress indicator
  - Keyword match metrics
  - Detailed feedback sections
  - Strength/weakness analysis

#### `/components/SkillGapAnalysis.tsx`
- **Language:** TypeScript + React
- **Purpose:** Shows missing skills
- **Key Features:**
  - Skill categorization
  - Priority levels (High/Medium/Low)
  - Reasoning for each gap

#### `/components/LearningSuggestions.tsx`
- **Language:** TypeScript + React
- **Purpose:** Course recommendations
- **Key Features:**
  - Platform badges (Coursera, Udemy, YouTube)
  - Direct course links
  - Duration and level information

#### `/components/LiveResumeEditor.tsx`
- **Language:** TypeScript + React
- **Purpose:** Real-time resume editing
- **Key Features:**
  - Live text analysis
  - Color-coded highlights
  - Section detection
  - Keyword suggestions

#### `/utils/resumeParser.ts`
- **Language:** TypeScript
- **Purpose:** Resume parsing and scoring logic
- **Functions:**
  - `parseResume()` - Main parsing function
  - `extractKeywords()` - Extracts keywords from job description
  - `identifyMissingSkills()` - Finds skill gaps

#### `/utils/companyDatabase.ts`
- **Language:** TypeScript
- **Purpose:** Company-specific data
- **Data Structure:**
  - Company name
  - Keywords (technical and soft skills)
  - Preferred skills
  - Tech stack
  - Culture values

#### `/utils/learningSuggestions.ts`
- **Language:** TypeScript
- **Purpose:** Course database and matching
- **Functions:**
  - `getLearningSuggestions()` - Matches skills to courses
- **Data:** 20+ courses across multiple platforms

#### `/utils/liveAnalyzer.ts`
- **Language:** TypeScript
- **Purpose:** Real-time text analysis
- **Functions:**
  - `analyzeResumeText()` - Analyzes resume content
  - Detects sections, keywords, formatting
  - Generates tips and suggestions

## 📊 How the Application Works

### Workflow 1: Resume Upload & Analysis

1. User selects company (optional)
2. User pastes job description
3. User uploads resume file
4. System parses resume
5. System compares against job description + company database
6. ATS score calculated (0-100)
7. Display:
   - Overall score with visual meter
   - Keyword match percentage
   - Missing keywords
   - Skill gaps
   - Learning suggestions

### Workflow 2: Live Resume Editor

1. User types/pastes resume text
2. Real-time analysis on every keystroke:
   - Section detection
   - Keyword highlighting
   - Format checking
   - Action verb detection
3. Live score updates
4. Suggestions appear instantly
5. Color-coded feedback

## 🎨 Customization Guide

### Adding More Companies

Edit `utils/companyDatabase.ts`:

```typescript
export const companyDatabase: { [key: string]: CompanyData } = {
  // ... existing companies
  
  YourCompany: {
    name: 'Your Company',
    keywords: ['keyword1', 'keyword2'],
    preferredSkills: ['skill1', 'skill2'],
    techStack: ['tech1', 'tech2'],
    culture: ['value1', 'value2']
  }
}
```

Then add to dropdown in `components/ResumeUpload.tsx`:

```tsx
<option value="YourCompany">Your Company Name</option>
```

### Adding More Courses

Edit `utils/learningSuggestions.ts`:

```typescript
const courseSuggestions: LearningSuggestion[] = [
  // ... existing courses
  
  {
    title: 'Your Course Title',
    description: 'Course description',
    platform: 'Udemy', // or 'Coursera' or 'YouTube'
    url: 'https://course-url.com',
    duration: '10 hours',
    level: 'Intermediate',
    skill: 'Target Skill'
  }
]
```

### Changing Color Scheme

Edit Tailwind classes in components:

- Primary color: `blue-600` → Change to your color
- Secondary color: `purple-600` → Change to your color
- Success: `green-600`
- Warning: `yellow-600`
- Error: `red-600`

## 🐛 Common Issues & Solutions

### Issue 1: Module not found errors
**Solution:** 
```bash
npm install
npm start
```

### Issue 2: Tailwind styles not working
**Solution:**
- Check `tailwind.config.js` content paths
- Ensure `@tailwind` directives in `index.css`
- Restart dev server

### Issue 3: TypeScript errors
**Solution:**
```bash
npm install --save-dev @types/react @types/node
```

### Issue 4: Import path errors
**Solution:** Use relative paths:
- Same folder: `./ComponentName`
- Parent folder: `../utils/fileName`

## 📦 Building for Production

```bash
# Create optimized production build
npm run build

# Build output will be in 'build/' folder
# Deploy these files to any static hosting service
```

## 🌐 Deployment Options

1. **Netlify:** Drag and drop `build` folder
2. **Vercel:** Connect GitHub repo
3. **GitHub Pages:** Use gh-pages package
4. **Firebase Hosting:** Use Firebase CLI

## 📝 Notes

- This is a **frontend-only** application
- No backend server required
- No database - all data is client-side
- Resume parsing is simulated (for demo purposes)
- For production, you'd need actual PDF/DOCX parsing libraries
- Course links are real, but recommendations are algorithmic

## 🔐 Privacy & Security

- No data is sent to external servers
- All processing happens in the browser
- Resume files are not stored anywhere
- Safe to use with real resumes

## 💡 Future Enhancements

1. Real PDF/DOCX parsing with libraries like pdf-parse
2. Backend API for persistent storage
3. User accounts and resume history
4. Export resume as optimized PDF
5. A/B testing for different resume versions
6. Integration with real job boards APIs
7. AI-powered resume rewriting suggestions

## 📚 Learning Resources

- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/
- Tailwind CSS: https://tailwindcss.com/
- Lucide Icons: https://lucide.dev/

---

**Happy Coding! 🚀**

For questions or issues, refer to the official documentation of each technology.
