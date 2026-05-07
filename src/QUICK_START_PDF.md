# 🚀 Quick Start: PDF Upload Feature

## Step-by-Step Setup (5 Minutes)

### 1️⃣ Install PDF Library
Open VS Code terminal and run:
```bash
npm install pdfjs-dist
```

### 2️⃣ Copy the New Files
Make sure you have these files in your project:
- `/utils/pdfParser.ts` ✅ (NEW)
- `/components/LiveResumeEditor.tsx` ✅ (UPDATED)

### 3️⃣ Start Your App
```bash
npm start
```

### 4️⃣ Test PDF Upload
1. Go to **Live Resume Editor** tab
2. Click **Upload Resume** button
3. Select a PDF file
4. Wait 2-5 seconds for processing
5. Edit your resume!

## 📱 Usage

### Upload:
- **Formats Supported:** PDF, TXT, DOC, DOCX
- **Click:** Upload Resume button
- **Select:** Your resume file
- **Wait:** Processing message appears
- **Edit:** Text appears automatically

### Download:
- **TXT:** Plain text format (universal)
- **DOC:** Microsoft Word format
- **HTML:** Save and print to PDF in browser

## ⚡ Quick Tips

### Best PDFs for Upload:
✅ Text-based PDFs (not scanned images)  
✅ Under 2MB file size  
✅ Standard fonts (Arial, Calibri, Times)  
✅ Simple formatting  

### If Upload Fails:
1. Check file size (under 5MB)
2. Try converting to TXT first
3. Copy-paste text manually
4. Check browser console (F12)

## 🔧 Common Commands

```bash
# Install dependencies
npm install pdfjs-dist

# Start development server
npm start

# Build for production
npm run build

# Install all dependencies
npm install
```

## 📂 File Structure

```
src/
├── components/
│   └── LiveResumeEditor.tsx  ← UPDATED (PDF support)
└── utils/
    └── pdfParser.ts          ← NEW (PDF extraction)
```

## 🎯 Features You Now Have

✅ Upload PDF resumes  
✅ Auto-extract text from PDFs  
✅ Upload TXT, DOC, DOCX files  
✅ Edit with real-time ATS scoring  
✅ Download as TXT, DOC, HTML  
✅ Print HTML to PDF  
✅ Section suggestions  
✅ Keyword recommendations  

## 💬 Need Help?

### Error: "Cannot find module 'pdfjs-dist'"
```bash
npm install pdfjs-dist
```

### Error: "Failed to extract text"
- PDF might be image-based
- Try converting to TXT first
- Or paste text manually

### PDF processing stuck?
- Refresh page
- Try smaller PDF
- Check F12 console

## 🎉 You're Ready!

Now go to the **Live Resume Editor** tab and upload your PDF resume!

---

**Quick Test:**
1. `npm install pdfjs-dist`
2. `npm start`
3. Click "Live Resume Editor" tab
4. Upload your PDF resume
5. Edit and download!

✨ That's it! Enjoy your PDF-powered resume editor!
